



// app/components/Footer.js - делаем это страницей

// 'use client';

// import React from "react";
// import { useLanguage } from "@/app/LanguageContext";
// import { Box, Typography, Grid, Link, IconButton, Button } from '@mui/material';
// import { Telegram, Email, ArrowUpward } from '@mui/icons-material';
// import Logo from '@/app/components/Logo';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import SmartphoneIcon from '@mui/icons-material/Smartphone';

// const translations = {
//   ua: {
//     title: "Оренда житла по всій Україні",
//     categories: [
//       { name: 'Квартири', slug: 'apartments', url: '/blog/apartmentGuide' },
//       { name: 'Готелі', slug: 'hotels', url: '/blog/hotelGuide' },
//       { name: 'Готелі для тварин', slug: 'pet-hotels', url: '/blog/petHotelGuide' },
//       { name: 'Хостели', slug: 'hostels', url: '/blog/hostelGuide' },
//       { name: 'Будинки', slug: 'houses', url: '/blog/houseGuide'},
//       { name: 'Сауни/Бані', slug: 'saunas', url: '/blog/saunaGuide' },
//       { name: 'Глемпінг', slug: 'glamping', url: '/blog/glampingGuide' },
//       { name: 'Санаторії/Пансіонати', slug: 'boarding-houses', url: '/blog/sanatoriumGuide' },
//       { name: 'Котеджі для компаній', slug: 'cottages', url: '/blog/cottageComplexGuide' },
//       { name: 'Коворкінги', slug: 'coworking', url: '/blog/coworkingGuide' },
//       { name: 'Автокемпінги', slug: 'autocamping', url: '/blog/autocampingGuide' },
//       { name: 'Бази відпочинку', slug: 'resorts', url: '/blog/campGuide' }
//     ],
//     aboutTitle: "Про нас",
//     aboutText1: "NaDoby.com.ua - це платформа для оренди житла без посередників. Ми об'єднуємо власників нерухомості та орендарів по всій Україні.",
//     aboutText2: "Наші переваги: чесні ціни, прозорі умови.",
//     contactsTitle: "Контакти",
//     copyright: "© {year} NaDoby.com.ua - Оренда житла без посередників. Всі права захищені.",
//     workingHours: "Працюємо цілодобово",
//     backToTop: "Нагору"
//   },
//   ru: {
//     title: "Аренда жилья по всей Украине",
//     categories: [
//       { name: 'Квартиры', slug: 'apartments', url: '/blog/apartmentGuide' },
//       { name: 'Гостиницы', slug: 'hotels', url: '/blog/hotelGuide' },
//       { name: 'Гостиницы для животных', slug: 'pet-hotels', url: '/blog/petHotelGuide' },
//       { name: 'Хостелы', slug: 'hostels', url: '/blog/hostelGuide' },
//       { name: 'Дома', slug: 'houses', url: '/blog/houseGuide' },
//       { name: 'Сауны/Бани', slug: 'saunas', url: '/blog/saunaGuide' },
//       { name: 'Глэмпинг', slug: 'glamping', url: '/blog/glampingGuide' },
//       { name: 'Санатории/Пансионаты', slug: 'boarding-houses', url: '/blog/sanatoriumGuide' },
//       { name: 'Коттеджи для компаний', slug: 'cottages', url: '/blog/cottageComplexGuide' },
//       { name: 'Коворкинги', slug: 'coworking', url: '/blog/coworkingGuide' },
//       { name: 'Автокемпинги', slug: 'autocamping', url: '/blog/autocampingGuide' },
//       { name: 'Базы отдыха', slug: 'resorts', url: '/blog/campGuide' }
//     ],
//     aboutTitle: "О нас",
//     aboutText1: "NaDoby.com.ua - это платформа для аренды жилья без посредников. Мы объединяем владельцев недвижимости и арендаторов по всей Украине.",
//     aboutText2: "Наши преимущества: честные цены, прозрачные условия.",
//     contactsTitle: "Контакты",
//     copyright: "© {year} NaDoby.com.ua - Аренда жилья без посредников. Все права защищены.",
//     workingHours: "Работаем круглосуточно",
//     backToTop: "Наверх"
//   }
// };

// // Клиентский компонент
// function FooterContent({ generatedAt }) {
//   const { currentLanguage } = useLanguage();
  
//   const t = translations[currentLanguage] || translations.ua;
//   const categories = t.categories || [];

//   const handleEmailClick = () => {
//     window.location.href = 'mailto:nadoby.com.ua@gmail.com';
//   };

//   const handleTelegramClick = () => {
//     window.open('https://t.me/NaDoby', '_blank');
//   };

//   const handleViberClick = () => {
//     window.open('viber://chat?number=+380682597710', '_blank');
//   };

//   const handleWhatsAppClick = () => {
//     window.open('https://wa.me/380682597710', '_blank');
//   };

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   };

//   return (
//     <Box 
//       component="footer" 
//       sx={{ 
//         backgroundColor: '#f5f5f5',
//         color: '#333',
//         py: 4,
//         px: 2,
//         borderTop: '1px solid #e0e0e0',
//         mt: 'auto',
//         position: 'relative'
//       }}
//     >
//       <Button
//         variant="contained"
//         onClick={scrollToTop}
//         startIcon={<ArrowUpward />}
//         sx={{
//           position: 'absolute',
//           top: -20,
//           right: 20,
//           backgroundColor: '#1976d2',
//           '&:hover': {
//             backgroundColor: '#1565c0'
//           },
//           minWidth: 'auto',
//           px: 2,
//           py: 1
//         }}
//       >
//         {t.backToTop}
//       </Button>

//       <Box maxWidth="1200px" mx="auto">
//         <Box sx={{ textAlign: 'center', mb: 3 }}>
//           <Logo />
//         </Box>

//         <Grid container spacing={4}>
//           <Grid item xs={12} md={4}>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
//               {t.title}
//             </Typography>
//             <Box component="ul" sx={{ listStyle: 'none', pl: 0, mt: 2 }}>
//               {categories.map((category) => (
//                 <Typography 
//                   key={category.slug} 
//                   component="li" 
//                   sx={{ mb: 1 }}
//                 >
//                   <Link 
//                     href={category.url} 
//                     color="inherit" 
//                     underline="hover"
//                     sx={{ display: 'inline-block' }}
//                   >
//                     {category.name}
//                   </Link>
//                 </Typography>
//               ))}
//             </Box>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
//               {t.aboutTitle}
//             </Typography>
//             <Typography paragraph sx={{ mt: 2 }}>
//               {t.aboutText1}
//             </Typography>
//             <Typography paragraph>
//               {t.aboutText2}
//             </Typography>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
//               {t.contactsTitle}
//             </Typography>
//             <Box sx={{ mt: 2 }}>
//               <Typography 
//                 paragraph 
//                 sx={{ 
//                   cursor: 'pointer',
//                   display: 'flex',
//                   alignItems: 'center',
//                   mb: 2
//                 }} 
//                 onClick={handleEmailClick}
//               >
//                 <Email sx={{ mr: 1 }} />
//                 nadoby.com.ua@gmail.com
//               </Typography>
              
//               <Typography paragraph sx={{ mb: 2 }}>
//                 {t.workingHours}
//               </Typography>
              
//               <Box sx={{ display: 'flex', gap: 2 }}>
//                 <IconButton 
//                   onClick={handleTelegramClick} 
//                   color="inherit" 
//                   size="medium"
//                   sx={{ 
//                     backgroundColor: 'rgba(0, 136, 204, 0.1)',
//                     '&:hover': { 
//                       backgroundColor: 'rgba(0, 136, 204, 0.2)',
//                       transform: 'scale(1.1)'
//                     },
//                     transition: 'all 0.3s ease'
//                   }}
//                 >
//                   <Telegram />
//                 </IconButton>
                
//                 <IconButton 
//                   onClick={handleViberClick} 
//                   color="inherit" 
//                   size="medium"
//                   sx={{ 
//                     backgroundColor: 'rgba(123, 81, 157, 0.1)',
//                     '&:hover': { 
//                       backgroundColor: 'rgba(123, 81, 157, 0.2)',
//                       transform: 'scale(1.1)'
//                     },
//                     transition: 'all 0.3s ease'
//                   }}
//                 >
//                   <SmartphoneIcon />
//                 </IconButton>
                
//                 <IconButton 
//                   onClick={handleWhatsAppClick} 
//                   color="inherit" 
//                   size="medium"
//                   sx={{ 
//                     backgroundColor: 'rgba(37, 211, 102, 0.1)',
//                     '&:hover': { 
//                       backgroundColor: 'rgba(37, 211, 102, 0.2)',
//                       transform: 'scale(1.1)'
//                     },
//                     transition: 'all 0.3s ease'
//                   }}
//                 >
//                   <WhatsAppIcon />
//                 </IconButton>
//               </Box>
              
//               {generatedAt && (
//                 <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.secondary' }}>
//                   Сгенерировано: {new Date(generatedAt).toLocaleString()}
//                 </Typography>
//               )}
//             </Box>
//           </Grid>
//         </Grid>

//         <Box sx={{ 
//           mt: 4, 
//           pt: 2, 
//           borderTop: '1px solid #e0e0e0', 
//           textAlign: 'center'
//         }}>
//           <Typography variant="body2">
//             {t.copyright.replace('{year}', new Date().getFullYear())}
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
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

// // Основной экспорт - страница
// export default function Footer({ generatedAt }) {
//   return <FooterContent generatedAt={generatedAt} />;
// }




'use client';

import React from "react";
import { useLanguage } from "@/app/LanguageContext";
import { Box, Typography, Grid, Link, IconButton, Button } from '@mui/material';
import { Telegram, Email, ArrowUpward } from '@mui/icons-material';
import Logo from '@/app/components/Logo';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

const translations = {
  ua: {
    title: "Оренда житла по всій Україні",
    categories: [
      { name: 'Квартири', slug: 'apartments', url: '/blog/apartmentGuide' },
      { name: 'Готелі', slug: 'hotels', url: '/blog/hotelGuide' },
      { name: 'Готелі для тварин', slug: 'pet-hotels', url: '/blog/petHotelGuide' },
      { name: 'Хостели', slug: 'hostels', url: '/blog/hostelGuide' },
      { name: 'Будинки', slug: 'houses', url: '/blog/houseGuide'},
      { name: 'Сауни/Бані', slug: 'saunas', url: '/blog/saunaGuide' },
      { name: 'Глемпінг', slug: 'glamping', url: '/blog/glampingGuide' },
      { name: 'Санаторії/Пансіонати', slug: 'boarding-houses', url: '/blog/sanatoriumGuide' },
      { name: 'Котеджі для компаній', slug: 'cottages', url: '/blog/cottageComplexGuide' },
      { name: 'Коворкінги', slug: 'coworking', url: '/blog/coworkingGuide' },
      { name: 'Автокемпінги', slug: 'autocamping', url: '/blog/autocampingGuide' },
      { name: 'Бази відпочинку', slug: 'resorts', url: '/blog/campGuide' }
    ],
    aboutTitle: "Про нас",
    aboutText1: "NaDoby.com.ua - це платформа для оренди житла без посередників. Ми об'єднуємо власників нерухомості та орендарів по всій Україні.",
    aboutText2: "Наші переваги: чесні ціни, прозорі умови.",
    contactsTitle: "Контакти",
    copyright: "© {year} NaDoby.com.ua - Оренда житла без посередників. Всі права захищені.",
    workingHours: "Працюємо цілодобово",
    backToTop: "Нагору"
  },
  ru: {
    title: "Аренда жилья по всей Украине",
    categories: [
      { name: 'Квартиры', slug: 'apartments', url: '/blog/apartmentGuide' },
      { name: 'Гостиницы', slug: 'hotels', url: '/blog/hotelGuide' },
      { name: 'Гостиницы для животных', slug: 'pet-hotels', url: '/blog/petHotelGuide' },
      { name: 'Хостелы', slug: 'hostels', url: '/blog/hostelGuide' },
      { name: 'Дома', slug: 'houses', url: '/blog/houseGuide' },
      { name: 'Сауны/Бани', slug: 'saunas', url: '/blog/saunaGuide' },
      { name: 'Глэмпинг', slug: 'glamping', url: '/blog/glampingGuide' },
      { name: 'Санатории/Пансионаты', slug: 'boarding-houses', url: '/blog/sanatoriumGuide' },
      { name: 'Коттеджи для компаний', slug: 'cottages', url: '/blog/cottageComplexGuide' },
      { name: 'Коворкинги', slug: 'coworking', url: '/blog/coworkingGuide' },
      { name: 'Автокемпинги', slug: 'autocamping', url: '/blog/autocampingGuide' },
      { name: 'Базы отдыха', slug: 'resorts', url: '/blog/campGuide' }
    ],
    aboutTitle: "О нас",
    aboutText1: "NaDoby.com.ua - это платформа для аренды жилья без посредников. Мы объединяем владельцев недвижимости и арендаторов по всей Украине.",
    aboutText2: "Наши преимущества: честные цены, прозрачные условия.",
    contactsTitle: "Контакты",
    copyright: "© {year} NaDoby.com.ua - Аренда жилья без посредников. Все права защищены.",
    workingHours: "Работаем круглосуточно",
    backToTop: "Наверх"
  }
};

export default function Footer() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.ua;
  const categories = t.categories || [];

  const handleEmailClick = () => {
    window.location.href = 'mailto:nadoby.com.ua@gmail.com';
  };

  const handleTelegramClick = () => {
    window.open('https://t.me/NaDoby', '_blank');
  };

  const handleViberClick = () => {
    window.open('viber://chat?number=+380682597710', '_blank');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/380682597710', '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // ✅ ТОЛЬКО ДОБАВИЛ ЭТУ МИКРОРАЗМЕТКУ
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NaDoby",
    "url": "https://nadoby.com.ua",
    "logo": "https://nadoby.com.ua/logo3.ico",
    "email": "nadoby.com.ua@gmail.com",
    "telephone": "+380682597710"
  };

  return (
    <>
      {/* ✅ ТОЛЬКО ДОБАВИЛ ЭТОТ СКРИПТ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Box 
        component="footer" 
        sx={{ 
          backgroundColor: '#f5f5f5',
          color: '#333',
          py: 4,
          px: 2,
          borderTop: '1px solid #e0e0e0',
          mt: 'auto',
          position: 'relative'
        }}
      >
        <Button
          variant="contained"
          onClick={scrollToTop}
          startIcon={<ArrowUpward />}
          sx={{
            position: 'absolute',
            top: -20,
            right: 20,
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0'
            },
            minWidth: 'auto',
            px: 2,
            py: 1
          }}
        >
          {t.backToTop}
        </Button>

        <Box maxWidth="1200px" mx="auto">
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Logo />
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                {t.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', pl: 0, mt: 2 }}>
                {categories.map((category) => (
                  <Typography 
                    key={category.slug} 
                    component="li" 
                    sx={{ mb: 1 }}
                  >
                    <Link 
                      href={category.url} 
                      color="inherit" 
                      underline="hover"
                      sx={{ display: 'inline-block' }}
                    >
                      {category.name}
                    </Link>
                  </Typography>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                {t.aboutTitle}
              </Typography>
              <Typography paragraph sx={{ mt: 2 }}>
                {t.aboutText1}
              </Typography>
              <Typography paragraph>
                {t.aboutText2}
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                {t.contactsTitle}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography 
                  paragraph 
                  sx={{ 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2
                  }} 
                  onClick={handleEmailClick}
                >
                  <Email sx={{ mr: 1 }} />
                  nadoby.com.ua@gmail.com
                </Typography>
                
                <Typography paragraph sx={{ mb: 2 }}>
                  {t.workingHours}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton 
                    onClick={handleTelegramClick} 
                    color="inherit" 
                    size="medium"
                    sx={{ 
                      backgroundColor: 'rgba(0, 136, 204, 0.1)',
                      '&:hover': { 
                        backgroundColor: 'rgba(0, 136, 204, 0.2)',
                        transform: 'scale(1.1)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Telegram />
                  </IconButton>
                  
                  <IconButton 
                    onClick={handleViberClick} 
                    color="inherit" 
                    size="medium"
                    sx={{ 
                      backgroundColor: 'rgba(123, 81, 157, 0.1)',
                      '&:hover': { 
                        backgroundColor: 'rgba(123, 81, 157, 0.2)',
                        transform: 'scale(1.1)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <SmartphoneIcon />
                  </IconButton>
                  
                  <IconButton 
                    onClick={handleWhatsAppClick} 
                    color="inherit" 
                    size="medium"
                    sx={{ 
                      backgroundColor: 'rgba(37, 211, 102, 0.1)',
                      '&:hover': { 
                        backgroundColor: 'rgba(37, 211, 102, 0.2)',
                        transform: 'scale(1.1)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <WhatsAppIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ 
            mt: 4, 
            pt: 2, 
            borderTop: '1px solid #e0e0e0', 
            textAlign: 'center'
          }}>
            <Typography variant="body2">
              {t.copyright.replace('{year}', new Date().getFullYear())}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}