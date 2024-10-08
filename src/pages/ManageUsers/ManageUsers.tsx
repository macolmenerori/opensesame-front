import React, { useState } from 'react';

import useSWR from 'swr';

import api from '../../api';
import { UserApiResponse } from '../../common/types/Api.types';
import { User } from '../../common/types/User.types';
import UpdatePermissionsModal from '../../components/ActionModals/UpdatePermissionsModal/UpdatePermissionsModal';
import UpdateRolesModal from '../../components/ActionModals/UpdateRolesModal/UpdateRolesModal';
import Navbar from '../../components/Navbar/Navbar';
import Pagination from '../../components/Pagination/Pagination';
import PermissionsModal from '../../components/PermissionsModal/PermissionsModal';
import SearchUserModal from '../../components/SearchUserModal/SearchUserModal';
import UserDetailsModal from '../../components/UserDetailsModal/UserDetailsModal';
import UsersTable from '../../components/UsersTable/UsersTable';

const ManageUsers = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [permissionsModalUser, setPermissionsModalUser] = useState<string>('');
  const [userDetailsModalUser, setUserDetailsModalUser] = useState<User | undefined>(undefined);

  // TODO: manage error: display a message to the user or something
  const { data, error, isLoading } = useSWR(
    `/v1/users/allusers?page=${page}&perpage=${perPage}`,
    () => {
      return api
        .get<UserApiResponse>(`/v1/users/allusers?page=${page}&perpage=${perPage}`)
        .then((res) => res.data);
    }
  );

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="mt-3 mb-3">Manage users</h1>
        {isLoading && (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {error && <p>Error</p>}
        {data && (
          <>
            <button
              type="button"
              className="btn btn-secondary btn-sm mb-3"
              data-bs-toggle="modal"
              data-bs-target="#searchUserModal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
              </svg>
            </button>
            <UsersTable
              data={data.data.users}
              setPermissionsModalUser={setPermissionsModalUser}
              setUserDetailsModalUser={setUserDetailsModalUser}
            />
            <Pagination
              currentPage={page}
              totalPages={data.pagination.totalPages}
              perPage={perPage}
              setPage={(newPage) => setPage(newPage)}
              setPerPage={(newPerPage) => setPerPage(newPerPage)}
            />
            <PermissionsModal permissionsModalUser={permissionsModalUser} />
            <SearchUserModal setUserDetailsModalUser={setUserDetailsModalUser} />
            <UserDetailsModal
              user={userDetailsModalUser}
              setUserDetailsModalUser={setUserDetailsModalUser}
            />
            <UpdatePermissionsModal
              permissionsModalUser={userDetailsModalUser}
              setPermissionsModalUser={setUserDetailsModalUser}
            />
            <UpdateRolesModal
              roleModalUser={userDetailsModalUser}
              setRoleModalUser={setUserDetailsModalUser}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ManageUsers;
