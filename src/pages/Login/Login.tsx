/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import api from '../../api';

function Login() {
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

  // TODO: create loading spinner
  if (auth === null) return <div>Loading...</div>;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post('/v1/users/login', { email, password });
      if (response.status === 200) {
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
                required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
