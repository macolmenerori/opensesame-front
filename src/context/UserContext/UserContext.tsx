import React, { createContext, useContext, useState } from 'react';

import { User } from '../../common/types/User.types';
import { removeToken, setToken } from '../../utils/tokenStorage';

import { UserContextType, UserProviderProps } from './UserContext.types';

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Provider for the user context
 *
 * @param {UserProviderProps} children Children of the provider
 *
 * @returns {JSX.Element} UserProvider component
 */
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User, token: string) => {
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>{children}</UserContext.Provider>
  );
};

/**
 * Access the user context, for accessing the information of the logged in user
 *
 * @returns {UserContextType} User context
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
