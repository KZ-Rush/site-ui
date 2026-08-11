import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders a span by default', () => {
    render(<Badge>Approved</Badge>);
    expect(screen.getByText('Approved').tagName).toBe('SPAN');
  });

  it.each([
    'default',
    'secondary',
    'success',
    'warning',
    'destructive',
    'info',
    'notice',
    'outline',
  ] as const)('renders the %s variant', (variant) => {
    render(<Badge variant={variant}>Status</Badge>);
    expect(screen.getByText('Status')).toHaveClass(`rush-badge--variant-${variant}`);
    expect(screen.getByText('Status')).toHaveAttribute('data-variant', variant);
  });

  it('renders an anchor when href is supplied', () => {
    render(
      <Badge href="/records" target="_blank">
        Records
      </Badge>,
    );
    const link = screen.getByRole('link', { name: 'Records' });
    expect(link).toHaveAttribute('href', '/records');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('forwards native span props and merges class names', () => {
    render(
      <Badge title="Demo status" className="custom-badge">
        Approved
      </Badge>,
    );
    expect(screen.getByTitle('Demo status')).toHaveClass('rush-badge', 'custom-badge');
  });
});
