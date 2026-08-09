import type {
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';

import {
  classNames,
} from '../../utils/class-names';

import './empty-state.scss';

export interface EmptyStateProps
  extends Omit<
    ComponentPropsWithoutRef<'div'>,
    'title'
  > {
  /**
   * Main empty-state message.
   */
  title: ReactNode;

  /**
   * Optional explanatory text.
   */
  description?: ReactNode;

  /**
   * Optional visual displayed above the title.
   *
   * The component intentionally does not depend
   * on a particular icon library.
   */
  icon?: ReactNode;

  /**
   * Primary action.
   */
  action?: ReactNode;

  /**
   * Optional secondary action.
   */
  secondaryAction?: ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  secondaryAction,
  className,
  ...props
}: EmptyStateProps) {
  const hasActions =
    action != null
    || secondaryAction != null;

  return (
    <div
      {...props}
      className={classNames(
        'rush-empty-state',
        className,
      )}
      data-slot="empty-state"
    >
      {icon != null && (
        <div
          className="rush-empty-state__icon"
          data-slot="empty-state-icon"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      <div
        className="rush-empty-state__content"
        data-slot="empty-state-content"
      >
        <h2
          className="rush-empty-state__title"
          data-slot="empty-state-title"
        >
          {title}
        </h2>

        {description != null && (
          <div
            className="rush-empty-state__description"
            data-slot="empty-state-description"
          >
            {description}
          </div>
        )}
      </div>

      {hasActions && (
        <div
          className="rush-empty-state__actions"
          data-slot="empty-state-actions"
        >
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}