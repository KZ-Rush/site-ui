import {
  useState,
} from 'react';

import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';
import {
  fn,
} from 'storybook/test';

import { Checkbox } from './checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,

  tags: [
    'autodocs',
  ],

  parameters: {
    layout: 'centered',
  },

  args: {
    children: 'Remember me',
    onChange: fn(),
    onCheckedChange: fn(),
  },

  argTypes: {
    children: {
      control: 'text',
      description:
        'Content displayed beside the checkbox.',
    },

    checked: {
      control: 'boolean',
      description:
        'Current state for controlled usage.',
    },

    defaultChecked: {
      control: 'boolean',
      description:
        'Initial state for uncontrolled usage.',
    },

    disabled: {
      control: 'boolean',
    },

    required: {
      control: 'boolean',
    },

    name: {
      control: 'text',
    },

    value: {
      control: 'text',
    },

    className: {
      control: 'text',
    },

    inputClassName: {
      control: 'text',
    },

    onChange: {
      control: false,
    },

    onCheckedChange: {
      control: false,
    },
  },
} satisfies Meta<typeof Checkbox>;

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

export const WithoutLabel: Story = {
  args: {
    children: undefined,
    'aria-label': 'Select record',
  },
};

export const LongLabel: Story = {
  args: {
    children:
      'Notify me when this demo has been reviewed and its record status changes.',
  },

  decorators: [
    (Story) => (
      <div style={{ width: '22rem' }}>
        <Story />
      </div>
    ),
  ],
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
        }}
      >
        <Checkbox
          {...args}
          checked={checked}
          onCheckedChange={setChecked}
        >
          Enable notifications
        </Checkbox>

        <span>
          State: {checked ? 'checked' : 'unchecked'}
        </span>
      </div>
    );
  },
};

export const FormSubmission: Story = {
  render: (args) => (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const data = new FormData(
          event.currentTarget,
        );

        window.alert(
          JSON.stringify(
            Object.fromEntries(data),
            null,
            2,
          ),
        );
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Checkbox
          {...args}
          name="terms"
          required
          value="accepted"
        >
          I accept the terms
        </Checkbox>

        <button type="submit">
          Submit
        </button>
      </div>
    </form>
  ),
};