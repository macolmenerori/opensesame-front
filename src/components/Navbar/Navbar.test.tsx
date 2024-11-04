import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import api from '../../api';
import { useUser } from '../../context/UserContext/UserContext';

import Navbar from './Navbar';

jest.mock('../../context/UserContext/UserContext');
jest.mock('../../api');

describe('Navbar', () => {
  const mockSetUser = jest.fn();
  (api.delete as jest.Mock).mockResolvedValue({});

  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({ setUser: mockSetUser });
    (api.delete as jest.Mock).mockResolvedValue({});
  });

  it('renders the Navbar component', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('opensesame')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('calls handleLogout when the logout button is clicked', async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith('/v1/users/logout');
    });
    expect(mockSetUser).toHaveBeenCalledWith(null);
  });
});
