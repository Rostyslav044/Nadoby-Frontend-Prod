



'use client'

import React from 'react'
import { useLanguage } from "@/app/LanguageContext"
import Header from "@/app/components/Header"
import { Box, Typography, Container, Button, Chip, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery, Grid, Divider } from '@mui/material'
import Link from 'next/link'
import RelatedPosts from './components/RelatedPosts'
import BlogImage from '@/app/components/BlogImage'
import { 
  Pets,
  Home,
  MedicalServices,
  Park,
  Checkroom,
  EmojiFoodBeverage,
  Vaccines,
  Groups,
  ArrowBack,
  CheckCircle,
  Star,
  Warning,
  VerifiedUser
} from '@mui/icons-material'
import Footer from "@/app/components/Footer"
import Head from 'next/head'

const PET_HOTEL_CONTENT = {
  ua: {
    title: "Готелі для тварин з турботою",
    metaTitle: "Найкращі готелі для тварин з професійним доглядом | NaDoby",
    metaDescription: "🐕 Найкращі готельні послуги для ваших улюбленців. Повний гід з вибору місць для тимчасового утримання тварин. Професійний догляд, ветеринарний нагляд, комфортні умови.",
    subtitle: "Як обрати найкращий готель для вашого улюбленця",
    intro: "Готель для тварин - це ідеальне рішення, коли вам потрібно залишити вихованця на час від'їзду. Професійний догляд, комфортні умови та турбота про здоров'я вашого улюбленця.",
    benefitsTitle: "Чому варто вибирати готель для тварин?",
    benefits: [
      "Професійний догляд 24/7",
      "Регулярні прогулянки та активності",
      "Медичний нагляд та ветеринарна допомога",
      "Індивідуальний підхід до кожного вихованця",
      "Безпечні та комфортні умови проживання"
    ],
    typesTitle: "Види готелів для тварин",
    types: [
      {
        name: "Для собак",
        desc: "Спеціалізовані готельні послуги для собак усіх порід",
        features: ["Індивідуальні вольєри", "Вигул 3-4 рази на день", "Дресирування"],
        icon: <Pets />
      },
      {
        name: "Для котів",
        desc: "Комфортні умови для котів з ігровими зонами",
        features: ["Багаторівневі будиночки", "Ігрові комплекси", "Індивідуальний догляд"],
        icon: <Home />
      },
      {
        name: "Для екзотичних тварин",
        desc: "Спеціалізовані умови для гризунів, птахів та рептилій",
        features: ["Спеціальні клітки", "Контроль температури", "Індивідуальний раціон"],
        icon: <Park />
      }
    ],
    tipsTitle: "Як вибрати ідеальний готель для тварини?",
    tips: [
      "Перевірте ліцензію та відгуки",
      "Оцініть умови утримання (чистота, простір)",
      "Уточніть про наявність ветеринара",
      "Дізнайтесь про режим вигулу та годівлі",
      "Зверніть увагу на ставлення персоналу до тварин"
    ],
    backButton: "Повернутись до блогу",
    features: [
      { icon: <MedicalServices />, label: "Ветеринарний нагляд" },
      { icon: <Checkroom />, label: "Гігієнічні умови" },
      { icon: <EmojiFoodBeverage />, label: "Індивідуальне харчування" },
      { icon: <Vaccines />, label: "Обов'язкові щеплення" },
      { icon: <Groups />, label: "Соціалізація" }
    ],
    servicesTitle: "Додаткові послуги",
    services: [
      {
        name: "Грумінг",
        description: "Повний комплекс доглядових процедур"
      },
      {
        name: "Ветеринарний огляд",
        description: "Профілактичний огляд спеціалістом"
      },
      {
        name: "Трансфер",
        description: "Доставка тварини до готелю"
      },
      {
        name: "Фотозвіт",
        description: "Щоденні фото та відео вашого улюбленця"
      }
    ]
  },
  ru: {
    title: "Отели для животных с заботой",
    metaTitle: "Лучшие отели для животных с профессиональным уходом | NaDoby",
    metaDescription: "🐕 Лучшие гостиничные услуги для ваших питомцев. Полный гид по выбору мест для временного содержания животных. Профессиональный уход, ветеринарный надзор, комфортные условия.",
    subtitle: "Как выбрать лучший отель для вашего питомца",
    intro: "Отель для животных - это идеальное решение, когда вам нужно оставить питомца на время отъезда. Профессиональный уход, комфортные условия и забота о здоровье вашего любимца.",
    benefitsTitle: "Почему стоит выбирать отель для животных?",
    benefits: [
      "Профессиональный уход 24/7",
      "Регулярные прогулки и активности",
      "Медицинский контроль и ветеринарная помощь",
      "Индивидуальный подход к каждому питомцу",
      "Безопасные и комфортные условия проживания"
    ],
    typesTitle: "Виды отелей для животных",
    types: [
      {
        name: "Для собак",
        desc: "Специализированные гостиничные услуги для собак всех пород",
        features: ["Индивидуальные вольеры", "Выгул 3-4 раза в день", "Дрессировка"],
        icon: <Pets />
      },
      {
        name: "Для кошек",
        desc: "Комфортные условия для кошек с игровыми зонами",
        features: ["Многоуровневые домики", "Игровые комплексы", "Индивидуальный уход"],
        icon: <Home />
      },
      {
        name: "Для экзотических животных",
        desc: "Специализированные условия для грызунов, птиц и рептилий",
        features: ["Специальные клетки", "Контроль температуры", "Индивидуальный рацион"],
        icon: <Park />
      }
    ],
    tipsTitle: "Как выбрать идеальный отель для животного?",
    tips: [
      "Проверьте лицензию и отзывы",
      "Оцените условия содержания (чистота, пространство)",
      "Уточните о наличии ветеринара",
      "Узнайте о режиме выгула и кормления",
      "Обратите внимание на отношение персонала к животным"
    ],
    backButton: "Вернуться в блог",
    features: [
      { icon: <MedicalServices />, label: "Ветеринарный надзор" },
      { icon: <Checkroom />, label: "Гигиенические условия" },
      { icon: <EmojiFoodBeverage />, label: "Индивидуальное питание" },
      { icon: <Vaccines />, label: "Обязательные прививки" },
      { icon: <Groups />, label: "Социализация" }
    ],
    servicesTitle: "Дополнительные услуги",
    services: [
      {
        name: "Груминг",
        description: "Полный комплекс уходовых процедур"
      },
      {
        name: "Ветеринарный осмотр",
        description: "Профилактический осмотр специалистом"
      },
      {
        name: "Трансфер",
        description: "Доставка животного в отель"
      },
      {
        name: "Фотоотчет",
        description: "Ежедневные фото и видео вашего питомца"
      }
    ]
  }
}

function PetHotelGuide({ generatedAt }) {
  const { currentLanguage } = useLanguage()
  const t = PET_HOTEL_CONTENT[currentLanguage]
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
  <link rel="canonical" href="https://nadoby.com.ua/blog/petHotelGuide" />
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
                src="/animal.png"
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
    src="/animal.png"
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

            <Box sx={{ mb: 4, p: 3, backgroundColor: '#f0f7f4', borderRadius: 2 }}>
              <Typography variant="h2" component="h3" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.3rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <Pets fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.intro.split('.')[0]}.
              </Typography>
              <Typography>
                {t.intro.split('.').slice(1).join('.')}.
              </Typography>
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
                <Star fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.benefitsTitle}
              </Typography>
              
              <List dense={isMobile}>
                {t.benefits.map((item, index) => (
                  <ListItem key={`benefit-${index}`} sx={{ py: 0.5, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: '2px' }}>
                      <CheckCircle color="success" fontSize={isMobile ? 'small' : 'medium'} />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: isMobile ? '0.95rem' : '1rem' }}>
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
                <Home fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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

            <Box sx={{ mb: 4 }}>
              <Typography variant="h2" component="h2" sx={{
                fontSize: isMobile ? '1.3rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark',
                textAlign: 'center'
              }}>
                {t.servicesTitle}
              </Typography>
              
              <Grid container spacing={2}>
                {t.services.map((service, index) => (
                  <Grid item xs={12} sm={6} md={3} key={`service-${index}`}>
                    <Paper elevation={1} sx={{ p: 2, height: '100%', textAlign: 'center' }}>
                      <Typography variant="h6" color="primary">
                        {service.name}
                      </Typography>
                      <Typography variant="body2">
                        {service.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{ mb: 3 }}>
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
              
              <List dense={isMobile}>
                {t.tips.map((item, index) => (
                  <ListItem key={`tip-${index}`} sx={{ py: 0.5, alignItems: 'flex-start' }}>
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
          
          <RelatedPosts currentSlug="petHotelGuide" />

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

export default PetHotelGuide