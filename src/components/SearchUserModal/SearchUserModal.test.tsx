import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import api from '../../api';
import { useToast } from '../../context/ToastContext/ToastContext';

import SearchUserModal from './SearchUserModal';

jest.mock('../../api');
jest.mock('../../context/ToastContext/ToastContext');

describe('SearchUserModal', () => {
  const setUserDetailsModalUser = jest.fn();
  const showToast = jest.fn();

  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({ showToast });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // For the debounce timer
  jest.useFakeTimers();

  it('renders the modal correctly', () => {
    render(<SearchUserModal setUserDetailsModalUser={setUserDetailsModalUser} />);
    expect(screen.getByPlaceholderText('Search users by name...')).toBeInTheDocument();
  });

  it('calls the API and displays users on successful search', async () => {
    const mockUsers = [{ id: 1, name: 'Marty McFly' }];
    (api.get as jest.Mock).mockResolvedValue({ status: 200, data: { data: { users: mockUsers } } });

    render(<SearchUserModal setUserDetailsModalUser={setUserDetailsModalUser} />);

    fireEvent.change(screen.getByPlaceholderText('Search users by name...'), {
      target: { value: 'Marty' }
    });

    // Run the debounce timer
    jest.runAllTimers();

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/v1/users/searchbyname?name=Marty&page=1&perpage=10');
    });
  });

  it('shows an error toast on API failure', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('API Error'));

    render(<SearchUserModal setUserDetailsModalUser={setUserDetailsModalUser} />);

    fireEvent.change(screen.getByPlaceholderText('Search users by name...'), {
      target: { value: 'Marty' }
    });

    jest.runAllTimers();

    await waitFor(() =>
      expect(api.get).toHaveBeenCalledWith('/v1/users/searchbyname?name=Marty&page=1&perpage=10')
    );

    expect(showToast).toHaveBeenCalledWith({
      title: 'Error',
      message: 'Error searching for users',
      type: 'danger'
    });
  });

  it('clears users if query is empty', async () => {
    render(<SearchUserModal setUserDetailsModalUser={setUserDetailsModalUser} />);

    fireEvent.change(screen.getByPlaceholderText('Search users by name...'), {
      target: { value: '' }
    });

    jest.runAllTimers();

    await waitFor(() => expect(api.get).not.toHaveBeenCalled());

    expect(screen.queryByText('Marty McFly')).not.toBeInTheDocument();
  });
});
