import type { Meta, StoryObj } from '@storybook/react-vite';

import { Progress } from './progress';

const meta = {
  title: 'Components/Progress',
  component: Progress,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },

  decorators: [
    (Story) => (
      <div style={{ width: '24rem' }}>
        <Story />
      </div>
    ),
  ],

  args: {
    progress: 45,
    showValue: true,
    'aria-label': 'Upload progress',
  },

  argTypes: {
    progress: {
      control: {
        type: 'number',
        min: 0,
        max: 100,
        step: 1,
      },

      description: 'Progress percentage, clamped between 0 and 100.',
    },

    showValue: {
      control: 'boolean',
    },

    formatValue: {
      control: false,
      description: 'Function that customizes the visible value.',
    },

    className: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    progress: 0,
  },
};

export const Complete: Story = {
  args: {
    progress: 100,
  },
};

export const WithoutValue: Story = {
  args: {
    progress: 65,
    showValue: false,
  },
};

export const Decimal: Story = {
  args: {
    progress: 42.75,
  },
};

export const CustomValue: Story = {
  args: {
    progress: 72,
  },

  render: (args) => <Progress {...args} formatValue={(value) => <>Processing: {value}%</>} />,
};

export const BelowMinimum: Story = {
  args: {
    progress: -20,
  },
};

export const AboveMaximum: Story = {
  args: {
    progress: 140,
  },
};

export const InvalidValue: Story = {
  args: {
    progress: Number.NaN,
  },
};
