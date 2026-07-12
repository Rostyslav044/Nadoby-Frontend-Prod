


// // 'use client';

// // import React, { useState, useEffect } from 'react';
// // import {
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Button,
// //   Typography,
// //   Box,
// //   Grid,
// //   Paper,
// //   Chip,
// //   Divider,
// //   Avatar,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   ListItemAvatar,
// //   CircularProgress,
// // } from '@mui/material';
// // import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
// // import {
// //   Home as HomeIcon,
// //   Hotel as HotelIcon,
// //   Bathtub as BathtubIcon,
// //   KingBed as KingBedIcon,
// //   Apartment as ApartmentIcon,
// //   DirectionsCar as DirectionsCarIcon,
// //   Wifi as WifiIcon,
// //   Tv as TvIcon,
// //   AcUnit as AcUnitIcon,
// //   LocalLaundryService as LaundryIcon,
// //   Person as PersonIcon,
// //   ChildCare as ChildCareIcon,
// //   SmokingRooms as SmokingIcon,
// //   Pets as PetsIcon,
// //   Description as DocsIcon,
// //   AccessTime as TimeIcon,
// //   LocationOn as LocationIcon,
// //   Celebration as CelebrationIcon,
// // } from '@mui/icons-material';
// // import FileUploadSlider from './FileUploadSlider';
// // import { useLanguage } from '@/app/LanguageContext';

// // const translations = {
// //   ua: {
// //     previewTitle: 'Попередній перегляд оголошення',
// //     description: 'Опис',
// //     noDescription: 'Опис відсутній',
// //     mainFeatures: 'Основні характеристики',
// //     rooms: 'Кімнат',
// //     guests: 'Кількість гостей',
// //     area: 'Площа',
// //     floor: 'Поверх',
// //     totalFloors: 'Всього поверхів',
// //     kidsAge: 'Вік дітей від',
// //     ageLimit: 'Вікове обмеження',
// //     parties: 'Святкування',
// //     rentalTerms: 'Умови оренди',
// //     checkInOut: 'Час заїзду/виїзду',
// //     fullDayCheckIn: 'Цілодобове заселення',
// //     smoking: 'Куріння',
// //     pets: 'Тварини',
// //     reportDocs: 'Звітні документи',
// //     minRent: 'Мінімальний термін оренди',
// //     deposit: 'Залог',
// //     notRequired: 'Не потрібен',
// //     amenities: 'Зручності',
// //     noAmenities: 'Зручності не вказані',
// //     location: 'Розташування',
// //     buildRoute: 'Побудувати маршрут',
// //     edit: 'Редагувати',
// //     publish: 'Опублікувати',
// //     yes: 'Так',
// //     no: 'Ні',
// //     notSpecified: 'Не вказано',
// //     days: 'днів',
// //     years: 'років',
// //     from: 'від',
// //     unlimited: 'Не обмежено',
// //     of: 'з',
// //     district: 'район',
// //     metro: 'метро',
// //     noName: 'Без назви',
// //     categories: {
// //       'Квартира': 'Квартира',
// //       'Гостиница': 'Готель',
// //       'Хостел': 'Хостел',
// //       'Дом': 'Будинок',
// //       'База отдыха': 'База відпочинку',
// //       'Сауна/Баня': 'Сауна/Лазня',
// //       'Готель для тварин': 'Готель для тварин',
// //       'Глемпінг': 'Глемпінг',
// //       'Пансіонат': 'Пансіонат',
// //       'Котедж для компній': 'Котедж для компаній',
// //       'Коворкінг': 'Коворкінг',
// //       'Автокемпінг': 'Автокемпінг'
// //     },
// //     conveniences: {
// //       "Балкон": "Балкон",
// //       "Барбекю-зона": "Барбекю-зона",
// //       "Басейн": "Басейн",
// //       "Ігрова кімната": "Ігрова кімната",
// //       "Блендер": "Блендер",
// //       "Бойлер": "Бойлер",
// //       "Ванна": "Ванна",
// //       "Вентилятор": "Вентилятор",
// //       "Генератор": "Генератор",
// //       "Громадська кухня": "Громадська кухня",
// //       "Джакузі": "Джакузі",
// //       "Дитяче ліжечко": "Дитяче ліжечко",
// //       "Дитячий стілець": "Дитячий стілець",
// //       "Домашній кінотеатр": "Домашній кінотеатр",
// //       "Духовка": "Духовка",
// //       "Душова кабіна": "Душова кабіна",
// //       "Електрочайник": "Електрочайник",
// //       "Електроплита": "Електроплита",
// //       "Газова плита": "Газова плита",
// //       "Зарядка для електромобілів": "Зарядка для електромобілів",
// //       "Заміна постільної білизни": "Заміна постільної білизни",
// //       "Інтернет": "Інтернет",
// //       "Кавоварка": "Кавоварка",
// //       "Камін": "Камін",
// //       "Кабельне ТБ": "Кабельне ТБ",
// //       "Кондиціонер": "Кондиціонер",
// //       "Ліжко": "Ліжко",
// //       "Диван": "Диван",
// //       "Лазня": "Лазня",
// //       "Мангал": "Мангал",
// //       "Мікрохвильова піч": "Мікрохвильова піч",
// //       "Охорона": "Охорона",
// //       "Парковка": "Парковка",
// //       "Комп'ютер": "Комп'ютер",
// //       "Пляжне обладнання": "Пляжне обладнання",
// //       "Посуд": "Посуд",
// //       "Посудомийна машина": "Посудомийна машина",
// //       "Пральна машина": "Пральна машина",
// //       "Пральний порошок": "Пральний порошок",
// //       "Праска": "Праска",
// //       "Рушники": "Рушники",
// //       "Сейф": "Сейф",
// //       "Спортзал": "Спортзал",
// //       "Спортивний інвентар": "Спортивний інвентар",
// //       "Столові прибори": "Столові прибори",
// //       "Сушилка": "Сушилка",
// //       "Супутникове ТБ": "Супутникове ТБ",
// //       "Тапочки": "Тапочки",
// //       "Тераса": "Тераса",
// //       "Тостер": "Тостер",
// //       "Туалетні принадлежності": "Туалетні принадлежності",
// //       "Фен": "Фен",
// //       "Холодильник": "Холодильник",
// //       "Догляд за тваринами": "Догляд за тваринами",
// //       "Кафе": "Кафе",
// //       "Конференц-зал": "Конференц-зал",
// //       "Переговорна": "Переговорна",
// //       "Лікувальні процедури": "Лікувальні процедури",
// //       "Організація подій": "Організація подій",
// //       "Трансфер": "Трансфер",
// //       "Харчування": "Харчування",
// //       "Прокат": "Прокат"
// //     }
// //   },
// //   ru: {
// //     previewTitle: 'Предпросмотр объявления',
// //     description: 'Описание',
// //     noDescription: 'Описание отсутствует',
// //     mainFeatures: 'Основные характеристики',
// //     rooms: 'Комнат',
// //     guests: 'Количество гостей',
// //     area: 'Площадь',
// //     floor: 'Этаж',
// //     totalFloors: 'Всего этажей',
// //     kidsAge: 'Возраст детей от',
// //     ageLimit: 'Возрастное ограничение',
// //     parties: 'Празднование',
// //     rentalTerms: 'Условия аренды',
// //     checkInOut: 'Время заезда/выезда',
// //     fullDayCheckIn: 'Круглосуточное заселение',
// //     smoking: 'Курение',
// //     pets: 'Животные',
// //     reportDocs: 'Отчетные документы',
// //     minRent: 'Минимальный срок аренды',
// //     deposit: 'Залог',
// //     notRequired: 'Не требуется',
// //     amenities: 'Удобства',
// //     noAmenities: 'Удобства не указаны',
// //     location: 'Местоположение',
// //     buildRoute: 'Проложить маршрут',
// //     edit: 'Редактировать',
// //     publish: 'Опубликовать',
// //     yes: 'Да',
// //     no: 'Нет',
// //     notSpecified: 'Не указано',
// //     days: 'дней',
// //     years: 'лет',
// //     from: 'от',
// //     unlimited: 'Не ограничено',
// //     of: 'из',
// //     district: 'район',
// //     metro: 'метро',
// //     noName: 'Без названия',
// //     categories: {
// //       'Квартира': 'Квартира',
// //       'Гостиница': 'Гостиница',
// //       'Хостел': 'Хостел',
// //       'Дом': 'Дом',
// //       'База отдыха': 'База отдыха',
// //       'Сауна/Баня': 'Сауна/Баня',
// //       'Готель для тварин': 'Отель для животных',
// //       'Глемпінг': 'Глэмпинг',
// //       'Пансіонат': 'Пансионат',
// //       'Котедж для компній': 'Коттедж для компаний',
// //       'Коворкінг': 'Коворкинг',
// //       'Автокемпінг': 'Автокемпинг'
// //     },
// //     conveniences: {
// //       "Балкон": "Балкон",
// //       "Барбекю-зона": "Зона барбекю",
// //       "Басейн": "Бассейн",
// //       "Ігрова кімната": "Игровая комната",
// //       "Блендер": "Блендер",
// //       "Бойлер": "Бойлер",
// //       "Ванна": "Ванна",
// //       "Вентилятор": "Вентилятор",
// //       "Генератор": "Генератор",
// //       "Громадська кухня": "Общая кухня",
// //       "Джакузі": "Джакузи",
// //       "Дитяче ліжечко": "Детская кроватка",
// //       "Дитячий стілець": "Детский стульчик",
// //       "Домашній кінотеатр": "Домашний кинотеатр",
// //       "Духовка": "Духовка",
// //       "Душова кабіна": "Душевая кабина",
// //       "Електрочайник": "Электрочайник",
// //       "Електроплита": "Электроплита",
// //       "Газова плита": "Газовая плита",
// //       "Зарядка для електромобілів": "Зарядка для электромобилей",
// //       "Заміна постільної білизни": "Смена постельного белья",
// //       "Інтернет": "Интернет",
// //       "Кавоварка": "Кофеварка",
// //       "Камін": "Камин",
// //       "Кабельне ТБ": "Кабельное ТВ",
// //       "Кондиціонер": "Кондиционер",
// //       "Ліжко": "Кровать",
// //       "Диван": "Диван",
// //       "Лазня": "Баня",
// //       "Мангал": "Мангал",
// //       "Мікрохвильова піч": "Микроволновая печь",
// //       "Охорона": "Охрана",
// //       "Парковка": "Парковка",
// //       "Комп'ютер": "Компьютер",
// //       "Пляжне обладнання": "Пляжное оборудование",
// //       "Посуд": "Посуда",
// //       "Посудомийна машина": "Посудомоечная машина",
// //       "Пральна машина": "Стиральная машина",
// //       "Пральний порошок": "Стиральный порошок",
// //       "Праска": "Утюг",
// //       "Рушники": "Полотенца",
// //       "Сейф": "Сейф",
// //       "Спортзал": "Спортзал",
// //       "Спортивний інвентар": "Спортивный инвентарь",
// //       "Столові прибори": "Столовые приборы",
// //       "Сушилка": "Сушилка",
// //       "Супутникове ТБ": "Спутниковое ТВ",
// //       "Тапочки": "Тапочки",
// //       "Тераса": "Терраса",
// //       "Тостер": "Тостер",
// //       "Туалетні принадлежності": "Туалетные принадлежности",
// //       "Фен": "Фен",
// //       "Холодильник": "Холодильник",
// //       "Догляд за тваринами": "Уход за животными",
// //       "Кафе": "Кафе",
// //       "Конференц-зал": "Конференц-зал",
// //       "Переговорна": "Переговорная",
// //       "Лікувальні процедури": "Лечебные процедуры",
// //       "Організація подій": "Организация мероприятий",
// //       "Трансфер": "Трансфер",
// //       "Харчування": "Питание",
// //       "Прокат": "Прокат"
// //     }
// //   }
// // };

// // const formatAddress = (city, street, houseNumber, district, metro, t) => {
// //   const parts = [];
// //   if (city) parts.push(city);
// //   if (street && houseNumber) parts.push(`${street} ${houseNumber}`);
// //   if (district) parts.push(`${t.district} ${district}`);
// //   if (metro) parts.push(`${t.metro} ${metro}`);
// //   return parts.join(', ');
// // };

// // const PreviewDialog = ({
// //   open,
// //   onClose,
// //   formData,
// //   uploudImages = [],
// //   apartmentInfo = {},
// //   photoError,
// //   userPhones = [],
// // }) => {
// //   const { currentLanguage } = useLanguage();
// //   const t = translations[currentLanguage];
// //   const [userLocation, setUserLocation] = useState(null);
// //   const { isLoaded } = useJsApiLoader({
// //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
// //   });

// //   const translateCategory = (category) => {
// //     // Если категория есть в словаре для текущего языка
// //     if (t.categories[category]) {
// //       return t.categories[category];
// //     }
    
// //     // Если нет, проверяем украинский вариант для русского языка
// //     if (currentLanguage === 'ru') {
// //       const uaCategory = Object.entries(translations.ua.categories).find(
// //         ([uaKey]) => uaKey === category
// //       );
// //       if (uaCategory) {
// //         return t.categories[uaCategory[1]] || category;
// //       }
// //     }
    
// //     return category;
// //   };

// //   const translateConvenience = (convenience) => {
// //     // Если удобство есть в словаре для текущего языка
// //     if (t.conveniences[convenience]) {
// //       return t.conveniences[convenience];
// //     }
    
// //     // Если нет, проверяем украинский вариант для русского языка
// //     if (currentLanguage === 'ru') {
// //       const uaConvenience = Object.entries(translations.ua.conveniences).find(
// //         ([uaKey]) => uaKey === convenience
// //       );
// //       if (uaConvenience) {
// //         return t.conveniences[uaConvenience[1]] || convenience;
// //       }
// //     }
    
// //     return convenience;
// //   };

// //   // const getFacilityIcon = (facility) => {
// //   //   switch(facility) {
// //   //     case 'WiFi': return <WifiIcon />;
// //   //     case 'Парковка': return <DirectionsCarIcon />;
// //   //     case 'Кондиционер': return <AcUnitIcon />;
// //   //     case 'Телевизор': return <TvIcon />;
// //   //     case 'Прачечная': return <LaundryIcon />;
// //   //     case 'Кухня': return <HomeIcon />;
// //   //     case 'Балкон': return <HomeIcon />;
// //   //     case 'Лифт': return <HomeIcon />;
// //   //     default: return <HomeIcon />;
// //   //   }
// //   // };


// //   const getFacilityIcon = (facility) => {
// //     if (!facility) return <HomeIcon />;
    
// //     const lowerFacility = facility.toLowerCase();
    
// //     if (lowerFacility.includes('інтернет') || lowerFacility.includes('интернет')) return <WifiIcon />;
// //     if (lowerFacility.includes('парковк')) return <DirectionsCarIcon />;
// //     if (lowerFacility.includes('кондиціонер') || lowerFacility.includes('кондиционер')) return <AcUnitIcon />;
// //     if (lowerFacility.includes('телевізор') || lowerFacility.includes('телевизор')) return <TvIcon />;
// //     if (lowerFacility.includes('пральн') || lowerFacility.includes('стиральн')) return <LaundryIcon />;
// //     if (lowerFacility.includes('кухн')) return <HomeIcon />;
// //     if (lowerFacility.includes('балкон')) return <HomeIcon />;
// //     if (lowerFacility.includes('ліфт') || lowerFacility.includes('лифт')) return <HomeIcon />;
    
// //     return <HomeIcon />;
// //   };

// //   const handleOpenRoute = () => {
// //     if (formData.latitude && formData.longitude) {
// //       if (userLocation) {
// //         window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${formData.latitude},${formData.longitude}`);
// //       } else {
// //         window.open(`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`);
// //       }
// //     }
// //   };

// //   const getCategoryIcon = () => {
// //     switch(formData.category) {
// //       case 'Квартира': return <HomeIcon />;
// //       case 'Гостиница': return <HotelIcon />;
// //       case 'Хостел': return <KingBedIcon />;
// //       case 'Дом': return <HomeIcon />;
// //       case 'База отдыха': return <HomeIcon />;
// //       case 'Сауна/Баня': return <BathtubIcon />;
// //       default: return <ApartmentIcon />;
// //     }
// //   };

// //   const getBooleanValue = (value) => {
// //     if (value === 'yes') return t.yes;
// //     if (value === 'no') return t.no;
// //     return t.notSpecified;
// //   };

// //   const formatTime = (time) => {
// //     if (!time) return '';
// //     const [hours, minutes] = time.split(':');
// //     return `${hours}:${minutes}`;
// //   };

// //   useEffect(() => {
// //     if (navigator.geolocation && open) {
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           setUserLocation({
// //             lat: position.coords.latitude,
// //             lng: position.coords.longitude,
// //           });
// //         },
// //         (error) => {
// //           console.error('Ошибка геолокации:', error);
// //         }
// //       );
// //     }
// //   }, [open]);

// //   if (!open) return null;

// //   return (
// //     <Dialog
// //       open={open}
// //       onClose={() => onClose(false)}
// //       maxWidth="lg"
// //       fullWidth
// //       scroll="paper"
// //       sx={{ 
// //         '& .MuiDialog-paper': { 
// //           maxHeight: '90vh',
// //           width: '100%',
// //           maxWidth: '1300px'
// //         } 
// //       }}
// //     >
// //       <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //         {getCategoryIcon()}
// //         {t.previewTitle}
// //       </DialogTitle>
      
// //       <DialogContent dividers>
// //         <Box sx={{ 
// //           display: 'flex',
// //           flexDirection: 'column',
// //           maxWidth: '1200px',
// //           mx: 'auto',
// //           width: '100%'
// //         }}>
// //           <Box mb={2} sx={{textAlign: 'center' }}>
// //             <Chip 
// //               label={translateCategory(formData.category)}
// //               color="primary" 
// //               icon={getCategoryIcon()}
// //               sx={{ fontSize: '15px', height: '30px', padding: '8px' }}
// //             />
// //           </Box>

// //           {/* <Box mb={2}>
// //             <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
// //               {formData.objectName || formData.name || t.noName}
// //             </Typography>
// //           </Box> */}

// // <Box mb={2}>
// //   <Typography
// //     component="div"
// //     sx={{
// //       fontSize: {
// //         xs: '1rem',
// //         sm: '1.3rem',
// //         md: '1.5rem',
// //       },
// //       fontWeight: 'bold',
// //       lineHeight: 1.2,
// //       fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
// //       margin: 0,
// //       padding: 0,
// //       // Дополнительно можно добавить для уверенности:
// //       '&.MuiTypography-root': {
// //         fontSize: {
// //           xs: '1rem !important',
// //           sm: '1.3rem !important', 
// //           md: '1.5rem !important',
// //         }
// //       }
// //     }}
// //   >
// //     {formData.objectName || formData.name || t.noName}
// //   </Typography>
// // </Box>

// //           <Box 
// //             sx={{ 
// //               display: 'flex', 
// //               alignItems: 'center', 
// //               gap: 1,
// //               mb: 3,
// //               cursor: 'pointer',
// //               '&:hover': {
// //                 textDecoration: 'underline',
// //                 color: 'primary.main'
// //               }
// //             }}
// //             onClick={handleOpenRoute}
// //           >
// //             <LocationIcon color="primary" />
// //             <Typography variant="body1">
// //               {formatAddress(
// //                 formData.city, 
// //                 formData.street, 
// //                 formData.houseNumber, 
// //                 formData.district, 
// //                 formData.metro,
// //                 t
// //               )}
// //             </Typography>
// //           </Box>

// //           <Box sx={{
// //             display: 'flex',
// //             flexDirection: { xs: 'column', md: 'row' },
// //             gap: 3,
// //             width: '100%'
// //           }}>
// //             <Box sx={{ flex: 1, minWidth: 0 }}>
// //               <FileUploadSlider 
// //                 photos={uploudImages}
// //                 price={formData.price}
// //                 name={formData.name || apartmentInfo.name || formData.ownerName || t.noName}
// //                 // phones={Array.isArray(formData.phones) ? formData.phones : [formData.phones || apartmentInfo.phones || '+380XXXXXXXXXX']}
// //                 phones={
// //                   Array.isArray(formData.phones) ? formData.phones : 
// //                   formData.phones ? [formData.phones] :
// //                   Array.isArray(apartmentInfo.phones) ? apartmentInfo.phones :
// //                   apartmentInfo.phones ? [apartmentInfo.phones] :
// //                   Array.isArray(userPhones) ? userPhones : // Используем userPhones
// //                   userPhones ? [userPhones] : 
// //                   ['+380XXXXXXXXXX']
// //                 }
// //                 category={translateCategory(formData.category)}
// //                 address={formatAddress(
// //                   formData.city,
// //                   formData.street,
// //                   formData.houseNumber,
// //                   formData.district,
// //                   formData.metro,
// //                   t,
                  
// //                 )}
// //                 editable={false}
// //               />

// //               <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
// //                 <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
// //                   {t.description}
// //                 </Typography>
// //                 <Typography paragraph sx={{ whiteSpace: 'pre-line' }}>
// //                   {formData.description || t.noDescription}
// //                 </Typography>
                
// //                 <Divider sx={{ my: 3 }} />

// //                 <Grid container spacing={3}>
// //                   <Grid item xs={12} md={6}>
// //                     <Typography variant="h6" gutterBottom>
// //                       {t.mainFeatures}
// //                     </Typography>
                    
// //                     <List dense>
// //                       <ListItem>
// //                         <ListItemAvatar>
// //                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
// //                             <HomeIcon fontSize="small" />
// //                           </Avatar>
// //                         </ListItemAvatar>
// //                         <ListItemText 
// //                           primary={t.rooms} 
// //                           secondary={apartmentInfo.rooms || t.notSpecified} 
// //                         />
// //                       </ListItem>
                      
// //                       <ListItem>
// //                         <ListItemAvatar>
// //                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
// //                             <PersonIcon fontSize="small" />
// //                           </Avatar>
// //                         </ListItemAvatar>
// //                         <ListItemText 
// //                           primary={t.guests} 
// //                           secondary={apartmentInfo.beds || t.notSpecified} 
// //                         />
// //                       </ListItem>
                      
// //                       <ListItem>
// //                         <ListItemAvatar>
// //                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
// //                             <HomeIcon fontSize="small" />
// //                           </Avatar>
// //                         </ListItemAvatar>
// //                         <ListItemText 
// //                           primary={t.area} 
// //                           secondary={apartmentInfo.size ? `${apartmentInfo.size} м²` : t.notSpecified} 
// //                         />
// //                       </ListItem>
                      
// //                       <ListItem>
// //                         <ListItemAvatar>
// //                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
// //                             <HomeIcon fontSize="small" />
// //                           </Avatar>
// //                         </ListItemAvatar>
// //                         <ListItemText 
// //                           primary={t.floor} 
// //                           secondary={
// //                             apartmentInfo.floor 
// //                               ? `${apartmentInfo.floor} ${t.of} ${apartmentInfo.totalFloors}` 
// //                               : t.notSpecified
// //                           } 
// //                         />
// //                       </ListItem>

// //                       <ListItem>
// //                         <ListItemAvatar>
// //                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
// //                             <ChildCareIcon fontSize="small" />
// //                           </Avatar>
// //                         </ListItemAvatar>
// //                         <ListItemText 
// //                           primary={t.kidsAge} 
// //                           secondary={apartmentInfo.kidsAge ? `${apartmentInfo.kidsAge} ${t.years}` : t.unlimited} 
// //                         />
// //                       </ListItem>

// //                       <ListItem>
// //                         <ListItemAvatar>
// //                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
// //                             <PersonIcon fontSize="small" />
// //                           </Avatar>
// //                         </ListItemAvatar>
// //                         <ListItemText 
// //                           primary={t.ageLimit} 
// //                           secondary={apartmentInfo.ageLimit ? `${t.from} ${apartmentInfo.ageLimit} ${t.years}` : t.unlimited} 
// //                         />
// //                       </ListItem>

// //                       <ListItem>
// //                         <ListItemAvatar>
// //                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
// //                             <CelebrationIcon fontSize="small" />
// //                           </Avatar>
// //                         </ListItemAvatar>
// //                         <ListItemText 
// //                           primary={t.parties} 
// //                           secondary={getBooleanValue(apartmentInfo.parties)} 
// //                         />
// //                       </ListItem>
// //                     </List>
// //                   </Grid>

// //                   <Grid item xs={12} md={6}>
// //                     <Typography variant="h6" gutterBottom>
// //                       {t.rentalTerms}
// //                     </Typography>
                    
// //                     <List dense>
// //                       <ListItem>
// //                         <ListItemAvatar>
// //                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
// //                             <TimeIcon fontSize="small" />
// //                           </Avatar>
// //                         </ListItemAvatar>
// //                         <ListItemText 
// //                           primary={t.checkInOut} 
// //                           secondary={
// //                             apartmentInfo.checkIn || apartmentInfo.checkOut 
// //                               ? `${formatTime(apartmentInfo.checkIn)} / ${formatTime(apartmentInfo.checkOut)}` 
// //                               : t.notSpecified
// //                           } 
// //                         />
// //                       </ListItem>
                      
// //                       <ListItem>
// //                         <ListItemAvatar>
// //                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
// //                             <TimeIcon fontSize="small" />
// //                           </Avatar>
// //                         </ListItemAvatar>
// //                         <ListItemText 
// //                           primary={t.fullDayCheckIn} 
// //                           secondary={getBooleanValue(apartmentInfo.fullDayCheckIn)} 
// //                         />
// //                       </ListItem>
                      
// //                       <ListItem>
// //                         <ListItemAvatar>
// //                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
// //                             <SmokingIcon fontSize="small" />
// //                           </Avatar>
// //                         </ListItemAvatar>
// //                         <ListItemText 
// //                           primary={t.smoking} 
// //                           secondary={getBooleanValue(apartmentInfo.smoking)} 
// //                         />
// //                       </ListItem>
                      
// //                       <ListItem>
// //                         <ListItemAvatar>
// //                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
// //                             <PetsIcon fontSize="small" />
// //                           </Avatar>
// //                         </ListItemAvatar>
// //                         <ListItemText 
// //                           primary={t.pets} 
// //                           secondary={getBooleanValue(apartmentInfo.pets)} 
// //                         />
// //                       </ListItem>
                      
// //                       <ListItem>
// //                         <ListItemAvatar>
// //                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
// //                             <DocsIcon fontSize="small" />
// //                           </Avatar>
// //                         </ListItemAvatar>
// //                         <ListItemText 
// //                           primary={t.reportDocs} 
// //                           secondary={getBooleanValue(apartmentInfo.reportDocs)} 
// //                         />
// //                       </ListItem>
                      
// //                       <ListItem>
// //                         <ListItemAvatar>
// //                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
// //                             <HomeIcon fontSize="small" />
// //                           </Avatar>
// //                         </ListItemAvatar>
// //                         <ListItemText 
// //                           primary={t.minRent} 
// //                           secondary={apartmentInfo.minRent ? `${apartmentInfo.minRent} ${t.days}` : t.notSpecified} 
// //                         />
// //                       </ListItem>
                      
// //                       <ListItem>
// //                         <ListItemAvatar>
// //                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
// //                             <HomeIcon fontSize="small" />
// //                           </Avatar>
// //                         </ListItemAvatar>
// //                         <ListItemText 
// //                           primary={t.deposit} 
// //                           secondary={apartmentInfo.deposit ? `${apartmentInfo.deposit} грн` : t.notRequired} 
// //                         />
// //                       </ListItem>
// //                     </List>
// //                   </Grid>

// //                   <Grid item xs={12}>
// //                     <Typography variant="h6" gutterBottom>
// //                       {t.amenities}
// //                     </Typography>
                    
// //                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
// //                       {apartmentInfo.conveniences?.length > 0 ? (
// //                         apartmentInfo.conveniences.map((item, index) => (
// //                           <Chip 
// //                             key={index} 
// //                             label={translateConvenience(item)} 
// //                             variant="outlined"
// //                             avatar={
// //                               <Avatar>
// //                                 {getFacilityIcon(item)}
// //                               </Avatar>
// //                             }
// //                           />
// //                         ))
// //                       ) : (
// //                         <Typography variant="body2" color="text.secondary">
// //                           {t.noAmenities}
// //                         </Typography>
// //                       )}
// //                     </Box>
// //                   </Grid>



// //                 </Grid>
// //               </Paper>

// //               {formData.latitude && formData.longitude && (
// //                 <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
// //                   <Typography variant="h6" gutterBottom>
// //                     {t.location}
// //                   </Typography>
                  
// //                   <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden', mb: 2 }}>
// //                     {isLoaded ? (
// //                       <GoogleMap
// //                         mapContainerStyle={{ width: '100%', height: '100%' }}
// //                         center={{
// //                           lat: parseFloat(formData.latitude),
// //                           lng: parseFloat(formData.longitude),
// //                         }}
// //                         zoom={15}
// //                       >
// //                         <Marker
// //                           position={{
// //                             lat: parseFloat(formData.latitude),
// //                             lng: parseFloat(formData.longitude),
// //                           }}
// //                         />
// //                       </GoogleMap>
// //                     ) : (
// //                       <Box display="flex" justifyContent="center" alignItems="center" height="100%">
// //                         <CircularProgress />
// //                       </Box>
// //                     )}
// //                   </Box>

// //                   {userLocation && (
// //                     <Box textAlign="center">
// //                       <Button 
// //                         variant="contained" 
// //                         color="primary"
// //                         component="a"
// //                         href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${formData.latitude},${formData.longitude}`}
// //                         target="_blank"
// //                         rel="noopener noreferrer"
// //                       >
// //                         {t.buildRoute}
// //                       </Button>
// //                     </Box>
// //                   )}
// //                 </Paper>
// //               )}
// //             </Box>
// //           </Box>
// //         </Box>
// //       </DialogContent>
      
// //       <DialogActions sx={{ p: 2 }}>
// //         <Button 
// //           onClick={() => onClose(true)} 
// //           variant="outlined"
// //           color="secondary"
// //           sx={{ mr: 2 }}
// //         >
// //           {t.edit}
// //         </Button>
// //         <Button 
// //           onClick={() => onClose(false)} 
// //           variant="contained"
// //           color="primary"
// //         >
// //           {t.publish}
// //         </Button>
// //       </DialogActions>
// //     </Dialog>
// //   );
// // };

// // export default PreviewDialog;


// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Box,
//   Grid,
//   Paper,
//   Chip,
//   Divider,
//   Avatar,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   CircularProgress,
// } from '@mui/material';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
// import {
//   Home as HomeIcon,
//   Hotel as HotelIcon,
//   Bathtub as BathtubIcon,
//   KingBed as KingBedIcon,
//   Apartment as ApartmentIcon,
//   DirectionsCar as DirectionsCarIcon,
//   Wifi as WifiIcon,
//   Tv as TvIcon,
//   AcUnit as AcUnitIcon,
//   LocalLaundryService as LaundryIcon,
//   Person as PersonIcon,
//   ChildCare as ChildCareIcon,
//   SmokingRooms as SmokingIcon,
//   Pets as PetsIcon,
//   Description as DocsIcon,
//   AccessTime as TimeIcon,
//   LocationOn as LocationIcon,
//   Celebration as CelebrationIcon,
//   Check as CheckIcon,
// } from '@mui/icons-material';
// import FileUploadSlider from './FileUploadSlider';
// import { useLanguage } from '@/app/LanguageContext';

// const translations = {
//   ua: {
//     previewTitle: 'Попередній перегляд оголошення',
//     description: 'Опис',
//     noDescription: 'Опис відсутній',
//     mainFeatures: 'Основні характеристики',
//     rooms: 'Кімнат',
//     guests: 'Кількість гостей',
//     area: 'Площа',
//     floor: 'Поверх',
//     totalFloors: 'Всього поверхів',
//     kidsAge: 'Вік дітей від',
//     ageLimit: 'Вікове обмеження',
//     parties: 'Святкування',
//     rentalTerms: 'Умови оренди',
//     checkInOut: 'Час заїзду/виїзду',
//     fullDayCheckIn: 'Цілодобове заселення',
//     smoking: 'Куріння',
//     pets: 'Тварини',
//     reportDocs: 'Звітні документи',
//     minRent: 'Мінімальний термін оренди',
//     deposit: 'Залог',
//     notRequired: 'Не потрібен',
//     amenities: 'Зручності',
//     noAmenities: 'Зручності не вказані',
//     location: 'Розташування',
//     buildRoute: 'Побудувати маршрут',
//     edit: 'Редагувати',
//     publish: 'Опублікувати',
//     yes: 'Так',
//     no: 'Ні',
//     notSpecified: 'Не вказано',
//     days: 'днів',
//     years: 'років',
//     from: 'від',
//     unlimited: 'Не обмежено',
//     of: 'з',
//     district: 'район',
//     metro: 'метро',
//     noName: 'Без назви',
//     categories: {
//       'Квартира': 'Квартира',
//       'Гостиница': 'Готель',
//       'Хостел': 'Хостел',
//       'Дом': 'Будинок',
//       'База отдыха': 'База відпочинку',
//       'Сауна/Баня': 'Сауна/Лазня',
//       'Готель для тварин': 'Готель для тварин',
//       'Глемпінг': 'Глемпінг',
//       'Пансіонат': 'Пансіонат',
//       'Котедж для компній': 'Котедж для компаній',
//       'Коворкінг': 'Коворкінг',
//       'Автокемпінг': 'Автокемпінг'
//     },
//     conveniences: {
//       "Балкон": "Балкон",
//       "Барбекю-зона": "Барбекю-зона",
//       "Басейн": "Басейн",
//       "Ігрова кімната": "Ігрова кімната",
//       "Блендер": "Блендер",
//       "Бойлер": "Бойлер",
//       "Ванна": "Ванна",
//       "Вентилятор": "Вентилятор",
//       "Генератор": "Генератор",
//       "Громадська кухня": "Громадська кухня",
//       "Джакузі": "Джакузі",
//       "Дитяче ліжечко": "Дитяче ліжечко",
//       "Дитячий стілець": "Дитячий стілець",
//       "Домашній кінотеатр": "Домашній кінотеатр",
//       "Духовка": "Духовка",
//       "Душова кабіна": "Душова кабіна",
//       "Електрочайник": "Електрочайник",
//       "Електроплита": "Електроплита",
//       "Газова плита": "Газова плита",
//       "Зарядка для електромобілів": "Зарядка для електромобілів",
//       "Заміна постільної білизни": "Заміна постільної білизни",
//       "Інтернет": "Інтернет",
//       "Кавоварка": "Кавоварка",
//       "Камін": "Камін",
//       "Кабельне ТБ": "Кабельне ТБ",
//       "Кондиціонер": "Кондиціонер",
//       "Ліжко": "Ліжко",
//       "Диван": "Диван",
//       "Лазня": "Лазня",
//       "Мангал": "Мангал",
//       "Мікрохвильова піч": "Мікрохвильова піч",
//       "Охорона": "Охорона",
//       "Парковка": "Парковка",
//       "Комп'ютер": "Комп'ютер",
//       "Пляжне обладнання": "Пляжне обладнання",
//       "Посуд": "Посуд",
//       "Посудомийна машина": "Посудомийна машина",
//       "Пральна машина": "Пральна машина",
//       "Пральний порошок": "Пральний порошок",
//       "Праска": "Праска",
//       "Рушники": "Рушники",
//       "Сейф": "Сейф",
//       "Спортзал": "Спортзал",
//       "Спортивний інвентар": "Спортивний інвентар",
//       "Столові прибори": "Столові прибори",
//       "Сушилка": "Сушилка",
//       "Супутникове ТБ": "Супутникове ТБ",
//       "Тапочки": "Тапочки",
//       "Тераса": "Тераса",
//       "Тостер": "Тостер",
//       "Туалетні принадлежності": "Туалетні принадлежності",
//       "Фен": "Фен",
//       "Холодильник": "Холодильник",
//       "Догляд за тваринами": "Догляд за тваринами",
//       "Кафе": "Кафе",
//       "Конференц-зал": "Конференц-зал",
//       "Переговорна": "Переговорна",
//       "Лікувальні процедури": "Лікувальні процедури",
//       "Організація подій": "Організація подій",
//       "Трансфер": "Трансфер",
//       "Харчування": "Харчування",
//       "Прокат": "Прокат"
//     }
//   },
//   ru: {
//     previewTitle: 'Предпросмотр объявления',
//     description: 'Описание',
//     noDescription: 'Описание отсутствует',
//     mainFeatures: 'Основные характеристики',
//     rooms: 'Комнат',
//     guests: 'Количество гостей',
//     area: 'Площадь',
//     floor: 'Этаж',
//     totalFloors: 'Всего этажей',
//     kidsAge: 'Возраст детей от',
//     ageLimit: 'Возрастное ограничение',
//     parties: 'Празднование',
//     rentalTerms: 'Условия аренды',
//     checkInOut: 'Время заезда/выезда',
//     fullDayCheckIn: 'Круглосуточное заселение',
//     smoking: 'Курение',
//     pets: 'Животные',
//     reportDocs: 'Отчетные документы',
//     minRent: 'Минимальный срок аренды',
//     deposit: 'Залог',
//     notRequired: 'Не требуется',
//     amenities: 'Удобства',
//     noAmenities: 'Удобства не указаны',
//     location: 'Местоположение',
//     buildRoute: 'Проложить маршрут',
//     edit: 'Редактировать',
//     publish: 'Опубликовать',
//     yes: 'Да',
//     no: 'Нет',
//     notSpecified: 'Не указано',
//     days: 'дней',
//     years: 'лет',
//     from: 'от',
//     unlimited: 'Не ограничено',
//     of: 'из',
//     district: 'район',
//     metro: 'метро',
//     noName: 'Без названия',
//     categories: {
//       'Квартира': 'Квартира',
//       'Гостиница': 'Гостиница',
//       'Хостел': 'Хостел',
//       'Дом': 'Дом',
//       'База отдыха': 'База отдыха',
//       'Сауна/Баня': 'Сауна/Баня',
//       'Готель для тварин': 'Отель для животных',
//       'Глемпінг': 'Глэмпинг',
//       'Пансіонат': 'Пансионат',
//       'Котедж для компній': 'Коттедж для компаний',
//       'Коворкінг': 'Коворкинг',
//       'Автокемпінг': 'Автокемпинг'
//     },
//     conveniences: {
//       "Балкон": "Балкон",
//       "Барбекю-зона": "Зона барбекю",
//       "Басейн": "Бассейн",
//       "Ігрова кімната": "Игровая комната",
//       "Блендер": "Блендер",
//       "Бойлер": "Бойлер",
//       "Ванна": "Ванна",
//       "Вентилятор": "Вентилятор",
//       "Генератор": "Генератор",
//       "Громадська кухня": "Общая кухня",
//       "Джакузі": "Джакузи",
//       "Дитяче ліжечко": "Детская кроватка",
//       "Дитячий стілець": "Детский стульчик",
//       "Домашній кінотеатр": "Домашний кинотеатр",
//       "Духовка": "Духовка",
//       "Душова кабіна": "Душевая кабина",
//       "Електрочайник": "Электрочайник",
//       "Електроплита": "Электроплита",
//       "Газова плита": "Газовая плита",
//       "Зарядка для електромобілів": "Зарядка для электромобилей",
//       "Заміна постільної білизни": "Смена постельного белья",
//       "Інтернет": "Интернет",
//       "Кавоварка": "Кофеварка",
//       "Камін": "Камин",
//       "Кабельне ТБ": "Кабельное ТВ",
//       "Кондиціонер": "Кондиционер",
//       "Ліжко": "Кровать",
//       "Диван": "Диван",
//       "Лазня": "Баня",
//       "Мангал": "Мангал",
//       "Мікрохвильова піч": "Микроволновая печь",
//       "Охорона": "Охрана",
//       "Парковка": "Парковка",
//       "Комп'ютер": "Компьютер",
//       "Пляжне обладнання": "Пляжное оборудование",
//       "Посуд": "Посуда",
//       "Посудомийна машина": "Посудомоечная машина",
//       "Пральна машина": "Стиральная машина",
//       "Пральний порошок": "Стиральный порошок",
//       "Праска": "Утюг",
//       "Рушники": "Полотенца",
//       "Сейф": "Сейф",
//       "Спортзал": "Спортзал",
//       "Спортивний інвентар": "Спортивный инвентарь",
//       "Столові прибори": "Столовые приборы",
//       "Сушилка": "Сушилка",
//       "Супутникове ТБ": "Спутниковое ТВ",
//       "Тапочки": "Тапочки",
//       "Тераса": "Терраса",
//       "Тостер": "Тостер",
//       "Туалетні принадлежності": "Туалетные принадлежности",
//       "Фен": "Фен",
//       "Холодильник": "Холодильник",
//       "Догляд за тваринами": "Уход за животными",
//       "Кафе": "Кафе",
//       "Конференц-зал": "Конференц-зал",
//       "Переговорна": "Переговорная",
//       "Лікувальні процедури": "Лечебные процедуры",
//       "Організація подій": "Организация мероприятий",
//       "Трансфер": "Трансфер",
//       "Харчування": "Питание",
//       "Прокат": "Прокат"
//     }
//   }
// };

// const formatAddress = (city, street, houseNumber, district, metro, t) => {
//   const parts = [];
//   if (city) parts.push(city);
//   if (street && houseNumber) parts.push(`${street} ${houseNumber}`);
//   if (district) parts.push(`${t.district} ${district}`);
//   if (metro) parts.push(`${t.metro} ${metro}`);
//   return parts.join(', ');
// };

// const PreviewDialog = ({
//   open,
//   onClose,
//   formData,
//   uploudImages = [],
//   apartmentInfo = {},
//   photoError,
//   userPhones = [],
// }) => {
//   const { currentLanguage } = useLanguage();
//   const t = translations[currentLanguage];
//   const [userLocation, setUserLocation] = useState(null);
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//   });

//   const translateCategory = (category) => {
//     if (t.categories[category]) {
//       return t.categories[category];
//     }
    
//     if (currentLanguage === 'ru') {
//       const uaCategory = Object.entries(translations.ua.categories).find(
//         ([uaKey]) => uaKey === category
//       );
//       if (uaCategory) {
//         return t.categories[uaCategory[1]] || category;
//       }
//     }
    
//     return category;
//   };

//   const translateConvenience = (convenience) => {
//     if (t.conveniences[convenience]) {
//       return t.conveniences[convenience];
//     }
    
//     if (currentLanguage === 'ru') {
//       const uaConvenience = Object.entries(translations.ua.conveniences).find(
//         ([uaKey]) => uaKey === convenience
//       );
//       if (uaConvenience) {
//         return t.conveniences[uaConvenience[1]] || convenience;
//       }
//     }
    
//     return convenience;
//   };

//   const getFacilityIcon = (facility) => {
//     if (!facility) return <HomeIcon />;
    
//     const lowerFacility = facility.toLowerCase();
    
//     if (lowerFacility.includes('інтернет') || lowerFacility.includes('интернет')) return <WifiIcon />;
//     if (lowerFacility.includes('парковк')) return <DirectionsCarIcon />;
//     if (lowerFacility.includes('кондиціонер') || lowerFacility.includes('кондиционер')) return <AcUnitIcon />;
//     if (lowerFacility.includes('телевізор') || lowerFacility.includes('телевизор')) return <TvIcon />;
//     if (lowerFacility.includes('пральн') || lowerFacility.includes('стиральн')) return <LaundryIcon />;
//     if (lowerFacility.includes('кухн')) return <HomeIcon />;
//     if (lowerFacility.includes('балкон')) return <HomeIcon />;
//     if (lowerFacility.includes('ліфт') || lowerFacility.includes('лифт')) return <HomeIcon />;
    
//     return <HomeIcon />;
//   };

//   const handleOpenRoute = () => {
//     if (formData.latitude && formData.longitude) {
//       if (userLocation) {
//         window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${formData.latitude},${formData.longitude}`);
//       } else {
//         window.open(`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`);
//       }
//     }
//   };

//   const getCategoryIcon = () => {
//     switch(formData.category) {
//       case 'Квартира': return <HomeIcon />;
//       case 'Гостиница': return <HotelIcon />;
//       case 'Хостел': return <KingBedIcon />;
//       case 'Дом': return <HomeIcon />;
//       case 'База отдыха': return <HomeIcon />;
//       case 'Сауна/Баня': return <BathtubIcon />;
//       default: return <ApartmentIcon />;
//     }
//   };

//   const getBooleanValue = (value) => {
//     if (value === 'yes') return t.yes;
//     if (value === 'no') return t.no;
//     return t.notSpecified;
//   };

//   const formatTime = (time) => {
//     if (!time) return '';
//     const [hours, minutes] = time.split(':');
//     return `${hours}:${minutes}`;
//   };

//   useEffect(() => {
//     if (navigator.geolocation && open) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.error('Ошибка геолокации:', error);
//         }
//       );
//     }
//   }, [open]);

//   if (!open) return null;

//   return (
//     <Dialog
//       open={open}
//       onClose={() => onClose(false)}
//       maxWidth="lg"
//       fullWidth
//       scroll="paper"
//       sx={{ 
//         '& .MuiDialog-paper': { 
//           maxHeight: '90vh',
//           width: '100%',
//           maxWidth: '1300px'
//         } 
//       }}
//     >
//       <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//         {getCategoryIcon()}
//         {t.previewTitle}
//       </DialogTitle>
      
//       <DialogContent dividers>
//         <Box sx={{ 
//           display: 'flex',
//           flexDirection: 'column',
//           maxWidth: '1200px',
//           mx: 'auto',
//           width: '100%'
//         }}>
//           <Box mb={2} sx={{textAlign: 'center' }}>
//             <Chip 
//               label={translateCategory(formData.category)}
//               color="primary" 
//               icon={getCategoryIcon()}
//               sx={{ fontSize: '15px', height: '30px', padding: '8px' }}
//             />
//           </Box>

//           <Box mb={2}>
//             <Typography
//               component="div"
//               sx={{
//                 fontSize: {
//                   xs: '1rem',
//                   sm: '1.3rem',
//                   md: '1.5rem',
//                 },
//                 fontWeight: 'bold',
//                 lineHeight: 1.2,
//                 fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//                 margin: 0,
//                 padding: 0,
//               }}
//             >
//               {formData.objectName || formData.name || t.noName}
//             </Typography>
//           </Box>

//           <Box 
//             sx={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: 1,
//               mb: 3,
//               cursor: 'pointer',
//               '&:hover': {
//                 textDecoration: 'underline',
//                 color: 'primary.main'
//               }
//             }}
//             onClick={handleOpenRoute}
//           >
//             <LocationIcon color="primary" />
//             <Typography variant="body1">
//               {formatAddress(
//                 formData.city, 
//                 formData.street, 
//                 formData.houseNumber, 
//                 formData.district, 
//                 formData.metro,
//                 t
//               )}
//             </Typography>
//           </Box>

//           <Box sx={{
//             display: 'flex',
//             flexDirection: { xs: 'column', md: 'row' },
//             gap: 3,
//             width: '100%'
//           }}>
//             <Box sx={{ flex: 1, minWidth: 0 }}>
//               <FileUploadSlider 
//                 photos={uploudImages}
//                 price={formData.price}
//                 name={formData.name || apartmentInfo.name || formData.ownerName || t.noName}
//                 phones={
//                   Array.isArray(formData.phones) ? formData.phones : 
//                   formData.phones ? [formData.phones] :
//                   Array.isArray(apartmentInfo.phones) ? apartmentInfo.phones :
//                   apartmentInfo.phones ? [apartmentInfo.phones] :
//                   Array.isArray(userPhones) ? userPhones :
//                   userPhones ? [userPhones] : 
//                   ['+380XXXXXXXXXX']
//                 }
//                 category={translateCategory(formData.category)}
//                 address={formatAddress(
//                   formData.city,
//                   formData.street,
//                   formData.houseNumber,
//                   formData.district,
//                   formData.metro,
//                   t,
//                 )}
//                 editable={false}
//               />

//               <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
//                 <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//                   {t.description}
//                 </Typography>
//                 <Typography 
//                   paragraph 
//                   sx={{ 
//                     whiteSpace: 'pre-line',
//                     wordWrap: 'break-word',
//                     overflowWrap: 'break-word',
//                     wordBreak: 'break-word',
//                     maxWidth: '100%',
//                     hyphens: 'auto',
//                     textAlign: 'justify'
//                   }}
//                 >
//                   {formData.description || t.noDescription}
//                 </Typography>
                
//                 <Divider sx={{ my: 3 }} />

//                 <Grid container spacing={3}>
//                   <Grid item xs={12} md={6}>
//                     <Typography variant="h6" gutterBottom>
//                       {t.mainFeatures}
//                     </Typography>
                    
//                     <List dense>
//                       <ListItem>
//                         <ListItemAvatar>
//                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                             <HomeIcon fontSize="small" />
//                           </Avatar>
//                         </ListItemAvatar>
//                         <ListItemText 
//                           primary={t.rooms} 
//                           secondary={apartmentInfo.rooms || t.notSpecified} 
//                         />
//                       </ListItem>
                      
//                       <ListItem>
//                         <ListItemAvatar>
//                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                             <PersonIcon fontSize="small" />
//                           </Avatar>
//                         </ListItemAvatar>
//                         <ListItemText 
//                           primary={t.guests} 
//                           secondary={apartmentInfo.beds || t.notSpecified} 
//                         />
//                       </ListItem>
                      
//                       <ListItem>
//                         <ListItemAvatar>
//                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                             <HomeIcon fontSize="small" />
//                           </Avatar>
//                         </ListItemAvatar>
//                         <ListItemText 
//                           primary={t.area} 
//                           secondary={apartmentInfo.size ? `${apartmentInfo.size} м²` : t.notSpecified} 
//                         />
//                       </ListItem>
                      
//                       <ListItem>
//                         <ListItemAvatar>
//                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                             <HomeIcon fontSize="small" />
//                           </Avatar>
//                         </ListItemAvatar>
//                         <ListItemText 
//                           primary={t.floor} 
//                           secondary={
//                             apartmentInfo.floor 
//                               ? `${apartmentInfo.floor} ${t.of} ${apartmentInfo.totalFloors}` 
//                               : t.notSpecified
//                           } 
//                         />
//                       </ListItem>

//                       <ListItem>
//                         <ListItemAvatar>
//                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                             <ChildCareIcon fontSize="small" />
//                           </Avatar>
//                         </ListItemAvatar>
//                         <ListItemText 
//                           primary={t.kidsAge} 
//                           secondary={apartmentInfo.kidsAge ? `${apartmentInfo.kidsAge} ${t.years}` : t.unlimited} 
//                         />
//                       </ListItem>

//                       <ListItem>
//                         <ListItemAvatar>
//                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                             <PersonIcon fontSize="small" />
//                           </Avatar>
//                         </ListItemAvatar>
//                         <ListItemText 
//                           primary={t.ageLimit} 
//                           secondary={apartmentInfo.ageLimit ? `${t.from} ${apartmentInfo.ageLimit} ${t.years}` : t.unlimited} 
//                         />
//                       </ListItem>

//                       <ListItem>
//                         <ListItemAvatar>
//                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                             <CelebrationIcon fontSize="small" />
//                           </Avatar>
//                         </ListItemAvatar>
//                         <ListItemText 
//                           primary={t.parties} 
//                           secondary={getBooleanValue(apartmentInfo.parties)} 
//                         />
//                       </ListItem>
//                     </List>
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <Typography variant="h6" gutterBottom>
//                       {t.rentalTerms}
//                     </Typography>
                    
//                     <List dense>
//                       <ListItem>
//                         <ListItemAvatar>
//                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                             <TimeIcon fontSize="small" />
//                           </Avatar>
//                         </ListItemAvatar>
//                         <ListItemText 
//                           primary={t.checkInOut} 
//                           secondary={
//                             apartmentInfo.checkIn || apartmentInfo.checkOut 
//                               ? `${formatTime(apartmentInfo.checkIn)} / ${formatTime(apartmentInfo.checkOut)}` 
//                               : t.notSpecified
//                           } 
//                         />
//                       </ListItem>
                      
//                       <ListItem>
//                         <ListItemAvatar>
//                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                             <TimeIcon fontSize="small" />
//                           </Avatar>
//                         </ListItemAvatar>
//                         <ListItemText 
//                           primary={t.fullDayCheckIn} 
//                           secondary={getBooleanValue(apartmentInfo.fullDayCheckIn)} 
//                         />
//                       </ListItem>
                      
//                       <ListItem>
//                         <ListItemAvatar>
//                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                             <SmokingIcon fontSize="small" />
//                           </Avatar>
//                         </ListItemAvatar>
//                         <ListItemText 
//                           primary={t.smoking} 
//                           secondary={getBooleanValue(apartmentInfo.smoking)} 
//                         />
//                       </ListItem>
                      
//                       <ListItem>
//                         <ListItemAvatar>
//                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                             <PetsIcon fontSize="small" />
//                           </Avatar>
//                         </ListItemAvatar>
//                         <ListItemText 
//                           primary={t.pets} 
//                           secondary={getBooleanValue(apartmentInfo.pets)} 
//                         />
//                       </ListItem>
                      
//                       <ListItem>
//                         <ListItemAvatar>
//                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                             <DocsIcon fontSize="small" />
//                           </Avatar>
//                         </ListItemAvatar>
//                         <ListItemText 
//                           primary={t.reportDocs} 
//                           secondary={getBooleanValue(apartmentInfo.reportDocs)} 
//                         />
//                       </ListItem>
                      
//                       <ListItem>
//                         <ListItemAvatar>
//                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                             <HomeIcon fontSize="small" />
//                           </Avatar>
//                         </ListItemAvatar>
//                         <ListItemText 
//                           primary={t.minRent} 
//                           secondary={apartmentInfo.minRent ? `${apartmentInfo.minRent} ${t.days}` : t.notSpecified} 
//                         />
//                       </ListItem>
                      
//                       <ListItem>
//                         <ListItemAvatar>
//                           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                             <HomeIcon fontSize="small" />
//                           </Avatar>
//                         </ListItemAvatar>
//                         <ListItemText 
//                           primary={t.deposit} 
//                           secondary={apartmentInfo.deposit ? `${apartmentInfo.deposit} грн` : t.notRequired} 
//                         />
//                       </ListItem>
//                     </List>
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
//                       {t.amenities}
//                     </Typography>
                    
//                     <Box sx={{ 
//                       display: 'grid',
//                       gridTemplateColumns: { 
//                         xs: 'repeat(auto-fill, minmax(140px, 1fr))', 
//                         sm: 'repeat(auto-fill, minmax(160px, 1fr))',
//                         md: 'repeat(auto-fill, minmax(180px, 1fr))'
//                       },
//                       gap: { xs: 1, sm: 1.5 },
//                       width: '100%'
//                     }}>
//                       {apartmentInfo.conveniences?.length > 0 ? (
//                         apartmentInfo.conveniences.map((item, index) => (
//                           <Box
//                             key={index}
//                             sx={{
//                               display: 'flex',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                               minHeight: { xs: '40px', sm: '44px', md: '48px' },
//                               borderRadius: '8px',
//                               border: '2px solid #1976d2',
//                               backgroundColor: '#1976d2',
//                               color: 'white',
//                               padding: { xs: '6px 8px', sm: '8px 12px' },
//                               position: 'relative',
//                               overflow: 'hidden',
//                               boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//                               transition: 'all 0.2s ease',
//                               '&:hover': {
//                                 backgroundColor: '#1565c0',
//                                 transform: 'translateY(-1px)',
//                                 boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
//                               }
//                             }}
//                           >
//                             <Box
//                               sx={{
//                                 position: 'absolute',
//                                 top: '4px',
//                                 right: '4px',
//                                 width: { xs: '14px', sm: '16px' },
//                                 height: { xs: '14px', sm: '16px' },
//                                 backgroundColor: 'white',
//                                 borderRadius: '50%',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
//                               }}
//                             >
//                               <CheckIcon sx={{ 
//                                 color: '#1976d2', 
//                                 fontSize: { xs: '9px', sm: '10px' },
//                                 fontWeight: 'bold',
//                                 lineHeight: 1
//                               }} />
//                             </Box>
                            
//                             <Box sx={{ 
//                               display: 'flex', 
//                               alignItems: 'center', 
//                               gap: { xs: 0.5, sm: 0.75 },
//                               pr: { xs: 1.2, sm: 1.5 },
//                               width: '100%',
//                               overflow: 'hidden'
//                             }}>
//                               <Box sx={{ 
//                                 display: 'flex', 
//                                 alignItems: 'center', 
//                                 justifyContent: 'center',
//                                 color: 'white',
//                                 flexShrink: 0,
//                                 '& .MuiSvgIcon-root': {
//                                   fontSize: { xs: '16px', sm: '18px' }
//                                 }
//                               }}>
//                                 {getFacilityIcon(item)}
//                               </Box>
//                               <Typography 
//                                 variant="body2" 
//                                 sx={{ 
//                                   fontWeight: 600,
//                                   fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
//                                   lineHeight: 1.1,
//                                   color: 'white',
//                                   overflow: 'hidden',
//                                   textOverflow: 'ellipsis',
//                                   whiteSpace: 'nowrap',
//                                   flexGrow: 1
//                                 }}
//                               >
//                                 {translateConvenience(item)}
//                               </Typography>
//                             </Box>
//                           </Box>
//                         ))
//                       ) : (
//                         <Typography variant="body2" color="text.secondary" sx={{ gridColumn: '1 / -1' }}>
//                           {t.noAmenities}
//                         </Typography>
//                       )}
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </Paper>

//               {formData.latitude && formData.longitude && (
//                 <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
//                   <Typography variant="h6" gutterBottom>
//                     {t.location}
//                   </Typography>
                  
//                   <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden', mb: 2 }}>
//                     {isLoaded ? (
//                       <GoogleMap
//                         mapContainerStyle={{ width: '100%', height: '100%' }}
//                         center={{
//                           lat: parseFloat(formData.latitude),
//                           lng: parseFloat(formData.longitude),
//                         }}
//                         zoom={15}
//                       >
//                         <Marker
//                           position={{
//                             lat: parseFloat(formData.latitude),
//                             lng: parseFloat(formData.longitude),
//                           }}
//                         />
//                       </GoogleMap>
//                     ) : (
//                       <Box display="flex" justifyContent="center" alignItems="center" height="100%">
//                         <CircularProgress />
//                       </Box>
//                     )}
//                   </Box>

//                   {userLocation && (
//                     <Box textAlign="center">
//                       <Button 
//                         variant="contained" 
//                         color="primary"
//                         component="a"
//                         href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${formData.latitude},${formData.longitude}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         {t.buildRoute}
//                       </Button>
//                     </Box>
//                   )}
//                 </Paper>
//               )}
//             </Box>
//           </Box>
//         </Box>
//       </DialogContent>
      
//       <DialogActions sx={{ p: 2 }}>
//         <Button 
//           onClick={() => onClose(true)} 
//           variant="outlined"
//           color="secondary"
//           sx={{ mr: 2 }}
//         >
//           {t.edit}
//         </Button>
//         <Button 
//           onClick={() => onClose(false)} 
//           variant="contained"
//           color="primary"
//         >
//           {t.publish}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PreviewDialog;





// PreviewDialog.jsx - УПРОЩЕННАЯ ВЕРСИЯ (без FileUploadSlider)

'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  Chip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import {
  Home as HomeIcon,
  Hotel as HotelIcon,
  Bathtub as BathtubIcon,
  KingBed as KingBedIcon,
  Apartment as ApartmentIcon,
  DirectionsCar as DirectionsCarIcon,
  Wifi as WifiIcon,
  Tv as TvIcon,
  AcUnit as AcUnitIcon,
  LocalLaundryService as LaundryIcon,
  Person as PersonIcon,
  ChildCare as ChildCareIcon,
  SmokingRooms as SmokingIcon,
  Pets as PetsIcon,
  Description as DocsIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Celebration as CelebrationIcon,
  Check as CheckIcon,
  ArrowBackIosNew as ArrowBackIcon,
  ArrowForwardIos as ArrowForwardIcon,
  Close as CloseIcon,
  Fullscreen as FullscreenIcon,
} from '@mui/icons-material';
import { useLanguage } from '@/app/LanguageContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const translations = {
  ua: {
    previewTitle: 'Попередній перегляд оголошення',
    description: 'Опис',
    noDescription: 'Опис відсутній',
    mainFeatures: 'Основні характеристики',
    rooms: 'Кімнат',
    guests: 'Кількість гостей',
    area: 'Площа',
    floor: 'Поверх',
    totalFloors: 'Всього поверхів',
    kidsAge: 'Вік дітей від',
    ageLimit: 'Вікове обмеження',
    parties: 'Святкування',
    rentalTerms: 'Умови оренди',
    checkInOut: 'Час заїзду/виїзду',
    fullDayCheckIn: 'Цілодобове заселення',
    smoking: 'Куріння',
    pets: 'Тварини',
    reportDocs: 'Звітні документи',
    minRent: 'Мінімальний термін оренди',
    deposit: 'Залог',
    notRequired: 'Не потрібен',
    amenities: 'Зручності',
    noAmenities: 'Зручності не вказані',
    location: 'Розташування',
    buildRoute: 'Побудувати маршрут',
    edit: 'Редагувати',
    publish: 'Опублікувати',
    yes: 'Так',
    no: 'Ні',
    notSpecified: 'Не вказано',
    days: 'днів',
    years: 'років',
    from: 'від',
    unlimited: 'Не обмежено',
    of: 'з',
    district: 'район',
    metro: 'метро',
    noName: 'Без назви',
    savingRotations: 'Збереження ...',
    categories: {
      'Квартира': 'Квартира',
      'Гостиница': 'Готель',
      'Хостел': 'Хостел',
      'Дом': 'Будинок',
      'База отдыха': 'База відпочинку',
      'Сауна/Баня': 'Сауна/Лазня',
      'Готель для тварин': 'Готель для тварин',
      'Глемпінг': 'Глемпінг',
      'Пансіонат': 'Пансіонат',
      'Котедж для компній': 'Котедж для компаній',
      'Коворкінг': 'Коворкінг',
      'Автокемпінг': 'Автокемпінг'
    },
    conveniences: {
      "Балкон": "Балкон",
      "Барбекю-зона": "Барбекю-зона",
      "Басейн": "Басейн",
      "Ігрова кімната": "Ігрова кімната",
      "Блендер": "Блендер",
      "Бойлер": "Бойлер",
      "Ванна": "Ванна",
      "Вентилятор": "Вентилятор",
      "Генератор": "Генератор",
      "Громадська кухня": "Громадська кухня",
      "Джакузі": "Джакузі",
      "Дитяче ліжечко": "Дитяче ліжечко",
      "Дитячий стілець": "Дитячий стілець",
      "Домашній кінотеатр": "Домашній кінотеатр",
      "Духовка": "Духовка",
      "Душова кабіна": "Душова кабіна",
      "Електрочайник": "Електрочайник",
      "Електроплита": "Електроплита",
      "Газова плита": "Газова плита",
      "Зарядка для електромобілів": "Зарядка для електромобілів",
      "Заміна постільної білизни": "Заміна постільної білизни",
      "Інтернет": "Інтернет",
      "Кавоварка": "Кавоварка",
      "Камін": "Камін",
      "Кабельне ТБ": "Кабельне ТБ",
      "Кондиціонер": "Кондиціонер",
      "Ліжко": "Ліжко",
      "Диван": "Диван",
      "Лазня": "Лазня",
      "Мангал": "Мангал",
      "Мікрохвильова піч": "Мікрохвильова піч",
      "Охорона": "Охорона",
      "Парковка": "Парковка",
      "Комп'ютер": "Комп'ютер",
      "Пляжне обладнання": "Пляжне обладнання",
      "Посуд": "Посуд",
      "Посудомийна машина": "Посудомийна машина",
      "Пральна машина": "Пральна машина",
      "Пральний порошок": "Пральний порошок",
      "Праска": "Праска",
      "Рушники": "Рушники",
      "Сейф": "Сейф",
      "Спортзал": "Спортзал",
      "Спортивний інвентар": "Спортивний інвентар",
      "Столові прибори": "Столові прибори",
      "Сушилка": "Сушилка",
      "Супутникове ТБ": "Супутникове ТБ",
      "Тапочки": "Тапочки",
      "Тераса": "Тераса",
      "Тостер": "Тостер",
      "Туалетні принадлежності": "Туалетні принадлежності",
      "Фен": "Фен",
      "Холодильник": "Холодильник",
      "Догляд за тваринами": "Догляд за тваринами",
      "Кафе": "Кафе",
      "Конференц-зал": "Конференц-зал",
      "Переговорна": "Переговорна",
      "Лікувальні процедури": "Лікувальні процедури",
      "Організація подій": "Організація подій",
      "Трансфер": "Трансфер",
      "Харчування": "Харчування",
      "Прокат": "Прокат"
    }
  },
  ru: {
    previewTitle: 'Предпросмотр объявления',
    description: 'Описание',
    noDescription: 'Описание отсутствует',
    mainFeatures: 'Основные характеристики',
    rooms: 'Комнат',
    guests: 'Количество гостей',
    area: 'Площадь',
    floor: 'Этаж',
    totalFloors: 'Всего этажей',
    kidsAge: 'Возраст детей от',
    ageLimit: 'Возрастное ограничение',
    parties: 'Празднование',
    rentalTerms: 'Условия аренды',
    checkInOut: 'Время заезда/выезда',
    fullDayCheckIn: 'Круглосуточное заселение',
    smoking: 'Курение',
    pets: 'Животные',
    reportDocs: 'Отчетные документы',
    minRent: 'Минимальный срок аренды',
    deposit: 'Залог',
    notRequired: 'Не требуется',
    amenities: 'Удобства',
    noAmenities: 'Удобства не указаны',
    location: 'Местоположение',
    buildRoute: 'Проложить маршрут',
    edit: 'Редактировать',
    publish: 'Опубликовать',
    yes: 'Да',
    no: 'Нет',
    notSpecified: 'Не указано',
    days: 'дней',
    years: 'лет',
    from: 'от',
    unlimited: 'Не ограничено',
    of: 'из',
    district: 'район',
    metro: 'метро',
    noName: 'Без названия',
    savingRotations: 'Сохранение ...',
    categories: {
      'Квартира': 'Квартира',
      'Гостиница': 'Гостиница',
      'Хостел': 'Хостел',
      'Дом': 'Дом',
      'База отдыха': 'База отдыха',
      'Сауна/Баня': 'Сауна/Баня',
      'Готель для тварин': 'Отель для животных',
      'Глемпінг': 'Глэмпинг',
      'Пансіонат': 'Пансионат',
      'Котедж для компній': 'Коттедж для компаний',
      'Коворкінг': 'Коворкинг',
      'Автокемпінг': 'Автокемпинг'
    },
    conveniences: {
      "Балкон": "Балкон",
      "Барбекю-зона": "Зона барбекю",
      "Басейн": "Бассейн",
      "Ігрова кімната": "Игровая комната",
      "Блендер": "Блендер",
      "Бойлер": "Бойлер",
      "Ванна": "Ванна",
      "Вентилятор": "Вентилятор",
      "Генератор": "Генератор",
      "Громадська кухня": "Общая кухня",
      "Джакузі": "Джакузи",
      "Дитяче ліжечко": "Детская кроватка",
      "Дитячий стілець": "Детский стульчик",
      "Домашній кінотеатр": "Домашний кинотеатр",
      "Духовка": "Духовка",
      "Душова кабіна": "Душевая кабина",
      "Електрочайник": "Электрочайник",
      "Електроплита": "Электроплита",
      "Газова плита": "Газовая плита",
      "Зарядка для електромобілів": "Зарядка для электромобилей",
      "Заміна постільної білизни": "Смена постельного белья",
      "Інтернет": "Интернет",
      "Кавоварка": "Кофеварка",
      "Камін": "Камин",
      "Кабельне ТБ": "Кабельное ТВ",
      "Кондиціонер": "Кондиционер",
      "Ліжко": "Кровать",
      "Диван": "Диван",
      "Лазня": "Баня",
      "Мангал": "Мангал",
      "Мікрохвильова піч": "Микроволновая печь",
      "Охорона": "Охрана",
      "Парковка": "Парковка",
      "Комп'ютер": "Компьютер",
      "Пляжне обладнання": "Пляжное оборудование",
      "Посуд": "Посуда",
      "Посудомийна машина": "Посудомоечная машина",
      "Пральна машина": "Стиральная машина",
      "Пральний порошок": "Стиральный порошок",
      "Праска": "Утюг",
      "Рушники": "Полотенца",
      "Сейф": "Сейф",
      "Спортзал": "Спортзал",
      "Спортивний інвентар": "Спортивный инвентарь",
      "Столові прибори": "Столовые приборы",
      "Сушилка": "Сушилка",
      "Супутникове ТБ": "Спутниковое ТВ",
      "Тапочки": "Тапочки",
      "Тераса": "Терраса",
      "Тостер": "Тостер",
      "Туалетні принадлежності": "Туалетные принадлежности",
      "Фен": "Фен",
      "Холодильник": "Холодильник",
      "Догляд за тваринами": "Уход за животными",
      "Кафе": "Кафе",
      "Конференц-зал": "Конференц-зал",
      "Переговорна": "Переговорная",
      "Лікувальні процедури": "Лечебные процедуры",
      "Організація подій": "Организация мероприятий",
      "Трансфер": "Трансфер",
      "Харчування": "Питание",
      "Прокат": "Прокат"
    }
  }
};

const formatAddress = (city, street, houseNumber, district, metro, t) => {
  const parts = [];
  if (city) parts.push(city);
  if (street && houseNumber) parts.push(`${street} ${houseNumber}`);
  if (district) parts.push(`${t.district} ${district}`);
  if (metro) parts.push(`${t.metro} ${metro}`);
  return parts.join(', ');
};

const PreviewDialog = ({
  open,
  onClose,
  formData,
  uploudImages = [],
  apartmentInfo = {},
  photoError,
  userPhones = [],
}) => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  const [userLocation, setUserLocation] = useState(null);
  const [isSavingRotations, setIsSavingRotations] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const translateCategory = (category) => {
    if (t.categories && t.categories[category]) {
      return t.categories[category];
    }
    if (currentLanguage === 'ru') {
      const uaCategory = Object.entries(translations.ua.categories).find(
        ([uaKey]) => uaKey === category
      );
      if (uaCategory) {
        return t.categories[uaCategory[1]] || category;
      }
    }
    return category;
  };

  const translateConvenience = (convenience) => {
    if (t.conveniences && t.conveniences[convenience]) {
      return t.conveniences[convenience];
    }
    if (currentLanguage === 'ru') {
      const uaConvenience = Object.entries(translations.ua.conveniences).find(
        ([uaKey]) => uaKey === convenience
      );
      if (uaConvenience) {
        return t.conveniences[uaConvenience[1]] || convenience;
      }
    }
    return convenience;
  };

  const handleOpenRoute = () => {
    if (formData.latitude && formData.longitude) {
      if (userLocation) {
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${formData.latitude},${formData.longitude}`);
      } else {
        window.open(`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`);
      }
    }
  };

  const getCategoryIcon = () => {
    switch(formData.category) {
      case 'Квартира': return <HomeIcon />;
      case 'Гостиница': return <HotelIcon />;
      case 'Хостел': return <KingBedIcon />;
      case 'Дом': return <HomeIcon />;
      case 'База отдыха': return <HomeIcon />;
      case 'Сауна/Баня': return <BathtubIcon />;
      default: return <ApartmentIcon />;
    }
  };

  const getBooleanValue = (value) => {
    if (value === 'yes') return t.yes;
    if (value === 'no') return t.no;
    return t.notSpecified;
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  // Функция для сохранения повернутых фото и публикации
  const saveRotationsAndPublish = async () => {
    console.log('=== [PreviewDialog] PUBLISH BUTTON CLICKED ===');
    
    setIsSavingRotations(true);
    
    try {
      if (typeof window.savePhotoRotations === 'function') {
        console.log('[PreviewDialog] Calling window.savePhotoRotations...');
        const updatedPhotos = await window.savePhotoRotations();
        console.log('[PreviewDialog] Updated photos after rotation:', updatedPhotos);
        
        if (updatedPhotos && updatedPhotos.length > 0) {
          await new Promise(resolve => setTimeout(resolve, 500));
          console.log('[PreviewDialog] Calling onClose with updated photos');
          onClose(false, { shouldPublish: true, updatedPhotos });
          return;
        }
      } else {
        console.warn('[PreviewDialog] window.savePhotoRotations is not defined');
      }
      
      onClose(false, { shouldPublish: true });
      
    } catch (error) {
      console.error('[PreviewDialog] Error saving rotations:', error);
      onClose(false, { shouldPublish: true });
    } finally {
      setIsSavingRotations(false);
    }
  };

  const handleEdit = () => {
    onClose(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : uploudImages.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % uploudImages.length);
  };

  useEffect(() => {
    if (navigator.geolocation && open) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.warn('Геолокация недоступна или отклонена');
        }
      );
    }
  }, [open]);

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={() => onClose(true)}
      maxWidth="lg"
      fullWidth
      scroll="paper"
      sx={{ 
        '& .MuiDialog-paper': { 
          maxHeight: '90vh',
          width: '100%',
          maxWidth: '1300px'
        } 
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {getCategoryIcon()}
        {t.previewTitle}
      </DialogTitle>
      
      <DialogContent dividers>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '1200px',
          mx: 'auto',
          width: '100%'
        }}>
          <Box mb={2} sx={{textAlign: 'center' }}>
            <Chip 
              label={translateCategory(formData.category)}
              color="primary" 
              icon={getCategoryIcon()}
              sx={{ fontSize: '15px', height: '30px', padding: '8px' }}
            />
          </Box>

          <Box mb={2}>
            <Typography
              component="div"
              sx={{
                fontSize: {
                  xs: '1rem',
                  sm: '1.3rem',
                  md: '1.5rem',
                },
                fontWeight: 'bold',
                lineHeight: 1.2,
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                margin: 0,
                padding: 0,
              }}
            >
              {formData.objectName || formData.name || t.noName}
            </Typography>
          </Box>

          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              mb: 3,
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
                color: 'primary.main'
              }
            }}
            onClick={handleOpenRoute}
          >
            <LocationIcon color="primary" />
            <Typography variant="body1">
              {formatAddress(
                formData.city, 
                formData.street, 
                formData.houseNumber, 
                formData.district, 
                formData.metro,
                t
              )}
            </Typography>
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            width: '100%'
          }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              
              {/* ГАЛЕРЕЯ ФОТО С ПОВОРОТАМИ - ВМЕСТО FileUploadSlider */}
              {uploudImages.length > 0 ? (
                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: { xs: '300px', sm: '400px', md: '500px' },
                      backgroundColor: '#000',
                      borderRadius: 2,
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: `rotate(${uploudImages[currentIndex]?.rotation || 0}deg)`,
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <img
                        src={uploudImages[currentIndex]?.url}
                        alt={`Фото ${currentIndex + 1}`}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                    
                    {uploudImages.length > 1 && (
                      <>
                        <IconButton
                          onClick={handlePrev}
                          sx={{
                            position: 'absolute',
                            left: 16,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                          }}
                        >
                          <ArrowBackIcon />
                        </IconButton>
                        <IconButton
                          onClick={handleNext}
                          sx={{
                            position: 'absolute',
                            right: 16,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                          }}
                        >
                          <ArrowForwardIcon />
                        </IconButton>
                      </>
                    )}
                    
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        bgcolor: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 4,
                        fontSize: '0.875rem',
                      }}
                    >
                      {currentIndex + 1} / {uploudImages.length}
                    </Box>
                  </Box>

                  {/* Миниатюры */}
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      mt: 2,
                      overflowX: 'auto',
                      pb: 1,
                    }}
                  >
                    {uploudImages.map((photo, index) => (
                      <Box
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        sx={{
                          width: 80,
                          height: 80,
                          flexShrink: 0,
                          cursor: 'pointer',
                          border: currentIndex === index ? '3px solid #1976d2' : '1px solid #ddd',
                          borderRadius: 1,
                          overflow: 'hidden',
                          backgroundColor: '#f5f5f5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            transform: `rotate(${photo.rotation || 0}deg)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <img
                            src={photo.url}
                            alt={`Миниатюра ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: { xs: '300px', sm: '400px', md: '500px' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5',
                    borderRadius: 2,
                    mb: 3,
                  }}
                >
                  <Typography color="text.secondary">Немає фотографій</Typography>
                </Box>
              )}

              <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  {t.description}
                </Typography>
                <Typography 
                  paragraph 
                  sx={{ 
                    whiteSpace: 'pre-line',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                    maxWidth: '100%',
                    hyphens: 'auto',
                    textAlign: 'justify'
                  }}
                >
                  {formData.description || t.noDescription}
                </Typography>
                
                <Divider sx={{ my: 3 }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      {t.mainFeatures}
                    </Typography>
                    
                    <List dense>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <HomeIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.rooms} 
                          secondary={apartmentInfo.rooms || t.notSpecified} 
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <PersonIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.guests} 
                          secondary={apartmentInfo.beds || t.notSpecified} 
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <HomeIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.area} 
                          secondary={apartmentInfo.size ? `${apartmentInfo.size} м²` : t.notSpecified} 
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <HomeIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.floor} 
                          secondary={
                            apartmentInfo.floor 
                              ? `${apartmentInfo.floor} ${t.of} ${apartmentInfo.totalFloors}` 
                              : t.notSpecified
                          } 
                        />
                      </ListItem>

                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <ChildCareIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.kidsAge} 
                          secondary={apartmentInfo.kidsAge ? `${apartmentInfo.kidsAge} ${t.years}` : t.unlimited} 
                        />
                      </ListItem>

                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <PersonIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.ageLimit} 
                          secondary={apartmentInfo.ageLimit ? `${t.from} ${apartmentInfo.ageLimit} ${t.years}` : t.unlimited} 
                        />
                      </ListItem>

                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <CelebrationIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.parties} 
                          secondary={getBooleanValue(apartmentInfo.parties)} 
                        />
                      </ListItem>
                    </List>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      {t.rentalTerms}
                    </Typography>
                    
                    <List dense>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <TimeIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.checkInOut} 
                          secondary={
                            apartmentInfo.checkIn || apartmentInfo.checkOut 
                              ? `${formatTime(apartmentInfo.checkIn)} / ${formatTime(apartmentInfo.checkOut)}` 
                              : t.notSpecified
                          } 
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <TimeIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.fullDayCheckIn} 
                          secondary={getBooleanValue(apartmentInfo.fullDayCheckIn)} 
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <SmokingIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.smoking} 
                          secondary={getBooleanValue(apartmentInfo.smoking)} 
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <PetsIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.pets} 
                          secondary={getBooleanValue(apartmentInfo.pets)} 
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <DocsIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.reportDocs} 
                          secondary={getBooleanValue(apartmentInfo.reportDocs)} 
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <HomeIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.minRent} 
                          secondary={apartmentInfo.minRent ? `${apartmentInfo.minRent} ${t.days}` : t.notSpecified} 
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <HomeIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.deposit} 
                          secondary={apartmentInfo.deposit ? `${apartmentInfo.deposit} грн` : t.notRequired} 
                        />
                      </ListItem>
                    </List>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      {t.amenities}
                    </Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                      {apartmentInfo.conveniences?.length > 0 ? (
                        apartmentInfo.conveniences.map((item, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: "primary.light",
                              color: "primary.contrastText",
                              borderRadius: 2,
                              px: 2,
                              py: 1,
                            }}
                          >
                            <CheckIcon sx={{ mr: 1, fontSize: '1rem' }} />
                            <Typography variant="body2">
                              {translateConvenience(item)}
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          {t.noAmenities}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              {formData.latitude && formData.longitude && (
                <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {t.location}
                  </Typography>
                  
                  <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden', mb: 2 }}>
                    {isLoaded ? (
                      <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={{
                          lat: parseFloat(formData.latitude),
                          lng: parseFloat(formData.longitude),
                        }}
                        zoom={15}
                      >
                        <Marker
                          position={{
                            lat: parseFloat(formData.latitude),
                            lng: parseFloat(formData.longitude),
                          }}
                        />
                      </GoogleMap>
                    ) : (
                      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <CircularProgress />
                      </Box>
                    )}
                  </Box>

                  {userLocation && (
                    <Box textAlign="center">
                      <Button 
                        variant="contained" 
                        color="primary"
                        component="a"
                        href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${formData.latitude},${formData.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.buildRoute}
                      </Button>
                    </Box>
                  )}
                </Paper>
              )}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={handleEdit}
          variant="outlined"
          color="secondary"
          sx={{ mr: 2 }}
          disabled={isSavingRotations}
        >
          {t.edit}
        </Button>
        <Button 
          onClick={saveRotationsAndPublish}
          variant="contained"
          color="primary"
          disabled={isSavingRotations}
        >
          {isSavingRotations ? t.savingRotations : t.publish}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreviewDialog;