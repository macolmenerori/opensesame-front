import { User } from '../../../common/types/User.types';

export type ActionDropdownProps = {
  user: User;
  setUserModal: (user: User) => void;
};
