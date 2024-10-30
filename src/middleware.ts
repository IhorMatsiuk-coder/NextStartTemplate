import { type NextRequest, NextResponse } from 'next/server';

import ApiError from '@/app/exceptions/api-errors';

export function middleware(request: NextRequest) {
  try {
    // const refreshToken = request.cookies.get('refreshToken');
    const accessToken = request.cookies.get('accessToken');

    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e, '----------->');
      throw ApiError.UnauthorizedError();
    }
  }
}

export const config = {
  matcher: '/adminPanel',
};
