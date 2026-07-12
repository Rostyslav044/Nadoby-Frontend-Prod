


'use client'

import React from 'react'
import { useLanguage } from "@/app/LanguageContext"
import Header from "@/app/components/Header"
import { Box, Typography, Container, Button, Chip, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery, Grid } from '@mui/material'
import Link from 'next/link'
import RelatedPosts from './components/RelatedPosts'
import BlogImage from '@/app/components/BlogImage'

import { 
  DirectionsCar,
  Place,
  Landscape,
  Wc,
  ElectricalServices,
  WaterDrop,
  Wifi,
  Restaurant,
  Shower,
  Pets,
  ArrowBack,
  CheckCircle
} from '@mui/icons-material'

import Head from 'next/head'
// import Footer from "@/app/components/Footer"
const AUTOCAMPING_CONTENT = {
  ua: {
    title: "Автокемпінги для мандрівників",
    metaDescription: "🚙 Найкращі автокемпінги України для автотуристів. Повний гід з місцями для паркування, ночівлі та відпочинку в дорозі.",
    subtitle: "Відкрийте для себе найкращі місця для автотуристів",
    intro: "Автокемпінг - ідеальне рішення для тих, хто подорожує на автомобілі. Ви отримуєте не лише місце для паркування, а й всі зручності для комфортного відпочинку під час подорожі.",
    benefitsTitle: "Чому варто вибирати автокемпінги?",
    benefits: [
      "Зручні місця для паркування та ночівлі",
      "Доступ до електрики та води",
      "Санітарні вузли та душові",
      "Можливість відпочити в мальовничих локаціях",
      "Знайомства з однодумцями"
    ],
    typesTitle: "Види автокемпінгів",
    types: [
      {
        name: "Лісові кемпінги",
        desc: "Ідеальні для любителів природи та тиші",
        features: ["Розташовані в лісах", "Природні водойми поруч", "Екотропи"],
        icon: <Landscape />
      },
      {
        name: "Біля водойм",
        desc: "Для тих, хто любить відпочинок біля води",
        features: ["Пляжі", "Можливість риболовлі", "Прогулянки на човнах"],
        icon: <WaterDrop />
      },
      {
        name: "Туристичні бази",
        desc: "З розвиненою інфраструктурою",
        features: ["Кафе/ресторани", "Майданчики для відпочинку", "Дитячі зони"],
        icon: <Restaurant />
      }
    ],
    tipsTitle: "Як вибрати ідеальний автокемпінг?",
    tips: [
      "Визначте маршрут подорожі та місце зупинки",
      "Перевірте наявність необхідних комунікацій",
      "Дізнайтесь про додаткові послуги (прокат, їжа)",
      "Оцініть відгуки інших мандрівників",
      "Уточніть вартість та умови розміщення"
    ],
    backButton: "Повернутись до блогу",
    features: [
      { icon: <DirectionsCar />, label: "Парковка" },
      { icon: <ElectricalServices />, label: "Електрика" },
      { icon: <Wc />, label: "Санвузли" },
      { icon: <Shower />, label: "Душові" },
      { icon: <Wifi />, label: "Wi-Fi" },
      { icon: <Pets />, label: "Pet-friendly" }
    ],
    regionsTitle: "Популярні регіони для автокемпінгів",
    regions: [
      {
        name: "Карпати",
        description: "Магніт для любителів гір та екотуризму"
      },
      {
        name: "Поділля",
        description: "Маленькі затишні кемпінги серед природи"
      },
      {
        name: "Південь України",
        description: "Кемпінги біля моря та лиманів"
      },
      {
        name: "Київська область",
        description: "Зручні місця для недовгих виїздів"
      }
    ]
  },
  ru: {
    title: "Автокемпинги для путешественников",
    metaDescription: "🚙 Лучшие автокемпинги Украины для автотуристов. Полный гид с местами для парковки, ночевки и отдыха в дороге.",
    subtitle: "Откройте для себя лучшие места для автотуристов",
    intro: "Автокемпинг - идеальное решение для тех, кто путешествует на автомобиле. Вы получаете не только место для парковки, но и все удобства для комфортного отдыха во время путешествия.",
    benefitsTitle: "Почему стоит выбирать автокемпинги?",
    benefits: [
      "Удобные места для парковки и ночевки",
      "Доступ к электричеству и воде",
      "Санузлы и душевые",
      "Возможность отдохнуть в живописных локациях",
      "Знакомства с единомышленниками"
    ],
    typesTitle: "Виды автокемпингов",
    types: [
      {
        name: "Лесные кемпинги",
        desc: "Идеальны для любителей природы и тишины",
        features: ["Расположены в лесах", "Природные водоемы рядом", "Экотропы"],
        icon: <Landscape />
      },
      {
        name: "У водоемов",
        desc: "Для тех, кто любит отдых у воды",
        features: ["Пляжи", "Возможность рыбалки", "Прогулки на лодках"],
        icon: <WaterDrop />
      },
      {
        name: "Туристические базы",
        desc: "С развитой инфраструктурой",
        features: ["Кафе/рестораны", "Площадки для отдыха", "Детские зоны"],
        icon: <Restaurant />
      }
    ],
    tipsTitle: "Как выбрать идеальный автокемпинг?",
    tips: [
      "Определите маршрут путешествия и место остановки",
      "Проверьте наличие необходимых коммуникаций",
      "Узнайте о дополнительных услугах (прокат, еда)",
      "Оцените отзывы других путешественников",
      "Уточните стоимость и условия размещения"
    ],
    backButton: "Вернуться в блог",
    features: [
      { icon: <DirectionsCar />, label: "Парковка" },
      { icon: <ElectricalServices />, label: "Электрика" },
      { icon: <Wc />, label: "Санузлы" },
      { icon: <Shower />, label: "Душевые" },
      { icon: <Wifi />, label: "Wi-Fi" },
      { icon: <Pets />, label: "Pet-friendly" }
    ],
    regionsTitle: "Популярные регионы для автокемпингов",
    regions: [
      {
        name: "Карпаты",
        description: "Мекка для любителей гор и экотуризма"
      },
      {
        name: "Подолье",
        description: "Уютные кемпинги среди природы"
      },
      {
        name: "Юг Украины",
        description: "Кемпинги у моря и лиманов"
      },
      {
        name: "Киевская область",
        description: "Удобные места для коротких выездов"
      }
    ]
  }
}

function AutocampingGuide({ generatedAt }) {
  const { currentLanguage } = useLanguage()
  const t = AUTOCAMPING_CONTENT[currentLanguage]
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
  <link rel="canonical" href="https://nadoby.com.ua/blog/autocampingGuide" />
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
                src="/avtokemping.png"
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
  bgcolor: '#f0f5fa'  // цвет фона пока грузится
}}>
  <BlogImage 
    src="/avtokemping.png"
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

            <Box sx={{ mb: 4, p: 3, backgroundColor: '#f0f7f4', borderRadius: 2 }}>
              <Typography variant="h5" component="h3" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <DirectionsCar fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.intro.split('.')[0]}.
              </Typography>
              <Typography>
                {t.intro.split('.').slice(1).join('.')}.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <Place fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.benefitsTitle}
              </Typography>
              
              <List dense={isMobile}>
                {t.benefits.map((item, index) => (
                  <ListItem key={`benefit-${index}`} sx={{ alignItems: 'flex-start', px: 0 }}>
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
                {t.features.map((feature, index) => (
                  <Chip 
                    key={`feature-${index}`}
                    icon={feature.icon} 
                    label={feature.label} 
                    size={isMobile ? 'small' : 'medium'}
                    sx={{ 
                      '& .MuiChip-icon': { color: 'primary.main' },
                      backgroundColor: 'background.paper'
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <Landscape fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.typesTitle}
              </Typography>
              
              <Grid container spacing={3}>
                {t.types.map((type, index) => (
                  <Grid item xs={12} sm={6} key={`type-${index}`}>
                    <Paper elevation={2} sx={{ p: 2, height: '100%', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        {React.cloneElement(type.icon, { 
                          color: 'primary',
                          fontSize: isMobile ? 'medium' : 'large'
                        })}
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
                          {type.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {type.desc}
                      </Typography>
                      <List dense>
                        {type.features.map((feature, idx) => (
                          <ListItem key={`feature-${index}-${idx}`} sx={{ py: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircle fontSize="small" color="secondary" />
                            </ListItemIcon>
                            <Typography variant="body2">
                              {feature}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          
            <Box sx={{ mb: 4, mt: 10  }}>
              <Typography variant="h5" component="h2" sx={{
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark',
                textAlign: 'center'
              }}>
                {t.regionsTitle}
              </Typography>
              
              <Grid container spacing={2}>
                {t.regions.map((region, index) => (
                  <Grid item xs={12} sm={6} md={3} key={`region-${index}`}>
                    <Paper elevation={1} sx={{ p: 2, height: '100%', textAlign: 'center' }}>
                      <Typography variant="h6" color="primary">
                        {region.name}
                      </Typography>
                      <Typography variant="body2">
                        {region.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{ mb: 3, mt: 10 }}>
              <Typography variant="h5" component="h2" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <DirectionsCar fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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

          <RelatedPosts currentSlug="autocampingGuide" />

          <Box sx={{ textAlign: 'center', mt: 2 }}>
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
        
        {/* <div style={{ marginTop: "40px" }}>
          <Footer />
        </div> */}
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

export default AutocampingGuide