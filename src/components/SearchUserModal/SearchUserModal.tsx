import React, { useCallback, useEffect, useState } from 'react';

import api from '../../api';
import { UserApiResponse } from '../../common/types/Api.types';
import { User } from '../../common/types/User.types';

import SearchUserTable from './SearchUserTable/SearchUserTable';

const SearchUserModal = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Debounced API call
  const searchUsers = useCallback(async () => {
    if (query.trim() === '') {
      setUsers([]); // Clear users if query is empty
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // Just get the first 10 users
      const response = await api.get<UserApiResponse>(
        `/v1/users/searchbyname?name=${query}&page=1&perpage=10`
      );
      setUsers(response.data.data.users);
    } catch (error) {
      // TODO: manage error
      console.error('Error fetching users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  // Debounce: API will be called 1.3 seconds after user stops typing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchUsers();
    }, 1300);

    return () => {
      clearTimeout(debounceTimer); // Clear the timeout if query changes before 2 seconds
    };
  }, [query, searchUsers]);

  return (
    <div>
      <div
        className="modal fade"
        id="searchUserModal"
        tabIndex={-1}
        aria-labelledby="searusermodal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="searchUserModalLabel">
                User search
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                className="form-control"
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search users by name..."
              />
              <div>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  users.length > 0 && <SearchUserTable users={users} />
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUserModal;
