import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import api from '../../api';

/**
 * Page that checks if the user is logged in. If they are, it renders the children components. If not, it redirects to the login page.
 *
 * @returns {JSX.Element} ProtectedRoute component
 */
const ProtectedRoute = () => {
  const [auth, setAuth] = useState<boolean | null>(null);

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

  if (auth === null)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
