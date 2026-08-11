import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { classNames } from '../../utils/class-names';

import './alert.scss';

export type AlertVariant = 'default' | 'destructive' | 'warning' | 'info' | 'success' | 'notice';

export interface AlertProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Visual and semantic alert type.
   */
  variant?: AlertVariant;

  /**
   * Optional icon rendered before the alert content.
   */
  icon?: ReactNode;
}

export function Alert({
  variant = 'default',
  icon,
  className,
  children,
  role,
  ...props
}: AlertProps) {
  const resolvedRole = role ?? (variant === 'destructive' ? 'alert' : 'status');

  return (
    <div
      {...props}
      className={classNames('rush-alert', `rush-alert--${variant}`, className)}
      data-slot="alert"
      data-variant={variant}
      role={resolvedRole}
    >
      {icon !== undefined && icon !== null && (
        <span aria-hidden="true" className="rush-alert__icon" data-slot="alert-icon">
          {icon}
        </span>
      )}

      <div className="rush-alert__body">{children}</div>
    </div>
  );
}

export type AlertTitleProps = ComponentPropsWithoutRef<'h3'>;

export function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <h3 {...props} className={classNames('rush-alert__title', className)} data-slot="alert-title" />
  );
}

export type AlertDescriptionProps = ComponentPropsWithoutRef<'div'>;

export function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return (
    <div
      {...props}
      className={classNames('rush-alert__description', className)}
      data-slot="alert-description"
    />
  );
}

export interface AlertListProps extends Omit<ComponentPropsWithoutRef<'ul'>, 'children'> {
  messages: readonly string[];
}

export function AlertList({ messages, className, ...props }: AlertListProps) {
  const uniqueMessages = Array.from(
    new Set(messages.map((message) => message.trim()).filter(Boolean)),
  );

  if (uniqueMessages.length === 0) {
    return null;
  }

  return (
    <ul {...props} className={classNames('rush-alert__list', className)} data-slot="alert-list">
      {uniqueMessages.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
}
