// "use client";

// import React, { createContext, useState, useContext } from "react";

// const LanguageContext = createContext();

// export const useLanguage = () => {
//   const context = useContext(LanguageContext);
//   if (!context) {
//     throw new Error("useLanguage должен использоваться внутри LanguageProvider");
//   }
//   return context;
// };

// export const LanguageProvider = ({ children }) => {
//   const [currentLanguage, setCurrentLanguage] = useState("ua");

//   const onLanguageToggle = (lang) => {
//     setCurrentLanguage(lang);
//   };

//   return (
//     <LanguageContext.Provider value={{ currentLanguage, onLanguageToggle }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };



"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage должен использоваться внутри LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("ua");

  // Используем useEffect для работы с localStorage только на клиенте
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const onLanguageToggle = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, onLanguageToggle }}>
      {children}
    </LanguageContext.Provider>
  );
};