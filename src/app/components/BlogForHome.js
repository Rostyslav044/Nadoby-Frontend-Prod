// // app/components/BlogForHome.js - блог без Head (для главной страницы)
// 'use client';

// import { useLanguage } from "@/app/LanguageContext";
// import { Box, Typography, Container, Card, CardContent, Chip } from '@mui/material';
// import Image from 'next/image';
// import Link from 'next/link';

// const BLOG_CONTENT = {
//   ua: {
//     title: "Корисні поради та ідеї для вашої подорожі",
//     posts: [
//       { title: "Як уникнути шахрайства при оренді", content: "7 золотих правил безпечної угоди від експертів NaDoby", image: "/scams.webp", category: "Безпека", link: "/blog/scams" },
//       { title: "Квартири подобово для комфортного відпочинку", content: "Як вибрати ідеальну квартиру для короткострокової оренди", image: "/apartment.webp", category: "Квартири", link: "/blog/apartmentGuide" },
//       { title: "Готелі з особливою атмосферою", content: "На що звертати увагу при виборі готельного номеру", image: "/hotel.webp", category: "Готелі", link: "/blog/hotelGuide" },
//       { title: "Готелі для тварин з турботою", content: "Як обрати найкращий готель для вашого улюбленця", image: "/animal.webp", category: "Готелі для тварин", link: "/blog/petHotelGuide" },
//       { title: "Хостели – бюджетно та весело!", content: "Чому хостели - це не просто дешевий варіант", image: "/hostel.webp", category: "Хостели", link: "/blog/hostelGuide" },
//       { title: "Будинки для відпочинку", content: "Переваги оренди приватного будинку перед готелем", image: "/house.webp", category: "Будинки", link: "/blog/houseGuide" },
//       { title: "Сауни/Бані для здоров'я", content: "Як правильно відпочивати у сауні для максимальної користі", image: "/sauna.webp", category: "Сауни/Бані", link: "/blog/saunaGuide" },
//       { title: "Бази відпочинку серед природи", content: "Як провести час на базі відпочинку з максимальною користю", image: "/camp.webp", category: "Бази відпочинку", link: "/blog/campGuide" },
//       { title: "Глемпінг - комфорт серед природи", content: "Топ незвичайних глемпінг локацій в Україні", image: "/glamping.webp", category: "Глемпінг", link: "/blog/glampingGuide" },
//       { title: "Пансіонати/Санаторії з лікувальними програмами", content: "Як вибрати пансіонат з максимальною користю для здоров'я", image: "/pansionat.webp", category: "Пансіонати/Санаторії", link: "/blog/sanatoriumGuide" },
//       { title: "Котеджні містечка для великих компаній", content: "Переваги оренди цілого комплексу для сімейних свят", image: "/kotedzi.webp", category: "Котеджі", link: "/blog/cottageComplexGuide" },
//       { title: "Коворкінг - робочі простори", content: "Ідеальні умови для digital-кочівників та фрілансерів", image: "/kavorking.webp", category: "Коворкінг", link: "/blog/coworkingGuide" },
//       { title: "Автокемпінги для мандрівників", content: "Найкращі місця для автотуристів по всій Україні", image: "/avtokemping.webp", category: "Автокемпінг", link: "/blog/autocampingGuide" }
//     ]
//   },
//   ru: {
//     title: "Полезные советы и идеи для вашего путешествия",
//     posts: [
//       { title: "Как избежать мошенничества при аренде", content: "7 золотых правил безопасной сделки от экспертов NaDoby", image: "/scams.webp", category: "Безопасность", link: "/blog/scams" },
//       { title: "Квартиры посуточно для комфортного отдыха", content: "Как выбрать идеальную квартиру для краткосрочной аренды", image: "/apartment.webp", category: "Квартиры", link: "/blog/apartmentGuide" },
//       { title: "Отели с особой атмосферой", content: "На что обращать внимание при выборе гостиничного номера", image: "/hotel.webp", category: "Отели", link: "/blog/hotelGuide" },
//       { title: "Отели для животных с заботой", content: "Как выбрать лучший отель для вашего любимца", image: "/animal.webp", category: "Отель для животных", link: "/blog/petHotelGuide" },
//       { title: "Хостелы – бюджетно и весело!", content: "Почему хостелы - это не просто дешевый вариант", image: "/hostel.webp", category: "Хостелы", link: "/blog/hostelGuide" },
//       { title: "Дома для отдыха", content: "Преимущества аренды частного дома перед отелем", image: "/house.webp", category: "Дома", link: "/blog/houseGuide" },
//       { title: "Сауны/Бани для здоровья", content: "Как правильно отдыхать в сауне для максимальной пользы", image: "/sauna.webp", category: "Сауны/Бани", link: "/blog/saunaGuide" },
//       { title: "Базы отдыха на природе", content: "Как провести время на базе отдыха с максимальной пользой", image: "/camp.webp", category: "Туризм", link: "/blog/campGuide" },
//       { title: "Глэмпинг - комфорт среди природы", content: "Топ необычных глэмпинг локаций в Украине", image: "/glamping.webp", category: "Глэмпинг", link: "/blog/glampingGuide" },
//       { title: "Пансионаты/Санатории с лечебными программами", content: "Как выбрать пансионат с максимальной пользой для здоровья", image: "/pansionat.webp", category: "Пансионаты/Санатории", link: "/blog/sanatoriumGuide" },
//       { title: "Коттеджные городки для больших компаний", content: "Преимущества аренды целого комплекса для семейных праздников", image: "/kotedzi.webp", category: "Коттеджи", link: "/blog/cottageComplexGuide" },
//       { title: "Коворкинг - рабочие пространства", content: "Идеальные условия для digital-кочевников и фрилансеров", image: "/kavorking.webp", category: "Коворкинги", link: "/blog/coworkingGuide" },
//       { title: "Автокемпинги для путешественников", content: "Лучшие места для автотуристов по всей Украине", image: "/avtokemping.webp", category: "Автокемпинг", link: "/blog/autocampingGuide" }
//     ]
//   }
// };

// export default function BlogForHome() {
//   const { currentLanguage } = useLanguage();
//   const content = BLOG_CONTENT[currentLanguage];

//   return (
//     <Container maxWidth="lg" sx={{ py: 6 }}>
//       {/* Скрытый SEO-текст (только для поисковиков) */}
//       <Box sx={{ display: 'none' }} aria-hidden="true">
//         <h1>Квартиры посуточно | Полезные советы по аренде | NaDoby</h1>
//         <p>
//           Ищете квартиры посуточно? В нашем блоге вы найдете полезные советы по аренде квартир на сутки,
//           как выбрать идеальное жилье, избежать мошенничества и сделать ваше путешествие комфортным.
//         </p>
//         <p>
//           Квартиры посуточно — это удобно и выгодно. Мы собрали лучшие рекомендации по аренде 
//           квартир посуточно в любом городе Украины.
//         </p>
//       </Box>

//       <Typography variant="h3" component="h2" sx={{ 
//         mb: 6, 
//         fontWeight: 700,
//         textAlign: 'center',
//         color: 'text.primary',
//         fontSize: { xs: '2rem', md: '2.5rem' }
//       }}>
//         {content.title}
//       </Typography>

//       <Box sx={{ 
//         display: 'grid', 
//         gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
//         gap: 4,
//         mb: 8
//       }}>
//         {content.posts.map((post, index) => (
//           <Link key={index} href={post.link || '#'} passHref legacyBehavior style={{ textDecoration: 'none' }}>
//             <Card elevation={2} sx={{ 
//               display: 'flex', 
//               flexDirection: 'column',
//               height: '100%',
//               transition: 'all 0.3s ease',
//               borderRadius: 2,
//               cursor: 'pointer',
//               '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 }
//             }}>
//               <Box sx={{ position: 'relative', height: 220, overflow: 'hidden', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
//                 <Image
//                   src={post.image}
//                   alt={post.title}
//                   fill
//                   style={{ objectFit: 'cover', objectPosition: 'center' }}
//                   sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
//                   loading={index < 6 ? "eager" : "lazy"}
//                   priority={index < 3}
//                 />
//               </Box>
//               <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
//                 <Chip 
//                   label={post.category} 
//                   size="small" 
//                   sx={{ mb: 2, alignSelf: 'flex-start', bgcolor: 'primary.light', color: 'primary.contrastText', fontWeight: 600 }}
//                 />
//                 <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600, lineHeight: 1.3, minHeight: '3.5em' }}>
//                   {post.title}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', flexGrow: 1 }}>
//                   {post.content}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Link>
//         ))}
//       </Box>
//     </Container>
//   );
// }




// 'use client';

// import { useLanguage } from "@/app/LanguageContext";
// import { Box, Typography, Container, Card, CardContent, Chip } from '@mui/material';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useState } from 'react';

// const BLOG_CONTENT = {
//   ua: {
//     sectionTitle: "Корисні поради та ідеї для вашої подорожі",
//     readMore: "Читати далі →",
//     allArticles: "Всі статті блогу →",
//     posts: [
//       { title: "Як уникнути шахрайства при оренді", content: "7 золотих правил безпечної угоди від експертів NaDoby", image: "/scams.png", category: "Безпека", link: "/blog/scams", date: "2025-01-15", author: "Команда NaDoby" },
//       { title: "Квартири подобово для комфортного відпочинку", content: "Як вибрати ідеальну квартиру для короткострокової оренди", image: "/apartment.png", category: "Квартири", link: "/blog/apartmentGuide", date: "2025-01-20", author: "Команда NaDoby" },
//       { title: "Готелі з особливою атмосферою", content: "На що звертати увагу при виборі готельного номеру", image: "/hotel.png", category: "Готелі", link: "/blog/hotelGuide", date: "2025-01-25", author: "Команда NaDoby" },
//       { title: "Готелі для тварин з турботою", content: "Як обрати найкращий готель для вашого улюбленця", image: "/animal.png", category: "Готелі для тварин", link: "/blog/petHotelGuide", date: "2025-02-01", author: "Команда NaDoby" },
//       { title: "Хостели – бюджетно та весело!", content: "Чому хостели - це не просто дешевий варіант", image: "/hostel.png", category: "Хостели", link: "/blog/hostelGuide", date: "2025-02-05", author: "Команда NaDoby" },
//       { title: "Будинки для відпочинку", content: "Переваги оренди приватного будинку перед готелем", image: "/house.png", category: "Будинки", link: "/blog/houseGuide", date: "2025-02-10", author: "Команда NaDoby" },
//       { title: "Сауни/Бані для здоров'я", content: "Як правильно відпочивати у сауні для максимальної користі", image: "/sauna.png", category: "Сауни/Бані", link: "/blog/saunaGuide", date: "2025-02-15", author: "Команда NaDoby" },
//       { title: "Бази відпочинку серед природи", content: "Як провести час на базі відпочинку з максимальною користю", image: "/camp.png", category: "Бази відпочинку", link: "/blog/campGuide", date: "2025-02-20", author: "Команда NaDoby" },
//       { title: "Глемпінг - комфорт серед природи", content: "Топ незвичайних глемпінг локацій в Україні", image: "/glamping.png", category: "Глемпінг", link: "/blog/glampingGuide", date: "2025-02-25", author: "Команда NaDoby" },
//       { title: "Пансіонати/Санаторії з лікувальними програмами", content: "Як вибрати пансіонат з максимальною користю для здоров'я", image: "/pansionat.png", category: "Пансіонати/Санаторії", link: "/blog/sanatoriumGuide", date: "2025-03-01", author: "Команда NaDoby" },
//       { title: "Котеджні містечка для великих компаній", content: "Переваги оренди цілого комплексу для сімейних свят", image: "/kotedzi.png", category: "Котеджі", link: "/blog/cottageComplexGuide", date: "2025-03-05", author: "Команда NaDoby" },
//       { title: "Коворкінг - робочі простори", content: "Ідеальні умови для digital-кочівників та фрілансерів", image: "/kavorking.png", category: "Коворкінг", link: "/blog/coworkingGuide", date: "2025-03-10", author: "Команда NaDoby" },
//       { title: "Автокемпінги для мандрівників", content: "Найкращі місця для автотуристів по всій Україні", image: "/avtokemping.png", category: "Автокемпінг", link: "/blog/autocampingGuide", date: "2025-03-15", author: "Команда NaDoby" }
//     ]
//   },
//   ru: {
//     sectionTitle: "Полезные советы и идеи для вашего путешествия",
//     readMore: "Читать далее →",
//     allArticles: "Все статьи блога →",
//     posts: [
//       { title: "Как избежать мошенничества при аренде", content: "7 золотых правил безопасной сделки от экспертов NaDoby", image: "/scams.png", category: "Безопасность", link: "/blog/scams", date: "2025-01-15", author: "Команда NaDoby" },
//       { title: "Квартиры посуточно для комфортного отдыха", content: "Как выбрать идеальную квартиру для краткосрочной аренды", image: "/apartment.png", category: "Квартиры", link: "/blog/apartmentGuide", date: "2025-01-20", author: "Команда NaDoby" },
//       { title: "Отели с особой атмосферой", content: "На что обращать внимание при выборе гостиничного номера", image: "/hotel.png", category: "Отели", link: "/blog/hotelGuide", date: "2025-01-25", author: "Команда NaDoby" },
//       { title: "Отели для животных с заботой", content: "Как выбрать лучший отель для вашего любимца", image: "/animal.png", category: "Отель для животных", link: "/blog/petHotelGuide", date: "2025-02-01", author: "Команда NaDoby" },
//       { title: "Хостелы – бюджетно и весело!", content: "Почему хостелы - это не просто дешевый вариант", image: "/hostel.png", category: "Хостелы", link: "/blog/hostelGuide", date: "2025-02-05", author: "Команда NaDoby" },
//       { title: "Дома для отдыха", content: "Преимущества аренды частного дома перед отелем", image: "/house.png", category: "Дома", link: "/blog/houseGuide", date: "2025-02-10", author: "Команда NaDoby" },
//       { title: "Сауны/Бани для здоровья", content: "Как правильно отдыхать в сауне для максимальной пользы", image: "/sauna.png", category: "Сауны/Бани", link: "/blog/saunaGuide", date: "2025-02-15", author: "Команда NaDoby" },
//       { title: "Базы отдыха на природе", content: "Как провести время на базе отдыха с максимальной пользой", image: "/camp.png", category: "Туризм", link: "/blog/campGuide", date: "2025-02-20", author: "Команда NaDoby" },
//       { title: "Глэмпинг - комфорт среди природы", content: "Топ необычных глэмпинг локаций в Украине", image: "/glamping.png", category: "Глэмпинг", link: "/blog/glampingGuide", date: "2025-02-25", author: "Команда NaDoby" },
//       { title: "Пансионаты/Санатории с лечебными программами", content: "Как выбрать пансионат с максимальной пользой для здоровья", image: "/pansionat.png", category: "Пансионаты/Санатории", link: "/blog/sanatoriumGuide", date: "2025-03-01", author: "Команда NaDoby" },
//       { title: "Коттеджные городки для больших компаний", content: "Преимущества аренды целого комплекса для семейных праздников", image: "/kotedzi.png", category: "Коттеджи", link: "/blog/cottageComplexGuide", date: "2025-03-05", author: "Команда NaDoby" },
//       { title: "Коворкинг - рабочие пространства", content: "Идеальные условия для digital-кочевников и фрилансеров", image: "/kavorking.png", category: "Коворкинги", link: "/blog/coworkingGuide", date: "2025-03-10", author: "Команда NaDoby" },
//       { title: "Автокемпинги для путешественников", content: "Лучшие места для автотуристов по всей Украине", image: "/avtokemping.png", category: "Автокемпинг", link: "/blog/autocampingGuide", date: "2025-03-15", author: "Команда NaDoby" }
//     ]
//   }
// };

// export default function BlogForHome() {
//   const { currentLanguage } = useLanguage();
//   const content = BLOG_CONTENT[currentLanguage];
//   const [visibleCount, setVisibleCount] = useState(6);
  
//   const visiblePosts = content.posts.slice(0, visibleCount);
//   const hasMore = visibleCount < content.posts.length;

//   // Формируем микроразметку для всех статей
//   const blogSchema = {
//     "@context": "https://schema.org",
//     "@type": "Blog",
//     "name": "NaDoby Блог | Советы по аренде жилья",
//     "description": "Полезные советы по аренде квартир, отелей, домов и другого жилья по всей Украине",
//     "url": "https://nadoby.com.ua",
//     "publisher": {
//       "@type": "Organization",
//       "name": "NaDoby",
//       "logo": {
//         "@type": "ImageObject",
//         "url": "https://nadoby.com.ua/logo.png"
//       }
//     },
//     "blogPost": content.posts.map(post => ({
//       "@type": "BlogPosting",
//       "headline": post.title,
//       "description": post.content,
//       "image": `https://nadoby.com.ua${post.image}`,
//       "url": `https://nadoby.com.ua${post.link}`,
//       "datePublished": post.date,
//       "dateModified": post.date,
//       "author": {
//         "@type": "Organization",
//         "name": post.author,
//         "url": "https://nadoby.com.ua"
//       },
//       "mainEntityOfPage": {
//         "@type": "WebPage",
//         "@id": `https://nadoby.com.ua${post.link}`
//       }
//     }))
//   };

//   return (
//     <>
//       {/* SEO микроразметка */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
//       />

//       <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
//         {/* Заголовок секции с декоративной линией */}
//         <Box sx={{ mb: 6, textAlign: 'center' }}>
//           <Typography
//             variant="overline"
//             sx={{
//               color: 'primary.main',
//               fontWeight: 600,
//               letterSpacing: 1,
//               mb: 1,
//               display: 'block'
//             }}
//           >
//             {currentLanguage === 'ua' ? 'НАШ БЛОГ' : 'НАШ БЛОГ'}
//           </Typography>
//           <Typography
//             variant="h2"
//             component="h2"
//             sx={{
//               fontSize: { xs: '1.8rem', md: '2.5rem' },
//               fontWeight: 700,
//               color: 'text.primary',
//               mb: 2,
//               position: 'relative',
//               display: 'inline-block',
//               '&:after': {
//                 content: '""',
//                 position: 'absolute',
//                 bottom: '-10px',
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 width: '60px',
//                 height: '3px',
//                 bgcolor: 'primary.main',
//                 borderRadius: '2px'
//               }
//             }}
//           >
//             {content.sectionTitle}
//           </Typography>
//         </Box>

//         {/* Сетка карточек блога */}
//         <Box sx={{
//           display: 'grid',
//           gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
//           gap: 4
//         }}>
//           {visiblePosts.map((post, index) => (
//             <Link
//               key={index}
//               href={post.link || '#'}
//               passHref
//               legacyBehavior
//             >
//               <Card
//                 elevation={0}
//                 component="a"
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   height: '100%',
//                   transition: 'all 0.3s ease-in-out',
//                   borderRadius: 3,
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   bgcolor: 'background.paper',
//                   border: '1px solid',
//                   borderColor: 'divider',
//                   overflow: 'hidden',
//                   '&:hover': {
//                     transform: 'translateY(-8px)',
//                     boxShadow: 4,
//                     borderColor: 'primary.main',
//                     '& .post-image': {
//                       transform: 'scale(1.05)'
//                     },
//                     '& .post-title': {
//                       color: 'primary.main'
//                     }
//                   }
//                 }}
//               >
//                 {/* Изображение */}
//                 <Box sx={{
//                   position: 'relative',
//                   height: 220,
//                   overflow: 'hidden',
//                   bgcolor: 'grey.100'
//                 }}>
//                   <Image
//                     src={post.image}
//                     alt={post.title}
//                     fill
//                     className="post-image"
//                     style={{
//                       objectFit: 'cover',
//                       objectPosition: 'center',
//                       transition: 'transform 0.4s ease-in-out'
//                     }}
//                     sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
//                     loading={index < 3 ? "eager" : "lazy"}
//                     priority={index < 3}
//                   />
//                   {/* Категория поверх изображения */}
//                   <Chip
//                     label={post.category}
//                     size="small"
//                     sx={{
//                       position: 'absolute',
//                       top: 16,
//                       left: 16,
//                       bgcolor: 'rgba(0,0,0,0.7)',
//                       color: 'white',
//                       fontWeight: 600,
//                       backdropFilter: 'blur(4px)',
//                       '&:hover': { bgcolor: 'primary.main' }
//                     }}
//                   />
//                 </Box>

//                 <CardContent sx={{ p: 3, flexGrow: 1 }}>
//                   {/* Дата */}
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       color: 'text.secondary',
//                       display: 'block',
//                       mb: 1.5,
//                       textTransform: 'uppercase',
//                       letterSpacing: 0.5
//                     }}
//                   >
//                     {new Date(post.date).toLocaleDateString(currentLanguage === 'ua' ? 'uk-UA' : 'ru-RU', {
//                       day: 'numeric',
//                       month: 'long',
//                       year: 'numeric'
//                     })}
//                   </Typography>

//                   {/* Заголовок */}
//                   <Typography
//                     variant="h5"
//                     component="h3"
//                     className="post-title"
//                     sx={{
//                       mb: 2,
//                       fontWeight: 700,
//                       lineHeight: 1.3,
//                       color: 'text.primary',
//                       transition: 'color 0.2s ease',
//                       fontSize: { xs: '1.25rem', md: '1.35rem' }
//                     }}
//                   >
//                     {post.title}
//                   </Typography>

//                   {/* Описание */}
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       mb: 2,
//                       color: 'text.secondary',
//                       lineHeight: 1.6
//                     }}
//                   >
//                     {post.content}
//                   </Typography>

//                   {/* Автор */}
//                   <Box sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     mt: 'auto',
//                     pt: 2,
//                     borderTop: '1px solid',
//                     borderColor: 'divider'
//                   }}>
//                     <Typography variant="caption" sx={{ color: 'text.disabled' }}>
//                       {post.author}
//                     </Typography>
//                     <Typography
//                       variant="caption"
//                       sx={{
//                         color: 'primary.main',
//                         fontWeight: 600,
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: 0.5,
//                         '&:hover': { gap: 1 }
//                       }}
//                     >
//                       {content.readMore}
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </Box>

//         {/* Кнопка "Показать еще" */}
//         {hasMore && (
//           <Box sx={{ textAlign: 'center', mt: 6 }}>
//             <Typography
//               component="button"
//               onClick={() => setVisibleCount(prev => prev + 3)}
//               sx={{
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 px: 4,
//                 py: 1.5,
//                 bgcolor: 'transparent',
//                 color: 'primary.main',
//                 border: '2px solid',
//                 borderColor: 'primary.main',
//                 borderRadius: 3,
//                 fontWeight: 600,
//                 cursor: 'pointer',
//                 transition: 'all 0.2s ease',
//                 '&:hover': {
//                   bgcolor: 'primary.main',
//                   color: 'white',
//                   gap: 2
//                 }
//               }}
//             >
//               {currentLanguage === 'ua' ? 'Показати більше статей' : 'Показать больше статей'}
//             </Typography>
//           </Box>
//         )}

//         {/* Ссылка на все статьи */}
//         <Box sx={{ textAlign: 'center', mt: 4 }}>
//           <Link href="/blog" passHref legacyBehavior>
//             <Typography
//               component="a"
//               sx={{
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 px: 4,
//                 py: 1.5,
//                 bgcolor: 'primary.main',
//                 color: 'white',
//                 borderRadius: 3,
//                 fontWeight: 600,
//                 textDecoration: 'none',
//                 transition: 'all 0.2s ease',
//                 '&:hover': {
//                   bgcolor: 'primary.dark',
//                   gap: 2,
//                   boxShadow: 2
//                 }
//               }}
//             >
//               {content.allArticles}
//             </Typography>
//           </Link>
//         </Box>
//       </Container>
//     </>
//   );
// }




// app/components/BlogForHome.js - блог для главной страницы
'use client';

import { useLanguage } from "@/app/LanguageContext";
import { Box, Typography, Container, Card, CardContent, Chip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const BLOG_CONTENT = {
  ua: {
    title: "Корисні поради та ідеї для вашої подорожі",
    posts: [
      { title: "Як уникнути шахрайства при оренді", content: "7 золотих правил безпечної угоди від експертів NaDoby", image: "/scams.webp", category: "Безпека", link: "/blog/scams" },
      { title: "Квартири подобово для комфортного відпочинку", content: "Як вибрати ідеальну квартиру для короткострокової оренди", image: "/apartment.webp", category: "Квартири", link: "/blog/apartmentGuide" },
      { title: "Готелі з особливою атмосферою", content: "На що звертати увагу при виборі готельного номеру", image: "/hotel.webp", category: "Готелі", link: "/blog/hotelGuide" },
      { title: "Готелі для тварин з турботою", content: "Як обрати найкращий готель для вашого улюбленця", image: "/animal.webp", category: "Готелі для тварин", link: "/blog/petHotelGuide" },
      { title: "Хостели – бюджетно та весело!", content: "Чому хостели - це не просто дешевий варіант", image: "/hostel.webp", category: "Хостели", link: "/blog/hostelGuide" },
      { title: "Будинки для відпочинку", content: "Переваги оренди приватного будинку перед готелем", image: "/house.webp", category: "Будинки", link: "/blog/houseGuide" },
      { title: "Сауни/Бані для здоров'я", content: "Як правильно відпочивати у сауні для максимальної користі", image: "/sauna.webp", category: "Сауни/Бані", link: "/blog/saunaGuide" },
      { title: "Бази відпочинку серед природи", content: "Як провести час на базі відпочинку з максимальною користю", image: "/camp.webp", category: "Бази відпочинку", link: "/blog/campGuide" },
      { title: "Глемпінг - комфорт серед природи", content: "Топ незвичайних глемпінг локацій в Україні", image: "/glamping.webp", category: "Глемпінг", link: "/blog/glampingGuide" },
      { title: "Пансіонати/Санаторії з лікувальними програмами", content: "Як вибрати пансіонат з максимальною користю для здоров'я", image: "/pansionat.webp", category: "Пансіонати/Санаторії", link: "/blog/sanatoriumGuide" },
      { title: "Котеджні містечка для великих компаній", content: "Переваги оренди цілого комплексу для сімейних свят", image: "/kotedzi.webp", category: "Котеджі", link: "/blog/cottageComplexGuide" },
      { title: "Коворкінг - робочі простори", content: "Ідеальні умови для digital-кочівників та фрілансерів", image: "/kavorking.webp", category: "Коворкінг", link: "/blog/coworkingGuide" },
      { title: "Автокемпінги для мандрівників", content: "Найкращі місця для автотуристів по всій Україні", image: "/avtokemping.webp", category: "Автокемпінг", link: "/blog/autocampingGuide" }
    ]
  },
  ru: {
    title: "Полезные советы и идеи для вашего путешествия",
    posts: [
      { title: "Как избежать мошенничества при аренде", content: "7 золотых правил безопасной сделки от экспертов NaDoby", image: "/scams.webp", category: "Безопасность", link: "/blog/scams" },
      { title: "Квартиры посуточно для комфортного отдыха", content: "Как выбрать идеальную квартиру для краткосрочной аренды", image: "/apartment.webp", category: "Квартиры", link: "/blog/apartmentGuide" },
      { title: "Отели с особой атмосферой", content: "На что обращать внимание при выборе гостиничного номера", image: "/hotel.webp", category: "Отели", link: "/blog/hotelGuide" },
      { title: "Отели для животных с заботой", content: "Как выбрать лучший отель для вашего любимца", image: "/animal.webp", category: "Отель для животных", link: "/blog/petHotelGuide" },
      { title: "Хостелы – бюджетно и весело!", content: "Почему хостелы - это не просто дешевый вариант", image: "/hostel.webp", category: "Хостелы", link: "/blog/hostelGuide" },
      { title: "Дома для отдыха", content: "Преимущества аренды частного дома перед отелем", image: "/house.webp", category: "Дома", link: "/blog/houseGuide" },
      { title: "Сауны/Бани для здоровья", content: "Как правильно отдыхать в сауне для максимальной пользы", image: "/sauna.webp", category: "Сауны/Бани", link: "/blog/saunaGuide" },
      { title: "Базы отдыха на природе", content: "Как провести время на базе отдыха с максимальной пользой", image: "/camp.webp", category: "Туризм", link: "/blog/campGuide" },
      { title: "Глэмпинг - комфорт среди природы", content: "Топ необычных глэмпинг локаций в Украине", image: "/glamping.webp", category: "Глэмпинг", link: "/blog/glampingGuide" },
      { title: "Пансионаты/Санатории с лечебными программами", content: "Как выбрать пансионат с максимальной пользой для здоровья", image: "/pansionat.webp", category: "Пансионаты/Санатории", link: "/blog/sanatoriumGuide" },
      { title: "Коттеджные городки для больших компаний", content: "Преимущества аренды целого комплекса для семейных праздников", image: "/kotedzi.webp", category: "Коттеджи", link: "/blog/cottageComplexGuide" },
      { title: "Коворкинг - рабочие пространства", content: "Идеальные условия для digital-кочевников и фрилансеров", image: "/kavorking.webp", category: "Коворкинги", link: "/blog/coworkingGuide" },
      { title: "Автокемпинги для путешественников", content: "Лучшие места для автотуристов по всей Украине", image: "/avtokemping.webp", category: "Автокемпинг", link: "/blog/autocampingGuide" }
    ]
  }
};

export default function BlogForHome() {
  const { currentLanguage } = useLanguage();
  const content = BLOG_CONTENT[currentLanguage];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" component="h2" sx={{ 
        mb: 6, 
        fontWeight: 700,
        textAlign: 'center',
        color: 'text.primary',
        fontSize: { xs: '2rem', md: '2.5rem' }
      }}>
        {content.title}
      </Typography>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 4,
        mb: 8
      }}>
        {content.posts.map((post, index) => (
          <Link key={index} href={post.link || '#'} passHref legacyBehavior style={{ textDecoration: 'none' }}>
            <Card elevation={2} sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              height: '100%',
              transition: 'all 0.3s ease',
              borderRadius: 2,
              cursor: 'pointer',
              '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 }
            }}>
              <Box sx={{ position: 'relative', height: 220, overflow: 'hidden', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  quality={75}
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  loading="lazy"
                />
              </Box>
              <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                <Chip 
                  label={post.category} 
                  size="small" 
                  sx={{ mb: 2, alignSelf: 'flex-start', bgcolor: 'primary.light', color: 'primary.contrastText', fontWeight: 600 }}
                />
                <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600, lineHeight: 1.3, minHeight: '3.5em' }}>
                  {post.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', flexGrow: 1 }}>
                  {post.content}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Box>
    </Container>
  );
}