import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import MainPage from './MainPage';

const mockSetUser = jest.fn(); // Mock the setUser function
jest.mock('../../context/UserContext/UserContext', () => ({
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user'
  },
  useUser: () => ({
    setUser: mockSetUser
  })
}));

describe('MainPage', () => {
  it('shows "admin only" for non-admin users', () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    const newUserLink = screen.getByText(/New user \(admin only\)/i);
    expect(newUserLink).toBeInTheDocument();
  });
});
