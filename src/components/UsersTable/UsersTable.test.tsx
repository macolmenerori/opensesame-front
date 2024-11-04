import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { User } from '../../common/types/User.types';
import { useUser } from '../../context/UserContext/UserContext';
import { allusers } from '../../mocks';

import UsersTable from './UsersTable';
import { UsersTableProps } from './UsersTable.types';

const mockData = allusers.slice(2, 4);

const mockSetPermissionsModalUser = jest.fn();
const mockSetUserDetailsModalUser = jest.fn();

// Mock user context
jest.mock('../../context/UserContext/UserContext', () => ({
  useUser: jest.fn()
}));

const renderComponent = (props: Partial<UsersTableProps> = {}) => {
  const defaultProps: UsersTableProps = {
    data: mockData as User[],
    setPermissionsModalUser: mockSetPermissionsModalUser,
    setUserDetailsModalUser: mockSetUserDetailsModalUser,
    ...props
  };

  return render(<UsersTable {...defaultProps} />);
};

describe('UsersTable', () => {
  it('renders table headers correctly', () => {
    // Mock the user context
    (useUser as jest.Mock).mockReturnValue({
      user: { role: 'admin' }
    });

    renderComponent();

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Permissions')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('renders user data correctly', () => {
    // Mock the user context
    (useUser as jest.Mock).mockReturnValue({
      user: { role: 'admin' }
    });

    renderComponent();

    expect(screen.getByText('Marty McFly')).toBeInTheDocument();
    expect(screen.getByText('marty@test.com')).toBeInTheDocument();
    expect(screen.getByText('user')).toBeInTheDocument();
    expect(screen.getByText('permission33...')).toBeInTheDocument();
    expect(screen.getByText('Dr Brown')).toBeInTheDocument();
    expect(screen.getByText('drbrown@test.com')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByText('Perm3, perm4...')).toBeInTheDocument();
  });

  it('calls setPermissionsModalUser when permissions button is clicked', () => {
    // Mock the user context
    (useUser as jest.Mock).mockReturnValue({
      user: { role: 'admin' }
    });

    renderComponent();

    const permissionsButton = screen.getAllByTestId('permissions-button')[0];

    fireEvent.click(permissionsButton);

    expect(mockSetPermissionsModalUser).toHaveBeenCalledWith('marty@test.com');
  });

  it('calls setUserDetailsModalUser when user details button is clicked', () => {
    // Mock the user context
    (useUser as jest.Mock).mockReturnValue({
      user: { role: 'admin' }
    });

    renderComponent();

    const userDetailsButton = screen.getAllByText('User details')[0];

    fireEvent.click(userDetailsButton);

    expect(mockSetUserDetailsModalUser).toHaveBeenCalledWith(mockData[0]);
  });
});
