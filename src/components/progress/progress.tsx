import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ReactNode,
} from 'react';

import { classNames } from '../../utils/class-names';

import './progress.scss';

export interface ProgressProps
  extends Omit<
    ComponentPropsWithoutRef<'div'>,
    'children'
  > {
  /**
   * Progress percentage.
   *
   * Finite values are clamped to the 0–100 range.
   * Invalid values are treated as 0.
   */
  progress: number;

  /**
   * Controls whether the value is displayed over the bar.
   */
  showValue?: boolean;

  /**
   * Customizes the visible progress value.
   */
  formatValue?: (progress: number) => ReactNode;
}

function normalizeProgress(progress: number): number {
  if (!Number.isFinite(progress)) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(0, progress),
  );
}

export function Progress({
  progress,
  showValue = true,
  formatValue = (value) => `${value}%`,
  className,
  'aria-label': ariaLabel = 'Progress',
  ...divProps
}: ProgressProps) {
  const normalizedProgress =
    normalizeProgress(progress);

  const style = {
    '--rush-progress-value':
      `${normalizedProgress}%`,
  } as CSSProperties;

  return (
    <div
      {...divProps}
      aria-label={ariaLabel}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={normalizedProgress}
      className={classNames(
        'rush-progress',
        className,
      )}
      data-slot="progress"
      role="progressbar"
    >
      <div
        aria-hidden="true"
        className="rush-progress__track"
        data-slot="progress-track"
      >
        <div
          className="rush-progress__fill"
          data-slot="progress-fill"
          style={style}
        />
      </div>

      {showValue && (
        <div
          aria-hidden="true"
          className="rush-progress__value"
          data-slot="progress-value"
        >
          {formatValue(normalizedProgress)}
        </div>
      )}
    </div>
  );
}