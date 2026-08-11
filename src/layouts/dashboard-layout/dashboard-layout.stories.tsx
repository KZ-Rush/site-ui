import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  SidebarNavigation,
  SidebarNavigationGroup,
  SidebarNavigationItem,
  SidebarNavigationSeparator,
} from '../../components/sidebar-navigation';

import {
  DashboardLayout,
  DashboardMobileSidebarToggle,
  DashboardSidebarToggle,
} from './dashboard-layout';

import { expect, userEvent, within } from 'storybook/test';

import './dashboard-layout.stories.scss';

function DashboardStoryIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />

      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />

      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />

      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function RecordStoryIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M6 4H18V20H6V4Z" stroke="currentColor" strokeWidth="2" />

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
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />

      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ExampleSidebarNavigation({ collapsed }: { collapsed: boolean }) {
  return (
    <SidebarNavigation collapsed={collapsed} aria-label="Example navigation">
      <SidebarNavigationGroup label="Main">
        <SidebarNavigationItem href="#dashboard" icon={<DashboardStoryIcon />} active>
          Dashboard
        </SidebarNavigationItem>

        <SidebarNavigationItem href="#records" icon={<RecordStoryIcon />}>
          Records
        </SidebarNavigationItem>
      </SidebarNavigationGroup>

      <SidebarNavigationSeparator />

      <SidebarNavigationGroup label="Administration">
        <SidebarNavigationItem icon={<SettingsStoryIcon />}>Settings</SidebarNavigationItem>
      </SidebarNavigationGroup>
    </SidebarNavigation>
  );
}

function ExampleHeader() {
  return (
    <>
      <DashboardMobileSidebarToggle />

      <strong>Dashboard</strong>

      <div
        style={{
          marginLeft: 'auto',
        }}
      >
        Alexey
      </div>
    </>
  );
}

function ExampleContent() {
  return (
    <div>
      <h1>Dashboard</h1>

      <p>Main dashboard content.</p>
    </div>
  );
}

const meta = {
  title: 'Layouts/DashboardLayout',
  component: DashboardLayout,

  tags: ['!autodocs'],

  parameters: {
    layout: 'fullscreen',

    docs: {
      description: {
        component: `
A responsive application layout with a collapsible left sidebar,
an optional header, and a scrollable main content region.

The sidebar can be controlled externally or managed internally.
Navigation, routing, icons, and state persistence are intentionally
left to the consuming application.
        `,
      },
    },
  },

  args: {
    sidebar: ({ collapsed, mobile }) => (
      <div className={mobile ? 'dashboard-story-mobile-sidebar' : 'dashboard-story-sidebar'}>
        <div
          className={
            mobile ? 'dashboard-story-mobile-sidebar__header' : 'dashboard-story-sidebar__header'
          }
        >
          {!collapsed && <strong className="dashboard-story-sidebar__title">KZ-Rush</strong>}

          {mobile ? (
            <DashboardMobileSidebarToggle>
              <span aria-hidden="true">×</span>
            </DashboardMobileSidebarToggle>
          ) : (
            <DashboardSidebarToggle />
          )}
        </div>

        <ExampleSidebarNavigation collapsed={collapsed} />
      </div>
    ),
    header: <ExampleHeader />,
    children: <ExampleContent />,
  },

  argTypes: {
    sidebar: {
      control: false,
      description: 'Content rendered in the left sidebar.',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },

    header: {
      control: false,
      description: 'Optional content rendered above the main region.',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },

    children: {
      control: false,
      description: 'Main dashboard page content.',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },

    sidebarCollapsed: {
      control: 'boolean',
      description: 'Controlled collapsed state of the sidebar.',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },

    defaultSidebarCollapsed: {
      control: 'boolean',
      description: 'Initial collapsed state for uncontrolled usage.',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },

    onSidebarCollapsedChange: {
      control: false,
      description: 'Called when the requested collapsed state changes.',
      table: {
        type: {
          summary: '(collapsed: boolean) => void',
        },
      },
    },

    sidebarLabel: {
      control: 'text',
      description: 'Accessible label for the sidebar region.',
      table: {
        defaultValue: {
          summary: 'Primary navigation',
        },
      },
    },

    sidebarId: {
      control: 'text',
      description: 'Optional explicit ID used by sidebar toggle controls.',
    },

    sidebarClassName: {
      control: 'text',
      description: 'Additional class applied to the sidebar element.',
    },

    headerClassName: {
      control: 'text',
      description: 'Additional class applied to the header element.',
    },

    mainClassName: {
      control: 'text',
      description: 'Additional class applied to the main element.',
    },
  },
} satisfies Meta<typeof DashboardLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InitiallyCollapsed: Story = {
  args: {
    defaultSidebarCollapsed: true,
  },
};

export const Controlled: Story = {
  args: {
    sidebarCollapsed: undefined,
  },

  render: (args) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <DashboardLayout
        {...args}
        sidebarCollapsed={collapsed}
        onSidebarCollapsedChange={setCollapsed}
      />
    );
  },
};

export const WithoutHeader: Story = {
  args: {
    header: undefined,
  },
};

export const LongContent: Story = {
  args: {
    children: (
      <div>
        <h1>Long dashboard</h1>

        {Array.from(
          {
            length: 30,
          },
          (_, index) => (
            <p key={index}>Dashboard content row {index + 1}</p>
          ),
        )}
      </div>
    ),
  },
};

export const CustomDimensions: Story = {
  args: {
    style: {
      '--rush-dashboard-sidebar-width': '20rem',

      '--rush-dashboard-sidebar-collapsed-width': '5rem',

      '--rush-dashboard-header-height': '4.5rem',
    } as React.CSSProperties,
  },
};

export const CustomToggleContent: Story = {
  args: {
    sidebar: ({ collapsed, mobile }) => (
      <div className={mobile ? 'dashboard-story-mobile-sidebar' : 'dashboard-story-sidebar'}>
        <div
          className={
            mobile ? 'dashboard-story-mobile-sidebar__header' : 'dashboard-story-sidebar__header'
          }
        >
          {!collapsed && <strong className="dashboard-story-sidebar__title">KZ-Rush</strong>}

          {mobile ? (
            <DashboardMobileSidebarToggle>
              <span aria-hidden="true">✕</span>
            </DashboardMobileSidebarToggle>
          ) : (
            <DashboardSidebarToggle>
              <span aria-hidden="true">⇔</span>
            </DashboardSidebarToggle>
          )}
        </div>

        <ExampleSidebarNavigation collapsed={collapsed} />
      </div>
    ),
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const MobileInteraction: Story = {
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false,
    },
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const body = within(document.body);

    const trigger = await canvas.findByRole('button', {
      name: 'Open navigation',
    });

    await userEvent.click(trigger);

    await expect(
      body.getByRole('dialog', {
        name: 'Primary navigation',
      }),
    ).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    await expect(
      body.queryByRole('dialog', {
        name: 'Primary navigation',
      }),
    ).not.toBeInTheDocument();
  },
};
