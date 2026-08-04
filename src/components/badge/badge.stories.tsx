import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { Badge } from './badge';

function StatusStoryIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="8"
        fill="currentColor"
      />
    </svg>
  );
}

const meta = {
  title: 'Components/Badge',
  component: Badge,

  tags: [
    'autodocs',
  ],

  parameters: {
    layout: 'centered',
  },

  args: {
    children: 'Badge',
    variant: 'default',
  },

  argTypes: {
    children: {
      control: 'text',
    },

    variant: {
      control: 'select',

      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'success',
        'warning',
        'info',
        'notice',
      ],
    },

    href: {
      control: 'text',
      description:
        'When supplied, Badge renders as an anchor.',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Approved',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Needs review',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Processing',
  },
};

export const Notice: Story = {
  args: {
    variant: 'notice',
    children: 'New',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Pending',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Rejected',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Archived',
  },
};

export const AsLink: Story = {
  args: {
    href: '/records',
    children: '15 records',
  },
};

export const LinkOutline: Story = {
  args: {
    href: '/maps',
    variant: 'outline',
    children: 'View map',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'secondary',

    children: (
      <>
        <StatusStoryIcon />
        Processing
      </>
    ),
  },
};

export const LongContent: Story = {
  args: {
    children:
      'A very long badge value that will be constrained',
  },

  decorators: [
    (Story) => (
      <div style={{ width: '12rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}
    >
      <Badge>
        Default
      </Badge>

      <Badge variant="secondary">
        Secondary
      </Badge>

      <Badge variant="success">
        Success
      </Badge>

      <Badge variant="warning">
        Warning
      </Badge>

      <Badge variant="destructive">
        Destructive
      </Badge>

      <Badge variant="info">
        Info
      </Badge>

      <Badge variant="notice">
        Notice
      </Badge>

      <Badge variant="outline">
        Outline
      </Badge>
    </div>
  ),
};

export const KzRushStatuses: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}
    >
      <Badge variant="secondary">
        Pending
      </Badge>

      <Badge variant="warning">
        Needs review
      </Badge>

      <Badge variant="info">
        Processing
      </Badge>

      <Badge variant="success">
        Approved
      </Badge>

      <Badge variant="destructive">
        Rejected
      </Badge>

      <Badge variant="notice">
        New record
      </Badge>

      <Badge variant="outline">
        Archived
      </Badge>
    </div>
  ),
};