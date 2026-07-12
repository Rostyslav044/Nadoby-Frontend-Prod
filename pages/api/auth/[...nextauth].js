// ПРОСТЕЙШИЙ NEXTAUTH
if (typeof require !== 'undefined') {
  require('dotenv').config({ path: '.env' });
}

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log('🔧 NextAuth загружен');
console.log('Client ID:', process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + '...');

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  
  secret: process.env.NEXTAUTH_SECRET,
  
  session: {
    strategy: "jwt",
  },
  
  debug: true,
  
  callbacks: {
    async signIn({ user, account }) {
      console.log('✅ УСПЕШНЫЙ ВХОД ЧЕРЕЗ GOOGLE');
      console.log('Email:', user?.email);
      console.log('Account type:', account?.type);
      return true;
    },
    
    async redirect({ url, baseUrl }) {
      console.log('↪️ Редирект на:', url);
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  }
});
