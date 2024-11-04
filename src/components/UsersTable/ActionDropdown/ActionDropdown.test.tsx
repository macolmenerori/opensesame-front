import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { User } from '../../../common/types/User.types';
import { useUser } from '../../../context/UserContext/UserContext';
import { allusers } from '../../../mocks';

import ActionDropdown from './ActionDropdown';

const mockSetUserModal = jest.fn();

// Mock user context
jest.mock('../../../context/UserContext/UserContext', () => ({
  useUser: jest.fn()
}));

const mockUser = allusers[2];

describe('ActionDropdown', () => {
  it('should render the dropdown button', () => {
    // Mock the user context
    (useUser as jest.Mock).mockReturnValue({
      user: { role: 'admin' }
    });

    render(<ActionDropdown user={mockUser as User} setUserModal={mockSetUserModal} />);

    const button = screen.getByTestId('action-dropdown-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('should disable the dropdown button for non-admin users', () => {
    // Mock the user context
    (useUser as jest.Mock).mockReturnValue({
      user: { role: 'user' }
    });

    render(<ActionDropdown user={mockUser as User} setUserModal={mockSetUserModal} />);

    const button = screen.getByTestId('action-dropdown-button');
    expect(button).toBeDisabled();
  });

  it('should enable the dropdown button for admin users', () => {
    // Mock the user context
    (useUser as jest.Mock).mockReturnValue({
      user: { role: 'admin' }
    });

    render(<ActionDropdown user={mockUser as User} setUserModal={mockSetUserModal} />);

    const button = screen.getByTestId('action-dropdown-button');
    expect(button).toBeEnabled();
  });

  it('should call setUserModal with the correct user when an option is clicked', () => {
    // Mock the user context
    (useUser as jest.Mock).mockReturnValue({
      user: { role: 'admin' }
    });

    render(<ActionDropdown user={mockUser as User} setUserModal={mockSetUserModal} />);

    const button = screen.getByTestId('action-dropdown-button');
    fireEvent.click(button);

    const updatePermissionsButton = screen.getByText('Update permissions');
    fireEvent.click(updatePermissionsButton);
    expect(mockSetUserModal).toHaveBeenCalledWith(mockUser);

    const updateRoleButton = screen.getByText('Update role');
    fireEvent.click(updateRoleButton);
    expect(mockSetUserModal).toHaveBeenCalledWith(mockUser);

    const changePasswordButton = screen.getByText('Change password');
    fireEvent.click(changePasswordButton);
    expect(mockSetUserModal).toHaveBeenCalledWith(mockUser);

    const deleteUserButton = screen.getByText('Delete user');
    fireEvent.click(deleteUserButton);
    expect(mockSetUserModal).toHaveBeenCalledWith(mockUser);
  });
});
