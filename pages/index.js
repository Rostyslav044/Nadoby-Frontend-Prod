


// // pages/index.js - С ДОБАВЛЕННОЙ ИКОНКОЙ фавикон и канонической ссылкой

// 'use client';

// import { useEffect, useState } from "react";
// import { Provider } from "react-redux";
// import { store } from "@/app/store";
// import { useLanguage } from "@/app/LanguageContext";
// import { LanguageProvider } from "@/app/LanguageContext";
// import { SessionProvider } from "next-auth/react";
// import Header from "@/app/components/Header";
// import Search from "@/app/components/Search";
// import Apartments from "@/app/components/Apartments";
// // import Blog from "./blog";
// import Footer from  "@/app/components/Footer";
// import BlogForHome from "@/app/components/BlogForHome";
// import Head from "next/head";
// import AuthLogic from "@/app/components/AuthLogic";
// import { LoadingIndicator } from "@/app/components/LoadingIndicator";
// import { useRouter } from "next/router";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// const TRANSLATIONS = {
//   ua: {
//     metaTitle: "Квартири подобово | Оренда квартир на добу | NaDoby",
//     metaDescription: "Зніміть квартиру подобово в будь-якому місті. Понад 1000 варіантів: студії, 1-кімнатні, люкс. Ціни від 500 грн/добу. Бронюйте онлайн!",
//     metaKeywords: "квартири подобово, оренда квартир на добу, зняти квартиру на ніч, квартира на добу, подобова оренда",
//     loading: "Завантаження...",
//   },
//   ru: {
//     metaTitle: "Квартиры посуточно | Аренда квартир на сутки | NaDoby",
//     metaDescription: "Снимите квартиру посуточно в любом городе. Более 1000 вариантов: студии, 1-комнатные, люкс. Цены от 500 грн/сутки. Бронируйте онлайн!",
//     metaKeywords: "квартиры посуточно, аренда квартир на сутки, снять квартиру на ночь, квартира на сутки, посуточная аренда",
//     loading: "Загрузка...",
//   },
// };

// function HomeContent() {
//   const { currentLanguage } = useLanguage();
//   const t = TRANSLATIONS[currentLanguage];
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
  
//   // Базовый URL для канонической ссылки
//   const canonicalUrl = `https://nadoby.com.ua${router.asPath === '/' ? '' : router.asPath}`;

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 500);
    
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <>
//         <Head>
//           <title>Квартиры посуточно | Аренда квартир на сутки | NaDoby</title>
//           <meta name="description" content="Снимите квартиру посуточно в любом городе. Более 1000 вариантов: студии, 1-комнатные, люкс. Цены от 500 грн/сутки. Бронируйте онлайн!" />
//           <meta name="keywords" content="квартиры посуточно, аренда квартир на сутки, снять квартиру на ночь, квартира на сутки, посуточная аренда" />
//           <link rel="icon" href="/logo3.ico" />
//           <link rel="canonical" href={canonicalUrl} />
//         </Head>
//         <LoadingIndicator message={t.loading} />
//       </>
//     );
//   }

//   return (
//     <>
//       <Head>
//         {/* Основные мета-теги */}
//         <title>{t.metaTitle}</title>
//         <meta name="description" content={t.metaDescription} />
//         <meta name="keywords" content={t.metaKeywords} />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
        
//         {/* Роботы - разрешаем индексацию */}
//         <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
//         <meta name="googlebot" content="index, follow" />
        
//         {/* Каноническая ссылка - ОЧЕНЬ ВАЖНО для SEO */}
//         <link rel="canonical" href={canonicalUrl} />
        
//         {/* Favicon */}
//         <link rel="icon" href="/logo3.ico" />
//         <link rel="shortcut icon" href="/logo3.ico" />
//         <link rel="apple-touch-icon" href="/logo3.ico" />
        
//         {/* Open Graph для соцсетей */}
//         <meta property="og:title" content={t.metaTitle} />
//         <meta property="og:description" content={t.metaDescription} />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={canonicalUrl} />
//         <meta property="og:site_name" content="NaDoby" />
//         <meta property="og:image" content="https://nadoby.com.ua/logo3.ico" />
//         <meta property="og:locale" content={currentLanguage === 'ua' ? 'uk_UA' : 'ru_RU'} />
        
//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary" />
//         <meta name="twitter:title" content={t.metaTitle} />
//         <meta name="twitter:description" content={t.metaDescription} />
        
//         {/* Hreflang для мультиязычности */}
//         <link rel="alternate" hrefLang="uk" href="https://nadoby.com.ua" />
//         <link rel="alternate" hrefLang="ru" href="https://nadoby.com.ua/ru" />
//         <link rel="alternate" hrefLang="x-default" href="https://nadoby.com.ua" />
        
//         {/* Schema.org JSON-LD */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               "@context": "https://schema.org",
//               "@type": "WebSite",
//               "name": "NaDoby",
//               "url": "https://nadoby.com.ua",
//               "description": "Посуточная аренда квартир по всей Украине",
//               "inLanguage": currentLanguage === 'ua' ? "uk" : "ru",
//               "potentialAction": {
//                 "@type": "SearchAction",
//                 "target": {
//                   "@type": "EntryPoint",
//                   "urlTemplate": "https://nadoby.com.ua/search?city={city}"
//                 },
//                 "query-input": "required name=city"
//               }
//             })
//           }}
//         />
        
//         {/* Дополнительный Schema.org для квартир */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               "@context": "https://schema.org",
//               "@type": "Product",
//               "name": "Аренда квартир посуточно",
//               "description": "Уютные квартиры для посуточной аренды",
//               "offers": {
//                 "@type": "AggregateOffer",
//                 "priceCurrency": "UAH",
//                 "lowPrice": "500",
//                 "highPrice": "5000",
//                 "offerCount": "1000"
//               }
//             })
//           }}
//         />
//       </Head>
      
//       <AuthLogic /> 
//       <Header />
//       <Search />
      
//       <main style={{ padding: "0px" }}>
//         {/* Скрытый текст для SEO (не виден пользователям, но виден поисковикам) */}
//         <div style={{ display: 'none' }} aria-hidden="true">
//           <h1>Квартиры посуточно | NaDoby</h1>
//           <p>
//             Снять квартиру посуточно — это удобно, выгодно и просто. 
//             На нашем сайте представлены лучшие предложения посуточной аренды квартир 
//             во всех городах Украины. Выбирайте из более чем 1000 объявлений.
//           </p>
//         </div>
        
//         <Apartments />
//         {/* <Blog /> */}
//         <BlogForHome />
//         <Footer/>
//       </main>
//     </>
//   );
// }

// export async function getStaticProps() {
//   return {
//     props: {
//       generatedAt: new Date().toISOString(),
//     },
//     revalidate: 86400, // 24 часа
//   };
// }

// export default function HomePage() {
//   return (
//     <SessionProvider>
//       <Provider store={store}>
//         <LanguageProvider>
//           <HomeContent />
//         </LanguageProvider>
//       </Provider>
//     </SessionProvider>
//   );
// }


// 'use client';

// import { useEffect, useState, lazy, Suspense } from "react";
// import { Provider } from "react-redux";
// import { store } from "@/app/store";
// import { useLanguage } from "@/app/LanguageContext";
// import { LanguageProvider } from "@/app/LanguageContext";
// import { SessionProvider } from "next-auth/react";
// import Header from "@/app/components/Header";
// import Search from "@/app/components/Search";
// import Apartments from "@/app/components/Apartments";
// import Footer from "@/app/components/Footer";
// import AuthLogic from "@/app/components/AuthLogic";
// import { LoadingIndicator } from "@/app/components/LoadingIndicator";
// import Head from "next/head";
// import Hero from "@/app/components/Hero";
// import { Box } from '@mui/material';

// // Ленивая загрузка блога
// const BlogForHome = lazy(() => import("@/app/components/BlogForHome"));

// const TRANSLATIONS = {
//   ua: {
//     metaTitle: "Подобова оренда житла в Україні без посередників | NaDoby",
//     metaDescription: "Зніміть квартиру, готель, будинок подобово в будь-якому місті України. Понад 1000 варіантів. Ціни від 500 грн/добу. Бронюйте онлайн!",
//     metaKeywords: "оренда житла, квартири подобово, оренда квартир",
//     loading: "Завантаження...",
//   },
//   ru: {
//     metaTitle: "Посуточная аренда жилья в Украине без посредников | NaDoby",
//     metaDescription: "Снимите квартиру, отель, дом посуточно в любом городе Украины. Более 1000 вариантов. Цены от 500 грн/сутки. Бронируйте онлайн!",
//     metaKeywords: "аренда жилья, квартиры посуточно, аренда квартир",
//     loading: "Загрузка...",
//   },
// };

// function HomeContent() {
//   const { currentLanguage } = useLanguage();
//   const t = TRANSLATIONS[currentLanguage];
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 100);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <>
//         <Head>
//           <title>{t.metaTitle}</title>
//           <meta name="description" content={t.metaDescription} />
//           <link rel="icon" href="/logo3.ico" />
//         </Head>
//         <LoadingIndicator message={t.loading} />
//       </>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>{t.metaTitle}</title>
//         <meta name="description" content={t.metaDescription} />
//         <meta name="keywords" content={t.metaKeywords} />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <meta name="robots" content="index, follow" />
//         <link rel="canonical" href="https://nadoby.com.ua" />
//         <link rel="icon" href="/logo3.ico" />
//         <link rel="shortcut icon" href="/logo3.ico" />
        
//         <meta property="og:title" content={t.metaTitle} />
//         <meta property="og:description" content={t.metaDescription} />
//         <meta property="og:type" content="website" />
//         <meta property="og:site_name" content="NaDoby" />
        
//         <link rel="alternate" hrefLang="uk" href="https://nadoby.com.ua" />
//         <link rel="alternate" hrefLang="ru" href="https://nadoby.com.ua/ru" />
        
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               "@context": "https://schema.org",
//               "@type": "WebSite",
//               "name": "NaDoby",
//               "url": "https://nadoby.com.ua",
//               "description": t.metaDescription
//             })
//           }}
//         />
//       </Head>
      
//       <AuthLogic /> 
//       <Header />

//       {/* <HeroImage /> */}
//       <Search />
//       <Box sx={{ marginTop: '100px' }}></Box>
      
//       <main style={{ padding: 0, margin: 0 }}>
//         {/* ✅ h1 УБРАЛ — больше нет */}
        
//         <Apartments />
//         <Hero />
        
//         <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Завантаження...</div>}>
//           <BlogForHome />
//         </Suspense>
        
        
//         <Footer />
//       </main>
//     </>
//   );
// }

// export default function HomePage() {
//   return (
//     <SessionProvider>
//       <Provider store={store}>
//         <LanguageProvider>
//           <HomeContent />
//         </LanguageProvider>
//       </Provider>
//     </SessionProvider>
//   );
// }




'use client';

import { useEffect, useState, lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { useLanguage } from "@/app/LanguageContext";
import { LanguageProvider } from "@/app/LanguageContext";
import { SessionProvider } from "next-auth/react";
import Header from "@/app/components/Header";
import Search from "@/app/components/Search";
import Apartments from "@/app/components/Apartments";
import Footer from "@/app/components/Footer";
import AuthLogic from "@/app/components/AuthLogic";
import { LoadingIndicator } from "@/app/components/LoadingIndicator";
import Head from "next/head";
import Hero from "@/app/components/Hero";
import { Box } from '@mui/material';

// import HeroImage from "@/app/components/HeroImage";

// Ленивая загрузка блога
const BlogForHome = lazy(() => import("@/app/components/BlogForHome"));

const TRANSLATIONS = {
  ua: {
    metaTitle: "Подобова оренда житла в Україні без посередників | NaDoby",
    metaDescription: "Зніміть квартиру, готель, будинок подобово в будь-якому місті України. Понад 1000 варіантів. Ціни від 500 грн/добу. Бронюйте онлайн!",
    metaKeywords: "оренда житла, квартири подобово, оренда квартир",
    loading: "Завантаження...",
  },
  ru: {
    metaTitle: "Посуточная аренда жилья в Украине без посредников | NaDoby",
    metaDescription: "Снимите квартиру, отель, дом посуточно в любом городе Украины. Более 1000 вариантов. Цены от 500 грн/сутки. Бронируйте онлайн!",
    metaKeywords: "аренда жилья, квартиры посуточно, аренда квартир",
    loading: "Загрузка...",
  },
};

function HomeContent() {
  const { currentLanguage } = useLanguage();
  const t = TRANSLATIONS[currentLanguage];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        <Head>
          <title>{t.metaTitle}</title>
          <meta name="description" content={t.metaDescription} />
          <link rel="icon" href="/logo3.ico" />
        </Head>
        <LoadingIndicator message={t.loading} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <meta name="keywords" content={t.metaKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://nadoby.com.ua" />
        <link rel="icon" href="/logo3.ico" />
        <link rel="shortcut icon" href="/logo3.ico" />
        
        <meta property="og:title" content={t.metaTitle} />
        <meta property="og:description" content={t.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="NaDoby" />
        
        <link rel="alternate" hrefLang="uk" href="https://nadoby.com.ua" />
        <link rel="alternate" hrefLang="ru" href="https://nadoby.com.ua/ru" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "NaDoby",
              "url": "https://nadoby.com.ua",
              "description": t.metaDescription
            })
          }}
        />
      </Head>
      
      <AuthLogic /> 
      <Header />
        {/* <HeroImage /> */}
        <Box sx={{ marginTop: '70px' }}></Box>
      <Search />
      <Box sx={{ marginTop: '110px' }}></Box>
      <main style={{ padding: 0, margin: 0 }}>
        
      
        <Apartments />
        <Hero />
        
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Завантаження...</div>}>
          <BlogForHome />
        </Suspense>
        
        
        <Footer />
      </main>
    </>
  );
}

export default function HomePage() {
  return (
    <SessionProvider>
      <Provider store={store}>
        <LanguageProvider>
          <HomeContent />
        </LanguageProvider>
      </Provider>
    </SessionProvider>
  );
}