





// 'use client';

// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Drawer,
//   IconButton,
//   Badge,
//   Chip,
//   Slider,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   InputAdornment,
//   Paper,
//   useMediaQuery,
//   useTheme,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Autocomplete,
// } from '@mui/material';
// import {
//   Tune as TuneIcon,
//   Close as CloseIcon,
//   ExpandMore as ExpandMoreIcon,
//   Clear as ClearIcon,
//   Subway as SubwayIcon,
// } from '@mui/icons-material';
// import { useLanguage } from '@/app/LanguageContext';

// // Константы для городов с метро и станциями
// const CITIES_WITH_METRO = ['Київ', 'Харків', 'Дніпро', 'Киев', 'Харьков', 'Днепр'];

// const METRO_STATIONS = {
//   'Київ': {
//     ua: [
//       'Академмістечко', 'Житомирська', 'Святошин', 'Нивки', 'Берестейська', 'Шулявська',
//       'Політехнічний інститут', 'Вокзальна', 'Університет', 'Театральна', 'Хрещатик', 'Арсенальна',
//       'Дніпро', 'Гідропарк', 'Лівобережна', 'Дарниця', 'Чернігівська', 'Лісова', 'Героїв Дніпра',
//       'Мінська', 'Оболонь', 'Поштова площа', 'Контрактова площа', 'Тараса Шевченка', 'Лук\'янівська',
//       'Дорогожичі', 'Сирець', 'Золоті ворота', 'Палац спорту', 'Олімпійська', 'Палац «Україна»',
//       'Либідська', 'Деміївська', 'Голосіївська', 'Васильківська', 'Виставковий центр', 'Іподром',
//       'Теремки', 'Кловська', 'Печерська', 'Видубичі', 'Славутич', 'Осокорки',
//       'Позняки', 'Почайна/Петрівка','Харківська', 'Вирлиця', 'Бориспільська', 'Червоний хутір', 
//       'Майдан Незалежності', 'Площа Українських Героїв/Льва Толстого', 'Звіринецька',
//     ],
//     ru: [
//       'Академгородок', 'Житомирская', 'Святошин', 'Нивки', 'Берестейская', 'Шулявская',
//       'Политехнический институт', 'Вокзальная', 'Университет', 'Театральная', 'Крещатик', 'Арсенальная',
//       'Днепр', 'Гидропарк', 'Левобережная', 'Дарница', 'Черниговская', 'Лесная', 'Героев Днепра',
//       'Минская', 'Оболонь', 'Почтовая площадь', 'Контрактовая площадь', 'Тараса Шевченко', 'Лукьяновская',
//       'Дорогожичи', 'Сырец', 'Золотые ворота', 'Дворец спорта', 'Олимпийская', 'Дворец «Украина»',
//       'Лыбедская', 'Демиевская', 'Голосеевская', 'Васильковская', 'Выставочный центр', 'Ипподром',
//       'Теремки', 'Кловская', 'Печерская', 'Зверинецкая', 'Выдубичи', 'Славутич', 'Осокорки',
//       'Позняки', 'Почайна/Петровка','Харьковская', 'Вырлица', 'Бориспольская', 'Красный хутор', 
//       'Майдан Независимости', 'Площадь Украинских Героев/Льва Толстого', 'Зверинецкая',
//     ]
//   },
//   'Харків': {
//     ua: ['Холодна гора', 'Південний вокзал', 'Центральний ринок', 'Майдан Конституції', 'Історичний музей', 'Проспект Гагаріна', 'Спортивна', 'Завод імені Малишева', 'Турбоатом', 'Індустріальна', 'Академіка Павлова', 'Студентська', 'Героїв Праці', 'Перемога', 'Олексіївська', '23 Серпня', 'Ботанічний сад', 'Держпром', 'Університет'],
//     ru: ['Холодная гора', 'Южный вокзал', 'Центральный рынок', 'Площадь Конституции', 'Исторический музей', 'Проспект Гагарина', 'Спортивная', 'Завод имени Малышева', 'Турбоатом', 'Индустриальная', 'Академика Павлова', 'Студенческая', 'Героев Труда', 'Победа', 'Алексеевская', '23 Августа', 'Ботанический сад', 'Госпром', 'Университет']
//   },
//   'Дніпро': {
//     ua: ['Вокзальна', 'Металургів', 'Заводська', 'Метробудівників', 'Проспект Свободи', 'Покровська'],
//     ru: ['Вокзальная', 'Металлургов', 'Заводская', 'Метростроителей', 'Проспект Свободы', 'Покровская']
//   }
// };

// // Также добавим варианты на русском для поиска
// METRO_STATIONS['Киев'] = METRO_STATIONS['Київ'];
// METRO_STATIONS['Харьков'] = METRO_STATIONS['Харків'];
// METRO_STATIONS['Днепр'] = METRO_STATIONS['Дніпро'];

// const ROOM_OPTIONS = [1, 2, 3, 4, 5, '6+'];
// const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10+'];

// // ВСЕ УДОБСТВА - полный список!
// const CONVENIENCES = {
//   ua: [
//     { id: 'балкон', label: 'Балкон', icon: '🏠' },
//     { id: 'барбекю-зона', label: 'Барбекю-зона', icon: '🔥' },
//     { id: 'басейн', label: 'Басейн', icon: '🏊' },
//     { id: 'ігрова кімната', label: 'Ігрова кімната', icon: '🎮' },
//     { id: 'блендер', label: 'Блендер', icon: '🥤' },
//     { id: 'бойлер', label: 'Бойлер', icon: '🔥' },
//     { id: 'ванна', label: 'Ванна', icon: '🛁' },
//     { id: 'вентилятор', label: 'Вентилятор', icon: '🌀' },
//     { id: 'генератор', label: 'Генератор', icon: '⚡' },
//     { id: 'громадська кухня', label: 'Громадська кухня', icon: '🍳' },
//     { id: 'джакузі', label: 'Джакузі', icon: '🛁' },
//     { id: 'дитяче ліжечко', label: 'Дитяче ліжечко', icon: '👶' },
//     { id: 'дитячий стілець', label: 'Дитячий стілець', icon: '🪑' },
//     { id: 'домашній кінотеатр', label: 'Домашній кінотеатр', icon: '🎬' },
//     { id: 'духовка', label: 'Духовка', icon: '🔥' },
//     { id: 'душова кабіна', label: 'Душова кабіна', icon: '🚿' },
//     { id: 'електрочайник', label: 'Електрочайник', icon: '☕' },
//     { id: 'електроплита', label: 'Електроплита', icon: '🔥' },
//     { id: 'газова плита', label: 'Газова плита', icon: '🔥' },
//     { id: 'зарядка для електромобілів', label: 'Зарядка для електромобілів', icon: '🔋' },
//     { id: 'заміна постільної білизни', label: 'Заміна постільної білизни', icon: '🛏️' },
//     { id: 'інтернет', label: 'Інтернет', icon: '📶' },
//     { id: 'кавоварка', label: 'Кавоварка', icon: '☕' },
//     { id: 'камін', label: 'Камін', icon: '🔥' },
//     { id: 'кабельне тб', label: 'Кабельне ТБ', icon: '📺' },
//     { id: 'кондиціонер', label: 'Кондиціонер', icon: '❄️' },
//     { id: 'ліжко', label: 'Ліжко', icon: '🛏️' },
//     { id: 'диван', label: 'Диван', icon: '🛋️' },
//     { id: 'лазня', label: 'Лазня', icon: '🧖' },
//     { id: 'мангал', label: 'Мангал', icon: '🔥' },
//     { id: 'мікрохвильова піч', label: 'Мікрохвильова піч', icon: '🔥' },
//     { id: 'охорона', label: 'Охорона', icon: '🛡️' },
//     { id: 'парковка', label: 'Парковка', icon: '🅿️' },
//     { id: "комп'ютер", label: "Комп'ютер", icon: '💻' },
//     { id: 'пляжне обладнання', label: 'Пляжне обладнання', icon: '🏖️' },
//     { id: 'посуд', label: 'Посуд', icon: '🍽️' },
//     { id: 'посудомийна машина', label: 'Посудомийна машина', icon: '🧼' },
//     { id: 'пральна машина', label: 'Пральна машина', icon: '🧺' },
//     { id: 'пральний порошок', label: 'Пральний порошок', icon: '🧼' },
//     { id: 'праска', label: 'Праска', icon: '👕' },
//     { id: 'рушники', label: 'Рушники', icon: '🧻' },
//     { id: 'сейф', label: 'Сейф', icon: '🔒' },
//     { id: 'спортзал', label: 'Спортзал', icon: '🏋️' },
//     { id: 'спортивний інвентар', label: 'Спортивний інвентар', icon: '⚽' },
//     { id: 'столові прибори', label: 'Столові прибори', icon: '🍴' },
//     { id: 'сушилка', label: 'Сушилка', icon: '🧺' },
//     { id: 'супутникове тб', label: 'Супутникове ТБ', icon: '📡' },
//     { id: 'тапочки', label: 'Тапочки', icon: '👟' },
//     { id: 'тераса', label: 'Тераса', icon: '🏡' },
//     { id: 'тостер', label: 'Тостер', icon: '🍞' },
//     { id: 'туалетні принадлежності', label: 'Туалетні принадлежності', icon: '🧴' },
//     { id: 'фен', label: 'Фен', icon: '💨' },
//     { id: 'холодильник', label: 'Холодильник', icon: '🧊' },
//     { id: 'догляд за тваринами', label: 'Догляд за тваринами', icon: '🐕' },
//     { id: 'кафе', label: 'Кафе', icon: '☕' },
//     { id: 'конференц-зал', label: 'Конференц-зал', icon: '🏢' },
//     { id: 'переговорна', label: 'Переговорна', icon: '💼' },
//     { id: 'лікувальні процедури', label: 'Лікувальні процедури', icon: '💊' },
//     { id: 'організація подій', label: 'Організація подій', icon: '🎉' },
//     { id: 'трансфер', label: 'Трансфер', icon: '🚗' },
//     { id: 'харчування', label: 'Харчування', icon: '🍲' },
//     { id: 'прокат', label: 'Прокат', icon: '🚲' },
//   ],
//   ru: [
//     { id: 'балкон', label: 'Балкон', icon: '🏠' },
//     { id: 'барбекю-зона', label: 'Зона барбекю', icon: '🔥' },
//     { id: 'басейн', label: 'Бассейн', icon: '🏊' },
//     { id: 'ігрова кімната', label: 'Игровая комната', icon: '🎮' },
//     { id: 'блендер', label: 'Блендер', icon: '🥤' },
//     { id: 'бойлер', label: 'Бойлер', icon: '🔥' },
//     { id: 'ванна', label: 'Ванна', icon: '🛁' },
//     { id: 'вентилятор', label: 'Вентилятор', icon: '🌀' },
//     { id: 'генератор', label: 'Генератор', icon: '⚡' },
//     { id: 'громадська кухня', label: 'Общая кухня', icon: '🍳' },
//     { id: 'джакузі', label: 'Джакузи', icon: '🛁' },
//     { id: 'дитяче ліжечко', label: 'Детская кроватка', icon: '👶' },
//     { id: 'дитячий стілець', label: 'Детский стульчик', icon: '🪑' },
//     { id: 'домашній кінотеатр', label: 'Домашний кинотеатр', icon: '🎬' },
//     { id: 'духовка', label: 'Духовка', icon: '🔥' },
//     { id: 'душова кабіна', label: 'Душевая кабина', icon: '🚿' },
//     { id: 'електрочайник', label: 'Электрочайник', icon: '☕' },
//     { id: 'електроплита', label: 'Электроплита', icon: '🔥' },
//     { id: 'газова плита', label: 'Газовая плита', icon: '🔥' },
//     { id: 'зарядка для електромобілів', label: 'Зарядка для электромобилей', icon: '🔋' },
//     { id: 'заміна постільної білизни', label: 'Смена постельного белья', icon: '🛏️' },
//     { id: 'інтернет', label: 'Интернет', icon: '📶' },
//     { id: 'кавоварка', label: 'Кофеварка', icon: '☕' },
//     { id: 'камін', label: 'Камин', icon: '🔥' },
//     { id: 'кабельне тб', label: 'Кабельное ТВ', icon: '📺' },
//     { id: 'кондиціонер', label: 'Кондиционер', icon: '❄️' },
//     { id: 'ліжко', label: 'Кровать', icon: '🛏️' },
//     { id: 'диван', label: 'Диван', icon: '🛋️' },
//     { id: 'лазня', label: 'Баня', icon: '🧖' },
//     { id: 'мангал', label: 'Мангал', icon: '🔥' },
//     { id: 'мікрохвильова піч', label: 'Микроволновая печь', icon: '🔥' },
//     { id: 'охорона', label: 'Охрана', icon: '🛡️' },
//     { id: 'парковка', label: 'Парковка', icon: '🅿️' },
//     { id: "комп'ютер", label: "Компьютер", icon: '💻' },
//     { id: 'пляжне обладнання', label: 'Пляжное оборудование', icon: '🏖️' },
//     { id: 'посуд', label: 'Посуда', icon: '🍽️' },
//     { id: 'посудомийна машина', label: 'Посудомоечная машина', icon: '🧼' },
//     { id: 'пральна машина', label: 'Стиральная машина', icon: '🧺' },
//     { id: 'пральний порошок', label: 'Стиральный порошок', icon: '🧼' },
//     { id: 'праска', label: 'Утюг', icon: '👕' },
//     { id: 'рушники', label: 'Полотенца', icon: '🧻' },
//     { id: 'сейф', label: 'Сейф', icon: '🔒' },
//     { id: 'спортзал', label: 'Спортзал', icon: '🏋️' },
//     { id: 'спортивний інвентар', label: 'Спортивный инвентарь', icon: '⚽' },
//     { id: 'столові прибори', label: 'Столовые приборы', icon: '🍴' },
//     { id: 'сушилка', label: 'Сушилка', icon: '🧺' },
//     { id: 'супутникове тб', label: 'Спутниковое ТВ', icon: '📡' },
//     { id: 'тапочки', label: 'Тапочки', icon: '👟' },
//     { id: 'тераса', label: 'Терраса', icon: '🏡' },
//     { id: 'тостер', label: 'Тостер', icon: '🍞' },
//     { id: 'туалетні принадлежності', label: 'Туалетные принадлежности', icon: '🧴' },
//     { id: 'фен', label: 'Фен', icon: '💨' },
//     { id: 'холодильник', label: 'Холодильник', icon: '🧊' },
//     { id: 'догляд за тваринами', label: 'Уход за животными', icon: '🐕' },
//     { id: 'кафе', label: 'Кафе', icon: '☕' },
//     { id: 'конференц-зал', label: 'Конференц-зал', icon: '🏢' },
//     { id: 'переговорна', label: 'Переговорная', icon: '💼' },
//     { id: 'лікувальні процедури', label: 'Лечебные процедуры', icon: '💊' },
//     { id: 'організація подій', label: 'Организация мероприятий', icon: '🎉' },
//     { id: 'трансфер', label: 'Трансфер', icon: '🚗' },
//     { id: 'харчування', label: 'Питание', icon: '🍲' },
//     { id: 'прокат', label: 'Прокат', icon: '🚲' },
//   ],
// };

// const SearchApartmentFilters = ({ 
//   apartments = [], 
//   onFilterChange, 
//   searchParams = {},
//   loading = false,
//   totalResults = 0,
//   currentCity = '',
// }) => {
//   const { currentLanguage } = useLanguage();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   // Определяем, есть ли метро в текущем городе
//   const hasMetro = useMemo(() => {
//     if (!currentCity) return false;
//     return CITIES_WITH_METRO.some(city => 
//       city.toLowerCase() === currentCity.toLowerCase().trim()
//     );
//   }, [currentCity]);

//   // Получаем станции метро для текущего города
//   const metroStations = useMemo(() => {
//     if (!hasMetro || !currentCity) return [];
    
//     const cityKey = Object.keys(METRO_STATIONS).find(
//       key => key.toLowerCase() === currentCity.toLowerCase().trim()
//     );
    
//     if (!cityKey) return [];
    
//     return METRO_STATIONS[cityKey]?.[currentLanguage] || [];
//   }, [hasMetro, currentCity, currentLanguage]);

//   // Переводы
//   const t = {
//     sortBy: currentLanguage === 'ua' ? 'Сортувати за' : 'Сортировать по',
//     filters: currentLanguage === 'ua' ? 'Фільтри' : 'Фильтры',
//     price: currentLanguage === 'ua' ? 'Ціна за добу' : 'Цена за сутки',
//     from: currentLanguage === 'ua' ? 'від' : 'от',
//     to: currentLanguage === 'ua' ? 'до' : 'до',
//     rooms: currentLanguage === 'ua' ? 'Кімнати' : 'Комнаты',
//     guests: currentLanguage === 'ua' ? 'Гості' : 'Гости',
//     conveniences: currentLanguage === 'ua' ? 'Зручності' : 'Удобства',
//     clearAll: currentLanguage === 'ua' ? 'Очистити всі' : 'Очистить все',
//     apply: currentLanguage === 'ua' ? 'Застосувати' : 'Применить',
//     moreFilters: currentLanguage === 'ua' ? 'Більше фільтрів' : 'Больше фильтров',
//     smoking: currentLanguage === 'ua' ? 'Паління' : 'Курение',
//     parties: currentLanguage === 'ua' ? 'Вечірки' : 'Вечеринки',
//     pets: currentLanguage === 'ua' ? 'Тварини' : 'Животные',
//     fullDay: currentLanguage === 'ua' ? 'Цілодобово' : 'Круглосуточно',
//     reportDocs: currentLanguage === 'ua' ? 'Звітні документи' : 'Отчетные документы',
//     area: currentLanguage === 'ua' ? 'Площа (м²)' : 'Площадь (м²)',
//     found: currentLanguage === 'ua' ? 'Знайдено' : 'Найдено',
//     variants: currentLanguage === 'ua' ? 'варіантів' : 'вариантов',
//     any: currentLanguage === 'ua' ? 'Будь-які' : 'Любые',
//     yes: currentLanguage === 'ua' ? 'Так' : 'Да',
//     no: currentLanguage === 'ua' ? 'Ні' : 'Нет',
//     metro: currentLanguage === 'ua' ? 'Метро' : 'Метро',
//     metroStation: currentLanguage === 'ua' ? 'Станція метро' : 'Станция метро',
//     anyStation: currentLanguage === 'ua' ? 'Будь-яка станція' : 'Любая станция',
//     selectStation: currentLanguage === 'ua' ? 'Виберіть станцію' : 'Выберите станцию',
//   };

//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     priceRange: [1200, 3300],
//     rooms: '',
//     guests: searchParams?.guests || '',
//     areaRange: [0, 500],
//     conveniences: [],
//     smoking: 'any',
//     parties: 'any',
//     pets: 'any',
//     fullDay: 'any',
//     reportDocs: 'any',
//     sortBy: 'recommended',
//     metroStation: '',
//   });
//   const [activeFiltersCount, setActiveFiltersCount] = useState(0);

//   // Лимиты цен из доступных квартир
//   const priceLimits = useMemo(() => {
//     if (!apartments.length) return { min: 500, max: 10000 };
//     const prices = apartments.map(a => Number(a.price) || 0).filter(p => p > 0);
//     if (!prices.length) return { min: 500, max: 10000 };
//     return {
//       min: Math.floor(Math.min(...prices) / 100) * 100,
//       max: Math.ceil(Math.max(...prices) / 100) * 100,
//     };
//   }, [apartments]);

//   // Лимиты площади из доступных квартир
//   const areaLimits = useMemo(() => {
//     if (!apartments.length) return { min: 0, max: 500 };
//     const areas = apartments.map(a => Number(a.size) || 0).filter(a => a > 0);
//     if (!areas.length) return { min: 0, max: 500 };
//     return {
//       min: Math.min(...areas),
//       max: Math.max(...areas),
//     };
//   }, [apartments]);

//   // Подсчет активных фильтров
//   useEffect(() => {
//     let count = 0;
//     if (filters.priceRange[0] > priceLimits.min || filters.priceRange[1] < priceLimits.max) count++;
//     if (filters.rooms) count++;
//     if (filters.guests && filters.guests !== searchParams?.guests) count++;
//     if (filters.areaRange[0] > areaLimits.min || filters.areaRange[1] < areaLimits.max) count++;
//     if (filters.conveniences.length > 0) count += filters.conveniences.length;
//     if (filters.smoking !== 'any') count++;
//     if (filters.parties !== 'any') count++;
//     if (filters.pets !== 'any') count++;
//     if (filters.fullDay !== 'any') count++;
//     if (filters.reportDocs !== 'any') count++;
//     if (filters.sortBy !== 'recommended') count++;
//     if (hasMetro && filters.metroStation) count++;
    
//     setActiveFiltersCount(count);
//   }, [filters, searchParams?.guests, priceLimits, areaLimits, hasMetro]);

//   // Инициализация фильтров при загрузке
//   useEffect(() => {
//     setFilters(prev => ({
//       ...prev,
//       priceRange: [priceLimits.min, priceLimits.max],
//       areaRange: [areaLimits.min, areaLimits.max],
//       guests: searchParams?.guests || '',
//       metroStation: hasMetro ? prev.metroStation : '',
//     }));
//   }, [priceLimits, areaLimits, searchParams?.guests, hasMetro]);

//   const handleFilterChange = (name, value) => {
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const handleConvenienceToggle = (convenience) => {
//     const normalizedId = convenience.id;
    
//     setFilters(prev => {
//       const newConveniences = prev.conveniences.includes(normalizedId)
//         ? prev.conveniences.filter(id => id !== normalizedId)
//         : [...prev.conveniences, normalizedId];
//       return { ...prev, conveniences: newConveniences };
//     });
//   };

//   const handleApplyFilters = () => {
//     onFilterChange(filters);
//     setDrawerOpen(false);
//   };

//   const handleClearAndApply = () => {
//     const clearedFilters = {
//       priceRange: [priceLimits.min, priceLimits.max],
//       rooms: '',
//       guests: searchParams?.guests || '',
//       areaRange: [areaLimits.min, areaLimits.max],
//       conveniences: [],
//       smoking: 'any',
//       parties: 'any',
//       pets: 'any',
//       fullDay: 'any',
//       reportDocs: 'any',
//       sortBy: 'recommended',
//       metroStation: '',
//     };
    
//     setFilters(clearedFilters);
//     onFilterChange(clearedFilters);
//     setDrawerOpen(false);
//   };

//   // Если нет квартир, не показываем фильтры
//   if (!apartments.length) {
//     return null;
//   }

//   const booleanOptions = [
//     { value: 'any', label: t.any },
//     { value: 'yes', label: t.yes },
//     { value: 'no', label: t.no },
//   ];

//   return (
//     <>
//       {/* Мобильная панель */}
//       {isMobile && (
//         <Paper 
//           elevation={0}
//           sx={{ 
//             position: 'sticky', 
//             top: 0,
//             zIndex: 1000,
//             mb: 2,
//             border: '1px solid #e0e0e0',
//             borderRadius: 2,
//             bgcolor: 'background.paper',
//           }}
//         >
//           <Box sx={{ p: 1.5 }}>
//             <Box sx={{ textAlign: 'center', mb: 1 }}>
//               <Typography variant="body2" color="primary" fontWeight="600">
//                 {totalResults} {t.variants}
//               </Typography>
//             </Box>

//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 onClick={() => setDrawerOpen(true)}
//                 size="small"
//                 sx={{ 
//                   borderRadius: 2,
//                   py: 1,
//                   borderColor: '#e0e0e0',
//                   justifyContent: 'space-between',
//                 }}
//                 endIcon={
//                   <Badge badgeContent={activeFiltersCount} color="primary" max={9}>
//                     <TuneIcon />
//                   </Badge>
//                 }
//               >
//                 {t.filters}
//               </Button>
              
//               {activeFiltersCount > 0 && (
//                 <Button
//                   variant="text"
//                   onClick={handleClearAndApply}
//                   size="small"
//                   sx={{ 
//                     minWidth: 'auto',
//                     px: 2,
//                     color: '#d32f2f',
//                   }}
//                 >
//                   {t.clearAll}
//                 </Button>
//               )}
//             </Box>
//           </Box>
//         </Paper>
//       )}

//       {/* Десктопная версия */}
//       {!isMobile && (
//         <Paper 
//           elevation={2} 
//           sx={{ 
//             p: 3, 
//             mb: 4, 
//             borderRadius: 2,
//             border: '1px solid',
//             borderColor: 'divider',
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap' }}>
//             <Typography variant="h6" color="primary">
//               {t.found}: <strong>{totalResults}</strong> {t.variants}
//             </Typography>

//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button
//                 variant={activeFiltersCount > 0 ? "contained" : "outlined"}
//                 startIcon={<TuneIcon />}
//                 onClick={() => setDrawerOpen(true)}
//               >
//                 {t.filters} {activeFiltersCount > 0 && `(${activeFiltersCount})`}
//               </Button>

//               {activeFiltersCount > 0 && (
//                 <Button
//                   variant="text"
//                   startIcon={<ClearIcon />}
//                   onClick={handleClearAndApply}
//                   size="small"
//                 >
//                   {t.clearAll}
//                 </Button>
//               )}
//             </Box>
//           </Box>
//         </Paper>
//       )}

//       {/* Drawer с фильтрами */}
//       <Drawer
//         anchor={isMobile ? "bottom" : "right"}
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         PaperProps={{
//           sx: {
//             width: isMobile ? '100%' : 400,
//             maxHeight: isMobile ? '90vh' : '100%',
//             borderTopLeftRadius: isMobile ? 16 : 0,
//             borderTopRightRadius: isMobile ? 16 : 0,
//             '@media (max-width: 600px)': {
//               width: '80% !important',
//               marginLeft: 'auto !important',
//               marginRight: 'auto !important',
//             },
//             p: 3,
//             pb: 4,
//             overflowY: 'auto',
//           }
//         }}
//       >
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Typography variant="h6">
//             {t.filters} {activeFiltersCount > 0 && `(${activeFiltersCount})`}
//           </Typography>
//           <IconButton onClick={() => setDrawerOpen(false)}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         {/* Фильтр по метро */}
//         {hasMetro && (
//           <Accordion defaultExpanded>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <SubwayIcon color="primary" />
//                 <Typography fontWeight="500">{t.metro}</Typography>
//               </Box>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Autocomplete
//                 options={metroStations}
//                 value={filters.metroStation || null}
//                 onChange={(event, newValue) => {
//                   handleFilterChange('metroStation', newValue || '');
//                 }}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label={t.selectStation}
//                     variant="outlined"
//                     size="small"
//                     placeholder={t.anyStation}
//                   />
//                 )}
//                 fullWidth
//                 clearOnEscape
//               />
//               {filters.metroStation && (
//                 <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
//                   <Chip
//                     size="small"
//                     label={t.clearAll}
//                     onDelete={() => handleFilterChange('metroStation', '')}
//                     deleteIcon={<ClearIcon />}
//                   />
//                 </Box>
//               )}
//             </AccordionDetails>
//           </Accordion>
//         )}

//         {/* Цена */}
//         <Accordion defaultExpanded>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography fontWeight="500">{t.price}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box sx={{ px: 1 }}>
//               <Slider
//                 value={filters.priceRange}
//                 onChange={(_, newValue) => handleFilterChange('priceRange', newValue)}
//                 valueLabelDisplay="auto"
//                 valueLabelFormat={(value) => `${value} грн`}
//                 min={priceLimits.min}
//                 max={priceLimits.max}
//                 step={100}
//               />
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//                 <TextField
//                   size="small"
//                   label={t.from}
//                   value={filters.priceRange[0]}
//                   onChange={(e) => handleFilterChange('priceRange', [Number(e.target.value) || 0, filters.priceRange[1]])}
//                   sx={{ width: '45%' }}
//                   InputProps={{
//                     endAdornment: <InputAdornment position="end">₴</InputAdornment>,
//                   }}
//                 />
//                 <TextField
//                   size="small"
//                   label={t.to}
//                   value={filters.priceRange[1]}
//                   onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value) || 0])}
//                   sx={{ width: '45%' }}
//                   InputProps={{
//                     endAdornment: <InputAdornment position="end">₴</InputAdornment>,
//                   }}
//                 />
//               </Box>
//             </Box>
//           </AccordionDetails>
//         </Accordion>

//         {/* Количество комнат */}
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography fontWeight="500">{t.rooms}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//               <Chip
//                 label={t.any}
//                 onClick={() => handleFilterChange('rooms', '')}
//                 color={filters.rooms === '' ? 'primary' : 'default'}
//                 variant={filters.rooms === '' ? 'filled' : 'outlined'}
//               />
//               {ROOM_OPTIONS.map(room => (
//                 <Chip
//                   key={room}
//                   label={room}
//                   onClick={() => handleFilterChange('rooms', room === filters.rooms ? '' : room)}
//                   color={filters.rooms === room ? 'primary' : 'default'}
//                   variant={filters.rooms === room ? 'filled' : 'outlined'}
//                 />
//               ))}
//             </Box>
//           </AccordionDetails>
//         </Accordion>

//         {/* Гости */}
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography fontWeight="500">{t.guests}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//               <Chip
//                 label={t.any}
//                 onClick={() => handleFilterChange('guests', '')}
//                 color={filters.guests === '' ? 'primary' : 'default'}
//                 variant={filters.guests === '' ? 'filled' : 'outlined'}
//               />
//               {GUEST_OPTIONS.map(guest => (
//                 <Chip
//                   key={guest}
//                   label={guest}
//                   onClick={() => handleFilterChange('guests', guest === filters.guests ? '' : guest)}
//                   color={filters.guests === guest ? 'primary' : 'default'}
//                   variant={filters.guests === guest ? 'filled' : 'outlined'}
//                 />
//               ))}
//             </Box>
//           </AccordionDetails>
//         </Accordion>

//         {/* Площадь */}
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography fontWeight="500">{t.area}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box sx={{ px: 1 }}>
//               <Slider
//                 value={filters.areaRange}
//                 onChange={(_, newValue) => handleFilterChange('areaRange', newValue)}
//                 valueLabelDisplay="auto"
//                 valueLabelFormat={(value) => `${value} м²`}
//                 min={areaLimits.min}
//                 max={areaLimits.max}
//                 step={5}
//               />
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//                 <TextField
//                   size="small"
//                   label={t.from}
//                   value={filters.areaRange[0]}
//                   onChange={(e) => handleFilterChange('areaRange', [Number(e.target.value) || 0, filters.areaRange[1]])}
//                   sx={{ width: '45%' }}
//                   InputProps={{
//                     endAdornment: <InputAdornment position="end">м²</InputAdornment>,
//                   }}
//                 />
//                 <TextField
//                   size="small"
//                   label={t.to}
//                   value={filters.areaRange[1]}
//                   onChange={(e) => handleFilterChange('areaRange', [filters.areaRange[0], Number(e.target.value) || 0])}
//                   sx={{ width: '45%' }}
//                   InputProps={{
//                     endAdornment: <InputAdornment position="end">м²</InputAdornment>,
//                   }}
//                 />
//               </Box>
//             </Box>
//           </AccordionDetails>
//         </Accordion>

//         {/* Удобства - ТЕПЕРЬ СО ВСЕМИ УДОБСТВАМИ! */}
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography fontWeight="500">{t.conveniences}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, maxHeight: 300, overflowY: 'auto' }}>
//               {CONVENIENCES[currentLanguage].map(conv => (
//                 <Chip
//                   key={conv.id}
//                   label={`${conv.icon} ${conv.label}`}
//                   onClick={() => handleConvenienceToggle(conv)}
//                   color={filters.conveniences.includes(conv.id) ? 'primary' : 'default'}
//                   variant={filters.conveniences.includes(conv.id) ? 'filled' : 'outlined'}
//                   sx={{ m: 0.5 }}
//                 />
//               ))}
//             </Box>
//           </AccordionDetails>
//         </Accordion>

//         {/* Дополнительные опции */}
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography fontWeight="500">{t.moreFilters}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//               <FormControl fullWidth size="small">
//                 <InputLabel>{t.smoking}</InputLabel>
//                 <Select
//                   value={filters.smoking}
//                   label={t.smoking}
//                   onChange={(e) => handleFilterChange('smoking', e.target.value)}
//                 >
//                   {booleanOptions.map(opt => (
//                     <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl fullWidth size="small">
//                 <InputLabel>{t.parties}</InputLabel>
//                 <Select
//                   value={filters.parties}
//                   label={t.parties}
//                   onChange={(e) => handleFilterChange('parties', e.target.value)}
//                 >
//                   {booleanOptions.map(opt => (
//                     <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl fullWidth size="small">
//                 <InputLabel>{t.pets}</InputLabel>
//                 <Select
//                   value={filters.pets}
//                   label={t.pets}
//                   onChange={(e) => handleFilterChange('pets', e.target.value)}
//                 >
//                   {booleanOptions.map(opt => (
//                     <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl fullWidth size="small">
//                 <InputLabel>{t.fullDay}</InputLabel>
//                 <Select
//                   value={filters.fullDay}
//                   label={t.fullDay}
//                   onChange={(e) => handleFilterChange('fullDay', e.target.value)}
//                 >
//                   {booleanOptions.map(opt => (
//                     <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl fullWidth size="small">
//                 <InputLabel>{t.reportDocs}</InputLabel>
//                 <Select
//                   value={filters.reportDocs}
//                   label={t.reportDocs}
//                   onChange={(e) => handleFilterChange('reportDocs', e.target.value)}
//                 >
//                   {booleanOptions.map(opt => (
//                     <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Box>
//           </AccordionDetails>
//         </Accordion>

//         {/* Кнопки */}
//         <Box sx={{ display: 'flex', gap: 2, mt: 3, mb: 4 }}>
//           <Button
//             fullWidth
//             variant="outlined"
//             onClick={handleClearAndApply}
//             startIcon={<ClearIcon />}
//             sx={{ 
//               borderRadius: 2,
//               py: 1.2,
//               fontWeight: 600,
//             }}
//           >
//             {t.clearAll}
//           </Button>
//           <Button
//             fullWidth
//             variant="contained"
//             onClick={handleApplyFilters}
//             disabled={loading}
//             sx={{ 
//               borderRadius: 2,
//               py: 1.2,
//               fontWeight: 600,
//             }}
//           >
//             {t.apply}
//           </Button>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default SearchApartmentFilters;








// 'use client';

// import React, { useState, useEffect, useMemo } from 'react';
// import { DISTRICTS_DATA, getCityKey } from '@/app/components/DistrictsData';
// import {
//   Box,
//   Typography,
//   Button,
//   Drawer,
//   IconButton,
//   Badge,
//   Chip,
//   Slider,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   InputAdornment,
//   Paper,
//   useMediaQuery,
//   useTheme,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Autocomplete,
// } from '@mui/material';
// import {
//   Tune as TuneIcon,
//   Close as CloseIcon,
//   ExpandMore as ExpandMoreIcon,
//   Clear as ClearIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
// } from '@mui/icons-material';
// import { useLanguage } from '@/app/LanguageContext';

// // Константы для городов с метро и станциями
// const CITIES_WITH_METRO = ['Київ', 'Харків', 'Дніпро', 'Киев', 'Харьков', 'Днепр'];

// const METRO_STATIONS = {
//   'Київ': {
//     ua: [
//       'Академмістечко', 'Житомирська', 'Святошин', 'Нивки', 'Берестейська', 'Шулявська',
//       'Політехнічний інститут', 'Вокзальна', 'Університет', 'Театральна', 'Хрещатик', 'Арсенальна',
//       'Дніпро', 'Гідропарк', 'Лівобережна', 'Дарниця', 'Чернігівська', 'Лісова', 'Героїв Дніпра',
//       'Мінська', 'Оболонь', 'Поштова площа', 'Контрактова площа', 'Тараса Шевченка', 'Лук\'янівська',
//       'Дорогожичі', 'Сирець', 'Золоті ворота', 'Палац спорту', 'Олімпійська', 'Палац «Україна»',
//       'Либідська', 'Деміївська', 'Голосіївська', 'Васильківська', 'Виставковий центр', 'Іподром',
//       'Теремки', 'Кловська', 'Печерська', 'Видубичі', 'Славутич', 'Осокорки',
//       'Позняки', 'Почайна/Петрівка','Харківська', 'Вирлиця', 'Бориспільська', 'Червоний хутір', 
//       'Майдан Незалежності', 'Площа Українських Героїв/Льва Толстого', 'Звіринецька',
//     ],
//     ru: [
//       'Академгородок', 'Житомирская', 'Святошин', 'Нивки', 'Берестейская', 'Шулявская',
//       'Политехнический институт', 'Вокзальная', 'Университет', 'Театральная', 'Крещатик', 'Арсенальная',
//       'Днепр', 'Гидропарк', 'Левобережная', 'Дарница', 'Черниговская', 'Лесная', 'Героев Днепра',
//       'Минская', 'Оболонь', 'Почтовая площадь', 'Контрактовая площадь', 'Тараса Шевченко', 'Лукьяновская',
//       'Дорогожичи', 'Сырец', 'Золотые ворота', 'Дворец спорта', 'Олимпийская', 'Дворец «Украина»',
//       'Лыбедская', 'Демиевская', 'Голосеевская', 'Васильковская', 'Выставочный центр', 'Ипподром',
//       'Теремки', 'Кловская', 'Печерская', 'Зверинецкая', 'Выдубичи', 'Славутич', 'Осокорки',
//       'Позняки', 'Почайна/Петровка','Харьковская', 'Вырлица', 'Бориспольская', 'Красный хутор', 
//       'Майдан Независимости', 'Площадь Украинских Героев/Льва Толстого', 'Зверинецкая',
//     ]
//   },
//   'Харків': {
//     ua: ['Холодна гора', 'Південний вокзал', 'Центральний ринок', 'Майдан Конституції', 'Історичний музей', 'Проспект Гагаріна', 'Спортивна', 'Завод імені Малишева', 'Турбоатом', 'Індустріальна', 'Академіка Павлова', 'Студентська', 'Героїв Праці', 'Перемога', 'Олексіївська', '23 Серпня', 'Ботанічний сад', 'Держпром', 'Університет'],
//     ru: ['Холодная гора', 'Южный вокзал', 'Центральный рынок', 'Площадь Конституции', 'Исторический музей', 'Проспект Гагарина', 'Спортивная', 'Завод имени Малышева', 'Турбоатом', 'Индустриальная', 'Академика Павлова', 'Студенческая', 'Героев Труда', 'Победа', 'Алексеевская', '23 Августа', 'Ботанический сад', 'Госпром', 'Университет']
//   },
//   'Дніпро': {
//     ua: ['Вокзальна', 'Металургів', 'Заводська', 'Метробудівників', 'Проспект Свободи', 'Покровська'],
//     ru: ['Вокзальная', 'Металлургов', 'Заводская', 'Метростроителей', 'Проспект Свободы', 'Покровская']
//   }
// };

// METRO_STATIONS['Киев'] = METRO_STATIONS['Київ'];
// METRO_STATIONS['Харьков'] = METRO_STATIONS['Харків'];
// METRO_STATIONS['Днепр'] = METRO_STATIONS['Дніпро'];

// const ROOM_OPTIONS = [1, 2, 3, 4, 5, '6+'];
// const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10+'];

// // ВСЕ УДОБСТВА - полный список!
// const CONVENIENCES = {
//   ua: [
//     { id: 'балкон', label: 'Балкон', icon: '🏠' },
//     { id: 'барбекю-зона', label: 'Барбекю-зона', icon: '🔥' },
//     { id: 'басейн', label: 'Басейн', icon: '🏊' },
//     { id: 'ігрова кімната', label: 'Ігрова кімната', icon: '🎮' },
//     { id: 'блендер', label: 'Блендер', icon: '🥤' },
//     { id: 'бойлер', label: 'Бойлер', icon: '🔥' },
//     { id: 'ванна', label: 'Ванна', icon: '🛁' },
//     { id: 'вентилятор', label: 'Вентилятор', icon: '🌀' },
//     { id: 'генератор', label: 'Генератор', icon: '⚡' },
//     { id: 'громадська кухня', label: 'Громадська кухня', icon: '🍳' },
//     { id: 'джакузі', label: 'Джакузі', icon: '🛁' },
//     { id: 'дитяче ліжечко', label: 'Дитяче ліжечко', icon: '👶' },
//     { id: 'дитячий стілець', label: 'Дитячий стілець', icon: '🪑' },
//     { id: 'домашній кінотеатр', label: 'Домашній кінотеатр', icon: '🎬' },
//     { id: 'духовка', label: 'Духовка', icon: '🔥' },
//     { id: 'душова кабіна', label: 'Душова кабіна', icon: '🚿' },
//     { id: 'електрочайник', label: 'Електрочайник', icon: '☕' },
//     { id: 'електроплита', label: 'Електроплита', icon: '🔥' },
//     { id: 'газова плита', label: 'Газова плита', icon: '🔥' },
//     { id: 'зарядка для електромобілів', label: 'Зарядка для електромобілів', icon: '🔋' },
//     { id: 'заміна постільної білизни', label: 'Заміна постільної білизни', icon: '🛏️' },
//     { id: 'інтернет', label: 'Інтернет', icon: '📶' },
//     { id: 'кавоварка', label: 'Кавоварка', icon: '☕' },
//     { id: 'камін', label: 'Камін', icon: '🔥' },
//     { id: 'кабельне тб', label: 'Кабельне ТБ', icon: '📺' },
//     { id: 'кондиціонер', label: 'Кондиціонер', icon: '❄️' },
//     { id: 'ліжко', label: 'Ліжко', icon: '🛏️' },
//     { id: 'диван', label: 'Диван', icon: '🛋️' },
//     { id: 'лазня', label: 'Лазня', icon: '🧖' },
//     { id: 'мангал', label: 'Мангал', icon: '🔥' },
//     { id: 'мікрохвильова піч', label: 'Мікрохвильова піч', icon: '🔥' },
//     { id: 'охорона', label: 'Охорона', icon: '🛡️' },
//     { id: 'парковка', label: 'Парковка', icon: '🅿️' },
//     { id: "комп'ютер", label: "Комп'ютер", icon: '💻' },
//     { id: 'пляжне обладнання', label: 'Пляжне обладнання', icon: '🏖️' },
//     { id: 'посуд', label: 'Посуд', icon: '🍽️' },
//     { id: 'посудомийна машина', label: 'Посудомийна машина', icon: '🧼' },
//     { id: 'пральна машина', label: 'Пральна машина', icon: '🧺' },
//     { id: 'пральний порошок', label: 'Пральний порошок', icon: '🧼' },
//     { id: 'праска', label: 'Праска', icon: '👕' },
//     { id: 'рушники', label: 'Рушники', icon: '🧻' },
//     { id: 'сейф', label: 'Сейф', icon: '🔒' },
//     { id: 'спортзал', label: 'Спортзал', icon: '🏋️' },
//     { id: 'спортивний інвентар', label: 'Спортивний інвентар', icon: '⚽' },
//     { id: 'столові прибори', label: 'Столові прибори', icon: '🍴' },
//     { id: 'сушилка', label: 'Сушилка', icon: '🧺' },
//     { id: 'супутникове тб', label: 'Супутникове ТБ', icon: '📡' },
//     { id: 'тапочки', label: 'Тапочки', icon: '👟' },
//     { id: 'тераса', label: 'Тераса', icon: '🏡' },
//     { id: 'тостер', label: 'Тостер', icon: '🍞' },
//     { id: 'туалетні принадлежності', label: 'Туалетні принадлежності', icon: '🧴' },
//     { id: 'фен', label: 'Фен', icon: '💨' },
//     { id: 'холодильник', label: 'Холодильник', icon: '🧊' },
//     { id: 'догляд за тваринами', label: 'Догляд за тваринами', icon: '🐕' },
//     { id: 'кафе', label: 'Кафе', icon: '☕' },
//     { id: 'конференц-зал', label: 'Конференц-зал', icon: '🏢' },
//     { id: 'переговорна', label: 'Переговорна', icon: '💼' },
//     { id: 'лікувальні процедури', label: 'Лікувальні процедури', icon: '💊' },
//     { id: 'організація подій', label: 'Організація подій', icon: '🎉' },
//     { id: 'трансфер', label: 'Трансфер', icon: '🚗' },
//     { id: 'харчування', label: 'Харчування', icon: '🍲' },
//     { id: 'прокат', label: 'Прокат', icon: '🚲' },
//   ],
//   ru: [
//     { id: 'балкон', label: 'Балкон', icon: '🏠' },
//     { id: 'барбекю-зона', label: 'Зона барбекю', icon: '🔥' },
//     { id: 'басейн', label: 'Бассейн', icon: '🏊' },
//     { id: 'ігрова кімната', label: 'Игровая комната', icon: '🎮' },
//     { id: 'блендер', label: 'Блендер', icon: '🥤' },
//     { id: 'бойлер', label: 'Бойлер', icon: '🔥' },
//     { id: 'ванна', label: 'Ванна', icon: '🛁' },
//     { id: 'вентилятор', label: 'Вентилятор', icon: '🌀' },
//     { id: 'генератор', label: 'Генератор', icon: '⚡' },
//     { id: 'громадська кухня', label: 'Общая кухня', icon: '🍳' },
//     { id: 'джакузі', label: 'Джакузи', icon: '🛁' },
//     { id: 'дитяче ліжечко', label: 'Детская кроватка', icon: '👶' },
//     { id: 'дитячий стілець', label: 'Детский стульчик', icon: '🪑' },
//     { id: 'домашній кінотеатр', label: 'Домашний кинотеатр', icon: '🎬' },
//     { id: 'духовка', label: 'Духовка', icon: '🔥' },
//     { id: 'душова кабіна', label: 'Душевая кабина', icon: '🚿' },
//     { id: 'електрочайник', label: 'Электрочайник', icon: '☕' },
//     { id: 'електроплита', label: 'Электроплита', icon: '🔥' },
//     { id: 'газова плита', label: 'Газовая плита', icon: '🔥' },
//     { id: 'зарядка для електромобілів', label: 'Зарядка для электромобилей', icon: '🔋' },
//     { id: 'заміна постільної білизни', label: 'Смена постельного белья', icon: '🛏️' },
//     { id: 'інтернет', label: 'Интернет', icon: '📶' },
//     { id: 'кавоварка', label: 'Кофеварка', icon: '☕' },
//     { id: 'камін', label: 'Камин', icon: '🔥' },
//     { id: 'кабельне тб', label: 'Кабельное ТВ', icon: '📺' },
//     { id: 'кондиціонер', label: 'Кондиционер', icon: '❄️' },
//     { id: 'ліжко', label: 'Кровать', icon: '🛏️' },
//     { id: 'диван', label: 'Диван', icon: '🛋️' },
//     { id: 'лазня', label: 'Баня', icon: '🧖' },
//     { id: 'мангал', label: 'Мангал', icon: '🔥' },
//     { id: 'мікрохвильова піч', label: 'Микроволновая печь', icon: '🔥' },
//     { id: 'охорона', label: 'Охрана', icon: '🛡️' },
//     { id: 'парковка', label: 'Парковка', icon: '🅿️' },
//     { id: "комп'ютер", label: "Компьютер", icon: '💻' },
//     { id: 'пляжне обладнання', label: 'Пляжное оборудование', icon: '🏖️' },
//     { id: 'посуд', label: 'Посуда', icon: '🍽️' },
//     { id: 'посудомийна машина', label: 'Посудомоечная машина', icon: '🧼' },
//     { id: 'пральна машина', label: 'Стиральная машина', icon: '🧺' },
//     { id: 'пральний порошок', label: 'Стиральный порошок', icon: '🧼' },
//     { id: 'праска', label: 'Утюг', icon: '👕' },
//     { id: 'рушники', label: 'Полотенца', icon: '🧻' },
//     { id: 'сейф', label: 'Сейф', icon: '🔒' },
//     { id: 'спортзал', label: 'Спортзал', icon: '🏋️' },
//     { id: 'спортивний інвентар', label: 'Спортивный инвентарь', icon: '⚽' },
//     { id: 'столові прибори', label: 'Столовые приборы', icon: '🍴' },
//     { id: 'сушилка', label: 'Сушилка', icon: '🧺' },
//     { id: 'супутникове тб', label: 'Спутниковое ТВ', icon: '📡' },
//     { id: 'тапочки', label: 'Тапочки', icon: '👟' },
//     { id: 'тераса', label: 'Терраса', icon: '🏡' },
//     { id: 'тостер', label: 'Тостер', icon: '🍞' },
//     { id: 'туалетні принадлежності', label: 'Туалетные принадлежности', icon: '🧴' },
//     { id: 'фен', label: 'Фен', icon: '💨' },
//     { id: 'холодильник', label: 'Холодильник', icon: '🧊' },
//     { id: 'догляд за тваринами', label: 'Уход за животными', icon: '🐕' },
//     { id: 'кафе', label: 'Кафе', icon: '☕' },
//     { id: 'конференц-зал', label: 'Конференц-зал', icon: '🏢' },
//     { id: 'переговорна', label: 'Переговорная', icon: '💼' },
//     { id: 'лікувальні процедури', label: 'Лечебные процедуры', icon: '💊' },
//     { id: 'організація подій', label: 'Организация мероприятий', icon: '🎉' },
//     { id: 'трансфер', label: 'Трансфер', icon: '🚗' },
//     { id: 'харчування', label: 'Питание', icon: '🍲' },
//     { id: 'прокат', label: 'Прокат', icon: '🚲' },
//   ],
// };

// const SearchApartmentFilters = ({ 
//   apartments = [], 
//   onFilterChange, 
//   searchParams = {},
//   loading = false,
//   totalResults = 0,
//   currentCity = '',
//   filterStatus = {}, // объект с булевыми значениями: { priceRange: true, rooms: false, conv_барбекю-зона: true }
// }) => {
//   const { currentLanguage } = useLanguage();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   // Определяем, есть ли метро в текущем городе
//   const hasMetro = useMemo(() => {
//     if (!currentCity) return false;
//     return CITIES_WITH_METRO.some(city => 
//       city.toLowerCase() === currentCity.toLowerCase().trim()
//     );
//   }, [currentCity]);

//   // Получаем станции метро для текущего города
//   const metroStations = useMemo(() => {
//     if (!hasMetro || !currentCity) return [];
    
//     const cityKey = Object.keys(METRO_STATIONS).find(
//       key => key.toLowerCase() === currentCity.toLowerCase().trim()
//     );
    
//     if (!cityKey) return [];
    
//     return METRO_STATIONS[cityKey]?.[currentLanguage] || [];
//   }, [hasMetro, currentCity, currentLanguage]);

//   // Переводы
//   const t = {
//     filtersIncompatible: currentLanguage === 'ua' ? 'Фільтри несумісні' : 'Фильтры несовместимы', 
//     sortBy: currentLanguage === 'ua' ? 'Сортувати за' : 'Сортировать по',
//     filters: currentLanguage === 'ua' ? 'Фільтри' : 'Фильтры',
//     price: currentLanguage === 'ua' ? 'Ціна ' : 'Цена ',
//     from: currentLanguage === 'ua' ? 'від' : 'от',
//     to: currentLanguage === 'ua' ? 'до' : 'до',
//     rooms: currentLanguage === 'ua' ? 'Кімнати' : 'Комнаты',
//     guests: currentLanguage === 'ua' ? 'Гості' : 'Гости',
//     conveniences: currentLanguage === 'ua' ? 'Зручності' : 'Удобства',
//     clearAll: currentLanguage === 'ua' ? 'Очистити ' : 'Очистить ',
//     apply: currentLanguage === 'ua' ? 'Застосувати' : 'Применить',
//     moreFilters: currentLanguage === 'ua' ? 'Більше фільтрів' : 'Больше фильтров',
//     smoking: currentLanguage === 'ua' ? 'Паління' : 'Курение',
//     parties: currentLanguage === 'ua' ? 'Вечірки' : 'Вечеринки',
//     pets: currentLanguage === 'ua' ? 'Тварини' : 'Животные',
//     fullDay: currentLanguage === 'ua' ? 'Цілодобово' : 'Круглосуточно',
//     reportDocs: currentLanguage === 'ua' ? 'Звітні документи' : 'Отчетные документы',
//     area: currentLanguage === 'ua' ? 'Площа (м²)' : 'Площадь (м²)',
//     found: currentLanguage === 'ua' ? 'Знайдено' : 'Найдено',
//     variants: currentLanguage === 'ua' ? 'варіантів' : 'вариантов',
//     any: currentLanguage === 'ua' ? 'Будь-які' : 'Любые',
//     yes: currentLanguage === 'ua' ? 'Так' : 'Да',
//     no: currentLanguage === 'ua' ? 'Ні' : 'Нет',
//     metro: currentLanguage === 'ua' ? 'Метро' : 'Метро',
//     metroStation: currentLanguage === 'ua' ? 'Станція метро' : 'Станция метро',
//     anyStation: currentLanguage === 'ua' ? 'Будь-яка станція' : 'Любая станция',
//     selectStation: currentLanguage === 'ua' ? 'Виберіть станцію' : 'Выберите станцию',
//     district: currentLanguage === 'ua' ? 'Район' : 'Район',
//     districtPlaceholder: currentLanguage === 'ua' ? 'Виберіть район' : 'Выберите район',
//     anyDistrict: currentLanguage === 'ua' ? 'Будь-який район' : 'Любой район',
//     cityDistricts: currentLanguage === 'ua' ? 'Райони Києва' : 'Районы Киева',
//     regionDistrict: currentLanguage === 'ua' ? 'Київська область' : 'Киевская область',
//   };

//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     priceRange: [1200, 3300],
//     rooms: '',
//     guests: searchParams?.guests || '',
//     areaRange: [0, 500],
//     conveniences: [],
//     smoking: 'any',
//     parties: 'any',
//     pets: 'any',
//     fullDay: 'any',
//     reportDocs: 'any',
//     sortBy: 'recommended',
//     metroStation: '',
//     district: '',
//   });
//   const [activeFiltersCount, setActiveFiltersCount] = useState(0);

//   // Лимиты цен из доступных квартир
//   const priceLimits = useMemo(() => {
//     if (!apartments.length) return { min: 500, max: 10000 };
//     const prices = apartments.map(a => Number(a.price) || 0).filter(p => p > 0);
//     if (!prices.length) return { min: 500, max: 10000 };
//     return {
//       min: Math.floor(Math.min(...prices) / 100) * 100,
//       max: Math.ceil(Math.max(...prices) / 100) * 100,
//     };
//   }, [apartments]);

//   // Лимиты площади из доступных квартир
//   const areaLimits = useMemo(() => {
//     if (!apartments.length) return { min: 0, max: 500 };
//     const areas = apartments.map(a => Number(a.size) || 0).filter(a => a > 0);
//     if (!areas.length) return { min: 0, max: 500 };
//     return {
//       min: Math.min(...areas),
//       max: Math.max(...areas),
//     };
//   }, [apartments]);

//   // Подсчет активных фильтров
//   useEffect(() => {
//     let count = 0;
//     if (filters.priceRange[0] > priceLimits.min || filters.priceRange[1] < priceLimits.max) count++;
//     if (filters.rooms) count++;
//     if (filters.guests && filters.guests !== searchParams?.guests) count++;
//     if (filters.areaRange[0] > areaLimits.min || filters.areaRange[1] < areaLimits.max) count++;
//     if (filters.conveniences.length > 0) count += filters.conveniences.length;
//     if (filters.smoking !== 'any') count++;
//     if (filters.parties !== 'any') count++;
//     if (filters.pets !== 'any') count++;
//     if (filters.fullDay !== 'any') count++;
//     if (filters.reportDocs !== 'any') count++;
//     if (filters.sortBy !== 'recommended') count++;
//     if (hasMetro && filters.metroStation) count++;
//     if (filters.district) count++;
    
//     setActiveFiltersCount(count);
//   }, [filters, searchParams?.guests, priceLimits, areaLimits, hasMetro]);

//   // Инициализация фильтров при загрузке
//   useEffect(() => {
//     setFilters(prev => ({
//       ...prev,
//       priceRange: [priceLimits.min, priceLimits.max],
//       areaRange: [areaLimits.min, areaLimits.max],
//       guests: searchParams?.guests || '',
//       metroStation: hasMetro ? prev.metroStation : '',
//     }));
//   }, [priceLimits, areaLimits, searchParams?.guests, hasMetro]);

//   const handleFilterChange = (name, value) => {
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const handleConvenienceToggle = (convenience) => {
//     const normalizedId = convenience.id;
    
//     setFilters(prev => {
//       const newConveniences = prev.conveniences.includes(normalizedId)
//         ? prev.conveniences.filter(id => id !== normalizedId)
//         : [...prev.conveniences, normalizedId];
//       return { ...prev, conveniences: newConveniences };
//     });
//   };

//   const handleApplyFilters = () => {
//     onFilterChange(filters);
//     setDrawerOpen(false);
//   };

//   const handleClearAndApply = () => {
//     const clearedFilters = {
//       priceRange: [priceLimits.min, priceLimits.max],
//       rooms: '',
//       guests: searchParams?.guests || '',
//       areaRange: [areaLimits.min, areaLimits.max],
//       conveniences: [],
//       smoking: 'any',
//       parties: 'any',
//       pets: 'any',
//       fullDay: 'any',
//       reportDocs: 'any',
//       sortBy: 'recommended',
//       metroStation: '',
//       district: '',
//     };
    
//     setFilters(clearedFilters);
//     onFilterChange(clearedFilters);
//     setDrawerOpen(false);
//   };

//   // Если нет квартир, не показываем фильтры
//   if (!apartments.length) {
//     return null;
//   }

//   const booleanOptions = [
//     { value: 'any', label: t.any },
//     { value: 'yes', label: t.yes },
//     { value: 'no', label: t.no },
//   ];

//   // Функция для получения статуса фильтра
//   const getFilterStatus = (filterKey) => {
//     if (filterStatus && filterStatus[filterKey] !== undefined) {
//       return filterStatus[filterKey];
//     }
//     return true; // По умолчанию зеленый
//   };

//   return (
//     <>
//       {/* Мобильная панель */}
//       {isMobile && (
//         <Paper 
//           elevation={0}
//           sx={{ 
//             position: 'sticky', 
//             top: 0,
//             zIndex: 1000,
//             mb: 2,
//             border: '1px solid #e0e0e0',
//             borderRadius: 2,
//             bgcolor: 'background.paper',
//           }}
//         >
//           <Box sx={{ p: 1.5 }}>
//             <Box sx={{ textAlign: 'center', mb: 1 }}>
//               <Typography variant="body2" color="primary" fontWeight="600">
//                 {totalResults} {t.variants}
//               </Typography>
//             </Box>

//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 onClick={() => setDrawerOpen(true)}
//                 size="small"
//                 sx={{ 
//                   borderRadius: 2,
//                   py: 1,
//                   borderColor: '#e0e0e0',
//                   justifyContent: 'space-between',
//                 }}
//                 endIcon={
//                   <Badge badgeContent={activeFiltersCount} color="primary" max={9}>
//                     <TuneIcon />
//                   </Badge>
//                 }
//               >
//                 {t.filters}
//               </Button>
              
//               {activeFiltersCount > 0 && (
//                 <Button
//                   variant="text"
//                   onClick={handleClearAndApply}
//                   size="small"
//                   sx={{ 
//                     minWidth: 'auto',
//                     px: 2,
//                     color: '#d32f2f',
//                   }}
//                 >
//                   {t.clearAll}
//                 </Button>
//               )}
//             </Box>
//           </Box>
//         </Paper>
//       )}

//       {/* Десктопная версия */}
//       {!isMobile && (
//         <Paper 
//           elevation={2} 
//           sx={{ 
//             p: 3, 
//             mb: 4, 
//             borderRadius: 2,
//             border: '1px solid',
//             borderColor: 'divider',
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <Typography variant="h6" color="primary">
//                 {t.found}: <strong>{totalResults}</strong> {t.variants}
//               </Typography>
              
//               {/* Индикатор статуса фильтров */}
//               {totalResults === 0 && (
//   <Chip
//     icon={<CancelIcon />}
//     label={t.filtersIncompatible}
//     color="error"
//     size="small"
//     variant="outlined"
//   />
// )}
//             </Box>

//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button
//                 variant={activeFiltersCount > 0 ? "contained" : "outlined"}
//                 startIcon={<TuneIcon />}
//                 onClick={() => setDrawerOpen(true)}
//               >
//                 {t.filters} {activeFiltersCount > 0 && `(${activeFiltersCount})`}
//               </Button>

//               {activeFiltersCount > 0 && (
//                 <Button
//                   variant="text"
//                   startIcon={<ClearIcon />}
//                   onClick={handleClearAndApply}
//                   size="small"
//                 >
//                   {t.clearAll}
//                 </Button>
//               )}
//             </Box>
//           </Box>
//         </Paper>
//       )}

//       {/* Drawer с фильтрами */}
//       <Drawer
//         anchor={isMobile ? "bottom" : "right"}
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         PaperProps={{
//           sx: {
//             width: isMobile ? '100%' : 400,
//             maxHeight: isMobile ? '90vh' : '100%',
//             borderTopLeftRadius: isMobile ? 16 : 0,
//             borderTopRightRadius: isMobile ? 16 : 0,
//             '@media (max-width: 600px)': {
//               width: '80% !important',
//               marginLeft: 'auto !important',
//               marginRight: 'auto !important',
//             },
//             p: 3,
//             pb: 4,
//             overflowY: 'auto',
//           }
//         }}
//       >
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Typography variant="h6">
//             {t.filters} {activeFiltersCount > 0 && `(${activeFiltersCount})`}
//           </Typography>
//           <IconButton onClick={() => setDrawerOpen(false)}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         {/* РАЙОН */}
//         {currentCity && (currentCity.toLowerCase().includes('київ') || currentCity.toLowerCase().includes('киев')) && (
//           <Accordion defaultExpanded>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 {filterStatus.district !== undefined && (
//                   filterStatus.district ? 
//                     <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
//                     <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
//                 )}
//                 <Typography fontWeight="500">{t.district}</Typography>
//               </Box>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Autocomplete
//                 options={DISTRICTS_DATA.kyiv[currentLanguage]}
//                 getOptionLabel={(option) => option.name}
//                 value={DISTRICTS_DATA.kyiv[currentLanguage].find(d => d.id === filters.district) || null}
//                 onChange={(event, newValue) => {
//                   handleFilterChange('district', newValue ? newValue.id : '');
//                 }}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label={t.districtPlaceholder}
//                     variant="outlined"
//                     size="small"
//                     placeholder={t.anyDistrict}
//                   />
//                 )}
//                 fullWidth
//                 clearOnEscape
//               />
//               {filters.district && (
//                 <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
//                   <Chip
//                     size="small"
//                     label={t.clearAll}
//                     onDelete={() => handleFilterChange('district', '')}
//                     deleteIcon={<ClearIcon />}
//                   />
//                 </Box>
//               )}
//             </AccordionDetails>
//           </Accordion>
//         )}

//         {/* МЕТРО */}
//         {hasMetro && (
//           <Accordion defaultExpanded>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 {filterStatus.metroStation !== undefined && (
//                   filterStatus.metroStation ? 
//                     <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
//                     <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
//                 )}
//                 <Typography fontWeight="500">{t.metro}</Typography>
//               </Box>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Autocomplete
//                 options={metroStations}
//                 value={filters.metroStation || null}
//                 onChange={(event, newValue) => {
//                   handleFilterChange('metroStation', newValue || '');
//                 }}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label={t.selectStation}
//                     variant="outlined"
//                     size="small"
//                     placeholder={t.anyStation}
//                   />
//                 )}
//                 fullWidth
//                 clearOnEscape
//               />
//               {filters.metroStation && (
//                 <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
//                   <Chip
//                     size="small"
//                     label={t.clearAll}
//                     onDelete={() => handleFilterChange('metroStation', '')}
//                     deleteIcon={<ClearIcon />}
//                   />
//                 </Box>
//               )}
//             </AccordionDetails>
//           </Accordion>
//         )}

//         {/* Цена */}
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               {filterStatus.priceRange !== undefined && (
//                 filterStatus.priceRange ? 
//                   <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
//                   <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
//               )}
//               <Typography fontWeight="500">{t.price}</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box sx={{ px: { xs: 0, sm: 1 } }}>
//               <Slider
//                 value={filters.priceRange}
//                 onChange={(_, newValue) => handleFilterChange('priceRange', newValue)}
//                 valueLabelDisplay="auto"
//                 valueLabelFormat={(value) => `${value} грн`}
//                 min={priceLimits.min}
//                 max={priceLimits.max}
//                 step={100}
//                 size={isMobile ? "small" : "medium"}
//               />
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: 1 }}>
//                 <TextField
//                   size="small"
//                   label={t.from}
//                   value={filters.priceRange[0]}
//                   onChange={(e) => handleFilterChange('priceRange', [Number(e.target.value) || 0, filters.priceRange[1]])}
//                   sx={{ width: '45%' }}
//                   InputProps={{
//                     endAdornment: <InputAdornment position="end">₴</InputAdornment>,
//                   }}
//                 />
//                 <TextField
//                   size="small"
//                   label={t.to}
//                   value={filters.priceRange[1]}
//                   onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value) || 0])}
//                   sx={{ width: '45%' }}
//                   InputProps={{
//                     endAdornment: <InputAdornment position="end">₴</InputAdornment>,
//                   }}
//                 />
//               </Box>
//             </Box>
//           </AccordionDetails>
//         </Accordion>

//         {/* Количество комнат */}
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               {filterStatus.rooms !== undefined && (
//                 filterStatus.rooms ? 
//                   <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
//                   <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
//               )}
//               <Typography fontWeight="500">{t.rooms}</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, flexWrap: 'wrap' }}>
//               <Chip
//                 label={t.any}
//                 onClick={() => handleFilterChange('rooms', '')}
//                 color={filters.rooms === '' ? 'primary' : 'default'}
//                 variant={filters.rooms === '' ? 'filled' : 'outlined'}
//                 size={isMobile ? "small" : "medium"}
//               />
//               {ROOM_OPTIONS.map(room => (
//                 <Chip
//                   key={room}
//                   label={room}
//                   onClick={() => handleFilterChange('rooms', room === filters.rooms ? '' : room)}
//                   color={filters.rooms === room ? 'primary' : 'default'}
//                   variant={filters.rooms === room ? 'filled' : 'outlined'}
//                   size={isMobile ? "small" : "medium"}
//                 />
//               ))}
//             </Box>
//           </AccordionDetails>
//         </Accordion>

//         {/* Гости */}
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               {filterStatus.guests !== undefined && (
//                 filterStatus.guests ? 
//                   <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
//                   <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
//               )}
//               <Typography fontWeight="500">{t.guests}</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, flexWrap: 'wrap' }}>
//               <Chip
//                 label={t.any}
//                 onClick={() => handleFilterChange('guests', '')}
//                 color={filters.guests === '' ? 'primary' : 'default'}
//                 variant={filters.guests === '' ? 'filled' : 'outlined'}
//                 size={isMobile ? "small" : "medium"}
//               />
//               {GUEST_OPTIONS.map(guest => (
//                 <Chip
//                   key={guest}
//                   label={guest}
//                   onClick={() => handleFilterChange('guests', guest === filters.guests ? '' : guest)}
//                   color={filters.guests === guest ? 'primary' : 'default'}
//                   variant={filters.guests === guest ? 'filled' : 'outlined'}
//                   size={isMobile ? "small" : "medium"}
//                 />
//               ))}
//             </Box>
//           </AccordionDetails>
//         </Accordion>

//         {/* Площадь */}
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               {filterStatus.areaRange !== undefined && (
//                 filterStatus.areaRange ? 
//                   <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
//                   <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
//               )}
//               <Typography fontWeight="500">{t.area}</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box sx={{ px: { xs: 0, sm: 1 } }}>
//               <Slider
//                 value={filters.areaRange}
//                 onChange={(_, newValue) => handleFilterChange('areaRange', newValue)}
//                 valueLabelDisplay="auto"
//                 valueLabelFormat={(value) => `${value} м²`}
//                 min={areaLimits.min}
//                 max={areaLimits.max}
//                 step={5}
//                 size={isMobile ? "small" : "medium"}
//               />
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: 1 }}>
//                 <TextField
//                   size="small"
//                   label={t.from}
//                   value={filters.areaRange[0]}
//                   onChange={(e) => handleFilterChange('areaRange', [Number(e.target.value) || 0, filters.areaRange[1]])}
//                   sx={{ width: '45%' }}
//                   InputProps={{
//                     endAdornment: <InputAdornment position="end">м²</InputAdornment>,
//                   }}
//                 />
//                 <TextField
//                   size="small"
//                   label={t.to}
//                   value={filters.areaRange[1]}
//                   onChange={(e) => handleFilterChange('areaRange', [filters.areaRange[0], Number(e.target.value) || 0])}
//                   sx={{ width: '45%' }}
//                   InputProps={{
//                     endAdornment: <InputAdornment position="end">м²</InputAdornment>,
//                   }}
//                 />
//               </Box>
//             </Box>
//           </AccordionDetails>
//         </Accordion>

//         {/* Удобства */}
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography fontWeight="500">{t.conveniences}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box sx={{ 
//               display: 'flex', 
//               flexWrap: 'wrap', 
//               gap: { xs: 0.5, sm: 1 }, 
//               maxHeight: { xs: 250, sm: 300 }, 
//               overflowY: 'auto' 
//             }}>
//               {CONVENIENCES[currentLanguage].map(conv => {
//                 const convKey = `conv_${conv.id}`;
//                 const isWorking = getFilterStatus(convKey);
//                 const isSelected = filters.conveniences.includes(conv.id);
                
//                 return (
//                   <Chip
//                     key={conv.id}
//                     label={`${conv.icon} ${conv.label}`}
//                     onClick={() => handleConvenienceToggle(conv)}
//                     color={isSelected ? 'primary' : 'default'}
//                     variant={isSelected ? 'filled' : 'outlined'}
//                     size={isMobile ? "small" : "medium"}
//                     sx={{ 
//                       m: { xs: 0.25, sm: 0.5 },
//                       ...(!isWorking && isSelected && {
//                         borderColor: 'error.main',
//                         backgroundColor: 'rgba(211, 47, 47, 0.2)',
//                       }),
//                       ...(!isWorking && !isSelected && {
//                         borderColor: 'error.main',
//                         backgroundColor: 'rgba(211, 47, 47, 0.1)',
//                       }),
//                       ...(isWorking && isSelected && {
//                         backgroundColor: 'success.main',
//                         color: 'white',
//                         '&:hover': {
//                           backgroundColor: 'success.dark',
//                         }
//                       })
//                     }}
//                   />
//                 );
//               })}
//             </Box>
//           </AccordionDetails>
//         </Accordion>

//         {/* Дополнительные опции */}
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography fontWeight="500">{t.moreFilters}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//               <FormControl fullWidth size={isMobile ? "small" : "medium"}>
//                 <InputLabel>{t.smoking}</InputLabel>
//                 <Select
//                   value={filters.smoking}
//                   label={t.smoking}
//                   onChange={(e) => handleFilterChange('smoking', e.target.value)}
//                   sx={{
//                     ...(filterStatus.smoking !== undefined && !filterStatus.smoking && {
//                       borderColor: 'error.main',
//                       '& .MuiOutlinedInput-notchedOutline': {
//                         borderColor: 'error.main',
//                       }
//                     })
//                   }}
//                 >
//                   {booleanOptions.map(opt => (
//                     <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl fullWidth size={isMobile ? "small" : "medium"}>
//                 <InputLabel>{t.parties}</InputLabel>
//                 <Select
//                   value={filters.parties}
//                   label={t.parties}
//                   onChange={(e) => handleFilterChange('parties', e.target.value)}
//                   sx={{
//                     ...(filterStatus.parties !== undefined && !filterStatus.parties && {
//                       borderColor: 'error.main',
//                       '& .MuiOutlinedInput-notchedOutline': {
//                         borderColor: 'error.main',
//                       }
//                     })
//                   }}
//                 >
//                   {booleanOptions.map(opt => (
//                     <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl fullWidth size={isMobile ? "small" : "medium"}>
//                 <InputLabel>{t.pets}</InputLabel>
//                 <Select
//                   value={filters.pets}
//                   label={t.pets}
//                   onChange={(e) => handleFilterChange('pets', e.target.value)}
//                   sx={{
//                     ...(filterStatus.pets !== undefined && !filterStatus.pets && {
//                       borderColor: 'error.main',
//                       '& .MuiOutlinedInput-notchedOutline': {
//                         borderColor: 'error.main',
//                       }
//                     })
//                   }}
//                 >
//                   {booleanOptions.map(opt => (
//                     <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl fullWidth size={isMobile ? "small" : "medium"}>
//                 <InputLabel>{t.fullDay}</InputLabel>
//                 <Select
//                   value={filters.fullDay}
//                   label={t.fullDay}
//                   onChange={(e) => handleFilterChange('fullDay', e.target.value)}
//                   sx={{
//                     ...(filterStatus.fullDay !== undefined && !filterStatus.fullDay && {
//                       borderColor: 'error.main',
//                       '& .MuiOutlinedInput-notchedOutline': {
//                         borderColor: 'error.main',
//                       }
//                     })
//                   }}
//                 >
//                   {booleanOptions.map(opt => (
//                     <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl fullWidth size={isMobile ? "small" : "medium"}>
//                 <InputLabel>{t.reportDocs}</InputLabel>
//                 <Select
//                   value={filters.reportDocs}
//                   label={t.reportDocs}
//                   onChange={(e) => handleFilterChange('reportDocs', e.target.value)}
//                   sx={{
//                     ...(filterStatus.reportDocs !== undefined && !filterStatus.reportDocs && {
//                       borderColor: 'error.main',
//                       '& .MuiOutlinedInput-notchedOutline': {
//                         borderColor: 'error.main',
//                       }
//                     })
//                   }}
//                 >
//                   {booleanOptions.map(opt => (
//                     <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Box>
//           </AccordionDetails>
//         </Accordion>

//         {/* Кнопки */}
//         <Box sx={{ display: 'flex', gap: 2, mt: 3, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
//           <Button
//             fullWidth
//             variant="outlined"
//             onClick={handleClearAndApply}
//             startIcon={<ClearIcon />}
//           >
//             {t.clearAll}
//           </Button>
//           <Button
//             fullWidth
//             variant="contained"
//             onClick={handleApplyFilters}
//             disabled={loading}
//           >
//             {t.apply}
//           </Button>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default SearchApartmentFilters;





// 'use client';

// import React, { useState, useEffect, useMemo } from 'react';
// import { DISTRICTS_DATA, getCityKey } from '@/app/components/DistrictsData';
// import {
//   Box,
//   Typography,
//   Button,
//   Drawer,
//   IconButton,
//   Badge,
//   Chip,
//   Slider,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   InputAdornment,
//   Paper,
//   useMediaQuery,
//   useTheme,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Autocomplete,
// } from '@mui/material';
// import {
//   Tune as TuneIcon,
//   Close as CloseIcon,
//   ExpandMore as ExpandMoreIcon,
//   Clear as ClearIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
// } from '@mui/icons-material';
// import { useLanguage } from '@/app/LanguageContext';

// // Константы для городов с метро и станциями
// const CITIES_WITH_METRO = ['Київ', 'Харків', 'Дніпро', 'Киев', 'Харьков', 'Днепр'];

// const METRO_STATIONS = {
//   'Київ': {
//     ua: [
//       'Академмістечко', 'Житомирська', 'Святошин', 'Нивки', 'Берестейська', 'Шулявська',
//       'Політехнічний інститут', 'Вокзальна', 'Університет', 'Театральна', 'Хрещатик', 'Арсенальна',
//       'Дніпро', 'Гідропарк', 'Лівобережна', 'Дарниця', 'Чернігівська', 'Лісова', 'Героїв Дніпра',
//       'Мінська', 'Оболонь', 'Поштова площа', 'Контрактова площа', 'Тараса Шевченка', 'Лук\'янівська',
//       'Дорогожичі', 'Сирець', 'Золоті ворота', 'Палац спорту', 'Олімпійська', 'Палац «Україна»',
//       'Либідська', 'Деміївська', 'Голосіївська', 'Васильківська', 'Виставковий центр', 'Іподром',
//       'Теремки', 'Кловська', 'Печерська', 'Видубичі', 'Славутич', 'Осокорки',
//       'Позняки', 'Почайна/Петрівка','Харківська', 'Вирлиця', 'Бориспільська', 'Червоний хутір', 
//       'Майдан Незалежності', 'Площа Українських Героїв/Льва Толстого', 'Звіринецька',
//     ],
//     ru: [
//       'Академгородок', 'Житомирская', 'Святошин', 'Нивки', 'Берестейская', 'Шулявская',
//       'Политехнический институт', 'Вокзальная', 'Университет', 'Театральная', 'Крещатик', 'Арсенальная',
//       'Днепр', 'Гидропарк', 'Левобережная', 'Дарница', 'Черниговская', 'Лесная', 'Героев Днепра',
//       'Минская', 'Оболонь', 'Почтовая площадь', 'Контрактовая площадь', 'Тараса Шевченко', 'Лукьяновская',
//       'Дорогожичи', 'Сырец', 'Золотые ворота', 'Дворец спорта', 'Олимпийская', 'Дворец «Украина»',
//       'Лыбедская', 'Демиевская', 'Голосеевская', 'Васильковская', 'Выставочный центр', 'Ипподром',
//       'Теремки', 'Кловская', 'Печерская', 'Зверинецкая', 'Выдубичи', 'Славутич', 'Осокорки',
//       'Позняки', 'Почайна/Петровка','Харьковская', 'Вырлица', 'Бориспольская', 'Красный хутор', 
//       'Майдан Независимости', 'Площадь Украинских Героев/Льва Толстого', 'Зверинецкая',
//     ]
//   },
//   'Харків': {
//     ua: ['Холодна гора', 'Південний вокзал', 'Центральний ринок', 'Майдан Конституції', 'Історичний музей', 'Проспект Гагаріна', 'Спортивна', 'Завод імені Малишева', 'Турбоатом', 'Індустріальна', 'Академіка Павлова', 'Студентська', 'Героїв Праці', 'Перемога', 'Олексіївська', '23 Серпня', 'Ботанічний сад', 'Держпром', 'Університет'],
//     ru: ['Холодная гора', 'Южный вокзал', 'Центральный рынок', 'Площадь Конституции', 'Исторический музей', 'Проспект Гагарина', 'Спортивная', 'Завод имени Малышева', 'Турбоатом', 'Индустриальная', 'Академика Павлова', 'Студенческая', 'Героев Труда', 'Победа', 'Алексеевская', '23 Августа', 'Ботанический сад', 'Госпром', 'Университет']
//   },
//   'Дніпро': {
//     ua: ['Вокзальна', 'Металургів', 'Заводська', 'Метробудівників', 'Проспект Свободи', 'Покровська'],
//     ru: ['Вокзальная', 'Металлургов', 'Заводская', 'Метростроителей', 'Проспект Свободы', 'Покровская']
//   }
// };

// METRO_STATIONS['Киев'] = METRO_STATIONS['Київ'];
// METRO_STATIONS['Харьков'] = METRO_STATIONS['Харків'];
// METRO_STATIONS['Днепр'] = METRO_STATIONS['Дніпро'];

// const ROOM_OPTIONS = [1, 2, 3, 4, 5, '6+'];
// const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10+'];

// // ВСЕ УДОБСТВА - полный список!
// const CONVENIENCES = {
//   ua: [
//     { id: 'балкон', label: 'Балкон', icon: '🏠' },
//     { id: 'барбекю-зона', label: 'Барбекю-зона', icon: '🔥' },
//     { id: 'басейн', label: 'Басейн', icon: '🏊' },
//     { id: 'ігрова кімната', label: 'Ігрова кімната', icon: '🎮' },
//     { id: 'блендер', label: 'Блендер', icon: '🥤' },
//     { id: 'бойлер', label: 'Бойлер', icon: '🔥' },
//     { id: 'ванна', label: 'Ванна', icon: '🛁' },
//     { id: 'вентилятор', label: 'Вентилятор', icon: '🌀' },
//     { id: 'генератор', label: 'Генератор', icon: '⚡' },
//     { id: 'громадська кухня', label: 'Громадська кухня', icon: '🍳' },
//     { id: 'джакузі', label: 'Джакузі', icon: '🛁' },
//     { id: 'дитяче ліжечко', label: 'Дитяче ліжечко', icon: '👶' },
//     { id: 'дитячий стілець', label: 'Дитячий стілець', icon: '🪑' },
//     { id: 'домашній кінотеатр', label: 'Домашній кінотеатр', icon: '🎬' },
//     { id: 'духовка', label: 'Духовка', icon: '🔥' },
//     { id: 'душова кабіна', label: 'Душова кабіна', icon: '🚿' },
//     { id: 'електрочайник', label: 'Електрочайник', icon: '☕' },
//     { id: 'електроплита', label: 'Електроплита', icon: '🔥' },
//     { id: 'газова плита', label: 'Газова плита', icon: '🔥' },
//     { id: 'зарядка для електромобілів', label: 'Зарядка для електромобілів', icon: '🔋' },
//     { id: 'заміна постільної білизни', label: 'Заміна постільної білизни', icon: '🛏️' },
//     { id: 'інтернет', label: 'Інтернет', icon: '📶' },
//     { id: 'кавоварка', label: 'Кавоварка', icon: '☕' },
//     { id: 'камін', label: 'Камін', icon: '🔥' },
//     { id: 'кабельне тб', label: 'Кабельне ТБ', icon: '📺' },
//     { id: 'кондиціонер', label: 'Кондиціонер', icon: '❄️' },
//     { id: 'ліжко', label: 'Ліжко', icon: '🛏️' },
//     { id: 'диван', label: 'Диван', icon: '🛋️' },
//     { id: 'лазня', label: 'Лазня', icon: '🧖' },
//     { id: 'мангал', label: 'Мангал', icon: '🔥' },
//     { id: 'мікрохвильова піч', label: 'Мікрохвильова піч', icon: '🔥' },
//     { id: 'охорона', label: 'Охорона', icon: '🛡️' },
//     { id: 'парковка', label: 'Парковка', icon: '🅿️' },
//     { id: "комп'ютер", label: "Комп'ютер", icon: '💻' },
//     { id: 'пляжне обладнання', label: 'Пляжне обладнання', icon: '🏖️' },
//     { id: 'посуд', label: 'Посуд', icon: '🍽️' },
//     { id: 'посудомийна машина', label: 'Посудомийна машина', icon: '🧼' },
//     { id: 'пральна машина', label: 'Пральна машина', icon: '🧺' },
//     { id: 'пральний порошок', label: 'Пральний порошок', icon: '🧼' },
//     { id: 'праска', label: 'Праска', icon: '👕' },
//     { id: 'рушники', label: 'Рушники', icon: '🧻' },
//     { id: 'сейф', label: 'Сейф', icon: '🔒' },
//     { id: 'спортзал', label: 'Спортзал', icon: '🏋️' },
//     { id: 'спортивний інвентар', label: 'Спортивний інвентар', icon: '⚽' },
//     { id: 'столові прибори', label: 'Столові прибори', icon: '🍴' },
//     { id: 'сушилка', label: 'Сушилка', icon: '🧺' },
//     { id: 'супутникове тб', label: 'Супутникове ТБ', icon: '📡' },
//     { id: 'тапочки', label: 'Тапочки', icon: '👟' },
//     { id: 'тераса', label: 'Тераса', icon: '🏡' },
//     { id: 'тостер', label: 'Тостер', icon: '🍞' },
//     { id: 'туалетні принадлежності', label: 'Туалетні принадлежності', icon: '🧴' },
//     { id: 'фен', label: 'Фен', icon: '💨' },
//     { id: 'холодильник', label: 'Холодильник', icon: '🧊' },
//     { id: 'догляд за тваринами', label: 'Догляд за тваринами', icon: '🐕' },
//     { id: 'кафе', label: 'Кафе', icon: '☕' },
//     { id: 'конференц-зал', label: 'Конференц-зал', icon: '🏢' },
//     { id: 'переговорна', label: 'Переговорна', icon: '💼' },
//     { id: 'лікувальні процедури', label: 'Лікувальні процедури', icon: '💊' },
//     { id: 'організація подій', label: 'Організація подій', icon: '🎉' },
//     { id: 'трансфер', label: 'Трансфер', icon: '🚗' },
//     { id: 'харчування', label: 'Харчування', icon: '🍲' },
//     { id: 'прокат', label: 'Прокат', icon: '🚲' },
//   ],
//   ru: [
//     { id: 'балкон', label: 'Балкон', icon: '🏠' },
//     { id: 'барбекю-зона', label: 'Зона барбекю', icon: '🔥' },
//     { id: 'басейн', label: 'Бассейн', icon: '🏊' },
//     { id: 'ігрова кімната', label: 'Игровая комната', icon: '🎮' },
//     { id: 'блендер', label: 'Блендер', icon: '🥤' },
//     { id: 'бойлер', label: 'Бойлер', icon: '🔥' },
//     { id: 'ванна', label: 'Ванна', icon: '🛁' },
//     { id: 'вентилятор', label: 'Вентилятор', icon: '🌀' },
//     { id: 'генератор', label: 'Генератор', icon: '⚡' },
//     { id: 'громадська кухня', label: 'Общая кухня', icon: '🍳' },
//     { id: 'джакузі', label: 'Джакузи', icon: '🛁' },
//     { id: 'дитяче ліжечко', label: 'Детская кроватка', icon: '👶' },
//     { id: 'дитячий стілець', label: 'Детский стульчик', icon: '🪑' },
//     { id: 'домашній кінотеатр', label: 'Домашний кинотеатр', icon: '🎬' },
//     { id: 'духовка', label: 'Духовка', icon: '🔥' },
//     { id: 'душова кабіна', label: 'Душевая кабина', icon: '🚿' },
//     { id: 'електрочайник', label: 'Электрочайник', icon: '☕' },
//     { id: 'електроплита', label: 'Электроплита', icon: '🔥' },
//     { id: 'газова плита', label: 'Газовая плита', icon: '🔥' },
//     { id: 'зарядка для електромобілів', label: 'Зарядка для электромобилей', icon: '🔋' },
//     { id: 'заміна постільної білизни', label: 'Смена постельного белья', icon: '🛏️' },
//     { id: 'інтернет', label: 'Интернет', icon: '📶' },
//     { id: 'кавоварка', label: 'Кофеварка', icon: '☕' },
//     { id: 'камін', label: 'Камин', icon: '🔥' },
//     { id: 'кабельне тб', label: 'Кабельное ТВ', icon: '📺' },
//     { id: 'кондиціонер', label: 'Кондиционер', icon: '❄️' },
//     { id: 'ліжко', label: 'Кровать', icon: '🛏️' },
//     { id: 'диван', label: 'Диван', icon: '🛋️' },
//     { id: 'лазня', label: 'Баня', icon: '🧖' },
//     { id: 'мангал', label: 'Мангал', icon: '🔥' },
//     { id: 'мікрохвильова піч', label: 'Микроволновая печь', icon: '🔥' },
//     { id: 'охорона', label: 'Охрана', icon: '🛡️' },
//     { id: 'парковка', label: 'Парковка', icon: '🅿️' },
//     { id: "комп'ютер", label: "Компьютер", icon: '💻' },
//     { id: 'пляжне обладнання', label: 'Пляжное оборудование', icon: '🏖️' },
//     { id: 'посуд', label: 'Посуда', icon: '🍽️' },
//     { id: 'посудомийна машина', label: 'Посудомоечная машина', icon: '🧼' },
//     { id: 'пральна машина', label: 'Стиральная машина', icon: '🧺' },
//     { id: 'пральний порошок', label: 'Стиральный порошок', icon: '🧼' },
//     { id: 'праска', label: 'Утюг', icon: '👕' },
//     { id: 'рушники', label: 'Полотенца', icon: '🧻' },
//     { id: 'сейф', label: 'Сейф', icon: '🔒' },
//     { id: 'спортзал', label: 'Спортзал', icon: '🏋️' },
//     { id: 'спортивний інвентар', label: 'Спортивный инвентарь', icon: '⚽' },
//     { id: 'столові прибори', label: 'Столовые приборы', icon: '🍴' },
//     { id: 'сушилка', label: 'Сушилка', icon: '🧺' },
//     { id: 'супутникове тб', label: 'Спутниковое ТВ', icon: '📡' },
//     { id: 'тапочки', label: 'Тапочки', icon: '👟' },
//     { id: 'тераса', label: 'Терраса', icon: '🏡' },
//     { id: 'тостер', label: 'Тостер', icon: '🍞' },
//     { id: 'туалетні принадлежності', label: 'Туалетные принадлежности', icon: '🧴' },
//     { id: 'фен', label: 'Фен', icon: '💨' },
//     { id: 'холодильник', label: 'Холодильник', icon: '🧊' },
//     { id: 'догляд за тваринами', label: 'Уход за животными', icon: '🐕' },
//     { id: 'кафе', label: 'Кафе', icon: '☕' },
//     { id: 'конференц-зал', label: 'Конференц-зал', icon: '🏢' },
//     { id: 'переговорна', label: 'Переговорная', icon: '💼' },
//     { id: 'лікувальні процедури', label: 'Лечебные процедуры', icon: '💊' },
//     { id: 'організація подій', label: 'Организация мероприятий', icon: '🎉' },
//     { id: 'трансфер', label: 'Трансфер', icon: '🚗' },
//     { id: 'харчування', label: 'Питание', icon: '🍲' },
//     { id: 'прокат', label: 'Прокат', icon: '🚲' },
//   ],
// };

// const SearchApartmentFilters = ({ 
//   apartments = [], 
//   onFilterChange, 
//   searchParams = {},
//   loading = false,
//   totalResults = 0,
//   currentCity = '',
//   filterStatus = {}, // объект с булевыми значениями: { priceRange: true, rooms: false, conv_барбекю-зона: true }
// }) => {
//   const { currentLanguage } = useLanguage();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   // Определяем, есть ли метро в текущем городе
//   const hasMetro = useMemo(() => {
//     if (!currentCity) return false;
//     return CITIES_WITH_METRO.some(city => 
//       city.toLowerCase() === currentCity.toLowerCase().trim()
//     );
//   }, [currentCity]);

//   // Получаем станции метро для текущего города
//   const metroStations = useMemo(() => {
//     if (!hasMetro || !currentCity) return [];
    
//     const cityKey = Object.keys(METRO_STATIONS).find(
//       key => key.toLowerCase() === currentCity.toLowerCase().trim()
//     );
    
//     if (!cityKey) return [];
    
//     return METRO_STATIONS[cityKey]?.[currentLanguage] || [];
//   }, [hasMetro, currentCity, currentLanguage]);

//   // Переводы
//   const t = {
//     filtersIncompatible: currentLanguage === 'ua' ? 'Фільтри несумісні' : 'Фильтры несовместимы', 
//     sortBy: currentLanguage === 'ua' ? 'Сортувати за' : 'Сортировать по',
//     filters: currentLanguage === 'ua' ? 'Фільтри' : 'Фильтры',
//     price: currentLanguage === 'ua' ? 'Ціна ' : 'Цена ',
//     from: currentLanguage === 'ua' ? 'від' : 'от',
//     to: currentLanguage === 'ua' ? 'до' : 'до',
//     rooms: currentLanguage === 'ua' ? 'Кімнати' : 'Комнаты',
//     guests: currentLanguage === 'ua' ? 'Гості' : 'Гости',
//     conveniences: currentLanguage === 'ua' ? 'Зручності' : 'Удобства',
//     clearAll: currentLanguage === 'ua' ? 'Очистити ' : 'Очистить ',
//     apply: currentLanguage === 'ua' ? 'Застосувати' : 'Применить',
//     moreFilters: currentLanguage === 'ua' ? 'Більше фільтрів' : 'Больше фильтров',
//     smoking: currentLanguage === 'ua' ? 'Паління' : 'Курение',
//     parties: currentLanguage === 'ua' ? 'Вечірки' : 'Вечеринки',
//     pets: currentLanguage === 'ua' ? 'Тварини' : 'Животные',
//     fullDay: currentLanguage === 'ua' ? 'Цілодобово' : 'Круглосуточно',
//     reportDocs: currentLanguage === 'ua' ? 'Звітні документи' : 'Отчетные документы',
//     area: currentLanguage === 'ua' ? 'Площа (м²)' : 'Площадь (м²)',
//     found: currentLanguage === 'ua' ? 'Знайдено' : 'Найдено',
//     variants: currentLanguage === 'ua' ? 'варіантів' : 'вариантов',
//     any: currentLanguage === 'ua' ? 'Будь-які' : 'Любые',
//     yes: currentLanguage === 'ua' ? 'Так' : 'Да',
//     no: currentLanguage === 'ua' ? 'Ні' : 'Нет',
//     metro: currentLanguage === 'ua' ? 'Метро' : 'Метро',
//     metroStation: currentLanguage === 'ua' ? 'Станція метро' : 'Станция метро',
//     anyStation: currentLanguage === 'ua' ? 'Будь-яка станція' : 'Любая станция',
//     selectStation: currentLanguage === 'ua' ? 'Виберіть станцію' : 'Выберите станцию',
//     district: currentLanguage === 'ua' ? 'Район' : 'Район',
//     districtPlaceholder: currentLanguage === 'ua' ? 'Виберіть район' : 'Выберите район',
//     anyDistrict: currentLanguage === 'ua' ? 'Будь-який район' : 'Любой район',
//     cityDistricts: currentLanguage === 'ua' ? 'Райони Києва' : 'Районы Киева',
//     regionDistrict: currentLanguage === 'ua' ? 'Київська область' : 'Киевская область',
//   };

//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     priceRange: [1200, 3300],
//     rooms: '',
//     guests: searchParams?.guests || '',
//     areaRange: [0, 500],
//     conveniences: [],
//     smoking: 'any',
//     parties: 'any',
//     pets: 'any',
//     fullDay: 'any',
//     reportDocs: 'any',
//     sortBy: 'recommended',
//     metroStation: '',
//     district: '',
//   });
//   const [activeFiltersCount, setActiveFiltersCount] = useState(0);

//   // Лимиты цен из доступных квартир
//   const priceLimits = useMemo(() => {
//     if (!apartments.length) return { min: 500, max: 10000 };
//     const prices = apartments.map(a => Number(a.price) || 0).filter(p => p > 0);
//     if (!prices.length) return { min: 500, max: 10000 };
//     return {
//       min: Math.floor(Math.min(...prices) / 100) * 100,
//       max: Math.ceil(Math.max(...prices) / 100) * 100,
//     };
//   }, [apartments]);

//   // Лимиты площади из доступных квартир
//   const areaLimits = useMemo(() => {
//     if (!apartments.length) return { min: 0, max: 500 };
//     const areas = apartments.map(a => Number(a.size) || 0).filter(a => a > 0);
//     if (!areas.length) return { min: 0, max: 500 };
//     return {
//       min: Math.min(...areas),
//       max: Math.max(...areas),
//     };
//   }, [apartments]);

//   // Подсчет активных фильтров
//   useEffect(() => {
//     let count = 0;
//     if (filters.priceRange[0] > priceLimits.min || filters.priceRange[1] < priceLimits.max) count++;
//     if (filters.rooms) count++;
//     if (filters.guests && filters.guests !== searchParams?.guests) count++;
//     if (filters.areaRange[0] > areaLimits.min || filters.areaRange[1] < areaLimits.max) count++;
//     if (filters.conveniences.length > 0) count += filters.conveniences.length;
//     if (filters.smoking !== 'any') count++;
//     if (filters.parties !== 'any') count++;
//     if (filters.pets !== 'any') count++;
//     if (filters.fullDay !== 'any') count++;
//     if (filters.reportDocs !== 'any') count++;
//     if (filters.sortBy !== 'recommended') count++;
//     if (hasMetro && filters.metroStation) count++;
//     if (filters.district) count++;
    
//     setActiveFiltersCount(count);
//   }, [filters, searchParams?.guests, priceLimits, areaLimits, hasMetro]);

//   // Инициализация фильтров при загрузке
//   useEffect(() => {
//     setFilters(prev => ({
//       ...prev,
//       priceRange: [priceLimits.min, priceLimits.max],
//       areaRange: [areaLimits.min, areaLimits.max],
//       guests: searchParams?.guests || '',
//       metroStation: hasMetro ? prev.metroStation : '',
//     }));
//   }, [priceLimits, areaLimits, searchParams?.guests, hasMetro]);

//   const handleFilterChange = (name, value) => {
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const handleConvenienceToggle = (convenience) => {
//     const normalizedId = convenience.id;
    
//     setFilters(prev => {
//       const newConveniences = prev.conveniences.includes(normalizedId)
//         ? prev.conveniences.filter(id => id !== normalizedId)
//         : [...prev.conveniences, normalizedId];
//       return { ...prev, conveniences: newConveniences };
//     });
//   };

//   const handleApplyFilters = () => {
//     onFilterChange(filters);
//     setDrawerOpen(false);
//   };

//   const handleClearAndApply = () => {
//     const clearedFilters = {
//       priceRange: [priceLimits.min, priceLimits.max],
//       rooms: '',
//       guests: searchParams?.guests || '',
//       areaRange: [areaLimits.min, areaLimits.max],
//       conveniences: [],
//       smoking: 'any',
//       parties: 'any',
//       pets: 'any',
//       fullDay: 'any',
//       reportDocs: 'any',
//       sortBy: 'recommended',
//       metroStation: '',
//       district: '',
//     };
    
//     setFilters(clearedFilters);
//     onFilterChange(clearedFilters);
//     setDrawerOpen(false);
//   };

//   // Если нет квартир, не показываем фильтры
//   if (!apartments.length) {
//     return null;
//   }

//   const booleanOptions = [
//     { value: 'any', label: t.any },
//     { value: 'yes', label: t.yes },
//     { value: 'no', label: t.no },
//   ];

//   // Функция для получения статуса фильтра
//   const getFilterStatus = (filterKey) => {
//     if (filterStatus && filterStatus[filterKey] !== undefined) {
//       return filterStatus[filterKey];
//     }
//     return true; // По умолчанию зеленый
//   };

//   return (
//     <>
//       {/* Мобильная панель - БЕЗ КНОПКИ ОЧИСТКИ */}
//       {isMobile && (
//         <Paper 
//           elevation={0}
//           sx={{ 
//             position: 'sticky', 
//             top: 0,
//             zIndex: 1000,
//             mb: 2,
//             border: '1px solid #e0e0e0',
//             borderRadius: 2,
//             bgcolor: 'background.paper',
//           }}
//         >
//           <Box sx={{ p: 1.5 }}>
//             <Box sx={{ textAlign: 'center', mb: 1 }}>
//               <Typography variant="body2" color="primary" fontWeight="600">
//                 {totalResults} {t.variants}
//               </Typography>
//             </Box>

//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 onClick={() => setDrawerOpen(true)}
//                 size="small"
//                 sx={{ 
//                   borderRadius: 2,
//                   py: 1,
//                   borderColor: '#e0e0e0',
//                   justifyContent: 'space-between',
//                 }}
//                 endIcon={
//                   <Badge badgeContent={activeFiltersCount} color="primary" max={9}>
//                     <TuneIcon />
//                   </Badge>
//                 }
//               >
//                 {t.filters}
//               </Button>
//             </Box>
//           </Box>
//         </Paper>
//       )}

//       {/* Десктопная версия - БЕЗ КНОПКИ ОЧИСТКИ */}
//       {!isMobile && (
//         <Paper 
//           elevation={2} 
//           sx={{ 
//             p: 3, 
//             mb: 4, 
//             borderRadius: 2,
//             border: '1px solid',
//             borderColor: 'divider',
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <Typography variant="h6" color="primary">
//                 {t.found}: <strong>{totalResults}</strong> {t.variants}
//               </Typography>
              
//               {/* Индикатор статуса фильтров */}
//               {totalResults === 0 && (
//                 <Chip
//                   icon={<CancelIcon />}
//                   label={t.filtersIncompatible}
//                   color="error"
//                   size="small"
//                   variant="outlined"
//                 />
//               )}
//             </Box>

//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button
//                 variant={activeFiltersCount > 0 ? "contained" : "outlined"}
//                 startIcon={<TuneIcon />}
//                 onClick={() => setDrawerOpen(true)}
//               >
//                 {t.filters} {activeFiltersCount > 0 && `(${activeFiltersCount})`}
//               </Button>
//             </Box>
//           </Box>
//         </Paper>
//       )}

//       {/* Drawer с фильтрами */}
//       <Drawer
//         anchor={isMobile ? "bottom" : "right"}
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         PaperProps={{
//           sx: {
//             width: isMobile ? '100%' : 400,
//             maxHeight: isMobile ? '90vh' : '100%',
//             borderTopLeftRadius: isMobile ? 16 : 0,
//             borderTopRightRadius: isMobile ? 16 : 0,
//             '@media (max-width: 600px)': {
//               width: '80% !important',
//               marginLeft: 'auto !important',
//               marginRight: 'auto !important',
//             },
//             p: 3,
//             pb: 4,
//             overflowY: 'auto',
//           }
//         }}
//       >
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Typography variant="h6">
//             {t.filters} {activeFiltersCount > 0 && `(${activeFiltersCount})`}
//           </Typography>
//           <IconButton onClick={() => setDrawerOpen(false)}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         {/* РАЙОН */}
//         {currentCity && (currentCity.toLowerCase().includes('київ') || currentCity.toLowerCase().includes('киев')) && (
//           <Accordion defaultExpanded>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 {filterStatus.district !== undefined && (
//                   filterStatus.district ? 
//                     <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
//                     <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
//                 )}
//                 <Typography fontWeight="500">{t.district}</Typography>
//               </Box>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Autocomplete
//                 options={DISTRICTS_DATA.kyiv[currentLanguage]}
//                 getOptionLabel={(option) => option.name}
//                 value={DISTRICTS_DATA.kyiv[currentLanguage].find(d => d.id === filters.district) || null}
//                 onChange={(event, newValue) => {
//                   handleFilterChange('district', newValue ? newValue.id : '');
//                 }}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label={t.districtPlaceholder}
//                     variant="outlined"
//                     size="small"
//                     placeholder={t.anyDistrict}
//                   />
//                 )}
//                 fullWidth
//                 clearOnEscape
//               />
//               {filters.district && (
//                 <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
//                   <Chip
//                     size="small"
//                     label={t.clearAll}
//                     onDelete={() => handleFilterChange('district', '')}
//                     deleteIcon={<ClearIcon />}
//                   />
//                 </Box>
//               )}
//             </AccordionDetails>
//           </Accordion>
//         )}

//         {/* МЕТРО */}
//         {hasMetro && (
//           <Accordion defaultExpanded>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 {filterStatus.metroStation !== undefined && (
//                   filterStatus.metroStation ? 
//                     <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
//                     <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
//                 )}
//                 <Typography fontWeight="500">{t.metro}</Typography>
//               </Box>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Autocomplete
//                 options={metroStations}
//                 value={filters.metroStation || null}
//                 onChange={(event, newValue) => {
//                   handleFilterChange('metroStation', newValue || '');
//                 }}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label={t.selectStation}
//                     variant="outlined"
//                     size="small"
//                     placeholder={t.anyStation}
//                   />
//                 )}
//                 fullWidth
//                 clearOnEscape
//               />
//               {filters.metroStation && (
//                 <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
//                   <Chip
//                     size="small"
//                     label={t.clearAll}
//                     onDelete={() => handleFilterChange('metroStation', '')}
//                     deleteIcon={<ClearIcon />}
//                   />
//                 </Box>
//               )}
//             </AccordionDetails>
//           </Accordion>
//         )}

//         {/* Цена - ТЕПЕРЬ СКРЫТА! */}
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               {filterStatus.priceRange !== undefined && (
//                 filterStatus.priceRange ? 
//                   <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
//                   <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
//               )}
//               <Typography fontWeight="500">{t.price}</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box sx={{ px: { xs: 0, sm: 1 } }}>
//               <Slider
//                 value={filters.priceRange}
//                 onChange={(_, newValue) => handleFilterChange('priceRange', newValue)}
//                 valueLabelDisplay="auto"
//                 valueLabelFormat={(value) => `${value} грн`}
//                 min={priceLimits.min}
//                 max={priceLimits.max}
//                 step={100}
//                 size={isMobile ? "small" : "medium"}
//               />
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: 1 }}>
//                 <TextField
//                   size="small"
//                   label={t.from}
//                   value={filters.priceRange[0]}
//                   onChange={(e) => handleFilterChange('priceRange', [Number(e.target.value) || 0, filters.priceRange[1]])}
//                   sx={{ width: '45%' }}
//                   InputProps={{
//                     endAdornment: <InputAdornment position="end">₴</InputAdornment>,
//                   }}
//                 />
//                 <TextField
//                   size="small"
//                   label={t.to}
//                   value={filters.priceRange[1]}
//                   onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value) || 0])}
//                   sx={{ width: '45%' }}
//                   InputProps={{
//                     endAdornment: <InputAdornment position="end">₴</InputAdornment>,
//                   }}
//                 />
//               </Box>
//             </Box>
//           </AccordionDetails>
//         </Accordion>

//         {/* Количество комнат */}
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               {filterStatus.rooms !== undefined && (
//                 filterStatus.rooms ? 
//                   <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
//                   <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
//               )}
//               <Typography fontWeight="500">{t.rooms}</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, flexWrap: 'wrap' }}>
//               <Chip
//                 label={t.any}
//                 onClick={() => handleFilterChange('rooms', '')}
//                 color={filters.rooms === '' ? 'primary' : 'default'}
//                 variant={filters.rooms === '' ? 'filled' : 'outlined'}
//                 size={isMobile ? "small" : "medium"}
//               />
//               {ROOM_OPTIONS.map(room => (
//                 <Chip
//                   key={room}
//                   label={room}
//                   onClick={() => handleFilterChange('rooms', room === filters.rooms ? '' : room)}
//                   color={filters.rooms === room ? 'primary' : 'default'}
//                   variant={filters.rooms === room ? 'filled' : 'outlined'}
//                   size={isMobile ? "small" : "medium"}
//                 />
//               ))}
//             </Box>
//           </AccordionDetails>
//         </Accordion>

//         {/* Гости */}
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               {filterStatus.guests !== undefined && (
//                 filterStatus.guests ? 
//                   <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
//                   <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
//               )}
//               <Typography fontWeight="500">{t.guests}</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, flexWrap: 'wrap' }}>
//               <Chip
//                 label={t.any}
//                 onClick={() => handleFilterChange('guests', '')}
//                 color={filters.guests === '' ? 'primary' : 'default'}
//                 variant={filters.guests === '' ? 'filled' : 'outlined'}
//                 size={isMobile ? "small" : "medium"}
//               />
//               {GUEST_OPTIONS.map(guest => (
//                 <Chip
//                   key={guest}
//                   label={guest}
//                   onClick={() => handleFilterChange('guests', guest === filters.guests ? '' : guest)}
//                   color={filters.guests === guest ? 'primary' : 'default'}
//                   variant={filters.guests === guest ? 'filled' : 'outlined'}
//                   size={isMobile ? "small" : "medium"}
//                 />
//               ))}
//             </Box>
//           </AccordionDetails>
//         </Accordion>

//         {/* Площадь */}
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               {filterStatus.areaRange !== undefined && (
//                 filterStatus.areaRange ? 
//                   <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
//                   <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
//               )}
//               <Typography fontWeight="500">{t.area}</Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box sx={{ px: { xs: 0, sm: 1 } }}>
//               <Slider
//                 value={filters.areaRange}
//                 onChange={(_, newValue) => handleFilterChange('areaRange', newValue)}
//                 valueLabelDisplay="auto"
//                 valueLabelFormat={(value) => `${value} м²`}
//                 min={areaLimits.min}
//                 max={areaLimits.max}
//                 step={5}
//                 size={isMobile ? "small" : "medium"}
//               />
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: 1 }}>
//                 <TextField
//                   size="small"
//                   label={t.from}
//                   value={filters.areaRange[0]}
//                   onChange={(e) => handleFilterChange('areaRange', [Number(e.target.value) || 0, filters.areaRange[1]])}
//                   sx={{ width: '45%' }}
//                   InputProps={{
//                     endAdornment: <InputAdornment position="end">м²</InputAdornment>,
//                   }}
//                 />
//                 <TextField
//                   size="small"
//                   label={t.to}
//                   value={filters.areaRange[1]}
//                   onChange={(e) => handleFilterChange('areaRange', [filters.areaRange[0], Number(e.target.value) || 0])}
//                   sx={{ width: '45%' }}
//                   InputProps={{
//                     endAdornment: <InputAdornment position="end">м²</InputAdornment>,
//                   }}
//                 />
//               </Box>
//             </Box>
//           </AccordionDetails>
//         </Accordion>

//         {/* Удобства */}
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography fontWeight="500">{t.conveniences}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box sx={{ 
//               display: 'flex', 
//               flexWrap: 'wrap', 
//               gap: { xs: 0.5, sm: 1 }, 
//               maxHeight: { xs: 250, sm: 300 }, 
//               overflowY: 'auto' 
//             }}>
//               {CONVENIENCES[currentLanguage].map(conv => {
//                 const convKey = `conv_${conv.id}`;
//                 const isWorking = getFilterStatus(convKey);
//                 const isSelected = filters.conveniences.includes(conv.id);
                
//                 return (
//                   <Chip
//                     key={conv.id}
//                     label={`${conv.icon} ${conv.label}`}
//                     onClick={() => handleConvenienceToggle(conv)}
//                     color={isSelected ? 'primary' : 'default'}
//                     variant={isSelected ? 'filled' : 'outlined'}
//                     size={isMobile ? "small" : "medium"}
//                     sx={{ 
//                       m: { xs: 0.25, sm: 0.5 },
//                       ...(!isWorking && isSelected && {
//                         borderColor: 'error.main',
//                         backgroundColor: 'rgba(211, 47, 47, 0.2)',
//                       }),
//                       ...(!isWorking && !isSelected && {
//                         borderColor: 'error.main',
//                         backgroundColor: 'rgba(211, 47, 47, 0.1)',
//                       }),
//                       ...(isWorking && isSelected && {
//                         backgroundColor: 'success.main',
//                         color: 'white',
//                         '&:hover': {
//                           backgroundColor: 'success.dark',
//                         }
//                       })
//                     }}
//                   />
//                 );
//               })}
//             </Box>
//           </AccordionDetails>
//         </Accordion>

//         {/* Дополнительные опции */}
//         <Accordion>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography fontWeight="500">{t.moreFilters}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//               <FormControl fullWidth size={isMobile ? "small" : "medium"}>
//                 <InputLabel>{t.smoking}</InputLabel>
//                 <Select
//                   value={filters.smoking}
//                   label={t.smoking}
//                   onChange={(e) => handleFilterChange('smoking', e.target.value)}
//                   sx={{
//                     ...(filterStatus.smoking !== undefined && !filterStatus.smoking && {
//                       borderColor: 'error.main',
//                       '& .MuiOutlinedInput-notchedOutline': {
//                         borderColor: 'error.main',
//                       }
//                     })
//                   }}
//                 >
//                   {booleanOptions.map(opt => (
//                     <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl fullWidth size={isMobile ? "small" : "medium"}>
//                 <InputLabel>{t.parties}</InputLabel>
//                 <Select
//                   value={filters.parties}
//                   label={t.parties}
//                   onChange={(e) => handleFilterChange('parties', e.target.value)}
//                   sx={{
//                     ...(filterStatus.parties !== undefined && !filterStatus.parties && {
//                       borderColor: 'error.main',
//                       '& .MuiOutlinedInput-notchedOutline': {
//                         borderColor: 'error.main',
//                       }
//                     })
//                   }}
//                 >
//                   {booleanOptions.map(opt => (
//                     <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl fullWidth size={isMobile ? "small" : "medium"}>
//                 <InputLabel>{t.pets}</InputLabel>
//                 <Select
//                   value={filters.pets}
//                   label={t.pets}
//                   onChange={(e) => handleFilterChange('pets', e.target.value)}
//                   sx={{
//                     ...(filterStatus.pets !== undefined && !filterStatus.pets && {
//                       borderColor: 'error.main',
//                       '& .MuiOutlinedInput-notchedOutline': {
//                         borderColor: 'error.main',
//                       }
//                     })
//                   }}
//                 >
//                   {booleanOptions.map(opt => (
//                     <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl fullWidth size={isMobile ? "small" : "medium"}>
//                 <InputLabel>{t.fullDay}</InputLabel>
//                 <Select
//                   value={filters.fullDay}
//                   label={t.fullDay}
//                   onChange={(e) => handleFilterChange('fullDay', e.target.value)}
//                   sx={{
//                     ...(filterStatus.fullDay !== undefined && !filterStatus.fullDay && {
//                       borderColor: 'error.main',
//                       '& .MuiOutlinedInput-notchedOutline': {
//                         borderColor: 'error.main',
//                       }
//                     })
//                   }}
//                 >
//                   {booleanOptions.map(opt => (
//                     <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl fullWidth size={isMobile ? "small" : "medium"}>
//                 <InputLabel>{t.reportDocs}</InputLabel>
//                 <Select
//                   value={filters.reportDocs}
//                   label={t.reportDocs}
//                   onChange={(e) => handleFilterChange('reportDocs', e.target.value)}
//                   sx={{
//                     ...(filterStatus.reportDocs !== undefined && !filterStatus.reportDocs && {
//                       borderColor: 'error.main',
//                       '& .MuiOutlinedInput-notchedOutline': {
//                         borderColor: 'error.main',
//                       }
//                     })
//                   }}
//                 >
//                   {booleanOptions.map(opt => (
//                     <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Box>
//           </AccordionDetails>
//         </Accordion>

//         {/* Кнопки */}
//         <Box sx={{ display: 'flex', gap: 2, mt: 3, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
//           <Button
//             fullWidth
//             variant="outlined"
//             onClick={handleClearAndApply}
//             startIcon={<ClearIcon />}
//           >
//             {t.clearAll}
//           </Button>
//           <Button
//             fullWidth
//             variant="contained"
//             onClick={handleApplyFilters}
//             disabled={loading}
//           >
//             {t.apply}
//           </Button>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default SearchApartmentFilters;








// app/components/SearchApartmentFilters.js

'use client';

import React, { useState, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react';
import { DISTRICTS_DATA, getCityKey, isKyiv } from '@/app/components/DistrictsData';
import {
  Box,
  Typography,
  Button,
  Drawer,
  IconButton,
  Badge,
  Chip,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Paper,
  useMediaQuery,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
} from '@mui/material';
import {
  Tune as TuneIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  Clear as ClearIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useLanguage } from '@/app/LanguageContext';
import MetroSelector from '@/app/components/MetroSelector';

// Константы для городов с метро
const CITIES_WITH_METRO = ['Київ', 'Харків', 'Дніпро', 'Киев', 'Харьков', 'Днепр'];

const ROOM_OPTIONS = [1, 2, 3, 4, 5, '6+'];
const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10+'];

// Все возможные категории из AddApartmentForm
const ALL_CATEGORIES = {
  ua: [
    'Квартира', 'Готель', 'Готель для тварин',
    'Хостел', 'Будинок', 'База відпочинку', 'Сауна/Лазня', 'Глемпінг',
    'Санаторій/Пансіонат', 'Котедж для компаній', 'Коворкінг', 'Автокемпінг'
  ],
  ru: [
    'Квартира', 'Гостиница', 'Отель для животных',
    'Хостел', 'Дом', 'База отдыха', 'Сауна/Баня', 'Глэмпинг',
    'Санаторий/Пансионат', 'Коттедж для компаний', 'Коворкинг', 'Автокемпинг'
  ]
};

// Основные города Украины (областные центры + Крым, Донецк, Луганск)
const MAIN_CITIES = [
  { id: 'kyiv', ua: 'Київ', ru: 'Киев' },
  { id: 'kharkiv', ua: 'Харків', ru: 'Харьков' },
  { id: 'dnipro', ua: 'Дніпро', ru: 'Днепр' },
  { id: 'odesa', ua: 'Одеса', ru: 'Одесса' },
  { id: 'lviv', ua: 'Львів', ru: 'Львов' },
  { id: 'vinnytsia', ua: 'Вінниця', ru: 'Винница' },
  { id: 'poltava', ua: 'Полтава', ru: 'Полтава' },
  { id: 'chernihiv', ua: 'Чернігів', ru: 'Чернигов' },
  { id: 'cherkasy', ua: 'Черкаси', ru: 'Черкассы' },
  { id: 'kropyvnytskyi', ua: 'Кропивницький', ru: 'Кропивницкий' },
  { id: 'ternopil', ua: 'Тернопіль', ru: 'Тернополь' },
  { id: 'ivano-frankivsk', ua: 'Івано-Франківськ', ru: 'Ивано-Франковск' },
  { id: 'lutsk', ua: 'Луцьк', ru: 'Луцк' },
  { id: 'rivne', ua: 'Рівне', ru: 'Ровно' },
  { id: 'khmelnytskyi', ua: 'Хмельницький', ru: 'Хмельницкий' },
  { id: 'chernivtsi', ua: 'Чернівці', ru: 'Черновцы' },
  { id: 'zhytomyr', ua: 'Житомир', ru: 'Житомир' },
  { id: 'sumy', ua: 'Суми', ru: 'Сумы' },
  { id: 'mykolaiv', ua: 'Миколаїв', ru: 'Николаев' },
  { id: 'kherson', ua: 'Херсон', ru: 'Херсон' },
  { id: 'zaporizhzhia', ua: 'Запоріжжя', ru: 'Запорожье' },
  { id: 'uzhhorod', ua: 'Ужгород', ru: 'Ужгород' },
  // Крым как один регион
  { id: 'crimea', ua: 'Крим', ru: 'Крым' },
  // Донецк и Луганск
  { id: 'donetsk', ua: 'Донецьк', ru: 'Донецк' },
  { id: 'luhansk', ua: 'Луганськ', ru: 'Луганск' },
];

// Функция нормализации названия города
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

// ВСЕ УДОБСТВА - полный список!
const CONVENIENCES = {
  ua: [
    { id: 'балкон', label: 'Балкон', icon: '🏠' },
    { id: 'барбекю-зона', label: 'Барбекю-зона', icon: '🔥' },
    { id: 'басейн', label: 'Басейн', icon: '🏊' },
    { id: 'ігрова кімната', label: 'Ігрова кімната', icon: '🎮' },
    { id: 'блендер', label: 'Блендер', icon: '🥤' },
    { id: 'бойлер', label: 'Бойлер', icon: '🔥' },
    { id: 'ванна', label: 'Ванна', icon: '🛁' },
    { id: 'вентилятор', label: 'Вентилятор', icon: '🌀' },
    { id: 'генератор', label: 'Генератор', icon: '⚡' },
    { id: 'громадська кухня', label: 'Громадська кухня', icon: '🍳' },
    { id: 'джакузі', label: 'Джакузі', icon: '🛁' },
    { id: 'дитяче ліжечко', label: 'Дитяче ліжечко', icon: '👶' },
    { id: 'дитячий стілець', label: 'Дитячий стілець', icon: '🪑' },
    { id: 'домашній кінотеатр', label: 'Домашній кінотеатр', icon: '🎬' },
    { id: 'духовка', label: 'Духовка', icon: '🔥' },
    { id: 'душова кабіна', label: 'Душова кабіна', icon: '🚿' },
    { id: 'електрочайник', label: 'Електрочайник', icon: '☕' },
    { id: 'електроплита', label: 'Електроплита', icon: '🔥' },
    { id: 'газова плита', label: 'Газова плита', icon: '🔥' },
    { id: 'зарядка для електромобілів', label: 'Зарядка для електромобілів', icon: '🔋' },
    { id: 'заміна постільної білизни', label: 'Заміна постільної білизни', icon: '🛏️' },
    { id: 'інтернет', label: 'Інтернет', icon: '📶' },
    { id: 'кавоварка', label: 'Кавоварка', icon: '☕' },
    { id: 'камін', label: 'Камін', icon: '🔥' },
    { id: 'кабельне тб', label: 'Кабельне ТБ', icon: '📺' },
    { id: 'кондиціонер', label: 'Кондиціонер', icon: '❄️' },
    { id: 'ліжко', label: 'Ліжко', icon: '🛏️' },
    { id: 'диван', label: 'Диван', icon: '🛋️' },
    { id: 'лазня', label: 'Лазня', icon: '🧖' },
    { id: 'мангал', label: 'Мангал', icon: '🔥' },
    { id: 'мікрохвильова піч', label: 'Мікрохвильова піч', icon: '🔥' },
    { id: 'охорона', label: 'Охорона', icon: '🛡️' },
    { id: 'парковка', label: 'Парковка', icon: '🅿️' },
    { id: "комп'ютер", label: "Комп'ютер", icon: '💻' },
    { id: 'пляжне обладнання', label: 'Пляжне обладнання', icon: '🏖️' },
    { id: 'посуд', label: 'Посуд', icon: '🍽️' },
    { id: 'посудомийна машина', label: 'Посудомийна машина', icon: '🧼' },
    { id: 'пральна машина', label: 'Пральна машина', icon: '🧺' },
    { id: 'пральний порошок', label: 'Пральний порошок', icon: '🧼' },
    { id: 'праска', label: 'Праска', icon: '👕' },
    { id: 'рушники', label: 'Рушники', icon: '🧻' },
    { id: 'сейф', label: 'Сейф', icon: '🔒' },
    { id: 'спортзал', label: 'Спортзал', icon: '🏋️' },
    { id: 'спортивний інвентар', label: 'Спортивний інвентар', icon: '⚽' },
    { id: 'столові прибори', label: 'Столові прибори', icon: '🍴' },
    { id: 'сушилка', label: 'Сушилка', icon: '🧺' },
    { id: 'супутникове тб', label: 'Супутникове ТБ', icon: '📡' },
    { id: 'тапочки', label: 'Тапочки', icon: '👟' },
    { id: 'тераса', label: 'Тераса', icon: '🏡' },
    { id: 'тостер', label: 'Тостер', icon: '🍞' },
    { id: 'туалетні принадлежності', label: 'Туалетні принадлежності', icon: '🧴' },
    { id: 'фен', label: 'Фен', icon: '💨' },
    { id: 'холодильник', label: 'Холодильник', icon: '🧊' },
    { id: 'догляд за тваринами', label: 'Догляд за тваринами', icon: '🐕' },
    { id: 'кафе', label: 'Кафе', icon: '☕' },
    { id: 'конференц-зал', label: 'Конференц-зал', icon: '🏢' },
    { id: 'переговорна', label: 'Переговорна', icon: '💼' },
    { id: 'лікувальні процедури', label: 'Лікувальні процедури', icon: '💊' },
    { id: 'організація подій', label: 'Організація подій', icon: '🎉' },
    { id: 'трансфер', label: 'Трансфер', icon: '🚗' },
    { id: 'харчування', label: 'Харчування', icon: '🍲' },
    { id: 'прокат', label: 'Прокат', icon: '🚲' },
  ],
  ru: [
    { id: 'балкон', label: 'Балкон', icon: '🏠' },
    { id: 'барбекю-зона', label: 'Зона барбекю', icon: '🔥' },
    { id: 'басейн', label: 'Бассейн', icon: '🏊' },
    { id: 'ігрова кімната', label: 'Игровая комната', icon: '🎮' },
    { id: 'блендер', label: 'Блендер', icon: '🥤' },
    { id: 'бойлер', label: 'Бойлер', icon: '🔥' },
    { id: 'ванна', label: 'Ванна', icon: '🛁' },
    { id: 'вентилятор', label: 'Вентилятор', icon: '🌀' },
    { id: 'генератор', label: 'Генератор', icon: '⚡' },
    { id: 'громадська кухня', label: 'Общая кухня', icon: '🍳' },
    { id: 'джакузі', label: 'Джакузи', icon: '🛁' },
    { id: 'дитяче ліжечко', label: 'Детская кроватка', icon: '👶' },
    { id: 'дитячий стілець', label: 'Детский стульчик', icon: '🪑' },
    { id: 'домашній кінотеатр', label: 'Домашний кинотеатр', icon: '🎬' },
    { id: 'духовка', label: 'Духовка', icon: '🔥' },
    { id: 'душова кабіна', label: 'Душевая кабина', icon: '🚿' },
    { id: 'електрочайник', label: 'Электрочайник', icon: '☕' },
    { id: 'електроплита', label: 'Электроплита', icon: '🔥' },
    { id: 'газова плита', label: 'Газовая плита', icon: '🔥' },
    { id: 'зарядка для електромобілів', label: 'Зарядка для электромобилей', icon: '🔋' },
    { id: 'заміна постільної білизни', label: 'Смена постельного белья', icon: '🛏️' },
    { id: 'інтернет', label: 'Интернет', icon: '📶' },
    { id: 'кавоварка', label: 'Кофеварка', icon: '☕' },
    { id: 'камін', label: 'Камин', icon: '🔥' },
    { id: 'кабельне тб', label: 'Кабельное ТВ', icon: '📺' },
    { id: 'кондиціонер', label: 'Кондиционер', icon: '❄️' },
    { id: 'ліжко', label: 'Кровать', icon: '🛏️' },
    { id: 'диван', label: 'Диван', icon: '🛋️' },
    { id: 'лазня', label: 'Баня', icon: '🧖' },
    { id: 'мангал', label: 'Мангал', icon: '🔥' },
    { id: 'мікрохвильова піч', label: 'Микроволновая печь', icon: '🔥' },
    { id: 'охорона', label: 'Охрана', icon: '🛡️' },
    { id: 'парковка', label: 'Парковка', icon: '🅿️' },
    { id: "комп'ютер", label: "Компьютер", icon: '💻' },
    { id: 'пляжне обладнання', label: 'Пляжное оборудование', icon: '🏖️' },
    { id: 'посуд', label: 'Посуда', icon: '🍽️' },
    { id: 'посудомийна машина', label: 'Посудомоечная машина', icon: '🧼' },
    { id: 'пральна машина', label: 'Стиральная машина', icon: '🧺' },
    { id: 'пральний порошок', label: 'Стиральный порошок', icon: '🧼' },
    { id: 'праска', label: 'Утюг', icon: '👕' },
    { id: 'рушники', label: 'Полотенца', icon: '🧻' },
    { id: 'сейф', label: 'Сейф', icon: '🔒' },
    { id: 'спортзал', label: 'Спортзал', icon: '🏋️' },
    { id: 'спортивний інвентар', label: 'Спортивный инвентарь', icon: '⚽' },
    { id: 'столові прибори', label: 'Столовые приборы', icon: '🍴' },
    { id: 'сушилка', label: 'Сушилка', icon: '🧺' },
    { id: 'супутникове тб', label: 'Спутниковое ТВ', icon: '📡' },
    { id: 'тапочки', label: 'Тапочки', icon: '👟' },
    { id: 'тераса', label: 'Терраса', icon: '🏡' },
    { id: 'тостер', label: 'Тостер', icon: '🍞' },
    { id: 'туалетні принадлежності', label: 'Туалетные принадлежности', icon: '🧴' },
    { id: 'фен', label: 'Фен', icon: '💨' },
    { id: 'холодильник', label: 'Холодильник', icon: '🧊' },
    { id: 'догляд за тваринами', label: 'Уход за животными', icon: '🐕' },
    { id: 'кафе', label: 'Кафе', icon: '☕' },
    { id: 'конференц-зал', label: 'Конференц-зал', icon: '🏢' },
    { id: 'переговорна', label: 'Переговорная', icon: '💼' },
    { id: 'лікувальні процедури', label: 'Лечебные процедуры', icon: '💊' },
    { id: 'організація подій', label: 'Организация мероприятий', icon: '🎉' },
    { id: 'трансфер', label: 'Трансфер', icon: '🚗' },
    { id: 'харчування', label: 'Питание', icon: '🍲' },
    { id: 'прокат', label: 'Прокат', icon: '🚲' },
  ],
};

const SearchApartmentFilters = forwardRef(({ 
  apartments = [], 
  onFilterChange, 
  searchParams = {},
  loading = false,
  totalResults = 0,
  currentCity = '',
  filterStatus = {},
  onClearAll,
}, ref) => {
  const { currentLanguage } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Переводы
  const t = {
    filtersIncompatible: currentLanguage === 'ua' ? 'Фільтри несумісні' : 'Фильтры несовместимы', 
    sortBy: currentLanguage === 'ua' ? 'Сортувати за' : 'Сортировать по',
    filters: currentLanguage === 'ua' ? 'Фільтри' : 'Фильтры',
    price: currentLanguage === 'ua' ? 'Ціна ' : 'Цена ',
    from: currentLanguage === 'ua' ? 'від' : 'от',
    to: currentLanguage === 'ua' ? 'до' : 'до',
    rooms: currentLanguage === 'ua' ? 'Кімнати' : 'Комнаты',
    guests: currentLanguage === 'ua' ? 'Гості' : 'Гости',
    conveniences: currentLanguage === 'ua' ? 'Зручності' : 'Удобства',
    clearAll: currentLanguage === 'ua' ? 'Очистити ' : 'Очистить ',
    apply: currentLanguage === 'ua' ? 'Застосувати' : 'Применить',
    moreFilters: currentLanguage === 'ua' ? 'Більше фільтрів' : 'Больше фильтров',
    smoking: currentLanguage === 'ua' ? 'Паління' : 'Курение',
    parties: currentLanguage === 'ua' ? 'Вечірки' : 'Вечеринки',
    pets: currentLanguage === 'ua' ? 'Тварини' : 'Животные',
    fullDay: currentLanguage === 'ua' ? 'Цілодобово' : 'Круглосуточно',
    reportDocs: currentLanguage === 'ua' ? 'Звітні документи' : 'Отчетные документы',
    area: currentLanguage === 'ua' ? 'Площа (м²)' : 'Площадь (м²)',
    found: currentLanguage === 'ua' ? 'Знайдено' : 'Найдено',
    variants: currentLanguage === 'ua' ? 'варіантів' : 'вариантов',
    any: currentLanguage === 'ua' ? 'Будь-які' : 'Любые',
    yes: currentLanguage === 'ua' ? 'Так' : 'Да',
    no: currentLanguage === 'ua' ? 'Ні' : 'Нет',
    metro: currentLanguage === 'ua' ? 'Метро' : 'Метро',
    metroStation: currentLanguage === 'ua' ? 'Станція метро' : 'Станция метро',
    anyStation: currentLanguage === 'ua' ? 'Будь-яка станція' : 'Любая станция',
    selectStation: currentLanguage === 'ua' ? 'Виберіть станцію' : 'Выберите станцию',
    district: currentLanguage === 'ua' ? 'Район' : 'Район',
    districtPlaceholder: currentLanguage === 'ua' ? 'Виберіть район' : 'Выберите район',
    anyDistrict: currentLanguage === 'ua' ? 'Будь-який район' : 'Любой район',
    cityDistricts: currentLanguage === 'ua' ? 'Райони Києва' : 'Районы Киева',
    regionDistrict: currentLanguage === 'ua' ? 'Київська область' : 'Киевская область',
    category: currentLanguage === 'ua' ? 'Категорія' : 'Категория',
    selectCategory: currentLanguage === 'ua' ? 'Виберіть категорію' : 'Выберите категорию',
    anyCategory: currentLanguage === 'ua' ? 'Будь-яка категорія' : 'Любая категория',
    city: currentLanguage === 'ua' ? 'Місто' : 'Город',
    selectCity: currentLanguage === 'ua' ? 'Виберіть місто' : 'Выберите город',
    anyCity: currentLanguage === 'ua' ? 'Будь-яке місто' : 'Любой город',
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Инициализируем фильтры
  const [filters, setFilters] = useState({
    priceRange: [1200, 3300],
    rooms: '',
    guests: searchParams?.guests || '',
    areaRange: [0, 500],
    conveniences: [],
    smoking: 'any',
    parties: 'any',
    pets: 'any',
    fullDay: 'any',
    reportDocs: 'any',
    sortBy: 'recommended',
    metroStation: '',
    district: '',
    category: 'Квартира',
    city: 'Київ',
  });

  // Определяем, есть ли метро в выбранном городе
  const hasMetro = useMemo(() => {
    if (!filters.city) return false;
    return CITIES_WITH_METRO.some(city => 
      normalizeCityName(city) === normalizeCityName(filters.city)
    );
  }, [filters.city]);

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Лимиты цен из доступных квартир
  const priceLimits = useMemo(() => {
    if (!apartments.length) return { min: 500, max: 10000 };
    const prices = apartments.map(a => Number(a.price) || 0).filter(p => p > 0);
    if (!prices.length) return { min: 500, max: 10000 };
    return {
      min: Math.floor(Math.min(...prices) / 100) * 100,
      max: Math.ceil(Math.max(...prices) / 100) * 100,
    };
  }, [apartments]);

  // Лимиты площади из доступных квартир
  const areaLimits = useMemo(() => {
    if (!apartments.length) return { min: 0, max: 500 };
    const areas = apartments.map(a => Number(a.size) || 0).filter(a => a > 0);
    if (!areas.length) return { min: 0, max: 500 };
    return {
      min: Math.min(...areas),
      max: Math.max(...areas),
    };
  }, [apartments]);

  // Подсчет активных фильтров
  useEffect(() => {
    let count = 0;
    if (filters.priceRange[0] > priceLimits.min || filters.priceRange[1] < priceLimits.max) count++;
    if (filters.rooms) count++;
    if (filters.guests && filters.guests !== searchParams?.guests) count++;
    if (filters.areaRange[0] > areaLimits.min || filters.areaRange[1] < areaLimits.max) count++;
    if (filters.conveniences.length > 0) count += filters.conveniences.length;
    if (filters.smoking !== 'any') count++;
    if (filters.parties !== 'any') count++;
    if (filters.pets !== 'any') count++;
    if (filters.fullDay !== 'any') count++;
    if (filters.reportDocs !== 'any') count++;
    if (filters.sortBy !== 'recommended') count++;
    if (hasMetro && filters.metroStation) count++;
    if (filters.district) count++;
    if (filters.category && filters.category !== 'Квартира') count++;
    if (filters.city && filters.city !== 'Київ') count++;
    
    setActiveFiltersCount(count);
  }, [filters, searchParams?.guests, priceLimits, areaLimits, hasMetro]);

  // Инициализация фильтров при загрузке - обновляем только priceRange и areaRange
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      priceRange: [priceLimits.min, priceLimits.max],
      areaRange: [areaLimits.min, areaLimits.max],
      guests: searchParams?.guests || '',
      metroStation: hasMetro ? prev.metroStation : '',
    }));
  }, [priceLimits, areaLimits, searchParams?.guests, hasMetro]);

  // Добавляем флаг для предотвращения циклов
  const isClearingRef = React.useRef(false);

  // Функция для сброса фильтров (используется и внутри, и через ref)
  const resetFilters = () => {
    console.log('🧹 resetFilters в SearchApartmentFilters');
    
    const clearedFilters = {
      priceRange: [priceLimits.min, priceLimits.max],
      rooms: '',
      guests: searchParams?.guests || '',
      areaRange: [areaLimits.min, areaLimits.max],
      conveniences: [],
      smoking: 'any',
      parties: 'any',
      pets: 'any',
      fullDay: 'any',
      reportDocs: 'any',
      sortBy: 'recommended',
      metroStation: '',
      district: '',
      category: 'Квартира',
      city: 'Київ',
    };
    
    // Обновляем локальное состояние
    setFilters(clearedFilters);
    
    // Отправляем изменения в родительский компонент
    onFilterChange(clearedFilters);
  };

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    clearFilters: () => {
      console.log('🧹 clearFilters вызван в SearchApartmentFilters');
      if (isClearingRef.current) {
        console.log('🧹 уже очищаем, пропускаем');
        return;
      }
      isClearingRef.current = true;
      
      if (onClearAll) {
        console.log('🧹 вызываем onClearAll из пропсов');
        onClearAll();
      } else {
        console.log('🧹 onClearAll нет, сбрасываем локально');
        resetFilters();
      }
      
      setTimeout(() => {
        isClearingRef.current = false;
        console.log('🧹 флаг сброшен');
      }, 200);
    },
    // Добавляем метод для принудительной синхронизации
    syncFilters: (newFilters) => {
      if (newFilters) {
        setFilters(newFilters);
      }
    }
  }));

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleMetroSelect = (metro) => {
    setFilters(prev => ({ ...prev, metroStation: metro }));
  };

  const handleConvenienceToggle = (convenience) => {
    const normalizedId = convenience.id;
    
    setFilters(prev => {
      const newConveniences = prev.conveniences.includes(normalizedId)
        ? prev.conveniences.filter(id => id !== normalizedId)
        : [...prev.conveniences, normalizedId];
      return { ...prev, conveniences: newConveniences };
    });
  };

  const handleApplyFilters = () => {
    console.log('🔄 handleApplyFilters:', filters);
    onFilterChange(filters);
    setDrawerOpen(false);
  };

  const handleClearAndApply = () => {
    console.log('🧹 handleClearAndApply в SearchApartmentFilters');
    
    if (isClearingRef.current) {
      console.log('🧹 уже очищаем, пропускаем');
      return;
    }
    
    isClearingRef.current = true;
    
    if (onClearAll) {
      console.log('🧹 вызываем onClearAll');
      onClearAll();
    } else {
      console.log('🧹 onClearAll нет, сбрасываем локально');
      resetFilters();
    }
    
    // Меню остается открытым после очистки
    // setDrawerOpen(false); - удалено
    
    setTimeout(() => {
      isClearingRef.current = false;
      console.log('🧹 флаг сброшен после handleClearAndApply');
    }, 200);
  };

  // Если нет квартир, не показываем фильтры
  if (!apartments.length) {
    return null;
  }

  const booleanOptions = [
    { value: 'any', label: t.any },
    { value: 'yes', label: t.yes },
    { value: 'no', label: t.no },
  ];

  // Функция для получения статуса фильтра
  const getFilterStatus = (filterKey) => {
    if (filterStatus && filterStatus[filterKey] !== undefined) {
      return filterStatus[filterKey];
    }
    return true; // По умолчанию зеленый
  };

  // Получаем список категорий для текущего языка
  const categories = ALL_CATEGORIES[currentLanguage] || [];

  // Получаем список городов для текущего языка
  const cities = MAIN_CITIES.map(city => city[currentLanguage]);

  return (
    <>
      {/* Мобильная панель */}
      {isMobile && (
        <Paper 
          elevation={0}
          sx={{ 
            // position: 'sticky', 
            // top: 0,
            zIndex: 1000,
            mb: 2,
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Box sx={{ p: 1.5 }}>
            <Box sx={{ textAlign: 'center', mb: 1 }}>
              <Typography variant="body2" color="primary" fontWeight="600">
                {totalResults} {t.variants}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setDrawerOpen(true)}
                size="small"
                sx={{ 
                  borderRadius: 2,
                  py: 1,
                  borderColor: '#e0e0e0',
                  justifyContent: 'space-between',
                }}
                endIcon={
                  <Badge badgeContent={activeFiltersCount} color="primary" max={9}>
                    <TuneIcon />
                  </Badge>
                }
              >
                {t.filters}
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Десктопная версия */}
      {!isMobile && (
        <Paper 
          elevation={2} 
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" color="primary">
                {t.found}: <strong>{totalResults}</strong> {t.variants}
              </Typography>
              
              {totalResults === 0 && (
                <Chip
                  icon={<CancelIcon />}
                  label={t.filtersIncompatible}
                  color="error"
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant={activeFiltersCount > 0 ? "contained" : "outlined"}
                startIcon={<TuneIcon />}
                onClick={() => setDrawerOpen(true)}
              >
                {t.filters} {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Drawer с фильтрами - ВСЕ АККОРДЕОНЫ БЕЗ defaultExpanded (скрыты) */}
      <Drawer
        anchor={isMobile ? "bottom" : "right"}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: isMobile ? '100%' : 400,
            maxHeight: isMobile ? '90vh' : '100%',
            borderTopLeftRadius: isMobile ? 16 : 0,
            borderTopRightRadius: isMobile ? 16 : 0,
            '@media (max-width: 600px)': {
              width: '80% !important',
              marginLeft: 'auto !important',
              marginRight: 'auto !important',
            },
            p: 3,
            pb: 4,
            overflowY: 'auto',
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            {t.filters} {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* КАТЕГОРИЯ - все категории (скрыта) */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {filterStatus.category !== undefined && (
                filterStatus.category ? 
                  <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
                  <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
              )}
              <Typography fontWeight="500">{t.category}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl fullWidth size="small">
              <Select
                value={filters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <em>{t.anyCategory}</em>;
                  }
                  return selected;
                }}
              >
                <MenuItem value="">
                  <em>{t.anyCategory}</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {filters.category && (
              <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <Chip
                  size="small"
                  label={t.clearAll}
                  onDelete={() => handleFilterChange('category', '')}
                  deleteIcon={<ClearIcon />}
                />
              </Box>
            )}
          </AccordionDetails>
        </Accordion>

        {/* ГОРОД - только основные города (скрыт) */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {filterStatus.city !== undefined && (
                filterStatus.city ? 
                  <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
                  <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
              )}
              <Typography fontWeight="500">{t.city}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl fullWidth size="small">
              <Select
                value={filters.city || ''}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <em>{t.anyCity}</em>;
                  }
                  return selected;
                }}
              >
                <MenuItem value="">
                  <em>{t.anyCity}</em>
                </MenuItem>
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {filters.city && filters.city !== 'Київ' && (
              <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <Chip
                  size="small"
                  label={t.clearAll}
                  onDelete={() => handleFilterChange('city', 'Київ')}
                  deleteIcon={<ClearIcon />}
                />
              </Box>
            )}
          </AccordionDetails>
        </Accordion>

        {/* МЕТРО - используем MetroSelector, только для Киева, Харькова, Днепра (скрыт) */}
        {hasMetro && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {filterStatus.metroStation !== undefined && (
                  filterStatus.metroStation ? 
                    <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
                    <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
                )}
                <Typography fontWeight="500">{t.metro}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <MetroSelector
                city={filters.city}
                onMetroSelect={handleMetroSelect}
                error={false}
                show={true}
                value={filters.metroStation}
              />
              {filters.metroStation && (
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <Chip
                    size="small"
                    label={t.clearAll}
                    onDelete={() => handleFilterChange('metroStation', '')}
                    deleteIcon={<ClearIcon />}
                  />
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        )}

        {/* РАЙОН - только для Киева (скрыт) */}
        {filters.city && isKyiv(filters.city) && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {filterStatus.district !== undefined && (
                  filterStatus.district ? 
                    <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
                    <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
                )}
                <Typography fontWeight="500">{t.district}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Autocomplete
                options={DISTRICTS_DATA.kyiv[currentLanguage]}
                getOptionLabel={(option) => option.name}
                value={DISTRICTS_DATA.kyiv[currentLanguage].find(d => d.id === filters.district) || null}
                onChange={(event, newValue) => {
                  handleFilterChange('district', newValue ? newValue.id : '');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t.districtPlaceholder}
                    variant="outlined"
                    size="small"
                    placeholder={t.anyDistrict}
                  />
                )}
                fullWidth
                clearOnEscape
              />
              {filters.district && (
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <Chip
                    size="small"
                    label={t.clearAll}
                    onDelete={() => handleFilterChange('district', '')}
                    deleteIcon={<ClearIcon />}
                  />
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        )}

        {/* Цена (скрыта) */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {filterStatus.priceRange !== undefined && (
                filterStatus.priceRange ? 
                  <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
                  <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
              )}
              <Typography fontWeight="500">{t.price}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ px: { xs: 0, sm: 1 } }}>
              <Slider
                value={filters.priceRange}
                onChange={(_, newValue) => handleFilterChange('priceRange', newValue)}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} грн`}
                min={priceLimits.min}
                max={priceLimits.max}
                step={100}
                size={isMobile ? "small" : "medium"}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: 1 }}>
                <TextField
                  size="small"
                  label={t.from}
                  value={filters.priceRange[0]}
                  onChange={(e) => handleFilterChange('priceRange', [Number(e.target.value) || 0, filters.priceRange[1]])}
                  sx={{ width: '45%' }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">₴</InputAdornment>,
                  }}
                />
                <TextField
                  size="small"
                  label={t.to}
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value) || 0])}
                  sx={{ width: '45%' }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">₴</InputAdornment>,
                  }}
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Количество комнат (скрыто) */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {filterStatus.rooms !== undefined && (
                filterStatus.rooms ? 
                  <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
                  <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
              )}
              <Typography fontWeight="500">{t.rooms}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, flexWrap: 'wrap' }}>
              <Chip
                label={t.any}
                onClick={() => handleFilterChange('rooms', '')}
                color={filters.rooms === '' ? 'primary' : 'default'}
                variant={filters.rooms === '' ? 'filled' : 'outlined'}
                size={isMobile ? "small" : "medium"}
              />
              {ROOM_OPTIONS.map(room => (
                <Chip
                  key={room}
                  label={room}
                  onClick={() => handleFilterChange('rooms', room === filters.rooms ? '' : room)}
                  color={filters.rooms === room ? 'primary' : 'default'}
                  variant={filters.rooms === room ? 'filled' : 'outlined'}
                  size={isMobile ? "small" : "medium"}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Гости (скрыто) */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {filterStatus.guests !== undefined && (
                filterStatus.guests ? 
                  <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
                  <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
              )}
              <Typography fontWeight="500">{t.guests}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, flexWrap: 'wrap' }}>
              <Chip
                label={t.any}
                onClick={() => handleFilterChange('guests', '')}
                color={filters.guests === '' ? 'primary' : 'default'}
                variant={filters.guests === '' ? 'filled' : 'outlined'}
                size={isMobile ? "small" : "medium"}
              />
              {GUEST_OPTIONS.map(guest => (
                <Chip
                  key={guest}
                  label={guest}
                  onClick={() => handleFilterChange('guests', guest === filters.guests ? '' : guest)}
                  color={filters.guests === guest ? 'primary' : 'default'}
                  variant={filters.guests === guest ? 'filled' : 'outlined'}
                  size={isMobile ? "small" : "medium"}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Площадь (скрыта) */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {filterStatus.areaRange !== undefined && (
                filterStatus.areaRange ? 
                  <CheckCircleIcon sx={{ color: 'success.main' }} fontSize="small" /> : 
                  <CancelIcon sx={{ color: 'error.main' }} fontSize="small" />
              )}
              <Typography fontWeight="500">{t.area}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ px: { xs: 0, sm: 1 } }}>
              <Slider
                value={filters.areaRange}
                onChange={(_, newValue) => handleFilterChange('areaRange', newValue)}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} м²`}
                min={areaLimits.min}
                max={areaLimits.max}
                step={5}
                size={isMobile ? "small" : "medium"}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: 1 }}>
                <TextField
                  size="small"
                  label={t.from}
                  value={filters.areaRange[0]}
                  onChange={(e) => handleFilterChange('areaRange', [Number(e.target.value) || 0, filters.areaRange[1]])}
                  sx={{ width: '45%' }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">м²</InputAdornment>,
                  }}
                />
                <TextField
                  size="small"
                  label={t.to}
                  value={filters.areaRange[1]}
                  onChange={(e) => handleFilterChange('areaRange', [filters.areaRange[0], Number(e.target.value) || 0])}
                  sx={{ width: '45%' }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">м²</InputAdornment>,
                  }}
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Удобства (скрыты) */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="500">{t.conveniences}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: { xs: 0.5, sm: 1 }, 
              maxHeight: { xs: 250, sm: 300 }, 
              overflowY: 'auto' 
            }}>
              {CONVENIENCES[currentLanguage].map(conv => {
                const convKey = `conv_${conv.id}`;
                const isWorking = getFilterStatus(convKey);
                const isSelected = filters.conveniences.includes(conv.id);
                
                return (
                  <Chip
                    key={conv.id}
                    label={`${conv.icon} ${conv.label}`}
                    onClick={() => handleConvenienceToggle(conv)}
                    color={isSelected ? 'primary' : 'default'}
                    variant={isSelected ? 'filled' : 'outlined'}
                    size={isMobile ? "small" : "medium"}
                    sx={{ 
                      m: { xs: 0.25, sm: 0.5 },
                      ...(!isWorking && isSelected && {
                        borderColor: 'error.main',
                        backgroundColor: 'rgba(211, 47, 47, 0.2)',
                      }),
                      ...(!isWorking && !isSelected && {
                        borderColor: 'error.main',
                        backgroundColor: 'rgba(211, 47, 47, 0.1)',
                      }),
                      ...(isWorking && isSelected && {
                        backgroundColor: 'success.main',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'success.dark',
                        }
                      })
                    }}
                  />
                );
              })}
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Дополнительные опции (скрыты) */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="500">{t.moreFilters}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                <InputLabel>{t.smoking}</InputLabel>
                <Select
                  value={filters.smoking}
                  label={t.smoking}
                  onChange={(e) => handleFilterChange('smoking', e.target.value)}
                  sx={{
                    ...(filterStatus.smoking !== undefined && !filterStatus.smoking && {
                      borderColor: 'error.main',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'error.main',
                      }
                    })
                  }}
                >
                  {booleanOptions.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                <InputLabel>{t.parties}</InputLabel>
                <Select
                  value={filters.parties}
                  label={t.parties}
                  onChange={(e) => handleFilterChange('parties', e.target.value)}
                  sx={{
                    ...(filterStatus.parties !== undefined && !filterStatus.parties && {
                      borderColor: 'error.main',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'error.main',
                      }
                    })
                  }}
                >
                  {booleanOptions.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                <InputLabel>{t.pets}</InputLabel>
                <Select
                  value={filters.pets}
                  label={t.pets}
                  onChange={(e) => handleFilterChange('pets', e.target.value)}
                  sx={{
                    ...(filterStatus.pets !== undefined && !filterStatus.pets && {
                      borderColor: 'error.main',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'error.main',
                      }
                    })
                  }}
                >
                  {booleanOptions.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                <InputLabel>{t.fullDay}</InputLabel>
                <Select
                  value={filters.fullDay}
                  label={t.fullDay}
                  onChange={(e) => handleFilterChange('fullDay', e.target.value)}
                  sx={{
                    ...(filterStatus.fullDay !== undefined && !filterStatus.fullDay && {
                      borderColor: 'error.main',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'error.main',
                      }
                    })
                  }}
                >
                  {booleanOptions.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                <InputLabel>{t.reportDocs}</InputLabel>
                <Select
                  value={filters.reportDocs}
                  label={t.reportDocs}
                  onChange={(e) => handleFilterChange('reportDocs', e.target.value)}
                  sx={{
                    ...(filterStatus.reportDocs !== undefined && !filterStatus.reportDocs && {
                      borderColor: 'error.main',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'error.main',
                      }
                    })
                  }}
                >
                  {booleanOptions.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Кнопки */}
        <Box sx={{ display: 'flex', gap: 2, mt: 3, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleClearAndApply}
            startIcon={<ClearIcon />}
          >
            {t.clearAll}
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleApplyFilters}
            disabled={loading}
          >
            {t.apply}
          </Button>
        </Box>
      </Drawer>
    </>
  );
});

SearchApartmentFilters.displayName = 'SearchApartmentFilters';

export default SearchApartmentFilters;