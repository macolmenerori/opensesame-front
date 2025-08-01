import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Pagination from './Pagination';
import { PaginationProps } from './Pagination.types';

const defaultProps: PaginationProps = {
  currentPage: 1,
  totalPages: 3,
  perPage: 10,
  setPage: jest.fn(),
  setPerPage: jest.fn()
};

describe('Pagination Component', () => {
  it('renders correctly', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByTestId('pagination-component')).toBeInTheDocument();
  });

  it('dropdown perpage changes pagination', async () => {
    render(<Pagination {...defaultProps} />);
    const dropdownButton = screen.getByTestId('perpage-dropdown');
    await userEvent.click(dropdownButton);
    await userEvent.click(screen.getByText('5 results per page'));
    expect(defaultProps.setPerPage).toHaveBeenCalledWith(5);
  });

  it('calls setPage with correct value on next button click', async () => {
    render(<Pagination {...defaultProps} />);
    await userEvent.click(screen.getByText('Next'));
    expect(defaultProps.setPage).toHaveBeenCalledWith(2);
  });

  it('calls setPage with correct value on previous button click', async () => {
    const pageTwoProps = { ...defaultProps, currentPage: 2 };
    render(<Pagination {...pageTwoProps} />);
    await userEvent.click(screen.getByText('Previous'));
    expect(pageTwoProps.setPage).toHaveBeenCalledWith(1);
  });

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByText('Previous').closest('li')).toHaveClass('disabled');
  });

  it('disables next button on last page', () => {
    const pageThreeProps = { ...defaultProps, currentPage: 3 };
    render(<Pagination {...pageThreeProps} />);

    expect(screen.getByText('Next').closest('li')).toHaveClass('disabled');
  });
});
