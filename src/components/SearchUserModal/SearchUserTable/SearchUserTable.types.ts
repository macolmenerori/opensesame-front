import { User } from '../../../common/types/User.types';

export type SearchUserTableProps = {
  users: User[];
  setUserDetailsModalUser: (user: User | undefined) => void;
};
