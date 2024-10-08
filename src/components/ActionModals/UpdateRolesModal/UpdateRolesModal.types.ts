import { User } from '../../../common/types/User.types';

export type UpdateRolesModalProps = {
  roleModalUser: User | undefined;
  setRoleModalUser: (user: User | undefined) => void;
};
