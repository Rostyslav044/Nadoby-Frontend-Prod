






// Этот компонент отвечает за успешное создание объявления об аренде жилья.
// После отправки формы он получает ответ от сервера с данными о добавленном
// объявлении и выводит сообщение

// 'use client';

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { LanguageProvider, useLanguage } from "@/app/LanguageContext";
// import FileUploadSlider from '@/app/components/FileUploadSlider';
// import MetroSelector from '@/app/components/MetroSelector';
// import InfoApartments from '@/app/components/InfoApartments';
// import PreviewDialog from '@/app/components/PreviewDialog';
// import {
//   Container, Typography, TextField, Select, MenuItem, Button,
//   FormControl, InputLabel, Box, CircularProgress, Snackbar, Alert, Stack
// } from '@mui/material';
// import Header from '@/app/components/Header';
// import { Provider, useSelector } from 'react-redux';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { store } from '@/app/store';
// import Head from 'next/head';
// import LoadingIndicator from '@/app/components/LoadingIndicator';

// // Динамически импортируем Google Maps только на клиенте
// let GoogleMap, Marker, Autocomplete;
// if (typeof window !== 'undefined') {
//   const googleMapsLib = require('@react-google-maps/api');
//   GoogleMap = googleMapsLib.GoogleMap;
//   Marker = googleMapsLib.Marker;
//   Autocomplete = googleMapsLib.Autocomplete;
// }

// const translations = {
//   ua: {
//     addTitle: 'Додати нове оголошення',
//     editTitle: 'Редагувати оголошення',
//     metaTitleAdd: 'Додати нове оголошення про оренду | NaDoby',
//     metaTitleEdit: 'Редагувати оголошення про оренду | NaDoby',
//     metaDescription: 'Додайте або відредагуйте оголошення про оренду житла. Квартири, готелі, будинки, сауни та інші варіанти проживання.',
//     categoryLabel: 'Категорія *',
//     categories: [
//       'Квартира', 'Готель', 'Готель для тварин',
//       'Хостел', 'Будинок', 'База відпочинку', 'Сауна/Лазня', 'Глемпінг',
//       'Санаторій/Пансіонат', 'Котедж для компаній', 'Коворкінг', 'Автокемпінг'
//     ],
//     objectNameLabel: 'Назва об\'єкта *',
//     objectNameHelper: 'Наприклад: Готель Затишок (максимум 59 символів)',
//     descriptionLabel: 'Опис *',
//     descriptionHelper: 'Мінімум 85 символів.',
//     cityLabel: 'Місто *',
//     cityPlaceholder: 'Введіть місто або населений пункт',
//     streetLabel: 'Вулиця *',
//     streetPlaceholder: 'Введіть вулицю',
//     manualStreetPrompt: 'Не знайшли вулицю? Введіть вручну',
//     googleStreetPrompt: 'Повернутися до пошуку вулиці через Google',
//     houseNumberLabel: 'Номер будинку *',
//     priceLabel: 'Ціна *',
//     districtLabel: 'Район *',
//     moveMarkerText: 'Ви можете переміщати маркер на карті для точного вказання місця!',
//     uploadPhotosText: 'Завантажте мінімум 3 фото',
//     previewButton: 'Попередній перегляд',
//     submitButton: 'Створити оголошення',
//     saveButton: 'Зберегти зміни',
//     successMessage: 'Оголошення успішно додано!',
//     updateMessage: 'Оголошення успішно оновлено!',
//     errorMessage: 'Будь ласка, заповніть всі обов\'язкові поля!',
//     minPhotosError: 'Завантажте мінімум 3 фотографії!',
//     serverError: 'Сталася помилка сервера',
//     requiredField: 'Це поле обов\'язкове',
//     maxCharsError: 'Максимум 59 символів',
//     loadingMessage: 'Завантаження даних...',
//     loadingGoogleMaps: 'Завантаження Google Maps...',
//     addressNotFound: 'Адресу не знайдено'
//   },
//   ru: {
//     addTitle: 'Добавить новое объявление',
//     editTitle: 'Редактировать объявление',
//     metaTitleAdd: 'Добавить новое объявление об аренде | NaDoby',
//     metaTitleEdit: 'Редактировать объявление об аренде | NaDoby',
//     metaDescription: 'Добавьте или отредактируйте объявление об аренде жилья. Квартиры, гостиницы, дома, сауны и другие варианты проживания.',
//     categoryLabel: 'Категория *',
//     categories: [
//       'Квартира', 'Гостиница', 'Отель для животных',
//       'Хостел', 'Дом', 'База отдыха', 'Сауна/Баня', 'Глэмпинг',
//       'Санаторий/Пансионат', 'Коттедж для компаний', 'Коворкинг', 'Автокемпинг'
//     ],
//     objectNameLabel: 'Название объекта *',
//     objectNameHelper: 'Например: Гостиница Уют (максимум 59 символов)',
//     descriptionLabel: 'Описание *',
//     descriptionHelper: 'Минимум 85 символов.',
//     cityLabel: 'Город *',
//     cityPlaceholder: 'Введите город или населенный пункт',
//     streetLabel: 'Улица *',
//     streetPlaceholder: 'Введите улицу',
//     manualStreetPrompt: 'Не нашли улицу? Введите вручную',
//     googleStreetPrompt: 'Вернуться к поиску улицы с помощью Google',
//     houseNumberLabel: 'Номер дома *',
//     priceLabel: 'Цена *',
//     districtLabel: 'Район *',
//     moveMarkerText: 'Вы можете двигать маркер на карте для точного указания местоположения!',
//     uploadPhotosText: 'Загрузите минимум 3 фото',
//     previewButton: 'Предпросмотр',
//     submitButton: 'Создать объявление',
//     saveButton: 'Сохранить изменения',
//     successMessage: 'Объявление успешно добавлено!',
//     updateMessage: 'Объявление успешно обновлено!',
//     errorMessage: 'Пожалуйста, заполните все обязательные поля!',
//     minPhotosError: 'Загрузите минимум 3 фотографии!',
//     serverError: 'Произошла ошибка сервера',
//     requiredField: 'Это поле обязательно',
//     maxCharsError: 'Максимум 59 символов',
//     loadingMessage: 'Загрузка данных...',
//     loadingGoogleMaps: 'Загрузка Google Maps...',
//     addressNotFound: 'Адрес не найден'
//   }
// };

// const CITIES_WITH_METRO = ['Київ', 'Харків', 'Дніпро', 'Киев', 'Харьков', 'Днепр'];

// // Ключ для сохранения черновика
// const DRAFT_STORAGE_KEY = 'apartment_form_draft';
// // Время жизни черновика (7 дней в миллисекундах)
// const DRAFT_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000; // 7 дней

// // Инициализационные данные для формы
// const initialFormData = {
//   city: '', street: '', district: '', metro: '', hasMetro: false,
//   description: '', price: '', houseNumber: '',
//   category: '', objectName: '', latitude: null, longitude: null,
//   originalCity: '', region: '',
// };

// const initialApartmentInfo = {
//   rooms: '',
//   beds: '',
//   size: '',
//   floor: '',
//   totalFloors: '',
//   checkIn: '',
//   checkOut: '',
//   minRent: '',
//   fullDayCheckIn: '',
//   smoking: '',
//   parties: '',
//   pets: '',
//   reportDocs: '',
//   deposit: '',
//   ageLimit: '',
//   name: '',
//   kidsAge: '',
//   conveniences: [],
//   phones: ['+380']
// };

// // Custom Hook для Google Maps
// const useGoogleMaps = () => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [loadError, setLoadError] = useState(null);

//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     // Проверяем, не загружен ли уже Google Maps API
//     if (window.google?.maps) {
//       setIsLoaded(true);
//       return;
//     }

//     // Проверяем, не загружается ли уже скрипт
//     const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
//     if (existingScript) {
//       existingScript.addEventListener('load', () => setIsLoaded(true));
//       existingScript.addEventListener('error', () => setLoadError('Не вдалося завантажити Google Maps'));
//       return;
//     }

//     const loadGoogleMaps = () => {
//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
//       script.async = true;
//       script.defer = true;
      
//       script.onload = () => {
//         setIsLoaded(true);
//       };
      
//       script.onerror = () => {
//         setLoadError('Не вдалося завантажити Google Maps');
//       };

//       document.head.appendChild(script);
//     };

//     loadGoogleMaps();
//   }, []);

//   return { isLoaded, loadError };
// };

// function AddApartmentForm() {
//   const { currentLanguage } = useLanguage();
//   const t = translations[currentLanguage];
//   const router = useRouter();
//   const { isLoaded: isGoogleMapsLoaded, loadError: googleMapsError } = useGoogleMaps();
  
//   const [uploadImages, setUploadImages] = useState([]);
//   const [formData, setFormData] = useState(initialFormData);
//   const [errors, setErrors] = useState({});
//   const [apartmentInfo, setApartmentInfo] = useState(initialApartmentInfo);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showManualStreetInput, setShowManualStreetInput] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [mapCenter, setMapCenter] = useState({ lat: 50.4501, lng: 30.5234 });
//   const [photoError, setPhotoError] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [apartmentId, setApartmentId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [cityInputValue, setCityInputValue] = useState('');
//   const [streetInputValue, setStreetInputValue] = useState('');

//   const cityAutocompleteRef = useRef(null);
//   const streetAutocompleteRef = useRef(null);
//   const infoRef = useRef();
//   const geocoderRef = useRef(null);
//   const profile = useSelector(state => state.auth.profile);
//   const searchParams = useSearchParams();

//   const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;

//   // Функция для сохранения черновика
//   const saveDraft = useCallback(() => {
//     if (isEditMode) return; // Не сохраняем черновик в режиме редактирования

//     const draft = {
//       formData,
//       apartmentInfo,
//       uploadImages,
//       cityInputValue,
//       streetInputValue,
//       selectedLocation,
//       mapCenter,
//       timestamp: Date.now()
//     };

//     try {
//       localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
//     } catch (error) {
//       console.error('Ошибка сохранения черновика:', error);
//     }
//   }, [formData, apartmentInfo, uploadImages, cityInputValue, streetInputValue, selectedLocation, mapCenter, isEditMode]);

//   // Функция для загрузки черновика
//   const loadDraft = useCallback(() => {
//     if (isEditMode) return; // Не загружаем черновик в режиме редактирования

//     try {
//       const draftStr = localStorage.getItem(DRAFT_STORAGE_KEY);
//       if (!draftStr) return;

//       const draft = JSON.parse(draftStr);
      
//       // Проверяем не устарел ли черновик
//       const draftAge = Date.now() - draft.timestamp;
//       if (draftAge > DRAFT_EXPIRY_TIME) {
//         localStorage.removeItem(DRAFT_STORAGE_KEY);
//         return;
//       }

//       // Восстанавливаем данные
//       setFormData(draft.formData || initialFormData);
//       setApartmentInfo(draft.apartmentInfo || initialApartmentInfo);
//       setUploadImages(draft.uploadImages || []);
//       setCityInputValue(draft.cityInputValue || '');
//       setStreetInputValue(draft.streetInputValue || '');
//       setSelectedLocation(draft.selectedLocation || null);
//       setMapCenter(draft.mapCenter || { lat: 50.4501, lng: 30.5234 });

//       // Восстанавливаем данные в InfoApartments компоненте
//       setTimeout(() => {
//         if (infoRef.current && infoRef.current.setData && draft.apartmentInfo) {
//           infoRef.current.setData(draft.apartmentInfo);
//         }
//       }, 100);

//       console.log('Черновик восстановлен');
//     } catch (error) {
//       console.error('Ошибка загрузки черновика:', error);
//       localStorage.removeItem(DRAFT_STORAGE_KEY);
//     }
//   }, [isEditMode]);

//   // Функция для очистки черновика
//   const clearDraft = useCallback(() => {
//     localStorage.removeItem(DRAFT_STORAGE_KEY);
//   }, []);

//   // Эффект для проверки режима редактирования
//   useEffect(() => {
//     const editId = searchParams?.get('edit');
//     if (editId) {
//       setIsEditMode(true);
//       setApartmentId(editId);
//       fetchApartmentData(editId);
//     } else {
//       // Загружаем черновик если не в режиме редактирования
//       loadDraft();
//       setIsInitialized(true);
//     }
//   }, [searchParams]);

//   // Эффект для сохранения черновика при изменении данных
//   useEffect(() => {
//     // Сохраняем черновик только если данные инициализированы и не в режиме редактирования
//     if (isInitialized && !isEditMode) {
//       const timer = setTimeout(() => {
//         saveDraft();
//       }, 1000); // Дебаунс 1 секунда

//       return () => clearTimeout(timer);
//     }
//   }, [formData, apartmentInfo, uploadImages, cityInputValue, streetInputValue, selectedLocation, mapCenter, isInitialized, isEditMode, saveDraft]);

//   // Эффект для сохранения черновика при закрытии страницы
//   useEffect(() => {
//     const handleBeforeUnload = (e) => {
//       if (!isEditMode && isInitialized) {
//         saveDraft();
//       }
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//       // Сохраняем при размонтировании компонента
//       if (!isEditMode && isInitialized) {
//         saveDraft();
//       }
//     };
//   }, [isEditMode, isInitialized, saveDraft]);

//   // Эффект для проверки фотографий
//   useEffect(() => {
//     if (uploadImages.length >= 3) setPhotoError(false);
//   }, [uploadImages]);

//   // Эффект для обновления местоположения
//   useEffect(() => {
//     if (!formData.street || !formData.houseNumber || !formData.city) return;
    
//     const timer = setTimeout(updateLocation, 500);
//     return () => clearTimeout(timer);
//   }, [formData.street, formData.houseNumber, formData.city]);

//   // Эффект для инициализации геокодера
//   useEffect(() => {
//     if (isGoogleMapsLoaded && window.google?.maps && !geocoderRef.current) {
//       geocoderRef.current = new window.google.maps.Geocoder();
//     }
//   }, [isGoogleMapsLoaded]);

//   const fetchApartmentData = async (id) => {
//     setIsLoading(true);
//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      
//       const response = await fetch(`${baseUrl}/api/v1/apartments/${id}`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const responseData = await response.json();
//       const apartmentData = responseData?.apartment;
      
//       if (!apartmentData) {
//         throw new Error('No apartment data received');
//       }

//       // Обновляем formData
//       const newFormData = {
//         city: apartmentData.city || '',
//         street: apartmentData.street || '',
//         district: apartmentData.district || '',
//         metro: apartmentData.metro || '',
//         hasMetro: apartmentData.hasMetro || false,
//         description: apartmentData.description || '',
//         price: apartmentData.price || '',
//         houseNumber: apartmentData.houseNumber || '',
//         category: apartmentData.category || '',
//         objectName: apartmentData.objectName || apartmentData.name || '',
//         latitude: apartmentData.latitude || null,
//         longitude: apartmentData.longitude || null,
//         originalCity: apartmentData.originalCity || '',
//         region: apartmentData.region || '',
//       };
      
//       setFormData(newFormData);
//       setCityInputValue(newFormData.city || '');
//       setStreetInputValue(newFormData.street || '');
//       setUploadImages(apartmentData.photos || []);
      
//       // Обновляем местоположение на карте
//       if (apartmentData.latitude && apartmentData.longitude) {
//         const location = {
//           lat: apartmentData.latitude,
//           lng: apartmentData.longitude
//         };
//         setSelectedLocation(location);
//         setMapCenter(location);
//       }

//       // Обновляем apartmentInfo
//       const newApartmentInfo = {
//         rooms: apartmentData.rooms || '',
//         beds: apartmentData.beds || '',
//         size: apartmentData.size || '',
//         floor: apartmentData.floor || '',
//         totalFloors: apartmentData.totalFloors || '',
//         checkIn: apartmentData.checkIn || '',
//         checkOut: apartmentData.checkOut || '',
//         minRent: apartmentData.minRent || '',
//         fullDayCheckIn: apartmentData.fullDayCheckIn || '',
//         smoking: apartmentData.smoking || '',
//         parties: apartmentData.parties || '',
//         pets: apartmentData.pets || '',
//         reportDocs: apartmentData.reportDocs || '',
//         deposit: apartmentData.deposit || '',
//         ageLimit: apartmentData.ageLimit || '',
//         name: apartmentData.name || '',
//         kidsAge: apartmentData.kidsAge || '',
//         conveniences: apartmentData.conveniences || [],
//         phones: apartmentData.phones || ['+380']
//       };
      
//       setApartmentInfo(newApartmentInfo);

//       setTimeout(() => {
//         if (infoRef.current && infoRef.current.setData) {
//           infoRef.current.setData(newApartmentInfo);
//         }
//         setIsInitialized(true);
//       }, 100);

//     } catch (error) {
//       console.error('Ошибка загрузки данных объявления:', error);
//       setSnackbarMessage('Не удалось загрузить данные для редактирования');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//       setIsInitialized(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCitySelect = () => {
//     if (!cityAutocompleteRef.current) return;
    
//     const place = cityAutocompleteRef.current.getPlace();
//     if (!place || !place.formatted_address) return;

//     // Извлекаем название населенного пункта
//     let localityName = "";
//     let region = "";
    
//     // Ищем любые населенные пункты
//     const locality = place.address_components?.find(c => 
//       c.types.includes('locality') || 
//       c.types.includes('administrative_area_level_2') ||
//       c.types.includes('sublocality') ||
//       c.types.includes('neighborhood')
//     );
    
//     // Ищем область
//     const regionComponent = place.address_components?.find(c => 
//       c.types.includes('administrative_area_level_1')
//     );

//     if (locality) {
//       localityName = locality.long_name;
//     } else {
//       // Fallback - берем первое слово из formatted_address
//       localityName = place.formatted_address.split(',')[0]?.trim() || place.name || "";
//     }
    
//     if (regionComponent) {
//       region = regionComponent.long_name;
//     }

//     // Нормализуем название
//     const normalizedLocality = normalizeLocalityName(localityName);
    
//     const cleanedLocality = normalizedLocality.trim().toLowerCase();
//     const hasMetro = CITIES_WITH_METRO.some(
//       c => c.trim().toLowerCase() === cleanedLocality
//     );
    
//     // Формируем полное название
//     const fullLocalityName = region && region !== normalizedLocality ? `${normalizedLocality}, ${region}` : normalizedLocality;
    
//     setFormData(prev => ({ 
//       ...prev, 
//       city: fullLocalityName,
//       originalCity: normalizedLocality,
//       region,
//       metro: '',
//       hasMetro
//     }));
    
//     setCityInputValue(fullLocalityName);
//     setErrors(prev => ({ ...prev, city: false, metro: false }));

//     // Обновляем карту, если есть координаты
//     if (place.geometry?.location) {
//       updateMapLocation({
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng()
//       });
//     }
//   };

//   const handleStreetSelect = () => {
//     if (!streetAutocompleteRef.current) return;
    
//     const place = streetAutocompleteRef.current.getPlace();
//     if (!place || !place.formatted_address) return;

//     // Извлекаем название улицы
//     let streetName = "";
    
//     // Ищем улицу (route)
//     const route = place.address_components?.find(c => 
//       c.types.includes('route')
//     );

//     if (route) {
//       streetName = route.long_name;
//     } else {
//       // Fallback - пытаемся найти улицу в formatted_address
//       const addressParts = place.formatted_address.split(',');
//       if (addressParts.length > 0) {
//         streetName = addressParts[0].trim();
//       } else {
//         streetName = place.name || "";
//       }
//     }

//     setFormData(prev => ({ ...prev, street: streetName }));
//     setStreetInputValue(streetName);
//     setErrors(prev => ({ ...prev, street: false }));

//     // Обновляем карту, если есть координаты
//     if (place.geometry?.location) {
//       updateMapLocation({
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng()
//       });
//     }
//   };

//   const normalizeLocalityName = (name) => {
//     if (!name) return '';
    
//     // Нормализуем названия
//     const nameMap = {
//       'киев': 'Київ',
//       'киеве': 'Київ',
//       'київ': 'Київ',
//       'київе': 'Київ',
//       'харьков': 'Харків',
//       'харков': 'Харків',
//       'харків': 'Харків',
//       'днепр': 'Дніпро',
//       'дніпро': 'Дніпро',
//       'днепропетровск': 'Дніпро',
//       'дніпропетровськ': 'Дніпро',
//       'львов': 'Львів',
//       'львів': 'Львів',
//       'одесса': 'Одеса',
//       'одеса': 'Одеса',
//       'запорожье': 'Запоріжжя',
//       'запоріжжя': 'Запоріжжя'
//     };
    
//     const lowerName = name.toLowerCase().trim();
    
//     // Проверяем мапу нормализации
//     for (const [key, value] of Object.entries(nameMap)) {
//       if (lowerName.includes(key)) {
//         return value;
//       }
//     }
    
//     // Если не нашли в мапе, возвращаем оригинал с заглавной буквы
//     return name.charAt(0).toUpperCase() + name.slice(1);
//   };

//   const handleMetroSelect = (metro) => {
//     setFormData(prev => ({ ...prev, metro }));
//     setErrors(prev => ({ ...prev, metro: false }));
//   };

//   const updateMapLocation = (location) => {
//     setSelectedLocation(location);
//     setMapCenter(location);
//     setFormData(prev => ({
//       ...prev,
//       latitude: location.lat,
//       longitude: location.lng
//     }));
//   };

//   const geocodeAddress = (address) => {
//     if (!geocoderRef.current || !address.trim()) return;

//     geocoderRef.current.geocode({ address }, (results, status) => {
//       if (status === 'OK' && results[0]) {
//         updateMapLocation({
//           lat: results[0].geometry.location.lat(),
//           lng: results[0].geometry.location.lng()
//         });
//       }
//     });
//   };

//   const updateLocation = () => {
//     if (formData.city && formData.street && formData.houseNumber) {
//       geocodeAddress(`${formData.street}, ${formData.houseNumber}, ${formData.city}`);
//     }
//   };

//   const toggleStreetInputMode = () => {
//     setShowManualStreetInput(prev => !prev);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
    
//     const fieldsToCapitalize = ['objectName', 'description', 'district'];
//     const processedValue = fieldsToCapitalize.includes(name) 
//       ? value.charAt(0).toUpperCase() + value.slice(1)
//       : value;
    
//     setFormData(prev => ({ ...prev, [name]: processedValue }));
//     setErrors(prev => ({ ...prev, [name]: false }));
//   };

//   const handleCityInputChange = (e) => {
//     const value = e.target.value;
//     setCityInputValue(value);
//     setFormData(prev => ({ ...prev, city: value }));
//     if (value.trim()) {
//       setErrors(prev => ({ ...prev, city: false }));
//     }
//   };

//   const handleStreetInputChange = (e) => {
//     const value = e.target.value;
//     setStreetInputValue(value);
//     setFormData(prev => ({ ...prev, street: value }));
//     if (value.trim()) {
//       setErrors(prev => ({ ...prev, street: false }));
//     }
//   };

//   const handleHouseNumberChange = (e) => {
//     const houseNumber = e.target.value;
//     setFormData(prev => ({ ...prev, houseNumber }));
//     setErrors(prev => ({ ...prev, houseNumber: false }));
//   };

//   const validateForm = () => {
//     const descriptionTooShort = formData.description.length < 85;
//     const cityHasMetro = CITIES_WITH_METRO.some(
//       city => city.toLowerCase() === formData.originalCity?.toLowerCase()
//     );

//     const newErrors = {
//       category: !formData.category,
//       objectName: !formData.objectName || formData.objectName.length > 59,
//       description: !formData.description || descriptionTooShort,
//       city: !formData.city,
//       price: !formData.price,
//       street: !formData.street,
//       houseNumber: !formData.houseNumber,
//       district: !formData.district,
//       metro: cityHasMetro && !formData.metro,
//     };
  
//     setErrors(newErrors);
//     return !Object.values(newErrors).some(Boolean);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (uploadImages.length < 3) {
//       setPhotoError(true);
//       setSnackbarMessage(t.minPhotosError);
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//       return;
//     }

//     const isFormValid = validateForm();
//     const isInfoValid = infoRef.current?.validate();

//     if (!isFormValid || !isInfoValid) {
//       setSnackbarMessage(t.errorMessage);
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        
//       const url = isEditMode 
//         ? `${baseUrl}/api/v1/apartments/update/${apartmentId}`
//         : `${baseUrl}/api/v1/apartments/add`;

//       const method = isEditMode ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: { 
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           ...apartmentInfo, 
//           ...formData, 
//           photos: uploadImages,
//           user_id: profile?._id || 'guest',
//         }),
//       });

//       const responseText = await response.text();
//       let responseData;
      
//       try {
//         responseData = JSON.parse(responseText);
//       } catch (e) {
//         console.error('Ошибка парсинга JSON:', e);
//         throw new Error('Неверный формат ответа от сервера: ' + responseText);
//       }

//       if (!response.ok) {
//         throw new Error(responseData.message || t.serverError);
//       }
      
//       setSnackbarMessage(isEditMode ? t.updateMessage : t.successMessage);
//       setSnackbarSeverity('success');
//       setSnackbarOpen(true);
      
//       // Очищаем черновик при успешной отправке
//       if (!isEditMode) {
//         clearDraft();
//       }
      
//       setTimeout(() => {
//         router.push('/my-listings');
//       }, 2000);
      
//       if (!isEditMode) {
//         setFormData(initialFormData);
//         setCityInputValue('');
//         setStreetInputValue('');
//         setUploadImages([]);
//         setApartmentInfo(initialApartmentInfo);
//         setSelectedLocation(null);
//         setMapCenter({ lat: 50.4501, lng: 30.5234 });
        
//         if (infoRef.current?.reset) {
//           infoRef.current.reset();
//         }
//       }
      
//     } catch (error) {
//       console.error('Error:', error);
//       setSnackbarMessage(error.message || t.serverError);
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handlePreview = () => {
//     const isFormValid = validateForm();
//     const isInfoValid = infoRef.current?.validate();
//     const hasEnoughPhotos = uploadImages.length >= 3;

//     setPhotoError(!hasEnoughPhotos);
    
//     if (!isFormValid || !isInfoValid || !hasEnoughPhotos) {
//       setSnackbarMessage(t.errorMessage);
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//       return;
//     }
//     setPreviewOpen(true);
//   };

//   const handleClosePreview = (shouldEdit) => {
//     setPreviewOpen(false);
//     if (!shouldEdit) {
//       handleSubmit({ preventDefault: () => {} });
//     }
//   };

//   // Показываем индикатор загрузки пока данные не инициализированы
//   if (isLoading || !isInitialized) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="80vh" flexDirection="column">
//         <CircularProgress size={60} />
//         <Typography variant="h6" sx={{ mt: 2 }}>
//           {t.loadingMessage}
//         </Typography>
//       </Box>
//     );
//   }

//   // Если Google Maps не загружен
//   if (!isGoogleMapsLoaded) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="80vh" flexDirection="column">
//         <CircularProgress size={60} />
//         <Typography variant="h6" sx={{ mt: 2 }}>
//           {t.loadingGoogleMaps}
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <>
//       {/* <Head>
//         <title>{isEditMode ? t.metaTitleEdit : t.metaTitleAdd}</title>
//         <meta name="description" content={t.metaDescription} />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head> */}

// <Head>
//   <title>{isEditMode ? t.metaTitleEdit : t.metaTitleAdd}</title>
//   <meta name="description" content={t.metaDescription} />
//   <meta name="viewport" content="width=device-width, initial-scale=1" />
//   <link rel="canonical" href="https://nadoby.com.ua/add-apartment" />
// </Head>

//       <Container maxWidth="md" sx={{ 
//         py: isMobile ? 2 : 4,
//         '& .MuiTextField-root, & .MuiFormControl-root': {
//           fontSize: isMobile ? '14px' : 'inherit'
//         }
//       }}>
//         <Typography variant={isMobile ? "h5" : "h4"} component="h1" align="center" gutterBottom>
//           {isEditMode ? t.editTitle : t.addTitle}
//         </Typography>

//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//           <FormControl fullWidth margin="normal" error={!!errors.category}>
//             <InputLabel>{t.categoryLabel}</InputLabel>
//             <Select
//               name="category"
//               value={formData.category || ''}
//               onChange={handleInputChange}
//               label={t.categoryLabel}
//             >
//               {t.categories.map((cat) => (
//                 <MenuItem key={cat} value={cat}>{cat}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <TextField
//             fullWidth
//             margin="normal"
//             size={isMobile ? "small" : "medium"}
//             name="objectName"
//             label={t.objectNameLabel}
//             value={formData.objectName || ''}
//             onChange={handleInputChange}
//             error={!!errors.objectName}
//             helperText={
//               errors.objectName 
//                 ? formData.objectName?.length > 59 
//                   ? t.maxCharsError 
//                   : t.requiredField
//                 : t.objectNameHelper
//             }
//           />

//           <TextField
//             fullWidth
//             margin="normal"
//             size={isMobile ? "small" : "medium"}
//             name="description"
//             label={t.descriptionLabel}
//             multiline
//             rows={4}
//             value={formData.description}
//             onChange={handleInputChange}
//             error={!!errors.description}
//             helperText={errors.description ? t.descriptionHelper : ''}
//           />

//           {/* Поле населенного пункта с Google Places Autocomplete */}
//           <Box margin="normal" sx={{ mt: 3 }}>
//             <Typography variant="body2" sx={{ mb: 1, color: 'rgba(0, 0, 0, 0.6)' }}>
//               {t.cityLabel}
//             </Typography>
//             {isGoogleMapsLoaded && (
//               <Autocomplete
//                 onLoad={(autocomplete) => {
//                   cityAutocompleteRef.current = autocomplete;
//                 }}
//                 onPlaceChanged={handleCitySelect}
//                 options={{
//                   componentRestrictions: { country: "ua" },
//                   fields: ["address_components", "geometry", "formatted_address", "name"],
//                   types: ["geocode", "establishment"],
//                   language: currentLanguage === "ua" ? "uk" : "ru"
//                 }}
//               >
//                 <TextField
//                   fullWidth
//                   size={isMobile ? "small" : "medium"}
//                   placeholder={t.cityPlaceholder}
//                   value={cityInputValue}
//                   onChange={handleCityInputChange}
//                   error={!!errors.city}
//                   helperText={errors.city ? t.requiredField : ''}
//                 />
//               </Autocomplete>
//             )}
//           </Box>

//           <MetroSelector
//             city={formData.originalCity}
//             onMetroSelect={handleMetroSelect}
//             error={!!errors.metro}
//             show={formData.hasMetro}
//             value={formData.metro}
//           />

//           {/* Поле улицы с Google Places Autocomplete или ручным вводом */}
//           <Box margin="normal" sx={{ mt: 3 }}>
//             {!showManualStreetInput ? (
//               <>
//                 <Typography variant="body2" sx={{ mb: 1, color: 'rgba(0, 0, 0, 0.6)' }}>
//                   {t.streetLabel}
//                 </Typography>
//                 {isGoogleMapsLoaded && (
//                   <Autocomplete
//                     onLoad={(autocomplete) => {
//                       streetAutocompleteRef.current = autocomplete;
//                     }}
//                     onPlaceChanged={handleStreetSelect}
//                     options={{
//                       componentRestrictions: { country: "ua" },
//                       fields: ["address_components", "geometry", "formatted_address", "name"],
//                       types: ["geocode"],
//                       language: currentLanguage === "ua" ? "uk" : "ru"
//                     }}
//                   >
//                     <TextField
//                       fullWidth
//                       size={isMobile ? "small" : "medium"}
//                       placeholder={t.streetPlaceholder}
//                       value={streetInputValue}
//                       onChange={handleStreetInputChange}
//                       error={!!errors.street}
//                       helperText={errors.street ? t.requiredField : ''}
//                     />
//                   </Autocomplete>
//                 )}
//                 <Button
//                   variant="text"
//                   size={isMobile ? "small" : "medium"}
//                   sx={{
//                     textTransform: 'none',
//                     color: '#1976d2',
//                     mt: 1,
//                     '&:hover': {
//                       backgroundColor: 'transparent',
//                       textDecoration: 'underline',
//                     },
//                   }}
//                   onClick={toggleStreetInputMode}
//                 >
//                   {t.manualStreetPrompt}
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <TextField
//                   fullWidth
//                   label={t.streetLabel}
//                   size={isMobile ? "small" : "medium"}
//                   name="street"
//                   value={streetInputValue}
//                   onChange={handleStreetInputChange}
//                   error={!!errors.street}
//                   helperText={errors.street ? t.requiredField : ''}
//                   placeholder={t.streetLabel}
//                 />
//                 <Button
//                   variant="text"
//                   size={isMobile ? "small" : "medium"}
//                   sx={{
//                     textTransform: 'none',
//                     color: '#1976d2',
//                     mt: 1,
//                     '&:hover': {
//                       backgroundColor: 'transparent',
//                       textDecoration: 'underline',
//                     },
//                   }}
//                   onClick={toggleStreetInputMode}
//                 >
//                   {t.googleStreetPrompt}
//                 </Button>
//               </>
//             )}
//           </Box>

//           <Box sx={{ mt: 2 }}>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 200, mb: 2 }}>
//               <TextField 
//                 fullWidth 
//                 name="houseNumber" 
//                 size={isMobile ? "small" : "medium"}
//                 label={t.houseNumberLabel} 
//                 value={formData.houseNumber} 
//                 onChange={handleHouseNumberChange} 
//                 error={!!errors.houseNumber} 
//                 helperText={errors.houseNumber ? t.requiredField : ""} 
//               />
//               <TextField 
//                 fullWidth 
//                 name="price" 
//                 label={t.priceLabel} 
//                 type="number" 
//                 size={isMobile ? "small" : "medium"}
//                 value={formData.price} 
//                 onChange={handleInputChange} 
//                 error={!!errors.price} 
//                 helperText={errors.price ? t.requiredField : ""} 
//               />
//             </Box>
//           </Box>

//           {selectedLocation && isGoogleMapsLoaded && GoogleMap && (
//             <Box sx={{ height: '300px', width: '100%', mt: 2 }}>
//               <GoogleMap
//                 mapContainerStyle={{ width: '100%', height: '100%' }}
//                 center={mapCenter}
//                 zoom={17}
//               >
//                 <Marker
//                   position={selectedLocation}
//                   draggable
//                   onDragEnd={(e) => {
//                     updateMapLocation({
//                       lat: e.latLng.lat(),
//                       lng: e.latLng.lng()
//                     });
//                   }}
//                 />
//               </GoogleMap>
//               <Box sx={{ mt: 1.5, mb: 0.5, py: 0.5, textAlign: 'center' }}>
//                 <Typography variant="body2" sx={{ color: '#ff5722' }}>
//                   {t.moveMarkerText}
//                 </Typography>
//               </Box>
//             </Box>
//           )}

//           <TextField
//             fullWidth
//             margin="normal"
//             size={isMobile ? "small" : "medium"}
//             name="district"
//             label={t.districtLabel}
//             placeholder={t.districtLabel}
//             value={formData.district}
//             onChange={handleInputChange}
//             error={!!errors.district}
//             helperText={errors.district ? t.requiredField : ''}
//             sx={{ maxWidth: 200, mt: 8 }}
//           />

//           <Box sx={{ 
//             mt: 3, 
//             borderRadius: 2,
//             border: photoError ? '1px solid red' : 'none'
//           }}>
//             <FileUploadSlider 
//               photos={uploadImages}
//               setUploadImages={setUploadImages}
//               editable={true}
//               onPhotosChange={(newPhotos) => {
//                 setPhotoError(newPhotos.length < 3);
//               }}
//             />
//             {photoError && (
//               <Typography color="error" variant="body2" sx={{ mt: 1 }}>
//                 {t.uploadPhotosText}
//               </Typography>
//             )}
//           </Box>

//           <InfoApartments 
//             ref={infoRef} 
//             onDataChange={setApartmentInfo}
//             initialData={apartmentInfo}
//           />

//           <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
//             <Button variant="outlined" size="large" onClick={handlePreview}>
//               {t.previewButton}
//             </Button>
//             <Button 
//               variant="contained" 
//               size="large" 
//               type="submit" 
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? <CircularProgress size={24} /> : 
//                 (isEditMode ? t.saveButton : t.submitButton)}
//             </Button>
//           </Stack>
//         </Box>

//         <PreviewDialog
//           open={previewOpen}
//           onClose={handleClosePreview}
//           formData={formData}
//           uploudImages={uploadImages}
//           apartmentInfo={apartmentInfo}
//           photoError={photoError}
//         />

//         <Snackbar 
//           open={snackbarOpen} 
//           autoHideDuration={6000} 
//           onClose={() => setSnackbarOpen(false)}
//         >
//           <Alert 
//             onClose={() => setSnackbarOpen(false)} 
//             severity={snackbarSeverity}
//             sx={{ width: '100%' }}
//           >
//             {snackbarMessage}
//           </Alert>
//         </Snackbar>
//       </Container>
//     </>
//   );
// }

// // Главный компонент страницы с провайдерами
// export default function AddApartment() {
//   return (
//     <Provider store={store}>
//       <LanguageProvider>
//         <Header/>
//         <AddApartmentForm />
//       </LanguageProvider>
//     </Provider>
//   );
// }



// Этот компонент отвечает за успешное создание объявления об аренде жилья.
// После отправки формы он получает ответ от сервера с данными о добавленном
// объявлении и выводит сообщение

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LanguageProvider, useLanguage } from "@/app/LanguageContext";
import FileUploadSlider from '@/app/components/FileUploadSlider';
import MetroSelector from '@/app/components/MetroSelector';
import InfoApartments from '@/app/components/InfoApartments';
import PreviewDialog from '@/app/components/PreviewDialog';
import { DISTRICTS_DATA, getCityKey, getDistrictName, isKyiv } 
from '@/app/components/DistrictsData';
import {
  Container, Typography, TextField, Select, MenuItem, Button,
  FormControl, InputLabel, Box, CircularProgress, Snackbar, Alert, Stack,
  Autocomplete as MuiAutocomplete
} from '@mui/material';
import Header from '@/app/components/Header';
import { Provider, useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import { store } from '@/app/store';
import Head from 'next/head';
import LoadingIndicator from '@/app/components/LoadingIndicator';

// Динамически импортируем Google Maps только на клиенте
let GoogleMap, Marker, Autocomplete;
if (typeof window !== 'undefined') {
  const googleMapsLib = require('@react-google-maps/api');
  GoogleMap = googleMapsLib.GoogleMap;
  Marker = googleMapsLib.Marker;
  Autocomplete = googleMapsLib.Autocomplete;
}

const translations = {
  ua: {
    addTitle: 'Додати нове оголошення-безкоштовно',
    editTitle: 'Редагувати оголошення',
    metaTitleAdd: 'Додати нове оголошення про оренду | NaDoby',
    metaTitleEdit: 'Редагувати оголошення про оренду | NaDoby',
    metaDescription: 'Додайте або відредагуйте оголошення про оренду житла. Квартири, готелі, будинки, сауни та інші варіанти проживання.',
    categoryLabel: 'Категорія *',
    categories: [
      'Квартира', 'Готель', 'Готель для тварин',
      'Хостел', 'Будинок', 'База відпочинку', 'Сауна/Лазня', 'Глемпінг',
      'Санаторій/Пансіонат', 'Котедж для компаній', 'Коворкінг', 'Автокемпінг'
    ],
    objectNameLabel: 'Назва об\'єкта *',
    objectNameHelper: 'Наприклад: Готель Затишок (максимум 59 символів)',
    descriptionLabel: 'Опис *',
    descriptionHelper: 'Мінімум 85 символів.',
    cityLabel: 'Місто *',
    cityPlaceholder: 'Введіть місто або населений пункт',
    streetLabel: 'Вулиця *',
    streetPlaceholder: 'Введіть вулицю',
    manualStreetPrompt: 'Не знайшли вулицю? Введіть вручну',
    googleStreetPrompt: 'Повернутися до пошуку вулиці через Google',
    houseNumberLabel: 'Номер будинку *',
    priceLabel: 'Ціна *',
    districtLabel: 'Район *',
    moveMarkerText: 'Ви можете переміщати маркер на карті для точного вказання місця!',
    uploadPhotosText: 'Завантажте мінімум 3 фото',
    previewButton: 'Попередній перегляд',
    submitButton: 'Створити оголошення',
    saveButton: 'Зберегти зміни',
    successMessage: 'Оголошення успішно додано!',
    updateMessage: 'Оголошення успішно оновлено!',
    errorMessage: 'Будь ласка, заповніть всі обов\'язкові поля!',
    minPhotosError: 'Завантажте мінімум 3 фотографії!',
    serverError: 'Сталася помилка сервера',
    requiredField: 'Це поле обов\'язкове',
    maxCharsError: 'Максимум 59 символів',
    loadingMessage: 'Завантаження даних...',
    loadingGoogleMaps: 'Завантаження Google Maps...',
    addressNotFound: 'Адресу не знайдено'
  },
  ru: {
    addTitle: 'Добавить новое объявление-бесплатно',
    editTitle: 'Редактировать объявление',
    metaTitleAdd: 'Добавить новое объявление об аренде | NaDoby',
    metaTitleEdit: 'Редактировать объявление об аренде | NaDoby',
    metaDescription: 'Добавьте или отредактируйте объявление об аренде жилья. Квартиры, гостиницы, дома, сауны и другие варианты проживания.',
    categoryLabel: 'Категория *',
    categories: [
      'Квартира', 'Гостиница', 'Отель для животных',
      'Хостел', 'Дом', 'База отдыха', 'Сауна/Баня', 'Глэмпинг',
      'Санаторий/Пансионат', 'Коттедж для компаний', 'Коворкинг', 'Автокемпинг'
    ],
    objectNameLabel: 'Название объекта *',
    objectNameHelper: 'Например: Гостиница Уют (максимум 59 символов)',
    descriptionLabel: 'Описание *',
    descriptionHelper: 'Минимум 85 символов.',
    cityLabel: 'Город *',
    cityPlaceholder: 'Введите город или населенный пункт',
    streetLabel: 'Улица *',
    streetPlaceholder: 'Введите улицу',
    manualStreetPrompt: 'Не нашли улицу? Введите вручную',
    googleStreetPrompt: 'Вернуться к поиску улицы с помощью Google',
    houseNumberLabel: 'Номер дома *',
    priceLabel: 'Цена *',
    districtLabel: 'Район *',
    moveMarkerText: 'Вы можете двигать маркер на карте для точного указания местоположения!',
    uploadPhotosText: 'Загрузите минимум 3 фото',
    previewButton: 'Предпросмотр',
    submitButton: 'Создать объявление',
    saveButton: 'Сохранить изменения',
    successMessage: 'Объявление успешно добавлено!',
    updateMessage: 'Объявление успешно обновлено!',
    errorMessage: 'Пожалуйста, заполните все обязательные поля!',
    minPhotosError: 'Загрузите минимум 3 фотографии!',
    serverError: 'Произошла ошибка сервера',
    requiredField: 'Это поле обязательно',
    maxCharsError: 'Максимум 59 символов',
    loadingMessage: 'Загрузка данных...',
    loadingGoogleMaps: 'Загрузка Google Maps...',
    addressNotFound: 'Адрес не найден'
  }
};

const CITIES_WITH_METRO = ['Київ', 'Харків', 'Дніпро', 'Киев', 'Харьков', 'Днепр'];

// Ключ для сохранения черновика
const DRAFT_STORAGE_KEY = 'apartment_form_draft';
// Время жизни черновика (7 дней в миллисекундах)
const DRAFT_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000; // 7 дней

// Инициализационные данные для формы
const initialFormData = {
  city: '', street: '', district: '', metro: '', hasMetro: false,
  description: '', price: '', houseNumber: '',
  category: '', objectName: '', latitude: null, longitude: null,
  originalCity: '', region: '',
};

const initialApartmentInfo = {
  rooms: '',
  beds: '',
  size: '',
  floor: '',
  totalFloors: '',
  checkIn: '',
  checkOut: '',
  minRent: '',
  fullDayCheckIn: '',
  smoking: '',
  parties: '',
  pets: '',
  reportDocs: '',
  deposit: '',
  ageLimit: '',
  name: '',
  kidsAge: '',
  conveniences: [],
  phones: ['+380']
};

// Custom Hook для Google Maps
const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Проверяем, не загружен ли уже Google Maps API
    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    // Проверяем, не загружается ли уже скрипт
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => setIsLoaded(true));
      existingScript.addEventListener('error', () => setLoadError('Не вдалося завантажити Google Maps'));
      return;
    }

    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        setIsLoaded(true);
      };
      
      script.onerror = () => {
        setLoadError('Не вдалося завантажити Google Maps');
      };

      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  return { isLoaded, loadError };
};

function AddApartmentForm() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  const router = useRouter();
  const { isLoaded: isGoogleMapsLoaded, loadError: googleMapsError } = useGoogleMaps();
  
  const [uploadImages, setUploadImages] = useState([]);
  const [previewPhotos, setPreviewPhotos] = useState([]); // ДОБАВЛЕНО: для фото в предпросмотре
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [apartmentInfo, setApartmentInfo] = useState(initialApartmentInfo);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showManualStreetInput, setShowManualStreetInput] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 50.4501, lng: 30.5234 });
  const [photoError, setPhotoError] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [apartmentId, setApartmentId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [cityInputValue, setCityInputValue] = useState('');
  const [streetInputValue, setStreetInputValue] = useState('');
  
  const cityAutocompleteRef = useRef(null);
  const streetAutocompleteRef = useRef(null);
  const infoRef = useRef();
  const geocoderRef = useRef(null);
  const fileUploadSliderRef = useRef(null); // ДОБАВЛЕНО: ref для FileUploadSlider
  const profile = useSelector(state => state.auth.profile);
  const searchParams = useSearchParams();

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;

  // Функция для сохранения черновика
  const saveDraft = useCallback(() => {
    if (isEditMode) return; // Не сохраняем черновик в режиме редактирования

    const draft = {
      formData,
      apartmentInfo,
      uploadImages,
      cityInputValue,
      streetInputValue,
      selectedLocation,
      mapCenter,
      timestamp: Date.now()
    };

    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch (error) {
      console.error('Ошибка сохранения черновика:', error);
    }
  }, [formData, apartmentInfo, uploadImages, cityInputValue, streetInputValue, selectedLocation, mapCenter, isEditMode]);

  // Функция для загрузки черновика
  const loadDraft = useCallback(() => {
    if (isEditMode) return; // Не загружаем черновик в режиме редактирования

    try {
      const draftStr = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (!draftStr) return;

      const draft = JSON.parse(draftStr);
      
      // Проверяем не устарел ли черновик
      const draftAge = Date.now() - draft.timestamp;
      if (draftAge > DRAFT_EXPIRY_TIME) {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
        return;
      }

      // Восстанавливаем данные
      setFormData(draft.formData || initialFormData);
      setApartmentInfo(draft.apartmentInfo || initialApartmentInfo);
      setUploadImages(draft.uploadImages || []);
      setCityInputValue(draft.cityInputValue || '');
      setStreetInputValue(draft.streetInputValue || '');
      setSelectedLocation(draft.selectedLocation || null);
      setMapCenter(draft.mapCenter || { lat: 50.4501, lng: 30.5234 });

      // Восстанавливаем данные в InfoApartments компоненте
      setTimeout(() => {
        if (infoRef.current && infoRef.current.setData && draft.apartmentInfo) {
          infoRef.current.setData(draft.apartmentInfo);
        }
      }, 100);

      console.log('Черновик восстановлен');
    } catch (error) {
      console.error('Ошибка загрузки черновика:', error);
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    }
  }, [isEditMode]);

  // Функция для очистки черновика
  const clearDraft = useCallback(() => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  }, []);

  // Эффект для проверки режима редактирования
  useEffect(() => {
    const editId = searchParams?.get('edit');
    if (editId) {
      setIsEditMode(true);
      setApartmentId(editId);
      fetchApartmentData(editId);
    } else {
      // Загружаем черновик если не в режиме редактирования
      loadDraft();
      setIsInitialized(true);
    }
  }, [searchParams]);

  // Эффект для сохранения черновика при изменении данных
  useEffect(() => {
    // Сохраняем черновик только если данные инициализированы и не в режиме редактирования
    if (isInitialized && !isEditMode) {
      const timer = setTimeout(() => {
        saveDraft();
      }, 1000); // Дебаунс 1 секунда

      return () => clearTimeout(timer);
    }
  }, [formData, apartmentInfo, uploadImages, cityInputValue, streetInputValue, selectedLocation, mapCenter, isInitialized, isEditMode, saveDraft]);

  // Эффект для сохранения черновика при закрытии страницы
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isEditMode && isInitialized) {
        saveDraft();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Сохраняем при размонтировании компонента
      if (!isEditMode && isInitialized) {
        saveDraft();
      }
    };
  }, [isEditMode, isInitialized, saveDraft]);

  // Эффект для проверки фотографий
  useEffect(() => {
    if (uploadImages.length >= 3) setPhotoError(false);
  }, [uploadImages]);

  // Эффект для обновления местоположения
  useEffect(() => {
    if (!formData.street || !formData.houseNumber || !formData.city) return;
    
    const timer = setTimeout(updateLocation, 500);
    return () => clearTimeout(timer);
  }, [formData.street, formData.houseNumber, formData.city]);

  // Эффект для инициализации геокодера
  useEffect(() => {
    if (isGoogleMapsLoaded && window.google?.maps && !geocoderRef.current) {
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, [isGoogleMapsLoaded]);

  const fetchApartmentData = async (id) => {
    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      
      const response = await fetch(`${baseUrl}/api/v1/apartments/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseData = await response.json();
      const apartmentData = responseData?.apartment;
      
      if (!apartmentData) {
        throw new Error('No apartment data received');
      }

      // Обновляем formData
      const newFormData = {
        city: apartmentData.city || '',
        street: apartmentData.street || '',
        district: apartmentData.district || '',
        metro: apartmentData.metro || '',
        hasMetro: apartmentData.hasMetro || false,
        description: apartmentData.description || '',
        price: apartmentData.price || '',
        houseNumber: apartmentData.houseNumber || '',
        category: apartmentData.category || '',
        objectName: apartmentData.objectName || apartmentData.name || '',
        latitude: apartmentData.latitude || null,
        longitude: apartmentData.longitude || null,
        originalCity: apartmentData.originalCity || '',
        region: apartmentData.region || '',
      };
      
      setFormData(newFormData);
      setCityInputValue(newFormData.city || '');
      setStreetInputValue(newFormData.street || '');
      setUploadImages(apartmentData.photos || []);
      
      // Обновляем местоположение на карте
      if (apartmentData.latitude && apartmentData.longitude) {
        const location = {
          lat: apartmentData.latitude,
          lng: apartmentData.longitude
        };
        setSelectedLocation(location);
        setMapCenter(location);
      }

      // Обновляем apartmentInfo
      const newApartmentInfo = {
        rooms: apartmentData.rooms || '',
        beds: apartmentData.beds || '',
        size: apartmentData.size || '',
        floor: apartmentData.floor || '',
        totalFloors: apartmentData.totalFloors || '',
        checkIn: apartmentData.checkIn || '',
        checkOut: apartmentData.checkOut || '',
        minRent: apartmentData.minRent || '',
        fullDayCheckIn: apartmentData.fullDayCheckIn || '',
        smoking: apartmentData.smoking || '',
        parties: apartmentData.parties || '',
        pets: apartmentData.pets || '',
        reportDocs: apartmentData.reportDocs || '',
        deposit: apartmentData.deposit || '',
        ageLimit: apartmentData.ageLimit || '',
        name: apartmentData.name || '',
        kidsAge: apartmentData.kidsAge || '',
        conveniences: apartmentData.conveniences || [],
        phones: apartmentData.phones || ['+380']
      };
      
      setApartmentInfo(newApartmentInfo);

      setTimeout(() => {
        if (infoRef.current && infoRef.current.setData) {
          infoRef.current.setData(newApartmentInfo);
        }
        setIsInitialized(true);
      }, 100);

    } catch (error) {
      console.error('Ошибка загрузки данных объявления:', error);
      setSnackbarMessage('Не удалось загрузить данные для редактирования');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setIsInitialized(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCitySelect = () => {
    if (!cityAutocompleteRef.current) return;
    
    const place = cityAutocompleteRef.current.getPlace();
    if (!place || !place.formatted_address) return;

    // Извлекаем название населенного пункта
    let localityName = "";
    let region = "";
    
    // Ищем любые населенные пункты
    const locality = place.address_components?.find(c => 
      c.types.includes('locality') || 
      c.types.includes('administrative_area_level_2') ||
      c.types.includes('sublocality') ||
      c.types.includes('neighborhood')
    );
    
    // Ищем область
    const regionComponent = place.address_components?.find(c => 
      c.types.includes('administrative_area_level_1')
    );

    if (locality) {
      localityName = locality.long_name;
    } else {
      // Fallback - берем первое слово из formatted_address
      localityName = place.formatted_address.split(',')[0]?.trim() || place.name || "";
    }
    
    if (regionComponent) {
      region = regionComponent.long_name;
    }

    // Нормализуем название
    const normalizedLocality = normalizeLocalityName(localityName);
    
    const cleanedLocality = normalizedLocality.trim().toLowerCase();
    const hasMetro = CITIES_WITH_METRO.some(
      c => c.trim().toLowerCase() === cleanedLocality
    );
    
    // Формируем полное название
    const fullLocalityName = region && region !== normalizedLocality ? `${normalizedLocality}, ${region}` : normalizedLocality;
    
    setFormData(prev => ({ 
      ...prev, 
      city: fullLocalityName,
      originalCity: normalizedLocality,
      region,
      metro: '',
      hasMetro
    }));
    
    setCityInputValue(fullLocalityName);
    setErrors(prev => ({ ...prev, city: false, metro: false }));

    // Обновляем карту, если есть координаты
    if (place.geometry?.location) {
      updateMapLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    }
  };

  const handleStreetSelect = () => {
    if (!streetAutocompleteRef.current) return;
    
    const place = streetAutocompleteRef.current.getPlace();
    if (!place || !place.formatted_address) return;

    // Извлекаем название улицы
    let streetName = "";
    
    // Ищем улицу (route)
    const route = place.address_components?.find(c => 
      c.types.includes('route')
    );

    if (route) {
      streetName = route.long_name;
    } else {
      // Fallback - пытаемся найти улицу в formatted_address
      const addressParts = place.formatted_address.split(',');
      if (addressParts.length > 0) {
        streetName = addressParts[0].trim();
      } else {
        streetName = place.name || "";
      }
    }

    setFormData(prev => ({ ...prev, street: streetName }));
    setStreetInputValue(streetName);
    setErrors(prev => ({ ...prev, street: false }));

    // Обновляем карту, если есть координаты
    if (place.geometry?.location) {
      updateMapLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    }
  };

  const normalizeLocalityName = (name) => {
    if (!name) return '';
    
    // Нормализуем названия
    const nameMap = {
      'киев': 'Київ',
      'киеве': 'Київ',
      'київ': 'Київ',
      'київе': 'Київ',
      'харьков': 'Харків',
      'харков': 'Харків',
      'харків': 'Харків',
      'днепр': 'Дніпро',
      'дніпро': 'Дніпро',
      'днепропетровск': 'Дніпро',
      'дніпропетровськ': 'Дніпро',
      'львов': 'Львів',
      'львів': 'Львів',
      'одесса': 'Одеса',
      'одеса': 'Одеса',
      'запорожье': 'Запоріжжя',
      'запоріжжя': 'Запоріжжя'
    };
    
    const lowerName = name.toLowerCase().trim();
    
    // Проверяем мапу нормализации
    for (const [key, value] of Object.entries(nameMap)) {
      if (lowerName.includes(key)) {
        return value;
      }
    }
    
    // Если не нашли в мапе, возвращаем оригинал с заглавной буквы
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleMetroSelect = (metro) => {
    setFormData(prev => ({ ...prev, metro }));
    setErrors(prev => ({ ...prev, metro: false }));
  };

  const updateMapLocation = (location) => {
    setSelectedLocation(location);
    setMapCenter(location);
    setFormData(prev => ({
      ...prev,
      latitude: location.lat,
      longitude: location.lng
    }));
  };

  const geocodeAddress = (address) => {
    if (!geocoderRef.current || !address.trim()) return;

    geocoderRef.current.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        updateMapLocation({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        });
      }
    });
  };

  const updateLocation = () => {
    if (formData.city && formData.street && formData.houseNumber) {
      geocodeAddress(`${formData.street}, ${formData.houseNumber}, ${formData.city}`);
    }
  };

  const toggleStreetInputMode = () => {
    setShowManualStreetInput(prev => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    const fieldsToCapitalize = ['objectName', 'description', 'district'];
    const processedValue = fieldsToCapitalize.includes(name) 
      ? value.charAt(0).toUpperCase() + value.slice(1)
      : value;
    
    setFormData(prev => ({ ...prev, [name]: processedValue }));
    setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleCityInputChange = (e) => {
    const value = e.target.value;
    setCityInputValue(value);
    setFormData(prev => ({ ...prev, city: value }));
    if (value.trim()) {
      setErrors(prev => ({ ...prev, city: false }));
    }
  };

  const handleStreetInputChange = (e) => {
    const value = e.target.value;
    setStreetInputValue(value);
    setFormData(prev => ({ ...prev, street: value }));
    if (value.trim()) {
      setErrors(prev => ({ ...prev, street: false }));
    }
  };

  const handleHouseNumberChange = (e) => {
    const houseNumber = e.target.value;
    setFormData(prev => ({ ...prev, houseNumber }));
    setErrors(prev => ({ ...prev, houseNumber: false }));
  };

  const validateForm = () => {
    const descriptionTooShort = formData.description.length < 85;
    const cityHasMetro = CITIES_WITH_METRO.some(
      city => city.toLowerCase() === formData.originalCity?.toLowerCase()
    );

    const newErrors = {
      category: !formData.category,
      objectName: !formData.objectName || formData.objectName.length > 59,
      description: !formData.description || descriptionTooShort,
      city: !formData.city,
      price: !formData.price,
      street: !formData.street,
      houseNumber: !formData.houseNumber,
      district: isKyiv(formData.originalCity || formData.city) ? !formData.district : false,
      metro: cityHasMetro && !formData.metro,
    };
  
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };


  // Добавь эту функцию перед handleSubmit
const checkAndRotatePhotosBeforeSubmit = async () => {
  if (!fileUploadSliderRef.current) return null;
  
  const rotations = fileUploadSliderRef.current.getRotations();
  const hasRotations = Object.keys(rotations).some(key => rotations[key] !== 0);
  
  if (hasRotations) {
    console.log('[AddApartmentForm] 🔄 Обнаружены повороты, сохраняем перед отправкой...');
    console.log('[AddApartmentForm] Rotations:', rotations);
    
    const result = await fileUploadSliderRef.current.saveAllRotations();
    if (result && result.updatedPhotos) {
      const rotatedUrls = result.updatedPhotos.map(p => p.url);
      console.log('[AddApartmentForm] ✅ Фото повернуты:', rotatedUrls);
      return rotatedUrls;
    }
  }
  
  return null;
};

const handleSubmit = async (e, customPhotos = null) => {
  if (e && e.preventDefault) e.preventDefault();
  
  let photosToSubmit = customPhotos || uploadImages;
  
  // Если нет customPhotos (прямой сабмит без предпросмотра) - проверяем повороты
  if (!customPhotos) {
    const rotatedPhotos = await checkAndRotatePhotosBeforeSubmit();
    if (rotatedPhotos) {
      photosToSubmit = rotatedPhotos;
      // Обновляем состояние после поворота
      setUploadImages(rotatedPhotos);
    }
  }
  
  console.log('[AddApartmentForm] Submitting with photos:', photosToSubmit);
  
  if (photosToSubmit.length < 3) {
    setPhotoError(true);
    setSnackbarMessage(t.minPhotosError);
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
    return;
  }

  const isFormValid = validateForm();
  const isInfoValid = infoRef.current?.validate();

  if (!isFormValid || !isInfoValid) {
    setSnackbarMessage(t.errorMessage);
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
    return;
  }

  setIsSubmitting(true);
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      
    const url = isEditMode 
      ? `${baseUrl}/api/v1/apartments/update/${apartmentId}`
      : `${baseUrl}/api/v1/apartments/add`;

    const method = isEditMode ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        ...apartmentInfo, 
        ...formData, 
        photos: photosToSubmit,
        user_id: profile?._id || 'guest',
      }),
    });

    const responseText = await response.text();
    let responseData;
    
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('Ошибка парсинга JSON:', e);
      throw new Error('Неверный формат ответа от сервера: ' + responseText);
    }

    if (!response.ok) {
      throw new Error(responseData.message || t.serverError);
    }
    
    setSnackbarMessage(isEditMode ? t.updateMessage : t.successMessage);
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    
    if (!isEditMode) {
      clearDraft();
    }
    
    setTimeout(() => {
      router.push('/my-listings');
    }, 2000);
    
    if (!isEditMode) {
      setFormData(initialFormData);
      setCityInputValue('');
      setStreetInputValue('');
      setUploadImages([]);
      setApartmentInfo(initialApartmentInfo);
      setSelectedLocation(null);
      setMapCenter({ lat: 50.4501, lng: 30.5234 });
      
      if (infoRef.current?.reset) {
        infoRef.current.reset();
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
    setSnackbarMessage(error.message || t.serverError);
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  } finally {
    setIsSubmitting(false);
  }
};




  const handlePreview = () => {
    console.log('=== [AddApartmentForm] handlePreview called ===');
    
    const isFormValid = validateForm();
    const isInfoValid = infoRef.current?.validate();
    const hasEnoughPhotos = uploadImages.length >= 3;
  
    setPhotoError(!hasEnoughPhotos);
    
    if (!isFormValid || !isInfoValid || !hasEnoughPhotos) {
      setSnackbarMessage(t.errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    
    // Получаем фото с углами поворота из FileUploadSlider
    if (fileUploadSliderRef.current) {
      const photosWithRotations = fileUploadSliderRef.current.getCurrentPhotos();
      console.log('[AddApartmentForm] Photos with rotations:', photosWithRotations);
      setPreviewPhotos(photosWithRotations);
    } else {
      // Если нет рефа, передаем обычные фото без поворотов
      setPreviewPhotos(uploadImages.map(url => ({ url, rotation: 0 })));
    }
    
    setPreviewOpen(true);
  };

  // ИСПРАВЛЕННАЯ функция handleClosePreview
  const handleClosePreview = (shouldEdit, result = {}) => {
    console.log('=== [AddApartmentForm] handleClosePreview ===');
    console.log('[AddApartmentForm] shouldEdit:', shouldEdit);
    console.log('[AddApartmentForm] result:', result);
    
    setPreviewOpen(false);
    
    if (!shouldEdit && result.shouldPublish) {
      if (result.updatedPhotos && result.updatedPhotos.length > 0) {
        const newPhotoUrls = result.updatedPhotos.map(p => p.url);
        console.log('[AddApartmentForm] Submitting with rotated photos directly:', newPhotoUrls);
        // Передаем фото напрямую в handleSubmit, минуя состояние
        handleSubmit(null, newPhotoUrls);
      } else {
        console.log('[AddApartmentForm] No updated photos, submitting with existing');
        handleSubmit(null, null);
      }
    }
  };

  // Если Google Maps не загружен
  if (!isGoogleMapsLoaded) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh" flexDirection="column">
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {t.loadingGoogleMaps}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>{isEditMode ? t.metaTitleEdit : t.metaTitleAdd}</title>
        <meta name="description" content={t.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Container maxWidth="md" sx={{ 
        py: isMobile ? 2 : 4,
        '& .MuiTextField-root, & .MuiFormControl-root': {
          fontSize: isMobile ? '14px' : 'inherit'
        }
      }}>
        <Typography variant={isMobile ? "h5" : "h4"} component="h1" align="center" gutterBottom>
          {isEditMode ? t.editTitle : t.addTitle}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <FormControl fullWidth margin="normal" error={!!errors.category}>
            <InputLabel>{t.categoryLabel}</InputLabel>
            <Select
              name="category"
              value={formData.category || ''}
              onChange={handleInputChange}
              label={t.categoryLabel}
            >
              {t.categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            size={isMobile ? "small" : "medium"}
            name="objectName"
            label={t.objectNameLabel}
            value={formData.objectName || ''}
            onChange={handleInputChange}
            error={!!errors.objectName}
            helperText={
              errors.objectName 
                ? formData.objectName?.length > 59 
                  ? t.maxCharsError 
                  : t.requiredField
                : t.objectNameHelper
            }
          />

          <TextField
            fullWidth
            margin="normal"
            size={isMobile ? "small" : "medium"}
            name="description"
            label={t.descriptionLabel}
            multiline
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description ? t.descriptionHelper : ''}
          />

          {/* Поле населенного пункта с Google Places Autocomplete */}
          <Box margin="normal" sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, color: 'rgba(0, 0, 0, 0.6)' }}>
              {t.cityLabel}
            </Typography>
            {isGoogleMapsLoaded && (
              <Autocomplete
                onLoad={(autocomplete) => {
                  cityAutocompleteRef.current = autocomplete;
                }}
                onPlaceChanged={handleCitySelect}
                options={{
                  componentRestrictions: { country: "ua" },
                  fields: ["address_components", "geometry", "formatted_address", "name"],
                  types: ["geocode", "establishment"],
                  language: currentLanguage === "ua" ? "uk" : "ru"
                }}
              >
                <TextField
                  fullWidth
                  size={isMobile ? "small" : "medium"}
                  placeholder={t.cityPlaceholder}
                  value={cityInputValue}
                  onChange={handleCityInputChange}
                  error={!!errors.city}
                  helperText={errors.city ? t.requiredField : ''}
                />
              </Autocomplete>
            )}
          </Box>

          <MetroSelector
            city={formData.originalCity}
            onMetroSelect={handleMetroSelect}
            error={!!errors.metro}
            show={formData.hasMetro}
            value={formData.metro}
          />

          {/* Поле улицы с Google Places Autocomplete или ручным вводом */}
          <Box margin="normal" sx={{ mt: 3 }}>
            {!showManualStreetInput ? (
              <>
                <Typography variant="body2" sx={{ mb: 1, color: 'rgba(0, 0, 0, 0.6)' }}>
                  {t.streetLabel}
                </Typography>
                {isGoogleMapsLoaded && (
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      streetAutocompleteRef.current = autocomplete;
                    }}
                    onPlaceChanged={handleStreetSelect}
                    options={{
                      componentRestrictions: { country: "ua" },
                      fields: ["address_components", "geometry", "formatted_address", "name"],
                      types: ["geocode"],
                      language: currentLanguage === "ua" ? "uk" : "ru"
                    }}
                  >
                    <TextField
                      fullWidth
                      size={isMobile ? "small" : "medium"}
                      placeholder={t.streetPlaceholder}
                      value={streetInputValue}
                      onChange={handleStreetInputChange}
                      error={!!errors.street}
                      helperText={errors.street ? t.requiredField : ''}
                    />
                  </Autocomplete>
                )}
                <Button
                  variant="text"
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    textTransform: 'none',
                    color: '#1976d2',
                    mt: 1,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline',
                    },
                  }}
                  onClick={toggleStreetInputMode}
                >
                  {t.manualStreetPrompt}
                </Button>
              </>
            ) : (
              <>
                <TextField
                  fullWidth
                  label={t.streetLabel}
                  size={isMobile ? "small" : "medium"}
                  name="street"
                  value={streetInputValue}
                  onChange={handleStreetInputChange}
                  error={!!errors.street}
                  helperText={errors.street ? t.requiredField : ''}
                  placeholder={t.streetLabel}
                />
                <Button
                  variant="text"
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    textTransform: 'none',
                    color: '#1976d2',
                    mt: 1,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline',
                    },
                  }}
                  onClick={toggleStreetInputMode}
                >
                  {t.googleStreetPrompt}
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 200, mb: 2 }}>
              <TextField 
                fullWidth 
                name="houseNumber" 
                size={isMobile ? "small" : "medium"}
                label={t.houseNumberLabel} 
                value={formData.houseNumber} 
                onChange={handleHouseNumberChange} 
                error={!!errors.houseNumber} 
                helperText={errors.houseNumber ? t.requiredField : ""} 
              />
              <TextField 
                fullWidth 
                name="price" 
                label={t.priceLabel} 
                type="number" 
                size={isMobile ? "small" : "medium"}
                value={formData.price} 
                onChange={handleInputChange} 
                error={!!errors.price} 
                helperText={errors.price ? t.requiredField : ""} 
              />
            </Box>
          </Box>

          {selectedLocation && isGoogleMapsLoaded && GoogleMap && (
            <Box sx={{ height: '300px', width: '100%', mt: 2 }}>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={mapCenter}
                zoom={17}
              >
                <Marker
                  position={selectedLocation}
                  draggable
                  onDragEnd={(e) => {
                    updateMapLocation({
                      lat: e.latLng.lat(),
                      lng: e.latLng.lng()
                    });
                  }}
                />
              </GoogleMap>
              <Box sx={{ mt: 1.5, mb: 0.5, py: 0.5, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#ff5722',
               fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }
               }}>
                  {t.moveMarkerText}
                </Typography>
              </Box>
            </Box>
          )}

          <Box sx={{ height: '60px' }} />

          {/* Район - используем Autocomplete для Киева */}
          {isKyiv(formData.originalCity || formData.city) ? (
            <Box sx={{ maxWidth: 300, mt: 3 }}>
              <MuiAutocomplete
                options={DISTRICTS_DATA.kyiv[currentLanguage]}
                getOptionLabel={(option) => option.name}
                value={DISTRICTS_DATA.kyiv[currentLanguage].find(d => d.id === formData.district) || null}
                onChange={(event, newValue) => {
                  setFormData(prev => ({ ...prev, district: newValue ? newValue.id : '' }));
                  setErrors(prev => ({ ...prev, district: false }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t.districtLabel}
                    placeholder="Виберіть район"
                    error={!!errors.district}
                    helperText={errors.district ? t.requiredField : "Виберіть район Києва"}
                    size={isMobile ? "small" : "medium"}
                  />
                )}
                fullWidth
              />
            </Box>
          ) : (
            <TextField
              fullWidth
              margin="normal"
              size={isMobile ? "small" : "medium"}
              name="district"
              label={t.districtLabel}
              placeholder="Район"
              value={formData.district}
              onChange={handleInputChange}
              error={!!errors.district}
              sx={{ maxWidth: 300, mt: 3 }}
            />
          )}

          <Box sx={{ 
            mt: 3, 
            borderRadius: 2,
            border: photoError ? '1px solid red' : 'none'
          }}>
            <FileUploadSlider 
              ref={fileUploadSliderRef}
              photos={uploadImages}
              setUploadImages={setUploadImages}
              editable={true}
              onPhotosChange={(newPhotos) => {
                console.log('[AddApartmentForm] onPhotosChange called, newPhotos count:', newPhotos);
                setPhotoError(newPhotos.length < 3);
              }}
            />
            {photoError && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {t.uploadPhotosText}
              </Typography>
            )}
          </Box>

          <InfoApartments 
            ref={infoRef} 
            onDataChange={setApartmentInfo}
            initialData={apartmentInfo}
          />

          <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
            <Button variant="outlined" size="large" onClick={handlePreview}>
              {t.previewButton}
            </Button>
            <Button 
              variant="contained" 
              size="large" 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} /> : 
                (isEditMode ? t.saveButton : t.submitButton)}
            </Button>
          </Stack>
        </Box>

        <PreviewDialog
          open={previewOpen}
          onClose={handleClosePreview}
          formData={formData}
          uploudImages={previewPhotos}
          apartmentInfo={apartmentInfo}
          photoError={photoError}
        />

        <Snackbar 
          open={snackbarOpen} 
          autoHideDuration={6000} 
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert 
            onClose={() => setSnackbarOpen(false)} 
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}

// Главный компонент страницы с провайдерами
export default function AddApartment() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <Header/>
        <AddApartmentForm />
      </LanguageProvider>
    </Provider>
  );
}