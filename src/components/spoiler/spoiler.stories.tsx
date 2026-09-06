import type { Meta, StoryObj } from '@storybook/react-vite';

import { DataList, DataListItem, DataListTerm, DataListValue } from '../data-list';

import { Spoiler, SpoilerContent, SpoilerSummary } from './spoiler';

const defaultSource = `<Spoiler>
  <SpoilerSummary>Show technical details</SpoilerSummary>
  <SpoilerContent>
    This information is hidden until the user chooses to reveal it.
  </SpoilerContent>
</Spoiler>`;

const meta = {
  title: 'Components/Spoiler',
  component: Spoiler,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },

  args: {
    variant: 'default',
  },

  argTypes: {
    children: {
      control: false,
    },

    variant: {
      control: 'radio',
      options: ['default', 'link'],
    },
  },
} satisfies Meta<typeof Spoiler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: defaultSource,
        language: 'tsx',
      },
    },
  },

  render: ({ variant }) => (
    <div style={{ width: 'min(32rem, 90vw)' }}>
      <Spoiler variant={variant}>
        <SpoilerSummary>Show technical details</SpoilerSummary>
        <SpoilerContent>
          This information is hidden until the user chooses to reveal it.
        </SpoilerContent>
      </Spoiler>
    </div>
  ),
};

export const InitiallyOpen: Story = {
  parameters: {
    docs: {
      source: {
        code: defaultSource.replace('<Spoiler>', '<Spoiler open>'),
        language: 'tsx',
      },
    },
  },

  render: ({ variant }) => (
    <div style={{ width: 'min(32rem, 90vw)' }}>
      <Spoiler open variant={variant}>
        <SpoilerSummary>Show technical details</SpoilerSummary>
        <SpoilerContent>
          This information is hidden until the user chooses to reveal it.
        </SpoilerContent>
      </Spoiler>
    </div>
  ),
};

export const LinkVariant: Story = {
  args: {
    variant: 'link',
  },

  parameters: {
    docs: {
      source: {
        code: `<Spoiler variant="link">
  <SpoilerSummary>Show technical details</SpoilerSummary>
  <SpoilerContent>
    This information is hidden until the user chooses to reveal it.
  </SpoilerContent>
</Spoiler>`,
        language: 'tsx',
      },
    },
  },

  render: ({ variant }) => (
    <div style={{ width: 'min(32rem, 90vw)' }}>
      <Spoiler variant={variant}>
        <SpoilerSummary>Show technical details</SpoilerSummary>
        <SpoilerContent>
          This information is hidden until the user chooses to reveal it.
        </SpoilerContent>
      </Spoiler>
    </div>
  ),
};

export const WithDataList: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Spoiler>
  <SpoilerSummary>Session metadata</SpoilerSummary>
  <SpoilerContent>
    <DataList>
      <DataListItem>
        <DataListTerm>Session ID</DataListTerm>
        <DataListValue>00000000-0000-4000-8000-000000000002</DataListValue>
      </DataListItem>

      <DataListItem>
        <DataListTerm>Client IP</DataListTerm>
        <DataListValue>203.0.113.10</DataListValue>
      </DataListItem>
    </DataList>
  </SpoilerContent>
</Spoiler>`,
        language: 'tsx',
      },
    },
  },

  render: ({ variant }) => (
    <div style={{ width: 'min(38rem, 90vw)' }}>
      <Spoiler variant={variant}>
        <SpoilerSummary>Session metadata</SpoilerSummary>
        <SpoilerContent>
          <DataList>
            <DataListItem>
              <DataListTerm>Session ID</DataListTerm>
              <DataListValue>00000000-0000-4000-8000-000000000002</DataListValue>
            </DataListItem>

            <DataListItem>
              <DataListTerm>Client IP</DataListTerm>
              <DataListValue>203.0.113.10</DataListValue>
            </DataListItem>
          </DataList>
        </SpoilerContent>
      </Spoiler>
    </div>
  ),
};
