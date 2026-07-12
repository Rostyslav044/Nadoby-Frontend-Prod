import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(false);

  const loadFavorites = async () => {
    const userProfile = localStorage.getItem('user_profile');
    if (!userProfile) {
      setFavorites({});
      return;
    }

    setLoading(true);
    try {
      const profileData = JSON.parse(userProfile);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/favorites/user`,
        {
          headers: { 'user-id': profileData._id },
          timeout: 10000
        }
      );
      
      if (response.data.success) {
        const serverFavorites = response.data.favorites.reduce((acc, apt) => {
          acc[apt._id] = true;
          return acc;
        }, {});
        
        setFavorites(serverFavorites);
        localStorage.setItem('apartment_favorites', JSON.stringify(serverFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      try {
        const localFavorites = localStorage.getItem('apartment_favorites');
        if (localFavorites) {
          setFavorites(JSON.parse(localFavorites));
        }
      } catch (e) {
        console.error('Error loading local favorites:', e);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (apartmentId) => {
    const userProfile = localStorage.getItem('user_profile');
    if (!userProfile) {
      throw new Error('USER_NOT_LOGGED_IN');
    }

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
        const updatedFavorites = { 
          ...favorites, 
          [apartmentId]: response.data.isFavorite 
        };
        
        setFavorites(updatedFavorites);
        localStorage.setItem('apartment_favorites', JSON.stringify(updatedFavorites));
        
        return response.data.isFavorite;
      }
      throw new Error('Server response error');
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (apartmentId) => favorites[apartmentId] === true;

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <FavoritesContext.Provider value={{
      favorites,
      loading,
      isFavorite,
      toggleFavorite,
      reloadFavorites: loadFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};