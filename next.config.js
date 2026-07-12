




/* @type {import('next').NextConfig} */

// const nextConfig = {
//   trailingSlash: true,
  
//   images: {
//     unoptimized: true,
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'storage.googleapis.com',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },
  
//   env: {
//     CUSTOM_KEY: 'value',
//     NEXT_PUBLIC_SITE_URL: 'https://nadoby.com.ua',
//     NEXT_PUBLIC_SITE_NAME: 'NaDoby',
//   },

//   compiler: {
//     removeConsole: process.env.NODE_ENV === 'production',
//   },

//   modularizeImports: {
//     '@mui/material': {
//       transform: '@mui/material/{{member}}',
//     },
//     '@mui/icons-material': {
//       transform: '@mui/icons-material/{{member}}',
//     },
//   },

//   // ОТКЛЮЧАЕМ ЭКСПЕРИМЕНТАЛЬНЫЕ ОПТИМИЗАЦИИ (они жрут память)
//   // experimental: {
//   //   optimizePackageImports: [],
//   //   optimizeCss: false,
//   // },

//   productionBrowserSourceMaps: false,
//   swcMinify: true,
  
//   ...(process.env.NODE_ENV === 'production' && {
//     compress: true,
//     poweredByHeader: false,
//   }),

//   // ========== БАЗОВЫЕ SEO НАСТРОЙКИ ==========
  
//   async redirects() {
//     return [
//       {
//         source: '/kyiv-apartments/index',
//         destination: '/kyiv-apartments',
//         permanent: true,
//       },
//     ];
//   },

//   async headers() {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           {
//             key: 'X-Content-Type-Options',
//             value: 'nosniff',
//           },
//           {
//             key: 'X-Frame-Options',
//             value: 'DENY',
//           },
//           {
//             key: 'X-XSS-Protection',
//             value: '1; mode=block',
//           },
//           {
//             key: 'Referrer-Policy',
//             value: 'strict-origin-when-cross-origin',
//           },
//         ],
//       },
//     ];
//   },
// }

// module.exports = nextConfig



/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  
  images: {
    unoptimized: false,  // ← ТІЛЬКИ ЦЕ ЗМІНЕНО (було true)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
    deviceSizes: [400, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96],
    formats: ['image/webp'],
    minimumCacheTTL: 31536000,
  },
  
  env: {
    CUSTOM_KEY: 'value',
    NEXT_PUBLIC_SITE_URL: 'https://nadoby.com.ua',
    NEXT_PUBLIC_SITE_NAME: 'NaDoby',
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },

  // ОТКЛЮЧАЕМ ЭКСПЕРИМЕНТАЛЬНЫЕ ОПТИМИЗАЦИИ (они жрут память)
  // experimental: {
  //   optimizePackageImports: [],
  //   optimizeCss: false,
  // },

  productionBrowserSourceMaps: false,
  swcMinify: true,
  
  ...(process.env.NODE_ENV === 'production' && {
    compress: true,
    poweredByHeader: false,
  }),

  // ========== БАЗОВЫЕ SEO НАСТРОЙКИ ==========
  
  async redirects() {
    return [
      {
        source: '/kyiv-apartments/index',
        destination: '/kyiv-apartments',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig