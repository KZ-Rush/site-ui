import { createRef } from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Description } from './description';

describe('Description', () => {
  it('renders supporting text as a styled paragraph', () => {
    render(<Description>Additional context</Description>);

    const description = screen.getByText('Additional context');

    expect(description.tagName).toBe('P');
    expect(description).toHaveClass('rush-description');
    expect(description).toHaveAttribute('data-slot', 'description');
  });

  it('forwards native paragraph props and merges consumer classes', () => {
    render(
      <Description id="details" className="custom-description">
        Additional context
      </Description>,
    );

    expect(screen.getByText('Additional context')).toHaveAttribute('id', 'details');
    expect(screen.getByText('Additional context')).toHaveClass(
      'rush-description',
      'custom-description',
    );
  });

  it('forwards a ref to the paragraph', () => {
    const ref = createRef<HTMLParagraphElement>();

    render(<Description ref={ref}>Additional context</Description>);

    expect(ref.current).toBe(screen.getByText('Additional context'));
  });
});
