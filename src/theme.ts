'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2f8af5',
    },
    secondary: { main: '#706080' },
    background: {
      default: '#06070a',
    },
  },
  typography: {
    h1: {
      fontSize: '72px',
      fontWeight: 900,
    },
    h2: {
      fontSize: '48px',
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          padding: '10px 5px',
          '&::focused': {
            color: 'green',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
        },
        body: {
          padding: 0,
          margin: 0,
          height: '100%',

          '& #root': {
            height: '100%',
          },
        },
      },
    },
  },
});
