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
  Textarea,
} from './textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,

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
          width: '24rem',
        }}
      >
        <Story />
      </div>
    ),
  ],

  args: {
    placeholder: 'Enter description...',
    size: 'default',
    invalid: false,
    disabled: false,
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
  },
} satisfies Meta<typeof Textarea>;

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
    value:
      'This description cannot be changed.',
    readOnly: true,
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    value:
      'This value failed validation.',
    readOnly: true,
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue:
      'This is the initial textarea value.',
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
        <Textarea
          {...args}
          value={value}
          onChange={(event) => {
            setValue(
              event.currentTarget.value,
            );
          }}
        />

        <div>
          Characters: {value.length}
        </div>
      </div>
    );
  },
};

export const WithFormField: Story = {
  render: () => (
    <FormField
      id="demo-description"
      label="Description"
      description="Provide additional information about the demo."
    >
      {(controlProps) => (
        <Textarea
          {...controlProps}
          placeholder="Enter description..."
        />
      )}
    </FormField>
  ),
};

export const WithFormFieldError: Story = {
  render: () => (
    <FormField
      id="demo-description-error"
      label="Description"
      error="Description must be at least 20 characters."
    >
      {(controlProps) => (
        <Textarea
          {...controlProps}
          invalid
          defaultValue="Too short"
        />
      )}
    </FormField>
  ),
};

export const LongContent: Story = {
  args: {
    defaultValue:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(
        10,
      ),
  },
};