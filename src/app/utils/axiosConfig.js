// app/utils/axiosConfig.js
import axios from 'axios';

// Глобальная конфигурация axios
axios.defaults.timeout = 10000;

// Очередь запросов для избежания дублирования
const pendingRequests = new Map();

// Генерируем ключ для запроса
const generateRequestKey = (config) => {
  return `${config.method}-${config.url}-${JSON.stringify(config.params)}-${JSON.stringify(config.data)}`;
};

// Добавляем запрос в очередь
const addPendingRequest = (config) => {
  const key = generateRequestKey(config);
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key);
  }
  
  const controller = new AbortController();
  config.signal = controller.signal;
  pendingRequests.set(key, controller);
  return null;
};

// Удаляем запрос из очереди
const removePendingRequest = (config) => {
  const key = generateRequestKey(config);
  if (pendingRequests.has(key)) {
    pendingRequests.delete(key);
  }
};

// Интерцептор для запросов
axios.interceptors.request.use(
  (config) => {
    removePendingRequest(config); // Удаляем дублирующиеся запросы
    const controller = addPendingRequest(config);
    if (controller) {
      // Если запрос уже в процессе, отменяем новый
      throw new axios.Cancel('Duplicate request cancelled');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерцептор для ответов
axios.interceptors.response.use(
  (response) => {
    removePendingRequest(response.config);
    return response;
  },
  (error) => {
    removePendingRequest(error.config);
    
    if (error.response?.status === 429) {
      console.warn('Too many requests, implementing backoff...');
      // Можно показать уведомление пользователю
      if (typeof window !== 'undefined') {
        // Используем существующее уведомление вместо alert
        console.log('Слишком много запросов. Пожалуйста, подождите...');
      }
    }
    
    return Promise.reject(error);
  }
);

export default axios;