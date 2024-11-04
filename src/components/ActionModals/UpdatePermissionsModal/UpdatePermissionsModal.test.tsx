import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import api from '../../../api';
import { useToast } from '../../../context/ToastContext/ToastContext';

import UpdatePermissionsModal from './UpdatePermissionsModal';

jest.mock('../../../context/ToastContext/ToastContext');
jest.mock('../../../api');
import { User } from '../../../common/types/User.types';
import { allusers } from '../../../mocks';

const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;
const mockApiPut = api.put as jest.MockedFunction<typeof api.put>;

describe('UpdatePermissionsModal', () => {
  const mockShowToast = jest.fn();
  const mockSetPermissionsModalUser = jest.fn();
  const mockRefreshData = jest.fn();

  // Mock the user
  const permissionsModalUser = allusers[2] as User;

  beforeEach(() => {
    mockUseToast.mockReturnValue({ showToast: mockShowToast });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal with user details', () => {
    render(
      <UpdatePermissionsModal
        permissionsModalUser={permissionsModalUser}
        setPermissionsModalUser={mockSetPermissionsModalUser}
        refreshData={mockRefreshData}
      />
    );

    // Check that the modal is rendered with the user information
    expect(screen.getByText('Update permissions')).toBeInTheDocument();
    expect(screen.getByText('Marty McFly')).toBeInTheDocument();
    expect(screen.getByText('marty@test.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('permission33')).toBeInTheDocument();
  });

  it('updates permissions successfully', async () => {
    // Mock the API response
    mockApiPut.mockResolvedValue({ status: 200 });

    render(
      <UpdatePermissionsModal
        permissionsModalUser={permissionsModalUser}
        setPermissionsModalUser={mockSetPermissionsModalUser}
        refreshData={mockRefreshData}
      />
    );

    // Change permissions
    fireEvent.change(screen.getByTestId('permissions-textarea'), {
      target: { value: 'PermissionSuccess' }
    });

    // Click the update button
    fireEvent.click(screen.getByText('Update'));

    // Check that the API was called with the correct data
    await waitFor(() => {
      expect(mockApiPut).toHaveBeenCalledWith(
        '/v1/users/permissions',
        {
          email: 'marty@test.com',
          permissions: ['PermissionSuccess']
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
    });

    // Check that the modal was closed and the data was refreshed
    expect(mockSetPermissionsModalUser).toHaveBeenCalledWith(undefined);

    // Check that the data was refreshed
    expect(mockRefreshData).toHaveBeenCalled();

    // Check that the toast was shown
    expect(mockShowToast).toHaveBeenCalledWith({
      title: 'Success',
      message: 'Permissions where updated',
      type: 'success'
    });
  });

  it('shows error toast when update fails', async () => {
    // Mock the API response
    mockApiPut.mockRejectedValue(new Error('Update failed'));

    render(
      <UpdatePermissionsModal
        permissionsModalUser={permissionsModalUser}
        setPermissionsModalUser={mockSetPermissionsModalUser}
        refreshData={mockRefreshData}
      />
    );

    // Change permissions
    fireEvent.change(screen.getByTestId('permissions-textarea'), {
      target: { value: 'PermissionSuccess' }
    });

    // Click the update button
    fireEvent.click(screen.getByText('Update'));

    // Check that the error toast was shown
    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith({
        title: 'Error',
        message: 'Permissions where not updated',
        type: 'danger'
      });
    });
  });
});
