import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { Spinner } from './spinner';

describe('Spinner', () => {
  it('renders a status', () => {
    render(<Spinner />);

    expect(
      screen.getByRole('status', {
        name: 'Loading',
      }),
    ).toBeInTheDocument();
  });

  it('supports a custom accessible label', () => {
    render(<Spinner label="Saving record" />);

    expect(
      screen.getByRole('status', {
        name: 'Saving record',
      }),
    ).toBeInTheDocument();
  });

  it('uses the default size', () => {
    render(<Spinner />);

    expect(screen.getByRole('status')).toHaveClass('rush-spinner', 'rush-spinner--default');
  });

  it('supports size variants', () => {
    render(<Spinner size="lg" />);

    expect(screen.getByRole('status')).toHaveClass('rush-spinner--lg');

    expect(screen.getByRole('status')).toHaveAttribute('data-size', 'lg');
  });

  it('forwards native span props', () => {
    render(<Spinner id="record-loader" data-testid="spinner" />);

    expect(screen.getByTestId('spinner')).toHaveAttribute('id', 'record-loader');
  });

  it('applies a custom class name', () => {
    render(<Spinner className="custom-spinner" />);

    expect(screen.getByRole('status')).toHaveClass('rush-spinner', 'custom-spinner');
  });
});
