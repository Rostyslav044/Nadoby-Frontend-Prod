

// "use client";

// import React, { useState } from "react";
// import { useLanguage } from "@/app/LanguageContext";
// import Image from "next/image";
// import styles from "@/app/styles/Header.styles.module.scss";
// import Menu from "./Menu";
// import Link from "next/link";

// const translations = {
//   ua: {
//     slogan: "Подобова оренда житла (Квартири, Готелі, Готелі для тварин, Хостели, Будинки, Сауни/Бані, Глемпінги, Пансіонати/Санаторії, Котеджі для компній, Коворкінги, Автокемпінги, Бази відпочинку) по всій Україні без посередників.",
//     sloganMobile:
   
//     <div className={styles.sloganWrapperUa}>
//     <span className={styles.sloganMainUa1}> Подобова оренда житла в Україні </span>
//     <br />
//     <span className={styles.withoutCommissionUa2}>Без посередників!</span>
//   </div>
    
//   },
//   ru: {
//     slogan: "Посуточная аренда жилья (Квартиры, Гостиницы, Гостинница для животных, Хостелы, Дома, Сауны/Бани, Глемпинги, Пансионаты/Санатории, Котеджи для компаний, Коворкинги, Автокемпінги, Базы отдыха) по всей Украине без посредников.",
//     sloganMobile: 
//     <div className={styles.sloganWrapperRu}>
//     <span className={styles.sloganMainRu1}>Посуточная аренда жилья в Украине</span>
//     <br />
//     <span className={styles.withoutCommissionRu2}>Без посредников!</span>
//   </div>
    
//   }
// };

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { currentLanguage } = useLanguage();
//   const toggleMenu = () => setIsMenuOpen(prev => !prev);

//   return (
//     <>
//       <header className={styles.headerContainer}>
//         <div className={styles.homLogo}>
//           <Link href="/">NaDoby.com.ua</Link>
//         </div>

//         <div className={styles.headerDiv}>
//           <div 
//             className={styles.menuWrapper}
//             onClick={toggleMenu}
//           >
//             <span className={styles.menuText}>{translations[currentLanguage].menu}</span>
//             <Image
//               src="/burger.svg"
//               alt="Меню"
//               className={styles.burgerIcon}
//               width={24}
//               height={24}
//             />
//           </div>
//         </div>
//       </header>

//       <div className={styles.sloganFixed}>
//         <p className={styles.homSlogan}>
//           <span className={styles.desktopSlogan}>
//             {translations[currentLanguage].slogan}
//           </span>
//           <span className={styles.mobileSlogan}>
//             {translations[currentLanguage].sloganMobile}
//           </span>
//         </p>
//       </div>

//       {/* <div style={{ height: "140px" }} /> */}

//       {isMenuOpen && <Menu />}
//     </>
//   );
// }




"use client";

import React, { useState } from "react";
import { useLanguage } from "@/app/LanguageContext";
import Image from "next/image";
import styles from "@/app/styles/Header.styles.module.scss";
import Menu from "./Menu";
import Link from "next/link";

const translations = {
  ua: {
    // menu: "Меню",
    slogan: (
      <div className={styles.DecSloganWrapperUa}>
        <span className={styles.DecSloganMainUa1}>Подобова оренда житла в Україні.</span>
        <br />
        <span className={styles.DecWithoutCommissionUa2}>
          Квартири, Готелі, Готелі для тварин, Хостели, Будинки, Сауни/Бані, Глемпінги,
          Пансіонати/Санаторії, Котеджі для компній, Коворкінги, Автокемпінги, Бази відпочинку.
        </span>
        <br />
        <span className={styles.DecWithoutCommissionUa3}>Без посередників!</span>
      </div>
    ),
    sloganMobile: (
      <div className={styles.sloganWrapperUa}>
        <span className={styles.sloganMainUa1}>Подобова оренда житла в Україні.</span>
        <br />
        <span className={styles.withoutCommissionUa2}>Без посередників!</span>
      </div>
    )
  },
  ru: {
    // menu: "Меню",
    slogan: (
      <div className={styles.DecSloganWrapperRu}>
        <span className={styles.DecSloganMainRu1}>Посуточная аренда жилья в Украине.</span>
        <br />
        <span className={styles.DecWithoutCommissionRu2}>
          Квартиры, Гостиницы, Гостинница для животных, Хостелы, Дома, Сауны/Бани, Глемпинги,
          Пансионаты/Санатории, Котеджи для компаний, Коворкинги, Автокемпінги, Базы отдыха.
        </span>
        <br />
        <span className={styles.DecWithoutCommissionRu3}>Без посредников!</span>
      </div>
    ),
    sloganMobile: (
      <div className={styles.sloganWrapperRu}>
        <span className={styles.sloganMainRu1}>Посуточная аренда жилья в Украине</span>
        <br />
        <span className={styles.withoutCommissionRu2}>Без посредников!</span>
      </div>
    )
  }
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentLanguage } = useLanguage();
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.homLogo}>
          <Link href="/">NaDoby.com.ua</Link>
        </div>

        <div className={styles.headerDiv}>
          <div 
            className={styles.menuWrapper}
            onClick={toggleMenu}
          >
            <span className={styles.menuText}>{translations[currentLanguage].menu}</span>
            <Image
              src="/burger.svg"
              alt="Меню"
              className={styles.burgerIcon}
              width={24}
              height={24}
            />
          </div>
        </div>
      </header>

      <div className={styles.sloganFixed}>
        <p className={styles.homSlogan}>
          <span className={styles.desktopSlogan}>
            {translations[currentLanguage].slogan}
          </span>
          <span className={styles.mobileSlogan}>
            {translations[currentLanguage].sloganMobile}
          </span>
        </p>
      </div>

      {isMenuOpen && <Menu />}
    </>
  );
}