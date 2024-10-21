import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Login from './Login';

jest.mock('../../context/UserContext/UserContext');

// Mock useNavigate and useUser hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn() // Mock the useNavigate function
}));

// Mock User Context
const mockSetUser = jest.fn(); // Mock the setUser function
jest.mock('../../context/UserContext/UserContext', () => ({
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin'
  },
  useUser: () => ({
    setUser: mockSetUser
  })
}));

const server = setupServer(
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
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Login', () => {
  it('Load login page', async () => {
    render(<Login />);
    const title = await screen.findByText('opensesame');
    expect(title).toBeInTheDocument();
  });

  it('Submits the login form', async () => {
    // Mock navigate function
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate // Inject mocked useNavigate
    }));

    // BrowserRouter needed for the useNavigate hook, when login is successful to navigate to /mainpage
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Wait for the page to load
    await waitFor(() => {
      expect(screen.getByText('opensesame')).toBeInTheDocument();
    });

    // Get form elements
    const emailInput = screen.getByTestId('emailInput');
    const passwordInput = screen.getByTestId('passwordInput');
    const submitButton = screen.getByTestId('submitButton');

    // Simulate user typing in email and password
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    // Simulate form submission by clicking the login button
    fireEvent.click(submitButton);

    // Wait for the success response and assert that setUser and navigate are called
    await waitFor(() => {
      // Check if setUser was called with the correct user data
      expect(mockSetUser).toHaveBeenCalledWith({
        id: 1,
        name: 'Test User',
        email: 'test@example.com'
      });
    });
  });
});
