

// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Grid,
//   CircularProgress,
//   Button,
// } from '@mui/material';
// import ApartmentCard from './ApartmentCard';
// import { useLanguage } from '@/app/LanguageContext';
// import { useFavorites } from '@/app/hooks/useFavorites';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// const SIMILAR_TRANSLATIONS = {
//   ua: {
//     title: 'Схожі оголошення',
//     loading: 'Завантаження...',
//     showMore: 'Показати ще',
//     noSimilar: 'Немає схожих оголошень',
//     error: 'Помилка завантаження',
//   },
//   ru: {
//     title: 'Похожие объявления',
//     loading: 'Загрузка...',
//     showMore: 'Показать еще',
//     noSimilar: 'Нет похожих объявлений',
//     error: 'Ошибка загрузки',
//   }
// };

// const SimilarApartments = ({ currentApartmentId, city, category, price }) => {
//   const { currentLanguage } = useLanguage();
//   const t = SIMILAR_TRANSLATIONS[currentLanguage];
//   const router = useRouter();
  
//   const { isFavorite, toggleFavorite } = useFavorites();
  
//   const [apartments, setApartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [visibleCount, setVisibleCount] = useState(3);

//   useEffect(() => {
//     const fetchSimilarApartments = async () => {
//       if (!city) return;
      
//       try {
//         setLoading(true);
//         const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        
//         // Очищаємо місто від зайвої інформації (область, район)
//         const cleanCity = city.split(',')[0].trim();
        
//         const response = await axios.get(
//           `${baseUrl}/api/v1/apartments/get-all?city=${encodeURIComponent(cleanCity)}`
//         );
        
//         if (response.data && Array.isArray(response.data)) {
//           // Фільтруємо: виключаємо поточне оголошення
//           let filtered = response.data.filter(apt => apt._id !== currentApartmentId);
          
//           // Сортуємо: спочатку тієї ж категорії, потім за ціною
//           filtered.sort((a, b) => {
//             // Якщо категорія збігається з поточною - вище
//             if (a.category === category && b.category !== category) return -1;
//             if (a.category !== category && b.category === category) return 1;
            
//             // Якщо категорія однакова, сортуємо за близькістю ціни
//             const priceA = Math.abs(Number(a.price) - Number(price));
//             const priceB = Math.abs(Number(b.price) - Number(price));
//             return priceA - priceB;
//           });
          
//           // Обмежуємо до 6 оголошень
//           setApartments(filtered.slice(0, 6));
//         }
//       } catch (error) {
//         console.error('Помилка завантаження схожих оголошень:', error);
//         setError(t.error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSimilarApartments();
//   }, [currentApartmentId, city, category, price, t.error]);

//   const handleShowMore = () => {
//     setVisibleCount(prev => Math.min(prev + 3, apartments.length));
//   };

//   const handleToggleFavorite = async (apartmentId) => {
//     try {
//       await toggleFavorite(apartmentId);
//     } catch (error) {
//       console.error('Помилка додавання в обране:', error);
//     }
//   };

//   const handleCardClick = (apartmentId) => {
//     console.log('🖱️ Клік на схоже оголошення, ID:', apartmentId);
//     // Використовуємо window.location.href для повного перезавантаження
//     window.location.href = `/apartment/${apartmentId}`;
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error || apartments.length === 0) {
//     return null;
//   }

//   return (
//     <Box sx={{ mt: 6, mb: 4 }}>
//       <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
//         {t.title}
//       </Typography>
      
//       <Grid 
//         container 
//         spacing={3} 
//         key={`similar-grid-${currentApartmentId}-${apartments.length}`}
//       >
//         {apartments.slice(0, visibleCount).map((apartment) => (
//           <Grid item xs={12} sm={6} md={4} key={apartment._id}>
//             <div onClick={() => handleCardClick(apartment._id)}>
//               <ApartmentCard
//                 apartment={apartment}
//                 isFavorite={isFavorite(apartment._id)}
//                 toggleFavorite={() => handleToggleFavorite(apartment._id)}
//                 showCreateUserDialog={() => {}}
//               />
//             </div>
//           </Grid>
//         ))}
//       </Grid>
      
//       {visibleCount < apartments.length && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
//           <Button 
//             variant="outlined" 
//             onClick={handleShowMore}
//             size="large"
//           >
//             {t.showMore}
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default SimilarApartments;






'use client';

import React, { useState, useEffect, useCallback, memo } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Button,
} from '@mui/material';
import ApartmentCard from './ApartmentCard';
import { useLanguage } from '@/app/LanguageContext';
import { useFavorites } from '@/app/hooks/useFavorites';
import axios from 'axios';

// Константи для перекладів
const SIMILAR_TRANSLATIONS = {
  ua: {
    title: 'Схожі оголошення',
    loading: 'Завантаження...',
    showMore: 'Показати ще',
    noSimilar: 'Немає схожих оголошень',
    error: 'Помилка завантаження',
  },
  ru: {
    title: 'Похожие объявления',
    loading: 'Загрузка...',
    showMore: 'Показать еще',
    noSimilar: 'Нет похожих объявлений',
    error: 'Ошибка загрузки',
  }
};

const SimilarApartments = memo(({ currentApartmentId, city, category, price }) => {
  const { currentLanguage } = useLanguage();
  const t = SIMILAR_TRANSLATIONS[currentLanguage] || SIMILAR_TRANSLATIONS.ua;
  
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

  // Завантаження схожих оголошень
  useEffect(() => {
    const fetchSimilarApartments = async () => {
      if (!city) return;
      
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        
        // Очищаємо місто від зайвої інформації (область, район)
        const cleanCity = city.split(',')[0].trim();
        
        const response = await axios.get(
          `${baseUrl}/api/v1/apartments/get-all?city=${encodeURIComponent(cleanCity)}`
        );
        
        if (response.data && Array.isArray(response.data)) {
          // Фільтруємо: виключаємо поточне оголошення
          let filtered = response.data.filter(apt => apt._id !== currentApartmentId);
          
          // Сортуємо: спочатку тієї ж категорії, потім за ціною
          filtered.sort((a, b) => {
            // Якщо категорія збігається з поточною - вище
            if (a.category === category && b.category !== category) return -1;
            if (a.category !== category && b.category === category) return 1;
            
            // Якщо категорія однакова, сортуємо за близькістю ціни
            const priceA = Math.abs(Number(a.price) - Number(price));
            const priceB = Math.abs(Number(b.price) - Number(price));
            return priceA - priceB;
          });
          
          // Обмежуємо до 6 оголошень
          setApartments(filtered.slice(0, 6));
        }
      } catch (error) {
        console.error('Помилка завантаження схожих оголошень:', error);
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarApartments();
  }, [currentApartmentId, city, category, price, t.error]);

  // Обробники подій з useCallback
  const handleShowMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + 3, apartments.length));
  }, [apartments.length]);

  const handleToggleFavorite = useCallback(async (apartmentId) => {
    try {
      await toggleFavorite(apartmentId);
    } catch (error) {
      console.error('Помилка додавання в обране:', error);
    }
  }, [toggleFavorite]);

  const handleCardClick = useCallback((apartmentId) => {
    console.log('🖱️ Клік на схоже оголошення, ID:', apartmentId);
    // Використовуємо window.location.href для повного перезавантаження
    window.location.href = `/apartment/${apartmentId}`;
  }, []);

  // Якщо завантаження
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Якщо помилка або немає оголошень
  if (error || apartments.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 6, mb: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        {t.title}
      </Typography>
      
      <Grid 
        container 
        spacing={3} 
        key={`similar-grid-${currentApartmentId}-${apartments.length}`}
      >
        {apartments.slice(0, visibleCount).map((apartment) => (
          <Grid item xs={12} sm={6} md={4} key={apartment._id}>
            <div onClick={() => handleCardClick(apartment._id)} style={{ cursor: 'pointer' }}>
              <ApartmentCard
                apartment={apartment}
                isFavorite={isFavorite(apartment._id)}
                toggleFavorite={() => handleToggleFavorite(apartment._id)}
                showCreateUserDialog={() => {}}
              />
            </div>
          </Grid>
        ))}
      </Grid>
      
      {visibleCount < apartments.length && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button 
            variant="outlined" 
            onClick={handleShowMore}
            size="large"
          >
            {t.showMore}
          </Button>
        </Box>
      )}
    </Box>
  );
});

SimilarApartments.displayName = 'SimilarApartments';

export default SimilarApartments;