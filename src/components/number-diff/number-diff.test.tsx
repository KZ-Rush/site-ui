import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NumberDiff } from './number-diff';

describe('NumberDiff', () => {
  it('renders positive values', () => {
    render(<NumberDiff value={1250} locale="en-US" label="points" />);
    const root = screen.getByText('+1,250').closest('[data-slot="number-diff"]');
    expect(root).toHaveTextContent('+1,250 points');
    expect(root).toHaveAttribute('data-sign', 'positive');
  });

  it('renders negative values', () => {
    render(<NumberDiff value={-1250} locale="en-US" label="points" />);
    expect(screen.getByText('−1,250').closest('[data-slot="number-diff"]')).toHaveAttribute(
      'data-sign',
      'negative',
    );
  });

  it('renders zero as neutral', () => {
    render(<NumberDiff value={0} locale="en-US" />);
    expect(screen.getByText('0').closest('[data-slot="number-diff"]')).toHaveAttribute(
      'data-sign',
      'neutral',
    );
  });

  it('uses Intl formatting options', () => {
    render(
      <NumberDiff
        value={12.3456}
        locale="en-US"
        formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
      />,
    );
    expect(screen.getByText('+12.35')).toBeInTheDocument();
  });

  it.each([Number.NaN, Infinity, -Infinity])('renders fallback for %s', (value) => {
    render(<NumberDiff value={value} fallback="Unknown" />);
    expect(screen.getByText('Unknown')).toHaveAttribute('data-sign', 'invalid');
  });
});
