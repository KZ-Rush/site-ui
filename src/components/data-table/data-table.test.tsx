import {
  render,
  screen,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import {
  DataTable,
  type DataTableColumn,
  type DataTableRowKey,
} from './data-table';

interface TestRow {
  id: number;
  name: string;
  score: number;
}

const data: TestRow[] = [
  {
    id: 1,
    name: 'Alex',
    score: 100,
  },
  {
    id: 2,
    name: 'John',
    score: 90,
  },
];

const columns: DataTableColumn<TestRow>[] = [
  {
    id: 'name',
    header: 'Name',
    sortable: true,

    cell: (row) => row.name,
  },
  {
    id: 'score',
    header: 'Score',
    sortable: true,
    align: 'right',

    cell: (row) => row.score,
  },
];

function renderTable(
  props: Partial<
    React.ComponentProps<
      typeof DataTable<TestRow>
    >
  > = {},
) {
  return render(
    <DataTable<TestRow>
      columns={columns}
      data={data}
      getRowKey={(row) => row.id}
      {...props}
    />,
  );
}

describe('DataTable', () => {
  it('renders columns and rows', () => {
    renderTable();

    expect(
      screen.getByRole(
        'columnheader',
        {
          name: /Name/,
        },
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Alex'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('John'),
    ).toBeInTheDocument();
  });

  it('renders the empty state when data is empty', () => {
    renderTable({
      data: [],

      emptyTitle:
        'Nothing found',

      emptyDescription:
        'Try another filter.',
    });

    expect(
      screen.getByRole('heading', {
        name: 'Nothing found',
        level: 2,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Try another filter.',
      ),
    ).toBeInTheDocument();
  });

  it('renders loading skeleton rows', () => {
    renderTable({
      loading: true,
      loadingRows: 3,
    });

    const table =
      screen.getByRole('table');

    expect(table).toHaveAttribute(
      'aria-busy',
      'true',
    );

    expect(
      table.querySelectorAll(
        '[data-slot="skeleton"]',
      ),
    ).toHaveLength(
      columns.length * 3,
    );

    expect(
      screen.queryByText('Alex'),
    ).not.toBeInTheDocument();
  });

  it('shows loading state instead of data while loading', () => {
    renderTable({
      loading: true,
    });

    expect(
      screen.queryByText('Alex'),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole(
        'heading',
        {
          name: 'No results',
        },
      ),
    ).not.toBeInTheDocument();
  });

  it('requests ascending sorting for an unsorted column', async () => {
    const user = userEvent.setup();

    const onSortChange = vi.fn();

    renderTable({
      sorting: {
        column: 'score',
        direction: 'asc',
      },

      onSortChange,
    });

    await user.click(
      screen.getByRole(
        'button',
        {
          name: /Name/,
        },
      ),
    );

    expect(
      onSortChange,
    ).toHaveBeenCalledWith({
      column: 'name',
      direction: 'asc',
    });
  });

  it('toggles the active sort direction', async () => {
    const user = userEvent.setup();

    const onSortChange = vi.fn();

    renderTable({
      sorting: {
        column: 'score',
        direction: 'asc',
      },

      onSortChange,
    });

    await user.click(
      screen.getByRole(
        'button',
        {
          name: /Score/,
        },
      ),
    );

    expect(
      onSortChange,
    ).toHaveBeenCalledWith({
      column: 'score',
      direction: 'desc',
    });
  });

  it('exposes the current sort direction', () => {
    renderTable({
      sorting: {
        column: 'score',
        direction: 'desc',
      },
    });

    expect(
      screen.getByRole(
        'columnheader',
        {
          name: /Score/,
        },
      ),
    ).toHaveAttribute(
      'aria-sort',
      'descending',
    );
  });

  it('renders pagination when configured', () => {
    renderTable({
      pagination: {
        page: 2,
        pageCount: 5,
        onPageChange: () => {},
      },
    });

    expect(
      screen.getByRole(
        'navigation',
        {
          name: 'Pagination',
        },
      ),
    ).toBeInTheDocument();
  });

  it('forwards pagination changes', async () => {
    const user = userEvent.setup();

    const onPageChange = vi.fn();

    renderTable({
      pagination: {
        page: 2,
        pageCount: 5,
        onPageChange,
      },
    });

    await user.click(
      screen.getByRole(
        'button',
        {
          name: 'Go to next page',
        },
      ),
    );

    expect(
      onPageChange,
    ).toHaveBeenCalledWith(3);
  });

  it('hides pagination while loading', () => {
    renderTable({
      loading: true,

      pagination: {
        page: 2,
        pageCount: 5,
        onPageChange: () => {},
      },
    });

    expect(
      screen.queryByRole(
        'navigation',
        {
          name: 'Pagination',
        },
      ),
    ).not.toBeInTheDocument();
  });

  it('selects an individual row', async () => {
    const user = userEvent.setup();

    const onSelectionChange =
      vi.fn();

    renderTable({
      selection: {
        selectedKeys:
          new Set<DataTableRowKey>(),

        onSelectionChange,
      },
    });

    await user.click(
      screen.getByRole(
        'checkbox',
        {
          name: 'Select row 1',
        },
      ),
    );

    expect(
      onSelectionChange,
    ).toHaveBeenCalledOnce();

    const selection =
      onSelectionChange.mock
        .calls[0][0] as Set<DataTableRowKey>;

    expect(
      selection,
    ).toEqual(
      new Set([
        1,
      ]),
    );
  });

  it('selects an individual row', async () => {
    const user = userEvent.setup();

    const onSelectionChange =
      vi.fn();

    renderTable({
      selection: {
        selectedKeys:
          new Set<DataTableRowKey>(),

        onSelectionChange,
      },
    });

    await user.click(
      screen.getByRole(
        'checkbox',
        {
          name: 'Select row 1',
        },
      ),
    );

    expect(
      onSelectionChange,
    ).toHaveBeenCalledOnce();

    const selection =
      onSelectionChange.mock
        .calls[0][0] as Set<DataTableRowKey>;

    expect(
      selection,
    ).toEqual(
      new Set([
        1,
      ]),
    );
  });

  it('deselects an individual row', async () => {
    const user = userEvent.setup();

    const onSelectionChange =
      vi.fn();

    renderTable({
      selection: {
        selectedKeys:
          new Set<DataTableRowKey>([
            1,
          ]),

        onSelectionChange,
      },
    });

    await user.click(
      screen.getByRole(
        'checkbox',
        {
          name: 'Deselect row 1',
        },
      ),
    );

    const selection =
      onSelectionChange.mock
        .calls[0][0] as Set<DataTableRowKey>;

    expect(
      selection,
    ).toEqual(
      new Set(),
    );
  });

  it('selects all rows on the current page', async () => {
    const user = userEvent.setup();

    const onSelectionChange =
      vi.fn();

    renderTable({
      selection: {
        selectedKeys:
          new Set<DataTableRowKey>(),

        onSelectionChange,
      },
    });

    await user.click(
      screen.getByRole(
        'checkbox',
        {
          name:
            'Select all rows on this page',
        },
      ),
    );

    const selection =
      onSelectionChange.mock
        .calls[0][0] as Set<DataTableRowKey>;

    expect(selection).toEqual(
      new Set([
        1,
        2,
      ]),
    );
  });

  it('preserves selected keys outside the current page', async () => {
    const user = userEvent.setup();

    const onSelectionChange =
      vi.fn();

    renderTable({
      selection: {
        selectedKeys:
          new Set<DataTableRowKey>([
            100,
          ]),

        onSelectionChange,
      },
    });

    await user.click(
      screen.getByRole(
        'checkbox',
        {
          name:
            'Select all rows on this page',
        },
      ),
    );

    const selection =
      onSelectionChange.mock
        .calls[0][0] as Set<DataTableRowKey>;

    expect(selection).toEqual(
      new Set([
        100,
        1,
        2,
      ]),
    );
  });

  it('shows an indeterminate select-all state when some rows are selected', () => {
    renderTable({
      selection: {
        selectedKeys:
          new Set<DataTableRowKey>([
            1,
          ]),

        onSelectionChange:
          () => {},
      },
    });

    const checkbox =
      screen.getByRole(
        'checkbox',
        {
          name:
            'Select all rows on this page',
        },
      );

    expect(checkbox).toHaveAttribute(
      'aria-checked',
      'mixed',
    );

    expect(
      checkbox,
    ).toHaveProperty(
      'indeterminate',
      true,
    );
  });

  it('deselects all visible rows while preserving other keys', async () => {
    const user = userEvent.setup();

    const onSelectionChange =
      vi.fn();

    renderTable({
      selection: {
        selectedKeys:
          new Set<DataTableRowKey>([
            1,
            2,
            100,
          ]),

        onSelectionChange,
      },
    });

    await user.click(
      screen.getByRole(
        'checkbox',
        {
          name:
            'Deselect all rows on this page',
        },
      ),
    );

    const selection =
      onSelectionChange.mock
        .calls[0][0] as Set<DataTableRowKey>;

    expect(selection).toEqual(
      new Set([
        100,
      ]),
    );
  });

  it('does not allow non-selectable rows to be selected', () => {
    renderTable({
      selection: {
        selectedKeys:
          new Set(),

        onSelectionChange:
          () => {},

        isRowSelectable: (
          row,
        ) => row.id !== 2,
      },
    });

    expect(
      screen.getByRole(
        'checkbox',
        {
          name: 'Select row 2',
        },
      ),
    ).toBeDisabled();
  });

  it('select all ignores non-selectable rows', async () => {
    const user = userEvent.setup();

    const onSelectionChange =
      vi.fn();

    renderTable({
      selection: {
        selectedKeys:
          new Set(),

        onSelectionChange,

        isRowSelectable: (
          row,
        ) => row.id !== 2,
      },
    });

    await user.click(
      screen.getByRole(
        'checkbox',
        {
          name:
            'Select all rows on this page',
        },
      ),
    );

    const selection =
      onSelectionChange.mock
        .calls[0][0];

    expect(selection).toEqual(
      new Set([
        1,
      ]),
    );
  });
});