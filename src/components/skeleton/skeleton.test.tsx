import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  it('renders a block skeleton by default', () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');

    expect(skeleton).toHaveClass(
      'rush-skeleton',
      'rush-skeleton--block',
      'rush-skeleton--animated',
    );

    expect(skeleton).toHaveAttribute('data-variant', 'block');

    expect(skeleton).toHaveAttribute('data-animated', 'true');
  });

  it('is hidden from assistive technologies', () => {
    render(<Skeleton data-testid="skeleton" />);

    expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders the circle variant', () => {
    render(<Skeleton variant="circle" data-testid="skeleton" />);

    expect(screen.getByTestId('skeleton')).toHaveClass('rush-skeleton--circle');

    expect(screen.getByTestId('skeleton')).toHaveAttribute('data-variant', 'circle');
  });

  it('can disable animation', () => {
    render(<Skeleton animated={false} data-testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');

    expect(skeleton).not.toHaveClass('rush-skeleton--animated');

    expect(skeleton).not.toHaveAttribute('data-animated');
  });

  it('forwards native props and class names', () => {
    render(
      <Skeleton
        data-testid="skeleton"
        className="custom-skeleton"
        title="Loading"
        style={{
          width: '10rem',
          height: '2rem',
        }}
      />,
    );

    const skeleton = screen.getByTestId('skeleton');

    expect(skeleton).toHaveClass('rush-skeleton', 'custom-skeleton');

    expect(skeleton).toHaveAttribute('title', 'Loading');

    expect(skeleton).toHaveStyle({
      width: '10rem',
      height: '2rem',
    });
  });
});
