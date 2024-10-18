import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ToastProvider } from './context/ToastContext/ToastContext';
import { UserProvider } from './context/UserContext/UserContext';
const Login = React.lazy(() => import('./pages/Login/Login'));
const MainPage = React.lazy(() => import('./pages/MainPage/MainPage'));
const ManageUsers = React.lazy(() => import('./pages/ManageUsers/ManageUsers'));
const NewUser = React.lazy(() => import('./pages/NewUser/NewUser'));
const ProtectedRoute = React.lazy(() => import('./pages/ProtectedRoute/ProtectedRoute'));

const App = () => {
  return (
    <ToastProvider>
      <UserProvider>
        <BrowserRouter>
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/mainpage" element={<MainPage />} />
                <Route path="/manageusers" element={<ManageUsers />} />
                <Route path="/newuser" element={<NewUser />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </UserProvider>
    </ToastProvider>
  );
};

export default App;
