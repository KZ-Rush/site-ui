import type {
  ComponentPropsWithoutRef,
} from 'react';

import {
  createContext,
  useContext,
} from 'react';

import {
  classNames,
} from '../../utils/class-names';

import './table.scss';

export type TableDensity =
  | 'default'
  | 'compact';

interface TableContextValue {
  striped: boolean;
  hoverable: boolean;
  density: TableDensity;
}

const TableContext =
  createContext<TableContextValue>({
    striped: false,
    hoverable: true,
    density: 'default',
  });

function useTableContext():
  TableContextValue {
  return useContext(TableContext);
}

export interface TableProps
  extends ComponentPropsWithoutRef<'table'> {
  striped?: boolean;
  hoverable?: boolean;
  density?: TableDensity;
}

export function Table({
  striped = false,
  hoverable = true,
  density = 'default',
  className,
  children,
  ...props
}: TableProps) {
  return (
    <TableContext.Provider
      value={{
        striped,
        hoverable,
        density,
      }}
    >
      <table
        {...props}
        className={classNames(
          'rush-table',
          `rush-table--density-${density}`,
          striped
            && 'rush-table--striped',
          hoverable
            && 'rush-table--hoverable',
          className,
        )}
        data-density={density}
        data-hoverable={
          hoverable || undefined
        }
        data-slot="table"
        data-striped={
          striped || undefined
        }
      >
        {children}
      </table>
    </TableContext.Provider>
  );
}

export type TableContainerProps =
  ComponentPropsWithoutRef<'div'>;

export function TableContainer({
  className,
  ...props
}: TableContainerProps) {
  return (
    <div
      {...props}
      className={classNames(
        'rush-table-container',
        className,
      )}
      data-slot="table-container"
    />
  );
}

export type TableHeaderProps =
  ComponentPropsWithoutRef<'thead'>;

export function TableHeader({
  className,
  ...props
}: TableHeaderProps) {
  return (
    <thead
      {...props}
      className={classNames(
        'rush-table__header',
        className,
      )}
      data-slot="table-header"
    />
  );
}

export type TableBodyProps =
  ComponentPropsWithoutRef<'tbody'>;

export function TableBody({
  className,
  ...props
}: TableBodyProps) {
  return (
    <tbody
      {...props}
      className={classNames(
        'rush-table__body',
        className,
      )}
      data-slot="table-body"
    />
  );
}

export type TableFooterProps =
  ComponentPropsWithoutRef<'tfoot'>;

export function TableFooter({
  className,
  ...props
}: TableFooterProps) {
  return (
    <tfoot
      {...props}
      className={classNames(
        'rush-table__footer',
        className,
      )}
      data-slot="table-footer"
    />
  );
}

export interface TableRowProps
  extends ComponentPropsWithoutRef<'tr'> {
  selected?: boolean;
}

export function TableRow({
  selected = false,
  className,
  ...props
}: TableRowProps) {
  const {
    hoverable,
  } = useTableContext();

  return (
    <tr
      {...props}
      aria-selected={
        selected || undefined
      }
      className={classNames(
        'rush-table__row',
        hoverable
          && 'rush-table__row--hoverable',
        selected
          && 'rush-table__row--selected',
        className,
      )}
      data-selected={
        selected || undefined
      }
      data-slot="table-row"
    />
  );
}

export type TableCellAlign =
  | 'left'
  | 'center'
  | 'right';

interface TableCellSharedProps {
  align?: TableCellAlign;
}

export interface TableHeadProps
  extends Omit<
    ComponentPropsWithoutRef<'th'>,
    'align'
  >,
    TableCellSharedProps {}

export function TableHead({
  align = 'left',
  className,
  scope = 'col',
  ...props
}: TableHeadProps) {
  return (
    <th
      {...props}
      scope={scope}
      className={classNames(
        'rush-table__head',
        `rush-table__cell--align-${align}`,
        className,
      )}
      data-align={align}
      data-slot="table-head"
    />
  );
}

export interface TableCellProps
  extends Omit<
    ComponentPropsWithoutRef<'td'>,
    'align'
  >,
    TableCellSharedProps {}

export function TableCell({
  align = 'left',
  className,
  ...props
}: TableCellProps) {
  return (
    <td
      {...props}
      className={classNames(
        'rush-table__cell',
        `rush-table__cell--align-${align}`,
        className,
      )}
      data-align={align}
      data-slot="table-cell"
    />
  );
}

export type TableCaptionProps =
  ComponentPropsWithoutRef<'caption'>;

export function TableCaption({
  className,
  ...props
}: TableCaptionProps) {
  return (
    <caption
      {...props}
      className={classNames(
        'rush-table__caption',
        className,
      )}
      data-slot="table-caption"
    />
  );
}