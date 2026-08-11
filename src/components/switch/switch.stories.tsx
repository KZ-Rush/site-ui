import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Switch } from './switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },

  args: {
    offLabel: 'Off',
    onLabel: 'On',
    disabled: false,
    alwaysActive: false,
    onChange: fn(),
    onCheckedChange: fn(),
  },

  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Current state for controlled usage.',
    },

    defaultChecked: {
      control: 'boolean',
      description: 'Initial state for uncontrolled usage.',
    },

    offLabel: {
      control: 'text',
    },

    onLabel: {
      control: 'text',
    },

    disabled: {
      control: 'boolean',
    },

    alwaysActive: {
      control: 'boolean',
      description: 'Keeps the thumb visually emphasized without changing its state.',
    },

    name: {
      control: 'text',
    },

    value: {
      control: 'text',
    },

    required: {
      control: 'boolean',
    },

    onChange: {
      control: false,
    },

    onCheckedChange: {
      control: false,
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InitiallyChecked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
  },
};

export const AlwaysActive: Story = {
  args: {
    alwaysActive: true,
  },
};

export const WithoutLabels: Story = {
  args: {
    offLabel: undefined,
    onLabel: undefined,
    'aria-label': 'Enable notifications',
  },
};

export const SingleLabel: Story = {
  args: {
    offLabel: undefined,
    onLabel: 'Enable notifications',
  },
};

export const Controlled: Story = {
  args: {
    checked: undefined,
  },

  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'flex-start',
        }}
      >
        <Switch {...args} checked={checked} onCheckedChange={setChecked} />

        <span>State: {checked ? 'on' : 'off'}</span>
      </div>
    );
  },
};

export const FormSubmission: Story = {
  render: (args) => (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        window.alert(JSON.stringify(Object.fromEntries(data), null, 2));
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '1rem',
        }}
      >
        <Switch {...args} name="notifications" value="enabled" />

        <button type="submit">Submit</button>
      </div>
    </form>
  ),
};
