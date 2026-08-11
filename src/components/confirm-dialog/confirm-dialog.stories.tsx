import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button';

import { ConfirmDialog } from './confirm-dialog';

const meta = {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialog,

  tags: ['!autodocs'],

  parameters: {
    layout: 'centered',

    docs: {
      story: {
        inline: false,
        height: '420px',
      },
    },
  },

  args: {
    title: 'Confirm action',
    description: 'Are you sure you want to continue?',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    confirmVariant: 'default',
    onConfirm: () => {},
    children: () => null,
  },

  argTypes: {
    children: {
      control: false,
    },

    title: {
      control: 'text',
    },

    description: {
      control: 'text',
    },

    confirmLabel: {
      control: 'text',
    },

    cancelLabel: {
      control: 'text',
    },

    confirmVariant: {
      control: 'select',

      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },

    onConfirm: {
      control: false,
    },

    onOpenChange: {
      control: false,
    },
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ConfirmDialog {...args}>
      {(triggerProps) => (
        <Button {...triggerProps} variant="outline">
          Perform action
        </Button>
      )}
    </ConfirmDialog>
  ),
};

export const Destructive: Story = {
  render: (args) => (
    <ConfirmDialog
      {...args}
      title="Delete record?"
      description="This action cannot be undone. The record will be permanently removed."
      confirmLabel="Delete"
      confirmVariant="destructive"
    >
      {(triggerProps) => (
        <Button {...triggerProps} variant="destructive">
          Delete record
        </Button>
      )}
    </ConfirmDialog>
  ),
};

export const WithoutDescription: Story = {
  render: (args) => (
    <ConfirmDialog {...args} title="Continue?" description={undefined} confirmLabel="Continue">
      {(triggerProps) => <Button {...triggerProps}>Continue</Button>}
    </ConfirmDialog>
  ),
};

export const Persistent: Story = {
  render: (args) => (
    <ConfirmDialog
      {...args}
      title="Delete record?"
      description="Use one of the actions below to close this dialog."
      confirmLabel="Delete"
      confirmVariant="destructive"
      closeOnOutsideClick={false}
    >
      {(triggerProps) => (
        <Button {...triggerProps} variant="destructive">
          Delete
        </Button>
      )}
    </ConfirmDialog>
  ),
};
