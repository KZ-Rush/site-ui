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
  DashboardLayout,
  DashboardMobileSidebarToggle,
  DashboardSidebarToggle,
} from './dashboard-layout';

function renderLayout({
  sidebarCollapsed,
  defaultSidebarCollapsed,
  onSidebarCollapsedChange,
}: {
  sidebarCollapsed?: boolean;
  defaultSidebarCollapsed?: boolean;
  onSidebarCollapsedChange?: (
    collapsed: boolean,
  ) => void;
} = {}) {
  return render(
    <DashboardLayout
      sidebar={(
        <nav>
          Navigation
        </nav>
      )}
      header={(
        <>
          <DashboardSidebarToggle />

          Header
        </>
      )}
      sidebarCollapsed={
        sidebarCollapsed
      }
      defaultSidebarCollapsed={
        defaultSidebarCollapsed
      }
      onSidebarCollapsedChange={
        onSidebarCollapsedChange
      }
    >
      Main content
    </DashboardLayout>,
  );
}

describe('DashboardLayout', () => {
  it('renders semantic layout regions', () => {
    renderLayout();

    expect(
      screen.getByRole('complementary', {
        name: 'Primary navigation',
      }),
    ).toHaveTextContent('Navigation');

    expect(
      screen.getByRole('banner'),
    ).toHaveTextContent('Header');

    expect(
      screen.getByRole('main'),
    ).toHaveTextContent('Main content');
  });

  it('supports uncontrolled sidebar state', async () => {
    const user = userEvent.setup();

    renderLayout();

    const layout = screen
      .getByRole('main')
      .closest(
        '[data-slot="dashboard-layout"]',
      );

    const toggle = screen.getByRole(
      'button',
      {
        name: 'Collapse sidebar',
      },
    );

    expect(layout).not.toHaveAttribute(
      'data-collapsed',
    );

    expect(toggle).toHaveAttribute(
      'aria-expanded',
      'true',
    );

    await user.click(toggle);

    expect(layout).toHaveAttribute(
      'data-collapsed',
      'true',
    );

    expect(
      screen.getByRole('button', {
        name: 'Expand sidebar',
      }),
    ).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('supports an initially collapsed sidebar', () => {
    renderLayout({
      defaultSidebarCollapsed: true,
    });

    expect(
      screen
        .getByRole('main')
        .closest(
          '[data-slot="dashboard-layout"]',
        ),
    ).toHaveAttribute(
      'data-collapsed',
      'true',
    );
  });

  it('notifies controlled consumers', async () => {
    const user = userEvent.setup();

    const onSidebarCollapsedChange =
      vi.fn();

    renderLayout({
      sidebarCollapsed: false,
      onSidebarCollapsedChange,
    });

    await user.click(
      screen.getByRole('button', {
        name: 'Collapse sidebar',
      }),
    );

    expect(
      onSidebarCollapsedChange,
    ).toHaveBeenCalledWith(true);

    /*
     * Controlled state remains unchanged until the
     * consumer supplies a new prop value.
     */
    expect(
      screen
        .getByRole('main')
        .closest(
          '[data-slot="dashboard-layout"]',
        ),
    ).not.toHaveAttribute(
      'data-collapsed',
    );
  });

  it('connects the toggle to the sidebar', () => {
    renderLayout();

    const sidebar = screen.getByRole(
      'complementary',
      {
        name: 'Primary navigation',
      },
    );

    const toggle = screen.getByRole(
      'button',
      {
        name: 'Collapse sidebar',
      },
    );

    expect(toggle).toHaveAttribute(
      'aria-controls',
      sidebar.id,
    );
  });

  it('does not toggle when click is prevented', async () => {
    const user = userEvent.setup();

    render(
      <DashboardLayout
        sidebar="Navigation"
        header={(
          <DashboardSidebarToggle
            onClick={(event) => {
              event.preventDefault();
            }}
          />
        )}
      >
        Main content
      </DashboardLayout>,
    );

    await user.click(
      screen.getByRole('button'),
    );

    expect(
      screen
        .getByRole('main')
        .closest(
          '[data-slot="dashboard-layout"]',
        ),
    ).not.toHaveAttribute(
      'data-collapsed',
    );
  });

  it('forwards native root properties', () => {
    render(
      <DashboardLayout
        sidebar="Navigation"
        className="custom-layout"
        title="Application dashboard"
      >
        Main content
      </DashboardLayout>,
    );

    const layout = screen
      .getByRole('main')
      .closest(
        '[data-slot="dashboard-layout"]',
      );

    expect(layout).toHaveClass(
      'rush-dashboard-layout',
      'custom-layout',
    );

    expect(layout).toHaveAttribute(
      'title',
      'Application dashboard',
    );
  });

  it('throws when the toggle is outside the layout', () => {
    expect(() => {
      render(
        <DashboardSidebarToggle />,
      );
    }).toThrow(
      'DashboardSidebarToggle must be used inside DashboardLayout.',
    );
  });

  it('does not emit duplicate state changes', async () => {
    const user = userEvent.setup();

    const onSidebarCollapsedChange =
      vi.fn();

    render(
      <DashboardLayout
        sidebar={(
          <DashboardSidebarToggle />
        )}
        sidebarCollapsed
        onSidebarCollapsedChange={
          onSidebarCollapsedChange
        }
      >
        Main
      </DashboardLayout>,
    );

    /*
    * The toggle requests false, which differs from
    * current true.
    */
    await user.click(
      screen.getByRole('button'),
    );

    expect(
      onSidebarCollapsedChange,
    ).toHaveBeenCalledWith(false);
  });

  it('opens the mobile sidebar drawer', async () => {
    const user = userEvent.setup();

    render(
      <DashboardLayout
        sidebar="Navigation"
        header={(
          <DashboardMobileSidebarToggle />
        )}
      >
        Main
      </DashboardLayout>,
    );

    expect(
      screen.queryByRole('dialog'),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: 'Open navigation',
      }),
    );

    expect(
      screen.getByRole('dialog', {
        name: 'Primary navigation',
      }),
    ).toBeInTheDocument();
  });

  it('supports controlled mobile sidebar state', async () => {
    const user = userEvent.setup();

    const onMobileSidebarOpenChange =
      vi.fn();

    render(
      <DashboardLayout
        sidebar="Navigation"
        header={(
          <DashboardMobileSidebarToggle />
        )}
        mobileSidebarOpen={false}
        onMobileSidebarOpenChange={
          onMobileSidebarOpenChange
        }
      >
        Main
      </DashboardLayout>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open navigation',
      }),
    );

    expect(
      onMobileSidebarOpenChange,
    ).toHaveBeenCalledWith(true);

    expect(
      screen.queryByRole('dialog'),
    ).not.toBeInTheDocument();
  });

  it('supports an initially open mobile sidebar', () => {
    render(
      <DashboardLayout
        sidebar="Navigation"
        defaultMobileSidebarOpen
      >
        Main
      </DashboardLayout>,
    );

    expect(
      screen.getByRole('dialog', {
        name: 'Primary navigation',
      }),
    ).toBeInTheDocument();
  });

  it('supports dedicated mobile sidebar content', async () => {
    const user = userEvent.setup();

    render(
      <DashboardLayout
        sidebar="Desktop navigation"
        mobileSidebar="Mobile navigation"
        header={(
          <DashboardMobileSidebarToggle />
        )}
      >
        Main
      </DashboardLayout>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open navigation',
      }),
    );

    const dialog = screen.getByRole(
      'dialog',
      {
        name: 'Primary navigation',
      },
    );

    expect(dialog).toHaveTextContent(
      'Mobile navigation',
    );
  });

  it('provides collapsed state to sidebar render function', async () => {
    const user = userEvent.setup();

    render(
      <DashboardLayout
        sidebar={({ collapsed }) => (
          <>
            <span>
              {collapsed
                ? 'Collapsed'
                : 'Expanded'}
            </span>

            <DashboardSidebarToggle />
          </>
        )}
      >
        Main
      </DashboardLayout>,
    );

    expect(
      screen.getByText('Expanded'),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: 'Collapse sidebar',
      }),
    );

    expect(
      screen.getByText('Collapsed'),
    ).toBeInTheDocument();
  });

  it('marks mobile sidebar render state', async () => {
    const user = userEvent.setup();

    render(
      <DashboardLayout
        sidebar={({ mobile }) => (
          <span>
            {mobile
              ? 'Mobile navigation'
              : 'Desktop navigation'}
          </span>
        )}
        header={(
          <DashboardMobileSidebarToggle />
        )}
      >
        Main
      </DashboardLayout>,
    );

    expect(
      screen.getByText(
        'Desktop navigation',
      ),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: 'Open navigation',
      }),
    );

    expect(
      screen.getByRole('dialog'),
    ).toHaveTextContent(
      'Mobile navigation',
    );
  });
});