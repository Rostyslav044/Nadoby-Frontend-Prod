




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