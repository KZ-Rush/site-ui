import type { Meta, StoryObj } from '@storybook/react-vite';

import { Link } from './link';

const meta = {
  title: 'Components/Link',
  component: Link,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },

  args: {
    href: '/records',
    children: 'View records',
  },

  argTypes: {
    href: {
      control: 'text',
    },

    children: {
      control: 'text',
    },

    target: {
      control: 'select',
      options: [undefined, '_self', '_blank'],
    },

    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const External: Story = {
  args: {
    href: 'https://kz-rush.ru',
    target: '_blank',
    rel: 'noreferrer',
    children: 'Open KZ-Rush',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Unavailable',
  },
};

export const InText: Story = {
  render: () => (
    <p style={{ maxWidth: '32rem', margin: 0 }}>
      Review the latest <Link href="/records">approved records</Link> from the KZ-Rush community.
    </p>
  ),
};
