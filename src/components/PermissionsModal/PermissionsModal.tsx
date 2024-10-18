import React from 'react';

import useSWR from 'swr';

import api from '../../api';
import { PermissionsApiResponse } from '../../common/types/Api.types';

import { PermissionsModalProps } from './PermissionsModal.types';

/**
 * Modal for displaying the permissions of a user in a more detailed way
 *
 * @param {string} permissionsModalUser User to display the permissions
 *
 * @returns {JSX.Element} PermissionsModal component
 */
const PermissionsModal = ({ permissionsModalUser }: PermissionsModalProps) => {
  const { data, error, isLoading } = useSWR(
    permissionsModalUser === '' ? null : `/v1/users/permissions?email=${permissionsModalUser}`,
    () => {
      return api
        .get<PermissionsApiResponse>(`/v1/users/permissions?email=${permissionsModalUser}`)
        .then((res) => res.data);
    }
  );

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
            {isLoading && (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            {error && <p>Error loading permissions for this user.</p>}
            {data && data.data.permissions.length === 0 && (
              <p>This user does not have any permissions assigned.</p>
            )}
            {data && data.data.permissions.length > 0 && <p>{data.data.permissions.join(', ')}</p>}
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
