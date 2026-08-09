import {
  useState,
} from 'react';

import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  Pagination,
} from './pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,

  tags: [
    'autodocs',
  ],

  parameters: {
    layout: 'padded',
  },

  args: {
    page: 4,
    pageCount: 12,
    siblingCount: 1,
    showFirstLast: false,
    onPageChange: () => {},
  },

  argTypes: {
    page: {
      control: {
        type: 'number',
        min: 1,
      },
    },

    pageCount: {
      control: {
        type: 'number',
        min: 0,
      },
    },

    siblingCount: {
      control: {
        type: 'number',
        min: 0,
      },
    },

    showFirstLast: {
      control: 'boolean',
    },

    onPageChange: {
      control: false,
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interactive: Story = {
  render: (args) => {
    const [
      page,
      setPage,
    ] = useState(args.page);

    return (
      <Pagination
        {...args}
        page={page}
        onPageChange={setPage}
      />
    );
  },
};

export const FirstPage: Story = {
  args: {
    page: 1,
  },
};

export const LastPage: Story = {
  args: {
    page: 12,
  },
};

export const ManyPages: Story = {
  args: {
    page: 53,
    pageCount: 120,
  },
};

export const WithFirstAndLast: Story = {
  args: {
    showFirstLast: true,
  },
};

export const NoSiblings: Story = {
  args: {
    page: 6,
    pageCount: 12,
    siblingCount: 0,
  },
};

export const FewPages: Story = {
  args: {
    page: 2,
    pageCount: 3,
  },
};

export const CustomLabels: Story = {
  args: {
    previousLabel: '←',
    nextLabel: '→',
    firstLabel: '«',
    lastLabel: '»',
    showFirstLast: true,
  },
};