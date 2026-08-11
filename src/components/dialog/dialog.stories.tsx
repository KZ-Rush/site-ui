import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button';

import { FormField } from '../form-field';

import { Input } from '../input';

import { Textarea } from '../textarea';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,

  tags: ['!autodocs'],

  parameters: {
    layout: 'centered',

    docs: {
      story: {
        inline: false,
        height: '480px',
      },
    },
  },

  args: {
    children: null,
  },

  argTypes: {
    children: {
      control: false,
    },

    open: {
      control: 'boolean',
    },

    defaultOpen: {
      control: 'boolean',
    },

    onOpenChange: {
      control: false,
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger<HTMLButtonElement>
        render={(triggerProps) => <Button {...triggerProps}>Open dialog</Button>}
      />

      <DialogContent>
        <DialogTitle>Dialog title</DialogTitle>

        <DialogDescription>This is an example dialog.</DialogDescription>

        <div
          style={{
            marginTop: '1.5rem',
          }}
        >
          <DialogClose<HTMLButtonElement>
            render={(closeProps) => (
              <Button {...closeProps} variant="outline">
                Close
              </Button>
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  ),
};

export const EditForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger<HTMLButtonElement>
        render={(triggerProps) => (
          <Button {...triggerProps} variant="outline">
            Edit record
          </Button>
        )}
      />

      <DialogContent>
        <DialogTitle>Edit record</DialogTitle>

        <DialogDescription>Update the record information.</DialogDescription>

        <div
          style={{
            display: 'grid',
            gap: '1rem',
            marginTop: '1.5rem',
          }}
        >
          <FormField id="dialog-player" label="Player">
            {(controlProps) => <Input {...controlProps} defaultValue="PlayerOne" />}
          </FormField>

          <FormField id="dialog-description" label="Description">
            {(controlProps) => <Textarea {...controlProps} defaultValue="Demo description" />}
          </FormField>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.5rem',
            }}
          >
            <DialogClose<HTMLButtonElement>
              render={(closeProps) => (
                <Button {...closeProps} variant="outline">
                  Cancel
                </Button>
              )}
            />

            <Button>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

export const Persistent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger<HTMLButtonElement>
        render={(triggerProps) => <Button {...triggerProps}>Open persistent dialog</Button>}
      />

      <DialogContent closeOnOutsideClick={false}>
        <DialogTitle>Important action</DialogTitle>

        <DialogDescription>Clicking outside does not close this dialog.</DialogDescription>

        <DialogClose<HTMLButtonElement>
          render={(closeProps) => (
            <Button {...closeProps} variant="outline">
              Close
            </Button>
          )}
        />
      </DialogContent>
    </Dialog>
  ),
};
