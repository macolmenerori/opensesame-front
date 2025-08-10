import { User } from '../../common/types/User.types';

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
};

export type UserProviderProps = {
  children: React.ReactNode;
};
