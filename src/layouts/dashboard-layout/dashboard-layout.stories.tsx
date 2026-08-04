import {
  useState,
} from 'react';

import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  DashboardLayout,
  DashboardSidebarToggle,
} from './dashboard-layout';

import './dashboard-layout.stories.scss';

function ExampleSidebar() {
  return (
    <div className="dashboard-story-sidebar">
      <div className="dashboard-story-sidebar__header">
        <strong className="dashboard-story-sidebar__title">
          KZ-Rush
        </strong>

        <DashboardSidebarToggle />
      </div>

      <ExampleSidebarNavigation />
    </div>
  );
}

function ExampleHeader() {
  return (
    <>
      <strong>
        Dashboard
      </strong>

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
      <h1>
        Dashboard
      </h1>

      <p>
        Main dashboard content.
      </p>
    </div>
  );
}

const meta = {
  title: 'Layouts/DashboardLayout',
  component: DashboardLayout,

  tags: [
    'autodocs',
  ],

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
    sidebar: <ExampleSidebar />,
    header: <ExampleHeader />,
    children: <ExampleContent />,
  },

  argTypes: {
    sidebar: {
      control: false,
      description:
        'Content rendered in the left sidebar.',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },

    header: {
      control: false,
      description:
        'Optional content rendered above the main region.',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },

    children: {
      control: false,
      description:
        'Main dashboard page content.',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },

    sidebarCollapsed: {
      control: 'boolean',
      description:
        'Controlled collapsed state of the sidebar.',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },

    defaultSidebarCollapsed: {
      control: 'boolean',
      description:
        'Initial collapsed state for uncontrolled usage.',
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
      description:
        'Called when the requested collapsed state changes.',
      table: {
        type: {
          summary: '(collapsed: boolean) => void',
        },
      },
    },

    sidebarLabel: {
      control: 'text',
      description:
        'Accessible label for the sidebar region.',
      table: {
        defaultValue: {
          summary: 'Primary navigation',
        },
      },
    },

    sidebarId: {
      control: 'text',
      description:
        'Optional explicit ID used by sidebar toggle controls.',
    },

    sidebarClassName: {
      control: 'text',
      description:
        'Additional class applied to the sidebar element.',
    },

    headerClassName: {
      control: 'text',
      description:
        'Additional class applied to the header element.',
    },

    mainClassName: {
      control: 'text',
      description:
        'Additional class applied to the main element.',
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
    const [
      collapsed,
      setCollapsed,
    ] = useState(false);

    return (
      <DashboardLayout
        {...args}
        sidebarCollapsed={collapsed}
        onSidebarCollapsedChange={
          setCollapsed
        }
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
        <h1>
          Long dashboard
        </h1>

        {Array.from(
          {
            length: 30,
          },
          (_, index) => (
            <p key={index}>
              Dashboard content row{' '}
              {index + 1}
            </p>
          ),
        )}
      </div>
    ),
  },
};

export const CustomDimensions: Story = {
  args: {
    style: {
      '--rush-dashboard-sidebar-width':
        '20rem',

      '--rush-dashboard-sidebar-collapsed-width':
        '5rem',

      '--rush-dashboard-header-height':
        '4.5rem',
    } as React.CSSProperties,
  },
};

export const CustomToggleContent: Story = {
  args: {
    sidebar: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '4rem',
            padding: '0 1rem',
            borderBottom:
              '1px solid var(--rush-color-border, #e2e8f0)',
          }}
        >
          <strong className="dashboard-story-sidebar__title">
            KZ-Rush
          </strong>

          <DashboardSidebarToggle>
            <span aria-hidden="true">
              ⇔
            </span>
          </DashboardSidebarToggle>
        </div>

        <ExampleSidebarNavigation />
      </div>
    ),
  },
};

function ExampleSidebarNavigation() {
  return (
    <nav
      aria-label="Example navigation"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
        padding: '1rem',
      }}
    >
      <a href="#dashboard">
        Dashboard
      </a>

      <a href="#records">
        Records
      </a>

      <a href="#maps">
        Maps
      </a>

      <a href="#players">
        Players
      </a>
    </nav>
  );
}