"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Container,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLanguage } from '../LanguageContext';

const translations = {
  ua: {
    title: 'Новий пароль',
    subtitle: 'Створіть новий пароль для вашого облікового запису',
    newPasswordLabel: 'Новий пароль',
    confirmPasswordLabel: 'Підтвердіть пароль',
    resetButton: 'Змінити пароль',
    loading: 'Обробка...',
    successMessage: 'Пароль успішно змінено!',
    errorMessage: 'Помилка при зміні пароля',
    passwordRequirements: 'Мінімум 8 символів',
    passwordsMatch: 'Паролі повинні співпадати',
    passwordUpdated: 'Пароль оновлено. Перенаправляємо до входу...',
  },
  ru: {
    title: 'Новый пароль',
    subtitle: 'Создайте новый пароль для вашего аккаунта',
    newPasswordLabel: 'Новый пароль',
    confirmPasswordLabel: 'Подтвердите пароль',
    resetButton: 'Изменить пароль',
    loading: 'Обработка...',
    successMessage: 'Пароль успешно изменен!',
    errorMessage: 'Ошибка при изменении пароля',
    passwordRequirements: 'Минимум 8 символов',
    passwordsMatch: 'Пароли должны совпадать',
    passwordUpdated: 'Пароль обновлен. Перенаправляем ко входу...',
  }
};

const ResetPasswordForm = ({ token, onBackToLogin }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const validateForm = () => {
    const errors = {};
    
    if (password.length < 8) {
      errors.password = t.passwordRequirements;
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = t.passwordsMatch;
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setLoading(true);
    setError('');
    setFormErrors({});

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword: password,
          language: currentLanguage
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        // Редирект через 2 секунды
        setTimeout(() => {
          if (onBackToLogin) {
            onBackToLogin();
          } else {
            router.push('/login');
          }
        }, 2000);
      } else {
        setError(data.message || t.errorMessage);
      }
    } catch (err) {
      console.error('Reset password error:', err);
      setError(t.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mt: 4 }}>
        <Typography 
          variant="h5" 
          component="h1" 
          gutterBottom 
          align="center" 
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          {t.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center" 
          sx={{ mb: 4 }}
        >
          {t.subtitle}
        </Typography>

        {success ? (
          <Box>
            <Alert severity="success" sx={{ mb: 3 }}>
              {t.successMessage}
            </Alert>
            <Typography variant="body2" align="center">
              {t.passwordUpdated}
            </Typography>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            <TextField
              fullWidth
              label={t.newPasswordLabel}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!formErrors.password}
              helperText={formErrors.password}
              margin="normal"
              disabled={loading}
              autoFocus
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label={t.confirmPasswordLabel}
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              margin="normal"
              disabled={loading}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading || !token}
              sx={{ 
                mt: 3, 
                py: 1.5,
                fontWeight: 'bold'
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1, color: 'white' }} />
                  {t.loading}
                </>
              ) : (
                t.resetButton
              )}
            </Button>

            {onBackToLogin && (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Button
                  onClick={onBackToLogin}
                  variant="text"
                  size="small"
                  sx={{ textTransform: 'none' }}
                >
                  {currentLanguage === 'ua' ? '← Повернутися' : '← Вернуться'}
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ResetPasswordForm;
