import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';

import PermissionsModal from './PermissionsModal';

describe('PermissionsModal', () => {
  const props = {
    permissionsModalUser: 'drbrown@test.com'
  };

  it('renders loading spinner when loading', () => {
    render(<PermissionsModal {...props} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message on error', async () => {
    const propsError = { ...props, permissionsModalUser: 'wronguser@test.com' };
    render(<PermissionsModal {...propsError} />);
    await waitFor(() => {
      expect(screen.getByText('Error loading permissions for this user.')).toBeInTheDocument();
    });
  });

  it('renders no permissions message when no permissions', async () => {
    const noPermissionsProps = { ...props, permissionsModalUser: 'nopermission@test.com' };
    render(<PermissionsModal {...noPermissionsProps} />);
    await waitFor(() => {
      expect(
        screen.getByText('This user does not have any permissions assigned.')
      ).toBeInTheDocument();
    });
  });

  it('renders permissions list when permissions are present', async () => {
    render(<PermissionsModal {...props} />);
    await waitFor(() => {
      expect(screen.getByText('Permission1, Permission2')).toBeInTheDocument();
    });
  });
});
