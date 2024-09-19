import React from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../api';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.delete('/v1/users/logout');
    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
