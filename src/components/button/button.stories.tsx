import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Button } from './button';
import { Avatar } from '../avatar';

const meta = {
  title: 'Components/Button',
  component: Button,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },

  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
    disabled: false,
    onClick: fn(),
  },

  argTypes: {
    children: {
      control: 'text',
    },

    variant: {
      control: 'select',

      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },

    size: {
      control: 'select',

      options: ['default', 'sm', 'lg', 'icon'],
    },

    disabled: {
      control: 'boolean',
    },

    href: {
      control: 'text',
    },

    onClick: {
      control: false,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const LinkVariant: Story = {
  args: {
    variant: 'link',
    children: 'View details',
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

export const Icon: Story = {
  args: {
    size: 'icon',
    'aria-label': 'Add record',
    children: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const AsLink: Story = {
  args: {
    href: 'https://kz-rush.ru',
    children: 'Open KZ-Rush',
  },
};

export const Unstyled: Story = {
  args: {
    variant: 'unstyled',
    children: 'Unstyled button',
  },
};

export const DisabledLink: Story = {
  args: {
    href: 'https://kz-rush.ru',
    disabled: true,
    children: 'Unavailable',
  },
};

export const ClickInteraction: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Button' });

    await userEvent.click(button);

    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const AvatarButton: Story = {
  args: {
    variant: 'unstyled',
    'aria-label': 'Open user menu',
  },

  render: (args) => (
    <Button {...args}>
      <Avatar alt="User avatar" fallback="AR" />
    </Button>
  ),
};
