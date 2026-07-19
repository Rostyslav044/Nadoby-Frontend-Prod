



// 'use client';
// import { LanguageProvider, useLanguage } from "@/app/LanguageContext";
// import Header from "@/app/components/Header";
// import { store } from "@/app/store";
// import { Provider } from "react-redux";
// import Apartments from "@/app/components/Apartments";
// import CreateUser from "@/app/components/CreateUser";
// import { useEffect, useState } from "react";
// import { Box, Typography, CircularProgress, Button, Snackbar, Alert, Modal } from "@mui/material";
// import axios from 'axios';
// import Head from 'next/head';
// import Footer from "@/app/components/Footer";

// const TRANSLATIONS = {
//   ua: {
//     title: "Обране",
//     metaTitle: "Обрані оголошення про оренду | NaDoby",
//     metaDescription: "Ваш список обраних оголошень про оренду житла. Квартири, готелі, будинки, сауни та інші варіанти проживання.",
//     notAuthorized: "Будь ласка, увійдіть, щоб побачити обране",
//     noFavorites: "У вас поки немає обраних оголошень",
//     errorLoading: "Помилка при завантаженні обраного",
//     removeSuccess: "Видалено з обраного",
//     retry: "Увійти/Зареєструватися",
//     unauthorized: "Користувач не авторизований",
//     userNotAuthorized: "Користувач не авторизований",
//     count: "кількість"
//   },
//   ru: {
//     title: "Избранное",
//     metaTitle: "Избранные объявления об аренде | NaDoby", 
//     metaDescription: "Ваш список избранных объявлений об аренде жилья. Квартиры, гостиницы, дома, сауны и другие варианты проживания.",
//     notAuthorized: "Пожалуйста, войдите чтобы увидеть избранное",
//     noFavorites: "У вас пока нет избранных объявлений",
//     errorLoading: "Ошибка при загрузке избранного",
//     removeSuccess: "Удалено из избранного",
//     retry: "Войти/Зарегистрироваться",
//     unauthorized: "Пользователь не авторизован",
//     userNotAuthorized: "Пользователь не авторизован",
//     count: "количество"
//   }
// }

// function FavoritesContent() {
//   const { currentLanguage } = useLanguage();
//   const t = TRANSLATIONS[currentLanguage];
  
//   const [profile, setProfile] = useState(null);
//   const [favoriteApartments, setFavoriteApartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
//   const [authModalOpen, setAuthModalOpen] = useState(false);

//   useEffect(() => {
//     loadFavorites();
//   }, []);

//   const showSnackbar = (message, severity = 'info') => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const loadFavorites = async () => {
//     try {
//       setLoading(true);
//       const userProfile = localStorage.getItem('user_profile');
      
//       if (!userProfile) {
//         setError('unauthorized');
//         setLoading(false);
//         return;
//       }

//       const profileData = JSON.parse(userProfile);
//       setProfile(profileData);
      
//       const baseUrl = process.env.NODE_ENV === 'production' 
//         ? process.env.NEXT_PUBLIC_API_URL 
//         : '${process.env.NEXT_PUBLIC_API_URL}';
      
//       const response = await axios.get(
//         `${baseUrl}/api/v1/apartments/favorites/user`,
//         { 
//           headers: { 'user-id': profileData._id }
//         }
//       );
      
//       if (response.data.success) {
//         setFavoriteApartments(response.data.favorites || []);
//       } else {
//         setError('load_error');
//       }
//     } catch (error) {
//       console.error('Error loading favorites:', error);
//       setError('load_error');
//       showSnackbar(t.errorLoading, 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveFavorite = (apartmentId) => {
//     setFavoriteApartments(prev => prev.filter(apt => apt._id !== apartmentId));
//     showSnackbar(t.removeSuccess, 'success');
//   };

//   const handleRetry = () => {
//     setAuthModalOpen(true);
//   };

//   const handleCloseAuthModal = () => {
//     setAuthModalOpen(false);
//     loadFavorites();
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const getErrorText = () => {
//     if (error === 'unauthorized') {
//       return t.userNotAuthorized;
//     } else if (error === 'load_error') {
//       return t.errorLoading;
//     }
//     return error;
//   };

//   if (loading) {
//     return (
//       <>
//         {/* <Head>
//           <title>{t.metaTitle}</title>
//           <meta name="description" content={t.metaDescription} />
//           <meta name="viewport" content="width=device-width, initial-scale=1" />
//         </Head> */}
// <Head>
//   <title>{t.metaTitle}</title>
//   <meta name="description" content={t.metaDescription} />
//   <meta name="viewport" content="width=device-width, initial-scale=1" />
//   <link rel="canonical" href="https://nadoby.com.ua/favorites" />
// </Head>

//         <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//           <CircularProgress />
//         </Box>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         {/* <Head>
//           <title>{t.metaTitle}</title>
//           <meta name="description" content={t.metaDescription} />
//           <meta name="viewport" content="width=device-width, initial-scale=1" />
//         </Head> */}

// <Head>
//   <title>{t.metaTitle}</title>
//   <meta name="description" content={t.metaDescription} />
//   <meta name="viewport" content="width=device-width, initial-scale=1" />
//   <link rel="canonical" href="https://nadoby.com.ua/favorites" />
// </Head>
//         <Box sx={{ p: 3, textAlign: 'center' }}>
//           <Typography variant="h5" color="error" gutterBottom>
//             {getErrorText()}
//           </Typography>
//           <Button 
//             variant="contained" 
//             onClick={handleRetry}
//             sx={{ textTransform: 'none' }}
//           >
//             {t.retry}
//           </Button>
          
//           <Modal
//             open={authModalOpen}
//             onClose={handleCloseAuthModal}
//             aria-labelledby="auth-modal-title"
//             aria-describedby="auth-modal-description"
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             <Box sx={{
//               width: '90%',
//               maxWidth: 500,
//               bgcolor: 'background.paper',
//               borderRadius: 2,
//               boxShadow: 24,
//               p: 0,
//               maxHeight: '90vh',
//               overflow: 'auto'
//             }}>
//               <CreateUser onClose={handleCloseAuthModal} />
//             </Box>
//           </Modal>
//         </Box>
//       </>
//     );
//   }

//   return (
//     <>
//       {/* <Head>
//         <title>{t.metaTitle}</title>
//         <meta name="description" content={t.metaDescription} />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head> */}

// <Head>
//   <title>{t.metaTitle}</title>
//   <meta name="description" content={t.metaDescription} />
//   <meta name="viewport" content="width=device-width, initial-scale=1" />
//   <link rel="canonical" href="https://nadoby.com.ua/favorites" />
// </Head>

//       <Box sx={{ p: 3 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           {t.title} ({favoriteApartments.length})
//         </Typography>
        
//         {!profile ? (
//           <Box sx={{ textAlign: 'center' }}>
//             <Typography variant="body1" sx={{ mb: 2 }}>
//               {t.notAuthorized}
//             </Typography>
//             <Button 
//               variant="contained" 
//               onClick={handleRetry}
//               sx={{ textTransform: 'none' }}
//             >
//               {t.retry}
//             </Button>
//           </Box>
//         ) : favoriteApartments.length === 0 ? (
//           <Typography variant="body1">
//             {t.noFavorites}
//           </Typography>
//         ) : (
//           <Apartments 
//             apartments={favoriteApartments}
//             favoriteIds={favoriteApartments.map(apt => apt._id)}
//             onFavoriteRemoved={handleRemoveFavorite}
//             showActions={false}
//             isFavoritesPage={true}
//           />
//         )}

//         <Modal
//           open={authModalOpen}
//           onClose={handleCloseAuthModal}
//           aria-labelledby="auth-modal-title"
//           aria-describedby="auth-modal-description"
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           <Box sx={{
//             width: '90%',
//             maxWidth: 500,
//             bgcolor: 'background.paper',
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 0,
//             maxHeight: '90vh',
//             overflow: 'auto'
//           }}>
//             <CreateUser onClose={handleCloseAuthModal} />
//           </Box>
//         </Modal>

//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={2000}
//           onClose={handleCloseSnackbar}
//           anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//         >
//           <Alert 
//             severity={snackbar.severity} 
//             onClose={handleCloseSnackbar}
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </>
//   );
// }

// // Функция для статической генерации - выполняется на сервере во время сборки
// export async function getStaticProps() {
//   return {
//     props: {
//       generatedAt: new Date().toISOString(),
//     },
//     // Регенерация страницы каждые 24 часа (опционально)
//     revalidate: 86400, // 24 часа в секундах
//   }
// }

// export default function Favorites() {
//   return (
//     <Provider store={store}>
//       <LanguageProvider>
//         <Header />
//         <FavoritesContent />
//         <Footer/>
//       </LanguageProvider>
//     </Provider>
//   );
// }




'use client';
import { LanguageProvider, useLanguage } from "@/app/LanguageContext";
import Header from "@/app/components/Header";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import CreateUser from "@/app/components/CreateUser";
import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Button, Snackbar, Alert, Modal } from "@mui/material";
import axios from 'axios';
import Head from 'next/head';
import Footer from "@/app/components/Footer";
import ApartmentList from "@/app/components/ApartmentList";

const TRANSLATIONS = {
  ua: {
    title: "Обране",
    metaTitle: "Обрані оголошення про оренду | NaDoby",
    metaDescription: "Ваш список обраних оголошень про оренду житла. Квартири, готелі, будинки, сауни та інші варіанти проживання.",
    notAuthorized: "Будь ласка, увійдіть, щоб побачити обране",
    noFavorites: "У вас поки немає обраних оголошень",
    errorLoading: "Помилка при завантаженні обраного",
    removeSuccess: "Видалено з обраного",
    removeError: "Помилка при видаленні з обраного",
    retry: "Увійти/Зареєструватися",
    unauthorized: "Користувач не авторизований",
    userNotAuthorized: "Користувач не авторизований",
    count: "кількість"
  },
  ru: {
    title: "Избранное",
    metaTitle: "Избранные объявления об аренде | NaDoby", 
    metaDescription: "Ваш список избранных объявлений об аренде жилья. Квартиры, гостиницы, дома, сауны и другие варианты проживания.",
    notAuthorized: "Пожалуйста, войдите чтобы увидеть избранное",
    noFavorites: "У вас пока нет избранных объявлений",
    errorLoading: "Ошибка при загрузке избранного",
    removeSuccess: "Удалено из избранного",
    removeError: "Ошибка при удалении из избранного",
    retry: "Войти/Зарегистрироваться",
    unauthorized: "Пользователь не авторизован",
    userNotAuthorized: "Пользователь не авторизован",
    count: "количество"
  }
}

function FavoritesContent() {
  const { currentLanguage } = useLanguage();
  const t = TRANSLATIONS[currentLanguage];
  
  const [profile, setProfile] = useState(null);
  const [favoriteApartments, setFavoriteApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const userProfile = localStorage.getItem('user_profile');
      
      if (!userProfile) {
        setError('unauthorized');
        setLoading(false);
        return;
      }

      const profileData = JSON.parse(userProfile);
      setProfile(profileData);
      
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? process.env.NEXT_PUBLIC_API_URL 
        : process.env.NEXT_PUBLIC_API_URL;
      
      const response = await axios.get(
        `${baseUrl}/api/v1/apartments/favorites/user`,
        { 
          headers: { 'user-id': profileData._id }
        }
      );
      
      if (response.data.success) {
        setFavoriteApartments(response.data.favorites || []);
      } else {
        setError('load_error');
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      setError('load_error');
      showSnackbar(t.errorLoading, 'error');
    } finally {
      setLoading(false);
    }
  };

  // 👇 ИСПРАВЛЕННАЯ ФУНКЦИЯ - ИСПОЛЬЗУЕТ ТОГГЛ-ЭНДПОИНТ
  const handleRemoveFavorite = async (apartmentId) => {
    try {
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? process.env.NEXT_PUBLIC_API_URL 
        : process.env.NEXT_PUBLIC_API_URL;
      
      // Используем toggle эндпоинт
      await axios.post(
        `${baseUrl}/api/v1/apartments/favorites/toggle`,
        { apartmentId },
        { 
          headers: { 'user-id': profile._id }
        }
      );
      
      // Если запрос успешен - удаляем локально
      setFavoriteApartments(prev => prev.filter(apt => apt._id !== apartmentId));
      showSnackbar(t.removeSuccess, 'success');
    } catch (error) {
      console.error('Error removing favorite:', error);
      showSnackbar(t.removeError || 'Помилка при видаленні з обраного', 'error');
    }
  };

  const handleToggleFavorite = async (id) => {
    await handleRemoveFavorite(id);
  };

  const handleRetry = () => {
    setAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setAuthModalOpen(false);
    loadFavorites();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getErrorText = () => {
    if (error === 'unauthorized') {
      return t.userNotAuthorized;
    } else if (error === 'load_error') {
      return t.errorLoading;
    }
    return error;
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>{t.metaTitle}</title>
          <meta name="description" content={t.metaDescription} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href="https://nadoby.com.ua/favorites" />
        </Head>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>{t.metaTitle}</title>
          <meta name="description" content={t.metaDescription} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href="https://nadoby.com.ua/favorites" />
        </Head>
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            {getErrorText()}
          </Typography>
          <Button 
            variant="contained" 
            onClick={handleRetry}
            sx={{ textTransform: 'none' }}
          >
            {t.retry}
          </Button>
          
          <Modal
            open={authModalOpen}
            onClose={handleCloseAuthModal}
            aria-labelledby="auth-modal-title"
            aria-describedby="auth-modal-description"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box sx={{
              width: '90%',
              maxWidth: 500,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 0,
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <CreateUser onClose={handleCloseAuthModal} />
            </Box>
          </Modal>
        </Box>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://nadoby.com.ua/favorites" />
      </Head>

      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t.title} ({favoriteApartments.length})
        </Typography>
        
        {!profile ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {t.notAuthorized}
            </Typography>
            <Button 
              variant="contained" 
              onClick={handleRetry}
              sx={{ textTransform: 'none' }}
            >
              {t.retry}
            </Button>
          </Box>
        ) : favoriteApartments.length === 0 ? (
          <Typography variant="body1">
            {t.noFavorites}
          </Typography>
        ) : (
          <ApartmentList
            apartments={favoriteApartments}
            isFavorite={true}
            toggleFavorite={handleToggleFavorite}
            isFavoritesPage={true}
            showTitle={false}
            isUserListings={false}
            currentUserId={profile?._id}
          />
        )}

        <Modal
          open={authModalOpen}
          onClose={handleCloseAuthModal}
          aria-labelledby="auth-modal-title"
          aria-describedby="auth-modal-description"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{
            width: '90%',
            maxWidth: 500,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 0,
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <CreateUser onClose={handleCloseAuthModal} />
          </Box>
        </Modal>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            severity={snackbar.severity} 
            onClose={handleCloseSnackbar}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      generatedAt: new Date().toISOString(),
    },
    revalidate: 86400,
  }
}

export default function Favorites() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <Header />
        <FavoritesContent />
        <Footer/>
      </LanguageProvider>
    </Provider>
  );
}