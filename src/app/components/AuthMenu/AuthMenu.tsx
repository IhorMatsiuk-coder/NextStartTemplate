'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { Box } from '@mui/system';

import CustomLink from '@/app/components/CustomLink/CustomLink';

interface IAuthMenu {
  close?: () => void;
}

const AuthMenu = ({ close }: IAuthMenu) => {
  const pathname = usePathname();
  const isAuth = false;
  const menuHandleClick = () => {
    if (!close) return;

    close();
  };

  const logoutHandler = () => {
    console.log('logoutHandler');
  };

  return (
    <Box onClick={menuHandleClick}>
      {!isAuth ? (
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
