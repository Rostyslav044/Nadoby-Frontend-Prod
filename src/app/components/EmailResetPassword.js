

// "use client";

// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Alert,
//   CircularProgress,
//   Paper,
//   IconButton,
// } from '@mui/material';
// import { ArrowBack, Email } from '@mui/icons-material';
// import { useLanguage } from '../LanguageContext';

// const translations = {
//   ua: {
//     title: 'Відновлення пароля',
//     subtitle: 'Ми надішлемо посилання для скидання пароля на вашу електронну пошту',
//     emailLabel: 'Електронна адреса',
//     emailPlaceholder: 'ваша_пошта@gmail.com',
//     sendButton: 'Надіслати інструкції',
//     backToLogin: 'Назад до входу',
//     successTitle: 'Перевірте пошту',
//     successMessage: 'Посилання для відновлення пароля відправлено',
//     instructions: 'Дотримуйтесь інструкцій у листі, щоб створити новий пароль',
//     errorMessage: 'Сталася помилка. Перевірте email та спробуйте ще раз',
//     loading: 'Надсилаємо...',
//     emailRequired: 'Будь ласка, введіть email',
//     invalidEmail: 'Введіть коректну електронну адресу',
//   },
//   ru: {
//     title: 'Восстановление пароля',
//     subtitle: 'Мы отправим ссылку для сброса пароля на вашу электронную почту',
//     emailLabel: 'Электронная почта',
//     emailPlaceholder: 'ваша_почта@gmail.com',
//     sendButton: 'Отправить инструкции',
//     backToLogin: 'Назад ко входу',
//     successTitle: 'Проверьте почту',
//     successMessage: 'Ссылка для восстановления пароля отправлена',
//     instructions: 'Следуйте инструкциям в письме, чтобы создать новый пароль',
//     errorMessage: 'Произошла ошибка. Проверьте email и попробуйте еще раз',
//     loading: 'Отправляем...',
//     emailRequired: 'Пожалуйста, введите email',
//     invalidEmail: 'Введите корректный email адрес',
//   }
// };

// const EmailResetPassword = ({ onBackToLogin }) => {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');
//   const [formErrors, setFormErrors] = useState({});
  
//   const { currentLanguage } = useLanguage();
//   const t = translations[currentLanguage];

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const errors = {};
    
//     if (!email.trim()) {
//       errors.email = t.emailRequired;
//     } else if (!validateEmail(email)) {
//       errors.email = t.invalidEmail;
//     }
    
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }
    
//     setLoading(true);
//     setError('');
//     setFormErrors({});

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/forgotpassword`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           email, 
//           language: currentLanguage 
//         }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         setSuccess(true);
//       } else {
//         setError(data.message || t.errorMessage);
//       }
//     } catch (err) {
//       console.error('Reset password error:', err);
//       setError(t.errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100%',
//         width: '100%',
//         p: 2,
//       }}
//     >
//       <Paper 
//         sx={{ 
//           width: '100%',
//           maxWidth: '420px',
//           p: 3,
//           borderRadius: 2,
//           backgroundColor: 'background.paper',
//           border: '1px solid',
//           borderColor: 'divider',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//       >
//         {/* Шапка с кнопкой назад */}
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//           {onBackToLogin && (
//             <IconButton
//               onClick={onBackToLogin}
//               size="small"
//               sx={{ 
//                 mr: 1,
//                 color: 'text.secondary',
//                 '&:hover': { 
//                   backgroundColor: 'action.hover',
//                   color: 'primary.main'
//                 }
//               }}
//               aria-label={t.backToLogin}
//             >
//               <ArrowBack fontSize="small" />
//             </IconButton>
//           )}
          
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Email 
//               sx={{ 
//                 mr: 1, 
//                 color: 'primary.main',
//                 fontSize: '1.25rem'
//               }} 
//             />
//             <Typography 
//               variant="h6"
//               component="h1"
//               fontWeight="600"
//               sx={{ 
//                 fontSize: '1.125rem',
//                 color: 'text.primary'
//               }}
//             >
//               {success ? t.successTitle : t.title}
//             </Typography>
//           </Box>
//         </Box>

//         {/* Подзаголовок */}
//         <Typography 
//           variant="body2"
//           color="text.secondary"
//           sx={{ 
//             mb: 3,
//             fontSize: '0.875rem',
//             lineHeight: 1.5
//           }}
//         >
//           {success ? t.instructions : t.subtitle}
//         </Typography>

//         {/* Сообщение об успехе */}
//         {success ? (
//           <Box>
//             <Alert 
//               severity="success" 
//               icon={false}
//               sx={{ 
//                 mb: 2,
//                 borderRadius: 1,
//                 backgroundColor: 'success.light',
//                 color: 'success.dark',
//                 '& .MuiAlert-message': {
//                   width: '100%',
//                 }
//               }}
//             >
//               <Typography variant="body2" fontWeight="500">
//                 {t.successMessage}
//               </Typography>
//             </Alert>
            
//             {onBackToLogin && (
//               <Button
//                 variant="outlined"
//                 onClick={onBackToLogin}
//                 fullWidth
//                 sx={{ 
//                   py: 0.875,
//                   borderRadius: 1,
//                   textTransform: 'none',
//                   fontSize: '0.875rem',
//                   fontWeight: 500,
//                   borderColor: 'divider',
//                   '&:hover': {
//                     borderColor: 'primary.main',
//                     backgroundColor: 'action.hover'
//                   }
//                 }}
//               >
//                 {t.backToLogin}
//               </Button>
//             )}
//           </Box>
//         ) : (
//           /* Форма восстановления пароля */
//           <Box component="form" onSubmit={handleSubmit} noValidate>
//             {error && (
//               <Alert 
//                 severity="error"
//                 icon={false}
//                 sx={{ 
//                   mb: 2,
//                   borderRadius: 1,
//                   backgroundColor: 'error.light',
//                   color: 'error.dark'
//                 }}
//               >
//                 <Typography variant="body2">
//                   {error}
//                 </Typography>
//               </Alert>
//             )}
            
//             {/* Поле email */}
//             <TextField
//               fullWidth
//               label={t.emailLabel}
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               error={!!formErrors.email}
//               helperText={formErrors.email}
//               placeholder={t.emailPlaceholder}
//               disabled={loading}
//               autoFocus
//               variant="outlined"
//               size="small"
//               sx={{ 
//                 mb: 2,
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 1,
//                   backgroundColor: 'background.default'
//                 },
//                 '& .MuiInputLabel-root': {
//                   fontSize: '0.875rem'
//                 }
//               }}
//             />

//             {/* Кнопка отправки */}
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               disabled={loading}
//               sx={{ 
//                 mb: 1.5,
//                 py: 0.875,
//                 borderRadius: 1,
//                 fontSize: '0.875rem',
//                 fontWeight: 600,
//                 textTransform: 'none',
//                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                 '&:hover': {
//                   boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)',
//                 }
//               }}
//             >
//               {loading ? (
//                 <>
//                   <CircularProgress 
//                     size={18} 
//                     sx={{ 
//                       mr: 1, 
//                       color: 'inherit' 
//                     }} 
//                   />
//                   {t.loading}
//                 </>
//               ) : (
//                 t.sendButton
//               )}
//             </Button>

//             {/* Дополнительная кнопка назад */}
//             {onBackToLogin && (
//               <Button
//                 onClick={onBackToLogin}
//                 variant="text"
//                 fullWidth
//                 sx={{ 
//                   py: 0.5,
//                   borderRadius: 1,
//                   textTransform: 'none',
//                   fontSize: '0.8125rem',
//                   color: 'text.secondary',
//                   '&:hover': {
//                     backgroundColor: 'action.hover',
//                     color: 'text.primary'
//                   }
//                 }}
//               >
//                 {t.backToLogin}
//               </Button>
//             )}
//           </Box>
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default EmailResetPassword;


'use client';

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Email,
  AccessTime,
  CheckCircle,
  LockReset,
  ArrowBack,
} from "@mui/icons-material";
import { useLanguage } from "../LanguageContext";

const translations = {
  ua: {
    title: 'Відновлення пароля',
    subtitle: 'Ми надішлемо посилання для скидання пароля на вашу електронну пошту',
    emailLabel: 'Електронна пошта',
    emailPlaceholder: 'example@gmail.com',
    sendButton: 'Надіслати інструкції',
    backToLogin: 'Повернутися до входу',
    successTitle: 'Посилання відправлено!',
    successMessage: 'Перевірте свою пошту',
    instructions: 'Інструкції для відновлення пароля надіслано',
    errorMessage: 'Сталася помилка. Спробуйте ще раз',
    loading: 'Надсилання...',
    emailRequired: 'Введіть email',
    invalidEmail: 'Невірний формат email',
    linkExpiry: 'Посилання активне 10 хвилин',
    resend: 'Надіслати нове посилання',
  },
  ru: {
    title: 'Восстановление пароля',
    subtitle: 'Мы отправим ссылку для сброса пароля на вашу почту',
    emailLabel: 'Электронная почта',
    emailPlaceholder: 'example@gmail.com',
    sendButton: 'Отправить инструкции',
    backToLogin: 'Вернуться ко входу',
    successTitle: 'Ссылка отправлена!',
    successMessage: 'Проверьте свою почту',
    instructions: 'Инструкции отправлены',
    errorMessage: 'Ошибка. Попробуйте еще раз',
    loading: 'Отправка...',
    emailRequired: 'Введите email',
    invalidEmail: 'Неверный формат email',
    linkExpiry: 'Ссылка активна 10 минут',
    resend: 'Отправить новую ссылку',
  }
};

const EmailResetPassword = ({ onBackToLogin }) => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) return setFormError(t.emailRequired);
    if (!validateEmail(email)) return setFormError(t.invalidEmail);

    setFormError("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/forgotpassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, language: currentLanguage })
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setError(data.message || t.errorMessage);
      }
    } catch {
      setError(t.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 3, sm: 4 } }}>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        {onBackToLogin && (
          <IconButton onClick={onBackToLogin} sx={{ mr: 1 }}>
            <ArrowBack />
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          {success ? (
            <CheckCircle sx={{ fontSize: 48, color: "#4caf50" }} />
          ) : (
            <LockReset sx={{ fontSize: 48, color: "#1976d2" }} />
          )}
        </Box>
      </Box>

      {/* Title */}
      <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
        {success ? t.successTitle : t.title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        sx={{ mb: 3 }}
      >
        {success ? t.successMessage : t.subtitle}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {!success && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "#fff3e0",
            p: 2,
            borderRadius: 2,
            mb: 3,
          }}
        >
          <AccessTime sx={{ color: "#ff9800" }} />
          <Typography variant="body2">
            {t.linkExpiry}
          </Typography>
        </Box>
      )}

      {success ? (
        <>
          <Alert severity="success" sx={{ mb: 3 }}>
            {t.instructions}
          </Alert>

          <Button
            variant="outlined"
            fullWidth
            sx={{ mb: 2, borderRadius: 2 }}
            onClick={() => setSuccess(false)}
          >
            {t.resend}
          </Button>

          <Button
            variant="contained"
            fullWidth
            sx={{ borderRadius: 2 }}
            onClick={onBackToLogin}
          >
            {t.backToLogin}
          </Button>
        </>
      ) : (
        <Box component="form" onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label={t.emailLabel}
            placeholder={t.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!formError}
            helperText={formError}
            disabled={loading}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              borderRadius: 2,
              py: 1.3,
              fontWeight: 600,
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                {t.loading}
              </>
            ) : (
              <>
                <Email sx={{ mr: 1 }} />
                {t.sendButton}
              </>
            )}
          </Button>
        </Box>
      )}

      {/* Footer */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="caption" color="text.secondary">
          © 2026 NaDoby.com.ua
        </Typography>
      </Box>
    </Box>
  );
};

export default EmailResetPassword;
