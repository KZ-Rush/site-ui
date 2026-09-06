import type { Meta, StoryObj } from '@storybook/react-vite';

import { Link } from '../link';

import { Description } from './description';

const meta = {
  title: 'Components/Description',
  component: Description,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },

  args: {
    children: 'Use supporting text to provide additional context or guidance.',
  },

  argTypes: {
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Description>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongText: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '28rem' }}>
        <Story />
      </div>
    ),
  ],

  args: {
    children:
      'Descriptions can explain unfamiliar settings, clarify expected input, or provide useful context without competing with the primary content.',
  },
};

export const WithLink: Story = {
  render: () => (
    <Description>
      Learn more in the <Link href="/documentation">documentation</Link>.
    </Description>
  ),
};
