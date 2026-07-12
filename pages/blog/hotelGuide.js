
'use client'

import { useLanguage } from "@/app/LanguageContext"
import Header from "@/app/components/Header"
import { Box, Typography, Container, Button, Chip, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery, Divider } from '@mui/material'
import Link from 'next/link'
import { Star, AccessTime, Restaurant, CleaningServices, LocalLaundryService, Spa, Warning, VerifiedUser, ArrowBack } from '@mui/icons-material'
import Footer from "@/app/components/Footer"
import Head from 'next/head'
import RelatedPosts from './components/RelatedPosts'
import BlogImage from '@/app/components/BlogImage'

const HOTEL_CONTENT = {
  ua: {
    title: "Готелі з особливою атмосферою",
    metaTitle: "Кращі готельні номери з особливою атмосферою | NaDoby",
    metaDescription: "Як вибрати ідеальний готельний номер: переваги, послуги та секрети комфортного проживання. Круглосуточне заселення, їжа в номер, додаткові послуги.",
    subtitle: "Як вибрати ідеальний номер та отримати максимум задоволення",
    advantagesTitle: "Чому варто зупинитись у готелі?",
    advantages: [
      "Професійний сервіс та турбота про гостей",
      "Унікальний дизайн інтер'єрів, що надихає",
      "Зручне розташування у самому центрі міста",
      "Цілодобовий ресепшн та швидке заселення",
      "Гарантія безпеки та конфіденційності"
    ],
    servicesTitle: "Додаткові послуги",
    services: [
      "Сніданки/обіди у номер (за запитом)",
      "Щоденне прибирання",
      "Прання та глажіння білизни",
      "SPA та масажі",
      "Трансфер з/до аеропорту"
    ],
    tipsTitle: "На що звернути увагу при виборі?",
    tips: [
      "Читайте відгуки на незалежних платформах",
      "Перевіряйте фото номерів (особливо санвузол)",
      "Уточнюйте про додаткові збори (наприклад, туристичний податок)",
      "Обирайте готелі з безкоштовним Wi-Fi",
      "Звертайте уваги на систему вентиляції"
    ],
    backButton: "Повернутись до блогу"
  },
  ru: {
    title: "Отели с особой атмосферой",
    metaTitle: "Лучшие гостиничные номера с особой атмосферой | NaDoby",
    metaDescription: "Как выбрать идеальный гостиничный номер: преимущества, услуги и секреты комфортного проживания. Круглосуточное заселение, еда в номер, дополнительные услуги.",
    subtitle: "Как выбрать идеальный номер и получить максимум удовольствия",
    advantagesTitle: "Почему стоит остановиться в отеле?",
    advantages: [
      "Профессиональный сервис и забота о гостях",
      "Уникальный дизайн интерьеров, вдохновляющий на отдых",
      "Удобное расположение в самом центре города",
      "Круглосуточная ресепшен и быстрое заселение",
      "Гарантия безопасности и конфиденциальности"
    ],
    servicesTitle: "Дополнительные услуги",
    services: [
      "Завтраки/ужины в номер (по запросу)",
      "Ежедневная уборка",
      "Стирка и глажка белья",
      "SPA и массажи",
      "Трансфер из/в аэропорт"
    ],
    tipsTitle: "На что обратить внимание при выборе?",
    tips: [
      "Читайте отзывы на независимых платформах",
      "Проверяйте фото номеров (особенно санузел)",
      "Уточняйте о дополнительных сборах (например, туристический налог)",
      "Выбирайте отели с бесплатным Wi-Fi",
      "Обращайте внимание на систему вентиляции"
    ],
    backButton: "Вернуться в блог"
  }
}

function HotelGuide({ generatedAt }) {
  const { currentLanguage } = useLanguage()
  const t = HOTEL_CONTENT[currentLanguage]
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      {/* <Head>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head> */}

<Head>
  <title>{t.metaTitle}</title>
  <meta name="description" content={t.metaDescription} />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="canonical" href="https://nadoby.com.ua/blog/hotelGuide" />
</Head>

      <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <Header />
        
        <Container maxWidth="md" sx={{ py: isMobile ? 3 : 6, px: isMobile ? 2 : 4 }}>
          <Paper elevation={3} sx={{ 
            p: isMobile ? 3 : 4, 
            borderRadius: 2, 
            mb: 4,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)'
          }}>
            <Typography variant="h1" component="h1" sx={{ 
              fontWeight: 700,
              textAlign: 'center',
              color: 'primary.main',
              fontSize: isMobile ? '1.6rem' : '2rem',
              mb: 2
            }}>
              {t.title}
            </Typography>

            {/* Изображение с предзагрузкой */}
            {/* <Box sx={{ 
              width: '100%',
              height: isMobile ? 200 : 500,
              position: 'relative',
              mb: 4,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: theme.shadows[2]
            }}>
              <img
                src="/hotel.png"
                alt={t.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
                loading="eager" // Предзагрузка изображения для ускорения
              />
            </Box> */}

<Box sx={{ 
  width: '100%',
  height: isMobile ? 200 : 500,
  position: 'relative',
  mb: 4,
  borderRadius: 2,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
  bgcolor: '#f0f5fa'
}}>
  <BlogImage 
    src="/hotel.png"
    alt={t.title}
    size="large"
    priority={true}
  />
</Box>

            <Typography variant="subtitle1" component="p" sx={{
              textAlign: 'center',
              color: 'text.secondary',
              mb: 4,
              fontSize: isMobile ? '0.95rem' : '1.1rem'
            }}>
              {t.subtitle}
            </Typography>

            {/* Блок "Переваги" */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h2" component="h2" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.3rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <Star fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.advantagesTitle}
              </Typography>
              
              <List dense={isMobile}>
                {t.advantages.map((item, index) => (
                  <ListItem key={index} sx={{ py: 0.5, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: '2px' }}>
                      <Star color="secondary" fontSize={isMobile ? 'small' : 'medium'} />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: isMobile ? '0.95rem' : '1rem' }}>
                      {item}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Блок "Послуги" */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h2" component="h2" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.3rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <Spa fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.servicesTitle}
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 1, 
                justifyContent: 'center',
                '& .MuiChip-root': {
                  fontSize: isMobile ? '0.85rem' : '0.9rem',
                  px: 1.5,
                  py: 1,
                  backgroundColor: '#e3f2fd'
                }
              }}>
                <Chip icon={<Restaurant />} label={currentLanguage === 'ua' ? "Їжа в номер" : "Еда в номер"} />
                <Chip icon={<CleaningServices />} label={currentLanguage === 'ua' ? "Щоденне прибирання" : "Ежедневная уборка"} />
                <Chip icon={<LocalLaundryService />} label={currentLanguage === 'ua' ? "Прання/глажіння" : "Стирка/глажка"} />
                <Chip icon={<AccessTime />} label={currentLanguage === 'ua' ? "Цілодобовий ресепшн" : "Круглосуточный ресепшен"} />
              </Box>
            </Box>

            {/* Блок "Поради" */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h2" component="h2" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.3rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <Warning fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.tipsTitle}
              </Typography>
              
              <List dense>
                {t.tips.map((tip, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 0.5, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: '2px' }}>
                      <VerifiedUser color="info" fontSize={isMobile ? 'small' : 'medium'} />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: isMobile ? '0.95rem' : '1rem' }}>
                      {tip}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>

          {/* Добавляем разделитель и рекомендации */}
          <Divider sx={{ my: 4 }} />
          
          {/* Компонент с рекомендациями */}
          <RelatedPosts currentSlug="hotelGuide" />

          {/* Кнопка "Назад в блог" */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Link href="/blog" passHref legacyBehavior>
              <Button 
                variant="contained" 
                size={isMobile ? 'medium' : 'large'}
                startIcon={<ArrowBack fontSize={isMobile ? 'small' : 'medium'} />}
                sx={{ 
                  px: isMobile ? 3 : 4,
                  py: 1,
                  fontWeight: 600,
                  fontSize: isMobile ? '0.95rem' : '1rem',
                  borderRadius: 2
                }}
              >
                {t.backButton}
              </Button>
            </Link>
          </Box>
        </Container>
        {/* <Footer /> */}
        <div style={{ marginTop: "40px" }}>
          <Footer />
        </div>
      </Box>
    </>
  )
}

// Функция для статической генерации - выполняется на сервере во время сборки
export async function getStaticProps() {
  // Здесь можно добавить запросы к API для получения данных
  // которые будут встроены в статическую страницу
  
  return {
    props: {
      // Данные которые будут переданы в компонент как пропсы
      generatedAt: new Date().toISOString(),
    },
    // Регенерация страницы каждые 24 часа (опционально)
    revalidate: 86400, // 24 часа в секундах
  }
}

export default HotelGuide