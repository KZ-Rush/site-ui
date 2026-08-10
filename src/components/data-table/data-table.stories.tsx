import {
  useState,
} from 'react';

import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  DataTable,
  type DataTableSorting,
  type DataTableRowKey,
} from './data-table';

import {
  Badge,
} from '../badge';

import {
  Button,
} from '../button';

import type {
  DataTableColumn,
} from './data-table';

interface RecordRow {
  id: number;
  player: string;
  map: string;
  type: 'PRO' | 'NUB';
  time: string;
}

const records: RecordRow[] = [
  {
    id: 1,
    player: 'PlayerOne',
    map: 'kz_example',
    type: 'PRO',
    time: '01:23.45',
  },
  {
    id: 2,
    player: 'PlayerTwo',
    map: 'kz_longmap',
    type: 'NUB',
    time: '02:14.88',
  },
  {
    id: 3,
    player: 'PlayerThree',
    map: 'kz_climb',
    type: 'PRO',
    time: '00:58.32',
  },
];

const columns: DataTableColumn<RecordRow>[] = [
  {
    id: 'player',
    header: 'Player',
    sortable: true,

    cell: (row) => (
      row.player
    ),
  },
  {
    id: 'map',
    header: 'Map',
    sortable: true,

    cell: (row) => (
      row.map
    ),
  },
  {
    id: 'type',
    header: 'Type',

    cell: (row) => (
      <Badge
        variant={
          row.type === 'PRO'
            ? 'success'
            : 'secondary'
        }
      >
        {row.type}
      </Badge>
    ),
  },
  {
    id: 'time',
    header: 'Time',
    align: 'right',
    sortable: true,

    cell: (row) => (
      row.time
    ),
  },
];

const columnsWithActions:
  DataTableColumn<RecordRow>[] = [
    ...columns,

    {
      id: 'actions',
      header: '',
      align: 'right',

      cell: (row) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.5rem',
          }}
        >
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              console.log(
                'Edit',
                row.id,
              );
            }}
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              console.log(
                'Delete',
                row.id,
              );
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

const meta = {
  title: 'Components/DataTable',
  component: DataTable<RecordRow>,

  tags: [
    'autodocs',
  ],

  parameters: {
    layout: 'padded',
  },

  args: {
    columns,
    data: records,

    getRowKey: (row) => row.id,

    striped: false,
    hoverable: true,
    density: 'default',

    emptyTitle: 'No records found',
  },

  argTypes: {
    columns: {
      control: false,
    },

    data: {
      control: false,
    },

    getRowKey: {
      control: false,
    },

    sorting: {
      control: false,
    },

    onSortChange: {
      control: false,
    },

    pagination: {
      control: false,
    },

    emptyAction: {
      control: false,
    },
  },
} satisfies Meta<
  typeof DataTable<RecordRow>
>;

export default meta;

type Story =
  StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    loading: true,
    loadingRows: 5,
  },
};

export const Empty: Story = {
  args: {
    data: [],

    emptyTitle:
      'No records found',

    emptyDescription:
      'There are no records matching the current filters.',
  },
};

export const CompactStriped: Story = {
  args: {
    density: 'compact',
    striped: true,
  },
};

export const Sorting: Story = {
  render: (args) => {
    const [
      sorting,
      setSorting,
    ] = useState<DataTableSorting>({
      column: 'time',
      direction: 'asc',
    });

    const sortedData = [...args.data].sort(
      (a, b) => {
        const direction =
          sorting.direction === 'asc'
            ? 1
            : -1;

        switch (sorting.column) {
          case 'player':
            return (
              a.player.localeCompare(
                b.player,
              ) * direction
            );

          case 'map':
            return (
              a.map.localeCompare(
                b.map,
              ) * direction
            );

          case 'time':
            return (
              a.time.localeCompare(
                b.time,
              ) * direction
            );

          default:
            return 0;
        }
      },
    );

    return (
      <DataTable<RecordRow>
        {...args}
        data={sortedData}
        sorting={sorting}
        onSortChange={setSorting}
      />
    );
  },
};

export const Paginated: Story = {
  render: (args) => {
    const [
      page,
      setPage,
    ] = useState(3);

    return (
      <DataTable<RecordRow>
        {...args}
        pagination={{
          page,
          pageCount: 12,
          showFirstLast: true,
          onPageChange: setPage,
        }}
      />
    );
  },
};

export const Selectable: Story = {
  render: (args) => {
    const [
      selectedKeys,
      setSelectedKeys,
    ] = useState<
      Set<DataTableRowKey>
    >(
      new Set(),
    );

    return (
      <div
        style={{
          display: 'grid',
          gap: '1rem',
        }}
      >
        <DataTable<RecordRow>
          {...args}
          selection={{
            selectedKeys,

            onSelectionChange:
              setSelectedKeys,
          }}
        />

        <div>
          Selected:{' '}
          {selectedKeys.size}
        </div>
      </div>
    );
  },
};

export const PartiallySelectable: Story = {
  render: (args) => {
    const [
      selectedKeys,
      setSelectedKeys,
    ] = useState<
      Set<DataTableRowKey>
    >(
      new Set(),
    );

    return (
      <DataTable<RecordRow>
        {...args}
        selection={{
          selectedKeys,

          onSelectionChange:
            setSelectedKeys,

          isRowSelectable: (
            row,
          ) => (
            row.type === 'PRO'
          ),
        }}
      />
    );
  },
};

export const ClickableRows: Story = {
  render: (args) => {
    const [
      openedRecord,
      setOpenedRecord,
    ] = useState<RecordRow | null>(
      null,
    );

    return (
      <div
        style={{
          display: 'grid',
          gap: '1rem',
        }}
      >
        <DataTable<RecordRow>
          {...args}
          columns={
            columnsWithActions
          }
          onRowClick={(row) => {
            setOpenedRecord(
              row,
            );
          }}
          getRowAriaLabel={(
            row,
          ) => (
            `Open record for ${row.player}`
          )}
        />

        <div>
          Opened:{' '}
          {openedRecord?.player
            ?? 'none'}
        </div>
      </div>
    );
  },
};

export const SelectableClickableRows: Story = {
  render: (args) => {
    const [
      selectedKeys,
      setSelectedKeys,
    ] = useState<
      Set<DataTableRowKey>
    >(
      new Set(),
    );

    const [
      openedRecord,
      setOpenedRecord,
    ] = useState<RecordRow | null>(
      null,
    );

    return (
      <div
        style={{
          display: 'grid',
          gap: '1rem',
        }}
      >
        <DataTable<RecordRow>
          {...args}
          columns={
            columnsWithActions
          }
          selection={{
            selectedKeys,
            onSelectionChange:
              setSelectedKeys,
          }}
          onRowClick={(row) => {
            setOpenedRecord(
              row,
            );
          }}
          getRowAriaLabel={(
            row,
          ) => (
            `Open record for ${row.player}`
          )}
        />

        <div>
          Selected:{' '}
          {selectedKeys.size}
          {' · '}
          Opened:{' '}
          {openedRecord?.player
            ?? 'none'}
        </div>
      </div>
    );
  },
};