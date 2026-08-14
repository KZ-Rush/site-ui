import type { Meta, StoryObj } from '@storybook/react-vite';

import { Statistic } from './statistic';

const meta = {
  title: 'Components/Statistic',
  component: Statistic,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },

  args: {
    title: 'World records',
    value: 1254,
  },

  argTypes: {
    title: {
      control: 'text',
    },

    value: {
      control: 'number',
    },

    prefix: {
      control: false,
    },

    suffix: {
      control: false,
    },

    formatter: {
      control: false,
    },
  },
} satisfies Meta<typeof Statistic>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PositiveDiff: Story = {
  args: {
    diff: 12,
  },
};

export const NegativeDiff: Story = {
  args: {
    diff: -8,
  },
};

export const Precision: Story = {
  args: {
    title: 'Average time',
    value: 43.285,
    precision: 2,
    suffix: 's',
  },
};

export const Prefix: Story = {
  args: {
    title: 'Revenue',
    value: 12500,
    prefix: '$',
  },
};

export const CustomFormatter: Story = {
  args: {
    title: 'Completion',
    value: 0.842,
    formatter: (value) => {
      if (typeof value !== 'number') {
        return value;
      }

      return `${Math.round(value * 100)}%`;
    },
  },
};
