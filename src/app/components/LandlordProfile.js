

// 'use client';

// import { LanguageProvider } from "@/app/LanguageContext";
// import Header from "@/app/components/Header";
// import { store } from "@/app/store";
// import { Provider, useDispatch, useSelector } from "react-redux";
// import {
//   Container,
//   Typography,
//   Avatar,
//   Box,
//   Paper,
//   Grid,
//   Button,
//   TextField,
//   Divider,
//   Alert,
//   CircularProgress,
//   InputAdornment,
//   IconButton
// } from "@mui/material";
// import { useState, useEffect } from "react";
// import {
//   Edit,
//   Save,
//   Phone,
//   Email,
//   Lock,
//   Person,
//   LocationOn,
//   Visibility,
//   VisibilityOff
// } from "@mui/icons-material";
// import { updateProfile } from "@/app/store/authSlice";
// import ChangePasswordDialog from "@/app/components/ChangePasswordDialog";

// // Безопасные утилиты прямо в файле
// const getSafeProfileData = (profile) => {
//   if (!profile || typeof profile !== 'object') {
//     return {
//       name: "",
//       city: "",
//       phones: ["", "", ""],
//       about: "",
//       email: "",
//       avatar: "/default-avatar.jpg"
//     };
//   }

//   return {
//     name: String(profile.name || ""),
//     city: String(profile.city || ""),
//     phones: Array.isArray(profile.phones) 
//       ? profile.phones.map(phone => String(phone || ""))
//       : ["", "", ""],
//     about: String(profile.about || ""),
//     email: String(profile.email || ""),
//     avatar: String(profile.avatar || "/default-avatar.jpg")
//   };
// };

// function ProfileSection({ title, icon, children }) {
//   return (
//     <Box sx={{ mb: 4 }}>
//       <Typography 
//         variant="h6" 
//         gutterBottom 
//         sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
//       >
//         {icon}
//         <Box component="span" sx={{ ml: 1 }}>{title}</Box>
//       </Typography>
//       {children}
//     </Box>
//   );
// }

// function LandlordProfileContent() {
//   const dispatch = useDispatch();
//   const authState = useSelector(state => state.auth);
  
//   const isAuthenticated = Boolean(authState?.isAuthenticated);
//   const rawProfile = authState?.profile;
  
//   const [userData, setUserData] = useState(getSafeProfileData());
//   const [editMode, setEditMode] = useState(false);
//   const [initialData, setInitialData] = useState(getSafeProfileData());
//   const [isClient, setIsClient] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [saveError, setSaveError] = useState("");
//   const [saveSuccess, setSaveSuccess] = useState("");
//   const [changePasswordOpen, setChangePasswordOpen] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // Загрузка данных пользователя из Redux store
//   useEffect(() => {
//     if (isClient && rawProfile) {
//       const safeProfileData = getSafeProfileData(rawProfile);
//       setUserData(safeProfileData);
//       setInitialData(safeProfileData);
//     }
//   }, [rawProfile, isClient]);

//   // Функция для загрузки реальных данных с сервера
//   const fetchUserProfile = async () => {
//     try {
//       const token = localStorage.getItem('auth_token');
//       if (!token) return;

//       const response = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.ok) {
//         const result = await response.json();
//         const userDataFromServer = result.data;
//         const safeData = getSafeProfileData(userDataFromServer);
        
//         setUserData(safeData);
//         setInitialData(safeData);
        
//         dispatch(updateProfile(userDataFromServer));
//       } else {
//         console.error('Failed to fetch profile:', response.status);
//       }
//     } catch (error) {
//       console.error('Ошибка загрузки профиля:', error);
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated && isClient) {
//       fetchUserProfile();
//     }
//   }, [isAuthenticated, isClient]);

//   const handleInputChange = (field) => (event) => {
//     const value = event.target.value;
//     setUserData(prev => ({ 
//       ...prev, 
//       [field]: value 
//     }));
//     setSaveError("");
//     setSaveSuccess("");
//   };

//   const handlePhoneChange = (index) => (event) => {
//     const value = event.target.value;
//     setUserData(prev => {
//       const newPhones = [...prev.phones];
//       newPhones[index] = value;
//       return { ...prev, phones: newPhones };
//     });
//     setSaveError("");
//     setSaveSuccess("");
//   };

//   // УЛУЧШЕННОЕ СОХРАНЕНИЕ С ПРОВЕРКОЙ URL
//   const handleSave = async () => {
//     setLoading(true);
//     setSaveError("");
//     setSaveSuccess("");

//     try {
//       const token = localStorage.getItem('auth_token');
//       if (!token) {
//         throw new Error('Необходима авторизация');
//       }

//       // Подготавливаем данные для отправки
//       const updateData = {
//         name: userData.name,
//         email: userData.email.toLowerCase(),
//         city: userData.city,
//         phones: userData.phones.filter(phone => phone.trim() !== ''),
//         about: userData.about
//       };

//       console.log('Отправка данных на сервер:', updateData);

//       // Пробуем разные варианты URL
//       const baseURL = '${process.env.NEXT_PUBLIC_API_URL}';
//       const endpoints = [
//         '/api/v1/auth/updatedetails',
//         '/api/auth/updatedetails',
//         '/auth/updatedetails'
//       ];

//       let response;
//       let lastError;

//       for (const endpoint of endpoints) {
//         try {
//           console.log(`Пробуем эндпоинт: ${baseURL}${endpoint}`);
//           response = await fetch(`${baseURL}${endpoint}`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify(updateData)
//           });

//           if (response.ok) {
//             break;
//           }
//         } catch (error) {
//           lastError = error;
//           console.log(`Эндпоинт ${endpoint} не сработал:`, error.message);
//         }
//       }

//       if (!response || !response.ok) {
//         throw new Error(lastError?.message || 'Все эндпоинты вернули ошибку');
//       }

//       // Получаем ответ как текст сначала
//       const responseText = await response.text();
//       console.log('Ответ сервера (текст):', responseText);

//       let result;
//       try {
//         result = JSON.parse(responseText);
//       } catch (e) {
//         console.error('Ошибка парсинга JSON:', e);
//         // Если это HTML, ищем в нем информацию об ошибке
//         if (responseText.includes('<!DOCTYPE') || responseText.includes('<html')) {
//           throw new Error('Сервер вернул HTML страницу вместо JSON. Возможно, неверный URL или ошибка на сервере.');
//         }
//         throw new Error(`Сервер вернул невалидный JSON: ${responseText.substring(0, 100)}`);
//       }

//       if (result.success) {
//         // Обновляем данные в Redux store
//         dispatch(updateProfile(result.data));
        
//         setInitialData(getSafeProfileData(result.data));
//         setEditMode(false);
//         setSaveSuccess("Данные успешно сохранены!");
        
//         // Обновляем данные
//         setTimeout(() => {
//           fetchUserProfile();
//         }, 500);
//       } else {
//         throw new Error(result.message || 'Ошибка сохранения данных');
//       }
//     } catch (error) {
//       console.error('Ошибка сохранения:', error);
//       setSaveError(error.message || 'Не удалось сохранить данные');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setUserData(initialData);
//     setEditMode(false);
//     setSaveError("");
//     setSaveSuccess("");
//   };

//   const openChangePassword = () => {
//     setChangePasswordOpen(true);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   // Состояние загрузки
//   if (!isClient) {
//     return (
//       <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
//         <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
//           <CircularProgress />
//           <Typography variant="h6" sx={{ mt: 2 }}>
//             Загрузка профиля...
//           </Typography>
//         </Paper>
//       </Container>
//     );
//   }

//   // Проверка аутентификации
//   if (!isAuthenticated) {
//     return (
//       <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
//         <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
//           <Typography variant="h5" color="error" gutterBottom>
//             Доступ запрещен
//           </Typography>
//           <Typography variant="body1" color="text.secondary">
//             Пожалуйста, войдите в систему чтобы просмотреть профиль
//           </Typography>
//         </Paper>
//       </Container>
//     );
//   }

//   return (
//     <>
//       <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
//         <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
//           {/* Заголовок и аватар */}
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
//             <Avatar 
//               src={userData.avatar} 
//               sx={{ width: 100, height: 100, mr: 3 }}
//               alt={userData.name}
//             />
//             <Box sx={{ flexGrow: 1 }}>
//               <Typography variant="h4" component="h1" gutterBottom>
//                 {userData.name || "Профиль арендодателя"}
//               </Typography>
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <LocationOn fontSize="small" sx={{ mr: 0.5 }} />
//                 <Typography variant="body1" color="text.secondary">
//                   {userData.city || "Город не указан"}
//                 </Typography>
//               </Box>
//             </Box>
//             {!editMode ? (
//               <Button 
//                 variant="outlined" 
//                 startIcon={<Edit />}
//                 onClick={() => setEditMode(true)}
//               >
//                 Редактировать
//               </Button>
//             ) : (
//               <Button 
//                 variant="contained" 
//                 startIcon={<Save />}
//                 onClick={handleSave}
//                 disabled={loading}
//               >
//                 {loading ? "Сохранение..." : "Сохранить"}
//               </Button>
//             )}
//           </Box>

//           {/* Сообщения об ошибках/успехе */}
//           {saveError && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {saveError}
//             </Alert>
//           )}
          
//           {saveSuccess && (
//             <Alert severity="success" sx={{ mb: 2 }}>
//               {saveSuccess}
//             </Alert>
//           )}

//           <Divider sx={{ my: 3 }} />

//           {/* Основная информация */}
//           <Grid container spacing={4}>
//             {/* Личная информация */}
//             <Grid item xs={12} md={6}>
//               <ProfileSection title="Личная информация" icon={<Person />}>
//                 {editMode ? (
//                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                     <TextField
//                       fullWidth
//                       label="Имя"
//                       value={userData.name}
//                       onChange={handleInputChange('name')}
//                     />
//                     <TextField
//                       fullWidth
//                       label="Город"
//                       value={userData.city}
//                       onChange={handleInputChange('city')}
//                     />
//                     <TextField
//                       fullWidth
//                       label="О себе"
//                       value={userData.about}
//                       onChange={handleInputChange('about')}
//                       multiline
//                       rows={3}
//                       placeholder="Расскажите о себе как об арендодателе..."
//                     />
//                   </Box>
//                 ) : (
//                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                     <Box>
//                       <Typography variant="subtitle2" color="text.secondary">
//                         Имя
//                       </Typography>
//                       <Typography variant="body1">
//                         {userData.name || "Не указано"}
//                       </Typography>
//                     </Box>
                    
//                     <Box>
//                       <Typography variant="subtitle2" color="text.secondary">
//                         Город
//                       </Typography>
//                       <Typography variant="body1">
//                         {userData.city || "Не указан"}
//                       </Typography>
//                     </Box>
                    
//                     <Box>
//                       <Typography variant="subtitle2" color="text.secondary">
//                         О себе
//                       </Typography>
//                       <Typography variant="body1">
//                         {userData.about || "Не указано"}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 )}
//               </ProfileSection>
//             </Grid>
            
//             {/* Контакты и безопасность */}
//             <Grid item xs={12} md={6}>
//               <ProfileSection title="Контакты" icon={<Phone />}>
//                 {editMode ? (
//                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                     {userData.phones.map((phone, index) => (
//                       <TextField
//                         key={index}
//                         fullWidth
//                         label={`Телефон ${index + 1}`}
//                         value={phone}
//                         onChange={handlePhoneChange(index)}
//                         InputProps={{
//                           startAdornment: <Phone sx={{ color: 'action.active', mr: 1 }} />,
//                         }}
//                       />
//                     ))}
//                   </Box>
//                 ) : (
//                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                     {userData.phones
//                       .filter(phone => phone && phone.trim() !== '')
//                       .map((phone, index) => (
//                       <Box key={index}>
//                         <Typography variant="subtitle2" color="text.secondary">
//                           Телефон {index + 1}
//                         </Typography>
//                         <Typography variant="body1">
//                           {phone}
//                         </Typography>
//                       </Box>
//                     ))}
//                     {userData.phones.filter(phone => phone && phone.trim() !== '').length === 0 && (
//                       <Typography variant="body2" color="text.secondary">
//                         Телефоны не указаны
//                       </Typography>
//                     )}
//                   </Box>
//                 )}
//               </ProfileSection>

//               <Divider sx={{ my: 3 }} />

//               <ProfileSection title="Электронная почта" icon={<Email />}>
//                 {editMode ? (
//                   <TextField
//                     fullWidth
//                     label="Email"
//                     type="email"
//                     value={userData.email}
//                     onChange={handleInputChange('email')}
//                     InputProps={{
//                       startAdornment: <Email sx={{ color: 'action.active', mr: 1 }} />,
//                     }}
//                   />
//                 ) : (
//                   <Box>
//                     <Typography variant="subtitle2" color="text.secondary">
//                       Email
//                     </Typography>
//                     <Typography variant="body1">
//                       {userData.email || "Не указан"}
//                     </Typography>
//                   </Box>
//                 )}
//               </ProfileSection>

//               <Divider sx={{ my: 3 }} />

//               <ProfileSection title="Безопасность" icon={<Lock />}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                   <Box sx={{ flexGrow: 1 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                       Пароль
//                     </Typography>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <Typography variant="body1">
//                         {showPassword ? "ваш_пароль" : "••••••••"}
//                       </Typography>
//                       <IconButton
//                         size="small"
//                         onClick={togglePasswordVisibility}
//                         sx={{ ml: 1 }}
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </Box>
//                     <Typography variant="caption" color="text.secondary">
//                       {showPassword ? "Пароль скрыт" : "Нажмите на глаз чтобы показать пароль"}
//                     </Typography>
//                   </Box>
//                   <Button 
//                     variant="outlined" 
//                     startIcon={<Lock />}
//                     onClick={openChangePassword}
//                   >
//                     Сменить пароль
//                   </Button>
//                 </Box>
//               </ProfileSection>
//             </Grid>
//           </Grid>

//           {/* Кнопки действий в режиме редактирования */}
//           {editMode && (
//             <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
//               <Button 
//                 variant="outlined" 
//                 onClick={handleCancel}
//                 disabled={loading}
//               >
//                 Отменить
//               </Button>
//               <Button 
//                 variant="contained" 
//                 onClick={handleSave}
//                 disabled={loading}
//                 sx={{ minWidth: 120 }}
//               >
//                 {loading ? <CircularProgress size={24} /> : "Сохранить"}
//               </Button>
//             </Box>
//           )}
//         </Paper>
//       </Container>

//       {/* Диалог смены пароля */}
//       <ChangePasswordDialog 
//         open={changePasswordOpen}
//         onClose={() => setChangePasswordOpen(false)}
//       />
//     </>
//   );
// }

// // Главный компонент с провайдерами
// export default function LandlordProfile() {
//   return (
//     <Provider store={store}>
//       <LanguageProvider>
//         <Header />
//         <LandlordProfileContent />
//       </LanguageProvider>
//     </Provider>
//   );
// }