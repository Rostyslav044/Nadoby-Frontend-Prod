// // pages/resetpassword/[token].js
// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import dynamic from 'next/dynamic';

// // Основной компонент
// const ResetPasswordContent = () => {
//   const router = useRouter();
//   const { token } = router.query;
//   const [formData, setFormData] = useState({
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Проверка совпадения паролей
//     if (formData.newPassword !== formData.confirmPassword) {
//       alert('Новые пароли не совпадают!');
//       return;
//     }

//     if (!token) {
//       alert('Токен не найден!');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.put(`https://nadoby.com.ua/api/v1/auth/resetpassword/${token}`, {
//         password: formData.newPassword,
//       });

//       console.log("Password reset success:", response.data);
//       alert('Пароль успешно изменен!');
//       router.push('/');
//     } catch (error) {
//       if (error.response) {
//         console.error("Error:", error.response.data);
//         alert(error.response.data.error || "Ошибка при смене пароля");
//       } else {
//         console.error("Network error:", error.message);
//         alert("Ошибка сети");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
//       <h1>Смена пароля</h1>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '15px' }}>
//           <label>Новый пароль:</label>
//           <input
//             type="password"
//             name="newPassword"
//             value={formData.newPassword}
//             onChange={handleChange}
//             required
//             style={{ width: '100%', padding: '8px', marginTop: '5px' }}
//             disabled={loading}
//           />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label>Подтвердите новый пароль:</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//             style={{ width: '100%', padding: '8px', marginTop: '5px' }}
//             disabled={loading}
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             width: '100%',
//             padding: '10px',
//             backgroundColor: loading ? '#ccc' : '#0070f3',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: loading ? 'not-allowed' : 'pointer'
//           }}
//         >
//           {loading ? 'Смена пароля...' : 'Сменить пароль'}
//         </button>
//       </form>
//     </div>
//   );
// };

// // Отключаем SSR для этой страницы
// const ResetPassword = dynamic(() => Promise.resolve(ResetPasswordContent), {
//   ssr: false
// });

// export default ResetPassword;



"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  IconButton,
  InputAdornment,
  Fade,
  Zoom,
  useTheme,
  alpha,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  ArrowBack,
  Lock,
  Visibility,
  VisibilityOff,
  CheckCircle,
  Security,
} from '@mui/icons-material';

const translations = {
  ua: {
    title: 'Створення нового пароля',
    subtitle: 'Введіть новий пароль та підтвердіть його',
    newPasswordLabel: 'Новий пароль',
    confirmPasswordLabel: 'Підтвердіть новий пароль',
    changeButton: 'Змінити пароль',
    backToLogin: 'Повернутися до входу',
    successTitle: 'Пароль успішно змінено!',
    successMessage: 'Ваш пароль був успішно оновлений',
    instructions: 'Тепер ви можете використовувати новий пароль для входу',
    errorMessage: 'Сталася помилка. Спробуйте ще раз',
    loading: 'Зміна пароля...',
    passwordRequired: 'Будь ласка, введіть пароль',
    passwordsMatch: 'Паролі мають співпадати',
    passwordStrength: 'Надійність пароля:',
    showPassword: 'Показати пароль',
    hidePassword: 'Приховати пароль',
    weak: 'Слабкий',
    fair: 'Середній',
    good: 'Хороший',
    strong: 'Сильний',
    veryStrong: 'Дуже сильний',
    passwordChanged: 'Пароль змінено',
    passwordTips: 'Поради для кращого пароля:',
    tipLength: 'Використовуйте не менше 8 символів',
    tipVariety: 'Комбінуйте літери, цифри та символи',
    tipUnique: 'Не використовуйте особисту інформацію',
    tokenMissing: 'Токен не знайдено!',
  },
  ru: {
    title: 'Создание нового пароля',
    subtitle: 'Введите новый пароль и подтвердите его',
    newPasswordLabel: 'Новый пароль',
    confirmPasswordLabel: 'Подтвердите новый пароль',
    changeButton: 'Сменить пароль',
    backToLogin: 'Вернуться ко входу',
    successTitle: 'Пароль успешно изменен!',
    successMessage: 'Ваш пароль был успешно обновлен',
    instructions: 'Теперь вы можете использовать новый пароль для входа',
    errorMessage: 'Произошла ошибка. Попробуйте еще раз',
    loading: 'Изменение пароля...',
    passwordRequired: 'Пожалуйста, введите пароль',
    passwordsMatch: 'Пароли должны совпадать',
    passwordStrength: 'Надежность пароля:',
    showPassword: 'Показать пароль',
    hidePassword: 'Скрыть пароль',
    weak: 'Слабый',
    fair: 'Средний',
    good: 'Хороший',
    strong: 'Сильный',
    veryStrong: 'Очень сильный',
    passwordChanged: 'Пароль изменен',
    passwordTips: 'Советы для лучшего пароля:',
    tipLength: 'Используйте не менее 8 символов',
    tipVariety: 'Комбинируйте буквы, цифры и символы',
    tipUnique: 'Не используйте личную информацию',
    tokenMissing: 'Токен не найден!',
  }
};

const ResetPassword = ({ language = 'ua' }) => {
  const router = useRouter();
  const { token } = router.query;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tokenError, setTokenError] = useState(false);
  
  const t = translations[language];
  const theme = useTheme();

  useEffect(() => {
    // Проверяем, загрузился ли токен из URL
    if (router.isReady && !token) {
      setTokenError(true);
      setError(t.tokenMissing);
    }
  }, [router.isReady, token, t.tokenMissing]);

  // Функция для оценки сложности пароля (только для информации)
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: 'weak', color: 'error' };
    
    let score = 0;
    
    // Проверяем длину
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Проверяем разнообразие символов
    if (/[A-Z]/.test(password)) score += 1; // Заглавные буквы
    if (/[a-z]/.test(password)) score += 1; // Строчные буквы
    if (/\d/.test(password)) score += 1; // Цифры
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1; // Специальные символы
    
    // Определяем уровень сложности
    if (score <= 2) return { score, label: 'weak', color: 'error', percentage: 25 };
    if (score <= 3) return { score, label: 'fair', color: 'warning', percentage: 50 };
    if (score <= 5) return { score, label: 'good', color: 'info', percentage: 75 };
    return { score, label: 'strong', color: 'success', percentage: 100 };
  };

  const passwordStrength = getPasswordStrength(newPassword);
  
  const getStrengthLabel = (label) => {
    switch (label) {
      case 'weak': return t.weak;
      case 'fair': return t.fair;
      case 'good': return t.good;
      case 'strong': return t.strong;
      default: return t.weak;
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Минимальная валидация - только проверка на пустоту
    if (!newPassword.trim()) {
      errors.newPassword = t.passwordRequired;
    }
    
    if (!confirmPassword.trim()) {
      errors.confirmPassword = t.passwordRequired;
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = t.passwordsMatch;
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Проверяем наличие токена
    if (!token) {
      setTokenError(true);
      setError(t.tokenMissing);
      return;
    }
    
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setLoading(true);
    setError('');
    setFormErrors({});
    setTokenError(false);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://nadoby.com.ua'}/api/v1/auth/resetpassword/${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          password: newPassword,
          language
        }),
      });

      // Проверяем статус ответа
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Неправильний токен або термін дії минув');
        }
        if (response.status === 404) {
          throw new Error('Сторінка не знайдена');
        }
        throw new Error(`Помилка сервера: ${response.status}`);
      }

      // Проверяем, что ответ пришел и это JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Неправильний формат відповіді сервера');
      }

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Автоматический переход через 3 секунды
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        setError(data.error || data.message || t.errorMessage);
      }
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err.message || t.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        p: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        backgroundImage: `
          radial-gradient(circle at 10% 90%, rgba(33, 150, 243, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 90% 10%, rgba(76, 175, 80, 0.05) 0%, transparent 50%)
        `,
      }}
    >
      <Zoom in={true} style={{ transitionDelay: '100ms' }}>
        <Paper 
          elevation={0}
          sx={{ 
            width: '100%',
            maxWidth: '520px',
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: alpha(theme.palette.divider, 0.2),
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: 'linear-gradient(90deg, #2196f3 0%, #4caf50 100%)',
            }
          }}
        >
          {/* Заголовок */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                height: 70,
                borderRadius: '50%',
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                mb: 2.5,
                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.2)',
              }}
            >
              {success ? (
                <CheckCircle sx={{ fontSize: 36, color: theme.palette.success.main }} />
              ) : (
                <Security sx={{ fontSize: 36, color: theme.palette.primary.main }} />
              )}
            </Box>
            
            <Typography 
              variant="h4"
              component="h1"
              fontWeight="700"
              sx={{ 
                mb: 1.5,
                background: success 
                  ? `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`
                  : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {success ? t.successTitle : t.title}
            </Typography>
            
            <Typography 
              variant="body1"
              color="text.secondary"
              sx={{ 
                fontSize: '1rem',
                lineHeight: 1.6,
                maxWidth: '400px',
                mx: 'auto',
              }}
            >
              {success ? t.successMessage : t.subtitle}
            </Typography>
          </Box>

          {/* Ошибка с токеном */}
          {tokenError && (
            <Alert 
              severity="error"
              sx={{ 
                mb: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="body2">
                {t.tokenMissing}
              </Typography>
            </Alert>
          )}

          {/* Успешное сообщение */}
          {success ? (
            <Fade in={true}>
              <Box>
                <Alert 
                  severity="success"
                  icon={false}
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.success.main, 0.08),
                    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                    py: 2.5,
                    px: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircle sx={{ color: theme.palette.success.main, fontSize: 28 }} />
                    <Box>
                      <Typography variant="body1" fontWeight="600" sx={{ mb: 0.5 }}>
                        {t.passwordChanged}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t.instructions}
                      </Typography>
                    </Box>
                  </Box>
                </Alert>

                <Divider sx={{ my: 3 }} />
                
                <Button
                  onClick={handleBackToLogin}
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    py: 1.4,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  {t.backToLogin}
                </Button>
              </Box>
            </Fade>
          ) : (
            <Box component="form" onSubmit={handleSubmit} noValidate>
              {error && !tokenError && (
                <Alert 
                  severity="error"
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                  }}
                >
                  {error}
                </Alert>
              )}

              {/* Новый пароль */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label={t.newPasswordLabel}
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (formErrors.newPassword) {
                      setFormErrors(prev => ({ ...prev, newPassword: '' }));
                    }
                  }}
                  error={!!formErrors.newPassword}
                  helperText={formErrors.newPassword}
                  disabled={loading || tokenError}
                  autoFocus
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowNewPassword}
                          edge="end"
                          aria-label={showNewPassword ? t.hidePassword : t.showPassword}
                          sx={{ color: 'text.secondary' }}
                          disabled={loading || tokenError}
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
                
                {/* Индикатор сложности пароля (только для информации) */}
                {newPassword && (
                  <Fade in={true}>
                    <Box sx={{ mt: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          {t.passwordStrength}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          fontWeight="600"
                          sx={{ color: theme.palette[passwordStrength.color].main }}
                        >
                          {getStrengthLabel(passwordStrength.label)}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={passwordStrength.percentage}
                        sx={{ 
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: alpha(theme.palette.grey[300], 0.5),
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: theme.palette[passwordStrength.color].main,
                            borderRadius: 3,
                          }
                        }}
                      />
                    </Box>
                  </Fade>
                )}
              </Box>

              {/* Подтверждение пароля */}
              <Box sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  label={t.confirmPasswordLabel}
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (formErrors.confirmPassword) {
                      setFormErrors(prev => ({ ...prev, confirmPassword: '' }));
                    }
                  }}
                  error={!!formErrors.confirmPassword}
                  helperText={formErrors.confirmPassword}
                  disabled={loading || tokenError}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                          aria-label={showConfirmPassword ? t.hidePassword : t.showPassword}
                          sx={{ color: 'text.secondary' }}
                          disabled={loading || tokenError}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
                
                {/* Советы по паролю */}
                {!newPassword && !confirmPassword && !tokenError && (
                  <Fade in={true}>
                    <Paper
                      elevation={0}
                      sx={{
                        mt: 2,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: alpha(theme.palette.info.main, 0.05),
                        border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1, color: 'text.primary' }}>
                        {t.passwordTips}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                        {t.tipLength}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                        {t.tipVariety}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        {t.tipUnique}
                      </Typography>
                    </Paper>
                  </Fade>
                )}
              </Box>

              {/* Кнопка отправки */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading || tokenError || !token}
                sx={{
                  mb: 2,
                  py: 1.4,
                  borderRadius: 2,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)',
                    transform: 'translateY(-1px)',
                  },
                  '&:disabled': {
                    background: theme.palette.action.disabled,
                  },
                  transition: 'all 0.2s',
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress 
                      size={22} 
                      sx={{ 
                        mr: 1.5, 
                        color: 'inherit' 
                      }} 
                    />
                    {t.loading}
                  </>
                ) : (
                  t.changeButton
                )}
              </Button>

              {/* Кнопка назад */}
              <Button
                onClick={handleBackToLogin}
                variant="text"
                fullWidth
                sx={{
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    color: theme.palette.primary.main,
                  }
                }}
              >
                <ArrowBack sx={{ mr: 1, fontSize: '1rem' }} />
                {t.backToLogin}
              </Button>
            </Box>
          )}
        </Paper>
      </Zoom>
    </Box>
  );
};

export default ResetPassword;