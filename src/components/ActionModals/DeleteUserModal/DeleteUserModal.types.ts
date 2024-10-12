import { User } from '../../../common/types/User.types';

export type DeleteUserModalProps = {
  deleteUserModal: User | undefined;
  setDeleteUserModal: (user: User | undefined) => void;
};
