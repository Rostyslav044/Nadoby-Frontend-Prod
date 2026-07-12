// Компонент загружает список апартаментов с сервера,
//  показывает загрузку во время ожидания, 
//  а затем отображает список квартир через ApartmentList.
//   Также он позволяет отмечать квартиры как избранные, если пользователь авторизован.



// 'use client';

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import axios from 'axios';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import {
//   Box,
//   CircularProgress,
//   IconButton,
//   Menu,
//   MenuItem,
//   Snackbar,
//   Alert,
//   Typography,
//   Fade,
//   Zoom,
//   Button,
//   Container,
//   Grid,
// } from '@mui/material';
// import { MoreVert, Edit, Delete, Home, Search, ArrowForward } from '@mui/icons-material';
// import ApartmentList from './ApartmentList';
// import { useLanguage } from '@/app/LanguageContext';
// import { useFavorites } from '@/app/hooks/useFavorites';

// const APARTMENTS_TRANSLATIONS = {
//   ua: {
//     // ... (твои существующие переводы)
//     deleteConfirm: 'Ви впевнені, що хочете видалити це оголошення?',
//     loadError: 'Помилка при завантаженні апартаментів',
//     deleteSuccess: 'Оголошення успішно видалено!',
//     deleteError: 'Помилка при видаленні оголошення',
//     favoriteError: 'Помилка при оновленні обраного',
//     edit: 'Редагувати',
//     delete: 'Видалити',
//     loginRequired: 'Будь ласка, увійдіть щоб додати в обране',
//     favoriteAdded: 'Додано в обране',
//     favoriteRemoved: 'Видалено з обраного',
//     noApartments: 'Немає жодного апартамента',
//     noApartmentsDescription: 'Спробуйте змінити параметри пошуку або додати нове оголошення',
//     loadingApartments: 'Завантаження апартаментів...',
//     // НОВЫЕ ПЕРЕВОДЫ
//     showAll: 'Показати всі',
//     showAllApartments: 'Дивитися всі пропозиції',
//     loadingMore: 'Завантаження...',
//     // foundApartments: 'Знайдено оголошень:',
//     // shuffleInfo: 'Нові варіанти при кожному відвідуванні',
//   },
//   ru: {
//     // ... (твои существующие переводы)
//     deleteConfirm: 'Вы уверены, что хотите удалить это объявление?',
//     loadError: 'Ошибка при загрузке апартаментов',
//     deleteSuccess: 'Объявление успешно удалено!',
//     deleteError: 'Ошибка при удалении объявления',
//     favoriteError: 'Ошибка при обновлении избранного',
//     edit: 'Редактировать',
//     delete: 'Удалить',
//     loginRequired: 'Пожалуйста, войдите чтобы добавить в избранное',
//     favoriteAdded: 'Добавлено в избранное',
//     favoriteRemoved: 'Удалено из избранного',
//     noApartments: 'Нет ни одного апартамента',
//     noApartmentsDescription: 'Попробуйте изменить параметры поиска или добавить новое объявление',
//     loadingApartments: 'Загрузка апартаментов...',
//     // НОВЫЕ ПЕРЕВОДЫ
//     showAll: 'Показать все',
//     showAllApartments: 'Смотреть все предложения',
//     loadingMore: 'Загрузка...',
//     // foundApartments: 'Найдено объявлений:',
//     // shuffleInfo: 'Новые варианты при каждом посещении',
//   },
// };

// // Функция для перемешивания массива (алгоритм Фишера-Йетса)
// const shuffleArray = (array) => {
//   const shuffled = [...array];
//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   }
//   return shuffled;
// };

// // Компонент кнопки "Показать все" с анимацией
// const ShowAllButton = ({ onClick, count, translations }) => {
//   const [isHovered, setIsHovered] = useState(false);
  
//   return (
//     <Fade in={true} timeout={1000}>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           // mt: 4,
//           // mb: 2,
//           // mt: 2,
//           // mb: 1,
//           position: 'relative',
//         }}
//       >
//         <Button
//           variant="contained"
//           size="large"
//           onClick={onClick}
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//           sx={{
//             // Адаптивные размеры для мобилок
//             py: { xs: 1, sm: 1.5 }, // меньше на мобилке
//             px: { xs: 2, sm: 4 },   // меньше на мобилке
//             borderRadius: { xs: 2, sm: 3 }, // меньше на мобилке
//             fontSize: { xs: '0.9rem', sm: '1.1rem' }, // меньше на мобилке
            
//             // Остальные стили
//             background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//             color: 'white',
//             fontWeight: 'bold',
//             boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//             transition: 'all 0.3s ease',
//             '&:hover': {
//               transform: 'translateY(-2px)',
//               boxShadow: '0 6px 10px 4px rgba(255, 105, 135, .4)',
//             },
//           }}
//           endIcon={
//             <ArrowForward 
//               sx={{ 
//                 transform: isHovered ? 'translateX(5px)' : 'none',
//                 transition: 'transform 0.3s ease',
//                 // Можно также уменьшить иконку на мобилке
//                 fontSize: { xs: '1.2rem', sm: '1.5rem' },
//               }} 
//             />
//           }
//         >
//           {translations.showAll} 
//           {/* ({count}) */}
//         </Button>
        
//         {/* Информация о перемешивании */}
//         <Zoom in={true} style={{ transitionDelay: '500ms' }}>
//           <Typography
//             variant="caption"
//             sx={{
//               position: 'absolute',
//               bottom: -25,
//               left: '50%',
//               transform: 'translateX(-50%)',
//               color: 'text.secondary',
//               whiteSpace: 'nowrap',
//               animation: 'fadeInUp 0.5s ease',
//               '@keyframes fadeInUp': {
//                 '0%': {
//                   opacity: 0,
//                   transform: 'translateX(-50%) translateY(10px)',
//                 },
//                 '100%': {
//                   opacity: 1,
//                   transform: 'translateX(-50%) translateY(0)',
//                 },
//               },
//               // Адаптивный размер шрифта для подписи
//               fontSize: { xs: '0.6rem', sm: '0.75rem' },
//             }}
//           >
//             {/* {translations.shuffleInfo} */}
//           </Typography>
//         </Zoom>
//       </Box>
//     </Fade>
//   );
// };

// const ApartmentsContent = ({ 
//   userId, 
//   showActions = false, 
//   favoriteIds, 
//   forceRefreshKey, 
//   onFavoriteRemoved,
//   initialApartments = [],
//   initialLoading = false,
//   serverTimestamp 
// }) => {
//   const [allApartments, setAllApartments] = useState([]); // Все загруженные апартаменты
//   const [displayedApartments, setDisplayedApartments] = useState([]); // Отображаемые (первые 9 или все)
//   const [loading, setLoading] = useState(initialLoading);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [showAll, setShowAll] = useState(false); // Показывать все или только 9
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedApartment, setSelectedApartment] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
//   const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

//   const { data: session } = useSession();
//   const router = useRouter();
//   const { currentLanguage } = useLanguage();
//   const t = APARTMENTS_TRANSLATIONS[currentLanguage] || APARTMENTS_TRANSLATIONS.ua;

//   const { isFavorite, toggleFavorite, loading: favoriteLoading } = useFavorites();

//   // Константа для количества отображаемых на главной
//   const INITIAL_DISPLAY_COUNT = 9;

//   // Загрузка данных
//   useEffect(() => {
//     const loadData = async () => {
//       const userProfile = localStorage.getItem('user_profile');
//       if (userProfile) {
//         try {
//           const profileData = JSON.parse(userProfile);
//           setCurrentUser(profileData);
//         } catch (error) {
//           console.error('Error parsing user profile:', error);
//         }
//       }
      
//       await fetchApartments();
//     };
//     loadData();
//   }, [userId, favoriteIds, forceRefreshKey]);

//   // Эффект для обновления отображаемых апартаментов при изменении allApartments или showAll
//   useEffect(() => {
//     if (allApartments.length > 0) {
//       if (showAll) {
//         setDisplayedApartments(allApartments);
//       } else {
//         setDisplayedApartments(allApartments.slice(0, INITIAL_DISPLAY_COUNT));
//       }
//     }
//   }, [allApartments, showAll]);

//   const fetchApartments = async () => {
//     try {
//       setLoading(true);
//       let endpoint = 'get-all';
//       if (userId) endpoint = `user-apartment/${userId}`;
      
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/${endpoint}`);
//       let apartments = response.data;
      
//       // Фильтруем по избранным, если нужно
//       if (favoriteIds && favoriteIds.length > 0) {
//         apartments = apartments.filter((apt) => favoriteIds.includes(apt._id));
//       }
      
//       // Перемешиваем массив для случайного порядка
//       const shuffledApartments = shuffleArray(apartments);
//       setAllApartments(shuffledApartments);
      
//       // Сбрасываем showAll при новой загрузке
//       setShowAll(false);
      
//     } catch (error) {
//       console.error(error);
//       showSnackbar(t.loadError, 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Обработчик кнопки "Показать все"
//   const handleShowAll = async () => {
//     if (allApartments.length <= INITIAL_DISPLAY_COUNT) {
//       setShowAll(true);
//       return;
//     }
    
//     setLoadingMore(true);
    
//     // Имитация загрузки для плавности (если нужно)
//     await new Promise(resolve => setTimeout(resolve, 500));
    
//     setShowAll(true);
//     setLoadingMore(false);
//   };

//   // const handleShowAll = () => {
//   //   router.push('/kyiv-apartments');
//   // };

//   const isUserApartment = (apartment) => currentUser && apartment.user_id === currentUser._id;

//   const handleMenuOpen = (event, apartment) => {
//     event.stopPropagation();
//     if (showActions && isUserApartment(apartment)) {
//       setAnchorEl(event.currentTarget);
//       setSelectedApartment(apartment);
//     }
//   };
  
//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedApartment(null);
//   };

//   const handleEdit = () => {
//     if (selectedApartment) {
//       router.push(`/add-apartment?edit=${selectedApartment._id}`);
//       handleMenuClose();
//     }
//   };
  
//   const handleDelete = async () => {
//     if (!selectedApartment) return;
//     if (!window.confirm(t.deleteConfirm)) {
//       handleMenuClose();
//       return;
//     }
//     try {
//       await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/${selectedApartment._id}`);
//       setAllApartments(allApartments.filter((apt) => apt._id !== selectedApartment._id));
//       showSnackbar(t.deleteSuccess, 'success');
//     } catch (error) {
//       console.error(error);
//       showSnackbar(t.deleteError, 'error');
//     } finally {
//       handleMenuClose();
//     }
//   };

//   const handleToggleFavorite = async (id) => {
//     const userProfile = localStorage.getItem('user_profile');
//     if (!userProfile) {
//       setIsCreateUserOpen(true);
//       return;
//     }
//     try {
//       const newStatus = await toggleFavorite(id);
//       showSnackbar(newStatus ? t.favoriteAdded : t.favoriteRemoved, 'success');
//       if (!newStatus && onFavoriteRemoved) onFavoriteRemoved(id);
//     } catch (error) {
//       if (error.message === 'USER_NOT_LOGGED_IN') {
//         setIsCreateUserOpen(true);
//       } else {
//         showSnackbar(t.favoriteError, 'error');
//       }
//     }
//   };

//   const showSnackbar = (message, severity = 'info') => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const showCreateUserDialog = () => {
//     setIsCreateUserOpen(true);
//   };

//   const onCloseDialog = () => {
//     setIsCreateUserOpen(false);
//   };

//   // Показываем анимацию загрузки
//   if (loading && allApartments.length === 0) {
//     return <LoadingAnimation />;
//   }

//   // Показываем анимацию пустого состояния
//   if (!loading && allApartments.length === 0) {
//     return (
//       <EmptyStateAnimation 
//         message={t.noApartments}
//         description={t.noApartmentsDescription}
//       />
//     );
//   }

//   return (
//     <Box>
//       {showActions && (
//         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//           <MenuItem onClick={handleEdit}>
//             <Edit sx={{ mr: 1 }} /> {t.edit}
//           </MenuItem>
//           <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
//             <Delete sx={{ mr: 1 }} /> {t.delete}
//           </MenuItem>
//         </Menu>
//       )}

//       {/* Информация о количестве найденных объявлений */}
//       <Container sx={{ mt: 1, mb: 1 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           {/* <Typography variant="body2" color="text.secondary">
//             {t.foundApartments} {allApartments.length}
//           </Typography> */}
//           {/* {!showAll && allApartments.length > INITIAL_DISPLAY_COUNT && (
//             <Typography variant="caption" color="primary" sx={{ animation: 'pulse 2s infinite' }}>
//               Показано {INITIAL_DISPLAY_COUNT} из {allApartments.length}
//             </Typography>
//           )} */}
//         </Box>
//       </Container>

//       <ApartmentList
//         apartments={displayedApartments.map((apartment) => ({
//           ...apartment,
//           actions:
//             showActions && isUserApartment(apartment) ? (
//               <IconButton
//                 onClick={(e) => handleMenuOpen(e, apartment)}
//                 size="small"
//                 sx={{ bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: 'rgba(255,255,255,1)' } }}
//               >
//                 <MoreVert />
//               </IconButton>
//             ) : null,
//         }))}
//         isFavorite={isFavorite}
//         toggleFavorite={handleToggleFavorite}
//         showTitle={!favoriteIds}
//         isFavoritesPage={!!favoriteIds}
//         isUserListings={!!userId}
//         isCreateUserOpen={isCreateUserOpen}
//         onCloseDialog={onCloseDialog}
//         showCreateUserDialog={showCreateUserDialog}
//       />

//       {/* Кнопка "Показать все" */}
//       {!showAll && allApartments.length > INITIAL_DISPLAY_COUNT && (
//         <Box sx={{ position: 'relative' }}>
//           {loadingMore ? (
//             <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <ShowAllButton 
//               onClick={handleShowAll}
//               count={allApartments.length - INITIAL_DISPLAY_COUNT}
//               translations={t}
//             />
//           )}
//         </Box>
//       )}

//       {/* Кнопка для обновления/перемешивания (опционально) */}
//       {/* {showAll && allApartments.length > 0 && (
//         <Fade in={true}>
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 4 }}>
            
//           </Box>
//         </Fade>
//       )} */}

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={2000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// // Компонент анимации загрузки (оставляем твой существующий)
// const LoadingAnimation = () => {
//   const { currentLanguage } = useLanguage();
//   const t = APARTMENTS_TRANSLATIONS[currentLanguage] || APARTMENTS_TRANSLATIONS.ua;
  
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '60vh',
//         textAlign: 'center',
//       }}
//     >
//       <Box
//         sx={{
//           position: 'relative',
//           width: 80,
//           height: 80,
//           mb: 3,
//         }}
//       >
//         <CircularProgress
//           size={80}
//           thickness={2}
//           sx={{
//             color: 'primary.main',
//             animation: 'rotate 2s linear infinite',
//           }}
//         />
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//           }}
//         >
//           <Home 
//             sx={{ 
//               fontSize: 30, 
//               color: 'primary.main',
//               animation: 'bounce 1s infinite alternate',
//               '@keyframes bounce': {
//                 '0%': { transform: 'translateY(0px)' },
//                 '100%': { transform: 'translateY(-5px)' },
//               }
//             }} 
//           />
//         </Box>
//       </Box>
      
//       <Fade in={true} timeout={1000}>
//         <Typography
//           variant="h6"
//           sx={{
//             color: 'text.secondary',
//             fontWeight: 500,
//           }}
//         >
//           {t.loadingApartments}
//         </Typography>
//       </Fade>
//     </Box>
//   );
// };

// // Компонент пустого состояния (оставляем твой существующий)
// const EmptyStateAnimation = ({ message, description }) => {
//   return (
//     <Fade in={true} timeout={800}>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           minHeight: '60vh',
//           textAlign: 'center',
//           p: 3,
//         }}
//       >
//         <Zoom in={true} style={{ transitionDelay: '300ms' }}>
//           <Box
//             sx={{
//               position: 'relative',
//               width: 120,
//               height: 120,
//               mb: 3,
//             }}
//           >
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 width: '100%',
//                 height: '100%',
//                 borderRadius: '50%',
//                 backgroundColor: 'primary.light',
//                 opacity: 0.2,
//                 animation: 'pulse 2s infinite ease-in-out',
//                 '@keyframes pulse': {
//                   '0%': {
//                     transform: 'scale(1)',
//                     opacity: 0.2,
//                   },
//                   '50%': {
//                     transform: 'scale(1.1)',
//                     opacity: 0.3,
//                   },
//                   '100%': {
//                     transform: 'scale(1)',
//                     opacity: 0.2,
//                   },
//                 },
//               }}
//             />
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 width: 80,
//                 height: 80,
//                 borderRadius: '50%',
//                 backgroundColor: 'primary.main',
//                 opacity: 0.1,
//                 animation: 'pulse 2s infinite ease-in-out',
//                 animationDelay: '0.5s',
//               }}
//             />
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 width: 60,
//                 height: 60,
//                 borderRadius: '50%',
//                 backgroundColor: 'primary.main',
//                 color: 'white',
//               }}
//             >
//               <Home sx={{ fontSize: 30 }} />
//             </Box>
//           </Box>
//         </Zoom>

//         <Fade in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
//           <Typography
//             variant="h5"
//             component="h2"
//             sx={{
//               mb: 2,
//               color: 'text.secondary',
//               fontWeight: 600,
//             }}
//           >
//             {message}
//           </Typography>
//         </Fade>

//         <Fade in={true} timeout={1000} style={{ transitionDelay: '800ms' }}>
//           <Typography
//             variant="body1"
//             sx={{
//               color: 'text.secondary',
//               maxWidth: 400,
//               lineHeight: 1.6,
//             }}
//           >
//             {description}
//           </Typography>
//         </Fade>

//         <Fade in={true} timeout={1000} style={{ transitionDelay: '1000ms' }}>
//           <Box
//             sx={{
//               mt: 3,
//               display: 'flex',
//               alignItems: 'center',
//               color: 'primary.main',
//             }}
//           >
//             <Search sx={{ mr: 1 }} />
//             <Typography variant="body2">
//               {message === 'Немає жодного апартамента' 
//                 ? 'Спробуйте інші критерії пошуку' 
//                 : 'Попробуйте другие критерии поиска'}
//             </Typography>
//           </Box>
//         </Fade>
//       </Box>
//     </Fade>
//   );
// };

// const Apartments = (props) => {
//   return (
//     <ApartmentsContent {...props} />
//   );
// };

// export default Apartments;


'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  Typography,
  Fade,
  Zoom,
  Button,
  Container,
  Grid,
} from '@mui/material';
import { MoreVert, Edit, Delete, Home, Search, ArrowForward } from '@mui/icons-material';
import ApartmentList from './ApartmentList';
import { useLanguage } from '@/app/LanguageContext';
import { useFavorites } from '@/app/hooks/useFavorites';

const APARTMENTS_TRANSLATIONS = {
  ua: {
    // ... (твои существующие переводы)
    deleteConfirm: 'Ви впевнені, що хочете видалити це оголошення?',
    loadError: 'Помилка при завантаженні апартаментів',
    deleteSuccess: 'Оголошення успішно видалено!',
    deleteError: 'Помилка при видаленні оголошення',
    favoriteError: 'Помилка при оновленні обраного',
    edit: 'Редагувати',
    delete: 'Видалити',
    loginRequired: 'Будь ласка, увійдіть щоб додати в обране',
    favoriteAdded: 'Додано в обране',
    favoriteRemoved: 'Видалено з обраного',
    noApartments: 'Немає жодного апартамента',
    noApartmentsDescription: 'Спробуйте змінити параметри пошуку або додати нове оголошення',
    loadingApartments: 'Завантаження апартаментів...',
    // НОВЫЕ ПЕРЕВОДЫ
    showAll: 'Пошук житла',
    showAllApartments: 'Дивитися всі пропозиції',
    loadingMore: 'Завантаження...',
    // foundApartments: 'Знайдено оголошень:',
    // shuffleInfo: 'Нові варіанти при кожному відвідуванні',
  },
  ru: {
    // ... (твои существующие переводы)
    deleteConfirm: 'Вы уверены, что хотите удалить это объявление?',
    loadError: 'Ошибка при загрузке апартаментов',
    deleteSuccess: 'Объявление успешно удалено!',
    deleteError: 'Ошибка при удалении объявления',
    favoriteError: 'Ошибка при обновлении избранного',
    edit: 'Редактировать',
    delete: 'Удалить',
    loginRequired: 'Пожалуйста, войдите чтобы добавить в избранное',
    favoriteAdded: 'Добавлено в избранное',
    favoriteRemoved: 'Удалено из избранного',
    noApartments: 'Нет ни одного апартамента',
    noApartmentsDescription: 'Попробуйте изменить параметры поиска или добавить новое объявление',
    loadingApartments: 'Загрузка апартаментов...',
    // НОВЫЕ ПЕРЕВОДЫ
    showAll: 'Поиск жилья',
    showAllApartments: 'Смотреть все предложения',
    loadingMore: 'Загрузка...',
    // foundApartments: 'Найдено объявлений:',
    // shuffleInfo: 'Новые варианты при каждом посещении',
  },
};

// Функция для перемешивания массива (алгоритм Фишера-Йетса)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Компонент кнопки "Показать все" с анимацией
const ShowAllButton = ({ onClick, count, translations }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          // mt: 4,
          // mb: 2,
          // mt: 2,
          // mb: 1,
          position: 'relative',
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            // Адаптивные размеры для мобилок
            py: { xs: 1, sm: 1.5 }, // меньше на мобилке
            px: { xs: 2, sm: 4 },   // меньше на мобилке
            borderRadius: { xs: 2, sm: 3 }, // меньше на мобилке
            fontSize: { xs: '0.9rem', sm: '1.1rem' }, // меньше на мобилке
            
            // Остальные стили
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 10px 4px rgba(255, 105, 135, .4)',
            },
          }}
          endIcon={
            <ArrowForward 
              sx={{ 
                transform: isHovered ? 'translateX(5px)' : 'none',
                transition: 'transform 0.3s ease',
                // Можно также уменьшить иконку на мобилке
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
              }} 
            />
          }
        >
          {translations.showAll} 
          {/* ({count}) */}
        </Button>
        
        {/* Информация о перемешивании */}
        <Zoom in={true} style={{ transitionDelay: '500ms' }}>
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              bottom: -25,
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              animation: 'fadeInUp 0.5s ease',
              '@keyframes fadeInUp': {
                '0%': {
                  opacity: 0,
                  transform: 'translateX(-50%) translateY(10px)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateX(-50%) translateY(0)',
                },
              },
              // Адаптивный размер шрифта для подписи
              fontSize: { xs: '0.6rem', sm: '0.75rem' },
            }}
          >
            {/* {translations.shuffleInfo} */}
          </Typography>
        </Zoom>
      </Box>
    </Fade>
  );
};

const ApartmentsContent = ({ 
  userId, 
  showActions = false, 
  favoriteIds, 
  forceRefreshKey, 
  onFavoriteRemoved,
  initialApartments = [],
  initialLoading = false,
  serverTimestamp 
}) => {
  const [allApartments, setAllApartments] = useState([]); // Все загруженные апартаменты
  const [displayedApartments, setDisplayedApartments] = useState([]); // Отображаемые (первые 9 или все)
  const [loading, setLoading] = useState(initialLoading);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showAll, setShowAll] = useState(false); // Показывать все или только 9
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const t = APARTMENTS_TRANSLATIONS[currentLanguage] || APARTMENTS_TRANSLATIONS.ua;

  const { isFavorite, toggleFavorite, loading: favoriteLoading } = useFavorites();

  // Константа для количества отображаемых на главной
  const INITIAL_DISPLAY_COUNT = 6;

  // Загрузка данных
  useEffect(() => {
    const loadData = async () => {
      const userProfile = localStorage.getItem('user_profile');
      if (userProfile) {
        try {
          const profileData = JSON.parse(userProfile);
          setCurrentUser(profileData);
        } catch (error) {
          console.error('Error parsing user profile:', error);
        }
      }
      
      await fetchApartments();
    };
    loadData();
  }, [userId, favoriteIds, forceRefreshKey]);

  // Эффект для обновления отображаемых апартаментов при изменении allApartments или showAll
  useEffect(() => {
    if (allApartments.length > 0) {
      if (showAll) {
        setDisplayedApartments(allApartments);
      } else {
        setDisplayedApartments(allApartments.slice(0, INITIAL_DISPLAY_COUNT));
      }
    }
  }, [allApartments, showAll]);

  const fetchApartments = async () => {
    try {
      setLoading(true);
      let endpoint = 'get-all';
      if (userId) endpoint = `user-apartment/${userId}`;
      
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/${endpoint}`);
      let apartments = response.data;
      
      // Фильтруем по избранным, если нужно
      if (favoriteIds && favoriteIds.length > 0) {
        apartments = apartments.filter((apt) => favoriteIds.includes(apt._id));
      }
      
      // Перемешиваем массив для случайного порядка
      const shuffledApartments = shuffleArray(apartments);
      setAllApartments(shuffledApartments);
      
      // Сбрасываем showAll при новой загрузке
      setShowAll(false);
      
    } catch (error) {
      console.error(error);
      showSnackbar(t.loadError, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Обработчик кнопки "Показать все"
  // const handleShowAll = async () => {
  //   if (allApartments.length <= INITIAL_DISPLAY_COUNT) {
  //     setShowAll(true);
  //     return;
  //   }
    
  //   setLoadingMore(true);
    
  //   // Имитация загрузки для плавности (если нужно)
  //   await new Promise(resolve => setTimeout(resolve, 500));
    
  //   setShowAll(true);
  //   setLoadingMore(false);
  // };


  const handleShowAll = () => {
    router.push('/kyiv-apartments');
  };

  const isUserApartment = (apartment) => currentUser && apartment.user_id === currentUser._id;

  const handleMenuOpen = (event, apartment) => {
    event.stopPropagation();
    if (showActions && isUserApartment(apartment)) {
      setAnchorEl(event.currentTarget);
      setSelectedApartment(apartment);
    }
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedApartment(null);
  };

  const handleEdit = () => {
    if (selectedApartment) {
      router.push(`/add-apartment?edit=${selectedApartment._id}`);
      handleMenuClose();
    }
  };
  
  const handleDelete = async () => {
    if (!selectedApartment) return;
    if (!window.confirm(t.deleteConfirm)) {
      handleMenuClose();
      return;
    }
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/${selectedApartment._id}`);
      setAllApartments(allApartments.filter((apt) => apt._id !== selectedApartment._id));
      showSnackbar(t.deleteSuccess, 'success');
    } catch (error) {
      console.error(error);
      showSnackbar(t.deleteError, 'error');
    } finally {
      handleMenuClose();
    }
  };

  const handleToggleFavorite = async (id) => {
    const userProfile = localStorage.getItem('user_profile');
    if (!userProfile) {
      setIsCreateUserOpen(true);
      return;
    }
    try {
      const newStatus = await toggleFavorite(id);
      showSnackbar(newStatus ? t.favoriteAdded : t.favoriteRemoved, 'success');
      if (!newStatus && onFavoriteRemoved) onFavoriteRemoved(id);
    } catch (error) {
      if (error.message === 'USER_NOT_LOGGED_IN') {
        setIsCreateUserOpen(true);
      } else {
        showSnackbar(t.favoriteError, 'error');
      }
    }
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const showCreateUserDialog = () => {
    setIsCreateUserOpen(true);
  };

  const onCloseDialog = () => {
    setIsCreateUserOpen(false);
  };

  // Показываем анимацию загрузки
  if (loading && allApartments.length === 0) {
    return <LoadingAnimation />;
  }

  // Показываем анимацию пустого состояния
  if (!loading && allApartments.length === 0) {
    return (
      <EmptyStateAnimation 
        message={t.noApartments}
        description={t.noApartmentsDescription}
      />
    );
  }

  return (
    <Box>
      {showActions && (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleEdit}>
            <Edit sx={{ mr: 1 }} /> {t.edit}
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Delete sx={{ mr: 1 }} /> {t.delete}
          </MenuItem>
        </Menu>
      )}

      {/* Информация о количестве найденных объявлений */}
      <Container sx={{ mt: 1, mb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* <Typography variant="body2" color="text.secondary">
            {t.foundApartments} {allApartments.length}
          </Typography> */}
          {/* {!showAll && allApartments.length > INITIAL_DISPLAY_COUNT && (
            <Typography variant="caption" color="primary" sx={{ animation: 'pulse 2s infinite' }}>
              Показано {INITIAL_DISPLAY_COUNT} из {allApartments.length}
            </Typography>
          )} */}
        </Box>
      </Container>

      <ApartmentList
        apartments={displayedApartments.map((apartment) => ({
          ...apartment,
          actions:
            showActions && isUserApartment(apartment) ? (
              <IconButton
                onClick={(e) => handleMenuOpen(e, apartment)}
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: 'rgba(255,255,255,1)' } }}
              >
                <MoreVert />
              </IconButton>
            ) : null,
        }))}
        isFavorite={isFavorite}
        toggleFavorite={handleToggleFavorite}
        showTitle={!favoriteIds}
        isFavoritesPage={!!favoriteIds}
        isUserListings={!!userId}
        isCreateUserOpen={isCreateUserOpen}
        onCloseDialog={onCloseDialog}
        showCreateUserDialog={showCreateUserDialog}
        currentUserId={currentUser?._id}
      />

      {/* Кнопка "Показать все" */}
      {!showAll && allApartments.length > INITIAL_DISPLAY_COUNT && (
        <Box sx={{ position: 'relative' }}>
          {loadingMore ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <ShowAllButton 
              onClick={handleShowAll}
              count={allApartments.length - INITIAL_DISPLAY_COUNT}
              translations={t}
            />
          )}
        </Box>
      )}

      {/* Кнопка для обновления/перемешивания (опционально) */}
      {/* {showAll && allApartments.length > 0 && (
        <Fade in={true}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 4 }}>
            
          </Box>
        </Fade>
      )} */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Компонент анимации загрузки (оставляем твой существующий)
const LoadingAnimation = () => {
  const { currentLanguage } = useLanguage();
  const t = APARTMENTS_TRANSLATIONS[currentLanguage] || APARTMENTS_TRANSLATIONS.ua;
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 80,
          height: 80,
          mb: 3,
        }}
      >
        <CircularProgress
          size={80}
          thickness={2}
          sx={{
            color: 'primary.main',
            animation: 'rotate 2s linear infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Home 
            sx={{ 
              fontSize: 30, 
              color: 'primary.main',
              animation: 'bounce 1s infinite alternate',
              '@keyframes bounce': {
                '0%': { transform: 'translateY(0px)' },
                '100%': { transform: 'translateY(-5px)' },
              }
            }} 
          />
        </Box>
      </Box>
      
      <Fade in={true} timeout={1000}>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          {t.loadingApartments}
        </Typography>
      </Fade>
    </Box>
  );
};

// Компонент пустого состояния (оставляем твой существующий)
const EmptyStateAnimation = ({ message, description }) => {
  return (
    <Fade in={true} timeout={800}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          p: 3,
        }}
      >
        <Zoom in={true} style={{ transitionDelay: '300ms' }}>
          <Box
            sx={{
              position: 'relative',
              width: 120,
              height: 120,
              mb: 3,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: 'primary.light',
                opacity: 0.2,
                animation: 'pulse 2s infinite ease-in-out',
                '@keyframes pulse': {
                  '0%': {
                    transform: 'scale(1)',
                    opacity: 0.2,
                  },
                  '50%': {
                    transform: 'scale(1.1)',
                    opacity: 0.3,
                  },
                  '100%': {
                    transform: 'scale(1)',
                    opacity: 0.2,
                  },
                },
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                opacity: 0.1,
                animation: 'pulse 2s infinite ease-in-out',
                animationDelay: '0.5s',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                color: 'white',
              }}
            >
              <Home sx={{ fontSize: 30 }} />
            </Box>
          </Box>
        </Zoom>

        <Fade in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: 2,
              color: 'text.secondary',
              fontWeight: 600,
            }}
          >
            {message}
          </Typography>
        </Fade>

        <Fade in={true} timeout={1000} style={{ transitionDelay: '800ms' }}>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: 400,
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>
        </Fade>

        <Fade in={true} timeout={1000} style={{ transitionDelay: '1000ms' }}>
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              alignItems: 'center',
              color: 'primary.main',
            }}
          >
            <Search sx={{ mr: 1 }} />
            <Typography variant="body2">
              {message === 'Немає жодного апартамента' 
                ? 'Спробуйте інші критерії пошуку' 
                : 'Попробуйте другие критерии поиска'}
            </Typography>
          </Box>
        </Fade>
      </Box>
    </Fade>
  );
};

const Apartments = (props) => {
  return (
    <ApartmentsContent {...props} />
  );
};

export default Apartments;