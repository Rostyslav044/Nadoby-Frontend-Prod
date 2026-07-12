
'use client'

import React from 'react'
import { useLanguage } from "@/app/LanguageContext"
import Header from "@/app/components/Header"
import { Box, Typography, Container, Button, Chip, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery, Grid, Divider } from '@mui/material'
import Link from 'next/link'
import { Home, Groups, Celebration, Restaurant, Pool, Nature, CheckCircle, ArrowBack, OutdoorGrill } from '@mui/icons-material'
import Footer from "@/app/components/Footer"
import Head from 'next/head'
import RelatedPosts from './components/RelatedPosts'
import BlogImage from '@/app/components/BlogImage'

const COTTAGE_COMPLEX_CONTENT = {
  ua: {
    title: "Котеджні містечка для великих компаній",
    metaDescription: "🔝 Оренда котеджних містечок для сімейних свят, корпоративів та великих компаний. Повний комфорт та приватність.",
    subtitle: "Переваги оренди цілого комплексу для сімейних свят",
    intro: "Оренда цілого котеджного містечка - ідеальне рішення для великих сімейних свят, корпоративних заходів або відпочинку з друзями. Ви отримуєте повну приватність та всі зручності для незабутнього свята.",
    benefitsTitle: "Чому варто орендувати цілий комплекс?",
    benefits: [
      "Повна приватність та відсутність сторонніх",
      "Власна інфраструктура (басейни, мангальні зони, спортмайданчики)",
      "Можливість розмістити всіх гостей разом",
      "Персонал, який подбає про ваш комфорт",
      "Гнучкі умови оренди та індивідуальний підхід"
    ],
    typesTitle: "Варіанти котеджних містечок",
    types: [
      {
        name: "Для сімейних свят",
        desc: "Ідеально підходить для весіль, ювілеїв та родинних зборів",
        features: ["Великі зали", "Літні тераси", "Дитячі майданчики"],
        icon: <Celebration />
      },
      {
        name: "Корпоративний відпочинок",
        desc: "Спеціалізовані комплекси для тимбулдингу та відпочинку колективу",
        features: ["Конференц-зали", "Спортивні майданчики", "SPA-зони"],
        icon: <Groups />
      },
      {
        name: "Відпочинок з друзями",
        desc: "Комфортні містечка для компаній друзів",
        features: ["Кінотеатри", "Більярдні", "Літні кухні"],
        icon: <Home />
      }
    ],
    tipsTitle: "Як вибрати ідеальний комплекс?",
    tips: [
      "Визначте точну кількість гостей для розміщення",
      "Звертайте увагу на наявність необхідних зон (святкова, харчування, відпочинку)",
      "Уточніть, чи включено в оренду обслуговуючий персонал",
      "Оберіть місце з гарними пейзажами для фотозйомки",
      "Замовте додаткові послуги заздалегідь (кейтеринг, декор, аніматори)"
    ],
    backButton: "Повернутись до блогу",
    features: [
      { icon: <Home />, label: "Великі котеджі" },
      { icon: <Pool />, label: "Басейни" },
      { icon: <OutdoorGrill />, label: "Мангальні зони" },
      { icon: <Restaurant />, label: "Ресторанне обслуговування" },
      { icon: <Nature />, label: "Живописні локації" }
    ]
  },
  ru: {
    title: "Коттеджные городки для больших компаний",
    metaDescription: "🔝 Аренда коттеджных городков для семейных праздников, корпоративов и больших компаний. Полный комфорт и приватность.",
    subtitle: "Преимущества аренды целого комплекса для семейных праздников",
    intro: "Аренда целого коттеджного городка - идеальное решение для больших семейных праздников, корпоративных мероприятий или отдыха с друзьями. Вы получаете полную приватность и все удобства для незабываемого праздника.",
    benefitsTitle: "Почему стоит арендовать целый комплекс?",
    benefits: [
      "Полная приватность и отсутствие посторонних",
      "Собственная инфраструктура (бассейны, мангальные зоны, спортплощадки)",
      "Возможность разместить всех гостей вместе",
      "Персонал, который позаботится о вашем комфорте",
      "Гибкие условия аренды и индивидуальный подход"
    ],
    typesTitle: "Варианты коттеджных городков",
    types: [
      {
        name: "Для семейных праздников",
        desc: "Идеально подходит для свадеб, юбилеев и семейных сборов",
        features: ["Большие залы", "Летние террасы", "Детские площадки"],
        icon: <Celebration />
      },
      {
        name: "Корпоративный отдых",
        desc: "Специализированные комплексы для тимбилдинга и отдыха коллектива",
        features: ["Конференц-залы", "Спортивные площадки", "SPA-зоны"],
        icon: <Groups />
      },
      {
        name: "Отдых с друзьями",
        desc: "Комфортные городки для компаний друзей",
        features: ["Кинотеатры", "Бильярдные", "Летние кухни"],
        icon: <Home />
      }
    ],
    tipsTitle: "Как выбрать идеальный комплекс?",
    tips: [
      "Определите точное количество гостей для размещения",
      "Обращайте внимание на наличие необходимых зон (праздничная, питания, отдыха)",
      "Уточните, включен ли в аренду обслуживающий персонал",
      "Выберите место с красивыми пейзажами для фотосессии",
      "Закажите дополнительные услуги заранее (кейтеринг, декор, аниматоры)"
    ],
    backButton: "Вернуться в блог",
    features: [
      { icon: <Home />, label: "Большие коттеджи" },
      { icon: <Pool />, label: "Бассейны" },
      { icon: <OutdoorGrill />, label: "Мангальные зоны" },
      { icon: <Restaurant />, label: "Ресторанное обслуживание" },
      { icon: <Nature />, label: "Живописные локации" }
    ]
  }
}

function CottageComplexGuide({ generatedAt }) {
  const { currentLanguage } = useLanguage()
  const t = COTTAGE_COMPLEX_CONTENT[currentLanguage]
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
  <link rel="canonical" href="https://nadoby.com.ua/blog/cottageComplexGuide" />
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
                src="/kotedzi.png"
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
    src="/kotedzi.png"
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
                <Home fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.intro.split(':')[0]}
              </Typography>
              <Typography>
                {t.intro.split(':')[1]}
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
                <Groups fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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
                <Celebration fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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
                <Groups fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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
          <RelatedPosts currentSlug="cottageComplexGuide" />

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

export default CottageComplexGuide