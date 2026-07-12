


import { NextResponse } from 'next/server';

export function middleware(request) {
  // Проверяем админские маршруты
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Пропускаем страницу логина
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Перевіряємо наявність токена - ВИПРАВЛЕНО!
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      // Якщо немає токена - редирект на логін
      const loginUrl = new URL('/', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*'
};