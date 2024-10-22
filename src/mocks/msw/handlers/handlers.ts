import { rest } from 'msw';

export const handlers = [
  // Mock the /v1/users/isloggedin API to return a not logged in state
  rest.get('http://localhost:8080/api/v1/users/isloggedin', (req, res, ctx) => {
    // TODO: URL env var
    return res(ctx.status(401)); // Simulate user not logged in, so auth is set to false
  }),
  // Mock the /v1/users/login API to return a successful login
  rest.post('http://localhost:8080/api/v1/users/login', (req, res, ctx) => {
    // TODO: URL env var
    const { email, password } = req.body as { email: string; password: string };

    if (email === 'test@example.com' && password === 'password123') {
      return res(
        ctx.status(200),
        ctx.json({ data: { user: { id: 1, name: 'Test User', email } } })
      );
    }
    return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }));
  })
];
