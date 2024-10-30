'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import { isAuth } from '@/app/actions/isAuth';

interface IUser {
  email: string;
  id: string;
  isActivated: boolean;
  userRole: number;
}

export interface IAuthContextUser {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const AuthContext = createContext<IAuthContextUser>({} as IAuthContextUser);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    isAuth().then((data) => {
      if (data) {
        setUser(data as IUser);
      }
    });
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
