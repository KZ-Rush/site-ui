import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import {
  Dropdown,
  DropdownCheckboxItem,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from './dropdown';

function renderDropdown() {
  return render(
    <Dropdown>
      <DropdownTrigger>
        Open menu
      </DropdownTrigger>

      <DropdownContent>
        <DropdownItem>
          Profile
        </DropdownItem>

        <DropdownItem>
          Settings
        </DropdownItem>
      </DropdownContent>
    </Dropdown>,
  );
}

describe('Dropdown', () => {
  it('opens the menu', async () => {
    const user =
      userEvent.setup();

    renderDropdown();

    await user.click(
      screen.getByRole(
        'button',
        {
          name: 'Open menu',
        },
      ),
    );

    expect(
      screen.getByRole('menu'),
    ).toBeInTheDocument();
  });

  it('closes after selecting an item', async () => {
    const user =
      userEvent.setup();

    const onSelect =
      vi.fn();

    render(
      <Dropdown>
        <DropdownTrigger>
          Open menu
        </DropdownTrigger>

        <DropdownContent>
          <DropdownItem
            onSelect={onSelect}
          >
            Settings
          </DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    await user.click(
      screen.getByRole(
        'button',
        {
          name: 'Open menu',
        },
      ),
    );

    await user.click(
      screen.getByRole(
        'menuitem',
        {
          name: 'Settings',
        },
      ),
    );

    expect(onSelect)
      .toHaveBeenCalledOnce();

    expect(
      screen.queryByRole('menu'),
    ).not.toBeInTheDocument();
  });

  it('keeps the menu open when a checkbox item is toggled', async () => {
    const user =
      userEvent.setup();

    const onCheckedChange =
      vi.fn();

    render(
      <Dropdown>
        <DropdownTrigger>
          Columns
        </DropdownTrigger>

        <DropdownContent>
          <DropdownCheckboxItem
            checked={false}
            onCheckedChange={
              onCheckedChange
            }
          >
            Player
          </DropdownCheckboxItem>
        </DropdownContent>
      </Dropdown>,
    );

    await user.click(
      screen.getByRole(
        'button',
        {
          name: 'Columns',
        },
      ),
    );

    await user.click(
      screen.getByRole(
        'menuitemcheckbox',
        {
          name: 'Player',
        },
      ),
    );

    expect(
      onCheckedChange,
    ).toHaveBeenCalledWith(true);

    expect(
      screen.getByRole('menu'),
    ).toBeInTheDocument();
  });

  it('closes on Escape and restores trigger focus', async () => {
    const user =
      userEvent.setup();

    renderDropdown();

    const trigger =
      screen.getByRole(
        'button',
        {
          name: 'Open menu',
        },
      );

    await user.click(trigger);

    await user.keyboard(
      '{Escape}',
    );

    expect(
      screen.queryByRole('menu'),
    ).not.toBeInTheDocument();

    expect(trigger).toHaveFocus();
  });

  it('closes on outside click', async () => {
    const user =
      userEvent.setup();

    render(
      <>
        <Dropdown>
          <DropdownTrigger>
            Open menu
          </DropdownTrigger>

          <DropdownContent>
            <DropdownItem>
              Profile
            </DropdownItem>
          </DropdownContent>
        </Dropdown>

        <button>
          Outside
        </button>
      </>,
    );

    await user.click(
      screen.getByRole(
        'button',
        {
          name: 'Open menu',
        },
      ),
    );

    expect(
      screen.getByRole('menu'),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole(
        'button',
        {
          name: 'Outside',
        },
      ),
    );

    expect(
      screen.queryByRole('menu'),
    ).not.toBeInTheDocument();
  });

  it('renders separators', async () => {
    const user =
      userEvent.setup();

    render(
      <Dropdown>
        <DropdownTrigger>
          Open
        </DropdownTrigger>

        <DropdownContent>
          <DropdownItem>
            First
          </DropdownItem>

          <DropdownSeparator />

          <DropdownItem>
            Second
          </DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    await user.click(
      screen.getByRole(
        'button',
        {
          name: 'Open',
        },
      ),
    );

    expect(
      screen.getByRole(
        'separator',
      ),
    ).toBeInTheDocument();
  });

  it('does not select disabled items', async () => {
    const user =
      userEvent.setup();

    const onSelect =
      vi.fn();

    render(
      <Dropdown defaultOpen>
        <DropdownTrigger>
          Open
        </DropdownTrigger>

        <DropdownContent>
          <DropdownItem
            disabled
            onSelect={onSelect}
          >
            Disabled
          </DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    await user.click(
      screen.getByRole(
        'menuitem',
        {
          name: 'Disabled',
        },
      ),
    );

    expect(
      onSelect,
    ).not.toHaveBeenCalled();

    expect(
      screen.getByRole('menu'),
    ).toBeInTheDocument();
  });

  it('supports Button props on the trigger', () => {
    render(
      <Dropdown>
        <DropdownTrigger
          variant="outline"
          size="sm"
        >
          Actions
        </DropdownTrigger>

        <DropdownContent>
          <DropdownItem>
            Edit
          </DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    const trigger =
      screen.getByRole(
        'button',
        {
          name: 'Actions',
        },
      );

    expect(trigger).toHaveClass(
      'rush-button',
    );
  });

  it('supports a custom trigger renderer', async () => {
    const user =
      userEvent.setup();

    render(
      <Dropdown>
        <DropdownTrigger
          render={(
            triggerProps,
          ) => (
            <button
              {...triggerProps}
              type="button"
            >
              Custom trigger
            </button>
          )}
        />

        <DropdownContent>
          <DropdownItem>
            Profile
          </DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    await user.click(
      screen.getByRole(
        'button',
        {
          name: 'Custom trigger',
        },
      ),
    );

    expect(
      screen.getByRole('menu'),
    ).toBeInTheDocument();
  });

  it('restores focus to a custom trigger after Escape', async () => {
    const user =
      userEvent.setup();

    render(
      <Dropdown>
        <DropdownTrigger
          render={(
            triggerProps,
          ) => (
            <button
              {...triggerProps}
              type="button"
            >
              Custom trigger
            </button>
          )}
        />

        <DropdownContent>
          <DropdownItem>
            Profile
          </DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    const trigger =
      screen.getByRole(
        'button',
        {
          name: 'Custom trigger',
        },
      );

    await user.click(trigger);

    await user.keyboard(
      '{Escape}',
    );

    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });
});