'use server';

import { cookies } from 'next/headers';

import { IRegisterUser } from '@/app/actions/registerUser';
import userService from '@/app/services/userService';
import { MAX_AGE } from '@/app/ustils/constants';

const loginUser = async ({ email, password }: IRegisterUser) => {
  try {
    const userData = await userService.login(email, password);
    cookies().set('refreshToken', userData.refreshToken, { maxAge: MAX_AGE, httpOnly: true });
    cookies().set('accessToken', userData.accessToken, { maxAge: MAX_AGE, httpOnly: true });

    return JSON.parse(JSON.stringify(userData));
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};

export { loginUser };
