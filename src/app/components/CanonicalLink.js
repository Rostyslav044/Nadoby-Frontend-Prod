'use client';

export default function CanonicalLink() {
  // Отримуємо поточний URL в браузері
  const url = typeof window !== 'undefined' ? window.location.href : '';
  
  // Забираємо параметри після ? (UTM-мітки тощо)
  const canonicalUrl = url.split('?')[0];
  
  return (
    <link rel="canonical" href={canonicalUrl} />
  );
}
