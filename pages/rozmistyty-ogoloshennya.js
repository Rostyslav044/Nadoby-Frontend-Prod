


// pages/rozmistyty-ogoloshennya/page.js

'use client';

import { useLanguage } from "@/app/LanguageContext";
import { LanguageProvider } from "@/app/LanguageContext";
import { Box, Container, Typography, Grid, Paper, Button, Card } from '@mui/material';
import { 
  CheckCircle, 
  Home, 
  Hotel, 
  Pets, 
  House, 
  LocalLaundryService,
  Cabin,
  Apartment,
  Business,
  Workspaces,
  DirectionsCar,
  BeachAccess,
  ArrowForward
} from '@mui/icons-material';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Head from 'next/head';

// Компонент для отступов между секциями
const SectionSpacer = () => (
  <Box sx={{ height: { xs: '48px', sm: '64px', md: '80px' } }} />
);

const CONTENT = {
  ua: {
    metaTitle: "Розмістити оголошення про оренду житла безкоштовно | NaDoby",
    metaDescription: "Розмістіть оголошення про оренду квартири, будинку, готелю або сауни безкоштовно. 12 категорій житла. Без посередників. Швидко та зручно!",
    metaKeywords: "розмістити оголошення, додати оголошення, оренда житла, квартири подобово, безкоштовне розміщення",

    h1Title: "Розмістіть оголошення про оренду житла безкоштовно на NaDoby",
    subtitle: "12 категорій житла • Без посередників • Швидке розміщення • Повний контроль",
    
    introTitle: "Оренда житла в Україні: розміщуйте оголошення безкоштовно у будь-якій категорії",
    introText: "NaDoby — це платформа, де власники житла можуть безкоштовно розміщувати оголошення про оренду. Ми працюємо без посередників, тому ви спілкуєтесь напряму з потенційними клієнтами. Жодних комісій, жодних прихованих платежів — тільки чесна оренда житла по всій Україні.",

    categoriesTitle: "12 категорій житла для безкоштовного розміщення оголошень",
    categoriesSubtitle: "Оберіть свою категорію та почніть отримувати клієнтів вже сьогодні",
    categories: [
      { icon: <Apartment />, name: "Квартири", desc: "Студії, 1-3 кімнатні, елітне житло", link: "/blog/apartmentGuide" },
      { icon: <Hotel />, name: "Готелі", desc: "Готелі, міні-готелі, апарт-готелі", link: "/blog/hotelGuide" },
      { icon: <Pets />, name: "Готелі для тварин", desc: "Для собак, котів, догляд", link: "/blog/petHotelGuide" },
      { icon: <Home />, name: "Хостели", desc: "Недороге житло для студентів та туристів", link: "/blog/hostelGuide" },
      { icon: <House />, name: "Будинки", desc: "Приватні будинки, котеджі, дачі", link: "/blog/houseGuide" },
      { icon: <LocalLaundryService />, name: "Сауни/Бані", desc: "Сауни з басейном, хаммам, чан", link: "/blog/saunaGuide" },
      { icon: <Cabin />, name: "Глемпінги", desc: "Куполи, юрти, бульбашки на природі", link: "/blog/glampingGuide" },
      { icon: <Business />, name: "Пансіонати/Санаторії", desc: "Лікувальні заклади з пансіоном", link: "/blog/sanatoriumGuide" },
      { icon: <Business />, name: "Котеджі для компаній", desc: "Великі будинки для святкувань", link: "/blog/cottageComplexGuide" },
      { icon: <Workspaces />, name: "Коворкінги", desc: "Робочі простори та офіси на день", link: "/blog/coworkingGuide" },
      { icon: <DirectionsCar />, name: "Автокемпінги", desc: "Майданчики для кемперів", link: "/blog/autocampingGuide" },
      { icon: <BeachAccess />, name: "Бази відпочинку", desc: "Туристичні бази на природі", link: "/blog/campGuide" }
    ],

    advantagesTitle: "Чому варто розмістити оголошення на NaDoby? 10 переваг для власників",
    advantages: [
      { icon: <CheckCircle color="primary" />, title: "Безкоштовне розміщення", desc: "Жодних платежів за розміщення оголошення. Платіть тільки за оренду, яку отримуєте." },
      { icon: <CheckCircle color="primary" />, title: "Без посередників", desc: "Спілкуйтесь напряму з клієнтами. Ніяких комісій та націнок." },
      { icon: <CheckCircle color="primary" />, title: "Необмежена кількість оголошень", desc: "Розміщуйте скільки завгодно оголошень у будь-яких категоріях. Без обмежень!" },
      { icon: <CheckCircle color="primary" />, title: "Швидке розміщення за 5 хвилин", desc: "Заповніть форму, додайте фото та опублікуйте оголошення миттєво." },
      { icon: <CheckCircle color="primary" />, title: "Реєстрація через Google або Email", desc: "Зареєструйтесь швидко через Google або використовуйте email — обирайте зручний спосіб." },
      { icon: <CheckCircle color="primary" />, title: "Статистика переглядів", desc: "Відстежуйте, скільки людей переглянули ваше оголошення. Аналізуйте ефективність." },
      { icon: <CheckCircle color="primary" />, title: "Редагування в один клік", desc: "Змінюйте опис, ціни, фото та інші дані в будь-який момент. Без підтверджень з нашої сторони." },
      { icon: <CheckCircle color="primary" />, title: "Унікальна URL-адреса оголошення", desc: "Копіюйте посилання на ваше оголошення та розміщуйте де завгодно: Google Ads, Google Карти, соцмережі." },
      { icon: <CheckCircle color="primary" />, title: "Точний адрес та маршрут", desc: "Клієнти бачать точну адресу та можуть прокласти маршрут до вашого об'єкта." },
      { icon: <CheckCircle color="primary" />, title: "Автоматичне збереження чернетки", desc: "Якщо ви перервали створення — всі дані збережуться. Продовжуйте в будь-який зручний час." }
    ],

    howToTitle: "Як розмістити оголошення про оренду житла за 5 хвилин?",
    steps: [
      { step: "1", title: "Зареєструйтесь", desc: "Через Google або email — це займе 1 хвилину." },
      { step: "2", title: "Оберіть категорію", desc: "Виберіть тип житла з 12 доступних категорій." },
      { step: "3", title: "Заповніть інформацію", desc: "Додайте назву, опис, ціну, адресу та контакти." },
      { step: "4", title: "Додайте фото", desc: "Завантажте мінімум 3 фото вашого об'єкта." },
      { step: "5", title: "Опублікуйте", desc: "Натисніть кнопку та отримуйте перші запити вже сьогодні!" }
    ],

    forWhomTitle: "Кому вигідно розміщувати оголошення на NaDoby?",
    forWhom: [
      "Власникам квартир для подобової оренди",
      "Власникам будинків та котеджів",
      "Готелям та міні-готелям",
      "Готелям для тварин",
      "Власникам саун та бань",
      "Глемпінгам та базам відпочинку",
      "Коворкінгам та робочим просторам"
    ],

    featuresTitle: "Потужні функції для власників житла",
    features: [
      { title: "📊 Статистика переглядів", desc: "Бачите, скільки людей переглянули ваше оголошення" },
      { title: "✏️ Редагування оголошення", desc: "Змінюйте будь-які дані в один клік" },
      { title: "🔗 Унікальне посилання", desc: "Копіюйте URL та діліться де завгодно" },
      { title: "🗺️ Точний адрес та маршрут", desc: "Клієнти легко знайдуть вас" },
      { title: "📱 Контактний телефон", desc: "Клієнти дзвонять напряму вам" },
      { title: "💾 Автозбереження", desc: "Чернетка зберігається автоматично" }
    ],

    faqTitle: "Часті питання про розміщення оголошень на NaDoby",
    faq: [
      { q: "Скільки коштує розміщення оголошення?", a: "Розміщення оголошень на NaDoby абсолютно безкоштовне! Ви не платите ні за розміщення, ні за комісію з оренди." },
      { q: "Скільки оголошень можна розмістити?", a: "Необмежена кількість! Ви можете розміщувати оголошення в будь-яких категоріях без жодних обмежень." },
      { q: "Як довго публікується оголошення?", a: "Миттєво! Як тільки ви заповнили форму та натиснули «Створити оголошення» — воно одразу з'являється на сайті." },
      { q: "Чи можна редагувати оголошення після публікації?", a: "Так! Ви можете змінювати будь-які дані: опис, ціну, фото, контакти — в особистому кабінеті." },
      { q: "Як клієнти знаходять моє оголошення?", a: "Через пошук на сайті, через вашу унікальну URL-адресу, а також через Google пошук." },
      { q: "Чи потрібне підтвердження з вашої сторони?", a: "Ні! Все працює автоматично. Ви розміщуєте оголошення і воно одразу публікується." }
    ],

    ctaTitle: "Готові розмістити оголошення про оренду житла?",
    ctaSubtitle: "Приєднуйтесь до власників, які вже розміщують оголошення на NaDoby",
    ctaButton: "Створити оголошення",

    buttons: {
      home: "Головна",
      kyivApartments: "Квартири Київ",
      addListing: "Додати оголошення"
    },

    seoTitle: "Розміщення оголошень про оренду житла в Україні — NaDoby",
    seoText: "NaDoby — це найкраща платформа для безкоштовного розміщення оголошень про оренду житла в Україні. Ми пропонуємо 12 категорій житла: квартири, готелі, будинки, сауни, глемпінги, хостели, коворкінги та багато іншого. Розміщуйте оголошення без посередників, отримуйте статистику переглядів, редагуйте в один клік та діліться посиланням на оголошення де завгодно. Всі функції абсолютно безкоштовні та доступні кожному власнику житла в Україні."
  },
  ru: {
    metaTitle: "Разместить объявление об аренде жилья бесплатно | NaDoby",
    metaDescription: "Разместите объявление об аренде квартиры, дома, отеля или сауны бесплатно. 12 категорий жилья. Без посредников. Быстро и удобно!",
    metaKeywords: "разместить объявление, добавить объявление, аренда жилья, квартиры посуточно, бесплатное размещение",

    h1Title: "Разместите объявление об аренде жилья бесплатно на NaDoby",
    subtitle: "12 категорий жилья • Без посредников • Быстрое размещение • Полный контроль",
    
    introTitle: "Аренда жилья в Украине: размещайте объявления бесплатно в любой категории",
    introText: "NaDoby — это платформа, где владельцы жилья могут бесплатно размещать объявления об аренде. Мы работаем без посредников, поэтому вы общаетесь напрямую с потенциальными клиентами. Никаких комиссий, никаких скрытых платежей — только честная аренда жилья по всей Украине.",

    categoriesTitle: "12 категорий жилья для бесплатного размещения объявлений",
    categoriesSubtitle: "Выберите свою категорию и начните получать клиентов уже сегодня",
    categories: [
      { icon: <Apartment />, name: "Квартиры", desc: "Студии, 1-3 комнатные, элитное жилье", link: "/blog/apartmentGuide" },
      { icon: <Hotel />, name: "Отели", desc: "Отели, мини-отели, апарт-отели", link: "/blog/hotelGuide" },
      { icon: <Pets />, name: "Отели для животных", desc: "Для собак, кошек, уход", link: "/blog/petHotelGuide" },
      { icon: <Home />, name: "Хостелы", desc: "Недорогое жилье для студентов и туристов", link: "/blog/hostelGuide" },
      { icon: <House />, name: "Дома", desc: "Частные дома, коттеджи, дачи", link: "/blog/houseGuide" },
      { icon: <LocalLaundryService />, name: "Сауны/Бани", desc: "Сауны с бассейном, хаммам, чан", link: "/blog/saunaGuide" },
      { icon: <Cabin />, name: "Глэмпинги", desc: "Купола, юрты, пузырьки на природе", link: "/blog/glampingGuide" },
      { icon: <Business />, name: "Пансионаты/Санатории", desc: "Лечебные заведения с пансионом", link: "/blog/sanatoriumGuide" },
      { icon: <Business />, name: "Коттеджи для компаний", desc: "Большие дома для празднований", link: "/blog/cottageComplexGuide" },
      { icon: <Workspaces />, name: "Коворкинги", desc: "Рабочие пространства и офисы на день", link: "/blog/coworkingGuide" },
      { icon: <DirectionsCar />, name: "Автокемпинги", desc: "Площадки для кемперов", link: "/blog/autocampingGuide" },
      { icon: <BeachAccess />, name: "Базы отдыха", desc: "Туристические базы на природе", link: "/blog/campGuide" }
    ],

    advantagesTitle: "Почему стоит разместить объявление на NaDoby? 10 преимуществ для владельцев",
    advantages: [
      { icon: <CheckCircle color="primary" />, title: "Бесплатное размещение", desc: "Никаких платежей за размещение объявления. Платите только за аренду, которую получаете." },
      { icon: <CheckCircle color="primary" />, title: "Без посредников", desc: "Общайтесь напрямую с клиентами. Никаких комиссий и наценок." },
      { icon: <CheckCircle color="primary" />, title: "Неограниченное количество объявлений", desc: "Размещайте сколько угодно объявлений в любых категориях. Без ограничений!" },
      { icon: <CheckCircle color="primary" />, title: "Быстрое размещение за 5 минут", desc: "Заполните форму, добавьте фото и опубликуйте объявление мгновенно." },
      { icon: <CheckCircle color="primary" />, title: "Регистрация через Google или Email", desc: "Зарегистрируйтесь быстро через Google или используйте email — выбирайте удобный способ." },
      { icon: <CheckCircle color="primary" />, title: "Статистика просмотров", desc: "Отслеживайте, сколько людей просмотрели ваше объявление. Анализируйте эффективность." },
      { icon: <CheckCircle color="primary" />, title: "Редактирование в один клик", desc: "Изменяйте описание, цены, фото и другие данные в любой момент. Без подтверждений с нашей стороны." },
      { icon: <CheckCircle color="primary" />, title: "Уникальный URL объявления", desc: "Копируйте ссылку на ваше объявление и размещайте где угодно: Google Ads, Google Карты, соцсети." },
      { icon: <CheckCircle color="primary" />, title: "Точный адрес и маршрут", desc: "Клиенты видят точный адрес и могут проложить маршрут к вашему объекту." },
      { icon: <CheckCircle color="primary" />, title: "Автоматическое сохранение черновика", desc: "Если вы прервали создание — все данные сохранятся. Продолжайте в любое удобное время." }
    ],

    howToTitle: "Как разместить объявление об аренде жилья за 5 минут?",
    steps: [
      { step: "1", title: "Зарегистрируйтесь", desc: "Через Google или email — это займет 1 минуту." },
      { step: "2", title: "Выберите категорию", desc: "Выберите тип жилья из 12 доступных категорий." },
      { step: "3", title: "Заполните информацию", desc: "Добавьте название, описание, цену, адрес и контакты." },
      { step: "4", title: "Добавьте фото", desc: "Загрузите минимум 3 фото вашего объекта." },
      { step: "5", title: "Опубликуйте", desc: "Нажмите кнопку и получайте первые запросы уже сегодня!" }
    ],

    forWhomTitle: "Кому выгодно размещать объявления на NaDoby?",
    forWhom: [
      "Владельцам квартир для посуточной аренды",
      "Владельцам домов и коттеджей",
      "Отелям и мини-отелям",
      "Отелям для животных",
      "Владельцам саун и бань",
      "Глэмпингам и базам отдыха",
      "Коворкингам и рабочим пространствам"
    ],

    featuresTitle: "Мощные функции для владельцев жилья",
    features: [
      { title: "📊 Статистика просмотров", desc: "Видите, сколько людей просмотрели ваше объявление" },
      { title: "✏️ Редактирование объявления", desc: "Изменяйте любые данные в один клик" },
      { title: "🔗 Уникальная ссылка", desc: "Копируйте URL и делитесь где угодно" },
      { title: "🗺️ Точный адрес и маршрут", desc: "Клиенты легко найдут вас" },
      { title: "📱 Контактный телефон", desc: "Клиенты звонят напрямую вам" },
      { title: "💾 Автосохранение", desc: "Черновик сохраняется автоматически" }
    ],

    faqTitle: "Частые вопросы о размещении объявлений на NaDoby",
    faq: [
      { q: "Сколько стоит размещение объявления?", a: "Размещение объявлений на NaDoby абсолютно бесплатное! Вы не платите ни за размещение, ни за комиссию с аренды." },
      { q: "Сколько объявлений можно разместить?", a: "Неограниченное количество! Вы можете размещать объявления в любых категориях без каких-либо ограничений." },
      { q: "Как долго публикуется объявление?", a: "Мгновенно! Как только вы заполнили форму и нажали «Создать объявление» — оно сразу появляется на сайте." },
      { q: "Можно ли редактировать объявление после публикации?", a: "Да! Вы можете изменять любые данные: описание, цену, фото, контакты — в личном кабинете." },
      { q: "Как клиенты находят мое объявление?", a: "Через поиск на сайте, через ваш уникальный URL-адрес, а также через Google поиск." },
      { q: "Нужно ли подтверждение с вашей стороны?", a: "Нет! Все работает автоматически. Вы размещаете объявление и оно сразу публикуется." }
    ],

    ctaTitle: "Готовы разместить объявление об аренде жилья?",
    ctaSubtitle: "Присоединяйтесь к владельцам, которые уже размещают объявления на NaDoby",
    ctaButton: "Создать объявление",

    buttons: {
      home: "Главная",
      kyivApartments: "Квартиры Киев",
      addListing: "Добавить объявление"
    },

    seoTitle: "Размещение объявлений об аренде жилья в Украине — NaDoby",
    seoText: "NaDoby — это лучшая платформа для бесплатного размещения объявлений об аренде жилья в Украине. Мы предлагаем 12 категорий жилья: квартиры, отели, дома, сауны, глэмпинги, хостелы, коворкинги и многое другое. Размещайте объявления без посредников, получайте статистику просмотров, редактируйте в один клик и делитесь ссылкой на объявление где угодно. Все функции абсолютно бесплатны и доступны каждому владельцу жилья в Украине."
  }
};

function PageContent() {
  const { currentLanguage } = useLanguage();
  const content = CONTENT[currentLanguage] || CONTENT.ua;

  return (
    <>
      <Head>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <meta name="keywords" content={content.metaKeywords} />
        <meta property="og:title" content={content.metaTitle} />
        <meta property="og:description" content={content.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nadoby.com.ua/rozmistyty-ogoloshennya" />
        <link rel="canonical" href="https://nadoby.com.ua/rozmistyty-ogoloshennya" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "name": content.metaTitle, "description": content.metaDescription, "url": "https://nadoby.com.ua/rozmistyty-ogoloshennya" }) }} />
      </Head>

      <Header />

      {/* ===== HERO ===== */}
      <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 10 }, background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)', color: 'white' }}>
        <Container maxWidth="lg">
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3.2rem' }, fontWeight: 800, mb: 3, textAlign: 'center', lineHeight: 1.2 }}>
            {content.h1Title}
          </Typography>
          <Typography variant="h5" component="h2" sx={{ fontSize: { xs: '1rem', md: '1.3rem' }, fontWeight: 400, mb: 4, textAlign: 'center', opacity: 0.9, maxWidth: '800px', mx: 'auto' }}>
            {content.subtitle}
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button component={Link} href="/add-apartment" variant="contained" size="large" endIcon={<ArrowForward />} sx={{ bgcolor: 'white', color: '#1976d2', px: { xs: 4, md: 6 }, py: { xs: 1.5, md: 2 }, fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 700, borderRadius: 3, '&:hover': { bgcolor: '#f5f5f5', transform: 'scale(1.02)' }, transition: 'all 0.3s ease' }}>
              {content.ctaButton}
            </Button>
          </Box>
        </Container>
      </Box>

      <SectionSpacer />

      {/* ===== ВСТУП ===== */}
      <Container maxWidth="lg">
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, bgcolor: '#f8f9fa', borderRadius: 3 }}>
          <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 2, color: '#1a1a2e' }}>
            {content.introTitle}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, color: '#555' }}>
            {content.introText}
          </Typography>
        </Paper>
      </Container>

      <SectionSpacer />

      {/* ===== КАТЕГОРИИ ===== */}
      <Box sx={{ bgcolor: '#f5f5f5', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700, mb: 1, textAlign: 'center', color: '#1a1a2e' }}>
            {content.categoriesTitle}
          </Typography>
          <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 400, mb: 5, textAlign: 'center', color: '#666' }}>
            {content.categoriesSubtitle}
          </Typography>

          <Grid container spacing={2.5}>
            {content.categories.map((cat, idx) => (
              <Grid item xs={6} sm={4} md={3} key={idx}>
                <Link href={cat.link} style={{ textDecoration: 'none' }}>
                  <Card sx={{ height: '100%', textAlign: 'center', p: { xs: 2, md: 3 }, transition: 'all 0.3s ease', cursor: 'pointer', '&:hover': { transform: 'translateY(-8px)', boxShadow: 8, borderColor: '#1976d2' }, border: '1px solid #eee' }}>
                    <Box sx={{ color: '#1976d2', fontSize: { xs: 32, md: 40 }, mb: 1.5 }}>{cat.icon}</Box>
                    <Typography variant="h4" component="h4" sx={{ fontWeight: 700, fontSize: { xs: '0.85rem', md: '0.95rem' }, color: '#1a1a2e' }}>
                      {cat.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, fontSize: { xs: '0.65rem', md: '0.75rem' } }}>
                      {cat.desc}
                    </Typography>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ height: { xs: '48px', md: '64px' } }} />
          
          {/* Кнопки */}
          <Box sx={{ textAlign: 'center', display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', pt: { xs: 3, md: 4 }, borderTop: '1px solid #e0e0e0' }}>
            <Button component={Link} href="/" variant="outlined" sx={{ borderRadius: 3, px: { xs: 3, md: 4 } }}>
              {content.buttons.home}
            </Button>
            <Button component={Link} href="/kyiv-apartments" variant="outlined" sx={{ borderRadius: 3, px: { xs: 3, md: 4 } }}>
              {content.buttons.kyivApartments}
            </Button>
            <Button component={Link} href="/add-apartment" variant="contained" sx={{ borderRadius: 3, px: { xs: 3, md: 4 } }}>
              {content.buttons.addListing}
            </Button>
          </Box>
        </Container>
      </Box>

      <SectionSpacer />

      {/* ===== ПРЕИМУЩЕСТВА ===== */}
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700, mb: 4, textAlign: 'center', color: '#1a1a2e' }}>
          {content.advantagesTitle}
        </Typography>

        <Grid container spacing={3}>
          {content.advantages.map((adv, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ p: { xs: 2.5, md: 3 }, height: '100%', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  {adv.icon}
                  <Typography variant="h3" component="h3" sx={{ ml: 1.5, fontWeight: 700, fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
                    {adv.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {adv.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <SectionSpacer />

      {/* ===== КАК РАЗМЕСТИТЬ ===== */}
      <Box sx={{ bgcolor: '#e3f2fd', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700, mb: 4, textAlign: 'center', color: '#1a1a2e' }}>
            {content.howToTitle}
          </Typography>

          <Grid container spacing={3}>
            {content.steps.map((step, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Paper sx={{ p: { xs: 3, md: 4 }, textAlign: 'center', borderRadius: 3, height: '100%', bgcolor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                  <Box sx={{ width: { xs: 50, md: 60 }, height: { xs: 50, md: 60 }, borderRadius: '50%', bgcolor: '#1976d2', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: { xs: '1.5rem', md: '1.8rem' }, fontWeight: 700, mx: 'auto', mb: 2 }}>
                    {step.step}
                  </Box>
                  <Typography variant="h4" component="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <SectionSpacer />

      {/* ===== ДЛЯ КОГО ===== */}
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700, mb: 3, textAlign: 'center', color: '#1a1a2e' }}>
          {content.forWhomTitle}
        </Typography>

        <Grid container spacing={2}>
          {content.forWhom.map((item, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Paper sx={{ p: { xs: 2, md: 2.5 }, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CheckCircle color="primary" sx={{ fontSize: { xs: 18, md: 20 } }} />
                <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>{item}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <SectionSpacer />

      {/* ===== ФУНКЦИИ ===== */}
      <Box sx={{ bgcolor: '#f5f5f5', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700, mb: 4, textAlign: 'center', color: '#1a1a2e' }}>
            {content.featuresTitle}
          </Typography>

          <Grid container spacing={3}>
            {content.features.map((feature, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Paper sx={{ p: { xs: 2.5, md: 3 }, height: '100%', bgcolor: 'white' }}>
                  <Typography variant="h5" component="h5" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <SectionSpacer />

      {/* ===== FAQ ===== */}
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700, mb: 4, textAlign: 'center', color: '#1a1a2e' }}>
          {content.faqTitle}
        </Typography>

        <Grid container spacing={3}>
          {content.faq.map((item, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Paper sx={{ p: { xs: 2.5, md: 3 }, height: '100%', borderRadius: 3 }}>
                <Typography variant="h3" component="h3" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1rem', md: '1.1rem' }, color: '#1976d2' }}>
                  {item.q}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {item.a}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <SectionSpacer />

      {/* ===== CTA ===== */}
      <Box sx={{ py: { xs: 6, md: 10 }, background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)', color: 'white' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700, mb: 2 }}>
            {content.ctaTitle}
          </Typography>
          <Typography variant="h4" component="h4" sx={{ mb: 4, opacity: 0.9, fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 400 }}>
            {content.ctaSubtitle}
          </Typography>
          <Button component={Link} href="/add-apartment" variant="contained" size="large" endIcon={<ArrowForward />} sx={{ bgcolor: 'white', color: '#1976d2', px: { xs: 4, md: 6 }, py: { xs: 1.5, md: 2 }, fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 700, borderRadius: 3, '&:hover': { bgcolor: '#f5f5f5', transform: 'scale(1.02)' }, transition: 'all 0.3s ease' }}>
            {content.ctaButton}
          </Button>
        </Container>
      </Box>

      <SectionSpacer />

      {/* ===== SEO FOOTER ===== */}
      <Container maxWidth="lg">
        <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' }, fontWeight: 700, mb: 2, textAlign: 'center', color: '#1a1a2e' }}>
          {content.seoTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, textAlign: 'center' }}>
          {content.seoText}
        </Typography>
      </Container>

      <SectionSpacer />

      <Footer />
    </>
  );
}

export default function RozmistytyOholoshennyaPage() {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  );
}