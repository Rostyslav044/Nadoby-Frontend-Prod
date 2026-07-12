


// // Этот компонент (ApartmentDetailPage) 
// // отображает детальную 1 страницу объявления об аренде






//страница обявления
 
'use client';


import { useParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback, memo } from "react";
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import { LanguageProvider } from '@/app/LanguageContext';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import SimilarApartments from '@/app/components/SimilarApartments';
import axios from "axios";
import {
  Box,
  Typography,
  IconButton,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Chip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  Menu,
  MenuItem,
  ListItemIcon,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import {
  Favorite,
  FavoriteBorder,
  Share as ShareIcon,
  Home,
  Hotel,
  Bathtub,
  KingBed,
  Apartment,
  DirectionsCar,
  Wifi,
  Tv,
  AcUnit,
  LocalLaundryService as Laundry,
  Person,
  ChildCare,
  SmokingRooms,
  Pets,
  Description,
  AccessTime,
  LocationOn,
  WhatsApp,
  Telegram,
  Email,
  ContentCopy,
  Check,
  Celebration,
} from '@mui/icons-material';

// Динамические импорты для тяжелых компонентов
const FileUploadSlider = dynamic(() => import("@/app/components/FileUploadSlider"), {
  loading: () => (
    <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  ),
  ssr: false
});

const ApartmentDetailMap = dynamic(() => import("@/app/components/apartment/ApartmentDetailMap"), {
  loading: () => (
    <Box sx={{ height: 400, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  ),
  ssr: false
});

const CreateUser = dynamic(() => import("@/app/components/CreateUser"), {
  loading: () => (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <CircularProgress />
    </Box>
  )
});

const AuthLogic = dynamic(() => import("@/app/components/AuthLogic"), {
  ssr: false
});

// Импорты контекстов и хуков
import { useLanguage } from "@/app/LanguageContext";
import { getDistrictName } from '@/app/components/DistrictsData';
import { useFavorites } from "@/app/hooks/useFavorites";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { SessionProvider } from "next-auth/react";

// Константы для переводов (вынесены из компонента)
const TRANSLATIONS = {
  ua: {
    otherListings: "Інші об'єкти користувача",
    district: "район",
    metro: "метро",
    backButton: "Назад",
    description: "Опис",
    characteristics: "Основні характеристики",
    rentalConditions: "Умови оренди",
    amenities: "Зручності",
    location: "Розташування",
    buildRoute: "Побудувати маршрут",
    rooms: "Кімнат",
    guests: "Кількість гостей",
    area: "Площа",
    floor: "Поверх",
    kidsAge: "Вік дітей від",
    ageLimit: "Вікове обмеження",
    parties: "Святкування",
    checkInOut: "Час заїзду/виїзду",
    fullDayCheckIn: "Цілодобове заселення",
    smoking: "Куріння",
    pets: "Тварини",
    reportDocs: "Звітні документи",
    minRent: "Мінімальний термін оренди",
    deposit: "Завдаток",
    notSpecified: "Не вказано",
    noDescription: "Опис відсутній",
    noAmenities: "Зручності не вказані",
    required: "Потрібно",
    notRequired: "Не потрібно",
    yes: "Так",
    no: "Ні",
    hour: "година",
    day: "доба",
    days: "днів",
    m2: "м²",
    fromAge: "від",
    years: "років",
    noRestrictions: "Не обмежено",
    shareTitle: "Оренда житла",
    shareText: "Подивіться це оголошення:",
    call: "Зателефонувати",
    addToFavorites: "Додати в обране",
    removeFromFavorites: "Видалити з обраного",
    loginRequired: "Будь ласка, увійдіть щоб виконати цю дію",
    favoriteAdded: "Додано в обране",
    favoriteRemoved: "Видалено з обраного",
    shareButton: "Поділитися",
    shareViber: "Viber",
    shareTelegram: "Telegram",
    shareWhatsApp: "WhatsApp",
    shareEmail: "Email",
    copyLink: "Копіювати посилання",
    linkCopied: "Посилання скопійовано!",
  },
  ru: {
    otherListings: "Другие объекты пользователя",
    district: "район",
    metro: "метро",
    backButton: "Назад",
    description: "Описание",
    characteristics: "Основные характеристики",
    rentalConditions: "Условия аренды",
    amenities: "Удобства",
    location: "Расположение",
    buildRoute: "Проложить маршрут",
    rooms: "Комнат",
    guests: "Количество гостей",
    area: "Площадь",
    floor: "Этаж",
    kidsAge: "Возраст детей от",
    ageLimit: "Возрастное ограничение",
    parties: "Празднование",
    checkInOut: "Время заезда/выезда",
    fullDayCheckIn: "Круглосуточное заселение",
    smoking: "Курение",
    pets: "Животные",
    reportDocs: "Отчетные документы",
    minRent: "Минимальный срок аренды",
    deposit: "Залог",
    notSpecified: "Не указано",
    noDescription: "Описание отсутствует",
    noAmenities: "Удобства не указаны",
    required: "Требуется",
    notRequired: "Не требуется",
    yes: "Да",
    no: "Нет",
    hour: "час",
    day: "сутки",
    days: "дней",
    m2: "м²",
    fromAge: "от",
    years: " лет",
    noRestrictions: "Не ограничено",
    shareTitle: "Аренда жилья",
    shareText: "Посмотрите это объявление:",
    call: "Позвонить",
    addToFavorites: "Добавить в избранное",
    removeFromFavorites: "Удалить из избранного",
    loginRequired: "Пожалуйста, войдите чтобы выполнить это действие",
    favoriteAdded: "Добавлено в избранное",
    favoriteRemoved: "Удалено из избранного",
    shareButton: "Поделиться",
    shareViber: "Viber",
    shareTelegram: "Telegram",
    shareWhatsApp: "WhatsApp",
    shareEmail: "Email",
    copyLink: "Копировать ссылку",
    linkCopied: "Ссылка скопирована!",
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
    'Глемпінг': 'Глемпінг',
    'Пансионат': 'Санаторій/Пансіонат',
    'Котедж для компаний': 'Котедж для компаній',
    'Коворкінг': 'Коворкінг',
    'Автокемпінг': 'Автокемпінг',
  },
  ru: {
    'Квартира': 'Квартира',
    'Гостиница': 'Гостиница',
    'Хостел': 'Хостел',
    'Будинок': 'Дом',
    'База відпочинку': 'База отдыха',
    'Сауна/Лазня': 'Сауна/Баня',
    'Глемпінг': 'Глэмпинг',
    'Пансионат': 'Пансионат',
    'Котедж для компаній': 'Коттедж для компаний',
    'Коворкінг': 'Коворкинг',
    'Автокемпінг': 'Автокемпинг',
    'Готель для тварин': 'Отель для животных',
  }
};

const CONVENIENCE_TRANSLATIONS = {
  ua: {
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
  },
  ru: {
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
};

// Вспомогательные компоненты
const ViberIcon = memo(() => (
  <img 
    src="/viber.png" 
    alt="Viber" 
    style={{ 
      width: 20, 
      height: 20,
      objectFit: "contain",
      display: "block",
      filter: "grayscale(100%)"
    }} 
    loading="lazy"
  />
));

ViberIcon.displayName = 'ViberIcon';

// Основной компонент контента
const ApartmentDetailContent = memo(({ apartmentData, userApartmentsCount }) => {
  const params = useParams();
  const id = params?.id;
  const [apartment] = useState(apartmentData);
  const [userLocation, setUserLocation] = useState(null);
  const [myListingsCount] = useState(userApartmentsCount);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  
  const autoCloseTimer = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentLanguage } = useLanguage();
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.ua;
  
  const { isFavorite, toggleFavorite, loading: favoriteLoading } = useFavorites();

  // Очистка таймера
//   useEffect(() => {
//     return () => {
//       if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
//     };
//   }, []);

  useEffect(() => {
    // Увеличиваем счетчик просмотров при загрузке страницы
    const incrementView = async () => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/stats/${id}/view`);
        console.log('✅ View counted for apartment:', id);
      } catch (error) {
        console.error('❌ Error incrementing view:', error);
      }
    };
    
    if (id) {
      incrementView();
    }
    
    
    return () => {
      if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
    };
  }, [id]); 

  // Зависимость от apartmentId

  // Геолокация
  useEffect(() => {
    if (navigator.geolocation && apartment?.latitude) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
        (error) => console.error("Geolocation error:", error)
      );
    }
  }, [apartment]);

  const startAutoCloseTimer = useCallback(() => {
    if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
    autoCloseTimer.current = setTimeout(() => {
      setLoginModalOpen(false);
      setSnackbar((prev) => ({ ...prev, open: false }));
    }, 5000);
  }, []);

  const showSnackbar = useCallback((message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar({ ...snackbar, open: false });
    if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
  }, [snackbar]);

  const handleCloseModal = useCallback(() => {
    setLoginModalOpen(false);
    if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
  }, []);

  const translateCategory = useCallback((category) => {
    if (!category) return "";
    const catMap = CATEGORY_TRANSLATIONS[currentLanguage] || CATEGORY_TRANSLATIONS.ua;
    return catMap[category] || category;
  }, [currentLanguage]);

  const translateConvenience = useCallback((convenience) => {
    if (!convenience) return "";
    const convMap = CONVENIENCE_TRANSLATIONS[currentLanguage] || CONVENIENCE_TRANSLATIONS.ua;
    return convMap[convenience] || convenience;
  }, [currentLanguage]);

  const handleToggleFavorite = useCallback(async () => {
    const userProfile = localStorage.getItem("user_profile");
    if (!userProfile) {
      setLoginModalOpen(true);
      setSnackbar({ open: true, message: t.loginRequired, severity: "info" });
      startAutoCloseTimer();
      return;
    }

    try {
      const newStatus = await toggleFavorite(id);
      showSnackbar(newStatus ? t.favoriteAdded : t.favoriteRemoved, "success");
    } catch (error) {
      if (error.message === "USER_NOT_LOGGED_IN") {
        setLoginModalOpen(true);
        setSnackbar({ open: true, message: t.loginRequired, severity: "info" });
        startAutoCloseTimer();
      } else {
        showSnackbar("Ошибка при обновлении избранного", "error");
      }
    }
  }, [id, t, toggleFavorite, showSnackbar, startAutoCloseTimer]);

  const handleOpenRoute = useCallback(() => {
    if (apartment?.latitude && apartment?.longitude) {
      if (userLocation) {
        window.open(
          `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${apartment.latitude},${apartment.longitude}`
        );
      } else {
        window.open(`https://www.google.com/maps?q=${apartment.latitude},${apartment.longitude}`);
      }
    }
  }, [apartment, userLocation]);

  const getCategoryIcon = useCallback(() => {
    if (!apartment?.category) return <Apartment />;
    const category = apartment.category.toLowerCase();
    if (category.includes("квартира")) return <Home />;
    if (category.includes("гостиница") || category.includes("отель")) return <Hotel />;
    if (category.includes("хостел")) return <KingBed />;
    if (category.includes("дом")) return <Home />;
    if (category.includes("база отдыха")) return <Home />;
    if (category.includes("сауна") || category.includes("баня")) return <Bathtub />;
    return <Apartment />;
  }, [apartment]);

  const getBooleanValue = useCallback((value) => {
    return value === "yes" ? t.yes : value === "no" ? t.no : t.notSpecified;
  }, [t]);

  const formatTime = useCallback((time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  }, []);

  const formatAddress = useCallback(() => {
    if (!apartment) return "";
    const parts = [];
    if (apartment.city) parts.push(apartment.city);
    if (apartment.street && apartment.houseNumber) {
      parts.push(`${apartment.street} ${apartment.houseNumber}`);
    }
    if (apartment.district) {
      parts.push(`${t.district} ${getDistrictName(apartment.district, currentLanguage)}`);
    }
    if (apartment.metro) parts.push(`${t.metro} ${apartment.metro}`);
    return parts.join(", ");
  }, [apartment, currentLanguage, t]);

  // Структурированные данные для SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'RentalProperty',
    name: apartment?.objectName || apartment?.name,
    description: apartment?.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: apartment?.city,
      streetAddress: `${apartment?.street} ${apartment?.houseNumber}`,
    },
    ...(apartment?.price && {
      offers: {
        '@type': 'Offer',
        price: apartment.price,
        priceCurrency: 'UAH',
      }
    })
  };

  if (!apartment) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>{apartment.objectName || apartment.name} | NaDoby</title>
        <meta name="description" content={apartment.description?.substring(0, 160) || "Аренда жилья"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* <Box maxWidth="1200px" mx="auto" px={{ xs: 2, sm: 3 }} marginTop={5}> */}

      <Box maxWidth="1200px" mx="auto" px={{ xs: 0, sm: 3 }} marginTop={5}>
        {/* Верхняя панель */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Button 
            variant="outlined" 
            onClick={() => window.history.back()} 
            size={isMobile ? "small" : "medium"}
          >
            {t.backButton}
          </Button>

          <Chip
            label={translateCategory(apartment.category)}
            color="primary"
            icon={getCategoryIcon()}
            size={isMobile ? "small" : "medium"}
          />

          <Box display="flex" gap={1}>
            <Tooltip title={isFavorite(id) ? t.removeFromFavorites : t.addToFavorites} arrow>
              <IconButton
                // onClick={handleToggleFavorite}
                onClick={() => {
                  axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/stats/${id}/favorite-click`);
                  handleToggleFavorite();
                }}

                disabled={favoriteLoading}
                size={isMobile ? "small" : "medium"}
                sx={{ bgcolor: "rgba(255,255,255,0.9)" }}
              >
                {favoriteLoading ? (
                  <CircularProgress size={isMobile ? 20 : 24} />
                ) : isFavorite(id) ? (
                  <Favorite color="error" />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title={t.shareButton} arrow>
              <IconButton
                onClick={(e) => setShareAnchorEl(e.currentTarget)}
                size={isMobile ? "small" : "medium"}
                sx={{ bgcolor: "rgba(255,255,255,0.9)" }}
              >
                <ShareIcon />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={shareAnchorEl}
              open={Boolean(shareAnchorEl)}
              onClose={() => setShareAnchorEl(null)}
            >
              <MenuItem onClick={() => {
                window.open(`viber://forward?text=${encodeURIComponent(t.shareText + ' ' + window.location.href)}`, '_blank');
                setShareAnchorEl(null);
              }}>
                <ListItemIcon><ViberIcon /></ListItemIcon>
                <ListItemText>{t.shareViber}</ListItemText>
              </MenuItem>

              <MenuItem onClick={() => {
                window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(t.shareText)}`, '_blank');
                setShareAnchorEl(null);
              }}>
                <ListItemIcon><Telegram /></ListItemIcon>
                <ListItemText>{t.shareTelegram}</ListItemText>
              </MenuItem>

              <MenuItem onClick={() => {
                window.open(`https://wa.me/?text=${encodeURIComponent(t.shareText + ' ' + window.location.href)}`, '_blank');
                setShareAnchorEl(null);
              }}>
                <ListItemIcon><WhatsApp /></ListItemIcon>
                <ListItemText>{t.shareWhatsApp}</ListItemText>
              </MenuItem>

              <MenuItem onClick={() => {
                window.open(`mailto:?subject=${encodeURIComponent(t.shareTitle)}&body=${encodeURIComponent(t.shareText + ' ' + window.location.href)}`, '_blank');
                setShareAnchorEl(null);
              }}>
                <ListItemIcon><Email /></ListItemIcon>
                <ListItemText>{t.shareEmail}</ListItemText>
              </MenuItem>

              <MenuItem onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                showSnackbar(t.linkCopied, "success");
                setShareAnchorEl(null);
              }}>
                <ListItemIcon><ContentCopy /></ListItemIcon>
                <ListItemText>{t.copyLink}</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Название */}
        <Box mb={2}>
          <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
            {apartment.objectName || apartment.name || "Название объекта"}
          </Typography>
        </Box>

        {/* Адрес */}
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          mb={3}
          onClick={handleOpenRoute}
          sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline", color: "primary.main" } }}
        >
          <LocationOn color="primary" fontSize={isMobile ? "small" : "medium"} />
          <Typography variant={isMobile ? "body2" : "body1"}>{formatAddress()}</Typography>
        </Box>

        {/* Слайдер фото */}
        <FileUploadSlider
          photos={apartment.photos}
          price={apartment.price}
          name={apartment.name}
          phones={apartment.phones}
          category={translateCategory(apartment.category)}
          apartmentId={apartment._id}
          isMobileView={isMobile} // Добавляем пропс для мобильной версии

        />

        {/* Основной контент */}
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, mb: 3 }}>
          {/* Описание */}
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            {t.description}
          </Typography>
          <Typography paragraph sx={{ wordWrap: 'break-word', textAlign: 'justify' }}>
            {apartment.description || t.noDescription}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            {/* Характеристики */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>{t.characteristics}</Typography>
              <List dense>
                <ListItem>
                  <ListItemAvatar><Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}><Home fontSize="small" /></Avatar></ListItemAvatar>
                  <ListItemText primary={t.rooms} secondary={apartment.rooms || t.notSpecified} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}><Person fontSize="small" /></Avatar></ListItemAvatar>
                  <ListItemText primary={t.guests} secondary={apartment.beds || t.notSpecified} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}><Home fontSize="small" /></Avatar></ListItemAvatar>
                  <ListItemText primary={t.area} secondary={apartment.size ? `${apartment.size} ${t.m2}` : t.notSpecified} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}><Home fontSize="small" /></Avatar></ListItemAvatar>
                  <ListItemText primary={t.floor} secondary={apartment.floor ? `${apartment.floor} ${currentLanguage === "ua" ? "з" : "из"} ${apartment.totalFloors}` : t.notSpecified} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}><ChildCare fontSize="small" /></Avatar></ListItemAvatar>
                  <ListItemText primary={t.kidsAge} secondary={apartment.kidsAge ? `${apartment.kidsAge} ${t.years}` : t.noRestrictions} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}><Person fontSize="small" /></Avatar></ListItemAvatar>
                  <ListItemText primary={t.ageLimit} secondary={apartment.ageLimit ? `${t.fromAge} ${apartment.ageLimit} ${t.years}` : t.noRestrictions} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}><Celebration fontSize="small" /></Avatar></ListItemAvatar>
                  <ListItemText primary={t.parties} secondary={getBooleanValue(apartment.parties)} />
                </ListItem>
              </List>
            </Grid>

            {/* Условия аренды */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>{t.rentalConditions}</Typography>
              <List dense>
                <ListItem>
                  <ListItemAvatar><Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}><AccessTime fontSize="small" /></Avatar></ListItemAvatar>
                  <ListItemText primary={t.checkInOut} secondary={apartment.checkIn || apartment.checkOut ? `${formatTime(apartment.checkIn)} / ${formatTime(apartment.checkOut)}` : t.notSpecified} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}><AccessTime fontSize="small" /></Avatar></ListItemAvatar>
                  <ListItemText primary={t.fullDayCheckIn} secondary={getBooleanValue(apartment.fullDayCheckIn)} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}><SmokingRooms fontSize="small" /></Avatar></ListItemAvatar>
                  <ListItemText primary={t.smoking} secondary={getBooleanValue(apartment.smoking)} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}><Pets fontSize="small" /></Avatar></ListItemAvatar>
                  <ListItemText primary={t.pets} secondary={getBooleanValue(apartment.pets)} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}><Description fontSize="small" /></Avatar></ListItemAvatar>
                  <ListItemText primary={t.reportDocs} secondary={getBooleanValue(apartment.reportDocs)} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}><Home fontSize="small" /></Avatar></ListItemAvatar>
                  <ListItemText primary={t.minRent} secondary={apartment.minRent ? `${apartment.minRent} ${t.days}` : t.notSpecified} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}><Home fontSize="small" /></Avatar></ListItemAvatar>
                  <ListItemText primary={t.deposit} secondary={apartment.deposit ? `${apartment.deposit} грн` : t.notRequired} />
                </ListItem>
              </List>
            </Grid>

            {/* Удобства */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>{t.amenities}</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                {apartment.conveniences?.length > 0 ? (
                  apartment.conveniences.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "primary.light",
                        color: "primary.contrastText",
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                      }}
                    >
                      <Check sx={{ mr: 1, fontSize: '1rem' }} />
                      <Typography variant="body2">{translateConvenience(item)}</Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">{t.noAmenities}</Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Карта */}
        {apartment.latitude && apartment.longitude && (
          <ApartmentDetailMap
            apartment={apartment}
            t={t}
            userLocation={userLocation}
          />
        )}

        {/* Кнопка других объектов */}
        {apartment && myListingsCount > 1 && (
          <Box textAlign="center" mb={4} mt={3}>
            <Link href={`/listings/${apartment.user_id}`} passHref>
              <Button
                variant="contained"
                color="primary"
                size={isMobile ? "medium" : "large"}
                sx={{ fontWeight: 700, py: { xs: 1.5, sm: 2 }, px: { xs: 3, sm: 4 }, borderRadius: 2 }}
              >
                {currentLanguage === "ua" ? "ІНШІ ОБ'ЄКТИ КОРИСТУВАЧА" : "ДРУГИЕ ОБЪЕКТЫ ПОЛЬЗОВАТЕЛЯ"}
              </Button>
            </Link>
          </Box>
        )}

<SimilarApartments 
  currentApartmentId={apartment._id}
  city={apartment.city}
  category={apartment.category}
  price={apartment.price}
/>

        {/* Snackbar и Dialog */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
            {snackbar.message}
          </Alert>
        </Snackbar>

        <Dialog open={loginModalOpen} onClose={handleCloseModal} fullWidth maxWidth="xs">
          <DialogContent>
            <CreateUser onClose={handleCloseModal} />
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
});

ApartmentDetailContent.displayName = 'ApartmentDetailContent';

// SSR функция
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_API_URL 
      : process.env.NEXT_PUBLIC_API_URL;
    
    const res = await fetch(`${baseUrl}/api/v1/apartments/${id}`);
    const data = await res.json();

    if (!data.apartment) {
      return { notFound: true };
    }

    return {
      props: {
        apartmentData: data.apartment,
        userApartmentsCount: data.userApartmentsCount || 0,
      },
    };
  } catch (error) {
    console.error("SSR fetch error:", error);
    return { notFound: true };
  }
}

// Основной экспорт
export default function ApartmentDetailPage({ apartmentData, userApartmentsCount }) {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <SessionProvider>
          <AuthLogic />
          <Header />
          <ApartmentDetailContent
            apartmentData={apartmentData}
            userApartmentsCount={userApartmentsCount}
          />
          <Box sx={{ mt: 8 }}>
            <Footer />
          </Box>
        </SessionProvider>
      </LanguageProvider>
    </Provider>
  );
}