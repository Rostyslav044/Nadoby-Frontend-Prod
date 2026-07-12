// app/components/LoadingIndicator.js
'use client';

import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingIndicator = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Показываем индикатор только если загрузка длится больше 500ms
    const timer = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Загрузка...
        </Typography>
      </Box>
    </Box>
  );
};