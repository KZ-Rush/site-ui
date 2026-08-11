import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import { DataTable, type DataTableColumn, type DataTableRowKey } from './data-table';

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

function renderTable(props: Partial<React.ComponentProps<typeof DataTable<TestRow>>> = {}) {
  return render(
    <DataTable<TestRow> columns={columns} data={data} getRowKey={(row) => row.id} {...props} />,
  );
}

describe('DataTable', () => {
  it('renders columns and rows', () => {
    renderTable();

    expect(
      screen.getByRole('columnheader', {
        name: /Name/,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText('Alex')).toBeInTheDocument();

    expect(screen.getByText('John')).toBeInTheDocument();
  });

  it('renders the empty state when data is empty', () => {
    renderTable({
      data: [],

      emptyTitle: 'Nothing found',

      emptyDescription: 'Try another filter.',
    });

    expect(
      screen.getByRole('heading', {
        name: 'Nothing found',
        level: 2,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText('Try another filter.')).toBeInTheDocument();
  });

  it('renders loading skeleton rows', () => {
    renderTable({
      loading: true,
      loadingRows: 3,
    });

    const table = screen.getByRole('table');

    expect(table).toHaveAttribute('aria-busy', 'true');

    expect(table.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(columns.length * 3);

    expect(screen.queryByText('Alex')).not.toBeInTheDocument();
  });

  it('shows loading state instead of data while loading', () => {
    renderTable({
      loading: true,
    });

    expect(screen.queryByText('Alex')).not.toBeInTheDocument();

    expect(
      screen.queryByRole('heading', {
        name: 'No results',
      }),
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
      screen.getByRole('button', {
        name: /Name/,
      }),
    );

    expect(onSortChange).toHaveBeenCalledWith({
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
      screen.getByRole('button', {
        name: /Score/,
      }),
    );

    expect(onSortChange).toHaveBeenCalledWith({
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
      screen.getByRole('columnheader', {
        name: /Score/,
      }),
    ).toHaveAttribute('aria-sort', 'descending');
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
      screen.getByRole('navigation', {
        name: 'Pagination',
      }),
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
      screen.getByRole('button', {
        name: 'Go to next page',
      }),
    );

    expect(onPageChange).toHaveBeenCalledWith(3);
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
      screen.queryByRole('navigation', {
        name: 'Pagination',
      }),
    ).not.toBeInTheDocument();
  });

  it('selects an individual row', async () => {
    const user = userEvent.setup();

    const onSelectionChange = vi.fn();

    renderTable({
      selection: {
        selectedKeys: new Set<DataTableRowKey>(),

        onSelectionChange,
      },
    });

    await user.click(
      screen.getByRole('checkbox', {
        name: 'Select row 1',
      }),
    );

    expect(onSelectionChange).toHaveBeenCalledOnce();

    const selection = onSelectionChange.mock.calls[0][0] as Set<DataTableRowKey>;

    expect(selection).toEqual(new Set([1]));
  });

  it('selects an individual row', async () => {
    const user = userEvent.setup();

    const onSelectionChange = vi.fn();

    renderTable({
      selection: {
        selectedKeys: new Set<DataTableRowKey>(),

        onSelectionChange,
      },
    });

    await user.click(
      screen.getByRole('checkbox', {
        name: 'Select row 1',
      }),
    );

    expect(onSelectionChange).toHaveBeenCalledOnce();

    const selection = onSelectionChange.mock.calls[0][0] as Set<DataTableRowKey>;

    expect(selection).toEqual(new Set([1]));
  });

  it('deselects an individual row', async () => {
    const user = userEvent.setup();

    const onSelectionChange = vi.fn();

    renderTable({
      selection: {
        selectedKeys: new Set<DataTableRowKey>([1]),

        onSelectionChange,
      },
    });

    await user.click(
      screen.getByRole('checkbox', {
        name: 'Deselect row 1',
      }),
    );

    const selection = onSelectionChange.mock.calls[0][0] as Set<DataTableRowKey>;

    expect(selection).toEqual(new Set());
  });

  it('selects all rows on the current page', async () => {
    const user = userEvent.setup();

    const onSelectionChange = vi.fn();

    renderTable({
      selection: {
        selectedKeys: new Set<DataTableRowKey>(),

        onSelectionChange,
      },
    });

    await user.click(
      screen.getByRole('checkbox', {
        name: 'Select all rows on this page',
      }),
    );

    const selection = onSelectionChange.mock.calls[0][0] as Set<DataTableRowKey>;

    expect(selection).toEqual(new Set([1, 2]));
  });

  it('preserves selected keys outside the current page', async () => {
    const user = userEvent.setup();

    const onSelectionChange = vi.fn();

    renderTable({
      selection: {
        selectedKeys: new Set<DataTableRowKey>([100]),

        onSelectionChange,
      },
    });

    await user.click(
      screen.getByRole('checkbox', {
        name: 'Select all rows on this page',
      }),
    );

    const selection = onSelectionChange.mock.calls[0][0] as Set<DataTableRowKey>;

    expect(selection).toEqual(new Set([100, 1, 2]));
  });

  it('shows an indeterminate select-all state when some rows are selected', () => {
    renderTable({
      selection: {
        selectedKeys: new Set<DataTableRowKey>([1]),

        onSelectionChange: () => {},
      },
    });

    const checkbox = screen.getByRole('checkbox', {
      name: 'Select all rows on this page',
    });

    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');

    expect(checkbox).toHaveProperty('indeterminate', true);
  });

  it('deselects all visible rows while preserving other keys', async () => {
    const user = userEvent.setup();

    const onSelectionChange = vi.fn();

    renderTable({
      selection: {
        selectedKeys: new Set<DataTableRowKey>([1, 2, 100]),

        onSelectionChange,
      },
    });

    await user.click(
      screen.getByRole('checkbox', {
        name: 'Deselect all rows on this page',
      }),
    );

    const selection = onSelectionChange.mock.calls[0][0] as Set<DataTableRowKey>;

    expect(selection).toEqual(new Set([100]));
  });

  it('does not allow non-selectable rows to be selected', () => {
    renderTable({
      selection: {
        selectedKeys: new Set(),

        onSelectionChange: () => {},

        isRowSelectable: (row) => row.id !== 2,
      },
    });

    expect(
      screen.getByRole('checkbox', {
        name: 'Select row 2',
      }),
    ).toBeDisabled();
  });

  it('select all ignores non-selectable rows', async () => {
    const user = userEvent.setup();

    const onSelectionChange = vi.fn();

    renderTable({
      selection: {
        selectedKeys: new Set(),

        onSelectionChange,

        isRowSelectable: (row) => row.id !== 2,
      },
    });

    await user.click(
      screen.getByRole('checkbox', {
        name: 'Select all rows on this page',
      }),
    );

    const selection = onSelectionChange.mock.calls[0][0];

    expect(selection).toEqual(new Set([1]));
  });

  it('activates a clickable row', async () => {
    const user = userEvent.setup();

    const onRowClick = vi.fn();

    renderTable({
      onRowClick,
    });

    await user.click(screen.getByText('Alex'));

    expect(onRowClick).toHaveBeenCalledWith(data[0], 0);
  });

  it('makes clickable rows keyboard focusable', () => {
    renderTable({
      onRowClick: () => {},
    });

    const row = screen.getByText('Alex').closest('tr');

    expect(row).toHaveAttribute('tabindex', '0');

    expect(row).toHaveAttribute('data-clickable', 'true');
  });

  it('does not make ordinary rows interactive', () => {
    renderTable();

    const row = screen.getByText('Alex').closest('tr');

    expect(row).not.toHaveAttribute('tabindex');

    expect(row).not.toHaveAttribute('data-clickable');
  });

  it('activates a row with Enter', async () => {
    const user = userEvent.setup();

    const onRowClick = vi.fn();

    renderTable({
      onRowClick,
    });

    const row = screen.getByText('Alex').closest('tr');

    expect(row).not.toBeNull();

    if (!row) {
      return;
    }

    row.focus();

    await user.keyboard('{Enter}');

    expect(onRowClick).toHaveBeenCalledWith(data[0], 0);
  });

  it('activates a row with Space', async () => {
    const user = userEvent.setup();

    const onRowClick = vi.fn();

    renderTable({
      onRowClick,
    });

    const row = screen.getByText('Alex').closest('tr');

    expect(row).not.toBeNull();

    if (!row) {
      return;
    }

    row.focus();

    await user.keyboard(' ');

    expect(onRowClick).toHaveBeenCalledWith(data[0], 0);
  });

  it('does not activate the row when selection checkbox is clicked', async () => {
    const user = userEvent.setup();

    const onRowClick = vi.fn();

    const onSelectionChange = vi.fn();

    renderTable({
      onRowClick,

      selection: {
        selectedKeys: new Set<DataTableRowKey>(),

        onSelectionChange,
      },
    });

    await user.click(
      screen.getByRole('checkbox', {
        name: 'Select row 1',
      }),
    );

    expect(onSelectionChange).toHaveBeenCalledOnce();

    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('does not activate the row when a nested button is clicked', async () => {
    const user = userEvent.setup();

    const onRowClick = vi.fn();

    const onEdit = vi.fn();

    const actionColumns: DataTableColumn<TestRow>[] = [
      ...columns,

      {
        id: 'actions',
        header: 'Actions',

        cell: () => <button onClick={onEdit}>Edit</button>,
      },
    ];

    render(
      <DataTable<TestRow>
        columns={actionColumns}
        data={data}
        getRowKey={(row) => row.id}
        onRowClick={onRowClick}
      />,
    );

    await user.click(
      screen.getAllByRole('button', {
        name: 'Edit',
      })[0],
    );

    expect(onEdit).toHaveBeenCalledOnce();

    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('does not activate the row when a nested link is clicked', async () => {
    const user = userEvent.setup();

    const onRowClick = vi.fn();

    const linkColumns: DataTableColumn<TestRow>[] = [
      {
        id: 'name',
        header: 'Name',

        cell: (row) => <a href={`#${row.id}`}>{row.name}</a>,
      },
    ];

    render(
      <DataTable<TestRow>
        columns={linkColumns}
        data={data}
        getRowKey={(row) => row.id}
        onRowClick={onRowClick}
      />,
    );

    await user.click(
      screen.getByRole('link', {
        name: 'Alex',
      }),
    );

    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('supports non-clickable rows', async () => {
    const user = userEvent.setup();

    const onRowClick = vi.fn();

    renderTable({
      onRowClick,

      isRowClickable: (row) => row.id !== 2,
    });

    const firstRow = screen.getByText('Alex').closest('tr');

    const secondRow = screen.getByText('John').closest('tr');

    expect(firstRow).toHaveAttribute('tabindex', '0');

    expect(secondRow).not.toHaveAttribute('tabindex');

    await user.click(screen.getByText('John'));

    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('supports accessible labels for clickable rows', () => {
    renderTable({
      onRowClick: () => {},

      getRowAriaLabel: (row) => `Open ${row.name}`,
    });

    const row = screen.getByText('Alex').closest('tr');

    expect(row).toHaveAttribute('aria-label', 'Open Alex');
  });

  it('does not activate the row when the checkbox visual control is clicked', async () => {
    const user = userEvent.setup();

    const onRowClick = vi.fn();

    const onSelectionChange = vi.fn();

    renderTable({
      onRowClick,

      selection: {
        selectedKeys: new Set<DataTableRowKey>(),

        onSelectionChange,
      },
    });

    const checkbox = screen.getByRole('checkbox', {
      name: 'Select row 1',
    });

    const checkboxRoot = checkbox.closest('[data-slot="checkbox"]');

    expect(checkboxRoot).not.toBeNull();

    if (!checkboxRoot) {
      return;
    }

    const icon = checkboxRoot.querySelector('[data-slot="checkbox-icon"]');

    expect(icon).not.toBeNull();

    if (!icon) {
      return;
    }

    await user.click(icon);

    expect(onSelectionChange).toHaveBeenCalled();

    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('applies sticky column classes', () => {
    const stickyColumns: DataTableColumn<TestRow>[] = [
      {
        id: 'name',
        header: 'Name',
        sticky: 'left',
        cell: (row) => row.name,
      },
      {
        id: 'score',
        header: 'Score',
        sticky: 'right',
        cell: (row) => row.score,
      },
    ];

    render(<DataTable<TestRow> columns={stickyColumns} data={data} getRowKey={(row) => row.id} />);

    expect(
      screen.getByRole('columnheader', {
        name: 'Name',
      }),
    ).toHaveClass('rush-data-table__cell--sticky-left');

    expect(
      screen.getByRole('columnheader', {
        name: 'Score',
      }),
    ).toHaveClass('rush-data-table__cell--sticky-right');
  });

  it('hides columns not included in visibleColumns', () => {
    renderTable({
      columnVisibility: {
        visibleColumns: new Set(['name']),
      },
    });

    expect(
      screen.getByRole('columnheader', {
        name: 'Name',
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('columnheader', {
        name: 'Score',
      }),
    ).not.toBeInTheDocument();

    expect(screen.queryByText('100')).not.toBeInTheDocument();
  });

  it('keeps the selection column when data columns are hidden', () => {
    renderTable({
      columnVisibility: {
        visibleColumns: new Set(['name']),
      },

      selection: {
        selectedKeys: new Set(),

        onSelectionChange: () => {},
      },
    });

    expect(
      screen.getByRole('checkbox', {
        name: 'Select all rows on this page',
      }),
    ).toBeInTheDocument();
  });
});
