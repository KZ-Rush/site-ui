import {
  useState,
} from 'react';

import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  FormField,
} from '../form-field';

import {
  Select,
} from './select';

const meta = {
  title: 'Components/Select',
  component: Select,

  tags: [
    'autodocs',
  ],

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
    size: 'default',
    invalid: false,
    disabled: false,

    children: (
      <>
        <option value="">
          Select player...
        </option>

        <option value="player-1">
          Player One
        </option>

        <option value="player-2">
          Player Two
        </option>

        <option value="player-3">
          Player Three
        </option>
      </>
    ),
  },

  argTypes: {
    size: {
      control: 'select',

      options: [
        'sm',
        'default',
        'lg',
      ],
    },

    invalid: {
      control: 'boolean',
    },

    disabled: {
      control: 'boolean',
    },

    children: {
      control: false,
    },
  },
} satisfies Meta<typeof Select>;

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
    defaultValue: 'player-2',
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
  },
};

export const WithGroups: Story = {
  args: {
    children: (
      <>
        <option value="">
          Select map...
        </option>

        <optgroup label="Easy">
          <option value="kz_beginner">
            kz_beginner
          </option>

          <option value="kz_simple">
            kz_simple
          </option>
        </optgroup>

        <optgroup label="Hard">
          <option value="kz_extreme">
            kz_extreme
          </option>

          <option value="kz_master">
            kz_master
          </option>
        </optgroup>
      </>
    ),
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [
      value,
      setValue,
    ] = useState('');

    return (
      <div
        style={{
          display: 'grid',
          gap: '0.75rem',
        }}
      >
        <Select
          {...args}
          value={value}
          onChange={(event) => {
            setValue(
              event.currentTarget.value,
            );
          }}
        />

        <div>
          Value: {value || '—'}
        </div>
      </div>
    );
  },
};

export const WithFormField: Story = {
  render: () => (
    <FormField
      id="record-type"
      label="Record type"
      description="Choose the type of record."
    >
      {(controlProps) => (
        <Select
          {...controlProps}
          defaultValue=""
        >
          <option
            value=""
            disabled
          >
            Select type...
          </option>

          <option value="pro">
            PRO
          </option>

          <option value="nub">
            NUB
          </option>
        </Select>
      )}
    </FormField>
  ),
};

export const WithFormFieldError: Story = {
  render: () => (
    <FormField
      id="record-type-error"
      label="Record type"
      error="Record type is required."
    >
      {(controlProps) => (
        <Select
          {...controlProps}
          invalid
          defaultValue=""
        >
          <option
            value=""
            disabled
          >
            Select type...
          </option>

          <option value="pro">
            PRO
          </option>

          <option value="nub">
            NUB
          </option>
        </Select>
      )}
    </FormField>
  ),
};