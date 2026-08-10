import {
  render,
  screen,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import {
  Select,
} from './select';

function renderSelect(
  props: Partial<
    React.ComponentProps<typeof Select>
  > = {},
) {
  return render(
    <Select
      aria-label="Player"
      {...props}
    >
      <option value="">
        Select player
      </option>

      <option value="one">
        Player One
      </option>

      <option value="two">
        Player Two
      </option>
    </Select>,
  );
}

describe('Select', () => {
  it('renders a native combobox', () => {
    renderSelect();

    expect(
      screen.getByRole(
        'combobox',
        {
          name: 'Player',
        },
      ),
    ).toBeInTheDocument();
  });

  it('forwards native select props', () => {
    renderSelect({
      name: 'player',
      required: true,
    });

    const select =
      screen.getByRole('combobox');

    expect(select).toHaveAttribute(
      'name',
      'player',
    );

    expect(select).toBeRequired();
  });

  it('supports changing the selected value', async () => {
    const user = userEvent.setup();

    renderSelect();

    const select =
      screen.getByRole('combobox');

    await user.selectOptions(
      select,
      'two',
    );

    expect(select).toHaveValue(
      'two',
    );

    expect(
      screen.getByRole(
        'option',
        {
          name: 'Player Two',
        },
      ),
    ).toBeChecked();
  });

  it('calls native onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderSelect({
      onChange,
    });

    await user.selectOptions(
      screen.getByRole(
        'combobox',
      ),
      'one',
    );

    expect(onChange).toHaveBeenCalled();
  });

  it('supports disabled state', () => {
    renderSelect({
      disabled: true,
    });

    const select =
      screen.getByRole('combobox');

    expect(select).toBeDisabled();

    expect(
      select.closest(
        '[data-slot="select"]',
      ),
    ).toHaveAttribute(
      'data-disabled',
      'true',
    );
  });

  it('supports invalid state', () => {
    renderSelect({
      invalid: true,
    });

    const select =
      screen.getByRole('combobox');

    expect(select).toHaveAttribute(
      'aria-invalid',
      'true',
    );

    expect(
      select.closest(
        '[data-slot="select"]',
      ),
    ).toHaveAttribute(
      'data-invalid',
      'true',
    );
  });

  it('preserves explicitly supplied aria-invalid', () => {
    renderSelect({
      invalid: true,
      'aria-invalid': 'grammar',
    });

    expect(
      screen.getByRole('combobox'),
    ).toHaveAttribute(
      'aria-invalid',
      'grammar',
    );
  });

  it('applies the requested size', () => {
    renderSelect({
      size: 'lg',
    });

    expect(
      screen
        .getByRole('combobox')
        .closest(
          '[data-slot="select"]',
        ),
    ).toHaveClass(
      'rush-select--lg',
    );
  });

  it('renders the indicator', () => {
    renderSelect();

    const root =
      screen
        .getByRole('combobox')
        .closest(
          '[data-slot="select"]',
        );

    expect(
      root?.querySelector(
        '[data-slot="select-indicator"]',
      ),
    ).toBeInTheDocument();
  });

  it('applies root and control class names separately', () => {
    renderSelect({
      className: 'custom-root',
      selectClassName:
        'custom-control',
    });

    const select =
      screen.getByRole('combobox');

    expect(
      select.closest(
        '[data-slot="select"]',
      ),
    ).toHaveClass(
      'rush-select',
      'custom-root',
    );

    expect(select).toHaveClass(
      'rush-select__control',
      'custom-control',
    );
  });
});