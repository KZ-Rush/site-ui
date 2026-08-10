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

import {
  DataTableToolbar,
} from '../data-table-toolbar';

import {
  Input,
} from '../input';

import {
  Select,
} from '../select';

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
  {
    id: 4,
    player: 'SpeedRunner',
    map: 'kz_beginner',
    type: 'PRO',
    time: '00:47.11',
  },
  {
    id: 5,
    player: 'Climber',
    map: 'kz_extreme',
    type: 'NUB',
    time: '03:18.20',
  },
  {
    id: 6,
    player: 'Jumper',
    map: 'kz_simple',
    type: 'PRO',
    time: '01:05.73',
  },
  {
    id: 7,
    player: 'Runner',
    map: 'kz_master',
    type: 'PRO',
    time: '01:41.92',
  },
  {
    id: 8,
    player: 'OldSchool',
    map: 'kz_legacy',
    type: 'NUB',
    time: '02:51.04',
  },
  {
    id: 9,
    player: 'FastPlayer',
    map: 'kz_speed',
    type: 'PRO',
    time: '00:54.37',
  },
  {
    id: 10,
    player: 'Kreedzer',
    map: 'kz_jump',
    type: 'NUB',
    time: '02:03.66',
  },
  {
    id: 11,
    player: 'Veteran',
    map: 'kz_old',
    type: 'PRO',
    time: '01:35.28',
  },
  {
    id: 12,
    player: 'NewPlayer',
    map: 'kz_training',
    type: 'NUB',
    time: '04:12.10',
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
    sortable: true,

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
      sticky: 'right',

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

export const CompleteExample: Story = {
  render: (args) => {
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');
    const [page, setPage] = useState(1);

    const [sorting, setSorting] =
      useState<DataTableSorting>({
        column: 'time',
        direction: 'asc',
      });

    const [selectedKeys, setSelectedKeys] =
      useState<Set<DataTableRowKey>>(
        new Set(),
      );

    const [openedRecord, setOpenedRecord] =
      useState<RecordRow | null>(null);

    const pageSize = 5;

    const filteredData = records.filter(
      (record) => {
        const normalizedSearch =
          search
            .trim()
            .toLowerCase();

        const matchesSearch =
          normalizedSearch === ''
          || record.player
            .toLowerCase()
            .includes(
              normalizedSearch,
            )
          || record.map
            .toLowerCase()
            .includes(
              normalizedSearch,
            );

        const matchesType =
          type === ''
          || record.type === type;

        return (
          matchesSearch
          && matchesType
        );
      },
    );

    const sortedData = [
      ...filteredData,
    ].sort((a, b) => {
      const direction =
        sorting.direction === 'asc'
          ? 1
          : -1;

      switch (sorting.column) {
        case 'player':
          return (
            a.player.localeCompare(
              b.player,
            )
            * direction
          );

        case 'map':
          return (
            a.map.localeCompare(
              b.map,
            )
            * direction
          );

        case 'type':
          return (
            a.type.localeCompare(
              b.type,
            )
            * direction
          );

        case 'time':
          return (
            a.time.localeCompare(
              b.time,
            )
            * direction
          );

        default:
          return 0;
      }
    });

    const pageCount =
      Math.max(
        1,
        Math.ceil(
          sortedData.length
          / pageSize,
        ),
      );

    const currentPage =
      Math.min(
        page,
        pageCount,
      );

    const start =
      (currentPage - 1)
      * pageSize;

    const pageData =
      sortedData.slice(
        start,
        start + pageSize,
      );

    const clearSelection = (): void => {
      setSelectedKeys(
        new Set(),
      );
    };

    return (
      <div
        style={{
          display: 'grid',
          gap: '1rem',
        }}
      >
        <DataTableToolbar
          start={(
            <>
              <div
                style={{
                  width: '18rem',
                }}
              >
                <Input
                  type="search"
                  placeholder="Search player or map..."
                  aria-label="Search records"
                  value={search}
                  onChange={(event) => {
                    setSearch(
                      event.currentTarget.value,
                    );

                    setPage(1);
                  }}
                />
              </div>

              <div
                style={{
                  width: '10rem',
                }}
              >
                <Select
                  aria-label="Record type"
                  value={type}
                  onChange={(event) => {
                    setType(
                      event.currentTarget.value,
                    );

                    setPage(1);
                  }}
                >
                  <option value="">
                    All types
                  </option>

                  <option value="PRO">
                    PRO
                  </option>

                  <option value="NUB">
                    NUB
                  </option>
                </Select>
              </div>
            </>
          )}

          selection={
            selectedKeys.size > 0
              ? (
                <span>
                  {selectedKeys.size}{' '}
                  selected
                </span>
              )
              : undefined
          }

          end={
            selectedKeys.size > 0
              ? (
                <>
                  <Button
                    variant="outline"
                    onClick={
                      clearSelection
                    }
                  >
                    Clear
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => {
                      clearSelection();
                    }}
                  >
                    Delete selected
                  </Button>
                </>
              )
              : (
                <Button>
                  Add record
                </Button>
              )
          }
        />

        <DataTable<RecordRow>
          {...args}
          data={pageData}
          sorting={sorting}
          onSortChange={(
            nextSorting,
          ) => {
            setSorting(
              nextSorting,
            );

            setPage(1);
          }}
          selection={{
            selectedKeys,
            onSelectionChange:
              setSelectedKeys,
          }}
          pagination={{
            page: currentPage,
            pageCount,
            showFirstLast: true,

            onPageChange:
              setPage,
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
          emptyTitle="No records found"
          emptyDescription="Try changing the search text or filters."
        />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.875rem',
          }}
        >
          <span>
            Results:{' '}
            {filteredData.length}
          </span>

          <span>
            Selected:{' '}
            {selectedKeys.size}
          </span>

          <span>
            Opened:{' '}
            {openedRecord?.player
              ?? 'none'}
          </span>
        </div>
      </div>
    );
  },
};

export const ResponsiveScroll: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          width: '22rem',
        }}
      >
        <Story />
      </div>
    ),
  ],

  render: (args) => (
    <DataTable<RecordRow>
      {...args}
      columns={columnsWithActions}
      selection={{
        selectedKeys: new Set(),
        onSelectionChange: () => {},
      }}
    />
  ),
};