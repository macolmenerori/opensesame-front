import { User } from '../../../common/types/User.types';

export type ChangePasswordModalProps = {
  passwordModalUser: User | undefined;
  setPasswordModalUser: (user: User | undefined) => void;
};

export type UpdatePasswordBody = {
  email: string;
  newPassword: string;
  newPasswordConfirm: string;
};
