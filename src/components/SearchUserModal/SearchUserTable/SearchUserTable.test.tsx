import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { User } from '../../../common/types/User.types';
import { allusers } from '../../../mocks';

import SearchUserTable from './SearchUserTable';
import { SearchUserTableProps } from './SearchUserTable.types';

const mockUsers = allusers.slice(2, 4);

const mockSetUserDetailsModalUser = jest.fn();

const renderComponent = (props: Partial<SearchUserTableProps> = {}) => {
  const defaultProps: SearchUserTableProps = {
    users: [],
    setUserDetailsModalUser: mockSetUserDetailsModalUser
  };
  return render(<SearchUserTable {...defaultProps} {...props} />);
};

describe('SearchUserTable', () => {
  it('should display a message when no users are found', () => {
    renderComponent();
    expect(screen.getByText('Please introduce the name of the user')).toBeInTheDocument();
  });

  it('should render a table with user data when users are provided', () => {
    renderComponent({ users: mockUsers as User[] });
    expect(screen.getByText('Marty McFly')).toBeInTheDocument();
    expect(screen.getByText('marty@test.com')).toBeInTheDocument();
    expect(screen.getByText('Dr Brown')).toBeInTheDocument();
    expect(screen.getByText('drbrown@test.com')).toBeInTheDocument();
  });

  it('should call setUserDetailsModalUser with the correct user when "User details" button is clicked', async () => {
    renderComponent({ users: mockUsers as User[] });
    const userDetailsButtons = screen.getAllByText('User details');
    await userEvent.click(userDetailsButtons[0]);
    expect(mockSetUserDetailsModalUser).toHaveBeenCalledWith(mockUsers[0]);
  });
});
