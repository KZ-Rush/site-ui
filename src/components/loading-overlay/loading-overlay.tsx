import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { classNames } from '../../utils/class-names';

import { Spinner, type SpinnerSize } from '../spinner';

import './loading-overlay.scss';

export type LoadingOverlayPosition = 'fixed' | 'absolute';

export interface LoadingOverlayProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Accessible description passed to the default spinner.
   */
  label?: string;

  /**
   * Size of the default spinner.
   */
  spinnerSize?: SpinnerSize;

  /**
   * Determines whether the overlay covers the viewport
   * or its nearest positioned ancestor.
   */
  position?: LoadingOverlayPosition;

  /**
   * Optional custom overlay content.
   *
   * When omitted, Spinner is rendered automatically.
   */
  children?: ReactNode;
}

export function LoadingOverlay({
  label = 'Loading',
  spinnerSize = 'lg',
  position = 'fixed',
  children,
  className,
  ...props
}: LoadingOverlayProps) {
  return (
    <div
      {...props}
      className={classNames('rush-loading-overlay', `rush-loading-overlay--${position}`, className)}
      data-position={position}
      data-slot="loading-overlay"
    >
      {children ?? <Spinner size={spinnerSize} label={label} />}
    </div>
  );
}
