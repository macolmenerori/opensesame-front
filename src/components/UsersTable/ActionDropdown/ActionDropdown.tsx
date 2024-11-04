import React from 'react';

import { useUser } from '../../../context/UserContext/UserContext';

import { ActionDropdownProps } from './ActionDropdown.types';

/**
 * Action menu, cosisting of a dropdown with options to manage a user
 *
 * @param {User} user User to manage
 * @param {React.Dispatch<React.SetStateAction<User | undefined>>} setUserModal Set the user to manage
 *
 * @returns {JSX.Element} ActionDropdown component
 */
const ActionDropdown = ({ user, setUserModal }: ActionDropdownProps) => {
  const { user: loggedUser } = useUser();

  return (
    <div className="dropdown">
      <button
        className="btn btn-sm btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        disabled={loggedUser?.role !== 'admin'}
        data-testid="action-dropdown-button"
      >
        Manage user
      </button>
      <ul className="dropdown-menu">
        <li>
          <button
            className="dropdown-item"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#updatePermissionsModal"
            onClick={() => setUserModal(user)}
          >
            Update permissions
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#updateRolesModal"
            onClick={() => setUserModal(user)}
          >
            Update role
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#changePasswordModal"
            onClick={() => setUserModal(user)}
          >
            Change password
          </button>
        </li>
        <li>
          <button
            className="dropdown-item text-danger"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#deleteUserModal"
            onClick={() => setUserModal(user)}
          >
            Delete user
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ActionDropdown;
