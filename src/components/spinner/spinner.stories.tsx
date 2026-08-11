import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from './spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },

  args: {
    size: 'default',
    label: 'Loading',
  },

  argTypes: {
    size: {
      control: 'select',

      options: ['sm', 'default', 'lg'],
    },

    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '2rem',
          background: '#111827',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Small: Story = {
  args: {
    size: 'sm',
  },

  decorators: [
    (Story) => (
      <div
        style={{
          padding: '2rem',
          background: '#111827',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Large: Story = {
  args: {
    size: 'lg',
  },

  decorators: [
    (Story) => (
      <div
        style={{
          padding: '2rem',
          background: '#111827',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        padding: '2rem',
        background: '#111827',
      }}
    >
      <Spinner size="sm" label="Loading small content" />
      <Spinner label="Loading content" />
      <Spinner size="lg" label="Loading large content" />
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div
      style={{
        padding: '2rem',
        background: '#f8fafc',
      }}
    >
      <Spinner
        style={
          {
            '--rush-spinner-color': '#334155',
            '--rush-spinner-accent-color': '#2563eb',
          } as React.CSSProperties
        }
      />
    </div>
  ),
};
