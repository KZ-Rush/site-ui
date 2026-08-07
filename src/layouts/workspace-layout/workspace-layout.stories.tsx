import {
  useState,
} from 'react';

import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  WorkspaceAsideToggle,
  WorkspaceLayout,
  WorkspaceSidebarToggle,
} from './workspace-layout';

import './workspace-layout.stories.scss';

function ExampleSidebar() {
  return (
    <div className="workspace-story-sidebar">
      <div className="workspace-story-sidebar__header">
        <strong className="workspace-story-sidebar__title">
          KZ-Rush
        </strong>

        <WorkspaceSidebarToggle />
      </div>

      <nav
        aria-label="Workspace navigation"
        className="workspace-story-navigation"
      >
        <a href="#uploads">
          Uploads
        </a>

        <a href="#releases">
          Releases
        </a>

        <a href="#records">
          Records
        </a>

        <a href="#maps">
          Maps
        </a>
      </nav>
    </div>
  );
}

function ExampleHeader() {
  return (
    <>
      <strong>
        Demo review
      </strong>

      <div
        style={{
          marginLeft: 'auto',
        }}
      >
        <WorkspaceAsideToggle />
      </div>
    </>
  );
}

function ExampleAside() {
  return (
    <div className="workspace-story-aside">
      <div className="workspace-story-aside__header">
        <strong className="workspace-story-aside__title">
          Demo details
        </strong>

        <WorkspaceAsideToggle />
      </div>

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
    </div>
  );
}

function ExampleContent() {
  return (
    <div>
      <h1>
        Demo review
      </h1>

      <p>
        Select a demo from the list and inspect its
        metadata in the right panel.
      </p>
    </div>
  );
}

const meta = {
  title: 'Layouts/WorkspaceLayout',
  component: WorkspaceLayout,

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
    sidebar: <ExampleSidebar />,
    header: <ExampleHeader />,
    aside: <ExampleAside />,
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