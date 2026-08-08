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
  SidebarNavigation,
  SidebarNavigationGroup,
  SidebarNavigationItem,
  SidebarNavigationSeparator,
} from './sidebar-navigation';

describe('SidebarNavigation', () => {
  it('renders an accessible navigation region', () => {
    render(
      <SidebarNavigation aria-label="Main navigation">
        <SidebarNavigationItem href="/dashboard">
          Dashboard
        </SidebarNavigationItem>
      </SidebarNavigation>,
    );

    expect(
      screen.getByRole('navigation', {
        name: 'Main navigation',
      }),
    ).toBeInTheDocument();
  });

  it('renders a link item', () => {
    render(
      <SidebarNavigation>
        <SidebarNavigationItem
          href="/records"
        >
          Records
        </SidebarNavigationItem>
      </SidebarNavigation>,
    );

    expect(
      screen.getByRole('link', {
        name: 'Records',
      }),
    ).toHaveAttribute(
      'href',
      '/records',
    );
  });

  it('renders a button item when href is omitted', () => {
    render(
      <SidebarNavigation>
        <SidebarNavigationItem>
          Settings
        </SidebarNavigationItem>
      </SidebarNavigation>,
    );

    expect(
      screen.getByRole('button', {
        name: 'Settings',
      }),
    ).toHaveAttribute(
      'type',
      'button',
    );
  });

  it('marks active links as the current page', () => {
    render(
      <SidebarNavigation>
        <SidebarNavigationItem
          href="/dashboard"
          active
        >
          Dashboard
        </SidebarNavigationItem>
      </SidebarNavigation>,
    );

    expect(
      screen.getByRole('link', {
        name: 'Dashboard',
      }),
    ).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('marks active items visually', () => {
    render(
      <SidebarNavigation>
        <SidebarNavigationItem
          active
        >
          Settings
        </SidebarNavigationItem>
      </SidebarNavigation>,
    );

    expect(
      screen.getByRole('button', {
        name: 'Settings',
      }),
    ).toHaveClass(
      'rush-sidebar-navigation__item--active',
    );
  });

  it('prevents disabled link interaction', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <SidebarNavigation>
        <SidebarNavigationItem
          href="/records"
          disabled
          onClick={onClick}
        >
          Records
        </SidebarNavigationItem>
      </SidebarNavigation>,
    );

    const link = screen
      .getByText('Records')
      .closest('a');

    expect(link).toBeInTheDocument();

    if (!link) {
      return;
    }

    expect(link).not.toHaveAttribute('href');

    expect(link).toHaveAttribute(
      'aria-disabled',
      'true',
    );

    expect(link).toHaveAttribute(
      'tabindex',
      '-1',
    );

    await user.click(link);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('uses native disabled behavior for button items', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <SidebarNavigation>
        <SidebarNavigationItem
          disabled
          onClick={onClick}
        >
          Settings
        </SidebarNavigationItem>
      </SidebarNavigation>,
    );

    const button = screen.getByRole(
      'button',
      {
        name: 'Settings',
      },
    );

    expect(button).toBeDisabled();

    await user.click(button);

    expect(
      onClick,
    ).not.toHaveBeenCalled();
  });

  it('calls button item onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <SidebarNavigation>
        <SidebarNavigationItem
          onClick={onClick}
        >
          Settings
        </SidebarNavigationItem>
      </SidebarNavigation>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Settings',
      }),
    );

    expect(
      onClick,
    ).toHaveBeenCalledOnce();
  });

  it('keeps labels accessible in collapsed mode', () => {
    render(
      <SidebarNavigation
        collapsed
        aria-label="Main navigation"
      >
        <SidebarNavigationItem href="/records">
          Records
        </SidebarNavigationItem>
      </SidebarNavigation>,
    );

    expect(
      screen.getByRole('link', {
        name: 'Records',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Records'),
    ).toHaveClass(
      'rush-sidebar-navigation__item-label--collapsed',
    );
  });

  it('renders group labels', () => {
    render(
      <SidebarNavigation>
        <SidebarNavigationGroup label="Administration">
          <SidebarNavigationItem>
            Users
          </SidebarNavigationItem>
        </SidebarNavigationGroup>
      </SidebarNavigation>,
    );

    expect(
      screen.getByText('Administration'),
    ).toBeInTheDocument();
  });

  it('renders a separator', () => {
    render(
      <SidebarNavigation>
        <SidebarNavigationItem>
          Dashboard
        </SidebarNavigationItem>

        <SidebarNavigationSeparator
          data-testid="separator"
        />

        <SidebarNavigationItem>
          Settings
        </SidebarNavigationItem>
      </SidebarNavigation>,
    );

    expect(
      screen.getByTestId('separator'),
    ).toHaveClass(
      'rush-sidebar-navigation__separator',
    );
  });

  it('forwards native navigation props', () => {
    render(
      <SidebarNavigation
        aria-label="Administration"
        className="custom-navigation"
        title="Admin menu"
      >
        <SidebarNavigationItem>
          Users
        </SidebarNavigationItem>
      </SidebarNavigation>,
    );

    const navigation =
      screen.getByRole(
        'navigation',
        {
          name: 'Administration',
        },
      );

    expect(navigation).toHaveClass(
      'rush-sidebar-navigation',
      'custom-navigation',
    );

    expect(navigation).toHaveAttribute(
      'title',
      'Admin menu',
    );
  });
});