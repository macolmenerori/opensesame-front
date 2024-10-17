import React, { useState } from 'react';

import api from '../../../api';
import { useToast } from '../../../context/ToastContext/ToastContext';

import { ChangePasswordModalProps } from './ChangePasswordModal.types';

const ChangePasswordModal = ({
  passwordModalUser,
  setPasswordModalUser
}: ChangePasswordModalProps) => {
  const { showToast } = useToast();

  const [samePasswordsError, setSamePasswordsError] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');

  // Click the Close button programmatically
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const clickClose = React.useCallback(() => closeButtonRef.current?.click(), []);

  const handlePasswordChange = async () => {
    if (!passwordModalUser) return;

    if (newPassword !== newPasswordConfirm) {
      setSamePasswordsError(true);
      return;
    }

    const updateBody = {
      email: passwordModalUser.email,
      newPassword,
      newPasswordConfirm
    };

    try {
      const res = await api.post('/v1/users/changeUserPassword', updateBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.status == 200) {
        setPasswordModalUser(undefined);
        clickClose();
        showToast({ title: 'Success', message: 'Password was updated', type: 'success' });
      } else {
        showToast({ title: 'Error', message: 'Password was not updated', type: 'danger' });
      }
    } catch (e) {
      showToast({ title: 'Error', message: 'Password was not updated', type: 'danger' });
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="changePasswordModal"
        tabIndex={-1}
        aria-labelledby="changePasswordModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="changePasswordModalLabel">
                Change password
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5>{passwordModalUser?.name}</h5>
              <h6 className="text-body-secondary">{passwordModalUser?.email}</h6>
              <div className="mt-3">
                <label htmlFor="inputPassword" className="form-label">
                  New password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <label htmlFor="inputPasswordVerification" className="form-label mt-2">
                  Confirm new password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPasswordVerification"
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                />
              </div>
              {/* Same password error message */}
              {samePasswordsError && <p className="text-danger mt-3">Passwords do not match</p>}
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
              <button type="button" className="btn btn-primary" onClick={handlePasswordChange}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordModal;
