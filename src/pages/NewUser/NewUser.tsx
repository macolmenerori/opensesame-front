import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import api from '../../api';
import Navbar from '../../components/Navbar/Navbar';
import { useToast } from '../../context/ToastContext/ToastContext';
import { useUser } from '../../context/UserContext/UserContext';

import { SignupForm } from './NewUser.types';

/**
 * New user page. Allows the admin to create a new user, assigning roles and permissions and setting their password.
 * @returns {JSX.Element} NewUser component
 */
const NewUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<SignupForm>();
  const { showToast } = useToast();
  const { user: loggedUser } = useUser();

  const password = watch('password');

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    try {
      const res = await api.post('/v1/users/signup', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.status === 201) {
        showToast({ title: 'Success', message: 'User was created', type: 'success' });
        reset();
      } else {
        showToast({ title: 'Error', message: 'User was not created', type: 'danger' });
      }
    } catch (e) {
      showToast({ title: 'Error', message: 'User was not created', type: 'danger' });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-center mt-3">New User</h1>
        {loggedUser?.role !== 'admin' && (
          <h6 className="text-center text-danger mt-3">
            <i>Only admins can sign up new users.</i>
          </h6>
        )}
        <div className="mt-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* NAME */}
            <div>
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                className="form-control"
                type="text"
                id="name"
                disabled={loggedUser?.role !== 'admin'}
                {...register('name', {
                  required: 'Name is required',
                  pattern: {
                    value: /^[A-Za-z ]+$/,
                    message: 'Name cannot contain numbers or special characters'
                  }
                })}
              />
              {errors.name && <span className="text-danger">{errors.name.message}</span>}
            </div>
            {/* EMAIL */}
            <div className="mt-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-control"
                id="email"
                type="email"
                disabled={loggedUser?.role !== 'admin'}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </div>
            {/* ROLE */}
            <div className="mt-3">
              <label className="form-label" htmlFor="role">
                Role
              </label>
              <select
                className="form-select"
                defaultValue={'user'}
                id="role"
                disabled={loggedUser?.role !== 'admin'}
                {...register('role', { required: 'Role is required' })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <span className="text-danger">{errors.role.message}</span>}
            </div>
            {/* PASSWORD */}
            <div className="mt-3">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-control"
                id="password"
                type="password"
                disabled={loggedUser?.role !== 'admin'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long'
                  },
                  maxLength: {
                    value: 100,
                    message: 'Password cannot be more than 100 characters long'
                  }
                })}
              />
              {errors.password && <span className="text-danger">{errors.password.message}</span>}
            </div>
            {/* PASSWORD CONFIRM */}
            <div className="mt-3">
              <label className="form-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="form-control"
                id="confirmPassword"
                type="password"
                disabled={loggedUser?.role !== 'admin'}
                {...register('passwordConfirm', {
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match'
                })}
              />
              {errors.passwordConfirm && (
                <span className="text-danger">{errors.passwordConfirm.message}</span>
              )}
            </div>
            {/* SUBMIT BUTTON */}
            <div className="mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loggedUser?.role !== 'admin'}
              >
                Sign Up User
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewUser;
