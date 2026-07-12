

'use client'

import { useLanguage } from "@/app/LanguageContext"
import Header from "@/app/components/Header"
import { Box, Typography, Container, Button, Chip, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery, Divider } from '@mui/material'
import Link from 'next/link'
import { Home, Hotel, Groups, Savings, CheckCircle, ArrowBack, Wifi, Public, Security, EmojiPeople } from '@mui/icons-material'
import Footer from "@/app/components/Footer"
import Head from 'next/head'
import RelatedPosts from './components/RelatedPosts'
import BlogImage from '@/app/components/BlogImage'

const HOSTEL_CONTENT = {
  ua: {
    title: "Хостели: бюджетний варіант з соціальним досвідом",
    metaDescription: "🔝 Хостели по всій Україні для економних подорожуючих. Спільні кімнати, нові знайомства та низькі цени. Без комісій та посередників.",
    subtitle: "Чому хостели - це не просто дешевий варіант?",
    advantagesTitle: "Основні переваги хостелів",
    advantages: [
      "Ціни на 50-80% нижчі за готелі",
      "Можливість знайти нових друзів",
      "Загальні кухні для приготування їжі",
      "Ігрові зони та спільні простори",
      "Часто розташовані в самому центрі",
      "Гнучкі умови бронювання",
      "Безкоштовний Wi-Fi та місцеві поради"
    ],
    tipsTitle: "Як вибрати хороший хостел?",
    tips: [
      "Перевірте відгуки про чистоту",
      "Уточніть тип кімнати (загальна/приватна)",
      "Зверніть увагу на замки для речей",
      "Оцініть транспортну розв'язку",
      "Перевірте наявність пральної машини",
      "Узгодьте час заїзду/виїзду",
      "Дізнайтесь про правила спілкування"
    ],
    backButton: "Повернутись до блогу"
  },
  ru: {
    title: "Хостелы: бюджетный вариант с социальным опытом",
    metaDescription: "🔝 Хостелы по всей Украине для экономных путешественников. Общие комнаты, новые знакомства и низкие цены. Без комиссий и посредников.",
    subtitle: "Почему хостелы - это не просто дешевый вариант?",
    advantagesTitle: "Основные преимущества хостелов",
    advantages: [
      "Цены на 50-80% ниже отелей",
      "Возможность найти новых друзей",
      "Общие кухни для приготовления еды",
      "Игровые зоны и общие пространства",
      "Часто расположены в самом центре",
      "Гибкие условия бронирования",
      "Бесплатный Wi-Fi и местные советы"
    ],
    tipsTitle: "Как выбрать хороший хостел?",
    tips: [
      "Проверьте отзывы о чистоте",
      "Уточните тип комнаты (общая/приватная)",
      "Обратите внимание на замки для вещей",
      "Оцените транспортную развязку",
      "Проверьте наличие стиральной машины",
      "Согласуйте время заезда/выезда",
      "Узнайте о правилах общения"
    ],
    backButton: "Вернуться в блог"
  }
}

function HostelGuide({ generatedAt }) {
  const { currentLanguage } = useLanguage()
  const t = HOSTEL_CONTENT[currentLanguage]
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      {/* <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head> */}

<Head>
  <title>{t.title}</title>
  <meta name="description" content={t.metaDescription} />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="canonical" href="https://nadoby.com.ua/blog/hostelGuide" />
</Head>

      <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <Header />
        
        <Container maxWidth="md" sx={{ py: isMobile ? 3 : 6, px: isMobile ? 2 : 4 }}>
          <Paper elevation={3} sx={{ 
            p: isMobile ? 2 : 4, 
            borderRadius: 2, 
            mb: 4,
            '& .MuiListItem-root': {
              py: isMobile ? 0.5 : 1
            }
          }}>
            <Typography variant="h4" component="h1" sx={{ 
              fontWeight: 700,
              textAlign: 'center',
              color: 'primary.main',
              fontSize: isMobile ? '1.5rem' : '2rem',
              mb: 2
            }}>
              {t.title}
            </Typography>

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
                src="/hostel.png"
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
    src="/hostel.png"
    alt={t.title}
    size="large"
    priority={true}
  />
</Box>

            <Typography variant="h6" component="p" sx={{
              textAlign: 'center',
              color: 'text.secondary',
              mb: 4,
              fontSize: isMobile ? '1rem' : '1.1rem'
            }}>
              {t.subtitle}
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <Groups fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.advantagesTitle}
              </Typography>
              
              <List dense={isMobile}>
                {t.advantages.map((item, index) => (
                  <ListItem key={`adv-${index}`} sx={{ alignItems: 'flex-start', px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: '4px' }}>
                      <CheckCircle color="success" fontSize={isMobile ? 'small' : 'medium'} />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
                      {item}
                    </Typography>
                  </ListItem>
                ))}
              </List>

              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 1, 
                mt: 3,
                justifyContent: 'center'
              }}>
                <Chip 
                  icon={<Savings fontSize="small" />} 
                  label={currentLanguage === 'ua' ? "Бюджет" : "Бюджет"} 
                  size={isMobile ? 'small' : 'medium'}
                />
                <Chip 
                  icon={<Wifi fontSize="small" />} 
                  label="Wi-Fi" 
                  size={isMobile ? 'small' : 'medium'}
                />
                <Chip 
                  icon={<Public fontSize="small" />} 
                  label={currentLanguage === 'ua' ? "Спілкування" : "Общение"} 
                  size={isMobile ? 'small' : 'medium'}
                />
                <Chip 
                  icon={<Security fontSize="small" />} 
                  label={currentLanguage === 'ua' ? "Безпека" : "Безопасность"} 
                  size={isMobile ? 'small' : 'medium'}
                />
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" component="h2" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <EmojiPeople fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.tipsTitle}
              </Typography>
              
              <List dense={isMobile}>
                {t.tips.map((item, index) => (
                  <ListItem key={`tip-${index}`} sx={{ alignItems: 'flex-start', px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: '4px' }}>
                      <CheckCircle color="info" fontSize={isMobile ? 'small' : 'medium'} />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
                      {item}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>

          {/* Добавляем разделитель и рекомендации */}
          <Divider sx={{ my: 4 }} />
          
          {/* Компонент с рекомендациями */}
          <RelatedPosts currentSlug="hostelGuide" />

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Link href="/blog" passHref legacyBehavior>
              <Button 
                variant="contained" 
                color="primary"
                size={isMobile ? 'medium' : 'large'}
                startIcon={<ArrowBack fontSize={isMobile ? 'small' : 'medium'} />}
                sx={{ 
                  px: isMobile ? 3 : 4,
                  py: 1,
                  fontWeight: 600,
                  fontSize: isMobile ? '0.9rem' : '1rem',
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

export default HostelGuide