'use client';

import React, { useEffect, useTransition } from 'react';

import Link from 'next/link';
import { redirect } from 'next/navigation';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Box, Container } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';

import { loginUser } from '@/app/actions/loginUser';
import { ILoginForm } from '@/app/components/LoginForm/types';
import validationSchema from '@/app/components/RegisterForm/validation';
import { useAuth } from '@/app/providers/authProvider';

const LoginForm = () => {
  const { user, setUser } = useAuth();
  const [isPending, startTransition] = useTransition();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginForm>({ resolver: yupResolver(validationSchema) });

  useEffect(() => {
    if (!!user) {
      redirect('/');
    }
  }, [user]);

  const formSubmitHandler = (data: ILoginForm) => {
    startTransition(() => {
      loginUser(data).then((data) => {
        setUser(data.user);
      });
    });
  };

  if (isPending) {
    return (
      <Container component="main" maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="sm">
      {!user && (
        <Grid container spacing={3}>
          <Grid size={12}>
            <Box>Log in</Box>
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
                  error={!!errors.email}
                />
              )}
            />
            <Typography variant="inherit" color="secondary">
              {errors.email?.message}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Password"
                  type="password"
                  variant="standard"
                  error={!!errors.password}
                />
              )}
            />
            <Typography variant="inherit" color="secondary">
              {errors.password?.message}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Box
              style={{
                fontSize: '14px',
                color: '#706080',
              }}
            >
              If you dont have an account you can register here:
              <Link
                style={{
                  textDecoration: 'none',
                  marginLeft: '5px',
                  color: '#2f8af5',
                  cursor: 'pointer',
                }}
                href="/register"
              >
                Register
              </Link>
            </Box>
          </Grid>
          <Grid size={12}>
            <Button
              onClick={handleSubmit((data) => formSubmitHandler(data))}
              variant="outlined"
              color="secondary"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default LoginForm;
