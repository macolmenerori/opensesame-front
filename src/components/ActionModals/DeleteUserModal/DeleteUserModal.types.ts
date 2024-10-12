import { KeyedMutator } from 'swr';

import { UserApiResponse } from '../../../common/types/Api.types';
import { User } from '../../../common/types/User.types';

export type DeleteUserModalProps = {
  deleteUserModal: User | undefined;
  setDeleteUserModal: (user: User | undefined) => void;
  refreshData: KeyedMutator<UserApiResponse>;
};
