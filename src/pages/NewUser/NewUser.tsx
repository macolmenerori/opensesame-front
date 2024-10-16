import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import api from '../../api';
import Navbar from '../../components/Navbar/Navbar';

import { SignupForm } from './NewUser.types';

const NewUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<SignupForm>();
  const password = watch('password');

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    console.log('Form Data: ', data);
    try {
      const res = await api.post('/v1/users/signup', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.status === 201) {
        // TODO: show message OKAY
        console.log('User created');
        reset();
      } else {
        // TODO: manage error
        console.log('Error');
      }
    } catch (e) {
      // TODO: manage error
      console.log(e);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-center mt-3">New User</h1>
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
              <button type="submit" className="btn btn-primary">
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
