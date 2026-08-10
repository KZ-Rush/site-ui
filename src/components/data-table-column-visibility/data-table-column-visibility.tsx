import type {
  ReactNode,
} from 'react';

import {
  Dropdown,
  DropdownCheckboxItem,
  DropdownContent,
  DropdownTrigger,
} from '../dropdown';

import type {
  DataTableColumn,
} from '../data-table';

export interface DataTableColumnVisibilityProps<T> {
  columns: readonly DataTableColumn<T>[];

  visibleColumns: ReadonlySet<string>;

  onVisibilityChange: (
    visibleColumns: Set<string>,
  ) => void;

  label?: ReactNode;

  className?: string;
}

export function DataTableColumnVisibility<T>({
  columns,
  visibleColumns,
  onVisibilityChange,
  label = 'Columns',
  className,
}: DataTableColumnVisibilityProps<T>) {
  const hideableColumns =
    columns.filter(
      (column) => (
        column.hideable !== false
      ),
    );

  const visibleHideableCount =
    hideableColumns.filter(
      (column) => (
        visibleColumns.has(
          column.id,
        )
      ),
    ).length;

  const toggleColumn = (
    columnId: string,
    visible: boolean,
  ): void => {
    const next =
      new Set(
        visibleColumns,
      );

    if (visible) {
      next.add(columnId);
    } else {
      next.delete(columnId);
    }

    onVisibilityChange(
      next,
    );
  };

  return (
    <Dropdown>
      <DropdownTrigger
        className={className}
      >
        {label}
      </DropdownTrigger>

      <DropdownContent align="end">
        {hideableColumns.map(
          (column) => {
            const visible =
              visibleColumns.has(
                column.id,
              );

            const lastVisible =
              visible
              && visibleHideableCount === 1;

            return (
              <DropdownCheckboxItem
                key={column.id}
                checked={visible}
                disabled={lastVisible}
                onCheckedChange={(
                  checked,
                ) => {
                  toggleColumn(
                    column.id,
                    checked,
                  );
                }}
              >
                {column.visibilityLabel
                  ?? column.header}
              </DropdownCheckboxItem>
            );
          },
        )}
      </DropdownContent>
    </Dropdown>
  );
}