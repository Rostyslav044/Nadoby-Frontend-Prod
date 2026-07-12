// pages/_document.js - СТВОРИ ЦЕЙ ФАЙЛ!
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="uk">
      <Head>
        {/* Мета-теги будуть тут, але поки залиш порожнім */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}