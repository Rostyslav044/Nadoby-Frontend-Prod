



'use client'

import React from 'react'
import { useLanguage } from "@/app/LanguageContext"
import Header from "@/app/components/Header"
import { Box, Typography, Container, Button, Chip, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery, Grid, Divider } from '@mui/material'
import Link from 'next/link'
import { MedicalServices, Spa, Pool, FitnessCenter, Restaurant, Nature, CheckCircle, ArrowBack, Star, Warning, VerifiedUser } from '@mui/icons-material'
import Footer from "@/app/components/Footer"
import Head from 'next/head'
import RelatedPosts from './components/RelatedPosts'
import BlogImage from '@/app/components/BlogImage'

const SANATORIUM_CONTENT = {
  ua: {
    title: "Пансіонати  та Санаторії з лікувальними програмами",
    metaTitle: "Лікувальні пансіонати з оздоровчими програмами | NaDoby",
    metaDescription: "🔝 Найкращі лікувальні пансіонати України. Спеціалізовані програми оздоровлення під наглядом лікарів. Кардіологія, ортопедія, дерматологія.",
    subtitle: "Як вибрати пансіонат з максимальною користю для здоров'я",
    intro: "Лікувальні пансіонати - це ідеальне поєднання відпочинку та оздоровлення. Вони пропонують спеціалізовані програми для різних захворювань під наглядом лікарів.",
    benefitsTitle: "Переваги лікувальних пансіонатів",
    benefits: [
      "Професійний медичний супровід",
      "Індивідуальні програми лікування",
      "Природні лікувальні фактори",
      "Комплексний підхід до оздоровлення",
      "Реабілітація після захворювань"
    ],
    typesTitle: "Види лікувальних програм",
    types: [
      {
        name: "Кардіологічні програми",
        desc: "Лікування та профілактика серцево-судинних захворювань",
        features: ["Діагностика", "Фізіотерапія", "Лікувальна фізкультура"],
        icon: <MedicalServices />
      },
      {
        name: "Ортопедичні програми",
        desc: "Реабілітація захворювань опорно-рухового апарату",
        features: ["Масаж", "Грязелікування", "Лікувальні ванни"],
        icon: <FitnessCenter />
      },
      {
        name: "Дерматологічні програми",
        desc: "Лікування шкірних захворювань з використанням природних факторів",
        features: ["Бальнеотерапія", "Фототерапія", "Кліматотерапія"],
        icon: <Spa />
      }
    ],
    tipsTitle: "Як правильно вибрати пансіонат?",
    tips: [
      "Визначте основні проблеми зі здоров'ям для вибору профілю",
      "Звертайте увагу на кваліфікацію медичного персоналу",
      "Перевірте наявність необхідних лікувальних процедур",
      "Уточніть умови проживання та харчування",
      "Оберіть оптимальний термін перебування (від 14 днів)"
    ],
    backButton: "Повернутись до блогу",
    features: [
      { icon: <MedicalServices />, label: "Медичний супровід" },
      { icon: <Pool />, label: "Лікувальні басейни" },
      { icon: <Nature />, label: "Природні фактори" },
      { icon: <Restaurant />, label: "Дієтичне харчування" },
      { icon: <Spa />, label: "SPA-процедури" }
    ]
  },
  ru: {
    title: "Пансионаты и Санатории с лечебными программами",
    metaTitle: "Лечебные пансионаты с оздоровительными программами | NaDoby",
    metaDescription: "🔝 Лучшие лечебные пансионаты Украины. Специализированные программы оздоровления под наблюдением врачей. Кардиология, ортопедия, дерматология.",
    subtitle: "Как выбрать пансионат с максимальной пользой для здоровья",
    intro: "Лечебные пансионаты - это идеальное сочетание отдыха и оздоровления. Они предлагают специализированные программы для различных заболеваний под наблюдением врачей.",
    benefitsTitle: "Преимущества лечебных пансионатов",
    benefits: [
      "Профессиональное медицинское сопровождение",
      "Индивидуальные программы лечения",
      "Природные лечебные факторы",
      "Комплексный подход к оздоровлению",
      "Реабилитация после заболеваний"
    ],
    typesTitle: "Виды лечебных программ",
    types: [
      {
        name: "Кардиологические программы",
        desc: "Лечение и профилактика сердечно-сосудистых заболеваний",
        features: ["Диагностика", "Физиотерапия", "Лечебная физкультура"],
        icon: <MedicalServices />
      },
      {
        name: "Ортопедические программы",
        desc: "Реабилитация заболеваний опорно-двигательного аппарата",
        features: ["Массаж", "Грязелечение", "Лечебные ванны"],
        icon: <FitnessCenter />
      },
      {
        name: "Дерматологические программы",
        desc: "Лечение кожных заболеваний с использованием природных факторов",
        features: ["Бальнеотерапия", "Фототерапия", "Климатотерапия"],
        icon: <Spa />
      }
    ],
    tipsTitle: "Как правильно выбрать пансионат?",
    tips: [
      "Определите основные проблемы со здоровьем для выбора профиля",
      "Обращайте внимание на квалификацию медицинского персонала",
      "Проверьте наличие необходимых лечебных процедур",
      "Уточните условия проживания и питания",
      "Выберите оптимальный срок пребывания (от 14 дней)"
    ],
    backButton: "Вернуться в блог",
    features: [
      { icon: <MedicalServices />, label: "Медсопровождение" },
      { icon: <Pool />, label: "Лечебные бассейны" },
      { icon: <Nature />, label: "Природные факторы" },
      { icon: <Restaurant />, label: "Диетическое питание" },
      { icon: <Spa />, label: "SPA-процедуры" }
    ]
  }
}

function SanatoriumGuide({ generatedAt }) {
  const { currentLanguage } = useLanguage()
  const t = SANATORIUM_CONTENT[currentLanguage]
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
  <link rel="canonical" href="https://nadoby.com.ua/blog/sanatoriumGuide" />
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
                src="/pansionat.png"
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
    src="/pansionat.png"
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
                <MedicalServices fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.intro.split(':')[0]}
              </Typography>
              <Typography>
                {t.intro.split(':')[1]}
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
                <Spa fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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
          
          <RelatedPosts currentSlug="sanatoriumGuide" />

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

export default SanatoriumGuide