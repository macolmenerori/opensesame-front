import React from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';

const MainPage = () => {
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
                  <h5 className="card-title text-primary">New user</h5>
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
