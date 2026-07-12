




// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Divider, Button, Skeleton, Alert, Snackbar, CircularProgress } from '@mui/material';
// import axios from 'axios';
// import { useLanguage } from '@/app/LanguageContext';

// const STATS_TRANSLATIONS = {
//   ua: {
//     title: '📊 Статистика оголошення',
//     views: '👁 Перегляди',
//     today: 'сьогодні',
//     week: 'тиждень',
//     month: 'місяць',
//     total: 'всього',
//     favorites: '❤️ В обраному',
//     phoneClicks: '📞 Кліки по телефону',
//     boostButton: '🚀 Підняти оголошення',
//     collectingData: 'Дані збираються...',
//     boostSuccess: 'Оголошення піднято!',
//     boostError: 'Помилка при піднятті',
//     noData: 'Статистика з’явиться після перших переглядів'
//   },
//   ru: {
//     title: '📊 Статистика объявления',
//     views: '👁 Просмотры',
//     today: 'сегодня',
//     week: 'неделя',
//     month: 'месяц',
//     total: 'всего',
//     favorites: '❤️ В избранном',
//     phoneClicks: '📞 Клики по телефону',
//     boostButton: '🚀 Поднять объявление',
//     collectingData: 'Данные собираются...',
//     boostSuccess: 'Объявление поднято!',
//     boostError: 'Ошибка при поднятии',
//     noData: 'Статистика появится после первых просмотров'
//   }
// };

// const ApartmentStats = ({ apartmentId, userId }) => {
//   const { currentLanguage } = useLanguage();
//   const t = STATS_TRANSLATIONS[currentLanguage] || STATS_TRANSLATIONS.ru;
  
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [boosting, setBoosting] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

//   useEffect(() => {
//     if (apartmentId && userId) {
//       fetchStats();
//     } else {
//       setLoading(false);
//     }
//   }, [apartmentId, userId]);

//   const fetchStats = async () => {
//     setLoading(true);
    
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/v1/stats/user/${userId}/all`
//       );
//       const allStats = response.data.data;
//       const apartmentStats = allStats[apartmentId];
      
//       if (apartmentStats) {
//         setStats({
//           views: {
//             today: apartmentStats.views?.today || 0,
//             week: apartmentStats.views?.week || 0,
//             month: apartmentStats.views?.month || 0,
//             total: apartmentStats.views?.total || 0
//           },
//           favorites: apartmentStats.favorites || 0,
//           phoneClicks: apartmentStats.phoneClicks || 0
//         });
//       } else {
//         setStats({
//           views: { today: 0, week: 0, month: 0, total: 0 },
//           favorites: 0,
//           phoneClicks: 0
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//       setStats({
//         views: { today: 0, week: 0, month: 0, total: 0 },
//         favorites: 0,
//         phoneClicks: 0
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBoost = async () => {
//     setBoosting(true);
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/${apartmentId}/boost`
//       );
      
//       if (response.data.success) {
//         setSnackbar({ 
//           open: true, 
//           message: t.boostSuccess, 
//           severity: 'success' 
//         });
//         setTimeout(() => {
//           fetchStats();
//         }, 1000);
//       } else {
//         setSnackbar({ 
//           open: true, 
//           message: response.data.message || t.boostError, 
//           severity: 'error' 
//         });
//       }
//     } catch (error) {
//       console.error('Boost error:', error);
//       setSnackbar({ 
//         open: true, 
//         message: error.response?.data?.message || t.boostError, 
//         severity: 'error' 
//       });
//     } finally {
//       setBoosting(false);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   if (loading) {
//     return (
//       <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 2 }}>
//         <Skeleton variant="text" width="100%" height={24} />
//         <Skeleton variant="text" width="80%" height={20} sx={{ mt: 1 }} />
//         <Skeleton variant="rectangular" width="100%" height={36} sx={{ mt: 1, borderRadius: 1 }} />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 2 }}>
//       <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, fontSize: '0.8rem' }}>
//         {t.title}
//       </Typography>
      
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
//         <Typography variant="caption" color="text.secondary">🟢 Статус:</Typography>
//         <Typography variant="caption" fontWeight={500} sx={{ color: 'green' }}>Активно</Typography>
//       </Box>

//       <Box sx={{ mb: 0.5 }}>
//         <Typography variant="caption" color="text.secondary">{t.views}:</Typography>
//         <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
//           <Typography variant="caption" fontWeight={500}>
//             {t.today}: {stats?.views?.today || 0}
//           </Typography>
//           <Typography variant="caption" color="text.secondary">|</Typography>
//           <Typography variant="caption" fontWeight={500}>
//             {t.week}: {stats?.views?.week || 0}
//           </Typography>
//           <Typography variant="caption" color="text.secondary">|</Typography>
//           <Typography variant="caption" fontWeight={500}>
//             {t.month}: {stats?.views?.month || 0}
//           </Typography>
//           <Typography variant="caption" color="text.secondary">|</Typography>
//           <Typography variant="caption" fontWeight={500}>
//             {t.total}: {stats?.views?.total || 0}
//           </Typography>
//         </Box>
//       </Box>

//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
//         <Typography variant="caption" color="text.secondary">{t.favorites}:</Typography>
//         <Typography variant="caption" fontWeight={500}>{stats?.favorites || 0}</Typography>
//       </Box>

//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//         <Typography variant="caption" color="text.secondary">{t.phoneClicks}:</Typography>
//         <Typography variant="caption" fontWeight={500}>{stats?.phoneClicks || 0}</Typography>
//       </Box>

//       <Divider sx={{ my: 1 }} />
      
//       <Button
//         variant="contained"
//         size="small"
//         fullWidth
//         onClick={handleBoost}
//         disabled={boosting}
//         sx={{
//           bgcolor: '#ff9800',
//           '&:hover': { bgcolor: '#f57c00' },
//           fontSize: '0.7rem',
//           py: 0.75,
//           fontWeight: 600
//         }}
//       >
//         {boosting ? <CircularProgress size={20} sx={{ color: 'white' }} /> : t.boostButton}
//       </Button>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default ApartmentStats;



'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Button, Skeleton, Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import { useLanguage } from '@/app/LanguageContext';

const STATS_TRANSLATIONS = {
  ua: {
    title: '📊 Статистика оголошення',
    views: '👁 Перегляди',
    today: 'сьогодні',
    week: 'тиждень',
    month: 'місяць',
    total: 'всього',
    favorites: '❤️ В обраному',
    phoneClicks: '📞 Кліки по телефону',
    boostButton: '🚀 Підняти оголошення',
    collectingData: 'Дані збираються...',
    boostSuccess: 'Оголошення піднято!',
    boostError: 'Помилка при піднятті',
    noData: 'Статистика з’явиться після перших переглядів',
    boostSoon: ' Функція  скоро з\'явиться!'  
  },
  ru: {
    title: '📊 Статистика объявления',
    views: '👁 Просмотры',
    today: 'сегодня',
    week: 'неделя',
    month: 'месяц',
    total: 'всего',
    favorites: '❤️ В избранном',
    phoneClicks: '📞 Клики по телефону',
    boostButton: '🚀 Поднять объявление',
    collectingData: 'Данные собираются...',
    boostSuccess: 'Объявление поднято!',
    boostError: 'Ошибка при поднятии',
    noData: 'Статистика появится после первых просмотров',
    boostSoon: ' Функция  скоро появится!' 
  }
};

const ApartmentStats = ({ apartmentId, userId }) => {
  const { currentLanguage } = useLanguage();
  const t = STATS_TRANSLATIONS[currentLanguage] || STATS_TRANSLATIONS.ru;
  
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    if (apartmentId && userId) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [apartmentId, userId]);

  const fetchStats = async () => {
    setLoading(true);
    
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/stats/user/${userId}/all`
      );
      const allStats = response.data.data;
      const apartmentStats = allStats[apartmentId];
      
      if (apartmentStats) {
        setStats({
          views: {
            today: apartmentStats.views?.today || 0,
            week: apartmentStats.views?.week || 0,
            month: apartmentStats.views?.month || 0,
            total: apartmentStats.views?.total || 0
          },
          favorites: apartmentStats.favorites || 0,
          phoneClicks: apartmentStats.phoneClicks || 0
        });
      } else {
        setStats({
          views: { today: 0, week: 0, month: 0, total: 0 },
          favorites: 0,
          phoneClicks: 0
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({
        views: { today: 0, week: 0, month: 0, total: 0 },
        favorites: 0,
        phoneClicks: 0
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Кнопка показывает сообщение и НЕ переносит на объявление
  const handleBoostClick = (e) => {
    e.preventDefault();     // Отменяем стандартное поведение
    e.stopPropagation();    // Останавливаем всплытие события
    
    setSnackbar({ 
      open: true, 
      message: t.boostSoon, 
      severity: 'info' 
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 2 }}>
        <Skeleton variant="text" width="100%" height={24} />
        <Skeleton variant="text" width="80%" height={20} sx={{ mt: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={36} sx={{ mt: 1, borderRadius: 1 }} />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, fontSize: '0.8rem' }}>
        {t.title}
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="caption" color="text.secondary">🟢 Статус:</Typography>
        <Typography variant="caption" fontWeight={500} sx={{ color: 'green' }}>Активно</Typography>
      </Box>

      <Box sx={{ mb: 0.5 }}>
        <Typography variant="caption" color="text.secondary">{t.views}:</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
          <Typography variant="caption" fontWeight={500}>
            {t.today}: {stats?.views?.today || 0}
          </Typography>
          <Typography variant="caption" color="text.secondary">|</Typography>
          <Typography variant="caption" fontWeight={500}>
            {t.week}: {stats?.views?.week || 0}
          </Typography>
          <Typography variant="caption" color="text.secondary">|</Typography>
          <Typography variant="caption" fontWeight={500}>
            {t.month}: {stats?.views?.month || 0}
          </Typography>
          <Typography variant="caption" color="text.secondary">|</Typography>
          <Typography variant="caption" fontWeight={500}>
            {t.total}: {stats?.views?.total || 0}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="caption" color="text.secondary">{t.favorites}:</Typography>
        <Typography variant="caption" fontWeight={500}>{stats?.favorites || 0}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="caption" color="text.secondary">{t.phoneClicks}:</Typography>
        <Typography variant="caption" fontWeight={500}>{stats?.phoneClicks || 0}</Typography>
      </Box>

      <Divider sx={{ my: 1 }} />
      
      {/* ✅ Кнопка БЕЗ кружка и БЕЗ переноса */}
      <Button
        variant="outlined"
        size="small"
        fullWidth
        onClick={handleBoostClick}
        sx={{
          borderColor: '#ff9800',
          color: '#ff9800',
          fontSize: '0.7rem',
          py: 0.75,
          fontWeight: 600,
          '&:hover': {
            borderColor: '#f57c00',
            bgcolor: 'rgba(255, 152, 0, 0.08)'
          }
        }}
      >
        {t.boostButton}
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={handleCloseSnackbar}
          icon={<span>🚀</span>}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ApartmentStats;