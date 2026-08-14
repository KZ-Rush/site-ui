import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button';

import { Result } from './result';

const meta = {
  title: 'Components/Result',
  component: Result,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },

  args: {
    status: 'success',
    title: 'Operation completed',
    description: 'The requested operation completed successfully.',
  },

  argTypes: {
    status: {
      control: 'select',
      options: ['primary', 'success', 'info', 'warning', 'error'],
    },

    icon: {
      control: false,
    },

    actions: {
      control: false,
    },
  },
} satisfies Meta<typeof Result>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    status: 'error',
    title: 'Something went wrong',
    description: 'The operation could not be completed.',
  },
};

export const WithActions: Story = {
  render: (args) => (
    <Result
      {...args}
      status="error"
      title="Page not found"
      description="The requested page could not be found."
      actions={
        <>
          <Button>Go home</Button>

          <Button variant="outline">Go back</Button>
        </>
      }
    />
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <Result
      icon={
        <span
          style={{
            fontSize: '3rem',
          }}
        >
          🚀
        </span>
      }
      title="Ready to launch"
      description="Everything is configured."
    />
  ),
};
