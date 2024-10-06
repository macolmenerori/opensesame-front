import { User } from '../../../common/types/User.types';

export type UpdatePermissionsModalProps = {
  permissionsModalUser: User | undefined;
  setPermissionsModalUser: (user: User | undefined) => void;
};
