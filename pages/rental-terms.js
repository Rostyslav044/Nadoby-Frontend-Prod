


'use client';
import { LanguageProvider, useLanguage } from "@/app/LanguageContext";
import Header from "@/app/components/Header";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import { Container, Typography, Box, Paper, List, ListItem, ListItemIcon, Chip, Alert, useTheme, useMediaQuery } from "@mui/material";
import { CheckCircle, ContactMail, Home, Payment, ThumbUp, VerifiedUser, Security } from "@mui/icons-material";
import Head from 'next/head';
import Footer from "@/app/components/Footer";

const rentalTermsTranslations = {
  ua: {
    title: "Умови оренди",
    subtitle: "Добова оренда житла по всій Україні без посередників",
    howItWorks: "Як це працює?",
    findObject: "Знайдіть об'єкт, який вам підходить, використовуючи наші зручні фільтри",
    contactOwner: "Зв'яжіться безпосередньо з власником через контакти, вказані в оголошенні",
    agreeDetails: "Узгодьте деталі заїзду, оплати та інші умови",
    enjoyStay: "Насолоджуйтесь проживанням без зайвих витрат",
    importantToKnow: "Важливо знати",
    noCommission: "NaDoby.com.ua не бере жодних комісій за оренду! Всі платежі відбуваються безпосередньо між орендарем та власником житла. Ми лише надаємо зручний сервіс для пошуку та зв'язку.",
    safety: "Безпека при оренді:",
    depositInfo: "Деякі власники можуть просити завдаток (зазвичай 30-100% від вартості добової оренди)",
    checkOwner: "Перед внесенням залогу обов'язково перевірте власника:",
    checkPhone: "перевірте номер телефону через додаток GetContact",
    verifiedTags: "звертайте увагу на підтверджені теги профілю власника",
    socialNetworks: "перегляньте соціальні мережі власника",
    beCareful: "Будьте обережні та уважні при здійсненні передоплат!",
    beforeBooking: "Перед бронюванням рекомендуємо уважно ознайомитися з умовами оренди, перевірити наявність всіх зручностей та уточнити всі деталі з власником.",
    contactUs: "Зв'язок з нами",
    contactText: "Якщо у вас виникли питання або пропозиції щодо роботи платформи, будь ласка, пишіть на",
    metaTitle: "Умови оренди житла | NaDoby",
    metaDescription: "Правила та умови оренди житла на NaDoby. Без комісій, безпосередньо з власниками. Безпека при оренді, поради та рекомендації.",
    metaKeywords: "умови оренди, правила оренди, безпечна оренда, NaDoby, оренда житла"
  },
  ru: {
    title: "Условия аренды",
    subtitle: "Посуточная аренда жилья по всей Украине без посредников",
    howItWorks: "Как это работает?",
    findObject: "Найдите объект, который вам подходит, используя наши удобные фильтры",
    contactOwner: "Свяжитесь напрямую с владельцем через контакты, указанные в объявлении",
    agreeDetails: "Согласуйте детали заезда, оплаты и другие условия",
    enjoyStay: "Наслаждайтесь проживанием без лишних расходов",
    importantToKnow: "Важно знать",
    noCommission: "NaDoby.com.ua не берет никаких комиссий за аренду! Все платежи происходят напрямую между арендатором и владельцем жилья. Мы лишь предоставляем удобный сервис для поиска и связи.",
    safety: "Безопасность при аренде:",
    depositInfo: "Некоторые владельцы могут попросить задаток (обычно 30-100% от стоимости суточной аренды)",
    checkOwner: "Перед внесением залога обязательно проверьте владельца:",
    checkPhone: "проверьте номер телефона через приложение GetContact",
    verifiedTags: "обращайте внимание на подтвержденные теги профиля владельца",
    socialNetworks: "просмотрите социальные сети владельца",
    beCareful: "Будьте осторожны и внимательны при осуществлении предоплат!",
    beforeBooking: "Перед бронированием рекомендуем внимательно ознакомиться с условиями аренды, проверить наличие всех удобств и уточнить все детали с владельцем.",
    contactUs: "Связь с нами",
    contactText: "Если у вас возникли вопросы или предложения по работе платформы, пожалуйста, пишите на",
    metaTitle: "Условия аренды жилья | NaDoby",
    metaDescription: "Правила и условия аренды жилья на NaDoby. Без комиссий, напрямую с владельцами. Безопасность при аренде, советы и рекомендации.",
    metaKeywords: "условия аренды, правила аренды, безопасная аренда, NaDoby, аренда жилья"
  }
};

function RentalTermsContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentLanguage } = useLanguage();
  const t = rentalTermsTranslations[currentLanguage];

  return (
    <>
      <Head>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={t.metaKeywords} />
        <link rel="canonical" href="https://nadoby.com.ua/rental-terms" />
      </Head>
      
      <div>
        <Header />
        
        <Container maxWidth="lg" sx={{ 
          py: isMobile ? 4 : 6,
          px: isSmallMobile ? 2 : 3
        }}>
          <Paper elevation={3} sx={{ 
            p: isMobile ? 3 : 6, 
            borderRadius: 4,
            overflow: 'hidden'
          }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ 
              color: 'primary.main',
              fontWeight: 'bold',
              textAlign: 'center',
              mb: isMobile ? 4 : 6,
              fontSize: isMobile ? '2rem' : '2.5rem'
            }}>
              {t.title}
            </Typography>

            <Typography variant="h5" component="p" sx={{
              textAlign: 'center',
              mb: isMobile ? 4 : 6,
              fontSize: isMobile ? '1.2rem' : '1.4rem',
              lineHeight: 1.6
            }}>
              {t.subtitle}
            </Typography>

            <Box sx={{ mb: isMobile ? 4 : 6 }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                fontSize: isMobile ? '1.5rem' : '1.8rem',
                flexWrap: isSmallMobile ? 'wrap' : 'nowrap'
              }}>
                <ThumbUp color="primary" /> {t.howItWorks}
              </Typography>
              <List sx={{ 
                '& .MuiTypography-root': { 
                  fontSize: isMobile ? '1rem' : '1.2rem' 
                } 
              }}>
                <ListItem sx={{ alignItems: 'flex-start', px: isSmallMobile ? 0 : 1 }}>
                  <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
                    <CheckCircle color="success" fontSize={isMobile ? "medium" : "large"} />
                  </ListItemIcon>
                  <Typography>
                    {t.findObject}
                  </Typography>
                </ListItem>
                <ListItem sx={{ alignItems: 'flex-start', px: isSmallMobile ? 0 : 1 }}>
                  <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
                    <CheckCircle color="success" fontSize={isMobile ? "medium" : "large"} />
                  </ListItemIcon>
                  <Typography>
                    {t.contactOwner}
                  </Typography>
                </ListItem>
                <ListItem sx={{ alignItems: 'flex-start', px: isSmallMobile ? 0 : 1 }}>
                  <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
                    <CheckCircle color="success" fontSize={isMobile ? "medium" : "large"} />
                  </ListItemIcon>
                  <Typography>
                    {t.agreeDetails}
                  </Typography>
                </ListItem>
                <ListItem sx={{ alignItems: 'flex-start', px: isSmallMobile ? 0 : 1 }}>
                  <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
                    <CheckCircle color="success" fontSize={isMobile ? "medium" : "large"} />
                  </ListItemIcon>
                  <Typography>
                    {t.enjoyStay}
                  </Typography>
                </ListItem>
              </List>
            </Box>

            <Box sx={{ mb: isMobile ? 4 : 6 }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                fontSize: isMobile ? '1.5rem' : '1.8rem',
                flexWrap: isSmallMobile ? 'wrap' : 'nowrap'
              }}>
                <Payment color="primary" /> {t.importantToKnow}
              </Typography>
              
              <Typography variant="h6" paragraph sx={{ 
                fontSize: isMobile ? '1.1rem' : '1.3rem', 
                mb: isMobile ? 3 : 4 
              }}>
                <strong>{t.noCommission.split('!')[0]}!</strong> {t.noCommission.split('!')[1]}
              </Typography>

              <Alert severity="info" sx={{ 
                mb: isMobile ? 3 : 4, 
                fontSize: isMobile ? '1rem' : '1.2rem' 
              }} icon={<Security fontSize={isMobile ? "medium" : "large"} />}>
                <Typography variant="h6" component="div" sx={{ 
                  fontWeight: 'bold', 
                  mb: 2, 
                  fontSize: isMobile ? '1.1rem' : '1.3rem' 
                }}>
                  {t.safety}
                </Typography>
                
                <List dense sx={{ 
                  '& .MuiTypography-root': { 
                    fontSize: isMobile ? '1rem' : '1.2rem' 
                  } 
                }}>
                  <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
                      <VerifiedUser color="info" fontSize={isMobile ? "medium" : "large"} />
                    </ListItemIcon>
                    <Typography>
                      {t.depositInfo}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
                      <VerifiedUser color="info" fontSize={isMobile ? "medium" : "large"} />
                    </ListItemIcon>
                    <Typography>
                      {t.checkOwner}
                    </Typography>
                  </ListItem>
                </List>
                
                <Box sx={{ 
                  pl: isSmallMobile ? 2 : 6, 
                  mt: 2 
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    flexDirection: isSmallMobile ? 'column' : 'row',
                    alignItems: isSmallMobile ? 'flex-start' : 'center'
                  }}>
                    <Chip label="GetContact" color="info" sx={{ 
                      mr: isSmallMobile ? 0 : 2, 
                      mb: isSmallMobile ? 1 : 0,
                      fontSize: '1rem', 
                      padding: '6px 12px' 
                    }} />
                    <Typography sx={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>
                      {t.checkPhone}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    flexDirection: isSmallMobile ? 'column' : 'row',
                    alignItems: isSmallMobile ? 'flex-start' : 'center'
                  }}>
                    <Chip label={currentLanguage === 'ru' ? "Подтвержденные теги" : "Підтверджені теги"} color="success" sx={{ 
                      mr: isSmallMobile ? 0 : 2, 
                      mb: isSmallMobile ? 1 : 0,
                      fontSize: '1rem', 
                      padding: '6px 12px' 
                    }} />
                    <Typography sx={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>
                      {t.verifiedTags}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    flexDirection: isSmallMobile ? 'column' : 'row',
                    alignItems: isSmallMobile ? 'flex-start' : 'center'
                  }}>
                    <Chip label={currentLanguage === 'ru' ? "Соцсети" : "Соцмережі"} color="secondary" sx={{ 
                      mr: isSmallMobile ? 0 : 2, 
                      mb: isSmallMobile ? 1 : 0,
                      fontSize: '1rem', 
                      padding: '6px 12px' 
                    }} />
                    <Typography sx={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>
                      {t.socialNetworks}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography sx={{ 
                  mt: 3, 
                  fontStyle: 'italic', 
                  fontSize: isMobile ? '1rem' : '1.2rem' 
                }}>
                  {t.beCareful}
                </Typography>
              </Alert>

              <Typography variant="h6" paragraph sx={{ 
                fontSize: isMobile ? '1.1rem' : '1.3rem' 
              }}>
                {t.beforeBooking}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h4" component="h2" gutterBottom sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                fontSize: isMobile ? '1.5rem' : '1.8rem',
                flexWrap: isSmallMobile ? 'wrap' : 'nowrap'
              }}>
                <ContactMail color="primary" /> {t.contactUs}
              </Typography>
              <Typography variant="h6" sx={{ 
                fontSize: isMobile ? '1.1rem' : '1.3rem' 
              }}>
                {t.contactText} <strong>nadoby.com.ua@gmail.com</strong>
              </Typography>
            </Box>
          </Paper>
        </Container>
        <Footer/>
      </div>
    </>
  );
}

export default function RentalTerms() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <RentalTermsContent />
      </LanguageProvider>
    </Provider>
  );
}

// Функция для статической генерации - выполняется на сервере во время сборки
export async function getStaticProps() {
  return {
    props: {
      generatedAt: new Date().toISOString(),
    },
    // Регенерация страницы каждые 24 часа (опционально)
    revalidate: 86400, // 24 часа в секундах
  }
}