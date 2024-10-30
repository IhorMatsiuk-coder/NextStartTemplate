'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { Box } from '@mui/system';

import CustomLink from '@/app/components/CustomLink/CustomLink';

interface INavMenu {
  isMobile?: boolean;
  close?: () => void;
}

const NavMenu = ({ isMobile, close }: INavMenu) => {
  const pathname = usePathname();

  const menuHandleClick = () => {
    if (!close) return;

    close();
  };

  return (
    <Box
      onClick={menuHandleClick}
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '15px',
        padding: isMobile ? '15px' : '0px',
      }}
    >
      <CustomLink title="Home" href="/" path={pathname} />
      <CustomLink title="Contacts" href="/contacts" path={pathname} />
      <CustomLink title="Admin panel" href="/adminPanel" path={pathname} />
    </Box>
  );
};

export default NavMenu;
