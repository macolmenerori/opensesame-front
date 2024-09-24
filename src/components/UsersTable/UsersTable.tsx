import React from 'react';

import ActionDropdown from './ActionDropdown/ActionDropdown';
import { UsersTableProps } from './UsersTable.types';

const UsersTable = ({ data }: UsersTableProps) => {
  // TODO: truncate permissions string: click to see more on a modal
  const tableBody = data.map((user) => (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td className="text-secondary">{user.email}</td>
      <td className="text-secondary text-center">{user.role}</td>
      <td className="text-secondary text-center">{user.permissions.join(', ')}</td>
      <td className="text-secondary text-center">
        <button type="button" className="btn btn-secondary btn-sm">
          User details
        </button>
      </td>
      <td className="text-secondary text-center">
        <ActionDropdown />
      </td>
    </tr>
  ));

  const tableDividerStyle = { 'border-top-color': '#6c757d' } as React.CSSProperties;

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