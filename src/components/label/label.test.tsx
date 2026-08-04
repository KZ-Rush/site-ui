import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Label } from './label';

describe('Label', () => {
  it('associates itself with a control', () => {
    render(<><Label htmlFor="username">Username</Label><input id="username" /></>);
    expect(screen.getByLabelText('Username')).toHaveAttribute('id', 'username');
  });

  it('supports disabled appearance', () => {
    render(<Label disabled data-testid="label">Username</Label>);
    expect(screen.getByTestId('label')).toHaveAttribute('data-disabled', 'true');
  });

  it('forwards native props and merges class names', () => {
    render(<Label data-testid="label" className="custom-label" title="Public name">Username</Label>);
    expect(screen.getByTestId('label')).toHaveClass('rush-label', 'custom-label');
    expect(screen.getByTestId('label')).toHaveAttribute('title', 'Public name');
  });
});
