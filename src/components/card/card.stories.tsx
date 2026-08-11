import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

const meta = {
  title: 'Components/Card',
  component: Card,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },

  decorators: [
    (Story) => (
      <div style={{ width: '24rem' }}>
        <Story />
      </div>
    ),
  ],

  argTypes: {
    children: {
      control: false,
    },

    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the root element.',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Player profile</CardTitle>

        <CardDescription>Information about the KZ-Rush player.</CardDescription>
      </CardHeader>

      <CardContent>
        <p>Player statistics and recent records will appear here.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Demo submission</CardTitle>

        <CardDescription>Review the demo information before uploading it.</CardDescription>
      </CardHeader>

      <CardContent>
        <dl>
          <div>
            <dt>Map</dt>
            <dd>kz_example</dd>
          </div>

          <div>
            <dt>Time</dt>
            <dd>02:14.38</dd>
          </div>

          <div>
            <dt>Type</dt>
            <dd>PRO</dd>
          </div>
        </dl>
      </CardContent>

      <CardFooter>
        <button type="button">Cancel</button>

        <button type="button">Upload demo</button>
      </CardFooter>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: (args) => (
    <Card {...args}>
      <CardContent>A card does not have to contain a header or footer.</CardContent>
    </Card>
  ),
};

export const LongContent: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Counter-Strike 1.6 Kreedz record</CardTitle>

        <CardDescription>Detailed information about an approved player record.</CardDescription>
      </CardHeader>

      <CardContent>
        <p>
          This story demonstrates how the card behaves when its content occupies several lines. The
          card height grows naturally, while spacing between its sections remains consistent.
        </p>

        <p>
          Additional content can include text, forms, tables, lists, or other Rush UI components.
        </p>
      </CardContent>

      <CardFooter>
        <button type="button">View record</button>
      </CardFooter>
    </Card>
  ),
};

export const CustomClassName: Story = {
  args: {
    className: 'example-custom-card',
  },

  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Custom class</CardTitle>

        <CardDescription>Consumer classes are merged with rush-card.</CardDescription>
      </CardHeader>

      <CardContent>Inspect the root element in developer tools.</CardContent>
    </Card>
  ),
};

export const NestedCards: Story = {
  parameters: {
    layout: 'padded',
  },

  decorators: [
    (Story) => (
      <div style={{ width: '40rem' }}>
        <Story />
      </div>
    ),
  ],

  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>World records</CardTitle>

        <CardDescription>Recently approved KZ-Rush records.</CardDescription>
      </CardHeader>

      <CardContent>
        <div
          style={{
            display: 'grid',
            gap: '1rem',
          }}
        >
          <Card>
            <CardHeader>
              <CardTitle>kz_example</CardTitle>

              <CardDescription>Player: Alexey</CardDescription>
            </CardHeader>

            <CardContent>Time: 01:42.56</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>bkz_example</CardTitle>

              <CardDescription>Player: Example Player</CardDescription>
            </CardHeader>

            <CardContent>Time: 02:08.12</CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  ),
};
