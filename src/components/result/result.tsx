import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { classNames } from '../../utils/class-names';

import './result.scss';

export type ResultStatus = 'primary' | 'success' | 'info' | 'warning' | 'error';

export interface ResultProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  status?: ResultStatus;

  icon?: ReactNode;

  title: ReactNode;

  description?: ReactNode;

  actions?: ReactNode;
}

function ResultIcon({ status }: { status: ResultStatus }) {
  const symbol = {
    primary: '●',
    success: '✓',
    info: 'i',
    warning: '!',
    error: '×',
  }[status];

  return (
    <span aria-hidden="true" className="rush-result__status-symbol">
      {symbol}
    </span>
  );
}

export function Result({
  status = 'primary',
  icon,
  title,
  description,
  actions,
  className,
  ...props
}: ResultProps) {
  return (
    <div
      {...props}
      className={classNames('rush-result', `rush-result--${status}`, className)}
      data-status={status}
      data-slot="result"
    >
      <div className="rush-result__icon" data-slot="result-icon">
        {icon ?? <ResultIcon status={status} />}
      </div>

      <div className="rush-result__title" data-slot="result-title">
        {title}
      </div>

      {description != null && (
        <div className="rush-result__description" data-slot="result-description">
          {description}
        </div>
      )}

      {actions != null && (
        <div className="rush-result__actions" data-slot="result-actions">
          {actions}
        </div>
      )}
    </div>
  );
}
