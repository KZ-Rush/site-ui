import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  SidebarNavigation,
  SidebarNavigationGroup,
  SidebarNavigationItem,
  SidebarNavigationSeparator,
} from './sidebar-navigation';

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

const meta = {
  title: 'Components/SidebarNavigation',
  component: SidebarNavigation,

  tags: [
    'autodocs',
  ],

  parameters: {
    layout: 'centered',
  },

  decorators: [
    (Story) => (
      <div
        style={{
          width: '16rem',
          minHeight: '24rem',
          border:
            '1px solid var(--rush-color-border, #e2e8f0)',
        }}
      >
        <Story />
      </div>
    ),
  ],

  args: {
    collapsed: false,
    children: null,
  },

  argTypes: {
    collapsed: {
      control: 'boolean',
    },

    children: {
      control: false,
    },
  },
} satisfies Meta<typeof SidebarNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <SidebarNavigation
      {...args}
      aria-label="Main navigation"
    >
      <SidebarNavigationGroup label="Main">
        <SidebarNavigationItem
          href="#dashboard"
          icon={<DashboardStoryIcon />}
          active
        >
          Dashboard
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
          onClick={() => {}}
        >
          Settings
        </SidebarNavigationItem>
      </SidebarNavigationGroup>
    </SidebarNavigation>
  ),
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
  },

  decorators: [
    (Story) => (
      <div
        style={{
          width: '4rem',
          minHeight: '24rem',
          border:
            '1px solid var(--rush-color-border, #e2e8f0)',
        }}
      >
        <Story />
      </div>
    ),
  ],

  render: (args) => (
    <SidebarNavigation
      {...args}
      aria-label="Main navigation"
    >
      <SidebarNavigationGroup label="Main">
        <SidebarNavigationItem
          href="#dashboard"
          icon={<DashboardStoryIcon />}
          active
        >
          Dashboard
        </SidebarNavigationItem>

        <SidebarNavigationItem
          href="#records"
          icon={<RecordStoryIcon />}
        >
          Records
        </SidebarNavigationItem>
      </SidebarNavigationGroup>

      <SidebarNavigationSeparator />

      <SidebarNavigationItem
        icon={<SettingsStoryIcon />}
        onClick={() => {}}
      >
        Settings
      </SidebarNavigationItem>
    </SidebarNavigation>
  ),
};

export const States: Story = {
  render: () => (
    <SidebarNavigation
      aria-label="Navigation states"
    >
      <SidebarNavigationItem
        href="#default"
        icon={<DashboardStoryIcon />}
      >
        Default
      </SidebarNavigationItem>

      <SidebarNavigationItem
        href="#active"
        icon={<DashboardStoryIcon />}
        active
      >
        Active
      </SidebarNavigationItem>

      <SidebarNavigationItem
        href="#disabled"
        icon={<DashboardStoryIcon />}
        disabled
      >
        Disabled link
      </SidebarNavigationItem>

      <SidebarNavigationItem
        icon={<SettingsStoryIcon />}
        disabled
      >
        Disabled action
      </SidebarNavigationItem>
    </SidebarNavigation>
  ),
};

export const CollapsedWithTooltips: Story = {
  render: () => (
    <div
      style={{
        width: '4rem',
      }}
    >
      <SidebarNavigation
        collapsed
        aria-label="Main navigation"
      >
        <SidebarNavigationGroup>
          <SidebarNavigationItem
            href="#dashboard"
            icon={<span>⌂</span>}
            tooltip="Dashboard"
          >
            Dashboard
          </SidebarNavigationItem>

          <SidebarNavigationItem
            href="#records"
            icon={<span>★</span>}
            tooltip="Records"
          >
            Records
          </SidebarNavigationItem>

          <SidebarNavigationItem
            icon={<span>⚙</span>}
            tooltip="Settings"
          >
            Settings
          </SidebarNavigationItem>
        </SidebarNavigationGroup>
      </SidebarNavigation>
    </div>
  ),
};

export const CollapsedAutomaticLabels: Story = {
  render: () => (
    <div
      style={{
        width: '4rem',
      }}
    >
      <SidebarNavigation collapsed>
        <SidebarNavigationItem
          href="#dashboard"
          icon={<span>⌂</span>}
        >
          Dashboard
        </SidebarNavigationItem>

        <SidebarNavigationItem
          href="#records"
          icon={<span>★</span>}
        >
          Records
        </SidebarNavigationItem>
      </SidebarNavigation>
    </div>
  ),
};