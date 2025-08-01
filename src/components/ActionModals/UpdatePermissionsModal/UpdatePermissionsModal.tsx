import React, { useEffect, useState } from 'react';

import api from '../../../api';
import { useToast } from '../../../context/ToastContext/ToastContext';

import { UpdatePermissionsModalProps } from './UpdatePermissionsModal.types';

/**
 * Modal for updating the permissions of a user
 *
 * @param {User | undefined} permissionsModalUser User to update the permissions
 * @param {React.Dispatch<React.SetStateAction<User | undefined>>} setPermissionsModalUser Set the user to update the permissions
 * @param {() => void} refreshData Function to refresh the data
 *
 * @returns {JSX.Element} UpdatePermissionsModal component
 */
const UpdatePermissionsModal = ({
  permissionsModalUser,
  setPermissionsModalUser,
  refreshData
}: UpdatePermissionsModalProps) => {
  const { showToast } = useToast();

  const [permissions, setPermissions] = useState<string>('');

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
        refreshData();
        clickClose();
        showToast({ title: 'Success', message: 'Permissions where updated', type: 'success' });
      } else {
        showToast({ title: 'Error', message: 'Permissions where not updated', type: 'danger' });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showToast({ title: 'Error', message: 'Permissions where not updated', type: 'danger' });
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
                {permissionsModalUser ? (
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                    value={permissions}
                    data-testid="permissions-textarea"
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
    </>
  );
};

export default UpdatePermissionsModal;
