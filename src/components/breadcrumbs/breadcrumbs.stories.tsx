import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  BreadcrumbItem,
  Breadcrumbs,
} from './breadcrumbs';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,

  tags: [
    'autodocs',
  ],

  parameters: {
    layout: 'centered',
  },

  args: {
    children: null,
  },

  argTypes: {
    children: {
      control: false,
    },

    separator: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem href="#home">
        Home
      </BreadcrumbItem>

      <BreadcrumbItem href="#records">
        Records
      </BreadcrumbItem>

      <BreadcrumbItem current>
        Demo #123
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
};

export const CustomSeparator: Story = {
  args: {
    separator: '›',
  },

  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem href="#home">
        Home
      </BreadcrumbItem>

      <BreadcrumbItem href="#maps">
        Maps
      </BreadcrumbItem>

      <BreadcrumbItem current>
        kz_example
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
};

export const SingleItem: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem current>
        Dashboard
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
};

export const LongPath: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          width: '26rem',
        }}
      >
        <Story />
      </div>
    ),
  ],

  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="#admin">
        Administration
      </BreadcrumbItem>

      <BreadcrumbItem href="#records">
        World records
      </BreadcrumbItem>

      <BreadcrumbItem href="#maps">
        Very long map category name
      </BreadcrumbItem>

      <BreadcrumbItem current>
        Very long current demo name
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
};

export const CustomElementSeparator: Story = {
  render: () => (
    <Breadcrumbs
      separator={(
        <span aria-hidden="true">
          →
        </span>
      )}
    >
      <BreadcrumbItem href="#home">
        Home
      </BreadcrumbItem>

      <BreadcrumbItem href="#news">
        News
      </BreadcrumbItem>

      <BreadcrumbItem current>
        Community update
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
};