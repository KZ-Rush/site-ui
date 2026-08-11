import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { classNames } from '../../utils/class-names';

import './page-header.scss';

export interface PageHeaderProps extends Omit<
  ComponentPropsWithoutRef<'header'>,
  'children' | 'title'
> {
  /**
   * Page title.
   */
  title: ReactNode;

  /**
   * Optional explanatory text below the title.
   */
  description?: ReactNode;

  /**
   * Optional breadcrumb navigation.
   */
  breadcrumbs?: ReactNode;

  /**
   * Optional actions displayed alongside the title.
   */
  actions?: ReactNode;

  /**
   * Additional class applied to the title area.
   */
  contentClassName?: string;

  /**
   * Additional class applied to the action container.
   */
  actionsClassName?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  contentClassName,
  actionsClassName,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <header
      {...props}
      className={classNames('rush-page-header', className)}
      data-slot="page-header"
    >
      {breadcrumbs !== undefined && breadcrumbs !== null && (
        <div className="rush-page-header__breadcrumbs" data-slot="page-header-breadcrumbs">
          {breadcrumbs}
        </div>
      )}

      <div className="rush-page-header__body">
        <div className={classNames('rush-page-header__content', contentClassName)}>
          <h1 className="rush-page-header__title" data-slot="page-header-title">
            {title}
          </h1>

          {description !== undefined && description !== null && (
            <div className="rush-page-header__description" data-slot="page-header-description">
              {description}
            </div>
          )}
        </div>

        {actions !== undefined && actions !== null && (
          <div
            className={classNames('rush-page-header__actions', actionsClassName)}
            data-slot="page-header-actions"
          >
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
