import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login/Login';
import MainPage from './pages/MainPage/MainPage';
import ManageUsers from './pages/ManageUsers/ManageUsers';
import NewUser from './pages/NewUser/NewUser';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/manageusers" element={<ManageUsers />} />
          <Route path="/newuser" element={<NewUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
