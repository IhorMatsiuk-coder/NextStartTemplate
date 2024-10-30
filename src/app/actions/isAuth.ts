'use server';

import { cookies } from 'next/headers';

import userService from '@/app/services/userService';

const isAuth = async () => {
  const currToken = cookies().get('accessToken');
  if (currToken) {
    return userService.isAuth(currToken.value);
  }
  try {
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};

export { isAuth };
