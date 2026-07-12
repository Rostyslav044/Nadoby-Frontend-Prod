'use client';

import { useDispatch, useSelector } from 'react-redux';
import { logout, loadFromStorage } from '../store/authSlice';
import { useEffect } from 'react';
import UserMenu from './UserMenu';
import NoAutorazeMenu from './NoAutorazeMenu';





export default function Menu() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

//   const handleLogout = () => {
//     dispatch(logout());
//   };

  return (
    <div>
      {isAuthenticated === true? (
        <UserMenu/>
      ) : (
        <NoAutorazeMenu />
      )}
    </div>
  );
}







