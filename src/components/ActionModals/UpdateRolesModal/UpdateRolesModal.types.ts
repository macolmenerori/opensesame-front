import { KeyedMutator } from 'swr';

import { UserApiResponse } from '../../../common/types/Api.types';
import { User } from '../../../common/types/User.types';

export type UpdateRolesModalProps = {
  roleModalUser: User | undefined;
  setRoleModalUser: (user: User | undefined) => void;
  refreshData: KeyedMutator<UserApiResponse>;
};
