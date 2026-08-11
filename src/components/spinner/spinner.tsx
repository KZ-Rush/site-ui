import type { ComponentPropsWithoutRef } from 'react';

import { classNames } from '../../utils/class-names';

import './spinner.scss';

export type SpinnerSize = 'sm' | 'default' | 'lg';

export interface SpinnerProps extends ComponentPropsWithoutRef<'span'> {
  /**
   * Visual size of the spinner.
   */
  size?: SpinnerSize;

  /**
   * Accessible loading description.
   */
  label?: string;
}

export function Spinner({
  size = 'default',
  label = 'Loading',
  className,
  ...props
}: SpinnerProps) {
  return (
    <span
      {...props}
      role="status"
      aria-label={label}
      className={classNames('rush-spinner', `rush-spinner--${size}`, className)}
      data-size={size}
      data-slot="spinner"
    />
  );
}
