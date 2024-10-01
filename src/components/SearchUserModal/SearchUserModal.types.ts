import { User } from '../../common/types/User.types';

export type SearchUserModalProps = {
  setUserDetailsModalUser: (user: User | undefined) => void;
};
