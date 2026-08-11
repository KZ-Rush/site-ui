import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('renders an accessible native checkbox', () => {
    render(<Checkbox>Remember me</Checkbox>);
    expect(screen.getByRole('checkbox', { name: 'Remember me' })).not.toBeChecked();
  });

  it('supports uncontrolled usage', () => {
    render(<Checkbox defaultChecked>Remember me</Checkbox>);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls native and convenience callbacks', () => {
    const onChange = vi.fn();
    const onCheckedChange = vi.fn();
    render(
      <Checkbox onChange={onChange} onCheckedChange={onCheckedChange}>
        Remember me
      </Checkbox>,
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledOnce();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('does not change while disabled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    render(
      <Checkbox disabled onCheckedChange={onCheckedChange}>
        Remember me
      </Checkbox>,
    );

    const checkbox = screen.getByRole('checkbox', {
      name: 'Remember me',
    });

    expect(checkbox).toBeDisabled();
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('forwards input props and custom class names', () => {
    render(
      <Checkbox
        className="custom-checkbox"
        inputClassName="custom-input"
        name="terms"
        value="accepted"
      >
        Accept terms
      </Checkbox>,
    );
    const input = screen.getByRole('checkbox');
    expect(input).toHaveAttribute('name', 'terms');
    expect(input).toHaveAttribute('value', 'accepted');
    expect(input).toHaveClass('rush-checkbox__input', 'custom-input');
    expect(input.closest('[data-slot="checkbox"]')).toHaveClass('rush-checkbox', 'custom-checkbox');
  });

  it('supports an indeterminate state', () => {
    render(<Checkbox indeterminate>Select all</Checkbox>);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');

    expect(checkbox).toHaveProperty('indeterminate', true);
  });

  it('updates the indeterminate state', () => {
    const { rerender } = render(<Checkbox indeterminate>Select all</Checkbox>);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toHaveProperty('indeterminate', true);

    rerender(<Checkbox indeterminate={false}>Select all</Checkbox>);

    expect(checkbox).toHaveProperty('indeterminate', false);
  });

  it('supports controlled checked state with indeterminate state', () => {
    const { rerender } = render(
      <Checkbox checked={false} indeterminate readOnly>
        Select rows
      </Checkbox>,
    );

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    expect(checkbox).toHaveProperty('indeterminate', true);

    rerender(
      <Checkbox checked indeterminate={false} readOnly>
        Select rows
      </Checkbox>,
    );

    expect(checkbox).toBeChecked();

    expect(checkbox).toHaveProperty('indeterminate', false);
  });
});
