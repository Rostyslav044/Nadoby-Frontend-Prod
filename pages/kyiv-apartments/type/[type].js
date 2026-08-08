// pages/kyiv-apartments/type/[type].js

import { useLanguage } from "@/app/LanguageContext";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import { useSession } from 'next-auth/react';
import CreateUser from '@/app/components/CreateUser';
import { 
  Box, Container, Typography, Grid, Chip, Breadcrumbs, Paper,
  useMediaQuery, useTheme, Skeleton, Button, Fab, Zoom, Alert, Snackbar,
  CircularProgress, IconButton, Dialog, DialogTitle, DialogContent, 
  Accordion, AccordionSummary, AccordionDetails, Divider, Pagination
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBack from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import MapIcon from '@mui/icons-material/Map';
import CloseIcon from '@mui/icons-material/Close';
import Warning from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import BedIcon from '@mui/icons-material/Bed';
import HomeIcon from '@mui/icons-material/Home';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import ApartmentCard from '@/app/components/ApartmentCard';
import { FavoritesProvider } from '@/app/hooks/FavoritesContext';
import { GoogleMapsProvider } from '../../../src/GoogleMapsProvider';

const MapComponent = dynamic(() => import('@/app/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <CircularProgress />
    </Box>
  )
});

// ========== КОНФИГУРАЦИЯ ТИПОВ ЖИЛЬЯ ==========
export const TYPE_CONFIG = {
  '1-bedroom': {
    id: '1-bedroom',
    slug: '1-bedroom',
    nameUa: '1-кімнатні квартири',
    nameRu: '1-комнатные квартиры',
    nameShortUa: '1-кімнатні',
    nameShortRu: '1-комнатные',
    icon: BedIcon,
    filter: { rooms: 1, minSize: 0, maxSize: 60 },
    roomsText: '1',
    rating: 4.6,
    tags: {
      ua: ['компактні', 'затишні', 'популярні', 'для пар'],
      ru: ['компактные', 'уютные', 'популярные', 'для пар']
    },
    seo: {
      titleUa: '1-кімнатні квартири в Києві — подобова оренда | NaDoby',
      titleRu: '1-комнатные квартиры в Киеве — посуточная аренда | NaDoby',
      descriptionUa: '✅ 1-кімнатні квартири в Києві подобово. ✔️ Від 350 грн/доба. ✔️ Від власників. ✔️ Без комісії.',
      descriptionRu: '✅ 1-комнатные квартиры в Киеве посуточно. ✔️ От 350 грн/сутки. ✔️ От собственников. ✔️ Без комиссии.'
    },
    descriptionFull: {
      ua: `1-кімнатні квартири в Києві — найпопулярніший формат житла для подобової оренди. Вони ідеально підходять для пар, студентів та ділових людей, які шукають комфортне житло за доступною ціною.`,
      ru: `1-комнатные квартиры в Киеве — самый популярный формат жилья для посуточной аренды. Они идеально подходят для пар, студентов и деловых людей, которые ищут комфортное жилье по доступной цене.`
    },
    seoContent: {
      ua: {
        fullDescription: `
          <h2>1-кімнатні квартири в Києві — оренда на добу</h2>
          <div style="background: linear-gradient(135deg, #f5f9ff 0%, #e8f4fd 100%); padding: 24px; border-radius: 16px; margin: 24px 0; border-left: 5px solid #1976d2; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <p style="font-size: 1.1rem; margin: 0 0 8px 0; line-height: 1.8; font-weight: 500;">
              🏠 <strong>Шукаєте 1-кімнатну квартиру в Києві?</strong> 
              <strong>Оренда 1-кімнатних квартир</strong> — це комфортне житло для комфортного проживання. 
              <strong>1-кімнатна квартира в Києві</strong> — ідеальний вибір для пари або студента.
            </p>
            <div style="font-size: 0.8rem; color: #555; margin: 8px 0 0 0; border-top: 1px solid #dde7f0; padding-top: 10px;">
              🔑 <strong>Ключові запити:</strong> 1-кімнатна квартира Київ · оренда 1-кімнатної · зняти однушку · подобова оренда 1-кімнатної
            </div>
          </div>
          <p>1-кімнатна квартира в Києві — це ідеальний баланс між комфортом та доступною ціною. Оренда такої квартири підходить для різних цілей: від короткострокових поїздок до тривалого проживання.</p>
          <h3>Переваги оренди 1-кімнатної квартири в Києві</h3>
          <ul>
            <li><strong>Доступна ціна</strong> — один з найбюджетніших варіантів житла</li>
            <li><strong>Великий вибір</strong> — тисячі пропозицій у всіх районах</li>
            <li><strong>Комфортний простір</strong> — окрема кімната та кухня</li>
            <li><strong>Зручне розташування</strong> — від центру до спальних районів</li>
            <li><strong>Ідеально для пари</strong> — достатньо місця для двох</li>
          </ul>
          <h3>Райони Києва з 1-кімнатними квартирами</h3>
          <ul>
            <li><strong>Хрещатик</strong> — центр міста, всі пам'ятки поруч</li>
            <li><strong>Печерськ</strong> — елітний район з хорошою інфраструктурою</li>
            <li><strong>Позняки</strong> — сучасні новобудови, розвинена інфраструктура</li>
            <li><strong>Оболонь</strong> — екологічно чистий район з набережною</li>
            <li><strong>Голосіївський</strong> — зелений район з парками</li>
          </ul>
          <h3>Ціни на 1-кімнатні квартири в Києві</h3>
          <ul>
            <li>Економ-клас: від 350 до 550 грн/доба</li>
            <li>Стандарт: від 550 до 900 грн/доба</li>
            <li>Преміум: від 900 до 1500 грн/доба</li>
          </ul>
          <h3>Кому підійде 1-кімнатна квартира в Києві?</h3>
          <ul>
            <li><strong>Парам</strong> — затишний простір для двох</li>
            <li><strong>Студентам</strong> — доступна ціна, зручне розташування</li>
            <li><strong>Діловим людям</strong> — комфортне житло в центрі</li>
            <li><strong>Туристам</strong> — економічний варіант для подорожей</li>
          </ul>
        `,
        faq: [
          { q: "Скільки коштує 1-кімнатна квартира в Києві?", a: "" },
          { q: "Які райони найкращі для 1-кімнатних квартир?", a: "Найбільший вибір — у центрі (Хрещатик, Печерськ), Позняках, Оболоні та Голосіївському." },
          { q: "Чи можна зняти 1-кімнатну квартиру на місяць?", a: "Так, багато власників пропонують знижки при довгостроковій оренді від 7 днів." },
          { q: "Які документи потрібні для заселення?", a: "Для заселення зазвичай потрібен паспорт. Деякі власники просять заставу." }
        ]
      },
      ru: {
        fullDescription: `
          <h2>1-комнатные квартиры в Киеве — аренда на сутки</h2>
          <div style="background: linear-gradient(135deg, #f5f9ff 0%, #e8f4fd 100%); padding: 24px; border-radius: 16px; margin: 24px 0; border-left: 5px solid #1976d2; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <p style="font-size: 1.1rem; margin: 0 0 8px 0; line-height: 1.8; font-weight: 500;">
              🏠 <strong>Ищете 1-комнатную квартиру в Киеве?</strong> 
              <strong>Аренда 1-комнатных квартир</strong> — это комфортное жилье для комфортного проживания. 
              <strong>1-комнатная квартира в Киеве</strong> — идеальный выбор для пары или студента.
            </p>
          </div>
        `,
        faq: [
          { q: "Сколько стоит 1-комнатная квартира в Киеве?", a: "" },
          { q: "Какие районы лучшие для 1-комнатных квартир?", a: "Самый большой выбор — в центре (Крещатик, Печерск), Позняках, Оболони и Голосеевском." },
          { q: "Можно ли снять 1-комнатную квартиру на месяц?", a: "Да, многие собственники предлагают скидки при долгосрочной аренде от 7 дней." },
          { q: "Какие документы нужны для заселения?", a: "Для заселения обычно нужен паспорт. Некоторые собственники просят залог." }
        ]
      }
    },
    advantages: {
      ua: [
        'Найпопулярніший формат житла в Києві',
        'Великий вибір у всіх районах міста',
        'Ідеально для пари або студента',
        'Відмінне співвідношення ціни та комфорту',
        'Окрема кухня та кімната для відпочинку',
        'Швидке заселення та мінімум формальностей'
      ],
      ru: [
        'Самый популярный формат жилья в Киеве',
        'Большой выбор во всех районах города',
        'Идеально для пары или студента',
        'Отличное соотношение цены и комфорта',
        'Отдельная кухня и комната для отдыха',
        'Быстрое заселение и минимум формальностей'
      ]
    },
    priceStats: { min: 350, max: 1500, avg: 700 },
    tips: {
      ua: [
        '✔️ Обирайте квартири з балконом для додаткового простору',
        '✔️ Перевіряйте наявність техніки та Wi-Fi',
        '✔️ Зверніть увагу на розташування — близькість до метро',
        '✔️ Для тривалого проживання обирайте квартиру з кондиціонером'
      ],
      ru: [
        '✔️ Выбирайте квартиры с балконом для дополнительного пространства',
        '✔️ Проверяйте наличие техники и Wi-Fi',
        '✔️ Обратите внимание на расположение — близость к метро',
        '✔️ Для длительного проживания выбирайте квартиру с кондиционером'
      ]
    }
  },
  
  '2-bedroom': {
    id: '2-bedroom',
    slug: '2-bedroom',
    nameUa: '2-кімнатні квартири',
    nameRu: '2-комнатные квартиры',
    nameShortUa: '2-кімнатні',
    nameShortRu: '2-комнатные',
    icon: BedIcon,
    filter: { rooms: 2, minSize: 0, maxSize: 80 },
    roomsText: '2',
    rating: 4.7,
    tags: {
      ua: ['просторі', 'сімейні', 'комфортні', 'для компаній'],
      ru: ['просторные', 'семейные', 'комфортные', 'для компаний']
    },
    seo: {
      titleUa: '2-кімнатні квартири в Києві — подобова оренда | NaDoby',
      titleRu: '2-комнатные квартиры в Киеве — посуточная аренда | NaDoby',
      descriptionUa: '✅ 2-кімнатні квартири в Києві подобово. ✔️ Від 450 грн/доба. ✔️ Від власників. ✔️ Без комісії.',
      descriptionRu: '✅ 2-комнатные квартиры в Киеве посуточно. ✔️ От 450 грн/сутки. ✔️ От собственников. ✔️ Без комиссии.'
    },
    descriptionFull: {
      ua: `2-кімнатні квартири в Києві — ідеальний вибір для сімей, компаній друзів та ділових поїздок. Просторі та комфортні, вони забезпечують максимальний комфорт для всіх мешканців.`,
      ru: `2-комнатные квартиры в Киеве — идеальный выбор для семей, компаний друзей и деловых поездок. Просторные и комфортные, они обеспечивают максимальный комфорт для всех жильцов.`
    },
    seoContent: {
      ua: {
        fullDescription: `
          <h2>2-кімнатні квартири в Києві — простір та комфорт</h2>
          <div style="background: linear-gradient(135deg, #f5f9ff 0%, #e8f4fd 100%); padding: 24px; border-radius: 16px; margin: 24px 0; border-left: 5px solid #1976d2; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <p style="font-size: 1.1rem; margin: 0 0 8px 0; line-height: 1.8; font-weight: 500;">
              🏠 <strong>Шукаєте 2-кімнатну квартиру в Києві?</strong> 
              <strong>Оренда 2-кімнатних квартир</strong> — це просторне житло для комфортного проживання.
            </p>
          </div>
          <p>2-кімнатна квартира в Києві — це ідеальний вибір для тих, хто цінує простір та комфорт. Дві окремі кімнати дозволяють облаштувати зону відпочинку та робочий кабінет, або кімнату для дітей.</p>
          <h3>Переваги оренди 2-кімнатної квартири</h3>
          <ul>
            <li><strong>Просторий простір</strong> — дві кімнати для різних потреб</li>
            <li><strong>Ідеально для сімей</strong> — окрема кімната для дітей</li>
            <li><strong>Комфорт для компаній</strong> — достатньо місця для 3-4 осіб</li>
            <li><strong>Гнучкість використання</strong> — робота, відпочинок, прийом гостей</li>
          </ul>
        `,
        faq: [
          { q: "Скільки коштує 2-кімнатна квартира в Києві?", a: "" },
          { q: "Чи підходить 2-кімнатна квартира для сім'ї з дитиною?", a: "Так, це ідеальний варіант для сім'ї з 1-2 дітьми." }
        ]
      },
      ru: {
        fullDescription: `
          <h2>2-комнатные квартиры в Киеве — пространство и комфорт</h2>
          <div style="background: linear-gradient(135deg, #f5f9ff 0%, #e8f4fd 100%); padding: 24px; border-radius: 16px; margin: 24px 0; border-left: 5px solid #1976d2; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <p style="font-size: 1.1rem; margin: 0 0 8px 0; line-height: 1.8; font-weight: 500;">
              🏠 <strong>Ищете 2-комнатную квартиру в Киеве?</strong> 
              <strong>Аренда 2-комнатных квартир</strong> — это просторное жилье для комфортного проживания.
            </p>
          </div>
        `,
        faq: [
          { q: "Сколько стоит 2-комнатная квартира в Киеве?", a: "" },
          { q: "Подходит ли 2-комнатная квартира для семьи с ребенком?", a: "Да, это идеальный вариант для семьи с 1-2 детьми." }
        ]
      }
    },
    advantages: {
      ua: [
        'Просторне житло для сімей та компаній',
        'Дві окремі кімнати для комфорту',
        'Відмінний вибір для тривалого проживання',
        'Доступні ціни при великій площі',
        'Гнучке планування для різних потреб'
      ],
      ru: [
        'Просторное жилье для семей и компаний',
        'Dве отдельные комнаты для комфорта',
        'Отличный выбор для длительного проживания',
        'Доступные цены при большой площади',
        'Гибкая планировка для разных потребностей'
      ]
    },
    priceStats: { min: 450, max: 2500, avg: 900 },
    tips: {
      ua: [
        '✔️ Обирайте квартири з великою кухнею для сімейних обідів',
        '✔️ Перевіряйте наявність додаткового спального місця',
        '✔️ Зверніть увагу на звукоізоляцію',
        '✔️ Для компаній обирайте квартири з двома окремими спальнями'
      ],
      ru: [
        '✔️ Выбирайте квартиры с большой кухней для семейных обедов',
        '✔️ Проверяйте наличие дополнительного спального места',
        '✔️ Обратите внимание на звукоизоляцию',
        '✔️ Для компаний выбирайте квартиры с двумя отдельными спальнями'
      ]
    }
  },
  
  '3-bedroom': {
    id: '3-bedroom',
    slug: '3-bedroom',
    nameUa: '3-кімнатні квартири',
    nameRu: '3-комнатные квартиры',
    nameShortUa: '3-кімнатні',
    nameShortRu: '3-комнатные',
    icon: BedIcon,
    filter: { rooms: 3, minSize: 0, maxSize: 120 },
    roomsText: '3',
    rating: 4.8,
    tags: {
      ua: ['престижні', 'просторі', 'для великих сімей', 'комфортні'],
      ru: ['престижные', 'просторные', 'для больших семей', 'комфортные']
    },
    seo: {
      titleUa: '3-кімнатні квартири в Києві — подобова оренда | NaDoby',
      titleRu: '3-комнатные квартиры в Киеве — посуточная аренда | NaDoby',
      descriptionUa: '✅ 3-кімнатні квартири в Києві подобово. ✔️ Від 600 грн/доба. ✔️ Від власників. ✔️ Без комісії.',
      descriptionRu: '✅ 3-комнатные квартиры в Киеве посуточно. ✔️ От 600 грн/сутки. ✔️ От собственников. ✔️ Без комиссии.'
    },
    descriptionFull: {
      ua: `3-кімнатні квартири в Києві — це максимальний комфорт та простір для великих сімей, компаній та ділових поїздок. Це житло преміум-класу з усіма зручностями.`,
      ru: `3-комнатные квартиры в Киеве — это максимальный комфорт и пространство для больших семей, компаний и деловых поездок. Это жилье премиум-класса со всеми удобствами.`
    },
    seoContent: {
      ua: {
        fullDescription: `
          <h2>3-кімнатні квартири в Києві — максимальний комфорт</h2>
          <div style="background: linear-gradient(135deg, #f5f9ff 0%, #e8f4fd 100%); padding: 24px; border-radius: 16px; margin: 24px 0; border-left: 5px solid #1976d2; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <p style="font-size: 1.1rem; margin: 0 0 8px 0; line-height: 1.8; font-weight: 500;">
              🏠 <strong>Шукаєте 3-кімнатну квартиру в Києві?</strong> 
              <strong>Оренда 3-кімнатних квартир</strong> — це просторне житло для всієї родини.
            </p>
          </div>
          <p>3-кімнатна квартира в Києві — це вибір тих, хто цінує простір, комфорт та престиж. Три окремі кімнати дозволяють облаштувати спальні для всіх членів сім'ї, кабінет та вітальню.</p>
          <h3>Переваги оренди 3-кімнатної квартири</h3>
          <ul>
            <li><strong>Максимальний простір</strong> — три окремі кімнати для різних потреб</li>
            <li><strong>Ідеально для великих сімей</strong> — місце для всіх</li>
            <li><strong>Престижний статус</strong> — житло в елітних районах</li>
            <li><strong>Комфорт для компаній</strong> — простір для 5-6 осіб</li>
          </ul>
        `,
        faq: [
          { q: "Скільки коштує 3-кімнатна квартира в Києві?", a: "" },
          { q: "Які райони найкращі для 3-кімнатних квартир?", a: "Найкращі варіанти — у центрі (Хрещатик, Печерськ) та престижних районах (Оболонь, Позняки)." }
        ]
      },
      ru: {
        fullDescription: `
          <h2>3-комнатные квартиры в Киеве — максимальный комфорт</h2>
          <div style="background: linear-gradient(135deg, #f5f9ff 0%, #e8f4fd 100%); padding: 24px; border-radius: 16px; margin: 24px 0; border-left: 5px solid #1976d2; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <p style="font-size: 1.1rem; margin: 0 0 8px 0; line-height: 1.8; font-weight: 500;">
              🏠 <strong>Ищете 3-комнатную квартиру в Киеве?</strong> 
              <strong>Аренда 3-комнатных квартир</strong> — это просторное жилье для всей семьи.
            </p>
          </div>
        `,
        faq: [
          { q: "Сколько стоит 3-комнатная квартира в Киеве?", a: "" },
          { q: "Какие районы лучшие для 3-комнатных квартир?", a: "Лучшие варианты — в центре (Крещатик, Печерск) и престижных районах (Оболонь, Позняки)." }
        ]
      }
    },
    advantages: {
      ua: [
        'Максимальний простір та комфорт',
        'Ідеально для великих сімей та компаній',
        'Три окремі кімнати для приватності',
        'Найкращі варіанти в елітних районах',
        'Повна свобода планування простору'
      ],
      ru: [
        'Максимальное пространство и комфорт',
        'Идеально для больших семей и компаний',
        'Три отдельные комнаты для приватности',
        'Лучшие варианты в элитных районах',
        'Полная свобода планирования пространства'
      ]
    },
    priceStats: { min: 600, max: 4000, avg: 1200 },
    tips: {
      ua: [
        '✔️ Обирайте квартири з великою вітальнею для сімейних зборів',
        '✔️ Перевіряйте наявність кількох санвузлів',
        '✔️ Зверніть увагу на розташування — центр або зелений район',
        '✔️ Для компаній обирайте квартири з окремою кухнею'
      ],
      ru: [
        '✔️ Выбирайте квартиры с большой гостиной для семейных сборов',
        '✔️ Проверяйте наличие нескольких санузлов',
        '✔️ Обратите внимание на расположение — центр или зеленый район',
        '✔️ Для компаний выбирайте квартиры с отдельной кухней'
      ]
    }
  },
  
  '4-bedroom': {
    id: '4-bedroom',
    slug: '4-bedroom',
    nameUa: '4 + кімнатні квартири',
    nameRu: '4 + комнатные квартиры',
    nameShortUa: '4 + кімнатні',
    nameShortRu: '4 + комнатные',
    icon: HomeIcon,
    filter: { rooms: 4, minSize: 0, maxSize: 200 },
    roomsText: '4',
    rating: 4.9,
    tags: {
      ua: ['ексклюзивні', 'розкішні', 'для великих сімей', 'престижні'],
      ru: ['эксклюзивные', 'роскошные', 'для больших семей', 'престижные']
    },
    seo: {
      titleUa: '4-кімнатні квартири в Києві — розкішне житло | NaDoby',
      titleRu: '4-комнатные квартиры в Киеве — роскошное жилье | NaDoby',
      descriptionUa: '✅ 4-кімнатні квартири в Києві подобово. ✔️ Від 800 грн/доба. ✔️ Ексклюзивні пропозиції. ✔️ Без комісії.',
      descriptionRu: '✅ 4-комнатные квартиры в Киеве посуточно. ✔️ От 800 грн/сутки. ✔️ Эксклюзивные предложения. ✔️ Без комиссии.'
    },
    descriptionFull: {
      ua: `4-кімнатні квартири в Києві — це ексклюзивне житло для тих, хто цінує простір, комфорт та престиж. Це квартири в елітних будинках з панорамними видами та найкращою інфраструктурою.`,
      ru: `4-комнатные квартиры в Киеве — это эксклюзивное жилье для тех, кто ценит пространство, комфорт и престиж. Это квартиры в элитных домах с панорамными видами и лучшей инфраструктурой.`
    },
    seoContent: {
      ua: {
        fullDescription: `
          <h2>4-кімнатні квартири в Києві — ексклюзивне житло</h2>
          <div style="background: linear-gradient(135deg, #f5f9ff 0%, #e8f4fd 100%); padding: 24px; border-radius: 16px; margin: 24px 0; border-left: 5px solid #1976d2; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <p style="font-size: 1.1rem; margin: 0 0 8px 0; line-height: 1.8; font-weight: 500;">
              🏠 <strong>Шукаєте 4-кімнатну квартиру в Києві?</strong> 
              <strong>Оренда 4-кімнатних квартир</strong> — це розкішне житло для великої родини або представницьких цілей.
              <strong>4-кімнатна квартира в Києві</strong> — це простір, комфорт та престиж у найкращих районах столиці.
            </p>
            <div style="font-size: 0.8rem; color: #555; margin: 8px 0 0 0; border-top: 1px solid #dde7f0; padding-top: 10px;">
              🔑 <strong>Ключові запити:</strong> 4-кімнатна квартира Київ · оренда 4-кімнатної · елітне житло Київ · розкішна квартира · престижне житло
            </div>
          </div>
          <p>4-кімнатна квартира в Києві — це максимум простору та комфорту. Таке житло обирають успішні люди, які цінують якість життя, приватність та престиж. Це квартири з великими кімнатами, просторими кухнями та панорамними вікнами.</p>
          <h3>Переваги оренди 4-кімнатної квартири</h3>
          <ul>
            <li><strong>Максимальний простір</strong> — чотири окремі кімнати для всіх потреб</li>
            <li><strong>Ексклюзивність</strong> — обмежена кількість таких квартир</li>
            <li><strong>Престижний статус</strong> — житло в елітних районах</li>
            <li><strong>Ідеально для великих сімей</strong> — місце для всіх членів сім'ї</li>
            <li><strong>Панорамні види</strong> — квартири з кращими видами на місто</li>
          </ul>
          <h3>Райони Києва з 4-кімнатними квартирами</h3>
          <ul>
            <li><strong>Печерськ</strong> — елітний центр з найкращою інфраструктурою</li>
            <li><strong>Хрещатик</strong> — серце Києва, всі пам'ятки поруч</li>
            <li><strong>Оболонь</strong> — екологічно чистий район з панорамними видами</li>
            <li><strong>Позняки</strong> — сучасні новобудови з просторими квартирами</li>
          </ul>
          <h3>Ціни на 4-кімнатні квартири в Києві</h3>
          <ul>
            <li>Стандарт: від 800 до 1400 грн/доба</li>
            <li>Преміум: від 1400 до 2500 грн/доба</li>
            <li>Люкс: від 2500+ грн/доба</li>
          </ul>
          <h3>Кому підійде 4-кімнатна квартира?</h3>
          <ul>
            <li><strong>Великим сім'ям</strong> — простір для всіх членів сім'ї</li>
            <li><strong>Компаніям</strong> — представницьке житло для ділових зустрічей</li>
            <li><strong>Заможним людям</strong> — престиж та комфорт</li>
            <li><strong>Довготривале проживання</strong> — ідеально для релокації</li>
          </ul>
        `,
        faq: [
          { q: "Скільки коштує 4-кімнатна квартира в Києві?", a: "" },
          { q: "Які райони найкращі для 4-кімнатних квартир?", a: "Найкращі варіанти — у Печерську, Хрещатику, Оболоні та Позняках." },
          { q: "Чи є 4-кімнатні квартири з панорамним видом?", a: "Так, багато таких квартир знаходяться на верхніх поверхах елітних новобудов." }
        ]
      },
      ru: {
        fullDescription: `
          <h2>4-комнатные квартиры в Киеве — эксклюзивное жилье</h2>
          <div style="background: linear-gradient(135deg, #f5f9ff 0%, #e8f4fd 100%); padding: 24px; border-radius: 16px; margin: 24px 0; border-left: 5px solid #1976d2; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <p style="font-size: 1.1rem; margin: 0 0 8px 0; line-height: 1.8; font-weight: 500;">
              🏠 <strong>Ищете 4-комнатную квартиру в Киеве?</strong> 
              <strong>Аренда 4-комнатных квартир</strong> — это роскошное жилье для большой семьи или представительских целей.
              <strong>4-комнатная квартира в Киеве</strong> — это пространство, комфорт и престиж в лучших районах столицы.
            </p>
          </div>
        `,
        faq: [
          { q: "Сколько стоит 4-комнатная квартира в Киеве?", a: "" },
          { q: "Какие районы лучшие для 4-комнатных квартир?", a: "Лучшие варианты — в Печерске, Крещатике, Оболони и Позняках." },
          { q: "Есть ли 4-комнатные квартиры с панорамным видом?", a: "Да, многие такие квартиры находятся на верхних этажах элитных новостроек." }
        ]
      }
    },
    advantages: {
      ua: [
        'Ексклюзивне житло з максимальним комфортом',
        'Чотири окремі кімнати для всієї родини',
        'Найкращі райони Києва',
        'Панорамні види та сучасні планування',
        'Престижний статус та висока якість життя',
        'Ідеально для тривалого проживання'
      ],
      ru: [
        'Эксклюзивное жилье с максимальным комфортом',
        'Четыре отдельные комнаты для всей семьи',
        'Лучшие районы Киева',
        'Панорамные виды и современные планировки',
        'Престижный статус и высокое качество жизни',
        'Идеально для длительного проживания'
      ]
    },
    priceStats: { min: 800, max: 5000, avg: 1500 },
    tips: {
      ua: [
        '✔️ Обирайте квартири з панорамним видом для максимального комфорту',
        '✔️ Перевіряйте наявність кількох санвузлів та гардеробних',
        '✔️ Зверніть увагу на якість ремонту та матеріалів',
        '✔️ Для представницьких цілей обирайте квартири з великою вітальнею'
      ],
      ru: [
        '✔️ Выбирайте квартиры с панорамным видом для максимального комфорта',
        '✔️ Проверяйте наличие нескольких санузлов и гардеробных',
        '✔️ Обратите внимание на качество ремонта и материалов',
        '✔️ Для представительских целей выбирайте квартиры с большой гостиной'
      ]
    }
  }
};

export const TYPE_CONTENT = TYPE_CONFIG;

// ========== ОСНОВНОЙ КОМПОНЕНТ ==========
function TypeContent({ allApartments = [], typeSlug = '' }) {
  const { currentLanguage } = useLanguage();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [isClient, setIsClient] = useState(false);
  const [page, setPage] = useState(1);
  const [mapOpen, setMapOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { data: session } = useSession();
  
  const typeData = TYPE_CONFIG[typeSlug];
  const lang = currentLanguage === 'ua' ? 'ua' : 'ru';
  
  // Фильтрация квартир по типу
  const apartments = useMemo(() => {
    if (!allApartments || allApartments.length === 0) return [];
    if (!typeData) return [];
    
    const kyivVariants = ['київ', 'kiev', 'kyiv', 'киев', 'києві', 'киеве'];
    const kievApartments = allApartments.filter(apt => {
      if (!apt) return false;
      const cityFields = [
        apt.city,
        apt.originalCity,
        apt.region,
        apt.address
      ].filter(Boolean).map(f => f.toLowerCase());
      return cityFields.some(field => 
        kyivVariants.some(variant => field.includes(variant))
      );
    });
    
    const roomCount = typeData.filter?.rooms;
    if (roomCount !== undefined) {
      return kievApartments.filter(apt => {
        const rooms = Number(apt.rooms) || 0;
        if (typeSlug === '4-bedroom') {
          return rooms >= 4;  // Показывает 4, 5, 6 и больше комнат
        }
        return rooms === roomCount;
      });
    }
    
    return kievApartments;
  }, [allApartments, typeData]);
  
  const totalCount = apartments.length;
  const itemsPerPage = isMobile ? 6 : isTablet ? 9 : 12;
  const pageCount = Math.ceil(apartments.length / itemsPerPage);
  const displayedApartments = apartments.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  
  // Реальная статистика цен
  const priceStats = useMemo(() => {
    const prices = apartments.map(apt => Number(apt.price)).filter(p => p > 0);
    
    if (prices.length === 0 || !typeData) {
      return typeData?.priceStats || { min: 300, max: 2000, avg: 700 };
    }
    
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    
    return {
      min: minPrice,
      max: maxPrice,
      avg: avgPrice
    };
  }, [apartments, typeData]);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
        () => {}
      );
    }
  }, []);
  
  const handleBackToKiev = () => router.push('/kyiv-apartments');
  const handleApartmentSelect = (apartment) => {
    setSelectedApartment(apartment);
    router.push(`/apartment/${apartment._id}`);
  };
  const handleAddApartment = () => {
    const isAuthenticated = session || localStorage.getItem('user_profile');
    if (isAuthenticated) {
      window.location.href = 'https://nadoby.com.ua/add-apartment';
    } else {
      setOpenAuthModal(true);
      setShowAlert(true);
    }
  };
  
  // Получение SEO контента с подстановкой цен
  const getSeoContentHtml = () => {
    if (!typeData) return '';
    
    let html = typeData.seoContent?.[lang]?.fullDescription || typeData.descriptionFull[lang];
    
    if (html) {
      html = html.replace(/від \d+ до \d+ грн\/доба/g, `від ${priceStats.min} до ${priceStats.max} грн/доба`);
      html = html.replace(/от \d+ до \d+ грн\/сутки/g, `от ${priceStats.min} до ${priceStats.max} грн/сутки`);
      html = html.replace(/Середня ціна — \d+ грн\/доба/g, `Середня ціна — ${priceStats.avg} грн/доба`);
      html = html.replace(/Средняя цена — \d+ грн\/сутки/g, `Средняя цена — ${priceStats.avg} грн/сутки`);
    }
    
    return html;
  };
  
  // Получение текста для SEO-блока в зависимости от типа
  const getSeoBlockText = () => {
    const typeName = lang === 'ua' ? typeData.nameUa : typeData.nameRu;
    const typeShort = lang === 'ua' ? typeData.nameShortUa : typeData.nameShortRu;
    const rooms = typeData.roomsText;
    
    const texts = {
      ua: {
        title: `Як швидко зняти ${typeName.toLowerCase()} в Києві?`,
        subtitle1: `💰 Скільки коштує ${typeName.toLowerCase()} в Києві?`,
        text1: `Ціни на ${typeName.toLowerCase()} в Києві варіюються від ${priceStats.min} до ${priceStats.max} грн за добу. Середня вартість оренди становить ${priceStats.avg} грн/доба. Найдешевші варіанти можна знайти в спальних районах, а найпрестижніші квартири розташовані в центрі міста.`,
        subtitle2: `📍 Де знайти ${typeName.toLowerCase()} в Києві?`,
        text2: `Найбільший вибір ${typeName.toLowerCase()} представлений у таких районах Києва:`,
        subtitle3: `🚇 ${typeShort} біля метро в Києві`,
        text3: `Оренда ${typeName.toLowerCase()} біля станцій метро — це зручність та економія часу. Найпопулярніші станції для оренди:`,
        subtitle4: `✅ Як правильно вибрати ${typeName.toLowerCase()}?`,
        tips: [
          `Визначте бюджет — скільки ви готові платити за добу`,
          `Оберіть район — центр чи спальний район`,
          `Перевірте транспортну доступність — близькість до метро`,
          `Зверніть увагу на інфраструктуру — магазини, кафе, парки`,
          `Читайте відгуки попередніх орендарів`,
          `Зв'яжіться з власником та уточніть всі деталі`
        ],
        button: `🚀 Дивитися всі ${typeName.toLowerCase()} в Києві`
      },
      ru: {
        title: `Как быстро снять ${typeName.toLowerCase()} в Киеве?`,
        subtitle1: `💰 Сколько стоит ${typeName.toLowerCase()} в Киеве?`,
        text1: `Цены на ${typeName.toLowerCase()} в Киеве варьируются от ${priceStats.min} до ${priceStats.max} грн за сутки. Средняя стоимость аренды составляет ${priceStats.avg} грн/сутки. Самые дешевые варианты можно найти в спальных районах, а самые престижные квартиры расположены в центре города.`,
        subtitle2: `📍 Где найти ${typeName.toLowerCase()} в Киеве?`,
        text2: `Самый большой выбор ${typeName.toLowerCase()} представлен в таких районах Киева:`,
        subtitle3: `🚇 ${typeShort} у метро в Киеве`,
        text3: `Аренда ${typeName.toLowerCase()} возле станций метро — это удобство и экономия времени. Самые популярные станции для аренды:`,
        subtitle4: `✅ Как правильно выбрать ${typeName.toLowerCase()}?`,
        tips: [
          `Определите бюджет — сколько вы готовы платить за сутки`,
          `Выберите район — центр или спальный район`,
          `Проверьте транспортную доступность — близость к метро`,
          `Обратите внимание на инфраструктуру — магазины, кафе, парки`,
          `Читайте отзывы предыдущих арендаторов`,
          `Свяжитесь с собственником и уточните все детали`
        ],
        button: `🚀 Смотреть все ${typeName.toLowerCase()} в Киеве`
      }
    };
    
    return texts[lang];
  };
  
  // Структурированные данные
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": lang === 'ua' ? "Головна" : "Главная",
            "item": "https://nadoby.com.ua/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": lang === 'ua' ? "Квартири в Києві" : "Квартиры в Киеве",
            "item": "https://nadoby.com.ua/kyiv-apartments"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": typeData?.nameUa || typeData?.nameRu,
            "item": `https://nadoby.com.ua/kyiv-apartments/type/${typeSlug}`
          }
        ]
      },
      {
        "@type": "Product",
        "name": typeData?.seo?.[`title${lang === 'ua' ? 'Ua' : 'Ru'}`] || '',
        "description": typeData?.seo?.[`description${lang === 'ua' ? 'Ua' : 'Ru'}`] || '',
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
  
  if (!isClient || !typeData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="text" width="60%" height={60} />
        <Skeleton variant="rectangular" width="100%" height={400} sx={{ my: 2 }} />
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" width="100%" height={250} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
  
  const typeName = lang === 'ua' ? typeData.nameUa : typeData.nameRu;
  const Icon = typeData.icon || HomeIcon;
  const seoBlock = getSeoBlockText();
  
  return (
    <>
      <Head>
        <title>{typeData.seo[`title${lang === 'ua' ? 'Ua' : 'Ru'}`]}</title>
        <meta name="description" content={typeData.seo[`description${lang === 'ua' ? 'Ua' : 'Ru'}`]} />
        <meta name="keywords" content={`${typeName} Киев, снять ${typeName}, аренда ${typeName}, подобовая аренда ${typeName}`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://nadoby.com.ua/kyiv-apartments/type/${typeSlug}`} />
        <link rel="alternate" href={`https://nadoby.com.ua/kyiv-apartments/type/${typeSlug}`} hreflang="ru" />
        <link rel="alternate" href={`https://nadoby.com.ua/ua/kyiv-apartments/type/${typeSlug}`} hreflang="uk" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://nadoby.com.ua/kyiv-apartments/type/${typeSlug}`} />
        <meta property="og:title" content={typeData.seo[`title${lang === 'ua' ? 'Ua' : 'Ru'}`]} />
        <meta property="og:description" content={typeData.seo[`description${lang === 'ua' ? 'Ua' : 'Ru'}`]} />
        <meta property="og:locale" content={lang === 'ua' ? 'uk_UA' : 'ru_RU'} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>
      
      <Box component="main" sx={{ minHeight: '100vh', backgroundColor: '#fafafa', position: 'relative' }}>
        {/* Кнопка для добавления объявления */}
        <Zoom in={true}>
          <Fab color="primary" onClick={handleAddApartment} sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
            <AddIcon />
          </Fab>
        </Zoom>
        
        {/* Кнопка карты на мобильных */}
        {isMobile && apartments.length > 0 && (
          <Zoom in={true}>
            <Fab color="secondary" onClick={() => setMapOpen(true)} sx={{ position: 'fixed', bottom: 20, left: 20, zIndex: 1000 }}>
              <MapIcon />
            </Fab>
          </Zoom>
        )}
        
        <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
          {/* Хлебные крошки */}
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 2 }}>
            <Link href="/" passHref>
              <Typography component="a" sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { textDecoration: 'underline' } }}>
                {lang === 'ua' ? 'Головна' : 'Главная'}
              </Typography>
            </Link>
            <Link href="/kyiv-apartments" passHref>
              <Typography component="a" sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { textDecoration: 'underline' } }}>
                {lang === 'ua' ? 'Квартири в Києві' : 'Квартиры в Киеве'}
              </Typography>
            </Link>
            <Typography color="text.primary">{typeName}</Typography>
          </Breadcrumbs>
          
          <Button startIcon={<ArrowBack />} onClick={handleBackToKiev} sx={{ mb: 3 }}>
            {lang === 'ua' ? 'Назад до всіх квартир' : 'Назад ко всем квартирам'}
          </Button>
          
          {/* Заголовочный блок */}
          <Paper sx={{ p: { xs: 2, md: 4 }, mb: 4, bgcolor: '#ffffff', borderRadius: 3, borderLeft: `6px solid #1976d2` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              <Icon sx={{ fontSize: 40, color: '#1976d2' }} />
              <Typography variant="h1" sx={{ fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' }, fontWeight: 700 }}>
                {typeName} {lang === 'ua' ? 'в Києві' : 'в Киеве'}
              </Typography>
              <Chip 
                label={`${totalCount} ${lang === 'ua' ? 'оголошень' : 'объявлений'}`}
                color="primary"
                sx={{ fontWeight: 600 }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              {(typeData.tags[lang] || typeData.tags).map(tag => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
              <Chip icon={<StarIcon sx={{ color: '#FFB300' }} />} label={`${typeData.rating} ★`} size="small" sx={{ fontWeight: 600 }} />
            </Box>
            
            <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: 'text.secondary' }}>
              {typeData.descriptionFull[lang]}
            </Typography>
          </Paper>
          
          {/* Статистика */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd' }}>
                <Typography variant="caption">{lang === 'ua' ? 'Всього оголошень' : 'Всего объявлений'}</Typography>
                <Typography variant="h5" fontWeight={700}>{totalCount}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
                <Typography variant="caption">{lang === 'ua' ? 'Мінімальна ціна' : 'Минимальная цена'}</Typography>
                <Typography variant="h5" fontWeight={700}>{priceStats.min} ₴</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#fff3e0' }}>
                <Typography variant="caption">{lang === 'ua' ? 'Середня ціна' : 'Средняя цена'}</Typography>
                <Typography variant="h5" fontWeight={700}>{priceStats.avg} ₴</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#ffebee' }}>
                <Typography variant="caption">{lang === 'ua' ? 'Максимальна ціна' : 'Максимальная цена'}</Typography>
                <Typography variant="h5" fontWeight={700}>{priceStats.max} ₴</Typography>
              </Paper>
            </Grid>
          </Grid>
          
          {/* SEO контент */}
          <Paper sx={{ p: { xs: 2, md: 4 }, mb: 4, bgcolor: '#ffffff', borderRadius: 3 }}>
            <Box 
              className="type-seo-content"
              suppressHydrationWarning
              sx={{ 
                fontFamily: 'Montserrat, "Segoe UI", Roboto, sans-serif',
                '& h2': { 
                  fontSize: { xs: '1.5rem', md: '1.8rem' }, 
                  fontWeight: 600, 
                  mb: 2, 
                  mt: 3
                },
                '& h3': { 
                  fontSize: { xs: '1.2rem', md: '1.4rem' }, 
                  fontWeight: 600, 
                  mb: 1.5, 
                  mt: 2.5
                },
                '& p': { 
                  fontSize: { xs: '1rem', md: '1.1rem' }, 
                  lineHeight: 1.8, 
                  mb: 2
                },
                '& ul': { 
                  mb: 2, 
                  pl: 3
                },
                '& li': { 
                  fontSize: { xs: '0.95rem', md: '1rem' }, 
                  lineHeight: 1.7, 
                  mb: 0.5
                },
                '& strong': { 
                  fontWeight: 600, 
                  color: 'primary.main'
                }
              }}
              dangerouslySetInnerHTML={{ 
                __html: getSeoContentHtml().replace(/\s+/g, ' ').trim() 
              }} 
            />
          </Paper>
          
          {/* Преимущества */}
          <Typography variant="h2" sx={{ fontSize: { xs: '1.35rem', sm: '1.6rem', md: '1.85rem' }, fontWeight: 600, mb: 3 }}>
            {lang === 'ua' ? 'Переваги' : 'Преимущества'} {typeName}
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {typeData.advantages[lang].map((adv, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1 }}>
                  <CheckCircleIcon color="success" sx={{ fontSize: 24 }} />
                  <Typography variant="body1">{adv}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          
          {/* ============================================================ */}
          {/* ↓↓↓ СИЛЬНЫЙ SEO-БЛОК ДЛЯ ПОИСКОВИКОВ ↓↓↓ */}
          {/* ============================================================ */}
          
          <Paper sx={{ p: { xs: 2, md: 4 }, mb: 4, bgcolor: '#f5f9ff', borderRadius: 3 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '1.35rem', sm: '1.6rem', md: '1.85rem' }, fontWeight: 600, mb: 2 }}>
              {seoBlock.title}
            </Typography>
            
            <Typography variant="body1" sx={{ fontSize: { xs: '0.95rem', md: '1.05rem' }, lineHeight: 1.8, mb: 2 }}>
              {lang === 'ua' 
                ? `Пошук квартири для оренди — це завжди виклик, особливо коли потрібно швидко знайти варіант у великому місті. Наша платформа NaDoby створена саме для того, щоб ви могли зняти ${typeName.toLowerCase()} в Києві без зайвих турбот. Ми зібрали найкращі пропозиції від власників, щоб ви могли обрати ідеальне житло за кілька кліків.`
                : `Поиск квартиры для аренды — это всегда вызов, особенно когда нужно быстро найти вариант в большом городе. Наша платформа NaDoby создана именно для того, чтобы вы могли снять ${typeName.toLowerCase()} в Киеве без лишних хлопот. Мы собрали лучшие предложения от собственников, чтобы вы могли выбрать идеальное жилье за несколько кликов.`}
            </Typography>
            
            <Typography variant="h3" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' }, fontWeight: 600, mb: 1.5, mt: 3 }}>
              {seoBlock.subtitle1}
            </Typography>
            
            <Typography variant="body1" sx={{ fontSize: { xs: '0.95rem', md: '1.05rem' }, lineHeight: 1.8, mb: 2 }}>
              {seoBlock.text1}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2, mb: 3 }}>
              <Chip label={`${lang === 'ua' ? '🔑' : '🔑'} ${lang === 'ua' ? 'Без комісії' : 'Без комиссии'}`} color="success" />
              <Chip label={`${lang === 'ua' ? '📋' : '📋'} ${lang === 'ua' ? 'Від власників' : 'От собственников'}`} color="primary" />
              <Chip label={`${lang === 'ua' ? '⚡' : '⚡'} ${lang === 'ua' ? 'Швидке заселення' : 'Быстрое заселение'}`} color="warning" />
              <Chip label={`${lang === 'ua' ? '🏠' : '🏠'} ${totalCount} ${lang === 'ua' ? 'оголошень' : 'объявлений'}`} color="info" />
            </Box>
            
            <Typography variant="h3" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' }, fontWeight: 600, mb: 1.5, mt: 3 }}>
              {seoBlock.subtitle2}
            </Typography>
            
            <Typography variant="body1" sx={{ fontSize: { xs: '0.95rem', md: '1.05rem' }, lineHeight: 1.8, mb: 1 }}>
              {seoBlock.text2}
            </Typography>
            
            <Grid container spacing={1} sx={{ mb: 2 }}>
              {['Печерськ', 'Хрещатик', 'Оболонь', 'Позняки', 'Голосіївський', 'Дарниця'].map((district, idx) => (
                <Grid item xs={6} sm={4} md={3} key={idx}>
                  <Paper sx={{ p: 1, textAlign: 'center', bgcolor: '#ffffff', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                    <Typography variant="body2">📍 {district}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            
            <Typography variant="h3" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' }, fontWeight: 600, mb: 1.5, mt: 3 }}>
              {seoBlock.subtitle3}
            </Typography>
            
            <Typography variant="body1" sx={{ fontSize: { xs: '0.95rem', md: '1.05rem' }, lineHeight: 1.8, mb: 1 }}>
              {seoBlock.text3}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              {['Вокзальна', 'Хрещатик', 'Позняки', 'Либідська', 'Печерська', 'Оболонь'].map((station, idx) => (
                <Chip key={idx} label={`🚇 ${station}`} size="small" variant="outlined" />
              ))}
            </Box>
            
            <Typography variant="h3" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' }, fontWeight: 600, mb: 1.5, mt: 3 }}>
              {seoBlock.subtitle4}
            </Typography>
            
            <Box component="ul" sx={{ pl: 2, mb: 2 }}>
              {seoBlock.tips.map((item, idx) => (
                <Typography component="li" key={idx} variant="body2" sx={{ mb: 0.5 }}>
                  {item}
                </Typography>
              ))}
            </Box>
            
            {/* Кнопка призыва к действию */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button 
                variant="contained" 
                size="large"
                startIcon={<HomeIcon />}
                onClick={() => document.getElementById('apartments-list')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 3,
                  boxShadow: 3,
                  '&:hover': { boxShadow: 6 }
                }}
              >
                {seoBlock.button}
              </Button>
            </Box>
          </Paper>
          
          {/* ============================================================ */}
          {/* ↑↑↑ КОНЕЦ SEO-БЛОКА ↑↑↑ */}
          {/* ============================================================ */}
          
          {/* Карта */}
          {apartments.length > 0 && (
            <Box sx={{ mb: 4 }}>
              {!isMobile && (
                <Box sx={{ 
                  height: '300px', 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  border: '1px solid #e0e0e0', 
                  mb: 2 
                }}>
                  <GoogleMapsProvider>
                    <MapComponent 
                      apartments={apartments} 
                      onApartmentSelect={handleApartmentSelect} 
                      userLocation={userLocation} 
                      compactMode={false} 
                    />
                  </GoogleMapsProvider>
                </Box>
              )}
              
              {!isMobile && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button 
                    variant="contained" 
                    startIcon={<MapIcon />} 
                    onClick={() => setMapOpen(true)}
                    sx={{ 
                      minWidth: 200,
                      py: 1.5,
                      borderRadius: 2,
                      boxShadow: 2,
                      '&:hover': { boxShadow: 4 }
                    }}
                  >
                    {lang === 'ua' ? 'Показати на карті' : 'Показать на карте'}
                  </Button>
                </Box>
              )}
            </Box>
          )}
          
          {/* Список квартир */}
          <Typography 
            id="apartments-list"
            variant="h2" 
            sx={{ fontSize: { xs: '1.35rem', sm: '1.6rem', md: '1.85rem' }, fontWeight: 600, mb: 3 }}
          >
            🏠 {typeName} {lang === 'ua' ? 'в Києві' : 'в Киеве'} ({totalCount})
          </Typography>
          
          {displayedApartments.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Warning sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6">{lang === 'ua' ? 'Наразі немає активних оголошень' : 'Сейчас нет активных объявлений'}</Typography>
              <Button variant="contained" onClick={handleBackToKiev} sx={{ mt: 2 }}>
                {lang === 'ua' ? 'Повернутися до всіх квартир' : 'Вернуться ко всем квартирам'}
              </Button>
            </Box>
          ) : (
            <>
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }} sx={{ mb: 4 }}>
                {displayedApartments.map(apt => (
                  <Grid item xs={12} sm={6} md={4} key={apt._id}>
                    <ApartmentCard apartment={apt} />
                  </Grid>
                ))}
              </Grid>
              {pageCount > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                  <Pagination 
                    count={pageCount} 
                    page={page} 
                    onChange={(e, v) => { setPage(v); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                    color="primary" 
                    size={isMobile ? "small" : "medium"} 
                  />
                </Box>
              )}
            </>
          )}
          
          {/* Советы */}
          <Paper sx={{ p: { xs: 2, md: 4 }, mb: 4, bgcolor: '#e8f5e9', borderRadius: 3 }}>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.25rem', sm: '1.4rem' }, fontWeight: 600, mb: 2 }}>
              {lang === 'ua' ? '💡 Поради щодо оренди' : '💡 Советы по аренде'}
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              {typeData.tips[lang].map((tip, idx) => (
                <Typography component="li" key={idx} variant="body2" sx={{ mb: 1 }}>
                  {tip}
                </Typography>
              ))}
            </Box>
          </Paper>
          
          {/* Ценовые категории */}
          <Paper sx={{ p: { xs: 2, md: 4 }, mb: 4, bgcolor: '#f5f5f5', borderRadius: 3 }}>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.25rem', sm: '1.4rem' }, fontWeight: 600, mb: 3, textAlign: 'center' }}>
              {lang === 'ua' ? '💰 Цінові категорії' : '💰 Ценовые категории'}
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd', borderRadius: 2 }}>
                  <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                    {lang === 'ua' ? 'Всього оголошень' : 'Всего объявлений'}
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' } }}>
                    {totalCount}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9', borderRadius: 2 }}>
                  <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                    {lang === 'ua' ? 'Мінімальна ціна' : 'Минимальная цена'}
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }, color: '#2e7d32' }}>
                    {priceStats.min} ₴
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#fff3e0', borderRadius: 2 }}>
                  <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                    {lang === 'ua' ? 'Середня ціна' : 'Средняя цена'}
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }, color: '#e65100' }}>
                    {priceStats.avg} ₴
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#ffebee', borderRadius: 2 }}>
                  <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                    {lang === 'ua' ? 'Максимальна ціна' : 'Максимальная цена'}
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }, color: '#c62828' }}>
                    {priceStats.max} ₴
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle2" sx={{ textAlign: 'center', mb: 2, color: 'text.secondary' }}>
              {lang === 'ua' ? 'Розподіл за ціновими категоріями' : 'Распределение по ценовым категориям'}
            </Typography>
            
            <Grid container spacing={2}>
              {(() => {
                const prices = apartments.map(apt => Number(apt.price)).filter(p => p > 0);
                
                if (prices.length === 0) {
                  return (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 3 }}>
                        {lang === 'ua' ? 'Немає даних про ціни' : 'Нет данных о ценах'}
                      </Typography>
                    </Grid>
                  );
                }
                
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                const range = maxPrice - minPrice;
                
                const economyMax = minPrice + range * 0.33;
                const standardMax = minPrice + range * 0.66;
                
                const economyPrices = prices.filter(p => p <= economyMax);
                const standardPrices = prices.filter(p => p > economyMax && p <= standardMax);
                const premiumPrices = prices.filter(p => p > standardMax);
                
                const economyCount = economyPrices.length;
                const standardCount = standardPrices.length;
                const premiumCount = premiumPrices.length;
                
                const economyAvg = economyPrices.reduce((a, b) => a + b, 0) / (economyCount || 1);
                const standardAvg = standardPrices.reduce((a, b) => a + b, 0) / (standardCount || 1);
                const premiumAvg = premiumPrices.reduce((a, b) => a + b, 0) / (premiumCount || 1);
                
                const categories = [
                  { 
                    key: 'economy',
                    label: lang === 'ua' ? 'Економ' : 'Эконом',
                    color: '#e8f5e9',
                    borderColor: '#4caf50',
                    avg: Math.round(economyAvg),
                    count: economyCount,
                    range: `${Math.round(minPrice)}-${Math.round(economyMax)} ₴`,
                    percent: Math.round((economyCount / prices.length) * 100)
                  },
                  { 
                    key: 'standard',
                    label: lang === 'ua' ? 'Стандарт' : 'Стандарт',
                    color: '#e3f2fd',
                    borderColor: '#1976d2',
                    avg: Math.round(standardAvg),
                    count: standardCount,
                    range: `${Math.round(economyMax + 1)}-${Math.round(standardMax)} ₴`,
                    percent: Math.round((standardCount / prices.length) * 100)
                  },
                  { 
                    key: 'premium',
                    label: lang === 'ua' ? 'Преміум' : 'Премиум',
                    color: '#fff3e0',
                    borderColor: '#ed6c02',
                    avg: Math.round(premiumAvg),
                    count: premiumCount,
                    range: `${Math.round(standardMax + 1)}+ ₴`,
                    percent: Math.round((premiumCount / prices.length) * 100)
                  }
                ];
                
                return categories.map((cat) => (
                  <Grid item xs={12} sm={4} key={cat.key}>
                    <Paper sx={{ 
                      p: { xs: 2, sm: 2.5 }, 
                      textAlign: 'center', 
                      bgcolor: cat.color,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      borderRadius: 2,
                      border: `2px solid ${cat.borderColor}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      }
                    }}>
                      <Typography variant="subtitle1" fontWeight={700} sx={{ color: cat.borderColor }}>
                        {cat.label}
                      </Typography>
                      
                      <Typography variant="h4" fontWeight={700} sx={{ my: 1, fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}>
                        {cat.avg > 0 ? `${cat.avg} ₴` : '—'}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                        {cat.range}
                      </Typography>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mt: 1.5,
                        pt: 1.5,
                        borderTop: '1px solid #e0e0e0'
                      }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {cat.count} {lang === 'ua' ? 'огол.' : 'объявл.'}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          color: cat.borderColor,
                          fontWeight: 600,
                          bgcolor: 'white',
                          px: 1,
                          py: 0.3,
                          borderRadius: 1
                        }}>
                          {cat.percent}%
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ));
              })()}
            </Grid>
          </Paper>
          
          {/* Навигация по типам */}
          <Paper sx={{ p: { xs: 2, md: 3 }, mb: 4, bgcolor: '#fafafa', borderRadius: 3 }}>
            <Typography variant="h3" sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 600, mb: 2 }}>
              {lang === 'ua' ? '🏠 Інші типи житла' : '🏠 Другие типы жилья'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {Object.entries(TYPE_CONFIG).map(([slug, data]) => {
                const isActive = slug === typeSlug;
                const name = lang === 'ua' ? data.nameUa : data.nameRu;
                const IconComp = data.icon || HomeIcon;
                
                return (
                  <Button
                    key={slug}
                    variant={isActive ? "contained" : "outlined"}
                    size="small"
                    startIcon={<IconComp />}
                    onClick={() => router.push(`/kyiv-apartments/type/${slug}`)}
                    sx={{ 
                      minWidth: 'auto',
                      ...(isActive && { bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } })
                    }}
                  >
                    {name}
                  </Button>
                );
              })}
            </Box>
          </Paper>
          
          {/* FAQ */}
          <Typography variant="h2" sx={{ fontSize: { xs: '1.35rem', sm: '1.6rem', md: '1.85rem' }, fontWeight: 600, mb: 3 }}>
            ❓ {lang === 'ua' ? 'Часті питання' : 'Частые вопросы'}
          </Typography>
          
          {typeData.seoContent?.[lang]?.faq && (
            <Box sx={{ mb: 4 }}>
              {typeData.seoContent[lang].faq.map((item, idx) => {
                let answerText = item.a;
                if (idx === 0 && (item.q.includes('коштує') || item.q.includes('стоит') || item.q.includes('Скільки') || item.q.includes('Сколько'))) {
                  const priceText = lang === 'ua' 
                    ? `Ціни варіюються від ${priceStats.min} до ${priceStats.max}+ грн/доба. Середня ціна — ${priceStats.avg} грн/доба.`
                    : `Цены варьируются от ${priceStats.min} до ${priceStats.max}+ грн/сутки. Средняя цена — ${priceStats.avg} грн/сутки.`;
                  answerText = priceText;
                }
                return (
                  <Accordion key={idx} defaultExpanded={idx === 0}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1" fontWeight={600}>{item.q}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1">{answerText}</Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          )}
        </Container>
        
        {/* Модалки */}
        <Dialog open={openAuthModal} onClose={() => setOpenAuthModal(false)} fullWidth maxWidth="xs">
          <DialogContent>
            <CreateUser onClose={() => setOpenAuthModal(false)} />
          </DialogContent>
        </Dialog>
        
        <Snackbar open={showAlert} autoHideDuration={6000} onClose={() => setShowAlert(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="info">{lang === 'ua' ? 'Для розміщення оголошення необхідно авторизуватися' : 'Для размещения объявления необходимо авторизоваться'}</Alert>
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
                {lang === 'ua' ? 'Квартири на карті' : 'Квартиры на карте'} ({apartments.length})
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
                  apartments={selectedApartment ? [selectedApartment] : apartments}
                  centerMode={!!selectedApartment}
                  onApartmentSelect={(apt) => router.push(`/apartment/${apt._id}`)}
                  userLocation={userLocation}
                  compactMode={false}
                />
              </GoogleMapsProvider>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}

// Серверный рендеринг
export async function getServerSideProps({ params }) {
  const { type } = params;
  
  console.log('========== getServerSideProps TYPE ==========');
  console.log('Тип из URL:', type);
  
  if (!TYPE_CONFIG[type]) {
    return { notFound: true };
  }
  
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
    
    return { 
      props: { 
        allApartments: allApartments,
        typeSlug: type
      } 
    };
  } catch (error) {
    console.error('Ошибка при получении данных типа:', error);
    return { 
      props: { 
        allApartments: [], 
        typeSlug: type
      } 
    };
  }
}

export default function TypePage(props) {
  return (
    <Provider store={store}>
      <FavoritesProvider>
        <Header />
        <TypeContent {...props} />
        <Footer />
      </FavoritesProvider>
    </Provider>
  );
}