'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { Box } from '@mui/system';

import { logoutUser } from '@/app/actions/logoutUser';
import CustomLink from '@/app/components/CustomLink/CustomLink';
import { useAuth } from '@/app/providers/authProvider';

interface IAuthMenu {
  close?: () => void;
}

const AuthMenu = ({ close }: IAuthMenu) => {
  const pathname = usePathname();
  const { user, setUser } = useAuth();
  const menuHandleClick = () => {
    if (!close) return;

    close();
  };

  const logoutHandler = () => {
    logoutUser().then(() => {
      setUser(null);
    });
  };

  return (
    <Box onClick={menuHandleClick}>
      {!user ? (
        <CustomLink title="Login" href="/login" path={pathname} />
      ) : (
        <Box sx={{ cursor: 'pointer' }} onClick={logoutHandler}>
          Logout
        </Box>
      )}
    </Box>
  );
};
export default AuthMenu;
