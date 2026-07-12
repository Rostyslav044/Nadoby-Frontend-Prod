// pages/_app.js

// import "@/styles/globals.css";

// import { useEffect } from "react";
// import { Provider } from "react-redux";
// import { SessionProvider } from "next-auth/react";
// import { LanguageProvider } from "@/app/LanguageContext";
// import { store } from "@/app/store";
// import Footer from "@/app/components/Footer";
// import "@/app/utils/axiosConfig";

// export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
//   useEffect(() => {
//     // Можна додати глобову логіку, якщо потрібно
//   }, []);

//   return (
//     <SessionProvider session={session}>
//       <Provider store={store}>
//         <LanguageProvider>
//           <Component {...pageProps} />
//         </LanguageProvider>
//       </Provider>
//     </SessionProvider>
//   );
// }



// pages/_app.js

import { useEffect } from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { LanguageProvider } from "@/app/LanguageContext";
import { store } from "@/app/store";
import Footer from "@/app/components/Footer";
import "@/app/utils/axiosConfig";
import { GoogleAnalytics } from '@next/third-parties/google'

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    // Можна додати глобову логіку, якщо потрібно
  }, []);

  return (
    <>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      <SessionProvider session={session}>
        <Provider store={store}>
          <LanguageProvider>
            <Component {...pageProps} />
          </LanguageProvider>
        </Provider>
      </SessionProvider>
    </>
  );
}
