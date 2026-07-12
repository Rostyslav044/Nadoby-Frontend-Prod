






// // FileUploadSlider.jsx - ПОЛНОСТЬЮ ИСПРАВЛЕННАЯ ВЕРСИЯ С ЛОГАМИ

// 'use client';

// import React, { useState, useRef, useEffect, useCallback, memo, forwardRef, useImperativeHandle } from 'react';
// import { 
//   Box, 
//   IconButton, 
//   Typography, 
//   Button, 
//   Input,
//   CircularProgress,
//   useMediaQuery,
//   useTheme,
//   Dialog,
//   DialogContent,
//   Snackbar,
//   Alert,
//   DialogTitle,
//   DialogActions,
//   Chip
// } from '@mui/material';
// import { useSwipeable } from 'react-swipeable';
// import { useSelector } from 'react-redux';

// // Динамический импорт CreateUser
// import dynamic from 'next/dynamic';
// const CreateUser = dynamic(() => import('@/app/components/CreateUser'), {
//   loading: () => <CircularProgress size={40} />,
//   ssr: false
// });

// // Иконки
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import PhoneIcon from '@mui/icons-material/Phone';
// import StarIcon from '@mui/icons-material/Star';
// import StarBorderIcon from '@mui/icons-material/StarBorder';
// import ReportIcon from '@mui/icons-material/Report';
// import FeedbackIcon from '@mui/icons-material/Feedback';
// import HelpIcon from '@mui/icons-material/Help';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import EmailIcon from '@mui/icons-material/Email';
// import CloseIcon from '@mui/icons-material/Close';
// import FullscreenIcon from '@mui/icons-material/Fullscreen';
// import RotateLeftIcon from '@mui/icons-material/RotateLeft';
// import RotateRightIcon from '@mui/icons-material/RotateRight';

// import { useLanguage } from '@/app/LanguageContext';

// // Константы
// const MAX_PHOTOS = 15;
// const MAX_FILE_SIZE_MB = 50;
// const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
// const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// // Функция для добавления водяного знака
// const addWatermarkToImage = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
    
//     reader.onload = (event) => {
//       const img = new window.Image();
      
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');
        
//         canvas.width = img.width;
//         canvas.height = img.height;
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
//         const fontSize = Math.max(14, Math.min(28, canvas.width * 0.025));
//         const paddingHorizontal = Math.max(8, canvas.width * 0.015);
//         const paddingVertical = Math.max(6, canvas.height * 0.012);
        
//         ctx.font = `bold ${fontSize}px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`;
//         ctx.textAlign = 'left';
//         ctx.textBaseline = 'bottom';
        
//         const watermarkText = 'NaDoby.com.ua';
//         const x = paddingHorizontal;
//         const y = canvas.height - paddingVertical;
        
//         ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
//         ctx.shadowBlur = 4;
//         ctx.shadowOffsetX = 1;
//         ctx.shadowOffsetY = 1;
        
//         ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
//         ctx.fillText(watermarkText, x, y);
        
//         ctx.shadowColor = 'transparent';
//         ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
//         ctx.lineWidth = 1;
//         ctx.strokeText(watermarkText, x, y);
        
//         canvas.toBlob((blob) => {
//           if (!blob) {
//             reject(new Error('Не удалось создать изображение'));
//             return;
//           }
          
//           const watermarkedFile = new File(
//             [blob], 
//             `watermarked_${Date.now()}_${file.name.replace(/\s+/g, '_')}`, 
//             { type: file.type, lastModified: Date.now() }
//           );
          
//           resolve(watermarkedFile);
//         }, file.type, 0.92);
//       };
      
//       img.onerror = () => reject(new Error('Ошибка загрузки изображения'));
//       img.src = event.target.result;
//     };
    
//     reader.onerror = () => reject(new Error('Ошибка чтения файла'));
//     reader.readAsDataURL(file);
//   });
// };

// // Функция для реального поворота изображения через бэкенд
// const rotateImagePermanently = async (photoUrl, angle, photoId) => {
//   try {
//     console.log(`[rotateImagePermanently] Sending rotation request for photo ${photoId} with angle ${angle}`);
//     console.log(`[rotateImagePermanently] API_URL: ${API_URL}`);
//     console.log(`[rotateImagePermanently] photoUrl: ${photoUrl}`);
    
//     const response = await fetch(`${API_URL}/api/v1/rotate`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         imageUrl: photoUrl,
//         angle: angle,
//         photoId: photoId
//       }),
//     });
    
//     const data = await response.json();
//     console.log(`[rotateImagePermanently] Response:`, data);
    
//     if (response.ok && data.success) {
//       console.log(`[rotateImagePermanently] Success! New URL: ${data.newUrl}`);
//       return {
//         success: true,
//         newUrl: data.newUrl,
//         oldUrl: photoUrl,
//         photoId: photoId
//       };
//     } else {
//       throw new Error(data.error || 'Rotation failed');
//     }
//   } catch (error) {
//     console.error(`[rotateImagePermanently] Error:`, error);
//     throw error;
//   }
// };

// // Функции для склонения слов
// const getPhotoWordUA = (count) => {
//   if (count === 1) return 'фото';
//   if (count >= 2 && count <= 4) return 'фотографії';
//   return 'фотографій';
// };

// const getPhotoWordRU = (count) => {
//   if (count === 1) return 'фото';
//   if (count >= 2 && count <= 4) return 'фотографии';
//   return 'фотографий';
// };

// // Переводы
// const translations = {
//   ua: {
//     addPhotos: 'Додати фото',
//     loading: 'Завантаження...',
//     addPhotosCount: (count, max) => `Додати фото (${count}/${max})`,
//     noPhotos: 'Фото відсутні',
//     addPhotosPrompt: 'Додайте фотографії, натиснувши кнопку вище',
//     priceTitle: 'Ціна оренди',
//     pricePerHour: 'грн./година',
//     pricePerDay: 'грн./доба',
//     contactOwner: 'Зателефонуйте власнику, щоб уточнити всі деталі оренди',
//     reportButton: 'Повідомити про неактуальну інформацію',
//     feedbackButton: 'Залишити відгук про житло',
//     helpButton: 'У мене виникли складнощі при проживанні',
//     errorFileType: 'Недопустимий формат файлів:',
//     errorFileSize: 'Деякі файли перевищують',
//     errorMaxPhotos: 'Можна завантажити максимум',
//     errorPartialUpload: 'Можна додати тільки',
//     photos: 'фото',
//     successUpload: '✅ Файли завантажено!',
//     errorUpload: '❌ Помилка:',
//     unknownError: 'Невідома помилка сервера',
//     uploadError: '❌ Помилка при завантаженні файлів',
//     authRequired: 'Для цієї дії необхідно авторизуватися',
//     authRequiredTitle: 'Потрібна авторизація',
//     close: 'Закрити',
//     login: 'Увійти',
//     loginRequired: 'Будь ласка, увійдіть щоб виконати цю дію',
//     actionSuccess: 'Дякуємо за ваше повідомлення!',
//     contactSupport: "Зв'язатися з підтримкою",
//     supportEmail: 'Електронна пошта підтримки',
//     copyEmail: 'Скопіювати пошту',
//     emailCopied: 'Пошту скопійовано!',
//     openEmail: 'Написати на пошту',
//     reportTitle: 'Повідомлення про неактуальну інформації',
//     feedbackTitle: 'Залишити відгук про житло',
//     helpTitle: 'Повідомити про складнощі при проживанні',
//     instructions: 'Скопіюйте електронну адресу та напишіть нам, або натисніть кнопку для відкриття поштового клієнта',
//     invalidFormat: (invalidNames) => `❌ Недопустимий формат файлів: ${invalidNames}. Дозволено: JPEG, PNG, WebP, HEIC`,
//     oversizedFiles: (oversizedNames) => `❌ Деякі файли перевищують ${MAX_FILE_SIZE_MB}MB: ${oversizedNames}`,
//     maxPhotosLimit: `❌ Можна завантажити максимум ${MAX_PHOTOS} фото. У вас вже`,
//     maxPhotosPlural: (count) => `${count} ${getPhotoWordUA(count)}`,
//     totalSizeError: `❌ Загальний розмір файлів занадто великий. Максимум: ${MAX_FILE_SIZE_BYTES * 3}MB`,
//     partialUploadWarning: (allowed) => `⚠️ Можна додати тільки ${allowed} ${getPhotoWordUA(allowed)}. Інші файли не будуть завантажені`,
//     networkError: '❌ Помилка мережі. Перевірте підключення до інтернету',
//     fileTooLarge: `❌ Файл занадто великий. Максимальний розмір: ${MAX_FILE_SIZE_MB}MB`,
//     maxLimitsInfo: `Максимум: ${MAX_PHOTOS} фото, ${MAX_FILE_SIZE_MB}MB на файл`,
//     copyError: 'Помилка копіювання',
//     mainPhotoLabel: 'Головне фото',
//     setAsMain: 'Зробити головним фото',
//     mainPhoto: 'Головне',
//     isMain: 'Головне фото',
//     fullscreen: 'На весь екран',
//     exitFullscreen: 'Вийти з повноекранного режиму',
//     rotating: 'Поворот...',
//     rotationSaved: 'Фото повернуто!',
//     rotationError: 'Помилка повороту фото',
//   },
//   ru: {
//     addPhotos: 'Добавить фото',
//     loading: 'Загрузка...',
//     addPhotosCount: (count, max) => `Добавить фото (${count}/${max})`,
//     noPhotos: 'Фото отсутствуют',
//     addPhotosPrompt: 'Добавьте фотографии, нажав кнопку выше',
//     priceTitle: 'Цена аренды',
//     pricePerHour: 'грн./час',
//     pricePerDay: 'грн./сутки',
//     contactOwner: 'Позвоните владельцу, чтобы уточнить все детали аренды',
//     reportButton: 'Сообщить о неактуальной информации',
//     feedbackButton: 'Оставить отзыв о жилье',
//     helpButton: 'У меня возникли сложности при проживании',
//     errorFileType: 'Недопустимый формат файлов:',
//     errorFileSize: 'Некоторые файлы превышают',
//     errorMaxPhotos: 'Можно загрузить максимум',
//     errorPartialUpload: 'Можно добавить только',
//     photos: 'фото',
//     successUpload: '✅ Файлы загружены!',
//     errorUpload: '❌ Ошибка:',
//     unknownError: 'Неизвестная ошибка сервера',
//     uploadError: '❌ Ошибка при загрузке файлов',
//     authRequired: 'Для этого действия необходимо авторизоваться',
//     authRequiredTitle: 'Требуется авторизация',
//     close: 'Закрыть',
//     login: 'Войти',
//     loginRequired: 'Пожалуйста, войдите чтобы выполнить это действие',
//     actionSuccess: 'Спасибо за ваше сообщение!',
//     contactSupport: 'Связаться с поддержкой',
//     supportEmail: 'Электронная почта поддержки',
//     copyEmail: 'Скопировать почту',
//     emailCopied: 'Почта скопирована!',
//     openEmail: 'Написать на почту',
//     reportTitle: 'Сообщение о неактуальной информации',
//     feedbackTitle: 'Оставить отзыв о жилье',
//     helpTitle: 'Сообщить о сложностях при проживании',
//     instructions: 'Скопируйте электронный адрес и напишите нам, или нажмите кнопку для открытия почтового клиента',
//     invalidFormat: (invalidNames) => `❌ Недопустимый формат файлов: ${invalidNames}. Разрешены: JPEG, PNG, WebP, HEIC`,
//     oversizedFiles: (oversizedNames) => `❌ Некоторые файлы превышают ${MAX_FILE_SIZE_MB}MB: ${oversizedNames}`,
//     maxPhotosLimit: `❌ Можно загрузить максимум ${MAX_PHOTOS} фото. У вас уже`,
//     maxPhotosPlural: (count) => `${count} ${getPhotoWordRU(count)}`,
//     totalSizeError: `❌ Общий размер файлов слишком большой. Максимум: ${MAX_FILE_SIZE_BYTES * 3}MB`,
//     partialUploadWarning: (allowed) => `⚠️ Можно добавить только ${allowed} ${getPhotoWordRU(allowed)}. Остальные файлы не будут загружены`,
//     networkError: '❌ Ошибка сети. Проверьте подключение к интернету',
//     fileTooLarge: `❌ Файл слишком большой. Максимальный размер: ${MAX_FILE_SIZE_MB}MB`,
//     maxLimitsInfo: `Максимум: ${MAX_PHOTOS} фото, ${MAX_FILE_SIZE_MB}MB на файл`,
//     copyError: 'Ошибка копирования',
//     mainPhotoLabel: 'Главное фото',
//     setAsMain: 'Сделать главным фото',
//     mainPhoto: 'Главное',
//     isMain: 'Главное фото',
//     fullscreen: 'На весь экран',
//     exitFullscreen: 'Выйти из полноэкранного режима',
//     rotating: 'Поворот...',
//     rotationSaved: 'Фото повернуто!',
//     rotationError: 'Ошибка поворота фото',
//   }
// };

// const FileUploadSlider = forwardRef(({ 
//   photos = [], 
//   onDelete, 
//   setUploadImages,
//   price = '0', 
//   name = 'Имя не указано', 
//   phones = [], 
//   address = '',
//   category = '',
//   editable = false,
//   onPhotosChange,
//   onMainPhotoChange,
//   apartmentId = null,
//   apartmentTitle = '',
//   isMobileView = false
// }, ref) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
//   const { currentLanguage } = useLanguage();
//   const t = translations[currentLanguage] || translations.ua;
  
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [localPhotos, setLocalPhotos] = useState([]);
//   const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [authDialogOpen, setAuthDialogOpen] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
//   const [pendingAction, setPendingAction] = useState(null);
//   const [fullscreenOpen, setFullscreenOpen] = useState(false);
//   const [supportDialogOpen, setSupportDialogOpen] = useState(false);
//   const [currentActionType, setCurrentActionType] = useState('');
//   const [photoRotations, setPhotoRotations] = useState({});
//   const [isRotating, setIsRotating] = useState(false);
  
//   const fileInputRef = useRef(null);
//   const thumbnailsRef = useRef(null);
//   const fullscreenThumbnailsRef = useRef(null);
//   const autoCloseTimer = useRef(null);
  
//   const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
//   const user = useSelector(state => state.auth.profile);

//   // Инициализация фотографий
//   useEffect(() => {
//     console.log('[FileUploadSlider] useEffect photos changed:', photos);
//     if (!Array.isArray(photos)) {
//       setLocalPhotos([]);
//       return;
//     }

//     const processedPhotos = photos.map((photo, index) => {
//       if (typeof photo === 'string') {
//         return { 
//           url: photo, 
//           file: null, 
//           id: `photo-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 8)}`,
//           isMain: index === 0
//         };
//       }
//       return photo;
//     }).filter(Boolean);

//     setLocalPhotos(processedPhotos);
    
//     const mainIndex = processedPhotos.findIndex(photo => photo.isMain);
//     if (mainIndex !== -1) {
//       setMainPhotoIndex(mainIndex);
//       setCurrentIndex(mainIndex);
//     } else if (processedPhotos.length > 0) {
//       setMainPhotoIndex(0);
//       setCurrentIndex(0);
//       const updatedPhotos = [...processedPhotos];
//       updatedPhotos[0].isMain = true;
//       setLocalPhotos(updatedPhotos);
//     }
//   }, [photos]);

//   // Функция для сохранения всех повернутых фото
//   const saveAllRotations = useCallback(async () => {
//     console.log('[saveAllRotations] Called');
//     console.log('[saveAllRotations] Current localPhotos:', localPhotos.map(p => ({ id: p.id, url: p.url })));
//     console.log('[saveAllRotations] Current photoRotations:', photoRotations);
    
//     const photosToRotate = localPhotos.filter(photo => (photoRotations[photo.id] || 0) !== 0);
    
//     console.log('[saveAllRotations] Photos to rotate:', photosToRotate.length);
    
//     if (photosToRotate.length === 0) {
//       console.log('[saveAllRotations] No photos to rotate');
//       return { success: true, updatedPhotos: localPhotos };
//     }
    
//     setIsRotating(true);
//     const results = [];
    
//     for (const photo of photosToRotate) {
//       const angle = photoRotations[photo.id] || 0;
//       console.log(`[saveAllRotations] Rotating photo ${photo.id} by ${angle} degrees`);
//       try {
//         const result = await rotateImagePermanently(photo.url, angle, photo.id);
//         if (result.success) {
//           console.log(`[saveAllRotations] Rotation successful for ${photo.id}, new URL: ${result.newUrl}`);
//           results.push(result);
//         }
//       } catch (error) {
//         console.error(`[saveAllRotations] Error rotating photo ${photo.id}:`, error);
//       }
//     }
    
//     const updatedPhotos = [...localPhotos];
//     for (const result of results) {
//       const photoIndex = updatedPhotos.findIndex(p => p.id === result.photoId);
//       if (photoIndex !== -1) {
//         console.log(`[saveAllRotations] Updating photo ${result.photoId} with new URL ${result.newUrl}`);
//         updatedPhotos[photoIndex] = {
//           ...updatedPhotos[photoIndex],
//           url: result.newUrl,
//           id: `rotated_${Date.now()}_${result.photoId}`
//         };
//       }
//     }
    
//     setPhotoRotations({});
//     setLocalPhotos(updatedPhotos);
    
//     if (setUploadImages) {
//       console.log('[saveAllRotations] Updating parent uploadImages');
//       setUploadImages(updatedPhotos.map(p => p.url));
//     }
    
//     setIsRotating(false);
//     console.log('[saveAllRotations] Completed. Updated photos:', updatedPhotos.map(p => p.url));
//     return { success: true, updatedPhotos };
//   }, [localPhotos, photoRotations, setUploadImages]);

//   // Метод для получения текущих фото
//   const getCurrentPhotos = useCallback(() => {
//     console.log('[getCurrentPhotos] Called');
//     console.log('[getCurrentPhotos] localPhotos:', localPhotos.map(p => ({ id: p.id, url: p.url })));
//     console.log('[getCurrentPhotos] photoRotations:', photoRotations);
    
//     return localPhotos.map(photo => ({
//       ...photo,
//       url: photo.url,
//       rotation: photoRotations[photo.id] || 0
//     }));
//   }, [localPhotos, photoRotations]);

//   // Экспортируем методы через ref
//   useImperativeHandle(ref, () => ({
//     getCurrentPhotos,
//     getCurrentPhotosUrls: () => {
//       const urls = localPhotos.map(p => p.url);
//       console.log('[getCurrentPhotosUrls] Called, returning:', urls);
//       return urls;
//     },
//     getRotations: () => {
//       console.log('[getRotations] Called, returning:', photoRotations);
//       return photoRotations;
//     },
//     saveAllRotations: saveAllRotations
//   }));

//   // Экспортируем функцию сохранения поворотов в window
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       window.savePhotoRotations = async () => {
//         console.log('[window.savePhotoRotations] Called');
//         console.log('[window.savePhotoRotations] Current rotations:', photoRotations);
//         const result = await saveAllRotations();
//         console.log('[window.savePhotoRotations] Result:', result);
//         return result.updatedPhotos;
//       };
//     }
//   }, [photoRotations, saveAllRotations]);

//   // Скролл миниатюр
//   useEffect(() => {
//     if (thumbnailsRef.current && localPhotos.length > 0) {
//       const thumbnailsContainer = thumbnailsRef.current;
//       const thumbnailElements = thumbnailsContainer.children;
      
//       if (thumbnailElements.length > currentIndex) {
//         const currentThumbnail = thumbnailElements[currentIndex];
//         const containerWidth = thumbnailsContainer.clientWidth;
//         const thumbnailWidth = currentThumbnail.offsetWidth;
//         const scrollLeft = currentThumbnail.offsetLeft - (containerWidth / 2) + (thumbnailWidth / 2);
        
//         thumbnailsContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
//       }
//     }
//   }, [currentIndex, localPhotos.length]);

//   useEffect(() => {
//     if (fullscreenOpen && fullscreenThumbnailsRef.current && localPhotos.length > 0) {
//       const thumbnailsContainer = fullscreenThumbnailsRef.current;
//       const thumbnailElements = thumbnailsContainer.children;
      
//       if (thumbnailElements.length > currentIndex) {
//         const currentThumbnail = thumbnailElements[currentIndex];
//         const containerWidth = thumbnailsContainer.clientWidth;
//         const thumbnailWidth = currentThumbnail.offsetWidth;
//         const scrollLeft = currentThumbnail.offsetLeft - (containerWidth / 2) + (thumbnailWidth / 2);
        
//         requestAnimationFrame(() => {
//           thumbnailsContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
//         });
//       }
//     }
//   }, [currentIndex, localPhotos.length, fullscreenOpen]);

//   const startAutoCloseTimer = useCallback(() => {
//     if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
//     autoCloseTimer.current = setTimeout(() => {
//       setAuthDialogOpen(false);
//       setSnackbar(prev => ({ ...prev, open: false }));
//     }, 5000);
//   }, []);

//   const showSnackbar = useCallback((message, severity = 'info') => {
//     setSnackbar({ open: true, message, severity });
//   }, []);

//   const handleCloseSnackbar = useCallback(() => {
//     setSnackbar({ ...snackbar, open: false });
//     if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
//   }, [snackbar]);

//   // Поворот фото (визуально, через CSS)
//   const handleRotatePhoto = useCallback((photoId, direction) => {
//     console.log(`[handleRotatePhoto] Photo: ${photoId}, direction: ${direction}`);
//     setPhotoRotations(prev => {
//       const currentAngle = prev[photoId] || 0;
//       const newAngle = direction === 'left' ? currentAngle - 90 : currentAngle + 90;
//       console.log(`[handleRotatePhoto] Angle changed from ${currentAngle} to ${newAngle}`);
//       return { ...prev, [photoId]: newAngle };
//     });
//   }, []);

//   // Загрузка файлов
//   const uploadFiles = useCallback(async (files) => {
//     if (files.length === 0) {
//       setMessage(t.uploadError);
//       return;
//     }

//     const formData = new FormData();
//     files.forEach((file) => formData.append('files', file));

//     try {
//       setIsLoading(true);
      
//       const res = await fetch(`${API_URL}/api/v1/upload`, {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         let uploadedUrls = [];
//         if (data.urls && Array.isArray(data.urls)) uploadedUrls = data.urls;
//         else if (data.uploaded && Array.isArray(data.uploaded)) uploadedUrls = data.uploaded.map(item => item.url);
//         else if (data.url) uploadedUrls = [data.url];
        
//         setMessage(t.successUpload);
        
//         const newPhotos = uploadedUrls.map((url, index) => ({
//           url,
//           file: null,
//           id: `uploaded-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
//           isMain: localPhotos.length === 0 && index === 0
//         }));

//         const updatedPhotos = [...localPhotos, ...newPhotos];
        
//         if (localPhotos.length === 0 && updatedPhotos.length > 0) {
//           updatedPhotos[0].isMain = true;
//           setMainPhotoIndex(0);
//           setCurrentIndex(0);
//         }
        
//         setLocalPhotos(updatedPhotos);
//         setCurrentIndex(updatedPhotos.length - 1);

//         if (setUploadImages) setUploadImages(updatedPhotos.map(photo => photo.url));
//         if (onPhotosChange) onPhotosChange(updatedPhotos.length);
//         if (localPhotos.length === 0 && newPhotos.length > 0 && onMainPhotoChange) {
//           onMainPhotoChange(0);
//         }
//       } else {
//         setMessage(`❌ ${data.error || t.unknownError}`);
//       }
//     } catch (err) {
//       console.error('Ошибка загрузки:', err);
//       setMessage(t.networkError);
//     } finally {
//       setIsLoading(false);
//       if (fileInputRef.current) fileInputRef.current.value = '';
//     }
//   }, [localPhotos, t, setUploadImages, onPhotosChange, onMainPhotoChange]);

//   // Обработка загрузки файлов с водяным знаком
//   const handleFileUpload = useCallback(async (e) => {
//     const files = Array.from(e.target.files || []);
//     if (files.length === 0) return;

//     const invalidFiles = files.filter(file => !ALLOWED_FILE_TYPES.includes(file.type));
//     if (invalidFiles.length > 0) {
//       setMessage(t.invalidFormat(invalidFiles.map(f => f.name).join(', ')));
//       return;
//     }

//     const oversizedFiles = files.filter(file => file.size > MAX_FILE_SIZE_BYTES);
//     if (oversizedFiles.length > 0) {
//       setMessage(t.oversizedFiles(oversizedFiles.map(f => f.name).join(', ')));
//       return;
//     }

//     if (localPhotos.length + files.length > MAX_PHOTOS) {
//       const photoWord = currentLanguage === 'ua' ? getPhotoWordUA(localPhotos.length) : getPhotoWordRU(localPhotos.length);
//       setMessage(`${t.maxPhotosLimit} ${localPhotos.length} ${photoWord}`);
//       return;
//     }

//     const allowedCount = MAX_PHOTOS - localPhotos.length;
//     const filesToAdd = files.slice(0, allowedCount);

//     setIsLoading(true);
    
//     try {
//       const watermarkedFiles = await Promise.all(
//         filesToAdd.map(async (file) => {
//           try {
//             return await addWatermarkToImage(file);
//           } catch (error) {
//             console.error('Ошибка водяного знака:', error);
//             return file;
//           }
//         })
//       );
//       await uploadFiles(watermarkedFiles);
//     } catch (error) {
//       console.error('Ошибка обработки файлов:', error);
//       setMessage(t.uploadError);
//       setIsLoading(false);
//     }
//   }, [localPhotos, t, currentLanguage, uploadFiles]);

//   // Удаление фото
//   const handleDeletePhoto = useCallback((index) => {
//     const newPhotos = [...localPhotos];
//     const deletedPhoto = newPhotos[index];
//     const isMain = deletedPhoto.isMain;
    
//     newPhotos.splice(index, 1);
    
//     setPhotoRotations(prev => {
//       const newRotations = { ...prev };
//       delete newRotations[deletedPhoto.id];
//       return newRotations;
//     });
    
//     if (isMain && newPhotos.length > 0) {
//       newPhotos[0].isMain = true;
//       setMainPhotoIndex(0);
//       if (onMainPhotoChange) onMainPhotoChange(0);
//     }
    
//     setLocalPhotos(newPhotos);
//     if (setUploadImages) setUploadImages(newPhotos.map(photo => photo.url));
//     if (onPhotosChange) onPhotosChange(newPhotos.length);

//     setCurrentIndex(prev => {
//       if (prev >= newPhotos.length) return Math.max(0, newPhotos.length - 1);
//       if (prev === index && index > 0) return index - 1;
//       return prev;
//     });
//   }, [localPhotos, setUploadImages, onPhotosChange, onMainPhotoChange]);

//   // Установка главного фото
//   const handleSetMainPhoto = useCallback((index) => {
//     if (index === mainPhotoIndex) return;
    
//     const newPhotos = [...localPhotos];
    
//     if (mainPhotoIndex >= 0 && mainPhotoIndex < newPhotos.length) {
//       newPhotos[mainPhotoIndex].isMain = false;
//     }
    
//     newPhotos[index].isMain = true;
    
//     setLocalPhotos(newPhotos);
//     setMainPhotoIndex(index);
//     setCurrentIndex(index);
    
//     if (onMainPhotoChange) onMainPhotoChange(index);
    
//     if (setUploadImages) {
//       const urls = newPhotos.map(photo => photo.url);
//       const mainPhotoUrl = urls[index];
//       const reorderedUrls = [mainPhotoUrl, ...urls.filter((_, i) => i !== index)];
//       setUploadImages(reorderedUrls);
//     }
    
//     if (editable) {
//       showSnackbar(`${t.mainPhotoLabel} ${currentLanguage === 'ua' ? 'змінено' : 'изменено'}`, 'success');
//     }
//   }, [localPhotos, mainPhotoIndex, t, editable, currentLanguage, onMainPhotoChange, setUploadImages, showSnackbar]);

//   // Навигация
//   const handleNext = useCallback(() => {
//     setCurrentIndex(prev => (prev + 1) % localPhotos.length);
//   }, [localPhotos.length]);
  
//   const handlePrev = useCallback(() => {
//     setCurrentIndex(prev => (prev - 1 + localPhotos.length) % localPhotos.length);
//   }, [localPhotos.length]);

//   const handleThumbnailClick = useCallback((index) => {
//     setCurrentIndex(index);
//   }, []);

//   const handleFullscreenNext = useCallback(() => {
//     setCurrentIndex(prev => (prev + 1) % localPhotos.length);
//   }, [localPhotos.length]);
  
//   const handleFullscreenPrev = useCallback(() => {
//     setCurrentIndex(prev => (prev - 1 + localPhotos.length) % localPhotos.length);
//   }, [localPhotos.length]);

//   // Свайпы
//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: handleNext,
//     onSwipedRight: handlePrev,
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true
//   });

//   const fullscreenSwipeHandlers = useSwipeable({
//     onSwipedLeft: handleFullscreenNext,
//     onSwipedRight: handleFullscreenPrev,
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true
//   });

//   // Телефоны
//   const getPhones = useCallback(() => {
//     try {
//       if (!Array.isArray(phones)) return ['+380XXXXXXXXX'];
//       return phones.filter(phone => 
//         typeof phone === 'string' && 
//         phone.length >= 12 &&
//         phone.startsWith('+380')
//       );
//     } catch {
//       return ['+380XXXXXXXXX'];
//     }
//   }, [phones]);

//   const isHourly = category?.toLowerCase().includes('сауна') || category?.toLowerCase().includes('баня');

//   // Полноэкранный режим
//   const handleOpenFullscreen = useCallback(() => {
//     if (!editable) setFullscreenOpen(true);
//   }, [editable]);

//   const handleCloseFullscreen = useCallback(() => {
//     setFullscreenOpen(false);
//   }, []);

//   // Диалоги поддержки
//   const handleOpenSupportDialog = useCallback((actionType) => {
//     setCurrentActionType(actionType);
//     setSupportDialogOpen(true);
//   }, []);

//   const handleCloseSupportDialog = useCallback(() => {
//     setSupportDialogOpen(false);
//     setCurrentActionType('');
//   }, []);

//   const copyEmailToClipboard = useCallback(() => {
//     navigator.clipboard.writeText('nadoby.com.ua@gmail.com')
//       .then(() => showSnackbar(t.emailCopied, 'success'))
//       .catch(err => {
//         console.error('Failed to copy email: ', err);
//         showSnackbar(t.copyError, 'error');
//       });
//   }, [t, showSnackbar]);

//   const openEmailClient = useCallback(() => {
//     const actionSubjects = {
//       report: currentLanguage === 'ua' ? 'Неактуальна інформація' : 'Неактуальная информация',
//       feedback: currentLanguage === 'ua' ? 'Відгук про житло' : 'Отзыв о жилье',
//       help: currentLanguage === 'ua' ? 'Проблеми при проживанні' : 'Проблемы при проживании'
//     };

//     const emailSubject = `${actionSubjects[currentActionType]} - ${currentLanguage === 'ua' ? 'Оголошення' : 'Объявление'} #${apartmentId}`;
//     const emailBody = `
// ${currentLanguage === 'ua' ? 'Користувач' : 'Пользователь'}: ${user?.name || (currentLanguage === 'ua' ? 'Не вказано' : 'Не указано')} (${user?.email || (currentLanguage === 'ua' ? 'Не вказано' : 'Не указано')})
// ${currentLanguage === 'ua' ? 'ID оголошення' : 'ID объявления'}: ${apartmentId}
// ${currentLanguage === 'ua' ? 'Назва оголошення' : 'Название объявления'}: ${apartmentTitle}
// ${currentLanguage === 'ua' ? 'Тип звернення' : 'Тип обращения'}: ${actionSubjects[currentActionType]}

// ${currentLanguage === 'ua' ? 'Повідомлення' : 'Сообщение'}:
// `;

//     window.location.href = `mailto:nadoby.com.ua@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
//     showSnackbar(t.actionSuccess, 'success');
//     handleCloseSupportDialog();
//   }, [currentActionType, currentLanguage, apartmentId, apartmentTitle, user, t, showSnackbar, handleCloseSupportDialog]);

//   const handleActionButtonClick = useCallback((actionType) => {
//     if (!isAuthenticated) {
//       setPendingAction(actionType);
//       setAuthDialogOpen(true);
//       setSnackbar({ open: true, message: t.loginRequired, severity: 'info' });
//       startAutoCloseTimer();
//       return;
//     }
//     handleOpenSupportDialog(actionType);
//   }, [isAuthenticated, t, startAutoCloseTimer, handleOpenSupportDialog]);

//   const handleCloseAuthDialog = useCallback(() => {
//     setAuthDialogOpen(false);
//     if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
//   }, []);

//   const getDialogTitle = useCallback(() => {
//     switch (currentActionType) {
//       case 'report': return t.reportTitle;
//       case 'feedback': return t.feedbackTitle;
//       case 'help': return t.helpTitle;
//       default: return t.contactSupport;
//     }
//   }, [currentActionType, t]);

//   // Клавиши
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (fullscreenOpen) {
//         if (e.key === 'Escape') handleCloseFullscreen();
//         else if (e.key === 'ArrowLeft') handleFullscreenPrev();
//         else if (e.key === 'ArrowRight') handleFullscreenNext();
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [fullscreenOpen, handleFullscreenPrev, handleFullscreenNext, handleCloseFullscreen]);

//   useEffect(() => {
//     return () => {
//       if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
//     };
//   }, []);

//   return (
//     <Box sx={{ 
//       display: 'flex',
//       flexDirection: isDesktop ? 'row' : 'column',
//       width: '100%',
//       maxWidth: isDesktop ? '1200px' : '100%',
//       mx: 'auto',
//       mb: 3,
//       borderRadius: 2,
//       overflow: 'hidden',
//       boxShadow: 3,
//     }}>
//       <Box sx={{ 
//         width: isDesktop && !editable ? '850px' : '100%',
//         flexShrink: 0,
//         position: 'relative',
//       }}>
//         <Input
//           inputRef={fileInputRef}
//           type="file"
//           onChange={handleFileUpload}
//           inputProps={{ 
//             accept: ALLOWED_FILE_TYPES.join(','), 
//             multiple: true 
//           }}
//           sx={{ display: 'none' }}
//         />
  
//         {editable && (
//           <Box sx={{ 
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             p: isMobile ? 1 : 2,
//             bgcolor: '#f0f0f0',
//             gap: 1
//           }}>
//             <Button
//               variant="contained"
//               startIcon={<AddPhotoAlternateIcon />}
//               onClick={() => fileInputRef.current?.click()}
//               disabled={isLoading || isRotating || localPhotos.length >= MAX_PHOTOS}
//               sx={{ 
//                 minWidth: isMobile ? '200px' : '300px',
//                 fontSize: isMobile ? '0.8rem' : '1rem'
//               }}
//             >
//               {isLoading ? t.loading : t.addPhotosCount(localPhotos.length, MAX_PHOTOS)}
//             </Button>
//           </Box>
//         )}
  
//         {localPhotos.length > 0 ? (
//           <Box {...swipeHandlers} sx={{
//             width: '100%',
//             height: isMobile ? '300px' : '500px',
//             position: 'relative',
//             overflow: 'hidden',
//             cursor: !editable ? 'pointer' : 'default',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             backgroundColor: '#000',
//           }}>
//             {editable && localPhotos[currentIndex]?.isMain && (
//               <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
//                 <Chip
//                   icon={<StarIcon sx={{ color: '#FFD700', fontSize: '16px' }} />}
//                   label={t.mainPhoto}
//                   size="small"
//                   sx={{
//                     backgroundColor: 'rgba(255, 215, 0, 0.2)',
//                     border: '1px solid #FFD700',
//                     fontWeight: 'bold',
//                     color: '#333',
//                     height: '24px',
//                     '& .MuiChip-label': { fontSize: '0.7rem', px: 1 }
//                   }}
//                 />
//               </Box>
//             )}
  
//             <Box sx={{ 
//               position: 'relative', 
//               width: '100%', 
//               height: '100%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center'
//             }}>
//               <Box sx={{
//                 width: '100%',
//                 height: '100%',
//                 transform: `rotate(${photoRotations[localPhotos[currentIndex]?.id] || 0}deg)`,
//                 transition: 'transform 0.3s ease',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}>
//                 <img
//                   src={localPhotos[currentIndex]?.url}
//                   alt={`${currentLanguage === 'ua' ? 'Фото' : 'Фото'} ${currentIndex + 1}`}
//                   style={{ 
//                     objectFit: 'cover',
//                     width: '100%',
//                     height: '100%'
//                   }}
//                   onClick={handleOpenFullscreen}
//                 />
//               </Box>
//             </Box>
  
//             {!editable && (
//               <IconButton
//                 onClick={handleOpenFullscreen}
//                 sx={{
//                   position: 'absolute',
//                   top: 10,
//                   right: 10,
//                   bgcolor: 'rgba(0, 0, 0, 0.5)',
//                   color: 'white',
//                   '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
//                   width: 32,
//                   height: 32,
//                   zIndex: 10,
//                 }}
//               >
//                 <FullscreenIcon sx={{ fontSize: 20 }} />
//               </IconButton>
//             )}
  
//             {localPhotos.length > 1 && (
//               <>
//                 <IconButton 
//                   onClick={handlePrev} 
//                   sx={{ 
//                     position: 'absolute', 
//                     left: isMobile ? 8 : 16, 
//                     top: '50%', 
//                     transform: 'translateY(-50%)', 
//                     bgcolor: 'rgba(255,255,255,0.9)',
//                     width: 32,
//                     height: 32,
//                     zIndex: 10,
//                   }}
//                 >
//                   <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
//                 </IconButton>
//                 <IconButton 
//                   onClick={handleNext} 
//                   sx={{ 
//                     position: 'absolute', 
//                     right: isMobile ? 8 : 16, 
//                     top: '50%', 
//                     transform: 'translateY(-50%)', 
//                     bgcolor: 'rgba(255,255,255,0.9)',
//                     width: 32,
//                     height: 32,
//                     zIndex: 10,
//                   }}
//                 >
//                   <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
//                 </IconButton>
//               </>
//             )}
  
//             <Box sx={{
//               position: 'absolute',
//               bottom: 20,
//               right: 20,
//               bgcolor: 'rgba(0,0,0,0.7)',
//               color: 'white',
//               px: 2,
//               py: 0.5,
//               borderRadius: 4,
//               fontSize: '0.8rem',
//               zIndex: 10,
//             }}>
//               {currentIndex + 1}/{localPhotos.length}
//             </Box>
  
//             {editable && (
//               <>
//                 <IconButton
//                   onClick={() => handleDeletePhoto(currentIndex)}
//                   sx={{
//                     position: 'absolute',
//                     top: 10,
//                     right: 10,
//                     bgcolor: 'error.main',
//                     color: 'white',
//                     '&:hover': { bgcolor: 'error.dark' },
//                     width: 32,
//                     height: 32,
//                     zIndex: 10,
//                   }}
//                 >
//                   <DeleteIcon sx={{ fontSize: 20 }} />
//                 </IconButton>
                
//                 {!localPhotos[currentIndex]?.isMain && (
//                   <IconButton
//                     onClick={() => handleSetMainPhoto(currentIndex)}
//                     sx={{
//                       position: 'absolute',
//                       top: isMobile ? 62 : 52,    // ← уменьшили для мобильных
//                       right: isMobile ? 10 : 10,
//                       bgcolor: 'primary.main',
//                       color: 'white',
//                       '&:hover': { bgcolor: 'primary.dark' },
//                       width: isMobile ? 28 : 32,
//                       height: isMobile ? 28 : 32,
//                       zIndex: 10,
//                     }}
//                   >
//                     <StarBorderIcon sx={{ fontSize: 20 }} />
//                   </IconButton>
//                 )}
                
//                 <IconButton
//                   onClick={() => handleRotatePhoto(localPhotos[currentIndex]?.id, 'left')}
//                   sx={{
//                     position: 'absolute',
//                     top: isMobile ? 183 : 94,      // ← подняли для мобильных (было 94, стало 76)
//                     right: isMobile ? 10 : 10,
//                     bgcolor: 'warning.main',
//                     color: 'white',
//                     '&:hover': { bgcolor: 'warning.dark' },
//                     width: isMobile ? 28 : 32,
//                     height: isMobile ? 28 : 32,
//                     zIndex: 10,
//                   }}
//                 >
//                   <RotateLeftIcon sx={{ fontSize: 20 }} />
//                 </IconButton>
                
//                 <IconButton
//                   onClick={() => handleRotatePhoto(localPhotos[currentIndex]?.id, 'right')}
//                   sx={{
//                     position: 'absolute',
//                     top: isMobile ? 222 : 136,    // ← подняли для мобильных (было 136, стало 110)
//                     right: isMobile ? 10 : 10,
//                     bgcolor: 'warning.main',
//                     color: 'white',
//                     '&:hover': { bgcolor: 'warning.dark' },
//                     width: isMobile ? 28 : 32,
//                     height: isMobile ? 28 : 32,
//                     zIndex: 10,
//                   }}
//                 >
//                   <RotateRightIcon sx={{ fontSize: 20 }} />
//                 </IconButton>
//               </>
//             )}
//           </Box>
//         ) : (
//           <Box
//             sx={{
//               width: '100%',
//               height: isMobile ? '300px' : '500px',
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: '#f5f5f5',
//               border: editable ? '2px dashed #ccc' : 'none',
//             }}
//           >
//             {isLoading ? (
//               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
//                 <CircularProgress size={isMobile ? 40 : 60} />
//                 <Typography variant="body2" color="text.secondary">
//                   {t.loading}
//                 </Typography>
//               </Box>
//             ) : (
//               <Typography 
//                 variant="h6" 
//                 color="text.secondary" 
//                 align="center"
//                 sx={{ fontSize: isMobile ? '1rem' : '1.25rem', px: 2 }}
//               >
//                 {editable ? t.addPhotosPrompt : t.noPhotos}
//               </Typography>
//             )}
//           </Box>
//         )}
  
//         {localPhotos.length > 0 && (
//           <Box 
//             ref={thumbnailsRef}
//             sx={{
//               display: 'flex',
//               gap: isMobile ? '3px' : '7px',
//               pt: isMobile ? '3px' : 0.5,
//               pb: isMobile ? 0 : 2,
//               px: isMobile ? 0 : 0.4,
//               overflowX: 'auto',
//               scrollBehavior: 'smooth',
//               '&::-webkit-scrollbar': { height: '6px' },
//               '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '3px' },
//             }}
//           >
//             {localPhotos.map((photo, index) => (
//               <Box
//                 key={photo.id}
//                 onClick={() => handleThumbnailClick(index)}
//                 sx={{
//                   width: isMobile ? 'calc(50% - 2.5px)' : '273.4px',
//                   height: isMobile ? '180px' : '250px',
//                   flexShrink: 0,
//                   cursor: 'pointer',
//                   border: currentIndex === index ? '3px solid #1976d2' : '1px solid #ddd',
//                   borderRadius: 1,
//                   overflow: 'hidden',
//                   position: 'relative',
//                   transition: 'border 0.2s ease',
//                 }}
//               >
//                 {editable && photo.isMain && (
//                   <Box sx={{ position: 'absolute', top: 4, left: 4, zIndex: 10 }}>
//                     <Chip
//                       icon={<StarIcon sx={{ color: '#FFD700', fontSize: '12px' }} />}
//                       label={t.mainPhoto}
//                       size="small"
//                       sx={{
//                         backgroundColor: 'rgba(255, 215, 0, 0.2)',
//                         border: '1px solid #FFD700',
//                         fontWeight: 'bold',
//                         color: '#333',
//                         height: '20px',
//                         '& .MuiChip-label': { fontSize: '0.6rem', px: 0.5 }
//                       }}
//                     />
//                   </Box>
//                 )}
                
//                 {editable && !photo.isMain && (
//                   <IconButton
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleSetMainPhoto(index);
//                     }}
//                     sx={{
//                       position: 'absolute',
//                       top: 4,
//                       right: 4,
//                       bgcolor: 'primary.main',
//                       color: 'white',
//                       '&:hover': { bgcolor: 'primary.dark' },
//                       width: 22,
//                       height: 22,
//                       zIndex: 10,
//                     }}
//                   >
//                     <StarBorderIcon sx={{ fontSize: '14px' }} />
//                   </IconButton>
//                 )}
                
//                 <Box sx={{
//                   width: '100%',
//                   height: '100%',
//                   transform: `rotate(${photoRotations[photo.id] || 0}deg)`,
//                   transition: 'transform 0.3s ease',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center'
//                 }}>
//                   <img
//                     src={photo.url}
//                     alt={`${currentLanguage === 'ua' ? 'Мініатюра' : 'Миниатюра'} ${index + 1}`}
//                     style={{ 
//                       objectFit: 'cover',
//                       width: '100%',
//                       height: '100%'
//                     }}
//                   />
//                 </Box>
                
//                 {editable && (
//                   <>
//                     <IconButton
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleRotatePhoto(photo.id, 'left');
//                       }}
//                       sx={{
//                         position: 'absolute',
//                         bottom: 32,
//                         right: 4,
//                         bgcolor: 'warning.main',
//                         color: 'white',
//                         '&:hover': { bgcolor: 'warning.dark' },
//                         width: 22,
//                         height: 22,
//                         zIndex: 10,
//                       }}
//                     >
//                       <RotateLeftIcon sx={{ fontSize: '14px' }} />
//                     </IconButton>
//                     <IconButton
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleRotatePhoto(photo.id, 'right');
//                       }}
//                       sx={{
//                         position: 'absolute',
//                         bottom: 4,
//                         right: 4,
//                         bgcolor: 'warning.main',
//                         color: 'white',
//                         '&:hover': { bgcolor: 'warning.dark' },
//                         width: 22,
//                         height: 22,
//                         zIndex: 10,
//                       }}
//                     >
//                       <RotateRightIcon sx={{ fontSize: '14px' }} />
//                     </IconButton>
//                   </>
//                 )}
                
//                 {editable && (
//                   <IconButton
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDeletePhoto(index);
//                     }}
//                     sx={{
//                       position: 'absolute',
//                       bottom: 4,
//                       left: 4,
//                       bgcolor: 'error.main',
//                       color: 'white',
//                       '&:hover': { bgcolor: 'error.dark' },
//                       width: 22,
//                       height: 22,
//                       zIndex: 10,
//                     }}
//                   >
//                     <DeleteIcon sx={{ fontSize: '14px' }} />
//                   </IconButton>
//                 )}
//               </Box>
//             ))}
//           </Box>
//         )}
  
//         {message && (
//           <Box sx={{ mt: 1, mb: 1, textAlign: 'center', px: 2 }}>
//             <Typography 
//               variant="body2" 
//               color={message.includes('❌') ? 'error' : 
//                      message.includes('⚠️') ? 'warning.main' : 
//                      message.includes('✅') ? 'success.main' : 'text.secondary'}
//               sx={{ 
//                 fontSize: isMobile ? '0.75rem' : '0.875rem',
//                 backgroundColor: message.includes('❌') ? '#ffebee' : 
//                                 message.includes('⚠️') ? '#fff3e0' :
//                                 message.includes('✅') ? '#e8f5e9' : 'transparent',
//                 p: (message.includes('❌') || message.includes('⚠️') || message.includes('✅')) ? 1 : 0,
//                 borderRadius: 1,
//                 fontWeight: (message.includes('❌') || message.includes('⚠️') || message.includes('✅')) ? 'bold' : 'normal'
//               }}
//             >
//               {message}
//             </Typography>
            
//             {editable && (
//               <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, fontSize: '0.7rem' }}>
//                 {t.maxLimitsInfo}
//               </Typography>
//             )}
//           </Box>
//         )}
//       </Box>
  
//       {!editable && (
//         <Box sx={{
//           width: isDesktop ? '300px' : '96%',
//           flexShrink: 0,
//           p: isMobile ? 1 : 3,
//           px: isMobile ? 1 : 3,
//           mx: isMobile ? 'auto' : 0,
//           bgcolor: '#f9f9f9',
//           display: 'flex',
//           flexDirection: 'column',
//           borderRadius: isMobile ? 2 : 0,
//           boxShadow: isMobile ? 1 : 0,
//         }}>
//           <Box sx={{ 
//             mb: 3,
//             backgroundColor: '#f0f8ff',
//             p: 2,
//             borderRadius: 1,
//             border: '1px solid #e0e0e0'
//           }}>
//             <Typography variant="h6" sx={{ 
//               fontWeight: 'bold',
//               color: 'text.secondary',
//               mb: 1,
//               fontSize: isDesktop ? '1rem' : (isMobile ? '0.9rem' : '1rem'),
//               textTransform: 'uppercase'
//             }}>
//               {t.priceTitle}
//             </Typography>
//             <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
//               <Typography variant="h4" sx={{ 
//                 fontWeight: 'bold',
//                 color: 'primary.main',
//                 fontSize: isDesktop ? '2.7rem' : (isMobile ? '2rem' : '2.7rem'),
//                 mr: 1
//               }}>
//                 {price}
//               </Typography>
//               <Typography variant="body1" sx={{ 
//                 color: 'text.secondary',
//                 fontSize: isDesktop ? '1.3rem' : (isMobile ? '1rem' : '1.3rem')
//               }}>
//                 {isHourly ? t.pricePerHour : t.pricePerDay}
//               </Typography>
//             </Box>
//           </Box>
  
//           <Box sx={{ 
//             mb: 3,
//             backgroundColor: '#f5eee0',
//             p: 2,
//             borderRadius: 1,
//             border: '1px solid #e0e0e0'
//           }}>
//             <Typography variant="h5" sx={{ 
//               fontWeight: 'bold',
//               mb: 1.5,
//               fontSize: isDesktop ? '1.5rem' : (isMobile ? '1.2rem' : '1.3rem'),
//               lineHeight: 1.2
//             }}>
//               {name}
//             </Typography>
            
//             <Typography variant="body1" sx={{ 
//               mb: 2,
//               fontSize: isDesktop ? '1.1rem' : (isMobile ? '0.9rem' : '1rem'),
//               color: 'text.secondary'
//             }}>
//               {t.contactOwner}
//             </Typography>
  
//             <Box sx={{ 
//               display: 'flex', 
//               flexDirection: 'column',
//               gap: 1,
//               p: 1.5,
//               bgcolor: '#f5f5f5',
//               borderRadius: 1,
//             }}>
//               {getPhones().map((phone, index) => (
//                 <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <IconButton 
//                     sx={{ p: 0.5, color: 'primary.main' }}
//                     onClick={() => window.open(`tel:${phone.replace(/\D/g, '')}`)}
//                   >
//                     <PhoneIcon fontSize="small" />
//                   </IconButton>
//                   <Typography
//                     component="a"
//                     href={`tel:${phone.replace(/\D/g, '')}`}
//                     sx={{
//                       color: 'primary.main',
//                       textDecoration: 'none',
//                       '&:hover': { textDecoration: 'underline' },
//                       cursor: 'pointer',
//                       fontSize: isDesktop ? '1rem' : (isMobile ? '0.9rem' : '1rem'),
//                       fontWeight: 'bold',
//                       flexGrow: 1
//                     }}
//                   >
//                     {phone}
//                   </Typography>
//                 </Box>
//               ))}
//             </Box>
//           </Box>
  
//           <Box sx={{ mt: 'auto' }}>
//             <Button 
//               variant="outlined" 
//               startIcon={<ReportIcon />}
//               fullWidth
//               onClick={() => handleActionButtonClick('report')}
//               sx={{ 
//                 mb: 1.5, 
//                 justifyContent: 'flex-start',
//                 py: 1.2,
//                 fontSize: isDesktop ? '0.8rem' : (isMobile ? '0.7rem' : '0.8rem'),
//                 borderRadius: 1,
//               }}
//             >
//               {t.reportButton}
//             </Button>
//             <Button 
//               variant="outlined" 
//               startIcon={<FeedbackIcon />}
//               fullWidth
//               onClick={() => handleActionButtonClick('feedback')}
//               sx={{ 
//                 mb: 1.5, 
//                 justifyContent: 'flex-start',
//                 py: 1.2,
//                 fontSize: isDesktop ? '0.8rem' : (isMobile ? '0.7rem' : '0.8rem'),
//                 borderRadius: 1,
//               }}
//             >
//               {t.feedbackButton}
//             </Button>
//             <Button 
//               variant="outlined" 
//               startIcon={<HelpIcon />}
//               fullWidth
//               onClick={() => handleActionButtonClick('help')}
//               sx={{ 
//                 justifyContent: 'flex-start',
//                 py: 1.2,
//                 fontSize: isDesktop ? '0.8rem' : (isMobile ? '0.7rem' : '0.8rem'),
//                 borderRadius: 1,
//               }}
//             >
//               {t.helpButton}
//             </Button>
//           </Box>
//         </Box>
//       )}

//       <Dialog open={authDialogOpen} onClose={handleCloseAuthDialog} fullWidth maxWidth="xs">
//         <DialogContent>
//           <CreateUser onClose={handleCloseAuthDialog} />
//         </DialogContent>
//       </Dialog>

//       <Dialog open={supportDialogOpen} onClose={handleCloseSupportDialog} fullWidth maxWidth="sm">
//         <DialogTitle>{getDialogTitle()}</DialogTitle>
//         <DialogContent>
//           <Typography variant="body1" sx={{ mb: 2 }}>
//             {t.instructions}
//           </Typography>
          
//           <Box sx={{ 
//             display: 'flex', 
//             alignItems: 'center', 
//             justifyContent: 'space-between',
//             p: 2,
//             backgroundColor: '#f5f5f5',
//             borderRadius: 1,
//             mb: 3
//           }}>
//             <Box>
//               <Typography variant="body2" color="text.secondary">{t.supportEmail}</Typography>
//               <Typography variant="h6" color="primary.main">nadoby.com.ua@gmail.com</Typography>
//             </Box>
//             <IconButton onClick={copyEmailToClipboard} color="primary" sx={{ ml: 1 }}>
//               <ContentCopyIcon />
//             </IconButton>
//           </Box>

//           {apartmentTitle && (
//             <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//               {currentLanguage === 'ua' ? 'Оголошення' : 'Объявление'}: {apartmentTitle}
//             </Typography>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseSupportDialog}>{t.close}</Button>
//           <Button onClick={openEmailClient} variant="contained" startIcon={<EmailIcon />}>
//             {t.openEmail}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog
//         fullScreen
//         open={fullscreenOpen}
//         onClose={handleCloseFullscreen}
//         sx={{ '& .MuiDialog-paper': { backgroundColor: 'rgba(0, 0, 0, 0.95)', margin: 0, overflow: 'hidden' } }}
//       >
//         <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
//           <IconButton
//             onClick={handleCloseFullscreen}
//             sx={{
//               position: 'absolute',
//               top: 16,
//               right: 16,
//               bgcolor: 'rgba(0, 0, 0, 0.5)',
//               color: 'white',
//               '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
//               width: 40,
//               height: 40,
//               zIndex: 1000,
//             }}
//           >
//             <CloseIcon />
//           </IconButton>

//           <Box 
//             {...fullscreenSwipeHandlers}
//             sx={{
//               flex: 1,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               position: 'relative',
//               overflow: 'hidden',
//               width: '100%',
//               height: 'calc(100% - 150px)',
//               backgroundColor: 'transparent',
//             }}
//           >
//             {localPhotos.map((photo, index) => (
//               <Box
//                 key={`fullscreen-slide-${photo.id}`}
//                 sx={{
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   width: '100%',
//                   height: '100%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   padding: 2,
//                   opacity: index === currentIndex ? 1 : 0,
//                   visibility: index === currentIndex ? 'visible' : 'hidden',
//                   transition: 'opacity 0.3s ease',
//                 }}
//               >
//                 <Box sx={{
//                   width: '100%',
//                   height: '100%',
//                   transform: `rotate(${photoRotations[photo.id] || 0}deg)`,
//                   transition: 'transform 0.3s ease'
//                 }}>
//                   <img
//                     src={photo.url}
//                     alt={`${currentLanguage === 'ua' ? 'Фото' : 'Фото'} ${index + 1}`}
//                     style={{ 
//                       objectFit: 'contain',
//                       width: '100%',
//                       height: '100%'
//                     }}
//                   />
//                 </Box>
//               </Box>
//             ))}

//             {localPhotos.length > 1 && (
//               <>
//                 <IconButton 
//                   onClick={handleFullscreenPrev}
//                   sx={{
//                     position: 'absolute',
//                     left: 16,
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     bgcolor: 'rgba(255,255,255,0.9)',
//                     width: 40,
//                     height: 40,
//                     '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
//                     zIndex: 100,
//                   }}
//                 >
//                   <ArrowBackIosNewIcon />
//                 </IconButton>
//                 <IconButton 
//                   onClick={handleFullscreenNext}
//                   sx={{
//                     position: 'absolute',
//                     right: 16,
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     bgcolor: 'rgba(255,255,255,0.9)',
//                     width: 40,
//                     height: 40,
//                     '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
//                     zIndex: 100,
//                   }}
//                 >
//                   <ArrowForwardIosIcon />
//                 </IconButton>

//                 <Box sx={{
//                   position: 'absolute',
//                   bottom: 20,
//                   left: '50%',
//                   transform: 'translateX(-50%)',
//                   bgcolor: 'rgba(0,0,0,0.7)',
//                   color: 'white',
//                   px: 3,
//                   py: 1,
//                   borderRadius: 4,
//                   fontSize: '1rem',
//                   zIndex: 100,
//                 }}>
//                   {currentIndex + 1}/{localPhotos.length}
//                 </Box>
//               </>
//             )}
//           </Box>

//           {localPhotos.length > 1 && (
//             <Box sx={{
//               height: '120px',
//               width: '100%',
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: 'rgba(0, 0, 0, 0.5)',
//               padding: 2,
//             }}>
//               <Box 
//                 ref={fullscreenThumbnailsRef}
//                 sx={{
//                   display: 'flex',
//                   gap: '10px',
//                   overflowX: 'auto',
//                   maxWidth: '100%',
//                   '&::-webkit-scrollbar': { height: '6px' },
//                   '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '3px' },
//                 }}
//               >
//                 {localPhotos.map((photo, index) => (
//                   <Box
//                     key={`fullscreen-thumb-${photo.id}`}
//                     onClick={() => setCurrentIndex(index)}
//                     sx={{
//                       width: '80px',
//                       height: '80px',
//                       flexShrink: 0,
//                       cursor: 'pointer',
//                       border: currentIndex === index ? '3px solid #1976d2' : '1px solid rgba(255,255,255,0.3)',
//                       borderRadius: 1,
//                       overflow: 'hidden',
//                       position: 'relative',
//                       transition: 'border 0.2s ease',
//                     }}
//                   >
//                     <Box sx={{
//                       width: '100%',
//                       height: '100%',
//                       transform: `rotate(${photoRotations[photo.id] || 0}deg)`,
//                       transition: 'transform 0.3s ease'
//                     }}>
//                       <img
//                         src={photo.url}
//                         alt={`${currentLanguage === 'ua' ? 'Мініатюра' : 'Миниатюра'} ${index + 1}`}
//                         style={{ 
//                           objectFit: 'cover',
//                           width: '100%',
//                           height: '100%'
//                         }}
//                       />
//                     </Box>
//                   </Box>
//                 ))}
//               </Box>
//             </Box>
//           )}
//         </Box>
//       </Dialog>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={5000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// });

// FileUploadSlider.displayName = 'FileUploadSlider';
// export default FileUploadSlider;


// FileUploadSlider.jsx - ПОЛНОСТЬЮ ИСПРАВЛЕННАЯ ВЕРСИЯ С ЛОГАМИ

'use client';

import React, { useState, useRef, useEffect, useCallback, memo, forwardRef, useImperativeHandle } from 'react';
import { 
  Box, 
  IconButton, 
  Typography, 
  Button, 
  Input,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogContent,
  Snackbar,
  Alert,
  DialogTitle,
  DialogActions,
  Chip
} from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import { useSelector } from 'react-redux';
import axios from 'axios';

// Динамический импорт CreateUser
import dynamic from 'next/dynamic';
const CreateUser = dynamic(() => import('@/app/components/CreateUser'), {
  loading: () => <CircularProgress size={40} />,
  ssr: false
});

// Иконки
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ReportIcon from '@mui/icons-material/Report';
import FeedbackIcon from '@mui/icons-material/Feedback';
import HelpIcon from '@mui/icons-material/Help';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';

import { useLanguage } from '@/app/LanguageContext';

// Константы
const MAX_PHOTOS = 15;
const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Функция для добавления водяного знака
const addWatermarkToImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new window.Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const fontSize = Math.max(14, Math.min(28, canvas.width * 0.025));
        const paddingHorizontal = Math.max(8, canvas.width * 0.015);
        const paddingVertical = Math.max(6, canvas.height * 0.012);
        
        ctx.font = `bold ${fontSize}px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        
        const watermarkText = 'NaDoby.com.ua';
        const x = paddingHorizontal;
        const y = canvas.height - paddingVertical;
        
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillText(watermarkText, x, y);
        
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeText(watermarkText, x, y);
        
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Не удалось создать изображение'));
            return;
          }
          
          const watermarkedFile = new File(
            [blob], 
            `watermarked_${Date.now()}_${file.name.replace(/\s+/g, '_')}`, 
            { type: file.type, lastModified: Date.now() }
          );
          
          resolve(watermarkedFile);
        }, file.type, 0.92);
      };
      
      img.onerror = () => reject(new Error('Ошибка загрузки изображения'));
      img.src = event.target.result;
    };
    
    reader.onerror = () => reject(new Error('Ошибка чтения файла'));
    reader.readAsDataURL(file);
  });
};

// Функция для реального поворота изображения через бэкенд
const rotateImagePermanently = async (photoUrl, angle, photoId) => {
  try {
    console.log(`[rotateImagePermanently] Sending rotation request for photo ${photoId} with angle ${angle}`);
    console.log(`[rotateImagePermanently] API_URL: ${API_URL}`);
    console.log(`[rotateImagePermanently] photoUrl: ${photoUrl}`);
    
    const response = await fetch(`${API_URL}/api/v1/rotate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageUrl: photoUrl,
        angle: angle,
        photoId: photoId
      }),
    });
    
    const data = await response.json();
    console.log(`[rotateImagePermanently] Response:`, data);
    
    if (response.ok && data.success) {
      console.log(`[rotateImagePermanently] Success! New URL: ${data.newUrl}`);
      return {
        success: true,
        newUrl: data.newUrl,
        oldUrl: photoUrl,
        photoId: photoId
      };
    } else {
      throw new Error(data.error || 'Rotation failed');
    }
  } catch (error) {
    console.error(`[rotateImagePermanently] Error:`, error);
    throw error;
  }
};

// Функции для склонения слов
const getPhotoWordUA = (count) => {
  if (count === 1) return 'фото';
  if (count >= 2 && count <= 4) return 'фотографії';
  return 'фотографій';
};

const getPhotoWordRU = (count) => {
  if (count === 1) return 'фото';
  if (count >= 2 && count <= 4) return 'фотографии';
  return 'фотографий';
};

// Переводы
const translations = {
  ua: {
    addPhotos: 'Додати фото',
    loading: 'Завантаження...',
    addPhotosCount: (count, max) => `Додати фото (${count}/${max})`,
    noPhotos: 'Фото відсутні',
    addPhotosPrompt: 'Додайте фотографії, натиснувши кнопку вище',
    priceTitle: 'Ціна оренди',
    pricePerHour: 'грн./година',
    pricePerDay: 'грн./доба',
    contactOwner: 'Зателефонуйте власнику, щоб уточнити всі деталі оренди',
    reportButton: 'Повідомити про неактуальну інформацію',
    feedbackButton: 'Залишити відгук про житло',
    helpButton: 'У мене виникли складнощі при проживанні',
    errorFileType: 'Недопустимий формат файлів:',
    errorFileSize: 'Деякі файли перевищують',
    errorMaxPhotos: 'Можна завантажити максимум',
    errorPartialUpload: 'Можна додати тільки',
    photos: 'фото',
    successUpload: '✅ Файли завантажено!',
    errorUpload: '❌ Помилка:',
    unknownError: 'Невідома помилка сервера',
    uploadError: '❌ Помилка при завантаженні файлів',
    authRequired: 'Для цієї дії необхідно авторизуватися',
    authRequiredTitle: 'Потрібна авторизація',
    close: 'Закрити',
    login: 'Увійти',
    loginRequired: 'Будь ласка, увійдіть щоб виконати цю дію',
    actionSuccess: 'Дякуємо за ваше повідомлення!',
    contactSupport: "Зв'язатися з підтримкою",
    supportEmail: 'Електронна пошта підтримки',
    copyEmail: 'Скопіювати пошту',
    emailCopied: 'Пошту скопійовано!',
    openEmail: 'Написати на пошту',
    reportTitle: 'Повідомлення про неактуальну інформації',
    feedbackTitle: 'Залишити відгук про житло',
    helpTitle: 'Повідомити про складнощі при проживанні',
    instructions: 'Скопіюйте електронну адресу та напишіть нам, або натисніть кнопку для відкриття поштового клієнта',
    invalidFormat: (invalidNames) => `❌ Недопустимий формат файлів: ${invalidNames}. Дозволено: JPEG, PNG, WebP, HEIC`,
    oversizedFiles: (oversizedNames) => `❌ Деякі файли перевищують ${MAX_FILE_SIZE_MB}MB: ${oversizedNames}`,
    maxPhotosLimit: `❌ Можна завантажити максимум ${MAX_PHOTOS} фото. У вас вже`,
    maxPhotosPlural: (count) => `${count} ${getPhotoWordUA(count)}`,
    totalSizeError: `❌ Загальний розмір файлів занадто великий. Максимум: ${MAX_FILE_SIZE_BYTES * 3}MB`,
    partialUploadWarning: (allowed) => `⚠️ Можна додати тільки ${allowed} ${getPhotoWordUA(allowed)}. Інші файли не будуть завантажені`,
    networkError: '❌ Помилка мережі. Перевірте підключення до інтернету',
    fileTooLarge: `❌ Файл занадто великий. Максимальний розмір: ${MAX_FILE_SIZE_MB}MB`,
    maxLimitsInfo: `Максимум: ${MAX_PHOTOS} фото, ${MAX_FILE_SIZE_MB}MB на файл`,
    copyError: 'Помилка копіювання',
    mainPhotoLabel: 'Головне фото',
    setAsMain: 'Зробити головним фото',
    mainPhoto: 'Головне',
    isMain: 'Головне фото',
    fullscreen: 'На весь екран',
    exitFullscreen: 'Вийти з повноекранного режиму',
    rotating: 'Поворот...',
    rotationSaved: 'Фото повернуто!',
    rotationError: 'Помилка повороту фото',
  },
  ru: {
    addPhotos: 'Добавить фото',
    loading: 'Загрузка...',
    addPhotosCount: (count, max) => `Добавить фото (${count}/${max})`,
    noPhotos: 'Фото отсутствуют',
    addPhotosPrompt: 'Добавьте фотографии, нажав кнопку выше',
    priceTitle: 'Цена аренды',
    pricePerHour: 'грн./час',
    pricePerDay: 'грн./сутки',
    contactOwner: 'Позвоните владельцу, чтобы уточнить все детали аренды',
    reportButton: 'Сообщить о неактуальной информации',
    feedbackButton: 'Оставить отзыв о жилье',
    helpButton: 'У меня возникли сложности при проживании',
    errorFileType: 'Недопустимый формат файлов:',
    errorFileSize: 'Некоторые файлы превышают',
    errorMaxPhotos: 'Можно загрузить максимум',
    errorPartialUpload: 'Можно добавить только',
    photos: 'фото',
    successUpload: '✅ Файлы загружены!',
    errorUpload: '❌ Ошибка:',
    unknownError: 'Неизвестная ошибка сервера',
    uploadError: '❌ Ошибка при загрузке файлов',
    authRequired: 'Для этого действия необходимо авторизоваться',
    authRequiredTitle: 'Требуется авторизация',
    close: 'Закрыть',
    login: 'Войти',
    loginRequired: 'Пожалуйста, войдите чтобы выполнить это действие',
    actionSuccess: 'Спасибо за ваше сообщение!',
    contactSupport: 'Связаться с поддержкой',
    supportEmail: 'Электронная почта поддержки',
    copyEmail: 'Скопировать почту',
    emailCopied: 'Почта скопирована!',
    openEmail: 'Написать на почту',
    reportTitle: 'Сообщение о неактуальной информации',
    feedbackTitle: 'Оставить отзыв о жилье',
    helpTitle: 'Сообщить о сложностях при проживании',
    instructions: 'Скопируйте электронный адрес и напишите нам, или нажмите кнопку для открытия почтового клиента',
    invalidFormat: (invalidNames) => `❌ Недопустимый формат файлов: ${invalidNames}. Разрешены: JPEG, PNG, WebP, HEIC`,
    oversizedFiles: (oversizedNames) => `❌ Некоторые файлы превышают ${MAX_FILE_SIZE_MB}MB: ${oversizedNames}`,
    maxPhotosLimit: `❌ Можно загрузить максимум ${MAX_PHOTOS} фото. У вас уже`,
    maxPhotosPlural: (count) => `${count} ${getPhotoWordRU(count)}`,
    totalSizeError: `❌ Общий размер файлов слишком большой. Максимум: ${MAX_FILE_SIZE_BYTES * 3}MB`,
    partialUploadWarning: (allowed) => `⚠️ Можно добавить только ${allowed} ${getPhotoWordRU(allowed)}. Остальные файлы не будут загружены`,
    networkError: '❌ Ошибка сети. Проверьте подключение к интернету',
    fileTooLarge: `❌ Файл слишком большой. Максимальный размер: ${MAX_FILE_SIZE_MB}MB`,
    maxLimitsInfo: `Максимум: ${MAX_PHOTOS} фото, ${MAX_FILE_SIZE_MB}MB на файл`,
    copyError: 'Ошибка копирования',
    mainPhotoLabel: 'Главное фото',
    setAsMain: 'Сделать главным фото',
    mainPhoto: 'Главное',
    isMain: 'Главное фото',
    fullscreen: 'На весь экран',
    exitFullscreen: 'Выйти из полноэкранного режима',
    rotating: 'Поворот...',
    rotationSaved: 'Фото повернуто!',
    rotationError: 'Ошибка поворота фото',
  }
};

const FileUploadSlider = forwardRef(({ 
  photos = [], 
  onDelete, 
  setUploadImages,
  price = '0', 
  name = 'Имя не указано', 
  phones = [], 
  address = '',
  category = '',
  editable = false,
  onPhotosChange,
  onMainPhotoChange,
  apartmentId = null,
  apartmentTitle = '',
  isMobileView = false
}, ref) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.ua;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localPhotos, setLocalPhotos] = useState([]);
  const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [pendingAction, setPendingAction] = useState(null);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [supportDialogOpen, setSupportDialogOpen] = useState(false);
  const [currentActionType, setCurrentActionType] = useState('');
  const [photoRotations, setPhotoRotations] = useState({});
  const [isRotating, setIsRotating] = useState(false);
  
  const fileInputRef = useRef(null);
  const thumbnailsRef = useRef(null);
  const fullscreenThumbnailsRef = useRef(null);
  const autoCloseTimer = useRef(null);
  
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.profile);

  // Инициализация фотографий
  useEffect(() => {
    console.log('[FileUploadSlider] useEffect photos changed:', photos);
    if (!Array.isArray(photos)) {
      setLocalPhotos([]);
      return;
    }

    const processedPhotos = photos.map((photo, index) => {
      if (typeof photo === 'string') {
        return { 
          url: photo, 
          file: null, 
          id: `photo-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 8)}`,
          isMain: index === 0
        };
      }
      return photo;
    }).filter(Boolean);

    setLocalPhotos(processedPhotos);
    
    const mainIndex = processedPhotos.findIndex(photo => photo.isMain);
    if (mainIndex !== -1) {
      setMainPhotoIndex(mainIndex);
      setCurrentIndex(mainIndex);
    } else if (processedPhotos.length > 0) {
      setMainPhotoIndex(0);
      setCurrentIndex(0);
      const updatedPhotos = [...processedPhotos];
      updatedPhotos[0].isMain = true;
      setLocalPhotos(updatedPhotos);
    }
  }, [photos]);

  // Функция для сохранения всех повернутых фото
  const saveAllRotations = useCallback(async () => {
    console.log('[saveAllRotations] Called');
    console.log('[saveAllRotations] Current localPhotos:', localPhotos.map(p => ({ id: p.id, url: p.url })));
    console.log('[saveAllRotations] Current photoRotations:', photoRotations);
    
    const photosToRotate = localPhotos.filter(photo => (photoRotations[photo.id] || 0) !== 0);
    
    console.log('[saveAllRotations] Photos to rotate:', photosToRotate.length);
    
    if (photosToRotate.length === 0) {
      console.log('[saveAllRotations] No photos to rotate');
      return { success: true, updatedPhotos: localPhotos };
    }
    
    setIsRotating(true);
    const results = [];
    
    for (const photo of photosToRotate) {
      const angle = photoRotations[photo.id] || 0;
      console.log(`[saveAllRotations] Rotating photo ${photo.id} by ${angle} degrees`);
      try {
        const result = await rotateImagePermanently(photo.url, angle, photo.id);
        if (result.success) {
          console.log(`[saveAllRotations] Rotation successful for ${photo.id}, new URL: ${result.newUrl}`);
          results.push(result);
        }
      } catch (error) {
        console.error(`[saveAllRotations] Error rotating photo ${photo.id}:`, error);
      }
    }
    
    const updatedPhotos = [...localPhotos];
    for (const result of results) {
      const photoIndex = updatedPhotos.findIndex(p => p.id === result.photoId);
      if (photoIndex !== -1) {
        console.log(`[saveAllRotations] Updating photo ${result.photoId} with new URL ${result.newUrl}`);
        updatedPhotos[photoIndex] = {
          ...updatedPhotos[photoIndex],
          url: result.newUrl,
          id: `rotated_${Date.now()}_${result.photoId}`
        };
      }
    }
    
    setPhotoRotations({});
    setLocalPhotos(updatedPhotos);
    
    if (setUploadImages) {
      console.log('[saveAllRotations] Updating parent uploadImages');
      setUploadImages(updatedPhotos.map(p => p.url));
    }
    
    setIsRotating(false);
    console.log('[saveAllRotations] Completed. Updated photos:', updatedPhotos.map(p => p.url));
    return { success: true, updatedPhotos };
  }, [localPhotos, photoRotations, setUploadImages]);

  // Метод для получения текущих фото
  const getCurrentPhotos = useCallback(() => {
    console.log('[getCurrentPhotos] Called');
    console.log('[getCurrentPhotos] localPhotos:', localPhotos.map(p => ({ id: p.id, url: p.url })));
    console.log('[getCurrentPhotos] photoRotations:', photoRotations);
    
    return localPhotos.map(photo => ({
      ...photo,
      url: photo.url,
      rotation: photoRotations[photo.id] || 0
    }));
  }, [localPhotos, photoRotations]);

  // Экспортируем методы через ref
  useImperativeHandle(ref, () => ({
    getCurrentPhotos,
    getCurrentPhotosUrls: () => {
      const urls = localPhotos.map(p => p.url);
      console.log('[getCurrentPhotosUrls] Called, returning:', urls);
      return urls;
    },
    getRotations: () => {
      console.log('[getRotations] Called, returning:', photoRotations);
      return photoRotations;
    },
    saveAllRotations: saveAllRotations
  }));

  // Экспортируем функцию сохранения поворотов в window
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.savePhotoRotations = async () => {
        console.log('[window.savePhotoRotations] Called');
        console.log('[window.savePhotoRotations] Current rotations:', photoRotations);
        const result = await saveAllRotations();
        console.log('[window.savePhotoRotations] Result:', result);
        return result.updatedPhotos;
      };
    }
  }, [photoRotations, saveAllRotations]);

  // Скролл миниатюр
  useEffect(() => {
    if (thumbnailsRef.current && localPhotos.length > 0) {
      const thumbnailsContainer = thumbnailsRef.current;
      const thumbnailElements = thumbnailsContainer.children;
      
      if (thumbnailElements.length > currentIndex) {
        const currentThumbnail = thumbnailElements[currentIndex];
        const containerWidth = thumbnailsContainer.clientWidth;
        const thumbnailWidth = currentThumbnail.offsetWidth;
        const scrollLeft = currentThumbnail.offsetLeft - (containerWidth / 2) + (thumbnailWidth / 2);
        
        thumbnailsContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [currentIndex, localPhotos.length]);

  useEffect(() => {
    if (fullscreenOpen && fullscreenThumbnailsRef.current && localPhotos.length > 0) {
      const thumbnailsContainer = fullscreenThumbnailsRef.current;
      const thumbnailElements = thumbnailsContainer.children;
      
      if (thumbnailElements.length > currentIndex) {
        const currentThumbnail = thumbnailElements[currentIndex];
        const containerWidth = thumbnailsContainer.clientWidth;
        const thumbnailWidth = currentThumbnail.offsetWidth;
        const scrollLeft = currentThumbnail.offsetLeft - (containerWidth / 2) + (thumbnailWidth / 2);
        
        requestAnimationFrame(() => {
          thumbnailsContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        });
      }
    }
  }, [currentIndex, localPhotos.length, fullscreenOpen]);

  const startAutoCloseTimer = useCallback(() => {
    if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
    autoCloseTimer.current = setTimeout(() => {
      setAuthDialogOpen(false);
      setSnackbar(prev => ({ ...prev, open: false }));
    }, 5000);
  }, []);

  const showSnackbar = useCallback((message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar({ ...snackbar, open: false });
    if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
  }, [snackbar]);

  // Поворот фото (визуально, через CSS)
  const handleRotatePhoto = useCallback((photoId, direction) => {
    console.log(`[handleRotatePhoto] Photo: ${photoId}, direction: ${direction}`);
    setPhotoRotations(prev => {
      const currentAngle = prev[photoId] || 0;
      const newAngle = direction === 'left' ? currentAngle - 90 : currentAngle + 90;
      console.log(`[handleRotatePhoto] Angle changed from ${currentAngle} to ${newAngle}`);
      return { ...prev, [photoId]: newAngle };
    });
  }, []);

  // Загрузка файлов
  const uploadFiles = useCallback(async (files) => {
    if (files.length === 0) {
      setMessage(t.uploadError);
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    try {
      setIsLoading(true);
      
      const res = await fetch(`${API_URL}/api/v1/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        let uploadedUrls = [];
        if (data.urls && Array.isArray(data.urls)) uploadedUrls = data.urls;
        else if (data.uploaded && Array.isArray(data.uploaded)) uploadedUrls = data.uploaded.map(item => item.url);
        else if (data.url) uploadedUrls = [data.url];
        
        setMessage(t.successUpload);
        
        const newPhotos = uploadedUrls.map((url, index) => ({
          url,
          file: null,
          id: `uploaded-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
          isMain: localPhotos.length === 0 && index === 0
        }));

        const updatedPhotos = [...localPhotos, ...newPhotos];
        
        if (localPhotos.length === 0 && updatedPhotos.length > 0) {
          updatedPhotos[0].isMain = true;
          setMainPhotoIndex(0);
          setCurrentIndex(0);
        }
        
        setLocalPhotos(updatedPhotos);
        setCurrentIndex(updatedPhotos.length - 1);

        if (setUploadImages) setUploadImages(updatedPhotos.map(photo => photo.url));
        if (onPhotosChange) onPhotosChange(updatedPhotos.length);
        if (localPhotos.length === 0 && newPhotos.length > 0 && onMainPhotoChange) {
          onMainPhotoChange(0);
        }
      } else {
        setMessage(`❌ ${data.error || t.unknownError}`);
      }
    } catch (err) {
      console.error('Ошибка загрузки:', err);
      setMessage(t.networkError);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [localPhotos, t, setUploadImages, onPhotosChange, onMainPhotoChange]);

  // Обработка загрузки файлов с водяным знаком
  const handleFileUpload = useCallback(async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const invalidFiles = files.filter(file => !ALLOWED_FILE_TYPES.includes(file.type));
    if (invalidFiles.length > 0) {
      setMessage(t.invalidFormat(invalidFiles.map(f => f.name).join(', ')));
      return;
    }

    const oversizedFiles = files.filter(file => file.size > MAX_FILE_SIZE_BYTES);
    if (oversizedFiles.length > 0) {
      setMessage(t.oversizedFiles(oversizedFiles.map(f => f.name).join(', ')));
      return;
    }

    if (localPhotos.length + files.length > MAX_PHOTOS) {
      const photoWord = currentLanguage === 'ua' ? getPhotoWordUA(localPhotos.length) : getPhotoWordRU(localPhotos.length);
      setMessage(`${t.maxPhotosLimit} ${localPhotos.length} ${photoWord}`);
      return;
    }

    const allowedCount = MAX_PHOTOS - localPhotos.length;
    const filesToAdd = files.slice(0, allowedCount);

    setIsLoading(true);
    
    try {
      const watermarkedFiles = await Promise.all(
        filesToAdd.map(async (file) => {
          try {
            return await addWatermarkToImage(file);
          } catch (error) {
            console.error('Ошибка водяного знака:', error);
            return file;
          }
        })
      );
      await uploadFiles(watermarkedFiles);
    } catch (error) {
      console.error('Ошибка обработки файлов:', error);
      setMessage(t.uploadError);
      setIsLoading(false);
    }
  }, [localPhotos, t, currentLanguage, uploadFiles]);

  // Удаление фото
  const handleDeletePhoto = useCallback((index) => {
    const newPhotos = [...localPhotos];
    const deletedPhoto = newPhotos[index];
    const isMain = deletedPhoto.isMain;
    
    newPhotos.splice(index, 1);
    
    setPhotoRotations(prev => {
      const newRotations = { ...prev };
      delete newRotations[deletedPhoto.id];
      return newRotations;
    });
    
    if (isMain && newPhotos.length > 0) {
      newPhotos[0].isMain = true;
      setMainPhotoIndex(0);
      if (onMainPhotoChange) onMainPhotoChange(0);
    }
    
    setLocalPhotos(newPhotos);
    if (setUploadImages) setUploadImages(newPhotos.map(photo => photo.url));
    if (onPhotosChange) onPhotosChange(newPhotos.length);

    setCurrentIndex(prev => {
      if (prev >= newPhotos.length) return Math.max(0, newPhotos.length - 1);
      if (prev === index && index > 0) return index - 1;
      return prev;
    });
  }, [localPhotos, setUploadImages, onPhotosChange, onMainPhotoChange]);

  // Установка главного фото
  const handleSetMainPhoto = useCallback((index) => {
    if (index === mainPhotoIndex) return;
    
    const newPhotos = [...localPhotos];
    
    if (mainPhotoIndex >= 0 && mainPhotoIndex < newPhotos.length) {
      newPhotos[mainPhotoIndex].isMain = false;
    }
    
    newPhotos[index].isMain = true;
    
    setLocalPhotos(newPhotos);
    setMainPhotoIndex(index);
    setCurrentIndex(index);
    
    if (onMainPhotoChange) onMainPhotoChange(index);
    
    if (setUploadImages) {
      const urls = newPhotos.map(photo => photo.url);
      const mainPhotoUrl = urls[index];
      const reorderedUrls = [mainPhotoUrl, ...urls.filter((_, i) => i !== index)];
      setUploadImages(reorderedUrls);
    }
    
    if (editable) {
      showSnackbar(`${t.mainPhotoLabel} ${currentLanguage === 'ua' ? 'змінено' : 'изменено'}`, 'success');
    }
  }, [localPhotos, mainPhotoIndex, t, editable, currentLanguage, onMainPhotoChange, setUploadImages, showSnackbar]);

  // Навигация
  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % localPhotos.length);
  }, [localPhotos.length]);
  
  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + localPhotos.length) % localPhotos.length);
  }, [localPhotos.length]);

  const handleThumbnailClick = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const handleFullscreenNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % localPhotos.length);
  }, [localPhotos.length]);
  
  const handleFullscreenPrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + localPhotos.length) % localPhotos.length);
  }, [localPhotos.length]);

  // Свайпы
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const fullscreenSwipeHandlers = useSwipeable({
    onSwipedLeft: handleFullscreenNext,
    onSwipedRight: handleFullscreenPrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  // Телефоны
  const getPhones = useCallback(() => {
    try {
      if (!Array.isArray(phones)) return ['+380XXXXXXXXX'];
      return phones.filter(phone => 
        typeof phone === 'string' && 
        phone.length >= 12 &&
        phone.startsWith('+380')
      );
    } catch {
      return ['+380XXXXXXXXX'];
    }
  }, [phones]);

  const isHourly = category?.toLowerCase().includes('сауна') || category?.toLowerCase().includes('баня');

  // Полноэкранный режим
  const handleOpenFullscreen = useCallback(() => {
    if (!editable) setFullscreenOpen(true);
  }, [editable]);

  const handleCloseFullscreen = useCallback(() => {
    setFullscreenOpen(false);
  }, []);

  // Диалоги поддержки
  const handleOpenSupportDialog = useCallback((actionType) => {
    setCurrentActionType(actionType);
    setSupportDialogOpen(true);
  }, []);

  const handleCloseSupportDialog = useCallback(() => {
    setSupportDialogOpen(false);
    setCurrentActionType('');
  }, []);

  const copyEmailToClipboard = useCallback(() => {
    navigator.clipboard.writeText('nadoby.com.ua@gmail.com')
      .then(() => showSnackbar(t.emailCopied, 'success'))
      .catch(err => {
        console.error('Failed to copy email: ', err);
        showSnackbar(t.copyError, 'error');
      });
  }, [t, showSnackbar]);

  const openEmailClient = useCallback(() => {
    const actionSubjects = {
      report: currentLanguage === 'ua' ? 'Неактуальна інформація' : 'Неактуальная информация',
      feedback: currentLanguage === 'ua' ? 'Відгук про житло' : 'Отзыв о жилье',
      help: currentLanguage === 'ua' ? 'Проблеми при проживанні' : 'Проблемы при проживании'
    };

    const emailSubject = `${actionSubjects[currentActionType]} - ${currentLanguage === 'ua' ? 'Оголошення' : 'Объявление'} #${apartmentId}`;
    const emailBody = `
${currentLanguage === 'ua' ? 'Користувач' : 'Пользователь'}: ${user?.name || (currentLanguage === 'ua' ? 'Не вказано' : 'Не указано')} (${user?.email || (currentLanguage === 'ua' ? 'Не вказано' : 'Не указано')})
${currentLanguage === 'ua' ? 'ID оголошення' : 'ID объявления'}: ${apartmentId}
${currentLanguage === 'ua' ? 'Назва оголошення' : 'Название объявления'}: ${apartmentTitle}
${currentLanguage === 'ua' ? 'Тип звернення' : 'Тип обращения'}: ${actionSubjects[currentActionType]}

${currentLanguage === 'ua' ? 'Повідомлення' : 'Сообщение'}:
`;

    window.location.href = `mailto:nadoby.com.ua@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    showSnackbar(t.actionSuccess, 'success');
    handleCloseSupportDialog();
  }, [currentActionType, currentLanguage, apartmentId, apartmentTitle, user, t, showSnackbar, handleCloseSupportDialog]);

  const handleActionButtonClick = useCallback((actionType) => {
    if (!isAuthenticated) {
      setPendingAction(actionType);
      setAuthDialogOpen(true);
      setSnackbar({ open: true, message: t.loginRequired, severity: 'info' });
      startAutoCloseTimer();
      return;
    }
    handleOpenSupportDialog(actionType);
  }, [isAuthenticated, t, startAutoCloseTimer, handleOpenSupportDialog]);

  const handleCloseAuthDialog = useCallback(() => {
    setAuthDialogOpen(false);
    if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
  }, []);

  const getDialogTitle = useCallback(() => {
    switch (currentActionType) {
      case 'report': return t.reportTitle;
      case 'feedback': return t.feedbackTitle;
      case 'help': return t.helpTitle;
      default: return t.contactSupport;
    }
  }, [currentActionType, t]);

  // Клавиши
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (fullscreenOpen) {
        if (e.key === 'Escape') handleCloseFullscreen();
        else if (e.key === 'ArrowLeft') handleFullscreenPrev();
        else if (e.key === 'ArrowRight') handleFullscreenNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenOpen, handleFullscreenPrev, handleFullscreenNext, handleCloseFullscreen]);

  useEffect(() => {
    return () => {
      if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
    };
  }, []);

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: isDesktop ? 'row' : 'column',
      width: '100%',
      maxWidth: isDesktop ? '1200px' : '100%',
      mx: 'auto',
      mb: 3,
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: 3,
    }}>
      <Box sx={{ 
        width: isDesktop && !editable ? '850px' : '100%',
        flexShrink: 0,
        position: 'relative',
      }}>
        <Input
          inputRef={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          inputProps={{ 
            accept: ALLOWED_FILE_TYPES.join(','), 
            multiple: true 
          }}
          sx={{ display: 'none' }}
        />
  
        {editable && (
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: isMobile ? 1 : 2,
            bgcolor: '#f0f0f0',
            gap: 1
          }}>
            <Button
              variant="contained"
              startIcon={<AddPhotoAlternateIcon />}
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading || isRotating || localPhotos.length >= MAX_PHOTOS}
              sx={{ 
                minWidth: isMobile ? '200px' : '300px',
                fontSize: isMobile ? '0.8rem' : '1rem'
              }}
            >
              {isLoading ? t.loading : t.addPhotosCount(localPhotos.length, MAX_PHOTOS)}
            </Button>
          </Box>
        )}
  
        {localPhotos.length > 0 ? (
          <Box {...swipeHandlers} sx={{
            width: '100%',
            height: isMobile ? '300px' : '500px',
            position: 'relative',
            overflow: 'hidden',
            cursor: !editable ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
          }}>
            {editable && localPhotos[currentIndex]?.isMain && (
              <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
                <Chip
                  icon={<StarIcon sx={{ color: '#FFD700', fontSize: '16px' }} />}
                  label={t.mainPhoto}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    border: '1px solid #FFD700',
                    fontWeight: 'bold',
                    color: '#333',
                    height: '24px',
                    '& .MuiChip-label': { fontSize: '0.7rem', px: 1 }
                  }}
                />
              </Box>
            )}
  
            <Box sx={{ 
              position: 'relative', 
              width: '100%', 
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Box sx={{
                width: '100%',
                height: '100%',
                transform: `rotate(${photoRotations[localPhotos[currentIndex]?.id] || 0}deg)`,
                transition: 'transform 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src={localPhotos[currentIndex]?.url}
                  alt={`${currentLanguage === 'ua' ? 'Фото' : 'Фото'} ${currentIndex + 1}`}
                  style={{ 
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                  }}
                  onClick={handleOpenFullscreen}
                />
              </Box>
            </Box>
  
            {!editable && (
              <IconButton
                onClick={handleOpenFullscreen}
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                  width: 32,
                  height: 32,
                  zIndex: 10,
                }}
              >
                <FullscreenIcon sx={{ fontSize: 20 }} />
              </IconButton>
            )}
  
            {localPhotos.length > 1 && (
              <>
                <IconButton 
                  onClick={handlePrev} 
                  sx={{ 
                    position: 'absolute', 
                    left: isMobile ? 8 : 16, 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    bgcolor: 'rgba(255,255,255,0.9)',
                    width: 32,
                    height: 32,
                    zIndex: 10,
                  }}
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <IconButton 
                  onClick={handleNext} 
                  sx={{ 
                    position: 'absolute', 
                    right: isMobile ? 8 : 16, 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    bgcolor: 'rgba(255,255,255,0.9)',
                    width: 32,
                    height: 32,
                    zIndex: 10,
                  }}
                >
                  <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </>
            )}
  
            <Box sx={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: 4,
              fontSize: '0.8rem',
              zIndex: 10,
            }}>
              {currentIndex + 1}/{localPhotos.length}
            </Box>
  
            {editable && (
              <>
                <IconButton
                  onClick={() => handleDeletePhoto(currentIndex)}
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    bgcolor: 'error.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'error.dark' },
                    width: 32,
                    height: 32,
                    zIndex: 10,
                  }}
                >
                  <DeleteIcon sx={{ fontSize: 20 }} />
                </IconButton>
                
                {!localPhotos[currentIndex]?.isMain && (
                  <IconButton
                    onClick={() => handleSetMainPhoto(currentIndex)}
                    sx={{
                      position: 'absolute',
                      top: isMobile ? 62 : 52,    // ← уменьшили для мобильных
                      right: isMobile ? 10 : 10,
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' },
                      width: isMobile ? 28 : 32,
                      height: isMobile ? 28 : 32,
                      zIndex: 10,
                    }}
                  >
                    <StarBorderIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                )}
                
                <IconButton
                  onClick={() => handleRotatePhoto(localPhotos[currentIndex]?.id, 'left')}
                  sx={{
                    position: 'absolute',
                    top: isMobile ? 183 : 94,      // ← подняли для мобильных (было 94, стало 76)
                    right: isMobile ? 10 : 10,
                    bgcolor: 'warning.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'warning.dark' },
                    width: isMobile ? 28 : 32,
                    height: isMobile ? 28 : 32,
                    zIndex: 10,
                  }}
                >
                  <RotateLeftIcon sx={{ fontSize: 20 }} />
                </IconButton>
                
                <IconButton
                  onClick={() => handleRotatePhoto(localPhotos[currentIndex]?.id, 'right')}
                  sx={{
                    position: 'absolute',
                    top: isMobile ? 222 : 136,    // ← подняли для мобильных (было 136, стало 110)
                    right: isMobile ? 10 : 10,
                    bgcolor: 'warning.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'warning.dark' },
                    width: isMobile ? 28 : 32,
                    height: isMobile ? 28 : 32,
                    zIndex: 10,
                  }}
                >
                  <RotateRightIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: isMobile ? '300px' : '500px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
              border: editable ? '2px dashed #ccc' : 'none',
            }}
          >
            {isLoading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <CircularProgress size={isMobile ? 40 : 60} />
                <Typography variant="body2" color="text.secondary">
                  {t.loading}
                </Typography>
              </Box>
            ) : (
              <Typography 
                variant="h6" 
                color="text.secondary" 
                align="center"
                sx={{ fontSize: isMobile ? '1rem' : '1.25rem', px: 2 }}
              >
                {editable ? t.addPhotosPrompt : t.noPhotos}
              </Typography>
            )}
          </Box>
        )}
  
        {localPhotos.length > 0 && (
          <Box 
            ref={thumbnailsRef}
            sx={{
              display: 'flex',
              gap: isMobile ? '3px' : '7px',
              pt: isMobile ? '3px' : 0.5,
              pb: isMobile ? 0 : 2,
              px: isMobile ? 0 : 0.4,
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': { height: '6px' },
              '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '3px' },
            }}
          >
            {localPhotos.map((photo, index) => (
              <Box
                key={photo.id}
                onClick={() => handleThumbnailClick(index)}
                sx={{
                  width: isMobile ? 'calc(50% - 2.5px)' : '273.4px',
                  height: isMobile ? '180px' : '250px',
                  flexShrink: 0,
                  cursor: 'pointer',
                  border: currentIndex === index ? '3px solid #1976d2' : '1px solid #ddd',
                  borderRadius: 1,
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'border 0.2s ease',
                }}
              >
                {editable && photo.isMain && (
                  <Box sx={{ position: 'absolute', top: 4, left: 4, zIndex: 10 }}>
                    <Chip
                      icon={<StarIcon sx={{ color: '#FFD700', fontSize: '12px' }} />}
                      label={t.mainPhoto}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(255, 215, 0, 0.2)',
                        border: '1px solid #FFD700',
                        fontWeight: 'bold',
                        color: '#333',
                        height: '20px',
                        '& .MuiChip-label': { fontSize: '0.6rem', px: 0.5 }
                      }}
                    />
                  </Box>
                )}
                
                {editable && !photo.isMain && (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetMainPhoto(index);
                    }}
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' },
                      width: 22,
                      height: 22,
                      zIndex: 10,
                    }}
                  >
                    <StarBorderIcon sx={{ fontSize: '14px' }} />
                  </IconButton>
                )}
                
                <Box sx={{
                  width: '100%',
                  height: '100%',
                  transform: `rotate(${photoRotations[photo.id] || 0}deg)`,
                  transition: 'transform 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    src={photo.url}
                    alt={`${currentLanguage === 'ua' ? 'Мініатюра' : 'Миниатюра'} ${index + 1}`}
                    style={{ 
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </Box>
                
                {editable && (
                  <>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRotatePhoto(photo.id, 'left');
                      }}
                      sx={{
                        position: 'absolute',
                        bottom: 32,
                        right: 4,
                        bgcolor: 'warning.main',
                        color: 'white',
                        '&:hover': { bgcolor: 'warning.dark' },
                        width: 22,
                        height: 22,
                        zIndex: 10,
                      }}
                    >
                      <RotateLeftIcon sx={{ fontSize: '14px' }} />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRotatePhoto(photo.id, 'right');
                      }}
                      sx={{
                        position: 'absolute',
                        bottom: 4,
                        right: 4,
                        bgcolor: 'warning.main',
                        color: 'white',
                        '&:hover': { bgcolor: 'warning.dark' },
                        width: 22,
                        height: 22,
                        zIndex: 10,
                      }}
                    >
                      <RotateRightIcon sx={{ fontSize: '14px' }} />
                    </IconButton>
                  </>
                )}
                
                {editable && (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePhoto(index);
                    }}
                    sx={{
                      position: 'absolute',
                      bottom: 4,
                      left: 4,
                      bgcolor: 'error.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'error.dark' },
                      width: 22,
                      height: 22,
                      zIndex: 10,
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: '14px' }} />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        )}
  
        {message && (
          <Box sx={{ mt: 1, mb: 1, textAlign: 'center', px: 2 }}>
            <Typography 
              variant="body2" 
              color={message.includes('❌') ? 'error' : 
                     message.includes('⚠️') ? 'warning.main' : 
                     message.includes('✅') ? 'success.main' : 'text.secondary'}
              sx={{ 
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                backgroundColor: message.includes('❌') ? '#ffebee' : 
                                message.includes('⚠️') ? '#fff3e0' :
                                message.includes('✅') ? '#e8f5e9' : 'transparent',
                p: (message.includes('❌') || message.includes('⚠️') || message.includes('✅')) ? 1 : 0,
                borderRadius: 1,
                fontWeight: (message.includes('❌') || message.includes('⚠️') || message.includes('✅')) ? 'bold' : 'normal'
              }}
            >
              {message}
            </Typography>
            
            {editable && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, fontSize: '0.7rem' }}>
                {t.maxLimitsInfo}
              </Typography>
            )}
          </Box>
        )}
      </Box>
  
      {!editable && (
        <Box sx={{
          width: isDesktop ? '300px' : '96%',
          flexShrink: 0,
          p: isMobile ? 1 : 3,
          px: isMobile ? 1 : 3,
          mx: isMobile ? 'auto' : 0,
          bgcolor: '#f9f9f9',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: isMobile ? 2 : 0,
          boxShadow: isMobile ? 1 : 0,
        }}>
          <Box sx={{ 
            mb: 3,
            backgroundColor: '#f0f8ff',
            p: 2,
            borderRadius: 1,
            border: '1px solid #e0e0e0'
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold',
              color: 'text.secondary',
              mb: 1,
              fontSize: isDesktop ? '1rem' : (isMobile ? '0.9rem' : '1rem'),
              textTransform: 'uppercase'
            }}>
              {t.priceTitle}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 'bold',
                color: 'primary.main',
                fontSize: isDesktop ? '2.7rem' : (isMobile ? '2rem' : '2.7rem'),
                mr: 1
              }}>
                {price}
              </Typography>
              <Typography variant="body1" sx={{ 
                color: 'text.secondary',
                fontSize: isDesktop ? '1.3rem' : (isMobile ? '1rem' : '1.3rem')
              }}>
                {isHourly ? t.pricePerHour : t.pricePerDay}
              </Typography>
            </Box>
          </Box>
  
          <Box sx={{ 
            mb: 3,
            backgroundColor: '#f5eee0',
            p: 2,
            borderRadius: 1,
            border: '1px solid #e0e0e0'
          }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 'bold',
              mb: 1.5,
              fontSize: isDesktop ? '1.5rem' : (isMobile ? '1.2rem' : '1.3rem'),
              lineHeight: 1.2
            }}>
              {name}
            </Typography>
            
            <Typography variant="body1" sx={{ 
              mb: 2,
              fontSize: isDesktop ? '1.1rem' : (isMobile ? '0.9rem' : '1rem'),
              color: 'text.secondary'
            }}>
              {t.contactOwner}
            </Typography>
  
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 1,
              p: 1.5,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
            }}>
            { /* c Владимиром */}
              {getPhones().map((phone, index) => (
                <Box onClick={()=> {axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/stats/${apartmentId}/phone-click`)}} key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton 
                    sx={{ p: 0.5, color: 'primary.main' }}
                    onClick={() => window.open(`tel:${phone.replace(/\D/g, '')}`)}
                  >
                    <PhoneIcon fontSize="small" />
                  </IconButton>
                  <Typography
                    component="a"
                    href={`tel:${phone.replace(/\D/g, '')}`}
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                      cursor: 'pointer',
                      fontSize: isDesktop ? '1rem' : (isMobile ? '0.9rem' : '1rem'),
                      fontWeight: 'bold',
                      flexGrow: 1
                    }}
                  >
                    {phone}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
  
          <Box sx={{ mt: 'auto' }}>
            <Button 
              variant="outlined" 
              startIcon={<ReportIcon />}
              fullWidth
              onClick={() => handleActionButtonClick('report')}
              sx={{ 
                mb: 1.5, 
                justifyContent: 'flex-start',
                py: 1.2,
                fontSize: isDesktop ? '0.8rem' : (isMobile ? '0.7rem' : '0.8rem'),
                borderRadius: 1,
              }}
            >
              {t.reportButton}
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<FeedbackIcon />}
              fullWidth
              onClick={() => handleActionButtonClick('feedback')}
              sx={{ 
                mb: 1.5, 
                justifyContent: 'flex-start',
                py: 1.2,
                fontSize: isDesktop ? '0.8rem' : (isMobile ? '0.7rem' : '0.8rem'),
                borderRadius: 1,
              }}
            >
              {t.feedbackButton}
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<HelpIcon />}
              fullWidth
              onClick={() => handleActionButtonClick('help')}
              sx={{ 
                justifyContent: 'flex-start',
                py: 1.2,
                fontSize: isDesktop ? '0.8rem' : (isMobile ? '0.7rem' : '0.8rem'),
                borderRadius: 1,
              }}
            >
              {t.helpButton}
            </Button>
          </Box>
        </Box>
      )}

      <Dialog open={authDialogOpen} onClose={handleCloseAuthDialog} fullWidth maxWidth="xs">
        <DialogContent>
          <CreateUser onClose={handleCloseAuthDialog} />
        </DialogContent>
      </Dialog>

      <Dialog open={supportDialogOpen} onClose={handleCloseSupportDialog} fullWidth maxWidth="sm">
        <DialogTitle>{getDialogTitle()}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t.instructions}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            p: 2,
            backgroundColor: '#f5f5f5',
            borderRadius: 1,
            mb: 3
          }}>
            <Box>
              <Typography variant="body2" color="text.secondary">{t.supportEmail}</Typography>
              <Typography variant="h6" color="primary.main">nadoby.com.ua@gmail.com</Typography>
            </Box>
            <IconButton onClick={copyEmailToClipboard} color="primary" sx={{ ml: 1 }}>
              <ContentCopyIcon />
            </IconButton>
          </Box>

          {apartmentTitle && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {currentLanguage === 'ua' ? 'Оголошення' : 'Объявление'}: {apartmentTitle}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSupportDialog}>{t.close}</Button>
          <Button onClick={openEmailClient} variant="contained" startIcon={<EmailIcon />}>
            {t.openEmail}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen
        open={fullscreenOpen}
        onClose={handleCloseFullscreen}
        sx={{ '& .MuiDialog-paper': { backgroundColor: 'rgba(0, 0, 0, 0.95)', margin: 0, overflow: 'hidden' } }}
      >
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <IconButton
            onClick={handleCloseFullscreen}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
              width: 40,
              height: 40,
              zIndex: 1000,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box 
            {...fullscreenSwipeHandlers}
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              height: 'calc(100% - 150px)',
              backgroundColor: 'transparent',
            }}
          >
            {localPhotos.map((photo, index) => (
              <Box
                key={`fullscreen-slide-${photo.id}`}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 2,
                  opacity: index === currentIndex ? 1 : 0,
                  visibility: index === currentIndex ? 'visible' : 'hidden',
                  transition: 'opacity 0.3s ease',
                }}
              >
                <Box sx={{
                  width: '100%',
                  height: '100%',
                  transform: `rotate(${photoRotations[photo.id] || 0}deg)`,
                  transition: 'transform 0.3s ease'
                }}>
                  <img
                    src={photo.url}
                    alt={`${currentLanguage === 'ua' ? 'Фото' : 'Фото'} ${index + 1}`}
                    style={{ 
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </Box>
              </Box>
            ))}

            {localPhotos.length > 1 && (
              <>
                <IconButton 
                  onClick={handleFullscreenPrev}
                  sx={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.9)',
                    width: 40,
                    height: 40,
                    '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
                    zIndex: 100,
                  }}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton 
                  onClick={handleFullscreenNext}
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.9)',
                    width: 40,
                    height: 40,
                    '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
                    zIndex: 100,
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>

                <Box sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bgcolor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  px: 3,
                  py: 1,
                  borderRadius: 4,
                  fontSize: '1rem',
                  zIndex: 100,
                }}>
                  {currentIndex + 1}/{localPhotos.length}
                </Box>
              </>
            )}
          </Box>

          {localPhotos.length > 1 && (
            <Box sx={{
              height: '120px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: 2,
            }}>
              <Box 
                ref={fullscreenThumbnailsRef}
                sx={{
                  display: 'flex',
                  gap: '10px',
                  overflowX: 'auto',
                  maxWidth: '100%',
                  '&::-webkit-scrollbar': { height: '6px' },
                  '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '3px' },
                }}
              >
                {localPhotos.map((photo, index) => (
                  <Box
                    key={`fullscreen-thumb-${photo.id}`}
                    onClick={() => setCurrentIndex(index)}
                    sx={{
                      width: '80px',
                      height: '80px',
                      flexShrink: 0,
                      cursor: 'pointer',
                      border: currentIndex === index ? '3px solid #1976d2' : '1px solid rgba(255,255,255,0.3)',
                      borderRadius: 1,
                      overflow: 'hidden',
                      position: 'relative',
                      transition: 'border 0.2s ease',
                    }}
                  >
                    <Box sx={{
                      width: '100%',
                      height: '100%',
                      transform: `rotate(${photoRotations[photo.id] || 0}deg)`,
                      transition: 'transform 0.3s ease'
                    }}>
                      <img
                        src={photo.url}
                        alt={`${currentLanguage === 'ua' ? 'Мініатюра' : 'Миниатюра'} ${index + 1}`}
                        style={{ 
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%'
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
});

FileUploadSlider.displayName = 'FileUploadSlider';
export default FileUploadSlider;