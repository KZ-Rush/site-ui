import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,

  tags: ['autodocs'],

  parameters: {
    layout: 'padded',
  },

  args: {
    defaultValue: 'overview',
    orientation: 'horizontal',
    children: null,
  },

  argTypes: {
    children: {
      control: false,
    },

    value: {
      control: false,
    },

    defaultValue: {
      control: 'text',
    },

    orientation: {
      control: 'select',

      options: ['horizontal', 'vertical'],
    },

    onValueChange: {
      control: false,
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList aria-label="Record sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>

        <TabsTrigger value="history">History</TabsTrigger>

        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">Overview content</TabsContent>

      <TabsContent value="history">History content</TabsContent>

      <TabsContent value="settings">Settings content</TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },

  render: (args) => (
    <div
      style={{
        maxWidth: '40rem',
      }}
    >
      <Tabs {...args}>
        <TabsList aria-label="Settings">
          <TabsTrigger value="general">General</TabsTrigger>

          <TabsTrigger value="security">Security</TabsTrigger>

          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">General settings</TabsContent>

        <TabsContent value="security">Security settings</TabsContent>

        <TabsContent value="notifications">Notification settings</TabsContent>
      </Tabs>
    </div>
  ),
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>

        <TabsTrigger value="audit" disabled>
          Audit
        </TabsTrigger>

        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">Overview</TabsContent>

      <TabsContent value="audit">Audit</TabsContent>

      <TabsContent value="history">History</TabsContent>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('overview');

    return (
      <div
        style={{
          display: 'grid',
          gap: '1rem',
        }}
      >
        <Tabs value={value} defaultValue="overview" onValueChange={setValue}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>

            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">Overview content</TabsContent>

          <TabsContent value="history">History content</TabsContent>
        </Tabs>

        <div>Active: {value}</div>
      </div>
    );
  },
};
