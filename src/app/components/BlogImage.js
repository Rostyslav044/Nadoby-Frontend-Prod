'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function BlogImage({ src, alt, size = 'medium', priority = false }) {
  const [imageSrc, setImageSrc] = useState('')
  const [error, setError] = useState(false)
  
  useEffect(() => {
    if (!src) return
    
    // Получаем имя файла без расширения (scams.png -> scams)
    const fileName = src.split('/').pop().split('.')[0]
    
    if (error) {
      // Если WebP не загрузился, используем оригинал
      setImageSrc(src)
    } else {
      // Используем оптимизированную WebP версию
      setImageSrc(`/optimized/${fileName}-${size}.webp`)
    }
  }, [src, size, error])
  
  const handleError = () => {
    if (!error) {
      console.log(`WebP не загрузился для ${src}, используем fallback`)
      setError(true)
    }
  }
  
  // Размеры для атрибута sizes (помогает браузеру выбрать правильный размер)
  const sizesAttr = {
    small: '(max-width: 600px) 100vw, 400px',
    medium: '(max-width: 900px) 100vw, 800px',
    large: '(max-width: 1200px) 100vw, 1200px'
  }
  
  return (
    <Image
      src={imageSrc || src}
      alt={alt}
      fill
      sizes={sizesAttr[size]}
      quality={size === 'small' ? 70 : size === 'medium' ? 75 : 80}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      style={{ objectFit: 'cover' }}
      onError={handleError}
    />
  )
}
