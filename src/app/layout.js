import './globals.css';

export async function generateMetadata({ params }) {
  // Отримуємо шлях з params або з headers
  const path = params?.slug || '';
  
  return {
    title: 'NaDoby.com.ua',
    description: 'Подобова оренда житла по всій Україні без посередників',
    alternates: {
      canonical: `https://nadoby.com.ua${path}`,
    },
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  )
}
