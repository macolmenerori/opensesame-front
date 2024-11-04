import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import api from '../../../api';
import { useToast } from '../../../context/ToastContext/ToastContext';

import UpdateRolesModal from './UpdateRolesModal';

jest.mock('../../../context/ToastContext/ToastContext');
jest.mock('../../../api');
import { User } from '../../../common/types/User.types';
import { allusers } from '../../../mocks';

const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;
const mockApiPut = api.put as jest.MockedFunction<typeof api.put>;

describe('UpdateRolesModal', () => {
  const mockShowToast = jest.fn();
  const mockSetRoleModalUser = jest.fn();
  const mockRefreshData = jest.fn();

  beforeEach(() => {
    mockUseToast.mockReturnValue({ showToast: mockShowToast });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // UpdateRolesModal to be rendered with user details
  const renderComponent = (roleModalUser: any) => {
    render(
      <UpdateRolesModal
        roleModalUser={roleModalUser}
        setRoleModalUser={mockSetRoleModalUser}
        refreshData={mockRefreshData}
      />
    );
  };

  it('should render modal with user details', () => {
    // Mock the user
    const roleModalUser = allusers[2] as User;

    renderComponent(roleModalUser);

    // Check that the modal is rendered with the user information
    expect(screen.getByText('Update role')).toBeInTheDocument();
    expect(screen.getByText('Marty McFly')).toBeInTheDocument();
    expect(screen.getByText('marty@test.com')).toBeInTheDocument();
    expect(screen.getByTestId('role-select')).toBeInTheDocument();
  });

  it('should update role state when select value changes', () => {
    // Mock the user
    const roleModalUser = allusers[2] as User;

    renderComponent(roleModalUser);

    // Change the role
    fireEvent.change(screen.getByTestId('role-select'), { target: { value: 'admin' } });

    // Check that the role state is updated
    expect(screen.getByDisplayValue('Admin')).toBeInTheDocument();
  });

  it('should call API and show success toast on successful role update', async () => {
    // Mock the user and API response
    const roleModalUser = allusers[2] as User;
    mockApiPut.mockResolvedValue({ status: 200 });

    renderComponent(roleModalUser);

    // Change the role
    fireEvent.change(screen.getByTestId('role-select'), { target: { value: 'admin' } });

    // Click the update button
    fireEvent.click(screen.getByText('Update'));

    // Check that the API was called with the correct data
    await waitFor(() => {
      expect(mockApiPut).toHaveBeenCalledWith(
        '/v1/users/roles',
        { email: 'marty@test.com', role: 'admin' },
        { headers: { 'Content-Type': 'application/json' } }
      );
    });

    // Check that the modal was closed
    expect(mockSetRoleModalUser).toHaveBeenCalledWith(undefined);

    // Check that the data was refreshed
    expect(mockRefreshData).toHaveBeenCalled();

    // Check that the toast was shown
    expect(mockShowToast).toHaveBeenCalledWith({
      title: 'Success',
      message: 'Role was updated',
      type: 'success'
    });
  });

  it('should show error toast on failed role update', async () => {
    // Mock the user and API response
    const roleModalUser = allusers[3] as User;
    mockApiPut.mockRejectedValue(new Error('Failed to update role'));

    renderComponent(roleModalUser);

    // Change the role
    fireEvent.change(screen.getByTestId('role-select'), { target: { value: 'user' } });

    // Click the update button
    fireEvent.click(screen.getByText('Update'));

    // Check that the API was called with the correct data
    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith({
        title: 'Error',
        message: 'Role was not updated',
        type: 'danger'
      });
    });
  });
});
