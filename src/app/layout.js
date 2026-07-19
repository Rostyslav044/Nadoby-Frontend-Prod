// import './globals.css';

// export async function generateMetadata({ params }) {
//   // Отримуємо шлях з params або з headers
//   const path = params?.slug || '';
  
//   return {
//     title: 'NaDoby.com.ua',
//     description: 'Подобова оренда житла по всій Україні без посередників',
//     alternates: {
//       canonical: `https://nadoby.com.ua${path}`,
//     },
//   }
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="uk">
//       <body>{children}</body>
//     </html>
//   )
// }


import './globals.css';

export async function generateMetadata({ params }) {
  const path = params?.slug || '';
  
  // Определяем язык из пути
  const isRussian = path?.startsWith('/ru') || false;
  
  // Контент для двух языков
  const content = {
    ua: {
      title: "Подобова оренда квартир по всій Україні без посередників | NaDoby",
      description: "Зніміть квартиру, готель, будинок подобово в будь-якому місті України. Понад 1000 варіантів. Ціни від 500 грн/добу. Бронюйте онлайн!",
      keywords: "подобова оренда, квартири подобово, житло подобово, готелі України, оренда будинку",
    },
    ru: {
      title: "Посуточная аренда квартир по всей Украине без посредников | NaDoby",
      description: "Снимите квартиру, отель, дом посуточно в любом городе Украины. Более 1000 вариантов. Цены от 500 грн/сутки. Бронируйте онлайн!",
      keywords: "посуточная аренда, квартиры посуточно, жилье посуточно, отели Украины, аренда дома",
    }
  };
  
  // Выбираем язык
  const lang = isRussian ? 'ru' : 'ua';
  const meta = content[lang];
  
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://nadoby.com.ua${path}`,
      languages: {
        'uk': 'https://nadoby.com.ua',
        'ru': 'https://nadoby.com.ua/ru',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://nadoby.com.ua${path}`,
      siteName: 'NaDoby',
      locale: lang === 'ua' ? 'uk_UA' : 'ru_RU',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: '/logo3.ico',
      shortcut: '/logo3.ico',
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}