


// app/hooks/useFavorites.js

import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

// Глобальный кэш и очередь запросов
const favoritesCache = new Map();
const requestQueue = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

export const useFavorites = () => {
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Функция для получения данных из кэша
  const getCachedData = useCallback((key) => {
    const cached = favoritesCache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }, []);

  // Функция для сохранения данных в кэш
  const setCachedData = useCallback((key, data) => {
    favoritesCache.set(key, {
      data,
      timestamp: Date.now()
    });
  }, []);

  // Загрузка избранного с сервера с кэшированием
  const loadFavorites = useCallback(async (force = false) => {
    const userProfile = localStorage.getItem('user_profile');
    if (!userProfile) {
      setFavorites({});
      return;
    }

    const cacheKey = 'favorites_list';
    
    // Если не форсируем обновление, пробуем взять из кэша
    if (!force) {
      const cached = getCachedData(cacheKey);
      if (cached) {
        setFavorites(cached);
        return;
      }
    }

    // Проверяем, нет ли уже активного запроса
    if (requestQueue.has(cacheKey)) {
      return;
    }

    setLoading(true);
    const requestPromise = axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/favorites/user`,
      { 
        headers: { 'user-id': JSON.parse(userProfile)._id },
        timeout: 10000
      }
    );

    requestQueue.set(cacheKey, requestPromise);

    try {
      const response = await requestPromise;
      
      if (response.data.success) {
        const serverFavorites = response.data.favorites.reduce((acc, apt) => {
          acc[apt._id] = true;
          return acc;
        }, {});
        
        setFavorites(serverFavorites);
        setLastUpdated(Date.now());
        
        // Сохраняем в кэш
        setCachedData(cacheKey, serverFavorites);
        localStorage.setItem('apartment_favorites', JSON.stringify(serverFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      
      // При ошибке используем локальные данные
      try {
        const localFavorites = localStorage.getItem('apartment_favorites');
        if (localFavorites) {
          const parsed = JSON.parse(localFavorites);
          setFavorites(parsed);
          setCachedData(cacheKey, parsed);
        }
      } catch (e) {
        console.error('Error loading local favorites:', e);
      }
    } finally {
      setLoading(false);
      requestQueue.delete(cacheKey);
    }
  }, [getCachedData, setCachedData]);

  // Переключение избранного с оптимистичным обновлением
  const toggleFavorite = useCallback(async (apartmentId) => {
    const userProfile = localStorage.getItem('user_profile');
    if (!userProfile) {
      throw new Error('USER_NOT_LOGGED_IN');
    }

    // Оптимистичное обновление
    const previousState = favorites[apartmentId] === true;
    const optimisticFavorites = { 
      ...favorites, 
      [apartmentId]: !previousState 
    };
    
    setFavorites(optimisticFavorites);
    setLoading(true);

    try {
      const profileData = JSON.parse(userProfile);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/favorites/toggle`,
        { apartmentId },
        { 
          headers: { 
            'user-id': profileData._id,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );
      
      if (response.data.success) {
        const actualFavorites = { 
          ...favorites, 
          [apartmentId]: response.data.isFavorite 
        };
        
        setFavorites(actualFavorites);
        setLastUpdated(Date.now());
        
        // Обновляем кэш
        setCachedData('favorites_list', actualFavorites);
        localStorage.setItem('apartment_favorites', JSON.stringify(actualFavorites));
        
        return response.data.isFavorite;
      }
      throw new Error('Server response error');
    } catch (error) {
      console.error('Error toggling favorite:', error);
      
      // Откатываем optimistic update при ошибке
      setFavorites(prev => ({
        ...prev,
        [apartmentId]: previousState
      }));
      
      throw error;
    } finally {
      setLoading(false);
    }
  }, [favorites, setCachedData]);

  // Проверка статуса избранного
  const isFavorite = useCallback((apartmentId) => {
    return favorites[apartmentId] === true;
  }, [favorites]);

  // Загружаем избранное при монтировании
  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // Периодическая синхронизация (реже - каждые 10 минут)
  useEffect(() => {
    const interval = setInterval(() => {
      // Синхронизируем только если прошло больше 5 минут с последнего обновления
      if (!lastUpdated || Date.now() - lastUpdated > 5 * 60 * 1000) {
        loadFavorites(true);
      }
    }, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [lastUpdated, loadFavorites]);

  return {
    favorites,
    loading,
    isFavorite,
    toggleFavorite,
    reloadFavorites: () => loadFavorites(true),
    lastUpdated
  };
};

