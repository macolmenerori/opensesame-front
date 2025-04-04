/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import api from '../../api';
import { useUser } from '../../context/UserContext/UserContext';

/**
 * Login page. User can login with email and password. This sets the user in the UserContext and a JWT token on a cookie.
 * Redirects to the main page after successful login, or stays on the login page if the login fails.
 * If the user is already logged in, redirects to the main page.
 *
 * @returns {JSX.Element} Login component
 */
function Login() {
  const { setUser } = useUser();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [auth, setAuth] = useState<boolean | null>(null);
  const navigate = useNavigate();

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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post('/v1/users/login', { email, password });
      if (response.status === 200) {
        setUser(response.data.data.user);
        navigate('/mainpage'); // Redirect to the main page after login
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return auth ? (
    <Navigate to="/mainpage" />
  ) : (
    <div className="container d-flex vh-100 align-items-center justify-content-center">
      <div className="card text-bg-light" style={{ width: '20rem' }}>
        <div className="card-body">
          <h2 className="card-title text-center">opensesame</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                data-testid="emailInput"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                data-testid="passwordInput"
                required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="btn btn-primary" data-testid="submitButton">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
