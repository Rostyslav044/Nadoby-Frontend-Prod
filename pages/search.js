


//    // pages/search/page.js
// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import {
//   Container,
//   Typography,
//   Box,
//   Chip,
//   Grid,
//   Button,
//   Divider,
//   CircularProgress,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Alert,
//   Snackbar,
//   Paper,
//   Tooltip,
// } from '@mui/material';
// import { useRouter } from 'next/navigation';
// import { LanguageProvider, useLanguage } from '@/app/LanguageContext';
// import ApartmentCard from '@/app/components/ApartmentCard';
// import dynamic from 'next/dynamic';
// import Providers from '@/app/providers';
// import { store } from '@/app/store';
// import { SessionProvider } from 'next-auth/react';
// import Header from '@/app/components/Header';
// import Footer from '@/app/components/Footer';
// import { useFavorites } from '@/app/hooks/useFavorites';
// import { FavoritesProvider } from '@/app/hooks/FavoritesContext'; 
// import Head from 'next/head';
// import SearchApartmentFilters from '@/app/components/SearchApartmentFilters';
// import LocationOn from '@mui/icons-material/LocationOn';
// import People from '@mui/icons-material/People';
// import Category from '@mui/icons-material/Category';
// import ArrowBack from '@mui/icons-material/ArrowBack';
// import Warning from '@mui/icons-material/Warning';
// import MapIcon from '@mui/icons-material/Map';
// import Close from '@mui/icons-material/Close';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';
// import { GoogleMapsProvider } from '@/GoogleMapsProvider';
// import { DISTRICTS_DATA, getCityKey, getDistrictName } from '@/app/components/DistrictsData';

// // Константы удобств
// const CONVENIENCES = {
//   ua: [
//     { id: 'балкон', label: 'Балкон', icon: '🏠', displayId: 'Балкон' },
//     { id: 'барбекю-зона', label: 'Барбекю-зона', icon: '🔥', displayId: 'Барбекю-зона' },
//     { id: 'басейн', label: 'Басейн', icon: '🏊', displayId: 'Басейн' },
//     { id: 'ігрова кімната', label: 'Ігрова кімната', icon: '🎮', displayId: 'Ігрова кімната' },
//     { id: 'блендер', label: 'Блендер', icon: '🥤', displayId: 'Блендер' },
//     { id: 'бойлер', label: 'Бойлер', icon: '🔥', displayId: 'Бойлер' },
//     { id: 'ванна', label: 'Ванна', icon: '🛁', displayId: 'Ванна' },
//     { id: 'вентилятор', label: 'Вентилятор', icon: '🌀', displayId: 'Вентилятор' },
//     { id: 'генератор', label: 'Генератор', icon: '⚡', displayId: 'Генератор' },
//     { id: 'громадська кухня', label: 'Громадська кухня', icon: '🍳', displayId: 'Громадська кухня' },
//     { id: 'джакузі', label: 'Джакузі', icon: '🛁', displayId: 'Джакузі' },
//     { id: 'дитяче ліжечко', label: 'Дитяче ліжечко', icon: '👶', displayId: 'Дитяче ліжечко' },
//     { id: 'дитячий стілець', label: 'Дитячий стілець', icon: '🪑', displayId: 'Дитячий стілець' },
//     { id: 'домашній кінотеатр', label: 'Домашній кінотеатр', icon: '🎬', displayId: 'Домашній кінотеатр' },
//     { id: 'духовка', label: 'Духовка', icon: '🔥', displayId: 'Духовка' },
//     { id: 'душова кабіна', label: 'Душова кабіна', icon: '🚿', displayId: 'Душова кабіна' },
//     { id: 'електрочайник', label: 'Електрочайник', icon: '☕', displayId: 'Електрочайник' },
//     { id: 'електроплита', label: 'Електроплита', icon: '🔥', displayId: 'Електроплита' },
//     { id: 'газова плита', label: 'Газова плита', icon: '🔥', displayId: 'Газова плита' },
//     { id: 'зарядка для електромобілів', label: 'Зарядка для електромобілів', icon: '🔋', displayId: 'Зарядка для електромобілів' },
//     { id: 'заміна постільної білизни', label: 'Заміна постільної білизни', icon: '🛏️', displayId: 'Заміна постільної білизни' },
//     { id: 'інтернет', label: 'Інтернет', icon: '📶', displayId: 'Інтернет' },
//     { id: 'кавоварка', label: 'Кавоварка', icon: '☕', displayId: 'Кавоварка' },
//     { id: 'камін', label: 'Камін', icon: '🔥', displayId: 'Камін' },
//     { id: 'кабельне тб', label: 'Кабельне ТБ', icon: '📺', displayId: 'Кабельне ТБ' },
//     { id: 'кондиціонер', label: 'Кондиціонер', icon: '❄️', displayId: 'Кондиціонер' },
//     { id: 'ліжко', label: 'Ліжко', icon: '🛏️', displayId: 'Ліжко' },
//     { id: 'диван', label: 'Диван', icon: '🛋️', displayId: 'Диван' },
//     { id: 'лазня', label: 'Лазня', icon: '🧖', displayId: 'Лазня' },
//     { id: 'мангал', label: 'Мангал', icon: '🔥', displayId: 'Мангал' },
//     { id: 'мікрохвильова піч', label: 'Мікрохвильова піч', icon: '🔥', displayId: 'Мікрохвильова піч' },
//     { id: 'охорона', label: 'Охорона', icon: '🛡️', displayId: 'Охорона' },
//     { id: 'парковка', label: 'Парковка', icon: '🅿️', displayId: 'Парковка' },
//     { id: "комп'ютер", label: "Комп'ютер", icon: '💻', displayId: "Комп'ютер" },
//     { id: 'пляжне обладнання', label: 'Пляжне обладнання', icon: '🏖️', displayId: 'Пляжне обладнання' },
//     { id: 'посуд', label: 'Посуд', icon: '🍽️', displayId: 'Посуд' },
//     { id: 'посудомийна машина', label: 'Посудомийна машина', icon: '🧼', displayId: 'Посудомийна машина' },
//     { id: 'пральна машина', label: 'Пральна машина', icon: '🧺', displayId: 'Пральна машина' },
//     { id: 'пральний порошок', label: 'Пральний порошок', icon: '🧼', displayId: 'Пральний порошок' },
//     { id: 'праска', label: 'Праска', icon: '👕', displayId: 'Праска' },
//     { id: 'рушники', label: 'Рушники', icon: '🧻', displayId: 'Рушники' },
//     { id: 'сейф', label: 'Сейф', icon: '🔒', displayId: 'Сейф' },
//     { id: 'спортзал', label: 'Спортзал', icon: '🏋️', displayId: 'Спортзал' },
//     { id: 'спортивний інвентар', label: 'Спортивний інвентар', icon: '⚽', displayId: 'Спортивний інвентар' },
//     { id: 'столові прибори', label: 'Столові прибори', icon: '🍴', displayId: 'Столові прибори' },
//     { id: 'сушилка', label: 'Сушилка', icon: '🧺', displayId: 'Сушилка' },
//     { id: 'супутникове тб', label: 'Супутникове ТБ', icon: '📡', displayId: 'Супутникове ТБ' },
//     { id: 'тапочки', label: 'Тапочки', icon: '👟', displayId: 'Тапочки' },
//     { id: 'тераса', label: 'Тераса', icon: '🏡', displayId: 'Тераса' },
//     { id: 'тостер', label: 'Тостер', icon: '🍞', displayId: 'Тостер' },
//     { id: 'туалетні принадлежності', label: 'Туалетні принадлежності', icon: '🧴', displayId: 'Туалетні принадлежності' },
//     { id: 'фен', label: 'Фен', icon: '💨', displayId: 'Фен' },
//     { id: 'холодильник', label: 'Холодильник', icon: '🧊', displayId: 'Холодильник' },
//     { id: 'догляд за тваринами', label: 'Догляд за тваринами', icon: '🐕', displayId: 'Догляд за тваринами' },
//     { id: 'кафе', label: 'Кафе', icon: '☕', displayId: 'Кафе' },
//     { id: 'конференц-зал', label: 'Конференц-зал', icon: '🏢', displayId: 'Конференц-зал' },
//     { id: 'переговорна', label: 'Переговорна', icon: '💼', displayId: 'Переговорна' },
//     { id: 'лікувальні процедури', label: 'Лікувальні процедури', icon: '💊', displayId: 'Лікувальні процедури' },
//     { id: 'організація подій', label: 'Організація подій', icon: '🎉', displayId: 'Організація подій' },
//     { id: 'трансфер', label: 'Трансфер', icon: '🚗', displayId: 'Трансфер' },
//     { id: 'харчування', label: 'Харчування', icon: '🍲', displayId: 'Харчування' },
//     { id: 'прокат', label: 'Прокат', icon: '🚲', displayId: 'Прокат' },
//   ],
//   ru: [
//     { id: 'балкон', label: 'Балкон', icon: '🏠', displayId: 'Балкон' },
//     { id: 'барбекю-зона', label: 'Зона барбекю', icon: '🔥', displayId: 'Барбекю-зона' },
//     { id: 'басейн', label: 'Бассейн', icon: '🏊', displayId: 'Басейн' },
//     { id: 'ігрова кімната', label: 'Игровая комната', icon: '🎮', displayId: 'Ігрова кімната' },
//     { id: 'блендер', label: 'Блендер', icon: '🥤', displayId: 'Блендер' },
//     { id: 'бойлер', label: 'Бойлер', icon: '🔥', displayId: 'Бойлер' },
//     { id: 'ванна', label: 'Ванна', icon: '🛁', displayId: 'Ванна' },
//     { id: 'вентилятор', label: 'Вентилятор', icon: '🌀', displayId: 'Вентилятор' },
//     { id: 'генератор', label: 'Генератор', icon: '⚡', displayId: 'Генератор' },
//     { id: 'громадська кухня', label: 'Общая кухня', icon: '🍳', displayId: 'Громадська кухня' },
//     { id: 'джакузі', label: 'Джакузи', icon: '🛁', displayId: 'Джакузі' },
//     { id: 'дитяче ліжечко', label: 'Детская кроватка', icon: '👶', displayId: 'Дитяче ліжечко' },
//     { id: 'дитячий стілець', label: 'Детский стульчик', icon: '🪑', displayId: 'Дитячий стілець' },
//     { id: 'домашній кінотеатр', label: 'Домашний кинотеатр', icon: '🎬', displayId: 'Домашній кінотеатр' },
//     { id: 'духовка', label: 'Духовка', icon: '🔥', displayId: 'Духовка' },
//     { id: 'душова кабіна', label: 'Душевая кабина', icon: '🚿', displayId: 'Душова кабіна' },
//     { id: 'електрочайник', label: 'Электрочайник', icon: '☕', displayId: 'Електрочайник' },
//     { id: 'електроплита', label: 'Электроплита', icon: '🔥', displayId: 'Електроплита' },
//     { id: 'газова плита', label: 'Газовая плита', icon: '🔥', displayId: 'Газова плита' },
//     { id: 'зарядка для електромобілів', label: 'Зарядка для электромобилей', icon: '🔋', displayId: 'Зарядка для електромобілів' },
//     { id: 'заміна постільної білизни', label: 'Смена постельного белья', icon: '🛏️', displayId: 'Заміна постільної білизни' },
//     { id: 'інтернет', label: 'Интернет', icon: '📶', displayId: 'Інтернет' },
//     { id: 'кавоварка', label: 'Кофеварка', icon: '☕', displayId: 'Кавоварка' },
//     { id: 'камін', label: 'Камин', icon: '🔥', displayId: 'Камін' },
//     { id: 'кабельне тб', label: 'Кабельное ТВ', icon: '📺', displayId: 'Кабельне ТБ' },
//     { id: 'кондиціонер', label: 'Кондиционер', icon: '❄️', displayId: 'Кондиціонер' },
//     { id: 'ліжко', label: 'Кровать', icon: '🛏️', displayId: 'Ліжко' },
//     { id: 'диван', label: 'Диван', icon: '🛋️', displayId: 'Диван' },
//     { id: 'лазня', label: 'Баня', icon: '🧖', displayId: 'Лазня' },
//     { id: 'мангал', label: 'Мангал', icon: '🔥', displayId: 'Мангал' },
//     { id: 'мікрохвильова піч', label: 'Микроволновая печь', icon: '🔥', displayId: 'Мікрохвильова піч' },
//     { id: 'охорона', label: 'Охрана', icon: '🛡️', displayId: 'Охорона' },
//     { id: 'парковка', label: 'Парковка', icon: '🅿️', displayId: 'Парковка' },
//     { id: "комп'ютер", label: "Компьютер", icon: '💻', displayId: "Комп'ютер" },
//     { id: 'пляжне обладнання', label: 'Пляжное оборудование', icon: '🏖️', displayId: 'Пляжне обладнання' },
//     { id: 'посуд', label: 'Посуда', icon: '🍽️', displayId: 'Посуд' },
//     { id: 'посудомийна машина', label: 'Посудомоечная машина', icon: '🧼', displayId: 'Посудомийна машина' },
//     { id: 'пральна машина', label: 'Стиральная машина', icon: '🧺', displayId: 'Пральна машина' },
//     { id: 'пральний порошок', label: 'Стиральный порошок', icon: '🧼', displayId: 'Пральний порошок' },
//     { id: 'праска', label: 'Утюг', icon: '👕', displayId: 'Праска' },
//     { id: 'рушники', label: 'Полотенца', icon: '🧻', displayId: 'Рушники' },
//     { id: 'сейф', label: 'Сейф', icon: '🔒', displayId: 'Сейф' },
//     { id: 'спортзал', label: 'Спортзал', icon: '🏋️', displayId: 'Спортзал' },
//     { id: 'спортивний інвентар', label: 'Спортивный инвентарь', icon: '⚽', displayId: 'Спортивний інвентар' },
//     { id: 'столові прибори', label: 'Столовые приборы', icon: '🍴', displayId: 'Столові прибори' },
//     { id: 'сушилка', label: 'Сушилка', icon: '🧺', displayId: 'Сушилка' },
//     { id: 'супутникове тб', label: 'Спутниковое ТВ', icon: '📡', displayId: 'Супутникове ТБ' },
//     { id: 'тапочки', label: 'Тапочки', icon: '👟', displayId: 'Тапочки' },
//     { id: 'тераса', label: 'Терраса', icon: '🏡', displayId: 'Тераса' },
//     { id: 'тостер', label: 'Тостер', icon: '🍞', displayId: 'Тостер' },
//     { id: 'туалетні принадлежності', label: 'Туалетные принадлежности', icon: '🧴', displayId: 'Туалетні принадлежності' },
//     { id: 'фен', label: 'Фен', icon: '💨', displayId: 'Фен' },
//     { id: 'холодильник', label: 'Холодильник', icon: '🧊', displayId: 'Холодильник' },
//     { id: 'догляд за тваринами', label: 'Уход за животными', icon: '🐕', displayId: 'Догляд за тваринами' },
//     { id: 'кафе', label: 'Кафе', icon: '☕', displayId: 'Кафе' },
//     { id: 'конференц-зал', label: 'Конференц-зал', icon: '🏢', displayId: 'Конференц-зал' },
//     { id: 'переговорна', label: 'Переговорная', icon: '💼', displayId: 'Переговорна' },
//     { id: 'лікувальні процедури', label: 'Лечебные процедуры', icon: '💊', displayId: 'Лікувальні процедури' },
//     { id: 'організація подій', label: 'Организация мероприятий', icon: '🎉', displayId: 'Організація подій' },
//     { id: 'трансфер', label: 'Трансфер', icon: '🚗', displayId: 'Трансфер' },
//     { id: 'харчування', label: 'Питание', icon: '🍲', displayId: 'Харчування' },
//     { id: 'прокат', label: 'Прокат', icon: '🚲', displayId: 'Прокат' },
//   ],
// };

// // Словарь для нормализации названий станций метро
// const METRO_NORMALIZATION_MAP = {
//   'Академмістечко': 'Академгородок',
//   'Академгородок': 'Академмістечко',
//   'Житомирська': 'Житомирская',
//   'Житомирская': 'Житомирська',
//   'Святошин': 'Святошин',
//   'Нивки': 'Нивки',
//   'Берестейська': 'Берестейская',
//   'Берестейская': 'Берестейська',
//   'Шулявська': 'Шулявская',
//   'Шулявская': 'Шулявська',
//   'Політехнічний інститут': 'Политехнический институт',
//   'Политехнический институт': 'Політехнічний інститут',
//   'Вокзальна': 'Вокзальная',
//   'Вокзальная': 'Вокзальна',
//   'Університет': 'Университет',
//   'Университет': 'Університет',
//   'Театральна': 'Театральная',
//   'Театральная': 'Театральна',
//   'Хрещатик': 'Крещатик',
//   'Крещатик': 'Хрещатик',
//   'Арсенальна': 'Арсенальная',
//   'Арсенальная': 'Арсенальна',
//   'Дніпро': 'Днепр',
//   'Днепр': 'Дніпро',
//   'Гідропарк': 'Гидропарк',
//   'Гидропарк': 'Гідропарк',
//   'Лівобережна': 'Левобережная',
//   'Левобережная': 'Лівобережна',
//   'Дарниця': 'Дарница',
//   'Дарница': 'Дарниця',
//   'Чернігівська': 'Черниговская',
//   'Черниговская': 'Чернігівська',
//   'Лісова': 'Лесная',
//   'Лесная': 'Лісова',
//   'Героїв Дніпра': 'Героев Днепра',
//   'Героев Днепра': 'Героїв Дніпра',
//   'Мінська': 'Минская',
//   'Минская': 'Мінська',
//   'Оболонь': 'Оболонь',
//   'Поштова площа': 'Почтовая площадь',
//   'Почтовая площадь': 'Поштова площа',
//   'Контрактова площа': 'Контрактовая площадь',
//   'Контрактовая площадь': 'Контрактова площа',
//   'Тараса Шевченка': 'Тараса Шевченко',
//   'Лук\'янівська': 'Лукьяновская',
//   'Лукьяновская': 'Лук\'янівська',
//   'Дорогожичі': 'Дорогожичи',
//   'Дорогожичи': 'Дорогожичі',
//   'Сирець': 'Сырец',
//   'Сырец': 'Сирець',
//   'Золоті ворота': 'Золотые ворота',
//   'Золотые ворота': 'Золоті ворота',
//   'Палац спорту': 'Дворец спорта',
//   'Дворец спорта': 'Палац спорту',
//   'Олімпійська': 'Олимпийская',
//   'Олимпийская': 'Олімпійська',
//   'Палац «Україна»': 'Дворец «Украина»',
//   'Дворец «Украина»': 'Палац «Україна»',
//   'Либідська': 'Лыбедская',
//   'Лыбедская': 'Либідська',
//   'Деміївська': 'Демиевская',
//   'Демиевская': 'Деміївська',
//   'Голосіївська': 'Голосеевская',
//   'Голосеевская': 'Голосіївська',
//   'Васильківська': 'Васильковская',
//   'Васильковская': 'Васильківська',
//   'Виставковий центр': 'Выставочный центр',
//   'Выставочный центр': 'Виставковий центр',
//   'Іподром': 'Ипподром',
//   'Ипподром': 'Іподром',
//   'Теремки': 'Теремки',
//   'Кловська': 'Кловская',
//   'Кловская': 'Кловська',
//   'Печерська': 'Печерская',
//   'Печерская': 'Печерська',
//   'Видубичі': 'Выдубичи',
//   'Выдубичи': 'Видубичі',
//   'Славутич': 'Славутич',
//   'Осокорки': 'Осокорки',
//   'Позняки': 'Позняки',
//   'Почайна': 'Почайна',
//   'Петрівка': 'Петровка',
//   'Почайна/Петрівка': 'Почайна/Петровка',
//   'Почайна/Петровка': 'Почайна/Петрівка',
//   'Харківська': 'Харьковская',
//   'Харьковская': 'Харківська',
//   'Вирлиця': 'Вырлица',
//   'Вырлица': 'Вирлиця',
//   'Бориспільська': 'Бориспольская',
//   'Бориспольская': 'Бориспільська',
//   'Червоний хутір': 'Красный хутор',
//   'Красный хутор': 'Червоний хутір',
//   'Майдан Незалежності': 'Майдан Независимости',
//   'Майдан Независимости': 'Майдан Незалежності',
//   'Площа Українських Героїв': 'Площадь Украинских Героев',
//   'Площадь Украинских Героев': 'Площа Українських Героїв',
//   'Льва Толстого': 'Льва Толстого',
//   'Звіринецька': 'Зверинецкая',
//   'Зверинецкая': 'Звіринецька',
//   'Дружби Народів': 'Дружбы Народов',
  
//   'Холодна гора': 'Холодная гора',
//   'Холодная гора': 'Холодна гора',
//   'Південний вокзал': 'Южный вокзал',
//   'Южный вокзал': 'Південний вокзал',
//   'Центральний ринок': 'Центральный рынок',
//   'Центральный рынок': 'Центральний ринок',
//   'Майдан Конституції': 'Площадь Конституции',
//   'Площадь Конституции': 'Майдан Конституції',
//   'Історичний музей': 'Исторический музей',
//   'Исторический музей': 'Історичний музей',
//   'Проспект Гагаріна': 'Проспект Гагарина',
//   'Проспект Гагарина': 'Проспект Гагаріна',
//   'Спортивна': 'Спортивная',
//   'Спортивная': 'Спортивна',
//   'Завод імені Малишева': 'Завод имени Малышева',
//   'Завод имени Малышева': 'Завод імені Малишева',
//   'Турбоатом': 'Турбоатом',
//   'Індустріальна': 'Индустриальная',
//   'Индустриальная': 'Індустріальна',
//   'Академіка Павлова': 'Академика Павлова',
//   'Академика Павлова': 'Академіка Павлова',
//   'Студентська': 'Студенческая',
//   'Студенческая': 'Студентська',
//   'Героїв Праці': 'Героев Труда',
//   'Героев Труда': 'Героїв Праці',
//   'Перемога': 'Победа',
//   'Победа': 'Перемога',
//   'Олексіївська': 'Алексеевская',
//   'Алексеевская': 'Олексіївська',
//   '23 Серпня': '23 Августа',
//   '23 Августа': '23 Серпня',
//   'Ботанічний сад': 'Ботанический сад',
//   'Ботанический сад': 'Ботанічний сад',
//   'Держпром': 'Госпром',
//   'Госпром': 'Держпром',
  
//   'Металургів': 'Металлургов',
//   'Металлургов': 'Металургів',
//   'Заводська': 'Заводская',
//   'Заводская': 'Заводська',
//   'Метробудівників': 'Метростроителей',
//   'Метростроителей': 'Метробудівників',
//   'Проспект Свободи': 'Проспект Свободы',
//   'Проспект Свободы': 'Проспект Свободи',
//   'Покровська': 'Покровская',
//   'Покровская': 'Покровська',
// };

// const CITIES_WITH_METRO = ['Київ', 'Харків', 'Дніпро', 'Киев', 'Харьков', 'Днепр'];

// const MapComponent = dynamic(() => import('@/app/components/MapComponent'), {
//   ssr: false,
//   loading: () => <div>Загрузка карты...</div>
// });

// const CATEGORY_COLORS = {
//   'apart': '#e590ad', 'hostel': '#34A853', 'glamping': '#FBBC05',
//   'hotel': '#4285F4', 'pet-hotel': '#9C27B0', 'house': '#795548',
//   'sauna': '#F44336', 'pansionat': '#607D8B', 'cottage': '#FF9800',
//   'coworking': '#E91E63', 'autocamping': '#4CAF50', 'rest-base': '#00BCD4',
//   'default': '#EA4335'
// };

// const getCategoryColor = (category) => {
//   if (!category) return CATEGORY_COLORS.default;
//   const categoryLower = category.toLowerCase();
//   if (categoryLower.includes('apart') || categoryLower.includes('квартир')) return CATEGORY_COLORS.apart;
//   if (categoryLower.includes('hostel') || categoryLower.includes('хостел')) return CATEGORY_COLORS.hostel;
//   if (categoryLower.includes('glamping') || categoryLower.includes('глемпінг') || categoryLower.includes('глэмпинг')) return CATEGORY_COLORS.glamping;
//   if (categoryLower.includes('hotel') || categoryLower.includes('готел') || categoryLower.includes('гостиниц')) return CATEGORY_COLORS.hotel;
//   if (categoryLower.includes('pet') || categoryLower.includes('тварин') || categoryLower.includes('animals')) return CATEGORY_COLORS['pet-hotel'];
//   if (categoryLower.includes('house') || categoryLower.includes('будинок') || categoryLower.includes('дом')) return CATEGORY_COLORS.house;
//   if (categoryLower.includes('sauna') || categoryLower.includes('саун') || categoryLower.includes('бан')) return CATEGORY_COLORS.sauna;
//   if (categoryLower.includes('pansionat') || categoryLower.includes('пансіонат') || categoryLower.includes('пансионат')) return CATEGORY_COLORS.pansionat;
//   if (categoryLower.includes('cottage') || categoryLower.includes('котедж') || categoryLower.includes('kotedzi')) return CATEGORY_COLORS.cottage;
//   if (categoryLower.includes('coworking') || categoryLower.includes('коворкінг') || categoryLower.includes('коворкинг') || categoryLower.includes('kavorking')) return CATEGORY_COLORS.coworking;
//   if (categoryLower.includes('autocamping') || categoryLower.includes('автокемпінг') || categoryLower.includes('автокемпинг') || categoryLower.includes('avtokemping')) return CATEGORY_COLORS.autocamping;
//   if (categoryLower.includes('rest-base') || categoryLower.includes('база відпочинку') || categoryLower.includes('база отдыха') || categoryLower.includes('recreationcenter')) return CATEGORY_COLORS['rest-base'];
//   return CATEGORY_COLORS.default;
// };

// // ========== ФУНКЦИИ ДЛЯ НОРМАЛИЗАЦИИ ГОРОДА ==========

// // Функция для нормализации названия города
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

// // Функция для проверки, относится ли город к выбранному фильтру
// const isCityMatch = (apartmentCity, filterCity) => {
//   if (!filterCity) return true; // Если город не выбран - показываем все
//   if (!apartmentCity) return false;
  
//   const aptCity = apartmentCity || '';
//   const normalizedFilter = normalizeCityName(filterCity);
//   const normalizedApt = normalizeCityName(aptCity);
  
//   console.log(`🔍 Сравниваем город: "${aptCity}" (норм: "${normalizedApt}") с фильтром "${filterCity}" (норм: "${normalizedFilter}")`);
  
//   // Прямое совпадение
//   if (normalizedApt === normalizedFilter) {
//     console.log(`✅ Прямое совпадение города`);
//     return true;
//   }
  
//   // Город содержит название (например "Київ, Київська область")
//   if (aptCity.toLowerCase().includes(normalizedFilter.toLowerCase())) {
//     console.log(`✅ Город содержит название фильтра`);
//     return true;
//   }
  
//   console.log(`❌ Город не совпадает`);
//   return false;
// };

// // ========== ФУНКЦИЯ ДЛЯ ПРЕОБРАЗОВАНИЯ КАТЕГОРИИ ==========
// const normalizeCategory = (category) => {
//   if (!category) return '';
  
//   // Маппинг английских названий на украинские
//   const categoryMap = {
//     'apart': 'Квартира',
//     'hostel': 'Хостел',
//     'glamping': 'Глемпінг',
//     'hotel': 'Готель',
//     'pet-hotel': 'Готель для тварин',
//     'house': 'Будинок',
//     'sauna': 'Сауна/Лазня',
//     'pansionat': 'Пансіонат',
//     'cottage': 'Котедж',
//     'coworking': 'Коворкінг',
//     'autocamping': 'Автокемпінг',
//     'rest-base': 'База відпочинку',
//   };
  
//   const normalized = categoryMap[category] || category;
//   console.log(`🏷️ Нормализация категории: "${category}" -> "${normalized}"`);
//   return normalized;
// };

// const SearchResultsContent = ({ serverApartments = [], totalCount = 0 }) => {
//   const [searchResults, setSearchResults] = useState([]);
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [searchParams, setSearchParams] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [mapOpen, setMapOpen] = useState(false);
//   const [selectedApartment, setSelectedApartment] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [foundCategories, setFoundCategories] = useState([]);
//   const [activeFilters, setActiveFilters] = useState({});
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
//   const [currentCity, setCurrentCity] = useState('');
//   const [workingFilters, setWorkingFilters] = useState({});
//   const [filterHistory, setFilterHistory] = useState([]);
  
//   // Флаг для предотвращения циклов
//   const isResettingRef = useRef(false);

//   const router = useRouter();
//   const { currentLanguage } = useLanguage();
//   const { isFavorite, toggleFavorite } = useFavorites();

//   const translations = {
//     ua: {
//       district: 'Район',
//       title: 'Результати пошуку',
//       metaTitle: 'Результати пошуку житла для відпочинку | NaDoby',
//       metaDescription: 'Знайдіть ідеальний варіант для відпочинку.',
//       found: 'Знайдено',
//       foundCategories: 'Знайдені категорії',
//       noResults: 'За вашим запитом нічого не знайдено',
//       noFilterResults: 'За обраними фільтрами нічого не знайдено',
//       tryAgain: 'Спробуйте скинути фільтри та обрати інші параметри',
//       changeSearch: 'Змінити параметри пошуку',
//       back: 'Назад',
//       location: 'Місце',
//       guestsLabel: 'Гості',
//       types: 'Типи',
//       loading: 'Завантаження...',
//       error: 'Помилка при завантаженні результатів',
//       viewMap: 'Дивитись на карті',
//       close: 'Закрити',
//       showOnMap: 'Показати на карті',
//       categoriesOnMap: 'Категорії на карті',
//       favoriteAdd: 'Додано в обране',
//       favoriteRemove: 'Видалено з обраного',
//       favoriteError: 'Помилка при оновленні обраного',
//       loginRequired: 'Увійдіть, щоб додати в обране',
//       resetFilters: 'Скинути фільтри',
//       activeFilters: 'Активні фільтри',
//       price: 'Ціна',
//       rooms: 'Кімнати',
//       guests: 'Гості',
//       area: 'Площа',
//       smoking: 'Паління',
//       parties: 'Вечірки',
//       pets: 'Тварини',
//       fullDay: 'Цілодобово',
//       reportDocs: 'Звітні документи',
//       conveniences: 'Зручності',
//       yes: 'Так',
//       no: 'Ні',
//       filterMatches: 'Відповідає фільтру',
//       outOf: 'з',
//       city: 'Місто',
//       category: 'Категорія',
//       categories: {
//         'apart': 'Квартира',
//         'hostel': 'Хостел',
//         'glamping': 'Глемпінг',
//         'hotel': 'Готель',
//         'pet-hotel': 'Готель для тварин',
//         'house': 'Будинок',
//         'sauna': 'Сауна/Лазня',
//         'pansionat': 'Пансіонат',
//         'cottage': 'Котедж',
//         'coworking': 'Коворкінг',
//         'autocamping': 'Автокемпінг',
//         'rest-base': 'База відпочинку',
//       }
//     },
//     ru: {
//       district: 'Район',
//       title: 'Результаты поиска',
//       metaTitle: 'Результаты поиска жилья для отдыха | NaDoby',
//       metaDescription: 'Найдите идеальный вариант для отдыха.',
//       found: 'Найдено',
//       foundCategories: 'Найденные категории',
//       noResults: 'По вашему запросу ничего не найдено',
//       noFilterResults: 'По выбранным фильтрам ничего не найдено',
//       tryAgain: 'Попробуйте сбросить фильтры и выбрать другие параметры',
//       changeSearch: 'Изменить параметры поиска',
//       back: 'Назад',
//       location: 'Место',
//       guestsLabel: 'Гости',
//       types: 'Типы',
//       loading: 'Загрузка...',
//       error: 'Ошибка при загрузке результатов',
//       viewMap: 'Смотреть на карте',
//       close: 'Закрыть',
//       showOnMap: 'Показать на карте',
//       categoriesOnMap: 'Категории на карте',
//       favoriteAdd: 'Добавлено в избранное',
//       favoriteRemove: 'Удалено из избранного',
//       favoriteError: 'Ошибка при обновлении избранного',
//       loginRequired: 'Войдите, чтобы добавить в избранное',
//       resetFilters: 'Сбросить фильтры',
//       activeFilters: 'Активные фильтры',
//       price: 'Цена',
//       rooms: 'Комнаты',
//       guests: 'Гости',
//       area: 'Площадь',
//       smoking: 'Курение',
//       parties: 'Вечеринки',
//       pets: 'Животные',
//       fullDay: 'Круглосуточно',
//       reportDocs: 'Отчетные документы',
//       conveniences: 'Удобства',
//       yes: 'Да',
//       no: 'Нет',
//       filterMatches: 'Соответствует фильтру',
//       outOf: 'из',
//       city: 'Город',
//       category: 'Категория',
//       categories: {
//         'apart': 'Квартира',
//         'hostel': 'Хостел',
//         'glamping': 'Глэмпинг',
//         'hotel': 'Гостиница',
//         'pet-hotel': 'Отель для животных',
//         'house': 'Дом',
//         'sauna': 'Сауна/Баня',
//         'pansionat': 'Пансионат',
//         'cottage': 'Коттедж',
//         'coworking': 'Коворкинг',
//         'autocamping': 'Автокемпинг',
//         'rest-base': 'База отдыха',
//       }
//     },
//   };

//   const t = translations[currentLanguage];

//   // ========== ФУНКЦИИ НОРМАЛИЗАЦИИ ==========

//   const normalizeString = (str) => {
//     if (!str) return '';
//     return String(str).toLowerCase().trim().replace(/\s+/g, ' ');
//   };

//   const normalizeMetro = (station) => {
//     if (!station) return '';
    
//     const normalized = normalizeString(station);
    
//     for (const [key, value] of Object.entries(METRO_NORMALIZATION_MAP)) {
//       const normalizedKey = normalizeString(key);
//       const normalizedValue = normalizeString(value);
      
//       if (normalized === normalizedKey || normalized === normalizedValue) {
//         return normalizeString(key);
//       }
//     }
    
//     return normalized;
//   };

//   const normalizeBoolean = (value) => {
//     if (value === undefined || value === null) return false;
//     if (value === true || value === false) return value;
//     if (typeof value === 'number') return value === 1;
//     if (typeof value === 'string') {
//       const lower = value.toLowerCase().trim();
//       return lower === 'yes' || lower === 'так' || lower === 'да' || lower === 'true' || lower === '1';
//     }
//     return false;
//   };

//   const normalizeConvenience = (conv) => {
//     if (!conv) return '';
//     return String(conv).toLowerCase().trim().replace(/[^a-zа-яёїієґ0-9]/gi, '');
//   };

//   const compareConveniences = (conv1, conv2) => {
//     return normalizeConvenience(conv1) === normalizeConvenience(conv2);
//   };

//   const getConvenienceLabel = (convenienceId) => {
//     if (!convenienceId) return '';
//     const convenience = CONVENIENCES[currentLanguage]?.find(c => compareConveniences(c.id, convenienceId));
//     return convenience ? convenience.label : convenienceId;
//   };

//   const translateCategory = (category) => {
//     if (!category) return category;
//     return t.categories[category] || t.categories[category.toLowerCase()] || category;
//   };

//   // ========== ФИЛЬТРАЦИЯ ==========
//   const matchesFilters = (apartment, filters) => {
//     console.log(`\n🔍 Проверка квартиры ${apartment._id}:`, {
//       city: apartment.city,
//       category: apartment.category,
//       price: apartment.price,
//       beds: apartment.beds,
//       size: apartment.size
//     });
    
//     // Город
//     if (filters.city && !isCityMatch(apartment.city, filters.city)) {
//       console.log(`❌ Город не совпадает: апартаменты.city=${apartment.city}, фильтр.city=${filters.city}`);
//       return false;
//     }
    
//     // Категория
//     if (filters.category && filters.category !== '') {
//       if (apartment.category !== filters.category) {
//         console.log(`❌ Категория не совпадает: апартаменты.category=${apartment.category}, фильтр.category=${filters.category}`);
//         return false;
//       }
//     }
    
//     // Цена
//     if (filters.priceRange && filters.priceRange.length === 2) {
//       const price = Number(apartment.price) || 0;
//       if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
//         console.log(`❌ Цена не в диапазоне: price=${price}, диапазон=${filters.priceRange}`);
//         return false;
//       }
//     }
    
//     // Комнаты
//     if (filters.rooms) {
//       const rooms = String(apartment.rooms || '');
//       const filterValue = String(filters.rooms);
      
//       if (filterValue === '6+') {
//         const roomsNum = parseInt(rooms) || 0;
//         if (roomsNum < 6) {
//           console.log(`❌ Комнат меньше 6: rooms=${rooms}`);
//           return false;
//         }
//       } else {
//         if (rooms !== filterValue && Number(rooms) !== Number(filterValue)) {
//           console.log(`❌ Комнаты не совпадают: rooms=${rooms}, фильтр=${filterValue}`);
//           return false;
//         }
//       }
//     }
    
//     // Гости
//     if (filters.guests) {
//       const beds = Number(apartment.beds) || 0;
//       const filterValue = String(filters.guests);
      
//       if (filterValue === '10+') {
//         if (beds < 10) {
//           console.log(`❌ Гостей меньше 10: beds=${beds}`);
//           return false;
//         }
//       } else {
//         const guestValue = parseInt(filterValue);
//         if (beds < guestValue) {
//           console.log(`❌ Гостей меньше ${guestValue}: beds=${beds}`);
//           return false;
//         }
//       }
//     }
    
//     // Площадь
//     if (filters.areaRange && filters.areaRange.length === 2) {
//       const size = Number(apartment.size) || 0;
//       if (size < filters.areaRange[0] || size > filters.areaRange[1]) {
//         console.log(`❌ Площадь не в диапазоне: size=${size}, диапазон=${filters.areaRange}`);
//         return false;
//       }
//     }
    
//     // Удобства
//     if (filters.conveniences && filters.conveniences.length > 0) {
//       const aptConveniences = apartment.conveniences || [];
//       const normalizedFilters = filters.conveniences.map(conv => normalizeConvenience(conv));
//       const normalizedApt = aptConveniences.map(conv => normalizeConvenience(conv));
      
//       const allConveniencesMatch = normalizedFilters.every(conv => normalizedApt.includes(conv));
//       if (!allConveniencesMatch) {
//         console.log(`❌ Не все удобства есть: нужны ${filters.conveniences}, есть ${aptConveniences}`);
//         return false;
//       }
//     }
    
//     // Район
//     if (filters.district && filters.district.trim() !== '') {
//       if (apartment.district !== filters.district) {
//         console.log(`❌ Район не совпадает: район=${apartment.district}, фильтр=${filters.district}`);
//         return false;
//       }
//     }
    
//     // Метро
//     if (filters.metroStation && filters.metroStation.trim() !== '') {
//       const apartmentMetro = apartment.metro || '';
//       const normalizedFilterMetro = normalizeMetro(filters.metroStation);
//       const normalizedApartmentMetro = normalizeMetro(apartmentMetro);
      
//       if (normalizedFilterMetro !== normalizedApartmentMetro) {
//         console.log(`❌ Метро не совпадает: метро=${apartmentMetro}, фильтр=${filters.metroStation}`);
//         return false;
//       }
//     }
    
//     // Булевы фильтры
//     if (filters.smoking && filters.smoking !== 'any') {
//       const filterValue = filters.smoking === 'yes';
//       if (normalizeBoolean(apartment.smoking) !== filterValue) {
//         console.log(`❌ Курение не совпадает: smoking=${apartment.smoking}, фильтр=${filters.smoking}`);
//         return false;
//       }
//     }
    
//     if (filters.parties && filters.parties !== 'any') {
//       const filterValue = filters.parties === 'yes';
//       if (normalizeBoolean(apartment.parties) !== filterValue) {
//         console.log(`❌ Вечеринки не совпадают: parties=${apartment.parties}, фильтр=${filters.parties}`);
//         return false;
//       }
//     }
    
//     if (filters.pets && filters.pets !== 'any') {
//       const filterValue = filters.pets === 'yes';
//       if (normalizeBoolean(apartment.pets) !== filterValue) {
//         console.log(`❌ Животные не совпадают: pets=${apartment.pets}, фильтр=${filters.pets}`);
//         return false;
//       }
//     }
    
//     if (filters.fullDay && filters.fullDay !== 'any') {
//       const filterValue = filters.fullDay === 'yes';
//       if (normalizeBoolean(apartment.fullDayCheckIn) !== filterValue) {
//         console.log(`❌ Круглосуточно не совпадает: fullDay=${apartment.fullDayCheckIn}, фильтр=${filters.fullDay}`);
//         return false;
//       }
//     }
    
//     if (filters.reportDocs && filters.reportDocs !== 'any') {
//       const filterValue = filters.reportDocs === 'yes';
//       if (normalizeBoolean(apartment.reportDocs) !== filterValue) {
//         console.log(`❌ Отчетные документы не совпадают: reportDocs=${apartment.reportDocs}, фильтр=${filters.reportDocs}`);
//         return false;
//       }
//     }
    
//     console.log(`✅ Квартира прошла все фильтры: ${apartment._id}`);
//     return true;
//   };

//   // Функция для подсчета совпадений по отдельным фильтрам
//   const getFilterMatchCount = (filters) => {
//     if (!filters || Object.keys(filters).length === 0) return {};
    
//     const matches = {};
    
//     Object.keys(filters).forEach(key => {
//       if (key === 'sortBy') return;
      
//       if (key === 'priceRange' && filters.priceRange) {
//         matches.price = searchResults.filter(apt => {
//           const price = Number(apt.price) || 0;
//           return price >= filters.priceRange[0] && price <= filters.priceRange[1];
//         }).length;
//       }
//       else if (key === 'rooms' && filters.rooms) {
//         const filterValue = String(filters.rooms);
        
//         matches.rooms = searchResults.filter(apt => {
//           const rooms = String(apt.rooms || '');
          
//           if (filterValue === '6+') {
//             const roomsNum = parseInt(rooms) || 0;
//             return roomsNum >= 6;
//           } else {
//             return rooms === filterValue || Number(rooms) === Number(filterValue);
//           }
//         }).length;
//       }
//       else if (key === 'guests' && filters.guests) {
//         const filterValue = String(filters.guests);
        
//         matches.guests = searchResults.filter(apt => {
//           const beds = Number(apt.beds) || 0;
          
//           if (filterValue === '10+') {
//             return beds >= 10;
//           } else {
//             const guestValue = parseInt(filterValue);
//             return beds >= guestValue;
//           }
//         }).length;
//       }
//       else if (key === 'areaRange' && filters.areaRange) {
//         matches.area = searchResults.filter(apt => {
//           const size = Number(apt.size) || 0;
//           return size >= filters.areaRange[0] && size <= filters.areaRange[1];
//         }).length;
//       }
//       else if (key === 'district' && filters.district) {
//         matches.district = searchResults.filter(apt => {
//           return apt.district === filters.district;
//         }).length;
//       }
//       else if (key === 'metroStation' && filters.metroStation) {
//         const normalizedFilterMetro = normalizeMetro(filters.metroStation);
        
//         matches.metro = searchResults.filter(apt => {
//           const aptMetro = apt.metro || '';
//           const normalizedApartmentMetro = normalizeMetro(aptMetro);
//           return normalizedFilterMetro === normalizedApartmentMetro;
//         }).length;
//       }
//       else if (key === 'conveniences' && filters.conveniences?.length > 0) {
//         filters.conveniences.forEach((conv) => {
//           const normalizedConv = normalizeConvenience(conv);
          
//           const matchCount = searchResults.filter(apt => {
//             const aptConveniences = apt.conveniences || [];
//             const normalizedApt = aptConveniences.map(c => normalizeConvenience(c));
//             return normalizedApt.includes(normalizedConv);
//           }).length;
          
//           matches[`conv_${conv}`] = {
//             count: matchCount,
//             id: conv,
//             label: getConvenienceLabel(conv)
//           };
//         });
//       }
//       else if (['smoking', 'parties', 'pets', 'fullDay', 'reportDocs', 'city', 'category'].includes(key) && filters[key] !== 'any') {
//         // Для города и категории проверяем наличие
//         if (key === 'city') {
//           matches.city = searchResults.filter(apt => isCityMatch(apt.city, filters.city)).length;
//         } else if (key === 'category') {
//           matches.category = searchResults.filter(apt => apt.category === filters.category).length;
//         } else {
//           const filterValue = filters[key] === 'yes';
          
//           matches[key] = searchResults.filter(apt => {
//             let apartmentValue;
            
//             if (key === 'fullDay') {
//               apartmentValue = apt.fullDayCheckIn;
//             } else {
//               apartmentValue = apt[key];
//             }
            
//             return normalizeBoolean(apartmentValue) === filterValue;
//           }).length;
//         }
//       }
//     });
    
//     return matches;
//   };

//   const applyFilters = useCallback((results, filters) => {
//     if (!results || !results.length) return [];
    
//     console.log('\n🔍 ПРИМЕНЯЕМ ФИЛЬТРЫ К РЕЗУЛЬТАТАМ:', results.length);
//     console.log('📋 Фильтры:', JSON.stringify(filters, null, 2));
    
//     const filtered = results.filter(apt => matchesFilters(apt, filters));
    
//     console.log(`\n✅ ПОСЛЕ ФИЛЬТРАЦИИ: ${filtered.length} результатов из ${results.length}`);
    
//     if (filters.sortBy && filters.sortBy !== 'recommended' && filtered.length > 0) {
//       filtered.sort((a, b) => {
//         const priceA = Number(a.price) || 0;
//         const priceB = Number(b.price) || 0;
//         return filters.sortBy === 'priceAsc' ? priceA - priceB : priceB - priceA;
//       });
//     }
    
//     return filtered;
//   }, []);

//   // ========== ФУНКЦИЯ ДЛЯ ОБНОВЛЕНИЯ ИСТОРИИ ==========
//   const updateFilterHistory = (newFilters, oldFilters) => {
//     const newHistory = [...filterHistory];
    
//     Object.keys(newFilters).forEach(key => {
//       if (key === 'sortBy' || key === 'city' || key === 'category') return;
      
//       const oldValue = oldFilters[key];
//       const newValue = newFilters[key];
      
//       // Для удобств - особая обработка
//       if (key === 'conveniences') {
//         const oldConvs = oldValue || [];
//         const newConvs = newValue || [];
        
//         // Если появились новые удобства
//         if (newConvs.length > 0 && !newHistory.includes('conveniences')) {
//           newHistory.push('conveniences');
//           console.log(`✅ Добавлен в историю: conveniences`);
//         }
        
//         // Если все удобства убрали
//         if (newConvs.length === 0 && newHistory.includes('conveniences')) {
//           const index = newHistory.indexOf('conveniences');
//           newHistory.splice(index, 1);
//           console.log(`❌ Удален из истории: conveniences`);
//         }
        
//         return;
//       }
      
//       // Проверяем, был ли фильтр пустым и стал непустым
//       const wasEmpty = !oldValue || 
//         (Array.isArray(oldValue) && oldValue.length === 0) || 
//         oldValue === '' || 
//         oldValue === 'any';
        
//       const isNotEmpty = newValue && 
//         (!Array.isArray(newValue) || newValue.length > 0) && 
//         newValue !== '' && 
//         newValue !== 'any';
      
//       // Добавляем в историю ВСЕ фильтры, которые стали непустыми
//       if (wasEmpty && isNotEmpty && !newHistory.includes(key)) {
//         newHistory.push(key);
//         console.log(`✅ Добавлен в историю: ${key}`);
//       }
      
//       // Удаляем из истории, если фильтр сброшен
//       if (!isNotEmpty && newHistory.includes(key)) {
//         const index = newHistory.indexOf(key);
//         newHistory.splice(index, 1);
//         console.log(`❌ Удален из истории: ${key}`);
//       }
//     });
    
//     console.log('📋 Итоговая история:', newHistory);
//     setFilterHistory(newHistory);
//     return newHistory;
//   };

//   // ========== ОСНОВНАЯ ФУНКЦИЯ ОБРАБОТКИ ФИЛЬТРОВ ==========
//   const handleFilterChange = useCallback((newFilters) => {
//     // Предотвращаем циклы при сбросе
//     if (isResettingRef.current) {
//       console.log('⚠️ Пропускаем handleFilterChange из-за isResettingRef');
//       return;
//     }
    
//     console.log('\n📊 НОВЫЕ ФИЛЬТРЫ:', JSON.stringify(newFilters, null, 2));
    
//     // Обновляем историю выбора фильтров
//     const history = updateFilterHistory(newFilters, activeFilters);
//     console.log('📊 История выбора (все фильтры):', history);
    
//     // Применяем все фильтры и получаем общий результат
//     const filtered = applyFilters(searchResults, newFilters);
//     console.log('📊 Отфильтровано результатов:', filtered.length);
    
//     // Определяем, какие фильтры работают
//     const working = {};
    
//     // Получаем ВСЕ активные фильтры (которые реально выбраны и имеют значения)
//     const allActiveFilters = Object.keys(newFilters).filter(key => {
//       if (key === 'sortBy') return false;
      
//       const value = newFilters[key];
//       // Проверяем, что фильтр действительно активен
//       const isActive = value && 
//         (!Array.isArray(value) || value.length > 0) && 
//         value !== '' && 
//         value !== 'any';
      
//       return isActive;
//     });
    
//     console.log('📊 Все активные фильтры:', allActiveFilters);
    
//     // Если есть результаты - все фильтры зеленые
//     if (filtered.length > 0) {
//       allActiveFilters.forEach(key => {
//         if (key === 'conveniences') {
//           newFilters.conveniences.forEach(conv => {
//             working[`conv_${conv}`] = true;
//           });
//         } else {
//           working[key] = true;
//         }
//       });
      
//       if (newFilters.city) {
//         working.city = true;
//       }
      
//       if (newFilters.category && newFilters.category !== '') {
//         working.category = true;
//       }
      
//       console.log('📊 Работающие фильтры (есть результаты):', working);
//       setWorkingFilters(working);
//       setActiveFilters(newFilters);
//       setFilteredResults(filtered);
//       return;
//     }
    
//     // ЕСЛИ РЕЗУЛЬТАТОВ НЕТ - ИЩЕМ СЛОМАННЫЙ ФИЛЬТР
//     console.log('🔍 Поиск сломанного фильтра...');
    
//     // Создаем массив всех фильтров в порядке истории
//     const allFiltersInOrder = [];
    
//     // Сначала добавляем все фильтры из истории
//     history.forEach(item => {
//       if (item === 'conveniences') {
//         if (newFilters.conveniences && newFilters.conveniences.length > 0) {
//           allFiltersInOrder.push('conveniences');
//         }
//       } else if (allActiveFilters.includes(item)) {
//         allFiltersInOrder.push(item);
//       }
//     });
    
//     // Добавляем остальные фильтры, которых нет в истории
//     allActiveFilters.forEach(filter => {
//       if (!allFiltersInOrder.includes(filter) && filter !== 'conveniences' && filter !== 'city' && filter !== 'category') {
//         allFiltersInOrder.push(filter);
//       }
//     });
    
//     console.log('📊 Проверяем в порядке выбора:', allFiltersInOrder);
    
//     // Находим первый фильтр, который "ломает" выдачу
//     let brokenFilter = null;
//     let brokenIndex = -1;
//     let filtersToTest = {};
    
//     // Добавляем город и категорию, если они есть
//     if (newFilters.city) {
//       filtersToTest.city = newFilters.city;
//     }
    
//     if (newFilters.category && newFilters.category !== '') {
//       filtersToTest.category = newFilters.category;
//     }
    
//     // Проверяем пользовательские фильтры по одному в порядке выбора
//     for (let i = 0; i < allFiltersInOrder.length; i++) {
//       const key = allFiltersInOrder[i];
      
//       if (key === 'conveniences') {
//         // Добавляем все удобства
//         filtersToTest.conveniences = newFilters.conveniences;
//       } else {
//         // Добавляем обычный фильтр
//         filtersToTest[key] = newFilters[key];
//       }
      
//       // Проверяем, есть ли результаты с текущим набором
//       const testResults = applyFilters(searchResults, filtersToTest);
//       console.log(`📊 После добавления ${key}: ${testResults.length} результатов`);
      
//       if (testResults.length === 0) {
//         // Этот фильтр сломал выдачу
//         brokenFilter = key;
//         brokenIndex = i;
//         console.log(`🔴 Сломанный фильтр: ${key}`);
//         break;
//       }
//     }
    
//     // Устанавливаем статусы для всех фильтров
//     allFiltersInOrder.forEach((key, index) => {
//       if (brokenFilter === null) {
//         // Если нет сломанного фильтра - все зеленые
//         if (key === 'conveniences') {
//           if (newFilters.conveniences && newFilters.conveniences.length > 0) {
//             newFilters.conveniences.forEach(conv => {
//               working[`conv_${conv}`] = true;
//             });
//           }
//         } else {
//           working[key] = true;
//         }
//       } else {
//         // Все фильтры до сломанного - зеленые, сломанный и после - красные
//         if (index < brokenIndex) {
//           if (key === 'conveniences') {
//             newFilters.conveniences.forEach(conv => {
//               working[`conv_${conv}`] = true;
//             });
//           } else {
//             working[key] = true;
//           }
//         } else {
//           if (key === 'conveniences') {
//             newFilters.conveniences.forEach(conv => {
//               working[`conv_${conv}`] = false;
//             });
//           } else {
//             working[key] = false;
//           }
//         }
//       }
//     });
    
//     // Город и категория проверяются отдельно
//     if (newFilters.city) {
//       const cityAloneTest = applyFilters(searchResults, { city: newFilters.city });
//       working.city = cityAloneTest.length > 0;
//     }
    
//     if (newFilters.category && newFilters.category !== '') {
//       const categoryAloneTest = applyFilters(searchResults, { category: newFilters.category });
//       working.category = categoryAloneTest.length > 0;
//     }
    
//     console.log('📊 Итоговые работающие фильтры:', working);
    
//     setWorkingFilters(working);
//     setActiveFilters(newFilters);
//     setFilteredResults(filtered);
//   }, [searchResults, activeFilters, filterHistory, applyFilters]);

//   const handleResetFilters = () => {
//     setActiveFilters({});
//     setWorkingFilters({});
//     setFilterHistory([]);
//     setFilteredResults(searchResults);
//   };

//   useEffect(() => {
//     console.log('\n📦 Инициализация страницы поиска');
    
//     // Используем данные с сервера
//     if (serverApartments && serverApartments.length > 0) {
//       console.log('📊 Данные с сервера:', serverApartments.length);
      
//       // Логируем все города из ответа сервера
//       const cities = new Set();
//       serverApartments.forEach(apt => {
//         if (apt.city) cities.add(apt.city);
//       });
//       console.log('🏙️ Города в данных сервера:', Array.from(cities));
      
//       // Логируем первые 5 квартир
//       serverApartments.slice(0, 5).forEach((apt, index) => {
//         console.log(`🏠 Квартира ${index + 1}:`, {
//           id: apt._id,
//           city: apt.city,
//           category: apt.category,
//           price: apt.price,
//           beds: apt.beds
//         });
//       });
      
//       const shuffledResults = [...serverApartments].sort(() => Math.random() - 0.5);
      
//       setSearchResults(shuffledResults);
//       setFilteredResults(shuffledResults);
      
//       if (shuffledResults.length > 0) {
//         const firstApartmentCity = shuffledResults[0]?.city || '';
//         const cleanCity = firstApartmentCity.split(',')[0].trim();
//         setCurrentCity(cleanCity);
//       }
      
//       // Получаем параметры из localStorage (если есть)
//       try {
//         const params = localStorage.getItem('searchParams');
//         if (params) {
//           const parsedParams = JSON.parse(params);
//           setSearchParams(parsedParams);
//           console.log('📋 Параметры поиска из localStorage:', parsedParams);
          
//           // Применяем фильтры из параметров поиска
//           const initialFilters = {};
          
//           if (parsedParams.location) {
//             initialFilters.city = parsedParams.location;
//             console.log('🏙️ Город из поиска:', parsedParams.location);
//           }
          
//           if (parsedParams.types && parsedParams.types.length > 0) {
//             initialFilters.category = normalizeCategory(parsedParams.types[0]);
//             console.log('🏷️ Категория из поиска:', initialFilters.category);
//           }
          
//           if (parsedParams.guests) {
//             // НЕ применяем фильтр гостей при инициализации!
//             console.log('👥 Гости из поиска (не применяем):', parsedParams.guests);
//           }
          
//           console.log('🚀 Применяем начальные фильтры из поиска:', initialFilters);
          
//           if (Object.keys(initialFilters).length > 0) {
//             setActiveFilters(initialFilters);
//             const filtered = applyFilters(shuffledResults, initialFilters);
//             console.log(`📊 После применения фильтров: ${filtered.length} результатов`);
//             setFilteredResults(filtered);
            
//             const working = {};
//             Object.keys(initialFilters).forEach(key => {
//               working[key] = true;
//             });
//             setWorkingFilters(working);
//           }
//         }
//       } catch (err) {
//         console.error('Ошибка загрузки параметров из localStorage:', err);
//       }
      
//       setLoading(false);
//     } else {
//       console.log('📊 Нет данных с сервера');
//       setLoading(false);
//     }

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
//         (error) => console.log('Geolocation not available or denied')
//       );
//     }
//   }, [serverApartments, applyFilters]);

//   const handleBackToSearch = () => router.push('/');
//   const handleNewSearch = () => router.push('/');
//   const handleApartmentSelect = (apartment) => router.push(`/apartment/${apartment._id}`);

//   const handleToggleFavorite = async (apartmentId) => {
//     try {
//       const userProfile = localStorage.getItem('user_profile');
//       if (!userProfile) {
//         setSnackbar({ open: true, message: t.loginRequired, severity: 'warning' });
//         return;
//       }
//       const wasFavorite = isFavorite(apartmentId);
//       await toggleFavorite(apartmentId);
//       setSnackbar({ open: true, message: wasFavorite ? t.favoriteRemove : t.favoriteAdd, severity: 'success' });
//     } catch (error) {
//       console.error('Error toggling favorite:', error);
//       setSnackbar({ open: true, message: t.favoriteError, severity: 'error' });
//     }
//   };

//   const handleCloseSnackbar = () => setSnackbar(prev => ({ ...prev, open: false }));

//   const hasActiveFilters = Object.keys(activeFilters).length > 0 && 
//     Object.keys(activeFilters).some(key => {
//       if (key === 'sortBy') return false;
//       if (key === 'priceRange') return activeFilters.priceRange && (activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 10000);
//       if (key === 'areaRange') return activeFilters.areaRange && (activeFilters.areaRange[0] > 0 || activeFilters.areaRange[1] < 500);
//       if (key === 'conveniences') return activeFilters.conveniences && activeFilters.conveniences.length > 0;
//       if (key === 'guests') return activeFilters.guests && activeFilters.guests !== '';
//       if (key === 'rooms') return activeFilters.rooms && activeFilters.rooms !== '';
//       if (key === 'district') return activeFilters.district && activeFilters.district.trim() !== '';
//       if (key === 'metroStation') return activeFilters.metroStation && activeFilters.metroStation.trim() !== '';
//       if (['smoking', 'parties', 'pets', 'fullDay', 'reportDocs'].includes(key)) {
//         return activeFilters[key] && activeFilters[key] !== 'any';
//       }
//       if (key === 'category') return activeFilters.category && activeFilters.category !== '';
//       if (key === 'city') return activeFilters.city && activeFilters.city !== '';
//       return false;
//     });

//   const displayResults = filteredResults;
//   const filterMatches = getFilterMatchCount(activeFilters);
//   const hasResults = displayResults.length > 0;

//   // Логируем для отладки
//   useEffect(() => {
//     if (Object.keys(activeFilters).length > 0) {
//       console.log('\n📊 ТЕКУЩЕЕ СОСТОЯНИЕ:');
//       console.log('📊 filterMatches:', filterMatches);
//       console.log('📊 Есть результаты:', hasResults);
//       console.log('📊 Работающие фильтры:', workingFilters);
//       console.log('📊 История выбора:', filterHistory);
//     }
//   }, [activeFilters, filterMatches, hasResults, workingFilters, filterHistory]);

//   if (loading) {
//     return (
//       <>
//         <Head><title>{t.metaTitle}</title><meta name="description" content={t.metaDescription} /></Head>
//         <Container sx={{ py: 4, textAlign: 'center' }}>
//           <CircularProgress sx={{ mb: 2 }} />
//           <Typography>{t.loading}</Typography>
//         </Container>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <Head><title>{t.metaTitle}</title><meta name="description" content={t.metaDescription} /></Head>
//         <Container sx={{ py: 4, textAlign: 'center' }}>
//           <Warning sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
//           <Typography variant="h6" color="error" gutterBottom>{error}</Typography>
//           <Button variant="contained" onClick={handleNewSearch} sx={{ mt: 2 }}>{t.changeSearch}</Button>
//         </Container>
//       </>
//     );
//   }

//   return (
//     <>
//       <Head><title>{t.metaTitle}</title><meta name="description" content={t.metaDescription} /></Head>
//       <Container sx={{ py: 4 }}>
//         <Button startIcon={<ArrowBack />} onClick={handleBackToSearch} sx={{ mb: 3 }}>{t.back}</Button>

//         {searchParams && (
//           <Box sx={{ mb: 4 }}>
//             <Typography variant="h4" component="h1" gutterBottom>{t.title}</Typography>
//             <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
//               {searchParams.location && (
//                 <Chip icon={<LocationOn />} label={`${t.location}: ${searchParams.location}`} variant="outlined" color="primary" />
//               )}
//               {searchParams.guests && (
//                 <Chip icon={<People />} label={`${t.guestsLabel}: ${searchParams.guests}`} variant="outlined" color="primary" />
//               )}
//               {searchParams.types && searchParams.types.length > 0 && (
//                 <Chip icon={<Category />} label={`${t.types}: ${searchParams.types.map(type => translateCategory(normalizeCategory(type))).join(', ')}`} variant="outlined" color="primary" />
//               )}
//             </Box>
            
//             {foundCategories.length > 0 && (
//               <Box sx={{ mt: 2 }}>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{t.foundCategories}:</Typography>
//                 <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
//                   {foundCategories.map(category => (
//                     <Chip key={category} label={translateCategory(category)} size="small"
//                       sx={{ backgroundColor: getCategoryColor(category), color: 'white', fontSize: '0.7rem', height: '24px' }} />
//                   ))}
//                 </Box>
//               </Box>
//             )}
//           </Box>
//         )}

//         <Divider sx={{ mb: 4 }} />

//         {/* Статистика фильтров */}
//         {hasActiveFilters && Object.keys(filterMatches).length > 0 && (
//           <Paper sx={{ p: 2, mb: 3, bgcolor: '#f5f5f5' }}>
//             <Typography variant="subtitle2" gutterBottom>
//               {t.activeFilters}:
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              
//               {/* Город */}
//               {activeFilters.city && filterMatches.city !== undefined && (
//                 <Tooltip title={`${t.filterMatches} ${t.city.toLowerCase()}: ${filterMatches.city} ${t.outOf} ${searchResults.length}`}>
//                   <Chip
//                     icon={workingFilters.city ? <CheckCircleIcon /> : <CancelIcon />}
//                     label={activeFilters.city}
//                     color={workingFilters.city ? "success" : "error"}
//                     variant={workingFilters.city ? "filled" : "outlined"}
//                     size="small"
//                   />
//                 </Tooltip>
//               )}
              
//               {/* Категория */}
//               {activeFilters.category && activeFilters.category !== '' && filterMatches.category !== undefined && (
//                 <Tooltip title={`${t.filterMatches} ${t.category.toLowerCase()}: ${filterMatches.category} ${t.outOf} ${searchResults.length}`}>
//                   <Chip
//                     icon={workingFilters.category ? <CheckCircleIcon /> : <CancelIcon />}
//                     label={translateCategory(activeFilters.category)}
//                     color={workingFilters.category ? "success" : "error"}
//                     variant={workingFilters.category ? "filled" : "outlined"}
//                     size="small"
//                   />
//                 </Tooltip>
//               )}
              
//               {/* Цена */}
//               {filterMatches.price !== undefined && (
//                 <Tooltip title={`${t.filterMatches} ціни: ${filterMatches.price} ${t.outOf} ${searchResults.length}`}>
//                   <Chip
//                     icon={workingFilters.priceRange ? <CheckCircleIcon /> : <CancelIcon />}
//                     label={`${t.price}: ${activeFilters.priceRange[0]}-${activeFilters.priceRange[1]} грн`}
//                     color={workingFilters.priceRange ? "success" : "error"}
//                     variant={workingFilters.priceRange ? "filled" : "outlined"}
//                     size="small"
//                   />
//                 </Tooltip>
//               )}
              
//               {/* Комнаты */}
//               {filterMatches.rooms !== undefined && (
//                 <Tooltip title={`${t.filterMatches} кімнат: ${filterMatches.rooms} ${t.outOf} ${searchResults.length}`}>
//                   <Chip
//                     icon={workingFilters.rooms ? <CheckCircleIcon /> : <CancelIcon />}
//                     label={`${t.rooms}: ${activeFilters.rooms}`}
//                     color={workingFilters.rooms ? "success" : "error"}
//                     variant={workingFilters.rooms ? "filled" : "outlined"}
//                     size="small"
//                   />
//                 </Tooltip>
//               )}
              
//               {/* Гости */}
//               {filterMatches.guests !== undefined && (
//                 <Tooltip title={`${t.filterMatches} гостей: ${filterMatches.guests} ${t.outOf} ${searchResults.length}`}>
//                   <Chip
//                     icon={workingFilters.guests ? <CheckCircleIcon /> : <CancelIcon />}
//                     label={`${t.guests}: ${activeFilters.guests}`}
//                     color={workingFilters.guests ? "success" : "error"}
//                     variant={workingFilters.guests ? "filled" : "outlined"}
//                     size="small"
//                   />
//                 </Tooltip>
//               )}
              
//               {/* Площадь */}
//               {filterMatches.area !== undefined && (
//                 <Tooltip title={`${t.filterMatches} площі: ${filterMatches.area} ${t.outOf} ${searchResults.length}`}>
//                   <Chip
//                     icon={workingFilters.areaRange ? <CheckCircleIcon /> : <CancelIcon />}
//                     label={`${t.area}: ${activeFilters.areaRange[0]}-${activeFilters.areaRange[1]} м²`}
//                     color={workingFilters.areaRange ? "success" : "error"}
//                     variant={workingFilters.areaRange ? "filled" : "outlined"}
//                     size="small"
//                   />
//                 </Tooltip>
//               )}
              
//               {/* Район */}
//               {filterMatches.district !== undefined && (
//                 <Tooltip title={`${t.filterMatches} району: ${filterMatches.district} ${t.outOf} ${searchResults.length}`}>
//                   <Chip
//                     icon={workingFilters.district ? <CheckCircleIcon /> : <CancelIcon />}
//                     label={`${t.district}: ${getDistrictName(activeFilters.district, currentLanguage)}`}
//                     color={workingFilters.district ? "success" : "error"}
//                     variant={workingFilters.district ? "filled" : "outlined"}
//                     size="small"
//                   />
//                 </Tooltip>
//               )}
              
//               {/* Метро */}
//               {filterMatches.metro !== undefined && (
//                 <Tooltip title={`${t.filterMatches} метро: ${filterMatches.metro} ${t.outOf} ${searchResults.length}`}>
//                   <Chip
//                     icon={workingFilters.metroStation ? <CheckCircleIcon /> : <CancelIcon />}
//                     label={`Метро: ${activeFilters.metroStation}`}
//                     color={workingFilters.metroStation ? "success" : "error"}
//                     variant={workingFilters.metroStation ? "filled" : "outlined"}
//                     size="small"
//                   />
//                 </Tooltip>
//               )}
              
//               {/* Удобства */}
//               {Object.keys(filterMatches).filter(key => key.startsWith('conv_')).map((key) => {
//                 const match = filterMatches[key];
//                 const displayLabel = match.label || match.id;
                
//                 return (
//                   <Tooltip key={key} title={`${t.filterMatches} ${t.conveniences.toLowerCase()}: ${match.count} ${t.outOf} ${searchResults.length}`}>
//                     <Chip
//                       icon={workingFilters[key] ? <CheckCircleIcon /> : <CancelIcon />}
//                       label={`${displayLabel}`}
//                       color={workingFilters[key] ? "success" : "error"}
//                       variant={workingFilters[key] ? "filled" : "outlined"}
//                       size="small"
//                     />
//                   </Tooltip>
//                 );
//               })}
              
//               {/* Курение */}
//               {filterMatches.smoking !== undefined && (
//                 <Tooltip title={`${t.filterMatches} куріння: ${filterMatches.smoking} ${t.outOf} ${searchResults.length}`}>
//                   <Chip
//                     icon={workingFilters.smoking ? <CheckCircleIcon /> : <CancelIcon />}
//                     label={`${t.smoking}: ${activeFilters.smoking === 'yes' ? t.yes : t.no}`}
//                     color={workingFilters.smoking ? "success" : "error"}
//                     variant={workingFilters.smoking ? "filled" : "outlined"}
//                     size="small"
//                   />
//                 </Tooltip>
//               )}
              
//               {/* Вечеринки */}
//               {filterMatches.parties !== undefined && (
//                 <Tooltip title={`${t.filterMatches} вечірок: ${filterMatches.parties} ${t.outOf} ${searchResults.length}`}>
//                   <Chip
//                     icon={workingFilters.parties ? <CheckCircleIcon /> : <CancelIcon />}
//                     label={`${t.parties}: ${activeFilters.parties === 'yes' ? t.yes : t.no}`}
//                     color={workingFilters.parties ? "success" : "error"}
//                     variant={workingFilters.parties ? "filled" : "outlined"}
//                     size="small"
//                   />
//                 </Tooltip>
//               )}
              
//               {/* Животные */}
//               {filterMatches.pets !== undefined && (
//                 <Tooltip title={`${t.filterMatches} тварин: ${filterMatches.pets} ${t.outOf} ${searchResults.length}`}>
//                   <Chip
//                     icon={workingFilters.pets ? <CheckCircleIcon /> : <CancelIcon />}
//                     label={`${t.pets}: ${activeFilters.pets === 'yes' ? t.yes : t.no}`}
//                     color={workingFilters.pets ? "success" : "error"}
//                     variant={workingFilters.pets ? "filled" : "outlined"}
//                     size="small"
//                   />
//                 </Tooltip>
//               )}
              
//               {/* Круглосуточно */}
//               {filterMatches.fullDay !== undefined && (
//                 <Tooltip title={`${t.filterMatches} цілодобово: ${filterMatches.fullDay} ${t.outOf} ${searchResults.length}`}>
//                   <Chip
//                     icon={workingFilters.fullDay ? <CheckCircleIcon /> : <CancelIcon />}
//                     label={`${t.fullDay}: ${activeFilters.fullDay === 'yes' ? t.yes : t.no}`}
//                     color={workingFilters.fullDay ? "success" : "error"}
//                     variant={workingFilters.fullDay ? "filled" : "outlined"}
//                     size="small"
//                   />
//                 </Tooltip>
//               )}
              
//               {/* Отчетные документы */}
//               {filterMatches.reportDocs !== undefined && (
//                 <Tooltip title={`${t.filterMatches} звітних документів: ${filterMatches.reportDocs} ${t.outOf} ${searchResults.length}`}>
//                   <Chip
//                     icon={workingFilters.reportDocs ? <CheckCircleIcon /> : <CancelIcon />}
//                     label={`${t.reportDocs}: ${activeFilters.reportDocs === 'yes' ? t.yes : t.no}`}
//                     color={workingFilters.reportDocs ? "success" : "error"}
//                     variant={workingFilters.reportDocs ? "filled" : "outlined"}
//                     size="small"
//                   />
//                 </Tooltip>
//               )}
//             </Box>
//           </Paper>
//         )}

//         {searchResults.length > 0 && (
//           <Box sx={{ mb: 4 }}>
//             <Box sx={{ height: '200px', borderRadius: 2, overflow: 'hidden', border: '1px solid #e0e0e0', mb: 2 }}>
//               <MapComponent apartments={displayResults} onApartmentSelect={handleApartmentSelect} userLocation={userLocation} compactMode={true} />
//             </Box>
//             <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//               <Button variant="contained" startIcon={<MapIcon />} onClick={() => setMapOpen(true)}>{t.viewMap}</Button>
//             </Box>
//           </Box>
//         )}

//         {searchResults.length > 0 && (
//           <Box sx={{ mb: 4 }}>
//             <SearchApartmentFilters
//               apartments={searchResults}
//               onFilterChange={handleFilterChange}
//               searchParams={searchParams}
//               loading={loading}
//               totalResults={filteredResults.length}
//               currentCity={currentCity}
//               filterStatus={workingFilters}
//             />
//           </Box>
//         )}

//         {displayResults.length > 0 ? (
//           <Grid container spacing={3}>
//             {displayResults.map((apartment) => (
//               <Grid item xs={12} sm={6} md={4} key={apartment._id}>
//                 <ApartmentCard
//                   apartment={apartment}
//                   isFavorite={isFavorite(apartment._id)}
//                   toggleFavorite={() => handleToggleFavorite(apartment._id)}
//                   showCreateUserDialog={() => {}}
//                   onShowOnMap={() => setSelectedApartment(apartment)}
//                   onClick={() => handleApartmentSelect(apartment)}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Box sx={{ textAlign: 'center', py: 8 }}>
//             <Warning sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
//             <Typography variant="h6" color="text.secondary" gutterBottom>
//               {hasActiveFilters ? t.noFilterResults : t.noResults}
//             </Typography>
//             {hasActiveFilters && (
//               <>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{t.tryAgain}</Typography>
//                 <Button variant="contained" onClick={handleResetFilters} sx={{ mt: 2, mr: 2 }}>{t.resetFilters}</Button>
//               </>
//             )}
//             <Button variant="outlined" onClick={handleNewSearch} sx={{ mt: 2 }}>{t.changeSearch}</Button>
//           </Box>
//         )}

//         <Dialog open={mapOpen} onClose={() => setMapOpen(false)} maxWidth="xl" fullWidth
//           sx={{ '& .MuiDialog-paper': { height: { xs: '90vh', sm: '80vh' }, maxHeight: '90vh' } }}>
//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <Typography variant="h6">{t.found}: <strong>{displayResults.length}</strong></Typography>
//               {selectedApartment && (
//                 <Chip label={translateCategory(selectedApartment.category)} size="small"
//                   sx={{ backgroundColor: getCategoryColor(selectedApartment.category), color: 'white' }} />
//               )}
//             </Box>
//             <IconButton onClick={() => setMapOpen(false)}><Close /></IconButton>
//           </DialogTitle>
          
//           {foundCategories.length > 0 && (
//             <Box sx={{ px: 3, pb: 1 }}>
//               <Typography variant="body2" color="text.secondary" gutterBottom>{t.categoriesOnMap}:</Typography>
//               <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//                 {foundCategories.map(category => (
//                   <Chip key={category} label={translateCategory(category)} size="small"
//                     sx={{ backgroundColor: getCategoryColor(category), color: 'white' }} />
//                 ))}
//               </Box>
//             </Box>
//           )}
          
//           <DialogContent sx={{ p: 0 }}>
//             <MapComponent apartments={selectedApartment ? [selectedApartment] : displayResults}
//               centerMode={!!selectedApartment} userLocation={userLocation}
//               onApartmentSelect={handleApartmentSelect} compactMode={false} />
//           </DialogContent>
//         </Dialog>

//         <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}
//           anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//           <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>{snackbar.message}</Alert>
//         </Snackbar>
//       </Container>
//     </>
//   );
// };

// export default function Search({ apartments = [], totalCount = 0 }) {
//   return (
//     <Providers store={store}>
//       <LanguageProvider>
//         <SessionProvider>
//           <FavoritesProvider>
//             <GoogleMapsProvider> 
//               <Header />
//               <SearchResultsContent serverApartments={apartments} totalCount={totalCount} />
//               <Footer />
//             </GoogleMapsProvider>
//           </FavoritesProvider>
//         </SessionProvider>
//       </LanguageProvider>
//     </Providers>
//   );
// }

// // ========== SERVER SIDE RENDERING ==========
// export async function getServerSideProps({ query }) {
//   try {
//     console.log('🌐 getServerSideProps: загрузка данных с сервера');
    
//     const baseUrl = process.env.NODE_ENV === 'production'
//       ? process.env.NEXT_PUBLIC_API_URL || 'https://nadoby.com.ua'
//       : 'http://localhost:3000';

//     console.log('🔗 API URL:', `${baseUrl}/api/v1/apartments/get-all`);
    
//     const apartmentsRes = await fetch(`${baseUrl}/api/v1/apartments/get-all`);
//     const apartmentsData = await apartmentsRes.json();

//     console.log('📦 Ответ от API:', apartmentsData);

//     let allApartments = [];
//     if (Array.isArray(apartmentsData)) {
//       allApartments = apartmentsData;
//     } else if (apartmentsData.apartments && Array.isArray(apartmentsData.apartments)) {
//       allApartments = apartmentsData.apartments;
//     } else if (apartmentsData.data && Array.isArray(apartmentsData.data)) {
//       allApartments = apartmentsData.data;
//     }

//     console.log('✅ Загружено квартир:', allApartments.length);
    
//     // Логируем все города
//     const cities = new Set();
//     allApartments.forEach(apt => {
//       if (apt.city) cities.add(apt.city);
//     });
//     console.log('🏙️ Города в базе:', Array.from(cities));

//     // Перемешиваем квартиры
//     const shuffledApartments = [...allApartments].sort(() => Math.random() - 0.5);

//     return {
//       props: {
//         apartments: shuffledApartments,
//         totalCount: shuffledApartments.length,
//         generatedAt: new Date().toISOString(),
//       }
//     };
//   } catch (error) {
//     console.error('❌ Ошибка загрузки данных:', error);
//     return {
//       props: {
//         apartments: [],
//         totalCount: 0,
//         generatedAt: new Date().toISOString(),
//       }
//     };
//   }
// }



// pages/search/page.js
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Chip,
  Grid,
  Button,
  Divider,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Alert,
  Snackbar,
  Paper,
  Tooltip,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { LanguageProvider, useLanguage } from '@/app/LanguageContext';
import ApartmentCard from '@/app/components/ApartmentCard';
import dynamic from 'next/dynamic';
import Providers from '@/app/providers';
import { store } from '@/app/store';
import { SessionProvider } from 'next-auth/react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useFavorites } from '@/app/hooks/useFavorites';
import { FavoritesProvider } from '@/app/hooks/FavoritesContext'; 
import Head from 'next/head';
import SearchApartmentFilters from '@/app/components/SearchApartmentFilters';
import LocationOn from '@mui/icons-material/LocationOn';
import People from '@mui/icons-material/People';
import Category from '@mui/icons-material/Category';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Warning from '@mui/icons-material/Warning';
import MapIcon from '@mui/icons-material/Map';
import Close from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { GoogleMapsProvider } from '@/GoogleMapsProvider';
import { DISTRICTS_DATA, getCityKey, getDistrictName } from '@/app/components/DistrictsData';

// Добавь эти импорты
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import { useSession } from 'next-auth/react';
import CreateUser from '@/app/components/CreateUser';
import { useTheme, useMediaQuery } from '@mui/material';

// Константы удобств
const CONVENIENCES = {
  ua: [
    { id: 'балкон', label: 'Балкон', icon: '🏠', displayId: 'Балкон' },
    { id: 'барбекю-зона', label: 'Барбекю-зона', icon: '🔥', displayId: 'Барбекю-зона' },
    { id: 'басейн', label: 'Басейн', icon: '🏊', displayId: 'Басейн' },
    { id: 'ігрова кімната', label: 'Ігрова кімната', icon: '🎮', displayId: 'Ігрова кімната' },
    { id: 'блендер', label: 'Блендер', icon: '🥤', displayId: 'Блендер' },
    { id: 'бойлер', label: 'Бойлер', icon: '🔥', displayId: 'Бойлер' },
    { id: 'ванна', label: 'Ванна', icon: '🛁', displayId: 'Ванна' },
    { id: 'вентилятор', label: 'Вентилятор', icon: '🌀', displayId: 'Вентилятор' },
    { id: 'генератор', label: 'Генератор', icon: '⚡', displayId: 'Генератор' },
    { id: 'громадська кухня', label: 'Громадська кухня', icon: '🍳', displayId: 'Громадська кухня' },
    { id: 'джакузі', label: 'Джакузі', icon: '🛁', displayId: 'Джакузі' },
    { id: 'дитяче ліжечко', label: 'Дитяче ліжечко', icon: '👶', displayId: 'Дитяче ліжечко' },
    { id: 'дитячий стілець', label: 'Дитячий стілець', icon: '🪑', displayId: 'Дитячий стілець' },
    { id: 'домашній кінотеатр', label: 'Домашній кінотеатр', icon: '🎬', displayId: 'Домашній кінотеатр' },
    { id: 'духовка', label: 'Духовка', icon: '🔥', displayId: 'Духовка' },
    { id: 'душова кабіна', label: 'Душова кабіна', icon: '🚿', displayId: 'Душова кабіна' },
    { id: 'електрочайник', label: 'Електрочайник', icon: '☕', displayId: 'Електрочайник' },
    { id: 'електроплита', label: 'Електроплита', icon: '🔥', displayId: 'Електроплита' },
    { id: 'газова плита', label: 'Газова плита', icon: '🔥', displayId: 'Газова плита' },
    { id: 'зарядка для електромобілів', label: 'Зарядка для електромобілів', icon: '🔋', displayId: 'Зарядка для електромобілів' },
    { id: 'заміна постільної білизни', label: 'Заміна постільної білизни', icon: '🛏️', displayId: 'Заміна постільної білизни' },
    { id: 'інтернет', label: 'Інтернет', icon: '📶', displayId: 'Інтернет' },
    { id: 'кавоварка', label: 'Кавоварка', icon: '☕', displayId: 'Кавоварка' },
    { id: 'камін', label: 'Камін', icon: '🔥', displayId: 'Камін' },
    { id: 'кабельне тб', label: 'Кабельне ТБ', icon: '📺', displayId: 'Кабельне ТБ' },
    { id: 'кондиціонер', label: 'Кондиціонер', icon: '❄️', displayId: 'Кондиціонер' },
    { id: 'ліжко', label: 'Ліжко', icon: '🛏️', displayId: 'Ліжко' },
    { id: 'диван', label: 'Диван', icon: '🛋️', displayId: 'Диван' },
    { id: 'лазня', label: 'Лазня', icon: '🧖', displayId: 'Лазня' },
    { id: 'мангал', label: 'Мангал', icon: '🔥', displayId: 'Мангал' },
    { id: 'мікрохвильова піч', label: 'Мікрохвильова піч', icon: '🔥', displayId: 'Мікрохвильова піч' },
    { id: 'охорона', label: 'Охорона', icon: '🛡️', displayId: 'Охорона' },
    { id: 'парковка', label: 'Парковка', icon: '🅿️', displayId: 'Парковка' },
    { id: "комп'ютер", label: "Комп'ютер", icon: '💻', displayId: "Комп'ютер" },
    { id: 'пляжне обладнання', label: 'Пляжне обладнання', icon: '🏖️', displayId: 'Пляжне обладнання' },
    { id: 'посуд', label: 'Посуд', icon: '🍽️', displayId: 'Посуд' },
    { id: 'посудомийна машина', label: 'Посудомийна машина', icon: '🧼', displayId: 'Посудомийна машина' },
    { id: 'пральна машина', label: 'Пральна машина', icon: '🧺', displayId: 'Пральна машина' },
    { id: 'пральний порошок', label: 'Пральний порошок', icon: '🧼', displayId: 'Пральний порошок' },
    { id: 'праска', label: 'Праска', icon: '👕', displayId: 'Праска' },
    { id: 'рушники', label: 'Рушники', icon: '🧻', displayId: 'Рушники' },
    { id: 'сейф', label: 'Сейф', icon: '🔒', displayId: 'Сейф' },
    { id: 'спортзал', label: 'Спортзал', icon: '🏋️', displayId: 'Спортзал' },
    { id: 'спортивний інвентар', label: 'Спортивний інвентар', icon: '⚽', displayId: 'Спортивний інвентар' },
    { id: 'столові прибори', label: 'Столові прибори', icon: '🍴', displayId: 'Столові прибори' },
    { id: 'сушилка', label: 'Сушилка', icon: '🧺', displayId: 'Сушилка' },
    { id: 'супутникове тб', label: 'Супутникове ТБ', icon: '📡', displayId: 'Супутникове ТБ' },
    { id: 'тапочки', label: 'Тапочки', icon: '👟', displayId: 'Тапочки' },
    { id: 'тераса', label: 'Тераса', icon: '🏡', displayId: 'Тераса' },
    { id: 'тостер', label: 'Тостер', icon: '🍞', displayId: 'Тостер' },
    { id: 'туалетні принадлежності', label: 'Туалетні принадлежності', icon: '🧴', displayId: 'Туалетні принадлежності' },
    { id: 'фен', label: 'Фен', icon: '💨', displayId: 'Фен' },
    { id: 'холодильник', label: 'Холодильник', icon: '🧊', displayId: 'Холодильник' },
    { id: 'догляд за тваринами', label: 'Догляд за тваринами', icon: '🐕', displayId: 'Догляд за тваринами' },
    { id: 'кафе', label: 'Кафе', icon: '☕', displayId: 'Кафе' },
    { id: 'конференц-зал', label: 'Конференц-зал', icon: '🏢', displayId: 'Конференц-зал' },
    { id: 'переговорна', label: 'Переговорна', icon: '💼', displayId: 'Переговорна' },
    { id: 'лікувальні процедури', label: 'Лікувальні процедури', icon: '💊', displayId: 'Лікувальні процедури' },
    { id: 'організація подій', label: 'Організація подій', icon: '🎉', displayId: 'Організація подій' },
    { id: 'трансфер', label: 'Трансфер', icon: '🚗', displayId: 'Трансфер' },
    { id: 'харчування', label: 'Харчування', icon: '🍲', displayId: 'Харчування' },
    { id: 'прокат', label: 'Прокат', icon: '🚲', displayId: 'Прокат' },
  ],
  ru: [
    { id: 'балкон', label: 'Балкон', icon: '🏠', displayId: 'Балкон' },
    { id: 'барбекю-зона', label: 'Зона барбекю', icon: '🔥', displayId: 'Барбекю-зона' },
    { id: 'басейн', label: 'Бассейн', icon: '🏊', displayId: 'Басейн' },
    { id: 'ігрова кімната', label: 'Игровая комната', icon: '🎮', displayId: 'Ігрова кімната' },
    { id: 'блендер', label: 'Блендер', icon: '🥤', displayId: 'Блендер' },
    { id: 'бойлер', label: 'Бойлер', icon: '🔥', displayId: 'Бойлер' },
    { id: 'ванна', label: 'Ванна', icon: '🛁', displayId: 'Ванна' },
    { id: 'вентилятор', label: 'Вентилятор', icon: '🌀', displayId: 'Вентилятор' },
    { id: 'генератор', label: 'Генератор', icon: '⚡', displayId: 'Генератор' },
    { id: 'громадська кухня', label: 'Общая кухня', icon: '🍳', displayId: 'Громадська кухня' },
    { id: 'джакузі', label: 'Джакузи', icon: '🛁', displayId: 'Джакузі' },
    { id: 'дитяче ліжечко', label: 'Детская кроватка', icon: '👶', displayId: 'Дитяче ліжечко' },
    { id: 'дитячий стілець', label: 'Детский стульчик', icon: '🪑', displayId: 'Дитячий стілець' },
    { id: 'домашній кінотеатр', label: 'Домашний кинотеатр', icon: '🎬', displayId: 'Домашній кінотеатр' },
    { id: 'духовка', label: 'Духовка', icon: '🔥', displayId: 'Духовка' },
    { id: 'душова кабіна', label: 'Душевая кабина', icon: '🚿', displayId: 'Душова кабіна' },
    { id: 'електрочайник', label: 'Электрочайник', icon: '☕', displayId: 'Електрочайник' },
    { id: 'електроплита', label: 'Электроплита', icon: '🔥', displayId: 'Електроплита' },
    { id: 'газова плита', label: 'Газовая плита', icon: '🔥', displayId: 'Газова плита' },
    { id: 'зарядка для електромобілів', label: 'Зарядка для электромобилей', icon: '🔋', displayId: 'Зарядка для електромобілів' },
    { id: 'заміна постільної білизни', label: 'Смена постельного белья', icon: '🛏️', displayId: 'Заміна постільної білизни' },
    { id: 'інтернет', label: 'Интернет', icon: '📶', displayId: 'Інтернет' },
    { id: 'кавоварка', label: 'Кофеварка', icon: '☕', displayId: 'Кавоварка' },
    { id: 'камін', label: 'Камин', icon: '🔥', displayId: 'Камін' },
    { id: 'кабельне тб', label: 'Кабельное ТВ', icon: '📺', displayId: 'Кабельне ТБ' },
    { id: 'кондиціонер', label: 'Кондиционер', icon: '❄️', displayId: 'Кондиціонер' },
    { id: 'ліжко', label: 'Кровать', icon: '🛏️', displayId: 'Ліжко' },
    { id: 'диван', label: 'Диван', icon: '🛋️', displayId: 'Диван' },
    { id: 'лазня', label: 'Баня', icon: '🧖', displayId: 'Лазня' },
    { id: 'мангал', label: 'Мангал', icon: '🔥', displayId: 'Мангал' },
    { id: 'мікрохвильова піч', label: 'Микроволновая печь', icon: '🔥', displayId: 'Мікрохвильова піч' },
    { id: 'охорона', label: 'Охрана', icon: '🛡️', displayId: 'Охорона' },
    { id: 'парковка', label: 'Парковка', icon: '🅿️', displayId: 'Парковка' },
    { id: "комп'ютер", label: "Компьютер", icon: '💻', displayId: "Комп'ютер" },
    { id: 'пляжне обладнання', label: 'Пляжное оборудование', icon: '🏖️', displayId: 'Пляжне обладнання' },
    { id: 'посуд', label: 'Посуда', icon: '🍽️', displayId: 'Посуд' },
    { id: 'посудомийна машина', label: 'Посудомоечная машина', icon: '🧼', displayId: 'Посудомийна машина' },
    { id: 'пральна машина', label: 'Стиральная машина', icon: '🧺', displayId: 'Пральна машина' },
    { id: 'пральний порошок', label: 'Стиральный порошок', icon: '🧼', displayId: 'Пральний порошок' },
    { id: 'праска', label: 'Утюг', icon: '👕', displayId: 'Праска' },
    { id: 'рушники', label: 'Полотенца', icon: '🧻', displayId: 'Рушники' },
    { id: 'сейф', label: 'Сейф', icon: '🔒', displayId: 'Сейф' },
    { id: 'спортзал', label: 'Спортзал', icon: '🏋️', displayId: 'Спортзал' },
    { id: 'спортивний інвентар', label: 'Спортивный инвентарь', icon: '⚽', displayId: 'Спортивний інвентар' },
    { id: 'столові прибори', label: 'Столовые приборы', icon: '🍴', displayId: 'Столові прибори' },
    { id: 'сушилка', label: 'Сушилка', icon: '🧺', displayId: 'Сушилка' },
    { id: 'супутникове тб', label: 'Спутниковое ТВ', icon: '📡', displayId: 'Супутникове ТБ' },
    { id: 'тапочки', label: 'Тапочки', icon: '👟', displayId: 'Тапочки' },
    { id: 'тераса', label: 'Терраса', icon: '🏡', displayId: 'Тераса' },
    { id: 'тостер', label: 'Тостер', icon: '🍞', displayId: 'Тостер' },
    { id: 'туалетні принадлежності', label: 'Туалетные принадлежности', icon: '🧴', displayId: 'Туалетні принадлежності' },
    { id: 'фен', label: 'Фен', icon: '💨', displayId: 'Фен' },
    { id: 'холодильник', label: 'Холодильник', icon: '🧊', displayId: 'Холодильник' },
    { id: 'догляд за тваринами', label: 'Уход за животными', icon: '🐕', displayId: 'Догляд за тваринами' },
    { id: 'кафе', label: 'Кафе', icon: '☕', displayId: 'Кафе' },
    { id: 'конференц-зал', label: 'Конференц-зал', icon: '🏢', displayId: 'Конференц-зал' },
    { id: 'переговорна', label: 'Переговорная', icon: '💼', displayId: 'Переговорна' },
    { id: 'лікувальні процедури', label: 'Лечебные процедуры', icon: '💊', displayId: 'Лікувальні процедури' },
    { id: 'організація подій', label: 'Организация мероприятий', icon: '🎉', displayId: 'Організація подій' },
    { id: 'трансфер', label: 'Трансфер', icon: '🚗', displayId: 'Трансфер' },
    { id: 'харчування', label: 'Питание', icon: '🍲', displayId: 'Харчування' },
    { id: 'прокат', label: 'Прокат', icon: '🚲', displayId: 'Прокат' },
  ],
};

// Словарь для нормализации названий станций метро
const METRO_NORMALIZATION_MAP = {
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

const CITIES_WITH_METRO = ['Київ', 'Харків', 'Дніпро', 'Киев', 'Харьков', 'Днепр'];

const MapComponent = dynamic(() => import('@/app/components/MapComponent'), {
  ssr: false,
  loading: () => <div>Загрузка карты...</div>
});

const CATEGORY_COLORS = {
  'apart': '#e590ad', 'hostel': '#34A853', 'glamping': '#FBBC05',
  'hotel': '#4285F4', 'pet-hotel': '#9C27B0', 'house': '#795548',
  'sauna': '#F44336', 'pansionat': '#607D8B', 'cottage': '#FF9800',
  'coworking': '#E91E63', 'autocamping': '#4CAF50', 'rest-base': '#00BCD4',
  'default': '#EA4335'
};

const getCategoryColor = (category) => {
  if (!category) return CATEGORY_COLORS.default;
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('apart') || categoryLower.includes('квартир')) return CATEGORY_COLORS.apart;
  if (categoryLower.includes('hostel') || categoryLower.includes('хостел')) return CATEGORY_COLORS.hostel;
  if (categoryLower.includes('glamping') || categoryLower.includes('глемпінг') || categoryLower.includes('глэмпинг')) return CATEGORY_COLORS.glamping;
  if (categoryLower.includes('hotel') || categoryLower.includes('готел') || categoryLower.includes('гостиниц')) return CATEGORY_COLORS.hotel;
  if (categoryLower.includes('pet') || categoryLower.includes('тварин') || categoryLower.includes('animals')) return CATEGORY_COLORS['pet-hotel'];
  if (categoryLower.includes('house') || categoryLower.includes('будинок') || categoryLower.includes('дом')) return CATEGORY_COLORS.house;
  if (categoryLower.includes('sauna') || categoryLower.includes('саун') || categoryLower.includes('бан')) return CATEGORY_COLORS.sauna;
  if (categoryLower.includes('pansionat') || categoryLower.includes('пансіонат') || categoryLower.includes('пансионат')) return CATEGORY_COLORS.pansionat;
  if (categoryLower.includes('cottage') || categoryLower.includes('котедж') || categoryLower.includes('kotedzi')) return CATEGORY_COLORS.cottage;
  if (categoryLower.includes('coworking') || categoryLower.includes('коворкінг') || categoryLower.includes('коворкинг') || categoryLower.includes('kavorking')) return CATEGORY_COLORS.coworking;
  if (categoryLower.includes('autocamping') || categoryLower.includes('автокемпінг') || categoryLower.includes('автокемпинг') || categoryLower.includes('avtokemping')) return CATEGORY_COLORS.autocamping;
  if (categoryLower.includes('rest-base') || categoryLower.includes('база відпочинку') || categoryLower.includes('база отдыха') || categoryLower.includes('recreationcenter')) return CATEGORY_COLORS['rest-base'];
  return CATEGORY_COLORS.default;
};

// ========== ФУНКЦИИ ДЛЯ НОРМАЛИЗАЦИИ ГОРОДА ==========

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
  
  console.log(`🔍 Сравниваем город: "${aptCity}" (норм: "${normalizedApt}") с фильтром "${filterCity}" (норм: "${normalizedFilter}")`);
  
  // Прямое совпадение
  if (normalizedApt === normalizedFilter) {
    console.log(`✅ Прямое совпадение города`);
    return true;
  }
  
  // Город содержит название (например "Київ, Київська область")
  if (aptCity.toLowerCase().includes(normalizedFilter.toLowerCase())) {
    console.log(`✅ Город содержит название фильтра`);
    return true;
  }
  
  console.log(`❌ Город не совпадает`);
  return false;
};

// ========== ФУНКЦИЯ ДЛЯ ПРЕОБРАЗОВАНИЯ КАТЕГОРИИ ==========
const normalizeCategory = (category) => {
  if (!category) return '';
  
  // Маппинг английских названий на украинские
  const categoryMap = {
    'apart': 'Квартира',
    'hostel': 'Хостел',
    'glamping': 'Глемпінг',
    'hotel': 'Готель',
    'pet-hotel': 'Готель для тварин',
    'house': 'Будинок',
    'sauna': 'Сауна/Лазня',
    'pansionat': 'Пансіонат',
    'cottage': 'Котедж',
    'coworking': 'Коворкінг',
    'autocamping': 'Автокемпінг',
    'rest-base': 'База відпочинку',
  };
  
  const normalized = categoryMap[category] || category;
  console.log(`🏷️ Нормализация категории: "${category}" -> "${normalized}"`);
  return normalized;
};

const SearchResultsContent = ({ serverApartments = [], totalCount = 0 }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchParams, setSearchParams] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [foundCategories, setFoundCategories] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [currentCity, setCurrentCity] = useState('');
  const [workingFilters, setWorkingFilters] = useState({});
  const [filterHistory, setFilterHistory] = useState([]);
  // НОВЫЕ СОСТОЯНИЯ ДЛЯ ПАГИНАЦИИ - ВСТАВЬ СЮДА ⬇️
const [visibleCount] = useState({
  mobile: 6,      // сколько показывать на мобилках
  tablet: 9,      // сколько показывать на планшетах
  desktop: 12      // сколько показывать на десктопах
});

const [currentPage, setCurrentPage] = useState(1);
const [isLoadingMore, setIsLoadingMore] = useState(false);
// КОНЕЦ НОВЫХ СОСТОЯНИЙ

// НОВЫЕ СОСТОЯНИЯ
// const [openAuthModal, setOpenAuthModal] = useState(false);
// const [showAlert, setShowAlert] = useState(false);
// const { data: session } = useSession();

   // НОВЫЕ СОСТОЯНИЯ
   const [openAuthModal, setOpenAuthModal] = useState(false);
   const [showAlert, setShowAlert] = useState(false);
   const { data: session } = useSession(); // Добавь это для проверки авторизации
  
  // Флаг для предотвращения циклов
  const isResettingRef = useRef(false);

  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isFavorite, toggleFavorite } = useFavorites();
  // НОВАЯ ФУНКЦИЯ - ВСТАВЬ СЮДА ⬇️
const getItemsPerPage = useCallback(() => {
  if (isMobile) {
    return visibleCount.mobile;
  } else if (theme.breakpoints.values.sm) {
    return visibleCount.tablet;
  } else {
    return visibleCount.desktop;
  }
}, [isMobile, theme.breakpoints.values.sm, visibleCount]);

  const translations = {
    ua: {
      district: 'Район',
      title: 'Результати пошуку',
      metaTitle: 'Результати пошуку житла для відпочинку | NaDoby',
      metaDescription: 'Знайдіть ідеальний варіант для відпочинку.',
      found: 'Знайдено',
      foundCategories: 'Знайдені категорії',
      noResults: 'За вашим запитом нічого не знайдено',
      noFilterResults: 'За обраними фільтрами нічого не знайдено',
      tryAgain: 'Спробуйте скинути фільтри та обрати інші параметри',
      changeSearch: 'Змінити параметри пошуку',
      back: 'Назад',
      location: 'Місце',
      guestsLabel: 'Гості',
      types: 'Типи',
      loading: 'Завантаження...',
      error: 'Помилка при завантаженні результатів',
      viewMap: 'Дивитись на карті',
      close: 'Закрити',
      showOnMap: 'Показати на карті',
      categoriesOnMap: 'Категорії на карті',
      favoriteAdd: 'Додано в обране',
      favoriteRemove: 'Видалено з обраного',
      favoriteError: 'Помилка при оновленні обраного',
      loginRequired: 'Увійдіть, щоб додати в обране',
      resetFilters: 'Скинути фільтри',
      activeFilters: 'Активні фільтри',
      price: 'Ціна',
      rooms: 'Кімнати',
      guests: 'Гості',
      area: 'Площа',
      smoking: 'Паління',
      parties: 'Вечірки',
      pets: 'Тварини',
      fullDay: 'Цілодобово',
      reportDocs: 'Звітні документи',
      conveniences: 'Зручності',
      yes: 'Так',
      no: 'Ні',
      filterMatches: 'Відповідає фільтру',
      outOf: 'з',
      city: 'Місто',
      category: 'Категорія',
      categories: {
        'apart': 'Квартира',
        'hostel': 'Хостел',
        'glamping': 'Глемпінг',
        'hotel': 'Готель',
        'pet-hotel': 'Готель для тварин',
        'house': 'Будинок',
        'sauna': 'Сауна/Лазня',
        'pansionat': 'Пансіонат',
        'cottage': 'Котедж',
        'coworking': 'Коворкінг',
        'autocamping': 'Автокемпінг',
        'rest-base': 'База відпочинку',
      }
    },
    ru: {
      district: 'Район',
      title: 'Результаты поиска',
      metaTitle: 'Результаты поиска жилья для отдыха | NaDoby',
      metaDescription: 'Найдите идеальный вариант для отдыха.',
      found: 'Найдено',
      foundCategories: 'Найденные категории',
      noResults: 'По вашему запросу ничего не найдено',
      noFilterResults: 'По выбранным фильтрам ничего не найдено',
      tryAgain: 'Попробуйте сбросить фильтры и выбрать другие параметры',
      changeSearch: 'Изменить параметры поиска',
      back: 'Назад',
      location: 'Место',
      guestsLabel: 'Гости',
      types: 'Типы',
      loading: 'Загрузка...',
      error: 'Ошибка при загрузке результатов',
      viewMap: 'Смотреть на карте',
      close: 'Закрыть',
      showOnMap: 'Показать на карте',
      categoriesOnMap: 'Категории на карте',
      favoriteAdd: 'Добавлено в избранное',
      favoriteRemove: 'Удалено из избранного',
      favoriteError: 'Ошибка при обновлении избранного',
      loginRequired: 'Войдите, чтобы добавить в избранное',
      resetFilters: 'Сбросить фильтры',
      activeFilters: 'Активные фильтры',
      price: 'Цена',
      rooms: 'Комнаты',
      guests: 'Гости',
      area: 'Площадь',
      smoking: 'Курение',
      parties: 'Вечеринки',
      pets: 'Животные',
      fullDay: 'Круглосуточно',
      reportDocs: 'Отчетные документы',
      conveniences: 'Удобства',
      yes: 'Да',
      no: 'Нет',
      filterMatches: 'Соответствует фильтру',
      outOf: 'из',
      city: 'Город',
      category: 'Категория',
      categories: {
        'apart': 'Квартира',
        'hostel': 'Хостел',
        'glamping': 'Глэмпинг',
        'hotel': 'Гостиница',
        'pet-hotel': 'Отель для животных',
        'house': 'Дом',
        'sauna': 'Сауна/Баня',
        'pansionat': 'Пансионат',
        'cottage': 'Коттедж',
        'coworking': 'Коворкинг',
        'autocamping': 'Автокемпинг',
        'rest-base': 'База отдыха',
      }
    },
  };

  const t = translations[currentLanguage];

  // ========== ФУНКЦИИ НОРМАЛИЗАЦИИ ==========

  const normalizeString = (str) => {
    if (!str) return '';
    return String(str).toLowerCase().trim().replace(/\s+/g, ' ');
  };

  const normalizeMetro = (station) => {
    if (!station) return '';
    
    const normalized = normalizeString(station);
    
    for (const [key, value] of Object.entries(METRO_NORMALIZATION_MAP)) {
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

  const compareConveniences = (conv1, conv2) => {
    return normalizeConvenience(conv1) === normalizeConvenience(conv2);
  };

  const getConvenienceLabel = (convenienceId) => {
    if (!convenienceId) return '';
    const convenience = CONVENIENCES[currentLanguage]?.find(c => compareConveniences(c.id, convenienceId));
    return convenience ? convenience.label : convenienceId;
  };

  const translateCategory = (category) => {
    if (!category) return category;
    return t.categories[category] || t.categories[category.toLowerCase()] || category;
  };

  // ========== ФИЛЬТРАЦИЯ ==========
  const matchesFilters = (apartment, filters) => {
    console.log(`\n🔍 Проверка квартиры ${apartment._id}:`, {
      city: apartment.city,
      category: apartment.category,
      price: apartment.price,
      beds: apartment.beds,
      size: apartment.size
    });
    
    // Город
    if (filters.city && !isCityMatch(apartment.city, filters.city)) {
      console.log(`❌ Город не совпадает: апартаменты.city=${apartment.city}, фильтр.city=${filters.city}`);
      return false;
    }
    
    // Категория
    if (filters.category && filters.category !== '') {
      if (apartment.category !== filters.category) {
        console.log(`❌ Категория не совпадает: апартаменты.category=${apartment.category}, фильтр.category=${filters.category}`);
        return false;
      }
    }
    
    // Цена
    if (filters.priceRange && filters.priceRange.length === 2) {
      const price = Number(apartment.price) || 0;
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        console.log(`❌ Цена не в диапазоне: price=${price}, диапазон=${filters.priceRange}`);
        return false;
      }
    }
    
    // Комнаты
    if (filters.rooms) {
      const rooms = String(apartment.rooms || '');
      const filterValue = String(filters.rooms);
      
      if (filterValue === '6+') {
        const roomsNum = parseInt(rooms) || 0;
        if (roomsNum < 6) {
          console.log(`❌ Комнат меньше 6: rooms=${rooms}`);
          return false;
        }
      } else {
        if (rooms !== filterValue && Number(rooms) !== Number(filterValue)) {
          console.log(`❌ Комнаты не совпадают: rooms=${rooms}, фильтр=${filterValue}`);
          return false;
        }
      }
    }
    
    // Гости
    if (filters.guests) {
      const beds = Number(apartment.beds) || 0;
      const filterValue = String(filters.guests);
      
      if (filterValue === '10+') {
        if (beds < 10) {
          console.log(`❌ Гостей меньше 10: beds=${beds}`);
          return false;
        }
      } else {
        const guestValue = parseInt(filterValue);
        if (beds < guestValue) {
          console.log(`❌ Гостей меньше ${guestValue}: beds=${beds}`);
          return false;
        }
      }
    }
    
    // Площадь
    if (filters.areaRange && filters.areaRange.length === 2) {
      const size = Number(apartment.size) || 0;
      if (size < filters.areaRange[0] || size > filters.areaRange[1]) {
        console.log(`❌ Площадь не в диапазоне: size=${size}, диапазон=${filters.areaRange}`);
        return false;
      }
    }
    
    // Удобства
    if (filters.conveniences && filters.conveniences.length > 0) {
      const aptConveniences = apartment.conveniences || [];
      const normalizedFilters = filters.conveniences.map(conv => normalizeConvenience(conv));
      const normalizedApt = aptConveniences.map(conv => normalizeConvenience(conv));
      
      const allConveniencesMatch = normalizedFilters.every(conv => normalizedApt.includes(conv));
      if (!allConveniencesMatch) {
        console.log(`❌ Не все удобства есть: нужны ${filters.conveniences}, есть ${aptConveniences}`);
        return false;
      }
    }
    
    // Район
    if (filters.district && filters.district.trim() !== '') {
      if (apartment.district !== filters.district) {
        console.log(`❌ Район не совпадает: район=${apartment.district}, фильтр=${filters.district}`);
        return false;
      }
    }
    
    // Метро
    if (filters.metroStation && filters.metroStation.trim() !== '') {
      const apartmentMetro = apartment.metro || '';
      const normalizedFilterMetro = normalizeMetro(filters.metroStation);
      const normalizedApartmentMetro = normalizeMetro(apartmentMetro);
      
      if (normalizedFilterMetro !== normalizedApartmentMetro) {
        console.log(`❌ Метро не совпадает: метро=${apartmentMetro}, фильтр=${filters.metroStation}`);
        return false;
      }
    }
    
    // Булевы фильтры
    if (filters.smoking && filters.smoking !== 'any') {
      const filterValue = filters.smoking === 'yes';
      if (normalizeBoolean(apartment.smoking) !== filterValue) {
        console.log(`❌ Курение не совпадает: smoking=${apartment.smoking}, фильтр=${filters.smoking}`);
        return false;
      }
    }
    
    if (filters.parties && filters.parties !== 'any') {
      const filterValue = filters.parties === 'yes';
      if (normalizeBoolean(apartment.parties) !== filterValue) {
        console.log(`❌ Вечеринки не совпадают: parties=${apartment.parties}, фильтр=${filters.parties}`);
        return false;
      }
    }
    
    if (filters.pets && filters.pets !== 'any') {
      const filterValue = filters.pets === 'yes';
      if (normalizeBoolean(apartment.pets) !== filterValue) {
        console.log(`❌ Животные не совпадают: pets=${apartment.pets}, фильтр=${filters.pets}`);
        return false;
      }
    }
    
    if (filters.fullDay && filters.fullDay !== 'any') {
      const filterValue = filters.fullDay === 'yes';
      if (normalizeBoolean(apartment.fullDayCheckIn) !== filterValue) {
        console.log(`❌ Круглосуточно не совпадает: fullDay=${apartment.fullDayCheckIn}, фильтр=${filters.fullDay}`);
        return false;
      }
    }
    
    if (filters.reportDocs && filters.reportDocs !== 'any') {
      const filterValue = filters.reportDocs === 'yes';
      if (normalizeBoolean(apartment.reportDocs) !== filterValue) {
        console.log(`❌ Отчетные документы не совпадают: reportDocs=${apartment.reportDocs}, фильтр=${filters.reportDocs}`);
        return false;
      }
    }
    
    console.log(`✅ Квартира прошла все фильтры: ${apartment._id}`);
    return true;
  };

  // Функция для подсчета совпадений по отдельным фильтрам
  const getFilterMatchCount = (filters) => {
    if (!filters || Object.keys(filters).length === 0) return {};
    
    const matches = {};
    
    Object.keys(filters).forEach(key => {
      if (key === 'sortBy') return;
      
      if (key === 'priceRange' && filters.priceRange) {
        matches.price = searchResults.filter(apt => {
          const price = Number(apt.price) || 0;
          return price >= filters.priceRange[0] && price <= filters.priceRange[1];
        }).length;
      }
      else if (key === 'rooms' && filters.rooms) {
        const filterValue = String(filters.rooms);
        
        matches.rooms = searchResults.filter(apt => {
          const rooms = String(apt.rooms || '');
          
          if (filterValue === '6+') {
            const roomsNum = parseInt(rooms) || 0;
            return roomsNum >= 6;
          } else {
            return rooms === filterValue || Number(rooms) === Number(filterValue);
          }
        }).length;
      }
      else if (key === 'guests' && filters.guests) {
        const filterValue = String(filters.guests);
        
        matches.guests = searchResults.filter(apt => {
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
        matches.area = searchResults.filter(apt => {
          const size = Number(apt.size) || 0;
          return size >= filters.areaRange[0] && size <= filters.areaRange[1];
        }).length;
      }
      else if (key === 'district' && filters.district) {
        matches.district = searchResults.filter(apt => {
          return apt.district === filters.district;
        }).length;
      }
      else if (key === 'metroStation' && filters.metroStation) {
        const normalizedFilterMetro = normalizeMetro(filters.metroStation);
        
        matches.metro = searchResults.filter(apt => {
          const aptMetro = apt.metro || '';
          const normalizedApartmentMetro = normalizeMetro(aptMetro);
          return normalizedFilterMetro === normalizedApartmentMetro;
        }).length;
      }
      else if (key === 'conveniences' && filters.conveniences?.length > 0) {
        filters.conveniences.forEach((conv) => {
          const normalizedConv = normalizeConvenience(conv);
          
          const matchCount = searchResults.filter(apt => {
            const aptConveniences = apt.conveniences || [];
            const normalizedApt = aptConveniences.map(c => normalizeConvenience(c));
            return normalizedApt.includes(normalizedConv);
          }).length;
          
          matches[`conv_${conv}`] = {
            count: matchCount,
            id: conv,
            label: getConvenienceLabel(conv)
          };
        });
      }
      else if (['smoking', 'parties', 'pets', 'fullDay', 'reportDocs', 'city', 'category'].includes(key) && filters[key] !== 'any') {
        // Для города и категории проверяем наличие
        if (key === 'city') {
          matches.city = searchResults.filter(apt => isCityMatch(apt.city, filters.city)).length;
        } else if (key === 'category') {
          matches.category = searchResults.filter(apt => apt.category === filters.category).length;
        } else {
          const filterValue = filters[key] === 'yes';
          
          matches[key] = searchResults.filter(apt => {
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

  const applyFilters = useCallback((results, filters) => {
    if (!results || !results.length) return [];
    
    console.log('\n🔍 ПРИМЕНЯЕМ ФИЛЬТРЫ К РЕЗУЛЬТАТАМ:', results.length);
    console.log('📋 Фильтры:', JSON.stringify(filters, null, 2));
    
    const filtered = results.filter(apt => matchesFilters(apt, filters));
    
    console.log(`\n✅ ПОСЛЕ ФИЛЬТРАЦИИ: ${filtered.length} результатов из ${results.length}`);
    
    if (filters.sortBy && filters.sortBy !== 'recommended' && filtered.length > 0) {
      filtered.sort((a, b) => {
        const priceA = Number(a.price) || 0;
        const priceB = Number(b.price) || 0;
        return filters.sortBy === 'priceAsc' ? priceA - priceB : priceB - priceA;
      });
    }
    
    return filtered;
  }, []);

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
    
    console.log('\n📊 НОВЫЕ ФИЛЬТРЫ:', JSON.stringify(newFilters, null, 2));
    
    // Обновляем историю выбора фильтров
    const history = updateFilterHistory(newFilters, activeFilters);
    console.log('📊 История выбора (все фильтры):', history);
    
    // Применяем все фильтры и получаем общий результат
    const filtered = applyFilters(searchResults, newFilters);
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
      setFilteredResults(filtered);
      setCurrentPage(1); // ДОБАВЬ ЭТУ СТРОКУ
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
      const testResults = applyFilters(searchResults, filtersToTest);
      console.log(`📊 После добавления ${key}: ${testResults.length} результатов`);
      
      if (testResults.length === 0) {
        // Этот фильтр сломал выдачу
        brokenFilter = key;
        brokenIndex = i;
        console.log(`🔴 Сломанный фильтр: ${key}`);
        break;
      }
    }
    
    // Устанавливаем статусы для всех фильтров
    allFiltersInOrder.forEach((key, index) => {
      if (brokenFilter === null) {
        // Если нет сломанного фильтра - все зеленые
        if (key === 'conveniences') {
          if (newFilters.conveniences && newFilters.conveniences.length > 0) {
            newFilters.conveniences.forEach(conv => {
              working[`conv_${conv}`] = true;
            });
          }
        } else {
          working[key] = true;
        }
      } else {
        // Все фильтры до сломанного - зеленые, сломанный и после - красные
        if (index < brokenIndex) {
          if (key === 'conveniences') {
            newFilters.conveniences.forEach(conv => {
              working[`conv_${conv}`] = true;
            });
          } else {
            working[key] = true;
          }
        } else {
          if (key === 'conveniences') {
            newFilters.conveniences.forEach(conv => {
              working[`conv_${conv}`] = false;
            });
          } else {
            working[key] = false;
          }
        }
      }
    });
    
    // Город и категория проверяются отдельно
    if (newFilters.city) {
      const cityAloneTest = applyFilters(searchResults, { city: newFilters.city });
      working.city = cityAloneTest.length > 0;
    }
    
    if (newFilters.category && newFilters.category !== '') {
      const categoryAloneTest = applyFilters(searchResults, { category: newFilters.category });
      working.category = categoryAloneTest.length > 0;
    }
    
    console.log('📊 Итоговые работающие фильтры:', working);
    
    setWorkingFilters(working);
    setActiveFilters(newFilters);
    setFilteredResults(filtered);
  }, [searchResults, activeFilters, filterHistory, applyFilters]);

  const handleResetFilters = () => {
    setActiveFilters({});
    setWorkingFilters({});
    setFilterHistory([]);
    setFilteredResults(searchResults);
    setCurrentPage(1); // ДОБАВЬ ЭТУ СТРОКУ
  };

  useEffect(() => {
    console.log('\n📦 Инициализация страницы поиска');
    
    // Используем данные с сервера
    if (serverApartments && serverApartments.length > 0) {
      console.log('📊 Данные с сервера:', serverApartments.length);
      
      // Логируем все города из ответа сервера
      const cities = new Set();
      serverApartments.forEach(apt => {
        if (apt.city) cities.add(apt.city);
      });
      console.log('🏙️ Города в данных сервера:', Array.from(cities));
      
      // Логируем первые 5 квартир
      serverApartments.slice(0, 5).forEach((apt, index) => {
        console.log(`🏠 Квартира ${index + 1}:`, {
          id: apt._id,
          city: apt.city,
          category: apt.category,
          price: apt.price,
          beds: apt.beds
        });
      });
      
      const shuffledResults = [...serverApartments].sort(() => Math.random() - 0.5);
      
      setSearchResults(shuffledResults);
      setFilteredResults(shuffledResults);
      
      if (shuffledResults.length > 0) {
        const firstApartmentCity = shuffledResults[0]?.city || '';
        const cleanCity = firstApartmentCity.split(',')[0].trim();
        setCurrentCity(cleanCity);
      }
      
      // Получаем параметры из localStorage (если есть)
      try {
        const params = localStorage.getItem('searchParams');
        if (params) {
          const parsedParams = JSON.parse(params);
          setSearchParams(parsedParams);
          console.log('📋 Параметры поиска из localStorage:', parsedParams);
          
          // Применяем фильтры из параметров поиска
          const initialFilters = {};
          
          if (parsedParams.location) {
            initialFilters.city = parsedParams.location;
            console.log('🏙️ Город из поиска:', parsedParams.location);
          }
          
          if (parsedParams.types && parsedParams.types.length > 0) {
            initialFilters.category = normalizeCategory(parsedParams.types[0]);
            console.log('🏷️ Категория из поиска:', initialFilters.category);
          }
          
          if (parsedParams.guests) {
            // НЕ применяем фильтр гостей при инициализации!
            console.log('👥 Гости из поиска (не применяем):', parsedParams.guests);
          }
          
          console.log('🚀 Применяем начальные фильтры из поиска:', initialFilters);
          
          if (Object.keys(initialFilters).length > 0) {
            setActiveFilters(initialFilters);
            const filtered = applyFilters(shuffledResults, initialFilters);
            console.log(`📊 После применения фильтров: ${filtered.length} результатов`);
            setFilteredResults(filtered);
            
            const working = {};
            Object.keys(initialFilters).forEach(key => {
              working[key] = true;
            });
            setWorkingFilters(working);
          }
        }
      } catch (err) {
        console.error('Ошибка загрузки параметров из localStorage:', err);
      }
      
      setLoading(false);
    } else {
      console.log('📊 Нет данных с сервера');
      setLoading(false);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
        (error) => console.log('Geolocation not available or denied')
      );
    }
  }, [serverApartments, applyFilters]);

  const handleBackToSearch = () => router.push('/');
  const handleNewSearch = () => router.push('/');
  const handleApartmentSelect = (apartment) => router.push(`/apartment/${apartment._id}`);

  const handleToggleFavorite = async (apartmentId) => {
    try {
      const userProfile = localStorage.getItem('user_profile');
      if (!userProfile) {
        setSnackbar({ open: true, message: t.loginRequired, severity: 'warning' });
        return;
      }
      const wasFavorite = isFavorite(apartmentId);
      await toggleFavorite(apartmentId);
      setSnackbar({ open: true, message: wasFavorite ? t.favoriteRemove : t.favoriteAdd, severity: 'success' });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setSnackbar({ open: true, message: t.favoriteError, severity: 'error' });
    }
  };

  
  const handleCloseSnackbar = () => setSnackbar(prev => ({ ...prev, open: false }));

  // ========== НОВЫЕ ФУНКЦИИ ==========
  const handleAddApartmentClick = useCallback((e) => {
    e.stopPropagation();
    
    // Проверяем авторизацию
    const userProfile = localStorage.getItem('user_profile');
    const isAuthenticated = session || userProfile;
    
    if (isAuthenticated) {
      // Если авторизован - переходим на страницу добавления
      router.push('https://nadoby.com.ua/add-apartment');
    } else {
      // Если не авторизован - показываем окно регистрации
      setOpenAuthModal(true);
      setShowAlert(true);
    }
  }, [session, router]);

  const handleCloseAuthModal = useCallback(() => {
    setOpenAuthModal(false);
    setShowAlert(false);
  }, []);

  // НОВАЯ ФУНКЦИЯ - ВСТАВЬ СЮДА ⬇️
const handleLoadMore = useCallback(() => {
  setIsLoadingMore(true);
  
  // Имитация загрузки
  setTimeout(() => {
    setCurrentPage(prev => prev + 1);
    setIsLoadingMore(false);
  }, 500);
}, []);
// КОНЕЦ НОВОЙ ФУНКЦИИ

  // ========== ВАЖНЫЕ ПЕРЕМЕННЫЕ ==========
  const hasActiveFilters = Object.keys(activeFilters).length > 0 && 
    Object.keys(activeFilters).some(key => {
      if (key === 'sortBy') return false;
      if (key === 'priceRange') return activeFilters.priceRange && (activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 10000);
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
      if (key === 'city') return activeFilters.city && activeFilters.city !== '';
      return false;
    });

  const displayResults = filteredResults;
  const filterMatches = getFilterMatchCount(activeFilters);
  const hasResults = displayResults.length > 0;

// НОВЫЕ ВЫЧИСЛЕНИЯ - ВСТАВЬ СЮДА ⬇️
const itemsPerPage = getItemsPerPage();
const totalVisible = currentPage * itemsPerPage;
const displayedApartments = displayResults.slice(0, totalVisible);
const hasMoreToShow = displayedApartments.length < displayResults.length;
const remainingCount = displayResults.length - displayedApartments.length;
// КОНЕЦ НОВЫХ ВЫЧИСЛЕНИЙ

  // Логируем для отладки
  useEffect(() => {
    if (Object.keys(activeFilters).length > 0) {
      console.log('\n📊 ТЕКУЩЕЕ СОСТОЯНИЕ:');
      console.log('📊 filterMatches:', filterMatches);
      console.log('📊 Есть результаты:', hasResults);
      console.log('📊 Работающие фильтры:', workingFilters);
      console.log('📊 История выбора:', filterHistory);
    }
  }, [activeFilters, filterMatches, hasResults, workingFilters, filterHistory]);

  // ========== УСЛОВНЫЙ РЕНДЕРИНГ ==========
  if (loading) {
    return (
      <>
        <Head><title>{t.metaTitle}</title><meta name="description" content={t.metaDescription} /></Head>
        <Container sx={{ py: 4, textAlign: 'center' }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography>{t.loading}</Typography>
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head><title>{t.metaTitle}</title><meta name="description" content={t.metaDescription} /></Head>
        <Container sx={{ py: 4, textAlign: 'center' }}>
          <Warning sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
          <Typography variant="h6" color="error" gutterBottom>{error}</Typography>
          <Button variant="contained" onClick={handleNewSearch} sx={{ mt: 2 }}>{t.changeSearch}</Button>
        </Container>
      </>
    );
  }





  return (
    <>
      <Head><title>{t.metaTitle}</title><meta name="description" content={t.metaDescription} /></Head>
      <Container sx={{ py: 4 }}>
        <Button startIcon={<ArrowBack />} onClick={handleBackToSearch} sx={{ mb: 3 }}>{t.back}</Button>

        {searchParams && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>{t.title}</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              {searchParams.location && (
                <Chip icon={<LocationOn />} label={`${t.location}: ${searchParams.location}`} variant="outlined" color="primary" />
              )}
              {searchParams.guests && (
                <Chip icon={<People />} label={`${t.guestsLabel}: ${searchParams.guests}`} variant="outlined" color="primary" />
              )}
              {searchParams.types && searchParams.types.length > 0 && (
                <Chip icon={<Category />} label={`${t.types}: ${searchParams.types.map(type => translateCategory(normalizeCategory(type))).join(', ')}`} variant="outlined" color="primary" />
              )}
            </Box>
            
            {foundCategories.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{t.foundCategories}:</Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {foundCategories.map(category => (
                    <Chip key={category} label={translateCategory(category)} size="small"
                      sx={{ backgroundColor: getCategoryColor(category), color: 'white', fontSize: '0.7rem', height: '24px' }} />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        )}

        <Divider sx={{ mb: 4 }} />

        {/* Статистика фильтров */}
        {hasActiveFilters && Object.keys(filterMatches).length > 0 && (
          <Paper sx={{ p: 2, mb: 3, bgcolor: '#f5f5f5' }}>
            <Typography variant="subtitle2" gutterBottom>
              {t.activeFilters}:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              
              {/* Город */}
              {activeFilters.city && filterMatches.city !== undefined && (
                <Tooltip title={`${t.filterMatches} ${t.city.toLowerCase()}: ${filterMatches.city} ${t.outOf} ${searchResults.length}`}>
                  <Chip
                    icon={workingFilters.city ? <CheckCircleIcon /> : <CancelIcon />}
                    label={activeFilters.city}
                    color={workingFilters.city ? "success" : "error"}
                    variant={workingFilters.city ? "filled" : "outlined"}
                    size="small"
                  />
                </Tooltip>
              )}
              
              {/* Категория */}
              {activeFilters.category && activeFilters.category !== '' && filterMatches.category !== undefined && (
                <Tooltip title={`${t.filterMatches} ${t.category.toLowerCase()}: ${filterMatches.category} ${t.outOf} ${searchResults.length}`}>
                  <Chip
                    icon={workingFilters.category ? <CheckCircleIcon /> : <CancelIcon />}
                    label={translateCategory(activeFilters.category)}
                    color={workingFilters.category ? "success" : "error"}
                    variant={workingFilters.category ? "filled" : "outlined"}
                    size="small"
                  />
                </Tooltip>
              )}
              
              {/* Цена */}
              {filterMatches.price !== undefined && (
                <Tooltip title={`${t.filterMatches} ціни: ${filterMatches.price} ${t.outOf} ${searchResults.length}`}>
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
                <Tooltip title={`${t.filterMatches} кімнат: ${filterMatches.rooms} ${t.outOf} ${searchResults.length}`}>
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
                <Tooltip title={`${t.filterMatches} гостей: ${filterMatches.guests} ${t.outOf} ${searchResults.length}`}>
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
                <Tooltip title={`${t.filterMatches} площі: ${filterMatches.area} ${t.outOf} ${searchResults.length}`}>
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
                <Tooltip title={`${t.filterMatches} району: ${filterMatches.district} ${t.outOf} ${searchResults.length}`}>
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
                <Tooltip title={`${t.filterMatches} метро: ${filterMatches.metro} ${t.outOf} ${searchResults.length}`}>
                  <Chip
                    icon={workingFilters.metroStation ? <CheckCircleIcon /> : <CancelIcon />}
                    label={`Метро: ${activeFilters.metroStation}`}
                    color={workingFilters.metroStation ? "success" : "error"}
                    variant={workingFilters.metroStation ? "filled" : "outlined"}
                    size="small"
                  />
                </Tooltip>
              )}
              
              {/* Удобства */}
              {Object.keys(filterMatches).filter(key => key.startsWith('conv_')).map((key) => {
                const match = filterMatches[key];
                const displayLabel = match.label || match.id;
                
                return (
                  <Tooltip key={key} title={`${t.filterMatches} ${t.conveniences.toLowerCase()}: ${match.count} ${t.outOf} ${searchResults.length}`}>
                    <Chip
                      icon={workingFilters[key] ? <CheckCircleIcon /> : <CancelIcon />}
                      label={`${displayLabel}`}
                      color={workingFilters[key] ? "success" : "error"}
                      variant={workingFilters[key] ? "filled" : "outlined"}
                      size="small"
                    />
                  </Tooltip>
                );
              })}
              
              {/* Курение */}
              {filterMatches.smoking !== undefined && (
                <Tooltip title={`${t.filterMatches} куріння: ${filterMatches.smoking} ${t.outOf} ${searchResults.length}`}>
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
                <Tooltip title={`${t.filterMatches} вечірок: ${filterMatches.parties} ${t.outOf} ${searchResults.length}`}>
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
                <Tooltip title={`${t.filterMatches} тварин: ${filterMatches.pets} ${t.outOf} ${searchResults.length}`}>
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
                <Tooltip title={`${t.filterMatches} цілодобово: ${filterMatches.fullDay} ${t.outOf} ${searchResults.length}`}>
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
                <Tooltip title={`${t.filterMatches} звітних документів: ${filterMatches.reportDocs} ${t.outOf} ${searchResults.length}`}>
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
          </Paper>
        )}

       {/* Карта для планшетов и десктопов - если есть объявления */}
{displayResults.length > 0 && (
  <Box sx={{ mb: 4 }}>
    {/* Карта */}
    <Box
      sx={{
        height: '200px',
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid #e0e0e0',
        mb: 2,
        display: {
          xs: 'none',   // скрыто на мобильных
          sm: 'block',  // видно на планшетах
          md: 'block',  // видно на десктопах
        },
      }}
    >
      <MapComponent
        apartments={displayResults}
        onApartmentSelect={handleApartmentSelect}
        userLocation={userLocation}
        compactMode={true}
      />
    </Box>

    {/* Кнопка Смотреть на карте - только если есть объявления */}
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button 
        variant="contained" 
        startIcon={<MapIcon />} 
        onClick={() => setMapOpen(true)}
        size={isMobile ? "medium" : "large"}
        sx={{ 
          px: isMobile ? 3 : 4,
          py: isMobile ? 1 : 1.5
        }}
      >
        {t.viewMap} {!isMobile && `(${displayResults.length})`}
      </Button>
    </Box>
  </Box>
)}

        {searchResults.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <SearchApartmentFilters
              apartments={searchResults}
              onFilterChange={handleFilterChange}
              searchParams={searchParams}
              loading={loading}
              totalResults={filteredResults.length}
              currentCity={currentCity}
              filterStatus={workingFilters}
            />
          </Box>
        )}


      {displayResults.length > 0 ? (
          <>
            <Grid container spacing={3}>
              {displayedApartments.map((apartment) => (
                <Grid item xs={12} sm={6} md={4} key={apartment._id}>
                  <ApartmentCard
                    apartment={apartment}
                    isFavorite={isFavorite(apartment._id)}
                    toggleFavorite={() => handleToggleFavorite(apartment._id)}
                    showCreateUserDialog={() => {}}
                    onShowOnMap={() => setSelectedApartment(apartment)}
                    onClick={() => handleApartmentSelect(apartment)}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Кнопка "Показать еще" */}
            {hasMoreToShow && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
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
                  ? `Показано ${displayedApartments.length} з ${displayResults.length} оголошень`
                  : `Показано ${displayedApartments.length} из ${displayResults.length} объявлений`
                }
              </Typography>
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Warning sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {hasActiveFilters ? t.noFilterResults : t.noResults}
            </Typography>
            {hasActiveFilters && (
              <>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{t.tryAgain}</Typography>
                <Button variant="contained" onClick={handleResetFilters} sx={{ mt: 2, mr: 2 }}>{t.resetFilters}</Button>
              </>
            )}
            <Button variant="outlined" onClick={handleNewSearch} sx={{ mt: 2 }}>{t.changeSearch}</Button>
          </Box>
        )}


         {/* Диалог с картой - на весь экран */}
         <Dialog
          open={mapOpen}
          onClose={() => setMapOpen(false)}
          maxWidth="xl"
          fullWidth
          fullScreen={true} // Изменено с false на true для полного экрана
          sx={{
            '& .MuiDialog-paper': {
              height: '100vh', // На весь экран
              width: '100vw',
              m: 0,
              maxWidth: '100%',
              maxHeight: '100%'
            }
          }}
         >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6">
                {t.found}: <strong>{displayResults.length}</strong>
              </Typography>
              {selectedApartment && (
                <Chip 
                  label={translateCategory(selectedApartment.category)} 
                  size="small"
                  sx={{ backgroundColor: getCategoryColor(selectedApartment.category), color: 'white' }} 
                />
              )}
            </Box>
            <IconButton onClick={() => setMapOpen(false)}><Close /></IconButton>
          </DialogTitle>
          
          {foundCategories.length > 0 && (
            <Box sx={{ px: 3, pb: 1 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>{t.categoriesOnMap}:</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {foundCategories.map(category => (
                  <Chip key={category} label={translateCategory(category)} size="small"
                    sx={{ backgroundColor: getCategoryColor(category), color: 'white' }} />
                ))}
              </Box>
            </Box>
          )}
          
          <DialogContent sx={{ p: 0, height: 'calc(100% - 64px)' }}>
            <Box sx={{ height: '100%', width: '100%' }}>
              <MapComponent 
                apartments={selectedApartment ? [selectedApartment] : displayResults}
                centerMode={!!selectedApartment} 
                userLocation={userLocation}
                onApartmentSelect={handleApartmentSelect} 
                compactMode={false} 
              />
            </Box>
          </DialogContent>
         </Dialog>


         <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>{snackbar.message}</Alert>
          </Snackbar>


         {/* ========== НОВЫЕ КНОПКИ ========== */}
        
          {/* Кнопка для добавления объявления - справа внизу */}
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

         {/* Кнопка для открытия карты на мобильных - слева внизу */}
         {isMobile && displayResults.length > 0 && (
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
 
       </Container>
       </>
       );
       };

export default function Search({ apartments = [], totalCount = 0 }) {
  return (
    <Providers store={store}>
      <LanguageProvider>
        <SessionProvider>
          <FavoritesProvider>
            <GoogleMapsProvider> 
              <Header />
              <SearchResultsContent serverApartments={apartments} totalCount={totalCount} />
              <Footer />
            </GoogleMapsProvider>
          </FavoritesProvider>
        </SessionProvider>
      </LanguageProvider>
    </Providers>
  );
}

// ========== SERVER SIDE RENDERING ==========
export async function getServerSideProps({ query }) {
  try {
    console.log('🌐 getServerSideProps: загрузка данных с сервера');
    
    const baseUrl = process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_URL || 'https://nadoby.com.ua'
      : 'http://localhost:3000';

    console.log('🔗 API URL:', `${baseUrl}/api/v1/apartments/get-all`);
    
    const apartmentsRes = await fetch(`${baseUrl}/api/v1/apartments/get-all`);
    const apartmentsData = await apartmentsRes.json();

    console.log('📦 Ответ от API:', apartmentsData);

    let allApartments = [];
    if (Array.isArray(apartmentsData)) {
      allApartments = apartmentsData;
    } else if (apartmentsData.apartments && Array.isArray(apartmentsData.apartments)) {
      allApartments = apartmentsData.apartments;
    } else if (apartmentsData.data && Array.isArray(apartmentsData.data)) {
      allApartments = apartmentsData.data;
    }

    console.log('✅ Загружено квартир:', allApartments.length);
    
    // Логируем все города
    const cities = new Set();
    allApartments.forEach(apt => {
      if (apt.city) cities.add(apt.city);
    });
    console.log('🏙️ Города в базе:', Array.from(cities));

    // Перемешиваем квартиры
    const shuffledApartments = [...allApartments].sort(() => Math.random() - 0.5);

    return {
      props: {
        apartments: shuffledApartments,
        totalCount: shuffledApartments.length,
        generatedAt: new Date().toISOString(),
      }
    };
  } catch (error) {
    console.error('❌ Ошибка загрузки данных:', error);
    return {
      props: {
        apartments: [],
        totalCount: 0,
        generatedAt: new Date().toISOString(),
      }
    };
  }
}