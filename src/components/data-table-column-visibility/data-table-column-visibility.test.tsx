import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import type { DataTableColumn } from '../data-table';

import { DataTableColumnVisibility } from './data-table-column-visibility';

interface TestRow {
  id: number;
  name: string;
  score: number;
}

const columns: DataTableColumn<TestRow>[] = [
  {
    id: 'name',
    header: 'Name',
    cell: (row) => row.name,
  },

  {
    id: 'score',
    header: 'Score',
    cell: (row) => row.score,
  },
];

describe('DataTableColumnVisibility', () => {
  it('renders the trigger', () => {
    render(
      <DataTableColumnVisibility
        columns={columns}
        visibleColumns={new Set(['name', 'score'])}
        onVisibilityChange={() => {}}
      />,
    );

    expect(
      screen.getByRole('button', {
        name: 'Columns',
      }),
    ).toBeInTheDocument();
  });

  it('supports a custom trigger label', () => {
    render(
      <DataTableColumnVisibility
        columns={columns}
        visibleColumns={new Set(['name', 'score'])}
        onVisibilityChange={() => {}}
        label="Visible columns"
      />,
    );

    expect(
      screen.getByRole('button', {
        name: 'Visible columns',
      }),
    ).toBeInTheDocument();
  });

  it('renders hideable columns', async () => {
    const user = userEvent.setup();

    render(
      <DataTableColumnVisibility
        columns={columns}
        visibleColumns={new Set(['name', 'score'])}
        onVisibilityChange={() => {}}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Columns',
      }),
    );

    expect(
      screen.getByRole('menuitemcheckbox', {
        name: 'Name',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('menuitemcheckbox', {
        name: 'Score',
      }),
    ).toBeInTheDocument();
  });

  it('reflects the current visibility state', async () => {
    const user = userEvent.setup();

    render(
      <DataTableColumnVisibility
        columns={columns}
        visibleColumns={new Set(['name'])}
        onVisibilityChange={() => {}}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Columns',
      }),
    );

    expect(
      screen.getByRole('menuitemcheckbox', {
        name: 'Name',
      }),
    ).toHaveAttribute('aria-checked', 'true');

    expect(
      screen.getByRole('menuitemcheckbox', {
        name: 'Score',
      }),
    ).toHaveAttribute('aria-checked', 'false');
  });

  it('requests hiding a visible column', async () => {
    const user = userEvent.setup();

    const onVisibilityChange = vi.fn();

    render(
      <DataTableColumnVisibility
        columns={columns}
        visibleColumns={new Set(['name', 'score'])}
        onVisibilityChange={onVisibilityChange}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Columns',
      }),
    );

    await user.click(
      screen.getByRole('menuitemcheckbox', {
        name: 'Score',
      }),
    );

    expect(onVisibilityChange).toHaveBeenCalledOnce();

    const next = onVisibilityChange.mock.calls[0][0] as Set<string>;

    expect(next).toEqual(new Set(['name']));
  });

  it('requests showing a hidden column', async () => {
    const user = userEvent.setup();

    const onVisibilityChange = vi.fn();

    render(
      <DataTableColumnVisibility
        columns={columns}
        visibleColumns={new Set(['name'])}
        onVisibilityChange={onVisibilityChange}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Columns',
      }),
    );

    await user.click(
      screen.getByRole('menuitemcheckbox', {
        name: 'Score',
      }),
    );

    const next = onVisibilityChange.mock.calls[0][0] as Set<string>;

    expect(next).toEqual(new Set(['name', 'score']));
  });

  it('does not render non-hideable columns', async () => {
    const user = userEvent.setup();

    const customColumns: DataTableColumn<TestRow>[] = [
      {
        ...columns[0],
        hideable: false,
      },

      columns[1],
    ];

    render(
      <DataTableColumnVisibility
        columns={customColumns}
        visibleColumns={new Set(['name', 'score'])}
        onVisibilityChange={() => {}}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Columns',
      }),
    );

    expect(
      screen.queryByRole('menuitemcheckbox', {
        name: 'Name',
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole('menuitemcheckbox', {
        name: 'Score',
      }),
    ).toBeInTheDocument();
  });

  it('uses visibilityLabel instead of header when provided', async () => {
    const user = userEvent.setup();

    const customColumns: DataTableColumn<TestRow>[] = [
      {
        ...columns[0],

        header: <span>Complex name header</span>,

        visibilityLabel: 'Player name',
      },

      columns[1],
    ];

    render(
      <DataTableColumnVisibility
        columns={customColumns}
        visibleColumns={new Set(['name', 'score'])}
        onVisibilityChange={() => {}}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Columns',
      }),
    );

    expect(
      screen.getByRole('menuitemcheckbox', {
        name: 'Player name',
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('menuitemcheckbox', {
        name: 'Complex name header',
      }),
    ).not.toBeInTheDocument();
  });

  it('prevents hiding the last visible hideable column', async () => {
    const user = userEvent.setup();

    render(
      <DataTableColumnVisibility
        columns={columns}
        visibleColumns={new Set(['name'])}
        onVisibilityChange={() => {}}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Columns',
      }),
    );

    expect(
      screen.getByRole('menuitemcheckbox', {
        name: 'Name',
      }),
    ).toBeDisabled();

    expect(
      screen.getByRole('menuitemcheckbox', {
        name: 'Score',
      }),
    ).not.toBeDisabled();
  });

  it('allows hiding a visible column when another visible column remains', async () => {
    const user = userEvent.setup();

    render(
      <DataTableColumnVisibility
        columns={columns}
        visibleColumns={new Set(['name', 'score'])}
        onVisibilityChange={() => {}}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Columns',
      }),
    );

    expect(
      screen.getByRole('menuitemcheckbox', {
        name: 'Name',
      }),
    ).not.toBeDisabled();

    expect(
      screen.getByRole('menuitemcheckbox', {
        name: 'Score',
      }),
    ).not.toBeDisabled();
  });

  it('keeps the dropdown open after changing visibility', async () => {
    const user = userEvent.setup();

    render(
      <DataTableColumnVisibility
        columns={columns}
        visibleColumns={new Set(['name', 'score'])}
        onVisibilityChange={() => {}}
      />,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Columns',
      }),
    );

    await user.click(
      screen.getByRole('menuitemcheckbox', {
        name: 'Score',
      }),
    );

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('forwards a custom class to the trigger', () => {
    render(
      <DataTableColumnVisibility
        columns={columns}
        visibleColumns={new Set(['name', 'score'])}
        onVisibilityChange={() => {}}
        className="custom-trigger"
      />,
    );

    expect(
      screen.getByRole('button', {
        name: 'Columns',
      }),
    ).toHaveClass('custom-trigger');
  });
});
