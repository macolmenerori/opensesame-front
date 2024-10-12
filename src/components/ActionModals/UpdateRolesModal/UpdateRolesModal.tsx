import React, { useEffect, useState } from 'react';

import api from '../../../api';

import { UpdateRolesModalProps } from './UpdateRolesModal.types';

const UpdateRolesModal = ({
  roleModalUser,
  setRoleModalUser,
  refreshData
}: UpdateRolesModalProps) => {
  const [role, setRole] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  // Click the Close button programmatically
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const clickClose = React.useCallback(() => closeButtonRef.current?.click(), []);

  useEffect(() => {
    if (roleModalUser) {
      setRole(roleModalUser.role);
    }
  }, [roleModalUser]);

  const handleUpdateRole = async () => {
    if (!roleModalUser) return;

    const updateBody = {
      email: roleModalUser.email,
      role: role
    };

    // Close the modal if the role is the same
    if (role === roleModalUser.role) {
      clickClose();
      return;
    }

    try {
      const res = await api.put(`/v1/users/roles`, updateBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.status === 200) {
        setRoleModalUser(undefined);
        setShowError(false);
        refreshData();
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
        id="updateRolesModal"
        tabIndex={-1}
        aria-labelledby="updateRolesModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateRolesModalLabel">
                Update role
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5>{roleModalUser?.name}</h5>
              <h6 className="text-body-secondary">{roleModalUser?.email}</h6>
              <p className="mt-3">
                <b>Role:</b>
              </p>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeButtonRef}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleUpdateRole}>
                Update
              </button>
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
            <div className="toast-body">Failed to update permissions. Please try again.</div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateRolesModal;
