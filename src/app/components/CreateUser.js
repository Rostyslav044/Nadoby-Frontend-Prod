


// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import Logo from "./Logo";
// import GoogleLoginButton from "./GoogleLoginButton";
// import '../globals.css';
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Alert,
//   Link,
//   InputAdornment,
//   IconButton
// } from "@mui/material";
// import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
// import { useDispatch } from "react-redux";
// import { login } from "../store/authSlice";
// import { useLanguage } from "@/app/LanguageContext";

// const translations = {
//   ua: {
//     loginTitle: "Увійдіть у свій обліковий запис",
//     registerTitle: "Зареєструйтесь",
//     name: "Ім'я",
//     email: "Email",
//     password: "Пароль",
//     loginButton: "Увійти",
//     registerButton: "Зареєструватися",
//     forgotPassword: "Забули пароль?",
//     noAccount: "Немає облікового запису?",
//     haveAccount: "Вже є обліковий запис?",
//     switchToRegister: "Зареєструватися",
//     switchToLogin: "Увійти",
//     loginSuccess: "Успішний вхід!",
//     registerSuccess: "Успішна реєстрація!",
//     error: "Сталася помилка. Користувач с таким email вже існує",
//     recoverNotImplemented: "Функція відновлення поки не реалізована.",
//   },
//   ru: {
//     loginTitle: "Войдите в свою учетную запись",
//     registerTitle: "Зарегистрируйтесь",
//     name: "Имя",
//     email: "Email",
//     password: "Пароль",
//     loginButton: "Войти",
//     registerButton: "Зарегистрироваться",
//     forgotPassword: "Забыли пароль?",
//     noAccount: "Нет аккаунта?",
//     haveAccount: "Уже есть аккаунт?",
//     switchToRegister: "Зарегистрироваться",
//     switchToLogin: "Войти",
//     loginSuccess: "Вход выполнен успешно!",
//     registerSuccess: "Регистрация прошла успешно!",
//     error: "Произошла ошибка. Пользователь с таким email уже существует",
//     recoverNotImplemented: "Функция восстановления пароля пока не реализована.",
//   }
// };

// const CreateUser = ({ onClose }) => {
//   const dispatch = useDispatch();
//   const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
//   const [message, setMessage] = useState("");
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const { currentLanguage } = useLanguage();
//   const t = translations[currentLanguage];
//   const [alertVisible, setAlertVisible] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleClickShowPassword = () => setShowPassword((prev) => !prev);
//   const token = "your_token_here";

//   const onSubmit = async (data) => {
//     if (isSubmitting) return;
    
//     setIsSubmitting(true);
//     try {
//       const endpoint = isLogin ? "/api/v1/auth/login" : "/api/v1/auth/register";
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, data, {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//       });

//       if (response.status === 200 || response.status === 201) {
//         setMessage(isLogin ? t.loginSuccess : t.registerSuccess);
//         setAlertVisible(true);
//         const dataResponse = response.data;
//         if (dataResponse.success && dataResponse.token) {
//           setTimeout(() => {
//             onClose();
//             dispatch(login(dataResponse));
//             reset();
//           }, 3000);
//         }
//       } else {
//         setMessage(t.error);
//         setAlertVisible(true);
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response) {
//         setMessage(error.response.data.message || t.error);
//         setAlertVisible(true);
//       } else if (error.request) {
//         setMessage("Сервер не отвечает. Проверьте подключение к сети.");
//         setAlertVisible(true);
//       } else {
//         setMessage(t.error);
//         setAlertVisible(true);
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     const email = watch("email"); 
//     if (!email) {
//       alert("Будь ласка, введіть email");
//       return;
//     }
    
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/forgotpassword`, 
//         {
//           email: email.toLowerCase(),
//         }
//       );
//       console.log(response.data);
//       alert("Лист для відновлення паролю надіслано на вашу пошту!");
//     } catch (error) {
//       if (error.response) {
//         console.error("Error:", error.response.data);
//         alert("Помилка: " + (error.response.data.message || "Спробуйте пізніше"));
//       } else {
//         console.error("Network error:", error.message);
//         alert("Помилка з'єднання з сервером");
//       }
//     }
//   };

//   const handleSwitchMode = (e) => {
//     e.preventDefault();
//     setIsLogin(!isLogin);
//     reset();
//   };

//   const handleCloseModal = (e) => {
//     e.preventDefault();
//     onClose();
//   };

//   return (
//     <Box sx={{ backgroundColor: "#f5f5f5", p: 1, borderRadius: 5}}>
//       <Box
//         sx={{
//           width: "85%",
//           maxWidth: 600,
//           p: 3,
//           boxShadow: 3,
//           borderRadius: 2,
//           backgroundColor: "white",
//           position: "relative",
//           mx: "auto"
//         }}
//       >
//         {/* Крестик */}
//         <IconButton
//           onClick={handleCloseModal}
//           sx={{
//             position: "absolute",
//             top: 8,
//             right: 8,
//             color: "grey.600",
//             zIndex: 1
//           }}
//         >
//           <Close />
//         </IconButton>

//         <Typography variant="h5" textAlign="center" gutterBottom>
//           <Logo />
//         </Typography>

//         <Typography variant="h6" textAlign="center" gutterBottom>
//           {isLogin ? t.loginTitle : t.registerTitle}
//         </Typography>

//         {/* ALERT СООБЩЕНИЕ */}
//         {alertVisible && (
//           <Alert severity="info" sx={{ mb: 2 }} onClose={() => setAlertVisible(false)}>
//             {message}
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit(onSubmit)} noValidate>
//           {!isLogin && (
//             <TextField
//               label={t.name}
//               fullWidth
//               margin="normal"
//               {...register("name", { required: t.name })}
//               error={!!errors.name}
//               helperText={errors.name?.message}
//             />
//           )}

//           <TextField
//             label={t.email}
//             type="email"
//             fullWidth
//             margin="normal"
//             {...register("email", { 
//               required: t.email,
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "Неверный формат email"
//               }
//             })}
//             error={!!errors.email}
//             helperText={errors.email?.message}
//           />

//           <TextField
//             label={t.password}
//             type={showPassword ? "text" : "password"}
//             fullWidth
//             margin="normal"
//             {...register("password", { 
//               required: t.password, 
//               minLength: {
//                 value: 6,
//                 message: "Пароль должен содержать минимум 6 символов"
//               }
//             })}
//             error={!!errors.password}
//             helperText={errors.password?.message}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton 
//                     onClick={handleClickShowPassword} 
//                     edge="end"
//                     type="button"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2 }}
//             disabled={isSubmitting}
//           >
//             {isLogin ? t.loginButton : t.registerButton}
//           </Button>

//           <Box sx={{ mt: 2 }}>
//             <GoogleLoginButton />
//           </Box>
//         </form>

//         {isLogin && (
//           <Typography textAlign="center" sx={{ mt: 2 }}>
//             <Link 
//               component="button" 
//               variant="body2" 
//               onClick={handleForgotPassword}
//               type="button"
//             >
//               {t.forgotPassword}
//             </Link>
//           </Typography>
//         )}

//         <Typography textAlign="center" sx={{ mt: 2 }}>
//           {isLogin ? t.noAccount : t.haveAccount}{" "}
//           <Link 
//             component="button" 
//             variant="body2" 
//             onClick={handleSwitchMode}
//             type="button"
//           >
//             {isLogin ? t.switchToRegister : t.switchToLogin}
//           </Link>
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default CreateUser;




"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Logo from "./Logo";
import GoogleLoginButton from "./GoogleLoginButton";
import EmailResetPassword from "./EmailResetPassword";
import '../globals.css';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Link,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useLanguage } from "@/app/LanguageContext";

const translations = {
  ua: {
    loginTitle: "Увійдіть у свій обліковий запис",
    registerTitle: "Зареєструйтесь",
    name: "Ім'я",
    email: "Email",
    password: "Пароль",
    loginButton: "Увійти",
    registerButton: "Зареєструватися",
    forgotPassword: "Забули пароль?",
    noAccount: "Немає облікового запису?",
    haveAccount: "Вже є обліковий запис?",
    switchToRegister: "Зареєструватися",
    switchToLogin: "Увійти",
    loginSuccess: "Успішний вхід!",
    registerSuccess: "Успішна реєстрація!",
    error: "Сталася помилка. Користувач с таким email вже існує",
    recoverNotImplemented: "Функція відновлення поки не реалізована.",
  },
  ru: {
    loginTitle: "Войдите в свою учетную запись",
    registerTitle: "Зарегистрируйтесь",
    name: "Имя",
    email: "Email",
    password: "Пароль",
    loginButton: "Войти",
    registerButton: "Зарегистрироваться",
    forgotPassword: "Забыли пароль?",
    noAccount: "Нет аккаунта?",
    haveAccount: "Уже есть аккаунт?",
    switchToRegister: "Зарегистрироваться",
    switchToLogin: "Войти",
    loginSuccess: "Вход выполнен успешно!",
    registerSuccess: "Регистрация прошла успешно!",
    error: "Произошла ошибка. Пользователь с таким email уже существует",
    recoverNotImplemented: "Функция восстановления пароля пока не реализована.",
  }
};

const CreateUser = ({ onClose }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  const [alertVisible, setAlertVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const token = "your_token_here";

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const endpoint = isLogin ? "/api/v1/auth/login" : "/api/v1/auth/register";
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.status === 200 || response.status === 201) {
        setMessage(isLogin ? t.loginSuccess : t.registerSuccess);
        setAlertVisible(true);
        const dataResponse = response.data;
        if (dataResponse.success && dataResponse.token) {
          setTimeout(() => {
            onClose();
            dispatch(login(dataResponse));
            reset();
          }, 3000);
        }
      } else {
        setMessage(t.error);
        setAlertVisible(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setMessage(error.response.data.message || t.error);
        setAlertVisible(true);
      } else if (error.request) {
        setMessage("Сервер не отвечает. Проверьте подключение к сети.");
        setAlertVisible(true);
      } else {
        setMessage(t.error);
        setAlertVisible(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSwitchMode = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    reset();
    setShowResetPassword(false);
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    onClose();
  };

  // Если показываем форму восстановления пароля
  if (showResetPassword) {
    return (
      <Box sx={{ backgroundColor: "#f5f5f5", p: 1, borderRadius: 5}}>
        <Box
          sx={{
            width: "85%",
            maxWidth: 600,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "white",
            position: "relative",
            mx: "auto"
          }}
        >
          {/* Крестик */}
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "grey.600",
              zIndex: 1
            }}
          >
            <Close />
          </IconButton>

          <EmailResetPassword 
            onBackToLogin={() => setShowResetPassword(false)}
          />
        </Box>
      </Box>
    );
  }

  // Основная форма логина/регистрации
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", p: 1, borderRadius: 5}}>
      <Box
        sx={{
          width: "85%",
          maxWidth: 600,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
          position: "relative",
          mx: "auto"
        }}
      >
        {/* Крестик */}
        <IconButton
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "grey.600",
            zIndex: 1
          }}
        >
          <Close />
        </IconButton>

        <Typography variant="h5" textAlign="center" gutterBottom>
          <Logo />
        </Typography>

        <Typography variant="h6" textAlign="center" gutterBottom>
          {isLogin ? t.loginTitle : t.registerTitle}
        </Typography>

        {/* ALERT СООБЩЕНИЕ */}
        {alertVisible && (
          <Alert severity="info" sx={{ mb: 2 }} onClose={() => setAlertVisible(false)}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {!isLogin && (
            <TextField
              label={t.name}
              fullWidth
              margin="normal"
              {...register("name", { required: t.name })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}

          <TextField
            label={t.email}
            type="email"
            fullWidth
            margin="normal"
            {...register("email", { 
              required: t.email,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Неверный формат email"
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label={t.password}
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            {...register("password", { 
              required: t.password, 
              minLength: {
                value: 6,
                message: "Пароль должен содержать минимум 6 символов"
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={handleClickShowPassword} 
                    edge="end"
                    type="button"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            {isLogin ? t.loginButton : t.registerButton}
          </Button>

          <Box sx={{ mt: 2 }}>
            <GoogleLoginButton />
          </Box>
        </form>

        {isLogin && (
          <Typography textAlign="center" sx={{ mt: 2 }}>
            <Link 
              component="button" 
              variant="body2" 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowResetPassword(true);
              }}
              type="button"
              sx={{ 
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              {t.forgotPassword}
            </Link>
          </Typography>
        )}

        <Typography textAlign="center" sx={{ mt: 2 }}>
          {isLogin ? t.noAccount : t.haveAccount}{" "}
          <Link 
            component="button" 
            variant="body2" 
            onClick={handleSwitchMode}
            type="button"
            sx={{ 
              cursor: 'pointer',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            {isLogin ? t.switchToRegister : t.switchToLogin}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default CreateUser;