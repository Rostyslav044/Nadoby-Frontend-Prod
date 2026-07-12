import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function TestPage() {
  return (
    <div>
      <h1>Тест авторизации</h1>
      <button onClick={() => {
        console.log('Test button clicked');
        signIn('google');
      }}>
        Тест signIn(&apos;google&apos;)
      </button>
      <br/><br/>
      
      <Link href="/api/auth/signin?callbackUrl=https://nadoby.com.ua/">
        Прямая ссылка на /api/auth/signin
      </Link>
      
      <br/><br/>
      
      <a 
        href="https://accounts.google.com/o/oauth2/v2/auth?client_id=625752332856-mduemspt3hpqi63qj220snm8odqul2mh.apps.googleusercontent.com&redirect_uri=https://nadoby.com.ua/api/auth/callback/google&response_type=code&scope=email%20profile%20openid&access_type=offline&prompt=consent" 
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 20px',
          background: '#4285F4',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}
      >
        🔧 Прямой OAuth URL (обход NextAuth)
      </a>
    </div>
  );
}
