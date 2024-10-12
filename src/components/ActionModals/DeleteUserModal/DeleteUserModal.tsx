import React, { useState } from 'react';

import api from '../../../api';

import { DeleteUserModalProps } from './DeleteUserModal.types';

const DeleteUserModal = ({ deleteUserModal, setDeleteUserModal }: DeleteUserModalProps) => {
  const [showError, setShowError] = useState<boolean>(false);

  // Click the Close button programmatically
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const clickClose = React.useCallback(() => closeButtonRef.current?.click(), []);

  const handleDeleteUser = async () => {
    if (!deleteUserModal) return;

    try {
      const res = await api.delete(`/v1/users/delete?email=${deleteUserModal.email}`);
      if (res.status === 204) {
        setDeleteUserModal(undefined);
        setShowError(false);
        clickClose();
      } else {
        // TODO: manage error
        setShowError(true);
      }
    } catch (error) {
      // TODO: manage error
      setShowError(true);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="deleteUserModal"
        tabIndex={-1}
        aria-labelledby="deleteUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteUserModalLabel">
                Delete user
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5 className="mb-3">Are you sure you want to delete this user?</h5>
              <p>
                <b>Name:</b> {deleteUserModal?.name}
              </p>
              <p>
                <b>Email:</b> {deleteUserModal?.email}
              </p>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={closeButtonRef}
                >
                  Don&#39;t delete
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteUser}>
                  Delete user
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Error Toast */}
      {showError && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div className="toast show bg-danger text-white" role="alert">
            <div className="toast-header bg-danger text-white">
              <strong className="me-auto">Error</strong>
              <button
                type="button"
                ref={closeButtonRef}
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowError(false)}
              ></button>
            </div>
            <div className="toast-body">Failed to delete user. Please try again.</div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteUserModal;
