// // app/components/Hero.js

// 'use client';

// import { useLanguage } from "@/app/LanguageContext";
// import { Box, Container, Typography, Grid, Paper } from '@mui/material';
// import Link from 'next/link';

// const HERO_CONTENT = {
//   ua: {
//     title: "Подобова оренда житла по всій Україні без посередників",
//     subtitle: "Квартири, готелі, готелі для тварин, хостели, будинки, сауни/бані, глемпінги, пансіонати/санаторії, котеджі для компаній, коворкінги, автокемпінги, бази відпочинку",
    
//     mainText: `NaDoby.com.ua — це платформа для подобової оренди житла в Україні. 
//     Ми працюємо без посередників, що дозволяє знімати житло за вигідними цінами. 
//     Ви можете орендувати квартиру подобово, зняти готель на ніч, орендувати будинок для відпочинку 
//     або знайти ідеальне місце для проведення свята. Ми пропонуємо різноманітне житло з реальними фото 
//     та чесними цінами. Наша команда завжди готова допомогти вам з вибором та бронюванням. 
//     Обирайте NaDoby — обирайте зручність та комфорт!`,
    
//     categoriesTitle: "Що ви можете орендувати на NaDoby?",
//     categories: [
//       { name: "Квартири подобово", desc: "Студії, 1-кімнатні, 2-кімнатні, 3-кімнатні, елітне житло", link: "/blog/apartmentGuide" },
//       { name: "Готелі", desc: "Готелі, міні-готелі, хостели, апарт-готелі", link: "/blog/hotelGuide" },
//       { name: "Готелі для тварин", desc: "Передержка собак, котів, догляд, ветеринарний контроль", link: "/blog/petHotelGuide" },
//       { name: "Хостели", desc: "Недороге житло для студентів, туристів, волонтерів", link: "/blog/hostelGuide" },
//       { name: "Будинки", desc: "Приватні будинки, котеджі, дачі, садиби", link: "/blog/houseGuide" },
//       { name: "Сауни/Бані", desc: "Сауни з басейном, фінські сауни, хаммам, чан", link: "/blog/saunaGuide" },
//       { name: "Глемпінги", desc: "Нестандартне житло серед природи, куполи, юрти, бульбашки", link: "/blog/glampingGuide" },
//       { name: "Пансіонати/Санаторії", desc: "Лікувальні заклади, відпочинок з оздоровленням", link: "/blog/sanatoriumGuide" },
//       { name: "Котеджі для компаній", desc: "Великі будинки для святкувань, корпоративів", link: "/blog/cottageComplexGuide" },
//       { name: "Коворкінги", desc: "Робочі простори, переговорні кімнати, офіси на день", link: "/blog/coworkingGuide" },
//       { name: "Автокемпінги", desc: "Майданчики для кемперів, стоянки з комунікаціями", link: "/blog/autocampingGuide" },
//       { name: "Бази відпочинку", desc: "Туристичні бази, відпочинок на природі, риболовля", link: "/blog/campGuide" }
   
//     ],
    
//     advantagesTitle: "Переваги оренди через NaDoby",
//     advantages: [
//       { title: "Відсутність посередників", desc: "Ви спілкуєтесь напряму з власником. Жодних додаткових комісій чи націнок." },
//       { title: "Чесні ціни", desc: "Ми перевіряємо кожне оголошення, щоб ціни відповідали реальності. Жодних прихованих платежів." },
//       { title: "Швидке бронювання", desc: "Бронюйте житло за кілька хвилин без зайвої бюрократії та довгих узгоджень." }
//     ],
    
//     tipsTitle: "Корисні поради для безпечної оренди житла",
//     tips: [
//       "Перевіряйте власника: Google, GetContact (теги 'оренда', 'обман'), соцмережі",
//       "Залог: 30-100% від добової вартості - це нормально",
//       "Повну суму за оренду платіть тільки на місці, після огляду об'єкта та отримання ключів",
//       // "Перевіряйте фото квартири через Google Lens",
//       "Просіть документи власника (паспорт або водійське посвідчення)",
//       "Договір обов'язковий з усіма умовами",
//       "Якщо сумніваєтесь — відмовляйтесь!"
//     ],
    
//     forWhomTitle: "Хто вже користується NaDoby?",
//     forWhom: [
//       "🏢 Бізнес-мандрівники — оренда квартир для відряджень",
//       "👨‍👩‍👧‍👦 Сім'ї з дітьми — комфортне житло з усіма зручностями",
//       "🎉 Компанії друзів — великі будинки для святкувань",
//       "💑 Закохані пари — романтичні апартаменти на ніч",
//       "🌍 Туристи — вигідне житло в центрі міста",
//       "🐾 Власники тварин — готелі для домашніх улюбленців",
//     ],
    
//     seoFooterTitle: "NaDoby.com.ua — ваш надійний помічник у пошуку житла",
//     seoFooterText: `Сайт NaDoby.com.ua створений для того, щоб зробити процес пошуку та оренди житла максимально простим, швидким та безпечним. 
//     Ми постійно оновлюємо нашу базу оголошень, додаємо нові міста та категорії житла. 
//     Завдяки прямому спілкуванню з власниками ви економите час та гроші. 
//     Наша ціль — зробити ринок оренди житла в Україні прозорим та доступним для кожного. 
//     Приєднуйтесь до тисяч задоволених клієнтів, які вже обрали NaDoby!`
//   },
//   ru: {
//     title: "Посуточная аренда жилья по всей Украине без посредников",
//     subtitle: "Квартиры, отели, отели для животных, хостелы, дома, сауны/бани, глэмпинги, пансионаты/санатории, коттеджи для компаний, коворкинги, автокемпинги, базы отдыха",
    
//     mainText: `NaDoby.com.ua — это платформа для посуточной аренды жилья в Украине. 
//     Мы работаем без посредников, что позволяет снимать жилье по выгодным ценам. 
//     Вы можете арендовать квартиру посуточно, снять отель на ночь, арендовать дом для отдыха 
//     или найти идеальное место для проведения праздника. Мы предлагаем разнообразное жилье с реальными фото 
//     и честными ценами. Наша команда всегда готова помочь вам с выбором и бронированием. 
//     Выбирайте NaDoby — выбирайте удобство и комфорт!`,
    
//     categoriesTitle: "Что вы можете арендовать на NaDoby?",
//     categories: [
//       { name: "Квартиры посуточно", desc: "Студии, 1-комнатные, 2-комнатные, 3-комнатные, элитное жилье", link:'/blog/apartmentGuide' },
//       { name: "Отели", desc: "Отели, мини-отели, хостелы, апарт-отели", url: '/blog/hotelGuide' },
//       { name: "Отели для животных", desc: "Передержка собак, кошек, уход, ветеринарный контроль", link: "/pet-hotels" },
//       { name: "Хостелы", desc: "Недорогое жилье для студентов, туристов, волонтеров", link: "/hostels" },
//       { name: "Дома", desc: "Частные дома, коттеджи, дачи, усадьбы", link: "/houses" },
//       { name: "Сауны/Бани", desc: "Сауны с бассейном, финские сауны, хаммам, чан", link: "/saunas" },
//       { name: "Глэмпинги", desc: "Нестандартное жилье среди природы, купола, юрты, пузырьки", link: "/glamping" },
//       { name: "Пансионаты/Санатории", desc: "Лечебные заведения, отдых с оздоровлением", link: "/boarding-houses" },
//       { name: "Коттеджи для компаний", desc: "Большие дома для празднований, корпоративов", link: "/cottages" },
//       { name: "Коворкинги", desc: "Рабочие пространства, переговорные комнаты, офисы на день", link: "/coworking" },
//       { name: "Автокемпинги", desc: "Площадки для кемперов, стоянки с коммуникациями", link: "/autocamping" },
//       { name: "Базы отдыха", desc: "Туристические базы, отдых на природе, рыбалка", link: "/resorts" }
//     ],
    
//     advantagesTitle: "Преимущества аренды через NaDoby",
//     advantages: [
//       { title: "Отсутствие посредников", desc: "Вы общаетесь напрямую с владельцем. Никаких дополнительных комиссий и наценок." },
//       { title: "Честные цены", desc: "Мы проверяем каждое объявление, чтобы цены соответствовали реальности. Никаких скрытых платежей." },
//       { title: "Быстрое бронирование", desc: "Бронируйте жилье за несколько минут без лишней бюрократии и долгих согласований." }
//     ],
    
//     tipsTitle: "Полезные советы для безопасной аренды жилья",
//     tips: [
//       "Проверяйте владельца: Google, GetContact (теги 'аренда', 'обман'), соцсети",
//       "Залог: 30-100% от суточной стоимости - это нормально",
//       "Полную сумму за аренду платите только на месте, после осмотра объекта и получения ключей",
//       // "Проверяйте фото квартиры через Google Lens",
//       "Просите документы владельца (паспорт или водительское удостоверение)",
//       "Договор обязателен со всеми условиями",
//       "Если сомневаетесь — отказывайтесь!"
//     ],
    
//     forWhomTitle: "Кто уже пользуется NaDoby?",
//     forWhom: [
//       "🏢 Бизнес-путешественники — аренда квартир для командировок",
//       "👨‍👩‍👧‍👦 Семьи с детьми — комфортное жилье со всеми удобствами",
//       "🎉 Компании друзей — большие дома для празднований",
//       "💑 Влюбленные пары — романтические апартаменты на ночь",
//       "🌍 Туристы — выгодное жилье в центре города",
//       "🐾 Владельцы животных — отели для домашних питомцев",
//     ],
    
//     seoFooterTitle: "NaDoby.com.ua — ваш надежный помощник в поиске жилья",
//     seoFooterText: `Сайт NaDoby.com.ua создан для того, чтобы сделать процесс поиска и аренды жилья максимально простым, быстрым и безопасным. 
//     Мы постоянно обновляем нашу базу объявлений, добавляем новые города и категории жилья. 
//     Благодаря прямому общению с владельцами вы экономите время и деньги. 
//     Наша цель — сделать рынок аренды жилья в Украине прозрачным и доступным для каждого. 
//     Присоединяйтесь к тысячам довольных клиентов, которые уже выбрали NaDoby!`
//   }
// };

// export default function Hero() {
//   const { currentLanguage } = useLanguage();
//   const content = HERO_CONTENT[currentLanguage];

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "WebPage",
//             "name": content.title,
//             "description": content.mainText.substring(0, 200),
//             "url": "https://nadoby.com.ua"
//           })
//         }}
//       />

//       {/* Основна секція */}
//       <Box sx={{ 
//         bgcolor: '#ffffff',
//         pt: { xs: 4, md: 6 },
//         pb: { xs: 6, md: 8 }
//       }}>
//         <Container maxWidth="lg">
//           <Typography
//             variant="h1"
//             component="h1"
//             sx={{
//               fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
//               fontWeight: 700,
//               mb: 3,
//               lineHeight: 1.3,
//               textAlign: 'center',
//               color: '#1a1a2e'
//             }}
//           >
//             {content.title}
//           </Typography>

//           <Typography
//             variant="h5"
//             component="h2"
//             sx={{
//               fontSize: { xs: '0.9rem', md: '1.1rem' },
//               fontWeight: 400,
//               mb: 4,
//               textAlign: 'center',
//               color: '#666',
//               lineHeight: 1.5
//             }}
//           >
//             {content.subtitle}
//           </Typography>

//           <Paper
//             elevation={0}
//             sx={{
//               p: { xs: 3, md: 5 },
//               borderRadius: 4,
//               border: '1px solid #e0e0e0',
//               bgcolor: '#fafafa',
//               boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
//             }}
//           >
//             <Typography
//               variant="body1"
//               sx={{
//                 lineHeight: 1.8,
//                 fontSize: { xs: '0.95rem', md: '1.05rem' },
//                 color: '#333',
//                 textAlign: 'justify'
//               }}
//             >
//               {content.mainText}
//             </Typography>
//           </Paper>
//         </Container>
//       </Box>

//       {/* Категорії */}
//       <Container maxWidth="lg" sx={{ py: 8 }} id="categories">
//         <Typography
//           variant="h2"
//           component="h2"
//           sx={{
//             fontSize: { xs: '1.8rem', md: '2.2rem' },
//             fontWeight: 700,
//             mb: 4,
//             textAlign: 'center',
//             color: '#1a1a2e'
//           }}
//         >
//           {content.categoriesTitle}
//         </Typography>

//         <Grid container spacing={3}>
//           {content.categories.map((cat, idx) => (
//             <Grid item xs={12} sm={6} md={4} key={idx}>
//               <Paper sx={{ 
//                 p: 3, 
//                 height: '100%', 
//                 transition: '0.3s', 
//                 borderRadius: 3,
//                 '&:hover': { 
//                   transform: 'translateY(-4px)', 
//                   boxShadow: 6,
//                   borderColor: '#1976d2'
//                 },
//                 border: '1px solid #eee'
//               }}>
//                 <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
//                   <Link href={cat.link} style={{ textDecoration: 'none', color: '#1976d2' }}>
//                     {cat.name}
//                   </Link>
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {cat.desc}
//                 </Typography>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* Переваги */}
//       <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
//         <Container maxWidth="lg">
//           <Typography
//             variant="h2"
//             component="h2"
//             sx={{
//               fontSize: { xs: '1.8rem', md: '2.2rem' },
//               fontWeight: 700,
//               mb: 4,
//               textAlign: 'center',
//               color: '#1a1a2e'
//             }}
//           >
//             {content.advantagesTitle}
//           </Typography>

//           <Grid container spacing={3}>
//             {content.advantages.map((adv, idx) => (
//               <Grid item xs={12} md={4} key={idx}>
//                 <Paper sx={{ p: 4, height: '100%', borderRadius: 3, textAlign: 'center' }}>
//                   <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1976d2', mb: 2 }}>
//                     {adv.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {adv.desc}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Для кого */}
//       <Container maxWidth="lg" sx={{ py: 8 }}>
//         <Typography
//           variant="h2"
//           component="h2"
//           sx={{
//             fontSize: { xs: '1.8rem', md: '2.2rem' },
//             fontWeight: 700,
//             mb: 4,
//             textAlign: 'center',
//             color: '#1a1a2e'
//           }}
//         >
//           {content.forWhomTitle}
//         </Typography>

//         <Grid container spacing={2}>
//           {content.forWhom.map((item, idx) => (
//             <Grid item xs={12} sm={6} md={4} key={idx}>
//               <Typography variant="body1" sx={{ py: 1, color: '#555' }}>
//                 {item}
//               </Typography>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* Поради */}
//       <Box sx={{ bgcolor: '#fff3e0', py: 8 }}>
//         <Container maxWidth="lg">
//           <Typography
//             variant="h2"
//             component="h2"
//             sx={{
//               fontSize: { xs: '1.8rem', md: '2.2rem' },
//               fontWeight: 700,
//               mb: 4,
//               textAlign: 'center',
//               color: '#1a1a2e'
//             }}
//           >
//             {content.tipsTitle}
//           </Typography>

//           <Grid container spacing={2}>
//             {content.tips.map((tip, idx) => (
//               <Grid item xs={12} md={6} key={idx}>
//                 <Paper sx={{ 
//                   p: 2.5, 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   gap: 2, 
//                   borderRadius: 2,
//                   bgcolor: '#ffffff',
//                   boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
//                 }}>
//                   <span style={{ fontSize: '1.5rem' }}>⚠️</span>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                     {tip}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* SEO текст */}
//       <Container maxWidth="lg" sx={{ py: 6 }}>
//         <Typography
//           variant="h3"
//           component="h3"
//           sx={{
//             fontSize: '1.3rem',
//             fontWeight: 700,
//             mb: 2,
//             textAlign: 'center',
//             color: '#1a1a2e'
//           }}
//         >
//           {content.seoFooterTitle}
//         </Typography>
//         <Typography
//           variant="body2"
//           color="text.secondary"
//           sx={{ lineHeight: 1.8, textAlign: 'center' }}
//         >
//           {content.seoFooterText}
//         </Typography>
//       </Container>
//     </>
//   );
// }




// app/components/Hero.js

'use client';

import { useLanguage } from "@/app/LanguageContext";
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const HERO_CONTENT = {
  ua: {
    title: "Подобова оренда житла по всій Україні без посередників",
    subtitle: "Квартири, готелі, готелі для тварин, хостели, будинки, сауни/бані, глемпінги, пансіонати/санаторії, котеджі для компаній, коворкінги, автокемпінги, бази відпочинку",
    
    mainText: `NaDoby.com.ua — це платформа для подобової оренди житла в Україні. 
    Ми працюємо без посередників, що дозволяє знімати житло за вигідними цінами. 
    Ви можете орендувати квартиру подобово, зняти готель на ніч, орендувати будинок для відпочинку 
    або знайти ідеальне місце для проведення свята. Ми пропонуємо різноманітне житло з реальними фото 
    та чесними цінами. Наша команда завжди готова допомогти вам з вибором та бронюванням. 
    Обирайте NaDoby — обирайте зручність та комфорт!`,
    
    categoriesTitle: "Що ви можете орендувати на NaDoby?",
    categories: [
      { name: "Квартири подобово", desc: "Студії, 1-кімнатні, 2-кімнатні, 3-кімнатні, елітне житло", link: "/blog/apartmentGuide" },
      { name: "Готелі", desc: "Готелі, міні-готелі, хостели, апарт-готелі", link: "/blog/hotelGuide" },
      { name: "Готелі для тварин", desc: "Передержка собак, котів, догляд, ветеринарний контроль", link: "/blog/petHotelGuide" },
      { name: "Хостели", desc: "Недороге житло для студентів, туристів, волонтерів", link: "/blog/hostelGuide" },
      { name: "Будинки", desc: "Приватні будинки, котеджі, дачі, садиби", link: "/blog/houseGuide" },
      { name: "Сауни/Бані", desc: "Сауни з басейном, фінські сауни, хаммам, чан", link: "/blog/saunaGuide" },
      { name: "Глемпінги", desc: "Нестандартне житло серед природи, куполи, юрти, бульбашки", link: "/blog/glampingGuide" },
      { name: "Пансіонати/Санаторії", desc: "Лікувальні заклади, відпочинок з оздоровленням", link: "/blog/sanatoriumGuide" },
      { name: "Котеджі для компаній", desc: "Великі будинки для святкувань, корпоративів", link: "/blog/cottageComplexGuide" },
      { name: "Коворкінги", desc: "Робочі простори, переговорні кімнати, офіси на день", link: "/blog/coworkingGuide" },
      { name: "Автокемпінги", desc: "Майданчики для кемперів, стоянки з комунікаціями", link: "/blog/autocampingGuide" },
      { name: "Бази відпочинку", desc: "Туристичні бази, відпочинок на природі, риболовля", link: "/blog/campGuide" }
    ],
    
    advantagesTitle: "Переваги оренди через NaDoby",
    advantages: [
      { title: "Відсутність посередників", desc: "Ви спілкуєтесь напряму з власником. Жодних додаткових комісій чи націнок." },
      { title: "Чесні ціни", desc: "Ми перевіряємо кожне оголошення, щоб ціни відповідали реальності. Жодних прихованих платежів." },
      { title: "Швидке бронювання", desc: "Бронюйте житло за кілька хвилин без зайвої бюрократії та довгих узгоджень." }
    ],
    
    tipsTitle: "Корисні поради для безпечної оренди житла",
    tips: [
      "Перевіряйте власника: Google, GetContact (теги 'оренда', 'обман'), соцмережі",
      "Залог: 30-100% від добової вартості - це нормально",
      "Повну суму за оренду платіть тільки на місці, після огляду об'єкта та отримання ключів",
      "Просіть документи власника (паспорт або водійське посвідчення)",
      "Договір обов'язковий з усіма умовами",
      "Якщо сумніваєтесь — відмовляйтесь!"
    ],
    
    forWhomTitle: "Хто вже користується NaDoby?",
    forWhom: [
      "🏢 Бізнес-мандрівники — оренда квартир для відряджень",
      "👨‍👩‍👧‍👦 Сім'ї з дітьми — комфортне житло з усіма зручностями",
      "🎉 Компанії друзів — великі будинки для святкувань",
      "💑 Закохані пари — романтичні апартаменти на ніч",
      "🌍 Туристи — вигідне житло в центрі міста",
      "🐾 Власники тварин — готелі для домашніх улюбленців"
    ],
    
    seoFooterTitle: "NaDoby.com.ua — ваш надійний помічник у пошуку житла",
    seoFooterText: `Сайт NaDoby.com.ua створений для того, щоб зробити процес пошуку та оренди житла максимально простим, швидким та безпечним. 
    Ми постійно оновлюємо нашу базу оголошень, додаємо нові міста та категорії житла. 
    Завдяки прямому спілкуванню з власниками ви економите час та гроші. 
    Наша ціль — зробити ринок оренди житла в Україні прозорим та доступним для кожного. 
    Приєднуйтесь до тисяч задоволених клієнтів, які вже обрали NaDoby!`
  },
  ru: {
    title: "Посуточная аренда жилья по всей Украине без посредников",
    subtitle: "Квартиры, отели, отели для животных, хостелы, дома, сауны/бани, глэмпинги, пансионаты/санатории, коттеджи для компаний, коворкинги, автокемпинги, базы отдыха",
    
    mainText: `NaDoby.com.ua — это платформа для посуточной аренды жилья в Украине. 
    Мы работаем без посредников, что позволяет снимать жилье по выгодным ценам. 
    Вы можете арендовать квартиру посуточно, снять отель на ночь, арендовать дом для отдыха 
    или найти идеальное место для проведения праздника. Мы предлагаем разнообразное жилье с реальными фото 
    и честными ценами. Наша команда всегда готова помочь вам с выбором и бронированием. 
    Выбирайте NaDoby — выбирайте удобство и комфорт!`,
    
    categoriesTitle: "Что вы можете арендовать на NaDoby?",
    categories: [
      { name: "Квартиры посуточно", desc: "Студии, 1-комнатные, 2-комнатные, 3-комнатные, элитное жилье", link: "/blog/apartmentGuide" },
      { name: "Отели", desc: "Отели, мини-отели, хостелы, апарт-отели", link: "/blog/hotelGuide" },
      { name: "Отели для животных", desc: "Передержка собак, кошек, уход, ветеринарный контроль", link: "/blog/petHotelGuide" },
      { name: "Хостелы", desc: "Недорогое жилье для студентов, туристов, волонтеров", link: "/blog/hostelGuide" },
      { name: "Дома", desc: "Частные дома, коттеджи, дачи, усадьбы", link: "/blog/houseGuide" },
      { name: "Сауны/Бани", desc: "Сауны с бассейном, финские сауны, хаммам, чан", link: "/blog/saunaGuide" },
      { name: "Глэмпинги", desc: "Нестандартное жилье среди природы, купола, юрты, пузырьки", link: "/blog/glampingGuide" },
      { name: "Пансионаты/Санатории", desc: "Лечебные заведения, отдых с оздоровлением", link: "/blog/sanatoriumGuide" },
      { name: "Коттеджи для компаний", desc: "Большие дома для празднований, корпоративов", link: "/blog/cottageComplexGuide" },
      { name: "Коворкинги", desc: "Рабочие пространства, переговорные комнаты, офисы на день", link: "/blog/coworkingGuide" },
      { name: "Автокемпинги", desc: "Площадки для кемперов, стоянки с коммуникациями", link: "/blog/autocampingGuide" },
      { name: "Базы отдыха", desc: "Туристические базы, отдых на природе, рыбалка", link: "/blog/campGuide" }
    ],
    
    advantagesTitle: "Преимущества аренды через NaDoby",
    advantages: [
      { title: "Отсутствие посредников", desc: "Вы общаетесь напрямую с владельцем. Никаких дополнительных комиссий и наценок." },
      { title: "Честные цены", desc: "Мы проверяем каждое объявление, чтобы цены соответствовали реальности. Никаких скрытых платежей." },
      { title: "Быстрое бронирование", desc: "Бронируйте жилье за несколько минут без лишней бюрократии и долгих согласований." }
    ],
    
    tipsTitle: "Полезные советы для безопасной аренды жилья",
    tips: [
      "Проверяйте владельца: Google, GetContact (теги 'аренда', 'обман'), соцсети",
      "Залог: 30-100% от суточной стоимости - это нормально",
      "Полную сумму за аренду платите только на месте, после осмотра объекта и получения ключей",
      "Просите документы владельца (паспорт или водительское удостоверение)",
      "Договор обязателен со всеми условиями",
      "Если сомневаетесь — отказывайтесь!"
    ],
    
    forWhomTitle: "Кто уже пользуется NaDoby?",
    forWhom: [
      "🏢 Бизнес-путешественники — аренда квартир для командировок",
      "👨‍👩‍👧‍👦 Семьи с детьми — комфортное жилье со всеми удобствами",
      "🎉 Компании друзей — большие дома для празднований",
      "💑 Влюбленные пары — романтические апартаменты на ночь",
      "🌍 Туристы — выгодное жилье в центре города",
      "🐾 Владельцы животных — отели для домашних питомцев"
    ],
    
    seoFooterTitle: "NaDoby.com.ua — ваш надежный помощник в поиске жилья",
    seoFooterText: `Сайт NaDoby.com.ua создан для того, чтобы сделать процесс поиска и аренды жилья максимально простым, быстрым и безопасным. 
    Мы постоянно обновляем нашу базу объявлений, добавляем новые города и категории жилья. 
    Благодаря прямому общению с владельцами вы экономите время и деньги. 
    Наша цель — сделать рынок аренды жилья в Украине прозрачным и доступным для каждого. 
    Присоединяйтесь к тысячам довольных клиентов, которые уже выбрали NaDoby!`
  }
};

export default function Hero() {
  const { currentLanguage } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Безопасное получение контента с fallback
  const content = HERO_CONTENT[currentLanguage] || HERO_CONTENT.ua;
  
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": content.title || "NaDoby - аренда жилья",
            "description": content.mainText ? content.mainText.substring(0, 200) : "Аренда жилья в Украине",
            "url": "https://nadoby.com.ua"
          })
        }}
      />

      {/* Основна секція */}
      <Box sx={{ 
        bgcolor: '#ffffff',
        pt: { xs: 4, md: 6 },
        pb: { xs: 6, md: 8 }
      }}>
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
              fontWeight: 700,
              mb: 3,
              lineHeight: 1.3,
              textAlign: 'center',
              color: '#1a1a2e'
            }}
          >
            {content.title}
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontSize: { xs: '0.9rem', md: '1.1rem' },
              fontWeight: 400,
              mb: 4,
              textAlign: 'center',
              color: '#666',
              lineHeight: 1.5
            }}
          >
            {content.subtitle}
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              border: '1px solid #e0e0e0',
              bgcolor: '#fafafa',
              boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
            }}
          >
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                color: '#333',
                textAlign: 'justify'
              }}
            >
              {content.mainText}
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* Категорії */}
      <Container maxWidth="lg" sx={{ py: 8 }} id="categories">
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            fontWeight: 700,
            mb: 4,
            textAlign: 'center',
            color: '#1a1a2e'
          }}
        >
          {content.categoriesTitle}
        </Typography>

        <Grid container spacing={3}>
          {content.categories && content.categories.map((cat, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Paper sx={{ 
                p: 3, 
                height: '100%', 
                transition: '0.3s', 
                borderRadius: 3,
                '&:hover': { 
                  transform: 'translateY(-4px)', 
                  boxShadow: 6,
                  borderColor: '#1976d2'
                },
                border: '1px solid #eee'
              }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                  <Link href={cat.link || '/'} style={{ textDecoration: 'none', color: '#1976d2' }}>
                    {cat.name}
                  </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cat.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Переваги */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              fontWeight: 700,
              mb: 4,
              textAlign: 'center',
              color: '#1a1a2e'
            }}
          >
            {content.advantagesTitle}
          </Typography>

          <Grid container spacing={3}>
            {content.advantages && content.advantages.map((adv, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Paper sx={{ p: 4, height: '100%', borderRadius: 3, textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1976d2', mb: 2 }}>
                    {adv.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {adv.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Для кого */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            fontWeight: 700,
            mb: 4,
            textAlign: 'center',
            color: '#1a1a2e'
          }}
        >
          {content.forWhomTitle}
        </Typography>

        <Grid container spacing={2}>
          {content.forWhom && content.forWhom.map((item, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Typography variant="body1" sx={{ py: 1, color: '#555' }}>
                {item}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Поради */}
      <Box sx={{ bgcolor: '#fff3e0', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              fontWeight: 700,
              mb: 4,
              textAlign: 'center',
              color: '#1a1a2e'
            }}
          >
            {content.tipsTitle}
          </Typography>

          <Grid container spacing={2}>
            {content.tips && content.tips.map((tip, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Paper sx={{ 
                  p: 2.5, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2, 
                  borderRadius: 2,
                  bgcolor: '#ffffff',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {tip}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* SEO текст */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h3"
          component="h3"
          sx={{
            fontSize: '1.3rem',
            fontWeight: 700,
            mb: 2,
            textAlign: 'center',
            color: '#1a1a2e'
          }}
        >
          {content.seoFooterTitle}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.8, textAlign: 'center' }}
        >
          {content.seoFooterText}
        </Typography>
      </Container>
    </>
  );
}