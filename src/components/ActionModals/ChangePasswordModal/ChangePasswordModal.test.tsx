import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import api from '../../../api';
import { User } from '../../../common/types/User.types';
import { useToast } from '../../../context/ToastContext/ToastContext';
import { allusers } from '../../../mocks';

import ChangePasswordModal from './ChangePasswordModal';

jest.mock('../../../context/ToastContext/ToastContext');
jest.mock('../../../api');

const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;
const mockApiPost = api.post as jest.MockedFunction<typeof api.post>;

describe('ChangePasswordModal', () => {
  const mockShowToast = jest.fn();
  const mockSetPasswordModalUser = jest.fn();
  const mockUser = allusers[0] as User;

  beforeEach(() => {
    mockUseToast.mockReturnValue({ showToast: mockShowToast });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal with user information', () => {
    render(
      <ChangePasswordModal
        passwordModalUser={mockUser}
        setPasswordModalUser={mockSetPasswordModalUser}
      />
    );

    // Check that the modal is rendered with the user information
    expect(screen.getByText('Change password')).toBeInTheDocument();
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it('shows error message when passwords do not match', () => {
    render(
      <ChangePasswordModal
        passwordModalUser={mockUser}
        setPasswordModalUser={mockSetPasswordModalUser}
      />
    );

    // Insert new password
    fireEvent.change(screen.getByLabelText('New password:'), { target: { value: 'password1' } });

    // Insert new password confirmation, but different to trigger error
    fireEvent.change(screen.getByLabelText('Confirm new password:'), {
      target: { value: 'password2' }
    });

    // Click the update button
    fireEvent.click(screen.getByText('Update'));

    // Check that the error message is shown
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  it('calls API and shows success toast on successful password change', async () => {
    // Mock API response
    mockApiPost.mockResolvedValue({ status: 200 });

    render(
      <ChangePasswordModal
        passwordModalUser={mockUser}
        setPasswordModalUser={mockSetPasswordModalUser}
      />
    );

    // Insert new password
    fireEvent.change(screen.getByLabelText('New password:'), {
      target: { value: 'passwordSuccess' }
    });

    // Insert new password confirmation
    fireEvent.change(screen.getByLabelText('Confirm new password:'), {
      target: { value: 'passwordSuccess' }
    });

    // Click the update button
    fireEvent.click(screen.getByText('Update'));

    // Check API call
    expect(mockApiPost).toHaveBeenCalledWith(
      '/v1/users/changeUserPassword',
      {
        email: mockUser.email,
        newPassword: 'passwordSuccess',
        newPasswordConfirm: 'passwordSuccess'
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    // Check that the modal was closed
    await waitFor(() => {
      expect(mockSetPasswordModalUser).toHaveBeenCalledWith(undefined);
    });

    // Check that the success toast was shown
    expect(mockShowToast).toHaveBeenCalledWith({
      title: 'Success',
      message: 'Password was updated',
      type: 'success'
    });
  });

  it('shows error toast on failed password change', async () => {
    // Mock API response
    mockApiPost.mockResolvedValue({ status: 400 });

    render(
      <ChangePasswordModal
        passwordModalUser={mockUser}
        setPasswordModalUser={mockSetPasswordModalUser}
      />
    );

    // Insert new password
    fireEvent.change(screen.getByLabelText('New password:'), { target: { value: 'password1' } });

    // Insert new password confirmation
    fireEvent.change(screen.getByLabelText('Confirm new password:'), {
      target: { value: 'password1' }
    });

    // Click the update button
    fireEvent.click(screen.getByText('Update'));

    // Check that the error toast was shown
    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith({
        title: 'Error',
        message: 'Password was not updated',
        type: 'danger'
      });
    });
  });
});
