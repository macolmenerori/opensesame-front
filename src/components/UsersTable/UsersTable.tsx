import React from 'react';

import ActionDropdown from './ActionDropdown/ActionDropdown';
import { UsersTableProps } from './UsersTable.types';

/**
 * Main table with all users
 *
 * @param {User[]} data Users to display
 * @param {React.Dispatch<React.SetStateAction<string>>} setPermissionsModalUser Set the user to display permissions
 * @param {React.Dispatch<React.SetStateAction<User | undefined>>} setUserDetailsModalUser Set the user to display details
 *
 * @returns {JSX.Element} UsersTable component
 */
const UsersTable = ({
  data,
  setPermissionsModalUser,
  setUserDetailsModalUser
}: UsersTableProps) => {
  const tableBody = data.map((user) => (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td className="text-secondary">{user.email}</td>
      <td className="text-secondary text-center">{user.role}</td>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions*/}
      <td
        className="text-secondary text-center"
        data-bs-toggle="modal"
        data-bs-target="#permissionsModal"
        data-testid="permissions-button"
        onClick={() => setPermissionsModalUser(user.email)}
      >
        {user.permissions.join(', ').substring(0, 15) + '...'}
      </td>
      <td className="text-secondary text-center">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#userDetailsModal"
          onClick={() => setUserDetailsModalUser(user)}
        >
          User details
        </button>
      </td>
      <td className="text-secondary text-center">
        <ActionDropdown user={user} setUserModal={setUserDetailsModalUser} />
      </td>
    </tr>
  ));

  const tableDividerStyle = { borderTopColor: '#6c757d' } as React.CSSProperties;

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col" className="text-center">
            Role
          </th>
          <th scope="col" className="text-center">
            Permissions
          </th>
          <th scope="col" className="text-center">
            Details
          </th>
          <th scope="col" className="text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="table-group-divider" style={tableDividerStyle}>
        {tableBody}
      </tbody>
    </table>
  );
};

export default UsersTable;
