import React, { useState } from 'react';

import useSWR from 'swr';

import api from '../../api';
import { UserApiResponse } from '../../common/types/Api.types';
import Navbar from '../../components/Navbar/Navbar';
import UsersTable from '../../components/UsersTable/UsersTable';

const ManageUsers = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const { data, error, isLoading } = useSWR(
    `/v1/users/allusers?page=${page}&perPage=${perPage}`,
    () => {
      return api
        .get<UserApiResponse>(`/v1/users/allusers?page=${page}&perPage=${perPage}`)
        .then((res) => res.data);
    }
  );

  console.log('data: ', data); // TODO: remove

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="mt-3 mb-3">Manage users</h1>
        {isLoading && <p>Loading...</p>}
        {/* TODO: loading spinner */}
        {error && <p>Error</p>}
        {data && <UsersTable data={data.data.users} />}
      </div>
    </>
  );
};

export default ManageUsers;