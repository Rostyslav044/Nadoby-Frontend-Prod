"use client";

import { signIn } from "next-auth/react";
import { Button } from "@mui/material";
import Image from "next/image";
import { useLanguage } from "@/app/LanguageContext";

const translations = {
  ru: {
    loginWithGoogle: "Войти через",
  },
  ua: {
    loginWithGoogle: "Увійти через",
  },
};

export default function GoogleLoginButton() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  return (
    <Button
      onClick={() => signIn("google")}
      variant="contained"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        border: "1px solid rgb(25, 118, 210)",
        padding: 0,
        width: "100%",
        height: "36.5px",
        maxWidth: "100%",
        boxSizing: "border-box",
        '&:hover': { backgroundColor: "#f5f5f5" },
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 400,
          fontSize: "13px",
          letterSpacing: "0.02857em",
          textTransform: "uppercase",
          padding: "10px",
        }}
      >
        {t.loginWithGoogle}
      </span>
      <Image
        src="/google-Freepik.png"
        alt="Google logo"
        width={74}
        height={64}
        style={{ borderRadius: "50%" }}
      />
    </Button>
  );
}




// "use client";

// import { Button } from "@mui/material";
// import Image from "next/image";
// import { useLanguage } from "@/app/LanguageContext";

// const translations = {
//   ru: {
//     loginWithGoogle: "Войти через",
//   },
//   ua: {
//     loginWithGoogle: "Увійти через",
//   },
// };

// export default function GoogleLoginButton({ onClick }) {
//   const { currentLanguage } = useLanguage();
//   const t = translations[currentLanguage];

//   return (
//     <Button
//       onClick={onClick}
//       variant="contained"
//       sx={{
//         backgroundColor: "#fff",
//         color: "#000",
//         boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//         border: "1px solid rgb(25, 118, 210)",
//         padding: 0,
//         width: "100%",
//         height: "36.5px",
//         maxWidth: "100%",
//         boxSizing: "border-box",
//         '&:hover': { backgroundColor: "#f5f5f5" },
//         display: 'flex',
//         alignItems: 'center',
//         gap: 1,
//         justifyContent: 'center',
//       }}
//     >
//       <span
//         style={{
//           fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//           fontWeight: 400,
//           fontSize: "13px",
//           letterSpacing: "0.02857em",
//           textTransform: "uppercase",
//           padding: "10px",
//         }}
//       >
//         {t.loginWithGoogle}
//       </span>
//       <Image
//         src="/google-Freepik.png"
//         alt="Google logo"
//         width={74}
//         height={64}
//         style={{ borderRadius: "50%" }}
//       />
//     </Button>
//   );
// }









