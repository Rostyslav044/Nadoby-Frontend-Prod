




// index.js

'use client';

import { LanguageProvider, useLanguage } from "@/app/LanguageContext";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import { useSession } from 'next-auth/react';
import CreateUser from '@/app/components/CreateUser';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Chip, 
  Breadcrumbs,
  Pagination,
  Paper,
  useMediaQuery,
  useTheme,
  Skeleton,
  Button,
  Collapse,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Fab,
  Zoom,
  Tooltip,
  Alert,
  Snackbar,
  Badge,
  CircularProgress 
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import MapIcon from '@mui/icons-material/Map';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Warning from '@mui/icons-material/Warning';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { SessionProvider } from 'next-auth/react';

// Імпортуємо компоненти
import ApartmentCard from '@/app/components/ApartmentCard';
import { FavoritesProvider } from '@/app/hooks/FavoritesContext';
import SearchApartmentFilters from '@/app/components/SearchApartmentFilters';
import { DISTRICTS_DATA, getDistrictName, isKyiv } from '@/app/components/DistrictsData';
import { GoogleMapsProvider } from '../../src/GoogleMapsProvider';
// import { METRO_DATA } from '@/app/components/MetroData';

// Динамічний імпорт карти
const MapComponent = dynamic(() => import('@/app/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Skeleton variant="rectangular" width="100%" height="100%" />
    </Box>
  )
});

// ========== КОНСТАНТЫ ==========

// Словарь для нормализации названий станций метро
const METRO_NORMALIZATION = {
  'Академмістечко': 'Академгородок',
  'Академгородок': 'Академмістечко',
  'Житомирська': 'Житомирская',
  'Житомирская': 'Житомирська',
  'Святошин': 'Святошин',
  'Нивки': 'Нивки',
  'Берестейська': 'Берестейская',
  'Берестейская': 'Берестейська',
  'Шулявська': 'Шулявская',
  'Шулявская': 'Шулявська',
  'Політехнічний інститут': 'Политехнический институт',
  'Политехнический институт': 'Політехнічний інститут',
  'Вокзальна': 'Вокзальная',
  'Вокзальная': 'Вокзальна',
  'Університет': 'Университет',
  'Университет': 'Університет',
  'Театральна': 'Театральная',
  'Театральная': 'Театральна',
  'Хрещатик': 'Крещатик',
  'Крещатик': 'Хрещатик',
  'Арсенальна': 'Арсенальная',
  'Арсенальная': 'Арсенальна',
  'Дніпро': 'Днепр',
  'Днепр': 'Дніпро',
  'Гідропарк': 'Гидропарк',
  'Гидропарк': 'Гідропарк',
  'Лівобережна': 'Левобережная',
  'Левобережная': 'Лівобережна',
  'Дарниця': 'Дарница',
  'Дарница': 'Дарниця',
  'Чернігівська': 'Черниговская',
  'Черниговская': 'Чернігівська',
  'Лісова': 'Лесная',
  'Лесная': 'Лісова',
  'Героїв Дніпра': 'Героев Днепра',
  'Героев Днепра': 'Героїв Дніпра',
  'Мінська': 'Минская',
  'Минская': 'Мінська',
  'Оболонь': 'Оболонь',
  'Поштова площа': 'Почтовая площадь',
  'Почтовая площадь': 'Поштова площа',
  'Контрактова площа': 'Контрактовая площадь',
  'Контрактовая площадь': 'Контрактова площа',
  'Тараса Шевченка': 'Тараса Шевченко',
  'Лук\'янівська': 'Лукьяновская',
  'Лукьяновская': 'Лук\'янівська',
  'Дорогожичі': 'Дорогожичи',
  'Дорогожичи': 'Дорогожичі',
  'Сирець': 'Сырец',
  'Сырец': 'Сирець',
  'Золоті ворота': 'Золотые ворота',
  'Золотые ворота': 'Золоті ворота',
  'Палац спорту': 'Дворец спорта',
  'Дворец спорта': 'Палац спорту',
  'Олімпійська': 'Олимпийская',
  'Олимпийская': 'Олімпійська',
  'Палац «Україна»': 'Дворец «Украина»',
  'Дворец «Украина»': 'Палац «Україна»',
  'Либідська': 'Лыбедская',
  'Лыбедская': 'Либідська',
  'Деміївська': 'Демиевская',
  'Демиевская': 'Деміївська',
  'Голосіївська': 'Голосеевская',
  'Голосеевская': 'Голосіївська',
  'Васильківська': 'Васильковская',
  'Васильковская': 'Васильківська',
  'Виставковий центр': 'Выставочный центр',
  'Выставочный центр': 'Виставковий центр',
  'Іподром': 'Ипподром',
  'Ипподром': 'Іподром',
  'Теремки': 'Теремки',
  'Кловська': 'Кловская',
  'Кловская': 'Кловська',
  'Печерська': 'Печерская',
  'Печерская': 'Печерська',
  'Видубичі': 'Выдубичи',
  'Выдубичи': 'Видубичі',
  'Славутич': 'Славутич',
  'Осокорки': 'Осокорки',
  'Позняки': 'Позняки',
  'Почайна': 'Почайна',
  'Петрівка': 'Петровка',
  'Почайна/Петрівка': 'Почайна/Петровка',
  'Почайна/Петровка': 'Почайна/Петрівка',
  'Харківська': 'Харьковская',
  'Харьковская': 'Харківська',
  'Вирлиця': 'Вырлица',
  'Вырлица': 'Вирлиця',
  'Бориспільська': 'Бориспольская',
  'Бориспольская': 'Бориспільська',
  'Червоний хутір': 'Красный хутор',
  'Красный хутор': 'Червоний хутір',
  'Майдан Незалежності': 'Майдан Независимости',
  'Майдан Независимости': 'Майдан Незалежності',
  'Площа Українських Героїв': 'Площадь Украинских Героев',
  'Площадь Украинских Героев': 'Площа Українських Героїв',
  'Льва Толстого': 'Льва Толстого',
  'Звіринецька': 'Зверинецкая',
  'Зверинецкая': 'Звіринецька',
  'Дружби Народів': 'Дружбы Народов',
  'Холодна гора': 'Холодная гора',
  'Холодная гора': 'Холодна гора',
  'Південний вокзал': 'Южный вокзал',
  'Южный вокзал': 'Південний вокзал',
  'Центральний ринок': 'Центральный рынок',
  'Центральный рынок': 'Центральний ринок',
  'Майдан Конституції': 'Площадь Конституции',
  'Площадь Конституции': 'Майдан Конституції',
  'Історичний музей': 'Исторический музей',
  'Исторический музей': 'Історичний музей',
  'Проспект Гагаріна': 'Проспект Гагарина',
  'Проспект Гагарина': 'Проспект Гагаріна',
  'Спортивна': 'Спортивная',
  'Спортивная': 'Спортивна',
  'Завод імені Малишева': 'Завод имени Малышева',
  'Завод имени Малышева': 'Завод імені Малишева',
  'Турбоатом': 'Турбоатом',
  'Індустріальна': 'Индустриальная',
  'Индустриальная': 'Індустріальна',
  'Академіка Павлова': 'Академика Павлова',
  'Академика Павлова': 'Академіка Павлова',
  'Студентська': 'Студенческая',
  'Студенческая': 'Студентська',
  'Героїв Праці': 'Героев Труда',
  'Героев Труда': 'Героїв Праці',
  'Перемога': 'Победа',
  'Победа': 'Перемога',
  'Олексіївська': 'Алексеевская',
  'Алексеевская': 'Олексіївська',
  '23 Серпня': '23 Августа',
  '23 Августа': '23 Серпня',
  'Ботанічний сад': 'Ботанический сад',
  'Ботанический сад': 'Ботанічний сад',
  'Держпром': 'Госпром',
  'Госпром': 'Держпром',
  
  'Металургів': 'Металлургов',
  'Металлургов': 'Металургів',
  'Заводська': 'Заводская',
  'Заводская': 'Заводська',
  'Метробудівників': 'Метростроителей',
  'Метростроителей': 'Метробудівників',
  'Проспект Свободи': 'Проспект Свободы',
  'Проспект Свободы': 'Проспект Свободи',
  'Покровська': 'Покровская',
  'Покровская': 'Покровська',
};

// Количество элементов для отображения
const DISPLAY_COUNTS = {
  mobile: {
    districts: 6,
    metro: 8
  },
  tablet: {
    districts: 8,
    metro: 12
  },
  desktop: {
    districts: 10,
    metro: 16
  }
};

// Переводы для удобств
const CONVENIENCE_TRANSLATIONS = {
  'Wi-Fi': 'Wi-Fi',
  'wi-fi': 'Wi-Fi',
  'wifi': 'Wi-Fi',
  'Кондиціонер': 'Кондиционер',
  'кондиціонер': 'Кондиционер',
  'Пральна машина': 'Стиральная машина',
  'пральна машина': 'Стиральная машина',
  'Телевізор': 'Телевизор',
  'телевізор': 'Телевизор',
  'Холодильник': 'Холодильник',
  'холодильник': 'Холодильник',
  'Мікрохвильова піч': 'Микроволновка',
  'мікрохвильова піч': 'Микроволновка',
  'Плита': 'Плита',
  'плита': 'Плита',
  'Духовка': 'Духовка',
  'духовка': 'Духовка',
  'Посудомийна машина': 'Посудомоечная машина',
  'посудомийна машина': 'Посудомоечная машина',
  'Фен': 'Фен',
  'фен': 'Фен',
  'Праска': 'Утюг',
  'праска': 'Утюг',
  'Балкон': 'Балкон',
  'балкон': 'Балкон',
  'Лоджія': 'Лоджия',
  'лоджія': 'Лоджия',
  'Сушарка для білизни': 'Сушка для белья',
  'сушарка для білизни': 'Сушка для белья',
  'Дитяче ліжко': 'Детская кроватка',
  'дитяче ліжко': 'Детская кроватка',
  'Сейф': 'Сейф',
  'сейф': 'Сейф',
  'Джакузі': 'Джакузи',
  'джакузі': 'Джакузи',
  'Сауна': 'Сауна',
  'сауна': 'Сауна',
  'Басейн': 'Бассейн',
  'басейн': 'Бассейн',
  'Спортзал': 'Спортзал',
  'спортзал': 'Спортзал',
  'Паркінг': 'Паркинг',
  'паркінг': 'Паркинг',
  'Гараж': 'Гараж',
  'гараж': 'Гараж',
  'Ліфт': 'Лифт',
  'ліфт': 'Лифт',
  'Охорона': 'Охрана',
  'охорона': 'Охрана',
  'Відеоспостереження': 'Видеонаблюдение',
  'відеоспостереження': 'Видеонаблюдение',
  'Домофон': 'Домофон',
  'домофон': 'Домофон',
  'Сигналізація': 'Сигнализация',
  'сигналізація': 'Сигнализация',
  'Окремий вхід': 'Отдельный вход',
  'окремий вхід': 'Отдельный вход',
  'Тераса': 'Терраса',
  'тераса': 'Терраса',
  'Сад': 'Сад',
  'сад': 'Сад',
  'Мангал': 'Мангал',
  'мангал': 'Мангал',
  'Ігрова кімната': 'Игровая комната',
  'ігрова кімната': 'Игровая комната',
  'Караоке': 'Караоке',
  'караоке': 'Караоке',
  'Настільний теніс': 'Настольный теннис',
  'настільний теніс': 'Настольный теннис',
  'Більярд': 'Бильярд',
  'більярд': 'Бильярд',
  'Кальян': 'Кальян',
  'кальян': 'Кальян',
};

// Переводы для страницы
const TRANSLATIONS = {
  ua: {
    metaTitle: "Подобова оренда житла, місто {city} | NaDoby",
    metaDescription: "✅ Зняти житло подобово в {city} ✔️ {totalCount} оголошень від власників ✔️ Ціни від {minPrice} грн/доба ✔️ Без комісії",
    metaKeywords: "оренда квартир {city}, зняти квартиру подобово {city}, квартири подобово {city}, подобова оренда {city}",
    h1: "Подобова оренда житла, місто {city}",
    shortDescription: "Зняти житло подобово в {city} без посередників",
    breadcrumbHome: "Головна",
    breadcrumbCurrent: "Пошук",
    statsApartments: "оголошень",
    statsPrices: "Ціни від",
    statsNoCommission: "Без посередників",
    popularFilters: "Популярні варіанти",
    filter1komn: "1-кімнатні",
    filter2komn: "2-кімнатні", 
    filter3komn: "3-кімнатні",
    filter4plus: "4+ кімнат",
    count: "оголошень",
    districts: "Райони",
    kyivRegion: "Область",
    metro: "Станції метро",
    newListings: "Оголошення",
    allListings: "Всі оголошення",
    showAll: "Показати всі",
    showLess: "Показати менше",
    noPhoto: "Немає фото",
    perDay: "грн/доба",
    rooms: "кімнат",
    guests: "гостей",
    area: "площа",
    faqTitle: "Часті питання про подобову оренду в місті {city}",
    faq1q: "Скільки коштує зняти квартиру подобово в {city}?",
    faq1a: "Ціни варіюються від {minPrice} грн до {maxPrice} грн. Середня ціна — {avgPrice} грн/доба.",
    faq2q: "Які документи потрібні для заселення?",
    faq2a: "Для заселення зазвичай потрібен паспорт. Деякі орендодавці також просять заставу за збереження майна.",
    faq3q: "Чи можна винайняти квартиру на кілька годин?",
    faq3a: "Більшість квартир здаються подобово (на добу), але є варіанти і з погодинною оплатою.",
    resetFilters: "Скинути всі фільтри",
    clearFilters: "Очистити фільтри",
    noApartments: "За вибраними фільтрами немає оголошень",
    tryChanging: "Спробуйте змінити параметри пошуку",
    addApartment: "Додати оголошення",
    viewOnMap: "Показати на карті",
    closeMap: "Закрити карту",
    apartmentsOnMap: "Оголошення на карті",
    activeFilters: "Активні фільтри",
    filterMatches: "Відповідає фільтру",
    outOf: "з",
    filtersIncompatible: "Фільтри несумісні",
    noResults: "Нічого не знайдено",
    price: "Ціна",
    smoking: "Паління",
    parties: "Вечірки",
    pets: "Тварини",
    fullDay: "Цілодобово",
    reportDocs: "Звітні документи",
    conveniences: "Зручності",
    yes: "Так",
    no: "Ні",
    metro: "Метро",
    district: "Район",
    filters: "Фільтри",
    clearAll: "Очистити",
    found: "Знайдено",
    variants: "варіантів",
    city: "Місто",
    category: "Категорія",
    kyiv: "Київ",
    // SEO контент
    seoTitle1: "Переваги оренди квартири в Києві",
    seoContent1: "Київ — це не лише столиця України, але й місто з унікальною атмосферою, багатою історією та розвиненою інфраструктурою. Оренда квартири в Києві дозволяє вам бути в центрі подій, насолоджуватися культурним життям та мати доступ до всіх зручностей мегаполісу. На нашому сайті представлені квартири різних категорій: від економ-класу до преміум-апартаментів у центрі міста.",
    seoTitle2: "Найкращі райони для оренди квартири в Києві",
    seoContent2: "Кожен район Києва має свої особливості: Печерськ — елітний центр міста, Оболонь — сучасний житловий масив з набережною, Голосіївський — зелений район з парками та озерами, Дарниця — динамічний лівий берег. Незалежно від того, чи шукаєте ви квартиру для відпочинку, роботи чи проживання, у нас є варіанти для будь-яких потреб.",
    seoTitle3: "Як вибрати квартиру подобово в Києві",
    seoContent3: "При виборі квартири в Києві зверніть увагу на транспортну доступність, наявність метро поруч, інфраструктуру району. Наші фільтри допоможуть вам знайти ідеальний варіант за ціною, кількістю кімнат, площею та додатковими зручностями. Усі квартири на сайті — від власників, що гарантує відсутність комісій та посередників.",
    seoTitle4: "Оренда квартири в Києві для туристів",
    seoContent4: "Для туристів найкраще підходять квартири в центрі міста або біля станцій метро. Це дозволяє швидко дістатися до головних визначних пам'яток: Хрещатика, Майдану Незалежності, Андріївського узвозу, Києво-Печерської лаври. Обирайте квартиру з зручним розташуванням та насолоджуйтеся перебуванням у Києві.",
    seoTitle5: "Довгострокова оренда квартир у Києві",
    seoContent5: "Плануєте залишитися в Києві надовго? У нас є пропозиції для довгострокової оренди. Такі квартири часто мають нижчу ціну за добу при тривалому бронюванні. Зв'яжіться з власником безпосередньо через наш сайт та домовтеся про індивідуальні умови.",
    cities: {
      'Київ': 'Київ',
      'Харків': 'Харків',
      'Дніпро': 'Дніпро',
      'Одеса': 'Одеса',
      'Львів': 'Львів',
      'Запоріжжя': 'Запоріжжя',
      'Вінниця': 'Вінниця',
      'Чернігів': 'Чернігів',
      'Черкаси': 'Черкаси',
      'Кропивницький': 'Кропивницький',
      'Тернопіль': 'Тернопіль',
      'Івано-Франківськ': 'Івано-Франківськ',
      'Луцьк': 'Луцьк',
      'Рівне': 'Рівне',
      'Хмельницький': 'Хмельницький',
      'Чернівці': 'Чернівці',
      'Житомир': 'Житомир',
      'Суми': 'Суми',
      'Миколаїв': 'Миколаїв',
      'Херсон': 'Херсон',
      'Полтава': 'Полтава',
      'Ужгород': 'Ужгород',
      'Крим': 'Крим',
      'Донецьк': 'Донецьк',
      'Луганськ': 'Луганськ',
    }
  },
  ru: {
    metaTitle: "Посуточная аренда жилья, город. {city} | NaDoby",
    metaDescription: "✅ Снять жилье посуточно в {city} ✔️ {totalCount} объявлений от собственников ✔️ Цены от {minPrice} грн/сутки ✔️ Без комиссии",
    metaKeywords: "аренда квартир {city}, снять квартиру посуточно {city}, квартиры посуточно {city}, посуточная аренда {city}",
    h1: "Посуточная аренда жилья, город {city}",
    shortDescription: "Снять жилье посуточно в {city} без посредников",
    breadcrumbHome: "Главная",
    breadcrumbCurrent: "Поиск",
    statsApartments: "объявлений",
    statsPrices: "Цены от",
    statsNoCommission: "Без посредников",
    popularFilters: "Популярные варианты",
    filter1komn: "1-комнатные",
    filter2komn: "2-комнатные",
    filter3komn: "3-комнатные",
    filter4plus: "4+ комнат",
    count: "объявлений",
    districts: "Районы",
    kyivRegion: "Область",
    metro: "Станции метро",
    newListings: "Объявления",
    allListings: "Все объявления",
    showAll: "Показать все",
    showLess: "Показать меньше",
    noPhoto: "Нет фото",
    perDay: "грн/сутки",
    rooms: "комнат",
    guests: "гостей",
    area: "м²",
    faqTitle: "Часто задаваемые вопросы о посуточной аренде в городе {city}",
    faq1q: "Сколько стоит снять квартиру посуточно в {city}?",
    faq1a: "Цены варьируются от {minPrice} грн до {maxPrice} грн. Средняя цена — {avgPrice} грн/сутки.",
    faq2q: "Какие документы нужны для заселения?",
    faq2a: "Для заселения обычно нужен паспорт. Некоторые арендодатели также просят залог за сохранность имущества.",
    faq3q: "Можно ли снять квартиру на несколько часов?",
    faq3a: "Большинство квартир сдаются посуточно (на сутки), но есть варианты и с почасовой оплатой.",
    resetFilters: "Сбросить все фильтры",
    clearFilters: "Очистить фильтры",
    noApartments: "По выбранным фильтрам нет объявлений",
    tryChanging: "Попробуйте изменить параметры поиска",
    addApartment: "Добавить объявление",
    viewOnMap: "Показать на карте",
    closeMap: "Закрыть карту",
    apartmentsOnMap: "Объявления на карте",
    activeFilters: "Активные фильтры",
    filterMatches: "Соответствует фильтру",
    outOf: "из",
    filtersIncompatible: "Фильтры несовместимы",
    noResults: "Ничего не найдено",
    price: "Цена",
    smoking: "Курение",
    parties: "Вечеринки",
    pets: "Животные",
    fullDay: "Круглосуточно",
    reportDocs: "Отчетные документы",
    conveniences: "Удобства",
    yes: "Да",
    no: "Нет",
    metro: "Метро",
    district: "Район",
    filters: "Фильтры",
    clearAll: "Очистить",
    found: "Найдено",
    variants: "вариантов",
    city: "Город",
    category: "Категория",
    kyiv: "Киев",
    // SEO контент
    seoTitle1: "Преимущества аренды квартиры в Киеве",
    seoContent1: "Киев — это не только столица Украины, но и город с уникальной атмосферой, богатой историей и развитой инфраструктурой. Аренда квартиры в Киеве позволяет вам быть в центре событий, наслаждаться культурной жизнью и иметь доступ ко всем удобствам мегаполиса. На нашем сайте представлены квартиры различных категорий: от эконом-класса до премиум-апартаментов в центре города.",
    seoTitle2: "Лучшие районы для аренды квартиры в Киеве",
    seoContent2: "Каждый район Киева имеет свои особенности: Печерск — элитный центр города, Оболонь — современный жилой массив с набережной, Голосеевский — зеленый район с парками и озерами, Дарница — динамичный левый берег. Независимо от того, ищете ли вы квартиру для отдыха, работы или проживания, у нас есть варианты для любых потребностей.",
    seoTitle3: "Как выбрать квартиру посуточно в Киеве",
    seoContent3: "При выборе квартиры в Киеве обратите внимание на транспортную доступность, наличие метро рядом, инфраструктуру района. Наши фильтры помогут вам найти идеальный вариант по цене, количеству комнат, площади и дополнительным удобствам. Все квартиры на сайте — от собственников, что гарантирует отсутствие комиссий и посредников.",
    seoTitle4: "Аренда квартиры в Киеве для туристов",
    seoContent4: "Для туристов лучше всего подходят квартиры в центре города или возле станций метро. Это позволяет быстро добраться до главных достопримечательностей: Крещатика, Майдана Независимости, Андреевского спуска, Киево-Печерской лавры. Выбирайте квартиру с удобным расположением и наслаждайтесь пребыванием в Киеве.",
    seoTitle5: "Долгосрочная аренда квартир в Киеве",
    seoContent5: "Планируете остаться в Киеве надолго? У нас есть предложения для долгосрочной аренды. Такие квартиры часто имеют более низкую цену за сутки при длительном бронировании. Свяжитесь с владельцем напрямую через наш сайт и договоритесь об индивидуальных условиях.",
    cities: {
      'Київ': 'Киев',
      'Харків': 'Харьков',
      'Дніпро': 'Днепр',
      'Одеса': 'Одесса',
      'Львів': 'Львов',
      'Запоріжжя': 'Запорожье',
      'Вінниця': 'Винница',
      'Чернігів': 'Чернигов',
      'Черкаси': 'Черкассы',
      'Кропивницький': 'Кропивницкий',
      'Тернопіль': 'Тернополь',
      'Івано-Франківськ': 'Ивано-Франковск',
      'Луцьк': 'Луцк',
      'Рівне': 'Ровно',
      'Хмельницький': 'Хмельницкий',
      'Чернівці': 'Черновцы',
      'Житомир': 'Житомир',
      'Суми': 'Сумы',
      'Миколаїв': 'Николаев',
      'Херсон': 'Херсон',
      'Полтава': 'Полтава',
      'Ужгород': 'Ужгород',
      'Крим': 'Крым',
      'Донецьк': 'Донецк',
      'Луганськ': 'Луганск',
    }
  }
};

// Функция для нормализации названия города
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

// Функция для проверки, относится ли город к выбранному фильтру
const isCityMatch = (apartmentCity, filterCity) => {
  if (!filterCity) return true; // Если город не выбран - показываем все
  if (!apartmentCity) return false;
  
  const aptCity = apartmentCity || '';
  const normalizedFilter = normalizeCityName(filterCity);
  const normalizedApt = normalizeCityName(aptCity);
  
  // Прямое совпадение
  if (normalizedApt === normalizedFilter) return true;
  
  // Город содержит название (например "Київ, Київська область")
  if (aptCity.toLowerCase().includes(normalizedFilter.toLowerCase())) return true;
  
  // Для Крыма - проверяем все крымские города
  if (normalizedFilter === 'Крим') {
    const crimeanCities = ['симферополь', 'севастополь', 'ялта', 'евпатория', 'керчь', 'феодосия'];
    const aptLower = aptCity.toLowerCase();
    return crimeanCities.some(city => aptLower.includes(city));
  }
  
  return false;
};

// Основной компонент контента
function KyivApartmentsContent({ apartments = [], totalCount = 0, initialFilter = {} }) {
  const { currentLanguage } = useLanguage();
  const t = TRANSLATIONS[currentLanguage];
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Создаем ref для компонента фильтров
  const filtersRef = useRef();
  
  const [isClient, setIsClient] = useState(false);
  // НОВЫЕ СОСТОЯНИЯ ДЛЯ ПАГИНАЦИИ
  const [visibleCount] = useState({
    mobile: 6,
    tablet: 9,
    desktop: 12
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Инициализируем фильтры с default values
  const defaultFilters = {
    priceRange: [300, 10000],
    rooms: '',
    guests: '',
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
    category: 'Квартира', // По умолчанию Квартира
    city: 'Київ', // По умолчанию Киев
    ...initialFilter
  };
  
  const [activeFilters, setActiveFilters] = useState(defaultFilters);
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [showAllDistricts, setShowAllDistricts] = useState(false);
  const [showAllMetro, setShowAllMetro] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  
  const [workingFilters, setWorkingFilters] = useState({});
  const [filterHistory, setFilterHistory] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // НОВЫЕ СОСТОЯНИЯ ДЛЯ АВТОРИЗАЦИИ
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { data: session } = useSession();

  // Флаг для предотвращения циклов
  const isResettingRef = useRef(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Получаем геолокацию пользователя
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUserLocation({ 
          lat: position.coords.latitude, 
          lng: position.coords.longitude 
        }),
        (error) => console.log('Geolocation not available')
      );
    }
  }, []);
  
  // Вычисляем реальные цены из квартир
  const priceStats = useMemo(() => {
    const prices = apartments.map(apt => Number(apt.price) || 0).filter(p => p > 0);
    if (prices.length === 0) {
      return { min: 300, max: 5000, avg: 1200 };
    }
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
    };
  }, [apartments]);

  // Динамические переводы с подстановкой города
  const getLocalizedText = (key) => {
    const text = t[key];
    if (!text) return '';
    
    // Получаем название города на нужном языке
    const cityKey = activeFilters.city || 'Київ';
    const cityName = t.cities?.[cityKey] || cityKey;
    
    return text.replace('{city}', cityName);
  };

  // Обновляем мета-опис с реальными ценами и городом
  const metaDescription = getLocalizedText('metaDescription')
    .replace('{totalCount}', totalCount)
    .replace('{minPrice}', priceStats.min);

  // Функция для получения уникального заголовка в зависимости от фильтров
  const getMetaTitle = () => {
    if (activeFilters.rooms === '1') {
      return `1-кімнатні квартири подобово в Києві | NaDoby`;
    }
    if (activeFilters.rooms === '2') {
      return `2-кімнатні квартири подобово в Києві | NaDoby`;
    }
    if (activeFilters.rooms === '3') {
      return `3-кімнатні квартири подобово в Києві | NaDoby`;
    }
    if (activeFilters.rooms === '4+') {
      return `4+ кімнатні квартири подобово в Києві | NaDoby`;
    }
    
    if (activeFilters.district) {
      const districtName = getDistrictName(activeFilters.district, currentLanguage);
      return `Квартири в районі ${districtName} подобово в Києві | NaDoby`;
    }
    
    if (activeFilters.metroStation) {
      return `Квартири біля метро ${activeFilters.metroStation} подобово в Києві | NaDoby`;
    }
    
    return getLocalizedText('metaTitle').replace('{totalCount}', totalCount).replace('{minPrice}', priceStats.min);
  };

  // Функция для получения уникального описания в зависимости от фильтров
  const getMetaDescription = () => {
    const baseDesc = `✅ Зняти квартиру подобово в Києві ✔️ ${filteredApartments.length} оголошень від власників ✔️ Ціни від ${priceStats.min} грн/доба`;
    
    if (activeFilters.rooms === '1') {
      return `✅ 1-кімнатні квартири подобово в Києві ✔️ ${filteredApartments.length} оголошень від власників ✔️ Ціни від ${priceStats.min} грн/доба`;
    }
    if (activeFilters.rooms === '2') {
      return `✅ 2-кімнатні квартири подобово в Києві ✔️ ${filteredApartments.length} оголошень від власників ✔️ Ціни від ${priceStats.min} грн/доба`;
    }
    if (activeFilters.rooms === '3') {
      return `✅ 3-кімнатні квартири подобово в Києві ✔️ ${filteredApartments.length} оголошень від власників ✔️ Ціни від ${priceStats.min} грн/доба`;
    }
    if (activeFilters.rooms === '4+') {
      return `✅ 4+ кімнатні квартири подобово в Києві ✔️ ${filteredApartments.length} оголошень від власників ✔️ Ціни від ${priceStats.min} грн/доба`;
    }
    
    if (activeFilters.district) {
      const districtName = getDistrictName(activeFilters.district, currentLanguage);
      return `✅ Квартири в районі ${districtName} подобово в Києві ✔️ ${filteredApartments.length} оголошень від власників ✔️ Ціни від ${priceStats.min} грн/доба`;
    }
    
    if (activeFilters.metroStation) {
      return `✅ Квартири біля метро ${activeFilters.metroStation} подобово в Києві ✔️ ${filteredApartments.length} оголошень від власників ✔️ Ціни від ${priceStats.min} грн/доба`;
    }
    
    return baseDesc;
  };

  // Функция для получения canonical URL
  const getCanonicalUrl = () => {
    const params = new URLSearchParams();
    if (activeFilters.rooms) params.set('rooms', activeFilters.rooms);
    if (activeFilters.district) params.set('district', activeFilters.district);
    if (activeFilters.metroStation) params.set('metro', activeFilters.metroStation);
    
    const paramString = params.toString();
    return `https://nadoby.com.ua/kyiv-apartments${paramString ? `?${paramString}` : ''}`;
  };
  
  // ========== ФУНКЦИИ НОРМАЛИЗАЦИИ ==========

  const normalizeString = (str) => {
    if (!str) return '';
    return String(str).toLowerCase().trim().replace(/\s+/g, ' ');
  };

  const normalizeMetro = (station) => {
    if (!station) return '';
    
    const normalized = normalizeString(station);
    
    for (const [key, value] of Object.entries(METRO_NORMALIZATION)) {
      const normalizedKey = normalizeString(key);
      const normalizedValue = normalizeString(value);
      
      if (normalized === normalizedKey || normalized === normalizedValue) {
        return normalizeString(key);
      }
    }
    
    return normalized;
  };

  const normalizeBoolean = (value) => {
    if (value === undefined || value === null) return false;
    if (value === true || value === false) return value;
    if (typeof value === 'number') return value === 1;
    if (typeof value === 'string') {
      const lower = value.toLowerCase().trim();
      return lower === 'yes' || lower === 'так' || lower === 'да' || lower === 'true' || lower === '1';
    }
    return false;
  };

  const normalizeConvenience = (conv) => {
    if (!conv) return '';
    return String(conv).toLowerCase().trim().replace(/[^a-zа-яёїієґ0-9]/gi, '');
  };

  // ========== ФИЛЬТРАЦИЯ ==========
  const matchesFilters = (apartment, filters) => {
    // Город
    if (filters.city && !isCityMatch(apartment.city, filters.city)) {
      return false;
    }
    
    // Категория
    if (filters.category && filters.category !== '') {
      if (apartment.category !== filters.category) return false;
    }
    
    // Цена
    if (filters.priceRange && filters.priceRange.length === 2) {
      const price = Number(apartment.price) || 0;
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false;
    }
    
    // Комнаты
    if (filters.rooms) {
      const rooms = String(apartment.rooms || '');
      const filterValue = String(filters.rooms);
      
      if (filterValue === '4+' || filterValue === '6+') {
        const roomsNum = parseInt(rooms) || 0;
        const minRooms = filterValue === '4+' ? 4 : 6;
        if (roomsNum < minRooms) return false;
      } else {
        if (rooms !== filterValue && Number(rooms) !== Number(filterValue)) return false;
      }
    }
    
    // Гости
    if (filters.guests) {
      const beds = Number(apartment.beds) || 0;
      const filterValue = String(filters.guests);
      
      if (filterValue === '10+') {
        if (beds < 10) return false;
      } else {
        const guestValue = parseInt(filterValue);
        if (beds < guestValue) return false;
      }
    }
    
    // Площадь
    if (filters.areaRange && filters.areaRange.length === 2) {
      const size = Number(apartment.size) || 0;
      if (size < filters.areaRange[0] || size > filters.areaRange[1]) return false;
    }
    
    // Удобства
    if (filters.conveniences && filters.conveniences.length > 0) {
      const aptConveniences = apartment.conveniences || [];
      const normalizedFilters = filters.conveniences.map(conv => normalizeConvenience(conv));
      const normalizedApt = aptConveniences.map(conv => normalizeConvenience(conv));
      
      const allConveniencesMatch = normalizedFilters.every(conv => normalizedApt.includes(conv));
      if (!allConveniencesMatch) return false;
    }
    
    // Район
    if (filters.district && filters.district.trim() !== '') {
      if (apartment.district !== filters.district) return false;
    }
    
    // Метро
    if (filters.metroStation && filters.metroStation.trim() !== '') {
      const apartmentMetro = apartment.metro || '';
      const normalizedFilterMetro = normalizeMetro(filters.metroStation);
      const normalizedApartmentMetro = normalizeMetro(apartmentMetro);
      
      if (normalizedFilterMetro !== normalizedApartmentMetro) return false;
    }
    
    // Булевы фильтры
    if (filters.smoking && filters.smoking !== 'any') {
      const filterValue = filters.smoking === 'yes';
      if (normalizeBoolean(apartment.smoking) !== filterValue) return false;
    }
    
    if (filters.parties && filters.parties !== 'any') {
      const filterValue = filters.parties === 'yes';
      if (normalizeBoolean(apartment.parties) !== filterValue) return false;
    }
    
    if (filters.pets && filters.pets !== 'any') {
      const filterValue = filters.pets === 'yes';
      if (normalizeBoolean(apartment.pets) !== filterValue) return false;
    }
    
    if (filters.fullDay && filters.fullDay !== 'any') {
      const filterValue = filters.fullDay === 'yes';
      if (normalizeBoolean(apartment.fullDayCheckIn) !== filterValue) return false;
    }
    
    if (filters.reportDocs && filters.reportDocs !== 'any') {
      const filterValue = filters.reportDocs === 'yes';
      if (normalizeBoolean(apartment.reportDocs) !== filterValue) return false;
    }
    
    return true;
  };

  // Функция для подсчета квартир по комнатам - с учетом текущих фильтров города и категории
  const getRoomsCount = (roomsValue) => {
    // Создаем временные фильтры только для подсчета (без фильтра комнат)
    const tempFilters = { ...activeFilters };
    
    return apartments.filter(apt => {
      // Проверяем все активные фильтры кроме комнат
      const filtersWithoutRooms = { ...tempFilters };
      delete filtersWithoutRooms.rooms;
      
      if (!matchesFilters(apt, filtersWithoutRooms)) return false;
      
      // Затем проверяем конкретное значение комнат
      if (roomsValue === '4+') {
        return parseInt(apt.rooms) >= 4;
      } else {
        return apt.rooms?.toString() === roomsValue;
      }
    }).length;
  };

  // Функция для подсчета квартир по районам - с учетом текущих фильтров
  const getDistrictCount = (districtId) => {
    const tempFilters = { ...activeFilters };
    
    return apartments.filter(apt => {
      // Проверяем все активные фильтры кроме района
      const filtersWithoutDistrict = { ...tempFilters };
      delete filtersWithoutDistrict.district;
      
      if (!matchesFilters(apt, filtersWithoutDistrict)) return false;
      
      // Затем проверяем конкретный район
      return apt.district === districtId;
    }).length;
  };

  // Функция для подсчета квартир по метро - с учетом текущих фильтров
  const getMetroCount = (station) => {
    const tempFilters = { ...activeFilters };
    
    return apartments.filter(apt => {
      // Проверяем все активные фильтры кроме метро
      const filtersWithoutMetro = { ...tempFilters };
      delete filtersWithoutMetro.metroStation;
      
      if (!matchesFilters(apt, filtersWithoutMetro)) return false;
      
      // Затем проверяем конкретную станцию метро
      const aptMetro = apt.metro || '';
      if (aptMetro.toLowerCase().includes(station.toLowerCase())) return true;
      
      const normalizedUa = normalizeMetro(station);
      const normalizedApartment = normalizeMetro(aptMetro);
      return normalizedUa === normalizedApartment;
    }).length;
  };

  // НОВАЯ ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ КОЛИЧЕСТВА ЭЛЕМЕНТОВ НА СТРАНИЦУ
  const getItemsPerPage = useCallback(() => {
    if (isMobile) {
      return visibleCount.mobile;
    } else if (isTablet) {
      return visibleCount.tablet;
    } else {
      return visibleCount.desktop;
    }
  }, [isMobile, isTablet, visibleCount]);

  // Функция для подсчета совпадений по отдельным фильтрам
  const getFilterMatchCount = (filters) => {
    if (!filters || Object.keys(filters).length === 0) return {};
    
    const matches = {};
    
    Object.keys(filters).forEach(key => {
      if (key === 'sortBy') return;
      
      if (key === 'priceRange' && filters.priceRange) {
        matches.price = apartments.filter(apt => {
          const price = Number(apt.price) || 0;
          return price >= filters.priceRange[0] && price <= filters.priceRange[1];
        }).length;
      }
      else if (key === 'rooms' && filters.rooms) {
        const filterValue = String(filters.rooms);
        
        matches.rooms = apartments.filter(apt => {
          const rooms = String(apt.rooms || '');
          
          if (filterValue === '4+' || filterValue === '6+') {
            const roomsNum = parseInt(rooms) || 0;
            const minRooms = filterValue === '4+' ? 4 : 6;
            return roomsNum >= minRooms;
          } else {
            return rooms === filterValue || Number(rooms) === Number(filterValue);
          }
        }).length;
      }
      else if (key === 'guests' && filters.guests) {
        const filterValue = String(filters.guests);
        
        matches.guests = apartments.filter(apt => {
          const beds = Number(apt.beds) || 0;
          
          if (filterValue === '10+') {
            return beds >= 10;
          } else {
            const guestValue = parseInt(filterValue);
            return beds >= guestValue;
          }
        }).length;
      }
      else if (key === 'areaRange' && filters.areaRange) {
        matches.area = apartments.filter(apt => {
          const size = Number(apt.size) || 0;
          return size >= filters.areaRange[0] && size <= filters.areaRange[1];
        }).length;
      }
      else if (key === 'district' && filters.district) {
        matches.district = apartments.filter(apt => {
          return apt.district === filters.district;
        }).length;
      }
      else if (key === 'metroStation' && filters.metroStation) {
        const normalizedFilterMetro = normalizeMetro(filters.metroStation);
        
        matches.metro = apartments.filter(apt => {
          const aptMetro = apt.metro || '';
          const normalizedApartmentMetro = normalizeMetro(aptMetro);
          return normalizedFilterMetro === normalizedApartmentMetro;
        }).length;
      }
      else if (key === 'conveniences' && filters.conveniences?.length > 0) {
        filters.conveniences.forEach((conv) => {
          const normalizedConv = normalizeConvenience(conv);
          
          const matchCount = apartments.filter(apt => {
            const aptConveniences = apt.conveniences || [];
            const normalizedApt = aptConveniences.map(c => normalizeConvenience(c));
            return normalizedApt.includes(normalizedConv);
          }).length;
          
          matches[`conv_${conv}`] = {
            count: matchCount,
            id: conv,
            label: conv
          };
        });
      }
      else if (['smoking', 'parties', 'pets', 'fullDay', 'reportDocs', 'city', 'category'].includes(key) && filters[key] !== 'any') {
        // Для города и категории проверяем наличие
        if (key === 'city') {
          matches.city = apartments.filter(apt => isCityMatch(apt.city, filters.city)).length;
        } else if (key === 'category') {
          matches.category = apartments.filter(apt => apt.category === filters.category).length;
        } else {
          const filterValue = filters[key] === 'yes';
          
          matches[key] = apartments.filter(apt => {
            let apartmentValue;
            
            if (key === 'fullDay') {
              apartmentValue = apt.fullDayCheckIn;
            } else {
              apartmentValue = apt[key];
            }
            
            return normalizeBoolean(apartmentValue) === filterValue;
          }).length;
        }
      }
    });
    
    return matches;
  };

  const applyFilters = (results, filters) => {
    if (!results || !results.length) return [];
    
    const filtered = results.filter(apt => matchesFilters(apt, filters));
    
    if (filters.sortBy && filters.sortBy !== 'recommended' && filtered.length > 0) {
      filtered.sort((a, b) => {
        const priceA = Number(a.price) || 0;
        const priceB = Number(b.price) || 0;
        return filters.sortBy === 'priceAsc' ? priceA - priceB : priceB - priceA;
      });
    }
    
    return filtered;
  };

  // ========== ФУНКЦИЯ ДЛЯ ОБНОВЛЕНИЯ ИСТОРИИ ==========
  const updateFilterHistory = (newFilters, oldFilters) => {
    const newHistory = [...filterHistory];
    
    Object.keys(newFilters).forEach(key => {
      if (key === 'sortBy' || key === 'city' || key === 'category') return;
      
      const oldValue = oldFilters[key];
      const newValue = newFilters[key];
      
      // Для удобств - особая обработка
      if (key === 'conveniences') {
        const oldConvs = oldValue || [];
        const newConvs = newValue || [];
        
        // Если появились новые удобства
        if (newConvs.length > 0 && !newHistory.includes('conveniences')) {
          newHistory.push('conveniences');
          console.log(`✅ Добавлен в историю: conveniences`);
        }
        
        // Если все удобства убрали
        if (newConvs.length === 0 && newHistory.includes('conveniences')) {
          const index = newHistory.indexOf('conveniences');
          newHistory.splice(index, 1);
          console.log(`❌ Удален из истории: conveniences`);
        }
        
        return;
      }
      
      // Проверяем, был ли фильтр пустым и стал непустым
      const wasEmpty = !oldValue || 
        (Array.isArray(oldValue) && oldValue.length === 0) || 
        oldValue === '' || 
        oldValue === 'any';
        
      const isNotEmpty = newValue && 
        (!Array.isArray(newValue) || newValue.length > 0) && 
        newValue !== '' && 
        newValue !== 'any';
      
      // Добавляем в историю ВСЕ фильтры, которые стали непустыми
      if (wasEmpty && isNotEmpty && !newHistory.includes(key)) {
        newHistory.push(key);
        console.log(`✅ Добавлен в историю: ${key}`);
      }
      
      // Удаляем из истории, если фильтр сброшен
      if (!isNotEmpty && newHistory.includes(key)) {
        const index = newHistory.indexOf(key);
        newHistory.splice(index, 1);
        console.log(`❌ Удален из истории: ${key}`);
      }
    });
    
    console.log('📋 Итоговая история:', newHistory);
    setFilterHistory(newHistory);
    return newHistory;
  };

  // ========== ОСНОВНАЯ ФУНКЦИЯ ОБРАБОТКИ ФИЛЬТРОВ ==========
  const handleFilterChange = useCallback((newFilters) => {
    // Предотвращаем циклы при сбросе
    if (isResettingRef.current) {
      console.log('⚠️ Пропускаем handleFilterChange из-за isResettingRef');
      return;
    }
    
    console.log('📊 НОВЫЕ ФИЛЬТРЫ:', newFilters);
    
    // Обновляем историю выбора фильтров
    const history = updateFilterHistory(newFilters, activeFilters);
    console.log('📊 История выбора (все фильтры):', history);
    
    // Применяем все фильтры и получаем общий результат
    const filtered = applyFilters(apartments, newFilters);
    console.log('📊 Отфильтровано результатов:', filtered.length);
    
    // Определяем, какие фильтры работают
    const working = {};
    
    // Получаем ВСЕ активные фильтры (которые реально выбраны и имеют значения)
    const allActiveFilters = Object.keys(newFilters).filter(key => {
      if (key === 'sortBy') return false;
      
      const value = newFilters[key];
      // Проверяем, что фильтр действительно активен
      const isActive = value && 
        (!Array.isArray(value) || value.length > 0) && 
        value !== '' && 
        value !== 'any';
      
      return isActive;
    });
    
    console.log('📊 Все активные фильтры:', allActiveFilters);
    
    // Если есть результаты - все фильтры зеленые
    if (filtered.length > 0) {
      allActiveFilters.forEach(key => {
        if (key === 'conveniences') {
          newFilters.conveniences.forEach(conv => {
            working[`conv_${conv}`] = true;
          });
        } else {
          working[key] = true;
        }
      });
      
      if (newFilters.city) {
        working.city = true;
      }
      
      if (newFilters.category && newFilters.category !== '') {
        working.category = true;
      }
      
      console.log('📊 Работающие фильтры (есть результаты):', working);
      setWorkingFilters(working);
      setActiveFilters(newFilters);
      setFilteredApartments(filtered);
      setCurrentPage(1); // Сбрасываем на первую страницу при изменении фильтров
      return;
    }
    
    // ЕСЛИ РЕЗУЛЬТАТОВ НЕТ - ИЩЕМ СЛОМАННЫЙ ФИЛЬТР
    console.log('🔍 Поиск сломанного фильтра...');
    
    // Создаем массив всех фильтров в порядке истории
    const allFiltersInOrder = [];
    
    // Сначала добавляем все фильтры из истории
    history.forEach(item => {
      if (item === 'conveniences') {
        if (newFilters.conveniences && newFilters.conveniences.length > 0) {
          allFiltersInOrder.push('conveniences');
        }
      } else if (allActiveFilters.includes(item)) {
        allFiltersInOrder.push(item);
      }
    });
    
    // Добавляем остальные фильтры, которых нет в истории
    allActiveFilters.forEach(filter => {
      if (!allFiltersInOrder.includes(filter) && filter !== 'conveniences' && filter !== 'city' && filter !== 'category') {
        allFiltersInOrder.push(filter);
      }
    });
    
    console.log('📊 Проверяем в порядке выбора:', allFiltersInOrder);
    
    // Находим первый фильтр, который "ломает" выдачу
    let brokenFilter = null;
    let brokenIndex = -1;
    let filtersToTest = {};
    
    // Добавляем город и категорию, если они есть
    if (newFilters.city) {
      filtersToTest.city = newFilters.city;
    }
    
    if (newFilters.category && newFilters.category !== '') {
      filtersToTest.category = newFilters.category;
    }
    
    // Проверяем пользовательские фильтры по одному в порядке выбора
    for (let i = 0; i < allFiltersInOrder.length; i++) {
      const key = allFiltersInOrder[i];
      
      if (key === 'conveniences') {
        // Добавляем все удобства
        filtersToTest.conveniences = newFilters.conveniences;
      } else {
        // Добавляем обычный фильтр
        filtersToTest[key] = newFilters[key];
      }
      
      // Проверяем, есть ли результаты с текущим набором
      const testResults = applyFilters(apartments, filtersToTest);
      console.log(`📊 После добавления ${key}: ${testResults.length} результатов`);
      
      if (testResults.length === 0) {
        // Этот фильтр сломал выдачу
        brokenFilter = key;
        brokenIndex = i;
        console.log(`🔴 Сломанный фильтр: ${key}`);
        break;
      }
    }
    
    // Устанавливаем статусы для всех фильтров - проверяем каждый отдельно
    allActiveFilters.forEach((key) => {
      if (key === 'conveniences') {
        if (newFilters.conveniences && newFilters.conveniences.length > 0) {
          newFilters.conveniences.forEach(conv => {
            // Создаем копию всех фильтров, но без этого конкретного удобства
            const testFilters = { 
              ...newFilters,
              conveniences: newFilters.conveniences.filter(c => c !== conv)
            };
            if (testFilters.sortBy) delete testFilters.sortBy;
            
            const result = applyFilters(apartments, testFilters);
            // Если без этого удобства есть результаты - значит оно "ломает" выдачу
            working[`conv_${conv}`] = result.length === 0;
          });
        }
      } else if (key !== 'sortBy' && key !== 'city' && key !== 'category') {
        // Создаем копию всех фильтров, но без этого конкретного фильтра
        const testFilters = { ...newFilters };
        delete testFilters[key];
        if (testFilters.sortBy) delete testFilters.sortBy;
        
        const result = applyFilters(apartments, testFilters);
        // Если без этого фильтра есть результаты - значит он "ломает" выдачу
        working[key] = result.length === 0;
      }
    });
    
    // Город и категория - базовые фильтры, они всегда зеленые
    if (newFilters.city) {
      working.city = true;
    }
    
    if (newFilters.category && newFilters.category !== '') {
      working.category = true;
    }
    
    console.log('📊 Итоговые работающие фильтры:', working);
    
    setWorkingFilters(working);
    setActiveFilters(newFilters);
    setFilteredApartments(filtered);
    setCurrentPage(1); // Сбрасываем на первую страницу при изменении фильтров
  }, [apartments, activeFilters, filterHistory]);

  // Функция для сброса ВСЕХ фильтров
  const handleResetAllFilters = useCallback(() => {
    // Предотвращаем множественные вызовы
    if (isResettingRef.current) {
      console.log('⚠️ Сброс уже выполняется, пропускаем');
      return;
    }
    
    isResettingRef.current = true;
    console.log('🧹 handleResetAllFilters ВЫЗВАН');
    
    // Создаем пустые фильтры
    const emptyFilters = { 
      priceRange: [300, 10000],
      rooms: '',
      guests: '',
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
      city: 'Київ' 
    };
    
    console.log('🧹 emptyFilters:', emptyFilters);
    
    // Применяем фильтры к ИСХОДНЫМ квартирам
    const allApartments = applyFilters(apartments, emptyFilters);
    console.log(`🧹 После сброса: ${allApartments.length} квартир`);
    
    setActiveFilters(emptyFilters);
    setWorkingFilters({});
    setFilterHistory([]);
    setFilteredApartments(allApartments);
    setCurrentPage(1);

    // Синхронизируем состояние с компонентом фильтров в правом меню
    if (filtersRef.current && filtersRef.current.syncFilters) {
      console.log('🧹 Синхронизируем фильтры в правом меню');
      filtersRef.current.syncFilters(emptyFilters);
    }
    
    // Обновляем URL, убирая все параметры
    setTimeout(() => {
      router.push('/kyiv-apartments', undefined, { shallow: true });
    }, 100);
    
    setSnackbar({
      open: true,
      message: currentLanguage === 'ua' ? 'Всі фільтри скинуто' : 'Все фильтры сброшены',
      severity: 'success'
    });
    
    // Сбрасываем флаг через небольшую задержку
    setTimeout(() => {
      isResettingRef.current = false;
      console.log('🧹 Флаг сброса снят');
    }, 300);
  }, [apartments, router, currentLanguage]);

  // НОВАЯ ФУНКЦИЯ ДЛЯ КНОПКИ "ПОКАЗАТЬ ЕЩЕ"
  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    
    // Имитация загрузки
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setIsLoadingMore(false);
    }, 500);
  }, []);

  // НОВАЯ ФУНКЦИЯ ДЛЯ КНОПКИ +
  const handleAddApartmentClick = useCallback((e) => {
    e.stopPropagation();
    
    // Проверяем авторизацию
    const userProfile = localStorage.getItem('user_profile');
    const isAuthenticated = session || userProfile;
    
    if (isAuthenticated) {
      // Если авторизован - переходим на страницу добавления
      window.location.href = 'https://nadoby.com.ua/add-apartment';
    } else {
      // Если не авторизован - показываем окно регистрации
      setOpenAuthModal(true);
      setShowAlert(true);
    }
  }, [session]);

  const handleCloseAuthModal = useCallback(() => {
    setOpenAuthModal(false);
    setShowAlert(false);
  }, []);

  // Применяем фильтры по умолчанию при загрузке и устанавливаем статусы
  useEffect(() => {
    if (apartments.length > 0) {
      console.log('🏠 Применяем фильтры по умолчанию:', defaultFilters);
      const filtered = applyFilters(apartments, defaultFilters);
      console.log(`🏠 Найдено квартир по умолчанию: ${filtered.length}`);
      setFilteredApartments(filtered);
      setActiveFilters(defaultFilters);
      
      // Вызываем handleFilterChange для установки правильных статусов фильтров
      setTimeout(() => {
        handleFilterChange(defaultFilters);
      }, 100);
    }
  }, [apartments]);

  // Функция для обработки клика по фильтру комнат
  const handleRoomsFilter = (roomsValue) => {
    if (isResettingRef.current) return;
    
    let newFilters = { ...activeFilters };
    
    if (activeFilters.rooms === roomsValue) {
      delete newFilters.rooms;
      // Убираем параметр из URL
      const { rooms, ...restQuery } = router.query;
      router.push({
        pathname: '/kyiv-apartments',
        query: restQuery
      }, undefined, { shallow: true });
      console.log('🖱️ Убираем фильтр комнат');
    } else {
      newFilters.rooms = roomsValue;
      // Добавляем параметр в URL
      router.push({
        pathname: '/kyiv-apartments',
        query: { ...router.query, rooms: roomsValue }
      }, undefined, { shallow: true });
      console.log(`🖱️ Устанавливаем фильтр комнат: ${roomsValue}`);
    }
    
    handleFilterChange(newFilters);
  };

  // Функция для обработки клика по району
  const handleDistrictFilter = (districtId) => {
    if (isResettingRef.current) return;
    
    const newFilters = { ...activeFilters };
    
    if (activeFilters.district === districtId) {
      delete newFilters.district;
      // Убираем параметр из URL
      const { district, ...restQuery } = router.query;
      router.push({
        pathname: '/kyiv-apartments',
        query: restQuery
      }, undefined, { shallow: true });
      console.log('🖱️ Убираем фильтр района');
    } else {
      newFilters.district = districtId;
      // Добавляем параметр в URL
      router.push({
        pathname: '/kyiv-apartments',
        query: { ...router.query, district: districtId }
      }, undefined, { shallow: true });
      console.log(`🖱️ Устанавливаем фильтр района: ${districtId}`);
    }
    
    handleFilterChange(newFilters);
  };

  // Функция для обработки клика по метро
  const handleMetroFilter = (station) => {
    if (isResettingRef.current) return;
    
    const newFilters = { ...activeFilters };
    
    if (activeFilters.metroStation === station) {
      delete newFilters.metroStation;
      // Убираем параметр из URL
      const { metro, ...restQuery } = router.query;
      router.push({
        pathname: '/kyiv-apartments',
        query: restQuery
      }, undefined, { shallow: true });
      console.log('🖱️ Убираем фильтр метро');
    } else {
      newFilters.metroStation = station;
      // Добавляем параметр в URL
      router.push({
        pathname: '/kyiv-apartments',
        query: { ...router.query, metro: station }
      }, undefined, { shallow: true });
      console.log(`🖱️ Устанавливаем фильтр метро: ${station}`);
    }
    
    handleFilterChange(newFilters);
  };





  // Чтение параметров из URL при загрузке
  useEffect(() => {
    const { rooms, district, metro } = router.query;
    const urlFilters = { ...activeFilters };
    
    if (rooms) {
      urlFilters.rooms = rooms;
    }
    
    if (district) {
      urlFilters.district = district;
    }
    
    if (metro) {
      urlFilters.metroStation = decodeURIComponent(metro);
    }
    
    // Проверяем, есть ли изменения
    if (rooms !== activeFilters.rooms || 
        district !== activeFilters.district || 
        metro !== activeFilters.metroStation) {
      handleFilterChange(urlFilters);
    }
  }, [router.query]);

  // НОВЫЕ ВЫЧИСЛЕНИЯ ДЛЯ ПАГИНАЦИИ
  const itemsPerPage = getItemsPerPage();
  const totalVisible = currentPage * itemsPerPage;
  const displayedApartments = filteredApartments.slice(0, totalVisible);
  const hasMoreToShow = displayedApartments.length < filteredApartments.length;
  const remainingCount = filteredApartments.length - displayedApartments.length;

  // Определяем количество элементов для отображения
  const getDisplayCount = (type) => {
    if (isMobile) return DISPLAY_COUNTS.mobile[type];
    if (isTablet) return DISPLAY_COUNTS.tablet[type];
    return DISPLAY_COUNTS.desktop[type];
  };

  // Структурированные данные для Schema.org
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": getMetaTitle(),
        "description": getMetaDescription(),
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "UAH",
          "lowPrice": priceStats.min,
          "highPrice": priceStats.max,
          "offerCount": totalCount
        }
      }
    ]
  };

  // Фильтры комнат
  const roomFilters = [
    { slug: '1-komnata', name: t.filter1komn, rooms: '1' },
    { slug: '2-komnaty', name: t.filter2komn, rooms: '2' },
    { slug: '3-komnaty', name: t.filter3komn, rooms: '3' },
    { slug: '4-plus', name: t.filter4plus, rooms: '4+' }
  ];

  // Районы Киева с правильными названиями на текущем языке
  const cityDistricts = DISTRICTS_DATA.kyiv[currentLanguage] || [];
  const allDistricts = cityDistricts;
  const displayedDistricts = showAllDistricts ? allDistricts : allDistricts.slice(0, getDisplayCount('districts'));

  // Станции метро для отображения (для популярных фильтров)
  const metroStationsForDisplay = {
    'Київ': [
      'Академмістечко', 'Житомирська', 'Святошин', 'Нивки', 'Берестейська', 'Шулявська',
      'Політехнічний інститут', 'Вокзальна', 'Університет', 'Театральна', 'Хрещатик', 'Арсенальна',
      'Дніпро', 'Гідропарк', 'Лівобережна', 'Дарниця', 'Чернігівська', 'Лісова', 'Героїв Дніпра',
      'Мінська', 'Оболонь', 'Поштова площа', 'Контрактова площа', 'Тараса Шевченка', 'Лук’янівська',
      'Дорогожичі', 'Сирець', 'Золоті ворота', 'Палац спорту', 'Олімпійська', 'Палац «Україна»',
      'Либідська', 'Деміївська', 'Голосіївська', 'Васильківська', 'Виставковий центр', 'Іподром',
      'Теремки', 'Кловська', 'Печерська', 'Видубичі', 'Славутич', 'Осокорки',
      'Позняки',  'Почайна/Петрівка','Харківська', 'Вирлиця', 'Бориспільська', 'Червоний хутір', 
      'Майдан Незалежності', 'Площа Українських Героїв/Льва Толстого', 'Зверинецька/Дружби Народів',
    ],
    'ru': [
      'Академгородок', 'Житомирская', 'Святошин', 'Нивки', 'Берестейская', 'Шулявская',
      'Политехнический институт', 'Вокзальная', 'Университет', 'Театральная', 'Крещатик', 'Арсенальная',
      'Днепр', 'Гидропарк', 'Левобережная', 'Дарница', 'Черниговская', 'Лесная', 'Героев Днепра',
      'Минская', 'Оболонь', 'Почтовая площадь', 'Контрактовая площадь', 'Тараса Шевченко', 'Лукьяновская',
      'Дорогожичи', 'Сырец', 'Золотые ворота', 'Дворец спорта', 'Олимпийская', 'Дворец «Украина»',
      'Лыбедская', 'Демиевская', 'Голосеевская', 'Васильковская', 'Выставочный центр', 'Ипподром',
      'Теремки', 'Кловская', 'Печерская', 'Зверинецкая', 'Выдубичи', 'Славутич', 'Осокорки',
      'Позняки', 'Почайна/Петровка','Харьковская', 'Вырлица', 'Бориспольская', 'Красный хутор', 
      'Майдан Независимости', 'Площадь Украинских Героев/Льва Толстого', 'Зверинецкая/Дружбы Народов',
    ]
  };
  
  const displayedMetro = showAllMetro 
    ? metroStationsForDisplay[currentLanguage === 'ua' ? 'Київ' : 'ru'] 
    : metroStationsForDisplay[currentLanguage === 'ua' ? 'Київ' : 'ru'].slice(0, getDisplayCount('metro'));

  // Получаем совпадения для активных фильтров
  const filterMatches = getFilterMatchCount(activeFilters);
  const hasActiveFilters = Object.keys(activeFilters).length > 0 && 
    Object.keys(activeFilters).some(key => {
      if (key === 'sortBy') return false;
      if (key === 'priceRange') return activeFilters.priceRange && (activeFilters.priceRange[0] > 300 || activeFilters.priceRange[1] < 10000);
      if (key === 'areaRange') return activeFilters.areaRange && (activeFilters.areaRange[0] > 0 || activeFilters.areaRange[1] < 500);
      if (key === 'conveniences') return activeFilters.conveniences && activeFilters.conveniences.length > 0;
      if (key === 'guests') return activeFilters.guests && activeFilters.guests !== '';
      if (key === 'rooms') return activeFilters.rooms && activeFilters.rooms !== '';
      if (key === 'district') return activeFilters.district && activeFilters.district.trim() !== '';
      if (key === 'metroStation') return activeFilters.metroStation && activeFilters.metroStation.trim() !== '';
      if (['smoking', 'parties', 'pets', 'fullDay', 'reportDocs'].includes(key)) {
        return activeFilters[key] && activeFilters[key] !== 'any';
      }
      if (key === 'category') return activeFilters.category && activeFilters.category !== '';
      if (key === 'city') return activeFilters.city && activeFilters.city !== 'Київ';
      return false;
    });

  // Скелетон при загрузке
  if (!isClient) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="text" width="60%" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>{getMetaTitle()}</title>
        <meta name="description" content={getMetaDescription()} />
        <meta name="keywords" content={getLocalizedText('metaKeywords')} />
        <link rel="canonical" href={getCanonicalUrl()} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={getCanonicalUrl()} />
        <meta property="og:title" content={getMetaTitle()} />
        <meta property="og:description" content={getMetaDescription()} />
        <meta property="og:locale" content={currentLanguage === 'ua' ? 'uk_UA' : 'ru_RU'} />
        <link rel="alternate" href="https://nadoby.com.ua/kyiv-apartments" hreflang="ru" />
        <link rel="alternate" href="https://nadoby.com.ua/ua/kyiv-apartments" hreflang="uk" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <Box component="main" sx={{ minHeight: '100vh', backgroundColor: '#fafafa', position: 'relative' }}>
        {/* Кнопка для добавления объявления - с проверкой авторизации */}
        <Zoom in={true}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleAddApartmentClick}
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              zIndex: 1000,
              boxShadow: 3
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>

        {/* Кнопка для открытия карты на мобильных */}
        {isMobile && filteredApartments.length > 0 && (
          <Zoom in={true}>
            <Fab
              color="secondary"
              aria-label="map"
              onClick={() => setMapOpen(true)}
              sx={{
                position: 'fixed',
                bottom: 20,
                left: 20,
                zIndex: 1000,
                boxShadow: 3
              }}
            >
              <MapIcon />
            </Fab>
          </Zoom>
        )}

        <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
          
          {/* Хлебные крошки */}
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: { xs: 2, md: 3 } }}>
            <Link href="/" passHref legacyBehavior>
              <a style={{ textDecoration: 'none' }}>
                <Typography color="inherit" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                  {t.breadcrumbHome}
                </Typography>
              </a>
            </Link>
            <Typography color="text.primary">{t.breadcrumbCurrent}</Typography>
          </Breadcrumbs>

          {/* H1 с динамическим городом */}
          <Typography variant="h1" sx={{ 
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
            fontWeight: 700,
            mb: { xs: 1, md: 2 },
            textAlign: { xs: 'left', md: 'center' }
          }}>
            {getLocalizedText('h1')}
          </Typography>

          {/* Блок "Знайдено: X варіантів" */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2 
          }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {t.found}: {filteredApartments.length} {t.variants}
            </Typography>
            
            {/* Показываем выбранный город и категорию */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {activeFilters.city && (
                <Chip 
                  label={t.cities?.[activeFilters.city] || activeFilters.city}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              )}
              {activeFilters.category && activeFilters.category !== '' && (
                <Chip 
                  label={activeFilters.category}
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>

          {/* СТАТИСТИКА АКТИВНЫХ ФИЛЬТРОВ */}
          {hasActiveFilters && Object.keys(filterMatches).length > 0 && (
            <Paper sx={{ p: 2, mb: 3, bgcolor: '#f5f5f5' }}>
              <Typography variant="subtitle2" gutterBottom>
                {t.activeFilters}:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {/* Город */}
                {activeFilters.city && filterMatches.city !== undefined && (
                  <Tooltip title={`${t.filterMatches} ${t.city.toLowerCase()}: ${filterMatches.city} ${t.outOf} ${apartments.length}`}>
                    <Chip
                      icon={workingFilters.city ? <CheckCircleIcon /> : <CancelIcon />}
                      label={t.cities?.[activeFilters.city] || activeFilters.city}
                      color={workingFilters.city ? "success" : "error"}
                      variant={workingFilters.city ? "filled" : "outlined"}
                      size="small"
                    />
                  </Tooltip>
                )}
                
                {/* Категория */}
                {activeFilters.category && activeFilters.category !== '' && filterMatches.category !== undefined && (
                  <Tooltip title={`${t.filterMatches} ${t.category.toLowerCase()}: ${filterMatches.category} ${t.outOf} ${apartments.length}`}>
                    <Chip
                      icon={workingFilters.category ? <CheckCircleIcon /> : <CancelIcon />}
                      label={activeFilters.category}
                      color={workingFilters.category ? "success" : "error"}
                      variant={workingFilters.category ? "filled" : "outlined"}
                      size="small"
                    />
                  </Tooltip>
                )}
                
                {/* Цена */}
                {filterMatches.price !== undefined && (
                  <Tooltip title={`${t.filterMatches} ціни: ${filterMatches.price} ${t.outOf} ${apartments.length}`}>
                    <Chip
                      icon={workingFilters.priceRange ? <CheckCircleIcon /> : <CancelIcon />}
                      label={`${t.price}: ${activeFilters.priceRange[0]}-${activeFilters.priceRange[1]} грн`}
                      color={workingFilters.priceRange ? "success" : "error"}
                      variant={workingFilters.priceRange ? "filled" : "outlined"}
                      size="small"
                    />
                  </Tooltip>
                )}
                
                {/* Комнаты */}
                {filterMatches.rooms !== undefined && (
                  <Tooltip title={`${t.filterMatches} кімнат: ${filterMatches.rooms} ${t.outOf} ${apartments.length}`}>
                    <Chip
                      icon={workingFilters.rooms ? <CheckCircleIcon /> : <CancelIcon />}
                      label={`${t.rooms}: ${activeFilters.rooms}`}
                      color={workingFilters.rooms ? "success" : "error"}
                      variant={workingFilters.rooms ? "filled" : "outlined"}
                      size="small"
                    />
                  </Tooltip>
                )}
                
                {/* Гости */}
                {filterMatches.guests !== undefined && (
                  <Tooltip title={`${t.filterMatches} гостей: ${filterMatches.guests} ${t.outOf} ${apartments.length}`}>
                    <Chip
                      icon={workingFilters.guests ? <CheckCircleIcon /> : <CancelIcon />}
                      label={`${t.guests}: ${activeFilters.guests}`}
                      color={workingFilters.guests ? "success" : "error"}
                      variant={workingFilters.guests ? "filled" : "outlined"}
                      size="small"
                    />
                  </Tooltip>
                )}
                
                {/* Площадь */}
                {filterMatches.area !== undefined && (
                  <Tooltip title={`${t.filterMatches} площі: ${filterMatches.area} ${t.outOf} ${apartments.length}`}>
                    <Chip
                      icon={workingFilters.areaRange ? <CheckCircleIcon /> : <CancelIcon />}
                      label={`${t.area}: ${activeFilters.areaRange[0]}-${activeFilters.areaRange[1]} м²`}
                      color={workingFilters.areaRange ? "success" : "error"}
                      variant={workingFilters.areaRange ? "filled" : "outlined"}
                      size="small"
                    />
                  </Tooltip>
                )}
                
                {/* Район */}
                {filterMatches.district !== undefined && (
                  <Tooltip title={`${t.filterMatches} району: ${filterMatches.district} ${t.outOf} ${apartments.length}`}>
                    <Chip
                      icon={workingFilters.district ? <CheckCircleIcon /> : <CancelIcon />}
                      label={`${t.district}: ${getDistrictName(activeFilters.district, currentLanguage)}`}
                      color={workingFilters.district ? "success" : "error"}
                      variant={workingFilters.district ? "filled" : "outlined"}
                      size="small"
                    />
                  </Tooltip>
                )}
                
                {/* Метро */}
                {filterMatches.metro !== undefined && (
                  <Tooltip title={`${t.filterMatches} метро: ${filterMatches.metro} ${t.outOf} ${apartments.length}`}>
                    <Chip
                      icon={workingFilters.metroStation ? <CheckCircleIcon /> : <CancelIcon />}
                      label={`${t.metro}: ${activeFilters.metroStation}`}
                      color={workingFilters.metroStation ? "success" : "error"}
                      variant={workingFilters.metroStation ? "filled" : "outlined"}
                      size="small"
                    />
                  </Tooltip>
                )}
                
                {/* Удобства */}
                {Object.keys(filterMatches).filter(key => key.startsWith('conv_')).map((key) => {
                  const match = filterMatches[key];
                  
                  // Переводим название удобства если нужно
                  const translatedLabel = currentLanguage === 'ua' 
                    ? match.label 
                    : CONVENIENCE_TRANSLATIONS[match.label] || match.label;
                  
                  return (
                    <Tooltip key={key} title={`${t.filterMatches}: ${match.count} ${t.outOf} ${apartments.length}`}>
                      <Chip
                        icon={workingFilters[key] ? <CheckCircleIcon /> : <CancelIcon />}
                        label={translatedLabel}
                        color={workingFilters[key] ? "success" : "error"}
                        variant={workingFilters[key] ? "filled" : "outlined"}
                        size="small"
                      />
                    </Tooltip>
                  );
                })}
                
                {/* Курение */}
                {filterMatches.smoking !== undefined && (
                  <Tooltip title={`${t.filterMatches} куріння: ${filterMatches.smoking} ${t.outOf} ${apartments.length}`}>
                    <Chip
                      icon={workingFilters.smoking ? <CheckCircleIcon /> : <CancelIcon />}
                      label={`${t.smoking}: ${activeFilters.smoking === 'yes' ? t.yes : t.no}`}
                      color={workingFilters.smoking ? "success" : "error"}
                      variant={workingFilters.smoking ? "filled" : "outlined"}
                      size="small"
                    />
                  </Tooltip>
                )}
                
                {/* Вечеринки */}
                {filterMatches.parties !== undefined && (
                  <Tooltip title={`${t.filterMatches} вечірок: ${filterMatches.parties} ${t.outOf} ${apartments.length}`}>
                    <Chip
                      icon={workingFilters.parties ? <CheckCircleIcon /> : <CancelIcon />}
                      label={`${t.parties}: ${activeFilters.parties === 'yes' ? t.yes : t.no}`}
                      color={workingFilters.parties ? "success" : "error"}
                      variant={workingFilters.parties ? "filled" : "outlined"}
                      size="small"
                    />
                  </Tooltip>
                )}
                
                {/* Животные */}
                {filterMatches.pets !== undefined && (
                  <Tooltip title={`${t.filterMatches} тварин: ${filterMatches.pets} ${t.outOf} ${apartments.length}`}>
                    <Chip
                      icon={workingFilters.pets ? <CheckCircleIcon /> : <CancelIcon />}
                      label={`${t.pets}: ${activeFilters.pets === 'yes' ? t.yes : t.no}`}
                      color={workingFilters.pets ? "success" : "error"}
                      variant={workingFilters.pets ? "filled" : "outlined"}
                      size="small"
                    />
                  </Tooltip>
                )}
                
                {/* Круглосуточно */}
                {filterMatches.fullDay !== undefined && (
                  <Tooltip title={`${t.filterMatches} цілодобово: ${filterMatches.fullDay} ${t.outOf} ${apartments.length}`}>
                    <Chip
                      icon={workingFilters.fullDay ? <CheckCircleIcon /> : <CancelIcon />}
                      label={`${t.fullDay}: ${activeFilters.fullDay === 'yes' ? t.yes : t.no}`}
                      color={workingFilters.fullDay ? "success" : "error"}
                      variant={workingFilters.fullDay ? "filled" : "outlined"}
                      size="small"
                    />
                  </Tooltip>
                )}
                
                {/* Отчетные документы */}
                {filterMatches.reportDocs !== undefined && (
                  <Tooltip title={`${t.filterMatches} звітних документів: ${filterMatches.reportDocs} ${t.outOf} ${apartments.length}`}>
                    <Chip
                      icon={workingFilters.reportDocs ? <CheckCircleIcon /> : <CancelIcon />}
                      label={`${t.reportDocs}: ${activeFilters.reportDocs === 'yes' ? t.yes : t.no}`}
                      color={workingFilters.reportDocs ? "success" : "error"}
                      variant={workingFilters.reportDocs ? "filled" : "outlined"}
                      size="small"
                    />
                  </Tooltip>
                )}
              </Box>
              
              {filteredApartments.length === 0 && (
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CancelIcon color="error" />
                  <Typography variant="body2" color="error">
                    {t.filtersIncompatible}
                  </Typography>
                </Box>
              )}
            </Paper>
          )}

          {/* КОМПОНЕНТ ФИЛЬТРОВ */}
          <Box sx={{ mb: 4 }}>
            <SearchApartmentFilters
              ref={filtersRef}
              apartments={apartments}
              onFilterChange={handleFilterChange}
              searchParams={{}}
              loading={false}
              totalResults={filteredApartments.length}
              currentCity={activeFilters.city || 'Київ'}
              filterStatus={workingFilters}
              onClearAll={handleResetAllFilters}
            />
          </Box>

          {/* Карта на десктопе и мобильных */}
          {filteredApartments.length > 0 && (
            <Box sx={{ mb: 4 }}>
              {/* Карта видна только на десктопе */}
              {!isMobile && (
                <Box sx={{ height: '200px', borderRadius: 2, overflow: 'hidden',
                 border: '1px solid #e0e0e0', mb: 2 }}>
                  <GoogleMapsProvider>
                    <MapComponent 
                      apartments={filteredApartments} 
                      onApartmentSelect={(apt) => router.push(`/apartment/${apt._id}`)} 
                      userLocation={userLocation} 
                      compactMode={true} 
                    />
                  </GoogleMapsProvider>
                </Box>
              )}
              
              {/* Кнопка "Показати на карті" видна на всех устройствах */}
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" startIcon={<MapIcon />} onClick={() => setMapOpen(true)}>
                  {t.viewOnMap}
                </Button>
              </Box>
            </Box>
          )}

          {/* Популярные фильтры (комнаты) - показываем только если выбран Киев */}
          {isKyiv(activeFilters.city) && (
            <>
              <Typography variant="h2" sx={{ fontSize: { xs: '1.35rem', sm: '1.6rem', md: '1.85rem' }, fontWeight: 600, mb: { xs: 2, md: 3 } }}>
                {t.popularFilters}
              </Typography>

              <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mb: { xs: 3, md: 5 } }}>
                {roomFilters.map((filter) => {
                  const count = getRoomsCount(filter.rooms);
                  const isActive = activeFilters.rooms === filter.rooms;
                  
                  return (
                    <Grid item xs={6} sm={4} md={3} key={filter.slug}>
                      <Paper 
                        onClick={() => handleRoomsFilter(filter.rooms)}
                        sx={{ 
                          p: { xs: 1.5, sm: 2 },
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          height: '100%',
                          bgcolor: isActive ? 'primary.main' : 'background.paper',
                          color: isActive ? 'white' : 'inherit',
                          border: isActive ? 'none' : '1px solid #e0e0e0',
                          '&:hover': { 
                            transform: 'translateY(-4px)', 
                            boxShadow: 6, 
                            bgcolor: isActive ? 'primary.dark' : 'primary.light',
                            color: 'white'
                          }
                        }}
                      >
                        <Typography variant="body1" fontWeight={500} sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                          {filter.name}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          fontSize: { xs: '0.7rem', sm: '0.8rem' },
                          color: isActive ? 'rgba(255,255,255,0.9)' : 'text.secondary'
                        }}>
                          {count} {t.count}
                        </Typography>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}

          {/* Районы Киева - показываем только если выбран Киев */}
          {isKyiv(activeFilters.city) && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between',
               alignItems: 'center', 
               mt: { xs: 6, md: 9 },
               mb: { xs: 2, md: 3 } }}>
                <Typography variant="h2" sx={{ fontSize: { xs: '1.35rem', 
                sm: '1.6rem', md: '1.85rem' }, fontWeight: 600 }}>
                  {t.districts}
                </Typography>
                {allDistricts.length > getDisplayCount('districts') && (
                  <Button 
                    size="small" 
                    onClick={() => setShowAllDistricts(!showAllDistricts)}
                    endIcon={showAllDistricts ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  >
                    {showAllDistricts ? t.showLess : t.showAll}
                  </Button>
                )}
              </Box>

              <Collapse in={true} timeout="auto">
                <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }} sx={{ mb: { xs: 3, md: 5 } }}>
                  {displayedDistricts.map((district) => {
                    const count = getDistrictCount(district.id);
                    const isActive = activeFilters.district === district.id;
                    
                    return (
                      <Grid item xs={6} sm={4} md={2.4} key={district.id}>
                        <Paper 
                          onClick={() => handleDistrictFilter(district.id)}
                          sx={{ 
                            p: { xs: 1, sm: 1.5 },
                            textAlign: 'center',
                            bgcolor: isActive ? 'primary.main' : '#f8f9fa',
                            color: isActive ? 'white' : 'inherit',
                            borderRadius: 2,
                            cursor: 'pointer',
                            border: isActive ? 'none' : '1px solid #e9ecef',
                            transition: 'all 0.2s ease',
                            '&:hover': { 
                              bgcolor: isActive ? 'primary.dark' : 'primary.light',
                              color: 'white'
                            }
                          }}
                        >
                          <Typography variant="body2" fontWeight={500}>
                            {district.name}
                          </Typography>
                          <Typography variant="caption" sx={{ 
                            fontSize: { xs: '0.6rem', sm: '0.7rem' },
                            color: isActive ? 'rgba(255,255,255,0.9)' : 'text.secondary'
                          }}>
                            {count} {t.count}
                          </Typography>
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
              </Collapse>
            </>
          )}

          {/* Станции метро - показываем только если выбран Киев */}
          {isKyiv(activeFilters.city) && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, md: 3 } }}>
                <Typography variant="h2" sx={{ fontSize: { xs: '1.35rem', sm: '1.6rem', md: '1.85rem' }, fontWeight: 600 }}>
                  {t.metro}
                </Typography>
                {metroStationsForDisplay[currentLanguage === 'ua' ? 'Київ' : 'ru'].length > getDisplayCount('metro') && (
                  <Button 
                    size="small" 
                    onClick={() => setShowAllMetro(!showAllMetro)}
                    endIcon={showAllMetro ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  >
                    {showAllMetro ? t.showLess : t.showAll}
                  </Button>
                )}
              </Box>

              <Box sx={{ mb: { xs: 3, md: 5 }, overflowX: 'auto', pb: 1 }}>
                <Box sx={{ 
                  display: 'flex', 
                  gap: { xs: 1, sm: 1.5 }, 
                  flexWrap: { xs: 'nowrap', md: 'wrap' },
                  minWidth: { xs: 'max-content', md: 'auto' }
                }}>
                  {displayedMetro.map((station) => {
                    const count = getMetroCount(station);
                    const isActive = activeFilters.metroStation === station;
                    
                    return (
                      <Chip 
                        key={station}
                        label={`м. ${station}`}
                        onClick={() => handleMetroFilter(station)}
                        clickable
                        sx={{ 
                          height: { xs: 36, sm: 40 },
                          backgroundColor: isActive ? 'primary.main' : '#f5f5f5',
                          color: isActive ? 'white' : 'inherit',
                          '& .MuiChip-label': {
                            fontSize: { xs: '0.75rem', sm: '0.85rem' }
                          },
                          '&:hover': { 
                            backgroundColor: isActive ? 'primary.dark' : 'primary.light',
                            color: 'white'
                          }
                        }}
                      />
                    );
                  })}
                </Box>
              </Box>
            </>
          )}

          {/* Список квартир */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, md: 3 } }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '1.35rem', sm: '1.6rem', md: '1.85rem' }, fontWeight: 600 }}>
              {t.newListings} ({filteredApartments.length})
            </Typography>
          </Box>

          {displayedApartments.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Warning sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {hasActiveFilters ? t.noApartments : t.noApartments}
              </Typography>
              {hasActiveFilters && (
                <>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {t.tryChanging}
                  </Typography>
                  <Button 
                    variant="contained" 
                    onClick={handleResetAllFilters}
                  >
                    {t.clearFilters}
                  </Button>
                </>
              )}
            </Box>
          ) : (
            <>
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }} sx={{ mb: 4 }}>
                {displayedApartments.map((apt) => (
                  <Grid item xs={12} sm={6} md={4} key={apt._id}>
                    <ApartmentCard apartment={apt} />
                  </Grid>
                ))}
              </Grid>

              {/* НОВАЯ КНОПКА "Показать еще" */}
              {hasMoreToShow && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 4 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    sx={{
                      minWidth: isMobile ? 200 : 300,
                      py: 1.5,
                      borderRadius: 2,
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                      }
                    }}
                  >
                    {isLoadingMore ? (
                      <CircularProgress size={24} sx={{ mr: 1 }} />
                    ) : (
                      <>
                        {currentLanguage === 'ua' ? 'Показати ще' : 'Показать еще'}
                        <Typography 
                          component="span" 
                          sx={{ 
                            ml: 1, 
                            bgcolor: 'primary.main', 
                            color: 'white',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: '0.8rem'
                          }}
                        >
                          +{Math.min(remainingCount, itemsPerPage)}
                        </Typography>
                      </>
                    )}
                  </Button>
                </Box>
              )}

              {/* Информация о количестве показанных объявлений */}
              <Box sx={{ textAlign: 'center', mt: 2, mb: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  {currentLanguage === 'ua' 
                    ? `Показано ${displayedApartments.length} з ${filteredApartments.length} оголошень`
                    : `Показано ${displayedApartments.length} из ${filteredApartments.length} объявлений`
                  }
                </Typography>
              </Box>
            </>
          )}

          {/* БЛОК ССЫЛОК НА СТРАНИЦЫ РАЙОНОВ */}
{isKyiv(activeFilters.city) && (
  <Box sx={{ mt: { xs: 4, md: 6 }, mb: { xs: 2, md: 3 } }}>
    <Typography variant="h2" sx={{ 
      fontSize: { xs: '1.35rem', sm: '1.6rem', md: '1.85rem' }, 
      fontWeight: 600, 
      mb: { xs: 2, md: 3 } 
    }}>
      {currentLanguage === 'ua' ? 'Детальна інформація по районах Києва' : 'Детальная информацмя по районам Киева'}
    </Typography>
    
    <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
      {[
        { slug: 'pechersk', nameUa: 'Печерський', nameRu: 'Печерский' },
        { slug: 'obolon', nameUa: 'Оболонський', nameRu: 'Оболоньский' },
        { slug: 'golosiyivsky', nameUa: 'Голосіївський', nameRu: 'Голосеевский' },
        { slug: 'darnytsia', nameUa: 'Дарницький', nameRu: 'Дарницкий' },
        { slug: 'shevchenkivsky', nameUa: 'Шевченківський', nameRu: 'Шевченковский' },
        { slug: 'sviatoshyn', nameUa: 'Святошинський', nameRu: 'Святошинский' },
        { slug: 'podil', nameUa: 'Подільський', nameRu: 'Подольский' },
        { slug: 'solomyanskyi', nameUa: 'Солом\'янський', nameRu: 'Соломенский' },
        { slug: 'desnianskyi', nameUa: 'Деснянський', nameRu: 'Деснянский' },
        { slug: 'dniprovskyi', nameUa: 'Дніпровський', nameRu: 'Днепровский' },
        { slug: 'kyiv_region', nameUa: 'Київська область', nameRu: 'Киевская область' },
      ].map((district) => (
        <Grid item xs={6} sm={4} md={2} key={district.slug}>
          <Link href={`/kyiv-apartments/district/${district.slug}`} passHref legacyBehavior>
            <a style={{ textDecoration: 'none' }}>
              <Paper sx={{ 
                p: { xs: 1, sm: 1.5 }, 
                textAlign: 'center', 
                bgcolor: '#f8f9fa',
                borderRadius: 2,
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'primary.light', color: 'white' }
              }}>
                <Typography variant="body2" fontWeight={500}>
                  {currentLanguage === 'ua' ? district.nameUa : district.nameRu}
                </Typography>
              </Paper>
            </a>
          </Link>
        </Grid>
      ))}
    </Grid>
  </Box>
)}

{/* НОВЫЙ БЛОК: ССЫЛКИ НА СТРАНИЦЫ МЕТРО */}
{isKyiv(activeFilters.city) && (
  <Box sx={{ mt: { xs: 4, md: 6 }, mb: { xs: 2, md: 3 } }}>
    <Typography variant="h2" sx={{ 
      fontSize: { xs: '1.35rem', sm: '1.6rem', md: '1.85rem' }, 
      fontWeight: 600, 
      mb: { xs: 2, md: 3 } 
    }}>
      {currentLanguage === 'ua' ? 'Детальна інформація по станціях метро Києва' : 'Детальная информация по станциям метро Киева'}
    </Typography>
    
    <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
      {[
        { slug: 'vokzalna', nameUa: 'Вокзальна', nameRu: 'Вокзальная' },
        { slug: 'khreshchatyk', nameUa: 'Хрещатик', nameRu: 'Крещатик' },
        { slug: 'poznyaky', nameUa: 'Позняки', nameRu: 'Позняки' },
        { slug: 'libidska', nameUa: 'Либідська', nameRu: 'Лыбедская' },
        { slug: 'pecherska', nameUa: 'Печерська', nameRu: 'Печерская' },
        { slug: 'obolon', nameUa: 'Оболонь', nameRu: 'Оболонь' },
      ].map((metro) => (
        <Grid item xs={6} sm={4} md={2} key={metro.slug}>
          <Link href={`/kyiv-apartments/metro/${metro.slug}`} passHref legacyBehavior>
            <a style={{ textDecoration: 'none' }}>
              <Paper sx={{ 
                p: { xs: 1, sm: 1.5 }, 
                textAlign: 'center', 
                bgcolor: '#f8f9fa',
                borderRadius: 2,
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'primary.light', color: 'white' }
              }}>
                <Typography variant="body2" fontWeight={500}>
                  {currentLanguage === 'ua' ? metro.nameUa : metro.nameRu}
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>
                  🚇 {currentLanguage === 'ua' ? 'детальна інформація' : 'детальная информация'}
                </Typography>
              </Paper>
            </a>
          </Link>
        </Grid>
      ))}
    </Grid>
  </Box>
)}

          {/* SEO текст */}
          <Paper elevation={0} sx={{ p: { xs: 2, sm: 3, md: 4 }, mt: { xs: 3, md: 5 }, backgroundColor: '#f5f9ff', borderRadius: 3 }}>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, lineHeight: 1.8 }}>
              <>
                {currentLanguage === 'ua' ? 'Бажаєте зняти квартиру подобово в місті' : 'Хотите снять квартиру посуточно в городе'} {t.cities?.[activeFilters.city] || activeFilters.city || (currentLanguage === 'ua' ? 'Києві' : 'Киеве')}? NaDoby {currentLanguage === 'ua' ? 'допоможе знайти ідеальний варіант' : 'поможет найти идеальный вариант'}. У нас {currentLanguage === 'ua' ? 'зібрані оголошення від власників' : 'собраны объявления от собственников'}, що гарантує відсутність посередників та комісій.
                <br /><br />
                {currentLanguage === 'ua' ? 'На нашому сайті представлені квартири різних категорій: від економ-класу до преміум-апартаментів, а також готелі, хостели, будинки, сауни, бази відпочинку та багато іншого.' : 'На нашем сайте представлены квартиры различных категорий: от эконом-класса до премиум-апартаментов, а также гостиницы, хостелы, дома, сауны, базы отдыха и многое другое.'}
                <br /><br />
                {currentLanguage === 'ua' ? 'Винаймайте житло швидко та безпечно з NaDoby!' : 'Снимайте жилье быстро и безопасно с NaDoby!'}
              </>
            </Typography>
          </Paper>

          {/* FAQ */}
          <Box sx={{ mt: { xs: 4, md: 6 } }}>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }, fontWeight: 600, mb: { xs: 2, md: 3 } }}>
              {getLocalizedText('faqTitle')}
            </Typography>
            <Grid container spacing={{ xs: 1.5, md: 2 }}>
              <Grid item xs={12}>
                <Paper sx={{ p: { xs: 1.5, md: 2 }, backgroundColor: '#f8f9fa' }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {getLocalizedText('faq1q')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getLocalizedText('faq1a').replace('{minPrice}', priceStats.min).replace('{maxPrice}', priceStats.max).replace('{avgPrice}', priceStats.avg)}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: { xs: 1.5, md: 2 }, backgroundColor: '#f8f9fa' }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {t.faq2q}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t.faq2a}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: { xs: 1.5, md: 2 }, backgroundColor: '#f8f9fa' }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {t.faq3q}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t.faq3a}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* ДОБАВЛЕННЫЙ SEO КОНТЕНТ */}
          <Paper elevation={0} sx={{ p: { xs: 2, sm: 3, md: 4 }, mt: { xs: 3, md: 5 }, backgroundColor: '#f5f9ff', borderRadius: 3 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '1.35rem', sm: '1.6rem', md: '1.85rem' }, fontWeight: 600, mb: 2, color: '#1a365d' }}>
              {t.seoTitle1}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, lineHeight: 1.8, mb: 4 }}>
              {t.seoContent1}
            </Typography>

            <Typography variant="h2" sx={{ fontSize: { xs: '1.35rem', sm: '1.6rem', md: '1.85rem' }, fontWeight: 600, mb: 2, color: '#1a365d' }}>
              {t.seoTitle2}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, lineHeight: 1.8, mb: 4 }}>
              {t.seoContent2}
            </Typography>

            <Typography variant="h2" sx={{ fontSize: { xs: '1.35rem', sm: '1.6rem', md: '1.85rem' }, fontWeight: 600, mb: 2, color: '#1a365d' }}>
              {t.seoTitle3}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, lineHeight: 1.8, mb: 4 }}>
              {t.seoContent3}
            </Typography>

            <Typography variant="h2" sx={{ fontSize: { xs: '1.35rem', sm: '1.6rem', md: '1.85rem' }, fontWeight: 600, mb: 2, color: '#1a365d' }}>
              {t.seoTitle4}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, lineHeight: 1.8, mb: 4 }}>
              {t.seoContent4}
            </Typography>

            <Typography variant="h2" sx={{ fontSize: { xs: '1.35rem', sm: '1.6rem', md: '1.85rem' }, fontWeight: 600, mb: 2, color: '#1a365d' }}>
              {t.seoTitle5}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, lineHeight: 1.8 }}>
              {t.seoContent5}
            </Typography>
          </Paper>
        </Container>

        {/* Модальное окно авторизации */}
        <Dialog
          open={openAuthModal}
          onClose={handleCloseAuthModal}
          fullWidth
          maxWidth="xs"
          sx={{ zIndex: 1500 }}
        >
          <DialogContent>
            <CreateUser onClose={handleCloseAuthModal} />
          </DialogContent>
        </Dialog>

        {/* Snackbar для сообщения о необходимости регистрации */}
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{ zIndex: 1700 }}
        >
          <Alert onClose={() => setShowAlert(false)} severity="info">
            {currentLanguage === 'ua' 
              ? 'Для розміщення оголошення необхідно авторизуватися' 
              : 'Для размещения объявления необходимо авторизоваться'}
          </Alert>
        </Snackbar>

        {/* Диалог с картой */}
        <Dialog
          open={mapOpen}
          onClose={() => setMapOpen(false)}
          maxWidth="xl"
          fullWidth
          fullScreen={isMobile}
          sx={{
            '& .MuiDialog-paper': {
              height: isMobile ? '100%' : '90vh',
              m: isMobile ? 0 : 2,
            }
          }}
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6">
                {t.apartmentsOnMap} ({filteredApartments.length})
              </Typography>
              {selectedApartment && (
                <Chip 
                  label={selectedApartment.category || 'Квартира'} 
                  size="small"
                  sx={{ backgroundColor: '#e3f2fd' }}
                />
              )}
            </Box>
            <IconButton onClick={() => setMapOpen(false)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            <Box sx={{ height: '100%', minHeight: 500 }}>
              <GoogleMapsProvider>
                <MapComponent
                  apartments={selectedApartment ? [selectedApartment] : filteredApartments}
                  centerMode={!!selectedApartment}
                  onApartmentSelect={(apt) => router.push(`/apartment/${apt._id}`)}
                  userLocation={userLocation}
                  compactMode={false}
                />
              </GoogleMapsProvider>
            </Box>
          </DialogContent>
        </Dialog>

        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={3000} 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}

// Серверный рендеринг
export async function getServerSideProps({ query }) {
  try {
    const baseUrl = process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_URL || 'https://nadoby.com.ua'
      : 'http://localhost:3000';

    const apartmentsRes = await fetch(`${baseUrl}/api/v1/apartments/get-all`);
    const apartmentsData = await apartmentsRes.json();

    let allApartments = [];
    if (Array.isArray(apartmentsData)) {
      allApartments = apartmentsData;
    } else if (apartmentsData.apartments && Array.isArray(apartmentsData.apartments)) {
      allApartments = apartmentsData.apartments;
    } else if (apartmentsData.data && Array.isArray(apartmentsData.data)) {
      allApartments = apartmentsData.data;
    }

    // Перемешиваем квартиры
    const shuffledApartments = [...allApartments].sort(() => Math.random() - 0.5);

    let filteredApartments = [...shuffledApartments];
    let initialFilter = {};
    
    if (query.district) {
      initialFilter.district = query.district;
    }
    
    if (query.metro) {
      initialFilter.metroStation = decodeURIComponent(query.metro);
    }
    
    if (query.rooms) {
      initialFilter.rooms = query.rooms;
    }
    
    if (query.category) {
      initialFilter.category = decodeURIComponent(query.category);
    }
    
    if (query.city) {
      initialFilter.city = decodeURIComponent(query.city);
    }

    return {
      props: {
        apartments: shuffledApartments,
        totalCount: shuffledApartments.length,
        initialFilter,
        generatedAt: new Date().toISOString(),
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        apartments: [],
        totalCount: 0,
        initialFilter: {},
        generatedAt: new Date().toISOString(),
      }
    };
  }
}

// Главный компонент
export default function KyivApartmentsPage(props) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <FavoritesProvider>
          <Header />
          <KyivApartmentsContent {...props} />
          <Footer />
        </FavoritesProvider>
      </SessionProvider>
    </Provider>
  );
}
