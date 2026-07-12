







// // pages/index.js или app/components/Search.js
// 'use client';

// import React, { useState, useRef, useEffect } from "react";
// import Autocomplete from "react-google-autocomplete";
// import { useLanguage } from "@/app/LanguageContext";
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   Checkbox,
//   ListItemText,
//   Popover,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   CircularProgress,
// } from "@mui/material";
// import { useRouter } from "next/navigation";

// const translations = {
//   ua: {
//     title: "Обирайте житло для своєї подорожі.",
//     subtitle: "Від готелів до приватних помешкань – знайдіть те, що потрібно.",
//     locationLabel: "Куди прямуєте?",
//     locationPlaceholder: "Введіть місцезнаходження",
//     guestsLabel: "Кількість гостей",
//     typeLabel: "Тип помешкання",
//     selectButton: "Вибрати",
//     options: {
//       apart: "Квартира",
//       hotel: "Готель",
//       "pet-hotel": "Готель для тварин",
//       hostel: "Хостел",
//       house: "Будинок",
//       "rest-base": "База відпочинку",
//       sauna: "Сауна/Баня",
//       glamping: "Глемпінг",
//       pansionat: "Санаторій/Пансіонат",
//       cottage: "Котедж для компаній",
//       coworking: "Коворкінг",
//       autocamping: "Автокемпінг",
//     },
//     searchButton: "Пошук",
//     searching: "Пошук...",
//     errorMessages: {
//       location: "Будь ласка, виберіть місцезнаходження.",
//       guests: "Будь ласка, вкажіть кількість гостей (мінімум 1).",
//       type: "Будь ласка, виберіть тип помешкання.",
//     },
//   },
//   ru: {
//     title: "Выбирайте жилье для путешествия.",
//     subtitle: "От отелей до частных домов – найдите то, что нужно.",
//     locationLabel: "Куда направляетесь?",
//     locationPlaceholder: "Введите местоположение",
//     guestsLabel: "Количество гостей",
//     typeLabel: "Тип жилья",
//     selectButton: "Выбрать",
//     options: {
//       apart: "Квартира",
//       hotel: "Гостиница",
//       "pet-hotel": "Отель для животных",
//       hostel: "Хостел",
//       house: "Дом",
//       "rest-base": "База отдыха",
//       sauna: "Сауна/Баня",
//       glamping: "Глэмпинг",
//       pansionat: "Санаторий/Пансионат",
//       cottage: "Коттедж для компаний",
//       coworking: "Коворкинг",
//       autocamping: "Автокемпинг",
//     },
//     searchButton: "Поиск",
//     searching: "Поиск...",
//     errorMessages: {
//       location: "Пожалуйста, выберите местоположение.",
//       guests: "Пожалуйста, укажите количество гостей (минимум 1).",
//       type: "Пожалуйста, выберите тип жилья.",
//     },
//   },
// };

// // Функция для нормализации города (как в рабочем коде)
// const normalizeCityName = (city) => {
//   if (!city) return '';
  
//   const nameMap = {
//     'киев': 'Київ',
//     'киеве': 'Київ',
//     'київ': 'Київ',
//     'київе': 'Київ',
//     'харьков': 'Харків',
//     'харков': 'Харків',
//     'харків': 'Харків',
//     'днепр': 'Дніпро',
//     'дніпро': 'Дніпро',
//     'днепропетровск': 'Дніпро',
//     'дніпропетровськ': 'Дніпро',
//     'львов': 'Львів',
//     'львів': 'Львів',
//     'одесса': 'Одеса',
//     'одеса': 'Одеса',
//     'запорожье': 'Запоріжжя',
//     'запоріжжя': 'Запоріжжя',
//     'донецк': 'Донецьк',
//     'донецьк': 'Донецьк',
//     'луганск': 'Луганськ',
//     'луганськ': 'Луганськ',
//     'крым': 'Крим',
//     'крим': 'Крим',
//     'симферополь': 'Крим',
//     'сіферополь': 'Крим',
//     'севастополь': 'Крим',
//     'ялта': 'Крим',
//     'евпатория': 'Крим',
//     'євпаторія': 'Крим',
//     'керчь': 'Крим',
//     'керч': 'Крим',
//     'феодосия': 'Крим',
//     'феодосія': 'Крим',
//   };
  
//   const lowerCity = city.toLowerCase().trim();
  
//   for (const [key, value] of Object.entries(nameMap)) {
//     if (lowerCity.includes(key)) {
//       return value;
//     }
//   }
  
//   return city.charAt(0).toUpperCase() + city.slice(1);
// };

// const Search = () => {
//   const [location, setLocation] = useState("");
//   const [guests, setGuests] = useState("");
//   const [types, setTypes] = useState([]);
//   const [errors, setErrors] = useState({
//     location: false,
//     guests: false,
//     type: false,
//   });
//   const [loadingSearch, setLoadingSearch] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
  
//   const selectRef = useRef(null);
//   const popoverRef = useRef(null);
//   const searchButtonRef = useRef(null);

//   const { currentLanguage } = useLanguage();
//   const router = useRouter();

//   const handlePlaceSelected = (place) => {
//     console.log('📍 Выбрано место:', place);
    
//     let cityName = "";
//     const locality = place.address_components?.find(comp => 
//       comp.types.includes('locality')
//     );
  
//     if (locality) {
//       cityName = locality.long_name;
//     } else {
//       cityName = place.formatted_address?.split(',')[0]?.trim() || place.name || "";
//     }
  
//     // Нормализуем название города
//     cityName = normalizeCityName(cityName);
    
//     console.log('🏙️ Нормализованное название города:', cityName);
//     setLocation(cityName);
//     setErrors(prev => ({ ...prev, location: false }));
//   };

//   // Функция для выполнения поиска
//   const performSearch = async (searchData) => {
//     try {
//       console.log('\n🔍 ===== НАЧАЛО ПОИСКА =====');
//       console.log('📦 Данные поиска:', searchData);
//       console.log('📍 Город:', searchData.location);
//       console.log('👥 Гостей:', searchData.guests);
//       console.log('🏷️ Типы:', searchData.types);
      
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/search`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(searchData),
//       });

//       console.log('📡 Статус ответа:', response.status);

//       if (!response.ok) {
//         throw new Error(`Search failed: ${response.status}`);
//       }

//       const results = await response.json();
//       console.log('📦 Ответ от API:', results);
      
//       if (results.success) {
//         const apartments = results.data || [];
//         console.log(`✅ Найдено квартир: ${apartments.length}`);
        
//         // Логируем все города из ответа
//         const cities = new Set();
//         apartments.forEach(apt => {
//           if (apt.city) cities.add(apt.city);
//         });
//         console.log('🏙️ Города в ответе:', Array.from(cities));
        
//         // Логируем первые 3 квартиры
//         console.log('🏠 Первые 3 квартиры:', apartments.slice(0, 3));
        
//         // Сохраняем в localStorage
//         localStorage.setItem('searchResults', JSON.stringify(results));
//         localStorage.setItem('searchParams', JSON.stringify(searchData));
        
//         console.log('💾 Данные сохранены в localStorage');
//         console.log('🔍 ===== КОНЕЦ ПОИСКА =====\n');
        
//         router.push('/search');
//       } else {
//         console.log('❌ Ошибка в ответе API:', results.message);
//         throw new Error(results.message || 'Search failed');
//       }
      
//     } catch (error) {
//       console.error('❌ Ошибка поиска:', error);
//       alert(
//         currentLanguage === "ua" 
//           ? "Помилка пошуку. Спробуйте ще раз." 
//           : "Ошибка поиска. Попробуйте еще раз."
//       );
//     } finally {
//       setLoadingSearch(false);
//     }
//   };

//   // Функция для валидации
//   const validateForm = () => {
//     const guestsNum = parseInt(guests);
//     const newErrors = {
//       location: !location.trim(),
//       guests: !guests || isNaN(guestsNum) || guestsNum < 1,
//       type: types.length === 0,
//     };

//     setErrors(newErrors);
    
//     return !(newErrors.location || newErrors.guests || newErrors.type);
//   };

//   // Обработчик отправки формы
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       console.log('❌ Форма не прошла валидацию');
//       return;
//     }

//     setLoadingSearch(true);

//     const searchData = {
//       location: location.trim(),
//       guests: parseInt(guests),
//       types: types,
//       language: currentLanguage
//     };

//     await performSearch(searchData);
//   };

//   // Обработчик для кнопки "Вибрать"
//   const handleSelectClick = () => {
//     setAnchorEl(null);
//     if (searchButtonRef.current) {
//       searchButtonRef.current.click();
//     }
//   };

//   const handleTypeClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setErrors(prev => ({ ...prev, type: types.length === 0 }));
//     setAnchorEl(null);
//   };

//   const handleCheckboxChange = (key) => (event) => {
//     event.stopPropagation();
//     setTypes((prev) =>
//       prev.includes(key)
//         ? prev.filter((item) => item !== key)
//         : [...prev, key]
//     );
//     setErrors(prev => ({ ...prev, type: false }));
//   };

//   const handleGuestsChange = (e) => {
//     const value = e.target.value;
    
//     if (value === "" || /^\d+$/.test(value)) {
//       setGuests(value);
      
//       const guestsNum = parseInt(value);
//       const isValid = value !== "" && !isNaN(guestsNum) && guestsNum >= 1;
//       setErrors(prev => ({ ...prev, guests: !isValid }));
//     }
//   };

//   const handleClickOutside = (event) => {
//     if (
//       selectRef.current && 
//       !selectRef.current.contains(event.target) &&
//       popoverRef.current &&
//       !popoverRef.current.contains(event.target)
//     ) {
//       handleClose();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [types]);

//   const open = Boolean(anchorEl);
//   const t = translations[currentLanguage];

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         mt: 4,
//         p: 3,
//         bgcolor: "background.paper",
//         borderRadius: 2,
//         boxShadow: 3,
//       }}
//     >
//       <Typography variant="h5" fontWeight={600} gutterBottom>
//         {t.title}
//       </Typography>
//       <Typography variant="body1" color="text.secondary" gutterBottom>
//         {t.subtitle}
//       </Typography>

//       <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//         {/* Поле для выбора местоположения */}
//         <Box>
//           <Autocomplete
//             apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
//             onPlaceSelected={handlePlaceSelected}
//             options={{
//               types: ["(cities)"],
//               componentRestrictions: { country: "ua" },
//             }}
//             placeholder={t.locationPlaceholder}
//             language={currentLanguage === "ua" ? "uk" : "ru"}
//             defaultValue={location}
//             style={{
//               width: "100%",
//               height: "56px",
//               fontSize: "16px",
//               padding: "0 14px",
//               border: errors.location
//                 ? "2px solid #d32f2f"
//                 : "1px solid rgba(0, 0, 0, 0.23)",
//               borderRadius: "4px",
//               boxSizing: "border-box",
//             }}
//           />
//           {errors.location && (
//             <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
//               {t.errorMessages.location}
//             </Typography>
//           )}
//         </Box>

//         {/* Поле для количества гостей */}
//         <TextField
//           type="number"
//           label={t.guestsLabel}
//           fullWidth
//           value={guests}
//           onChange={handleGuestsChange}
//           error={errors.guests}
//           helperText={errors.guests ? t.errorMessages.guests : ""}
//           inputProps={{ 
//             min: 1,
//             onKeyDown: (e) => {
//               if (['-', 'e', 'E', '+', '.'].includes(e.key)) {
//                 e.preventDefault();
//               }
//             }
//           }}
//         />

//         {/* Выбор типа жилья */}
//         <Box ref={selectRef}>
//           <Button
//             fullWidth
//             variant="outlined"
//             onClick={handleTypeClick}
//             sx={{
//               justifyContent: "space-between",
//               textTransform: "none",
//               height: "56px",
//               borderColor: errors.type ? "error.main" : "rgba(0, 0, 0, 0.23)",
//               color: types.length === 0 ? "text.secondary" : "text.primary",
//               textAlign: "left",
//             }}
//           >
//             {types.length === 0
//               ? t.typeLabel
//               : types.map((val) => t.options[val]).join(", ")}
//           </Button>
//           {errors.type && (
//             <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
//               {t.errorMessages.type}
//             </Typography>
//           )}

//           <Popover
//             open={open}
//             anchorEl={anchorEl}
//             onClose={handleClose}
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "left",
//             }}
//             sx={{
//               mt: 1,
//             }}
//           >
//             <Box ref={popoverRef} sx={{ width: selectRef.current?.clientWidth, maxWidth: 300 }}>
//               <List>
//                 {Object.entries(t.options).map(([key, label]) => (
//                   <ListItem key={key} disablePadding>
//                     <ListItemButton sx={{ py: 0.1, minHeight: 28 }}>
//                       <ListItemIcon sx={{ minWidth: 25 }}>
//                         <Checkbox
//                           edge="start"
//                           checked={types.includes(key)}
//                           tabIndex={-1}
//                           disableRipple
//                           onChange={handleCheckboxChange(key)}
//                         />
//                       </ListItemIcon>
//                       <ListItemText 
//                         primary={label} 
//                         onClick={() => {
//                           setTypes(prev => 
//                             prev.includes(key)
//                               ? prev.filter(item => item !== key)
//                               : [...prev, key]
//                           );
//                           setErrors(prev => ({ ...prev, type: false }));
//                         }}
//                       />
//                     </ListItemButton>
//                   </ListItem>
//                 ))}
//               </List>
//               <Box sx={{ p: 1 }}>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   onClick={handleSelectClick}
//                 >
//                   {t.selectButton}
//                 </Button>
//               </Box>
//             </Box>
//           </Popover>
//         </Box>

//         {/* Кнопка поиска */}
//         <Button
//           ref={searchButtonRef}
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           disabled={loadingSearch}
//           sx={{ 
//             position: 'relative',
//             height: '48px'
//           }}
//         >
//           {loadingSearch ? (
//             <>
//               <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
//               {t.searching}
//             </>
//           ) : (
//             t.searchButton
//           )}
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Search;



// // app/components/Search.js

// 'use client';

// import React, { useState, useRef, useEffect } from "react";
// import dynamic from 'next/dynamic';
// import { useLanguage } from "@/app/LanguageContext";
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   Checkbox,
//   ListItemText,
//   Popover,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   CircularProgress,
// } from "@mui/material";
// import { useRouter } from "next/navigation";

// // Динамічний імпорт Autocomplete (завантажиться тільки коли потрібно)
// const Autocomplete = dynamic(
//   () => import('react-google-autocomplete'),
//   { 
//     ssr: false,
//     loading: () => <TextField 
//       fullWidth 
//       placeholder="Введіть місцезнаходження" 
//       disabled 
//       sx={{ bgcolor: '#f5f5f5' }}
//     />
//   }
// );

// const translations = {
//   ua: {
//     title: "Обирайте житло для своєї подорожі.",
//     subtitle: "Від готелів до приватних помешкань – знайдіть те, що потрібно.",
//     locationLabel: "Куди прямуєте?",
//     locationPlaceholder: "Введіть місцезнаходження",
//     guestsLabel: "Кількість гостей",
//     typeLabel: "Тип помешкання",
//     selectButton: "Вибрати",
//     options: {
//       apart: "Квартира",
//       hotel: "Готель",
//       "pet-hotel": "Готель для тварин",
//       hostel: "Хостел",
//       house: "Будинок",
//       "rest-base": "База відпочинку",
//       sauna: "Сауна/Баня",
//       glamping: "Глемпінг",
//       pansionat: "Санаторій/Пансіонат",
//       cottage: "Котедж для компаній",
//       coworking: "Коворкінг",
//       autocamping: "Автокемпінг",
//     },
//     searchButton: "Пошук",
//     searching: "Пошук...",
//     errorMessages: {
//       location: "Будь ласка, виберіть місцезнаходження.",
//       guests: "Будь ласка, вкажіть кількість гостей (мінімум 1).",
//       type: "Будь ласка, виберіть тип помешкання.",
//     },
//   },
//   ru: {
//     title: "Выбирайте жилье для путешествия.",
//     subtitle: "От отелей до частных домов – найдите то, что нужно.",
//     locationLabel: "Куда направляетесь?",
//     locationPlaceholder: "Введите местоположение",
//     guestsLabel: "Количество гостей",
//     typeLabel: "Тип жилья",
//     selectButton: "Выбрать",
//     options: {
//       apart: "Квартира",
//       hotel: "Гостиница",
//       "pet-hotel": "Отель для животных",
//       hostel: "Хостел",
//       house: "Дом",
//       "rest-base": "База отдыха",
//       sauna: "Сауна/Баня",
//       glamping: "Глэмпинг",
//       pansionat: "Санаторий/Пансионат",
//       cottage: "Коттедж для компаний",
//       coworking: "Коворкинг",
//       autocamping: "Автокемпинг",
//     },
//     searchButton: "Поиск",
//     searching: "Поиск...",
//     errorMessages: {
//       location: "Пожалуйста, выберите местоположение.",
//       guests: "Пожалуйста, укажите количество гостей (минимум 1).",
//       type: "Пожалуйста, выберите тип жилья.",
//     },
//   },
// };

// const normalizeCityName = (city) => {
//   if (!city) return '';
  
//   const nameMap = {
//     'киев': 'Київ',
//     'киеве': 'Київ',
//     'київ': 'Київ',
//     'київе': 'Київ',
//     'харьков': 'Харків',
//     'харков': 'Харків',
//     'харків': 'Харків',
//     'днепр': 'Дніпро',
//     'дніпро': 'Дніпро',
//     'днепропетровск': 'Дніпро',
//     'дніпропетровськ': 'Дніпро',
//     'львов': 'Львів',
//     'львів': 'Львів',
//     'одесса': 'Одеса',
//     'одеса': 'Одеса',
//     'запорожье': 'Запоріжжя',
//     'запоріжжя': 'Запоріжжя',
//     'донецк': 'Донецьк',
//     'донецьк': 'Донецьк',
//     'луганск': 'Луганськ',
//     'луганськ': 'Луганськ',
//     'крым': 'Крим',
//     'крим': 'Крим',
//     'симферополь': 'Крим',
//     'сіферополь': 'Крим',
//     'севастополь': 'Крим',
//     'ялта': 'Крим',
//     'евпатория': 'Крим',
//     'євпаторія': 'Крим',
//     'керчь': 'Крим',
//     'керч': 'Крим',
//     'феодосия': 'Крим',
//     'феодосія': 'Крим',
//   };
  
//   const lowerCity = city.toLowerCase().trim();
  
//   for (const [key, value] of Object.entries(nameMap)) {
//     if (lowerCity.includes(key)) {
//       return value;
//     }
//   }
  
//   return city.charAt(0).toUpperCase() + city.slice(1);
// };

// const Search = () => {
//   const [location, setLocation] = useState("");
//   const [guests, setGuests] = useState("");
//   const [types, setTypes] = useState([]);
//   const [errors, setErrors] = useState({
//     location: false,
//     guests: false,
//     type: false,
//   });
//   const [loadingSearch, setLoadingSearch] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [isAutocompleteReady, setIsAutocompleteReady] = useState(false); // ← новий стан
  
//   const selectRef = useRef(null);
//   const popoverRef = useRef(null);
//   const searchButtonRef = useRef(null);
//   const locationInputRef = useRef(null);

//   const { currentLanguage } = useLanguage();
//   const router = useRouter();

//   // Функція для активації автокомплекту при кліку
//   const handleLocationClick = () => {
//     if (!isAutocompleteReady) {
//       setIsAutocompleteReady(true);
//     }
//   };

//   const handlePlaceSelected = (place) => {
//     console.log('📍 Выбрано место:', place);
    
//     let cityName = "";
//     const locality = place.address_components?.find(comp => 
//       comp.types.includes('locality')
//     );
  
//     if (locality) {
//       cityName = locality.long_name;
//     } else {
//       cityName = place.formatted_address?.split(',')[0]?.trim() || place.name || "";
//     }
  
//     cityName = normalizeCityName(cityName);
    
//     console.log('🏙️ Нормализованное название города:', cityName);
//     setLocation(cityName);
//     setErrors(prev => ({ ...prev, location: false }));
//   };

//   const performSearch = async (searchData) => {
//     try {
//       console.log('\n🔍 ===== НАЧАЛО ПОИСКА =====');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/search`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(searchData),
//       });

//       if (!response.ok) {
//         throw new Error(`Search failed: ${response.status}`);
//       }

//       const results = await response.json();
      
//       if (results.success) {
//         localStorage.setItem('searchResults', JSON.stringify(results));
//         localStorage.setItem('searchParams', JSON.stringify(searchData));
//         router.push('/search');
//       } else {
//         throw new Error(results.message || 'Search failed');
//       }
      
//     } catch (error) {
//       console.error('❌ Ошибка поиска:', error);
//       alert(
//         currentLanguage === "ua" 
//           ? "Помилка пошуку. Спробуйте ще раз." 
//           : "Ошибка поиска. Попробуйте еще раз."
//       );
//     } finally {
//       setLoadingSearch(false);
//     }
//   };

//   const validateForm = () => {
//     const guestsNum = parseInt(guests);
//     const newErrors = {
//       location: !location.trim(),
//       guests: !guests || isNaN(guestsNum) || guestsNum < 1,
//       type: types.length === 0,
//     };

//     setErrors(newErrors);
//     return !(newErrors.location || newErrors.guests || newErrors.type);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setLoadingSearch(true);

//     const searchData = {
//       location: location.trim(),
//       guests: parseInt(guests),
//       types: types,
//       language: currentLanguage
//     };

//     await performSearch(searchData);
//   };

//   const handleSelectClick = () => {
//     setAnchorEl(null);
//     if (searchButtonRef.current) {
//       searchButtonRef.current.click();
//     }
//   };

//   const handleTypeClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setErrors(prev => ({ ...prev, type: types.length === 0 }));
//     setAnchorEl(null);
//   };

//   const handleCheckboxChange = (key) => (event) => {
//     event.stopPropagation();
//     setTypes((prev) =>
//       prev.includes(key)
//         ? prev.filter((item) => item !== key)
//         : [...prev, key]
//     );
//     setErrors(prev => ({ ...prev, type: false }));
//   };

//   const handleGuestsChange = (e) => {
//     const value = e.target.value;
    
//     if (value === "" || /^\d+$/.test(value)) {
//       setGuests(value);
//       const guestsNum = parseInt(value);
//       const isValid = value !== "" && !isNaN(guestsNum) && guestsNum >= 1;
//       setErrors(prev => ({ ...prev, guests: !isValid }));
//     }
//   };

//   const handleClickOutside = (event) => {
//     if (
//       selectRef.current && 
//       !selectRef.current.contains(event.target) &&
//       popoverRef.current &&
//       !popoverRef.current.contains(event.target)
//     ) {
//       handleClose();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [types]);

//   const open = Boolean(anchorEl);
//   const t = translations[currentLanguage];

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         mt: 4,
//         p: 3,
//         bgcolor: "background.paper",
//         borderRadius: 2,
//         boxShadow: 3,
//       }}
//     >
//       <Typography variant="h5" fontWeight={600} gutterBottom>
//         {t.title}
//       </Typography>
//       <Typography variant="body1" color="text.secondary" gutterBottom>
//         {t.subtitle}
//       </Typography>

//       <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//         {/* Поле для выбора местоположения - загружается ТОЛЬКО при клике */}
//         <Box>
//           {!isAutocompleteReady ? (
//             <TextField
//               inputRef={locationInputRef}
//               fullWidth
//               placeholder={t.locationPlaceholder}
//               value={location}
//               onChange={(e) => {
//                 setLocation(e.target.value);
//                 setErrors(prev => ({ ...prev, location: false }));
//               }}
//               onClick={handleLocationClick}
//               error={errors.location}
//               helperText={errors.location ? t.errorMessages.location : ""}
//               InputProps={{
//                 sx: { height: '56px' }
//               }}
//             />
//           ) : (
//             <Autocomplete
//               apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
//               onPlaceSelected={handlePlaceSelected}
//               options={{
//                 types: ["(cities)"],
//                 componentRestrictions: { country: "ua" },
//               }}
//               placeholder={t.locationPlaceholder}
//               language={currentLanguage === "ua" ? "uk" : "ru"}
//               defaultValue={location}
//               style={{
//                 width: "100%",
//                 height: "56px",
//                 fontSize: "16px",
//                 padding: "0 14px",
//                 border: errors.location
//                   ? "2px solid #d32f2f"
//                   : "1px solid rgba(0, 0, 0, 0.23)",
//                 borderRadius: "4px",
//                 boxSizing: "border-box",
//               }}
//             />
//           )}
//         </Box>

//         {/* Поле для количества гостей */}
//         <TextField
//           type="number"
//           label={t.guestsLabel}
//           fullWidth
//           value={guests}
//           onChange={handleGuestsChange}
//           error={errors.guests}
//           helperText={errors.guests ? t.errorMessages.guests : ""}
//           inputProps={{ 
//             min: 1,
//             onKeyDown: (e) => {
//               if (['-', 'e', 'E', '+', '.'].includes(e.key)) {
//                 e.preventDefault();
//               }
//             }
//           }}
//         />

//         {/* Выбор типа жилья */}
//         <Box ref={selectRef}>
//           <Button
//             fullWidth
//             variant="outlined"
//             onClick={handleTypeClick}
//             sx={{
//               justifyContent: "space-between",
//               textTransform: "none",
//               height: "56px",
//               borderColor: errors.type ? "error.main" : "rgba(0, 0, 0, 0.23)",
//               color: types.length === 0 ? "text.secondary" : "text.primary",
//               textAlign: "left",
//             }}
//           >
//             {types.length === 0
//               ? t.typeLabel
//               : types.map((val) => t.options[val]).join(", ")}
//           </Button>
//           {errors.type && (
//             <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
//               {t.errorMessages.type}
//             </Typography>
//           )}

//           <Popover
//             open={open}
//             anchorEl={anchorEl}
//             onClose={handleClose}
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "left",
//             }}
//             sx={{ mt: 1 }}
//           >
//             <Box ref={popoverRef} sx={{ width: selectRef.current?.clientWidth, maxWidth: 300 }}>
//               <List>
//                 {Object.entries(t.options).map(([key, label]) => (
//                   <ListItem key={key} disablePadding>
//                     <ListItemButton sx={{ py: 0.1, minHeight: 28 }}>
//                       <ListItemIcon sx={{ minWidth: 25 }}>
//                         <Checkbox
//                           edge="start"
//                           checked={types.includes(key)}
//                           tabIndex={-1}
//                           disableRipple
//                           onChange={handleCheckboxChange(key)}
//                         />
//                       </ListItemIcon>
//                       <ListItemText 
//                         primary={label} 
//                         onClick={() => {
//                           setTypes(prev => 
//                             prev.includes(key)
//                               ? prev.filter(item => item !== key)
//                               : [...prev, key]
//                           );
//                           setErrors(prev => ({ ...prev, type: false }));
//                         }}
//                       />
//                     </ListItemButton>
//                   </ListItem>
//                 ))}
//               </List>
//               <Box sx={{ p: 1 }}>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   onClick={handleSelectClick}
//                 >
//                   {t.selectButton}
//                 </Button>
//               </Box>
//             </Box>
//           </Popover>
//         </Box>

//         {/* Кнопка поиска */}
//         <Button
//           ref={searchButtonRef}
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           disabled={loadingSearch}
//           sx={{ height: '48px' }}
//         >
//           {loadingSearch ? (
//             <>
//               <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
//               {t.searching}
//             </>
//           ) : (
//             t.searchButton
//           )}
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Search;



// app/components/Search.js

'use client';

import React, { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';
import { useLanguage } from "@/app/LanguageContext";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Checkbox,
  ListItemText,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";

// Динамічний імпорт Autocomplete (завантажиться тільки коли потрібно)
const Autocomplete = dynamic(
  () => import('react-google-autocomplete'),
  { 
    ssr: false,
    loading: () => <TextField 
      fullWidth 
      placeholder="Введіть місцезнаходження" 
      disabled 
      sx={{ bgcolor: '#f5f5f5' }}
    />
  }
);

const translations = {
  ua: {
    title: "Обирайте житло для своєї подорожі.",
    subtitle: "Від готелів до приватних помешкань – знайдіть те, що потрібно.",
    locationLabel: "Куди прямуєте?",
    locationPlaceholder: "Введіть місцезнаходження",
    guestsLabel: "Кількість гостей",
    typeLabel: "Тип помешкання",
    selectButton: "Вибрати",
    options: {
      apart: "Квартира",
      hotel: "Готель",
      "pet-hotel": "Готель для тварин",
      hostel: "Хостел",
      house: "Будинок",
      "rest-base": "База відпочинку",
      sauna: "Сауна/Баня",
      glamping: "Глемпінг",
      pansionat: "Санаторій/Пансіонат",
      cottage: "Котедж для компаній",
      coworking: "Коворкінг",
      autocamping: "Автокемпінг",
    },
    searchButton: "Пошук",
    searching: "Пошук...",
    errorMessages: {
      location: "Будь ласка, виберіть місцезнаходження.",
      guests: "Будь ласка, вкажіть кількість гостей (мінімум 1).",
      type: "Будь ласка, виберіть тип помешкання.",
    },
  },
  ru: {
    title: "Выбирайте жилье для путешествия.",
    subtitle: "От отелей до частных домов – найдите то, что нужно.",
    locationLabel: "Куда направляетесь?",
    locationPlaceholder: "Введите местоположение",
    guestsLabel: "Количество гостей",
    typeLabel: "Тип жилья",
    selectButton: "Выбрать",
    options: {
      apart: "Квартира",
      hotel: "Гостиница",
      "pet-hotel": "Отель для животных",
      hostel: "Хостел",
      house: "Дом",
      "rest-base": "База отдыха",
      sauna: "Сауна/Баня",
      glamping: "Глэмпинг",
      pansionat: "Санаторий/Пансионат",
      cottage: "Коттедж для компаний",
      coworking: "Коворкинг",
      autocamping: "Автокемпинг",
    },
    searchButton: "Поиск",
    searching: "Поиск...",
    errorMessages: {
      location: "Пожалуйста, выберите местоположение.",
      guests: "Пожалуйста, укажите количество гостей (минимум 1).",
      type: "Пожалуйста, выберите тип жилья.",
    },
  },
};

const normalizeCityName = (city) => {
  if (!city) return '';
  
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
    'запоріжжя': 'Запоріжжя',
    'донецк': 'Донецьк',
    'донецьк': 'Донецьк',
    'луганск': 'Луганськ',
    'луганськ': 'Луганськ',
    'крым': 'Крим',
    'крим': 'Крим',
    'симферополь': 'Крим',
    'сіферополь': 'Крим',
    'севастополь': 'Крим',
    'ялта': 'Крим',
    'евпатория': 'Крим',
    'євпаторія': 'Крим',
    'керчь': 'Крим',
    'керч': 'Крим',
    'феодосия': 'Крим',
    'феодосія': 'Крим',
  };
  
  const lowerCity = city.toLowerCase().trim();
  
  for (const [key, value] of Object.entries(nameMap)) {
    if (lowerCity.includes(key)) {
      return value;
    }
  }
  
  return city.charAt(0).toUpperCase() + city.slice(1);
};

const Search = () => {
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("");
  const [types, setTypes] = useState([]);
  const [errors, setErrors] = useState({
    location: false,
    guests: false,
    type: false,
  });
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAutocompleteReady, setIsAutocompleteReady] = useState(false);
  
  const selectRef = useRef(null);
  const popoverRef = useRef(null);
  const searchButtonRef = useRef(null);
  const locationInputRef = useRef(null);

  const { currentLanguage } = useLanguage();
  const router = useRouter();

  const t = translations[currentLanguage];

  // Функция для активации автокомплекту при клику
  const handleLocationClick = () => {
    if (!isAutocompleteReady) {
      setIsAutocompleteReady(true);
      setTimeout(() => {
        const input = document.querySelector('input[placeholder="' + t.locationPlaceholder + '"]');
        if (input) {
          input.focus();
          setTimeout(() => {
            input.click();
          }, 50);
        }
      }, 150);
    }
  };

  const handlePlaceSelected = (place) => {
    console.log('📍 Выбрано место:', place);
    
    let cityName = "";
    const locality = place.address_components?.find(comp => 
      comp.types.includes('locality')
    );
  
    if (locality) {
      cityName = locality.long_name;
    } else {
      cityName = place.formatted_address?.split(',')[0]?.trim() || place.name || "";
    }
  
    cityName = normalizeCityName(cityName);
    
    console.log('🏙️ Нормализованное название города:', cityName);
    setLocation(cityName);
    setErrors(prev => ({ ...prev, location: false }));
  };

  // useEffect для фокуса - ПЕРЕМЕЩЕН СЮДА (после объявления t)
  useEffect(() => {
    if (isAutocompleteReady) {
      const timer = setTimeout(() => {
        const input = document.querySelector('input[placeholder="' + t.locationPlaceholder + '"]');
        if (input && document.activeElement !== input) {
          input.focus();
          input.setSelectionRange(input.value.length, input.value.length);
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isAutocompleteReady, t.locationPlaceholder]);

  const performSearch = async (searchData) => {
    try {
      console.log('\n🔍 ===== НАЧАЛО ПОИСКА =====');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const results = await response.json();
      
      if (results.success) {
        localStorage.setItem('searchResults', JSON.stringify(results));
        localStorage.setItem('searchParams', JSON.stringify(searchData));
        router.push('/search');
      } else {
        throw new Error(results.message || 'Search failed');
      }
      
    } catch (error) {
      console.error('❌ Ошибка поиска:', error);
      alert(
        currentLanguage === "ua" 
          ? "Помилка пошуку. Спробуйте ще раз." 
          : "Ошибка поиска. Попробуйте еще раз."
      );
    } finally {
      setLoadingSearch(false);
    }
  };

  const validateForm = () => {
    const guestsNum = parseInt(guests);
    const newErrors = {
      location: !location.trim(),
      guests: !guests || isNaN(guestsNum) || guestsNum < 1,
      type: types.length === 0,
    };

    setErrors(newErrors);
    return !(newErrors.location || newErrors.guests || newErrors.type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoadingSearch(true);

    const searchData = {
      location: location.trim(),
      guests: parseInt(guests),
      types: types,
      language: currentLanguage
    };

    await performSearch(searchData);
  };

  const handleSelectClick = () => {
    setAnchorEl(null);
    if (searchButtonRef.current) {
      searchButtonRef.current.click();
    }
  };

  const handleTypeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setErrors(prev => ({ ...prev, type: types.length === 0 }));
    setAnchorEl(null);
  };

  const handleCheckboxChange = (key) => (event) => {
    event.stopPropagation();
    setTypes((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]
    );
    setErrors(prev => ({ ...prev, type: false }));
  };

  const handleGuestsChange = (e) => {
    const value = e.target.value;
    
    if (value === "" || /^\d+$/.test(value)) {
      setGuests(value);
      const guestsNum = parseInt(value);
      const isValid = value !== "" && !isNaN(guestsNum) && guestsNum >= 1;
      setErrors(prev => ({ ...prev, guests: !isValid }));
    }
  };

  const handleClickOutside = (event) => {
    if (
      selectRef.current && 
      !selectRef.current.contains(event.target) &&
      popoverRef.current &&
      !popoverRef.current.contains(event.target)
    ) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [types]);

  const open = Boolean(anchorEl);

  return (
    // <Container
    //   // maxWidth="sm"
    //   maxWidth={false} 
    //   sx={{
    //     mt: 4,
    //     p: 3,
    //     width: '90%',   
    //     maxWidth: '90%',
    //     bgcolor: "background.paper",
    //     borderRadius: 2,
    //     boxShadow: 3,
    //     border: '1px solid #1976d2',
    //   }}
    // >


    <Container
    maxWidth={false}
    sx={{
      mt: 4,
      p: 3,
      width: '90%',
      maxWidth: '90%',
      bgcolor: "background.paper",
      borderRadius: 2,
      boxShadow: 3,
      border: '1px solid #1976d2',
      // Адаптивность для десктопа
      '@media (min-width: 769px)': {
        width: 'auto',        // ← Возвращаем стандартную ширину
        maxWidth: 'sm',       // ← Стандартный maxWidth из MUI
      },
    }}
  >
      <Typography variant="h5" fontWeight={600} gutterBottom>
        {t.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {t.subtitle}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Поле для выбора местоположения - загружается ТОЛЬКО при клике */}
        <Box>
          {!isAutocompleteReady ? (
            <TextField
              inputRef={locationInputRef}
              fullWidth
              placeholder={t.locationPlaceholder}
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setErrors(prev => ({ ...prev, location: false }));
              }}
              onClick={handleLocationClick}
              error={errors.location}
              helperText={errors.location ? t.errorMessages.location : ""}
              InputProps={{
                sx: { height: '56px' }
              }}
            />
          ) : (
            <Autocomplete
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              onPlaceSelected={handlePlaceSelected}
              options={{
                types: ["(cities)"],
                componentRestrictions: { country: "ua" },
              }}
              placeholder={t.locationPlaceholder}
              language={currentLanguage === "ua" ? "uk" : "ru"}
              defaultValue={location}
              style={{
                width: "100%",
                height: "56px",
                fontSize: "16px",
                padding: "0 14px",
                border: errors.location
                  ? "2px solid #d32f2f"
                  : "1px solid rgba(0, 0, 0, 0.23)",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
          )}
        </Box>

        {/* Поле для количества гостей */}
        <TextField
          type="number"
          label={t.guestsLabel}
          fullWidth
          value={guests}
          onChange={handleGuestsChange}
          error={errors.guests}
          helperText={errors.guests ? t.errorMessages.guests : ""}
          inputProps={{ 
            min: 1,
            onKeyDown: (e) => {
              if (['-', 'e', 'E', '+', '.'].includes(e.key)) {
                e.preventDefault();
              }
            }
          }}
        />

        {/* Выбор типа жилья */}
        <Box ref={selectRef}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleTypeClick}
            sx={{
              justifyContent: "space-between",
              textTransform: "none",
              height: "56px",
              borderColor: errors.type ? "error.main" : "rgba(0, 0, 0, 0.23)",
              color: types.length === 0 ? "text.secondary" : "text.primary",
              textAlign: "left",
            }}
          >
            {types.length === 0
              ? t.typeLabel
              : types.map((val) => t.options[val]).join(", ")}
          </Button>
          {errors.type && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
              {t.errorMessages.type}
            </Typography>
          )}

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            sx={{ mt: 1 }}
          >
            <Box ref={popoverRef} sx={{ width: selectRef.current?.clientWidth, maxWidth: 300 }}>
              <List>
                {Object.entries(t.options).map(([key, label]) => (
                  <ListItem key={key} disablePadding>
                    <ListItemButton sx={{ py: 0.1, minHeight: 28 }}>
                      <ListItemIcon sx={{ minWidth: 25 }}>
                        <Checkbox
                          edge="start"
                          checked={types.includes(key)}
                          tabIndex={-1}
                          disableRipple
                          onChange={handleCheckboxChange(key)}
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary={label} 
                        onClick={() => {
                          setTypes(prev => 
                            prev.includes(key)
                              ? prev.filter(item => item !== key)
                              : [...prev, key]
                          );
                          setErrors(prev => ({ ...prev, type: false }));
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Box sx={{ p: 1 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSelectClick}
                >
                  {t.selectButton}
                </Button>
              </Box>
            </Box>
          </Popover>
        </Box>

        {/* Кнопка поиска */}
        <Button
          ref={searchButtonRef}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loadingSearch}
          sx={{ height: '48px' }}
        >
          {loadingSearch ? (
            <>
              <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
              {t.searching}
            </>
          ) : (
            t.searchButton
          )}
        </Button>
      </Box>
    </Container>
  );
};

export default Search;