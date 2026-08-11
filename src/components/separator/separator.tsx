import type { ComponentPropsWithoutRef } from 'react';

import { classNames } from '../../utils/class-names';

import './separator.scss';

export type SeparatorOrientation = 'horizontal' | 'vertical';

export interface SeparatorProps extends Omit<ComponentPropsWithoutRef<'div'>, 'role'> {
  /**
   * Direction of the separator.
   */
  orientation?: SeparatorOrientation;

  /**
   * When true, the separator is purely visual
   * and hidden from assistive technologies.
   */
  decorative?: boolean;
}

export function Separator({
  orientation = 'horizontal',
  decorative = false,
  className,
  ...props
}: SeparatorProps) {
  return (
    <div
      {...props}
      role={decorative ? undefined : 'separator'}
      aria-hidden={decorative ? true : undefined}
      aria-orientation={decorative ? undefined : orientation}
      className={classNames('rush-separator', `rush-separator--${orientation}`, className)}
      data-orientation={orientation}
      data-slot="separator"
    />
  );
}
