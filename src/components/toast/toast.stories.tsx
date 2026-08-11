import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button';

import { RushToastContainer, showToast } from './toast';

import { generateId } from '../../utils/generate-id';

const meta = {
  title: 'Components/Toast',
  component: RushToastContainer,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RushToastContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  render: (args) => {
    const containerId = generateId();

    return (
      <>
        <Button
          onClick={() => {
            showToast('The demo was uploaded successfully.', {
              type: 'success',
              containerId,
            });
          }}
        >
          Show notification
        </Button>

        <RushToastContainer {...args} containerId={containerId} />
      </>
    );
  },
};

export const Error: Story = {
  render: (args) => {
    const containerId = generateId();

    return (
      <>
        <Button
          variant="destructive"
          onClick={() => {
            showToast('The demo could not be uploaded.', {
              type: 'error',
              containerId,
            });
          }}
        >
          Show error
        </Button>

        <RushToastContainer {...args} containerId={containerId} />
      </>
    );
  },
};
