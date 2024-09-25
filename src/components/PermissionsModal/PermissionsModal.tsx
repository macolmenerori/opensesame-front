import React from 'react';

import useSWR from 'swr';

import api from '../../api';
import { PermissionsApiResponse } from '../../common/types/Api.types';

import { PermissionsModalProps } from './PermissionsModal.types';

const PermissionsModal = ({ permissionsModalUser }: PermissionsModalProps) => {
  //   const { data, error, isLoading } = useSWR(
  //     permissionsModalUser === '' ? null : ['/v1/users/permissions', permissionsModalUser],
  //     () => {
  //       return api
  //         .get<PermissionsApiResponse>('/v1/users/permissions', {
  //           params: { email: permissionsModalUser }
  //         })
  //         .then((res) => res.data);
  //     }
  //   );

  //   console.log('permissions: ', data); // TODO: remove

  // TODO: mock, delete when API is ready
  const data = {
    status: 'ok',
    message: 'ok',
    data: { permissions: ['permission1', 'permission2', 'permission3', 'permission4'] }
  } as PermissionsApiResponse;

  return (
    <div
      className="modal fade"
      id="permissionsModal"
      tabIndex={-1}
      aria-labelledby="permissionsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Permissions for {permissionsModalUser}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>{data.data.permissions.join(', ')}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionsModal;
