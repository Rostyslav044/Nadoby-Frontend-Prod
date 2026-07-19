



// next-sitemap.config.js

const fs = require('fs');
const path = require('path');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nadoby.com.ua',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/*', '/api/*', '/test-*', '/resetpassword/*', '/listings/*', '/user-apartments/*'],
      },
    ],
  },
  
  additionalPaths: async (config) => {
    const paths = []; 
    
    console.log('🔄 Начинаем генерацию динамических страниц для sitemap...');
    
    // ========== ЧИТАЕМ ID ИЗ ФАЙЛА (создается скриптом update-ids) ==========
    const idsFilePath = path.join(process.cwd(), '.apartment-ids.json');
    let apartmentIds = [];
    
    if (fs.existsSync(idsFilePath)) {
      try {
        const idsData = fs.readFileSync(idsFilePath, 'utf8');
        apartmentIds = JSON.parse(idsData);
        console.log(`✅ Загружено ${apartmentIds.length} ID объявлений из файла .apartment-ids.json`);
      } catch (err) {
        console.error('❌ Ошибка чтения файла с ID:', err.message);
      }
    } else {
      console.log('⚠️ Файл .apartment-ids.json не найден');
      console.log('💡 Запустите: npm run update-ids');
    }
    
    // Добавляем страницы объявлений
    if (apartmentIds.length > 0) {
      console.log(`🏠 Добавляем ${apartmentIds.length} страниц объявлений...`);
      
      apartmentIds.forEach(id => {
        paths.push({
          loc: `/apartment/${id}`,
          lastmod: new Date().toISOString(),
          changefreq: 'daily',
          priority: 0.8,
        });
      });
      
      console.log(`✅ Добавлено ${paths.filter(p => p.loc.startsWith('/apartment/')).length} страниц объявлений`);
    } else {
      console.log('⚠️ Нет ID объявлений для добавления');
    }
    
    // Добавляем районы, фильтры и метро
    const staticPaths = getStaticPaths();
    return [...paths, ...staticPaths];
  },
  
  transform: (config, url) => {
    if (url === 'https://nadoby.com.ua') {
      return {
        loc: url,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }
    
    if (url.includes('/kyiv-apartments')) {
      return {
        loc: url,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }
    
    if (url.includes('/blog')) {
      return {
        loc: url,
        changefreq: 'weekly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      };
    }
    
    return {
      loc: url,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
  
  exclude: [
    '/admin/*',
    '/api/*',
    '/test-*',
    '/resetpassword/*',
    '/listings/*',
    '/user-apartments/*',
    '/blog/blogData',
    '/blog/components/*',
  ],
  
  output: 'standalone',
  generateIndexSitemap: true,
};

// Функция для статических путей (районы + фильтры + метро)
function getStaticPaths() {
  const paths = [];
  
  // ========== СТРАНИЦЫ РАЙОНОВ ==========
  const districts = [
    { slug: 'pechersk', name: 'Печерск', priority: 0.9 },
    { slug: 'obolon', name: 'Оболонь', priority: 0.85 },
    { slug: 'golosiyivsky', name: 'Голосеевский', priority: 0.85 },
    { slug: 'darnytsia', name: 'Дарница', priority: 0.8 },
    { slug: 'shevchenkivsky', name: 'Шевченковский', priority: 0.85 }, 
    { slug: 'sviatoshyn', name: 'Святошин', priority: 0.8 }, 
    { slug: 'podil', name: 'Подол', priority: 0.85 },
    { slug: 'solomyanskyi', name: 'Соломенский', priority: 0.85 }, 
    { slug: 'desnianskyi', name: 'Деснянский', priority: 0.8 },
    { slug: 'dniprovskyi', name: 'Днепровский', priority: 0.8 },
    { slug: 'kyiv_region', name: 'Киевская область', priority: 0.85 },
  ];
  
  console.log(`🏘️ Добавляем ${districts.length} страниц районов...`);
  
  districts.forEach(district => {
    paths.push({
      loc: `/kyiv-apartments/district/${district.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: district.priority,
    });
  });
  
  // ========== СТРАНИЦЫ МЕТРО (НОВЫЙ БЛОК) ==========
  const metroStations = [
    { slug: 'vokzalna', name: 'Вокзальная', priority: 0.9 },
    { slug: 'khreshchatyk', name: 'Крещатик', priority: 0.9 },
    { slug: 'poznyaky', name: 'Позняки', priority: 0.85 },
      // ===== НОВЫЕ СТАНЦИИ МЕТРО =====
  { slug: 'libidska', name: 'Лыбедская', priority: 0.85 },
  { slug: 'pecherska', name: 'Печерская', priority: 0.9 },
  { slug: 'obolon', name: 'Оболонь', priority: 0.85 },

    // TODO: Добавить остальные станции метро
    // { slug: 'akademmistechko', name: 'Академгородок', priority: 0.8 },
    // { slug: 'zhytomyrska', name: 'Житомирская', priority: 0.8 },
    // { slug: 'sviatoshyn', name: 'Святошин', priority: 0.8 },
    // { slug: 'nyvky', name: 'Нивки', priority: 0.8 },
    // { slug: 'beresteyska', name: 'Берестейская', priority: 0.8 },
    // { slug: 'shuliavska', name: 'Шулявская', priority: 0.8 },
    // { slug: 'politekhnichnyi-instytut', name: 'Политехнический институт', priority: 0.8 },
    // { slug: 'universytet', name: 'Университет', priority: 0.8 },
    // { slug: 'teatralna', name: 'Театральная', priority: 0.8 },
    // { slug: 'arsenalna', name: 'Арсенальная', priority: 0.8 },
    // { slug: 'dnipro', name: 'Днепр', priority: 0.8 },
    // { slug: 'hidropark', name: 'Гидропарк', priority: 0.8 },
    // { slug: 'livoberezhna', name: 'Левобережная', priority: 0.8 },
    // { slug: 'darnytsia', name: 'Дарница', priority: 0.8 },
    // { slug: 'chernihivska', name: 'Черниговская', priority: 0.8 },
    // { slug: 'lisova', name: 'Лесная', priority: 0.8 },
    // { slug: 'heroiv-dnipra', name: 'Героев Днепра', priority: 0.8 },
    // { slug: 'minska', name: 'Минская', priority: 0.8 },
    // { slug: 'obolon', name: 'Оболонь', priority: 0.85 },
    // { slug: 'pochayna', name: 'Почайна', priority: 0.8 },
    // { slug: 'tarasa-shevchenka', name: 'Тараса Шевченко', priority: 0.8 },
    // { slug: 'kontraktova-ploshcha', name: 'Контрактовая площадь', priority: 0.8 },
    // { slug: 'poshtova-ploshcha', name: 'Почтовая площадь', priority: 0.8 },
    // { slug: 'maidan-nezalezhnosti', name: 'Майдан Независимости', priority: 0.9 },
    // { slug: 'ploshcha-ukrainskykh-heroiv', name: 'Площадь Украинских Героев', priority: 0.8 },
    // { slug: 'olimpiiska', name: 'Олимпийская', priority: 0.8 },
    // { slug: 'palats-ukraina', name: 'Дворец «Украина»', priority: 0.8 },
    // { slug: 'lybidska', name: 'Лыбедская', priority: 0.8 },
    // { slug: 'demiivska', name: 'Демиевская', priority: 0.85 },
    // { slug: 'holosiivska', name: 'Голосеевская', priority: 0.8 },
    // { slug: 'vasylkivska', name: 'Васильковская', priority: 0.8 },
    // { slug: 'vystavkovyi-tsentr', name: 'Выставочный центр', priority: 0.8 },
    // { slug: 'ipodrom', name: 'Ипподром', priority: 0.8 },
    // { slug: 'teremky', name: 'Теремки', priority: 0.8 },
    // { slug: 'syrets', name: 'Сырец', priority: 0.8 },
    // { slug: 'dorohozhychi', name: 'Дорогожичи', priority: 0.8 },
    // { slug: 'lukianivska', name: 'Лукьяновская', priority: 0.8 },
    // { slug: 'zoloti-vorota', name: 'Золотые ворота', priority: 0.85 },
    // { slug: 'palats-sportu', name: 'Дворец спорта', priority: 0.8 },
    // { slug: 'klovska', name: 'Кловская', priority: 0.8 },
    // { slug: 'pecherska', name: 'Печерская', priority: 0.85 },
    // { slug: 'zvirynetska', name: 'Зверинецкая', priority: 0.8 },
    // { slug: 'vydubychi', name: 'Выдубичи', priority: 0.8 },
    // { slug: 'slavutych', name: 'Славутич', priority: 0.8 },
    // { slug: 'osokorky', name: 'Осокорки', priority: 0.85 },
    // { slug: 'kharkivska', name: 'Харьковская', priority: 0.8 },
    // { slug: 'vyrlytsia', name: 'Вырлица', priority: 0.8 },
    // { slug: 'boryspilska', name: 'Бориспольская', priority: 0.8 },
    // { slug: 'chervonyi-khutir', name: 'Красный хутор', priority: 0.8 },
  ];
  
  console.log(`🚇 Добавляем ${metroStations.length} страниц метро...`);
  
  metroStations.forEach(station => {
    paths.push({
      loc: `/kyiv-apartments/metro/${station.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: station.priority,
    });
  });
  
  // ========== СТРАНИЦЫ ФИЛЬТРОВ ==========
  const filters = [
    { slug: '1-komnata', name: '1-комнатные', priority: 0.7 },
    { slug: '2-komnaty', name: '2-комнатные', priority: 0.7 },
    { slug: '3-komnaty', name: '3-комнатные', priority: 0.7 },
    { slug: '4-plus', name: '4+ комнатные', priority: 0.65 },
    { slug: 'posutochno', name: 'Посуточно', priority: 0.6 },
    { slug: 'centr', name: 'Центр', priority: 0.75 },
    { slug: 'levyy-bereg', name: 'Левый берег', priority: 0.7 },
    { slug: 'pravyy-bereg', name: 'Правый берег', priority: 0.7 },
  ];
  
  console.log(`🔍 Добавляем ${filters.length} страниц фильтров...`);
  
  filters.forEach(filter => {
    paths.push({
      loc: `/kyiv-apartments/${filter.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: filter.priority,
    });
  });

    // ✅ ДОБАВЛЯЕМ СТРАНИЦУ /rozmistyty-ogoloshennya ВРУЧНУЮ
    paths.push({
      loc: '/rozmistyty-ogoloshennya',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.9,
    });
  
  console.log(`📊 Статические пути: ${paths.length} страниц (районы + метро + фильтры)`);
  
  return paths;
}