import React from 'react';

import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';

export default function Home() {
  return (
    <Box style={{ paddingTop: '90px' }}>
      <Container>
        <Typography variant="h1">Home Page</Typography>
      </Container>
    </Box>
  );
}
