import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from './separator';

const meta = {
  title: 'Components/Separator',
  component: Separator,

  tags: ['autodocs'],

  parameters: {
    layout: 'padded',
  },

  args: {
    orientation: 'horizontal',
    decorative: false,
  },

  argTypes: {
    orientation: {
      control: 'select',

      options: ['horizontal', 'vertical'],
    },

    decorative: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Decorative: Story = {
  args: {
    decorative: true,
  },
};

export const Vertical: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'stretch',
        gap: '1rem',
        height: '3rem',
      }}
    >
      <span>Left</span>

      <Separator orientation="vertical" />

      <span>Right</span>
    </div>
  ),
};

export const InContent: Story = {
  render: () => (
    <div
      style={{
        maxWidth: '30rem',
      }}
    >
      <h3>Account</h3>

      <p>Manage account settings.</p>

      <Separator />

      <h3>Security</h3>

      <p>Manage authentication settings.</p>
    </div>
  ),
};
