
 


'use client';
import { LanguageProvider } from "@/app/LanguageContext";
import Header from "@/app/components/Header";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import Apartments from "@/app/components/Apartments";
import { useEffect, useState } from "react";
import Head from 'next/head';
import Footer from "@/app/components/Footer";

export default function MyListings() {
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    const userProfile = localStorage.getItem('user_profile');
    if (userProfile) {
      setProfile(JSON.parse(userProfile));
    }
  }, []);

  return (
    <>
      {/* <Head>
        <title>Мои объявления | NaDoby</title>
        <meta name="description" content="Управление вашими объявлениями об аренде жилья. Просмотр, редактирование и удаление ваших объектов недвижимости." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head> */}
      
      <Head>
  <title>Мои объявления | NaDoby</title>
  <meta name="description" content="Управление вашими объявлениями об аренде жилья. Просмотр, редактирование и удаление ваших объектов недвижимости." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="canonical" href="https://nadoby.com.ua/my-listings" />
</Head>
      <div>
        <Provider store={store}>
          <LanguageProvider>
            <Header />
            {/* <h1>Мои объявления</h1> */}
            {profile && (
              <Apartments 
                userId={profile._id} 
                showActions={true} // ← ВАЖНО: передаем showActions=true
              />
            )}  
            <Footer/>
          </LanguageProvider>
        </Provider>
      </div>
    </>
  );
}

// Функция для статической генерации - выполняется на сервере во время сборки
export async function getStaticProps() {
  return {
    props: {
      generatedAt: new Date().toISOString(),
    },
    // Регенерация страницы каждые 24 часа (опционально)
    revalidate: 86400, // 24 часа в секундах
  }
}