// app/components/HeroImage.js
'use client';

import Image from 'next/image';
import { Box } from '@mui/material';

export default function HeroImage() {
  return (
    <Box sx={{ 
      width: '100%', 
      height: { xs: 200, sm: 250, md: 300 },
      position: 'relative',
      overflow: 'hidden',
      bgcolor: '#f5f5f5',
    }}>
      <Image
        src="/photo-section-hero.webp"
        alt="Подобова оренда житла по всій Україні - квартири, готелі, будинки"
        fill
        priority
        fetchpriority="high"
        loading="eager" 
        quality={50}
        style={{ objectFit: 'cover' }}
        sizes="100vw"
      />
    </Box>
  );
}