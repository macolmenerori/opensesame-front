import React from 'react';
import { NavLink } from 'react-router';

import Navbar from '../../components/Navbar/Navbar';
import { useUser } from '../../context/UserContext/UserContext';

/**
 * Main page once the user is logged in. Contains links to Manage Users page and Create User page.
 *
 * @returns {JSX.Element} MainPage component
 */
const MainPage = () => {
  const { user: loggedUser } = useUser();

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-6 mb-3 mb-sm-0">
            <NavLink className={'text-decoration-none'} to={'/manageusers'}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-decoration-none text-primary">Manage users</h5>
                  <p className="card-text">
                    Search users, view details, manage roles and permissions and update passwords.
                  </p>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="col-sm-6">
            <NavLink className={'text-decoration-none'} to={'/newuser'}>
              <div className="card">
                <div className="card-body">
                  <h5
                    className={`card-title ${loggedUser?.role === 'admin' ? 'text-primary' : 'text-secondary'}`}
                  >
                    {`New user ${loggedUser?.role === 'admin' ? '' : '(admin only)'}`}
                  </h5>
                  <p className="card-text">
                    Sign up a new user, assign roles and permissions and set their password.
                  </p>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
