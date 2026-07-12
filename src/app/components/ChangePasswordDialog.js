'use client';

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  Box,
  InputAdornment,
  IconButton,
  CircularProgress
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";

export default function ChangePasswordDialog({ open, onClose }) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Текущий пароль обязателен";
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "Новый пароль обязателен";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Пароль должен содержать минимум 6 символов";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Подтверждение пароля обязательно";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = "Новый пароль должен отличаться от текущего";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Необходима авторизация');
      }

      // ИСПРАВЛЕННЫЙ ЭНДПОИНТ И МЕТОД
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/updatepassword`, {
        method: 'PUT', // Правильный метод из вашего бэкенда
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      // Проверяем Content-Type перед парсингом
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Server returned non-JSON response:', text.substring(0, 200));
        throw new Error('Сервер вернул неверный формат данных. Проверьте эндпоинт.');
      }

      const result = await response.json();

      if (response.ok) {
        // Success
        onClose();
        // Reset form
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
        setErrors({});
        // Можно показать уведомление об успехе
      } else {
        throw new Error(result.message || "Ошибка при смене пароля");
      }
    } catch (error) {
      setErrors({ submit: error.message || "Ошибка сети. Попробуйте позже." });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setErrors({});
    setShowPasswords({
      current: false,
      new: false,
      confirm: false
    });
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      component="form"
      onSubmit={handleSubmit}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Lock color="primary" />
        Смена пароля
      </DialogTitle>

      <DialogContent>
        {errors.submit && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.submit}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            fullWidth
            label="Текущий пароль"
            type={showPasswords.current ? "text" : "password"}
            value={formData.currentPassword}
            onChange={handleChange('currentPassword')}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword}
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('current')}
                    edge="end"
                  >
                    {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Новый пароль"
            type={showPasswords.new ? "text" : "password"}
            value={formData.newPassword}
            onChange={handleChange('newPassword')}
            error={!!errors.newPassword}
            helperText={errors.newPassword || "Минимум 6 символов"}
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('new')}
                    edge="end"
                  >
                    {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Подтвердите новый пароль"
            type={showPasswords.confirm ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('confirm')}
                    edge="end"
                  >
                    {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={handleClose}
          disabled={loading}
          variant="outlined"
        >
          Отмена
        </Button>
        <Button 
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ minWidth: 120 }}
        >
          {loading ? <CircularProgress size={24} /> : "Сменить пароль"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}



// 'use client';

// import { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Alert,
//   Box,
//   InputAdornment,
//   IconButton,
//   CircularProgress
// } from "@mui/material";
// import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";

// export default function ChangePasswordDialog({ open, onClose }) {
//   const [formData, setFormData] = useState({
//     newPassword: "",
//     confirmPassword: ""
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [showPasswords, setShowPasswords] = useState({
//     new: false,
//     confirm: false
//   });

//   const handleChange = (field) => (event) => {
//     const value = event.target.value;
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
    
//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: ""
//       }));
//     }
//   };

//   const togglePasswordVisibility = (field) => {
//     setShowPasswords(prev => ({
//       ...prev,
//       [field]: !prev[field]
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.newPassword.trim()) {
//       newErrors.newPassword = "Новый пароль обязателен";
//     } else if (formData.newPassword.length < 6) {
//       newErrors.newPassword = "Пароль должен содержать минимум 6 символов";
//     }

//     if (!formData.confirmPassword.trim()) {
//       newErrors.confirmPassword = "Подтверждение пароля обязательно";
//     } else if (formData.newPassword !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Пароли не совпадают";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
    
//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       const token = localStorage.getItem('auth_token');
//       if (!token) {
//         throw new Error('Необходима авторизация');
//       }

//       // Пробуем разные варианты тела запроса
//       const requestBody = {
//         password: formData.newPassword
//         // Или попробуй: newPassword: formData.newPassword
//         // Или попробуй: { newPassword: formData.newPassword, confirmPassword: formData.confirmPassword }
//       };

//       console.log('Sending request with:', requestBody);

//       const response = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/updatepassword', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(requestBody)
//       });

//       const contentType = response.headers.get('content-type');
//       let result;
      
//       if (contentType && contentType.includes('application/json')) {
//         result = await response.json();
//       } else {
//         const text = await response.text();
//         throw new Error(`Server returned: ${text}`);
//       }

//       console.log('Server response:', result);

//       if (response.ok) {
//         onClose();
//         setFormData({
//           newPassword: "",
//           confirmPassword: ""
//         });
//         setErrors({});
//         alert("Пароль успешно изменен!");
//       } else {
//         throw new Error(result.message || result.error || "Ошибка при смене пароля");
//       }
//     } catch (error) {
//       console.error('Error details:', error);
//       setErrors({ submit: error.message || "Ошибка сети. Попробуйте позже." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setFormData({
//       newPassword: "",
//       confirmPassword: ""
//     });
//     setErrors({});
//     setShowPasswords({
//       new: false,
//       confirm: false
//     });
//     onClose();
//   };

//   return (
//     <Dialog 
//       open={open} 
//       onClose={handleClose}
//       maxWidth="sm"
//       fullWidth
//       component="form"
//       onSubmit={handleSubmit}
//     >
//       <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//         <Lock color="primary" />
//         Смена пароля
//       </DialogTitle>

//       <DialogContent>
//         {errors.submit && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {errors.submit}
//           </Alert>
//         )}

//         <Alert severity="info" sx={{ mb: 2 }}>
//           Введите новый пароль для вашего аккаунта
//         </Alert>

//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
//           <TextField
//             fullWidth
//             label="Новый пароль"
//             type={showPasswords.new ? "text" : "password"}
//             value={formData.newPassword}
//             onChange={handleChange('newPassword')}
//             error={!!errors.newPassword}
//             helperText={errors.newPassword || "Минимум 6 символов"}
//             disabled={loading}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={() => togglePasswordVisibility('new')}
//                     edge="end"
//                   >
//                     {showPasswords.new ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <TextField
//             fullWidth
//             label="Подтвердите новый пароль"
//             type={showPasswords.confirm ? "text" : "password"}
//             value={formData.confirmPassword}
//             onChange={handleChange('confirmPassword')}
//             error={!!errors.confirmPassword}
//             helperText={errors.confirmPassword}
//             disabled={loading}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={() => togglePasswordVisibility('confirm')}
//                     edge="end"
//                   >
//                     {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>
//       </DialogContent>

//       <DialogActions sx={{ p: 3 }}>
//         <Button 
//           onClick={handleClose}
//           disabled={loading}
//           variant="outlined"
//         >
//           Отмена
//         </Button>
//         <Button 
//           type="submit"
//           variant="contained"
//           disabled={loading}
//           sx={{ minWidth: 120 }}
//         >
//           {loading ? <CircularProgress size={24} /> : "Сменить пароль"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }
