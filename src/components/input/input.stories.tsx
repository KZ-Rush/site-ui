import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './input';

import { FormField } from '../form-field';

function SearchStoryIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />

      <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const meta = {
  title: 'Components/Input',
  component: Input,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },

  decorators: [
    (Story) => (
      <div
        style={{
          width: '20rem',
        }}
      >
        <Story />
      </div>
    ),
  ],

  args: {
    placeholder: 'Enter value...',
    size: 'default',
    invalid: false,
    disabled: false,
  },

  argTypes: {
    size: {
      control: 'select',

      options: ['sm', 'default', 'lg'],
    },

    invalid: {
      control: 'boolean',
    },

    disabled: {
      control: 'boolean',
    },

    startAdornment: {
      control: false,
    },

    endAdornment: {
      control: false,
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

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

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled value',
    readOnly: true,
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    value: 'Invalid value',
    readOnly: true,
  },
};

export const Search: Story = {
  args: {
    type: 'search',

    placeholder: 'Search records...',

    startAdornment: <SearchStoryIcon />,
  },

  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `<Input
  type="search"
  placeholder="Search records..."
  startAdornment={<SearchStoryIcon />}
/>`,
      },
    },
  },
};

export const WithEndAdornment: Story = {
  args: {
    value: 'kz_example',
    readOnly: true,

    endAdornment: (
      <span
        style={{
          fontSize: '0.75rem',
        }}
      >
        .bsp
      </span>
    ),
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <div
        style={{
          display: 'grid',
          gap: '0.75rem',
        }}
      >
        <Input
          {...args}
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
          }}
        />

        <div>Value: {value || '—'}</div>
      </div>
    );
  },
};

export const WithFormField: Story = {
  render: () => (
    <FormField id="player-name" label="Player name" description="Enter the player's display name.">
      {(controlProps) => <Input {...controlProps} placeholder="PlayerOne" />}
    </FormField>
  ),
};

export const WithFormFieldError: Story = {
  render: () => (
    <FormField id="player-name-error" label="Player name" error="Player name is required.">
      {(controlProps) => <Input {...controlProps} invalid />}
    </FormField>
  ),
};
