import type {
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from 'react';

import {
  Checkbox,
} from '../checkbox';

import {
  EmptyState,
} from '../empty-state';

import {
  Pagination,
} from '../pagination';

import {
  Skeleton,
} from '../skeleton';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  type TableCellAlign,
  type TableDensity,
} from '../table';

import {
  classNames,
} from '../../utils/class-names';

import './data-table.scss';

export type DataTableSortDirection =
  | 'asc'
  | 'desc';

export interface DataTableSorting {
  column: string;
  direction: DataTableSortDirection;
}

export interface DataTableColumn<T> {
  /**
   * Stable column identifier.
   *
   * Used for sorting and React keys.
   */
  id: string;

  /**
   * Header content.
   */
  header: ReactNode;

  /**
   * Renders the cell value.
   */
  cell: (
    row: T,
    rowIndex: number,
  ) => ReactNode;

  /**
   * Cell/header alignment.
   */
  align?: TableCellAlign;

  /**
   * Whether the column can request sorting.
   */
  sortable?: boolean;

  /**
   * Whether the column is sticky on the left or right side of the table.
   */
  sticky?: 'left' | 'right';

  /**
   * Optional class applied to header cells.
   */
  headerClassName?: string;

  /**
   * Optional class applied to body cells.
   */
  cellClassName?: string;
}

export interface DataTablePagination {
  page: number;
  pageCount: number;
  siblingCount?: number;
  showFirstLast?: boolean;
  onPageChange: (page: number) => void;
}

export type DataTableResponsiveMode =
  | 'scroll'
  | 'none';

export type DataTableRowKey =
  | string
  | number;

export interface DataTableSelection<T> {
  /**
   * Currently selected row keys.
   */
  selectedKeys: ReadonlySet<DataTableRowKey>;

  /**
   * Called with the complete requested selection.
   */
  onSelectionChange: (
    selectedKeys: Set<DataTableRowKey>,
  ) => void;

  /**
   * Optional predicate for rows that cannot be selected.
   */
  isRowSelectable?: (
    row: T,
    rowIndex: number,
  ) => boolean;

  /**
   * Show the select-all checkbox in the header.
   */
  showSelectAll?: boolean;
}

export interface DataTableProps<T> {
  columns: readonly DataTableColumn<T>[];

  data: readonly T[];

  /**
   * Stable key for each row.
   */
  getRowKey: (
    row: T,
    rowIndex: number,
  ) => DataTableRowKey;

  /**
   * Called when an interactive row is activated
   * by mouse or keyboard.
   */
  onRowClick?: (
    row: T,
    rowIndex: number,
  ) => void;

  /**
   * Controls whether a particular row can be activated.
   *
   * Defaults to true when onRowClick is provided.
   */
  isRowClickable?: (
    row: T,
    rowIndex: number,
  ) => boolean;

  /**
   * Optional accessible label for clickable rows.
   */
  getRowAriaLabel?: (
    row: T,
    rowIndex: number,
  ) => string | undefined;

  /**
   * Whether loading placeholders should be shown.
   */
  loading?: boolean;

  /**
   * Number of skeleton rows shown while loading.
   */
  loadingRows?: number;

  /**
   * Empty-state title.
   */
  emptyTitle?: ReactNode;

  /**
   * Empty-state description.
   */
  emptyDescription?: ReactNode;

  /**
   * Optional empty-state action.
   */
  emptyAction?: ReactNode;

  /**
   * Controlled sorting state.
   */
  sorting?: DataTableSorting;

  /**
   * Called when a sortable column requests another state.
   */
  onSortChange?: (
    sorting: DataTableSorting,
  ) => void;

  pagination?: DataTablePagination;

  striped?: boolean;
  hoverable?: boolean;
  density?: TableDensity;

  className?: string;
  tableClassName?: string;

  /**
   * Accessible table caption.
   */
  caption?: ReactNode;

  selection?: DataTableSelection<T>;

  /**
   * Controls how the table behaves on small screens.
   *
   * - `scroll` (default): Table is horizontally scrollable.
   * - `none`: Table is not scrollable and may overflow its container.
   */
  responsive?: DataTableResponsiveMode;
}

function getNextSortDirection(
  currentSorting: DataTableSorting | undefined,
  columnId: string,
): DataTableSortDirection {
  if (
    currentSorting?.column !== columnId
  ) {
    return 'asc';
  }

  return currentSorting.direction === 'asc'
    ? 'desc'
    : 'asc';
}

interface SortButtonProps {
  columnId: string;
  children: ReactNode;
  sorting?: DataTableSorting;

  onSortChange?: (
    sorting: DataTableSorting,
  ) => void;
}

function SortButton({
  columnId,
  children,
  sorting,
  onSortChange,
}: SortButtonProps) {
  const active =
    sorting?.column === columnId;

  const direction =
    active
      ? sorting.direction
      : undefined;

  return (
    <button
      type="button"
      className={classNames(
        'rush-data-table__sort',
        active
          && 'rush-data-table__sort--active',
      )}
      data-direction={direction}
      data-slot="data-table-sort"
      onClick={() => {
        onSortChange?.({
          column: columnId,

          direction:
            getNextSortDirection(
              sorting,
              columnId,
            ),
        });
      }}
    >
      <span className="rush-data-table__sort-label">
        {children}
      </span>

      <span
        aria-hidden="true"
        className="rush-data-table__sort-indicator"
      >
        {direction === 'asc'
          ? '↑'
          : direction === 'desc'
            ? '↓'
            : '↕'}
      </span>
    </button>
  );
}

const interactiveElementSelector = [
  'a[href]',
  'button',
  'input',
  'label',
  'select',
  'textarea',
  '[role="button"]',
  '[role="checkbox"]',
  '[role="link"]',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function isInteractiveElement(
  target: EventTarget | null,
  currentTarget: HTMLElement,
): boolean {
  if (!(target instanceof Element)) {
    return false;
  }

  const interactiveElement =
    target.closest(
      interactiveElementSelector,
    );

  return interactiveElement != null
    && interactiveElement !== currentTarget
    && currentTarget.contains(
      interactiveElement,
    );
}

export function DataTable<T>({
  columns,
  data,
  getRowKey,

  loading = false,
  loadingRows = 5,

  emptyTitle = 'No results',
  emptyDescription,
  emptyAction,

  sorting,
  onSortChange,

  pagination,

  striped = false,
  hoverable = true,
  density = 'default',

  className,
  tableClassName,

  caption,

  selection,
  responsive = 'scroll',

  onRowClick,
  isRowClickable,
  getRowAriaLabel,
}: DataTableProps<T>) {
  const safeLoadingRows =
    Math.max(
      1,
      Math.floor(loadingRows),
    );

  const hasData =
    data.length > 0;

  const selectableRows =
    selection == null
      ? []
      : data
          .map(
            (
              row,
              rowIndex,
            ) => ({
              row,
              rowIndex,
              key: getRowKey(
                row,
                rowIndex,
              ),
            }),
          )
          .filter(
            ({
              row,
              rowIndex,
            }) => (
              selection.isRowSelectable?.(
                row,
                rowIndex,
              )
              ?? true
            ),
          );

  const selectedSelectableCount =
    selection == null
      ? 0
      : selectableRows.filter(
          ({ key }) => (
            selection.selectedKeys.has(
              key,
            )
          ),
        ).length;

  const allSelectableSelected =
    selectableRows.length > 0
    && selectedSelectableCount
      === selectableRows.length;

  const someSelectableSelected =
    selectedSelectableCount > 0
    && !allSelectableSelected;

  const setRowSelected = (
    key: DataTableRowKey,
    selected: boolean,
  ): void => {
    if (!selection) {
      return;
    }

    const next =
      new Set(
        selection.selectedKeys,
      );

    if (selected) {
      next.add(key);
    } else {
      next.delete(key);
    }

    selection.onSelectionChange(
      next,
    );
  };

  const setAllVisibleSelected = (
    selected: boolean,
  ): void => {
    if (!selection) {
      return;
    }

    const next =
      new Set(
        selection.selectedKeys,
      );

    for (
      const {
        key,
      } of selectableRows
    ) {
      if (selected) {
        next.add(key);
      } else {
        next.delete(key);
      }
    }

    selection.onSelectionChange(
      next,
    );
  };

  return (
    <div
      className={classNames(
        'rush-data-table',
        `rush-data-table--responsive-${responsive}`,
        className,
      )}
      data-loading={
        loading || undefined
      }
      data-slot="data-table"
    >
      <TableContainer>
        <Table
          striped={striped}
          hoverable={hoverable}
          density={density}
          className={tableClassName}
          aria-busy={
            loading || undefined
          }
        >
          {caption != null && (
            <TableCaption>
              {caption}
            </TableCaption>
          )}

          <TableHeader>
            <TableRow>
              {selection != null && (
                <TableHead
                  className="rush-data-table__selection-cell"
                  align="center"
                  aria-label="Selection"
                >
                  {selection.showSelectAll !== false && (
                    <Checkbox
                      checked={
                        allSelectableSelected
                      }
                      indeterminate={
                        someSelectableSelected
                      }
                      disabled={
                        selectableRows.length === 0
                      }
                      aria-label={
                        allSelectableSelected
                          ? 'Deselect all rows on this page'
                          : 'Select all rows on this page'
                      }
                      onCheckedChange={
                        setAllVisibleSelected
                      }
                    />
                  )}
                </TableHead>
              )}

              {columns.map(
                (column) => (
                  <TableHead
                    key={column.id}
                    align={
                      column.align
                    }
                    className={classNames(
                      column.headerClassName,
                      column.sticky
                        && `rush-data-table__cell--sticky-${column.sticky}`,
                    )}
                    aria-sort={
                      sorting?.column
                        === column.id
                        ? (
                            sorting.direction
                            === 'asc'
                              ? 'ascending'
                              : 'descending'
                          )
                        : undefined
                    }
                  >
                    {column.sortable ? (
                      <SortButton
                        columnId={
                          column.id
                        }
                        sorting={sorting}
                        onSortChange={
                          onSortChange
                        }
                      >
                        {column.header}
                      </SortButton>
                    ) : (
                      column.header
                    )}
                  </TableHead>
                ),
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from(
                {
                  length:
                    safeLoadingRows,
                },
                (_, rowIndex) => (
                  <TableRow
                    key={
                      `loading-${rowIndex}`
                    }
                  >
                    {selection != null && (
                      <TableCell
                        className="rush-data-table__selection-cell"
                        align="center"
                      >
                        <Skeleton
                          variant="block"
                          style={{
                            width: '1.25rem',
                            height: '1.25rem',
                            marginInline: 'auto',
                          }}
                        />
                      </TableCell>
                    )}

                    {columns.map(
                      (column) => (
                        <TableCell
                          key={
                            column.id
                          }
                          align={
                            column.align
                          }
                          className={
                            column.cellClassName
                          }
                        >
                          <Skeleton
                            style={{
                              height:
                                '1rem',

                              width:
                                column.align
                                === 'right'
                                  ? '60%'
                                  : '80%',

                              marginLeft:
                                column.align
                                === 'right'
                                  ? 'auto'
                                  : undefined,
                            }}
                          />
                        </TableCell>
                      ),
                    )}
                  </TableRow>
                ),
              )
            ) : (
              hasData
                ? data.map(
                    (
                      row,
                      rowIndex,
                    ) => {
                      const rowKey =
                        getRowKey(
                          row,
                          rowIndex,
                        );

                      const selectable =
                        selection?.isRowSelectable?.(
                          row,
                          rowIndex,
                        )
                        ?? true;

                      const selected =
                        selection?.selectedKeys.has(
                          rowKey,
                        )
                        ?? false;

                      const clickable =
                        onRowClick != null
                        && (
                          isRowClickable?.(
                            row,
                            rowIndex,
                          )
                          ?? true
                        );

                      const handleRowClick = (
                        event: MouseEvent<HTMLTableRowElement>,
                      ): void => {
                        if (
                          !clickable
                          || onRowClick == null
                        ) {
                          return;
                        }

                        if (
                          isInteractiveElement(
                            event.target,
                            event.currentTarget,
                          )
                        ) {
                          return;
                        }

                        onRowClick(
                          row,
                          rowIndex,
                        );
                      };

                      const handleRowKeyDown = (
                        event: KeyboardEvent<HTMLTableRowElement>,
                      ): void => {
                        if (
                          !clickable
                          || onRowClick == null
                        ) {
                          return;
                        }

                        /*
                        * If keyboard input originated from a control inside
                        * the row, let that control handle it.
                        */
                        if (
                          event.target !== event.currentTarget
                        ) {
                          return;
                        }

                        if (
                          event.key !== 'Enter'
                          && event.key !== ' '
                        ) {
                          return;
                        }

                        event.preventDefault();

                        onRowClick(
                          row,
                          rowIndex,
                        );
                      };

                      return (
                        <TableRow
                          key={rowKey}
                          selected={selected}
                          tabIndex={
                            clickable
                              ? 0
                              : undefined
                          }
                          aria-label={
                            clickable
                              ? getRowAriaLabel?.(
                                  row,
                                  rowIndex,
                                )
                              : undefined
                          }
                          className={classNames(
                            clickable
                              && 'rush-data-table__row--clickable',
                          )}
                          data-clickable={
                            clickable || undefined
                          }
                          onClick={handleRowClick}
                          onKeyDown={handleRowKeyDown}
                        >
                          {selection != null && (
                            <TableCell
                              align="center"
                              className="rush-data-table__selection-cell"
                            >
                              <Checkbox
                                checked={selected}
                                disabled={!selectable}
                                aria-label={
                                  selected
                                    ? `Deselect row ${rowIndex + 1}`
                                    : `Select row ${rowIndex + 1}`
                                }
                                onCheckedChange={(
                                  checked,
                                ) => {
                                  if (!selectable) {
                                    return;
                                  }

                                  setRowSelected(
                                    rowKey,
                                    checked,
                                  );
                                }}
                              />
                            </TableCell>
                          )}

                          {columns.map(
                            (column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                className={classNames(
                                  column.cellClassName,
                                  column.sticky &&
                                    `rush-data-table__cell--sticky-${column.sticky}`,
                                )}
                              >
                                {column.cell(
                                  row,
                                  rowIndex,
                                )}
                              </TableCell>
                            ),
                          )}
                        </TableRow>
                      );
                    },
                  )
                : (
                    <TableRow>
                      <TableCell
                        colSpan={
                          columns.length
                          + (
                            selection != null
                              ? 1
                              : 0
                          )
                        }
                        className="rush-data-table__empty-cell"
                      >
                        <EmptyState
                          title={
                            emptyTitle
                          }
                          description={
                            emptyDescription
                          }
                          action={
                            emptyAction
                          }
                        />
                      </TableCell>
                    </TableRow>
                  )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!loading
        && pagination != null
        && pagination.pageCount > 0 && (
          <div
            className="rush-data-table__pagination"
            data-slot="data-table-pagination"
          >
            <Pagination
              page={
                pagination.page
              }
              pageCount={
                pagination.pageCount
              }
              siblingCount={
                pagination.siblingCount
              }
              showFirstLast={
                pagination.showFirstLast
              }
              onPageChange={
                pagination.onPageChange
              }
            />
          </div>
        )}
    </div>
  );
}