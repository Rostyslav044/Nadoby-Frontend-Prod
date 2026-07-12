// utils/profileUtils.js

// Функция для безопасного извлечения данных профиля
export const getSafeProfileData = (profile) => {
    if (!profile || typeof profile !== 'object') {
      return getDefaultProfileData();
    }
  
    try {
      return {
        _id: safeString(profile._id),
        name: safeString(profile.name),
        city: safeString(profile.city),
        phones: safeArray(profile.phones, 3),
        about: safeString(profile.about),
        email: safeString(profile.email),
        avatar: safeString(profile.avatar, "/default-avatar.jpg")
      };
    } catch (error) {
      console.error('Error parsing profile data:', error);
      return getDefaultProfileData();
    }
  };
  
  // Функция для получения данных по умолчанию
  export const getDefaultProfileData = () => ({
    _id: "",
    name: "",
    city: "",
    phones: ["", "", ""],
    about: "",
    email: "",
    avatar: "/default-avatar.jpg"
  });
  
  // Безопасное преобразование в строку
  export const safeString = (value, defaultValue = "") => {
    if (value === null || value === undefined) return defaultValue;
    return String(value);
  };
  
  // Безопасное преобразование в массив
  export const safeArray = (value, length = 3) => {
    if (!Array.isArray(value)) {
      return Array(length).fill("");
    }
    
    return value.map(item => safeString(item)).slice(0, length);
  };
  
  // Проверка, является ли значение примитивом (может быть отрендерено в React)
  export const isRenderable = (value) => {
    if (value === null || value === undefined) return true;
    const type = typeof value;
    return type === 'string' || 
           type === 'number' || 
           type === 'boolean' ||
           (Array.isArray(value) && value.every(isRenderable));
  };