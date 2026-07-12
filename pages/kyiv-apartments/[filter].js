// pages/kyiv-apartments/[filter].js
'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Chip,
  Grid,
  Button,
  Paper,
  Breadcrumbs,
  Pagination,
  useMediaQuery,
  useTheme,
  Skeleton,
  Fab,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Warning from '@mui/icons-material/Warning';
import MapIcon from '@mui/icons-material/Map';
import Close from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

// Імпортуємо компоненти
import { LanguageProvider, useLanguage } from "@/app/LanguageContext";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ApartmentCard from '@/app/components/ApartmentCard';
import { FavoritesProvider } from '@/app/hooks/FavoritesContext';
import { store } from "@/app/store";
import { Provider } from "react-redux";

// Динамічний імпорт карти
const MapComponent = dynamic(() => import('@/app/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Skeleton variant="rectangular" width="100%" height="100%" />
    </Box>
  )
});

// Переводы для страницы фильтра
const TRANSLATIONS = {
  ua: {
    metaTitlePrefix: "у Києві: ціни, фото, відгуки | NaDoby",
    metaDescriptionPrefix: "✅ у Києві ✔️ Понад 1000 оголошень від власників ✔️ Без комісії ✔️ Райони та метро",
    breadcrumbHome: "Головна",
    breadcrumbKiev: "Квартири в Києві",
    apartmentsFound: "Знайдено квартир",
    noApartments: "Наразі немає активних оголошень",
    back: "Назад до всіх квартир",
    viewOnMap: "Показати на карті",
    apartmentsOnMap: "Квартири на карті",
    addApartment: "Додати оголошення",
    filterNames: {
      '1-komnata': '1-кімнатні квартири',
      '2-komnaty': '2-кімнатні квартири',
      '3-komnaty': '3-кімнатні квартири',
      '4-plus': '4+ кімнатні квартири',
      'posutochno': 'Квартири подобово',
      'centr': 'Квартири в центрі',
      'levyy-bereg': 'Квартири на Лівому березі',
      'pravyy-bereg': 'Квартири на Правому березі',
    },
    filterDescriptions: {
      '1-komnata': 'Однокімнатні квартири подобово в Києві',
      '2-komnaty': 'Двокімнатні квартири подобово в Києві',
      '3-komnaty': 'Трикімнатні квартири подобово в Києві',
      '4-plus': 'Чотирикімнатні та більше квартири подобово в Києві',
      'posutochno': 'Подобова оренда квартир у Києві',
      'centr': 'Квартири в центрі Києва подобово',
      'levyy-bereg': 'Квартири на Лівому березі Києва',
      'pravyy-bereg': 'Квартири на Правому березі Києва',
    }
  },
  ru: {
    metaTitlePrefix: "в Киеве: цены, фото, отзывы | NaDoby",
    metaDescriptionPrefix: "✅ в Киеве ✔️ Более 1000 объявлений от собственников ✔️ Без комиссии ✔️ Районы и метро",
    breadcrumbHome: "Главная",
    breadcrumbKiev: "Квартиры в Киеве",
    apartmentsFound: "Найдено квартир",
    noApartments: "Сейчас нет активных объявлений",
    back: "Назад ко всем квартирам",
    viewOnMap: "Показать на карте",
    apartmentsOnMap: "Квартиры на карте",
    addApartment: "Добавить объявление",
    filterNames: {
      '1-komnata': '1-комнатные квартиры',
      '2-komnaty': '2-комнатные квартиры',
      '3-komnaty': '3-комнатные квартиры',
      '4-plus': '4+ комнатные квартиры',
      'posutochno': 'Квартиры посуточно',
      'centr': 'Квартиры в центре',
      'levyy-bereg': 'Квартиры на Левом берегу',
      'pravyy-bereg': 'Квартиры на Правом берегу',
    },
    filterDescriptions: {
      '1-komnata': 'Однокомнатные квартиры посуточно в Киеве',
      '2-komnaty': 'Двухкомнатные квартиры посуточно в Киеве',
      '3-komnaty': 'Трехкомнатные квартиры посуточно в Киеве',
      '4-plus': 'Четырехкомнатные и более квартиры посуточно в Киеве',
      'posutochno': 'Посуточная аренда квартир в Киеве',
      'centr': 'Квартиры в центре Киева посуточно',
      'levyy-bereg': 'Квартиры на Левом берегу Киева',
      'pravyy-bereg': 'Квартиры на Правом берегу Киева',
    }
  }
};

function KyivFilterContent({ apartments = [], filter = '', totalCount = 0 }) {
  const { currentLanguage } = useLanguage();
  const t = TRANSLATIONS[currentLanguage];
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [page, setPage] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  
  const itemsPerPage = isMobile ? 6 : 12;
  const pageCount = Math.ceil(apartments.length / itemsPerPage);
  const displayedApartments = apartments.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    setIsClient(true);
  }, []);
  
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

  const filterName = t.filterNames[filter] || filter;
  const filterDescription = t.filterDescriptions[filter] || filterName;

  // Структурированные данные для Schema.org
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${filterName} в Киеве`,
    "description": filterDescription,
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "UAH",
      "lowPrice": apartments.length ? Math.min(...apartments.map(a => Number(a.price) || 999)) : 300,
      "highPrice": apartments.length ? Math.max(...apartments.map(a => Number(a.price) || 9999)) : 5000,
      "offerCount": totalCount
    }
  };

  const handleBackToKiev = () => router.push('/kyiv-apartments');
  const handleApartmentSelect = (apartment) => router.push(`/apartment/${apartment._id}`);
  const handleAddApartment = () => window.location.href = 'https://nadoby.com.ua/add-apartment';

  if (!filter) return null;

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
        <title>{`${filterName} ${t.metaTitlePrefix}`}</title>
        <meta name="description" content={`${filterDescription} ${t.metaDescriptionPrefix}`} />
        <link rel="canonical" href={`https://nadoby.com.ua/kyiv-apartments/${filter}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://nadoby.com.ua/kyiv-apartments/${filter}`} />
        <meta property="og:title" content={`${filterName} в Киеве`} />
        <meta property="og:description" content={filterDescription} />
        <meta property="og:locale" content={currentLanguage === 'ua' ? 'uk_UA' : 'ru_RU'} />
        <link rel="alternate" href={`https://nadoby.com.ua/kyiv-apartments/${filter}`} hreflang="ru" />
        <link rel="alternate" href={`https://nadoby.com.ua/ua/kyiv-apartments/${filter}`} hreflang="uk" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <Box component="main" sx={{ minHeight: '100vh', backgroundColor: '#fafafa', position: 'relative' }}>
        {/* Кнопка для добавления объявления */}
        <Zoom in={true}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleAddApartment}
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

        {/* Кнопка карты на мобильных */}
        {isMobile && apartments.length > 0 && (
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
          
          {/* Кнопка назад */}
          <Button 
            startIcon={<ArrowBack />} 
            onClick={handleBackToKiev} 
            sx={{ mb: 3 }}
          >
            {t.back}
          </Button>

          {/* Хлебные крошки */}
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: { xs: 2, md: 3 } }}>
            <Link href="/" passHref legacyBehavior>
              <a style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography color="inherit" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                  {t.breadcrumbHome}
                </Typography>
              </a>
            </Link>
            <Link href="/kyiv-apartments" passHref legacyBehavior>
              <a style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography color="inherit" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                  {t.breadcrumbKiev}
                </Typography>
              </a>
            </Link>
            <Typography color="text.primary">{filterName}</Typography>
          </Breadcrumbs>

          {/* H1 */}
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '1.75rem', sm: '2.25rem' },
              fontWeight: 700,
              mb: 2
            }}
          >
            {filterName} в Киеве
          </Typography>

          {/* Статистика */}
          <Chip 
            label={`${totalCount} ${t.apartmentsFound}`}
            sx={{ 
              mb: 3,
              height: 36,
              backgroundColor: '#e3f2fd'
            }}
          />

          {/* Карта на десктопе */}
          {!isMobile && apartments.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Box sx={{ height: '200px', borderRadius: 2, overflow: 'hidden', border: '1px solid #e0e0e0', mb: 2 }}>
                <MapComponent 
                  apartments={apartments} 
                  onApartmentSelect={handleApartmentSelect} 
                  userLocation={userLocation} 
                  compactMode={true} 
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" startIcon={<MapIcon />} onClick={() => setMapOpen(true)}>
                  {t.viewOnMap}
                </Button>
              </Box>
            </Box>
          )}

          {/* Список квартир */}
          {displayedApartments.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Warning sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                {t.noApartments}
              </Typography>
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

              {/* Пагинация */}
              {pageCount > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                  <Pagination 
                    count={pageCount} 
                    page={page} 
                    onChange={(e, value) => {
                      setPage(value);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    color="primary"
                    size={isMobile ? "small" : "medium"}
                  />
                </Box>
              )}
            </>
          )}
        </Container>

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
                {t.apartmentsOnMap} ({apartments.length})
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
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            <Box sx={{ height: '100%', minHeight: 500 }}>
              <MapComponent
                apartments={selectedApartment ? [selectedApartment] : apartments}
                centerMode={!!selectedApartment}
                onApartmentSelect={handleApartmentSelect}
                userLocation={userLocation}
                compactMode={false}
              />
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}

// Серверный рендеринг
export async function getServerSideProps({ params }) {
  const { filter } = params;
  
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
    
    // Фильтруем только Киев
    const kievApartments = allApartments.filter(apt => {
      if (!apt) return false;
      const cityFields = [
        apt.city,
        apt.originalCity,
        apt.region,
        apt.address
      ].filter(Boolean).map(field => field.toLowerCase());
      
      const kyivVariants = ['київ', 'kiev', 'kyiv', 'киев'];
      return cityFields.some(field => 
        kyivVariants.some(variant => field.includes(variant))
      );
    });

    // Применяем фильтр из URL
    let filteredApartments = [...kievApartments];
    
    if (filter === '1-komnata') {
      filteredApartments = filteredApartments.filter(apt => apt.rooms?.toString() === '1');
    } else if (filter === '2-komnaty') {
      filteredApartments = filteredApartments.filter(apt => apt.rooms?.toString() === '2');
    } else if (filter === '3-komnaty') {
      filteredApartments = filteredApartments.filter(apt => apt.rooms?.toString() === '3');
    } else if (filter === '4-plus') {
      filteredApartments = filteredApartments.filter(apt => parseInt(apt.rooms) >= 4);
    }

    return {
      props: {
        apartments: filteredApartments,
        filter,
        totalCount: filteredApartments.length
      }
    };
  } catch (error) {
    console.error('Error fetching filter data:', error);
    return {
      props: {
        apartments: [],
        filter,
        totalCount: 0
      }
    };
  }
}

export default function KyivFilterPage(props) {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <FavoritesProvider>
          <Header />
          <KyivFilterContent {...props} />
          <Footer />
        </FavoritesProvider>
      </LanguageProvider>
    </Provider>
  );
}