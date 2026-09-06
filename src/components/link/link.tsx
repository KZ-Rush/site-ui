import type { ComponentPropsWithRef } from 'react';

import { classNames } from '../../utils/class-names';

import './link.scss';

export interface LinkProps extends Omit<ComponentPropsWithRef<'a'>, 'href'> {
  /**
   * Destination of the link.
   */
  href: string;

  /**
   * Disables navigation while preserving the link text.
   */
  disabled?: boolean;
}

export function Link({
  className,
  disabled = false,
  href,
  onClick,
  tabIndex,
  ...props
}: LinkProps) {
  return (
    <a
      {...props}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      className={classNames('rush-link', className)}
      data-disabled={disabled || undefined}
      data-slot="link"
      tabIndex={disabled ? -1 : tabIndex}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();

          return;
        }

        onClick?.(event);
      }}
    />
  );
}
