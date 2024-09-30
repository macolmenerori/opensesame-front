import React from 'react';

import { SearchUserTableProps } from './SearchUserTable.types';

const SearchUserTable = ({ users }: SearchUserTableProps) => {
  const usersRows = users.map((user) => (
    <tr key={user._id}>
      <td className="text-secondary">{user.name}</td>
      <td className="text-secondary text-center">{user.email}</td>
      <td className="text-center">
        <button type="button" className="btn btn-secondary btn-sm">
          User details
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      {users.length === 0 ? (
        <p>Please introduce the name of the user</p>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col" className="text-center">
                  Email
                </th>
                <th scope="col" className="text-center">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>{usersRows}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchUserTable;
