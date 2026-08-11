import type { Meta, StoryObj } from '@storybook/react-vite';

import { BreadcrumbItem, Breadcrumbs } from '../breadcrumbs';

import { Button } from '../button';

import { PageHeader } from './page-header';

const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,

  tags: ['autodocs'],

  parameters: {
    layout: 'padded',
  },

  args: {
    title: 'Demo #123',
  },

  argTypes: {
    title: {
      control: 'text',
    },

    description: {
      control: 'text',
    },

    breadcrumbs: {
      control: false,
    },

    actions: {
      control: false,
    },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    description: 'Review the uploaded demo and approve or reject it.',
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    breadcrumbs: (
      <Breadcrumbs>
        <BreadcrumbItem href="#records">Records</BreadcrumbItem>

        <BreadcrumbItem current>Demo #123</BreadcrumbItem>
      </Breadcrumbs>
    ),
  },
};

export const WithActions: Story = {
  args: {
    description: 'Review the uploaded demo and approve or reject it.',

    actions: (
      <>
        <Button variant="outline">Reject</Button>

        <Button>Approve</Button>
      </>
    ),
  },
};

export const Complete: Story = {
  args: {
    breadcrumbs: (
      <Breadcrumbs>
        <BreadcrumbItem href="#admin">Administration</BreadcrumbItem>

        <BreadcrumbItem href="#records">Records</BreadcrumbItem>

        <BreadcrumbItem current>Demo #123</BreadcrumbItem>
      </Breadcrumbs>
    ),

    description:
      'Review the uploaded demo, inspect its metadata, and decide whether it should be approved.',

    actions: (
      <>
        <Button variant="outline">Reject</Button>

        <Button>Approve</Button>
      </>
    ),
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Review world record submission for a very long Counter-Strike map name',

    description: 'Long titles should wrap without pushing actions outside the container.',

    actions: <Button>Approve</Button>,
  },
};
