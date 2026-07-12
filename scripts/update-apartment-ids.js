// scripts/update-apartment-ids.js
const fs = require('fs');
const path = require('path');

async function updateApartmentIds() {
  console.log('🔄 Обновляем список ID объявлений...');
  
  // Пробуем разные URL
  const urls = [
    'https://nadoby.com.ua/api/v1/apartments/get-all',
    'http://localhost:3000/api/v1/apartments/get-all',
    'http://localhost:3001/api/v1/apartments/get-all'
  ];
  
  let apartments = null;
  let workingUrl = null;
  
  // Пробуем каждый URL с повторными попытками
  for (const url of urls) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`📡 Попытка ${attempt}: ${url}`);
        
        const res = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (compatible; SitemapGenerator/1.0)'
          },
          signal: AbortSignal.timeout(10000),
        });
        
        if (res.ok) {
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await res.json();
            
            // Извлекаем массив объявлений
            if (Array.isArray(data)) {
              apartments = data;
            } else if (data.apartments && Array.isArray(data.apartments)) {
              apartments = data.apartments;
            } else if (data.data && Array.isArray(data.data)) {
              apartments = data.data;
            }
            
            if (apartments && apartments.length > 0) {
              workingUrl = url;
              console.log(`✅ Успешно! Используем: ${url}`);
              break;
            }
          }
        } else {
          console.log(`   ⚠️ HTTP ${res.status}`);
        }
      } catch (err) {
        console.log(`   ❌ Ошибка: ${err.message}`);
        if (attempt < 3) {
          console.log(`   🔄 Повторная попытка через 2 секунды...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }
    if (apartments) break;
  }
  
  // Если удалось получить данные
  if (apartments && apartments.length > 0) {
    const ids = apartments.map(apt => apt._id).filter(id => id);
    
    // Сохраняем в файл
    const idsFilePath = path.join(process.cwd(), '.apartment-ids.json');
    fs.writeFileSync(idsFilePath, JSON.stringify(ids, null, 2));
    
    console.log(`\n✅ Обновлено ${ids.length} ID объявлений`);
    console.log(`📁 Файл сохранен: ${idsFilePath}`);
    console.log(`🌐 Источник: ${workingUrl}`);
    process.exit(0);
  }
  
  // Если ничего не получилось
  console.error('\n❌ Не удалось получить ID объявлений из API');
  console.log('💡 Проверьте:');
  console.log('   1. Работает ли бэкенд: https://nadoby.com.ua/api/v1/apartments/get-all');
  console.log('   2. Есть ли интернет соединение');
  console.log('   3. Правильно ли настроены переменные окружения');
  
  // Проверяем, есть ли уже файл с ID
  const idsFilePath = path.join(process.cwd(), '.apartment-ids.json');
  if (fs.existsSync(idsFilePath)) {
    try {
      const existingIds = JSON.parse(fs.readFileSync(idsFilePath, 'utf8'));
      console.log(`\n📦 Использую существующий файл с ${existingIds.length} ID`);
      console.log('⚠️ Sitemap будет сгенерирован с существующими объявлениями');
      process.exit(0);
    } catch (err) {
      console.error('❌ Ошибка чтения существующего файла');
    }
  }
  
  process.exit(1);
}

updateApartmentIds();