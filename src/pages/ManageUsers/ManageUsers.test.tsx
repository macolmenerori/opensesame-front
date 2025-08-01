import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useToast } from '../../context/ToastContext/ToastContext';
import { useUser } from '../../context/UserContext/UserContext';

import ManageUsers from './ManageUsers';

// Mock user context
jest.mock('../../context/UserContext/UserContext', () => ({
  useUser: jest.fn()
}));

// Mock toast context
jest.mock('../../context/ToastContext/ToastContext', () => ({
  useToast: jest.fn()
}));
const mockShowToast = jest.fn();

describe('ManageUsers Component', () => {
  // Check that table loads with users
  it('Should load table with users', async () => {
    // Mock the user context
    (useUser as jest.Mock).mockReturnValue({
      user: { role: 'admin' }
    });

    // Mock the toast context
    (useToast as jest.Mock).mockReturnValue({ showToast: mockShowToast });

    render(<ManageUsers />);

    // Wait for the table to load the users
    await waitFor(() => {
      expect(screen.getByText('Manage users')).toBeInTheDocument();
    });

    // Check the table headers
    expect(screen.getByText('Name')).toBeInTheDocument();

    // Check the table rows
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  // Check pagination
  it('Should paginate users', async () => {
    // Mock the user context
    (useUser as jest.Mock).mockReturnValue({
      user: { role: 'admin' }
    });

    // Mock the toast context
    (useToast as jest.Mock).mockReturnValue({ showToast: mockShowToast });

    render(<ManageUsers />);

    // Wait for the table to load the users
    await waitFor(() => {
      expect(screen.getByText('Manage users')).toBeInTheDocument();
    });

    // Check that the pagination component is present
    expect(screen.getByTestId('pagination-component')).toBeInTheDocument();

    // Check the pagination buttons
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();

    // Click the next button
    await userEvent.click(screen.getByText('Next'));

    // Wait for the table to load the new page of users
    await waitFor(() => {
      expect(screen.getByText('User Test Page 2')).toBeInTheDocument();
    });
  });

  // Check permissions modal
  it('Should open permissions modal', async () => {
    // Mock the user context
    (useUser as jest.Mock).mockReturnValue({
      user: { role: 'admin' }
    });

    // Mock the toast context
    (useToast as jest.Mock).mockReturnValue({ showToast: mockShowToast });

    render(<ManageUsers />);

    // Wait for the table to load the users
    await waitFor(() => {
      expect(screen.getByText('Manage users')).toBeInTheDocument();
    });

    // Click the permissions button for the first user
    await userEvent.click(screen.getAllByTestId('permissions-button')[0]);

    // Wait for the modal to load the user permissions
    await waitFor(() => {
      expect(screen.getByText('Permission1...')).toBeInTheDocument();
    });
  });

  // Check user details modal
  it('Should open user details modal', async () => {
    // Mock the user context
    (useUser as jest.Mock).mockReturnValue({
      user: { role: 'admin' }
    });

    // Mock the toast context
    (useToast as jest.Mock).mockReturnValue({ showToast: mockShowToast });

    render(<ManageUsers />);

    // Wait for the table to load the users
    await waitFor(() => {
      expect(screen.getByText('Manage users')).toBeInTheDocument();
    });

    // Click the user details button for the first user
    await userEvent.click(screen.getAllByText('User details')[0]);

    // Wait for the modal to load the user details
    await waitFor(() => {
      expect(screen.getByText('6669b3430b93d4c1b5d9cc8e')).toBeInTheDocument();
    });
  });

  // Check search user modal
  it('Should open search user modal', async () => {
    // Mock the user context
    (useUser as jest.Mock).mockReturnValue({
      user: { role: 'admin' }
    });

    // Mock the toast context
    (useToast as jest.Mock).mockReturnValue({ showToast: mockShowToast });

    render(<ManageUsers />);

    // Wait for the table to load the users
    await waitFor(() => {
      expect(screen.getByText('Manage users')).toBeInTheDocument();
    });

    // Check that the search user modal button is present
    expect(screen.getByTestId('search-user-modal-button')).toBeInTheDocument();

    // Click the search user modal button
    await userEvent.click(screen.getByTestId('search-user-modal-button'));

    // Check that the search user modal is displayed
    expect(screen.getByPlaceholderText('Search users by name...')).toBeInTheDocument();

    // Type a query in the search input
    await userEvent.clear(screen.getByPlaceholderText('Search users by name...'));
    await userEvent.type(screen.getByPlaceholderText('Search users by name...'), 'john');

    // Wait for the search to complete
    await waitFor(() => {
      expect(screen.getByText('Marty McFly')).toBeInTheDocument();
    });
  });
});
