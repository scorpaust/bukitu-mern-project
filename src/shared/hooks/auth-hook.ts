import { useCallback, useEffect, useState } from 'react';

let logoutTimer: string | number | NodeJS.Timeout | undefined;

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);

  const [tokenExpirationDate, setTokenExpirationDate] = useState<
    Date | undefined | null
  >();

  const [userId, setUserId] = useState<string | boolean | null>(false);

  const login = useCallback(
    (
      uid: string | boolean | null,
      token: string | null,
      expirationDate: Date | undefined
    ) => {
      setToken(token);
      setUserId(uid);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      const storedData =
        null || JSON.parse(localStorage.getItem('userData') as string);

      if (storedData == null || storedData.token == null)
        localStorage.setItem(
          'userData',
          JSON.stringify({
            userId: uid,
            token: token,
            expiration: tokenExpirationDate.toISOString()
          })
        );
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(false);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        new Date(tokenExpirationDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData') as string);
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, storedData.expiration);
    }
  }, [login]);

  return {
    token,
    login,
    logout,
    userId
  };
};
