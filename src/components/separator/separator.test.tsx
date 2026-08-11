import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { Separator } from './separator';

describe('Separator', () => {
  it('renders a semantic separator by default', () => {
    render(<Separator />);

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('defaults to horizontal orientation', () => {
    render(<Separator />);

    const separator = screen.getByRole('separator');

    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');

    expect(separator).toHaveClass('rush-separator--horizontal');
  });

  it('supports vertical orientation', () => {
    render(<Separator orientation="vertical" />);

    const separator = screen.getByRole('separator');

    expect(separator).toHaveAttribute('aria-orientation', 'vertical');

    expect(separator).toHaveClass('rush-separator--vertical');
  });

  it('can be decorative', () => {
    render(<Separator decorative data-testid="separator" />);

    const separator = screen.getByTestId('separator');

    expect(separator).not.toHaveAttribute('role');

    expect(separator).toHaveAttribute('aria-hidden', 'true');
  });

  it('forwards native div props', () => {
    render(<Separator id="section-separator" data-testid="separator" />);

    expect(screen.getByTestId('separator')).toHaveAttribute('id', 'section-separator');
  });

  it('applies a custom class name', () => {
    render(<Separator className="custom-separator" />);

    expect(screen.getByRole('separator')).toHaveClass('rush-separator', 'custom-separator');
  });
});
