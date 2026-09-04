import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button';

import { EmptyState } from './empty-state';

function ExampleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6H20V18H4V6Z" stroke="currentColor" strokeWidth="1.5" />

      <path d="M8 10H16M8 14H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,

  tags: ['autodocs'],

  parameters: {
    layout: 'padded',
  },

  args: {
    title: 'No records found',
  },

  argTypes: {
    title: {
      control: 'text',
    },

    description: {
      control: 'text',
    },

    icon: {
      control: false,
    },

    action: {
      control: false,
    },

    secondaryAction: {
      control: false,
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    description: 'There are no records matching the current filters.',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <ExampleIcon />,

    description: 'Uploaded demos will appear here.',
  },

  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `<EmptyState
  title="No records found"
  description="Uploaded demos will appear here."
  icon={<ExampleIcon />}
/>`,
      },
    },
  },
};

export const WithAction: Story = {
  args: {
    title: 'No demos yet',

    description: 'Upload your first demo to get started.',

    icon: <ExampleIcon />,

    action: <Button>Upload demo</Button>,
  },

  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `<EmptyState
  title="No demos yet"
  description="Upload your first demo to get started."
  icon={<ExampleIcon />}
  action={<Button>Upload demo</Button>}
/>`,
      },
    },
  },
};

export const WithTwoActions: Story = {
  args: {
    title: 'No records found',

    description: 'Try changing or clearing the current filters.',

    icon: <ExampleIcon />,

    action: <Button>Clear filters</Button>,

    secondaryAction: <Button variant="outline">Learn more</Button>,
  },

  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `<EmptyState
  title="No records found"
  description="Try changing or clearing the current filters."
  icon={<ExampleIcon />}
  action={<Button>Clear filters</Button>}
  secondaryAction={<Button variant="outline">Learn more</Button>}
/>`,
      },
    },
  },
};

export const RichDescription: Story = {
  args: {
    title: 'Nothing here yet',

    description: (
      <span>
        New records will appear here after they have been <strong>reviewed and approved</strong>.
      </span>
    ),
  },
};
