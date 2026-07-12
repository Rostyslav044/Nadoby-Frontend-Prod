// 'use client';

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   CardMedia,
//   Paper,
//   Grid,
//   Button,
//   CircularProgress,
// } from '@mui/material';

// export default function UserApartmentsPage() {
//   const router = useRouter();
//   const { userId } = router.query;

//   const [apartments, setApartments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (userId) {
//       const fetchUserApartments = async () => {
//         try {
//           const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/apartments/user/${userId}`);
//           const data = await res.json();
//           setApartments(data);
//         } catch (error) {
//           console.error('Ошибка при получении данных:', error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchUserApartments();
//     }
//   }, [userId]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={10}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box maxWidth="1000px" mx="auto" mt={4} p={2}>
//       <Typography variant="h4" gutterBottom>
//         Всі оголошення користувача
//       </Typography>

//       {apartments.length === 0 ? (
//         <Typography variant="body1">Оголошення не знайдено.</Typography>
//       ) : (
//         <Grid container spacing={3}>
//           {apartments.map((apt) => (
//             <Grid item xs={12} sm={6} md={4} key={apt._id}>
//               <Paper
//                 elevation={3}
//                 sx={{ p: 2, cursor: 'pointer', height: '100%' }}
//                 onClick={() => router.push(`/apartment/${apt._id}`)}
//               >
//                 <CardMedia
//                   component="img"
//                   image={apt.photos?.[0]}
//                   height="160"
//                   sx={{ borderRadius: 1, objectFit: 'cover', mb: 1 }}
//                 />
//                 <Typography variant="h6">{apt.name || 'Без назви'}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {apt.city}, {apt.street}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {apt.price ? `${apt.price} грн/доба` : ''}
//                 </Typography>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       <Box mt={4}>
//         <Button variant="contained" onClick={() => router.back()}>
//           Назад
//         </Button>
//       </Box>
//     </Box>
//   );
// }


import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CardMedia,
  Paper,
  Grid,
  Button,
  CircularProgress,
} from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';

// Функция для статической генерации - выполняется на сервере во время сборки
export async function getStaticProps() {
  // Здесь можно добавить запросы к API для получения данных
  // которые будут встроены в статическую страницу
  
  return {
    props: {
      // Данные которые будут переданы в компонент как пропсы
      generatedAt: new Date().toISOString(),
    },
    // Регенерация страницы каждые 24 часа (опционально)
    revalidate: 86400, // 24 часа в секундах
  }
}

// Функция для генерации статических путей
export async function getStaticPaths() {
  // Если у вас есть предопределенные пользователи, можно указать их здесь
  // Или вернуть пустой массив для генерации по требованию
  return {
    paths: [
      // { params: { userId: '1' } },
      // { params: { userId: '2' } },
    ],
    fallback: 'blocking', // или true для отображения загрузки
  }
}

export default function UserApartmentsPage() {
  const router = useRouter();
  const { userId } = router.query;

  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const fetchUserApartments = async () => {
        try {
          // Используем абсолютный URL для production
          const baseUrl = process.env.NODE_ENV === 'production' 
            ? process.env.NEXT_PUBLIC_API_URL 
            : '${process.env.NEXT_PUBLIC_API_URL}';
          
          const res = await fetch(`${baseUrl}/api/v1/apartments/user/${userId}`);
          const data = await res.json();
          setApartments(data);
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserApartments();
    }
  }, [userId]);

  if (loading) {
    return (
      <>
        <Head>
          <title>Загрузка объявлений пользователя | NaDoby</title>
          <meta name="description" content="Загрузка списка объявлений пользователя" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Box display="flex" justifyContent="center" mt={10}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Все объявления пользователя | NaDoby</title>
        <meta 
          name="description" 
          content={`Список всех объявлений пользователя. Квартиры, дома, отели и другие варианты аренды.`} 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Box maxWidth="1000px" mx="auto" mt={4} p={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          Всі оголошення користувача
        </Typography>

        {apartments.length === 0 ? (
          <Typography variant="body1">Оголошення не знайдено.</Typography>
        ) : (
          <Grid container spacing={3}>
            {apartments.map((apt) => (
              <Grid item xs={12} sm={6} md={4} key={apt._id}>
                <Paper
                  elevation={3}
                  sx={{ 
                    p: 2, 
                    cursor: 'pointer', 
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    }
                  }}
                  onClick={() => router.push(`/apartment/${apt._id}`)}
                >
                  {apt.photos?.[0] && (
                    <Box 
                      sx={{ 
                        position: 'relative', 
                        height: 160, 
                        borderRadius: 1, 
                        overflow: 'hidden',
                        mb: 1 
                      }}
                    >
                      <Image
                        src={apt.photos[0]}
                        alt={apt.name || 'Apartment image'}
                        fill
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }}
                        sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                        loading="lazy"
                      />
                    </Box>
                  )}
                  <Typography variant="h6" component="h2">
                    {apt.name || 'Без назви'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {apt.city}, {apt.street}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {apt.price ? `${apt.price} грн/доба` : ''}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        <Box mt={4}>
          <Button 
            variant="contained" 
            onClick={() => router.back()}
            sx={{
              px: 3,
              py: 1,
              fontWeight: 600,
              borderRadius: 2
            }}
          >
            Назад
          </Button>
        </Box>
      </Box>
    </>
  );
}