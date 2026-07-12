const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
  console.log('🚀 Начинаем оптимизацию изображений для блога...');
  
  const imageDir = path.join(process.cwd(), 'public');
  const files = [
    'scams.png', 'apartment.png', 'hotel.png', 'animal.png',
    'hostel.png', 'house.png', 'sauna.png', 'camp.png',
    'glamping.png', 'pansionat.png', 'kotedzi.png', 
    'kavorking.png', 'avtokemping.png'
  ];
  
  const optimizedDir = path.join(imageDir, 'optimized');
  try {
    await fs.mkdir(optimizedDir, { recursive: true });
    console.log('📁 Создана папка /public/optimized');
  } catch (err) {
    console.log('📁 Папка уже существует');
  }
  
  for (const file of files) {
    const inputPath = path.join(imageDir, file);
    const fileName = path.parse(file).name;
    
    try {
      await fs.access(inputPath);
    } catch (err) {
      console.log(`⚠️  Файл ${file} не найден, пропускаем...`);
      continue;
    }
    
    console.log(`\n🖼  Обрабатываем: ${file}`);
    
    const sizes = [
      { width: 400, suffix: 'small', quality: 70 },
      { width: 800, suffix: 'medium', quality: 75 },
      { width: 1200, suffix: 'large', quality: 80 }
    ];
    
    for (const size of sizes) {
      try {
        await sharp(inputPath)
          .resize(size.width, null, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality: size.quality })
          .toFile(path.join(optimizedDir, `${fileName}-${size.suffix}.webp`));
        
        console.log(`  ✅ ${fileName}-${size.suffix}.webp (${size.width}px)`);
        
        if (size.suffix === 'small') {
          await sharp(inputPath)
            .resize(size.width, null, {
              fit: 'inside',
              withoutEnlargement: true
            })
            .png({ quality: 80, compressionLevel: 9 })
            .toFile(path.join(optimizedDir, `${fileName}-${size.suffix}.png`));
          
          console.log(`  ✅ ${fileName}-${size.suffix}.png (fallback)`);
        }
      } catch (err) {
        console.log(`  ❌ Ошибка: ${err.message}`);
      }
    }
  }
  
  console.log('\n✨ Оптимизация завершена!');
}

optimizeImages().catch(console.error);
