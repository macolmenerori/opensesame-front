import React from 'react';
import { useNavigate } from 'react-router';

import api from '../../api';
import { useUser } from '../../context/UserContext/UserContext';

/**
 * Navbar of the application
 *
 * @returns {JSX.Element} Navbar component
 */
const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useUser();

  const handleLogout = async () => {
    await api.delete('/v1/users/logout');
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            opensesame
          </a>
          <form className="d-flex" role="search">
            <button type="button" className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
