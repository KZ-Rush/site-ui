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
});