
'use client'

import { useLanguage } from "@/app/LanguageContext"
import Header from "@/app/components/Header"
import { Box, Typography, Container, Button, Chip, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery, Divider } from '@mui/material'
import Link from 'next/link'
import { Home, Nature, Groups, FamilyRestroom, Pets, CheckCircle, ArrowBack, LocalFireDepartment, OutdoorGrill, Wifi, AcUnit, Star, Warning, VerifiedUser } from '@mui/icons-material'
import Footer from "@/app/components/Footer"
import Head from 'next/head'
import RelatedPosts from './components/RelatedPosts'
import BlogImage from '@/app/components/BlogImage'

const HOUSE_CONTENT = {
  ua: {
    title: "Будинки для відпочинку: затишок та свобода",
    metaTitle: "Оренда приватних будинків по всій Україні | NaDoby",
    metaDescription: "🔝 Оренда приватних будинків по всій Україні. Ідеально для сімей, компаній друзів та романтичних подорожей. Без комісій та посередників.",
    subtitle: "Чому оренда будинку краща за готель?",
    advantagesTitle: "Основні переваги приватних будинків",
    advantages: [
      "Повна приватність – ніхто не турбує",
      "В 2-3 рази вигідніше для компаній від 4 осіб",
      "Власний простір: сад, тераса, мангал, парковка",
      "Можливість відпочинку з тваринами",
      "Повноцінна кухня для сімейних обідів",
      "Гнучкий графік заїзду/виїзду",
      "Унікальні локації: біля лісу, озера, в горах",
      "Додаткові послуги: сауна, прокат спорядження"
    ],
    servicesTitle: "Зручності та послуги",
    tipsTitle: "Як вибрати ідеальний будинок?",
    tips: [
      "Визначтесь з локацією (гірська, лісова, приозерна)",
      "Перевірте наявність всіх зручностей (опалення, гаряча вода)",
      "Уточніть правила розміщення з тваринами",
      "Оцініть відстань до найближчих магазинів",
      "Перегляньте фото всіх приміщень",
      "З'ясуйте наявність дитячих зручностей",
      "Обговоріть можливість раннього заїзду"
    ],
    backButton: "Повернутись до блогу",
    features: [
      { icon: <Home />, label: "Повний комфорт" },
      { icon: <Nature />, label: "Природа" },
      { icon: <FamilyRestroom />, label: "Для сімей" },
      { icon: <Pets />, label: "Pet-friendly" },
      { icon: <LocalFireDepartment />, label: "Мангал" },
      { icon: <OutdoorGrill />, label: "Барбекю" }
    ]
  },
  ru: {
    title: "Дома для отдыха: уют и свобода",
    metaTitle: "Аренда частных домов по всей Украине | NaDoby",
    metaDescription: "🔝 Аренда частных домов по всей Украине. Идеально для семей, компаний друзей и романтических путешествий. Без комиссий и посредников.",
    subtitle: "Почему аренда дома лучше отеля?",
    advantagesTitle: "Основные преимущества частных домов",
    advantages: [
      "Полная приватность – никто не беспокоит",
      "В 2-3 раза выгоднее для компаний от 4 человек",
      "Собственное пространство: сад, терраса, мангал, парковка",
      "Возможность отдыха с животными",
      "Полноценная кухня для семейных обедов",
      "Гибкий график заезда/выезда",
      "Уникальные локации: у леса, озера, в горах",
      "Дополнительные услуги: сауна, прокат снаряжения"
    ],
    servicesTitle: "Удобства и услуги",
    tipsTitle: "Как выбрать идеальный дом?",
    tips: [
      "Определитесь с локацией (горная, лесная, приозерная)",
      "Проверьте наличие всех удобств (отопление, горячая вода)",
      "Уточните правила размещения с животными",
      "Оцените расстояние до ближайших магазинов",
      "Просмотрите фото всех помещений",
      "Выясните наличие детских удобств",
      "Обсудите возможность раннего заезда"
    ],
    backButton: "Вернуться в блог",
    features: [
      { icon: <Home />, label: "Полный комфорт" },
      { icon: <Nature />, label: "Природа" },
      { icon: <FamilyRestroom />, label: "Для семей" },
      { icon: <Pets />, label: "С животными" },
      { icon: <LocalFireDepartment />, label: "Мангал" },
      { icon: <OutdoorGrill />, label: "Барбекю" }
    ]
  }
}

function HouseGuide({ generatedAt }) {
  const { currentLanguage } = useLanguage()
  const t = HOUSE_CONTENT[currentLanguage]
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
  <link rel="canonical" href="https://nadoby.com.ua/blog/houseGuide" />
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
                src="/house.png"
                alt={t.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
                loading="eager"
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
    src="/house.png"
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
                  <ListItem key={`adv-${index}`} sx={{ py: 0.5, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: '2px' }}>
                      <CheckCircle color="success" fontSize={isMobile ? 'small' : 'medium'} />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: isMobile ? '0.95rem' : '1rem' }}>
                      {item}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h2" component="h2" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.3rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <Home fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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
                {t.features.map((feature, index) => (
                  <Chip 
                    key={`feature-${index}`}
                    icon={feature.icon} 
                    label={feature.label}
                    sx={{ 
                      '& .MuiChip-icon': { color: 'primary.main' }
                    }}
                  />
                ))}
              </Box>
            </Box>

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
                {t.tips.map((item, index) => (
                  <ListItem key={`tip-${index}`} sx={{ px: 0, py: 0.5, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: '2px' }}>
                      <VerifiedUser color="info" fontSize={isMobile ? 'small' : 'medium'} />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: isMobile ? '0.95rem' : '1rem' }}>
                      {item}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>

          <Divider sx={{ my: 4 }} />
          
          <RelatedPosts currentSlug="houseGuide" />

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

export default HouseGuide