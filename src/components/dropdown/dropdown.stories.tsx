import {
  useState,
} from 'react';

import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  Button,
} from '../button';

import {
  Dropdown,
  DropdownCheckboxItem,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from './dropdown';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,

  tags: [
    'autodocs',
  ],

  parameters: {
    layout: 'centered',

    docs: {
      story: {
        inline: false,
        height: '320px',
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
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story =
  StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        Open menu
      </DropdownTrigger>

      <DropdownContent>
        <DropdownItem>
          Profile
        </DropdownItem>

        <DropdownItem>
          Settings
        </DropdownItem>

        <DropdownSeparator />

        <DropdownItem destructive>
          Sign out
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
};

export const Checkboxes: Story = {
  render: () => {
    const [
      playerVisible,
      setPlayerVisible,
    ] = useState(true);

    const [
      mapVisible,
      setMapVisible,
    ] = useState(true);

    const [
      timeVisible,
      setTimeVisible,
    ] = useState(false);

    return (
      <Dropdown>
        <DropdownTrigger>
          Columns
        </DropdownTrigger>

        <DropdownContent align="end">
          <DropdownCheckboxItem
            checked={playerVisible}
            onCheckedChange={
              setPlayerVisible
            }
          >
            Player
          </DropdownCheckboxItem>

          <DropdownCheckboxItem
            checked={mapVisible}
            onCheckedChange={
              setMapVisible
            }
          >
            Map
          </DropdownCheckboxItem>

          <DropdownCheckboxItem
            checked={timeVisible}
            onCheckedChange={
              setTimeVisible
            }
          >
            Time
          </DropdownCheckboxItem>
        </DropdownContent>
      </Dropdown>
    );
  },
};

export const TriggerVariant: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger
        variant="outline"
      >
        Actions
      </DropdownTrigger>

      <DropdownContent align="end">
        <DropdownItem>
          Edit
        </DropdownItem>

        <DropdownItem>
          Duplicate
        </DropdownItem>

        <DropdownSeparator />

        <DropdownItem destructive>
          Delete
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
};

