




'use client'

import { useLanguage } from "@/app/LanguageContext"
import { BLOG_CONTENT } from "../blogData"
import BlogImage from '@/app/components/BlogImage'
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Chip, 
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

// SEO мета-данные для разных языков
const SEO_CONTENT = {
  ua: {
    metaTitle: "Рекомендовані статті | Блог NaDoby.com.ua",
    metaDescription: "Читайте рекомендовані статті про оренду житла в Україні. Корисні поради, умови оренди та рекомендації для мандрівників.",
  },
  ru: {
    metaTitle: "Рекомендуемые статьи | Блог NaDoby.com.ua", 
    metaDescription: "Читайте рекомендуемые статьи об аренде жилья в Украине. Полезные советы, условия аренды и рекомендации для путешественников.",
  }
}

export default function RelatedPosts({ currentSlug, generatedAt }) {
  const { currentLanguage } = useLanguage()
  const [isClient, setIsClient] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const sliderRef = useRef(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    setIsClient(true)
  }, [])

  const content = BLOG_CONTENT[currentLanguage]
  const seoContent = SEO_CONTENT[currentLanguage]
  
  // Берем ВСЕ посты кроме текущего
  const relatedPosts = content.posts.filter(post => post.link !== `/blog/${currentSlug}`)

  // Количество отображаемых карточек
  const getSlidesToShow = () => {
    if (isMobile) return 1
    if (isTablet) return 2
    return 3
  }

  const slidesToShow = getSlidesToShow()
  const maxSlides = Math.ceil(relatedPosts.length / slidesToShow) - 1

  // Минимальное расстояние для свайпа
  const minSwipeDistance = 50

  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && !isTransitioning) {
      nextSlide()
    }
    
    if (isRightSwipe && !isTransitioning) {
      prevSlide()
    }
    
    // Сброс значений
    setTouchStart(null)
    setTouchEnd(null)
  }, [touchStart, touchEnd, isTransitioning])

  const nextSlide = useCallback(() => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentSlide(prev => prev >= maxSlides ? 0 : prev + 1)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500) // Уменьшено с 500 до 300 мс для более быстрой анимации
  }, [isTransitioning, maxSlides])

  const prevSlide = useCallback(() => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentSlide(prev => prev <= 0 ? maxSlides : prev - 1)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500) // Уменьшено с 500 до 300 мс
  }, [isTransitioning, maxSlides])

  // Автопереключение слайдов - УВЕЛИЧЕНА СКОРОСТЬ
  useEffect(() => {
    if (relatedPosts.length <= slidesToShow) return
    
    const interval = setInterval(() => {
      nextSlide()
    }, 5500) // Уменьшено с 8000 до 3500 мс для более быстрого переключения

    return () => clearInterval(interval)
  }, [currentSlide, relatedPosts.length, slidesToShow, nextSlide])

  // Получаем посты для текущего слайда
  const getCurrentSlidePosts = () => {
    const startIndex = currentSlide * slidesToShow
    return relatedPosts.slice(startIndex, startIndex + slidesToShow)
  }

  // Обработчик клавиатуры для доступности
  const handleKeyDown = useCallback((e) => {
    if (isTransitioning) return
    
    if (e.key === 'ArrowLeft') {
      prevSlide()
    } else if (e.key === 'ArrowRight') {
      nextSlide()
    }
  }, [isTransitioning, prevSlide, nextSlide])

  if (!isClient || relatedPosts.length === 0) {
    return null
  }

  return (
    <>
      {/* SEO оптимизация */}
      <head>
        <title>{seoContent.metaTitle}</title>
        <meta name="description" content={seoContent.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={seoContent.metaTitle} />
        <meta property="og:description" content={seoContent.metaDescription} />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        {generatedAt && (
          <meta name="generated-at" content={generatedAt} />
        )}
      </head>

      <Box 
        component="section" 
        aria-label={currentLanguage === 'ua' ? 'Рекомендовані статті' : 'Рекомендуемые статьи'}
        sx={{ mt: 6 }}
      >
        <Typography 
          variant="h2" 
          component="h2"
          sx={{ 
            mb: 4,
            textAlign: 'center',
            fontWeight: 600,
            color: 'primary.main',
            fontSize: { xs: '1.75rem', md: '2.125rem' }
          }}
        >
          {currentLanguage === 'ua' ? 'Рекомендуємо до читання' : 'Рекомендуем к чтению'}
        </Typography>

        {/* Контейнер слайдера с поддержкой свайпов */}
        <Box 
          ref={sliderRef}
          component="div"
          role="region"
          aria-label={currentLanguage === 'ua' ? 'Слайдер статей' : 'Слайдер статей'}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          sx={{ 
            position: 'relative', 
            maxWidth: 'lg',
            mx: 'auto',
            outline: 'none',
            touchAction: 'pan-y',
            userSelect: 'none'
          }}
        >
          
          {/* Кнопка назад */}
          {relatedPosts.length > slidesToShow && (
            <IconButton
              onClick={prevSlide}
              disabled={isTransitioning}
              aria-label={currentLanguage === 'ua' ? 'Попередній слайд' : 'Предыдущий слайд'}
              sx={{
                position: 'absolute',
                left: { xs: -2, sm: -4 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                bgcolor: 'background.paper',
                boxShadow: 1,
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white'
                },
                '&:disabled': {
                  opacity: 0.5,
                  cursor: 'not-allowed'
                },
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
                transition: 'all 0.3s ease',
                display: { xs: 'none', sm: 'flex' } // На мобильных скрываем, используем свайпы
              }}
            >
              <ChevronLeft fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          )}

          {/* Область отображения слайдов с анимацией */}
          <Box 
            component="div"
            sx={{ 
              overflow: 'hidden',
              mx: { xs: 0, sm: 2 },
              cursor: 'grab',
              '&:active': {
                cursor: 'grabbing'
              }
            }}
          >
            <Grid 
              container 
              spacing={2}
              component="div"
              sx={{
                transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out', // Более быстрая анимация
                opacity: isTransitioning ? 0.8 : 1,
                transform: isTransitioning ? 'translateX(5px)' : 'translateX(0)'
              }}
            >
              {getCurrentSlidePosts().map((post, index) => (
                <Grid 
                  item 
                  xs={12}
                  sm={6}
                  md={4}
                  key={`${post.link}-${index}`}
                  component="article"
                  sx={{
                    transition: 'all 0.3s ease-in-out',
                    transform: isTransitioning ? 'scale(0.98)' : 'scale(1)'
                  }}
                >
                  <Link 
                    href={post.link} 
                    style={{ textDecoration: 'none' }}
                    aria-label={`Читати статтю: ${post.title}`}
                  >
                    <Card 
                      component="article"
                      sx={{ 
                        height: '100%',
                        transition: 'all 0.2s ease',
                        borderRadius: 2,
                        boxShadow: 2,
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4,
                        }
                      }}
                    >
                      {/* Изображение - компактное */}
                      {/* <Box 
                        component="div"
                        sx={{ 
                          position: 'relative', 
                          height: 160,
                          overflow: 'hidden',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          style={{ 
                            objectFit: 'cover',
                            objectPosition: 'center',
                            transition: 'transform 0.3s ease'
                          }}
                          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                          priority={index === 0}
                        />
                      </Box> */}

<Box 
  component="div"
  sx={{ 
    position: 'relative', 
    height: 160,
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    bgcolor: '#f0f5fa'
  }}
>
  <BlogImage 
    src={post.image}
    alt={post.title}
    size="medium"
    priority={index === 0}
  />
</Box>
                      
                      {/* Контент карточки - компактный */}
                      <CardContent sx={{ 
                        p: 2,
                        '&:last-child': { pb: 2 },
                        transition: 'all 0.3s ease'
                      }}>
                        <Chip 
                          label={post.category} 
                          size="small" 
                          sx={{ 
                            mb: 1.5,
                            bgcolor: 'primary.light',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            height: 24,
                            transition: 'all 0.3s ease'
                          }}
                        />
                        <Typography 
                          variant="h3" 
                          component="h3"
                          sx={{ 
                            mb: 1,
                            fontWeight: 600,
                            lineHeight: 1.3,
                            fontSize: '1rem',
                            minHeight: '2.5em',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          component="p"
                          sx={{
                            fontSize: '0.875rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: '2.5em',
                            lineHeight: 1.4,
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {post.content}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Кнопка вперед */}
          {relatedPosts.length > slidesToShow && (
            <IconButton
              onClick={nextSlide}
              disabled={isTransitioning}
              aria-label={currentLanguage === 'ua' ? 'Наступний слайд' : 'Следующий слайд'}
              sx={{
                position: 'absolute',
                right: { xs: -2, sm: -4 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                bgcolor: 'background.paper',
                boxShadow: 1,
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white'
                },
                '&:disabled': {
                  opacity: 0.5,
                  cursor: 'not-allowed'
                },
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
                transition: 'all 0.3s ease',
                display: { xs: 'none', sm: 'flex' } // На мобильных скрываем, используем свайпы
              }}
            >
              <ChevronRight fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          )}
        </Box>

        {/* Индикаторы слайдов с анимацией */}
        {relatedPosts.length > slidesToShow && (
          <Box 
            component="nav"
            aria-label={currentLanguage === 'ua' ? 'Навігація по слайдам' : 'Навигация по слайдам'}
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mt: 3,
              gap: 1 
            }}
          >
            {Array.from({ length: maxSlides + 1 }).map((_, index) => (
              <Box
                key={index}
                onClick={() => !isTransitioning && setCurrentSlide(index)}
                role="button"
                tabIndex={0}
                aria-label={currentLanguage === 'ua' 
                  ? `Перейти до слайду ${index + 1}` 
                  : `Перейти к слайду ${index + 1}`
                }
                onKeyPress={(e) => {
                  if (!isTransitioning && (e.key === 'Enter' || e.key === ' ')) {
                    setCurrentSlide(index)
                  }
                }}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: currentSlide === index ? 'primary.main' : 'grey.300',
                  cursor: isTransitioning ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: isTransitioning ? 0.5 : 1,
                  '&:hover': {
                    bgcolor: isTransitioning 
                      ? (currentSlide === index ? 'primary.main' : 'grey.300')
                      : (currentSlide === index ? 'primary.dark' : 'grey.400'),
                    transform: isTransitioning ? 'scale(1)' : 'scale(1.2)'
                  },
                  '&:focus': {
                    outline: '2px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: 2
                  }
                }}
              />
            ))}
          </Box>
        )}

        {/* Инструкция по свайпам для мобильных устройств */}
        {isMobile && relatedPosts.length > slidesToShow && (
          <Typography
            variant="caption"
            component="p"
            sx={{
              textAlign: 'center',
              mt: 2,
              color: 'text.secondary',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5
            }}
          >
            <span>←</span>
            <span>{currentLanguage === 'ua' ? 'Свайпніть для перегляду' : 'Свайпните для просмотра'}</span>
            <span>→</span>
          </Typography>
        )}
      </Box>
    </>
  )
}