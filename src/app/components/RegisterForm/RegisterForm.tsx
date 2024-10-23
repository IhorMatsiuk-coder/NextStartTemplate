'use client';

import React from 'react';

import Link from 'next/link';

import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Box, Container } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';

const RegisterForm = () => {
  const { handleSubmit, control } = useForm();

  const formSubmitHandler = (data: any) => {
    console.log('data-register------', data);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Grid container spacing={3}>
        <Grid size={12}>
          <Box>Register Page</Box>
        </Grid>
        <Grid size={12}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { name, onChange, value } }) => (
              <TextField
                onChange={onChange}
                name={name}
                value={value}
                fullWidth
                label="Email"
                variant="standard"
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} fullWidth label="Password" type="password" variant="standard" />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Box
            style={{
              fontSize: '14px',
              color: '#706080',
            }}
          >
            If you already have an account you can sign in here:
            <Link
              style={{
                textDecoration: 'none',
                marginLeft: '5px',
                color: '#2f8af5',
                cursor: 'pointer',
              }}
              href="/login"
            >
              login
            </Link>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box>
            <Button
              onClick={handleSubmit((data) => formSubmitHandler(data))}
              variant="outlined"
              color="secondary"
            >
              Register
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterForm;
