import React, { useEffect, useState } from 'react';

import api from '../../../api';

import { UpdatePermissionsModalProps } from './UpdatePermissionsModal.types';

const UpdatePermissionsModal = ({
  permissionsModalUser,
  setPermissionsModalUser
}: UpdatePermissionsModalProps) => {
  const [permissions, setPermissions] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  // Click the Close button programmatically
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const clickClose = React.useCallback(() => closeButtonRef.current?.click(), []);

  useEffect(() => {
    if (permissionsModalUser) {
      setPermissions(permissionsModalUser.permissions.join(', '));
    }
  }, [permissionsModalUser]);

  const handleUpdatePermissions = async () => {
    if (!permissionsModalUser) return;

    const updateBody = {
      email: permissionsModalUser.email,
      permissions: permissions.split(',').map((permission) => permission.trim())
    };

    try {
      const res = await api.put(`/v1/users/permissions`, updateBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.status === 200) {
        setPermissionsModalUser(undefined);
        setShowError(false);
        clickClose();
      } else {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="updatePermissionsModal"
        tabIndex={-1}
        aria-labelledby="updatePermissionsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updatePermissionsModalLabel">
                Update permissions
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5>{permissionsModalUser?.name}</h5>
              <h6 className="text-body-secondary">{permissionsModalUser?.email}</h6>
              <p className="mt-3">
                <b>Permissions:</b>
              </p>
              <div className="input-group">
                {permissionsModalUser && permissionsModalUser.permissions.length > 0 ? (
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                    value={permissions}
                    onChange={(e) => setPermissions(e.target.value)}
                  />
                ) : null}
              </div>
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
              <button type="button" className="btn btn-primary" onClick={handleUpdatePermissions}>
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

export default UpdatePermissionsModal;
