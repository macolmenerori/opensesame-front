import React from 'react';

import { UserDetailsModalProps } from './UserDetailsModal.types';

const UserDetailsModal = ({ user, setUserDetailsModalUser }: UserDetailsModalProps) => {
  return (
    <div>
      <div
        className="modal fade"
        id="userDetailsModal"
        tabIndex={-1}
        aria-labelledby="userDetailsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="card" style={{ width: '100%' }}>
                <div className="card-body">
                  <h5 className="card-title">{user?.name}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">{user?.role}</h6>
                  <p className="card-text mt-3 mb-0">
                    <b>Email: </b>
                    {user?.email}
                  </p>
                  <p className="card-text mb-0">
                    <b>ID: </b>
                    {user?._id}
                  </p>
                  <p className="card-text mb-0">
                    <b>Permissions: </b>
                    {user && user?.permissions?.length > 0
                      ? user?.permissions.join(', ')
                      : 'No permissions'}
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setUserDetailsModalUser(undefined)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
