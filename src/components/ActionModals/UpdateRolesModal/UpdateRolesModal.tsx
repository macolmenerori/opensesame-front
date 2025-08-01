import React, { useEffect, useState } from 'react';

import api from '../../../api';
import { useToast } from '../../../context/ToastContext/ToastContext';

import { UpdateRolesModalProps } from './UpdateRolesModal.types';

/**
 * Modal for updating the role of a user
 *
 * @param {User | undefined} roleModalUser User to update the role
 * @param {React.Dispatch<React.SetStateAction<User | undefined>>} setRoleModalUser Set the user to update the role
 * @param {() => void} refreshData Function to refresh the data
 *
 * @returns {JSX.Element} UpdateRolesModal component
 */
const UpdateRolesModal = ({
  roleModalUser,
  setRoleModalUser,
  refreshData
}: UpdateRolesModalProps) => {
  const { showToast } = useToast();

  const [role, setRole] = useState<string>('');

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
        refreshData();
        clickClose();
        showToast({ title: 'Success', message: 'Role was updated', type: 'success' });
      } else {
        showToast({ title: 'Error', message: 'Role was not updated', type: 'danger' });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showToast({ title: 'Error', message: 'Role was not updated', type: 'danger' });
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
                data-testid="role-select"
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
    </>
  );
};

export default UpdateRolesModal;
