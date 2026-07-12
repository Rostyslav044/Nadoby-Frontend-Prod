'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const GoogleMapsContext = createContext();

export const useGoogleMaps = () => {
  const context = useContext(GoogleMapsContext);
  if (!context) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsProvider');
  }
  return context;
};

export const GoogleMapsProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    // Если Google Maps уже загружен
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    // Если скрипт уже загружается
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      const handleLoad = () => setIsLoaded(true);
      const handleError = () => setLoadError(new Error('Failed to load Google Maps'));
      
      existingScript.addEventListener('load', handleLoad);
      existingScript.addEventListener('error', handleError);
      
      return () => {
        existingScript.removeEventListener('load', handleLoad);
        existingScript.removeEventListener('error', handleError);
      };
    }

    // Загружаем скрипт
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log('Google Maps API loaded successfully');
      setIsLoaded(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load Google Maps API');
      setLoadError(new Error('Failed to load Google Maps'));
    };

    document.head.appendChild(script);

    return () => {
      // Не удаляем скрипт при размонтировании, так как он нужен другим компонентам
    };
  }, []);

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};