import { createRef } from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CountryFlag } from './country-flag';

describe('CountryFlag', () => {
  it('renders a supported flag as decorative by default', () => {
    const { container } = render(<CountryFlag code="kz" />);

    const flag = container.firstElementChild;

    expect(flag).toHaveClass('rush-country-flag');
    expect(flag).toHaveAttribute('aria-hidden', 'true');
    expect(flag).toHaveAttribute('data-country-code', 'kz');
    expect(flag).toHaveAttribute('data-slot', 'country-flag');
  });

  it('normalizes case and common aliases', () => {
    const { rerender } = render(<CountryFlag code=" KZ " label="Kazakhstan" />);

    expect(screen.getByRole('img', { name: 'Kazakhstan' })).toHaveAttribute(
      'data-country-code',
      'kz',
    );

    rerender(<CountryFlag code="UK" label="United Kingdom" />);

    expect(screen.getByRole('img', { name: 'United Kingdom' })).toHaveAttribute(
      'data-country-code',
      'gb',
    );
  });

  it('uses the unknown flag for unsupported values by default', () => {
    const { container } = render(<CountryFlag code="not-supported" />);

    expect(container.firstElementChild).toHaveAttribute('data-country-code', 'unk');
  });

  it('can omit unsupported values', () => {
    const { container } = render(<CountryFlag code="not-supported" fallback="none" />);

    expect(container).toBeEmptyDOMElement();
  });

  it('uses accessible image semantics when a label is supplied', () => {
    render(<CountryFlag code="ca" label="Canada" />);

    const flag = screen.getByRole('img', { name: 'Canada' });

    expect(flag).not.toHaveAttribute('aria-hidden');
    expect(flag).toHaveAttribute('aria-label', 'Canada');
  });

  it('forwards native props, consumer classes, styles, and refs', () => {
    const ref = createRef<HTMLSpanElement>();

    const { container } = render(
      <CountryFlag
        ref={ref}
        code="ch"
        className="custom-flag"
        title="Switzerland"
        style={{ marginInlineEnd: '4px' }}
      />,
    );

    const flag = container.firstElementChild;

    expect(ref.current).toBe(flag);
    expect(flag).toHaveClass('rush-country-flag', 'custom-flag');
    expect(flag).toHaveAttribute('title', 'Switzerland');
    expect(flag).toHaveStyle({ marginInlineEnd: '4px' });
    expect(flag).toHaveStyle(`
      --rush-country-flag-height: 11px;
      --rush-country-flag-position-y: -3254px;
      --rush-country-flag-width: 11px;
    `);
  });
});
