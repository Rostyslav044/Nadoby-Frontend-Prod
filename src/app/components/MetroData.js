// app/components/MetroData.js

// Данные станций метро для Киева (только список для отображения на главной)
export const METRO_DATA = {
    kyiv: {
      ua: [
        { id: 'vokzalna', name: 'Вокзальна' },
        { id: 'khreshchatyk', name: 'Хрещатик' },
        { id: 'poznyaky', name: 'Позняки' },
        // TODO: Добавить остальные станции метро
        // { id: 'akademmistechko', name: 'Академмістечко' },
        // { id: 'zhytomyrska', name: 'Житомирська' },
        // ... и т.д.
      ],
      ru: [
        { id: 'vokzalna', name: 'Вокзальная' },
        { id: 'khreshchatyk', name: 'Крещатик' },
        { id: 'poznyaky', name: 'Позняки' },
        // TODO: Добавить остальные станции метро
      ],
    },
  };
  
  // Функция для получения названия станции по ID
  export const getMetroName = (metroId, language = 'ua') => {
    if (!metroId) return '';
    
    const metroList = METRO_DATA.kyiv[language] || [];
    const metro = metroList.find(m => m.id === metroId);
    return metro ? metro.name : metroId;
  };
  
  // Функция для проверки существования станции
  export const isMetroExists = (metroId) => {
    const allMetro = [...METRO_DATA.kyiv.ua, ...METRO_DATA.kyiv.ru];
    return allMetro.some(m => m.id === metroId);
  };