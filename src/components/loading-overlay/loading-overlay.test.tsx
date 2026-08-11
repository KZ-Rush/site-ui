import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { LoadingOverlay } from './loading-overlay';

describe('LoadingOverlay', () => {
  it('renders the default spinner', () => {
    render(<LoadingOverlay />);

    expect(
      screen.getByRole('status', {
        name: 'Loading',
      }),
    ).toBeInTheDocument();
  });

  it('passes the label to the default spinner', () => {
    render(<LoadingOverlay label="Loading records" />);

    expect(
      screen.getByRole('status', {
        name: 'Loading records',
      }),
    ).toBeInTheDocument();
  });

  it('passes the requested size to the default spinner', () => {
    render(<LoadingOverlay spinnerSize="sm" />);

    expect(screen.getByRole('status')).toHaveClass('rush-spinner--sm');
  });

  it('uses fixed positioning by default', () => {
    render(<LoadingOverlay data-testid="overlay" />);

    expect(screen.getByTestId('overlay')).toHaveClass(
      'rush-loading-overlay',
      'rush-loading-overlay--fixed',
    );

    expect(screen.getByTestId('overlay')).toHaveAttribute('data-position', 'fixed');
  });

  it('supports absolute positioning', () => {
    render(<LoadingOverlay position="absolute" data-testid="overlay" />);

    expect(screen.getByTestId('overlay')).toHaveClass('rush-loading-overlay--absolute');

    expect(screen.getByTestId('overlay')).toHaveAttribute('data-position', 'absolute');
  });

  it('renders custom content instead of the default spinner', () => {
    render(
      <LoadingOverlay>
        <span>Custom loading content</span>
      </LoadingOverlay>,
    );

    expect(screen.getByText('Custom loading content')).toBeInTheDocument();

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('forwards native div props', () => {
    render(
      <LoadingOverlay
        id="records-loader"
        aria-label="Records loading overlay"
        data-testid="overlay"
      />,
    );

    const overlay = screen.getByTestId('overlay');

    expect(overlay).toHaveAttribute('id', 'records-loader');

    expect(overlay).toHaveAttribute('aria-label', 'Records loading overlay');
  });

  it('applies a custom class name', () => {
    render(<LoadingOverlay className="custom-overlay" data-testid="overlay" />);

    expect(screen.getByTestId('overlay')).toHaveClass('rush-loading-overlay', 'custom-overlay');
  });
});
