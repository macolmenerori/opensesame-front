import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import api from '../../../api';
import { User } from '../../../common/types/User.types';
import { useToast } from '../../../context/ToastContext/ToastContext';
import { allusers } from '../../../mocks';

import DeleteUserModal from './DeleteUserModal';

jest.mock('../../../api');
jest.mock('../../../context/ToastContext/ToastContext');

const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;

describe('DeleteUserModal', () => {
  const setDeleteUserModal = jest.fn();
  const refreshData = jest.fn();
  const showToast = jest.fn();

  beforeEach(() => {
    mockUseToast.mockReturnValue({ showToast });
  });

  it('should render the modal with user details', () => {
    // Mock the user
    const deleteUserModal = allusers[2] as User;

    render(
      <DeleteUserModal
        deleteUserModal={deleteUserModal}
        setDeleteUserModal={setDeleteUserModal}
        refreshData={refreshData}
      />
    );

    // Check that the modal is rendered with the user information
    expect(screen.getByText('Are you sure you want to delete this user?')).toBeInTheDocument();
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('Marty McFly')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('marty@test.com')).toBeInTheDocument();
  });

  it('should call API and show success toast on successful deletion', async () => {
    // Mock the user and API response
    const deleteUserModal = allusers[2] as User;
    (api.delete as jest.Mock).mockResolvedValue({ status: 204 });

    render(
      <DeleteUserModal
        deleteUserModal={deleteUserModal}
        setDeleteUserModal={setDeleteUserModal}
        refreshData={refreshData}
      />
    );

    // Click the delete button
    fireEvent.click(screen.getByTestId('delete-user-modal-button'));

    // Check that the API was called and the toast was shown
    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith('/v1/users/delete?email=marty@test.com');
    });
    expect(setDeleteUserModal).toHaveBeenCalledWith(undefined);
    expect(refreshData).toHaveBeenCalled();
    expect(showToast).toHaveBeenCalledWith({
      title: 'Success',
      message: 'User was deleted',
      type: 'success'
    });
  });

  it('should show error toast on failed deletion', async () => {
    // Mock the user and API response
    const deleteUserModal = allusers[2] as User;
    (api.delete as jest.Mock).mockRejectedValue(new Error('Failed to delete'));

    render(
      <DeleteUserModal
        deleteUserModal={deleteUserModal}
        setDeleteUserModal={setDeleteUserModal}
        refreshData={refreshData}
      />
    );

    // Click the delete button
    fireEvent.click(screen.getByTestId('delete-user-modal-button'));

    // Check that the API was called and the toast was shown
    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith('/v1/users/delete?email=marty@test.com');
    });
    expect(showToast).toHaveBeenCalledWith({
      title: 'Error',
      message: 'User was not deleted',
      type: 'danger'
    });
  });
});
