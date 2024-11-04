/* eslint-disable testing-library/no-node-access */
import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import StatusToast from './StatusToast';
import { StatusToastProps } from './StatusToast.types';

describe('StatusToast Component', () => {
  const defaultProps: StatusToastProps = {
    title: 'Test Title',
    message: 'Test Message',
    type: 'success',
    onClose: jest.fn()
  };

  it('renders the StatusToast component with correct title and message', () => {
    render(<StatusToast {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('applies the correct class based on the type prop', () => {
    const { rerender } = render(<StatusToast {...defaultProps} type="success" />);
    expect(screen.getByText('Test Title').closest('.card')).toHaveClass('text-bg-success');

    rerender(<StatusToast {...defaultProps} type="danger" />);
    expect(screen.getByText('Test Title').closest('.card')).toHaveClass('text-bg-danger');
  });

  it('calls the onClose function when the close button is clicked', () => {
    render(<StatusToast {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls the onClose function after the timeout', () => {
    jest.useFakeTimers();
    render(<StatusToast {...defaultProps} />);
    jest.advanceTimersByTime(5000);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(2);
    jest.useRealTimers();
  });
});
