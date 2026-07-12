



// 'use client';

// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import { Box, Typography, CircularProgress, Button } from '@mui/material';
// import { useGoogleMaps } from '../../GoogleMapsProvider';

// // Цвета для разных категорий жилья
// const CATEGORY_COLORS = {
//   'apart': '#e590ad',
//   'hostel': '#34A853', 
//   'glamping': '#FBBC05',
//   'hotel': '#4285F4',
//   'pet-hotel': '#9C27B0',
//   'house': '#795548',
//   'sauna': '#F44336',
//   'pansionat': '#607D8B',
//   'cottage': '#FF9800',
//   'coworking': '#E91E63',
//   'autocamping': '#4CAF50',
//   'rest-base': '#00BCD4',
//   'default': '#EA4335'
// };

// const MapComponent = ({ 
//   apartments, 
//   onApartmentSelect, 
//   centerMode = false, 
//   userLocation = null,
//   compactMode = false,
//   onShowAlert
// }) => {
//   // Рефы для управления картой
//   const mapRef = useRef(null);
//   const googleMapRef = useRef(null);
//   const markersRef = useRef([]);
//   const [mapLoading, setMapLoading] = useState(true);
//   const [mapError, setMapError] = useState(false);
  
//   const { isLoaded: isGoogleMapsLoaded, loadError: googleMapsError } = useGoogleMaps();

//   // Рефы для актуальных данных
//   const apartmentsRef = useRef(apartments);
//   const onShowAlertRef = useRef(onShowAlert);

//   // Обновляем рефы при изменении пропсов
//   useEffect(() => {
//     apartmentsRef.current = apartments;
//     onShowAlertRef.current = onShowAlert;
//   }, [apartments, onShowAlert]);

//   // Функция для получения цвета маркера по категории
//   const getCategoryColor = (category) => {
//     if (!category) return CATEGORY_COLORS.default;
    
//     const categoryLower = category.toLowerCase();
    
//     if (categoryLower.includes('apart') || categoryLower.includes('квартир')) 
//       return CATEGORY_COLORS.apart;
//     if (categoryLower.includes('hostel') || categoryLower.includes('хостел')) 
//       return CATEGORY_COLORS.hostel;
//     if (categoryLower.includes('glamping') || categoryLower.includes('глемпінг') || categoryLower.includes('глэмпинг')) 
//       return CATEGORY_COLORS.glamping;
//     if (categoryLower.includes('hotel') || categoryLower.includes('готел') || categoryLower.includes('гостиниц')) 
//       return CATEGORY_COLORS.hotel;
//     if (categoryLower.includes('pet') || categoryLower.includes('тварин') || categoryLower.includes('animals')) 
//       return CATEGORY_COLORS['pet-hotel'];
//     if (categoryLower.includes('house') || categoryLower.includes('будинок') || categoryLower.includes('дом')) 
//       return CATEGORY_COLORS.house;
//     if (categoryLower.includes('sauna') || categoryLower.includes('саун') || categoryLower.includes('бан')) 
//       return CATEGORY_COLORS.sauna;
//     if (categoryLower.includes('pansionat') || categoryLower.includes('пансіонат') || categoryLower.includes('пансионат')) 
//       return CATEGORY_COLORS.pansionat;
//     if (categoryLower.includes('cottage') || categoryLower.includes('котедж') || categoryLower.includes('kotedzi')) 
//       return CATEGORY_COLORS.cottage;
//     if (categoryLower.includes('coworking') || categoryLower.includes('коворкінг') || categoryLower.includes('коворкинг') || categoryLower.includes('kavorking')) 
//       return CATEGORY_COLORS.coworking;
//     if (categoryLower.includes('autocamping') || categoryLower.includes('автокемпінг') || categoryLower.includes('автокемпинг') || categoryLower.includes('avtokemping')) 
//       return CATEGORY_COLORS.autocamping;
//     if (categoryLower.includes('rest-base') || categoryLower.includes('база відпочинку') || categoryLower.includes('база отдыха') || categoryLower.includes('recreationcenter')) 
//       return CATEGORY_COLORS['rest-base'];
    
//     return CATEGORY_COLORS.default;
//   };

//   // Функция для получения URL иконки маркера
//   const getMarkerIcon = (color, price) => {
//     const markerWidth = 70;
//     const markerHeight = 80;
//     const priceRectWidth = 38;
//     const priceRectHeight = 25;
//     const priceFontSize = 14;
//     const priceTextColor = '#D32F2F';
//     const priceRectX = (markerWidth - priceRectWidth) / 2;
//     const priceRectY = 12;
//     const priceTextX = markerWidth / 2;
//     const priceTextY = priceRectY + priceRectHeight / 2 + 5;
    
//     // Форматируем цену для отображения
//     const formatPrice = (price) => {
//       if (!price) return '';
//       if (typeof price === 'number') {
//         return price.toString();
//       }
//       if (typeof price === 'string') {
//         const numericPrice = price.replace(/[^\d]/g, '');
//         if (numericPrice.length > 3) {
//           return numericPrice.slice(0, -3) + 'K';
//         }
//         return numericPrice;
//       }
//       return '';
//     };
    
//     const formattedPrice = formatPrice(price);
    
//     return {
//       url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
//         <svg width="${markerWidth}" height="${markerHeight}" viewBox="0 0 ${markerWidth} ${markerHeight}" xmlns="http://www.w3.org/2000/svg">
//           <path fill="${color}" d="M${markerWidth/2} 0C${markerWidth/2 - 12.8} 0 10 11.2 10 ${markerHeight/3.2}c0 18 25 45 25 45s25-27 25-45C60 11.2 48.8 0 35 0z"/>
//           <rect x="${priceRectX}" y="${priceRectY}" width="${priceRectWidth}" 
//           height="${priceRectHeight}" rx="4" fill="white" stroke="#ccc" stroke-width="1"/>
//           <text x="${priceTextX}" y="${priceTextY}" text-anchor="middle" 
//           fill="${priceTextColor}" font-size="${priceFontSize}"
//            font-weight="bold" font-family="Arial, sans-serif">
//             ${formattedPrice}
//           </text>
//         </svg>
//       `)}`,
//       scaledSize: new window.google.maps.Size(markerWidth, markerHeight),
//       anchor: new window.google.maps.Point(markerWidth/2, markerHeight),
//     };
//   };

//   // Функция для получения координат апартамента
//   const getApartmentCoordinates = (apartment) => {
//     if (apartment.latitude && apartment.longitude) {
//       const lat = parseFloat(apartment.latitude);
//       const lng = parseFloat(apartment.longitude);
//       if (!isNaN(lat) && !isNaN(lng)) {
//         return { lat, lng };
//       }
//     }

//     if ((apartment.city || apartment.street) && window.google) {
//       return new Promise((resolve) => {
//         const address = `${apartment.street || ''} ${apartment.houseNumber || ''}, ${apartment.city || ''}`.trim();
//         if (address.length > 3) {
//           const geocoder = new window.google.maps.Geocoder();
//           geocoder.geocode({ address: address + ', Украина' }, (results, status) => {
//             if (status === 'OK' && results[0]) {
//               const location = results[0].geometry.location;
//               resolve({
//                 lat: location.lat(),
//                 lng: location.lng()
//               });
//             } else {
//               resolve(getCityCoordinates(apartment.city));
//             }
//           });
//         } else {
//           resolve(getCityCoordinates(apartment.city));
//         }
//       });
//     }

//     return getCityCoordinates(apartment.city);
//   };

//   // Функция для получения координат города
//   const getCityCoordinates = (city) => {
//     const cityCoordinates = {
//       'киев': { lat: 50.4501, lng: 30.5234 },
//       'львов': { lat: 49.8397, lng: 24.0297 },
//       'одесса': { lat: 46.4825, lng: 30.7233 },
//       'харьков': { lat: 49.9935, lng: 36.2304 },
//       'днепр': { lat: 48.4647, lng: 35.0462 },
//       'запорожье': { lat: 47.8388, lng: 35.1396 },
//       'ивано-франковск': { lat: 48.9226, lng: 24.7111 },
//       'тернополь': { lat: 49.5535, lng: 25.5948 },
//       'черновцы': { lat: 48.2917, lng: 25.9354 },
//       'ужгород': { lat: 48.6208, lng: 22.2879 },
//       'луцк': { lat: 50.7476, lng: 25.3252 },
//       'ровно': { lat: 50.6199, lng: 26.2516 },
//       'житомир': { lat: 50.2547, lng: 28.6587 },
//       'черкассы': { lat: 49.4444, lng: 32.0598 },
//       'кропивницкий': { lat: 48.5079, lng: 32.2623 },
//       'николаев': { lat: 46.9750, lng: 31.9946 },
//       'херсон': { lat: 46.6354, lng: 32.6169 },
//       'полтава': { lat: 49.5883, lng: 34.5514 },
//       'сумы': { lat: 50.9077, lng: 34.7981 },
//       'чернигов': { lat: 51.4982, lng: 31.2893 }
//     };

//     if (!city) return { lat: 50.4501, lng: 30.5234 };
    
//     const cityLower = city.toLowerCase().trim();
//     return cityCoordinates[cityLower] || { lat: 50.4501, lng: 30.5234 };
//   };

//   // Функция для форматирования адреса
//   const formatAddress = (apartment) => {
//     const parts = [];
//     if (apartment.city) parts.push(apartment.city);
//     if (apartment.street && apartment.houseNumber) {
//       parts.push(`${apartment.street} ${apartment.houseNumber}`);
//     }
//     return parts.join(', ');
//   };

//   // Функция для получения основного фото
//   const getMainPhoto = (apartment) => {
//     if (apartment.photos && apartment.photos.length > 0) {
//       return apartment.photos[0];
//     }
//     return '/placeholder-apartment.jpg';
//   };

//   // Главная функция инициализации карты
//   const initializeMap = useCallback(async () => {
//     if (!mapRef.current || !window.google || !isGoogleMapsLoaded) return;

//     try {
//       const defaultCenter = { lat: 50.4501, lng: 30.5234 };
//       let center = defaultCenter;
//       const coordinates = [];

//       // Получаем координаты для всех апартаментов
//       for (const apartment of apartmentsRef.current) {
//         const coords = await getApartmentCoordinates(apartment);
//         coordinates.push(coords);
//       }

//       // Определяем центр карты
//       if (apartmentsRef.current.length > 0) {
//         if (centerMode && apartmentsRef.current[0]) {
//           center = coordinates[0] || defaultCenter;
//         } else {
//           const validCoords = coordinates.filter(coord => coord && !isNaN(coord.lat) && !isNaN(coord.lng));
//           if (validCoords.length > 0) {
//             const avgLat = validCoords.reduce((sum, coord) => sum + coord.lat, 0) / validCoords.length;
//             const avgLng = validCoords.reduce((sum, coord) => sum + coord.lng, 0) / validCoords.length;
//             center = { lat: avgLat, lng: avgLng };
//           }
//         }
//       }

//       // Создаем карту
//       const map = new window.google.maps.Map(mapRef.current, {
//         center: center,
//         zoom: apartmentsRef.current.length === 1 ? 14 : (compactMode ? 10 : 8),
//         mapTypeControl: !compactMode,
//         streetViewControl: !compactMode,
//         fullscreenControl: !compactMode,
//         zoomControl: !compactMode,
//         gestureHandling: 'greedy',
//         styles: [
//           {
//             featureType: "poi",
//             elementType: "labels",
//             stylers: [{ visibility: "on" }]
//           }
//         ]
//       });

//       googleMapRef.current = map;

//       // Очищаем старые маркеры
//       markersRef.current.forEach(marker => {
//         if (marker && marker.setMap) {
//           marker.setMap(null);
//         }
//       });
//       markersRef.current = [];

//       // Глобальные функции для обработки кликов
//       window.handleMapApartmentSelect = (apartmentId) => {
//         const selectedApartment = apartmentsRef.current.find(apt => apt._id === apartmentId);
//         if (selectedApartment && onApartmentSelect) {
//           onApartmentSelect(selectedApartment);
//         }
//       };

//       window.handleMapRouteClick = (lat, lng, event) => {
//         if (event) event.stopPropagation();
//         window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
//       };

//       // Функция для закрытия всех информационных окон
//       const closeAllInfoWindows = () => {
//         markersRef.current.forEach(marker => {
//           if (marker.infoWindow) {
//             marker.infoWindow.close();
//           }
//         });
//       };

//       // Добавляем обработчик клика на карту для закрытия информационных окон
//       map.addListener('click', closeAllInfoWindows);

//       // Создаем маркеры для каждого апартамента
//       for (let i = 0; i < apartmentsRef.current.length; i++) {
//         const apartment = apartmentsRef.current[i];
//         const position = coordinates[i] || defaultCenter;

//         if (!position || isNaN(position.lat) || isNaN(position.lng)) {
//           continue;
//         }

//         const categoryColor = getCategoryColor(apartment.category);
        
//         const markerIcon = getMarkerIcon(
//           categoryColor, 
//           apartment.price
//         );

//         // Создаем маркер на карте
//         const marker = new window.google.maps.Marker({
//           position: position,
//           map: map,
//           title: apartment.objectName || apartment.category || 'Апартаменты',
//           icon: markerIcon,
//           animation: window.google.maps.Animation.DROP
//         });

//         const address = formatAddress(apartment);
//         const mainPhoto = getMainPhoto(apartment);

//         // Определяем тип устройства для адаптивного дизайна
//         const isMobile = window.innerWidth < 768;
        
//         if (isMobile) {
//           // МОБИЛЬНАЯ ВЕРСИЯ КАРТОЧКИ - ВЕРТИКАЛЬНАЯ
//           const infoWindowContent = `
//             <div style="
//               width: 300px;
//               background: white;
//               border-radius: 12px;
//               overflow: hidden;
//               box-shadow: 0 8px 24px rgba(0,0,0,0.15);
//               cursor: pointer;
//               font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//               transition: transform 0.2s ease;
//             " onclick="event.stopPropagation(); window.handleMapApartmentSelect('${apartment._id}')"
//                onmouseenter="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 32px rgba(0,0,0,0.2)'"
//                onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.15)'">
              
//               <!-- Изображение -->
//               <div style="
//                 position: relative;
//                 width: 100%;
//                 height: 150px;
//                 overflow: hidden;
//               ">
//                 <img src="${mainPhoto}" 
//                      alt="${apartment.objectName || 'Фото'}" 
//                      style="
//                        width: 100%;
//                        height: 100%;
//                        object-fit: cover;
//                        transition: transform 0.3s ease;
//                      }"
//                      onmouseenter="this.style.transform='scale(1.05)'"
//                      onmouseleave="this.style.transform='scale(1)'" />
                
//                 <!-- Бейдж категории -->
//                 <div style="
//                   position: absolute;
//                   top: 12px;
//                   left: 12px;
//                   background: ${categoryColor};
//                   color: white;
//                   padding: 6px 12px;
//                   border-radius: 16px;
//                   font-weight: 600;
//                   font-size: 12px;
//                   backdrop-filter: blur(4px);
//                   box-shadow: 0 3px 10px rgba(0,0,0,0.2);
//                   max-width: 70%;
//                   white-space: nowrap;
//                   overflow: hidden;
//                   text-overflow: ellipsis;
//                 ">
//                   ${apartment.category || 'Жилье'}
//                 </div>
//               </div>
              
//               <!-- Контент -->
//               <div style="padding: 14px;">
//                 <!-- Название -->
//                 <h3 style="
//                   margin: 0 0 8px 0;
//                   font-size: 16px;
//                   color: #1a237e;
//                   font-weight: 700;
//                   line-height: 1.3;
//                   overflow: hidden;
//                   text-overflow: ellipsis;
//                   display: -webkit-box;
//                   -webkit-line-clamp: 2;
//                   -webkit-box-orient: vertical;
//                 }">
//                   ${apartment.objectName || 'Апартаменты'}
//                 </h3>
                
//                 <!-- Адрес -->
//                 <div style="
//                   display: flex;
//                   align-items: flex-start;
//                   gap: 6px;
//                   margin-bottom: 4px;
//                   color: #424242;
//                   font-size: 13px;
//                   line-height: 1.3;
//                   min-height: 32px;
//                 ">
//                   <span style="
//                     color: #5c6bc0;
//                     flex-shrink: 0;
//                     font-size: 13px;
//                     margin-top: 2px;
//                   ">📍</span>
//                   <span style="
//                     overflow: hidden;
//                     text-overflow: ellipsis;
//                     display: -webkit-box;
//                     -webkit-line-clamp: 2;
//                     -webkit-box-orient: vertical;
//                   }">
//                     ${address}
//                   </span>
//                 </div>
                
//                 <!-- Дополнительная информация -->
//                 <div style="
//                   display: flex;
//                   flex-wrap: wrap;
//                   gap: 8px;
//                   margin-bottom: 12px;
//                 ">
//                   ${apartment.district ? `
//                     <div style="
//                       display: flex;
//                       align-items: center;
//                       gap: 5px;
//                       background: #f5f5f5;
//                       padding: 5px 10px;
//                       border-radius: 8px;
//                       font-size: 12px;
//                       color: #616161;
//                     }">
//                       <span style="color: #757575;">🏘️</span>
//                       <span style="
//                         font-weight: 500;
//                         white-space: nowrap;
//                         overflow: hidden;
//                         text-overflow: ellipsis;
//                         max-width: 120px;
//                       }">
//                         ${apartment.district}
//                       </span>
//                     </div>
//                   ` : ''}
                  
//                   ${apartment.metro ? `
//                     <div style="
//                       display: flex;
//                       align-items: center;
//                       gap: 5px;
//                       background: #e8f5e9;
//                       padding: 5px 10px;
//                       border-radius: 8px;
//                       font-size: 12px;
//                       color: #2e7d32;
//                     }">
//                       <span style="color: #43a047;">🚇</span>
//                       <span style="
//                         font-weight: 500;
//                         white-space: nowrap;
//                         overflow: hidden;
//                         text-overflow: ellipsis;
//                         max-width: 120px;
//                       }">
//                         ${apartment.metro}
//                       </span>
//                     </div>
//                   ` : ''}
//                 </div>
                
//                 <!-- Цена и кнопка маршрута -->
//                 <div style="
//                   display: flex;
//                   align-items: center;
//                   justify-content: space-between;
//                   gap: 12px;
//                 ">
//                   <!-- Цена -->
//                   <div style="
//                     display: flex;
//                     flex-direction: column;
//                   ">
//                     <div style="
//                       font-size: 16px;
//                       font-weight: 800;
//                       color: #1b5e20;
//                       line-height: 1;
//                     }">
//                       ${apartment.price ? apartment.price + ' грн' : '—'}
//                     </div>
//                     <div style="
//                       font-size: 12px;
//                       color: #757575;
//                       margin-top: 3px;
//                     }">
                     
//                     </div>
//                   </div>
                  
//                   <!-- Кнопка маршрута -->
//                   <button onclick="event.stopPropagation(); window.handleMapRouteClick(${position.lat}, ${position.lng}, event)"
//                           style="
//                             background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
//                             color: white;
//                             border: none;
//                             padding: 8px 16px;
//                             border-radius: 8px;
//                             cursor: pointer;
//                             font-size: 13px;
//                             font-weight: 600;
//                             display: flex;
//                             align-items: center;
//                             justify-content: center;
//                             gap: 6px;
//                             transition: all 0.2s ease;
//                             box-shadow: 0 4px 12px rgba(76, 175, 80, 0.25);
//                             white-space: nowrap;
//                             height: 40px;
//                             margin-top: 4px;
//                           }"
//                           onmouseenter="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(76, 175, 80, 0.35)'"
//                           onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(76, 175, 80, 0.25)'">
//                     <span style="font-size: 14px;">🚗</span>
//                     <span>Маршрут</span>
//                   </button>
//                 </div>
//               </div>
              
//               <!-- Стили для кастомизации Google Maps InfoWindow -->
//               <style>
//                 .gm-ui-hover-effect {
//                   display: none !important;
//                 }
//                 .gm-style-iw-c {
//                   padding: 0 !important;
//                   border-radius: 12px !important;
//                   overflow: hidden !important;
//                   max-width: 300px !important;
//                 }
//                 .gm-style-iw-tc {
//                   display: none !important;
//                 }
//                 .gm-style-iw-d {
//                   overflow: hidden !important;
//                 }
//                 button {
//                   outline: none;
//                 }
//                 button:hover {
//                   outline: none;
//                 }
//                 button:active {
//                   transform: scale(0.97);
//                 }
//               </style>
//             </div>
//           `;
          
//           const infoWindow = new window.google.maps.InfoWindow({
//             content: infoWindowContent,
//             maxWidth: 300,
//             disableAutoPan: false
//           });

//           marker.addListener('click', (e) => {
//             closeAllInfoWindows();
//             infoWindow.open(map, marker);
//             marker.infoWindow = infoWindow;
            
//             setTimeout(() => {
//               const infoWindowContainer = document.querySelector('.gm-style-iw');
//               if (infoWindowContainer) {
//                 const closeButton = infoWindowContainer.querySelector('.gm-ui-hover-effect');
//                 if (closeButton) {
//                   closeButton.style.display = 'none';
//                 }
                
//                 const infoWindowContent = infoWindowContainer.querySelector('.gm-style-iw-c');
//                 if (infoWindowContent) {
//                   infoWindowContent.style.padding = '0';
//                   infoWindowContent.style.borderRadius = '12px';
//                   infoWindowContent.style.overflow = 'hidden';
//                 }
                
//                 const arrow = infoWindowContainer.querySelector('.gm-style-iw-tc');
//                 if (arrow) {
//                   arrow.style.display = 'none';
//                 }
//               }
//             }, 100);
            
//             if (e && e.stopPropagation) e.stopPropagation();
//           });

//           marker.apartmentId = apartment._id;
//           marker.infoWindow = infoWindow;
//           markersRef.current.push(marker);
//         } else {
//           // ====================================================
//           // ДЕСКТОПНАЯ И ПЛАНШЕТНАЯ ВЕРСИЯ - ИСПРАВЛЕННАЯ
//           // ====================================================
//           const infoWindowContent = `
//             <div style="
//               width: 420px;
//               background: white;
//               border-radius: 14px;
//               overflow: hidden;
//               box-shadow: 0 10px 30px rgba(0,0,0,0.18);
//               cursor: pointer;
//               font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//               border: 1px solid #e0e0e0;
//               transition: transform 0.2s ease;
//             " onclick="event.stopPropagation(); window.handleMapApartmentSelect('${apartment._id}')"
//                onmouseenter="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 14px 40px rgba(0,0,0,0.22)'"
//                onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.18)'">
              
//               <div style="display: flex; height: 160px;">
//                 <!-- Фото слева -->
//                 <div style="
//                   width: 160px;
//                   height: 160px;
//                   position: relative;
//                   overflow: hidden;
//                   background: #f5f5f5;
//                   flex-shrink: 0;
//                 ">
//                   <img src="${mainPhoto}" 
//                        alt="${apartment.objectName || 'Фото'}" 
//                        style="
//                          width: 100%;
//                          height: 100%;
//                          object-fit: cover;
//                        }" />
                  
//                   <!-- Бейдж категории -->
//                   <div style="
//                     position: absolute;
//                     top: 10px;
//                     left: 10px;
//                     background: ${categoryColor};
//                     color: white;
//                     padding: 5px 10px;
//                     border-radius: 8px;
//                     font-weight: 600;
//                     font-size: 12px;
//                     max-width: 140px;
//                     white-space: nowrap;
//                     overflow: hidden;
//                     text-overflow: ellipsis;
//                     box-shadow: 0 3px 10px rgba(0,0,0,0.25);
//                   }">
//                     ${apartment.category || 'Жилье'}
//                   </div>
//                 </div>
                
//                 <!-- Информация справа -->
//                 <div style="
//                   flex: 1;
//                   padding: 8px 10px 8px 8px;  <!-- УМЕНЬШЕНЫ ПАДДИНГИ -->
//                   display: flex;
//                   flex-direction: column;
//                   overflow: hidden;
//                   min-width: 0;
//                 }">
//                   <!-- Название объекта - ПОДНЯТО ВЫШЕ И УМЕНЬШЕН ТЕКСТ -->
//                   <h3 style="
//                     margin: 0 0 1px 0;            <!-- УМЕНЬШЕН margin-bottom -->
//                     font-size: 13px;              <!-- УМЕНЬШЕН РАЗМЕР ТЕКСТА -->
//                     color: #2196F3  !important;
//                     font-weight: 700;
//                     line-height: 1.1;
//                     overflow: hidden;
//                     text-overflow: ellipsis;
//                     display: -webkit-box;
//                     -webkit-line-clamp: 2;
//                     -webkit-box-orient: vertical;
//                     min-height: 26px;            <!-- УМЕНЬШЕНА ВЫСОТА -->
//                   }">
//                     ${apartment.objectName || 'Апартаменты'}
//                   </h3>
                  
//                   <!-- Адрес -->
//                   <div style="
//                     display: flex;
//                     align-items: flex-start;
//                     gap: 4px;
//                     font-size: 12px;             <!-- УМЕНЬШЕН РАЗМЕР ТЕКСТА -->
//                     color: #424242;
//                     line-height: 1.2;
//                     overflow: hidden;
//                     margin-bottom: 12px !important;
//                     min-height: 28px;            <!-- УМЕНЬШЕНА ВЫСОТА -->
//                   }">
//                     <span style="
//                       color: #5c6bc0;
//                       flex-shrink: 0;
//                       margin-top: 2px;
//                       font-size: 12px;           <!-- УМЕНЬШЕН РАЗМЕР ТЕКСТА -->
//                     ">📍</span>
//                     <span style="
//                       overflow: hidden;
//                       text-overflow: ellipsis;
//                       display: -webkit-box;
//                       -webkit-line-clamp: 2;
//                       -webkit-box-orient: vertical;
//                       flex: 1;
//                     }">
//                       ${address}
//                     </span>
//                   </div>
                  
//                   <!-- Детали (район/метро) - ТЕПЕРЬ ВИДНО -->
//                   <div style="
//                     display: flex;
//                     gap: 4px;
//                     margin-bottom: 4px;
//                     overflow: hidden;
//                     height: 20px;
//                   }">
//                     ${apartment.district ? `
//                       <div style="
//                         display: flex;
//                         align-items: center;
//                         gap: 4px;
//                         font-size: 11px;
//                         color: #555;
//                         background: #f5f5f5;
//                         padding: 3px 8px;
//                         border-radius: 6px;
//                         white-space: nowrap;
//                         max-width: 130px;
//                         overflow: hidden;
//                         height: 22px;
//                       }">
//                         <span style="font-size: 11px;">🏘️</span>
//                         <span style="
//                           overflow: hidden;
//                           text-overflow: ellipsis;
//                           font-weight: 500;
//                         }">${apartment.district}</span>
//                       </div>
//                     ` : ''}
                    
//                     ${apartment.metro ? `
//                       <div style="
//                         display: flex;
//                         align-items: center;
//                         gap: 3px;
//                         font-size: 11px;
//                         color: #1b5e20;
//                         background: #e8f5e9;
//                         padding: 2px 6px;
//                         border-radius: 4px;
//                         white-space: nowrap;
//                         max-width: 120px;
//                         overflow: hidden;
//                         height: 18px;
//                       }">
//                         <span style="font-size: 11px;">🚇</span>
//                         <span style="
//                           overflow: hidden;
//                           text-overflow: ellipsis;
//                           font-weight: 500;
//                         }">${apartment.metro}</span>
//                       </div>
//                     ` : ''}
//                   </div>
                  
//                   <!-- Цена и кнопка маршрута - КНОПКА ВЫШЕ -->
//                   <div style="
//                     display: flex;
//                     align-items: center;
//                     justify-content: space-between;
//                     gap: 8px;
//                     height: 28px;
//                     margin-top: 5px;            
//                   }">
//                     <!-- Цена -->
//                     <div style="
//                       display: flex;
//                       flex-direction: column;
//                       min-width: 0;
//                     }">
//                       <div style="
//                         font-size: 18px;
//                         font-weight: 800;
//                         color: #1b5e20;
//                         line-height: 1;
//                         white-space: nowrap;
//                       }">
//                         ${apartment.price ? apartment.price + ' грн' : '—'}
//                       </div>
//                       <div style="
//                         font-size: 11px;
//                         color: #757575;
//                         margin-top: 2px;
//                       }">
                      
//                       </div>
//                     </div>
                    
//                     <!-- Кнопка маршрута - ПОДНЯТА ВВЕРХ -->
//                     <button onclick="event.stopPropagation(); window.handleMapRouteClick(${position.lat}, ${position.lng}, event)"
//                             style="
//                               background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
//                               color: white;
//                               border: none;
//                               padding: 5px 10px;
//                               border-radius: 5px;
//                               cursor: pointer;
//                               font-size: 12px;
//                               font-weight: 600;
//                               display: flex;
//                               align-items: center;
//                               justify-content: center;
//                               gap: 4px;
//                               transition: all 0.2s ease;
//                               white-space: nowrap;
//                               min-width: 95px;
//                               height: 28px;
//                               box-shadow: 0 3px 8px rgba(76, 175, 80, 0.2); 
//                               margin-top: -2px;              <!-- УБРАН margin-top -->
//                             }"
//                             onmouseenter="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(76, 175, 80, 0.35)'"
//                             onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(76, 175, 80, 0.25)'">
//                       <span style="font-size: 13px;">🚗</span>
//                       <span>Маршрут</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
              
//               <!-- Стили для кастомизации Google Maps InfoWindow -->
//               <style>
//                 .gm-ui-hover-effect {
//                   display: none !important;
//                 }
//                 .gm-style-iw-c {
//                   padding: 0 !important;
//                   border-radius: 14px !important;
//                   overflow: hidden !important;
//                   max-width: 420px !important;
//                   height: 160px !important;
//                 }
//                 .gm-style-iw-tc {
//                   display: none !important;
//                 }
//                 .gm-style-iw-d {
//                   overflow: hidden !important;
//                   height: 160px !important;
//                 }
//                 button {
//                   outline: none;
//                 }
//                 button:focus {
//                   outline: none;
//                 }
//                 button:active {
//                   transform: scale(0.97);
//                 }
//                 * {
//                   box-sizing: border-box;
//                   margin: 0;
//                   padding: 0;
//                 }
//               </style>
//             </div>
//           `;
          
//           const infoWindow = new window.google.maps.InfoWindow({
//             content: infoWindowContent,
//             maxWidth: 420,
//             disableAutoPan: false
//           });

//           marker.addListener('click', (e) => {
//             closeAllInfoWindows();
//             infoWindow.open(map, marker);
//             marker.infoWindow = infoWindow;
            
//             setTimeout(() => {
//               const infoWindowContainer = document.querySelector('.gm-style-iw');
//               if (infoWindowContainer) {
//                 const closeButton = infoWindowContainer.querySelector('.gm-ui-hover-effect');
//                 if (closeButton) {
//                   closeButton.style.display = 'none';
//                 }
                
//                 const infoWindowContent = infoWindowContainer.querySelector('.gm-style-iw-c');
//                 if (infoWindowContent) {
//                   infoWindowContent.style.padding = '0';
//                   infoWindowContent.style.borderRadius = '14px';
//                   infoWindowContent.style.overflow = 'hidden';
//                 }
                
//                 const arrow = infoWindowContainer.querySelector('.gm-style-iw-tc');
//                 if (arrow) {
//                   arrow.style.display = 'none';
//                 }
//               }
//             }, 100);
            
//             if (e && e.stopPropagation) e.stopPropagation();
//           });

//           marker.apartmentId = apartment._id;
//           marker.infoWindow = infoWindow;
//           markersRef.current.push(marker);
//         }
//       }

//       // Автоматическое масштабирование карты под все маркеры
//       if (markersRef.current.length > 0 && !centerMode) {
//         const bounds = new window.google.maps.LatLngBounds();
//         markersRef.current.forEach(marker => {
//           bounds.extend(marker.getPosition());
//         });
        
//         map.fitBounds(bounds, { 
//           padding: { top: 50, right: 50, bottom: 50, left: 50 }
//         });
//       }

//       setMapLoading(false);
//     } catch (error) {
//       console.error('Map initialization error:', error);
//       setMapError(true);
//       setMapLoading(false);
//     }
//   }, [isGoogleMapsLoaded, apartments, centerMode, compactMode, onApartmentSelect]);

//   // Инициализация карты когда Google Maps загружен
//   useEffect(() => {
//     if (isGoogleMapsLoaded && window.google) {
//       initializeMap();
//     }
//   }, [isGoogleMapsLoaded, initializeMap]);

//   // Очистка при размонтировании компонента
//   useEffect(() => {
//     return () => {
//       markersRef.current.forEach(marker => {
//         if (marker.infoWindow) {
//           marker.infoWindow.close();
//         }
//         if (marker.setMap) {
//           marker.setMap(null);
//         }
//       });
//       markersRef.current = [];
//     };
//   }, []);

//   // Отображение ошибки загрузки карты
//   if (mapError || googleMapsError) {
//     return (
//       <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
//         <Typography color="error" sx={{ mb: 2 }}>
//           Не удалось загрузить карту
//         </Typography>
//         <Button 
//           variant="contained" 
//           onClick={() => {
//             setMapError(false);
//             setMapLoading(true);
//           }}
//         >
//           Попробовать снова
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
//       {mapLoading && (
//         <Box sx={{ 
//           position: 'absolute', 
//           top: 0, 
//           left: 0, 
//           right: 0, 
//           bottom: 0, 
//           display: 'flex', 
//           alignItems: 'center', 
//           justifyContent: 'center',
//           backgroundColor: 'rgba(255,255,255,0.8)',
//           zIndex: 1000
//         }}>
//           <CircularProgress />
//           <Typography sx={{ ml: 2 }}>Загрузка карты...</Typography>
//         </Box>
//       )}
//       <div 
//         ref={mapRef} 
//         style={{ 
//           width: '100%', 
//           height: '100%',
//           borderRadius: '8px'
//         }} 
//       />
//     </Box>
//   );
// };

// export default MapComponent;



// 'use client';

// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import { Box, Typography, CircularProgress, Button } from '@mui/material';
// import { useGoogleMaps } from '../../GoogleMapsProvider';
// import { useLanguage } from '@/app/LanguageContext';
// import { getDistrictName } from '@/app/components/DistrictsData';

// // Цвета для разных категорий жилья
// const CATEGORY_COLORS = {
//   'apart': '#e590ad',
//   'hostel': '#34A853', 
//   'glamping': '#FBBC05',
//   'hotel': '#4285F4',
//   'pet-hotel': '#9C27B0',
//   'house': '#795548',
//   'sauna': '#F44336',
//   'pansionat': '#607D8B',
//   'cottage': '#FF9800',
//   'coworking': '#E91E63',
//   'autocamping': '#4CAF50',
//   'rest-base': '#00BCD4',
//   'default': '#EA4335'
// };

// const MapComponent = ({ 
//   apartments, 
//   onApartmentSelect, 
//   centerMode = false, 
//   userLocation = null,
//   compactMode = false,
//   onShowAlert
// }) => {
//   // Рефы для управления картой
//   const mapRef = useRef(null);
//   const googleMapRef = useRef(null);
//   const markersRef = useRef([]);
//   const [mapLoading, setMapLoading] = useState(true);
//   const [mapError, setMapError] = useState(false);
  
//   const { isLoaded: isGoogleMapsLoaded, loadError: googleMapsError } = useGoogleMaps();
//   const { currentLanguage } = useLanguage();
//   const t = {
//     district: currentLanguage === 'ua' ? 'район' : 'район',
//     metro: currentLanguage === 'ua' ? 'метро' : 'метро'
//   };

//   // Рефы для актуальных данных
//   const apartmentsRef = useRef(apartments);
//   const onShowAlertRef = useRef(onShowAlert);

//   // Обновляем рефы при изменении пропсов
//   useEffect(() => {
//     apartmentsRef.current = apartments;
//     onShowAlertRef.current = onShowAlert;
//   }, [apartments, onShowAlert]);

//   // Функция для получения цвета маркера по категории
//   const getCategoryColor = (category) => {
//     if (!category) return CATEGORY_COLORS.default;
    
//     const categoryLower = category.toLowerCase();
    
//     if (categoryLower.includes('apart') || categoryLower.includes('квартир')) 
//       return CATEGORY_COLORS.apart;
//     if (categoryLower.includes('hostel') || categoryLower.includes('хостел')) 
//       return CATEGORY_COLORS.hostel;
//     if (categoryLower.includes('glamping') || categoryLower.includes('глемпінг') || categoryLower.includes('глэмпинг')) 
//       return CATEGORY_COLORS.glamping;
//     if (categoryLower.includes('hotel') || categoryLower.includes('готел') || categoryLower.includes('гостиниц')) 
//       return CATEGORY_COLORS.hotel;
//     if (categoryLower.includes('pet') || categoryLower.includes('тварин') || categoryLower.includes('animals')) 
//       return CATEGORY_COLORS['pet-hotel'];
//     if (categoryLower.includes('house') || categoryLower.includes('будинок') || categoryLower.includes('дом')) 
//       return CATEGORY_COLORS.house;
//     if (categoryLower.includes('sauna') || categoryLower.includes('саун') || categoryLower.includes('бан')) 
//       return CATEGORY_COLORS.sauna;
//     if (categoryLower.includes('pansionat') || categoryLower.includes('пансіонат') || categoryLower.includes('пансионат')) 
//       return CATEGORY_COLORS.pansionat;
//     if (categoryLower.includes('cottage') || categoryLower.includes('котедж') || categoryLower.includes('kotedzi')) 
//       return CATEGORY_COLORS.cottage;
//     if (categoryLower.includes('coworking') || categoryLower.includes('коворкінг') || categoryLower.includes('коворкинг') || categoryLower.includes('kavorking')) 
//       return CATEGORY_COLORS.coworking;
//     if (categoryLower.includes('autocamping') || categoryLower.includes('автокемпінг') || categoryLower.includes('автокемпинг') || categoryLower.includes('avtokemping')) 
//       return CATEGORY_COLORS.autocamping;
//     if (categoryLower.includes('rest-base') || categoryLower.includes('база відпочинку') || categoryLower.includes('база отдыха') || categoryLower.includes('recreationcenter')) 
//       return CATEGORY_COLORS['rest-base'];
    
//     return CATEGORY_COLORS.default;
//   };

//   // Функция для получения URL иконки маркера
//   const getMarkerIcon = (color, price) => {
//     const markerWidth = 70;
//     const markerHeight = 80;
//     const priceRectWidth = 38;
//     const priceRectHeight = 25;
//     const priceFontSize = 14;
//     const priceTextColor = '#D32F2F';
//     const priceRectX = (markerWidth - priceRectWidth) / 2;
//     const priceRectY = 12;
//     const priceTextX = markerWidth / 2;
//     const priceTextY = priceRectY + priceRectHeight / 2 + 5;
    
//     // Форматируем цену для отображения
//     const formatPrice = (price) => {
//       if (!price) return '';
//       if (typeof price === 'number') {
//         return price.toString();
//       }
//       if (typeof price === 'string') {
//         const numericPrice = price.replace(/[^\d]/g, '');
//         if (numericPrice.length > 3) {
//           return numericPrice.slice(0, -3) + 'K';
//         }
//         return numericPrice;
//       }
//       return '';
//     };
    
//     const formattedPrice = formatPrice(price);
    
//     return {
//       url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
//         <svg width="${markerWidth}" height="${markerHeight}" viewBox="0 0 ${markerWidth} ${markerHeight}" xmlns="http://www.w3.org/2000/svg">
//           <path fill="${color}" d="M${markerWidth/2} 0C${markerWidth/2 - 12.8} 0 10 11.2 10 ${markerHeight/3.2}c0 18 25 45 25 45s25-27 25-45C60 11.2 48.8 0 35 0z"/>
//           <rect x="${priceRectX}" y="${priceRectY}" width="${priceRectWidth}" 
//           height="${priceRectHeight}" rx="4" fill="white" stroke="#ccc" stroke-width="1"/>
//           <text x="${priceTextX}" y="${priceTextY}" text-anchor="middle" 
//           fill="${priceTextColor}" font-size="${priceFontSize}"
//            font-weight="bold" font-family="Arial, sans-serif">
//             ${formattedPrice}
//           </text>
//         </svg>
//       `)}`,
//       scaledSize: new window.google.maps.Size(markerWidth, markerHeight),
//       anchor: new window.google.maps.Point(markerWidth/2, markerHeight),
//     };
//   };

//   // Функция для получения координат апартамента
//   const getApartmentCoordinates = (apartment) => {
//     if (apartment.latitude && apartment.longitude) {
//       const lat = parseFloat(apartment.latitude);
//       const lng = parseFloat(apartment.longitude);
//       if (!isNaN(lat) && !isNaN(lng)) {
//         return { lat, lng };
//       }
//     }

//     if ((apartment.city || apartment.street) && window.google) {
//       return new Promise((resolve) => {
//         const address = `${apartment.street || ''} ${apartment.houseNumber || ''}, ${apartment.city || ''}`.trim();
//         if (address.length > 3) {
//           const geocoder = new window.google.maps.Geocoder();
//           geocoder.geocode({ address: address + ', Украина' }, (results, status) => {
//             if (status === 'OK' && results[0]) {
//               const location = results[0].geometry.location;
//               resolve({
//                 lat: location.lat(),
//                 lng: location.lng()
//               });
//             } else {
//               resolve(getCityCoordinates(apartment.city));
//             }
//           });
//         } else {
//           resolve(getCityCoordinates(apartment.city));
//         }
//       });
//     }

//     return getCityCoordinates(apartment.city);
//   };

//   // Функция для получения координат города
//   const getCityCoordinates = (city) => {
//     const cityCoordinates = {
//       'киев': { lat: 50.4501, lng: 30.5234 },
//       'львов': { lat: 49.8397, lng: 24.0297 },
//       'одесса': { lat: 46.4825, lng: 30.7233 },
//       'харьков': { lat: 49.9935, lng: 36.2304 },
//       'днепр': { lat: 48.4647, lng: 35.0462 },
//       'запорожье': { lat: 47.8388, lng: 35.1396 },
//       'ивано-франковск': { lat: 48.9226, lng: 24.7111 },
//       'тернополь': { lat: 49.5535, lng: 25.5948 },
//       'черновцы': { lat: 48.2917, lng: 25.9354 },
//       'ужгород': { lat: 48.6208, lng: 22.2879 },
//       'луцк': { lat: 50.7476, lng: 25.3252 },
//       'ровно': { lat: 50.6199, lng: 26.2516 },
//       'житомир': { lat: 50.2547, lng: 28.6587 },
//       'черкассы': { lat: 49.4444, lng: 32.0598 },
//       'кропивницкий': { lat: 48.5079, lng: 32.2623 },
//       'николаев': { lat: 46.9750, lng: 31.9946 },
//       'херсон': { lat: 46.6354, lng: 32.6169 },
//       'полтава': { lat: 49.5883, lng: 34.5514 },
//       'сумы': { lat: 50.9077, lng: 34.7981 },
//       'чернигов': { lat: 51.4982, lng: 31.2893 }
//     };

//     if (!city) return { lat: 50.4501, lng: 30.5234 };
    
//     const cityLower = city.toLowerCase().trim();
//     return cityCoordinates[cityLower] || { lat: 50.4501, lng: 30.5234 };
//   };

//   // Функция для форматирования адреса
//   const formatAddress = (apartment) => {
//     const parts = [];
//     if (apartment.city) parts.push(apartment.city);
//     if (apartment.street && apartment.houseNumber) {
//       parts.push(`${apartment.street} ${apartment.houseNumber}`);
//     }
//     return parts.join(', ');
//   };

//   // Функция для получения основного фото
//   const getMainPhoto = (apartment) => {
//     if (apartment.photos && apartment.photos.length > 0) {
//       return apartment.photos[0];
//     }
//     return '/placeholder-apartment.jpg';
//   };

//   // Главная функция инициализации карты
//   const initializeMap = useCallback(async () => {
//     if (!mapRef.current || !window.google || !isGoogleMapsLoaded) return;

//     try {
//       const defaultCenter = { lat: 50.4501, lng: 30.5234 };
//       let center = defaultCenter;
//       const coordinates = [];

//       // Получаем координаты для всех апартаментов
//       for (const apartment of apartmentsRef.current) {
//         const coords = await getApartmentCoordinates(apartment);
//         coordinates.push(coords);
//       }

//       // Определяем центр карты
//       if (apartmentsRef.current.length > 0) {
//         if (centerMode && apartmentsRef.current[0]) {
//           center = coordinates[0] || defaultCenter;
//         } else {
//           const validCoords = coordinates.filter(coord => coord && !isNaN(coord.lat) && !isNaN(coord.lng));
//           if (validCoords.length > 0) {
//             const avgLat = validCoords.reduce((sum, coord) => sum + coord.lat, 0) / validCoords.length;
//             const avgLng = validCoords.reduce((sum, coord) => sum + coord.lng, 0) / validCoords.length;
//             center = { lat: avgLat, lng: avgLng };
//           }
//         }
//       }

//       // Создаем карту
//       const map = new window.google.maps.Map(mapRef.current, {
//         center: center,
//         zoom: apartmentsRef.current.length === 1 ? 14 : (compactMode ? 10 : 8),
//         mapTypeControl: !compactMode,
//         streetViewControl: !compactMode,
//         fullscreenControl: !compactMode,
//         zoomControl: !compactMode,
//         gestureHandling: 'greedy',
//         styles: [
//           {
//             featureType: "poi",
//             elementType: "labels",
//             stylers: [{ visibility: "on" }]
//           }
//         ]
//       });

//       googleMapRef.current = map;

//       // Очищаем старые маркеры
//       markersRef.current.forEach(marker => {
//         if (marker && marker.setMap) {
//           marker.setMap(null);
//         }
//       });
//       markersRef.current = [];

//       // Глобальные функции для обработки кликов
//       window.handleMapApartmentSelect = (apartmentId) => {
//         const selectedApartment = apartmentsRef.current.find(apt => apt._id === apartmentId);
//         if (selectedApartment && onApartmentSelect) {
//           onApartmentSelect(selectedApartment);
//         }
//       };

//       window.handleMapRouteClick = (lat, lng, event) => {
//         if (event) event.stopPropagation();
//         window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
//       };

//       // Функция для закрытия всех информационных окон
//       const closeAllInfoWindows = () => {
//         markersRef.current.forEach(marker => {
//           if (marker.infoWindow) {
//             marker.infoWindow.close();
//           }
//         });
//       };

//       // Добавляем обработчик клика на карту для закрытия информационных окон
//       map.addListener('click', closeAllInfoWindows);

//       // Создаем маркеры для каждого апартамента
//       for (let i = 0; i < apartmentsRef.current.length; i++) {
//         const apartment = apartmentsRef.current[i];
//         const position = coordinates[i] || defaultCenter;

//         if (!position || isNaN(position.lat) || isNaN(position.lng)) {
//           continue;
//         }

//         const categoryColor = getCategoryColor(apartment.category);
        
//         const markerIcon = getMarkerIcon(
//           categoryColor, 
//           apartment.price
//         );

//         // Создаем маркер на карте
//         const marker = new window.google.maps.Marker({
//           position: position,
//           map: map,
//           title: apartment.objectName || apartment.category || 'Апартаменты',
//           icon: markerIcon,
//           animation: window.google.maps.Animation.DROP
//         });

//         const address = formatAddress(apartment);
//         const mainPhoto = getMainPhoto(apartment);

//         // Определяем тип устройства для адаптивного дизайна
//         const isMobile = window.innerWidth < 768;
        
//         if (isMobile) {
//           // МОБИЛЬНАЯ ВЕРСИЯ КАРТОЧКИ - ВЕРТИКАЛЬНАЯ
//           const infoWindowContent = `
//             <div style="
//               width: 300px;
//               background: white;
//               border-radius: 12px;
//               overflow: hidden;
//               box-shadow: 0 8px 24px rgba(0,0,0,0.15);
//               cursor: pointer;
//               font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//               transition: transform 0.2s ease;
//             " onclick="event.stopPropagation(); window.handleMapApartmentSelect('${apartment._id}')"
//                onmouseenter="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 32px rgba(0,0,0,0.2)'"
//                onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.15)'">
              
//               <!-- Изображение -->
//               <div style="
//                 position: relative;
//                 width: 100%;
//                 height: 150px;
//                 overflow: hidden;
//               ">
//                 <img src="${mainPhoto}" 
//                      alt="${apartment.objectName || 'Фото'}" 
//                      style="
//                        width: 100%;
//                        height: 100%;
//                        object-fit: cover;
//                        transition: transform 0.3s ease;
//                      }"
//                      onmouseenter="this.style.transform='scale(1.05)'"
//                      onmouseleave="this.style.transform='scale(1)'" />
                
//                 <!-- Бейдж категории -->
//                 <div style="
//                   position: absolute;
//                   top: 12px;
//                   left: 12px;
//                   background: ${categoryColor};
//                   color: white;
//                   padding: 6px 12px;
//                   border-radius: 16px;
//                   font-weight: 600;
//                   font-size: 12px;
//                   backdrop-filter: blur(4px);
//                   box-shadow: 0 3px 10px rgba(0,0,0,0.2);
//                   max-width: 70%;
//                   white-space: nowrap;
//                   overflow: hidden;
//                   text-overflow: ellipsis;
//                 ">
//                   ${apartment.category || 'Жилье'}
//                 </div>
//               </div>
              
//               <!-- Контент -->
//               <div style="padding: 14px;">
//                 <!-- Название -->
//                 <h3 style="
//                   margin: 0 0 8px 0;
//                   font-size: 16px;
//                   color: #1a237e;
//                   font-weight: 700;
//                   line-height: 1.3;
//                   overflow: hidden;
//                   text-overflow: ellipsis;
//                   display: -webkit-box;
//                   -webkit-line-clamp: 2;
//                   -webkit-box-orient: vertical;
//                 }">
//                   ${apartment.objectName || 'Апартаменты'}
//                 </h3>
                
//                 <!-- Адрес -->
//                 <div style="
//                   display: flex;
//                   align-items: flex-start;
//                   gap: 6px;
//                   margin-bottom: 4px;
//                   color: #424242;
//                   font-size: 13px;
//                   line-height: 1.3;
//                   min-height: 32px;
//                 ">
//                   <span style="
//                     color: #5c6bc0;
//                     flex-shrink: 0;
//                     font-size: 13px;
//                     margin-top: 2px;
//                   ">📍</span>
//                   <span style="
//                     overflow: hidden;
//                     text-overflow: ellipsis;
//                     display: -webkit-box;
//                     -webkit-line-clamp: 2;
//                     -webkit-box-orient: vertical;
//                   }">
//                     ${address}
//                   </span>
//                 </div>
                
//                 <!-- Дополнительная информация -->
//                 <div style="
//                   display: flex;
//                   flex-wrap: wrap;
//                   gap: 8px;
//                   margin-bottom: 12px;
//                 ">
//                   ${apartment.district ? `
//                     <div style="
//                       display: flex;
//                       align-items: center;
//                       gap: 5px;
//                       background: #f5f5f5;
//                       padding: 5px 10px;
//                       border-radius: 8px;
//                       font-size: 12px;
//                       color: #616161;
//                     }">
//                       <span style="color: #757575;">🏘️</span>
//                       <span style="
//                         font-weight: 500;
//                         white-space: nowrap;
//                         overflow: hidden;
//                         text-overflow: ellipsis;
//                         max-width: 120px;
//                       }">
//                         ${getDistrictName(apartment.district, currentLanguage)}
//                       </span>
//                     </div>
//                   ` : ''}
                  
//                   ${apartment.metro ? `
//                     <div style="
//                       display: flex;
//                       align-items: center;
//                       gap: 5px;
//                       background: #e8f5e9;
//                       padding: 5px 10px;
//                       border-radius: 8px;
//                       font-size: 12px;
//                       color: #2e7d32;
//                     }">
//                       <span style="color: #43a047;">🚇</span>
//                       <span style="
//                         font-weight: 500;
//                         white-space: nowrap;
//                         overflow: hidden;
//                         text-overflow: ellipsis;
//                         max-width: 120px;
//                       }">
//                         ${apartment.metro}
//                       </span>
//                     </div>
//                   ` : ''}
//                 </div>
                
//                 <!-- Цена и кнопка маршрута -->
//                 <div style="
//                   display: flex;
//                   align-items: center;
//                   justify-content: space-between;
//                   gap: 12px;
//                 ">
//                   <!-- Цена -->
//                   <div style="
//                     display: flex;
//                     flex-direction: column;
//                   ">
//                     <div style="
//                       font-size: 16px;
//                       font-weight: 800;
//                       color: #1b5e20;
//                       line-height: 1;
//                     }">
//                       ${apartment.price ? apartment.price + ' грн' : '—'}
//                     </div>
//                     <div style="
//                       font-size: 12px;
//                       color: #757575;
//                       margin-top: 3px;
//                     }">
                     
//                     </div>
//                   </div>
                  
//                   <!-- Кнопка маршрута -->
//                   <button onclick="event.stopPropagation(); window.handleMapRouteClick(${position.lat}, ${position.lng}, event)"
//                           style="
//                             background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
//                             color: white;
//                             border: none;
//                             padding: 8px 16px;
//                             border-radius: 8px;
//                             cursor: pointer;
//                             font-size: 13px;
//                             font-weight: 600;
//                             display: flex;
//                             align-items: center;
//                             justify-content: center;
//                             gap: 6px;
//                             transition: all 0.2s ease;
//                             box-shadow: 0 4px 12px rgba(76, 175, 80, 0.25);
//                             white-space: nowrap;
//                             height: 40px;
//                             margin-top: 4px;
//                           }"
//                           onmouseenter="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(76, 175, 80, 0.35)'"
//                           onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(76, 175, 80, 0.25)'">
//                     <span style="font-size: 14px;">🚗</span>
//                     <span>Маршрут</span>
//                   </button>
//                 </div>
//               </div>
              
//               <!-- Стили для кастомизации Google Maps InfoWindow -->
//               <style>
//                 .gm-ui-hover-effect {
//                   display: none !important;
//                 }
//                 .gm-style-iw-c {
//                   padding: 0 !important;
//                   border-radius: 12px !important;
//                   overflow: hidden !important;
//                   max-width: 300px !important;
//                 }
//                 .gm-style-iw-tc {
//                   display: none !important;
//                 }
//                 .gm-style-iw-d {
//                   overflow: hidden !important;
//                 }
//                 button {
//                   outline: none;
//                 }
//                 button:hover {
//                   outline: none;
//                 }
//                 button:active {
//                   transform: scale(0.97);
//                 }
//               </style>
//             </div>
//           `;
          
//           const infoWindow = new window.google.maps.InfoWindow({
//             content: infoWindowContent,
//             maxWidth: 300,
//             disableAutoPan: false
//           });

//           marker.addListener('click', (e) => {
//             closeAllInfoWindows();
//             infoWindow.open(map, marker);
//             marker.infoWindow = infoWindow;
            
//             setTimeout(() => {
//               const infoWindowContainer = document.querySelector('.gm-style-iw');
//               if (infoWindowContainer) {
//                 const closeButton = infoWindowContainer.querySelector('.gm-ui-hover-effect');
//                 if (closeButton) {
//                   closeButton.style.display = 'none';
//                 }
                
//                 const infoWindowContent = infoWindowContainer.querySelector('.gm-style-iw-c');
//                 if (infoWindowContent) {
//                   infoWindowContent.style.padding = '0';
//                   infoWindowContent.style.borderRadius = '12px';
//                   infoWindowContent.style.overflow = 'hidden';
//                 }
                
//                 const arrow = infoWindowContainer.querySelector('.gm-style-iw-tc');
//                 if (arrow) {
//                   arrow.style.display = 'none';
//                 }
//               }
//             }, 100);
            
//             if (e && e.stopPropagation) e.stopPropagation();
//           });

//           marker.apartmentId = apartment._id;
//           marker.infoWindow = infoWindow;
//           markersRef.current.push(marker);
//         } else {
//           // ====================================================
//           // ДЕСКТОПНАЯ И ПЛАНШЕТНАЯ ВЕРСИЯ - ИСПРАВЛЕННАЯ
//           // ====================================================
//           const infoWindowContent = `
//             <div style="
//               width: 420px;
//               background: white;
//               border-radius: 14px;
//               overflow: hidden;
//               box-shadow: 0 10px 30px rgba(0,0,0,0.18);
//               cursor: pointer;
//               font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//               border: 1px solid #e0e0e0;
//               transition: transform 0.2s ease;
//             " onclick="event.stopPropagation(); window.handleMapApartmentSelect('${apartment._id}')"
//                onmouseenter="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 14px 40px rgba(0,0,0,0.22)'"
//                onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.18)'">
              
//               <div style="display: flex; height: 160px;">
//                 <!-- Фото слева -->
//                 <div style="
//                   width: 160px;
//                   height: 160px;
//                   position: relative;
//                   overflow: hidden;
//                   background: #f5f5f5;
//                   flex-shrink: 0;
//                 ">
//                   <img src="${mainPhoto}" 
//                        alt="${apartment.objectName || 'Фото'}" 
//                        style="
//                          width: 100%;
//                          height: 100%;
//                          object-fit: cover;
//                        }" />
                  
//                   <!-- Бейдж категории -->
//                   <div style="
//                     position: absolute;
//                     top: 10px;
//                     left: 10px;
//                     background: ${categoryColor};
//                     color: white;
//                     padding: 5px 10px;
//                     border-radius: 8px;
//                     font-weight: 600;
//                     font-size: 12px;
//                     max-width: 140px;
//                     white-space: nowrap;
//                     overflow: hidden;
//                     text-overflow: ellipsis;
//                     box-shadow: 0 3px 10px rgba(0,0,0,0.25);
//                   }">
//                     ${apartment.category || 'Жилье'}
//                   </div>
//                 </div>
                
//                 <!-- Информация справа -->
//                 <div style="
//                   flex: 1;
//                   padding: 8px 10px 8px 8px;  <!-- УМЕНЬШЕНЫ ПАДДИНГИ -->
//                   display: flex;
//                   flex-direction: column;
//                   overflow: hidden;
//                   min-width: 0;
//                 }">
//                   <!-- Название объекта - ПОДНЯТО ВЫШЕ И УМЕНЬШЕН ТЕКСТ -->
//                   <h3 style="
//                     margin: 0 0 1px 0;            <!-- УМЕНЬШЕН margin-bottom -->
//                     font-size: 13px;              <!-- УМЕНЬШЕН РАЗМЕР ТЕКСТА -->
//                     color: #2196F3  !important;
//                     font-weight: 700;
//                     line-height: 1.1;
//                     overflow: hidden;
//                     text-overflow: ellipsis;
//                     display: -webkit-box;
//                     -webkit-line-clamp: 2;
//                     -webkit-box-orient: vertical;
//                     min-height: 26px;            <!-- УМЕНЬШЕНА ВЫСОТА -->
//                   }">
//                     ${apartment.objectName || 'Апартаменты'}
//                   </h3>
                  
//                   <!-- Адрес -->
//                   <div style="
//                     display: flex;
//                     align-items: flex-start;
//                     gap: 4px;
//                     font-size: 12px;             <!-- УМЕНЬШЕН РАЗМЕР ТЕКСТА -->
//                     color: #424242;
//                     line-height: 1.2;
//                     overflow: hidden;
//                     margin-bottom: 12px !important;
//                     min-height: 28px;            <!-- УМЕНЬШЕНА ВЫСОТА -->
//                   }">
//                     <span style="
//                       color: #5c6bc0;
//                       flex-shrink: 0;
//                       margin-top: 2px;
//                       font-size: 12px;           <!-- УМЕНЬШЕН РАЗМЕР ТЕКСТА -->
//                     ">📍</span>
//                     <span style="
//                       overflow: hidden;
//                       text-overflow: ellipsis;
//                       display: -webkit-box;
//                       -webkit-line-clamp: 2;
//                       -webkit-box-orient: vertical;
//                       flex: 1;
//                     }">
//                       ${address}
//                     </span>
//                   </div>
                  
//                   <!-- Детали (район/метро) - ТЕПЕРЬ ВИДНО -->
//                   <div style="
//                     display: flex;
//                     gap: 4px;
//                     margin-bottom: 4px;
//                     overflow: hidden;
//                     height: 20px;
//                   }">
//                     ${apartment.district ? `
//                       <div style="
//                         display: flex;
//                         align-items: center;
//                         gap: 4px;
//                         font-size: 11px;
//                         color: #555;
//                         background: #f5f5f5;
//                         padding: 3px 8px;
//                         border-radius: 6px;
//                         white-space: nowrap;
//                         max-width: 130px;
//                         overflow: hidden;
//                         height: 22px;
//                       }">
//                         <span style="font-size: 11px;">🏘️</span>
//                         <span style="
//                           overflow: hidden;
//                           text-overflow: ellipsis;
//                           font-weight: 500;
//                         }">${getDistrictName(apartment.district, currentLanguage)}</span>
//                       </div>
//                     ` : ''}
                    
//                     ${apartment.metro ? `
//                       <div style="
//                         display: flex;
//                         align-items: center;
//                         gap: 3px;
//                         font-size: 11px;
//                         color: #1b5e20;
//                         background: #e8f5e9;
//                         padding: 2px 6px;
//                         border-radius: 4px;
//                         white-space: nowrap;
//                         max-width: 120px;
//                         overflow: hidden;
//                         height: 18px;
//                       }">
//                         <span style="font-size: 11px;">🚇</span>
//                         <span style="
//                           overflow: hidden;
//                           text-overflow: ellipsis;
//                           font-weight: 500;
//                         }">${apartment.metro}</span>
//                       </div>
//                     ` : ''}
//                   </div>
                  
//                   <!-- Цена и кнопка маршрута - КНОПКА ВЫШЕ -->
//                   <div style="
//                     display: flex;
//                     align-items: center;
//                     justify-content: space-between;
//                     gap: 8px;
//                     height: 28px;
//                     margin-top: 5px;            
//                   }">
//                     <!-- Цена -->
//                     <div style="
//                       display: flex;
//                       flex-direction: column;
//                       min-width: 0;
//                     }">
//                       <div style="
//                         font-size: 18px;
//                         font-weight: 800;
//                         color: #1b5e20;
//                         line-height: 1;
//                         white-space: nowrap;
//                       }">
//                         ${apartment.price ? apartment.price + ' грн' : '—'}
//                       </div>
//                       <div style="
//                         font-size: 11px;
//                         color: #757575;
//                         margin-top: 2px;
//                       }">
                      
//                       </div>
//                     </div>
                    
//                     <!-- Кнопка маршрута - ПОДНЯТА ВВЕРХ -->
//                     <button onclick="event.stopPropagation(); window.handleMapRouteClick(${position.lat}, ${position.lng}, event)"
//                             style="
//                               background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
//                               color: white;
//                               border: none;
//                               padding: 5px 10px;
//                               border-radius: 5px;
//                               cursor: pointer;
//                               font-size: 12px;
//                               font-weight: 600;
//                               display: flex;
//                               align-items: center;
//                               justify-content: center;
//                               gap: 4px;
//                               transition: all 0.2s ease;
//                               white-space: nowrap;
//                               min-width: 95px;
//                               height: 28px;
//                               box-shadow: 0 3px 8px rgba(76, 175, 80, 0.2); 
//                               margin-top: -2px;              <!-- УБРАН margin-top -->
//                             }"
//                             onmouseenter="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(76, 175, 80, 0.35)'"
//                             onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(76, 175, 80, 0.25)'">
//                       <span style="font-size: 13px;">🚗</span>
//                       <span>Маршрут</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
              
//               <!-- Стили для кастомизации Google Maps InfoWindow -->
//               <style>
//                 .gm-ui-hover-effect {
//                   display: none !important;
//                 }
//                 .gm-style-iw-c {
//                   padding: 0 !important;
//                   border-radius: 14px !important;
//                   overflow: hidden !important;
//                   max-width: 420px !important;
//                   height: 160px !important;
//                 }
//                 .gm-style-iw-tc {
//                   display: none !important;
//                 }
//                 .gm-style-iw-d {
//                   overflow: hidden !important;
//                   height: 160px !important;
//                 }
//                 button {
//                   outline: none;
//                 }
//                 button:focus {
//                   outline: none;
//                 }
//                 button:active {
//                   transform: scale(0.97);
//                 }
//                 * {
//                   box-sizing: border-box;
//                   margin: 0;
//                   padding: 0;
//                 }
//               </style>
//             </div>
//           `;
          
//           const infoWindow = new window.google.maps.InfoWindow({
//             content: infoWindowContent,
//             maxWidth: 420,
//             disableAutoPan: false
//           });

//           marker.addListener('click', (e) => {
//             closeAllInfoWindows();
//             infoWindow.open(map, marker);
//             marker.infoWindow = infoWindow;
            
//             setTimeout(() => {
//               const infoWindowContainer = document.querySelector('.gm-style-iw');
//               if (infoWindowContainer) {
//                 const closeButton = infoWindowContainer.querySelector('.gm-ui-hover-effect');
//                 if (closeButton) {
//                   closeButton.style.display = 'none';
//                 }
                
//                 const infoWindowContent = infoWindowContainer.querySelector('.gm-style-iw-c');
//                 if (infoWindowContent) {
//                   infoWindowContent.style.padding = '0';
//                   infoWindowContent.style.borderRadius = '14px';
//                   infoWindowContent.style.overflow = 'hidden';
//                 }
                
//                 const arrow = infoWindowContainer.querySelector('.gm-style-iw-tc');
//                 if (arrow) {
//                   arrow.style.display = 'none';
//                 }
//               }
//             }, 100);
            
//             if (e && e.stopPropagation) e.stopPropagation();
//           });

//           marker.apartmentId = apartment._id;
//           marker.infoWindow = infoWindow;
//           markersRef.current.push(marker);
//         }
//       }

//       // Автоматическое масштабирование карты под все маркеры
//       if (markersRef.current.length > 0 && !centerMode) {
//         const bounds = new window.google.maps.LatLngBounds();
//         markersRef.current.forEach(marker => {
//           bounds.extend(marker.getPosition());
//         });
        
//         map.fitBounds(bounds, { 
//           padding: { top: 50, right: 50, bottom: 50, left: 50 }
//         });
//       }

//       setMapLoading(false);
//     } catch (error) {
//       console.error('Map initialization error:', error);
//       setMapError(true);
//       setMapLoading(false);
//     }
//   }, [isGoogleMapsLoaded, apartments, centerMode, compactMode, onApartmentSelect, currentLanguage]);

//   // Инициализация карты когда Google Maps загружен
//   useEffect(() => {
//     if (isGoogleMapsLoaded && window.google) {
//       initializeMap();
//     }
//   }, [isGoogleMapsLoaded, initializeMap]);

//   // Очистка при размонтировании компонента
//   useEffect(() => {
//     return () => {
//       markersRef.current.forEach(marker => {
//         if (marker.infoWindow) {
//           marker.infoWindow.close();
//         }
//         if (marker.setMap) {
//           marker.setMap(null);
//         }
//       });
//       markersRef.current = [];
//     };
//   }, []);

//   // Отображение ошибки загрузки карты
//   if (mapError || googleMapsError) {
//     return (
//       <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
//         <Typography color="error" sx={{ mb: 2 }}>
//           Не удалось загрузить карту
//         </Typography>
//         <Button 
//           variant="contained" 
//           onClick={() => {
//             setMapError(false);
//             setMapLoading(true);
//           }}
//         >
//           Попробовать снова
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
//       {mapLoading && (
//         <Box sx={{ 
//           position: 'absolute', 
//           top: 0, 
//           left: 0, 
//           right: 0, 
//           bottom: 0, 
//           display: 'flex', 
//           alignItems: 'center', 
//           justifyContent: 'center',
//           backgroundColor: 'rgba(255,255,255,0.8)',
//           zIndex: 1000
//         }}>
//           <CircularProgress />
//           <Typography sx={{ ml: 2 }}>Загрузка карты...</Typography>
//         </Box>
//       )}
//       <div 
//         ref={mapRef} 
//         style={{ 
//           width: '100%', 
//           height: '100%',
//           borderRadius: '8px'
//         }} 
//       />
//     </Box>
//   );
// };

// export default MapComponent;



'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { useGoogleMaps } from '../../GoogleMapsProvider';
import { useLanguage } from '@/app/LanguageContext';
import { getDistrictName } from '@/app/components/DistrictsData';

// Цвета для разных категорий жилья
const CATEGORY_COLORS = {
  'apart': '#e590ad',
  'hostel': '#34A853', 
  'glamping': '#FBBC05',
  'hotel': '#4285F4',
  'pet-hotel': '#9C27B0',
  'house': '#795548',
  'sauna': '#F44336',
  'pansionat': '#607D8B',
  'cottage': '#FF9800',
  'coworking': '#E91E63',
  'autocamping': '#4CAF50',
  'rest-base': '#00BCD4',
  'default': '#EA4335'
};

const MapComponent = ({ 
  apartments, 
  onApartmentSelect, 
  centerMode = false, 
  userLocation = null,
  compactMode = false,
  onShowAlert
}) => {
  // Рефы для управления картой
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  const stylesInjectedRef = useRef(false);
  
  const { isLoaded: isGoogleMapsLoaded, loadError: googleMapsError } = useGoogleMaps();
  const { currentLanguage } = useLanguage();
  const t = {
    district: currentLanguage === 'ua' ? 'район' : 'район',
    metro: currentLanguage === 'ua' ? 'метро' : 'метро'
  };

  // Рефы для актуальных данных
  const apartmentsRef = useRef(apartments);
  const onShowAlertRef = useRef(onShowAlert);

  // Обновляем рефы при изменении пропсов
  useEffect(() => {
    apartmentsRef.current = apartments;
    onShowAlertRef.current = onShowAlert;
  }, [apartments, onShowAlert]);

  // Функция для принудительного добавления стилей
  const injectInfoWindowStyles = useCallback(() => {
    const styleId = 'gmaps-info-window-force-styles';
    
    const oldStyle = document.getElementById(styleId);
    if (oldStyle) {
      oldStyle.remove();
    }
    
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      /* Глобальные стили для всех InfoWindow */
      .gm-style-iw-c {
        padding: 0 !important;
        padding-top: 0 !important;
        padding-right: 0 !important;
        padding-bottom: 0 !important;
        padding-left: 0 !important;
        border-radius: 14px !important;
        overflow: hidden !important;
        box-shadow: 0 10px 30px rgba(0,0,0,0.18) !important;
      }
      
      .gm-style-iw-tc {
        display: none !important;
      }
      
      .gm-style-iw-d {
        overflow: hidden !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      
      .gm-ui-hover-effect {
        display: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      
      /* Убираем все возможные отступы у внутренних элементов */
      .gm-style-iw-c * {
        box-sizing: border-box;
      }
    `;
    
    document.head.appendChild(style);
    stylesInjectedRef.current = true;
    
    console.log('✅ Стили для InfoWindow принудительно добавлены');
  }, []);

  // Функция для принудительного удаления padding у открытого инфоокна
  const forceRemovePadding = useCallback(() => {
    setTimeout(() => {
      const infoWindows = document.querySelectorAll('.gm-style-iw-c, [class*="gm-style-iw"]');
      
      infoWindows.forEach(el => {
        if (el) {
          el.style.setProperty('padding', '0', 'important');
          el.style.setProperty('padding-top', '0', 'important');
          el.style.setProperty('padding-right', '0', 'important');
          el.style.setProperty('padding-bottom', '0', 'important');
          el.style.setProperty('padding-left', '0', 'important');
          
          const childDivs = el.querySelectorAll('div');
          childDivs.forEach(child => {
            if (child.className.includes('gm-style-iw-d')) {
              child.style.setProperty('padding', '0', 'important');
              child.style.setProperty('overflow', 'hidden', 'important');
            }
          });
        }
      });
      
      console.log('✅ Принудительно удален padding у InfoWindow');
    }, 150);
  }, []);

  // Функция для получения цвета маркера по категории
  const getCategoryColor = (category) => {
    if (!category) return CATEGORY_COLORS.default;
    
    const categoryLower = category.toLowerCase();
    
    if (categoryLower.includes('apart') || categoryLower.includes('квартир')) 
      return CATEGORY_COLORS.apart;
    if (categoryLower.includes('hostel') || categoryLower.includes('хостел')) 
      return CATEGORY_COLORS.hostel;
    if (categoryLower.includes('glamping') || categoryLower.includes('глемпінг') || categoryLower.includes('глэмпинг')) 
      return CATEGORY_COLORS.glamping;
    if (categoryLower.includes('hotel') || categoryLower.includes('готел') || categoryLower.includes('гостиниц')) 
      return CATEGORY_COLORS.hotel;
    if (categoryLower.includes('pet') || categoryLower.includes('тварин') || categoryLower.includes('animals')) 
      return CATEGORY_COLORS['pet-hotel'];
    if (categoryLower.includes('house') || categoryLower.includes('будинок') || categoryLower.includes('дом')) 
      return CATEGORY_COLORS.house;
    if (categoryLower.includes('sauna') || categoryLower.includes('саун') || categoryLower.includes('бан')) 
      return CATEGORY_COLORS.sauna;
    if (categoryLower.includes('pansionat') || categoryLower.includes('пансіонат') || categoryLower.includes('пансионат')) 
      return CATEGORY_COLORS.pansionat;
    if (categoryLower.includes('cottage') || categoryLower.includes('котедж') || categoryLower.includes('kotedzi')) 
      return CATEGORY_COLORS.cottage;
    if (categoryLower.includes('coworking') || categoryLower.includes('коворкінг') || categoryLower.includes('коворкинг') || categoryLower.includes('kavorking')) 
      return CATEGORY_COLORS.coworking;
    if (categoryLower.includes('autocamping') || categoryLower.includes('автокемпінг') || categoryLower.includes('автокемпинг') || categoryLower.includes('avtokemping')) 
      return CATEGORY_COLORS.autocamping;
    if (categoryLower.includes('rest-base') || categoryLower.includes('база відпочинку') || categoryLower.includes('база отдыха') || categoryLower.includes('recreationcenter')) 
      return CATEGORY_COLORS['rest-base'];
    
    return CATEGORY_COLORS.default;
  };

  // Функция для получения URL иконки маркера
  const getMarkerIcon = (color, price) => {
    const markerWidth = 70;
    const markerHeight = 80;
    const priceRectWidth = 38;
    const priceRectHeight = 25;
    const priceFontSize = 14;
    const priceTextColor = '#D32F2F';
    const priceRectX = (markerWidth - priceRectWidth) / 2;
    const priceRectY = 12;
    const priceTextX = markerWidth / 2;
    const priceTextY = priceRectY + priceRectHeight / 2 + 5;
    
    const formatPrice = (price) => {
      if (!price) return '';
      if (typeof price === 'number') {
        return price.toString();
      }
      if (typeof price === 'string') {
        const numericPrice = price.replace(/[^\d]/g, '');
        if (numericPrice.length > 3) {
          return numericPrice.slice(0, -3) + 'K';
        }
        return numericPrice;
      }
      return '';
    };
    
    const formattedPrice = formatPrice(price);
    
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg width="${markerWidth}" height="${markerHeight}" viewBox="0 0 ${markerWidth} ${markerHeight}" xmlns="http://www.w3.org/2000/svg">
          <path fill="${color}" d="M${markerWidth/2} 0C${markerWidth/2 - 12.8} 0 10 11.2 10 ${markerHeight/3.2}c0 18 25 45 25 45s25-27 25-45C60 11.2 48.8 0 35 0z"/>
          <rect x="${priceRectX}" y="${priceRectY}" width="${priceRectWidth}" 
          height="${priceRectHeight}" rx="4" fill="white" stroke="#ccc" stroke-width="1"/>
          <text x="${priceTextX}" y="${priceTextY}" text-anchor="middle" 
          fill="${priceTextColor}" font-size="${priceFontSize}"
           font-weight="bold" font-family="Arial, sans-serif">
            ${formattedPrice}
          </text>
        </svg>
      `)}`,
      scaledSize: new window.google.maps.Size(markerWidth, markerHeight),
      anchor: new window.google.maps.Point(markerWidth/2, markerHeight),
    };
  };

  // Функция для получения координат апартамента
  const getApartmentCoordinates = (apartment) => {
    if (apartment.latitude && apartment.longitude) {
      const lat = parseFloat(apartment.latitude);
      const lng = parseFloat(apartment.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }

    if ((apartment.city || apartment.street) && window.google) {
      return new Promise((resolve) => {
        const address = `${apartment.street || ''} ${apartment.houseNumber || ''}, ${apartment.city || ''}`.trim();
        if (address.length > 3) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ address: address + ', Украина' }, (results, status) => {
            if (status === 'OK' && results[0]) {
              const location = results[0].geometry.location;
              resolve({
                lat: location.lat(),
                lng: location.lng()
              });
            } else {
              resolve(getCityCoordinates(apartment.city));
            }
          });
        } else {
          resolve(getCityCoordinates(apartment.city));
        }
      });
    }

    return getCityCoordinates(apartment.city);
  };

  // Функция для получения координат города
  const getCityCoordinates = (city) => {
    const cityCoordinates = {
      'киев': { lat: 50.4501, lng: 30.5234 },
      'львов': { lat: 49.8397, lng: 24.0297 },
      'одесса': { lat: 46.4825, lng: 30.7233 },
      'харьков': { lat: 49.9935, lng: 36.2304 },
      'днепр': { lat: 48.4647, lng: 35.0462 },
      'запорожье': { lat: 47.8388, lng: 35.1396 },
      'ивано-франковск': { lat: 48.9226, lng: 24.7111 },
      'тернополь': { lat: 49.5535, lng: 25.5948 },
      'черновцы': { lat: 48.2917, lng: 25.9354 },
      'ужгород': { lat: 48.6208, lng: 22.2879 },
      'луцк': { lat: 50.7476, lng: 25.3252 },
      'ровно': { lat: 50.6199, lng: 26.2516 },
      'житомир': { lat: 50.2547, lng: 28.6587 },
      'черкассы': { lat: 49.4444, lng: 32.0598 },
      'кропивницкий': { lat: 48.5079, lng: 32.2623 },
      'николаев': { lat: 46.9750, lng: 31.9946 },
      'херсон': { lat: 46.6354, lng: 32.6169 },
      'полтава': { lat: 49.5883, lng: 34.5514 },
      'сумы': { lat: 50.9077, lng: 34.7981 },
      'чернигов': { lat: 51.4982, lng: 31.2893 }
    };

    if (!city) return { lat: 50.4501, lng: 30.5234 };
    
    const cityLower = city.toLowerCase().trim();
    return cityCoordinates[cityLower] || { lat: 50.4501, lng: 30.5234 };
  };

  // Функция для форматирования адреса
  const formatAddress = (apartment) => {
    const parts = [];
    if (apartment.city) parts.push(apartment.city);
    if (apartment.street && apartment.houseNumber) {
      parts.push(`${apartment.street} ${apartment.houseNumber}`);
    }
    return parts.join(', ');
  };

  // Функция для получения основного фото
  const getMainPhoto = (apartment) => {
    if (apartment.photos && apartment.photos.length > 0) {
      return apartment.photos[0];
    }
    return '/placeholder-apartment.jpg';
  };

  // Главная функция инициализации карты
  const initializeMap = useCallback(async () => {
    if (!mapRef.current || !window.google || !isGoogleMapsLoaded) return;

    try {
      injectInfoWindowStyles();

      const defaultCenter = { lat: 50.4501, lng: 30.5234 };
      let center = defaultCenter;
      const coordinates = [];

      for (const apartment of apartmentsRef.current) {
        const coords = await getApartmentCoordinates(apartment);
        coordinates.push(coords);
      }

      if (apartmentsRef.current.length > 0) {
        if (centerMode && apartmentsRef.current[0]) {
          center = coordinates[0] || defaultCenter;
        } else {
          const validCoords = coordinates.filter(coord => coord && !isNaN(coord.lat) && !isNaN(coord.lng));
          if (validCoords.length > 0) {
            const avgLat = validCoords.reduce((sum, coord) => sum + coord.lat, 0) / validCoords.length;
            const avgLng = validCoords.reduce((sum, coord) => sum + coord.lng, 0) / validCoords.length;
            center = { lat: avgLat, lng: avgLng };
          }
        }
      }

      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: apartmentsRef.current.length === 1 ? 14 : (compactMode ? 10 : 8),
        mapTypeControl: !compactMode,
        streetViewControl: !compactMode,
        fullscreenControl: !compactMode,
        zoomControl: !compactMode,
        gestureHandling: 'greedy',
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "on" }]
          }
        ]
      });

      googleMapRef.current = map;

      markersRef.current.forEach(marker => {
        if (marker && marker.setMap) {
          marker.setMap(null);
        }
      });
      markersRef.current = [];

      window.handleMapApartmentSelect = (apartmentId) => {
        const selectedApartment = apartmentsRef.current.find(apt => apt._id === apartmentId);
        if (selectedApartment && onApartmentSelect) {
          onApartmentSelect(selectedApartment);
        }
      };

      window.handleMapRouteClick = (lat, lng, event) => {
        if (event) event.stopPropagation();
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
      };

      const closeAllInfoWindows = () => {
        markersRef.current.forEach(marker => {
          if (marker.infoWindow) {
            marker.infoWindow.close();
          }
        });
      };

      map.addListener('click', closeAllInfoWindows);

      for (let i = 0; i < apartmentsRef.current.length; i++) {
        const apartment = apartmentsRef.current[i];
        const position = coordinates[i] || defaultCenter;

        if (!position || isNaN(position.lat) || isNaN(position.lng)) {
          continue;
        }

        const categoryColor = getCategoryColor(apartment.category);
        
        const markerIcon = getMarkerIcon(
          categoryColor, 
          apartment.price
        );

        const marker = new window.google.maps.Marker({
          position: position,
          map: map,
          title: apartment.objectName || apartment.category || 'Апартаменты',
          icon: markerIcon,
          animation: window.google.maps.Animation.DROP
        });

        const address = formatAddress(apartment);
        const mainPhoto = getMainPhoto(apartment);

        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
          // МОБИЛЬНАЯ ВЕРСИЯ
          const infoWindowContent = `
            <div style="
              width: 300px;
              background: white;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 8px 24px rgba(0,0,0,0.15);
              cursor: pointer;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              transition: transform 0.2s ease;
              margin: 0 !important;
            " onclick="event.stopPropagation(); window.handleMapApartmentSelect('${apartment._id}')"
               onmouseenter="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 32px rgba(0,0,0,0.2)'"
               onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.15)'">
              
              <div style="
                position: relative;
                width: 100%;
                height: 150px;
                overflow: hidden;
              ">
                <img src="${mainPhoto}" 
                     alt="${apartment.objectName || 'Фото'}" 
                     style="
                       width: 100%;
                       height: 100%;
                       object-fit: cover;
                       transition: transform 0.3s ease;
                       display: block;
                     " />
                
                <div style="
                  position: absolute;
                  top: 12px;
                  left: 12px;
                  background: ${categoryColor};
                  color: white;
                  padding: 6px 12px;
                  border-radius: 16px;
                  font-weight: 600;
                  font-size: 12px;
                  backdrop-filter: blur(4px);
                  box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                  max-width: 70%;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                ">
                  ${apartment.category || 'Жилье'}
                </div>
              </div>
              
              <div style="padding: 14px;">
                <h3 style="
                  margin: 0 0 8px 0;
                  font-size: 16px;
                  color: #1a237e;
                  font-weight: 700;
                  line-height: 1.3;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                ">
                  ${apartment.objectName || 'Апартаменты'}
                </h3>
                
                <div style="
                  display: flex;
                  align-items: flex-start;
                  gap: 6px;
                  margin-bottom: 4px;
                  color: #424242;
                  font-size: 13px;
                  line-height: 1.3;
                  min-height: 32px;
                ">
                  <span style="
                    color: #5c6bc0;
                    flex-shrink: 0;
                    font-size: 13px;
                    margin-top: 2px;
                  ">📍</span>
                  <span style="
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                  ">
                    ${address}
                  </span>
                </div>
                
                <div style="
                  display: flex;
                  flex-wrap: wrap;
                  gap: 8px;
                  margin-bottom: 12px;
                ">
                  ${apartment.district ? `
                    <div style="
                      display: flex;
                      align-items: center;
                      gap: 5px;
                      background: #f5f5f5;
                      padding: 5px 10px;
                      border-radius: 8px;
                      font-size: 12px;
                      color: #616161;
                    ">
                      <span style="color: #757575;">🏘️</span>
                      <span style="
                        font-weight: 500;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 120px;
                      ">
                        ${getDistrictName(apartment.district, currentLanguage)}
                      </span>
                    </div>
                  ` : ''}
                  
                  ${apartment.metro ? `
                    <div style="
                      display: flex;
                      align-items: center;
                      gap: 5px;
                      background: #e8f5e9;
                      padding: 5px 10px;
                      border-radius: 8px;
                      font-size: 12px;
                      color: #2e7d32;
                    ">
                      <span style="color: #43a047;">🚇</span>
                      <span style="
                        font-weight: 500;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 120px;
                      ">
                        ${apartment.metro}
                      </span>
                    </div>
                  ` : ''}
                </div>
                
                <div style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  gap: 12px;
                ">
                  <div style="
                    display: flex;
                    flex-direction: column;
                  ">
                    <div style="
                      font-size: 16px;
                      font-weight: 800;
                      color: #1b5e20;
                      line-height: 1;
                    ">
                      ${apartment.price ? apartment.price + ' грн' : '—'}
                    </div>
                  </div>
                  
                  <button onclick="event.stopPropagation(); window.handleMapRouteClick(${position.lat}, ${position.lng}, event)"
                          style="
                            background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
                            color: white;
                            border: none;
                            padding: 8px 16px;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 13px;
                            font-weight: 600;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 6px;
                            transition: all 0.2s ease;
                            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.25);
                            white-space: nowrap;
                            height: 40px;
                          }">
                    <span style="font-size: 14px;">🚗</span>
                    <span>Маршрут</span>
                  </button>
                </div>
              </div>
            </div>
          `;
          
          const infoWindow = new window.google.maps.InfoWindow({
            content: infoWindowContent,
            maxWidth: 300,
            disableAutoPan: false,
            pixelOffset: new window.google.maps.Size(0, 0)
          });

          marker.addListener('click', (e) => {
            closeAllInfoWindows();
            infoWindow.open(map, marker);
            marker.infoWindow = infoWindow;
            
            setTimeout(() => {
              forceRemovePadding();
            }, 100);
            
            if (e && e.stopPropagation) e.stopPropagation();
          });

          marker.apartmentId = apartment._id;
          marker.infoWindow = infoWindow;
          markersRef.current.push(marker);
        } else {
          // ДЕСКТОПНАЯ ВЕРСИЯ
          const infoWindowContent = `
            <div style="
              width: 420px;
              background: white;
              border-radius: 14px;
              overflow: hidden;
              box-shadow: 0 10px 30px rgba(0,0,0,0.18);
              cursor: pointer;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              border: 1px solid #e0e0e0;
              transition: transform 0.2s ease;
              margin: 0 !important;
            " onclick="event.stopPropagation(); window.handleMapApartmentSelect('${apartment._id}')"
               onmouseenter="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 14px 40px rgba(0,0,0,0.22)'"
               onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.18)'">
              
              <div style="display: flex; height: 160px; margin: 0; padding: 0;">
                <div style="
                  width: 160px;
                  height: 160px;
                  position: relative;
                  overflow: hidden;
                  background: #f5f5f5;
                  flex-shrink: 0;
                ">
                  <img src="${mainPhoto}" 
                       alt="${apartment.objectName || 'Фото'}" 
                       style="
                         width: 100%;
                         height: 100%;
                         object-fit: cover;
                         display: block;
                       " />
                  
                  <div style="
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    background: ${categoryColor};
                    color: white;
                    padding: 5px 10px;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 12px;
                    max-width: 140px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.25);
                  ">
                    ${apartment.category || 'Жилье'}
                  </div>
                </div>
                
                <div style="
                  flex: 1;
                  padding: 8px 10px 8px 8px;
                  display: flex;
                  flex-direction: column;
                  overflow: hidden;
                  min-width: 0;
                  margin: 0;
                ">
                  <h3 style="
                    margin: 0 0 1px 0;
                    font-size: 13px;
                    color: #2196F3  !important;
                    font-weight: 700;
                    line-height: 1.1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    min-height: 26px;
                  ">
                    ${apartment.objectName || 'Апартаменты'}
                  </h3>
                  
                  <div style="
                    display: flex;
                    align-items: flex-start;
                    gap: 4px;
                    font-size: 12px;
                    color: #424242;
                    line-height: 1.2;
                    overflow: hidden;
                    margin-bottom: 12px !important;
                    min-height: 28px;
                  ">
                    <span style="
                      color: #5c6bc0;
                      flex-shrink: 0;
                      margin-top: 2px;
                      font-size: 12px;
                    ">📍</span>
                    <span style="
                      overflow: hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;
                      flex: 1;
                    ">
                      ${address}
                    </span>
                  </div>
                  
                  <div style="
                    display: flex;
                    gap: 4px;
                    margin-bottom: 4px;
                    overflow: hidden;
                    height: 20px;
                  ">
                    ${apartment.district ? `
                      <div style="
                        display: flex;
                        align-items: center;
                        gap: 4px;
                        font-size: 11px;
                        color: #555;
                        background: #f5f5f5;
                        padding: 3px 8px;
                        border-radius: 6px;
                        white-space: nowrap;
                        max-width: 130px;
                        overflow: hidden;
                        height: 22px;
                      ">
                        <span style="font-size: 11px;">🏘️</span>
                        <span style="
                          overflow: hidden;
                          text-overflow: ellipsis;
                          font-weight: 500;
                        ">${getDistrictName(apartment.district, currentLanguage)}</span>
                      </div>
                    ` : ''}
                    
                    ${apartment.metro ? `
                      <div style="
                        display: flex;
                        align-items: center;
                        gap: 3px;
                        font-size: 11px;
                        color: #1b5e20;
                        background: #e8f5e9;
                        padding: 2px 6px;
                        border-radius: 4px;
                        white-space: nowrap;
                        max-width: 120px;
                        overflow: hidden;
                        height: 18px;
                      ">
                        <span style="font-size: 11px;">🚇</span>
                        <span style="
                          overflow: hidden;
                          text-overflow: ellipsis;
                          font-weight: 500;
                        ">${apartment.metro}</span>
                      </div>
                    ` : ''}
                  </div>
                  
                  <div style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                    height: 28px;
                    margin-top: 5px;            
                  ">
                    <div style="
                      display: flex;
                      flex-direction: column;
                      min-width: 0;
                    ">
                      <div style="
                        font-size: 18px;
                        font-weight: 800;
                        color: #1b5e20;
                        line-height: 1;
                        white-space: nowrap;
                      ">
                        ${apartment.price ? apartment.price + ' грн' : '—'}
                      </div>
                    </div>
                    
                    <button onclick="event.stopPropagation(); window.handleMapRouteClick(${position.lat}, ${position.lng}, event)"
                            style="
                              background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
                              color: white;
                              border: none;
                              padding: 5px 10px;
                              border-radius: 5px;
                              cursor: pointer;
                              font-size: 12px;
                              font-weight: 600;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              gap: 4px;
                              transition: all 0.2s ease;
                              white-space: nowrap;
                              min-width: 95px;
                              height: 28px;
                              box-shadow: 0 3px 8px rgba(76, 175, 80, 0.2); 
                            ">
                      <span style="font-size: 13px;">🚗</span>
                      <span>Маршрут</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
          
          const infoWindow = new window.google.maps.InfoWindow({
            content: infoWindowContent,
            maxWidth: 420,
            disableAutoPan: false,
            pixelOffset: new window.google.maps.Size(0, 0)
          });

          marker.addListener('click', (e) => {
            closeAllInfoWindows();
            infoWindow.open(map, marker);
            marker.infoWindow = infoWindow;
            
            setTimeout(() => {
              forceRemovePadding();
            }, 100);
            
            if (e && e.stopPropagation) e.stopPropagation();
          });

          marker.apartmentId = apartment._id;
          marker.infoWindow = infoWindow;
          markersRef.current.push(marker);
        }
      }

      if (markersRef.current.length > 0 && !centerMode) {
        const bounds = new window.google.maps.LatLngBounds();
        markersRef.current.forEach(marker => {
          bounds.extend(marker.getPosition());
        });
        
        map.fitBounds(bounds, { 
          padding: { top: 50, right: 50, bottom: 50, left: 50 }
        });
      }

      setMapLoading(false);
    } catch (error) {
      console.error('Map initialization error:', error);
      setMapError(true);
      setMapLoading(false);
    }
  }, [isGoogleMapsLoaded, apartments, centerMode, compactMode, onApartmentSelect, currentLanguage, injectInfoWindowStyles, forceRemovePadding]);

  useEffect(() => {
    if (isGoogleMapsLoaded && window.google) {
      initializeMap();
    }
  }, [isGoogleMapsLoaded, initializeMap]);

  useEffect(() => {
    return () => {
      markersRef.current.forEach(marker => {
        if (marker.infoWindow) {
          marker.infoWindow.close();
        }
        if (marker.setMap) {
          marker.setMap(null);
        }
      });
      markersRef.current = [];
    };
  }, []);

  if (mapError || googleMapsError) {
    return (
      <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Typography color="error" sx={{ mb: 2 }}>
          Не удалось загрузить карту
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => {
            setMapError(false);
            setMapLoading(true);
          }}
        >
          Попробовать снова
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      {mapLoading && (
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.8)',
          zIndex: 1000
        }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Загрузка карты...</Typography>
        </Box>
      )}
      <div 
        ref={mapRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          borderRadius: '8px'
        }} 
      />
    </Box>
  );
};

export default MapComponent;