import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { useUser } from '../../context/UserContext/UserContext';

import Login from './Login';

jest.mock('../../context/UserContext/UserContext');

describe('Login', () => {
  it('Load login page', async () => {
    (useUser as jest.Mock).mockReturnValue({
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin'
      },
      setUser: jest.fn() // mock setUser if needed
    });

    render(<Login />);
    const title = await screen.findByText('opensesame');
    expect(title).toBeInTheDocument();
  });
});
