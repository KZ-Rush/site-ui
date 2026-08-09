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
  Badge,
} from '../badge';

import {
  DataTable,
  type DataTableColumn,
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
});