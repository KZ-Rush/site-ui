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
} from './workspace-layout';

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
});