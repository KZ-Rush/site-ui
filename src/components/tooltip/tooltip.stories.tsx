import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  Button,
} from '../button';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from './tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,

  tags: [
    '!autodocs',
  ],

  parameters: {
    layout: 'centered',

    docs: {
      story: {
        inline: false,
        height: '240px',
      },
    },
  },

  args: {
    children: null,
  },

  argTypes: {
    children: {
      control: false,
    },

    open: {
      control: 'boolean',
    },

    defaultOpen: {
      control: 'boolean',
    },

    onOpenChange: {
      control: false,
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger<HTMLButtonElement>
        render={(
          triggerProps,
        ) => (
          <Button
            {...triggerProps}
            variant="outline"
          >
            Hover me
          </Button>
        )}
      />

      <TooltipContent>
        Tooltip content
      </TooltipContent>
    </Tooltip>
  ),
};

export const IconButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger<HTMLButtonElement>
        render={(
          triggerProps,
        ) => (
          <Button
            {...triggerProps}
            variant="ghost"
            size="icon"
            aria-label="Edit record"
          >
            ✎
          </Button>
        )}
      />

      <TooltipContent>
        Edit record
      </TooltipContent>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger<HTMLButtonElement>
        render={(
          triggerProps,
        ) => (
          <Button
            {...triggerProps}
            variant="outline"
          >
            Bottom tooltip
          </Button>
        )}
      />

      <TooltipContent
        side="bottom"
      >
        Below the trigger
      </TooltipContent>
    </Tooltip>
  ),
};