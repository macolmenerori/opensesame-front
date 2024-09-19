import React from 'react';
import { Navigate } from 'react-router-dom';

import useSWR from 'swr';

import api from '../../api';

const ProtectedRoute = () => {
  const { data, error, isLoading } = useSWR('/v1/users/isloggedin', () => {
    return api.get('/v1/users/isloggedin').then((response) => response.data);
  });

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {/* TODO: create LoadingCard or spinner */}
      {error && <Navigate to="/login" />}
      {data && <Navigate to="/mainpage" />}
    </>
  );
};

export default ProtectedRoute;
