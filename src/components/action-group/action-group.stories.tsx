import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button';

import { ActionGroup } from './action-group';

const meta = {
  title: 'Components/ActionGroup',
  component: ActionGroup,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },

  args: {
    orientation: 'horizontal',
    justify: 'start',
    wrap: true,
  },

  argTypes: {
    children: {
      control: false,
    },

    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },

    align: {
      control: 'select',
      options: [undefined, 'start', 'center', 'end', 'stretch'],
    },

    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between'],
    },

    wrap: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ActionGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultSource = `<ActionGroup>
  <Button>Save changes</Button>
  <Button variant="secondary">Cancel</Button>
</ActionGroup>`;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: defaultSource,
        language: 'tsx',
      },
    },
  },

  render: (args) => (
    <ActionGroup {...args}>
      <Button>Save changes</Button>
      <Button variant="secondary">Cancel</Button>
    </ActionGroup>
  ),
};

export const EndAligned: Story = {
  args: {
    justify: 'end',
  },

  parameters: {
    docs: {
      source: {
        code: defaultSource.replace('<ActionGroup>', '<ActionGroup justify="end">'),
        language: 'tsx',
      },
    },
  },

  render: (args) => (
    <div style={{ width: 'min(36rem, 90vw)' }}>
      <ActionGroup {...args}>
        <Button>Save changes</Button>
        <Button variant="secondary">Cancel</Button>
      </ActionGroup>
    </div>
  ),
};

export const Wrapping: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ActionGroup>
  <Button>Approve</Button>
  <Button variant="secondary">Request changes</Button>
  <Button variant="outline">Preview</Button>
  <Button variant="destructive">Delete</Button>
</ActionGroup>`,
        language: 'tsx',
      },
    },
  },

  render: (args) => (
    <div style={{ width: '18rem' }}>
      <ActionGroup {...args}>
        <Button>Approve</Button>
        <Button variant="secondary">Request changes</Button>
        <Button variant="outline">Preview</Button>
        <Button variant="destructive">Delete</Button>
      </ActionGroup>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },

  parameters: {
    docs: {
      source: {
        code: defaultSource.replace('<ActionGroup>', '<ActionGroup orientation="vertical">'),
        language: 'tsx',
      },
    },
  },

  render: (args) => (
    <div style={{ width: '14rem' }}>
      <ActionGroup {...args}>
        <Button>Save changes</Button>
        <Button variant="secondary">Cancel</Button>
      </ActionGroup>
    </div>
  ),
};
