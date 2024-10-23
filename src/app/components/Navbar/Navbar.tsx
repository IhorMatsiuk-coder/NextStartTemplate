'use client';

import React from 'react';

import { AppBar, IconButton, Menu } from '@mui/material';
import { Box, Container, useMediaQuery } from '@mui/system';

import AuthMenu from '@/app/components/AuthMenu/AuthMenu';
import NavMenu from '@/app/components/NavMenu/NavMenu';
import useScrollPosition from '@/app/ustils/useScrollPosition';
import { theme } from '@/theme';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const currScrollPosition = useScrollPosition();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      sx={{
        height: '72px',
        bgcolor: currScrollPosition > 15 ? 'rgba(7,7,15,0.7)' : 'transparent',
        backdropFilter: currScrollPosition > 15 ? 'blur(50px)' : '',
      }}
    >
      <Container sx={{ height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '35px',
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => {}}
              color="inherit"
              sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
            >
              <Box>Here will be icon soon</Box>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Box>
                <NavMenu close={handleCloseNavMenu} isMobile={isMobile} />
                <Box sx={{ padding: '0 15px 15px' }}>
                  <AuthMenu close={handleCloseNavMenu} />
                </Box>
              </Box>
            </Menu>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Box
                sx={{
                  cursor: 'pointer',
                  marginRight: '35px',
                }}
                onClick={() => {}}
              >
                Logo
              </Box>
              <NavMenu />
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <AuthMenu />
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Navbar;
