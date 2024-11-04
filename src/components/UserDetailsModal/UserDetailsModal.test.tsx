import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { User } from '../../common/types/User.types';
import { allusers } from '../../mocks';

import UserDetailsModal from './UserDetailsModal';
import { UserDetailsModalProps } from './UserDetailsModal.types';

describe('UserDetailsModal', () => {
  const mockUser = allusers[2];

  const mockSetUserDetailsModalUser = jest.fn();

  const renderComponent = (user: UserDetailsModalProps['user']) => {
    render(<UserDetailsModal user={user} setUserDetailsModalUser={mockSetUserDetailsModalUser} />);
  };

  it('should display user details when user is provided', () => {
    renderComponent(mockUser as User);

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.role)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText(mockUser._id)).toBeInTheDocument();
    expect(screen.getByText(mockUser.permissions.join(', '))).toBeInTheDocument();
  });

  it('should display "No permissions" when user has no permissions', () => {
    const userWithoutPermissions = { ...mockUser, permissions: [] };
    renderComponent(userWithoutPermissions as User);

    expect(screen.getByText('No permissions')).toBeInTheDocument();
  });

  it('should call setUserDetailsModalUser with undefined when close button is clicked', () => {
    renderComponent(mockUser as User);

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(mockSetUserDetailsModalUser).toHaveBeenCalledWith(undefined);
  });
});
