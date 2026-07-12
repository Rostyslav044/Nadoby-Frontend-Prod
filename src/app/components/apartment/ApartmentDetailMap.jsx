import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Box, CircularProgress, Typography, Button,Paper } from '@mui/material';
import DirectionsIcon from '@mui/icons-material/Directions';

const ApartmentDetailMap = ({ apartment, t, userLocation }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const handleOpenRoute = () => {
    if (apartment?.latitude && apartment?.longitude) {
      if (userLocation) {
        window.open(
          `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${apartment.latitude},${apartment.longitude}`
        );
      } else {
        window.open(
          `https://www.google.com/maps?q=${apartment.latitude},${apartment.longitude}`  
        );
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {t.location}
      </Typography>

      <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden', mb: 2 }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={{
              lat: parseFloat(apartment.latitude),
              lng: parseFloat(apartment.longitude),
            }}
            zoom={15}
          >
            <Marker
              position={{
                lat: parseFloat(apartment.latitude),
                lng: parseFloat(apartment.longitude),
              }}
            />
          </GoogleMap>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        )}
      </Box>

      <Box textAlign="center">
        <Button 
          variant="contained"
          color="primary"
          startIcon={<DirectionsIcon />}
          onClick={handleOpenRoute}
          fullWidth
          sx={{ mt: 2 }}
        >
          {t.buildRoute}
        </Button>
      </Box>
    </Paper>
  );
};

export default ApartmentDetailMap;
