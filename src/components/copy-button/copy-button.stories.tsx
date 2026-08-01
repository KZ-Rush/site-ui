import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { CopyButton } from './copy-button';

const meta = {
  title: 'Components/CopyButton',
  component: CopyButton,

  parameters: {
    layout: 'centered',
  },

  tags: [
    'autodocs',
  ],

  argTypes: {
    value: {
      control: 'text',
      description: 'Text written to the clipboard.',
    },

    defaultContent: {
      control: 'text',
      description: 'Content displayed before copying.',
    },

    copiedContent: {
      control: 'text',
      description: 'Content displayed after copying.',
    },

    copiedDuration: {
      control: {
        type: 'number',
        min: 0,
        step: 100,
      },

      description:
        'Duration of the copied state in milliseconds.',
    },

    disabled: {
      control: 'boolean',
    },

    onCopy: {
      action: 'copied',
    },

    onClick: {
      action: 'clicked',
    },
  },

  args: {
    value: 'demo-name.dem',
    defaultContent: 'Copy',
    copiedContent: 'Copied',
    copiedDuration: 1_500,
  },
} satisfies Meta<typeof CopyButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomContent: Story = {
  args: {
    value: 'kz-rush.ru',
    defaultContent: 'Copy URL',
    copiedContent: 'URL copied',
  },
};

export const LongValue: Story = {
  args: {
    value:
      'https://kz-rush.ru/demos/example-demo.dem',
    defaultContent: 'Copy demo URL',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'This value cannot be copied',
  },
};

export const MissingValue: Story = {
  args: {
    value: null,
  },
};

export const QuickReset: Story = {
  args: {
    value: 'Quick reset example',
    copiedDuration: 500,
  },
};