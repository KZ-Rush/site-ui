import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from './avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },

  args: {
    alt: 'Example user',
    fallback: 'AR',
    size: 'default',
  },

  argTypes: {
    size: {
      control: 'select',

      options: ['sm', 'default', 'lg'],
    },

    status: {
      control: 'select',

      options: [undefined, 'online', 'offline', 'busy'],
    },

    fallback: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Online: Story = {
  args: {
    status: 'online',
  },
};

export const Offline: Story = {
  args: {
    status: 'offline',
  },
};

export const Busy: Story = {
  args: {
    status: 'busy',
  },
};

export const BrokenImage: Story = {
  args: {
    src: '/missing-avatar.png',
    fallback: 'AR',
  },
};
