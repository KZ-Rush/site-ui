import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { classNames } from '../../utils/class-names';

import './data-table-toolbar.scss';

export interface DataTableToolbarProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Primary toolbar content, usually search
   * and filter controls.
   */
  start?: ReactNode;

  /**
   * Content displayed instead of the start region,
   * usually while rows are selected.
   */
  selection?: ReactNode;

  /**
   * Actions aligned to the end of the toolbar.
   */
  end?: ReactNode;
}

export function DataTableToolbar({
  start,
  selection,
  end,
  className,
  ...props
}: DataTableToolbarProps) {
  const activeStart = selection ?? start;

  return (
    <div
      {...props}
      className={classNames(
        'rush-data-table-toolbar',
        selection != null && 'rush-data-table-toolbar--selection',
        className,
      )}
      data-selection={selection != null || undefined}
      data-slot="data-table-toolbar"
    >
      {activeStart != null && (
        <div className="rush-data-table-toolbar__start" data-slot="data-table-toolbar-start">
          {activeStart}
        </div>
      )}

      {end != null && (
        <div className="rush-data-table-toolbar__end" data-slot="data-table-toolbar-end">
          {end}
        </div>
      )}
    </div>
  );
}
