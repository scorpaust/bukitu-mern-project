import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null as string | null,
  userId: null as string | boolean | null,
  login: (
    uid: string | boolean,
    token: string | null,
    expirationDate?: Date | undefined
  ) => {},
  logout: () => {}
});
