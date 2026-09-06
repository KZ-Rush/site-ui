import type { ComponentPropsWithRef } from 'react';

import { classNames } from '../../utils/class-names';

import './spoiler.scss';

export type SpoilerVariant = 'default' | 'link';

export interface SpoilerProps extends ComponentPropsWithRef<'details'> {
  /**
   * Visual presentation of the disclosure.
   */
  variant?: SpoilerVariant;
}

export function Spoiler({ className, variant = 'default', ...props }: SpoilerProps) {
  return (
    <details
      {...props}
      className={classNames('rush-spoiler', `rush-spoiler--variant-${variant}`, className)}
      data-slot="spoiler"
      data-variant={variant}
    />
  );
}

export type SpoilerSummaryProps = ComponentPropsWithRef<'summary'>;

export function SpoilerSummary({ className, children, ...props }: SpoilerSummaryProps) {
  return (
    <summary
      {...props}
      className={classNames('rush-spoiler__summary', className)}
      data-slot="spoiler-summary"
    >
      <span className="rush-spoiler__summary-label">{children}</span>

      <svg
        aria-hidden="true"
        className="rush-spoiler__indicator"
        viewBox="0 0 20 20"
        fill="none"
        focusable="false"
      >
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </summary>
  );
}

export type SpoilerContentProps = ComponentPropsWithRef<'div'>;

export function SpoilerContent({ className, ...props }: SpoilerContentProps) {
  return (
    <div
      {...props}
      className={classNames('rush-spoiler__content', className)}
      data-slot="spoiler-content"
    />
  );
}
