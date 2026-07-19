
// import { Html, Head, Main, NextScript } from 'next/document';

// export default function Document() {
//   return (
//     <Html lang="uk">
//       <Head>
//         {/* Мета-теги будуть тут, але поки залиш порожнім */}
//       </Head>
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }



// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="uk">
      <Head>
        {/* ✅ ДОБАВЛЯЕМ ФАВИКОН ДЛЯ ВСЕХ СТРАНИЦ PAGES */}
        <link rel="icon" href="/logo3.ico" />
        <link rel="shortcut icon" href="/logo3.ico" />
        <link rel="apple-touch-icon" href="/logo3.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}