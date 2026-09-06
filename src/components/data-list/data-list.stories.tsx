import type { Meta, StoryObj } from '@storybook/react-vite';

import { CountryFlag } from '../country-flag';
import { Link } from '../link';

import {
  DataList,
  DataListItem,
  DataListTerm,
  DataListValue,
  type DataListOrientation,
} from './data-list';

const sessionDataSource = `<DataList>
  <DataListItem>
    <DataListTerm>Main session ID</DataListTerm>
    <DataListValue>00000000-0000-4000-8000-000000000002</DataListValue>
  </DataListItem>

  <DataListItem>
    <DataListTerm>Client IP</DataListTerm>
    <DataListValue>203.0.113.10</DataListValue>
  </DataListItem>

  <DataListItem>
    <DataListTerm>User</DataListTerm>
    <DataListValue>
      <CountryFlag code="kz" /> Synthetic Runner
    </DataListValue>
  </DataListItem>

  <DataListItem>
    <DataListTerm>Steam ID</DataListTerm>
    <DataListValue>STEAM_0:1:38772505</DataListValue>
  </DataListItem>

  <DataListItem>
    <DataListTerm>Map</DataListTerm>
    <DataListValue>
      <Link href="/maps/kz-seeded-curve">kz_seeded_curve</Link>
    </DataListValue>
  </DataListItem>

  <DataListItem>
    <DataListTerm>Game SID</DataListTerm>
    <DataListValue>cs16</DataListValue>
  </DataListItem>

  <DataListItem>
    <DataListTerm>Created at</DataListTerm>
    <DataListValue>
      <time dateTime="2026-09-06T23:51:00+03:00">2026-09-06 23:51</time>
    </DataListValue>
  </DataListItem>

  <DataListItem>
    <DataListTerm>Updated at</DataListTerm>
    <DataListValue>
      <time dateTime="2026-09-06T23:51:00+03:00">2026-09-06 23:51</time>
    </DataListValue>
  </DataListItem>
</DataList>`;

const meta = {
  title: 'Components/DataList',
  component: DataList,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },

  decorators: [
    (Story) => (
      <div style={{ width: 'min(42rem, calc(100vw - 2rem))' }}>
        <Story />
      </div>
    ),
  ],

  args: {
    orientation: 'horizontal',
  },

  argTypes: {
    children: {
      control: false,
    },

    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof DataList>;

export default meta;

type Story = StoryObj<typeof meta>;

function SessionData({ orientation }: { orientation?: DataListOrientation }) {
  return (
    <DataList orientation={orientation}>
      <DataListItem>
        <DataListTerm>Main session ID</DataListTerm>
        <DataListValue>00000000-0000-4000-8000-000000000002</DataListValue>
      </DataListItem>

      <DataListItem>
        <DataListTerm>Client IP</DataListTerm>
        <DataListValue>203.0.113.10</DataListValue>
      </DataListItem>

      <DataListItem>
        <DataListTerm>User</DataListTerm>
        <DataListValue>
          <CountryFlag code="kz" /> Synthetic Runner
        </DataListValue>
      </DataListItem>

      <DataListItem>
        <DataListTerm>Steam ID</DataListTerm>
        <DataListValue>STEAM_0:1:38772505</DataListValue>
      </DataListItem>

      <DataListItem>
        <DataListTerm>Map</DataListTerm>
        <DataListValue>
          <Link href="/maps/kz-seeded-curve">kz_seeded_curve</Link>
        </DataListValue>
      </DataListItem>

      <DataListItem>
        <DataListTerm>Game SID</DataListTerm>
        <DataListValue>cs16</DataListValue>
      </DataListItem>

      <DataListItem>
        <DataListTerm>Created at</DataListTerm>
        <DataListValue>
          <time dateTime="2026-09-06T23:51:00+03:00">2026-09-06 23:51</time>
        </DataListValue>
      </DataListItem>

      <DataListItem>
        <DataListTerm>Updated at</DataListTerm>
        <DataListValue>
          <time dateTime="2026-09-06T23:51:00+03:00">2026-09-06 23:51</time>
        </DataListValue>
      </DataListItem>
    </DataList>
  );
}

const sessionDataParameters = {
  docs: {
    source: {
      language: 'tsx',
      type: 'dynamic',
      transform: (_source: string, context: { args: { orientation?: DataListOrientation } }) =>
        context.args.orientation === 'vertical'
          ? sessionDataSource.replace('<DataList>', '<DataList orientation="vertical">')
          : sessionDataSource,
    },
  },
} as const;

export const Default: Story = {
  parameters: sessionDataParameters,

  render: ({ orientation }) => <SessionData orientation={orientation} />,
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },

  parameters: sessionDataParameters,

  render: ({ orientation }) => <SessionData orientation={orientation} />,
};

export const Narrow: Story = {
  parameters: sessionDataParameters,

  decorators: [
    (Story) => (
      <div style={{ width: 'min(26rem, calc(100vw - 2rem))' }}>
        <Story />
      </div>
    ),
  ],

  render: ({ orientation }) => <SessionData orientation={orientation} />,
};
