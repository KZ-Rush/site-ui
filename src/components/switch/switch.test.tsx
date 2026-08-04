import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './switch';

describe('Switch', () => {
  it('renders an accessible switch', () => {
    render(<Switch onLabel="Notifications" />);
    expect(screen.getByRole('switch', { name: 'Notifications' })).not.toBeChecked();
  });

  it('supports uncontrolled usage', () => {
    render(<Switch defaultChecked onLabel="Notifications" />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('calls onCheckedChange with state and event', () => {
    const onCheckedChange = vi.fn();
    render(<Switch onLabel="Notifications" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.any(Object));
  });

  it('does not change while disabled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    render(
      <Switch
        disabled
        onLabel="Notifications"
        onCheckedChange={onCheckedChange}
      />,
    );

    const switchElement = screen.getByRole('switch', {
      name: 'Notifications',
    });

    expect(switchElement).toBeDisabled();
    expect(switchElement).not.toBeChecked();

    await user.click(switchElement);

    expect(switchElement).not.toBeChecked();
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('applies always-active styling without changing state', () => {
    render(<Switch alwaysActive aria-label="Active appearance" />);
    const input = screen.getByRole('switch');
    expect(input.closest('[data-slot="switch"]')).toHaveAttribute('data-always-active', 'true');
    expect(input).not.toBeChecked();
  });
});
