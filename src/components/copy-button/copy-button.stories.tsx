import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';
import {
  expect,
  fn,
  userEvent,
  within,
} from 'storybook/test';

import { CopyButton } from './copy-button';

const meta = {
  title: 'Components/CopyButton',
  component: CopyButton,

  tags: [
    'autodocs',
  ],

  parameters: {
    layout: 'centered',
  },

  args: {
    value: 'demo-name.dem',
    defaultContent: 'Copy',
    copiedContent: 'Copied',
    errorContent: 'Copy failed',
    copiedDuration: 1_500,
    errorDuration: 1_500,
    onClick: fn(),
    onCopy: fn(),
    onCopyError: fn(),
  },

  argTypes: {
    value: {
      control: 'text',
      description:
        'Text written to the system clipboard.',
    },

    defaultContent: {
      control: 'text',
    },

    copiedContent: {
      control: 'text',
    },

    errorContent: {
      control: 'text',
    },

    copiedDuration: {
      control: {
        type: 'number',
        min: 0,
        step: 100,
      },
    },

    errorDuration: {
      control: {
        type: 'number',
        min: 0,
        step: 100,
      },
    },

    disabled: {
      control: 'boolean',
    },

    onClick: {
      control: false,
    },

    onCopy: {
      control: false,
    },

    onCopyError: {
      control: false,
    },
  },
} satisfies Meta<typeof CopyButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomContent: Story = {
  args: {
    value: 'https://kz-rush.ru',
    defaultContent: 'Copy URL',
    copiedContent: 'URL copied',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const MissingValue: Story = {
  args: {
    value: null,
  },
};

export const EmptyValue: Story = {
  args: {
    value: '',
  },
};

export const ReactNodeContent: Story = {
  args: {
    defaultContent: (
      <>
        <span aria-hidden="true">
          📋
        </span>

        Copy filename
      </>
    ),

    copiedContent: (
      <>
        <span aria-hidden="true">
          ✓
        </span>

        Copied
      </>
    ),
  },
};

export const SuccessfulInteraction: Story = {
  args: {
    copiedDuration: 10_000,
  },

  play: async ({
    canvasElement,
    args,
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole(
      'button',
      { name: 'Copy' },
    );

    await userEvent.click(button);

    await expect(args.onCopy).toHaveBeenCalledWith(
      'demo-name.dem',
    );

    await expect(button).toHaveTextContent('Copied');
    await expect(button).toHaveAttribute(
      'data-status',
      'copied',
    );
  },
};