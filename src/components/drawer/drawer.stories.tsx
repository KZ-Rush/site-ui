import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';

import {
  expect,
  userEvent,
  within,
} from 'storybook/test';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,

  tags: [
    'autodocs',
  ],

  parameters: {
    layout: 'centered',

    docs: {
      story: {
        inline: false,
        height: '500px',
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
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Left: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger>
        Open navigation
      </DrawerTrigger>

      <DrawerContent side="left">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem',
          }}
        >
          <DrawerTitle>
            Navigation
          </DrawerTitle>

          <DrawerClose aria-label="Close drawer">
            ×
          </DrawerClose>
        </div>

        <nav
          aria-label="Drawer navigation"
          style={{
            display: 'grid',
            gap: '0.5rem',
            padding: '1rem',
          }}
        >
          <a href="#dashboard">
            Dashboard
          </a>

          <a href="#records">
            Records
          </a>

          <a href="#maps">
            Maps
          </a>

          <a href="#players">
            Players
          </a>
        </nav>
      </DrawerContent>
    </Drawer>
  ),
};

export const Right: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger>
        Open details
      </DrawerTrigger>

      <DrawerContent side="right">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem',
          }}
        >
          <DrawerTitle>
            Demo details
          </DrawerTitle>

          <DrawerClose aria-label="Close drawer">
            ×
          </DrawerClose>
        </div>

        <div style={{ padding: '1rem' }}>
          Demo metadata and inspector content.
        </div>
      </DrawerContent>
    </Drawer>
  ),
};

export const InitiallyOpen: Story = {
  render: () => (
    <Drawer defaultOpen>
      <DrawerTrigger>
        Open drawer
      </DrawerTrigger>

      <DrawerContent>
        <div style={{ padding: '1rem' }}>
          <DrawerTitle>
            Navigation
          </DrawerTitle>

          <p>
            This drawer starts open.
          </p>

          <DrawerClose>
            Close
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};

export const Interaction: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger>
        Open drawer
      </DrawerTrigger>

      <DrawerContent aria-label="Navigation">
        <DrawerClose>
          Close drawer
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  ),

  play: async ({
    canvasElement,
  }) => {
    const canvas =
      within(canvasElement);

    const body =
      within(document.body);

    await userEvent.click(
      canvas.getByRole('button', {
        name: 'Open drawer',
      }),
    );

    await expect(
      body.getByRole('dialog', {
        name: 'Navigation',
      }),
    ).toBeInTheDocument();

    await userEvent.keyboard(
      '{Escape}',
    );

    await expect(
      body.queryByRole('dialog', {
        name: 'Navigation',
      }),
    ).not.toBeInTheDocument();
  },
};