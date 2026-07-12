



'use client'

import React from 'react'
import { useLanguage } from "@/app/LanguageContext"
import Header from "@/app/components/Header"
import { Box, Typography, Container, Button, Chip, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery, Grid, Divider } from '@mui/material'
import Link from 'next/link'
import { Workspaces, Wifi, Coffee, MeetingRoom, Event, Pets, LocalCafe, Print, Lock, ArrowBack, CheckCircle  } from '@mui/icons-material'
import Footer from "@/app/components/Footer"
import Head from 'next/head'
import RelatedPosts from './components/RelatedPosts'
import BlogImage from '@/app/components/BlogImage'

const COWORKING_CONTENT = {
  ua: {
    title: "Коворкінг - робочі простори для digital-кочівників",
    metaDescription: "🔝 Сучасні коворкінги з усіма зручностями для фрілансерів та віддалених працівників. Швидкий інтернет, комфортні зони та спільнота.",
    subtitle: "Ідеальні умови для продуктивної роботи",
    intro: "Сучасний коворкінг - це не просто робоче місце, а повноцінне середовище для творчості та продуктивності. Ви отримуєте все необхідне для комфортної роботи та можливість спілкування з однодумцями.",
    benefitsTitle: "Чому варто обрати коворкінг?",
    benefits: [
      "Стабільний швидкісний інтернет",
      "Ергономічні робочі місця",
      "Зони для відпочинку та неформальних зустрічей",
      "Можливість нетворкінгу з професіоналами",
      "Гнучкі тарифні плани (годинні, денні, місячні)"
    ],
    typesTitle: "Типи робочих зон у коворкінгу",
    types: [
      {
        name: "Open-space зони",
        desc: "Відкриті простори з комфортними робочими місцями",
        features: ["Індивідуальні столи", "Розетки поблизу", "Комфортне освітлення"],
        icon: <Workspaces />
      },
      {
        name: "Приватні кабінети",
        desc: "Закриті простори для індивідуальної або командной роботи",
        features: ["Звукоізоляція", "Персональне оформлення", "Доступ 24/7"],
        icon: <MeetingRoom />
      },
      {
        name: "Переговорні кімнати",
        desc: "Зони для проведення зустрічей та презентацій",
        features: ["Проектор", "Маркерні дошки", "Відеоконференції"],
        icon: <Event />
      }
    ],
    tipsTitle: "Як обрати ідеальний коворкінг?",
    tips: [
      "Визначте свій графік роботи (ранковий, денний, нічний)",
      "Звертайте увагу на розташування та транспортну доступність",
      "Перевірте наявність додаткових послуг (друк, сканування, кава)",
      "Оцініть атмосферу та спільноту",
      "Скористайтесь пробним днем перед покупкою абонементу"
    ],
    backButton: "Повернутись до блогу",
    features: [
      { icon: <Wifi />, label: "Швидкісний Wi-Fi" },
      { icon: <Coffee />, label: "Безлімітна кава" },
      { icon: <LocalCafe />, label: "Кухонна зона" },
      { icon: <Print />, label: "Офісна техніка" },
      { icon: <Pets />, label: "Pet-friendly" }
    ]
  },
  ru: {
    title: "Коворкинг - рабочие пространства для digital-кочевников",
    metaDescription: "🔝 Современные коворкинги со всеми удобствами для фрилансеров и удаленных работников. Быстрый интернет, комфортные зоны и сообщество.",
    subtitle: "Идеальные условия для продуктивной работы",
    intro: "Современный коворкинг - это не просто рабочее место, а полноценная среда для творчества и продуктивности. Вы получаете все необходимое для комфортной работы и возможность общения с единомышленниками.",
    benefitsTitle: "Почему стоит выбрать коворкинг?",
    benefits: [
      "Стабильный скоростной интернет",
      "Эргономичные рабочие места",
      "Зоны для отдыха и неформальных встреч",
      "Возможность нетворкинга с профессионалами",
      "Гибкие тарифные планы (почасовые, дневные, месячные)"
    ],
    typesTitle: "Типы рабочих зон в коворкинге",
    types: [
      {
        name: "Open-space зоны",
        desc: "Открытые пространства с комфортными рабочими местами",
        features: ["Индивидуальные столы", "Розетки рядом", "Комфортное освещение"],
        icon: <Workspaces />
      },
      {
        name: "Приватные кабинеты",
        desc: "Закрытые пространства для индивидуальной или командной работы",
        features: ["Звукоизоляция", "Персональное оформление", "Доступ 24/7"],
        icon: <MeetingRoom />
      },
      {
        name: "Переговорные комнаты",
        desc: "Зоны для проведения встреч и презентаций",
        features: ["Проектор", "Маркерные доски", "Видеоконференции"],
        icon: <Event />
      }
    ],
    tipsTitle: "Как выбрать идеальный коворкинг?",
    tips: [
      "Определите свой график работы (утренний, дневной, ночной)",
      "Обращайте внимание на расположение и транспортную доступность",
      "Проверьте наличие дополнительных услуг (печать, сканирование, кофе)",
      "Оцените атмосферу и сообщество",
      "Воспользуйтесь пробным днем перед покупкой абонемента"
    ],
    backButton: "Вернуться в блог",
    features: [
      { icon: <Wifi />, label: "Скоростной Wi-Fi" },
      { icon: <Coffee />, label: "Безлимитный кофе" },
      { icon: <LocalCafe />, label: "Кухонная зона" },
      { icon: <Print />, label: "Офисная техника" },
      { icon: <Pets />, label: "Pet-friendly" }
    ]
  }
}

function CoworkingGuide({ generatedAt }) {
  const { currentLanguage } = useLanguage()
  const t = COWORKING_CONTENT[currentLanguage]
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
  <link rel="canonical" href="https://nadoby.com.ua/blog/coworkingGuide" />
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
                src="/kavorking.png"
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
    src="/kavorking.png"
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
                <Workspaces fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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
                <Wifi fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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
                <MeetingRoom fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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

            <Box sx={{ mb: 3, mt: 10 }}>
              <Typography variant="h5" component="h2" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <Lock fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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
          <RelatedPosts currentSlug="coworkingGuide" />

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

export default CoworkingGuide