// Данные районов для разных городов
export const DISTRICTS_DATA = {
    // Киев
    kyiv: {
      ua: [
        { id: 'golosiivskyi', name: 'Голосіївський' },
        { id: 'darnytskyi', name: 'Дарницький' },
        { id: 'desnyanskyi', name: 'Деснянський' },
        { id: 'dniprovskyi', name: 'Дніпровський' },
        { id: 'obolonskyi', name: 'Оболонський' },
        { id: 'pecherskyi', name: 'Печерський' },
        { id: 'podilskyi', name: 'Подільський' },
        { id: 'svyatoshynskyi', name: 'Святошинський' },
        { id: 'solomyanskyi', name: 'Солом\'янський' },
        { id: 'shevchenkivskyi', name: 'Шевченківський' },
        { id: 'kyiv_region', name: 'Київська область' },
      ],
      ru: [
        { id: 'golosiivskyi', name: 'Голосеевский' },
        { id: 'darnytskyi', name: 'Дарницкий' },
        { id: 'desnyanskyi', name: 'Деснянский' },
        { id: 'dniprovskyi', name: 'Днепровский' },
        { id: 'obolonskyi', name: 'Оболонский' },
        { id: 'pecherskyi', name: 'Печерский' },
        { id: 'podilskyi', name: 'Подольский' },
        { id: 'svyatoshynskyi', name: 'Святошинский' },
        { id: 'solomyanskyi', name: 'Соломенский' },
        { id: 'shevchenkivskyi', name: 'Шевченковский' },
        { id: 'kyiv_region', name: 'Киевская область' },
      ],
    },
  };
  
  // Функция для получения названия района по ID
  export const getDistrictName = (districtId, language = 'ua') => {
    if (!districtId) return '';
    
    // Ищем во всех городах
    for (const cityKey in DISTRICTS_DATA) {
      const cityDistricts = DISTRICTS_DATA[cityKey][language];
      const district = cityDistricts.find(d => d.id === districtId);
      if (district) {
        return district.name;
      }
    }
    
    return districtId; // Если не нашли, возвращаем ID
  };
  
  // Вспомогательная функция для получения ключа города
  export const getCityKey = (cityName) => {
    if (!cityName) return null;
    
    const city = cityName.toLowerCase().trim();
    
    if (city.includes('київ') || city.includes('киев') || city.includes('kiev')) {
      return 'kyiv';
    }
    
    return null;
  };
  
  // Функция для проверки, является ли город Киевом
  export const isKyiv = (city) => {
    if (!city) return false;
    const cityLower = city.toLowerCase().trim();
    return cityLower === 'київ' || cityLower === 'киев' || cityLower === 'kiev';
  };