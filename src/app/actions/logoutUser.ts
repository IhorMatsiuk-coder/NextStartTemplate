'use server';

import { cookies } from 'next/headers';

import userService from '@/app/services/userService';

const logoutUser = async () => {
  try {
    const currToken = cookies().get('refreshToken');

    if (currToken) {
      await userService.logout(currToken.value);
      cookies().delete('accessToken');
      cookies().delete('refreshToken');
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};

export { logoutUser };
