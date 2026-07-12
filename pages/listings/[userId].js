


// pages/listings/[userId].js

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Chip,
//   Button,
//   Avatar,
//   Container,
//   Paper,
//   Divider,
// } from '@mui/material';
// import { 
//   Home, 
//   LocationOn, 
//   Person, 
//   Phone,
//   Email,
//   KingBed,
// } from '@mui/icons-material';
// import Link from 'next/link';
// import Header from '@/app/components/Header';
// import Footer from '@/app/components/Footer';

// export default function UserListingsPage() {
//   const router = useRouter();
//   const { userId } = router.query;
  
//   const [listings, setListings] = useState([]);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchUserListings = async () => {
//       try {
//         setLoading(true);
//         setError('');
        
//         if (!userId) {
//           return;
//         }
        
//         // ЗАПРОС К РЕАЛЬНОМУ БЭКЕНДУ НА ПОРТУ 3000
//         const backendUrl = process.env.NEXT_PUBLIC_API_URL ;
//         const apiUrl = `${backendUrl}/api/v1/apartments/user/${userId}`;
        
//         console.log('🌐 Fetching REAL data from backend:', apiUrl);
        
//         const response = await fetch(apiUrl);
        
//         console.log('📨 Backend response status:', response.status);
        
//         if (!response.ok) {
//           throw new Error(`Ошибка загрузки с бэкенда: ${response.status}`);
//         }
        
//         const data = await response.json();
//         console.log('✅ REAL data received from backend:', data);
        
//         setListings(data.apartments || []);
//         setUser(data.user || null);
        
//       } catch (error) {
//         console.error('❌ Backend fetch error:', error);
//         setError('Не удалось загрузить данные с сервера: ' + error.message);
//         setListings([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserListings();
//   }, [userId]);

//   if (!userId) {
//     return (
//       <>
//         <Header />
//         <Container maxWidth="lg" sx={{ py: 4 }}>
//           <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
//             <CircularProgress />
//             <Typography variant="h6" sx={{ ml: 2 }}>
//               Загрузка...
//             </Typography>
//           </Box>
//         </Container>
//         <Footer />
//       </>
//     );
//   }

//   if (loading) {
//     return (
//       <>
//         <Header />
//         <Container maxWidth="lg" sx={{ py: 4 }}>
//           <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
//             <CircularProgress />
//             <Typography variant="h6" sx={{ ml: 2 }}>
//               Загружаем реальные объявления пользователя...
//             </Typography>
//           </Box>
//         </Container>
//         <Footer />
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <Header />
//         <Container maxWidth="lg" sx={{ py: 4 }}>
//           <Paper sx={{ p: 4, textAlign: 'center' }}>
//             <Typography variant="h5" color="error" gutterBottom>
//               Ошибка загрузки
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 3 }}>
//               {error}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//               User ID: {userId}
//             </Typography>
//             <Button 
//               variant="contained" 
//               onClick={() => window.location.reload()}
//               sx={{ mr: 2 }}
//             >
//               Попробовать снова
//             </Button>
//             <Button 
//               variant="outlined" 
//               component={Link}
//               href="/"
//             >
//               На главную
//             </Button>
//           </Paper>
//         </Container>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         {/* Информация о пользователе */}
//         {user && (
//           <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
//             <Box display="flex" alignItems="center" mb={3}>
//               <Avatar 
//                 src={user.avatar} 
//                 sx={{ width: 80, height: 80, mr: 3 }}
//                 alt={user.name}
//               >
//                 <Person sx={{ fontSize: 40 }} />
//               </Avatar>
//               <Box flexGrow={1}>
//                 <Typography variant="h4" gutterBottom>
//                   {user.name || user.email}
//                 </Typography>
//                 <Typography variant="h6" color="text.secondary">
//                   Все объявления пользователя
//                 </Typography>
//                 {user.about && (
//                   <Typography variant="body1" sx={{ mt: 1 }}>
//                     {user.about}
//                   </Typography>
//                 )}
//               </Box>
//             </Box>

//             {/* Контакты пользователя */}
//             {(user.phones && user.phones.length > 0) && (
//               <>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="h6" gutterBottom>
//                   Контакты
//                 </Typography>
//                 <Box display="flex" flexWrap="wrap" gap={2}>
//                   {user.phones.map((phone, index) => (
//                     <Box key={index} display="flex" alignItems="center">
//                       <Phone fontSize="small" sx={{ mr: 1 }} />
//                       <Typography variant="body1">
//                         {phone}
//                       </Typography>
//                     </Box>
//                   ))}
//                   {user.email && (
//                     <Box display="flex" alignItems="center">
//                       <Email fontSize="small" sx={{ mr: 1 }} />
//                       <Typography variant="body1">
//                         {user.email}
//                       </Typography>
//                     </Box>
//                   )}
//                 </Box>
//               </>
//             )}
//           </Paper>
//         )}

//         {/* Заголовок с количеством объявлений */}
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//           <Typography variant="h5">
//             Найдено объявлений: {listings.length}
//           </Typography>
//         </Box>

//         {/* Список объявлений */}
//         {listings.length === 0 ? (
//           <Paper sx={{ p: 6, textAlign: 'center' }}>
//             <Typography variant="h6" color="text.secondary" gutterBottom>
//               У этого пользователя еще нет объявлений
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//               User ID: {userId}
//             </Typography>
//             <Button 
//               variant="contained" 
//               component={Link}
//               href="/"
//               sx={{ mt: 2 }}
//             >
//               На главную
//             </Button>
//           </Paper>
//         ) : (
//           <>
//             <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
//               Показано {listings.length} реальных объявлений пользователя
//             </Typography>
//             <Grid container spacing={3}>
//               {listings.map((apartment) => (
//                 <Grid item xs={12} sm={6} md={4} key={apartment._id}>
//                   <Card 
//                     sx={{ 
//                       height: '100%', 
//                       display: 'flex', 
//                       flexDirection: 'column',
//                       cursor: 'pointer',
//                       transition: 'transform 0.2s, box-shadow 0.2s',
//                       '&:hover': {
//                         transform: 'translateY(-4px)',
//                         boxShadow: 6,
//                       }
//                     }}
//                   >
//                     <Link href={`/apartment/${apartment._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                       {apartment.photos && apartment.photos.length > 0 ? (
//                         <CardMedia
//                           component="img"
//                           height="200"
//                           image={apartment.photos[0]}
//                           alt={apartment.objectName || apartment.name}
//                           sx={{ objectFit: 'cover' }}
//                         />
//                       ) : (
//                         <Box 
//                           height="200" 
//                           display="flex" 
//                           alignItems="center" 
//                           justifyContent="center"
//                           bgcolor="grey.100"
//                         >
//                           <Home sx={{ fontSize: 60, color: 'grey.400' }} />
//                           <Typography variant="body2" color="grey.500" sx={{ ml: 1 }}>
//                             Нет фото
//                           </Typography>
//                         </Box>
//                       )}
                      
//                       <CardContent sx={{ flexGrow: 1, p: 2 }}>
//                         <Typography variant="h6" gutterBottom>
//                           {apartment.objectName || apartment.name || 'Объект'}
//                         </Typography>
                        
//                         <Box display="flex" alignItems="center" mb={1}>
//                           <LocationOn fontSize="small" color="action" />
//                           <Typography variant="body2" color="textSecondary" ml={1}>
//                             {apartment.city}
//                             {apartment.district && `, ${apartment.district}`}
//                           </Typography>
//                         </Box>

//                         <Box display="flex" alignItems="center" gap={2} mb={2}>
//                           {apartment.rooms && (
//                             <Box display="flex" alignItems="center">
//                               <Home fontSize="small" color="action" />
//                               <Typography variant="body2" color="textSecondary" ml={0.5}>
//                                 {apartment.rooms} комн.
//                               </Typography>
//                             </Box>
//                           )}
                          
//                           {apartment.beds && (
//                             <Box display="flex" alignItems="center">
//                               <KingBed fontSize="small" color="action" />
//                               <Typography variant="body2" color="textSecondary" ml={0.5}>
//                                 {apartment.beds} гост.
//                               </Typography>
//                             </Box>
//                           )}
//                         </Box>

//                         {apartment.size && (
//                           <Box display="flex" alignItems="center" mb={1}>
//                             <Typography variant="body2" color="textSecondary">
//                               Площадь: {apartment.size} м²
//                             </Typography>
//                           </Box>
//                         )}

//                         {apartment.price && (
//                           <Typography variant="h6" color="primary" gutterBottom>
//                             {apartment.price} грн/сутки
//                           </Typography>
//                         )}

//                         {apartment.category && (
//                           <Chip 
//                             label={apartment.category} 
//                             size="small" 
//                             variant="outlined"
//                             sx={{ mt: 1 }}
//                           />
//                         )}

//                         {apartment.description && (
//                           <Typography 
//                             variant="body2" 
//                             color="text.secondary" 
//                             sx={{ 
//                               mt: 1,
//                               display: '-webkit-box',
//                               WebkitLineClamp: 2,
//                               WebkitBoxOrient: 'vertical',
//                               overflow: 'hidden'
//                             }}
//                           >
//                             {apartment.description}
//                           </Typography>
//                         )}
//                       </CardContent>
//                     </Link>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </>
//         )}
//       </Container>
//       <Footer />
//     </>
//   );
// }


// pages/listings/[userId].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Button,
  Avatar,
  Container,
  Paper,
  Divider,
} from '@mui/material';
import { 
  Person, 
  Phone,
  LocationOn,
} from '@mui/icons-material';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ApartmentCard from '@/app/components/ApartmentCard';
import { LanguageProvider, useLanguage } from "@/app/LanguageContext";

// Тексты для перевода
const USER_LISTINGS_TRANSLATIONS = {
  ua: {
    loading: 'Завантаження...',
    loadingListings: 'Завантажуємо реальні оголошення користувача...',
    errorTitle: 'Помилка завантаження',
    tryAgain: 'Спробувати знову',
    toHome: 'На головну',
    userListings: 'Всі оголошення користувача',
    contacts: 'Контакти',
    listingsFound: 'Знайдено оголошень:',
    showingListings: 'Показано {count} реальних оголошень користувача',
    noListings: 'У цього користувача ще немає оголошень',
    userID: 'ID користувача',
    city: 'Місто',
  },
  ru: {
    loading: 'Загрузка...',
    loadingListings: 'Загружаем реальные объявления пользователя...',
    errorTitle: 'Ошибка загрузки',
    tryAgain: 'Попробовать снова',
    toHome: 'На главную',
    userListings: 'Все объявления пользователя',
    contacts: 'Контакты',
    listingsFound: 'Найдено объявлений:',
    showingListings: 'Показано {count} реальных объявлений пользователя',
    noListings: 'У этого пользователя еще нет объявлений',
    userID: 'ID пользователя',
    city: 'Город',
  },
};

function UserListingsContent() {
  const router = useRouter();
  const { userId } = router.query;
  const { currentLanguage } = useLanguage();
  const t = USER_LISTINGS_TRANSLATIONS[currentLanguage] || USER_LISTINGS_TRANSLATIONS.ua;
  
  const [listings, setListings] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        setLoading(true);
        setError('');
        
        if (!userId) {
          return;
        }
        
        const backendUrl = process.env.NEXT_PUBLIC_API_URL ;
        const apiUrl = `${backendUrl}/api/v1/apartments/user/${userId}`;
        
        console.log('🌐 Fetching REAL data from backend:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        console.log('📨 Backend response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Ошибка загрузки с бэкенда: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ REAL data received from backend:', data);
        
        setListings(data.apartments || []);
        setUser(data.user || null);
        
      } catch (error) {
        console.error('❌ Backend fetch error:', error);
        setError('Не удалось загрузить данные с сервера: ' + error.message);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserListings();
  }, [userId]);

  // Получаем город пользователя из его объявлений
  const getUserCity = () => {
    if (listings.length > 0) {
      // Берем город из первого объявления
      return listings[0].city;
    }
    return null;
  };

  const userCity = getUserCity();

  if (!userId) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2 }}>
              {t.loading}
            </Typography>
          </Box>
        </Container>
        <Footer />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2 }}>
              {t.loadingListings}
            </Typography>
          </Box>
        </Container>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" color="error" gutterBottom>
              {t.errorTitle}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {error}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t.userID}: {userId}
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => window.location.reload()}
              sx={{ mr: 2 }}
            >
              {t.tryAgain}
            </Button>
            <Button 
              variant="outlined" 
              component={Link}
              href="/"
            >
              {t.toHome}
            </Button>
          </Paper>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Информация о пользователе */}
        {user && (
          <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Box display="flex" alignItems="center" mb={3}>
              <Avatar 
                src={user.avatar} 
                sx={{ width: 80, height: 80, mr: 3 }}
                alt={user.name}
              >
                <Person sx={{ fontSize: 40 }} />
              </Avatar>
              <Box flexGrow={1}>
                <Typography variant="h4" gutterBottom>
                  {user.name || 'Пользователь'}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {t.userListings}
                </Typography>
                
                {/* Город пользователя */}
                {userCity && (
                  <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                    <LocationOn fontSize="small" color="action" sx={{ mr: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                      {t.city}: {userCity}
                    </Typography>
                  </Box>
                )}
                
                {user.about && (
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {user.about}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Телефоны пользователя */}
            {user.phones && user.phones.length > 0 && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  {t.contacts}
                </Typography>
                <Box display="flex" flexDirection="column" gap={1}>
                  {user.phones.map((phone, index) => (
                    <Box 
                      key={index} 
                      display="flex" 
                      alignItems="center"
                      sx={{ 
                        p: 1.5,
                        borderRadius: 1,
                        '&:hover': {
                          bgcolor: 'grey.50',
                        }
                      }}
                    >
                      <Phone fontSize="small" sx={{ mr: 2, color: 'primary.main' }} />
                      <Typography 
                        variant="body1" 
                        component="div"
                        sx={{ 
                          fontSize: '1.1rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          '&:hover': {
                            color: 'primary.main',
                          }
                        }}
                        onClick={() => window.open(`tel:${phone}`, '_self')}
                      >
                        {phone}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </Paper>
        )}

        {/* Заголовок с количеством объявлений */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5">
            {t.listingsFound} {listings.length}
          </Typography>
        </Box>

        {/* Список объявлений */}
        {listings.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t.noListings}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {t.userID}: {userId}
            </Typography>
            <Button 
              variant="contained" 
              component={Link}
              href="/"
              sx={{ mt: 2 }}
            >
              {t.toHome}
            </Button>
          </Paper>
        ) : (
          <>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {t.showingListings.replace('{count}', listings.length)}
            </Typography>
            <Grid container spacing={3}>
              {listings.map((apartment) => (
                <Grid item xs={12} sm={6} md={4} key={apartment._id}>
                  <ApartmentCard 
                    apartment={apartment}
                    showCreateUserDialog={() => {}}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default function UserListingsPage() {
  return (
    <LanguageProvider>
      <UserListingsContent />
    </LanguageProvider>
  );
}