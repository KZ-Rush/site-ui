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
  WorkspaceAsideToggle,
  WorkspaceLayout,
  WorkspaceSidebarToggle,
  WorkspaceMobileAsideToggle,
  WorkspaceMobileSidebarToggle,
} from './workspace-layout';

import {
  SidebarNavigation,
  SidebarNavigationItem,
} from '../../components/sidebar-navigation';

interface RenderLayoutOptions {
  sidebarCollapsed?: boolean;
  defaultSidebarCollapsed?: boolean;

  onSidebarCollapsedChange?: (
    collapsed: boolean,
  ) => void;

  asideCollapsed?: boolean;
  defaultAsideCollapsed?: boolean;

  onAsideCollapsedChange?: (
    collapsed: boolean,
  ) => void;

  aside?: React.ReactNode;
}

function renderLayout(
  options: RenderLayoutOptions = {},
) {
  const {
    sidebarCollapsed,
    defaultSidebarCollapsed,
    onSidebarCollapsedChange,

    asideCollapsed,
    defaultAsideCollapsed,
    onAsideCollapsedChange,
  } = options;

  const aside = Object.hasOwn(
    options,
    'aside',
  )
    ? options.aside
    : 'Inspector';

  return render(
    <WorkspaceLayout
      sidebar={(
        <>
          <WorkspaceSidebarToggle />
          Navigation
        </>
      )}
      header={(
        <>
          Header

          {aside !== undefined
            && aside !== null && (
              <WorkspaceAsideToggle />
            )}
        </>
      )}
      aside={aside}
      sidebarCollapsed={
        sidebarCollapsed
      }
      defaultSidebarCollapsed={
        defaultSidebarCollapsed
      }
      onSidebarCollapsedChange={
        onSidebarCollapsedChange
      }
      asideCollapsed={
        asideCollapsed
      }
      defaultAsideCollapsed={
        defaultAsideCollapsed
      }
      onAsideCollapsedChange={
        onAsideCollapsedChange
      }
    >
      Main content
    </WorkspaceLayout>,
  );
}

describe('WorkspaceLayout', () => {
  it('renders semantic regions', () => {
    renderLayout();

    expect(
      screen.getByRole('complementary', {
        name: 'Primary navigation',
      }),
    ).toHaveTextContent('Navigation');

    expect(
      screen.getByRole('complementary', {
        name: 'Workspace details',
      }),
    ).toHaveTextContent('Inspector');

    expect(
      screen.getByRole('banner'),
    ).toHaveTextContent('Header');

    expect(
      screen.getByRole('main'),
    ).toHaveTextContent('Main content');
  });

  it('toggles the sidebar in uncontrolled mode', async () => {
    const user = userEvent.setup();

    renderLayout();

    const layout = screen
      .getByRole('main')
      .closest(
        '[data-slot="workspace-layout"]',
      );

    await user.click(
      screen.getByRole('button', {
        name: 'Collapse sidebar',
      }),
    );

    expect(layout).toHaveAttribute(
      'data-sidebar-collapsed',
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

  it('toggles the aside in uncontrolled mode', async () => {
    const user = userEvent.setup();

    renderLayout();

    const layout = screen
      .getByRole('main')
      .closest(
        '[data-slot="workspace-layout"]',
      );

    await user.click(
      screen.getByRole('button', {
        name: 'Collapse details panel',
      }),
    );

    expect(layout).toHaveAttribute(
      'data-aside-collapsed',
      'true',
    );

    expect(
      screen.getByRole('button', {
        name: 'Expand details panel',
      }),
    ).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('supports initially collapsed panels', () => {
    renderLayout({
      defaultSidebarCollapsed: true,
      defaultAsideCollapsed: true,
    });

    const layout = screen
      .getByRole('main')
      .closest(
        '[data-slot="workspace-layout"]',
      );

    expect(layout).toHaveAttribute(
      'data-sidebar-collapsed',
      'true',
    );

    expect(layout).toHaveAttribute(
      'data-aside-collapsed',
      'true',
    );
  });

  it('notifies controlled sidebar consumers', async () => {
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

    expect(
      screen
        .getByRole('main')
        .closest(
          '[data-slot="workspace-layout"]',
        ),
    ).not.toHaveAttribute(
      'data-sidebar-collapsed',
    );
  });

  it('notifies controlled aside consumers', async () => {
    const user = userEvent.setup();

    const onAsideCollapsedChange =
      vi.fn();

    renderLayout({
      asideCollapsed: false,
      onAsideCollapsedChange,
    });

    await user.click(
      screen.getByRole('button', {
        name: 'Collapse details panel',
      }),
    );

    expect(
      onAsideCollapsedChange,
    ).toHaveBeenCalledWith(true);

    expect(
      screen
        .getByRole('main')
        .closest(
          '[data-slot="workspace-layout"]',
        ),
    ).not.toHaveAttribute(
      'data-aside-collapsed',
    );
  });

  it('connects controls to their panels', () => {
    renderLayout();

    const sidebar = screen.getByRole(
      'complementary',
      {
        name: 'Primary navigation',
      },
    );

    const aside = screen.getByRole(
      'complementary',
      {
        name: 'Workspace details',
      },
    );

    expect(
      screen.getByRole('button', {
        name: 'Collapse sidebar',
      }),
    ).toHaveAttribute(
      'aria-controls',
      sidebar.id,
    );

    expect(
      screen.getByRole('button', {
        name: 'Collapse details panel',
      }),
    ).toHaveAttribute(
      'aria-controls',
      aside.id,
    );
  });

  it('does not render an aside when omitted', () => {
    renderLayout({
      aside: undefined,
    });

    expect(
      screen.queryByRole('complementary', {
        name: 'Workspace details',
      }),
    ).not.toBeInTheDocument();
  });

  it('does not toggle when click is prevented', async () => {
    const user = userEvent.setup();

    render(
      <WorkspaceLayout
        sidebar={(
          <WorkspaceSidebarToggle
            onClick={(event) => {
              event.preventDefault();
            }}
          />
        )}
      >
        Main content
      </WorkspaceLayout>,
    );

    await user.click(
      screen.getByRole('button'),
    );

    expect(
      screen
        .getByRole('main')
        .closest(
          '[data-slot="workspace-layout"]',
        ),
    ).not.toHaveAttribute(
      'data-sidebar-collapsed',
    );
  });

  it('throws when a control is outside the layout', () => {
    expect(() => {
      render(
        <WorkspaceSidebarToggle />,
      );
    }).toThrow(
      'Workspace layout controls must be used inside WorkspaceLayout.',
    );
  });

  it('opens the mobile sidebar drawer', async () => {
    const user = userEvent.setup();

    render(
      <WorkspaceLayout
        sidebar="Desktop navigation"
        mobileSidebar="Mobile navigation"
        header={(
          <WorkspaceMobileSidebarToggle />
        )}
      >
        Main
      </WorkspaceLayout>,
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

  it('opens the mobile aside drawer', async () => {
    const user = userEvent.setup();

    render(
      <WorkspaceLayout
        sidebar="Navigation"
        aside="Desktop inspector"
        mobileAside="Mobile inspector"
        header={(
          <WorkspaceMobileAsideToggle />
        )}
      >
        Main
      </WorkspaceLayout>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open details panel',
      }),
    );

    const dialog = screen.getByRole(
      'dialog',
      {
        name: 'Workspace details',
      },
    );

    expect(dialog).toHaveTextContent(
      'Mobile inspector',
    );
  });

  it('supports controlled mobile sidebar state', async () => {
    const user = userEvent.setup();

    const onMobileSidebarOpenChange =
      vi.fn();

    render(
      <WorkspaceLayout
        sidebar="Navigation"
        mobileSidebarOpen={false}
        onMobileSidebarOpenChange={
          onMobileSidebarOpenChange
        }
        header={(
          <WorkspaceMobileSidebarToggle />
        )}
      >
        Main
      </WorkspaceLayout>,
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

  it('does not render the mobile aside when aside is omitted', () => {
    render(
      <WorkspaceLayout
        sidebar="Navigation"
        defaultMobileAsideOpen
      >
        Main
      </WorkspaceLayout>,
    );

    expect(
      screen.queryByRole('dialog', {
        name: 'Workspace details',
      }),
    ).not.toBeInTheDocument();
  });

  it('closes the mobile aside when opening the mobile sidebar', async () => {
    const user = userEvent.setup();

    render(
      <WorkspaceLayout
        sidebar="Navigation"
        aside="Inspector"
        defaultMobileAsideOpen
        header={(
          <>
            <WorkspaceMobileSidebarToggle />
            <WorkspaceMobileAsideToggle />
          </>
        )}
      >
        Main
      </WorkspaceLayout>,
    );

    expect(
      screen.getByRole('dialog', {
        name: 'Workspace details',
      }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: 'Open navigation',
      }),
    );

    expect(
      screen.queryByRole('dialog', {
        name: 'Workspace details',
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole('dialog', {
        name: 'Primary navigation',
      }),
    ).toBeInTheDocument();
  });

  it('provides collapsed state to the sidebar render function', async () => {
    const user = userEvent.setup();

    render(
      <WorkspaceLayout
        sidebar={({
          collapsed,
          mobile,
        }) => (
          <>
            <span>
              {mobile
                ? 'Mobile sidebar'
                : (
                  collapsed
                    ? 'Collapsed sidebar'
                    : 'Expanded sidebar'
                )}
            </span>

            {!mobile && (
              <WorkspaceSidebarToggle />
            )}
          </>
        )}
      >
        Main
      </WorkspaceLayout>,
    );

    expect(
      screen.getByText(
        'Expanded sidebar',
      ),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: 'Collapse sidebar',
      }),
    );

    expect(
      screen.getByText(
        'Collapsed sidebar',
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        'Expanded sidebar',
      ),
    ).not.toBeInTheDocument();
  });

  it('provides collapsed state to the aside render function', async () => {
    const user = userEvent.setup();

    render(
      <WorkspaceLayout
        sidebar="Navigation"
        aside={({
          collapsed,
          mobile,
        }) => (
          <>
            <span>
              {mobile
                ? 'Mobile aside'
                : (
                  collapsed
                    ? 'Collapsed aside'
                    : 'Expanded aside'
                )}
            </span>

            {!mobile && (
              <WorkspaceAsideToggle />
            )}
          </>
        )}
      >
        Main
      </WorkspaceLayout>,
    );

    expect(
      screen.getByText(
        'Expanded aside',
      ),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: 'Collapse details panel',
      }),
    );

    expect(
      screen.getByText(
        'Collapsed aside',
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        'Expanded aside',
      ),
    ).not.toBeInTheDocument();
  });

  it('marks the mobile sidebar render state', async () => {
    const user = userEvent.setup();

    render(
      <WorkspaceLayout
        sidebar={({
          mobile,
        }) => (
          <span>
            {mobile
              ? 'Mobile navigation'
              : 'Desktop navigation'}
          </span>
        )}
        header={(
          <WorkspaceMobileSidebarToggle />
        )}
      >
        Main
      </WorkspaceLayout>,
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

    const dialog =
      screen.getByRole(
        'dialog',
        {
          name: 'Primary navigation',
        },
      );

    expect(dialog).toHaveTextContent(
      'Mobile navigation',
    );
  });

  it('marks the mobile aside render state', async () => {
    const user = userEvent.setup();

    render(
      <WorkspaceLayout
        sidebar="Navigation"
        aside={({
          mobile,
        }) => (
          <span>
            {mobile
              ? 'Mobile inspector'
              : 'Desktop inspector'}
          </span>
        )}
        header={(
          <WorkspaceMobileAsideToggle />
        )}
      >
        Main
      </WorkspaceLayout>,
    );

    expect(
      screen.getByText(
        'Desktop inspector',
      ),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: 'Open details panel',
      }),
    );

    const dialog =
      screen.getByRole(
        'dialog',
        {
          name: 'Workspace details',
        },
      );

    expect(dialog).toHaveTextContent(
      'Mobile inspector',
    );
  });

  it('prefers explicit mobileSidebar content', async () => {
    const user = userEvent.setup();

    render(
      <WorkspaceLayout
        sidebar={({
          mobile,
        }) => (
          <span>
            {mobile
              ? 'Fallback mobile navigation'
              : 'Desktop navigation'}
          </span>
        )}
        mobileSidebar="Dedicated mobile navigation"
        header={(
          <WorkspaceMobileSidebarToggle />
        )}
      >
        Main
      </WorkspaceLayout>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open navigation',
      }),
    );

    const dialog =
      screen.getByRole(
        'dialog',
        {
          name: 'Primary navigation',
        },
      );

    expect(dialog).toHaveTextContent(
      'Dedicated mobile navigation',
    );

    expect(dialog).not.toHaveTextContent(
      'Fallback mobile navigation',
    );
  });

  it('prefers explicit mobileAside content', async () => {
    const user = userEvent.setup();

    render(
      <WorkspaceLayout
        sidebar="Navigation"
        aside={({
          mobile,
        }) => (
          <span>
            {mobile
              ? 'Fallback mobile inspector'
              : 'Desktop inspector'}
          </span>
        )}
        mobileAside="Dedicated mobile inspector"
        header={(
          <WorkspaceMobileAsideToggle />
        )}
      >
        Main
      </WorkspaceLayout>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open details panel',
      }),
    );

    const dialog =
      screen.getByRole(
        'dialog',
        {
          name: 'Workspace details',
        },
      );

    expect(dialog).toHaveTextContent(
      'Dedicated mobile inspector',
    );

    expect(dialog).not.toHaveTextContent(
      'Fallback mobile inspector',
    );
  });

  it('can connect sidebar navigation to layout collapsed state', async () => {
    const user = userEvent.setup();

    render(
      <WorkspaceLayout
        sidebar={({
          collapsed,
        }) => (
          <>
            <WorkspaceSidebarToggle />

            <SidebarNavigation
              collapsed={collapsed}
              aria-label="Workspace navigation"
            >
              <SidebarNavigationItem href="/records">
                Records
              </SidebarNavigationItem>
            </SidebarNavigation>
          </>
        )}
      >
        Main
      </WorkspaceLayout>,
    );

    const navigation =
      screen.getByRole(
        'navigation',
        {
          name: 'Workspace navigation',
        },
      );

    expect(
      navigation,
    ).not.toHaveAttribute(
      'data-collapsed',
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Collapse sidebar',
      }),
    );

    expect(
      navigation,
    ).toHaveAttribute(
      'data-collapsed',
      'true',
    );

    expect(
      screen.getByRole('link', {
        name: 'Records',
      }),
    ).toBeInTheDocument();
  });
});