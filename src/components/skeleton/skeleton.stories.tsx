import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  Skeleton,
} from './skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,

  tags: [
    'autodocs',
  ],

  parameters: {
    layout: 'padded',
  },

  args: {
    animated: true,
    variant: 'block',
  },

  argTypes: {
    variant: {
      control: 'select',
      options: [
        'block',
        'circle',
      ],
    },

    animated: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: {
      width: '20rem',
      height: '1rem',
    },
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',

    style: {
      width: '3rem',
    },
  },
};

export const Static: Story = {
  args: {
    animated: false,

    style: {
      width: '20rem',
      height: '1rem',
    },
  },
};

export const TextLines: Story = {
  render: () => (
    <div
      aria-busy="true"
      aria-label="Loading article"
      style={{
        display: 'grid',
        gap: '0.75rem',
        width: '28rem',
        maxWidth: '100%',
      }}
    >
      <Skeleton
        style={{
          width: '70%',
          height: '1.75rem',
        }}
      />

      <Skeleton
        style={{
          height: '1rem',
        }}
      />

      <Skeleton
        style={{
          height: '1rem',
        }}
      />

      <Skeleton
        style={{
          width: '85%',
          height: '1rem',
        }}
      />
    </div>
  ),
};

export const UserRow: Story = {
  render: () => (
    <div
      aria-busy="true"
      aria-label="Loading user"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        width: '24rem',
        maxWidth: '100%',
      }}
    >
      <Skeleton
        variant="circle"
        style={{
          width: '3rem',
          flex: '0 0 auto',
        }}
      />

      <div
        style={{
          display: 'grid',
          gap: '0.5rem',
          flex: 1,
        }}
      >
        <Skeleton
          style={{
            width: '45%',
            height: '1rem',
          }}
        />

        <Skeleton
          style={{
            width: '70%',
            height: '0.75rem',
          }}
        />
      </div>
    </div>
  ),
};

export const TableRows: Story = {
  render: () => (
    <div
      aria-busy="true"
      aria-label="Loading records"
      style={{
        display: 'grid',
        gap: '0.75rem',
        width: '100%',
      }}
    >
      {Array.from(
        {
          length: 5,
        },
        (_, index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns:
                '1fr 2fr 1fr 1fr',
              gap: '1rem',
            }}
          >
            <Skeleton
              style={{
                height: '1rem',
              }}
            />

            <Skeleton
              style={{
                height: '1rem',
              }}
            />

            <Skeleton
              style={{
                height: '1rem',
              }}
            />

            <Skeleton
              style={{
                height: '1rem',
              }}
            />
          </div>
        ),
      )}
    </div>
  ),
};