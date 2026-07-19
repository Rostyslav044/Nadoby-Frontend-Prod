


// "use client";

// import React, { useState, useRef, useEffect, useCallback, memo, lazy, Suspense } from "react";
// import dynamic from 'next/dynamic';
// import Link from 'next/link';
// import { useLanguage } from "@/app/LanguageContext";
// import { useRouter } from "next/navigation";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Collapse,
//   MenuItem,
//   Typography,
//   Box,
//   Divider,
//   Paper,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogContent,
//   CircularProgress,
//   TextField,
//   InputAdornment,
//   Badge,
//   DialogTitle,
//   DialogActions,
//   Button,
//   Card,
//   CardContent,
//   useMediaQuery,
//   useTheme
// } from "@mui/material";
// import { Close, ArrowDropDown, Favorite, Calculate, ContentCopy, Email, Mail } from "@mui/icons-material";
// import { logout } from "../store/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

// // Динамические импорты для тяжелых компонентов с предзагрузкой
// const Logo = dynamic(() => import("./Logo"), {
//   loading: () => <div>Загрузка лого...</div>
// });

// const translations = {
//   ua: {
//     sloganLine1: "Оренда житла по всій Україні",
//     sloganLine2: "Без посередників !",
//     profile: "Мій Профіль",
//     myListings: "Мої оголошення",
//     rentOut: "Розмістити оголошення",
//     searchHome: "Пошук житла",
//     language: "Мова",
//     currency: "Валюта",
//     favorites: "Обране",
//     logout: "Вийти",
//     rentalTerms: "Умови оренди",
//     contactSupport: "Зв'язатися з підтримкою",
//     blog: "Блог",
//     loadingRates: "Завантаження курсів...",
//     currencyError: "Не вдалося завантажити курси валют",
//     converter: "Конвертер валют",
//     enterAmount: "Введіть суму",
//     uah: "грн",
//     currentRates: "Поточний курс НБУ",
//     copyEmail: "Скопіювати email",
//     emailCopied: "Email скопійовано в буфер обміну",
//     contactInstructions: "Оберіть спосіб зв'язку з підтримкою",
//     supportEmail: "nadoby.rent@gmail.com",
//     writeGmail: "Написати через Gmail",
//     writeEmailClient: "Написати через поштовий клієнт",
//     cancel: "Скасувати",
//   },
//   ru: {
//     sloganLine1: "Аренда жилья по всей Украине",
//     sloganLine2: "Без посредников !",
//     profile: "Мой Профиль",
//     myListings: "Мои объявления",
//     rentOut: "Разместить объявление",
//     searchHome: "Поиск жилья",
//     language: "Язык",
//     currency: "Валюта",
//     favorites: "Избранное",
//     logout: "Выйти",
//     rentalTerms: "Условия аренды",
//     contactSupport: "Связаться с поддержкой",
//     blog: "Блог",
//     loadingRates: "Загрузка курсов...",
//     currencyError: "Не удалось загрузить курсы валют",
//     converter: "Конвертер валют",
//     enterAmount: "Введите сумму",
//     uah: "грн",
//     currentRates: "Текущий курс НБУ",
//     copyEmail: "Скопировать email",
//     emailCopied: "Email скопирован в буфер обмена",
//     contactInstructions: "Выберите способ связи с поддержкой",
//     supportEmail: "nadoby.rent@gmail.com",
//     writeGmail: "Написать через Gmail",
//     writeEmailClient: "Написать через почтовый клиент",
//     cancel: "Отмена",
//   }
// };

// // Предзагрузка страниц для быстрых переходов
// const preloadPages = () => {
//   if (typeof window !== 'undefined') {
//     const pages = [
//       '/my-profile',
//       '/my-listings', 
//       '/add-apartment',
//       '/',
//       '/favorites',
//       '/rental-terms',
//       '/blog'
//     ];
    
//     pages.forEach(page => {
//       const link = document.createElement('link');
//       link.rel = 'prefetch';
//       link.href = page;
//       link.as = 'document';
//       document.head.appendChild(link);
//     });
//   }
// };

// // Компонент для быстрых ссылок с предзагрузкой
// const FastLink = memo(({ href, children, onMouseEnter, onClick, ...props }) => {
//   const router = useRouter();
  
//   const handleMouseEnter = useCallback(() => {
//     if (href && href.startsWith('/')) {
//       router.prefetch(href);
//     }
//     onMouseEnter?.();
//   }, [href, router, onMouseEnter]);

//   const handleClick = useCallback((e) => {
//     e.preventDefault();
//     if (href) {
//       router.push(href);
//     }
//     onClick?.(e);
//   }, [href, router, onClick]);

//   return (
//     <a 
//       href={href}
//       onMouseEnter={handleMouseEnter}
//       onClick={handleClick}
//       style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
//       {...props}
//     >
//       {children}
//     </a>
//   );
// });

// FastLink.displayName = "FastLink";

// // Мемоизированные компоненты для оптимизации
// const MemoizedListItem = memo(ListItem);
// MemoizedListItem.displayName = "MemoizedListItem";

// const MemoizedTypography = memo(Typography);
// MemoizedTypography.displayName = "MemoizedTypography";

// const MemoizedButton = memo(Button);
// MemoizedButton.displayName = "MemoizedButton";

// const UserMenu = () => {
//   const menuRef = useRef(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(true);
//   const [openLanguage, setOpenLanguage] = useState(false);
//   const [openCurrency, setOpenCurrency] = useState(false);
//   const [showEmailDialog, setShowEmailDialog] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
  
//   // Состояния для функционала валют
//   const [exchangeRates, setExchangeRates] = useState(null);
//   const [loadingRates, setLoadingRates] = useState(false);
//   const [currencyError, setCurrencyError] = useState(null);
//   const [converterAmount, setConverterAmount] = useState("");
//   const [converterResult, setConverterResult] = useState({ USD: 0, EUR: 0 });
  
//   // Состояния для данных пользователя
//   const [myListingsCount, setMyListingsCount] = useState(0);
//   const [favoritesCount, setFavoritesCount] = useState(0);

//   const { currentLanguage, onLanguageToggle } = useLanguage();
//   const t = translations[currentLanguage];
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const profile = useSelector(state => state.auth.profile);

//   // Предзагрузка страниц при открытии меню
//   useEffect(() => {
//     if (isMenuOpen) {
//       preloadPages();
      
//       const pagesToPrefetch = [
//         '/my-profile',
//         '/my-listings',
//         '/add-apartment',
//         '/',
//         '/favorites',
//         '/rental-terms',
//         '/blog'
//       ];
      
//       pagesToPrefetch.forEach(page => {
//         router.prefetch(page);
//       });
//     }
//   }, [isMenuOpen, router]);

//   // Функция для получения курсов валют
//   const fetchExchangeRates = useCallback(async () => {
//     setLoadingRates(true);
//     setCurrencyError(null);
    
//     try {
//       const response = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
//       const usdRate = response.data.find(currency => currency.cc === 'USD');
//       const eurRate = response.data.find(currency => currency.cc === 'EUR');
      
//       setExchangeRates({
//         USD: usdRate ? usdRate.rate.toFixed(2) : 'Н/Д',
//         EUR: eurRate ? eurRate.rate.toFixed(2) : 'Н/Д',
//       });
//     } catch (error) {
//       console.error('Ошибка при получении курсов валют:', error);
//       setCurrencyError(t.currencyError);
//     } finally {
//       setLoadingRates(false);
//     }
//   }, [t.currencyError]);

//   // Функция для конвертации валют
//   const convertCurrency = useCallback((amount) => {
//     if (!exchangeRates || isNaN(amount) || amount <= 0) {
//       setConverterResult({ USD: 0, EUR: 0 });
//       return;
//     }
    
//     const numericAmount = parseFloat(amount);
//     const usdRate = parseFloat(exchangeRates.USD);
//     const eurRate = parseFloat(exchangeRates.EUR);
    
//     if (isNaN(usdRate) || isNaN(eurRate)) {
//       setConverterResult({ USD: 0, EUR: 0 });
//       return;
//     }
    
//     setConverterResult({
//       USD: (numericAmount / usdRate).toFixed(2),
//       EUR: (numericAmount / eurRate).toFixed(2)
//     });
//   }, [exchangeRates]);

//   // Функция для связи с поддержкой
//   const handleContactSupport = useCallback(() => {
//     setShowEmailDialog(true);
//   }, []);

//   // Функция для открытия Gmail с предзаполненным письмом
//   const openGmail = useCallback(() => {
//     let userInfo = "Неавторизованный пользователь";
    
//     if (profile) {
//       userInfo = `Пользователь: ${profile.name || 'Имя не указано'}\n` +
//                  `Email: ${profile.email || 'Email не указан'}\n` +
//                  `ID: ${profile._id || 'ID не указан'}\n` +
//                  `Телефон: ${profile.phone || 'Телефон не указан'}`;
//     }

//     const subject = `Поддержка NaDoby.com.ua - ${profile ? profile.name || 'Пользователь' : 'Гость'}`;
//     const body = `Здравствуйте!\n\nМне нужна помощь по поводу:\n\n\n---\nИнформация о пользователе:\n${userInfo}\n---\n\nСообщение отправлено с сайта NaDoby.com.ua.`;

//     const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${t.supportEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
//     window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    
//     setShowEmailDialog(false);
//     setIsMenuOpen(false);
//   }, [profile, t.supportEmail]);

//   // Функция для открытия почтового клиента по умолчанию
//   const openDefaultEmailClient = useCallback(() => {
//     let userInfo = "Неавторизованный пользователь";
    
//     if (profile) {
//       userInfo = `Пользователь: ${profile.name || 'Имя не указано'}\n` +
//                  `Email: ${profile.email || 'Email не указан'}\n` +
//                  `ID: ${profile._id || 'ID не указан'}\n` +
//                  `Телефон: ${profile.phone || 'Телефон не указан'}`;
//     }

//     const subject = `Поддержка NaDoby.com.ua - ${profile ? profile.name || 'Пользователь' : 'Гость'}`;
//     const body = `Здравствуйте!\n\nМне нужна помощь по поводу:\n\n\n---\nИнформация о пользователе:\n${userInfo}\n---\n\nСообщение отправлено с сайта NaDoby.com.ua.`;

//     const mailtoUrl = `mailto:${t.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
//     window.location.href = mailtoUrl;
    
//     setShowEmailDialog(false);
//     setIsMenuOpen(false);
//   }, [profile, t.supportEmail]);

//   // Функция для копирования email в буфер обмена
//   const copyEmailToClipboard = useCallback(() => {
//     navigator.clipboard.writeText(t.supportEmail)
//       .then(() => {
//         setSnackbarOpen(true);
//         setShowEmailDialog(false);
//         setIsMenuOpen(false);
//       })
//       .catch(err => {
//         console.error('Ошибка при копировании:', err);
//         const textArea = document.createElement('textarea');
//         textArea.value = t.supportEmail;
//         document.body.appendChild(textArea);
//         textArea.select();
//         document.execCommand('copy');
//         document.body.removeChild(textArea);
//         setSnackbarOpen(true);
//         setShowEmailDialog(false);
//         setIsMenuOpen(false);
//       });
//   }, [t.supportEmail]);

//   // Загружаем курсы валют при открытии меню валют
//   useEffect(() => {
//     if (openCurrency) {
//       fetchExchangeRates();
//     }
//   }, [openCurrency, fetchExchangeRates]);

//   // Обновляем результаты конвертации при изменении суммы
//   useEffect(() => {
//     convertCurrency(converterAmount);
//   }, [converterAmount, convertCurrency]);

//   // Функция для загрузки данных пользователя
//   const fetchUserData = useCallback(async () => {
//     try {
//       if (profile?._id) {
//         // Загрузка количества объявлений
//         const listingsResponse = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/user-apartment-count/${profile._id}`
//         );
//         setMyListingsCount(listingsResponse.data.count);
//       }

//       // Загрузка количества избранных
//       const userProfile = localStorage.getItem('user_profile');
//       if (userProfile) {
//         const profileData = JSON.parse(userProfile);
        
//         const favoritesResponse = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/favorites/count`,
//           { headers: { 'user-id': profileData._id } }
//         );
        
//         if (favoritesResponse.data.success) {
//           setFavoritesCount(favoritesResponse.data.count);
//         }
//       }
//     } catch (error) {
//       console.error('Помилка при завантаженні даних:', error);
//     }
//   }, [profile]);

//   useEffect(() => {
//     fetchUserData();
//   }, [fetchUserData]);

//   // Функция для выхода
//   const handleLogout = useCallback(() => {
//     dispatch(logout());
//     setIsMenuOpen(false);
//   }, [dispatch]);

//   const closeMenu = useCallback(() => {
//     setIsMenuOpen(false);
//     setOpenLanguage(false);
//     setOpenCurrency(false);
//   }, []);

//   const handleLanguageToggle = useCallback((language) => {
//     onLanguageToggle(language);
//     setOpenLanguage(false);
//   }, [onLanguageToggle]);

//   const handleClickOutside = useCallback((e) => {
//     if (menuRef.current && !menuRef.current.contains(e.target)) {
//       closeMenu();
//       setShowEmailDialog(false);
//     }
//   }, [closeMenu]);

//   useEffect(() => {
//     if (isMenuOpen || showEmailDialog) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isMenuOpen, showEmailDialog, handleClickOutside]);

//   const handleCloseSnackbar = useCallback(() => {
//     setSnackbarOpen(false);
//   }, []);

//   const handleCloseEmailDialog = useCallback(() => {
//     setShowEmailDialog(false);
//   }, []);

//   const handleConverterAmountChange = useCallback((e) => {
//     setConverterAmount(e.target.value);
//   }, []);

//   const handleLanguageMenuToggle = useCallback(() => {
//     setOpenLanguage(prev => !prev);
//   }, []);

//   const handleCurrencyMenuToggle = useCallback(() => {
//     setOpenCurrency(prev => !prev);
//   }, []);

//   // Функция для быстрого перехода с предзагрузкой
//   const handleFastNavigation = useCallback((path) => {
//     router.prefetch(path);
//     router.push(path);
//     setIsMenuOpen(false);
//   }, [router]);

//   if (!isMenuOpen) return null;

//   // Мемоизированные списки для оптимизации рендеринга
//   const mainMenuItems = [
//     { text: t.profile, href: "/my-profile", onClick: () => handleFastNavigation("/my-profile") },
//     { text: `${t.myListings} (${myListingsCount})`, href: "/my-listings", onClick: () => handleFastNavigation("/my-listings") },
//     { text: t.rentOut, href: "/add-apartment", onClick: () => handleFastNavigation("/add-apartment") },
//     { text: t.searchHome, href: "/", onClick: () => handleFastNavigation("/") },
//   ];

//   const footerMenuItems = [
//     { text: t.rentalTerms, href: "/rental-terms", onClick: () => handleFastNavigation("/rental-terms") },
//     { text: t.blog, href: "/blog", onClick: () => handleFastNavigation("/blog") },
//   ];

//   return (
//     <>
//       {isMenuOpen && (
//         <Box
//           sx={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100vw',
//             height: '100vh',
//             zIndex: 1300,
//             display: 'flex'
//           }}
//         >
//           {/* Меню слева - сайдбар */}
//           <Paper
//             ref={menuRef}
//             sx={{
//               width: isMobile ? "85%" : 300,
//               maxWidth: 400,
//               height: '100vh',
//               bgcolor: '#ffffff',
//               borderRadius: 0,
//               boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
//               overflow: 'hidden',
//               display: 'flex',
//               flexDirection: 'column',
//               position: 'relative',
//               animation: 'slideInLeft 0.3s ease-out',
//               '@keyframes slideInLeft': {
//                 '0%': { transform: 'translateX(-100%)' },
//                 '100%': { transform: 'translateX(0)' }
//               }
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Хедер с логотипом и кнопкой закрытия */}
//             <Box sx={{ 
//               p: 3, 
//               borderBottom: '1px solid #f0f0f0',
//               bgcolor: '#ffffff',
//               flexShrink: 0
//             }}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Suspense fallback={<div>Загрузка лого...</div>}>
//                   <Logo /> 
//                 </Suspense>
//                 <IconButton 
//                   onClick={closeMenu}
//                   sx={{ 
//                     color: '#718096',
//                     '&:hover': {
//                       backgroundColor: 'rgba(0,0,0,0.05)'
//                     }
//                   }}
//                 >
//                   <Close />
//                 </IconButton>
//               </Box>

//               <Box sx={{ mt: 1 }}>
//                 <MemoizedTypography sx={{
//                   color: '#1a365d',
//                   fontSize: isMobile ? '0.9rem' : '0.98rem',
//                   fontWeight: 600,
//                 }}>
//                   {t.sloganLine1}
//                 </MemoizedTypography>
//                 <MemoizedTypography sx={{
//                   color: '#e53e3e',
//                   fontSize: isMobile ? '0.85rem' : '0.90rem',
//                   fontWeight: 600,
//                   lineHeight: 1.3,
//                   mt: 0.5,
//                   fontStyle: 'italic'
//                 }}>
//                   {t.sloganLine2}
//                 </MemoizedTypography>
//               </Box>
//             </Box>

//             {/* Основное меню с прокруткой */}
//             <Box sx={{ 
//               flex: 1, 
//               overflow: 'auto',
//               py: 1
//             }}>
//               <List sx={{ py: 0, pb: 2 }}>
//                 {mainMenuItems.map((item) => (
//                   <MemoizedListItem 
//                     key={item.text}
//                     component={FastLink}
//                     href={item.href}
//                     onClick={item.onClick}
//                     sx={{ 
//                       px: 3, 
//                       py: 1.5,
//                       color:'#0000FF',
//                       cursor: 'pointer',
//                       textDecoration: 'none',
//                       '&:hover': {
//                         backgroundColor: '#f5f5f5'
//                       }
//                     }}
//                   >
//                     <ListItemText 
//                       primary={item.text}
//                       primaryTypographyProps={{ 
//                         fontWeight: 500,
//                         fontSize: isMobile ? '0.95rem' : '1rem',
//                         color: '#0000FF'
//                       }}
//                     />
//                   </MemoizedListItem>
//                 ))}

//                 {/* Избранное */}
//                 <MemoizedListItem 
//                   component={FastLink}
//                   href="/favorites"
//                   onClick={() => handleFastNavigation("/favorites")}
//                   sx={{ 
//                     px: 3, 
//                     py: 1.5,
//                     color:'#0000FF',
//                     cursor: 'pointer',
//                     textDecoration: 'none',
//                     '&:hover': {
//                       backgroundColor: '#f5f5f5'
//                     }
//                   }}
//                 >
//                   <ListItemText 
//                     primary={
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Favorite sx={{ mr: 1, fontSize: isMobile ? '18px' : '20px' }} />
//                         {`${t.favorites} (${favoritesCount})`}
//                       </Box>
//                     }
//                     primaryTypographyProps={{ 
//                       fontWeight: 500,
//                       fontSize: isMobile ? '0.95rem' : '1rem',
//                       color: '#0000FF'
//                     }}
//                   />
//                 </MemoizedListItem>

//                 <Divider sx={{ my: 1 }} />

//                 {/* Язык */}
//                 <MemoizedListItem 
//                   component="div"
//                   onClick={handleLanguageMenuToggle}
//                   sx={{ 
//                     px: 3, 
//                     py: 1.5,
//                     color: '#0000FF',
//                     cursor: 'pointer',
//                     '&:hover': {
//                       backgroundColor: '#f5f5f5'
//                     }
//                   }}
//                 >
//                   <ListItemText 
//                     primary={t.language}
//                     primaryTypographyProps={{ 
//                       fontWeight: 500,
//                       fontSize: isMobile ? '0.95rem' : '1rem'
//                     }}
//                   />
//                   <ArrowDropDown sx={{ color: '#0000FF' }} />
//                 </MemoizedListItem>

//                 <Collapse in={openLanguage}>
//                   <Box sx={{ bgcolor: '#f8f9fa' }}>
//                     <MenuItem 
//                       onClick={() => handleLanguageToggle('ua')}
//                       sx={{ 
//                         px: 4, 
//                         py: 1.5, 
//                         color: '#0000FF',
//                         cursor: 'pointer',
//                         fontSize: isMobile ? '0.95rem' : '1rem'
//                       }}
//                     >
//                       UA
//                     </MenuItem>
//                     <MenuItem 
//                       onClick={() => handleLanguageToggle('ru')}
//                       sx={{ 
//                         px: 4, 
//                         py: 1.5, 
//                         color: '#0000FF',
//                         cursor: 'pointer',
//                         fontSize: isMobile ? '0.95rem' : '1rem'
//                       }}
//                     >
//                       RU
//                     </MenuItem>
//                   </Box>
//                 </Collapse>

//                 {/* Валюта */}
//                 <MemoizedListItem 
//                   component="div"
//                   onClick={handleCurrencyMenuToggle}
//                   sx={{ 
//                     px: 3, 
//                     py: 1.5,
//                     color: '#0000FF',
//                     cursor: 'pointer',
//                     '&:hover': {
//                       backgroundColor: '#f5f5f5'
//                     }
//                   }}
//                 >
//                   <ListItemText 
//                     primary={t.currency}
//                     primaryTypographyProps={{ 
//                       fontWeight: 500,
//                       fontSize: isMobile ? '0.95rem' : '1rem'
//                     }}
//                   />
//                   <ArrowDropDown sx={{ color: '#0000FF' }} />
//                 </MemoizedListItem>

//                 <Collapse in={openCurrency}>
//                   <Box sx={{ bgcolor: '#f8f9fa', px: isMobile ? 1 : 0 }}>
//                     {loadingRates ? (
//                       <MenuItem sx={{ 
//                         px: 4, 
//                         color: "#0000FF", 
//                         display: 'flex', 
//                         justifyContent: 'center',
//                         fontSize: isMobile ? '0.9rem' : '1rem'
//                       }}>
//                         <CircularProgress size={20} sx={{ mr: 1 }} />
//                         {t.loadingRates}
//                       </MenuItem>
//                     ) : currencyError ? (
//                       <MenuItem sx={{ 
//                         px: 4, 
//                         color: "#0000FF",
//                         fontSize: isMobile ? '0.9rem' : '1rem'
//                       }}>
//                         {currencyError}
//                       </MenuItem>
//                     ) : exchangeRates ? (
//                       <>
//                         <MenuItem sx={{ 
//                           px: 4, 
//                           color: "#0000FF", 
//                           fontWeight: 'bold',
//                           fontSize: isMobile ? '0.95rem' : '1rem'
//                         }}>
//                           {t.currentRates}
//                         </MenuItem>
//                         <MenuItem sx={{ 
//                           px: 4, 
//                           color: "#0000FF",
//                           fontSize: isMobile ? '0.9rem' : '1rem'
//                         }}>
//                           USD: {exchangeRates.USD} UAH
//                         </MenuItem>
//                         <MenuItem sx={{ 
//                           px: 4, 
//                           color: "#0000FF",
//                           fontSize: isMobile ? '0.9rem' : '1rem'
//                         }}>
//                           EUR: {exchangeRates.EUR} UAH
//                         </MenuItem>
                        
//                         <Divider sx={{ my: 1 }} />
                        
//                         <MenuItem sx={{ 
//                           px: 4, 
//                           color: "#0000FF", 
//                           fontWeight: 'bold',
//                           fontSize: isMobile ? '0.95rem' : '1rem'
//                         }}>
//                           <Calculate sx={{ mr: 1, fontSize: isMobile ? '1rem' : '1.2rem' }} />
//                           {t.converter}
//                         </MenuItem>
                        
//                         <Box sx={{ px: 4, py: 1 }}>
//                           <TextField
//                             type="number"
//                             value={converterAmount}
//                             onChange={handleConverterAmountChange}
//                             label={t.enterAmount}
//                             variant="outlined"
//                             size="small"
//                             fullWidth
//                             InputProps={{
//                               endAdornment: <InputAdornment position="end">{t.uah}</InputAdornment>,
//                               sx: { fontSize: isMobile ? '0.9rem' : '1rem' }
//                             }}
//                             sx={{
//                               '& .MuiInputLabel-root': {
//                                 fontSize: isMobile ? '0.9rem' : '1rem'
//                               }
//                             }}
//                           />
                          
//                           {converterAmount && parseFloat(converterAmount) > 0 && (
//                             <Box sx={{ mt: 2 }}>
//                               <MemoizedTypography variant="body2" sx={{ 
//                                 color: "#0000FF",
//                                 fontSize: isMobile ? '0.9rem' : '1rem'
//                               }}>
//                                 USD: {converterResult.USD}
//                               </MemoizedTypography>
//                               <MemoizedTypography variant="body2" sx={{ 
//                                 color: "#0000FF",
//                                 fontSize: isMobile ? '0.9rem' : '1rem'
//                               }}>
//                                 EUR: {converterResult.EUR}
//                               </MemoizedTypography>
//                             </Box>
//                           )}
//                         </Box>
//                       </>
//                     ) : null}
//                   </Box>
//                 </Collapse>

//                 <Divider sx={{ my: 1 }} />

//                 {/* Футер меню */}
//                 {footerMenuItems.map((item) => (
//                   <MemoizedListItem
//                     key={item.text}
//                     component={FastLink}
//                     href={item.href}
//                     onClick={item.onClick}
//                     sx={{ 
//                       px: 3, 
//                       py: 1.5,
//                       color: '#0000FF',
//                       cursor: 'pointer',
//                       textDecoration: 'none',
//                       '&:hover': {
//                         backgroundColor: '#f5f5f5'
//                       }
//                     }}
//                   >
//                     <ListItemText 
//                       primary={item.text}
//                       primaryTypographyProps={{ 
//                         fontWeight: 500,
//                         fontSize: isMobile ? '0.95rem' : '1rem',
//                         color: '#0000FF'
//                       }}
//                     />
//                   </MemoizedListItem>
//                 ))}

//                 {/* Контакт с поддержкой */}
//                 <MemoizedListItem
//                   onClick={handleContactSupport}
//                   component="div"
//                   sx={{ 
//                     px: 3, 
//                     py: 1.5,
//                     color: '#0000FF',
//                     cursor: 'pointer',
//                     textDecoration: 'none',
//                     '&:hover': {
//                       backgroundColor: '#f5f5f5'
//                     }
//                   }}
//                 >
//                   <ListItemText 
//                     primary={t.contactSupport}
//                     primaryTypographyProps={{ 
//                       fontWeight: 500,
//                       fontSize: isMobile ? '0.95rem' : '1rem'
//                     }}
//                   />
//                 </MemoizedListItem>

//                 {/* Выход */}
//                 <MemoizedListItem
//                   onClick={handleLogout}
//                   component="div"
//                   sx={{ 
//                     px: 3, 
//                     py: 1.5,
//                     color: 'error.main',
//                     cursor: 'pointer',
//                     textDecoration: 'none',
//                     '&:hover': {
//                       backgroundColor: 'rgba(211, 47, 47, 0.08)'
//                     }
//                   }}
//                 >
//                   <ListItemText 
//                     primary={t.logout}
//                     primaryTypographyProps={{ 
//                       fontWeight: 500,
//                       fontSize: isMobile ? '0.95rem' : '1rem'
//                     }}
//                   />
//                 </MemoizedListItem>
//               </List>
//             </Box>
//           </Paper>
          
//           {/* Затемненная часть справа - фон */}
//           <Box
//             sx={{
//               flex: 1,
//               bgcolor: 'rgba(0,0,0,0.5)',
//               backdropFilter: 'blur(3px)',
//               cursor: 'pointer',
//               transition: 'opacity 0.3s ease'
//             }}
//             onClick={closeMenu}
//           />
//         </Box>
//       )}

//       {/* Email Support Dialog */}
//       <Dialog
//         open={showEmailDialog}
//         onClose={handleCloseEmailDialog}
//         maxWidth="sm"
//         fullWidth
//         fullScreen={isMobile}
//         PaperProps={{
//           sx: {
//             borderRadius: isMobile ? 0 : 2,
//             boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
//             m: isMobile ? 0 : 2,
//             height: isMobile ? '100%' : 'auto',
//             maxHeight: isMobile ? '100%' : '90vh',
//             display: 'flex',
//             flexDirection: 'column',
//           }
//         }}
//       >
//         <Box sx={{ 
//           display: 'flex', 
//           flexDirection: 'column',
//           height: '100%',
//           overflow: 'hidden'
//         }}>
//           <DialogTitle 
//             sx={{ 
//               color: "#1a365d", 
//               display: 'flex', 
//               alignItems: 'center',
//               fontSize: isMobile ? '1.1rem' : '1.25rem',
//               fontWeight: 600,
//               pb: 1,
//               flexShrink: 0
//             }}
//           >
//             <Mail sx={{ mr: 2, color: "#0000FF" }} />
//             {t.contactSupport}
//           </DialogTitle>
          
//           <DialogContent sx={{ 
//             pb: 2, 
//             flex: 1,
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             overflow: 'auto'
//           }}>
//             <Box sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: '100%',
//               gap: 3
//             }}>
//               <MemoizedTypography 
//                 variant="body1" 
//                 sx={{ 
//                   color: '#718096',
//                   textAlign: 'center',
//                   fontSize: isMobile ? '0.9rem' : '1rem',
//                   px: isMobile ? 1 : 0
//                 }}
//               >
//                 {t.contactInstructions}
//               </MemoizedTypography>
              
//               <Card 
//                 variant="outlined"
//                 sx={{
//                   border: '2px solid #e2e8f0',
//                   borderRadius: 2,
//                   backgroundColor: '#f7fafc',
//                   width: '100%',
//                   maxWidth: 400
//                 }}
//               >
//                 <CardContent sx={{ p: isMobile ? 2 : 3, '&:last-child': { pb: isMobile ? 2 : 3 } }}>
//                   <Box sx={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between', 
//                     alignItems: 'center'
//                   }}>
//                     <Box sx={{ flex: 1 }}>
//                       <MemoizedTypography 
//                         variant="h6" 
//                         sx={{ 
//                           color: "#1a365d",
//                           fontWeight: 600,
//                           fontSize: isMobile ? '1rem' : '1.1rem',
//                           wordBreak: 'break-all'
//                         }}
//                       >
//                         {t.supportEmail}
//                       </MemoizedTypography>
//                     </Box>
//                     <IconButton 
//                       onClick={copyEmailToClipboard}
//                       sx={{ 
//                         color: "#0000FF",
//                         backgroundColor: 'rgba(0, 0, 255, 0.1)',
//                         ml: 1,
//                         '&:hover': {
//                           backgroundColor: 'rgba(0, 0, 255, 0.2)',
//                         }
//                       }}
//                     >
//                       <ContentCopy />
//                     </IconButton>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Box>
//           </DialogContent>
          
//           <DialogActions sx={{ 
//             p: isMobile ? 2 : 3, 
//             pt: 0, 
//             gap: isMobile ? 1.5 : 2, 
//             flexDirection: 'column',
//             flexShrink: 0
//           }}>
//             <MemoizedButton 
//               onClick={openGmail}
//               variant="contained"
//               sx={{ 
//                 bgcolor: "#0000FF",
//                 "&:hover": { 
//                   bgcolor: "#0000CC",
//                   boxShadow: '0 4px 12px rgba(0, 0, 255, 0.3)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//               startIcon={<Email />}
//             >
//               {t.writeGmail}
//             </MemoizedButton>
            
//             <MemoizedButton 
//               onClick={openDefaultEmailClient}
//               variant="outlined"
//               sx={{ 
//                 color: "#0000FF", 
//                 borderColor: "#0000FF",
//                 "&:hover": { 
//                   borderColor: "#0000CC",
//                   backgroundColor: 'rgba(0, 0, 255, 0.04)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//               startIcon={<Mail />}
//             >
//               {t.writeEmailClient}
//             </MemoizedButton>
            
//             <MemoizedButton 
//               onClick={copyEmailToClipboard}
//               variant="outlined"
//               sx={{ 
//                 color: "#0000FF", 
//                 borderColor: "#0000FF",
//                 "&:hover": { 
//                   borderColor: "#0000CC",
//                   backgroundColor: 'rgba(0, 0, 255, 0.04)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//               startIcon={<ContentCopy />}
//             >
//               {t.copyEmail}
//             </MemoizedButton>
            
//             <MemoizedButton 
//               onClick={handleCloseEmailDialog}
//               variant="outlined"
//               sx={{ 
//                 color: "error.main", 
//                 borderColor: "error.main",
//                 "&:hover": { 
//                   borderColor: "error.dark",
//                   backgroundColor: 'rgba(211, 47, 47, 0.04)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//             >
//               {t.cancel}
//             </MemoizedButton>
//           </DialogActions>
//         </Box>
//       </Dialog>

//       {/* Snackbar for copy confirmation */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert 
//           onClose={handleCloseSnackbar} 
//           severity="success"
//           sx={{
//             borderRadius: 2,
//             boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
//           }}
//         >
//           {t.emailCopied}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };
// UserMenu.displayName = "UserMenu";
// export default memo(UserMenu);






// "use client";

// import React, { useState, useRef, useEffect, useCallback, memo } from "react";
// import dynamic from 'next/dynamic';
// import { useRouter } from "next/navigation";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Collapse,
//   MenuItem,
//   Typography,
//   Box,
//   Divider,
//   Paper,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogContent,
//   CircularProgress,
//   TextField,
//   InputAdornment,
//   DialogTitle,
//   DialogActions,
//   Button,
//   Card,
//   CardContent
// } from "@mui/material";
// import { Close, ArrowDropDown, Favorite, Calculate, ContentCopy, Email, Mail } from "@mui/icons-material";
// import { logout } from "../store/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

// // Динамические импорты для тяжелых компонентов с предзагрузкой
// const Logo = dynamic(() => import("./Logo"), {
//   loading: () => <div>Загрузка лого...</div>,
//   ssr: false
// });

// const translations = {
//   ua: {
//     sloganLine1: "Оренда житла по всій Україні",
//     sloganLine2: "Без посередників !",
//     profile: "Мій Профіль",
//     myListings: "Мої оголошення",
//     rentOut: "Розмістити оголошення",
//     searchHome: "Пошук житла",
//     language: "Мова",
//     currency: "Валюта",
//     favorites: "Обране",
//     logout: "Вийти",
//     rentalTerms: "Умови оренди",
//     contactSupport: "Зв'язатися з підтримкою",
//     blog: "Блог",
//     loadingRates: "Завантаження курсів...",
//     currencyError: "Не вдалося завантажити курси валют",
//     converter: "Конвертер валют",
//     enterAmount: "Введіть суму",
//     uah: "грн",
//     currentRates: "Поточний курс НБУ",
//     copyEmail: "Скопіювати email",
//     emailCopied: "Email скопійовано в буфер обміну",
//     contactInstructions: "Оберіть спосіб зв'язку з підтримкою",
//     supportEmail: "nadoby.com.ua@gmail.com",
//     writeGmail: "Написати через Gmail",
//     writeEmailClient: "Написати через поштовий клієнт",
//     cancel: "Скасувати",
//   },
//   ru: {
//     sloganLine1: "Аренда жилья по всей Украине",
//     sloganLine2: "Без посредников !",
//     profile: "Мой Профиль",
//     myListings: "Мои объявления",
//     rentOut: "Разместить объявление",
//     searchHome: "Поиск жилья",
//     language: "Язык",
//     currency: "Валюта",
//     favorites: "Избранное",
//     logout: "Выйти",
//     rentalTerms: "Условия аренды",
//     contactSupport: "Связаться с поддержкой",
//     blog: "Блог",
//     loadingRates: "Загрузка курсов...",
//     currencyError: "Не удалось загрузить курсы валют",
//     converter: "Конвертер валют",
//     enterAmount: "Введите сумму",
//     uah: "грн",
//     currentRates: "Текущий курс НБУ",
//     copyEmail: "Скопировать email",
//     emailCopied: "Email скопирован в буфер обмена",
//     contactInstructions: "Выберите способ связи с поддержкой",
//     supportEmail: "nadoby.com.ua@gmail.com",
//     writeGmail: "Написать через Gmail",
//     writeEmailClient: "Написать через почтовый клиент",
//     cancel: "Отмена",
//   }
// };

// // Временный хук useLanguage
// const useLanguage = () => {
//   const [currentLanguage, setCurrentLanguage] = useState('ua');
  
//   const onLanguageToggle = useCallback((language) => {
//     setCurrentLanguage(language);
//   }, []);
  
//   return { currentLanguage, onLanguageToggle };
// };

// // Компонент для быстрых ссылок
// const FastLink = memo(({ href, children, onClick, ...props }) => {
//   const router = useRouter();
  
//   const handleClick = useCallback((e) => {
//     e.preventDefault();
//     if (href) {
//       router.push(href);
//     }
//     onClick?.(e);
//   }, [href, router, onClick]);

//   return (
//     <a 
//       href={href}
//       onClick={handleClick}
//       style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
//       {...props}
//     >
//       {children}
//     </a>
//   );
// });

// FastLink.displayName = "FastLink";

// const UserMenu = () => {
//   const menuRef = useRef(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(true);
//   const [openLanguage, setOpenLanguage] = useState(false);
//   const [openCurrency, setOpenCurrency] = useState(false);
//   const [showEmailDialog, setShowEmailDialog] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
  
//   // Состояния для функционала валют
//   const [exchangeRates, setExchangeRates] = useState(null);
//   const [loadingRates, setLoadingRates] = useState(false);
//   const [currencyError, setCurrencyError] = useState(null);
//   const [converterAmount, setConverterAmount] = useState("");
//   const [converterResult, setConverterResult] = useState({ USD: 0, EUR: 0 });
  
//   // Состояния для данных пользователя
//   const [myListingsCount, setMyListingsCount] = useState(0);
//   const [favoritesCount, setFavoritesCount] = useState(0);

//   const { currentLanguage, onLanguageToggle } = useLanguage();
//   const t = translations[currentLanguage];
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const profile = useSelector(state => state.auth.profile);

//   // Определяем мобильное устройство
//   useEffect(() => {
//     const checkIfMobile = () => {
//       const width = window.innerWidth;
//       setIsMobile(width < 768); // Мобилка до 768px
//     };

//     checkIfMobile();
//     window.addEventListener('resize', checkIfMobile);
    
//     return () => window.removeEventListener('resize', checkIfMobile);
//   }, []);

//   // Определяем позицию меню
//   const menuPosition = isMobile ? 'left' : 'right';

//   // Функция для получения курсов валют
//   const fetchExchangeRates = useCallback(async () => {
//     setLoadingRates(true);
//     setCurrencyError(null);
    
//     try {
//       const response = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
//       const usdRate = response.data.find(currency => currency.cc === 'USD');
//       const eurRate = response.data.find(currency => currency.cc === 'EUR');
      
//       setExchangeRates({
//         USD: usdRate ? usdRate.rate.toFixed(2) : 'Н/Д',
//         EUR: eurRate ? eurRate.rate.toFixed(2) : 'Н/Д',
//       });
//     } catch (error) {
//       console.error('Ошибка при получении курсов валют:', error);
//       setCurrencyError(t.currencyError);
//     } finally {
//       setLoadingRates(false);
//     }
//   }, [t.currencyError]);

//   // Функция для конвертации валют
//   const convertCurrency = useCallback((amount) => {
//     if (!exchangeRates || isNaN(amount) || amount <= 0) {
//       setConverterResult({ USD: 0, EUR: 0 });
//       return;
//     }
    
//     const numericAmount = parseFloat(amount);
//     const usdRate = parseFloat(exchangeRates.USD);
//     const eurRate = parseFloat(exchangeRates.EUR);
    
//     if (isNaN(usdRate) || isNaN(eurRate)) {
//       setConverterResult({ USD: 0, EUR: 0 });
//       return;
//     }
    
//     setConverterResult({
//       USD: (numericAmount / usdRate).toFixed(2),
//       EUR: (numericAmount / eurRate).toFixed(2)
//     });
//   }, [exchangeRates]);

//   // Функция для связи с поддержкой
//   const handleContactSupport = useCallback(() => {
//     setShowEmailDialog(true);
//   }, []);

//   // Функция для открытия Gmail с предзаполненным письмом
//   const openGmail = useCallback(() => {
//     let userInfo = "Неавторизованный пользователь";
    
//     if (profile) {
//       userInfo = `Пользователь: ${profile.name || 'Имя не указано'}\n` +
//                  `Email: ${profile.email || 'Email не указан'}\n` +
//                  `ID: ${profile._id || 'ID не указан'}\n` +
//                  `Телефон: ${profile.phone || 'Телефон не указан'}`;
//     }

//     const subject = `Поддержка NaDoby.com.ua - ${profile ? profile.name || 'Пользователь' : 'Гость'}`;
//     const body = `Здравствуйте!\n\nМне нужна помощь по поводу:\n\n\n---\nИнформация о пользователе:\n${userInfo}\n---\n\nСообщение отправлено с сайта NaDoby.com.ua.`;

//     const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${t.supportEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
//     window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    
//     setShowEmailDialog(false);
//     setIsMenuOpen(false);
//   }, [profile, t.supportEmail]);

//   // Функция для открытия почтового клиента по умолчанию
//   const openDefaultEmailClient = useCallback(() => {
//     let userInfo = "Неавторизованный пользователь";
    
//     if (profile) {
//       userInfo = `Пользователь: ${profile.name || 'Имя не указано'}\n` +
//                  `Email: ${profile.email || 'Email не указан'}\n` +
//                  `ID: ${profile._id || 'ID не указан'}\n` +
//                  `Телефон: ${profile.phone || 'Телефон не указан'}`;
//     }

//     const subject = `Поддержка NaDoby.com.ua - ${profile ? profile.name || 'Пользователь' : 'Гость'}`;
//     const body = `Здравствуйте!\n\nМне нужна помощь по поводу:\n\n\n---\nИнформация о пользователе:\n${userInfo}\n---\n\nСообщение отправлено с сайта NaDoby.com.ua.`;

//     const mailtoUrl = `mailto:${t.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
//     window.location.href = mailtoUrl;
    
//     setShowEmailDialog(false);
//     setIsMenuOpen(false);
//   }, [profile, t.supportEmail]);

//   // Функция для копирования email в буфер обмена
//   const copyEmailToClipboard = useCallback(() => {
//     navigator.clipboard.writeText(t.supportEmail)
//       .then(() => {
//         setSnackbarOpen(true);
//         setShowEmailDialog(false);
//         setIsMenuOpen(false);
//       })
//       .catch(err => {
//         console.error('Ошибка при копировании:', err);
//         const textArea = document.createElement('textarea');
//         textArea.value = t.supportEmail;
//         document.body.appendChild(textArea);
//         textArea.select();
//         document.execCommand('copy');
//         document.body.removeChild(textArea);
//         setSnackbarOpen(true);
//         setShowEmailDialog(false);
//         setIsMenuOpen(false);
//       });
//   }, [t.supportEmail]);

//   // Функция для загрузки данных пользователя
//   const fetchUserData = useCallback(async () => {
//     try {
//       if (profile?._id) {
//         // Загрузка количества объявлений
//         const listingsResponse = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/user-apartment-count/${profile._id}`
//         );
//         setMyListingsCount(listingsResponse.data.count);
//       }

//       // Загрузка количества избранных
//       const userProfile = localStorage.getItem('user_profile');
//       if (userProfile) {
//         const profileData = JSON.parse(userProfile);
        
//         const favoritesResponse = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/favorites/count`,
//           { headers: { 'user-id': profileData._id } }
//         );
        
//         if (favoritesResponse.data.success) {
//           setFavoritesCount(favoritesResponse.data.count);
//         }
//       }
//     } catch (error) {
//       console.error('Помилка при завантаженні даних:', error);
//     }
//   }, [profile]);

//   useEffect(() => {
//     fetchUserData();
//   }, [fetchUserData]);

//   // Загружаем курсы валют при открытии меню валют
//   useEffect(() => {
//     if (openCurrency) {
//       fetchExchangeRates();
//     }
//   }, [openCurrency, fetchExchangeRates]);

//   // Обновляем результаты конвертации
//   useEffect(() => {
//     if (converterAmount && !isNaN(parseFloat(converterAmount))) {
//       convertCurrency(converterAmount);
//     }
//   }, [converterAmount, convertCurrency]);

//   // Функция для выхода
//   const handleLogout = useCallback(() => {
//     dispatch(logout());
//     setIsMenuOpen(false);
//   }, [dispatch]);

//   const closeMenu = useCallback(() => {
//     setIsMenuOpen(false);
//     setOpenLanguage(false);
//     setOpenCurrency(false);
//   }, []);

//   const handleLanguageToggle = useCallback((language) => {
//     onLanguageToggle(language);
//     setOpenLanguage(false);
//   }, [onLanguageToggle]);

//   const handleClickOutside = useCallback((e) => {
//     if (
//       menuRef.current && 
//       !menuRef.current.contains(e.target)
//     ) {
//       closeMenu();
//       setShowEmailDialog(false);
//     }
//   }, [closeMenu]);

//   useEffect(() => {
//     if (isMenuOpen || showEmailDialog) {
//       document.addEventListener('mousedown', handleClickOutside);
//       return () => document.removeEventListener('mousedown', handleClickOutside);
//     }
//   }, [isMenuOpen, showEmailDialog, handleClickOutside]);

//   const handleCloseSnackbar = useCallback(() => {
//     setSnackbarOpen(false);
//   }, []);

//   const handleCloseEmailDialog = useCallback(() => {
//     setShowEmailDialog(false);
//   }, []);

//   const handleConverterAmountChange = useCallback((e) => {
//     setConverterAmount(e.target.value);
//   }, []);

//   const handleLanguageMenuToggle = useCallback(() => {
//     setOpenLanguage(prev => !prev);
//   }, []);

//   const handleCurrencyMenuToggle = useCallback(() => {
//     setOpenCurrency(prev => !prev);
//   }, []);

//   // Функция для быстрого перехода
//   const handleFastNavigation = useCallback((path) => {
//     router.push(path);
//     setIsMenuOpen(false);
//   }, [router]);

//   if (!isMenuOpen) return null;

//   // Стили для меню в зависимости от позиции
//   const menuStyles = {
//     width: isMobile ? "85%" : 300,
//     maxWidth: 400,
//     height: '100vh',
//     bgcolor: '#ffffff',
//     borderRadius: 0,
//     overflow: 'hidden',
//     display: 'flex',
//     flexDirection: 'column',
//     position: 'fixed',
//     top: 0,
//     zIndex: 1400,
//     boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
//     ...(menuPosition === 'right' 
//       ? {
//           right: 0,
//           animation: 'slideInFromRight 0.3s ease-out',
//           '@keyframes slideInFromRight': {
//             '0%': { transform: 'translateX(100%)' },
//             '100%': { transform: 'translateX(0)' }
//           }
//         }
//       : {
//           left: 0,
//           animation: 'slideInFromLeft 0.3s ease-out',
//           '@keyframes slideInFromLeft': {
//             '0%': { transform: 'translateX(-100%)' },
//             '100%': { transform: 'translateX(0)' }
//           }
//         }
//     )
//   };

//   return (
//     <>
//       {/* Затемненный фон - ПОД меню */}
//       {isMenuOpen && (
//         <Box
//           sx={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100vw',
//             height: '100vh',
//             bgcolor: 'rgba(0,0,0,0.5)',
//             backdropFilter: 'blur(3px)',
//             cursor: 'pointer',
//             transition: 'opacity 0.3s ease',
//             zIndex: 1300,
//             animation: 'fadeIn 0.3s ease-out',
//             '@keyframes fadeIn': {
//               '0%': { opacity: 0 },
//               '100%': { opacity: 1 }
//             }
//           }}
//           onClick={closeMenu}
//         />
//       )}

//       {/* Меню - сайдбар (ПОВЕРХ фона) */}
//       {isMenuOpen && (
//         <Paper
//           ref={menuRef}
//           sx={menuStyles}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Хедер с логотипом и кнопкой закрытия */}
//           <Box sx={{ 
//             p: 3, 
//             borderBottom: '1px solid #f0f0f0',
//             bgcolor: '#ffffff',
//             flexShrink: 0
//           }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Logo />
//               <IconButton 
//                 onClick={closeMenu}
//                 sx={{ 
//                   color: '#718096',
//                   '&:hover': {
//                     backgroundColor: 'rgba(0,0,0,0.05)'
//                   }
//                 }}
//               >
//                 <Close />
//               </IconButton>
//             </Box>

//             <Box sx={{ mt: 1 }}>
//               <Typography sx={{
//                 color: '#1a365d',
//                 fontSize: isMobile ? '0.9rem' : '0.98rem',
//                 fontWeight: 600,
//               }}>
//                 {t.sloganLine1}
//               </Typography>
//               <Typography sx={{
//                 color: '#e53e3e',
//                 fontSize: isMobile ? '0.85rem' : '0.90rem',
//                 fontWeight: 600,
//                 lineHeight: 1.3,
//                 mt: 0.5,
//                 fontStyle: 'italic'
//               }}>
//                 {t.sloganLine2}
//               </Typography>
//             </Box>
//           </Box>

//           {/* Основное меню с прокруткой */}
//           <Box sx={{ 
//             flex: 1, 
//             overflow: 'auto',
//             py: 0
//           }}>
//             <List sx={{ py: 0, pb: 1 }}>
//               <ListItem 
//                 component={FastLink}
//                 href="/my-profile"
//                 onClick={() => handleFastNavigation("/my-profile")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color:'#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.profile}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <ListItem 
//                 component={FastLink}
//                 href="/my-listings"
//                 onClick={() => handleFastNavigation("/my-listings")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color:'#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={`${t.myListings} (${myListingsCount})`}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <ListItem 
//                 component={FastLink}
//                 href="/add-apartment"
//                 onClick={() => handleFastNavigation("/add-apartment")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color:'#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.rentOut}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <ListItem 
//                 component={FastLink}
//                 href="/"
//                 onClick={() => handleFastNavigation("/")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color:'#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.searchHome}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <ListItem 
//                 component={FastLink}
//                 href="/favorites"
//                 onClick={() => handleFastNavigation("/favorites")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color:'#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Favorite sx={{ mr: 1, fontSize: isMobile ? '18px' : '20px' }} />
//                       {`${t.favorites} (${favoritesCount})`}
//                     </Box>
//                   }
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <Divider sx={{ my: 0.5 }} />

//               <ListItem 
//                 component="div"
//                 onClick={handleLanguageMenuToggle}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color: '#0000FF',
//                   cursor: 'pointer',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.language}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem'
//                   }}
//                 />
//                 <ArrowDropDown sx={{ color: '#0000FF' }} />
//               </ListItem>

//               <Collapse in={openLanguage}>
//                 <Box sx={{ bgcolor: '#f8f9fa' }}>
//                   <MenuItem 
//                     onClick={() => handleLanguageToggle('ua')}
//                     sx={{ 
//                       px: 4, 
//                       py: 1,
//                       color: '#0000FF',
//                       cursor: 'pointer',
//                       fontSize: isMobile ? '0.95rem' : '1rem'
//                     }}
//                   >
//                     UA
//                   </MenuItem>
//                   <MenuItem 
//                     onClick={() => handleLanguageToggle('ru')}
//                     sx={{ 
//                       px: 4, 
//                       py: 1,
//                       color: '#0000FF',
//                       cursor: 'pointer',
//                       fontSize: isMobile ? '0.95rem' : '1rem'
//                     }}
//                   >
//                     RU
//                   </MenuItem>
//                 </Box>
//               </Collapse>

//               <ListItem 
//                 component="div"
//                 onClick={handleCurrencyMenuToggle}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color: '#0000FF',
//                   cursor: 'pointer',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.currency}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem'
//                   }}
//                 />
//                 <ArrowDropDown sx={{ color: '#0000FF' }} />
//               </ListItem>

//               <Collapse in={openCurrency}>
//                 <Box sx={{ bgcolor: '#f8f9fa', px: isMobile ? 1 : 0 }}>
//                   {loadingRates ? (
//                     <MenuItem sx={{ 
//                       px: 4, 
//                       color: "#0000FF", 
//                       display: 'flex', 
//                       justifyContent: 'center',
//                       fontSize: isMobile ? '0.9rem' : '1rem'
//                     }}>
//                       <CircularProgress size={20} sx={{ mr: 1 }} />
//                       {t.loadingRates}
//                     </MenuItem>
//                   ) : currencyError ? (
//                     <MenuItem sx={{ 
//                       px: 4, 
//                       color: "#0000FF",
//                       fontSize: isMobile ? '0.9rem' : '1rem'
//                     }}>
//                       {currencyError}
//                     </MenuItem>
//                   ) : exchangeRates ? (
//                     <>
//                       <MenuItem sx={{ 
//                         px: 4, 
//                         color: "#0000FF", 
//                         fontWeight: 'bold',
//                         fontSize: isMobile ? '0.95rem' : '1rem'
//                       }}>
//                         {t.currentRates}
//                       </MenuItem>
//                       <MenuItem sx={{ 
//                         px: 4, 
//                         color: "#0000FF",
//                         fontSize: isMobile ? '0.9rem' : '1rem'
//                       }}>
//                         USD: {exchangeRates.USD} UAH
//                       </MenuItem>
//                       <MenuItem sx={{ 
//                         px: 4, 
//                         color: "#0000FF",
//                         fontSize: isMobile ? '0.9rem' : '1rem'
//                       }}>
//                         EUR: {exchangeRates.EUR} UAH
//                       </MenuItem>
                      
//                       <Divider sx={{ my: 0.5 }} />
                      
//                       <MenuItem sx={{ 
//                         px: 4, 
//                         color: "#0000FF", 
//                         fontWeight: 'bold',
//                         fontSize: isMobile ? '0.95rem' : '1rem'
//                       }}>
//                         <Calculate sx={{ mr: 1, fontSize: isMobile ? '1rem' : '1.2rem' }} />
//                         {t.converter}
//                       </MenuItem>
                      
//                       <Box sx={{ px: 4, py: 1 }}>
//                         <TextField
//                           type="number"
//                           value={converterAmount}
//                           onChange={handleConverterAmountChange}
//                           label={t.enterAmount}
//                           variant="outlined"
//                           size="small"
//                           fullWidth
//                           InputProps={{
//                             endAdornment: <InputAdornment position="end">{t.uah}</InputAdornment>,
//                             sx: { fontSize: isMobile ? '0.9rem' : '1rem' }
//                           }}
//                           sx={{
//                             '& .MuiInputLabel-root': {
//                               fontSize: isMobile ? '0.9rem' : '1rem'
//                             }
//                           }}
//                         />
                        
//                         {converterAmount && parseFloat(converterAmount) > 0 && (
//                           <Box sx={{ mt: 1 }}>
//                             <Typography variant="body2" sx={{ 
//                               color: "#0000FF",
//                               fontSize: isMobile ? '0.9rem' : '1rem'
//                             }}>
//                               USD: {converterResult.USD}
//                             </Typography>
//                             <Typography variant="body2" sx={{ 
//                               color: "#0000FF",
//                               fontSize: isMobile ? '0.9rem' : '1rem'
//                             }}>
//                               EUR: {converterResult.EUR}
//                             </Typography>
//                           </Box>
//                         )}
//                       </Box>
//                     </>
//                   ) : null}
//                 </Box>
//               </Collapse>

//               <Divider sx={{ my: 0.5 }} />

//               <ListItem
//                 component={FastLink}
//                 href="/rental-terms"
//                 onClick={() => handleFastNavigation("/rental-terms")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color: '#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.rentalTerms}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <ListItem
//                 component={FastLink}
//                 href="/blog"
//                 onClick={() => handleFastNavigation("/blog")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color: '#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.blog}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <ListItem
//                 onClick={handleContactSupport}
//                 component="div"
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color: '#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.contactSupport}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem'
//                   }}
//                 />
//               </ListItem>

//               <ListItem
//                 onClick={handleLogout}
//                 component="div"
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color: 'error.main',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: 'rgba(211, 47, 47, 0.08)'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.logout}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem'
//                   }}
//                 />
//               </ListItem>
//             </List>
//           </Box>
//         </Paper>
//       )}

//       <Dialog
//         open={showEmailDialog}
//         onClose={handleCloseEmailDialog}
//         maxWidth="sm"
//         fullWidth
//         fullScreen={isMobile}
//         PaperProps={{
//           sx: {
//             borderRadius: isMobile ? 0 : 2,
//             boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
//             m: isMobile ? 0 : 2,
//             height: isMobile ? '100%' : 'auto',
//             maxHeight: isMobile ? '100%' : '90vh',
//             display: 'flex',
//             flexDirection: 'column',
//             zIndex: 1500
//           }
//         }}
//       >
//         <Box sx={{ 
//           display: 'flex', 
//           flexDirection: 'column',
//           height: '100%',
//           overflow: 'hidden'
//         }}>
//           <DialogTitle 
//             sx={{ 
//               color: "#1a365d", 
//               display: 'flex', 
//               alignItems: 'center',
//               fontSize: isMobile ? '1.1rem' : '1.25rem',
//               fontWeight: 600,
//               pb: 1,
//               flexShrink: 0
//             }}
//           >
//             <Mail sx={{ mr: 2, color: "#0000FF" }} />
//             {t.contactSupport}
//           </DialogTitle>
          
//           <DialogContent sx={{ 
//             pb: 2, 
//             flex: 1,
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             overflow: 'auto'
//           }}>
//             <Box sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: '100%',
//               gap: 3
//             }}>
//               <Typography 
//                 variant="body1" 
//                 sx={{ 
//                   color: '#718096',
//                   textAlign: 'center',
//                   fontSize: isMobile ? '0.9rem' : '1rem',
//                   px: isMobile ? 1 : 0
//                 }}
//               >
//                 {t.contactInstructions}
//               </Typography>
              
//               <Card 
//                 variant="outlined"
//                 sx={{
//                   border: '2px solid #e2e8f0',
//                   borderRadius: 2,
//                   backgroundColor: '#f7fafc',
//                   width: '100%',
//                   maxWidth: 400
//                 }}
//               >
//                 <CardContent sx={{ p: isMobile ? 2 : 3, '&:last-child': { pb: isMobile ? 2 : 3 } }}>
//                   <Box sx={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between', 
//                     alignItems: 'center'
//                   }}>
//                     <Box sx={{ flex: 1 }}>
//                       <Typography 
//                         variant="h6" 
//                         sx={{ 
//                           color: "#1a365d",
//                           fontWeight: 600,
//                           fontSize: isMobile ? '1rem' : '1.1rem',
//                           wordBreak: 'break-all'
//                         }}
//                       >
//                         {t.supportEmail}
//                       </Typography>
//                     </Box>
//                     <IconButton 
//                       onClick={copyEmailToClipboard}
//                       sx={{ 
//                         color: "#0000FF",
//                         backgroundColor: 'rgba(0, 0, 255, 0.1)',
//                         ml: 1,
//                         '&:hover': {
//                           backgroundColor: 'rgba(0, 0, 255, 0.2)',
//                         }
//                       }}
//                     >
//                       <ContentCopy />
//                     </IconButton>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Box>
//           </DialogContent>
          
//           <DialogActions sx={{ 
//             p: isMobile ? 2 : 3, 
//             pt: 0, 
//             gap: isMobile ? 1.5 : 2, 
//             flexDirection: 'column',
//             flexShrink: 0
//           }}>
//             <Button 
//               onClick={openGmail}
//               variant="contained"
//               sx={{ 
//                 bgcolor: "#0000FF",
//                 "&:hover": { 
//                   bgcolor: "#0000CC",
//                   boxShadow: '0 4px 12px rgba(0, 0, 255, 0.3)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//               startIcon={<Email />}
//             >
//               {t.writeGmail}
//             </Button>
            
//             <Button 
//               onClick={openDefaultEmailClient}
//               variant="outlined"
//               sx={{ 
//                 color: "#0000FF", 
//                 borderColor: "#0000FF",
//                 "&:hover": { 
//                   borderColor: "#0000CC",
//                   backgroundColor: 'rgba(0, 0, 255, 0.04)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//               startIcon={<Mail />}
//             >
//               {t.writeEmailClient}
//             </Button>
            
//             <Button 
//               onClick={copyEmailToClipboard}
//               variant="outlined"
//               sx={{ 
//                 color: "#0000FF", 
//                 borderColor: "#0000FF",
//                 "&:hover": { 
//                   borderColor: "#0000CC",
//                   backgroundColor: 'rgba(0, 0, 255, 0.04)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//               startIcon={<ContentCopy />}
//             >
//               {t.copyEmail}
//             </Button>
            
//             <Button 
//               onClick={handleCloseEmailDialog}
//               variant="outlined"
//               sx={{ 
//                 color: "error.main", 
//                 borderColor: "error.main",
//                 "&:hover": { 
//                   borderColor: "error.dark",
//                   backgroundColor: 'rgba(211, 47, 47, 0.04)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//             >
//               {t.cancel}
//             </Button>
//           </DialogActions>
//         </Box>
//       </Dialog>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//         sx={{ zIndex: 1600 }}
//       >
//         <Alert 
//           onClose={handleCloseSnackbar} 
//           severity="success"
//           sx={{
//             borderRadius: 2,
//             boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
//         }}
//         >
//           {t.emailCopied}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default memo(UserMenu);



// "use client";

// import React, { useState, useRef, useEffect, useCallback, memo } from "react";
// import dynamic from 'next/dynamic';
// import { useRouter } from "next/navigation";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Collapse,
//   MenuItem,
//   Typography,
//   Box,
//   Divider,
//   Paper,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogContent,
//   CircularProgress,
//   TextField,
//   InputAdornment,
//   DialogTitle,
//   DialogActions,
//   Button,
//   Card,
//   CardContent,
//   useTheme,
//   useMediaQuery
// } from "@mui/material";
// import { Close, ArrowDropDown, Favorite, Calculate, ContentCopy, Email, Mail } from "@mui/icons-material";
// import { logout } from "../store/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

// // Импорт useLanguage из контекста
// import { useLanguage } from "@/app/LanguageContext";

// // Динамические импорты для тяжелых компонентов с предзагрузкой
// const Logo = dynamic(() => import("./Logo"), {
//   loading: () => <div>Загрузка лого...</div>,
//   ssr: false
// });

// const translations = {
//   ua: {
//     sloganLine1: "Оренда житла по всій Україні",
//     sloganLine2: "Без посередників !",
//     profile: "Мій Профіль",
//     myListings: "Мої оголошення",
//     rentOut: "Розмістити оголошення",
//     searchHome: "Пошук житла",
//     language: "Мова",
//     currency: "Валюта",
//     favorites: "Обране",
//     logout: "Вийти",
//     rentalTerms: "Умови оренди",
//     contactSupport: "Зв'язатися з підтримкою",
//     blog: "Блог",
//     loadingRates: "Завантаження курсів...",
//     currencyError: "Не вдалося завантажити курси валют",
//     converter: "Конвертер валют",
//     enterAmount: "Введіть суму",
//     uah: "грн",
//     currentRates: "Поточний курс НБУ",
//     copyEmail: "Скопіювати email",
//     emailCopied: "Email скопійовано в буфер обміну",
//     contactInstructions: "Оберіть спосіб зв'язку з підтримкою",
//     supportEmail: "nadoby.com.ua@gmail.com",
//     writeGmail: "Написати через Gmail",
//     writeEmailClient: "Написати через поштовий клієнт",
//     cancel: "Скасувати",
//   },
//   ru: {
//     sloganLine1: "Аренда жилья по всей Украине",
//     sloganLine2: "Без посредников !",
//     profile: "Мой Профиль",
//     myListings: "Мои объявления",
//     rentOut: "Разместить объявление",
//     searchHome: "Поиск жилья",
//     language: "Язык",
//     currency: "Валюта",
//     favorites: "Избранное",
//     logout: "Выйти",
//     rentalTerms: "Условия аренды",
//     contactSupport: "Связаться с поддержкой",
//     blog: "Блог",
//     loadingRates: "Загрузка курсов...",
//     currencyError: "Не удалось загрузить курсы валют",
//     converter: "Конвертер валют",
//     enterAmount: "Введите сумму",
//     uah: "грн",
//     currentRates: "Текущий курс НБУ",
//     copyEmail: "Скопировать email",
//     emailCopied: "Email скопирован в буфер обмена",
//     contactInstructions: "Выберите способ связи с поддержкой",
//     supportEmail: "nadoby.com.ua@gmail.com",
//     writeGmail: "Написать через Gmail",
//     writeEmailClient: "Написать через почтовый клиент",
//     cancel: "Отмена",
//   }
// };

// // Компонент для быстрых ссылок
// const FastLink = memo(({ href, children, onClick, ...props }) => {
//   const router = useRouter();
  
//   const handleClick = useCallback((e) => {
//     e.preventDefault();
//     if (href) {
//       router.push(href);
//     }
//     onClick?.(e);
//   }, [href, router, onClick]);

//   return (
//     <a 
//       href={href}
//       onClick={handleClick}
//       style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
//       {...props}
//     >
//       {children}
//     </a>
//   );
// });

// FastLink.displayName = "FastLink";

// const UserMenu = () => {
//   const menuRef = useRef(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(true);
//   const [openLanguage, setOpenLanguage] = useState(false);
//   const [openCurrency, setOpenCurrency] = useState(false);
//   const [showEmailDialog, setShowEmailDialog] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
  
//   // Состояния для функционала валют
//   const [exchangeRates, setExchangeRates] = useState(null);
//   const [loadingRates, setLoadingRates] = useState(false);
//   const [currencyError, setCurrencyError] = useState(null);
//   const [converterAmount, setConverterAmount] = useState("");
//   const [converterResult, setConverterResult] = useState({ USD: 0, EUR: 0 });
  
//   // Состояния для данных пользователя
//   const [myListingsCount, setMyListingsCount] = useState(0);
//   const [favoritesCount, setFavoritesCount] = useState(0);

//   // Используем контекст языка вместо временного хука
//   const { currentLanguage, onLanguageToggle } = useLanguage();
//   const t = translations[currentLanguage];
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const profile = useSelector(state => state.auth.profile);
  
//   // Используем MUI Media Query для определения мобильного устройства
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   // Функция для получения курсов валют
//   const fetchExchangeRates = useCallback(async () => {
//     setLoadingRates(true);
//     setCurrencyError(null);
    
//     try {
//       const response = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
//       const usdRate = response.data.find(currency => currency.cc === 'USD');
//       const eurRate = response.data.find(currency => currency.cc === 'EUR');
      
//       setExchangeRates({
//         USD: usdRate ? usdRate.rate.toFixed(2) : 'Н/Д',
//         EUR: eurRate ? eurRate.rate.toFixed(2) : 'Н/Д',
//       });
//     } catch (error) {
//       console.error('Ошибка при получении курсов валют:', error);
//       setCurrencyError(t.currencyError);
//     } finally {
//       setLoadingRates(false);
//     }
//   }, [t.currencyError]);

//   // Функция для конвертации валют
//   const convertCurrency = useCallback((amount) => {
//     if (!exchangeRates || isNaN(amount) || amount <= 0) {
//       setConverterResult({ USD: 0, EUR: 0 });
//       return;
//     }
    
//     const numericAmount = parseFloat(amount);
//     const usdRate = parseFloat(exchangeRates.USD);
//     const eurRate = parseFloat(exchangeRates.EUR);
    
//     if (isNaN(usdRate) || isNaN(eurRate)) {
//       setConverterResult({ USD: 0, EUR: 0 });
//       return;
//     }
    
//     setConverterResult({
//       USD: (numericAmount / usdRate).toFixed(2),
//       EUR: (numericAmount / eurRate).toFixed(2)
//     });
//   }, [exchangeRates]);

//   // Функция для связи с поддержкой
//   const handleContactSupport = useCallback(() => {
//     setShowEmailDialog(true);
//   }, []);

// // Функция для открытия Gmail с предзаполненным письмом
// const openGmail = useCallback(() => {
//   let userInfo = "Неавторизованный пользователь";
  
//   if (profile) {
//     userInfo = `Пользователь: ${profile.name || 'Имя не указано'}\n` +
//                `Email: ${profile.email || 'Email не указан'}\n` +
//                `ID: ${profile._id || 'ID не указан'}\n` +
//                `Телефон: ${profile.phone || 'Телефон не указан'}`;
//   }

//   const subject = `Поддержка NaDoby.com.ua - ${profile ? profile.name || 'Пользователь' : 'Гость'}`;
//   const body = `Здравствуйте!\n\nМне нужна помощь по поводу:\n\n\n---\nИнформация о пользователе:\n${userInfo}\n---\n\nСообщение отправлено с сайта NaDoby.com.ua.`;

//   const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${t.supportEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
//   window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  
//   // Убираем setIsMenuOpen(false) - меню должно оставаться открытым
//   setShowEmailDialog(false);
// }, [profile, t.supportEmail]);

// // Функция для открытия почтового клиента по умолчанию
// const openDefaultEmailClient = useCallback(() => {
//   let userInfo = "Неавторизованный пользователь";
  
//   if (profile) {
//     userInfo = `Пользователь: ${profile.name || 'Имя не указано'}\n` +
//                `Email: ${profile.email || 'Email не указан'}\n` +
//                `ID: ${profile._id || 'ID не указан'}\n` +
//                `Телефон: ${profile.phone || 'Телефон не указан'}`;
//   }

//   const subject = `Поддержка NaDoby.com.ua - ${profile ? profile.name || 'Пользователь' : 'Гость'}`;
//   const body = `Здравствуйте!\n\nМне нужна помощь по поводу:\n\n\n---\nИнформация о пользователе:\n${userInfo}\n---\n\nСообщение отправлено с сайта NaDoby.com.ua.`;

//   const mailtoUrl = `mailto:${t.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
//   // Используем window.open для лучшей совместимости
//   try {
//     window.open(mailtoUrl, '_blank', 'noopener,noreferrer');
//   } catch (error) {
//     console.error('Ошибка при открытии почтового клиента:', error);
    
//     // Альтернативный метод
//     const link = document.createElement('a');
//     link.href = mailtoUrl;
//     link.target = '_blank';
//     link.rel = 'noopener noreferrer';
    
//     try {
//       link.click();
//     } catch (e) {
//       console.error('Альтернативный метод также не сработал:', e);
      
//       // Последний вариант - показываем сообщение
//       alert(`Пожалуйста, напишите нам на email: ${t.supportEmail}\n\nТема: ${subject}\n\nСообщение: ${body}`);
//     }
//   }
  
//   // Убираем setIsMenuOpen(false) - меню должно оставаться открытым
//   setShowEmailDialog(false);
// }, [profile, t.supportEmail]);

// // Функция для копирования email в буфер обмена
// const copyEmailToClipboard = useCallback(() => {
//   navigator.clipboard.writeText(t.supportEmail)
//     .then(() => {
//       setSnackbarOpen(true);
//       setShowEmailDialog(false);
//       // Убираем setIsMenuOpen(false) - меню должно оставаться открытым
//     })
//     .catch(err => {
//       console.error('Ошибка при копировании:', err);
//       const textArea = document.createElement('textarea');
//       textArea.value = t.supportEmail;
//       document.body.appendChild(textArea);
//       textArea.select();
//       document.execCommand('copy');
//       document.body.removeChild(textArea);
//       setSnackbarOpen(true);
//       setShowEmailDialog(false);
//       // Убираем setIsMenuOpen(false) - меню должно оставаться открытым
//     });
// }, [t.supportEmail]);

//   // Функция для загрузки данных пользователя
//   const fetchUserData = useCallback(async () => {
//     try {
//       if (profile?._id) {
//         // Загрузка количества объявлений
//         const listingsResponse = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/user-apartment-count/${profile._id}`
//         );
//         setMyListingsCount(listingsResponse.data.count);
//       }

//       // Загрузка количества избранных
//       const userProfile = localStorage.getItem('user_profile');
//       if (userProfile) {
//         const profileData = JSON.parse(userProfile);
        
//         const favoritesResponse = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/favorites/count`,
//           { headers: { 'user-id': profileData._id } }
//         );
        
//         if (favoritesResponse.data.success) {
//           setFavoritesCount(favoritesResponse.data.count);
//         }
//       }
//     } catch (error) {
//       console.error('Помилка при завантаженні даних:', error);
//     }
//   }, [profile]);

//   useEffect(() => {
//     fetchUserData();
//   }, [fetchUserData]);

//   // Загружаем курсы валют при открытии меню валют
//   useEffect(() => {
//     if (openCurrency) {
//       fetchExchangeRates();
//     }
//   }, [openCurrency, fetchExchangeRates]);

//   // Обновляем результаты конвертации
//   useEffect(() => {
//     if (converterAmount && !isNaN(parseFloat(converterAmount))) {
//       convertCurrency(converterAmount);
//     }
//   }, [converterAmount, convertCurrency]);

//   // Функция для выхода
//   const handleLogout = useCallback(() => {
//     dispatch(logout());
//     setIsMenuOpen(false);
//   }, [dispatch]);

//   const closeMenu = useCallback(() => {
//     setIsMenuOpen(false);
//     setOpenLanguage(false);
//     setOpenCurrency(false);
//   }, []);

//   const handleLanguageToggle = useCallback((language) => {
//     onLanguageToggle(language);
//     setOpenLanguage(false);
//   }, [onLanguageToggle]);

//   const handleClickOutside = useCallback((e) => {
//     if (
//       menuRef.current && 
//       !menuRef.current.contains(e.target)
//     ) {
//       closeMenu();
//       setShowEmailDialog(false);
//     }
//   }, [closeMenu]);

//   useEffect(() => {
//     if (isMenuOpen || showEmailDialog) {
//       document.addEventListener('mousedown', handleClickOutside);
//       return () => document.removeEventListener('mousedown', handleClickOutside);
//     }
//   }, [isMenuOpen, showEmailDialog, handleClickOutside]);

//   const handleCloseSnackbar = useCallback(() => {
//     setSnackbarOpen(false);
//   }, []);

//   const handleCloseEmailDialog = useCallback(() => {
//     setShowEmailDialog(false);
//   }, []);

//   const handleConverterAmountChange = useCallback((e) => {
//     setConverterAmount(e.target.value);
//   }, []);

//   const handleLanguageMenuToggle = useCallback(() => {
//     setOpenLanguage(prev => !prev);
//   }, []);

//   const handleCurrencyMenuToggle = useCallback(() => {
//     setOpenCurrency(prev => !prev);
//   }, []);

//   // Функция для быстрого перехода
//   const handleFastNavigation = useCallback((path) => {
//     router.push(path);
//     setIsMenuOpen(false);
//   }, [router]);

//   if (!isMenuOpen) return null;

//   // Определяем позицию меню: на мобилке слева, на десктопе справа
//   const menuPosition = isMobile ? 'left' : 'right';

//   // Стили для меню в зависимости от позиции
//   const menuStyles = {
//     width: isMobile ? "85%" : 300,
//     maxWidth: 400,
//     height: '100vh',
//     bgcolor: '#ffffff',
//     borderRadius: 0,
//     overflow: 'hidden',
//     display: 'flex',
//     flexDirection: 'column',
//     position: 'fixed',
//     top: 0,
//     zIndex: 1400,
//     boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
//     ...(menuPosition === 'right' 
//       ? {
//           right: 0,
//           animation: 'slideInFromRight 0.3s ease-out',
//           '@keyframes slideInFromRight': {
//             '0%': { transform: 'translateX(100%)' },
//             '100%': { transform: 'translateX(0)' }
//           }
//         }
//       : {
//           left: 0,
//           animation: 'slideInFromLeft 0.3s ease-out',
//           '@keyframes slideInFromLeft': {
//             '0%': { transform: 'translateX(-100%)' },
//             '100%': { transform: 'translateX(0)' }
//           }
//         }
//     )
//   };

//   return (
//     <>
//       {/* Затемненный фон */}
//       {isMenuOpen && (
//         <Box
//           sx={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100vw',
//             height: '100vh',
//             bgcolor: 'rgba(0,0,0,0.5)',
//             backdropFilter: 'blur(3px)',
//             cursor: 'pointer',
//             transition: 'opacity 0.3s ease',
//             zIndex: 1300,
//             animation: 'fadeIn 0.3s ease-out',
//             '@keyframes fadeIn': {
//               '0%': { opacity: 0 },
//               '100%': { opacity: 1 }
//             }
//           }}
//           onClick={closeMenu}
//         />
//       )}

//       {/* Меню - сайдбар */}
//       {isMenuOpen && (
//         <Paper
//           ref={menuRef}
//           sx={menuStyles}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Хедер с логотипом и кнопкой закрытия */}
//           <Box sx={{ 
//             p: 3, 
//             borderBottom: '1px solid #f0f0f0',
//             bgcolor: '#ffffff',
//             flexShrink: 0
//           }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Logo />
//               <IconButton 
//                 onClick={closeMenu}
//                 sx={{ 
//                   color: '#718096',
//                   '&:hover': {
//                     backgroundColor: 'rgba(0,0,0,0.05)'
//                   }
//                 }}
//               >
//                 <Close />
//               </IconButton>
//             </Box>

//             <Box sx={{ mt: 1 }}>
//               <Typography sx={{
//                 color: '#1a365d',
//                 fontSize: isMobile ? '0.9rem' : '0.98rem',
//                 fontWeight: 600,
//               }}>
//                 {t.sloganLine1}
//               </Typography>
//               <Typography sx={{
//                 color: '#e53e3e',
//                 fontSize: isMobile ? '0.85rem' : '0.90rem',
//                 fontWeight: 600,
//                 lineHeight: 1.3,
//                 mt: 0.5,
//                 fontStyle: 'italic'
//               }}>
//                 {t.sloganLine2}
//               </Typography>
//             </Box>
//           </Box>

//           {/* Основное меню с прокруткой */}
//           <Box sx={{ 
//             flex: 1, 
//             overflow: 'auto',
//             py: 0
//           }}>
//             <List sx={{ py: 0, pb: 1 }}>
//               <ListItem 
//                 component={FastLink}
//                 href="/my-profile"
//                 onClick={() => handleFastNavigation("/my-profile")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color:'#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.profile}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <ListItem 
//                 component={FastLink}
//                 href="/my-listings"
//                 onClick={() => handleFastNavigation("/my-listings")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color:'#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={`${t.myListings} (${myListingsCount})`}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <ListItem 
//                 component={FastLink}
//                 href="/add-apartment"
//                 onClick={() => handleFastNavigation("/add-apartment")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color:'#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.rentOut}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <ListItem 
//                 component={FastLink}
//                 href="/"
//                 onClick={() => handleFastNavigation("/")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color:'#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.searchHome}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <ListItem 
//                 component={FastLink}
//                 href="/favorites"
//                 onClick={() => handleFastNavigation("/favorites")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color:'#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Favorite sx={{ mr: 1, fontSize: isMobile ? '18px' : '20px' }} />
//                       {`${t.favorites} (${favoritesCount})`}
//                     </Box>
//                   }
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <Divider sx={{ my: 0.5 }} />

//               <ListItem 
//                 component="div"
//                 onClick={handleLanguageMenuToggle}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color: '#0000FF',
//                   cursor: 'pointer',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.language}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem'
//                   }}
//                 />
//                 <ArrowDropDown sx={{ color: '#0000FF' }} />
//               </ListItem>

//               <Collapse in={openLanguage}>
//                 <Box sx={{ bgcolor: '#f8f9fa' }}>
//                   <MenuItem 
//                     onClick={() => handleLanguageToggle('ua')}
//                     sx={{ 
//                       px: 4, 
//                       py: 1,
//                       color: '#0000FF',
//                       cursor: 'pointer',
//                       fontSize: isMobile ? '0.95rem' : '1rem'
//                     }}
//                   >
//                     UA
//                   </MenuItem>
//                   <MenuItem 
//                     onClick={() => handleLanguageToggle('ru')}
//                     sx={{ 
//                       px: 4, 
//                       py: 1,
//                       color: '#0000FF',
//                       cursor: 'pointer',
//                       fontSize: isMobile ? '0.95rem' : '1rem'
//                     }}
//                   >
//                     RU
//                   </MenuItem>
//                 </Box>
//               </Collapse>

//               <ListItem 
//                 component="div"
//                 onClick={handleCurrencyMenuToggle}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color: '#0000FF',
//                   cursor: 'pointer',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.currency}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem'
//                   }}
//                 />
//                 <ArrowDropDown sx={{ color: '#0000FF' }} />
//               </ListItem>

//               <Collapse in={openCurrency}>
//                 <Box sx={{ bgcolor: '#f8f9fa', px: isMobile ? 1 : 0 }}>
//                   {loadingRates ? (
//                     <MenuItem sx={{ 
//                       px: 4, 
//                       color: "#0000FF", 
//                       display: 'flex', 
//                       justifyContent: 'center',
//                       fontSize: isMobile ? '0.9rem' : '1rem'
//                     }}>
//                       <CircularProgress size={20} sx={{ mr: 1 }} />
//                       {t.loadingRates}
//                     </MenuItem>
//                   ) : currencyError ? (
//                     <MenuItem sx={{ 
//                       px: 4, 
//                       color: "#0000FF",
//                       fontSize: isMobile ? '0.9rem' : '1rem'
//                     }}>
//                       {currencyError}
//                     </MenuItem>
//                   ) : exchangeRates ? (
//                     <>
//                       <MenuItem sx={{ 
//                         px: 4, 
//                         color: "#0000FF", 
//                         fontWeight: 'bold',
//                         fontSize: isMobile ? '0.95rem' : '1rem'
//                       }}>
//                         {t.currentRates}
//                       </MenuItem>
//                       <MenuItem sx={{ 
//                         px: 4, 
//                         color: "#0000FF",
//                         fontSize: isMobile ? '0.9rem' : '1rem'
//                       }}>
//                         USD: {exchangeRates.USD} UAH
//                       </MenuItem>
//                       <MenuItem sx={{ 
//                         px: 4, 
//                         color: "#0000FF",
//                         fontSize: isMobile ? '0.9rem' : '1rem'
//                       }}>
//                         EUR: {exchangeRates.EUR} UAH
//                       </MenuItem>
                      
//                       <Divider sx={{ my: 0.5 }} />
                      
//                       <MenuItem sx={{ 
//                         px: 4, 
//                         color: "#0000FF", 
//                         fontWeight: 'bold',
//                         fontSize: isMobile ? '0.95rem' : '1rem'
//                       }}>
//                         <Calculate sx={{ mr: 1, fontSize: isMobile ? '1rem' : '1.2rem' }} />
//                         {t.converter}
//                       </MenuItem>
                      
//                       <Box sx={{ px: 4, py: 1 }}>
//                         <TextField
//                           type="number"
//                           value={converterAmount}
//                           onChange={handleConverterAmountChange}
//                           label={t.enterAmount}
//                           variant="outlined"
//                           size="small"
//                           fullWidth
//                           InputProps={{
//                             endAdornment: <InputAdornment position="end">{t.uah}</InputAdornment>,
//                             sx: { fontSize: isMobile ? '0.9rem' : '1rem' }
//                           }}
//                           sx={{
//                             '& .MuiInputLabel-root': {
//                               fontSize: isMobile ? '0.9rem' : '1rem'
//                             }
//                           }}
//                         />
                        
//                         {converterAmount && parseFloat(converterAmount) > 0 && (
//                           <Box sx={{ mt: 1 }}>
//                             <Typography variant="body2" sx={{ 
//                               color: "#0000FF",
//                               fontSize: isMobile ? '0.9rem' : '1rem'
//                             }}>
//                               USD: {converterResult.USD}
//                             </Typography>
//                             <Typography variant="body2" sx={{ 
//                               color: "#0000FF",
//                               fontSize: isMobile ? '0.9rem' : '1rem'
//                             }}>
//                               EUR: {converterResult.EUR}
//                             </Typography>
//                           </Box>
//                         )}
//                       </Box>
//                     </>
//                   ) : null}
//                 </Box>
//               </Collapse>

//               <Divider sx={{ my: 0.5 }} />

//               <ListItem
//                 component={FastLink}
//                 href="/rental-terms"
//                 onClick={() => handleFastNavigation("/rental-terms")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color: '#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.rentalTerms}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <ListItem
//                 component={FastLink}
//                 href="/blog"
//                 onClick={() => handleFastNavigation("/blog")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color: '#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.blog}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <ListItem
//                 onClick={handleContactSupport}
//                 component="div"
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color: '#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.contactSupport}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem'
//                   }}
//                 />
//               </ListItem>

//               <ListItem
//                 onClick={handleLogout}
//                 component="div"
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color: 'error.main',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: 'rgba(211, 47, 47, 0.08)'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.logout}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem'
//                   }}
//                 />
//               </ListItem>
//             </List>
//           </Box>
//         </Paper>
//       )}

//       {/* Email Support Dialog - ОСНОВНОЕ ИСПРАВЛЕНИЕ: увеличен zIndex и fixed позиционирование */}
//       <Dialog
//         open={showEmailDialog}
//         onClose={handleCloseEmailDialog}
//         maxWidth="sm"
//         fullWidth
//         fullScreen={isMobile}
//         PaperProps={{
//           sx: {
//             borderRadius: isMobile ? 0 : 2,
//             boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
//             m: isMobile ? 0 : 2,
//             height: isMobile ? '100%' : 'auto',
//             maxHeight: isMobile ? '100%' : '90vh',
//             display: 'flex',
//             flexDirection: 'column',
//             position: 'fixed', // Ключевое изменение
//             zIndex: 1600, // Увеличенный zIndex, чтобы было поверх меню
//             top: isMobile ? 0 : '50%',
//             left: isMobile ? 0 : '50%',
//             transform: isMobile ? 'none' : 'translate(-50%, -50%)'
//           }
//         }}
//         sx={{
//           zIndex: 1600, // Увеличенный zIndex для самого диалога
//         }}
//       >
//         <Box sx={{ 
//           display: 'flex', 
//           flexDirection: 'column',
//           height: '100%',
//           overflow: 'hidden'
//         }}>
//           <DialogTitle 
//             sx={{ 
//               color: "#1a365d", 
//               display: 'flex', 
//               alignItems: 'center',
//               fontSize: isMobile ? '1.1rem' : '1.25rem',
//               fontWeight: 600,
//               pb: 1,
//               flexShrink: 0
//             }}
//           >
//             <Mail sx={{ mr: 2, color: "#0000FF" }} />
//             {t.contactSupport}
//           </DialogTitle>
          
//           <DialogContent sx={{ 
//             pb: 2, 
//             flex: 1,
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             overflow: 'auto'
//           }}>
//             <Box sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: '100%',
//               gap: 3
//             }}>
//               <Typography 
//                 variant="body1" 
//                 sx={{ 
//                   color: '#718096',
//                   textAlign: 'center',
//                   fontSize: isMobile ? '0.9rem' : '1rem',
//                   px: isMobile ? 1 : 0
//                 }}
//               >
//                 {t.contactInstructions}
//               </Typography>
              
//               <Card 
//                 variant="outlined"
//                 sx={{
//                   border: '2px solid #e2e8f0',
//                   borderRadius: 2,
//                   backgroundColor: '#f7fafc',
//                   width: '100%',
//                   maxWidth: 400
//                 }}
//               >
//                 <CardContent sx={{ p: isMobile ? 2 : 3, '&:last-child': { pb: isMobile ? 2 : 3 } }}>
//                   <Box sx={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between', 
//                     alignItems: 'center'
//                   }}>
//                     <Box sx={{ flex: 1 }}>
//                       <Typography 
//                         variant="h6" 
//                         sx={{ 
//                           color: "#1a365d",
//                           fontWeight: 600,
//                           fontSize: isMobile ? '1rem' : '1.1rem',
//                           wordBreak: 'break-all'
//                         }}
//                       >
//                         {t.supportEmail}
//                       </Typography>
//                     </Box>
//                     <IconButton 
//                       onClick={copyEmailToClipboard}
//                       sx={{ 
//                         color: "#0000FF",
//                         backgroundColor: 'rgba(0, 0, 255, 0.1)',
//                         ml: 1,
//                         '&:hover': {
//                           backgroundColor: 'rgba(0, 0, 255, 0.2)',
//                         }
//                       }}
//                     >
//                       <ContentCopy />
//                     </IconButton>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Box>
//           </DialogContent>
          
//           <DialogActions sx={{ 
//             p: isMobile ? 2 : 3, 
//             pt: 0, 
//             gap: isMobile ? 1.5 : 2, 
//             flexDirection: 'column',
//             flexShrink: 0
//           }}>
//             <Button 
//               onClick={openGmail}
//               variant="contained"
//               sx={{ 
//                 bgcolor: "#0000FF",
//                 "&:hover": { 
//                   bgcolor: "#0000CC",
//                   boxShadow: '0 4px 12px rgba(0, 0, 255, 0.3)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//               startIcon={<Email />}
//             >
//               {t.writeGmail}
//             </Button>
            
//             <Button 
//               onClick={openDefaultEmailClient}
//               variant="outlined"
//               sx={{ 
//                 color: "#0000FF", 
//                 borderColor: "#0000FF",
//                 "&:hover": { 
//                   borderColor: "#0000CC",
//                   backgroundColor: 'rgba(0, 0, 255, 0.04)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//               startIcon={<Mail />}
//             >
//               {t.writeEmailClient}
//             </Button>
            
//             <Button 
//               onClick={copyEmailToClipboard}
//               variant="outlined"
//               sx={{ 
//                 color: "#0000FF", 
//                 borderColor: "#0000FF",
//                 "&:hover": { 
//                   borderColor: "#0000CC",
//                   backgroundColor: 'rgba(0, 0, 255, 0.04)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//               startIcon={<ContentCopy />}
//             >
//               {t.copyEmail}
//             </Button>
            
//             <Button 
//               onClick={handleCloseEmailDialog}
//               variant="outlined"
//               sx={{ 
//                 color: "error.main", 
//                 borderColor: "error.main",
//                 "&:hover": { 
//                   borderColor: "error.dark",
//                   backgroundColor: 'rgba(211, 47, 47, 0.04)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//             >
//               {t.cancel}
//             </Button>
//           </DialogActions>
//         </Box>
//       </Dialog>

//       {/* Snackbar for copy confirmation */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//         sx={{ zIndex: 1700 }}
//       >
//         <Alert 
//           onClose={handleCloseSnackbar} 
//           severity="success"
//           sx={{
//             borderRadius: 2,
//             boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
//         }}
//         >
//           {t.emailCopied}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default memo(UserMenu);




// "use client";

// import React, { useState, useRef, useEffect, useCallback, memo } from "react";
// import dynamic from 'next/dynamic';
// import { useRouter } from "next/navigation";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Collapse,
//   MenuItem,
//   Typography,
//   Box,
//   Divider,
//   Paper,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogContent,
//   CircularProgress,
//   TextField,
//   InputAdornment,
//   DialogTitle,
//   DialogActions,
//   Button,
//   Card,
//   CardContent,
//   useTheme,
//   useMediaQuery
// } from "@mui/material";
// import { Close, ArrowDropDown, Favorite, Calculate, ContentCopy, Email, Mail } from "@mui/icons-material";
// import { logout } from "../store/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

// // Импорт useLanguage из контекста
// import { useLanguage } from "@/app/LanguageContext";

// // Динамические импорты для тяжелых компонентов с предзагрузкой
// const Logo = dynamic(() => import("./Logo"), {
//   loading: () => <div>Загрузка лого...</div>,
//   ssr: false
// });

// const translations = {
//   ua: {
//     sloganLine1: "Оренда житла по всій Україні",
//     sloganLine2: "Без посередників !",
//     profile: "Мій Профіль",
//     myListings: "Мої оголошення",
//     rentOut: "Розмістити оголошення",
//     searchHome: "Пошук житла",
//     language: "Мова",
//     currency: "Валюта",
//     favorites: "Обране",
//     logout: "Вийти",
//     rentalTerms: "Умови оренди",
//     contactSupport: "Зв'язатися з підтримкою",
//     blog: "Блог",
//     loadingRates: "Завантаження курсів...",
//     currencyError: "Не вдалося завантажити курси валют",
//     converter: "Конвертер валют",
//     enterAmount: "Введіть суму",
//     uah: "грн",
//     currentRates: "Поточний курс НБУ",
//     copyEmail: "Скопіювати email",
//     emailCopied: "Email скопійовано в буфер обміну",
//     contactInstructions: "Оберіть спосіб зв'язку з підтримкою",
//     supportEmail: "nadoby.com.ua@gmail.com",
//     writeGmail: "Написати через Gmail",
//     writeEmailClient: "Написати через поштовий клієнт",
//     cancel: "Скасувати",
//   },
//   ru: {
//     sloganLine1: "Аренда жилья по всей Украине",
//     sloganLine2: "Без посредников !",
//     profile: "Мой Профиль",
//     myListings: "Мои объявления",
//     rentOut: "Разместить объявление",
//     searchHome: "Поиск жилья",
//     language: "Язык",
//     currency: "Валюта",
//     favorites: "Избранное",
//     logout: "Выйти",
//     rentalTerms: "Условия аренды",
//     contactSupport: "Связаться с поддержкой",
//     blog: "Блог",
//     loadingRates: "Загрузка курсов...",
//     currencyError: "Не удалось загрузить курсы валют",
//     converter: "Конвертер валют",
//     enterAmount: "Введите сумму",
//     uah: "грн",
//     currentRates: "Текущий курс НБУ",
//     copyEmail: "Скопировать email",
//     emailCopied: "Email скопирован в буфер обмена",
//     contactInstructions: "Выберите способ связи с поддержкой",
//     supportEmail: "nadoby.com.ua@gmail.com",
//     writeGmail: "Написать через Gmail",
//     writeEmailClient: "Написать через почтовый клиент",
//     cancel: "Отмена",
//   }
// };

// // Компонент для быстрых ссылок
// const FastLink = memo(({ href, children, onClick, ...props }) => {
//   const router = useRouter();
  
//   const handleClick = useCallback((e) => {
//     e.preventDefault();
//     if (href) {
//       router.push(href);
//     }
//     onClick?.(e);
//   }, [href, router, onClick]);

//   return (
//     <a 
//       href={href}
//       onClick={handleClick}
//       style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
//       {...props}
//     >
//       {children}
//     </a>
//   );
// });

// FastLink.displayName = "FastLink";

// const UserMenu = () => {
//   const menuRef = useRef(null);
//   const modalRef = useRef(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(true);
//   const [openLanguage, setOpenLanguage] = useState(false);
//   const [openCurrency, setOpenCurrency] = useState(false);
//   const [showEmailDialog, setShowEmailDialog] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
  
//   // Состояния для функционала валют
//   const [exchangeRates, setExchangeRates] = useState(null);
//   const [loadingRates, setLoadingRates] = useState(false);
//   const [currencyError, setCurrencyError] = useState(null);
//   const [converterAmount, setConverterAmount] = useState("");
//   const [converterResult, setConverterResult] = useState({ USD: 0, EUR: 0 });
  
//   // Состояния для данных пользователя
//   const [myListingsCount, setMyListingsCount] = useState(0);
//   const [favoritesCount, setFavoritesCount] = useState(0);

//   // Используем контекст языка вместо временного хука
//   const { currentLanguage, onLanguageToggle } = useLanguage();
//   const t = translations[currentLanguage];
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const profile = useSelector(state => state.auth.profile);
  
//   // Используем MUI Media Query для определения мобильного устройства
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   // Функция для получения курсов валют
//   const fetchExchangeRates = useCallback(async () => {
//     setLoadingRates(true);
//     setCurrencyError(null);
    
//     try {
//       const response = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
//       const usdRate = response.data.find(currency => currency.cc === 'USD');
//       const eurRate = response.data.find(currency => currency.cc === 'EUR');
      
//       setExchangeRates({
//         USD: usdRate ? usdRate.rate.toFixed(2) : 'Н/Д',
//         EUR: eurRate ? eurRate.rate.toFixed(2) : 'Н/Д',
//       });
//     } catch (error) {
//       console.error('Ошибка при получении курсов валют:', error);
//       setCurrencyError(t.currencyError);
//     } finally {
//       setLoadingRates(false);
//     }
//   }, [t.currencyError]);

//   // Функция для конвертации валют
//   const convertCurrency = useCallback((amount) => {
//     if (!exchangeRates || isNaN(amount) || amount <= 0) {
//       setConverterResult({ USD: 0, EUR: 0 });
//       return;
//     }
    
//     const numericAmount = parseFloat(amount);
//     const usdRate = parseFloat(exchangeRates.USD);
//     const eurRate = parseFloat(exchangeRates.EUR);
    
//     if (isNaN(usdRate) || isNaN(eurRate)) {
//       setConverterResult({ USD: 0, EUR: 0 });
//       return;
//     }
    
//     setConverterResult({
//       USD: (numericAmount / usdRate).toFixed(2),
//       EUR: (numericAmount / eurRate).toFixed(2)
//     });
//   }, [exchangeRates]);

//   // Функция для связи с поддержкой
//   const handleContactSupport = useCallback(() => {
//     setShowEmailDialog(true);
//   }, []);

//   // Функция для открытия Gmail с предзаполненным письмом - ИСПРАВЛЕННАЯ
//   const openGmail = useCallback(() => {
//     let userInfo = "Неавторизованный пользователь";
    
//     if (profile) {
//       userInfo = `Пользователь: ${profile.name || 'Имя не указано'}\n` +
//                  `Email: ${profile.email || 'Email не указан'}\n` +
//                  `ID: ${profile._id || 'ID не указан'}\n` +
//                  `Телефон: ${profile.phone || 'Телефон не указан'}`;
//     }

//     const subject = `Поддержка NaDoby.com.ua - ${profile ? profile.name || 'Пользователь' : 'Гость'}`;
//     const body = `Здравствуйте!\n\nМне нужна помощь по поводу:\n\n\n---\nИнформация о пользователе:\n${userInfo}\n---\n\nСообщение отправлено с сайта NaDoby.com.ua.`;

//     const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${t.supportEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
//     // Открываем Gmail в новом окне
//     const newWindow = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    
//     // Закрываем диалог после открытия окна
//     if (newWindow) {
//       // Даем небольшое время для открытия окна
//       setTimeout(() => {
//         setShowEmailDialog(false);
//       }, 300);
//     } else {
//       // Если окно заблокировано, показываем сообщение
//       setTimeout(() => {
//         alert('Пожалуйста, разрешите всплывающие окна для открытия Gmail.');
//         setShowEmailDialog(false);
//       }, 300);
//     }
//   }, [profile, t.supportEmail]);

//   // Функция для открытия почтового клиента по умолчанию - ИСПРАВЛЕННАЯ
//   const openDefaultEmailClient = useCallback(() => {
//     let userInfo = "Неавторизованный пользователь";
    
//     if (profile) {
//       userInfo = `Пользователь: ${profile.name || 'Имя не указано'}\n` +
//                  `Email: ${profile.email || 'Email не указан'}\n` +
//                  `ID: ${profile._id || 'ID не указан'}\n` +
//                  `Телефон: ${profile.phone || 'Телефон не указан'}`;
//     }

//     const subject = `Поддержка NaDoby.com.ua - ${profile ? profile.name || 'Пользователь' : 'Гость'}`;
//     const body = `Здравствуйте!\n\nМне нужна помощь по поводу:\n\n\n---\nИнформация о пользователе:\n${userInfo}\n---\n\nСообщение отправлено с сайта NaDoby.com.ua.`;

//     const mailtoUrl = `mailto:${t.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
//     // Используем window.open с проверкой результата
//     const newWindow = window.open(mailtoUrl, '_blank', 'noopener,noreferrer');
    
//     if (newWindow) {
//       // Если окно открылось успешно
//       setTimeout(() => {
//         setShowEmailDialog(false);
//       }, 500); // Даем больше времени для открытия почтового клиента
//     } else {
//       // Если window.open не сработал, пробуем создать ссылку
//       setTimeout(() => {
//         const link = document.createElement('a');
//         link.href = mailtoUrl;
//         link.target = '_blank';
//         link.rel = 'noopener noreferrer';
        
//         try {
//           // Добавляем на страницу и кликаем
//           document.body.appendChild(link);
//           link.click();
//           document.body.removeChild(link);
          
//           // Закрываем диалог после клика
//           setTimeout(() => {
//             setShowEmailDialog(false);
//           }, 300);
//         } catch (error) {
//           console.error('Ошибка при открытии почтового клиента:', error);
          
//           // Если ничего не работает, показываем сообщение с информацией
//           alert(`Пожалуйста, напишите нам на email: ${t.supportEmail}\n\nТема письма: ${subject}\n\nТекст письма:\n${body}`);
//           setShowEmailDialog(false);
//         }
//       }, 100);
//     }
//   }, [profile, t.supportEmail]);

//   // Функция для копирования email в буфер обмена - ИСПРАВЛЕННАЯ
//   const copyEmailToClipboard = useCallback(() => {
//     navigator.clipboard.writeText(t.supportEmail)
//       .then(() => {
//         // Показываем уведомление об успешном копировании
//         setSnackbarOpen(true);
//         // Закрываем диалог после успешного копирования
//         setTimeout(() => {
//           setShowEmailDialog(false);
//         }, 300);
//       })
//       .catch(err => {
//         console.error('Ошибка при копировании:', err);
//         // Старый метод для поддержки старых браузеров
//         const textArea = document.createElement('textarea');
//         textArea.value = t.supportEmail;
//         document.body.appendChild(textArea);
//         textArea.select();
//         document.execCommand('copy');
//         document.body.removeChild(textArea);
        
//         setSnackbarOpen(true);
//         setTimeout(() => {
//           setShowEmailDialog(false);
//         }, 300);
//       });
//   }, [t.supportEmail]);

//   // Функция для загрузки данных пользователя
//   const fetchUserData = useCallback(async () => {
//     try {
//       if (profile?._id) {
//         // Загрузка количества объявлений
//         const listingsResponse = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/user-apartment-count/${profile._id}`
//         );
//         setMyListingsCount(listingsResponse.data.count);
//       }

//       // Загрузка количества избранных
//       const userProfile = localStorage.getItem('user_profile');
//       if (userProfile) {
//         const profileData = JSON.parse(userProfile);
        
//         const favoritesResponse = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/favorites/count`,
//           { headers: { 'user-id': profileData._id } }
//         );
        
//         if (favoritesResponse.data.success) {
//           setFavoritesCount(favoritesResponse.data.count);
//         }
//       }
//     } catch (error) {
//       console.error('Помилка при завантаженні даних:', error);
//     }
//   }, [profile]);

//   useEffect(() => {
//     fetchUserData();
//   }, [fetchUserData]);

//   // Загружаем курсы валют при открытии меню валют
//   useEffect(() => {
//     if (openCurrency) {
//       fetchExchangeRates();
//     }
//   }, [openCurrency, fetchExchangeRates]);

//   // Обновляем результаты конвертации
//   useEffect(() => {
//     if (converterAmount && !isNaN(parseFloat(converterAmount))) {
//       convertCurrency(converterAmount);
//     }
//   }, [converterAmount, convertCurrency]);

//   // Функция для выхода
//   const handleLogout = useCallback(() => {
//     dispatch(logout());
//     setIsMenuOpen(false);
//   }, [dispatch]);

//   const closeMenu = useCallback(() => {
//     setIsMenuOpen(false);
//     setOpenLanguage(false);
//     setOpenCurrency(false);
//   }, []);

//   const handleLanguageToggle = useCallback((language) => {
//     onLanguageToggle(language);
//     setOpenLanguage(false);
//   }, [onLanguageToggle]);

//   const handleClickOutside = useCallback((e) => {
//     if (
//       menuRef.current && 
//       !menuRef.current.contains(e.target) &&
//       (!modalRef.current || !modalRef.current.contains(e.target))
//     ) {
//       closeMenu();
//       setShowEmailDialog(false);
//     }
//   }, [closeMenu]);

//   useEffect(() => {
//     if (isMenuOpen || showEmailDialog) {
//       document.addEventListener('mousedown', handleClickOutside);
//       return () => document.removeEventListener('mousedown', handleClickOutside);
//     }
//   }, [isMenuOpen, showEmailDialog, handleClickOutside]);

//   const handleCloseSnackbar = useCallback(() => {
//     setSnackbarOpen(false);
//   }, []);

//   const handleCloseEmailDialog = useCallback(() => {
//     setShowEmailDialog(false);
//   }, []);

//   const handleConverterAmountChange = useCallback((e) => {
//     setConverterAmount(e.target.value);
//   }, []);

//   const handleLanguageMenuToggle = useCallback(() => {
//     setOpenLanguage(prev => !prev);
//   }, []);

//   const handleCurrencyMenuToggle = useCallback(() => {
//     setOpenCurrency(prev => !prev);
//   }, []);

//   // Функция для быстрого перехода
//   const handleFastNavigation = useCallback((path) => {
//     router.push(path);
//     setIsMenuOpen(false);
//   }, [router]);

//   if (!isMenuOpen) return null;

//   // Определяем позицию меню: на мобилке слева, на десктопе справа
//   const menuPosition = isMobile ? 'left' : 'right';

//   // Стили для меню в зависимости от позиции
//   const menuStyles = {
//     width: isMobile ? "85%" : 300,
//     maxWidth: 400,
//     height: '100vh',
//     bgcolor: '#ffffff',
//     borderRadius: 0,
//     overflow: 'hidden',
//     display: 'flex',
//     flexDirection: 'column',
//     position: 'fixed',
//     top: 0,
//     zIndex: 1400,
//     boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
//     ...(menuPosition === 'right' 
//       ? {
//           right: 0,
//           animation: 'slideInFromRight 0.3s ease-out',
//           '@keyframes slideInFromRight': {
//             '0%': { transform: 'translateX(100%)' },
//             '100%': { transform: 'translateX(0)' }
//           }
//         }
//       : {
//           left: 0,
//           animation: 'slideInFromLeft 0.3s ease-out',
//           '@keyframes slideInFromLeft': {
//             '0%': { transform: 'translateX(-100%)' },
//             '100%': { transform: 'translateX(0)' }
//           }
//         }
//     )
//   };

//   return (
//     <>
//       {/* Затемненный фон */}
//       {isMenuOpen && (
//         <Box
//           sx={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100vw',
//             height: '100vh',
//             bgcolor: 'rgba(0,0,0,0.5)',
//             backdropFilter: 'blur(3px)',
//             cursor: 'pointer',
//             transition: 'opacity 0.3s ease',
//             zIndex: 1300,
//             animation: 'fadeIn 0.3s ease-out',
//             '@keyframes fadeIn': {
//               '0%': { opacity: 0 },
//               '100%': { opacity: 1 }
//             }
//           }}
//           onClick={closeMenu}
//         />
//       )}

//       {/* Меню - сайдбар */}
//       {isMenuOpen && (
//         <Paper
//           ref={menuRef}
//           sx={menuStyles}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Хедер с логотипом и кнопкой закрытия */}
//           <Box sx={{ 
//             p: 3, 
//             borderBottom: '1px solid #f0f0f0',
//             bgcolor: '#ffffff',
//             flexShrink: 0
//           }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Logo />
//               <IconButton 
//                 onClick={closeMenu}
//                 sx={{ 
//                   color: '#718096',
//                   '&:hover': {
//                     backgroundColor: 'rgba(0,0,0,0.05)'
//                   }
//                 }}
//               >
//                 <Close />
//               </IconButton>
//             </Box>

//             <Box sx={{ mt: 1 }}>
//               <Typography sx={{
//                 color: '#1a365d',
//                 fontSize: isMobile ? '0.9rem' : '0.98rem',
//                 fontWeight: 600,
//               }}>
//                 {t.sloganLine1}
//               </Typography>
//               <Typography sx={{
//                 color: '#e53e3e',
//                 fontSize: isMobile ? '0.85rem' : '0.90rem',
//                 fontWeight: 600,
//                 lineHeight: 1.3,
//                 mt: 0.5,
//                 fontStyle: 'italic'
//               }}>
//                 {t.sloganLine2}
//               </Typography>
//             </Box>
//           </Box>

//           {/* Основное меню с прокруткой */}
//           <Box sx={{ 
//             flex: 1, 
//             overflow: 'auto',
//             py: 0
//           }}>
//             <List sx={{ py: 0, pb: 1 }}>
//               <ListItem 
//                 component={FastLink}
//                 href="/my-profile"
//                 onClick={() => handleFastNavigation("/my-profile")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color:'#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.profile}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <ListItem 
//                 component={FastLink}
//                 href="/my-listings"
//                 onClick={() => handleFastNavigation("/my-listings")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color:'#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={`${t.myListings} (${myListingsCount})`}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <ListItem 
//                 component={FastLink}
//                 href="/add-apartment"
//                 onClick={() => handleFastNavigation("/add-apartment")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color:'#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.rentOut}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <ListItem 
//                 component={FastLink}
//                 href="/"
//                 onClick={() => handleFastNavigation("/")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color:'#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.searchHome}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <ListItem 
//                 component={FastLink}
//                 href="/favorites"
//                 onClick={() => handleFastNavigation("/favorites")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color:'#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Favorite sx={{ mr: 1, fontSize: isMobile ? '18px' : '20px' }} />
//                       {`${t.favorites} (${favoritesCount})`}
//                     </Box>
//                   }
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <Divider sx={{ my: 0.5 }} />

//               <ListItem 
//                 component="div"
//                 onClick={handleLanguageMenuToggle}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color: '#0000FF',
//                   cursor: 'pointer',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.language}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem'
//                   }}
//                 />
//                 <ArrowDropDown sx={{ color: '#0000FF' }} />
//               </ListItem>

//               <Collapse in={openLanguage}>
//                 <Box sx={{ bgcolor: '#f8f9fa' }}>
//                   <MenuItem 
//                     onClick={() => handleLanguageToggle('ua')}
//                     sx={{ 
//                       px: 4, 
//                       py: 1,
//                       color: '#0000FF',
//                       cursor: 'pointer',
//                       fontSize: isMobile ? '0.95rem' : '1rem'
//                     }}
//                   >
//                     UA
//                   </MenuItem>
//                   <MenuItem 
//                     onClick={() => handleLanguageToggle('ru')}
//                     sx={{ 
//                       px: 4, 
//                       py: 1,
//                       color: '#0000FF',
//                       cursor: 'pointer',
//                       fontSize: isMobile ? '0.95rem' : '1rem'
//                     }}
//                   >
//                     RU
//                   </MenuItem>
//                 </Box>
//               </Collapse>

//               <ListItem 
//                 component="div"
//                 onClick={handleCurrencyMenuToggle}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color: '#0000FF',
//                   cursor: 'pointer',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.currency}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem'
//                   }}
//                 />
//                 <ArrowDropDown sx={{ color: '#0000FF' }} />
//               </ListItem>

//               <Collapse in={openCurrency}>
//                 <Box sx={{ bgcolor: '#f8f9fa', px: isMobile ? 1 : 0 }}>
//                   {loadingRates ? (
//                     <MenuItem sx={{ 
//                       px: 4, 
//                       color: "#0000FF", 
//                       display: 'flex', 
//                       justifyContent: 'center',
//                       fontSize: isMobile ? '0.9rem' : '1rem'
//                     }}>
//                       <CircularProgress size={20} sx={{ mr: 1 }} />
//                       {t.loadingRates}
//                     </MenuItem>
//                   ) : currencyError ? (
//                     <MenuItem sx={{ 
//                       px: 4, 
//                       color: "#0000FF",
//                       fontSize: isMobile ? '0.9rem' : '1rem'
//                     }}>
//                       {currencyError}
//                     </MenuItem>
//                   ) : exchangeRates ? (
//                     <>
//                       <MenuItem sx={{ 
//                         px: 4, 
//                         color: "#0000FF", 
//                         fontWeight: 'bold',
//                         fontSize: isMobile ? '0.95rem' : '1rem'
//                       }}>
//                         {t.currentRates}
//                       </MenuItem>
//                       <MenuItem sx={{ 
//                         px: 4, 
//                         color: "#0000FF",
//                         fontSize: isMobile ? '0.9rem' : '1rem'
//                       }}>
//                         USD: {exchangeRates.USD} UAH
//                       </MenuItem>
//                       <MenuItem sx={{ 
//                         px: 4, 
//                         color: "#0000FF",
//                         fontSize: isMobile ? '0.9rem' : '1rem'
//                       }}>
//                         EUR: {exchangeRates.EUR} UAH
//                       </MenuItem>
                      
//                       <Divider sx={{ my: 0.5 }} />
                      
//                       <MenuItem sx={{ 
//                         px: 4, 
//                         color: "#0000FF", 
//                         fontWeight: 'bold',
//                         fontSize: isMobile ? '0.95rem' : '1rem'
//                       }}>
//                         <Calculate sx={{ mr: 1, fontSize: isMobile ? '1rem' : '1.2rem' }} />
//                         {t.converter}
//                       </MenuItem>
                      
//                       <Box sx={{ px: 4, py: 1 }}>
//                         <TextField
//                           type="number"
//                           value={converterAmount}
//                           onChange={handleConverterAmountChange}
//                           label={t.enterAmount}
//                           variant="outlined"
//                           size="small"
//                           fullWidth
//                           InputProps={{
//                             endAdornment: <InputAdornment position="end">{t.uah}</InputAdornment>,
//                             sx: { fontSize: isMobile ? '0.9rem' : '1rem' }
//                           }}
//                           sx={{
//                             '& .MuiInputLabel-root': {
//                               fontSize: isMobile ? '0.9rem' : '1rem'
//                             }
//                           }}
//                         />
                        
//                         {converterAmount && parseFloat(converterAmount) > 0 && (
//                           <Box sx={{ mt: 1 }}>
//                             <Typography variant="body2" sx={{ 
//                               color: "#0000FF",
//                               fontSize: isMobile ? '0.9rem' : '1rem'
//                             }}>
//                               USD: {converterResult.USD}
//                             </Typography>
//                             <Typography variant="body2" sx={{ 
//                               color: "#0000FF",
//                               fontSize: isMobile ? '0.9rem' : '1rem'
//                             }}>
//                               EUR: {converterResult.EUR}
//                             </Typography>
//                           </Box>
//                         )}
//                       </Box>
//                     </>
//                   ) : null}
//                 </Box>
//               </Collapse>

//               <Divider sx={{ my: 0.5 }} />

//               <ListItem
//                 component={FastLink}
//                 href="/rental-terms"
//                 onClick={() => handleFastNavigation("/rental-terms")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color: '#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.rentalTerms}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <ListItem
//                 component={FastLink}
//                 href="/blog"
//                 onClick={() => handleFastNavigation("/blog")}
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color: '#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.blog}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem',
//                     color: '#0000FF'
//                   }}
//                 />
//               </ListItem>

//               <ListItem
//                 onClick={handleContactSupport}
//                 component="div"
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color: '#0000FF',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.contactSupport}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem'
//                   }}
//                 />
//               </ListItem>

//               <ListItem
//                 onClick={handleLogout}
//                 component="div"
//                 sx={{ 
//                   px: 3, 
//                   py: 1,
//                   color: 'error.main',
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   '&:hover': {
//                     backgroundColor: 'rgba(211, 47, 47, 0.08)'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={t.logout}
//                   primaryTypographyProps={{ 
//                     fontWeight: 500,
//                     fontSize: isMobile ? '0.95rem' : '1rem'
//                   }}
//                 />
//               </ListItem>
//             </List>
//           </Box>
//         </Paper>
//       )}

//       {/* Email Support Dialog */}
//       <Dialog
//         open={showEmailDialog}
//         onClose={handleCloseEmailDialog}
//         maxWidth="sm"
//         fullWidth
//         fullScreen={isMobile}
//         PaperProps={{
//           sx: {
//             borderRadius: isMobile ? 0 : 2,
//             boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
//             m: isMobile ? 0 : 2,
//             height: isMobile ? '100%' : 'auto',
//             maxHeight: isMobile ? '100%' : '90vh',
//             display: 'flex',
//             flexDirection: 'column',
//             position: 'fixed',
//             zIndex: 1600,
//             top: isMobile ? 0 : '50%',
//             left: isMobile ? 0 : '50%',
//             transform: isMobile ? 'none' : 'translate(-50%, -50%)'
//           }
//         }}
//         sx={{
//           zIndex: 1600,
//         }}
//       >
//         <Box sx={{ 
//           display: 'flex', 
//           flexDirection: 'column',
//           height: '100%',
//           overflow: 'hidden'
//         }}>
//           <DialogTitle 
//             sx={{ 
//               color: "#1a365d", 
//               display: 'flex', 
//               alignItems: 'center',
//               fontSize: isMobile ? '1.1rem' : '1.25rem',
//               fontWeight: 600,
//               pb: 1,
//               flexShrink: 0
//             }}
//           >
//             <Mail sx={{ mr: 2, color: "#0000FF" }} />
//             {t.contactSupport}
//           </DialogTitle>
          
//           <DialogContent sx={{ 
//             pb: 2, 
//             flex: 1,
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             overflow: 'auto'
//           }}>
//             <Box sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: '100%',
//               gap: 3
//             }}>
//               <Typography 
//                 variant="body1" 
//                 sx={{ 
//                   color: '#718096',
//                   textAlign: 'center',
//                   fontSize: isMobile ? '0.9rem' : '1rem',
//                   px: isMobile ? 1 : 0
//                 }}
//               >
//                 {t.contactInstructions}
//               </Typography>
              
//               <Card 
//                 variant="outlined"
//                 sx={{
//                   border: '2px solid #e2e8f0',
//                   borderRadius: 2,
//                   backgroundColor: '#f7fafc',
//                   width: '100%',
//                   maxWidth: 400
//                 }}
//               >
//                 <CardContent sx={{ p: isMobile ? 2 : 3, '&:last-child': { pb: isMobile ? 2 : 3 } }}>
//                   <Box sx={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between', 
//                     alignItems: 'center'
//                   }}>
//                     <Box sx={{ flex: 1 }}>
//                       <Typography 
//                         variant="h6" 
//                         sx={{ 
//                           color: "#1a365d",
//                           fontWeight: 600,
//                           fontSize: isMobile ? '1rem' : '1.1rem',
//                           wordBreak: 'break-all'
//                         }}
//                       >
//                         {t.supportEmail}
//                       </Typography>
//                     </Box>
//                     <IconButton 
//                       onClick={copyEmailToClipboard}
//                       sx={{ 
//                         color: "#0000FF",
//                         backgroundColor: 'rgba(0, 0, 255, 0.1)',
//                         ml: 1,
//                         '&:hover': {
//                           backgroundColor: 'rgba(0, 0, 255, 0.2)',
//                         }
//                       }}
//                     >
//                       <ContentCopy />
//                     </IconButton>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Box>
//           </DialogContent>
          
//           <DialogActions sx={{ 
//             p: isMobile ? 2 : 3, 
//             pt: 0, 
//             gap: isMobile ? 1.5 : 2, 
//             flexDirection: 'column',
//             flexShrink: 0
//           }}>
//             <Button 
//               onClick={openGmail}
//               variant="contained"
//               sx={{ 
//                 bgcolor: "#0000FF",
//                 "&:hover": { 
//                   bgcolor: "#0000CC",
//                   boxShadow: '0 4px 12px rgba(0, 0, 255, 0.3)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//               startIcon={<Email />}
//             >
//               {t.writeGmail}
//             </Button>
            
//             <Button 
//               onClick={openDefaultEmailClient}
//               variant="outlined"
//               sx={{ 
//                 color: "#0000FF", 
//                 borderColor: "#0000FF",
//                 "&:hover": { 
//                   borderColor: "#0000CC",
//                   backgroundColor: 'rgba(0, 0, 255, 0.04)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//               startIcon={<Mail />}
//             >
//               {t.writeEmailClient}
//             </Button>
            
//             <Button 
//               onClick={copyEmailToClipboard}
//               variant="outlined"
//               sx={{ 
//                 color: "#0000FF", 
//                 borderColor: "#0000FF",
//                 "&:hover": { 
//                   borderColor: "#0000CC",
//                   backgroundColor: 'rgba(0, 0, 255, 0.04)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//               startIcon={<ContentCopy />}
//             >
//               {t.copyEmail}
//             </Button>
            
//             <Button 
//               onClick={handleCloseEmailDialog}
//               variant="outlined"
//               sx={{ 
//                 color: "error.main", 
//                 borderColor: "error.main",
//                 "&:hover": { 
//                   borderColor: "error.dark",
//                   backgroundColor: 'rgba(211, 47, 47, 0.04)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//             >
//               {t.cancel}
//             </Button>
//           </DialogActions>
//         </Box>
//       </Dialog>

//       {/* Snackbar for copy confirmation */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//         sx={{ zIndex: 1700 }}
//       >
//         <Alert 
//           onClose={handleCloseSnackbar} 
//           severity="success"
//           sx={{
//             borderRadius: 2,
//             boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
//         }}
//         >
//           {t.emailCopied}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default memo(UserMenu);



"use client";

import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  MenuItem,
  Typography,
  Box,
  Divider,
  Paper,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  CircularProgress,
  TextField,
  InputAdornment,
  DialogTitle,
  DialogActions,
  Button,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { Close, ArrowDropDown, Favorite, Calculate, ContentCopy, Email, Mail } from "@mui/icons-material";
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// Импорт useLanguage из контекста
import { useLanguage } from "@/app/LanguageContext";

// Динамические импорты для тяжелых компонентов с предзагрузкой
const Logo = dynamic(() => import("./Logo"), {
  loading: () => <div>Загрузка лого...</div>,
  ssr: false
});

const translations = {
  ua: {
    sloganLine1: "Оренда житла по всій Україні",
    sloganLine2: "Без посередників !",
    profile: "Мій Профіль",
    myListings: "Мої оголошення",
    rentOut: "Розмістити оголошення безкоштовно",
    searchHome: "Пошук житла",
    language: "Мова",
    currency: "Валюта",
    favorites: "Обране",
    logout: "Вийти",
    rentalTerms: "Умови оренди",
    contactSupport: "Зв'язатися з підтримкою",
    blog: "Блог",
    loadingRates: "Завантаження курсів...",
    currencyError: "Не вдалося завантажити курси валют",
    converter: "Конвертер валют",
    enterAmount: "Введіть суму",
    uah: "грн",
    currentRates: "Поточний курс НБУ",
    copyEmail: "Скопіювати email",
    emailCopied: "Email скопійовано в буфер обміну",
    contactInstructions: "Оберіть спосіб зв'язку з підтримкою",
    supportEmail: "nadoby.com.ua@gmail.com",
    writeGmail: "Написати через Gmail",
    writeEmailClient: "Написати через поштовий клієнт",
    cancel: "Скасувати",
  },
  ru: {
    sloganLine1: "Аренда жилья по всей Украине",
    sloganLine2: "Без посредников !",
    profile: "Мой Профиль",
    myListings: "Мои объявления",
    rentOut: "Разместить объявление бесплатно",
    searchHome: "Поиск жилья",
    language: "Язык",
    currency: "Валюта",
    favorites: "Избранное",
    logout: "Выйти",
    rentalTerms: "Условия аренды",
    contactSupport: "Связаться с поддержкой",
    blog: "Блог",
    loadingRates: "Загрузка курсов...",
    currencyError: "Не удалось загрузить курсы валют",
    converter: "Конвертер валют",
    enterAmount: "Введите сумму",
    uah: "грн",
    currentRates: "Текущий курс НБУ",
    copyEmail: "Скопировать email",
    emailCopied: "Email скопирован в буфер обмена",
    contactInstructions: "Выберите способ связи с поддержкой",
    supportEmail: "nadoby.com.ua@gmail.com",
    writeGmail: "Написать через Gmail",
    writeEmailClient: "Написать через почтовый клиент",
    cancel: "Отмена",
  }
};

// Компонент для быстрых ссылок
const FastLink = memo(({ href, children, onClick, ...props }) => {
  const router = useRouter();
  
  const handleClick = useCallback((e) => {
    e.preventDefault();
    if (href) {
      router.push(href);
    }
    onClick?.(e);
  }, [href, router, onClick]);

  return (
    <a 
      href={href}
      onClick={handleClick}
      style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
      {...props}
    >
      {children}
    </a>
  );
});

FastLink.displayName = "FastLink";

const UserMenu = () => {
  const menuRef = useRef(null);
  const modalRef = useRef(null);
  const emailDialogRef = useRef(null); // Добавляем ref для email диалога
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openCurrency, setOpenCurrency] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  // Состояния для функционала валют
  const [exchangeRates, setExchangeRates] = useState(null);
  const [loadingRates, setLoadingRates] = useState(false);
  const [currencyError, setCurrencyError] = useState(null);
  const [converterAmount, setConverterAmount] = useState("");
  const [converterResult, setConverterResult] = useState({ USD: 0, EUR: 0 });
  
  // Состояния для данных пользователя
  const [myListingsCount, setMyListingsCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);

  // Используем контекст языка вместо временного хука
  const { currentLanguage, onLanguageToggle } = useLanguage();
  const t = translations[currentLanguage];
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector(state => state.auth.profile);
  
  // Используем MUI Media Query для определения мобильного устройства
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Функция для получения курсов валют
  const fetchExchangeRates = useCallback(async () => {
    setLoadingRates(true);
    setCurrencyError(null);
    
    try {
      const response = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
      const usdRate = response.data.find(currency => currency.cc === 'USD');
      const eurRate = response.data.find(currency => currency.cc === 'EUR');
      
      setExchangeRates({
        USD: usdRate ? usdRate.rate.toFixed(2) : 'Н/Д',
        EUR: eurRate ? eurRate.rate.toFixed(2) : 'Н/Д',
      });
    } catch (error) {
      console.error('Ошибка при получении курсов валют:', error);
      setCurrencyError(t.currencyError);
    } finally {
      setLoadingRates(false);
    }
  }, [t.currencyError]);

  // Функция для конвертации валют
  const convertCurrency = useCallback((amount) => {
    if (!exchangeRates || isNaN(amount) || amount <= 0) {
      setConverterResult({ USD: 0, EUR: 0 });
      return;
    }
    
    const numericAmount = parseFloat(amount);
    const usdRate = parseFloat(exchangeRates.USD);
    const eurRate = parseFloat(exchangeRates.EUR);
    
    if (isNaN(usdRate) || isNaN(eurRate)) {
      setConverterResult({ USD: 0, EUR: 0 });
      return;
    }
    
    setConverterResult({
      USD: (numericAmount / usdRate).toFixed(2),
      EUR: (numericAmount / eurRate).toFixed(2)
    });
  }, [exchangeRates]);

  // Функция для связи с поддержкой - ИСПРАВЛЕНО: добавлен e.stopPropagation()
  const handleContactSupport = useCallback((e) => {
    e.stopPropagation(); // Останавливаем всплытие события
    setShowEmailDialog(true);
  }, []);

  // Функция для открытия Gmail с предзаполненным письмом
  const openGmail = useCallback(() => {
    let userInfo = "Неавторизованный пользователь";
    
    if (profile) {
      userInfo = `Пользователь: ${profile.name || 'Имя не указано'}\n` +
                 `Email: ${profile.email || 'Email не указан'}\n` +
                 `ID: ${profile._id || 'ID не указан'}\n` +
                 `Телефон: ${profile.phone || 'Телефон не указан'}`;
    }

    const subject = `Поддержка NaDoby.com.ua - ${profile ? profile.name || 'Пользователь' : 'Гость'}`;
    const body = `Здравствуйте!\n\nМне нужна помощь по поводу:\n\n\n---\nИнформация о пользователе:\n${userInfo}\n---\n\nСообщение отправлено с сайта NaDoby.com.ua.`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${t.supportEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Открываем Gmail в новом окне
    const newWindow = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    
    // Закрываем диалог после открытия окна
    if (newWindow) {
      // Даем небольшое время для открытия окна
      setTimeout(() => {
        setShowEmailDialog(false);
      }, 300);
    } else {
      // Если окно заблокировано, показываем сообщение
      setTimeout(() => {
        alert('Пожалуйста, разрешите всплывающие окна для открытия Gmail.');
        setShowEmailDialog(false);
      }, 300);
    }
  }, [profile, t.supportEmail]);

  // Функция для открытия почтового клиента по умолчанию
  const openDefaultEmailClient = useCallback(() => {
    let userInfo = "Неавторизованный пользователь";
    
    if (profile) {
      userInfo = `Пользователь: ${profile.name || 'Имя не указано'}\n` +
                 `Email: ${profile.email || 'Email не указан'}\n` +
                 `ID: ${profile._id || 'ID не указан'}\n` +
                 `Телефон: ${profile.phone || 'Телефон не указан'}`;
    }

    const subject = `Поддержка NaDoby.com.ua - ${profile ? profile.name || 'Пользователь' : 'Гость'}`;
    const body = `Здравствуйте!\n\nМне нужна помощь по поводу:\n\n\n---\nИнформация о пользователе:\n${userInfo}\n---\n\nСообщение отправлено с сайта NaDoby.com.ua.`;

    const mailtoUrl = `mailto:${t.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Используем window.open с проверкой результата
    const newWindow = window.open(mailtoUrl, '_blank', 'noopener,noreferrer');
    
    if (newWindow) {
      // Если окно открылось успешно
      setTimeout(() => {
        setShowEmailDialog(false);
      }, 500); // Даем больше времени для открытия почтового клиента
    } else {
      // Если window.open не сработал, пробуем создать ссылку
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = mailtoUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        try {
          // Добавляем на страницу и кликаем
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Закрываем диалог после клика
          setTimeout(() => {
            setShowEmailDialog(false);
          }, 300);
        } catch (error) {
          console.error('Ошибка при открытии почтового клиента:', error);
          
          // Если ничего не работает, показываем сообщение с информацией
          alert(`Пожалуйста, напишите нам на email: ${t.supportEmail}\n\nТема письма: ${subject}\n\nТекст письма:\n${body}`);
          setShowEmailDialog(false);
        }
      }, 100);
    }
  }, [profile, t.supportEmail]);

  // Функция для копирования email в буфер обмена
  const copyEmailToClipboard = useCallback(() => {
    navigator.clipboard.writeText(t.supportEmail)
      .then(() => {
        // Показываем уведомление об успешном копировании
        setSnackbarOpen(true);
        // Закрываем диалог после успешного копирования
        setTimeout(() => {
          setShowEmailDialog(false);
        }, 300);
      })
      .catch(err => {
        console.error('Ошибка при копировании:', err);
        // Старый метод для поддержки старых браузеров
        const textArea = document.createElement('textarea');
        textArea.value = t.supportEmail;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        setSnackbarOpen(true);
        setTimeout(() => {
          setShowEmailDialog(false);
        }, 300);
      });
  }, [t.supportEmail]);

  // Функция для загрузки данных пользователя
  const fetchUserData = useCallback(async () => {
    try {
      if (profile?._id) {
        // Загрузка количества объявлений
        const listingsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/user-apartment-count/${profile._id}`
        );
        setMyListingsCount(listingsResponse.data.count);
      }

      // Загрузка количества избранных
      const userProfile = localStorage.getItem('user_profile');
      if (userProfile) {
        const profileData = JSON.parse(userProfile);
        
        const favoritesResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/favorites/count`,
          { headers: { 'user-id': profileData._id } }
        );
        
        if (favoritesResponse.data.success) {
          setFavoritesCount(favoritesResponse.data.count);
        }
      }
    } catch (error) {
      console.error('Помилка при завантаженні даних:', error);
    }
  }, [profile]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Загружаем курсы валют при открытии меню валют
  useEffect(() => {
    if (openCurrency) {
      fetchExchangeRates();
    }
  }, [openCurrency, fetchExchangeRates]);

    // Предзагрузка страниц при открытии меню (для авторизованных)
    useEffect(() => {
      if (isMenuOpen) {
        const pagesToPrefetch = [
          '/my-profile',
          '/my-listings',
          '/add-apartment',
          '/kyiv-apartments',
          '/favorites',
          '/rental-terms',
          '/blog'
        ];
        pagesToPrefetch.forEach(page => {
          router.prefetch(page);
        });
      }
    }, [isMenuOpen, router]);

  // Обновляем результаты конвертации
  useEffect(() => {
    if (converterAmount && !isNaN(parseFloat(converterAmount))) {
      convertCurrency(converterAmount);
    }
  }, [converterAmount, convertCurrency]);

  // Функция для выхода
  const handleLogout = useCallback(() => {
    dispatch(logout());
    setIsMenuOpen(false);
  }, [dispatch]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setOpenLanguage(false);
    setOpenCurrency(false);
  }, []);

  const handleLanguageToggle = useCallback((language) => {
    onLanguageToggle(language);
    setOpenLanguage(false);
  }, [onLanguageToggle]);

  // ИСПРАВЛЕНО: Улучшенная обработка кликов вне меню
  const handleClickOutside = useCallback((e) => {
    // Проверяем, что клик был вне меню
    const isOutsideMenu = menuRef.current && !menuRef.current.contains(e.target);
    
    // Проверяем, что клик был вне модального окна авторизации
    const isOutsideAuthModal = modalRef.current && !modalRef.current.contains(e.target);
    
    // Проверяем, что клик был вне email диалога
    const isOutsideEmailDialog = emailDialogRef.current && !emailDialogRef.current.contains(e.target);
    
    // Закрываем меню только если клик был вне ВСЕХ открытых элементов
    if (isOutsideMenu && isOutsideAuthModal && isOutsideEmailDialog) {
      closeMenu();
      setShowEmailDialog(false);
    }
  }, [closeMenu]);

  useEffect(() => {
    if (isMenuOpen || showEmailDialog) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen, showEmailDialog, handleClickOutside]);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  const handleCloseEmailDialog = useCallback(() => {
    setShowEmailDialog(false);
  }, []);

  const handleConverterAmountChange = useCallback((e) => {
    setConverterAmount(e.target.value);
  }, []);

  const handleLanguageMenuToggle = useCallback(() => {
    setOpenLanguage(prev => !prev);
  }, []);

  const handleCurrencyMenuToggle = useCallback(() => {
    setOpenCurrency(prev => !prev);
  }, []);

  // Функция для быстрого перехода
  const handleFastNavigation = useCallback((path) => {
    router.push(path);
    setIsMenuOpen(false);
  }, [router]);

  if (!isMenuOpen && !showEmailDialog) return null;

  // Определяем позицию меню: на мобилке слева, на десктопе справа
  const menuPosition = isMobile ? 'left' : 'right';

  // Стили для меню в зависимости от позиции
  const menuStyles = {
    width: isMobile ? "85%" : 300,
    maxWidth: 400,
    height: '100vh',
    bgcolor: '#ffffff',
    borderRadius: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    zIndex: 1400,
    boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
    ...(menuPosition === 'right' 
      ? {
          right: 0,
          animation: 'slideInFromRight 0.3s ease-out',
          '@keyframes slideInFromRight': {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(0)' }
          }
        }
      : {
          left: 0,
          animation: 'slideInFromLeft 0.3s ease-out',
          '@keyframes slideInFromLeft': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(0)' }
          }
        }
    )
  };

  return (
    <>
      {/* Затемненный фон */}
      {(isMenuOpen || showEmailDialog) && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            bgcolor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(3px)',
            cursor: 'pointer',
            transition: 'opacity 0.3s ease',
            zIndex: 1300,
            animation: 'fadeIn 0.3s ease-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 }
            }
          }}
          onClick={closeMenu}
        />
      )}

      {/* Меню - сайдбар */}
      {isMenuOpen && (
        <Paper
          ref={menuRef}
          sx={menuStyles}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Хедер с логотипом и кнопкой закрытия */}
          <Box sx={{ 
            p: 3, 
            borderBottom: '1px solid #f0f0f0',
            bgcolor: '#ffffff',
            flexShrink: 0
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Logo />
              <IconButton 
                onClick={closeMenu}
                sx={{ 
                  color: '#718096',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.05)'
                  }
                }}
              >
                <Close />
              </IconButton>
            </Box>

            <Box sx={{ mt: 1 }}>
              <Typography sx={{
                color: '#1a365d',
                fontSize: isMobile ? '0.9rem' : '0.98rem',
                fontWeight: 600,
              }}>
                {t.sloganLine1}
              </Typography>
              <Typography sx={{
                color: '#e53e3e',
                fontSize: isMobile ? '0.85rem' : '0.90rem',
                fontWeight: 600,
                lineHeight: 1.3,
                mt: 0.5,
                fontStyle: 'italic'
              }}>
                {t.sloganLine2}
              </Typography>
            </Box>
          </Box>

          {/* Основное меню с прокруткой */}
          <Box sx={{ 
            flex: 1, 
            overflow: 'auto',
            py: 0
          }}>
            <List sx={{ py: 0, pb: 1 }}>
              <ListItem 
                component={FastLink}
                href="/my-profile"
                onClick={() => handleFastNavigation("/my-profile")}
                sx={{ 
                  px: 3, 
                  py: 1,
                  color:'#0000FF',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <ListItemText 
                  primary={t.profile}
                  primaryTypographyProps={{ 
                    fontWeight: 500,
                    fontSize: isMobile ? '0.95rem' : '1rem',
                    color: '#0000FF'
                  }}
                />
              </ListItem>

              <ListItem 
                component={FastLink}
                href="/my-listings"
                onClick={() => handleFastNavigation("/my-listings")}
                sx={{ 
                  px: 3, 
                  py: 1,
                  color:'#0000FF',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <ListItemText 
                  primary={`${t.myListings} (${myListingsCount})`}
                  primaryTypographyProps={{ 
                    fontWeight: 500,
                    fontSize: isMobile ? '0.95rem' : '1rem',
                    color: '#0000FF'
                  }}
                />
              </ListItem>

              <ListItem 
                component={FastLink}
                href="/add-apartment"
                onClick={() => handleFastNavigation("/add-apartment")}
                sx={{ 
                  px: 3, 
                  py: 1,
                  color:'#0000FF',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <ListItemText 
                  primary={t.rentOut}
                  primaryTypographyProps={{ 
                    fontWeight: 500,
                    fontSize: isMobile ? '0.95rem' : '1rem',
                    color: '#0000FF'
                  }}
                />
              </ListItem>

              <ListItem 
                component={FastLink}
                href="/kyiv-apartments"
                onClick={() => handleFastNavigation("/kyiv-apartments")}
                sx={{ 
                  px: 3, 
                  py: 1,
                  color:'#0000FF',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <ListItemText 
                  primary={t.searchHome}
                  primaryTypographyProps={{ 
                    fontWeight: 500,
                    fontSize: isMobile ? '0.95rem' : '1rem',
                    color: '#0000FF'
                  }}
                />
              </ListItem>

              <ListItem 
                component={FastLink}
                href="/favorites"
                onClick={() => handleFastNavigation("/favorites")}
                sx={{ 
                  px: 3, 
                  py: 1,
                  color:'#0000FF',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <ListItemText 
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Favorite sx={{ mr: 1, fontSize: isMobile ? '18px' : '20px' }} />
                      {`${t.favorites} (${favoritesCount})`}
                    </Box>
                  }
                  primaryTypographyProps={{ 
                    fontWeight: 500,
                    fontSize: isMobile ? '0.95rem' : '1rem',
                    color: '#0000FF'
                  }}
                />
              </ListItem>

              <Divider sx={{ my: 0.5 }} />

              <ListItem 
                component="div"
                onClick={handleLanguageMenuToggle}
                sx={{ 
                  px: 3, 
                  py: 1,
                  color: '#0000FF',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <ListItemText 
                  primary={t.language}
                  primaryTypographyProps={{ 
                    fontWeight: 500,
                    fontSize: isMobile ? '0.95rem' : '1rem'
                  }}
                />
                <ArrowDropDown sx={{ color: '#0000FF' }} />
              </ListItem>

              <Collapse in={openLanguage}>
                <Box sx={{ bgcolor: '#f8f9fa' }}>
                  <MenuItem 
                    onClick={() => handleLanguageToggle('ua')}
                    sx={{ 
                      px: 4, 
                      py: 1,
                      color: '#0000FF',
                      cursor: 'pointer',
                      fontSize: isMobile ? '0.95rem' : '1rem'
                    }}
                  >
                    UA
                  </MenuItem>
                  <MenuItem 
                    onClick={() => handleLanguageToggle('ru')}
                    sx={{ 
                      px: 4, 
                      py: 1,
                      color: '#0000FF',
                      cursor: 'pointer',
                      fontSize: isMobile ? '0.95rem' : '1rem'
                    }}
                  >
                    RU
                  </MenuItem>
                </Box>
              </Collapse>

              <ListItem 
                component="div"
                onClick={handleCurrencyMenuToggle}
                sx={{ 
                  px: 3, 
                  py: 1,
                  color: '#0000FF',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <ListItemText 
                  primary={t.currency}
                  primaryTypographyProps={{ 
                    fontWeight: 500,
                    fontSize: isMobile ? '0.95rem' : '1rem'
                  }}
                />
                <ArrowDropDown sx={{ color: '#0000FF' }} />
              </ListItem>

              <Collapse in={openCurrency}>
                <Box sx={{ bgcolor: '#f8f9fa', px: isMobile ? 1 : 0 }}>
                  {loadingRates ? (
                    <MenuItem sx={{ 
                      px: 4, 
                      color: "#0000FF", 
                      display: 'flex', 
                      justifyContent: 'center',
                      fontSize: isMobile ? '0.9rem' : '1rem'
                    }}>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      {t.loadingRates}
                    </MenuItem>
                  ) : currencyError ? (
                    <MenuItem sx={{ 
                      px: 4, 
                      color: "#0000FF",
                      fontSize: isMobile ? '0.9rem' : '1rem'
                    }}>
                      {currencyError}
                    </MenuItem>
                  ) : exchangeRates ? (
                    <>
                      <MenuItem sx={{ 
                        px: 4, 
                        color: "#0000FF", 
                        fontWeight: 'bold',
                        fontSize: isMobile ? '0.95rem' : '1rem'
                      }}>
                        {t.currentRates}
                      </MenuItem>
                      <MenuItem sx={{ 
                        px: 4, 
                        color: "#0000FF",
                        fontSize: isMobile ? '0.9rem' : '1rem'
                      }}>
                        USD: {exchangeRates.USD} UAH
                      </MenuItem>
                      <MenuItem sx={{ 
                        px: 4, 
                        color: "#0000FF",
                        fontSize: isMobile ? '0.9rem' : '1rem'
                      }}>
                        EUR: {exchangeRates.EUR} UAH
                      </MenuItem>
                      
                      <Divider sx={{ my: 0.5 }} />
                      
                      <MenuItem sx={{ 
                        px: 4, 
                        color: "#0000FF", 
                        fontWeight: 'bold',
                        fontSize: isMobile ? '0.95rem' : '1rem'
                      }}>
                        <Calculate sx={{ mr: 1, fontSize: isMobile ? '1rem' : '1.2rem' }} />
                        {t.converter}
                      </MenuItem>
                      
                      <Box sx={{ px: 4, py: 1 }}>
                        <TextField
                          type="number"
                          value={converterAmount}
                          onChange={handleConverterAmountChange}
                          label={t.enterAmount}
                          variant="outlined"
                          size="small"
                          fullWidth
                          InputProps={{
                            endAdornment: <InputAdornment position="end">{t.uah}</InputAdornment>,
                            sx: { fontSize: isMobile ? '0.9rem' : '1rem' }
                          }}
                          sx={{
                            '& .MuiInputLabel-root': {
                              fontSize: isMobile ? '0.9rem' : '1rem'
                            }
                          }}
                        />
                        
                        {converterAmount && parseFloat(converterAmount) > 0 && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" sx={{ 
                              color: "#0000FF",
                              fontSize: isMobile ? '0.9rem' : '1rem'
                            }}>
                              USD: {converterResult.USD}
                            </Typography>
                            <Typography variant="body2" sx={{ 
                              color: "#0000FF",
                              fontSize: isMobile ? '0.9rem' : '1rem'
                            }}>
                              EUR: {converterResult.EUR}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </>
                  ) : null}
                </Box>
              </Collapse>

              <Divider sx={{ my: 0.5 }} />

              <ListItem
                component={FastLink}
                href="/rental-terms"
                onClick={() => handleFastNavigation("/rental-terms")}
                sx={{ 
                  px: 3, 
                  py: 1,
                  color: '#0000FF',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <ListItemText 
                  primary={t.rentalTerms}
                  primaryTypographyProps={{ 
                    fontWeight: 500,
                    fontSize: isMobile ? '0.95rem' : '1rem',
                    color: '#0000FF'
                  }}
                />
              </ListItem>

              <ListItem
                component={FastLink}
                href="/blog"
                onClick={() => handleFastNavigation("/blog")}
                sx={{ 
                  px: 3, 
                  py: 1,
                  color: '#0000FF',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <ListItemText 
                  primary={t.blog}
                  primaryTypographyProps={{ 
                    fontWeight: 500,
                    fontSize: isMobile ? '0.95rem' : '1rem',
                    color: '#0000FF'
                  }}
                />
              </ListItem>

              {/* Контакт с поддержкой - ИСПРАВЛЕНО: добавлен e.stopPropagation() */}
              <ListItem
                onClick={handleContactSupport}
                component="div"
                sx={{ 
                  px: 3, 
                  py: 1,
                  color: '#0000FF',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <ListItemText 
                  primary={t.contactSupport}
                  primaryTypographyProps={{ 
                    fontWeight: 500,
                    fontSize: isMobile ? '0.95rem' : '1rem'
                  }}
                />
              </ListItem>

              <ListItem
                onClick={handleLogout}
                component="div"
                sx={{ 
                  px: 3, 
                  py: 1,
                  color: 'error.main',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(211, 47, 47, 0.08)'
                  }
                }}
              >
                <ListItemText 
                  primary={t.logout}
                  primaryTypographyProps={{ 
                    fontWeight: 500,
                    fontSize: isMobile ? '0.95rem' : '1rem'
                  }}
                />
              </ListItem>
            </List>
          </Box>
        </Paper>
      )}

      {/* Email Support Dialog - ИСПРАВЛЕНО: добавлен ref и обработчик кликов */}
      <Dialog
        open={showEmailDialog}
        onClose={handleCloseEmailDialog}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            m: isMobile ? 0 : 2,
            height: isMobile ? '100%' : 'auto',
            maxHeight: isMobile ? '100%' : '90vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            zIndex: 1600,
            top: isMobile ? 0 : '50%',
            left: isMobile ? 0 : '50%',
            transform: isMobile ? 'none' : 'translate(-50%, -50%)'
          }
        }}
        sx={{
          zIndex: 1600,
        }}
        onClick={(e) => e.stopPropagation()} // Предотвращаем всплытие
      >
        <Box 
          ref={emailDialogRef} // Добавляем ref для отслеживания кликов
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <DialogTitle 
            sx={{ 
              color: "#1a365d", 
              display: 'flex', 
              alignItems: 'center',
              fontSize: isMobile ? '1.1rem' : '1.25rem',
              fontWeight: 600,
              pb: 1,
              flexShrink: 0
            }}
          >
            <Mail sx={{ mr: 2, color: "#0000FF" }} />
            {t.contactSupport}
          </DialogTitle>
          
          <DialogContent sx={{ 
            pb: 2, 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'auto'
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              gap: 3
            }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#718096',
                  textAlign: 'center',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  px: isMobile ? 1 : 0
                }}
              >
                {t.contactInstructions}
              </Typography>
              
              <Card 
                variant="outlined"
                sx={{
                  border: '2px solid #e2e8f0',
                  borderRadius: 2,
                  backgroundColor: '#f7fafc',
                  width: '100%',
                  maxWidth: 400
                }}
              >
                <CardContent sx={{ p: isMobile ? 2 : 3, '&:last-child': { pb: isMobile ? 2 : 3 } }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'
                  }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: "#1a365d",
                          fontWeight: 600,
                          fontSize: isMobile ? '1rem' : '1.1rem',
                          wordBreak: 'break-all'
                        }}
                      >
                        {t.supportEmail}
                      </Typography>
                    </Box>
                    <IconButton 
                      onClick={copyEmailToClipboard}
                      sx={{ 
                        color: "#0000FF",
                        backgroundColor: 'rgba(0, 0, 255, 0.1)',
                        ml: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 255, 0.2)',
                        }
                      }}
                    >
                      <ContentCopy />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </DialogContent>
          
          <DialogActions sx={{ 
            p: isMobile ? 2 : 3, 
            pt: 0, 
            gap: isMobile ? 1.5 : 2, 
            flexDirection: 'column',
            flexShrink: 0
          }}>
            <Button 
              onClick={openGmail}
              variant="contained"
              sx={{ 
                bgcolor: "#0000FF",
                "&:hover": { 
                  bgcolor: "#0000CC",
                  boxShadow: '0 4px 12px rgba(0, 0, 255, 0.3)'
                },
                width: '100%',
                py: isMobile ? 1.25 : 1.5,
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: 600,
                borderRadius: 2
              }}
              startIcon={<Email />}
            >
              {t.writeGmail}
            </Button>
            
            <Button 
              onClick={openDefaultEmailClient}
              variant="outlined"
              sx={{ 
                color: "#0000FF", 
                borderColor: "#0000FF",
                "&:hover": { 
                  borderColor: "#0000CC",
                  backgroundColor: 'rgba(0, 0, 255, 0.04)'
                },
                width: '100%',
                py: isMobile ? 1.25 : 1.5,
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: 600,
                borderRadius: 2
              }}
              startIcon={<Mail />}
            >
              {t.writeEmailClient}
            </Button>
            
            <Button 
              onClick={copyEmailToClipboard}
              variant="outlined"
              sx={{ 
                color: "#0000FF", 
                borderColor: "#0000FF",
                "&:hover": { 
                  borderColor: "#0000CC",
                  backgroundColor: 'rgba(0, 0, 255, 0.04)'
                },
                width: '100%',
                py: isMobile ? 1.25 : 1.5,
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: 600,
                borderRadius: 2
              }}
              startIcon={<ContentCopy />}
            >
              {t.copyEmail}
            </Button>
            
            <Button 
              onClick={handleCloseEmailDialog}
              variant="outlined"
              sx={{ 
                color: "error.main", 
                borderColor: "error.main",
                "&:hover": { 
                  borderColor: "error.dark",
                  backgroundColor: 'rgba(211, 47, 47, 0.04)'
                },
                width: '100%',
                py: isMobile ? 1.25 : 1.5,
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: 600,
                borderRadius: 2
              }}
            >
              {t.cancel}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Snackbar for copy confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ zIndex: 1700 }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success"
          sx={{
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
        >
          {t.emailCopied}
        </Alert>
      </Snackbar>
    </>
  );
};

export default memo(UserMenu);