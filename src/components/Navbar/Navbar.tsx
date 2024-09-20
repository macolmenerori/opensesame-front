import React from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../api';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.delete('/v1/users/logout');
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
