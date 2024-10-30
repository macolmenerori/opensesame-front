import { rest } from 'msw';

import { UpdatePasswordBody } from '../../../components/ActionModals/ChangePasswordModal/ChangePasswordModal.types';

import { allusers } from './../../index';

export const handlers = [
  // TODO: URL env var on all files
  // Mock the /v1/users/isloggedin API to return a not logged in state
  rest.get('http://localhost:8080/api/v1/users/isloggedin', (req, res, ctx) => {
    return res(ctx.status(401)); // Simulate user not logged in, so auth is set to false
  }),
  // Mock the /v1/users/login API to return a successful login
  rest.post('http://localhost:8080/api/v1/users/login', (req, res, ctx) => {
    const { email, password } = req.body as { email: string; password: string };

    if (email === 'test@example.com' && password === 'password123') {
      return res(
        ctx.status(200),
        ctx.json({ data: { user: { id: 1, name: 'Test User', email } } })
      );
    }
    return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }));
  }),
  // Mock the /v1/users/signup API to return a successful signup
  rest.post('http://localhost:8080/api/v1/users/signup', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ message: 'User created' }));
  }),
  // Mock the /v1/users/allusers API to return a list of users
  rest.get('http://localhost:8080/api/v1/users/allusers', (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page')) || 1;
    const perPage = Number(req.url.searchParams.get('perpage')) || 5;
    const data = allusers.slice((page - 1) * perPage, page * perPage);
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        results: data.length,
        data: {
          users: data
        },
        pagination: {
          totalCount: data.length,
          currentPage: page,
          totalPages: 1
        }
      })
    );
  }),
  // Mock the /v1/users/permissions API to return a list of permissions
  rest.get('http://localhost:8080/api/v1/users/permissions', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'success',
        message: 'Permissions retrieved',
        data: {
          permissions: ['Permission1']
        }
      })
    );
  }),
  // Mock the /v1/users/searchbyname API to return a list of users
  rest.get('http://localhost:8080/api/v1/users/searchbyname', (req, res, ctx) => {
    const query = req.url.searchParams.get('name') || '';
    const page = Number(req.url.searchParams.get('page')) || 1;
    const perPage = Number(req.url.searchParams.get('perpage')) || 5;
    const data = allusers.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()));
    return res(
      ctx.status(200),
      ctx.json({
        status: 'success',
        results: data.length,
        data: {
          users: data.slice((page - 1) * perPage, page * perPage)
        },
        pagination: {
          totalCount: data.length,
          currentPage: page,
          totalPages: Math.ceil(data.length / perPage)
        }
      })
    );
  }),
  // Mock the /v1/users/permissions API to return a successful update if password == 'passwordSuccess'
  rest.post('http://localhost:8080/api/v1/users/changeUserPassword', (req, res, ctx) => {
    const { newPassword } = req.body as UpdatePasswordBody;
    if (newPassword === 'passwordSuccess') {
      return res(ctx.status(200), ctx.json({ message: 'Password changed' }));
    } else {
      return res(ctx.status(400), ctx.json({ message: 'Password not changed' }));
    }
  }),
  // Mock the /v1/users/permissions API to return a successful update
  rest.delete('http://localhost:8080/api/v1/users/delete', (req, res, ctx) => {
    return res(ctx.status(204));
  }),
  // Mock the /v1/users/permissions API to return a successful update if permissions == ['PermissionSuccess']
  rest.put('http://localhost:8080/api/v1/users/permissions', (req, res, ctx) => {
    const { permissions } = req.body as { email: string; permissions: string[] };
    if (permissions.includes('PermissionSuccess')) {
      return res(ctx.status(200));
    } else {
      return res(ctx.status(400));
    }
  }),
  // Mock the /v1/users/roles API to return a successful update if email == 'marty@test.com'
  rest.put('http://localhost:8080/api/v1/users/roles', (req, res, ctx) => {
    const { email } = req.body as { email: string };
    if (email === 'marty@test.com') {
      return res(ctx.status(200));
    } else {
      return res(ctx.status(400));
    }
  })
];
