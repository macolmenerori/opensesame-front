import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

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

  it('dropdown perpage changes pagination', () => {
    render(<Pagination {...defaultProps} />);
    const dropdownButton = screen.getByTestId('perpage-dropdown');
    fireEvent.click(dropdownButton);
    fireEvent.click(screen.getByText('5 results per page'));
    expect(defaultProps.setPerPage).toHaveBeenCalledWith(5);
  });

  it('calls setPage with correct value on next button click', () => {
    render(<Pagination {...defaultProps} />);
    fireEvent.click(screen.getByText('Next'));
    expect(defaultProps.setPage).toHaveBeenCalledWith(2);
  });

  it('calls setPage with correct value on previous button click', () => {
    const pageTwoProps = { ...defaultProps, currentPage: 2 };
    render(<Pagination {...pageTwoProps} />);
    fireEvent.click(screen.getByText('Previous'));
    expect(pageTwoProps.setPage).toHaveBeenCalledWith(1);
  });

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText('Previous').closest('li')).toHaveClass('disabled');
  });

  it('disables next button on last page', () => {
    const pageThreeProps = { ...defaultProps, currentPage: 3 };
    render(<Pagination {...pageThreeProps} />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText('Next').closest('li')).toHaveClass('disabled');
  });
});
