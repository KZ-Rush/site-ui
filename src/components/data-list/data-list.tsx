import type { ComponentPropsWithRef } from 'react';

import { classNames } from '../../utils/class-names';

import './data-list.scss';

export type DataListOrientation = 'horizontal' | 'vertical';

export interface DataListProps extends ComponentPropsWithRef<'dl'> {
  /**
   * Places terms beside their values or above them.
   */
  orientation?: DataListOrientation;
}

export function DataList({ className, orientation = 'horizontal', ...props }: DataListProps) {
  return (
    <dl
      {...props}
      className={classNames('rush-data-list', className)}
      data-orientation={orientation}
      data-slot="data-list"
    />
  );
}

export type DataListItemProps = ComponentPropsWithRef<'div'>;

export function DataListItem({ className, ...props }: DataListItemProps) {
  return (
    <div
      {...props}
      className={classNames('rush-data-list__item', className)}
      data-slot="data-list-item"
    />
  );
}

export type DataListTermProps = ComponentPropsWithRef<'dt'>;

export function DataListTerm({ className, ...props }: DataListTermProps) {
  return (
    <dt
      {...props}
      className={classNames('rush-data-list__term', className)}
      data-slot="data-list-term"
    />
  );
}

export type DataListValueProps = ComponentPropsWithRef<'dd'>;

export function DataListValue({ className, ...props }: DataListValueProps) {
  return (
    <dd
      {...props}
      className={classNames('rush-data-list__value', className)}
      data-slot="data-list-value"
    />
  );
}
