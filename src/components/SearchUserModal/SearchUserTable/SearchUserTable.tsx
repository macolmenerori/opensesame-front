import React from 'react';

import { SearchUserTableProps } from './SearchUserTable.types';

/**
 * Table to display the users found in the search by SearchUserModal
 *
 * @param {User[]} users Users found in the search
 * @param {React.Dispatch<React.SetStateAction<User | undefined>>} setUserDetailsModalUser Set the user to show the details
 *
 * @returns {JSX.Element} SearchUserTable component
 */
const SearchUserTable = ({ users, setUserDetailsModalUser }: SearchUserTableProps) => {
  const usersRows = users.map((user) => (
    <tr key={user._id}>
      <td className="text-secondary">{user.name}</td>
      <td className="text-secondary text-center">{user.email}</td>
      <td className="text-center">
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
