




// // Этот React-компонент отображает список апартаментов. 

// 'use client';

// import React from 'react';
// import {
//   Box,
//   Typography,
//   Grid,
//   Container,
//   Dialog,
//   DialogContent,
// } from '@mui/material';
// import ApartmentCard from './ApartmentCard';
// import CreateUser from './CreateUser';
// import { LanguageProvider, useLanguage } from "@/app/LanguageContext";

// // Переводы
// const APARTMENT_LIST_TRANSLATIONS = {
//   ua: {
//     // title: "Усі апартаменти",
//     noApartments: "Немає жодного апартаменту",
//     noFavorites: "Немає обраних апартаментів",
//     favoritesTitle: "Обрані апартаменти",
//     otherListings: "Інші об'єкти користувача",
//   },
//   ru: {
//     // title: "Все апартаменты", 
//     noApartments: "Нет ни одного апартамента",
//     noFavorites: "Нет избранных апартаментов",
//     favoritesTitle: "Избранные апартаменты",
//     otherListings: "Другие объекты пользователя",
//   }
// };

// const ApartmentListComponent = ({ 
//   apartments = [], 
//   isFavorite, 
//   toggleFavorite, 
//   isCreateUserOpen, 
//   onCloseDialog,
//   showCreateUserDialog,
//   showTitle = true,
//   isFavoritesPage = false,
//   isUserListings = false,
//   currentUserId = null,
// }) => {
//   const { currentLanguage } = useLanguage();
//   const t = APARTMENT_LIST_TRANSLATIONS[currentLanguage] || APARTMENT_LIST_TRANSLATIONS.ua;
//   console.log("ApartmentListComponent", currentLanguage);
  
//   const getIsFavoriteForApartment = (apartment) => {
//     if (typeof isFavorite === 'function') return isFavorite(apartment._id);
//     if (typeof isFavorite === 'boolean') return isFavorite;
//     return false;
//   };

//   return (
//     <Container sx={{ py: 4 }}>
//       {showTitle && (
//         <Typography variant="h4" component="h1" gutterBottom>
//           {isFavoritesPage ? t.favoritesTitle : isUserListings ? t.otherListings : t.title}
//         </Typography>
//       )}

//       {apartments.length === 0 ? (
//         <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
//           {isFavoritesPage ? t.noFavorites : t.noApartments}
//         </Typography>
//       ) : (
//         <Grid container spacing={4}>
//           {apartments.map((apartment) => (
//             <Grid item xs={12} sm={6} md={4} key={apartment._id}>
//               <ApartmentCard
//                 apartment={apartment}
//                 isFavorite={getIsFavoriteForApartment(apartment)}
//                 toggleFavorite={() => toggleFavorite(apartment._id)}
//                 showCreateUserDialog={showCreateUserDialog}
//                 showStats={isUserListings}
//                 // showStats={false}
//                 currentUserId={currentUserId}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       <Dialog
//         open={isCreateUserOpen}
//         onClose={onCloseDialog}
//         fullWidth
//         maxWidth="xs"
//       >
//         <DialogContent>
//           <CreateUser onClose={onCloseDialog} />
//         </DialogContent>
//       </Dialog>
//     </Container>
//   );
// };

// // export default function ApartmentList(props) {
// //   return <ApartmentListComponent {...props} />;
// // }

// export default function ApartmentList(props) {
//   return (
//     // <LanguageProvider>
//       <ApartmentListComponent {...props} />
//     // </LanguageProvider>
//   );
// }




// app/components/ApartmentList.js
'use client';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  Dialog,
  DialogContent,
} from '@mui/material';
import ApartmentCard from './ApartmentCard';
import CreateUser from './CreateUser';
import { LanguageProvider, useLanguage } from "@/app/LanguageContext";

// Переводы
const APARTMENT_LIST_TRANSLATIONS = {
  ua: {
    noApartments: "Немає жодного апартаменту",
    noFavorites: "Немає обраних апартаментів",
    favoritesTitle: "Обрані апартаменти",
    otherListings: "Інші об'єкти користувача",
  },
  ru: {
    noApartments: "Нет ни одного апартамента",
    noFavorites: "Нет избранных апартаментов",
    favoritesTitle: "Избранные апартаменты",
    otherListings: "Другие объекты пользователя",
  }
};

const ApartmentListComponent = ({ 
  apartments = [], 
  isFavorite, 
  toggleFavorite, 
  isCreateUserOpen, 
  onCloseDialog,
  showCreateUserDialog,
  showTitle = true,
  isFavoritesPage = false,
  isUserListings = false,
  currentUserId = null,
}) => {
  const { currentLanguage } = useLanguage();
  const t = APARTMENT_LIST_TRANSLATIONS[currentLanguage] || APARTMENT_LIST_TRANSLATIONS.ua;
  
  const getIsFavoriteForApartment = (apartment) => {
    if (typeof isFavorite === 'function') return isFavorite(apartment._id);
    if (typeof isFavorite === 'boolean') return isFavorite;
    return false;
  };

  return (
    <Container sx={{ py: 4 }}>
      {showTitle && (
        <Typography variant="h4" component="h2" gutterBottom>
          {isFavoritesPage ? t.favoritesTitle : isUserListings ? t.otherListings : t.title}
        </Typography>
      )}

      {apartments.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          {isFavoritesPage ? t.noFavorites : t.noApartments}
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {apartments.map((apartment, index) => (
            <Grid item xs={12} sm={6} md={4} key={apartment._id}>
              <ApartmentCard
                apartment={apartment}
                isFavorite={getIsFavoriteForApartment(apartment)}
                toggleFavorite={() => toggleFavorite(apartment._id)}
                showCreateUserDialog={showCreateUserDialog}
                showStats={isUserListings}
                currentUserId={currentUserId}
                priority={index === 0}  // ← ТІЛЬКИ ПЕРША КАРТКА ОТРИМУЄ PRIORITY!
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={isCreateUserOpen}
        onClose={onCloseDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogContent>
          <CreateUser onClose={onCloseDialog} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default function ApartmentList(props) {
  return <ApartmentListComponent {...props} />;
}