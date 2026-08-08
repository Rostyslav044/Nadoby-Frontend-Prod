



// next-sitemap.config.js

const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

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
    
    // ========== АВТОМАТИЧЕСКИ ПОЛУЧАЕМ ID ИЗ БАЗЫ ДАННЫХ ==========
    let apartmentIds = [];
    
    // Проверяем наличие переменной окружения
    if (!process.env.MONGODB_URI) {
      console.log('⚠️ MONGODB_URI не найден в переменных окружения');
      console.log('💡 Попробуйте загрузить из .env.local');
      
      // Пробуем загрузить из .env.local если есть
      try {
        require('dotenv').config({ path: '.env.local' });
        console.log('📁 Загружен .env.local');
      } catch (err) {
        console.log('⚠️ dotenv не установлен, пропускаем');
      }
    }
    
    // Сначала пробуем получить из БД (самый надежный способ)
    if (process.env.MONGODB_URI) {
      try {
        const client = new MongoClient(process.env.MONGODB_URI);
        
        await client.connect();
        console.log('✅ Подключение к MongoDB установлено');
        
        const db = client.db(); // использует имя БД из URI
        const apartments = await db
          .collection('apartments')
          .find({}) 
          .project({ _id: 1 })
          .toArray();
        
        apartmentIds = apartments.map(apt => apt._id.toString());
        
        await client.close();
        
        console.log(`✅ Загружено ${apartmentIds.length} ID объявлений из базы данных`);
      } catch (error) {
        console.error('❌ Ошибка получения данных из БД:', error.message);
        console.log('💡 Пробуем использовать файл .apartment-ids.json как fallback...');
        
        // Fallback: пробуем прочитать из файла
        apartmentIds = loadIdsFromFile();
      }
    } else {
      console.log('⚠️ MONGODB_URI не найден, используем файл .apartment-ids.json');
      apartmentIds = loadIdsFromFile();
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
    
    // Добавляем статические пути
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

// Функция для загрузки ID из файла (fallback)
function loadIdsFromFile() {
  const idsFilePath = path.join(process.cwd(), '.apartment-ids.json');
  
  if (fs.existsSync(idsFilePath)) {
    try {
      const idsData = fs.readFileSync(idsFilePath, 'utf8');
      const ids = JSON.parse(idsData);
      console.log(`📁 Загружено ${ids.length} ID из файла .apartment-ids.json (fallback)`);
      return ids;
    } catch (err) {
      console.error('❌ Ошибка чтения файла с ID:', err.message);
      return [];
    }
  }
  
  console.log('⚠️ Файл .apartment-ids.json не найден');
  return [];
}

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
  
  // ========== СТРАНИЦЫ МЕТРО ==========
  const metroStations = [
    { slug: 'vokzalna', name: 'Вокзальная', priority: 0.9 },
    { slug: 'khreshchatyk', name: 'Крещатик', priority: 0.9 },
    { slug: 'poznyaky', name: 'Позняки', priority: 0.85 },
    { slug: 'libidska', name: 'Лыбедская', priority: 0.85 },
    { slug: 'pecherska', name: 'Печерская', priority: 0.9 },
    { slug: 'obolon', name: 'Оболонь', priority: 0.85 },
    { slug: 'demiyivska', name: 'Демиевская', priority: 0.85 },
    { slug: 'vydubychi', name: 'Выдубичи', priority: 0.85 },
    { slug: 'slavutych', name: 'Славутич', priority: 0.85 },
    { slug: 'arsenalna', name: 'Арсенальная', priority: 0.9 },
  { slug: 'teatralna', name: 'Театральная', priority: 0.9 },
  { slug: 'majdan-nezalezhnosti', name: 'Майдан Независимости', priority: 0.9 },
  { slug: 'osokorky', name: 'Осокорки', priority: 0.85 },
  { slug: 'chernihivska', name: 'Черниговская', priority: 0.85 },
  { slug: 'darnytsia', name: 'Дарница', priority: 0.85 },
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

   // ========== СТРАНИЦЫ ТИПОВ КВАРТИР (НОВЫЙ БЛОК) ==========
   const typePages = [
    { slug: '1-bedroom', name: '1-комнатные', priority: 0.85 },
    { slug: '2-bedroom', name: '2-комнатные', priority: 0.85 },
    { slug: '3-bedroom', name: '3-комнатные', priority: 0.85 },
    { slug: '4-bedroom', name: '4+ комнатные', priority: 0.85 },
  ];
  
  console.log(`🏠 Добавляем ${typePages.length} страниц типов квартир...`);
  
  typePages.forEach(type => {
    paths.push({
      loc: `/kyiv-apartments/type/${type.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: type.priority,
    });
  });

  // Добавляем страницу /rozmistyty-ogoloshennya
  paths.push({
    loc: '/rozmistyty-ogoloshennya',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.9,
  });
  
  console.log(`📊 Статические пути: ${paths.length} страниц (районы + метро + фильтры)`);
  
  return paths;
}