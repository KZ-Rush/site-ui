import { createRef } from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Link } from './link';

describe('Link', () => {
  it('renders a styled native anchor', () => {
    render(<Link href="/records">View records</Link>);

    expect(screen.getByRole('link', { name: 'View records' })).toHaveAttribute('href', '/records');
    expect(screen.getByRole('link', { name: 'View records' })).toHaveClass('rush-link');
    expect(screen.getByRole('link', { name: 'View records' })).toHaveAttribute('data-slot', 'link');
  });

  it('forwards native anchor props and merges consumer classes', () => {
    render(
      <Link href="https://kz-rush.ru" target="_blank" rel="noreferrer" className="custom-link">
        KZ-Rush
      </Link>,
    );

    expect(screen.getByRole('link', { name: 'KZ-Rush' })).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link', { name: 'KZ-Rush' })).toHaveAttribute('rel', 'noreferrer');
    expect(screen.getByRole('link', { name: 'KZ-Rush' })).toHaveClass('rush-link', 'custom-link');
  });

  it('forwards a ref to the anchor', () => {
    const ref = createRef<HTMLAnchorElement>();

    render(
      <Link ref={ref} href="/maps">
        Maps
      </Link>,
    );

    expect(ref.current).toBe(screen.getByRole('link', { name: 'Maps' }));
  });
});
