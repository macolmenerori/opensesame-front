import { User } from '../../common/types/User.types';

export type UserDetailsModalProps = {
  user: User | undefined;
  setUserDetailsModalUser: (user: User | undefined) => void;
};
