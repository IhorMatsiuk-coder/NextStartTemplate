import React from 'react';

import { Box } from '@mui/system';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Box
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        background:
          'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(11,35,87,1) 100%, rgba(0,212,255,1) 100%, rgba(62,138,242,1) 100%)',
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;
