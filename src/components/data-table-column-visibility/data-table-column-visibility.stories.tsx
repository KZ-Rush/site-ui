import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import type { DataTableColumn } from '../data-table';

import { DataTableColumnVisibility } from './data-table-column-visibility';

interface ExampleRow {
  id: number;
  player: string;
  map: string;
  type: string;
  time: string;
}

const columns: DataTableColumn<ExampleRow>[] = [
  {
    id: 'player',
    header: 'Player',
    cell: (row) => row.player,
  },
  {
    id: 'map',
    header: 'Map',
    cell: (row) => row.map,
  },
  {
    id: 'type',
    header: 'Type',
    cell: (row) => row.type,
  },
  {
    id: 'time',
    header: 'Time',
    cell: (row) => row.time,
  },
];

const meta = {
  title: 'Components/DataTableColumnVisibility',

  component: DataTableColumnVisibility<ExampleRow>,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },

  args: {
    columns,

    visibleColumns: new Set(columns.map((column) => column.id)),

    onVisibilityChange: () => {},

    label: 'Columns',
  },

  argTypes: {
    columns: {
      control: false,
    },

    visibleColumns: {
      control: false,
    },

    onVisibilityChange: {
      control: false,
    },

    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof DataTableColumnVisibility<ExampleRow>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `<DataTableColumnVisibility
  columns={columns}
  visibleColumns={visibleColumns}
  onVisibilityChange={setVisibleColumns}
  label="Columns"
/>`,
      },
    },
  },

  render: (args) => {
    const [visibleColumns, setVisibleColumns] = useState(new Set(args.visibleColumns));

    return (
      <DataTableColumnVisibility
        {...args}
        visibleColumns={visibleColumns}
        onVisibilityChange={setVisibleColumns}
      />
    );
  },
};

export const NonHideableColumn: Story = {
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `<DataTableColumnVisibility
  columns={customColumns}
  visibleColumns={visibleColumns}
  onVisibilityChange={setVisibleColumns}
  label="Columns"
/>`,
      },
    },
  },

  render: (args) => {
    const customColumns: DataTableColumn<ExampleRow>[] = [
      {
        ...columns[0],
        hideable: false,
      },

      ...columns.slice(1),
    ];

    const [visibleColumns, setVisibleColumns] = useState(
      new Set(customColumns.map((column) => column.id)),
    );

    return (
      <DataTableColumnVisibility
        {...args}
        columns={customColumns}
        visibleColumns={visibleColumns}
        onVisibilityChange={setVisibleColumns}
      />
    );
  },
};

export const CustomLabels: Story = {
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `<DataTableColumnVisibility
  columns={customColumns}
  visibleColumns={visibleColumns}
  onVisibilityChange={setVisibleColumns}
  label="Columns"
/>`,
      },
    },
  },

  render: (args) => {
    const customColumns: DataTableColumn<ExampleRow>[] = [
      {
        ...columns[0],
        visibilityLabel: 'Player name',
      },

      ...columns.slice(1),
    ];

    const [visibleColumns, setVisibleColumns] = useState(
      new Set(customColumns.map((column) => column.id)),
    );

    return (
      <DataTableColumnVisibility
        {...args}
        columns={customColumns}
        visibleColumns={visibleColumns}
        onVisibilityChange={setVisibleColumns}
      />
    );
  },
};
