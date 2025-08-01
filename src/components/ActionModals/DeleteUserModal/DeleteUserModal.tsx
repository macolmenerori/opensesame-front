import React from 'react';

import api from '../../../api';
import { useToast } from '../../../context/ToastContext/ToastContext';

import { DeleteUserModalProps } from './DeleteUserModal.types';

/**
 * Modal for deleting a user
 *
 * @param {User | undefined} deleteUserModal User to delete
 * @param {React.Dispatch<React.SetStateAction<User | undefined>>} setDeleteUserModal Set the user to delete
 * @param {() => void} refreshData Function to refresh the data
 *
 * @returns {JSX.Element} DeleteUserModal component
 */
const DeleteUserModal = ({
  deleteUserModal,
  setDeleteUserModal,
  refreshData
}: DeleteUserModalProps) => {
  const { showToast } = useToast();

  // Click the Close button programmatically
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const clickClose = React.useCallback(() => closeButtonRef.current?.click(), []);

  const handleDeleteUser = async () => {
    if (!deleteUserModal) return;

    try {
      const res = await api.delete(`/v1/users/delete?email=${deleteUserModal.email}`);
      if (res.status === 204) {
        setDeleteUserModal(undefined);
        refreshData();
        clickClose();
        showToast({ title: 'Success', message: 'User was deleted', type: 'success' });
      } else {
        showToast({ title: 'Error', message: 'User was not deleted', type: 'danger' });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showToast({ title: 'Error', message: 'User was not deleted', type: 'danger' });
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
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteUser}
                  data-testid="delete-user-modal-button"
                >
                  Delete user
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteUserModal;
