import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import { Input } from './input';

describe('Input', () => {
  it('renders a native input', () => {
    render(<Input aria-label="Player name" />);

    expect(
      screen.getByRole('textbox', {
        name: 'Player name',
      }),
    ).toBeInTheDocument();
  });

  it('forwards native input props', () => {
    render(<Input aria-label="Player name" name="player" placeholder="PlayerOne" maxLength={32} />);

    const input = screen.getByRole('textbox', {
      name: 'Player name',
    });

    expect(input).toHaveAttribute('name', 'player');

    expect(input).toHaveAttribute('placeholder', 'PlayerOne');

    expect(input).toHaveAttribute('maxlength', '32');
  });

  it('supports controlled values', async () => {
    const onChange = vi.fn();

    render(<Input aria-label="Player name" value="Alex" onChange={onChange} readOnly />);

    expect(screen.getByRole('textbox')).toHaveValue('Alex');
  });

  it('calls native onChange', async () => {
    const user = userEvent.setup();

    const onChange = vi.fn();

    render(<Input aria-label="Player name" onChange={onChange} />);

    await user.type(screen.getByRole('textbox'), 'Alex');

    expect(onChange).toHaveBeenCalled();
  });

  it('supports disabled state', () => {
    render(<Input aria-label="Player name" disabled />);

    expect(screen.getByRole('textbox')).toBeDisabled();

    expect(screen.getByRole('textbox').closest('[data-slot="input"]')).toHaveAttribute(
      'data-disabled',
      'true',
    );
  });

  it('supports invalid state', () => {
    render(<Input aria-label="Player name" invalid />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('aria-invalid', 'true');

    expect(input.closest('[data-slot="input"]')).toHaveAttribute('data-invalid', 'true');
  });

  it('preserves explicitly supplied aria-invalid', () => {
    render(<Input aria-label="Player name" invalid aria-invalid="grammar" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'grammar');
  });

  it('applies the requested size', () => {
    render(<Input aria-label="Player name" size="lg" />);

    expect(screen.getByRole('textbox').closest('[data-slot="input"]')).toHaveClass(
      'rush-input--lg',
    );
  });

  it('renders a start adornment', () => {
    render(<Input aria-label="Search" startAdornment={<span data-testid="start">Search</span>} />);

    expect(screen.getByTestId('start')).toBeInTheDocument();

    expect(
      screen.getByTestId('start').closest('[data-slot="input-start-adornment"]'),
    ).toBeInTheDocument();
  });

  it('renders an end adornment', () => {
    render(<Input aria-label="Filename" endAdornment={<span data-testid="end">.dem</span>} />);

    expect(screen.getByTestId('end')).toBeInTheDocument();
  });

  it('applies root and input class names separately', () => {
    render(<Input aria-label="Player" className="custom-root" inputClassName="custom-control" />);

    const input = screen.getByRole('textbox');

    expect(input.closest('[data-slot="input"]')).toHaveClass('rush-input', 'custom-root');

    expect(input).toHaveClass('rush-input__control', 'custom-control');
  });
});
