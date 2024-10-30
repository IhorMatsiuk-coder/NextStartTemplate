'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import userService from '@/app/services/userService';
import { MAX_AGE } from '@/app/ustils/constants';

export interface IRegisterUser {
  email: string;
  password: string;
}

const registerUser = async ({ email, password }: IRegisterUser) => {
  try {
    const userData = await userService.registration(email, password);
    cookies().set('refreshToken', userData.refreshToken, { maxAge: MAX_AGE, httpOnly: true });
    cookies().set('accessToken', userData.accessToken, { maxAge: MAX_AGE, httpOnly: true });

    return userData.accessToken;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
  redirect('/');
};

export { registerUser };
