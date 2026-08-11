import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  Button,
} from '../button';

import {
  Input,
} from '../input';

import {
  Select,
} from '../select';

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from './popover';

const meta = {
  title: 'Components/Popover',
  component: Popover,

  tags: [
    '!autodocs',
  ],

  parameters: {
    layout: 'centered',

    docs: {
      story: {
        inline: false,
        height: '360px',
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
} satisfies Meta<typeof Popover>;

export default meta;

type Story =
  StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger<HTMLButtonElement>
        render={(triggerProps) => (
          <Button
            {...triggerProps}
            variant="outline"
          >
            Open popover
          </Button>
        )}
      />

      <PopoverContent>
        <p>
          This is arbitrary popover content.
        </p>
      </PopoverContent>
    </Popover>
  ),
};

export const Filters: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger<HTMLButtonElement>
        render={(triggerProps) => (
          <Button
            {...triggerProps}
            variant="outline"
          >
            Filters
          </Button>
        )}
      />

      <PopoverContent
        align="end"
      >
        <div
          style={{
            display: 'grid',
            gap: '0.75rem',
          }}
        >
          <Input
            aria-label="Player"
            placeholder="Player..."
          />

          <Select
            aria-label="Record type"
          >
            <option value="">
              All types
            </option>

            <option value="PRO">
              PRO
            </option>

            <option value="NUB">
              NUB
            </option>
          </Select>

          <PopoverClose>
            Close
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

