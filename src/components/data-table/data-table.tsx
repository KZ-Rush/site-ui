import type {
  ReactNode,
} from 'react';

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

export interface DataTableProps<T> {
  columns: readonly DataTableColumn<T>[];

  data: readonly T[];

  /**
   * Stable key for each row.
   */
  getRowKey: (
    row: T,
    rowIndex: number,
  ) => string | number;

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
}: DataTableProps<T>) {
  const safeLoadingRows =
    Math.max(
      1,
      Math.floor(loadingRows),
    );

  const hasData =
    data.length > 0;

  return (
    <div
      className={classNames(
        'rush-data-table',
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
              {columns.map(
                (column) => (
                  <TableHead
                    key={column.id}
                    align={
                      column.align
                    }
                    className={
                      column.headerClassName
                    }
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
                    ) => (
                      <TableRow
                        key={
                          getRowKey(
                            row,
                            rowIndex,
                          )
                        }
                      >
                        {columns.map(
                          (
                            column,
                          ) => (
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
                              {column.cell(
                                row,
                                rowIndex,
                              )}
                            </TableCell>
                          ),
                        )}
                      </TableRow>
                    ),
                  )
                : (
                    <TableRow>
                      <TableCell
                        colSpan={
                          columns.length
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