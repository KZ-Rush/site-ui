import type { Meta, StoryObj } from '@storybook/react-vite';

import { LoadingOverlay } from './loading-overlay';

import { Spinner } from '../spinner';

const meta = {
  title: 'Components/LoadingOverlay',
  component: LoadingOverlay,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },

  args: {
    label: 'Loading',
    spinnerSize: 'lg',
    position: 'absolute',
  },

  argTypes: {
    label: {
      control: 'text',
    },

    spinnerSize: {
      control: 'select',

      options: ['sm', 'default', 'lg'],
    },

    position: {
      control: 'select',

      options: ['fixed', 'absolute'],
    },

    children: {
      control: false,
    },
  },
} satisfies Meta<typeof LoadingOverlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div
      style={{
        position: 'relative',
        width: '28rem',
        height: '16rem',
      }}
    >
      <div
        style={{
          padding: '1rem',
        }}
      >
        Content underneath the loading state.
      </div>

      <LoadingOverlay {...args} position="absolute" />
    </div>
  ),
};

export const FullScreen: Story = {
  parameters: {
    docs: {
      story: {
        inline: false,
        height: '420px',
      },
    },
  },

  render: () => <LoadingOverlay position="fixed" label="Loading application" />,
};

export const Transparent: Story = {
  render: () => (
    <div
      style={{
        position: 'relative',
        width: '28rem',
        height: '16rem',
        padding: '1rem',
        border: '1px solid #e2e8f0',
      }}
    >
      <p>Existing content remains visible underneath.</p>

      <LoadingOverlay
        position="absolute"
        style={{
          backgroundColor: 'rgb(0 0 0 / 55%)',
        }}
      />
    </div>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <div
      style={{
        position: 'relative',
        width: '28rem',
        height: '16rem',
      }}
    >
      <LoadingOverlay position="absolute">
        <div
          style={{
            display: 'grid',
            gap: '0.75rem',
            justifyItems: 'center',
            color: '#fff',
          }}
        >
          <span>Preparing records...</span>
        </div>
      </LoadingOverlay>
    </div>
  ),
};

export const WithMessage: Story = {
  render: () => (
    <div
      style={{
        position: 'relative',
        width: '28rem',
        height: '16rem',
      }}
    >
      <LoadingOverlay position="absolute">
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            justifyItems: 'center',
            color: '#fff',
          }}
        >
          <Spinner label="Preparing records" />

          <span>Preparing records...</span>
        </div>
      </LoadingOverlay>
    </div>
  ),
};
