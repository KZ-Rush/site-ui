import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,

  tags: ['autodocs'],

  parameters: {
    layout: 'padded',
  },

  args: {
    type: 'single',
    collapsible: true,
    children: null,
  },

  argTypes: {
    children: {
      control: false,
    },

    type: {
      control: 'select',

      options: ['single', 'multiple'],
    },

    value: {
      control: false,
    },

    defaultValue: {
      control: false,
    },

    onValueChange: {
      control: false,
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" defaultValue="general" collapsible>
      <AccordionItem value="general">
        <AccordionTrigger>General</AccordionTrigger>

        <AccordionContent>General project settings.</AccordionContent>
      </AccordionItem>

      <AccordionItem value="security">
        <AccordionTrigger>Security</AccordionTrigger>

        <AccordionContent>Security and authentication settings.</AccordionContent>
      </AccordionItem>

      <AccordionItem value="notifications">
        <AccordionTrigger>Notifications</AccordionTrigger>

        <AccordionContent>Notification preferences.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['general', 'security']}>
      <AccordionItem value="general">
        <AccordionTrigger>General</AccordionTrigger>

        <AccordionContent>General settings.</AccordionContent>
      </AccordionItem>

      <AccordionItem value="security">
        <AccordionTrigger>Security</AccordionTrigger>

        <AccordionContent>Security settings.</AccordionContent>
      </AccordionItem>

      <AccordionItem value="notifications">
        <AccordionTrigger>Notifications</AccordionTrigger>

        <AccordionContent>Notification settings.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const DisabledItem: Story = {
  render: () => (
    <Accordion type="single" collapsible>
      <AccordionItem value="general">
        <AccordionTrigger>General</AccordionTrigger>

        <AccordionContent>General settings.</AccordionContent>
      </AccordionItem>

      <AccordionItem value="audit" disabled>
        <AccordionTrigger>Audit log</AccordionTrigger>

        <AccordionContent>Audit information.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('general');

    return (
      <div
        style={{
          display: 'grid',
          gap: '1rem',
        }}
      >
        <Accordion type="single" value={value} defaultValue="" collapsible onValueChange={setValue}>
          <AccordionItem value="general">
            <AccordionTrigger>General</AccordionTrigger>

            <AccordionContent>General settings.</AccordionContent>
          </AccordionItem>

          <AccordionItem value="security">
            <AccordionTrigger>Security</AccordionTrigger>

            <AccordionContent>Security settings.</AccordionContent>
          </AccordionItem>
        </Accordion>

        <div>Open: {value || 'none'}</div>
      </div>
    );
  },
};
