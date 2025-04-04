import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { ToastProvider } from './context/ToastContext/ToastContext';
import { UserProvider } from './context/UserContext/UserContext';
const Login = React.lazy(() => import('./pages/Login/Login'));
const MainPage = React.lazy(() => import('./pages/MainPage/MainPage'));
const ManageUsers = React.lazy(() => import('./pages/ManageUsers/ManageUsers'));
const NewUser = React.lazy(() => import('./pages/NewUser/NewUser'));
const ProtectedRoute = React.lazy(() => import('./pages/ProtectedRoute/ProtectedRoute'));

const LoadingFallback = () => <div>Loading...</div>;

const lazyLoad = (Component: React.LazyExoticComponent<any>) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: lazyLoad(Login)
  },
  {
    element: lazyLoad(ProtectedRoute),
    children: [
      {
        path: '/',
        element: lazyLoad(MainPage)
      },
      {
        path: '/mainpage',
        element: lazyLoad(MainPage)
      },
      {
        path: '/manageusers',
        element: lazyLoad(ManageUsers)
      },
      {
        path: '/newuser',
        element: lazyLoad(NewUser)
      }
    ]
  }
]);

const App = () => {
  return (
    <ToastProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ToastProvider>
  );
};

export default App;
