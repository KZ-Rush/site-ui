import type { Meta, StoryObj } from '@storybook/react-vite';

import { FormField } from './form-field';

const meta = {
  title: 'Components/FormField',
  component: FormField,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },

  decorators: [
    (Story) => (
      <div style={{ width: '20rem' }}>
        <Story />
      </div>
    ),
  ],

  args: {
    id: 'username',
    label: 'Username',
    children: () => null,
  },

  argTypes: {
    id: {
      control: 'text',
      description: 'ID used to connect all parts of the field.',
    },

    label: {
      control: 'text',
    },

    description: {
      control: 'text',
    },

    error: {
      control: 'text',
    },

    children: {
      control: false,
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <FormField {...args}>
      {(controlProps) => <input {...controlProps} name={args.id} type="text" />}
    </FormField>
  ),
};

export const WithDescription: Story = {
  args: {
    description: 'This name will be visible in your player profile.',
  },

  render: (args) => (
    <FormField {...args}>
      {(controlProps) => (
        <input {...controlProps} name={args.id} type="text" placeholder="Enter username" />
      )}
    </FormField>
  ),
};

export const WithError: Story = {
  args: {
    error: 'Username is required.',
  },

  render: (args) => (
    <FormField {...args}>
      {(controlProps) => <input {...controlProps} name={args.id} type="text" />}
    </FormField>
  ),
};

export const WithDescriptionAndError: Story = {
  args: {
    description: 'Use the nickname you normally use on KZ servers.',
    error: 'This username is already taken.',
  },

  render: (args) => (
    <FormField {...args}>
      {(controlProps) => (
        <input {...controlProps} name={args.id} type="text" defaultValue="Alexey" />
      )}
    </FormField>
  ),
};

export const DisabledControl: Story = {
  args: {
    id: 'steam-id',
    label: 'Steam ID',
    description: 'Steam ID cannot be changed after verification.',
  },

  render: (args) => (
    <FormField {...args}>
      {(controlProps) => (
        <input
          {...controlProps}
          name={args.id}
          type="text"
          defaultValue="STEAM_0:1:123456"
          disabled
        />
      )}
    </FormField>
  ),
};

export const WithTextarea: Story = {
  args: {
    id: 'description',
    label: 'Description',
    description: 'Add optional information about the uploaded demo.',
  },

  render: (args) => (
    <FormField {...args}>
      {(controlProps) => <textarea {...controlProps} name={args.id} rows={4} />}
    </FormField>
  ),
};

export const WithSelect: Story = {
  args: {
    id: 'record-type',
    label: 'Record type',
  },

  render: (args) => (
    <FormField {...args}>
      {(controlProps) => (
        <select {...controlProps} name={args.id}>
          <option value="pro">PRO</option>

          <option value="nub">NUB</option>
        </select>
      )}
    </FormField>
  ),
};
