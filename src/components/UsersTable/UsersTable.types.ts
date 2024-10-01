import { User } from '../../common/types/User.types';

export type UsersTableProps = {
  data: User[];
  setPermissionsModalUser: (userId: string) => void;
  setUserDetailsModalUser: (user: User) => void;
};
