import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import api from '../../api';

const ProtectedRoute = () => {
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/v1/users/isloggedin');
        setAuth(true);
      } catch (err) {
        setAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (auth === null) return <div>Loading...</div>;

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
