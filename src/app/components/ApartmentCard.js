


// // карточка для отображения объявления об аренде.


// 'use client';

// import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
// import { getDistrictName } from '@/app/components/DistrictsData';
// import dynamic from 'next/dynamic';
// import {
//   Box,
//   Typography,
//   IconButton,
//   Card,
//   CardContent,
//   CardMedia,
//   Divider,
//   Grid,
//   useTheme,
//   useMediaQuery,
//   Badge,
//   Tooltip,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogContent,
//   CircularProgress,
// } from '@mui/material';
// import {
//   Favorite,
//   FavoriteBorder,
//   KingBed,
//   MeetingRoom,
//   DirectionsSubway,
//   ArrowBackIos,
//   ArrowForwardIos,
//   PhotoCamera,
//   MapOutlined,
// } from '@mui/icons-material';
// import { useSwipeable } from 'react-swipeable';
// import { useRouter } from 'next/navigation';
// import { useLanguage } from "@/app/LanguageContext";

// const CreateUser = dynamic(() => import('./CreateUser'), {
//   loading: () => <div>Загрузка формы...</div>
// });

// import { useFavorites } from '@/app/hooks/useFavorites';

// const APARTMENT_CARD_TRANSLATIONS = {
//   ua: {
//     noPhotos: 'Немає фото',
//     noCity: 'Місто не вказано',
//     noStreet: 'Вулиця не вказана',
//     noHouseNumber: 'без номера',
//     guests: (count) => (count === 1 ? 'гість' : count < 5 ? 'гості' : 'гостей'),
//     rooms: (count) => (count === 1 ? 'кімната' : count < 5 ? 'кімнати' : 'кімнат'),
//     noPrice: 'Ціна не вказана',
//     favoriteAdd: 'Додати в обране',
//     favoriteRemove: 'Видалити з обраного',
//     apartmentDefault: 'Апартаменти',
//     loginRequired: 'Увійдіть, щоб додати в обране',
//     favoriteError: 'Помилка при оновленні обраного',
//     district: 'район',
//     metro: 'метро',
//   },
//   ru: {
//     noPhotos: 'Нет фото',
//     noCity: 'Город не указан',
//     noStreet: 'Улица не указана',
//     noHouseNumber: 'без номера',
//     guests: (count) => (count === 1 ? 'гость' : count < 5 ? 'гостя' : 'гостей'),
//     rooms: (count) => (count === 1 ? 'комната' : count < 5 ? 'комнаты' : 'комнат'),
//     noPrice: 'Цена не указана',
//     favoriteAdd: 'Добавить в избранное',
//     favoriteRemove: 'Удалить из избранного',
//     apartmentDefault: 'Апартаменты',
//     loginRequired: 'Войдите, чтобы добавить в избранное',
//     favoriteError: 'Ошибка при обновлении избранного',
//     district: 'район',
//     metro: 'метро',
//   },
// };

// const CATEGORY_TRANSLATIONS = {
//   ua: {
//     'Квартира': 'Квартира',
//     'Гостиница': 'Готель',
//     'Хостел': 'Хостел',
//     'Дом': 'Будинок',
//     'База отдыха': 'База відпочинку',
//     'Сауна/Баня': 'Сауна/Лазня',
//     'Готель для тварин': 'Готель для тварин',
//     'Глемпинг': 'Глемпінг',
//     'Пансионат': ' Санаторій/Пансіонат',
//     'Пансіонат': 'Санаторій/Пансіонат',
//     'Котедж для компаний': 'Котедж для компаній',
//     'Котедж для компаній': 'Котедж для компаній',
//     'Коворкинг': 'Коворкінг',
//     'Коворкінг': 'Коворкінг',
//     'Автокемпинг': 'Автокемпінг',
//     'Автокемпінг': 'Автокемпінг',
//     'Хостель': 'Хостел',
//     'Пансионаты': 'Пансіонати',
//     'Коттеджи для компаний': 'Котеджі для компаній',
//     'Коворкинги': 'Коворкінги',
//     'Автокемпинги': 'Автокемпінги',
//     'Базы отдыха': 'Бази відпочинку'
//   },
//   ru: {
//     'Квартира': 'Квартира',
//     'Гостиница': 'Гостиница',
//     'Хостел': 'Хостел',
//     'Будинок': 'Дом',
//     'База відпочинку': 'База отдыха',
//     'Сауна/Лазня': 'Сауна/Баня',
//     'Глемпинг': 'Глэмпинг',
//     'Глемпінг': 'Глэмпинг',
//     'Пансионат': 'Пансионат',
//     'Пансіонат': 'Санаторий/Пансионат',
//     'Котедж для компаний': 'Коттедж для компаний',
//     'Котедж для компаній': 'Коттедж для компаний',
//     'Коворкинг': 'Коворкинг',
//     'Коворкінг': 'Коворкинг',
//     'Автокемпинг': 'Автокемпинг',
//     'Автокемпінг': 'Автокемпинг',
//     'Гостиница для животных': 'Готель для тварин',
//     'Хостель': 'Хостел',
//     'Пансионаты': 'Пансионаты',
//     'Коттеджи для компаний': 'Коттеджи для компаний',
//     'Коворкинги': 'Коворкинги',
//     'Автокемпинги': 'Автокемпинги',
//     'Базы отдыха': 'Базы отдыха'
//   }
// };

// const ApartmentCardComponent = ({
//   apartment,
//   isFavorite: propIsFavorite,
//   toggleFavorite: propToggleFavorite,
//   showCreateUserDialog,
// }) => {
//   console.log('🟢 ApartmentCardComponent рендериться для ID:', apartment?._id);

//   const { currentLanguage } = useLanguage();
//   const t = APARTMENT_CARD_TRANSLATIONS[currentLanguage] || APARTMENT_CARD_TRANSLATIONS.ua;
//   const categoryTranslations = CATEGORY_TRANSLATIONS[currentLanguage] || CATEGORY_TRANSLATIONS.ua;
  
//   const translateCategory = useCallback((category) => {
//     if (!category) return t.apartmentDefault;
    
//     const cleanCategory = String(category).trim();
    
//     if (categoryTranslations[cleanCategory]) {
//       return categoryTranslations[cleanCategory];
//     }
    
//     const normalizedCategory = cleanCategory.toLowerCase().replace(/\s+/g, ' ').replace(/[\/\\]/g, '/');
    
//     for (const [key, translation] of Object.entries(categoryTranslations)) {
//       const normalizedKey = key.toLowerCase().replace(/\s+/g, ' ').replace(/[\/\\]/g, '/');
      
//       if (normalizedKey === normalizedCategory) {
//         return translation;
//       }
      
//       if (normalizedCategory.includes(normalizedKey) || normalizedKey.includes(normalizedCategory)) {
//         return translation;
//       }
//     }
    
//     return cleanCategory;
//   }, [categoryTranslations, t.apartmentDefault]);

//   const photos = Array.isArray(apartment?.photos) ? apartment.photos : [];
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'info',
//   });
//   const [loginModalOpen, setLoginModalOpen] = useState(false);
//   const autoCloseTimer = useRef(null);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const router = useRouter();

//   const { isFavorite, toggleFavorite, loading: favoriteLoading } = useFavorites();

//   const actualIsFavorite = propIsFavorite !== undefined ? propIsFavorite : isFavorite(apartment?._id);
//   const actualToggleFavorite = propToggleFavorite || toggleFavorite;

//   useEffect(() => {
//     console.log('🟡 useEffect для ID:', apartment?._id);
//     return () => {
//       if (autoCloseTimer.current) {
//         clearTimeout(autoCloseTimer.current);
//       }
//     };
//   }, [apartment?._id]);

//   const startAutoCloseTimer = useCallback(() => {
//     if (autoCloseTimer.current) {
//       clearTimeout(autoCloseTimer.current);
//     }
    
//     autoCloseTimer.current = setTimeout(() => {
//       setLoginModalOpen(false);
//       setSnackbar(prev => ({ ...prev, open: false }));
//     }, 5000);
//   }, []);

//   const handlePrevPhoto = useCallback((e) => {
//     e.stopPropagation();
//     console.log('⬅️ Попереднє фото для ID:', apartment?._id);
//     setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
//   }, [photos.length, apartment?._id]);

//   const handleNextPhoto = useCallback((e) => {
//     e.stopPropagation();
//     console.log('➡️ Наступне фото для ID:', apartment?._id);
//     setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
//   }, [photos.length, apartment?._id]);

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () =>
//       setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1)),
//     onSwipedRight: () =>
//       setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1)),
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

//   const handleCardClick = useCallback(() => {
   
    
//     if (!loginModalOpen) {

//       router.push(`/apartment/${apartment._id}`);
//     } else {
      
//     }
//   }, [loginModalOpen, apartment?._id, router]);

//   const handleFavoriteClick = useCallback(async (e) => {
//     e.stopPropagation();
   
    
//     if (favoriteLoading) return;

//     const userProfile = localStorage.getItem('user_profile');
//     if (!userProfile) {
//       setLoginModalOpen(true);
//       setSnackbar({ 
//         open: true, 
//         message: t.loginRequired, 
//         severity: 'info' 
//       });
      
//       startAutoCloseTimer();
//       return;
//     }

//     try {
//       await actualToggleFavorite(apartment._id);
//     } catch (error) {
//       if (error.message === 'USER_NOT_LOGGED_IN') {
//         setLoginModalOpen(true);
//         setSnackbar({ 
//           open: true, 
//           message: t.loginRequired, 
//           severity: 'info' 
//         });
//         startAutoCloseTimer();
//       } else {
//         setSnackbar({ open: true, message: t.favoriteError, severity: 'error' });
//       }
//     }
//   }, [favoriteLoading, t, startAutoCloseTimer, actualToggleFavorite, apartment?._id]);

//   const handleCloseModal = useCallback(() => {
//     setLoginModalOpen(false);
//     if (autoCloseTimer.current) {
//       clearTimeout(autoCloseTimer.current);
//     }
//   }, []);

//   const handleCloseSnackbar = useCallback(() => {
//     setSnackbar(prev => ({ ...prev, open: false }));
//     if (autoCloseTimer.current) {
//       clearTimeout(autoCloseTimer.current);
//     }
//   }, []);

//   const formatPrice = useCallback((price) => {
//     if (!price) return t.noPrice;
//     return new Intl.NumberFormat('uk-UA', {
//       style: 'currency',
//       currency: 'UAH',
//       maximumFractionDigits: 0,
//     })
//       .format(price)
//       .replace('₴', ' грн');
//   }, [t.noPrice]);

//   const handleMouseEnter = useCallback(() => setIsHovered(true), []);
//   const handleMouseLeave = useCallback(() => setIsHovered(false), []);

//   return (
//     <Card
//       onClick={(e) => {
//         console.log('🔴 КЛІК ПО CARD для ID:', apartment?._id);
//         console.log('📌 Тип події:', e.type);
//         console.log('🎯 target:', e.target);
//         console.log('📦 currentTarget:', e.currentTarget);
//         handleCardClick();
//       }}
//       data-apartment-id={apartment._id}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       sx={{
//         cursor: 'pointer',
//         bgcolor: 'background.paper',
//         borderRadius: 3,
//         boxShadow: theme.shadows[3],
//         transition: 'all 0.3s ease',
//         display: 'flex',
//         flexDirection: 'column',
//         position: 'relative',
//         overflow: 'hidden',
//         height: { xs: 'auto', sm: 500 },
//         mb: { xs: 2, sm: 0 },
//         '&:hover': {
//           boxShadow: theme.shadows[6],
//           transform: { sm: 'translateY(-5px)' },
//         },
//       }}
//     >
//       <Tooltip title={actualIsFavorite ? t.favoriteRemove : t.favoriteAdd} arrow>
//         <IconButton
//           onClick={handleFavoriteClick}
//           disabled={favoriteLoading}
//           sx={{
//             position: 'absolute',
//             top: 8,
//             right: 8,
//             zIndex: 2,
//             bgcolor: 'rgba(255,255,255,0.9)',
//             '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
//             '&:disabled': { opacity: 0.7 },
//             width: isMobile ? 32 : 40,
//             height: isMobile ? 32 : 40,
//             padding: isMobile ? 0.5 : 1,
//             '& .MuiSvgIcon-root': {
//               fontSize: isMobile ? '1.2rem' : '1.5rem'
//             }
//           }}
//         >
//           {favoriteLoading ? (
//             <CircularProgress size={isMobile ? 20 : 24} />
//           ) : actualIsFavorite ? (
//             <Favorite color="error" />
//           ) : (
//             <FavoriteBorder color="action" />
//           )}
//         </IconButton>
//       </Tooltip>

//       {apartment?.actions && (
//         <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
//           {apartment.actions}
//         </Box>
//       )}

//       <Box
//         position="relative"
//         {...swipeHandlers}
//         sx={{
//           height: { xs: 210, sm: 220, md: 240 },
//           overflow: 'hidden',
//           borderRadius: '12px 12px 0 0',
//           userSelect: 'none',
//         }}
//       >
//         {photos.length > 0 ? (
//           <>
//             <CardMedia
//               component="img"
//               image={photos[currentIndex]}
//               alt={`apartment-${currentIndex + 1}`}
//               loading="lazy"
//               sx={{
//                 objectFit: 'cover',
//                 width: '100%',
//                 height: '100%',
//                 transition: 'transform 0.5s ease',
//               }}
//             />

//             {photos.length > 1 && (
//               <Badge
//                 badgeContent={`${currentIndex + 1}/${photos.length}`}
//                 color="primary"
//                 sx={{
//                   position: 'absolute',
//                   bottom: isMobile ? 20 : 13,
//                   right: isMobile ? 25 : 20,
//                   '& .MuiBadge-badge': {
//                     bgcolor: 'rgba(0,0,0,0.7)',
//                     color: '#fff',
//                     fontSize: isMobile ? '0.65rem' : '0.7rem',
//                     fontWeight: 'bold',
//                     px: isMobile ? 0.8 : 1,
//                     py: isMobile ? 0.3 : 0.5,
//                     borderRadius: '16px',
//                     border: '1px solid rgba(255,255,255,0.3)',
//                   },
//                 }}
//               />
//             )}

//             {photos.length > 1 && (
//               <>
//                 <IconButton
//                   onClick={handlePrevPhoto}
//                   sx={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: 8,
//                     transform: 'translateY(-50%)',
//                     bgcolor: 'rgba(0,0,0,0.4)',
//                     color: 'white',
//                     '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
//                     opacity: { xs: 1, sm: isHovered ? 1 : 0 },
//                     transition: 'opacity 0.25s ease',
//                     width: isMobile ? 28 : 36,
//                     height: isMobile ? 28 : 36,
//                     padding: isMobile ? 0.5 : 1,
//                     '& .MuiSvgIcon-root': {
//                       fontSize: isMobile ? '0.9rem' : '1.1rem'
//                     }
//                   }}
//                 >
//                   <ArrowBackIos fontSize="small" />
//                 </IconButton>

//                 <IconButton
//                   onClick={handleNextPhoto}
//                   sx={{
//                     position: 'absolute',
//                     top: '50%',
//                     right: 8,
//                     transform: 'translateY(-50%)',
//                     bgcolor: 'rgba(0,0,0,0.4)',
//                     color: 'white',
//                     '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
//                     opacity: { xs: 1, sm: isHovered ? 1 : 0 },
//                     transition: 'opacity 0.25s ease',
//                     width: isMobile ? 28 : 36,
//                     height: isMobile ? 28 : 36,
//                     padding: isMobile ? 0.5 : 1,
//                     '& .MuiSvgIcon-root': {
//                       fontSize: isMobile ? '0.9rem' : '1.1rem'
//                     }
//                   }}
//                 >
//                   <ArrowForwardIos fontSize="small" />
//                 </IconButton>
//               </>
//             )}
//           </>
//         ) : (
//           <Box
//             sx={{
//               height: '100%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               bgcolor: '#f5f5f5',
//               color: 'text.secondary',
//               gap: 1,
//             }}
//           >
//             <PhotoCamera fontSize="large" />
//             <Typography variant="body2">{t.noPhotos}</Typography>
//           </Box>
//         )}
//       </Box>

//       <CardContent
//         sx={{
//           p: { xs: 1.5, sm: 2 },
//           flexGrow: 1,
//           display: 'flex',
//           flexDirection: 'column',
//           overflow: 'hidden',
//         }}
//       >
//         <Box
//           sx={{
//             mb: { xs: 1.25, sm: 2 },
//             px: 2,
//             py: 0.5,
//             bgcolor: 'primary.light',
//             borderRadius: 1,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             mx: 'auto',
//             width: 'fit-content',
//             maxWidth: '100%',
//           }}
//         >
//           <Typography
//             variant="subtitle2"
//             color="white"
//             sx={{ 
//               whiteSpace: 'nowrap', 
//               overflow: 'hidden', 
//               textOverflow: 'ellipsis',
//               fontWeight: isMobile ? 600 : 500
//             }}
//           >
//             {translateCategory(apartment?.category) || t.apartmentDefault}
//           </Typography>
//         </Box>

//         <Box sx={{ mb: 1.25 }}>
//           <Typography
//             variant="body2"
//             fontWeight={500}
//             sx={{ mb: 0.5, lineHeight: 1.35 }}
//           >
//             {apartment?.city || t.noCity}, {apartment?.street || t.noStreet}
//             {apartment?.houseNumber ? `, ${apartment.houseNumber}` : `, ${t.noHouseNumber}`}
//           </Typography>

//           <Grid container spacing={0.5}>
//             {!!apartment?.district && (
//               <Grid item xs={12}>
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   <MapOutlined fontSize="small" color="primary" sx={{ mr: 0.5 }} />
//                   <Typography variant="caption">
//                     {t.district} {getDistrictName(apartment.district, currentLanguage)}
//                   </Typography>
//                 </Box>
//               </Grid>
//             )}

//             {!!apartment?.metro && (
//               <Grid item xs={12}>
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   <DirectionsSubway fontSize="small" color="primary" sx={{ mr: 0.5 }} />
//                   <Typography variant="caption">{t.metro} {apartment.metro}</Typography>
//                 </Box>
//               </Grid>
//             )}
//           </Grid>
//         </Box>

//         <Divider sx={{ my: 1 }} />

//         <Grid container spacing={1} sx={{ mb: 1.25 }}>
//           <Grid item xs={6}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <KingBed fontSize="small" color="primary" sx={{ mr: 0.5 }} />
//               <Typography variant="caption">
//                 {apartment?.beds ?? '?'} {t.guests(apartment?.beds)}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <MeetingRoom fontSize="small" color="primary" sx={{ mr: 0.5 }} />
//               <Typography variant="caption">
//                 {apartment?.rooms ?? '?'} {t.rooms(apartment?.rooms)}
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>

//         <Box
//           sx={{
//             bgcolor: 'primary.main',
//             borderRadius: 2,
//             p: { xs: 1, sm: 1.5 },
//             textAlign: 'center',
//             mt: 'auto',
//             transition: 'all 0.3s ease',
//             '&:hover': { bgcolor: 'primary.dark' },
//           }}
//         >
//           <Typography
//             component="div"
//             sx={{ 
//               fontSize: { xs: '1rem', sm: '1.25rem' },
//               fontWeight: 700,
//               color: 'white',
//               lineHeight: 1,
//               fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' 
//             }}
//           >
//             {formatPrice(apartment?.price)}
//           </Typography>
//         </Box>
//       </CardContent>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={5000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert
//           severity={snackbar.severity}
//           onClose={handleCloseSnackbar}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>

//       <Dialog
//         open={loginModalOpen}
//         onClose={handleCloseModal}
//         fullWidth
//         maxWidth="xs"
//       >
//         <DialogContent>
//           <CreateUser onClose={handleCloseModal} />
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// };

// const MemoizedApartmentCardComponent = memo(ApartmentCardComponent);

// export default function ApartmentCard(props) {
//   return (
//     <MemoizedApartmentCardComponent {...props} />
//   );
// }




// 'use client';

// import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
// import { getDistrictName } from '@/app/components/DistrictsData';
// import dynamic from 'next/dynamic';
// import Image from 'next/image';
// import { useSwipeable } from 'react-swipeable';
// import { useRouter } from 'next/navigation';
// import { useFavorites } from '@/app/hooks/useFavorites';
// import { useLanguage } from "@/app/LanguageContext";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Card,
//   CardContent,
//   Divider,
//   Grid,
//   useTheme,
//   useMediaQuery,
//   Badge,
//   Tooltip,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogContent,
//   CircularProgress,
// } from '@mui/material';
// import {
//   Favorite,
//   FavoriteBorder,
//   KingBed,
//   MeetingRoom,
//   DirectionsSubway,
//   ArrowBackIos,
//   ArrowForwardIos,
//   PhotoCamera,
//   MapOutlined,
// } from '@mui/icons-material';

// // Динамическая форма создания пользователя
// const CreateUser = dynamic(() => import('./CreateUser'), {
//   loading: () => <div>Загрузка формы...</div>
// });

// // Переводы
// const APARTMENT_CARD_TRANSLATIONS = {
//   ua: {
//     noPhotos: 'Немає фото',
//     noCity: 'Місто не вказано',
//     noStreet: 'Вулиця не вказана',
//     noHouseNumber: 'без номера',
//     guests: (count) => (count === 1 ? 'гість' : count < 5 ? 'гості' : 'гостей'),
//     rooms: (count) => (count === 1 ? 'кімната' : count < 5 ? 'кімнати' : 'кімнат'),
//     noPrice: 'Ціна не вказана',
//     favoriteAdd: 'Додати в обране',
//     favoriteRemove: 'Видалити з обраного',
//     apartmentDefault: 'Апартаменти',
//     loginRequired: 'Увійдіть, щоб додати в обране',
//     favoriteError: 'Помилка при оновленні обраного',
//     district: 'район',
//     metro: 'метро',
//   },
//   ru: {
//     noPhotos: 'Нет фото',
//     noCity: 'Город не указан',
//     noStreet: 'Улица не указана',
//     noHouseNumber: 'без номера',
//     guests: (count) => (count === 1 ? 'гость' : count < 5 ? 'гостя' : 'гостей'),
//     rooms: (count) => (count === 1 ? 'комната' : count < 5 ? 'комнаты' : 'комнат'),
//     noPrice: 'Цена не указана',
//     favoriteAdd: 'Добавить в избранное',
//     favoriteRemove: 'Удалить из избранное',
//     apartmentDefault: 'Апартаменты',
//     loginRequired: 'Войдите, чтобы добавить в избранное',
//     favoriteError: 'Ошибка при обновлении избранного',
//     district: 'район',
//     metro: 'метро',
//   },
// };

// const CATEGORY_TRANSLATIONS = {
//   ua: {
//     'Квартира': 'Квартира',
//     'Гостиница': 'Готель',
//     'Хостел': 'Хостел',
//     'Дом': 'Будинок',
//     'База отдыха': 'База відпочинку',
//     'Сауна/Баня': 'Сауна/Лазня',
//     'Готель для тварин': 'Готель для тварин',
//     'Глемпинг': 'Глемпінг',
//     'Пансионат': ' Санаторій/Пансіонат',
//     'Котедж для компаний': 'Котедж для компаній',
//     'Коворкинг': 'Коворкінг',
//     'Автокемпинг': 'Автокемпінг',
//   },
//   ru: {
//     'Квартира': 'Квартира',
//     'Гостиница': 'Гостиница',
//     'Хостел': 'Хостел',
//     'Будинок': 'Дом',
//     'База відпочинку': 'База отдыха',
//     'Сауна/Лазня': 'Сауна/Баня',
//     'Глемпинг': 'Глэмпинг',
//     'Пансионат': 'Пансионат',
//     'Котедж для компаній': 'Коттедж для компаний',
//     'Коворкінг': 'Коворкинг',
//     'Автокемпінг': 'Автокемпинг',
//     'Готель для тварин': 'Гостиница для животных',
//   }
// };

// // Вспомогательный компонент для иконка+текст
// const IconText = ({ icon: Icon, text }) => (
//   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//     <Icon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
//     <Typography variant="caption">{text}</Typography>
//   </Box>
// );

// const ApartmentCardComponent = ({
//   apartment,
//   isFavorite: propIsFavorite,
//   toggleFavorite: propToggleFavorite,
// }) => {
//   const { currentLanguage } = useLanguage();
//   const t = APARTMENT_CARD_TRANSLATIONS[currentLanguage] || APARTMENT_CARD_TRANSLATIONS.ua;
//   const categoryTranslations = CATEGORY_TRANSLATIONS[currentLanguage] || CATEGORY_TRANSLATIONS.ua;

//   const translateCategory = useCallback((category) => {
//     if (!category) return t.apartmentDefault;
//     const cleanCategory = String(category).trim();
//     return categoryTranslations[cleanCategory] || cleanCategory;
//   }, [categoryTranslations, t.apartmentDefault]);

//   const photos = Array.isArray(apartment?.photos) ? apartment.photos : [];
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
//   const [loginModalOpen, setLoginModalOpen] = useState(false);
//   const autoCloseTimer = useRef(null);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const router = useRouter();
//   const { isFavorite, toggleFavorite, loading: favoriteLoading } = useFavorites();

//   const actualIsFavorite = propIsFavorite !== undefined ? propIsFavorite : isFavorite(apartment?._id);
//   const actualToggleFavorite = propToggleFavorite || toggleFavorite;

//   const startAutoCloseTimer = useCallback(() => {
//     if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
//     autoCloseTimer.current = setTimeout(() => {
//       setLoginModalOpen(false);
//       setSnackbar(prev => ({ ...prev, open: false }));
//     }, 5000);
//   }, []);

//   const handlePrevPhoto = useCallback((e) => {
//     e.stopPropagation();
//     setCurrentIndex(prev => (prev === 0 ? photos.length - 1 : prev - 1));
//   }, [photos.length]);

//   const handleNextPhoto = useCallback((e) => {
//     e.stopPropagation();
//     setCurrentIndex(prev => (prev === photos.length - 1 ? 0 : prev + 1));
//   }, [photos.length]);

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () => setCurrentIndex(prev => (prev === photos.length - 1 ? 0 : prev + 1)),
//     onSwipedRight: () => setCurrentIndex(prev => (prev === 0 ? photos.length - 1 : prev - 1)),
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

//   const handleCardClick = useCallback(() => {
//     if (!loginModalOpen) router.push(`/apartment/${apartment._id}`);
//   }, [loginModalOpen, apartment?._id, router]);

//   const handleFavoriteClick = useCallback(async (e) => {
//     e.stopPropagation();
//     if (favoriteLoading) return;
//     const userProfile = localStorage.getItem('user_profile');
//     if (!userProfile) {
//       setLoginModalOpen(true);
//       setSnackbar({ open: true, message: t.loginRequired, severity: 'info' });
//       startAutoCloseTimer();
//       return;
//     }
//     try { await actualToggleFavorite(apartment._id); }
//     catch (error) {
//       setSnackbar({ open: true, message: t.favoriteError, severity: 'error' });
//     }
//   }, [favoriteLoading, t, startAutoCloseTimer, actualToggleFavorite, apartment?._id]);

//   const handleCloseSnackbar = useCallback(() => setSnackbar(prev => ({ ...prev, open: false })), []);
//   const handleCloseModal = useCallback(() => setLoginModalOpen(false), []);

//   const formatPrice = useCallback((price) => {
//     if (!price) return t.noPrice;
//     return new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH', maximumFractionDigits: 0 })
//       .format(price).replace('₴', ' грн');
//   }, [t.noPrice]);

//   return (
//     <Card
//       onClick={handleCardClick}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       sx={{
//         cursor: 'pointer',
//         bgcolor: 'background.paper',
//         borderRadius: 3,
//         boxShadow: theme.shadows[3],
//         transition: 'all 0.3s ease',
//         display: 'flex',
//         flexDirection: 'column',
//         position: 'relative',
//         overflow: 'hidden',
//         height: { xs: 'auto', sm: 500 },
//         mb: { xs: 2, sm: 0 },
//         '&:hover': { boxShadow: theme.shadows[6], transform: { sm: 'translateY(-5px)' } },
//       }}
//     >
//       {/* Favorite Button */}
//       <Tooltip title={actualIsFavorite ? t.favoriteRemove : t.favoriteAdd} arrow>
//         <IconButton
//           onClick={handleFavoriteClick}
//           disabled={favoriteLoading}
//           sx={{
//             position: 'absolute', top: 8, right: 8, zIndex: 2,
//             bgcolor: 'rgba(255,255,255,0.9)',
//             '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
//             width: isMobile ? 32 : 40, height: isMobile ? 32 : 40,
//             padding: isMobile ? 0.5 : 1,
//             '& .MuiSvgIcon-root': { fontSize: isMobile ? '1.2rem' : '1.5rem' }
//           }}
//         >
//           {favoriteLoading ? <CircularProgress size={isMobile ? 20 : 24} /> :
//             actualIsFavorite ? <Favorite color="error" /> : <FavoriteBorder color="action" />}
//         </IconButton>
//       </Tooltip>

// {/* 👇 ДОБАВЬ ЭТОТ БЛОК ДЛЯ РЕДАКТИРОВАНИЯ/УДАЛЕНИЯ */}
// {apartment?.actions && (
//   <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
//     {apartment.actions}
//   </Box>
// )}


//       {/* Photos */}
//       <Box 
//         {...swipeHandlers} 
//         sx={{ 
//           height: { xs: 210, sm: 220, md: 240 }, 
//           overflow: 'hidden', 
//           borderRadius: '12px 12px 0 0', 
//           userSelect: 'none',
//           position: 'relative' // ВАЖНО: добавляем relative для позиционирования стрелок
//         }}
//       >
//         {photos.length > 0 ? (
//           <>
//             <Image
//               src={photos[currentIndex].thumbnail || photos[currentIndex]}
//               alt={`apartment-${currentIndex + 1}`}
//               width={400} height={300}
//               style={{ objectFit: 'cover', width: '100%', height: '100%' }}
//               loading="lazy"
//             />
            
//             {/* Badge с количеством фото */}
//             {photos.length > 1 && (
//               <Badge 
//                 badgeContent={`${currentIndex + 1}/${photos.length}`} 
//                 color="primary" 
//                 sx={{
//                   position: 'absolute', 
//                   bottom: isMobile ? 20 : 13, 
//                   right: isMobile ? 25 : 20,
//                   '& .MuiBadge-badge': { 
//                     bgcolor: 'rgba(0,0,0,0.7)', 
//                     color: '#fff', 
//                     fontSize: isMobile ? '0.65rem' : '0.7rem', 
//                     fontWeight: 'bold', 
//                     px: isMobile ? 0.8 : 1, 
//                     py: isMobile ? 0.3 : 0.5, 
//                     borderRadius: '16px', 
//                     border: '1px solid rgba(255,255,255,0.3)' 
//                   }
//                 }} 
//               />
//             )}
            
//             {/* Стрелки навигации - теперь они внутри Box с position:relative */}
//             {photos.length > 1 && (
//               <>
//                 <IconButton 
//                   onClick={handlePrevPhoto} 
//                   sx={{
//                     position: 'absolute', 
//                     top: '50%', 
//                     left: 8, 
//                     transform: 'translateY(-50%)',
//                     bgcolor: 'rgba(0,0,0,0.4)', 
//                     color: 'white',
//                     '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
//                     opacity: { xs: 1, sm: isHovered ? 1 : 0 },
//                     transition: 'opacity 0.25s ease',
//                     width: isMobile ? 28 : 36, 
//                     height: isMobile ? 28 : 36,
//                     padding: isMobile ? 0.5 : 1,
//                     zIndex: 10, // Добавляем zIndex чтобы стрелки были поверх всего
//                     '& .MuiSvgIcon-root': { 
//                       fontSize: isMobile ? '0.9rem' : '1.1rem' 
//                     }
//                   }}
//                 >
//                   <ArrowBackIos fontSize="small" />
//                 </IconButton>
                
//                 <IconButton 
//                   onClick={handleNextPhoto} 
//                   sx={{
//                     position: 'absolute', 
//                     top: '50%', 
//                     right: 8, 
//                     transform: 'translateY(-50%)',
//                     bgcolor: 'rgba(0,0,0,0.4)', 
//                     color: 'white',
//                     '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
//                     opacity: { xs: 1, sm: isHovered ? 1 : 0 },
//                     transition: 'opacity 0.25s ease',
//                     width: isMobile ? 28 : 36, 
//                     height: isMobile ? 28 : 36,
//                     padding: isMobile ? 0.5 : 1,
//                     zIndex: 10, // Добавляем zIndex чтобы стрелки были поверх всего
//                     '& .MuiSvgIcon-root': { 
//                       fontSize: isMobile ? '0.9rem' : '1.1rem' 
//                     }
//                   }}
//                 >
//                   <ArrowForwardIos fontSize="small" />
//                 </IconButton>
//               </>
//             )}
//           </>
//         ) : (
//           <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5', color: 'text.secondary', gap: 1 }}>
//             <PhotoCamera fontSize="large" />
//             <Typography variant="body2">{t.noPhotos}</Typography>
//           </Box>
//         )}
//       </Box>

//       {/* Card Content */}
//       <CardContent sx={{ p: { xs: 1.5, sm: 2 }, flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//         <Box sx={{ mb: { xs: 1.25, sm: 2 }, px: 2, py: 0.5, bgcolor: 'primary.light', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', width: 'fit-content' }}>
//           <Typography variant="subtitle2" color="white" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: isMobile ? 600 : 500 }}>
//             {translateCategory(apartment?.category) || t.apartmentDefault}
//           </Typography>
//         </Box>

//         <Box sx={{ mb: 1.25 }}>
//           <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, lineHeight: 1.35 }}>
//             {apartment?.city || t.noCity}, {apartment?.street || t.noStreet}{apartment?.houseNumber ? `, ${apartment.houseNumber}` : `, ${t.noHouseNumber}`}
//           </Typography>
//           <Grid container spacing={0.5}>
//             {!!apartment?.district && <Grid item xs={12}><IconText icon={MapOutlined} text={`${t.district} ${getDistrictName(apartment.district, currentLanguage)}`} /></Grid>}
//             {!!apartment?.metro && <Grid item xs={12}><IconText icon={DirectionsSubway} text={`${t.metro} ${apartment.metro}`} /></Grid>}
//           </Grid>
//         </Box>

//         <Divider sx={{ my: 1 }} />
//         <Grid container spacing={1} sx={{ mb: 1.25 }}>
//           <Grid item xs={6}><IconText icon={KingBed} text={`${apartment?.beds ?? '?'} ${t.guests(apartment?.beds)}`} /></Grid>
//           <Grid item xs={6}><IconText icon={MeetingRoom} text={`${apartment?.rooms ?? '?'} ${t.rooms(apartment?.rooms)}`} /></Grid>
//         </Grid>

//         <Box sx={{ bgcolor: 'primary.main', borderRadius: 2, p: { xs: 1, sm: 1.5 }, textAlign: 'center', mt: 'auto', transition: 'all 0.3s ease', '&:hover': { bgcolor: 'primary.dark' } }}>
//           <Typography sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, fontWeight: 700, color: 'white', lineHeight: 1 }}>
//             {formatPrice(apartment?.price)}
//           </Typography>
//         </Box>
//       </CardContent>

//       {/* Snackbar */}
//       <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
//         <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>{snackbar.message}</Alert>
//       </Snackbar>

//       {/* Login Dialog */}
//       <Dialog open={loginModalOpen} onClose={handleCloseModal} fullWidth maxWidth="xs">
//         <DialogContent><CreateUser onClose={handleCloseModal} /></DialogContent>
//       </Dialog>
//     </Card>
//   );
// };

// const MemoizedApartmentCardComponent = memo(ApartmentCardComponent);

// export default function ApartmentCard(props) {
//   return <MemoizedApartmentCardComponent {...props} />;
// }






// 'use client';

// import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
// import { getDistrictName } from '@/app/components/DistrictsData';
// import dynamic from 'next/dynamic';
// import Image from 'next/image';
// import { useSwipeable } from 'react-swipeable';
// import { useRouter } from 'next/navigation';
// import { useFavorites } from '@/app/hooks/useFavorites';
// import { useLanguage } from "@/app/LanguageContext";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Card,
//   CardContent,
//   Divider,
//   Grid,
//   useTheme,
//   useMediaQuery,
//   Badge,
//   Tooltip,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogContent,
//   CircularProgress,
// } from '@mui/material';
// import {
//   Favorite,
//   FavoriteBorder,
//   KingBed,
//   MeetingRoom,
//   DirectionsSubway,
//   ArrowBackIos,
//   ArrowForwardIos,
//   PhotoCamera,
//   MapOutlined,
// } from '@mui/icons-material';
// import ApartmentStats from './ApartmentStats';

// // Динамическая форма создания пользователя
// const CreateUser = dynamic(() => import('./CreateUser'), {
//   loading: () => <div>Загрузка формы...</div>
// });

// // Переводы
// const APARTMENT_CARD_TRANSLATIONS = {
//   ua: {
//     noPhotos: 'Немає фото',
//     noCity: 'Місто не вказано',
//     noStreet: 'Вулиця не вказана',
//     noHouseNumber: 'без номера',
//     guests: (count) => (count === 1 ? 'гість' : count < 5 ? 'гості' : 'гостей'),
//     rooms: (count) => (count === 1 ? 'кімната' : count < 5 ? 'кімнати' : 'кімнат'),
//     noPrice: 'Ціна не вказана',
//     favoriteAdd: 'Додати в обране',
//     favoriteRemove: 'Видалити з обраного',
//     apartmentDefault: 'Апартаменти',
//     loginRequired: 'Увійдіть, щоб додати в обране',
//     favoriteError: 'Помилка при оновленні обраного',
//     district: 'район',
//     metro: 'метро',
//   },
//   ru: {
//     noPhotos: 'Нет фото',
//     noCity: 'Город не указан',
//     noStreet: 'Улица не указана',
//     noHouseNumber: 'без номера',
//     guests: (count) => (count === 1 ? 'гость' : count < 5 ? 'гостя' : 'гостей'),
//     rooms: (count) => (count === 1 ? 'комната' : count < 5 ? 'комнаты' : 'комнат'),
//     noPrice: 'Цена не указана',
//     favoriteAdd: 'Добавить в избранное',
//     favoriteRemove: 'Удалить из избранное',
//     apartmentDefault: 'Апартаменты',
//     loginRequired: 'Войдите, чтобы добавить в избранное',
//     favoriteError: 'Ошибка при обновлении избранного',
//     district: 'район',
//     metro: 'метро',
//   },
// };

// const CATEGORY_TRANSLATIONS = {
//   ua: {
//     'Квартира': 'Квартира',
//     'Гостиница': 'Готель',
//     'Хостел': 'Хостел',
//     'Дом': 'Будинок',
//     'База отдыха': 'База відпочинку',
//     'Сауна/Баня': 'Сауна/Лазня',
//     'Готель для тварин': 'Готель для тварин',
//     'Глемпинг': 'Глемпінг',
//     'Пансионат': ' Санаторій/Пансіонат',
//     'Котедж для компаний': 'Котедж для компаній',
//     'Коворкинг': 'Коворкінг',
//     'Автокемпинг': 'Автокемпінг',
//   },
//   ru: {
//     'Квартира': 'Квартира',
//     'Гостиница': 'Гостиница',
//     'Хостел': 'Хостел',
//     'Будинок': 'Дом',
//     'База відпочинку': 'База отдыха',
//     'Сауна/Лазня': 'Сауна/Баня',
//     'Глемпинг': 'Глэмпинг',
//     'Пансионат': 'Пансионат',
//     'Котедж для компаній': 'Коттедж для компаний',
//     'Коворкінг': 'Коворкинг',
//     'Автокемпінг': 'Автокемпинг',
//     'Готель для тварин': 'Гостиница для животных',
//   }
// };

// // Вспомогательный компонент для иконка+текст
// const IconText = ({ icon: Icon, text }) => (
//   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//     <Icon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
//     <Typography variant="caption">{text}</Typography>
//   </Box>
// );

// const ApartmentCardComponent = ({
//   apartment,
//   isFavorite: propIsFavorite,
//   toggleFavorite: propToggleFavorite,
//   showStats = false,
//   currentUserId = null,
// }) => {
//   const { currentLanguage } = useLanguage();
//   const t = APARTMENT_CARD_TRANSLATIONS[currentLanguage] || APARTMENT_CARD_TRANSLATIONS.ua;
//   const categoryTranslations = CATEGORY_TRANSLATIONS[currentLanguage] || CATEGORY_TRANSLATIONS.ua;

//   const translateCategory = useCallback((category) => {
//     if (!category) return t.apartmentDefault;
//     const cleanCategory = String(category).trim();
//     return categoryTranslations[cleanCategory] || cleanCategory;
//   }, [categoryTranslations, t.apartmentDefault]);

//   const photos = Array.isArray(apartment?.photos) ? apartment.photos : [];
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
//   const [loginModalOpen, setLoginModalOpen] = useState(false);
//   const autoCloseTimer = useRef(null);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const router = useRouter();
//   const { isFavorite, toggleFavorite, loading: favoriteLoading } = useFavorites();

//   const actualIsFavorite = propIsFavorite !== undefined ? propIsFavorite : isFavorite(apartment?._id);
//   const actualToggleFavorite = propToggleFavorite || toggleFavorite;

//   const startAutoCloseTimer = useCallback(() => {
//     if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
//     autoCloseTimer.current = setTimeout(() => {
//       setLoginModalOpen(false);
//       setSnackbar(prev => ({ ...prev, open: false }));
//     }, 5000);
//   }, []);

//   const handlePrevPhoto = useCallback((e) => {
//     e.stopPropagation();
//     setCurrentIndex(prev => (prev === 0 ? photos.length - 1 : prev - 1));
//   }, [photos.length]);

//   const handleNextPhoto = useCallback((e) => {
//     e.stopPropagation();
//     setCurrentIndex(prev => (prev === photos.length - 1 ? 0 : prev + 1));
//   }, [photos.length]);

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () => setCurrentIndex(prev => (prev === photos.length - 1 ? 0 : prev + 1)),
//     onSwipedRight: () => setCurrentIndex(prev => (prev === 0 ? photos.length - 1 : prev - 1)),
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

//   const handleCardClick = useCallback(() => {
//     if (!loginModalOpen) router.push(`/apartment/${apartment._id}`);
//   }, [loginModalOpen, apartment?._id, router]);

//   const handleFavoriteClick = useCallback(async (e) => {
//     e.stopPropagation();
//     if (favoriteLoading) return;
//     const userProfile = localStorage.getItem('user_profile');
//     if (!userProfile) {
//       setLoginModalOpen(true);
//       setSnackbar({ open: true, message: t.loginRequired, severity: 'info' });
//       startAutoCloseTimer();
//       return;
//     }
//     try { await actualToggleFavorite(apartment._id); }
//     catch (error) {
//       setSnackbar({ open: true, message: t.favoriteError, severity: 'error' });
//     }
//   }, [favoriteLoading, t, startAutoCloseTimer, actualToggleFavorite, apartment?._id]);

//   const handleCloseSnackbar = useCallback(() => setSnackbar(prev => ({ ...prev, open: false })), []);
//   const handleCloseModal = useCallback(() => setLoginModalOpen(false), []);

//   const formatPrice = useCallback((price) => {
//     if (!price) return t.noPrice;
//     return new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH', maximumFractionDigits: 0 })
//       .format(price).replace('₴', ' грн');
//   }, [t.noPrice]);

//   return (
//     <Card
//       onClick={handleCardClick}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       sx={{
//         cursor: 'pointer',
//         bgcolor: 'background.paper',
//         borderRadius: 3,
//         boxShadow: theme.shadows[3],
//         transition: 'all 0.3s ease',
//         display: 'flex',
//         flexDirection: 'column',
//         position: 'relative',
//         overflow: 'hidden',
//         // height: { xs: 'auto', sm: 'auto' },
//         height: '100%',
//         mb: { xs: 2, sm: 0 },
//         '&:hover': { boxShadow: theme.shadows[6], transform: { sm: 'translateY(-5px)' } },
//       }}
//     >
//       {/* Favorite Button */}
//       <Tooltip title={actualIsFavorite ? t.favoriteRemove : t.favoriteAdd} arrow>
//         <IconButton
//           onClick={handleFavoriteClick}
//           disabled={favoriteLoading}
//           sx={{
//             position: 'absolute', top: 8, right: 8, zIndex: 2,
//             bgcolor: 'rgba(255,255,255,0.9)',
//             '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
//             width: isMobile ? 32 : 40, height: isMobile ? 32 : 40,
//             padding: isMobile ? 0.5 : 1,
//             '& .MuiSvgIcon-root': { fontSize: isMobile ? '1.2rem' : '1.5rem' }
//           }}
//         >
//           {favoriteLoading ? <CircularProgress size={isMobile ? 20 : 24} /> :
//             actualIsFavorite ? <Favorite color="error" /> : <FavoriteBorder color="action" />}
//         </IconButton>
//       </Tooltip>

//       {/* 👇 ДОБАВЬ ЭТОТ БЛОК ДЛЯ РЕДАКТИРОВАНИЯ/УДАЛЕНИЯ */}
// {apartment?.actions && (
//   <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
//     {apartment.actions}
//   </Box>
// )}

//       {/* Photos */}
//       <Box {...swipeHandlers} sx={{ height: { xs: 210, sm: 220, md: 240 },
//       flexShrink: 0,
//        overflow: 'hidden', borderRadius: '12px 12px 0 0', userSelect: 'none',
//        position: 'relative'
//         }}>
//         {photos.length > 0 ? (
//           <>
//             <Image
//               src={photos[currentIndex].thumbnail || photos[currentIndex]}
//               alt={`apartment-${currentIndex + 1}`}
//               width={400} height={300}
//               style={{ objectFit: 'cover', width: '100%', height: '100%' }}
//               loading="lazy"
//             />
//             {photos.length > 1 && (
//               <>
//                 <Badge badgeContent={`${currentIndex + 1}/${photos.length}`} color="primary" sx={{
//                   position: 'absolute', bottom: isMobile ? 20 : 13, right: isMobile ? 25 : 20,
//                   '& .MuiBadge-badge': { bgcolor: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: isMobile ? '0.65rem' : '0.7rem', fontWeight: 'bold', px: isMobile ? 0.8 : 1, py: isMobile ? 0.3 : 0.5, borderRadius: '16px', border: '1px solid rgba(255,255,255,0.3)' }
//                 }} />
//                 <IconButton onClick={handlePrevPhoto} sx={{
//                   position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)',
//                   bgcolor: 'rgba(0,0,0,0.4)', color: 'white',
//                   '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
//                   opacity: { xs: 1, sm: isHovered ? 1 : 0 },
//                   width: isMobile ? 28 : 36, height: isMobile ? 28 : 36,
//                   padding: isMobile ? 0.5 : 1,
//                   '& .MuiSvgIcon-root': { fontSize: isMobile ? '0.9rem' : '1.1rem' }
//                 }}><ArrowBackIos fontSize="small" /></IconButton>
//                 <IconButton onClick={handleNextPhoto} sx={{
//                   position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)',
//                   bgcolor: 'rgba(0,0,0,0.4)', color: 'white',
//                   '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
//                   opacity: { xs: 1, sm: isHovered ? 1 : 0 },
//                   width: isMobile ? 28 : 36, height: isMobile ? 28 : 36,
//                   padding: isMobile ? 0.5 : 1,
//                   '& .MuiSvgIcon-root': { fontSize: isMobile ? '0.9rem' : '1.1rem' }
//                 }}><ArrowForwardIos fontSize="small" /></IconButton>
//               </>
//             )}
//           </>
//         ) : (
//           <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5', color: 'text.secondary', gap: 1 }}>
//             <PhotoCamera fontSize="large" />
//             <Typography variant="body2">{t.noPhotos}</Typography>
//           </Box>
//         )}
//       </Box>

//       {/* Card Content */}
//       <CardContent sx={{ p: { xs: 1.5, sm: 2 }, flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//         <Box sx={{ mb: { xs: 1.25, sm: 2 }, px: 2, py: 0.5, bgcolor: 'primary.light', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', width: 'fit-content' }}>
//           <Typography variant="subtitle2" color="white" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: isMobile ? 600 : 500 }}>
//             {translateCategory(apartment?.category) || t.apartmentDefault}
//           </Typography>
//         </Box>

//         <Box sx={{ mb: 1.25 }}>
//           <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, lineHeight: 1.35 }}>
//             {apartment?.city || t.noCity}, {apartment?.street || t.noStreet}{apartment?.houseNumber ? `, ${apartment.houseNumber}` : `, ${t.noHouseNumber}`}
//           </Typography>
//           <Grid container spacing={0.5}>
//             {!!apartment?.district && <Grid item xs={12}><IconText icon={MapOutlined} text={`${t.district} ${getDistrictName(apartment.district, currentLanguage)}`} /></Grid>}
//             {!!apartment?.metro && <Grid item xs={12}><IconText icon={DirectionsSubway} text={`${t.metro} ${apartment.metro}`} /></Grid>}
//           </Grid>
//         </Box>

//         <Divider sx={{ my: 1 }} />
//         <Grid container spacing={1} sx={{ mb: 1.25 }}>
//           <Grid item xs={6}><IconText icon={KingBed} text={`${apartment?.beds ?? '?'} ${t.guests(apartment?.beds)}`} /></Grid>
//           <Grid item xs={6}><IconText icon={MeetingRoom} text={`${apartment?.rooms ?? '?'} ${t.rooms(apartment?.rooms)}`} /></Grid>
//         </Grid>

//         <Box sx={{ bgcolor: 'primary.main', borderRadius: 2, p: { xs: 1, sm: 1.5 }, textAlign: 'center', mt: 'auto', transition: 'all 0.3s ease', '&:hover': { bgcolor: 'primary.dark' } }}>
//           <Typography sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, fontWeight: 700, color: 'white', lineHeight: 1 }}>
//             {formatPrice(apartment?.price)}
//           </Typography>
//         </Box>

//         {/* Блок статистики - показываем только если передан showStats (владелец) и это его объявление */}
//         {showStats && currentUserId && apartment?.user_id === currentUserId && (
//           <ApartmentStats 
//             apartmentId={apartment._id} 
//             userId={currentUserId}
//           />
//         )}
//       </CardContent>

//       {/* Snackbar */}
//       <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
//         <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>{snackbar.message}</Alert>
//       </Snackbar>

//       {/* Login Dialog */}
//       <Dialog open={loginModalOpen} onClose={handleCloseModal} fullWidth maxWidth="xs">
//         <DialogContent><CreateUser onClose={handleCloseModal} /></DialogContent>
//       </Dialog>
//     </Card>
//   );
// };

// const MemoizedApartmentCardComponent = memo(ApartmentCardComponent);

// export default function ApartmentCard(props) {
//   return <MemoizedApartmentCardComponent {...props} />;
// }



'use client';

import React, { useState, useRef, useCallback, memo } from 'react';
import { getDistrictName } from '@/app/components/DistrictsData';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import { useFavorites } from '@/app/hooks/useFavorites';
import { useLanguage } from "@/app/LanguageContext";
import axios from 'axios';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Divider,
  Grid,
  useTheme,
  useMediaQuery,
  Badge,
  Tooltip,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  CircularProgress,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  KingBed,
  MeetingRoom,
  DirectionsSubway,
  ArrowBackIos,
  ArrowForwardIos,
  PhotoCamera,
  MapOutlined,
} from '@mui/icons-material';
import ApartmentStats from './ApartmentStats';

const CreateUser = dynamic(() => import('./CreateUser'), {
  loading: () => <div>Загрузка формы...</div>
});

const APARTMENT_CARD_TRANSLATIONS = {
  ua: {
    noPhotos: 'Немає фото',
    noCity: 'Місто не вказано',
    noStreet: 'Вулиця не вказана',
    noHouseNumber: 'без номера',
    guests: (count) => (count === 1 ? 'гість' : count < 5 ? 'гості' : 'гостей'),
    rooms: (count) => (count === 1 ? 'кімната' : count < 5 ? 'кімнати' : 'кімнат'),
    noPrice: 'Ціна не вказана',
    favoriteAdd: 'Додати в обране',
    favoriteRemove: 'Видалити з обраного',
    apartmentDefault: 'Апартаменти',
    loginRequired: 'Увійдіть, щоб додати в обране',
    favoriteError: 'Помилка при оновленні обраного',
    district: 'район',
    metro: 'метро',
  },
  ru: {
    noPhotos: 'Нет фото',
    noCity: 'Город не указан',
    noStreet: 'Улица не указана',
    noHouseNumber: 'без номера',
    guests: (count) => (count === 1 ? 'гость' : count < 5 ? 'гостя' : 'гостей'),
    rooms: (count) => (count === 1 ? 'комната' : count < 5 ? 'комнаты' : 'комнат'),
    noPrice: 'Цена не указана',
    favoriteAdd: 'Добавить в избранное',
    favoriteRemove: 'Удалить из избранное',
    apartmentDefault: 'Апартаменты',
    loginRequired: 'Войдите, чтобы добавить в избранное',
    favoriteError: 'Ошибка при обновлении избранного',
    district: 'район',
    metro: 'метро',
  },
};

const CATEGORY_TRANSLATIONS = {
  ua: {
    'Квартира': 'Квартира',
    'Гостиница': 'Готель',
    'Хостел': 'Хостел',
    'Дом': 'Будинок',
    'База отдыха': 'База відпочинку',
    'Сауна/Баня': 'Сауна/Лазня',
    'Готель для тварин': 'Готель для тварин',
    'Глемпинг': 'Глемпінг',
    'Пансионат': ' Санаторій/Пансіонат',
    'Котедж для компаний': 'Котедж для компаній',
    'Коворкинг': 'Коворкінг',
    'Автокемпинг': 'Автокемпінг',
  },
  ru: {
    'Квартира': 'Квартира',
    'Гостиница': 'Гостиница',
    'Хостел': 'Хостел',
    'Будинок': 'Дом',
    'База відпочинку': 'База отдыха',
    'Сауна/Лазня': 'Сауна/Баня',
    'Глемпинг': 'Глэмпинг',
    'Пансионат': 'Пансионат',
    'Котедж для компаній': 'Коттедж для компаний',
    'Коворкінг': 'Коворкинг',
    'Автокемпінг': 'Автокемпинг',
    'Готель для тварин': 'Гостиница для животных',
  }
};

const IconText = ({ icon: Icon, text }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Icon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
    <Typography variant="caption">{text}</Typography>
  </Box>
);

const ApartmentCardComponent = ({
  apartment,
  isFavorite: propIsFavorite,
  toggleFavorite: propToggleFavorite,
  showStats = false,
  currentUserId = null,
  priority = false, 
}) => {
  const { currentLanguage } = useLanguage();
  const t = APARTMENT_CARD_TRANSLATIONS[currentLanguage] || APARTMENT_CARD_TRANSLATIONS.ua;
  const categoryTranslations = CATEGORY_TRANSLATIONS[currentLanguage] || CATEGORY_TRANSLATIONS.ua;

  const translateCategory = useCallback((category) => {
    if (!category) return t.apartmentDefault;
    const cleanCategory = String(category).trim();
    return categoryTranslations[cleanCategory] || cleanCategory;
  }, [categoryTranslations, t.apartmentDefault]);

  const photos = Array.isArray(apartment?.photos) ? apartment.photos : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const autoCloseTimer = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const { isFavorite, toggleFavorite, loading: favoriteLoading } = useFavorites();

  const actualIsFavorite = propIsFavorite !== undefined ? propIsFavorite : isFavorite(apartment?._id);
  const actualToggleFavorite = propToggleFavorite || toggleFavorite;

  const startAutoCloseTimer = useCallback(() => {
    if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
    autoCloseTimer.current = setTimeout(() => {
      setLoginModalOpen(false);
      setSnackbar(prev => ({ ...prev, open: false }));
    }, 5000);
  }, []);

  const handlePrevPhoto = useCallback((e) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev === 0 ? photos.length - 1 : prev - 1));
  }, [photos.length]);

  const handleNextPhoto = useCallback((e) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev === photos.length - 1 ? 0 : prev + 1));
  }, [photos.length]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex(prev => (prev === photos.length - 1 ? 0 : prev + 1)),
    onSwipedRight: () => setCurrentIndex(prev => (prev === 0 ? photos.length - 1 : prev - 1)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleCardClick = useCallback(() => {
    if (!loginModalOpen) router.push(`/apartment/${apartment._id}`);
  }, [loginModalOpen, apartment?._id, router]);

  const handleFavoriteClick = useCallback(async (e) => {
    e.stopPropagation();
    if (favoriteLoading) return;
    
    const userProfile = localStorage.getItem('user_profile');
    if (!userProfile) {
      setLoginModalOpen(true);
      setSnackbar({ open: true, message: t.loginRequired, severity: 'info' });
      startAutoCloseTimer();
      return;
    }
    
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/stats/${apartment._id}/favorite-click`);
    } catch (statsError) {
      console.error('❌ Failed to send favorite click stats:', statsError);
    }
    
    try { 
      await actualToggleFavorite(apartment._id); 
    } catch (error) {
      setSnackbar({ open: true, message: t.favoriteError, severity: 'error' });
    }
  }, [favoriteLoading, t, startAutoCloseTimer, actualToggleFavorite, apartment?._id]);

  const handleCloseSnackbar = useCallback(() => setSnackbar(prev => ({ ...prev, open: false })), []);
  const handleCloseModal = useCallback(() => setLoginModalOpen(false), []);

  const formatPrice = useCallback((price) => {
    if (!price) return t.noPrice;
    return new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH', maximumFractionDigits: 0 })
      .format(price).replace('₴', ' грн');
  }, [t.noPrice]);

  return (
    <Card
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        cursor: 'pointer',
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: theme.shadows[3],
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        mb: { xs: 2, sm: 0 },
        '&:hover': { boxShadow: theme.shadows[6], transform: { sm: 'translateY(-5px)' } },
      }}
    >
      <Tooltip title={actualIsFavorite ? t.favoriteRemove : t.favoriteAdd} arrow>
        <IconButton
          onClick={handleFavoriteClick}
          disabled={favoriteLoading}
          sx={{
            position: 'absolute', top: 8, right: 8, zIndex: 2,
            bgcolor: 'rgba(255,255,255,0.9)',
            '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
            width: isMobile ? 32 : 40, height: isMobile ? 32 : 40,
            padding: isMobile ? 0.5 : 1,
            '& .MuiSvgIcon-root': { fontSize: isMobile ? '1.2rem' : '1.5rem' }
          }}
        >
          {favoriteLoading ? <CircularProgress size={isMobile ? 20 : 24} /> :
            actualIsFavorite ? <Favorite color="error" /> : <FavoriteBorder color="action" />}
        </IconButton>
      </Tooltip>

      {apartment?.actions && (
        <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
          {apartment.actions}
        </Box>
      )}

      <Box {...swipeHandlers} sx={{ 
        height: { xs: 210, sm: 220, md: 240 },
        flexShrink: 0,
        overflow: 'hidden', 
        borderRadius: '12px 12px 0 0', 
        userSelect: 'none',
        position: 'relative'
      }}>
        {photos.length > 0 ? (
          <>
            <Box 
              className="spinner-overlay"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                zIndex: 2,
                transition: 'opacity 0.3s ease'
              }}
            >
              <Box sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: '3px solid #e0e0e0',
                borderTopColor: '#1976d2',
                animation: 'spin 1s linear infinite'
              }} />
            </Box>

            <style jsx>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>

            <Image
              src={photos[currentIndex].thumbnail || photos[currentIndex]}
              alt={`apartment-${currentIndex + 1}`}
              width={400}
              height={300}
              quality={55}
              priority={priority}
              fetchpriority={priority ? "high" : "auto"}
              loading={priority ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ 
                objectFit: 'cover', 
                width: '100%', 
                height: '100%'
              }}
              onLoad={(e) => {
                const spinner = e.target?.parentElement?.querySelector('.spinner-overlay');
                if (spinner) {
                  spinner.style.opacity = '0';
                  setTimeout(() => {
                    spinner.style.display = 'none';
                  }, 300);
                }
              }}
            />
            {photos.length > 1 && (
              <>
                <Badge badgeContent={`${currentIndex + 1}/${photos.length}`} color="primary" sx={{
                  position: 'absolute', 
                  bottom: isMobile ? 20 : 13, 
                  right: isMobile ? 25 : 20,
                  zIndex: 3,
                  '& .MuiBadge-badge': { 
                    bgcolor: 'rgba(0,0,0,0.7)', 
                    color: '#fff', 
                    fontSize: isMobile ? '0.65rem' : '0.7rem', 
                    fontWeight: 'bold', 
                    px: isMobile ? 0.8 : 1, 
                    py: isMobile ? 0.3 : 0.5, 
                    borderRadius: '16px', 
                    border: '1px solid rgba(255,255,255,0.3)' 
                  }
                }} />
                <IconButton onClick={handlePrevPhoto} sx={{
                  position: 'absolute', 
                  top: '50%', 
                  left: 8, 
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(0,0,0,0.4)', 
                  color: 'white',
                  zIndex: 3,
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                  opacity: { xs: 1, sm: isHovered ? 1 : 0 },
                  width: isMobile ? 28 : 36, 
                  height: isMobile ? 28 : 36,
                  padding: isMobile ? 0.5 : 1,
                  '& .MuiSvgIcon-root': { fontSize: isMobile ? '0.9rem' : '1.1rem' }
                }}><ArrowBackIos fontSize="small" /></IconButton>
                <IconButton onClick={handleNextPhoto} sx={{
                  position: 'absolute', 
                  top: '50%', 
                  right: 8, 
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(0,0,0,0.4)', 
                  color: 'white',
                  zIndex: 3,
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                  opacity: { xs: 1, sm: isHovered ? 1 : 0 },
                  width: isMobile ? 28 : 36, 
                  height: isMobile ? 28 : 36,
                  padding: isMobile ? 0.5 : 1,
                  '& .MuiSvgIcon-root': { fontSize: isMobile ? '0.9rem' : '1.1rem' }
                }}><ArrowForwardIos fontSize="small" /></IconButton>
              </>
            )}
          </>
        ) : (
          <Box sx={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            bgcolor: '#f5f5f5', 
            color: 'text.secondary', 
            gap: 1 
          }}>
            <PhotoCamera fontSize="large" />
            <Typography variant="body2">{t.noPhotos}</Typography>
          </Box>
        )}
      </Box>

      <CardContent sx={{ p: { xs: 1.5, sm: 2 }, flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ mb: { xs: 1.25, sm: 2 }, px: 2, py: 0.5, bgcolor: 'primary.light', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', width: 'fit-content' }}>
          <Typography variant="subtitle2" color="white" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: isMobile ? 600 : 500 }}>
            {translateCategory(apartment?.category) || t.apartmentDefault}
          </Typography>
        </Box>

        <Box sx={{ mb: 1.25 }}>
          <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, lineHeight: 1.35 }}>
            {apartment?.city || t.noCity}, {apartment?.street || t.noStreet}{apartment?.houseNumber ? `, ${apartment.houseNumber}` : `, ${t.noHouseNumber}`}
          </Typography>
          <Grid container spacing={0.5}>
            {!!apartment?.district && <Grid item xs={12}><IconText icon={MapOutlined} text={`${t.district} ${getDistrictName(apartment.district, currentLanguage)}`} /></Grid>}
            {!!apartment?.metro && <Grid item xs={12}><IconText icon={DirectionsSubway} text={`${t.metro} ${apartment.metro}`} /></Grid>}
          </Grid>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Grid container spacing={1} sx={{ mb: 1.25 }}>
          <Grid item xs={6}><IconText icon={KingBed} text={`${apartment?.beds ?? '?'} ${t.guests(apartment?.beds)}`} /></Grid>
          <Grid item xs={6}><IconText icon={MeetingRoom} text={`${apartment?.rooms ?? '?'} ${t.rooms(apartment?.rooms)}`} /></Grid>
        </Grid>

        <Box sx={{ bgcolor: 'primary.main', borderRadius: 2, p: { xs: 1, sm: 1.5 }, textAlign: 'center', mt: 'auto', transition: 'all 0.3s ease', '&:hover': { bgcolor: 'primary.dark' } }}>
          <Typography sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, fontWeight: 700, color: 'white', lineHeight: 1 }}>
            {formatPrice(apartment?.price)}
          </Typography>
        </Box>

        {showStats && currentUserId && apartment?.user_id === currentUserId && (
          <ApartmentStats 
            apartmentId={apartment._id} 
            userId={currentUserId}
          />
        )}
      </CardContent>

      <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>{snackbar.message}</Alert>
      </Snackbar>

      <Dialog open={loginModalOpen} onClose={handleCloseModal} fullWidth maxWidth="xs">
        <DialogContent><CreateUser onClose={handleCloseModal} /></DialogContent>
      </Dialog>
    </Card>
  );
};

const MemoizedApartmentCardComponent = memo(ApartmentCardComponent);

export default function ApartmentCard(props) {
  return <MemoizedApartmentCardComponent {...props} />;
}