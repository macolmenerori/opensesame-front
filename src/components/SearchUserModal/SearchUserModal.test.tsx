import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import api from '../../api';
import { useToast } from '../../context/ToastContext/ToastContext';

import SearchUserModal from './SearchUserModal';

jest.mock('../../api');
jest.mock('../../context/ToastContext/ToastContext');

describe('SearchUserModal', () => {
  const setUserDetailsModalUser = jest.fn();
  const showToast = jest.fn();
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    jest.useFakeTimers();
    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    (useToast as jest.Mock).mockReturnValue({ showToast });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders the modal correctly', () => {
    render(<SearchUserModal setUserDetailsModalUser={setUserDetailsModalUser} />);
    expect(screen.getByPlaceholderText('Search users by name...')).toBeInTheDocument();
  });

  it('calls the API and displays users on successful search', async () => {
    const mockUsers = [{ id: 1, name: 'Marty McFly' }];
    (api.get as jest.Mock).mockResolvedValue({ status: 200, data: { data: { users: mockUsers } } });

    render(<SearchUserModal setUserDetailsModalUser={setUserDetailsModalUser} />);

    const searchInput = screen.getByPlaceholderText('Search users by name...');

    await user.clear(searchInput);
    await user.type(searchInput, 'Marty');

    // Fast-forward time to trigger debounce
    jest.advanceTimersByTime(1300);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/v1/users/searchbyname?name=Marty&page=1&perpage=10');
    });
  });

  it('shows an error toast on API failure', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('API Error'));

    render(<SearchUserModal setUserDetailsModalUser={setUserDetailsModalUser} />);

    const searchInput = screen.getByPlaceholderText('Search users by name...');

    await user.clear(searchInput);
    await user.type(searchInput, 'Marty');

    // Fast-forward time to trigger debounce
    jest.advanceTimersByTime(1300);

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

    const searchInput = screen.getByPlaceholderText('Search users by name...');

    await user.clear(searchInput);

    // Fast-forward time to trigger debounce
    jest.advanceTimersByTime(1300);

    await waitFor(() => expect(api.get).not.toHaveBeenCalled());

    expect(screen.queryByText('Marty McFly')).not.toBeInTheDocument();
  });
});
