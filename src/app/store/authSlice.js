


import { createSlice } from '@reduxjs/toolkit';
import { signIn, signOut, useSession } from "next-auth/react";

const localProfile = typeof window !== "undefined"
  ? localStorage.getItem('user_profile')
  : null;
let initialState = {
  isAuthenticated: false,
  user: null,
  profile: {
  _id: "",
    name: "",
    city: "",
    phones: ["", "", ""],
    about: "",
    email: "",
    avatar: "/default-avatar.jpg"
  }
};


if(localProfile){
  initialState={
    isAuthenticated: true,
    user: null,
    profile:JSON.parse(localProfile),
  }
}




const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      console.log(action.payload);
      // state.user = action.payload.user;
      if (action.payload.profile) {
        state.profile = { ...state.profile, ...action.payload.profile };
      }
      localStorage.setItem('auth_token', action.payload.token);
      document.cookie = `auth_token=${action.payload.token}; path=/; max-age=86400`;
      localStorage.setItem('user_profile', JSON.stringify(state.profile));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.profile = initialState.profile;
      signOut();
      localStorage.removeItem('auth_token');
      document.cookie = "auth_token=; path=/; max-age=0";
      localStorage.removeItem('user_profile');
    },
    loadFromStorage(state) {
      const token = localStorage.getItem('auth_token');
      const profile = JSON.parse(localStorage.getItem('user_profile') || 'null');
      
      if (token) {
        state.isAuthenticated = true;
      }
      if (profile) {
        state.profile = { ...initialState.profile, ...profile };
      }
    },
    updateProfile(state, action) {
      state.profile = { ...state.profile, ...action.payload };
      localStorage.setItem('user_profile', JSON.stringify(state.profile));
    },
    updateCity(state, action) {
      // Обновляем и полное название, и короткое
      state.profile.city = action.payload.fullCityName; // "Киев, Киевская область"
      state.profile.cityName = action.payload.cityName; // "Киев"
      localStorage.setItem('user_profile', JSON.stringify(state.profile));
    }
  },
});

export const { login, logout, loadFromStorage, updateProfile, updateCity } = authSlice.actions;

export default authSlice.reducer;


