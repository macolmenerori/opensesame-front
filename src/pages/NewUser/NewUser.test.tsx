import React from 'react';
import { useForm } from 'react-hook-form';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import api from '../../api';
import { useToast } from '../../context/ToastContext/ToastContext';
import { useUser } from '../../context/UserContext/UserContext';

import NewUser from './NewUser';

jest.mock('../../context/ToastContext/ToastContext');

const mockUseForm = useForm as jest.Mock;
const mockUseToast = useToast as jest.Mock;
const mockShowToast = jest.fn();
const mockReset = jest.fn();

// Mock the useUser context
jest.mock('../../context/UserContext/UserContext', () => ({
  useUser: jest.fn()
}));

beforeEach(() => {
  mockUseForm.mockReturnValue({
    register: jest.fn(),
    handleSubmit: jest.fn((fn) => fn),
    formState: { errors: {} },
    watch: jest.fn(),
    reset: mockReset
  });
  mockUseToast.mockReturnValue({ showToast: mockShowToast });
});

// Mock the API module
jest.mock('../../api', () => ({
  post: jest.fn()
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('NewUser Component', () => {
  it('submit button is disabled if loggedUser is not an admin', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { role: 'user' }
    });

    render(<NewUser />);

    const submitButton = screen.getByRole('button', { name: /sign up user/i });
    expect(submitButton).toBeDisabled();
  });

  it('Form can be populated and submitted by an admin', async () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { role: 'admin' }
    });
    // Mock the API response
    (api.post as jest.Mock).mockResolvedValue({
      status: 201
    });

    render(<NewUser />);

    // Check if submit button is enabled
    const submitButton = screen.getByRole('button', { name: /sign up user/i });
    expect(submitButton).toBeEnabled();

    // Populate form
    await userEvent.clear(screen.getByTestId('name-input'));
    await userEvent.type(screen.getByTestId('name-input'), 'John Doe');
    await userEvent.clear(screen.getByTestId('email-input'));
    await userEvent.type(screen.getByTestId('email-input'), 'john.doe@example.com');
    await userEvent.selectOptions(screen.getByTestId('role-select'), 'user');
    await userEvent.clear(screen.getByTestId('password-input'));
    await userEvent.type(screen.getByTestId('password-input'), 'password123');
    await userEvent.clear(screen.getByTestId('confirm-password-input'));
    await userEvent.type(screen.getByTestId('confirm-password-input'), 'password123');

    // Submit the form directly using the form element
    const formElement = screen.getByTestId('new-user-form'); // Assuming the form has a role="form"
    await userEvent.click(
      formElement.querySelector('[type="submit"]') ||
        screen.getByRole('button', { name: /sign up user/i })
    );

    // Wait for the API call to be made
    await waitFor(() => {
      // Check that the API was called once
      expect(api.post).toHaveBeenCalledTimes(1);
    });
  });
});
