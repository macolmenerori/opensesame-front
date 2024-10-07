import React from 'react';

import { ActionDropdownProps } from './ActionDropdown.types';

const ActionDropdown = ({ user, setUserModal }: ActionDropdownProps) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-sm btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
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
          <button className="dropdown-item" type="button">
            Update role
          </button>
        </li>
        <li>
          <button className="dropdown-item" type="button">
            Change password
          </button>
        </li>
        <li>
          <button className="dropdown-item" type="button">
            Delete user
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ActionDropdown;
