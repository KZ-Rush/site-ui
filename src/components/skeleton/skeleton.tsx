import type {
  ComponentPropsWithoutRef,
} from 'react';

import {
  classNames,
} from '../../utils/class-names';

import './skeleton.scss';

export type SkeletonVariant =
  | 'block'
  | 'circle';

export interface SkeletonProps
  extends ComponentPropsWithoutRef<'div'> {
  /**
   * Visual shape of the skeleton.
   */
  variant?: SkeletonVariant;

  /**
   * Whether the loading shimmer animation is enabled.
   */
  animated?: boolean;
}

export function Skeleton({
  variant = 'block',
  animated = true,
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      {...props}
      aria-hidden="true"
      className={classNames(
        'rush-skeleton',
        `rush-skeleton--${variant}`,
        animated
          && 'rush-skeleton--animated',
        className,
      )}
      data-animated={
        animated || undefined
      }
      data-slot="skeleton"
      data-variant={variant}
    />
  );
}