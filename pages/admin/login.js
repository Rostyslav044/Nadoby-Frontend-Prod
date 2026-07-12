


// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// export default function AdminDashboard() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [activeTab, setActiveTab] = useState('today');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [windowWidth, setWindowWidth] = useState(0);

//   useEffect(() => {
//     setWindowWidth(window.innerWidth);
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
    
//     fetchData();
    
//     return () => window.removeEventListener('resize', handleResize);
//   }, [currentPage]);

//   const fetchData = async () => {
//     try {
//       // Визначаємо URL бекенду автоматично
//       let API_URL;
      
//       if (typeof window !== 'undefined') {
//         const hostname = window.location.hostname;
        
//         if (hostname === 'localhost' || hostname === '127.0.0.1') {
//           API_URL = 'http://localhost:3000';
//         } else {
//           API_URL = 'https://nadoby.com.ua';
//         }
//       } else {
//         API_URL = 'https://nadoby.com.ua';
//       }
      
//       console.log('🌐 Підключення до API:', API_URL);
      
//       // const response = await fetch(`${API_URL}/api/admin/dashboard?page=${currentPage}&limit=20`);
//       const response = await fetch(`${API_URL}/api/admin/dashboard`);
//       const result = await response.json();
      
//       if (result.success) {
//         console.log('✅ Отримані дані:', result.data);
//         setData(result.data);
//       } else {
//         setError('Помилка завантаження даних');
//       }
//     } catch (err) {
//       console.error('❌ Помилка fetch:', err);
//       setError('Помилка підключення до сервера');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isMobile = windowWidth < 768;
//   const isTablet = windowWidth >= 768 && windowWidth < 1024;

//   if (loading) {
//     return (
//       <div style={{ 
//         padding: isMobile ? '20px' : '40px', 
//         textAlign: 'center',
//         background: '#f5f5f5',
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontSize: isMobile ? '18px' : '24px'
//       }}>
//         Завантаження даних...
//       </div>
//     );
//   }

//   const overview = data?.overview || {};
//   const cityStats = data?.cityStats || [];
//   const categoryStats = data?.categoryStats || {};
  
//   const getApartments = () => {
//     switch(activeTab) {
//       case 'today': return data?.todayApartments || [];
//       case 'week': return data?.weekApartments || [];
//       case 'month': return data?.monthApartments || [];
//       default: return data?.allApartments?.items || [];
//     }
//   };

//   const apartments = getApartments();
//   const pagination = data?.allApartments?.pagination;

//   const styles = {
//     container: {
//       padding: isMobile ? '10px' : '20px',
//       background: '#f5f5f5',
//       minHeight: '100vh'
//     },
//     title: {
//       fontSize: isMobile ? '24px' : '32px',
//       marginBottom: isMobile ? '20px' : '30px',
//       color: '#333',
//       padding: isMobile ? '0 10px' : '0'
//     },
//     grid: {
//       display: 'grid',
//       gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'),
//       gap: isMobile ? '10px' : '20px',
//       marginBottom: isMobile ? '20px' : '30px',
//       padding: isMobile ? '0 5px' : '0'
//     },
//     card: {
//       background: 'white',
//       padding: isMobile ? '15px' : '20px',
//       borderRadius: '12px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//     },
//     cardTitle: {
//       color: '#666',
//       marginBottom: '10px',
//       fontSize: isMobile ? '14px' : '16px'
//     },
//     cardValue: {
//       fontSize: isMobile ? '28px' : '42px',
//       fontWeight: 'bold',
//       margin: '0'
//     },
//     section: {
//       background: 'white',
//       padding: isMobile ? '15px' : '20px',
//       borderRadius: '12px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//       marginBottom: isMobile ? '20px' : '30px',
//       overflowX: 'auto'
//     },
//     sectionTitle: {
//       fontSize: isMobile ? '18px' : '20px',
//       marginBottom: isMobile ? '15px' : '20px',
//       color: '#333'
//     },
//     table: {
//       width: '100%',
//       minWidth: isMobile ? '500px' : '600px',
//       borderCollapse: 'collapse',
//       fontSize: isMobile ? '12px' : '14px'
//     },
//     tableHeader: {
//       textAlign: 'left',
//       padding: isMobile ? '8px' : '12px',
//       background: '#f8f9fa',
//       fontWeight: 'bold'
//     },
//     tableCell: {
//       padding: isMobile ? '8px' : '12px',
//       borderBottom: '1px solid #f0f0f0'
//     },
//     tabContainer: {
//       display: 'flex',
//       gap: isMobile ? '5px' : '10px',
//       marginBottom: isMobile ? '15px' : '20px',
//       flexWrap: 'wrap'
//     },
//     tabButton: {
//       padding: isMobile ? '8px 12px' : '10px 20px',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontSize: isMobile ? '13px' : '16px',
//       flex: isMobile ? '1' : 'none'
//     },
//     link: {
//       color: '#2196F3',
//       textDecoration: 'none',
//       fontSize: isMobile ? '12px' : '14px'
//     },
//     viewButton: {
//       display: 'inline-block',
//       padding: isMobile ? '4px 10px' : '5px 15px',
//       background: '#4CAF50',
//       color: 'white',
//       textDecoration: 'none',
//       borderRadius: '4px',
//       fontSize: isMobile ? '11px' : '14px'
//     },
//     pagination: {
//       display: 'flex',
//       justifyContent: 'center',
//       gap: isMobile ? '5px' : '10px',
//       marginTop: '20px',
//       flexWrap: 'wrap'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>
//         Панель управління
//       </h1>

//       {/* Картки статистики */}
//       <div style={styles.grid}>
//         <div style={styles.card}>
//           <div style={styles.cardTitle}>👥 Відвідувачі сьогодні</div>
//           <div style={{ ...styles.cardValue, color: '#2196F3' }}>{overview.todayVisits || 0}</div>
//           <div style={{ color: '#999', fontSize: isMobile ? '12px' : '14px', marginTop: '10px' }}>
//             Унікальних: {overview.uniqueVisitorsToday || 0}
//           </div>
//         </div>

//         <div style={styles.card}>
//           <div style={styles.cardTitle}>👤 Користувачі</div>
//           <div style={{ ...styles.cardValue, color: '#4CAF50' }}>{overview.totalUsers || 0}</div>
//           <div style={{ color: '#999', fontSize: isMobile ? '12px' : '14px', marginTop: '10px' }}>
//             Сьогодні: +{overview.newUsersToday || 0}
//           </div>
//         </div>

//         <div style={styles.card}>
//           <div style={styles.cardTitle}>🏠 Оголошення</div>
//           <div style={{ ...styles.cardValue, color: '#FF9800' }}>{overview.totalApartments || 0}</div>
//           <div style={{ color: '#999', fontSize: isMobile ? '12px' : '14px', marginTop: '10px' }}>
//             Сьогодні: +{overview.newApartmentsToday || 0}
//           </div>
//         </div>
//       </div>

//       {/* Статистика по містах та категоріях */}
//       <div style={styles.section}>
//         <h2 style={styles.sectionTitle}>🏙️ Оголошення по містах та категоріях</h2>
        
//         {cityStats.length > 0 ? (
//           <div style={{ overflowX: 'auto' }}>
//             <table style={styles.table}>
//               <thead>
//                 <tr>
//                   <th style={styles.tableHeader}>Місто</th>
//                   <th style={styles.tableHeader}>Категорія</th>
//                   <th style={{ ...styles.tableHeader, textAlign: 'right' }}>Кількість</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cityStats.map((item, index) => (
//                   <tr key={index}>
//                     <td style={styles.tableCell}>{item.city}</td>
//                     <td style={styles.tableCell}>{item.category}</td>
//                     <td style={{ ...styles.tableCell, textAlign: 'right', fontWeight: 'bold' }}>
//                       {item.count}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>
//             Немає даних про оголошення
//           </p>
//         )}
//       </div>

//       {/* Таби для оголошень */}
//       <div style={styles.section}>
//         <div style={styles.tabContainer}>
//           {[
//             { id: 'today', label: '📅 Сьогодні' },
//             { id: 'week', label: '📆 Тиждень' },
//             { id: 'month', label: '📅 Місяць' },
//             { id: 'all', label: '📋 Всі' }
//           ].map(tab => (
//             <button
//               key={tab.id}
//               onClick={() => {
//                 setActiveTab(tab.id);
//                 setCurrentPage(1);
//               }}
//               style={{
//                 ...styles.tabButton,
//                 background: activeTab === tab.id ? '#2196F3' : '#f0f0f0',
//                 color: activeTab === tab.id ? 'white' : '#333'
//               }}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {apartments.length > 0 ? (
//           <>
//             <div style={{ overflowX: 'auto' }}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr>
//                     <th style={styles.tableHeader}>Місто</th>
//                     <th style={styles.tableHeader}>Категорія</th>
//                     <th style={styles.tableHeader}>Назва</th>
//                     <th style={styles.tableHeader}>Дата</th>
//                     <th style={{ ...styles.tableHeader, textAlign: 'center' }}>Дії</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {apartments.map((apt, index) => (
//                     <tr key={index}>
//                       <td style={styles.tableCell}>{apt.city || '—'}</td>
//                       <td style={styles.tableCell}>{apt.category || '—'}</td>
//                       <td style={styles.tableCell}>
//                         <Link href={`/apartment/${apt._id}`} style={styles.link}>
//                           {apt.name || 'Без назви'} 🔗
//                         </Link>
//                       </td>
//                       <td style={styles.tableCell}>
//                         {new Date(apt.time).toLocaleString('uk-UA')}
//                       </td>
//                       <td style={{ ...styles.tableCell, textAlign: 'center' }}>
//                         <Link href={`/apartment/${apt._id}`} style={styles.viewButton}>
//                           Переглянути
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Пагінація для "Всіх" оголошень */}
//             {activeTab === 'all' && pagination && pagination.totalPages > 1 && (
//               <div style={styles.pagination}>
//                 <button
//                   onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                   disabled={currentPage === 1}
//                   style={{
//                     padding: isMobile ? '6px 12px' : '8px 16px',
//                     background: currentPage === 1 ? '#ccc' : '#2196F3',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '4px',
//                     cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
//                   }}
//                 >
//                   ←
//                 </button>
                
//                 <span style={{ 
//                   padding: isMobile ? '6px 12px' : '8px 16px', 
//                   background: '#f0f0f0', 
//                   borderRadius: '4px' 
//                 }}>
//                   {currentPage} з {pagination.totalPages}
//                 </span>
                
//                 <button
//                   onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
//                   disabled={currentPage === pagination.totalPages}
//                   style={{
//                     padding: isMobile ? '6px 12px' : '8px 16px',
//                     background: currentPage === pagination.totalPages ? '#ccc' : '#2196F3',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '4px',
//                     cursor: currentPage === pagination.totalPages ? 'not-allowed' : 'pointer'
//                   }}
//                 >
//                   →
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>
//             Немає оголошень за вибраний період
//           </p>
//         )}
//       </div>

//       {error && (
//         <div style={{ 
//           marginTop: '20px',
//           padding: '15px', 
//           background: '#ffebee', 
//           color: '#c62828',
//           borderRadius: '8px',
//           textAlign: 'center'
//         }}>
//           {error}
//         </div>
//       )}
//     </div>
//   );
// }







// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// export default function AdminDashboard() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [activeTab, setActiveTab] = useState('today');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [windowWidth, setWindowWidth] = useState(0);
//   const [fakeViewsLoading, setFakeViewsLoading] = useState(false);
//   const [notification, setNotification] = useState({ show: false, message: '', type: '' });

//   useEffect(() => {
//     setWindowWidth(window.innerWidth);
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
    
//     fetchData();
    
//     return () => window.removeEventListener('resize', handleResize);
//   }, [currentPage]);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/admin/dashboard?page=${currentPage}&limit=20`);
//       const result = await response.json();
      
//       if (result.success) {
//         console.log('Полученные данные:', result.data);
//         setData(result.data);
//       } else {
//         setError('Ошибка загрузки данных');
//       }
//     } catch (err) {
//       setError('Ошибка подключения к серверу');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Функция для добавления фейковых просмотров
//   const addFakeViews = async () => {
//     setFakeViewsLoading(true);
//     setNotification({ show: false, message: '', type: '' });
    
//     try {
//       const response = await fetch('http://localhost:3000/api/admin/fake-views', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           minViews: 1,
//           maxViews: 5
//         })
//       });
      
//       const result = await response.json();
      
//       if (result.success) {
//         setNotification({
//           show: true,
//           message: `✅ Успешно добавлено фейковых просмотров: ${result.totalAdded || 0}`,
//           type: 'success'
//         });
//         // Обновляем данные после добавления просмотров
//         setTimeout(() => {
//           fetchData();
//         }, 1000);
//       } else {
//         setNotification({
//           show: true,
//           message: result.message || '❌ Ошибка при добавлении просмотров',
//           type: 'error'
//         });
//       }
//     } catch (err) {
//       console.error('Ошибка:', err);
//       setNotification({
//         show: true,
//         message: '❌ Ошибка подключения к серверу',
//         type: 'error'
//       });
//     } finally {
//       setFakeViewsLoading(false);
//       setTimeout(() => {
//         setNotification(prev => ({ ...prev, show: false }));
//       }, 3000);
//     }
//   };

//   const isMobile = windowWidth < 768;
//   const isTablet = windowWidth >= 768 && windowWidth < 1024;

//   if (loading) {
//     return (
//       <div style={{ 
//         padding: isMobile ? '20px' : '40px', 
//         textAlign: 'center',
//         background: '#f5f5f5',
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontSize: isMobile ? '18px' : '24px'
//       }}>
//         Загрузка данных...
//       </div>
//     );
//   }

//   const overview = data?.overview || {};
//   const cityStats = data?.cityStats || [];
//   const categoryStats = data?.categoryStats || {};
  
//   const getApartments = () => {
//     switch(activeTab) {
//       case 'today': return data?.todayApartments || [];
//       case 'week': return data?.weekApartments || [];
//       case 'month': return data?.monthApartments || [];
//       default: return data?.allApartments?.items || [];
//     }
//   };

//   const apartments = getApartments();
//   const pagination = data?.allApartments?.pagination;

//   const styles = {
//     container: {
//       padding: isMobile ? '10px' : '20px',
//       background: '#f5f5f5',
//       minHeight: '100vh'
//     },
//     title: {
//       fontSize: isMobile ? '24px' : '32px',
//       marginBottom: isMobile ? '20px' : '30px',
//       color: '#333',
//       padding: isMobile ? '0 10px' : '0'
//     },
//     grid: {
//       display: 'grid',
//       gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'),
//       gap: isMobile ? '10px' : '20px',
//       marginBottom: isMobile ? '20px' : '30px',
//       padding: isMobile ? '0 5px' : '0'
//     },
//     card: {
//       background: 'white',
//       padding: isMobile ? '15px' : '20px',
//       borderRadius: '12px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//     },
//     cardTitle: {
//       color: '#666',
//       marginBottom: '10px',
//       fontSize: isMobile ? '14px' : '16px'
//     },
//     cardValue: {
//       fontSize: isMobile ? '28px' : '42px',
//       fontWeight: 'bold',
//       margin: '0'
//     },
//     section: {
//       background: 'white',
//       padding: isMobile ? '15px' : '20px',
//       borderRadius: '12px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//       marginBottom: isMobile ? '20px' : '30px',
//       overflowX: 'auto'
//     },
//     sectionTitle: {
//       fontSize: isMobile ? '18px' : '20px',
//       marginBottom: isMobile ? '15px' : '20px',
//       color: '#333'
//     },
//     table: {
//       width: '100%',
//       minWidth: isMobile ? '500px' : '600px',
//       borderCollapse: 'collapse',
//       fontSize: isMobile ? '12px' : '14px'
//     },
//     tableHeader: {
//       textAlign: 'left',
//       padding: isMobile ? '8px' : '12px',
//       background: '#f8f9fa',
//       fontWeight: 'bold'
//     },
//     tableCell: {
//       padding: isMobile ? '8px' : '12px',
//       borderBottom: '1px solid #f0f0f0'
//     },
//     tabContainer: {
//       display: 'flex',
//       gap: isMobile ? '5px' : '10px',
//       marginBottom: isMobile ? '15px' : '20px',
//       flexWrap: 'wrap'
//     },
//     tabButton: {
//       padding: isMobile ? '8px 12px' : '10px 20px',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontSize: isMobile ? '13px' : '16px',
//       flex: isMobile ? '1' : 'none'
//     },
//     link: {
//       color: '#2196F3',
//       textDecoration: 'none',
//       fontSize: isMobile ? '12px' : '14px'
//     },
//     viewButton: {
//       display: 'inline-block',
//       padding: isMobile ? '4px 10px' : '5px 15px',
//       background: '#4CAF50',
//       color: 'white',
//       textDecoration: 'none',
//       borderRadius: '4px',
//       fontSize: isMobile ? '11px' : '14px'
//     },
//     pagination: {
//       display: 'flex',
//       justifyContent: 'center',
//       gap: isMobile ? '5px' : '10px',
//       marginTop: '20px',
//       flexWrap: 'wrap'
//     },
//     fakeViewsButton: {
//       background: '#9C27B0',
//       color: 'white',
//       border: 'none',
//       padding: isMobile ? '10px 20px' : '12px 30px',
//       borderRadius: '8px',
//       fontSize: isMobile ? '14px' : '16px',
//       cursor: 'pointer',
//       marginBottom: '20px',
//       fontWeight: 'bold',
//       transition: 'all 0.3s',
//       width: isMobile ? '100%' : 'auto'
//     },
//     notificationSuccess: {
//       background: '#4caf50',
//       color: 'white',
//       padding: '12px',
//       borderRadius: '8px',
//       marginBottom: '20px',
//       textAlign: 'center'
//     },
//     notificationError: {
//       background: '#f44336',
//       color: 'white',
//       padding: '12px',
//       borderRadius: '8px',
//       marginBottom: '20px',
//       textAlign: 'center'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>
//         Панель управления
//       </h1>

//       {/* Кнопка добавления фейковых просмотров */}
//       <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
//         <button
//           onClick={addFakeViews}
//           disabled={fakeViewsLoading}
//           style={{
//             ...styles.fakeViewsButton,
//             opacity: fakeViewsLoading ? 0.7 : 1,
//             cursor: fakeViewsLoading ? 'not-allowed' : 'pointer'
//           }}
//         >
//           {fakeViewsLoading ? '🔄 Добавление...' : '🎭 Добавить фейковые просмотры'}
//         </button>
//       </div>

//       {/* Уведомление */}
//       {notification.show && (
//         <div style={notification.type === 'success' ? styles.notificationSuccess : styles.notificationError}>
//           {notification.message}
//         </div>
//       )}

//       {/* Карточки статистики */}
//       <div style={styles.grid}>
//         <div style={styles.card}>
//           <div style={styles.cardTitle}>👥 Посетители сегодня</div>
//           <div style={{ ...styles.cardValue, color: '#2196F3' }}>{overview.todayVisits || 0}</div>
//           <div style={{ color: '#999', fontSize: isMobile ? '12px' : '14px', marginTop: '10px' }}>
//             Уникальных: {overview.uniqueVisitorsToday || 0}
//           </div>
//         </div>

//         <div style={styles.card}>
//           <div style={styles.cardTitle}>👤 Пользователи</div>
//           <div style={{ ...styles.cardValue, color: '#4CAF50' }}>{overview.totalUsers || 0}</div>
//           <div style={{ color: '#999', fontSize: isMobile ? '12px' : '14px', marginTop: '10px' }}>
//             Сегодня: +{overview.newUsersToday || 0}
//           </div>
//         </div>

//         <div style={styles.card}>
//           <div style={styles.cardTitle}>🏠 Объявления</div>
//           <div style={{ ...styles.cardValue, color: '#FF9800' }}>{overview.totalApartments || 0}</div>
//           <div style={{ color: '#999', fontSize: isMobile ? '12px' : '14px', marginTop: '10px' }}>
//             Сегодня: +{overview.newApartmentsToday || 0}
//           </div>
//         </div>
//       </div>

//       {/* Статистика по городам и категориям */}
//       <div style={styles.section}>
//         <h2 style={styles.sectionTitle}>🏙️ Объявления по городам и категориям</h2>
        
//         {cityStats.length > 0 ? (
//           <div style={{ overflowX: 'auto' }}>
//             <table style={styles.table}>
//               <thead>
//                 <tr>
//                   <th style={styles.tableHeader}>Город</th>
//                   <th style={styles.tableHeader}>Категория</th>
//                   <th style={{ ...styles.tableHeader, textAlign: 'right' }}>Количество</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cityStats.map((item, index) => (
//                   <tr key={index}>
//                     <td style={styles.tableCell}>{item.city}</td>
//                     <td style={styles.tableCell}>{item.category}</td>
//                     <td style={{ ...styles.tableCell, textAlign: 'right', fontWeight: 'bold' }}>
//                       {item.count}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>
//             Нет данных об объявлениях
//           </p>
//         )}
//       </div>

//       {/* Табы для объявлений */}
//       <div style={styles.section}>
//         <div style={styles.tabContainer}>
//           {[
//             { id: 'today', label: '📅 Сегодня' },
//             { id: 'week', label: '📆 Неделя' },
//             { id: 'month', label: '📅 Месяц' },
//             { id: 'all', label: '📋 Все' }
//           ].map(tab => (
//             <button
//               key={tab.id}
//               onClick={() => {
//                 setActiveTab(tab.id);
//                 setCurrentPage(1);
//               }}
//               style={{
//                 ...styles.tabButton,
//                 background: activeTab === tab.id ? '#2196F3' : '#f0f0f0',
//                 color: activeTab === tab.id ? 'white' : '#333'
//               }}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {apartments.length > 0 ? (
//           <>
//             <div style={{ overflowX: 'auto' }}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr>
//                     <th style={styles.tableHeader}>Город</th>
//                     <th style={styles.tableHeader}>Категория</th>
//                     <th style={styles.tableHeader}>Название</th>
//                     <th style={styles.tableHeader}>Дата</th>
//                     <th style={{ ...styles.tableHeader, textAlign: 'center' }}>Действия</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {apartments.map((apt, index) => (
//                     <tr key={index}>
//                       <td style={styles.tableCell}>{apt.city || '—'}</td>
//                       <td style={styles.tableCell}>{apt.category || '—'}</td>
//                       <td style={styles.tableCell}>
//                         <Link href={`/apartment/${apt._id}`} style={styles.link}>
//                           {apt.name || 'Без названия'} 🔗
//                         </Link>
//                       </td>
//                       <td style={styles.tableCell}>
//                         {new Date(apt.time).toLocaleString('ru-RU')}
//                       </td>
//                       <td style={{ ...styles.tableCell, textAlign: 'center' }}>
//                         <Link href={`/apartment/${apt._id}`} style={styles.viewButton}>
//                           Просмотр
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Пагинация для "Всех" объявлений */}
//             {activeTab === 'all' && pagination && pagination.totalPages > 1 && (
//               <div style={styles.pagination}>
//                 <button
//                   onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                   disabled={currentPage === 1}
//                   style={{
//                     padding: isMobile ? '6px 12px' : '8px 16px',
//                     background: currentPage === 1 ? '#ccc' : '#2196F3',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '4px',
//                     cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
//                   }}
//                 >
//                   ←
//                 </button>
                
//                 <span style={{ 
//                   padding: isMobile ? '6px 12px' : '8px 16px', 
//                   background: '#f0f0f0', 
//                   borderRadius: '4px' 
//                 }}>
//                   {currentPage} из {pagination.totalPages}
//                 </span>
                
//                 <button
//                   onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
//                   disabled={currentPage === pagination.totalPages}
//                   style={{
//                     padding: isMobile ? '6px 12px' : '8px 16px',
//                     background: currentPage === pagination.totalPages ? '#ccc' : '#2196F3',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '4px',
//                     cursor: currentPage === pagination.totalPages ? 'not-allowed' : 'pointer'
//                   }}
//                 >
//                   →
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>
//             Нет объявлений за выбранный период
//           </p>
//         )}
//       </div>

//       {error && (
//         <div style={{ 
//           marginTop: '20px',
//           padding: '15px', 
//           background: '#ffebee', 
//           color: '#c62828',
//           borderRadius: '8px',
//           textAlign: 'center'
//         }}>
//           {error}
//         </div>
//       )}
//     </div>
//   );
// }








import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('today');
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);
  const [fakeViewsLoading, setFakeViewsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    fetchData();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/admin/dashboard?page=${currentPage}&limit=20`);
      const result = await response.json();
      
      if (result.success) {
        console.log('Полученные данные:', result.data);
        setData(result.data);
      } else {
        setError('Ошибка загрузки данных');
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  const addFakeViews = async () => {
    setFakeViewsLoading(true);
    setNotification({ show: false, message: '', type: '' });
    
    try {
      const response = await fetch('/api/admin/fake-views', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          minViews: 1,
          maxViews: 5
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setNotification({
          show: true,
          message: `✅ Добавлено: просмотров ${result.totalAdded || 0}, избранное ${result.totalFavoritesAdded || 0}, телефоны ${result.totalPhoneClicksAdded || 0}`,
          type: 'success'
        });
        setTimeout(() => {
          fetchData();
        }, 1000);
      } else {
        setNotification({
          show: true,
          message: result.message || '❌ Ошибка при добавлении просмотров',
          type: 'error'
        });
      }
    } catch (err) {
      console.error('Ошибка:', err);
      setNotification({
        show: true,
        message: '❌ Ошибка подключения к серверу',
        type: 'error'
      });
    } finally {
      setFakeViewsLoading(false);
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 3000);
    }
  };

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  if (loading) {
    return (
      <div style={{ 
        padding: isMobile ? '20px' : '40px', 
        textAlign: 'center',
        background: '#f5f5f5',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: isMobile ? '18px' : '24px'
      }}>
        Загрузка данных...
      </div>
    );
  }

  const overview = data?.overview || {};
  const cityStats = data?.cityStats || [];
  const categoryStats = data?.categoryStats || {};
  
  const getApartments = () => {
    switch(activeTab) {
      case 'today': return data?.todayApartments || [];
      case 'week': return data?.weekApartments || [];
      case 'month': return data?.monthApartments || [];
      default: return data?.allApartments?.items || [];
    }
  };

  const apartments = getApartments();
  const pagination = data?.allApartments?.pagination;

  const styles = {
    container: {
      padding: isMobile ? '10px' : '20px',
      background: '#f5f5f5',
      minHeight: '100vh'
    },
    title: {
      fontSize: isMobile ? '24px' : '32px',
      marginBottom: isMobile ? '20px' : '30px',
      color: '#333',
      padding: isMobile ? '0 10px' : '0'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'),
      gap: isMobile ? '10px' : '20px',
      marginBottom: isMobile ? '20px' : '30px',
      padding: isMobile ? '0 5px' : '0'
    },
    card: {
      background: 'white',
      padding: isMobile ? '15px' : '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    cardTitle: {
      color: '#666',
      marginBottom: '10px',
      fontSize: isMobile ? '14px' : '16px'
    },
    cardValue: {
      fontSize: isMobile ? '28px' : '42px',
      fontWeight: 'bold',
      margin: '0'
    },
    section: {
      background: 'white',
      padding: isMobile ? '15px' : '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: isMobile ? '20px' : '30px',
      overflowX: 'auto'
    },
    sectionTitle: {
      fontSize: isMobile ? '18px' : '20px',
      marginBottom: isMobile ? '15px' : '20px',
      color: '#333'
    },
    table: {
      width: '100%',
      minWidth: isMobile ? '500px' : '600px',
      borderCollapse: 'collapse',
      fontSize: isMobile ? '12px' : '14px'
    },
    tableHeader: {
      textAlign: 'left',
      padding: isMobile ? '8px' : '12px',
      background: '#f8f9fa',
      fontWeight: 'bold'
    },
    tableCell: {
      padding: isMobile ? '8px' : '12px',
      borderBottom: '1px solid #f0f0f0'
    },
    tabContainer: {
      display: 'flex',
      gap: isMobile ? '5px' : '10px',
      marginBottom: isMobile ? '15px' : '20px',
      flexWrap: 'wrap'
    },
    tabButton: {
      padding: isMobile ? '8px 12px' : '10px 20px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: isMobile ? '13px' : '16px',
      flex: isMobile ? '1' : 'none'
    },
    link: {
      color: '#2196F3',
      textDecoration: 'none',
      fontSize: isMobile ? '12px' : '14px'
    },
    viewButton: {
      display: 'inline-block',
      padding: isMobile ? '4px 10px' : '5px 15px',
      background: '#4CAF50',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '4px',
      fontSize: isMobile ? '11px' : '14px'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      gap: isMobile ? '5px' : '10px',
      marginTop: '20px',
      flexWrap: 'wrap'
    },
    fakeViewsButton: {
      background: '#9C27B0',
      color: 'white',
      border: 'none',
      padding: isMobile ? '10px 20px' : '12px 30px',
      borderRadius: '8px',
      fontSize: isMobile ? '14px' : '16px',
      cursor: 'pointer',
      marginBottom: '20px',
      fontWeight: 'bold',
      transition: 'all 0.3s',
      width: isMobile ? '100%' : 'auto'
    },
    notificationSuccess: {
      background: '#4caf50',
      color: 'white',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '20px',
      textAlign: 'center'
    },
    notificationError: {
      background: '#f44336',
      color: 'white',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '20px',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Панель управления
      </h1>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button
          onClick={addFakeViews}
          disabled={fakeViewsLoading}
          style={{
            ...styles.fakeViewsButton,
            opacity: fakeViewsLoading ? 0.7 : 1,
            cursor: fakeViewsLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {fakeViewsLoading ? '🔄 Добавление...' : '🎭 Добавить фейковые просмотры'}
        </button>
      </div>

      {notification.show && (
        <div style={notification.type === 'success' ? styles.notificationSuccess : styles.notificationError}>
          {notification.message}
        </div>
      )}

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>👥 Посетители сегодня</div>
          <div style={{ ...styles.cardValue, color: '#2196F3' }}>{overview.todayVisits || 0}</div>
          <div style={{ color: '#999', fontSize: isMobile ? '12px' : '14px', marginTop: '10px' }}>
            Уникальных: {overview.uniqueVisitorsToday || 0}
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>👤 Пользователи</div>
          <div style={{ ...styles.cardValue, color: '#4CAF50' }}>{overview.totalUsers || 0}</div>
          <div style={{ color: '#999', fontSize: isMobile ? '12px' : '14px', marginTop: '10px' }}>
            Сегодня: +{overview.newUsersToday || 0}
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>🏠 Объявления</div>
          <div style={{ ...styles.cardValue, color: '#FF9800' }}>{overview.totalApartments || 0}</div>
          <div style={{ color: '#999', fontSize: isMobile ? '12px' : '14px', marginTop: '10px' }}>
            Сегодня: +{overview.newApartmentsToday || 0}
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🏙️ Объявления по городам и категориям</h2>
        
        {cityStats.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Город</th>
                  <th style={styles.tableHeader}>Категория</th>
                  <th style={{ ...styles.tableHeader, textAlign: 'right' }}>Количество</th>
                </tr>
              </thead>
              <tbody>
                {cityStats.map((item, index) => (
                  <tr key={index}>
                    <td style={styles.tableCell}>{item.city}</td>
                    <td style={styles.tableCell}>{item.category}</td>
                    <td style={{ ...styles.tableCell, textAlign: 'right', fontWeight: 'bold' }}>
                      {item.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>
            Нет данных об объявлениях
          </p>
        )}
      </div>

      <div style={styles.section}>
        <div style={styles.tabContainer}>
          {[
            { id: 'today', label: '📅 Сегодня' },
            { id: 'week', label: '📆 Неделя' },
            { id: 'month', label: '📅 Месяц' },
            { id: 'all', label: '📋 Все' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setCurrentPage(1);
              }}
              style={{
                ...styles.tabButton,
                background: activeTab === tab.id ? '#2196F3' : '#f0f0f0',
                color: activeTab === tab.id ? 'white' : '#333'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {apartments.length > 0 ? (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Город</th>
                    <th style={styles.tableHeader}>Категория</th>
                    <th style={styles.tableHeader}>Название</th>
                    <th style={styles.tableHeader}>Дата</th>
                    <th style={{ ...styles.tableHeader, textAlign: 'center' }}>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {apartments.map((apt, index) => (
                    <tr key={index}>
                      <td style={styles.tableCell}>{apt.city || '—'}</td>
                      <td style={styles.tableCell}>{apt.category || '—'}</td>
                      <td style={styles.tableCell}>
                        <Link href={`/apartment/${apt._id}`} style={styles.link}>
                          {apt.name || 'Без названия'} 🔗
                        </Link>
                      </td>
                      <td style={styles.tableCell}>
                        {new Date(apt.time).toLocaleString('ru-RU')}
                      </td>
                      <td style={{ ...styles.tableCell, textAlign: 'center' }}>
                        <Link href={`/apartment/${apt._id}`} style={styles.viewButton}>
                          Просмотр
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {activeTab === 'all' && pagination && pagination.totalPages > 1 && (
              <div style={styles.pagination}>
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: isMobile ? '6px 12px' : '8px 16px',
                    background: currentPage === 1 ? '#ccc' : '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  ←
                </button>
                
                <span style={{ 
                  padding: isMobile ? '6px 12px' : '8px 16px', 
                  background: '#f0f0f0', 
                  borderRadius: '4px' 
                }}>
                  {currentPage} из {pagination.totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={currentPage === pagination.totalPages}
                  style={{
                    padding: isMobile ? '6px 12px' : '8px 16px',
                    background: currentPage === pagination.totalPages ? '#ccc' : '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: currentPage === pagination.totalPages ? 'not-allowed' : 'pointer'
                  }}
                >
                  →
                </button>
              </div>
            )}
          </>
        ) : (
          <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>
            Нет объявлений за выбранный период
          </p>
        )}
      </div>

      {error && (
        <div style={{ 
          marginTop: '20px',
          padding: '15px', 
          background: '#ffebee', 
          color: '#c62828',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
    </div>
  );
}