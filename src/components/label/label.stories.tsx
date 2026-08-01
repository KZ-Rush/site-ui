import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { Label } from './label';

const meta = {
  title: 'Components/Label',
  component: Label,

  tags: [
    'autodocs',
  ],

  parameters: {
    layout: 'centered',
  },

  args: {
    children: 'Username',
    htmlFor: 'username',
  },

  argTypes: {
    children: {
      control: 'text',
    },

    htmlFor: {
      control: 'text',
    },

    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithInput: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        width: '16rem',
      }}
    >
      <Label {...args} />

      <input
        id={args.htmlFor}
        type="text"
      />
    </div>
  ),
};

export const WithDisabledInput: Story = {
  args: {
    disabled: true,
  },

  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        width: '16rem',
      }}
    >
      <Label {...args} />

      <input
        id={args.htmlFor}
        type="text"
        disabled
      />
    </div>
  ),
};