


'use client';

import { LanguageProvider, useLanguage } from "@/app/LanguageContext";
import Header from "@/app/components/Header";
import { store } from "@/app/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Avatar,
  Box,
  Paper,
  Grid,
  Button,
  TextField,
  Divider,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  Edit,
  Save,
  Phone,
  Email,
  Lock,
  Person,
  LocationOn
} from "@mui/icons-material";
import { updateProfile } from "@/app/store/authSlice";
import ChangePasswordDialog from "@/app/components/ChangePasswordDialog";
import Head from 'next/head';

const profileTranslations = {
  ua: {
    personalInfo: "Особиста інформація",
    contacts: "Контакти",
    email: "Електронна пошта",
    security: "Безпека",
    name: "Ім'я",
    city: "Місто",
    about: "Про себе",
    phone: "Телефон",
    emailAddress: "Електронна адреса",
    changePassword: "Змінити пароль",
    changePasswordHint: "Натисніть кнопку щоб змінити пароль",
    edit: "Редагувати",
    save: "Зберегти",
    cancel: "Скасувати",
    saving: "Збереження...",
    landlordProfile: "Профіль ",
    cityNotSpecified: "Місто не вказано",
    notSpecified: "Не вказано",
    noInfo: "Немає інформації",
    phonesNotSpecified: "Телефони не вказані",
    emailNotSpecified: "Електронна пошта не вказана",
    profileLoadError: "Помилка загрузки профілю",
    pleaseLogin: "Будь ласка, увійдіть в систему щоб переглянути профіль",
    accessDenied: "Доступ заборонено",
    dataSaved: "Дані успішно збережено!",
    saveError: "Не вдалося зберегти дані",
    loadingProfile: "Загрузка профілю...",
    aboutPlaceholder: "Розкажіть про себе ... ",
    addPhone: "Додати телефон",
    metaTitle: "Профіль | NaDoby",
    metaDescription: "Управління профілем . Особиста інформація, контакти та налаштування безпеки."
  },
  ru: {
    personalInfo: "Личная информация",
    contacts: "Контакты",
    email: "Электронная почта",
    security: "Безопасность",
    name: "Имя",
    city: "Город",
    about: "О себе",
    phone: "Телефон",
    emailAddress: "Электронная адреса",
    changePassword: "Сменить пароль",
    changePasswordHint: "Нажмите кнопку чтобы сменить пароль",
    edit: "Редактировать",
    save: "Сохранить",
    cancel: "Отменить",
    saving: "Сохранение...",
    landlordProfile: "Профиль ",
    cityNotSpecified: "Город не указан",
    notSpecified: "Не указано",
    noInfo: "Нет информации",
    phonesNotSpecified: "Телефоны не указаны",
    emailNotSpecified: "Электронная почта не указана",
    profileLoadError: "Ошибка загрузки профиля",
    pleaseLogin: "Пожалуйста, войдите в систему чтобы просмотреть профиль",
    accessDenied: "Доступ запрещен",
    dataSaved: "Данные успешно сохранены!",
    saveError: "Не удалось сохранить данные",
    loadingProfile: "Загрузка профиля...",
    aboutPlaceholder: "Расскажите о себе ...",
    addPhone: "Добавить телефон",
    metaTitle: "Профиль | NaDoby",
    metaDescription: "Управление профилем. Личная информация, контакты и настройки безопасности."
  }
};

const getSafeProfileData = (profile) => {
  if (!profile || typeof profile !== 'object') {
    return {
      name: "",
      city: "",
      phones: [""],
      about: "",
      email: "",
      avatar: "/default-avatar.jpg"
    };
  }

  let phones = [""];
  if (profile.phones && Array.isArray(profile.phones)) {
    phones = profile.phones.map(phone => String(phone || ""));
    if (phones.length === 0) {
      phones = [""];
    }
  }

  return {
    name: String(profile.name || ""),
    city: String(profile.city || ""),
    phones: phones,
    about: String(profile.about || ""),
    email: String(profile.email || ""),
    avatar: String(profile.avatar || "/default-avatar.jpg")
  };
};

const fetchUserListingsData = async (userId) => {
  if (!userId) return null;
  
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_API_URL 
      : '${process.env.NEXT_PUBLIC_API_URL}';
    
    const response = await fetch(`${baseUrl}/api/v1/apartments/user/${userId}`);
    
    if (response.ok) {
      const listings = await response.json();
      
      if (listings && Array.isArray(listings) && listings.length > 0) {
        const allPhones = [];
        let city = '';
        
        listings.forEach(listing => {
          if (!city && listing.city) {
            city = listing.city;
          }
          
          if (listing.phones && Array.isArray(listing.phones)) {
            listing.phones.forEach(phone => {
              const cleanPhone = phone ? phone.trim() : '';
              if (cleanPhone && !allPhones.includes(cleanPhone)) {
                allPhones.push(cleanPhone);
              }
            });
          }
        });
        
        return {
          city: city || "",
          phones: allPhones
        };
      }
    }
  } catch (error) {
    console.error('Ошибка загрузки данных объявлений:', error);
  }
  return null;
};

function ProfileSection({ title, icon, children }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
      >
        {icon}
        <Box component="span" sx={{ ml: 1 }}>{title}</Box>
      </Typography>
      {children}
    </Box>
  );
}

function LandlordProfileContent() {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const { currentLanguage } = useLanguage();
  const t = profileTranslations[currentLanguage];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const isAuthenticated = Boolean(authState?.isAuthenticated);
  const rawProfile = authState?.profile;
  
  const [userData, setUserData] = useState(getSafeProfileData());
  const [editMode, setEditMode] = useState(false);
  const [initialData, setInitialData] = useState(getSafeProfileData());
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [listingsData, setListingsData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getUniquePhones = (phones) => {
    const seen = new Set();
    const uniquePhones = [];
    
    phones.forEach(phone => {
      if (!phone) return;
      
      const cleanPhone = phone.trim();
      if (!cleanPhone) return;
      
      if (!seen.has(cleanPhone)) {
        seen.add(cleanPhone);
        uniquePhones.push(cleanPhone);
      }
    });
    
    return uniquePhones;
  };

  const getDisplayPhonesList = () => {
    const profilePhones = userData.phones.filter(phone => phone && phone.trim() !== '');
    
    if (profilePhones.length > 0) {
      return getUniquePhones(profilePhones);
    }
    
    if (listingsData?.phones && listingsData.phones.length > 0) {
      return getUniquePhones(listingsData.phones);
    }
    
    return [];
  };

  const getPhonesForEdit = () => {
    const profilePhones = userData.phones.filter(phone => phone && phone.trim() !== '');
    
    if (profilePhones.length > 0) {
      return userData.phones;
    }
    
    if (listingsData?.phones && listingsData.phones.length > 0) {
      return [...listingsData.phones, ""];
    }
    
    return [""];
  };

  const getDisplayCity = () => {
    if (userData.city && userData.city.trim() !== "") {
      return userData.city;
    }
    
    if (listingsData?.city && listingsData.city.trim() !== "") {
      return listingsData.city;
    }
    
    return t.cityNotSpecified;
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      
      if (!token) return;

      const baseUrl = process.env.NODE_ENV === 'production' 
        ? process.env.NEXT_PUBLIC_API_URL 
        : '${process.env.NEXT_PUBLIC_API_URL}';

      const response = await fetch(`${baseUrl}/api/v1/auth/me`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        const userDataFromServer = result.data;
        
        const safeData = getSafeProfileData(userDataFromServer);
        
        setUserData(safeData);
        setInitialData(safeData);
        
        dispatch(updateProfile(userDataFromServer));

        const userId = userDataFromServer.id || userDataFromServer._id || userDataFromServer.userId || userDataFromServer.user_id;

        if (userId) {
          const listingsDataResult = await fetchUserListingsData(userId);
          if (listingsDataResult) {
            setListingsData(listingsDataResult);
          }
        }
      }
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
    } finally {
      setIsDataLoaded(true);
    }
  };

  useEffect(() => {
    if (isAuthenticated && isClient) {
      fetchUserProfile();
    }
  }, [isAuthenticated, isClient]);

  useEffect(() => {
    if (isClient && rawProfile) {
      const safeProfileData = getSafeProfileData(rawProfile);
      setUserData(safeProfileData);
      setInitialData(safeProfileData);
    }
  }, [rawProfile, isClient]);

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setUserData(prev => ({ 
      ...prev, 
      [field]: value 
    }));
    setSaveError("");
    setSaveSuccess("");
  };

  const handlePhoneChange = (index) => (event) => {
    const value = event.target.value;
    setUserData(prev => {
      const newPhones = [...prev.phones];
      newPhones[index] = value;
      return { ...prev, phones: newPhones };
    });
    setSaveError("");
    setSaveSuccess("");
  };

  const addPhoneField = () => {
    setUserData(prev => ({
      ...prev,
      phones: [...prev.phones, ""]
    }));
  };

  const removePhoneField = (index) => {
    setUserData(prev => {
      const newPhones = [...prev.phones];
      newPhones.splice(index, 1);
      if (newPhones.length === 0) {
        newPhones.push("");
      }
      return { ...prev, phones: newPhones };
    });
  };

  const handleEdit = () => {
    const phonesForEdit = getPhonesForEdit();
    setUserData(prev => ({ ...prev, phones: phonesForEdit }));
    setEditMode(true);
  };

  const handleSave = async () => {
    setLoading(true);
    setSaveError("");
    setSaveSuccess("");

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Необходима авторизация');
      }

      const baseUrl = process.env.NODE_ENV === 'production' 
        ? process.env.NEXT_PUBLIC_API_URL 
        : '${process.env.NEXT_PUBLIC_API_URL}';

      const uniquePhones = getUniquePhones(userData.phones.filter(phone => phone.trim() !== ''));
      
      const updateData = {
        name: userData.name || "",
        email: (userData.email || "").toLowerCase(),
        city: userData.city || "",
        phones: uniquePhones,
        about: userData.about || ""
      };

      const response = await fetch(`${baseUrl}/api/v1/auth/updatedetails`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        dispatch(updateProfile(result.data));
        
        const updatedSafeData = getSafeProfileData(result.data);
        setInitialData(updatedSafeData);
        setUserData(updatedSafeData);
        setEditMode(false);
        setSaveSuccess(t.dataSaved);
        
        setTimeout(() => {
          fetchUserProfile();
        }, 500);
      } else {
        throw new Error(result.message || t.saveError);
      }
    } catch (error) {
      setSaveError(error.message || t.saveError);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setUserData(initialData);
    setEditMode(false);
    setSaveError("");
    setSaveSuccess("");
  };

  const openChangePassword = () => {
    setChangePasswordOpen(true);
  };

  if (!isClient || !isDataLoaded) {
    return (
      <>
        <Head>
          <title>{t.metaTitle}</title>
          <meta name="description" content={t.metaDescription} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href="https://nadoby.com.ua/my-profile" />
        </Head>
        <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
              {t.loadingProfile}
            </Typography>
          </Paper>
        </Container>
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>{t.metaTitle}</title>
          <meta name="description" content={t.metaDescription} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href="https://nadoby.com.ua/my-profile" />
        </Head>
        <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" color="error" gutterBottom>
              {t.accessDenied}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t.pleaseLogin}
            </Typography>
          </Paper>
        </Container>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://nadoby.com.ua/my-profile" />
      </Head>

      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          {/* Кнопка редактирования для мобильных устройств */}
          {isMobile && !editMode && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Button 
                variant="outlined" 
                startIcon={<Edit />}
                onClick={handleEdit}
                fullWidth
              >
                {t.edit}
              </Button>
            </Box>
          )}

          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            mb: 4 
          }}>
            <Avatar 
              src={userData.avatar} 
              sx={{ 
                width: 100, 
                height: 100, 
                mr: isMobile ? 0 : 3,
                mb: isMobile ? 2 : 0 
              }}
              alt={userData.name}
              onError={(e) => {
                e.target.src = '/default-avatar.jpg';
              }}
            />
            
            <Box sx={{ 
              flexGrow: 1, 
              width: isMobile ? '100%' : 'auto',
              mb: isMobile ? 2 : 0 
            }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {userData.name || t.landlordProfile}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body1" color="text.secondary">
                  {getDisplayCity()}
                </Typography>
              </Box>
            </Box>
            
            {/* Кнопка редактирования для десктопов */}
            {!isMobile && !editMode ? (
              <Button 
                variant="outlined" 
                startIcon={<Edit />}
                onClick={handleEdit}
              >
                {t.edit}
              </Button>
            ) : !isMobile && editMode ? (
              <Button 
                variant="contained" 
                startIcon={<Save />}
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? t.saving : t.save}
              </Button>
            ) : null}
          </Box>

          {saveError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {saveError}
            </Alert>
          )}
          
          {saveSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {saveSuccess}
            </Alert>
          )}

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <ProfileSection title={t.personalInfo} icon={<Person />}>
                {editMode ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      fullWidth
                      label={t.name}
                      value={userData.name}
                      onChange={handleInputChange('name')}
                    />
                    <TextField
                      fullWidth
                      label={t.city}
                      value={userData.city}
                      onChange={handleInputChange('city')}
                      placeholder={t.cityNotSpecified}
                    />
                    <TextField
                      fullWidth
                      label={t.about}
                      value={userData.about}
                      onChange={handleInputChange('about')}
                      multiline
                      rows={3}
                      placeholder={t.aboutPlaceholder}
                    />
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t.name}
                      </Typography>
                      <Typography variant="body1">
                        {userData.name || t.notSpecified}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t.city}
                      </Typography>
                      <Typography variant="body1">
                        {getDisplayCity()}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {t.about}
                      </Typography>
                      <Typography variant="body1">
                        {userData.about || t.noInfo}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </ProfileSection>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <ProfileSection title={t.contacts} icon={<Phone />}>
                {editMode ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {userData.phones.map((phone, index) => (
                      <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <TextField
                          fullWidth
                          label={`${t.phone} ${index + 1}`}
                          value={phone}
                          onChange={handlePhoneChange(index)}
                          placeholder="+380XXXXXXXXX"
                          InputProps={{
                            startAdornment: <Phone sx={{ color: 'action.active', mr: 1 }} />,
                          }}
                        />
                        {userData.phones.length > 1 && (
                          <Button 
                            variant="outlined" 
                            color="error"
                            onClick={() => removePhoneField(index)}
                            sx={{ minWidth: 'auto', px: 2 }}
                          >
                            ×
                          </Button>
                        )}
                      </Box>
                    ))}
                    <Button 
                      variant="outlined" 
                      onClick={addPhoneField}
                      startIcon={<Phone />}
                    >
                      {t.addPhone}
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {getDisplayPhonesList().length > 0 ? (
                      getDisplayPhonesList().map((phone, index) => (
                        <Box key={index}>
                          <Typography variant="subtitle2" color="text.secondary">
                            {t.phone} {index + 1}
                          </Typography>
                          <Typography variant="body1">
                            {phone}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        {t.phonesNotSpecified}
                      </Typography>
                    )}
                  </Box>
                )}
              </ProfileSection>

              <Divider sx={{ my: 3 }} />

              <ProfileSection title={t.email} icon={<Email />}>
                {editMode ? (
                  <TextField
                    fullWidth
                    label={t.emailAddress}
                    type="email"
                    value={userData.email}
                    onChange={handleInputChange('email')}
                    InputProps={{
                      startAdornment: <Email sx={{ color: 'action.active', mr: 1 }} />,
                    }}
                  />
                ) : (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      {t.emailAddress}
                    </Typography>
                    <Typography variant="body1">
                      {userData.email || t.emailNotSpecified}
                    </Typography>
                  </Box>
                )}
              </ProfileSection>

              <Divider sx={{ my: 3 }} />

              <ProfileSection title={t.security} icon={<Lock />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {t.changePassword}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t.changePasswordHint}
                    </Typography>
                  </Box>
                  <Button 
                    variant="outlined" 
                    startIcon={<Lock />}
                    onClick={openChangePassword}
                  >
                    {t.changePassword}
                  </Button>
                </Box>
              </ProfileSection>
            </Grid>
          </Grid>

          {editMode && (
            <Box sx={{ 
              mt: 4, 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'flex-end', 
              gap: 2 
            }}>
              {isMobile && (
                <Button 
                  variant="contained" 
                  onClick={handleSave}
                  disabled={loading}
                  fullWidth
                  sx={{ order: 1 }}
                >
                  {loading ? <CircularProgress size={24} /> : t.save}
                </Button>
              )}
              <Button 
                variant="outlined" 
                onClick={handleCancel}
                disabled={loading}
                fullWidth={isMobile}
              >
                {t.cancel}
              </Button>
              {!isMobile && (
                <Button 
                  variant="contained" 
                  onClick={handleSave}
                  disabled={loading}
                  sx={{ minWidth: 120 }}
                >
                  {loading ? <CircularProgress size={24} /> : t.save}
                </Button>
              )}
            </Box>
          )}
        </Paper>
      </Container>

      <ChangePasswordDialog 
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
      />
    </>
  );
}

// Функция для статической генерации - выполняется на сервере во время сборки
export async function getStaticProps() {
  return {
    props: {
      generatedAt: new Date().toISOString(),
    },
    // Регенерация страницы каждые 24 часа (опционально)
    revalidate: 86400, // 24 часа в секундах
  }
}

export default function LandlordProfile() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <Header />
        <LandlordProfileContent />
      </LanguageProvider>
    </Provider>
  );
}