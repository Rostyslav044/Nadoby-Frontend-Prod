
 


// 'use client';
// import { LanguageProvider } from "@/app/LanguageContext";
// import Header from "@/app/components/Header";
// import { store } from "@/app/store";
// import { Provider } from "react-redux";
// import Apartments from "@/app/components/Apartments";
// import { useEffect, useState } from "react";
// import Head from 'next/head';
// import Footer from "@/app/components/Footer";

// export default function MyListings() {
//   const [profile, setProfile] = useState(null);
  
//   useEffect(() => {
//     const userProfile = localStorage.getItem('user_profile');
//     if (userProfile) {
//       setProfile(JSON.parse(userProfile));
//     }
//   }, []);

//   return (
//     <>
//       {/* <Head>
//         <title>Мои объявления | NaDoby</title>
//         <meta name="description" content="Управление вашими объявлениями об аренде жилья. Просмотр, редактирование и удаление ваших объектов недвижимости." />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head> */}
      
//       <Head>
//   <title>Мои объявления | NaDoby</title>
//   <meta name="description" content="Управление вашими объявлениями об аренде жилья. Просмотр, редактирование и удаление ваших объектов недвижимости." />
//   <meta name="viewport" content="width=device-width, initial-scale=1" />
//   <link rel="canonical" href="https://nadoby.com.ua/my-listings" />
// </Head>
//       <div>
//         <Provider store={store}>
//           <LanguageProvider>
//             <Header />
//             {/* <h1>Мои объявления</h1> */}
//             {profile && (
//               <Apartments 
//                 userId={profile._id} 
//                 showActions={true} // ← ВАЖНО: передаем showActions=true
//               />
//             )}  
//             <Footer/>
//           </LanguageProvider>
//         </Provider>
//       </div>
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


'use client';
import { LanguageProvider, useLanguage } from "@/app/LanguageContext";
import Header from "@/app/components/Header";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import Apartments from "@/app/components/Apartments";
import { useEffect, useState } from "react";
import Head from 'next/head';
import Footer from "@/app/components/Footer";

// Контент для різних мов
const CONTENT = {
  ua: {
    metaTitle: "Мої оголошення | NaDoby",
    metaDescription: "Керування вашими оголошеннями про оренду житла. Перегляд, редагування та видалення ваших об'єктів нерухомості.",
    pageTitle: "Мої оголошення",
  },
  ru: {
    metaTitle: "Мои объявления | NaDoby",
    metaDescription: "Управление вашими объявлениями об аренде жилья. Просмотр, редактирование и удаление ваших объектов недвижимости.",
    pageTitle: "Мои объявления",
  }
};

function PageContent() {
  const { currentLanguage } = useLanguage();
  const content = CONTENT[currentLanguage] || CONTENT.ua;
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Завантажуємо профіль з localStorage
    const userProfile = localStorage.getItem('user_profile');
    if (userProfile) {
      try {
        const parsedProfile = JSON.parse(userProfile);
        setProfile(parsedProfile);
      } catch (error) {
        console.error('Помилка парсингу профілю:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Показуємо індикатор завантаження, поки дані не завантажаться
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Завантаження...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://nadoby.com.ua/my-listings" />
      </Head>
      <div>
        <Provider store={store}>
          <LanguageProvider>
            <Header />
            {profile ? (
              <Apartments 
                userId={profile._id} 
                showActions={true}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p>Будь ласка, увійдіть у свій профіль, щоб переглянути оголошення.</p>
              </div>
            )}  
            <Footer/>
          </LanguageProvider>
        </Provider>
      </div>
    </>
  );
}

// Експортуємо сторінку без SSR
import dynamic from 'next/dynamic';
export default dynamic(() => Promise.resolve(PageContent), {
  ssr: false,
});