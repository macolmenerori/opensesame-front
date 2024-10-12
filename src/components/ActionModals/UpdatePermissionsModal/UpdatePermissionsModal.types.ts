import { KeyedMutator } from 'swr';

import { UserApiResponse } from '../../../common/types/Api.types';
import { User } from '../../../common/types/User.types';

export type UpdatePermissionsModalProps = {
  permissionsModalUser: User | undefined;
  setPermissionsModalUser: (user: User | undefined) => void;
  refreshData: KeyedMutator<UserApiResponse>;
};
