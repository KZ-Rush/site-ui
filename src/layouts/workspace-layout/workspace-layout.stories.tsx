import {
  useState,
} from 'react';

import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  SidebarNavigation,
  SidebarNavigationGroup,
  SidebarNavigationItem,
  SidebarNavigationSeparator,
} from '../../components/sidebar-navigation';

import {
  WorkspaceAsideToggle,
  WorkspaceLayout,
  WorkspaceMobileAsideToggle,
  WorkspaceMobileSidebarToggle,
  WorkspaceSidebarToggle,
} from './workspace-layout';

import {
  expect,
  userEvent,
  within,
} from 'storybook/test';

import './workspace-layout.stories.scss';

function DashboardStoryIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="3"
        y="3"
        width="7"
        height="7"
        rx="1"
        stroke="currentColor"
        strokeWidth="2"
      />

      <rect
        x="14"
        y="3"
        width="7"
        height="7"
        rx="1"
        stroke="currentColor"
        strokeWidth="2"
      />

      <rect
        x="3"
        y="14"
        width="7"
        height="7"
        rx="1"
        stroke="currentColor"
        strokeWidth="2"
      />

      <rect
        x="14"
        y="14"
        width="7"
        height="7"
        rx="1"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function RecordStoryIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 4H18V20H6V4Z"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M9 8H15M9 12H15M9 16H13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function SettingsStoryIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );

}

function ExampleNavigation({
  collapsed,
}: {
  collapsed: boolean;
}) {
  return (
    <SidebarNavigation
      collapsed={collapsed}
      aria-label="Workspace navigation"
    >
      <SidebarNavigationGroup label="Workspace">
        <SidebarNavigationItem
          href="#uploads"
          icon={<DashboardStoryIcon />}
          active
        >
          Uploads
        </SidebarNavigationItem>

        <SidebarNavigationItem
          href="#releases"
          icon={<RecordStoryIcon />}
        >
          Releases
        </SidebarNavigationItem>

        <SidebarNavigationItem
          href="#records"
          icon={<RecordStoryIcon />}
        >
          Records
        </SidebarNavigationItem>
      </SidebarNavigationGroup>

      <SidebarNavigationSeparator />

      <SidebarNavigationGroup label="Administration">
        <SidebarNavigationItem
          icon={<SettingsStoryIcon />}
        >
          Settings
        </SidebarNavigationItem>
      </SidebarNavigationGroup>
    </SidebarNavigation>
  );
}

function ExampleInspectorContent() {
  return (
    <div className="workspace-story-inspector">
      <dl>
        <dt>
          Player
        </dt>

        <dd>
          example-player
        </dd>

        <dt>
          Map
        </dt>

        <dd>
          kz_example
        </dd>

        <dt>
          Time
        </dt>

        <dd>
          01:23.45
        </dd>

        <dt>
          Type
        </dt>

        <dd>
          PRO
        </dd>
      </dl>
    </div>
  );
}

function ExampleHeader() {
  return (
    <>
      <WorkspaceMobileSidebarToggle />

      <strong>
        Demo review
      </strong>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginLeft: 'auto',
        }}
      >
        <WorkspaceMobileAsideToggle />

        <WorkspaceAsideToggle />
      </div>
    </>
  );
}

function ExampleContent() {
  return (
    <div>
      <h1>
        Demo review
      </h1>

      <p>
        Select a demo from the list and inspect
        its metadata in the right panel.
      </p>
    </div>
  );
}

const meta = {
  title: 'Layouts/WorkspaceLayout',
  component: WorkspaceLayout,

  tags: [
    '!autodocs',
  ],

  parameters: {
    layout: 'fullscreen',

    docs: {
      description: {
        component: `
A three-column application layout with an independently
collapsible left sidebar and right inspector.

It supports controlled and uncontrolled state while leaving
routing, persistence, navigation, and application content to
the consumer.
        `,
      },
    },
  },

  args: {
    sidebar: ({
      collapsed,
      mobile,
    }) => (
      <div
        className={
          mobile
            ? 'workspace-story-mobile-sidebar'
            : 'workspace-story-sidebar'
        }
      >
        <div
          className={
            mobile
              ? 'workspace-story-mobile-sidebar__header'
              : 'workspace-story-sidebar__header'
          }
        >
          {!collapsed && (
            <strong className="workspace-story-sidebar__title">
              KZ-Rush
            </strong>
          )}

          {mobile ? (
            <WorkspaceMobileSidebarToggle>
              <span aria-hidden="true">
                ×
              </span>
            </WorkspaceMobileSidebarToggle>
          ) : (
            <WorkspaceSidebarToggle />
          )}
        </div>

        <ExampleNavigation
          collapsed={collapsed}
        />
      </div>
    ),

    aside: ({
      collapsed,
      mobile,
    }) => (
      <div
        className={
          mobile
            ? 'workspace-story-mobile-aside'
            : 'workspace-story-aside'
        }
      >
        <div
          className={
            mobile
              ? 'workspace-story-mobile-aside__header'
              : 'workspace-story-aside__header'
          }
        >
          {!collapsed && (
            <strong className="workspace-story-aside__title">
              Demo details
            </strong>
          )}

          {mobile ? (
            <WorkspaceMobileAsideToggle>
              <span aria-hidden="true">
                ×
              </span>
            </WorkspaceMobileAsideToggle>
          ) : (
            <WorkspaceAsideToggle />
          )}
        </div>

        {!collapsed && (
          <ExampleInspectorContent />
        )}
      </div>
    ),

    header: <ExampleHeader />,

    children: <ExampleContent />,
  },

  argTypes: {
    sidebar: {
      control: false,
      description:
        'Content rendered inside the left sidebar.',
    },

    aside: {
      control: false,
      description:
        'Optional content rendered inside the right inspector.',
    },

    header: {
      control: false,
      description:
        'Optional header above the central content.',
    },

    children: {
      control: false,
      description:
        'Central workspace content.',
    },

    sidebarCollapsed: {
      control: 'boolean',
    },

    defaultSidebarCollapsed: {
      control: 'boolean',
    },

    asideCollapsed: {
      control: 'boolean',
    },

    defaultAsideCollapsed: {
      control: 'boolean',
    },

    onSidebarCollapsedChange: {
      control: false,
    },

    onAsideCollapsedChange: {
      control: false,
    },

    mobileSidebar: {
      control: false,
    },

    mobileAside: {
      control: false,
    },

    mobileSidebarOpen: {
      control: 'boolean',
    },

    mobileAsideOpen: {
      control: 'boolean',
    },

    defaultMobileSidebarOpen: {
      control: 'boolean',
    },

    defaultMobileAsideOpen: {
      control: 'boolean',
    },

    onMobileSidebarOpenChange: {
      control: false,
    },

    onMobileAsideOpenChange: {
      control: false,
    },
  },
} satisfies Meta<typeof WorkspaceLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SidebarCollapsed: Story = {
  args: {
    defaultSidebarCollapsed: true,
  },
};

export const AsideCollapsed: Story = {
  args: {
    defaultAsideCollapsed: true,
  },
};

export const BothCollapsed: Story = {
  args: {
    defaultSidebarCollapsed: true,
    defaultAsideCollapsed: true,
  },
};

export const WithoutAside: Story = {
  args: {
    aside: undefined,

    header: (
      <strong>
        Workspace without inspector
      </strong>
    ),
  },
};

export const Controlled: Story = {
  args: {
    sidebarCollapsed: undefined,
    asideCollapsed: undefined,
  },

  render: (args) => {
    const [
      sidebarCollapsed,
      setSidebarCollapsed,
    ] = useState(false);

    const [
      asideCollapsed,
      setAsideCollapsed,
    ] = useState(false);

    return (
      <WorkspaceLayout
        {...args}
        sidebarCollapsed={
          sidebarCollapsed
        }
        onSidebarCollapsedChange={
          setSidebarCollapsed
        }
        asideCollapsed={asideCollapsed}
        onAsideCollapsedChange={
          setAsideCollapsed
        }
      />
    );
  },
};

export const CustomDimensions: Story = {
  args: {
    style: {
      '--rush-workspace-sidebar-width':
        '19rem',

      '--rush-workspace-sidebar-collapsed-width':
        '5rem',

      '--rush-workspace-aside-width':
        '24rem',

      '--rush-workspace-content-padding':
        '2rem',
    } as React.CSSProperties,
  },
};

export const LongContent: Story = {
  args: {
    children: (
      <div>
        <h1>
          Long workspace
        </h1>

        {Array.from(
          {
            length: 35,
          },
          (_, index) => (
            <p key={index}>
              Workspace content row{' '}
              {index + 1}
            </p>
          ),
        )}
      </div>
    ),
  },
};

export const MobileInteraction: Story = {
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false,
    },
  },

  play: async ({
    canvasElement,
  }) => {
    const canvas =
      within(canvasElement);

    const body =
      within(document.body);

    const navigationTrigger =
      await canvas.findByRole(
        'button',
        {
          name: 'Open navigation',
        },
      );

    await userEvent.click(
      navigationTrigger,
    );

    await expect(
      body.getByRole('dialog', {
        name: 'Primary navigation',
      }),
    ).toBeInTheDocument();

    await userEvent.keyboard(
      '{Escape}',
    );

    const detailsTrigger =
      await canvas.findByRole(
        'button',
        {
          name: 'Open details panel',
        },
      );

    await userEvent.click(
      detailsTrigger,
    );

    await expect(
      body.getByRole('dialog', {
        name: 'Workspace details',
      }),
    ).toBeInTheDocument();

    await expect(
      body.queryByRole('dialog', {
        name: 'Primary navigation',
      }),
    ).not.toBeInTheDocument();
  },
};