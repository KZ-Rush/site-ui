import type {
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';

import { classNames } from '../../utils/class-names';

import './number-diff.scss';

export type NumberDiffSign =
  | 'positive'
  | 'negative'
  | 'neutral'
  | 'invalid';

export interface NumberDiffProps
  extends Omit<ComponentPropsWithoutRef<'span'>, 'children'> {
  /**
   * Numeric difference to display.
   */
  value: number;

  /**
   * Optional content rendered after the formatted value.
   */
  label?: ReactNode;

  /**
   * Locale used by Intl.NumberFormat.
   *
   * When omitted, the browser's current locale is used.
   */
  locale?: Intl.LocalesArgument;

  /**
   * Additional Intl.NumberFormat options.
   */
  formatOptions?: Intl.NumberFormatOptions;

  /**
   * Content rendered when value is NaN or infinite.
   */
  fallback?: ReactNode;

  /**
   * Whether to render a leading plus sign for positive
   * values.
   */
  showPositiveSign?: boolean;
}

function getSign(value: number): NumberDiffSign {
  if (!Number.isFinite(value)) {
    return 'invalid';
  }

  if (value > 0) {
    return 'positive';
  }

  if (value < 0) {
    return 'negative';
  }

  return 'neutral';
}

export function NumberDiff({
  value,
  label,
  locale,
  formatOptions,
  fallback = '?',
  showPositiveSign = true,
  className,
  ...spanProps
}: NumberDiffProps) {
  const sign = getSign(value);

  if (sign === 'invalid') {
    return (
      <span
        {...spanProps}
        className={classNames(
          'rush-number-diff',
          'rush-number-diff--invalid',
          className,
        )}
        data-sign="invalid"
        data-slot="number-diff"
      >
        {fallback}
      </span>
    );
  }

  /*
   * Math.abs(-0) is 0, so negative zero is displayed as a
   * neutral zero.
   */
  const absoluteValue = Math.abs(value);

  const formattedValue = new Intl.NumberFormat(
    locale,
    formatOptions,
  ).format(absoluteValue);

  let prefix = '';

  if (sign === 'positive' && showPositiveSign) {
    prefix = '+';
  } else if (sign === 'negative') {
    prefix = '−';
  }

  return (
    <span
      {...spanProps}
      className={classNames(
        'rush-number-diff',
        `rush-number-diff--${sign}`,
        className,
      )}
      data-sign={sign}
      data-slot="number-diff"
    >
      <span
        className="rush-number-diff__value"
        data-slot="number-diff-value"
      >
        {prefix}
        {formattedValue}
      </span>

      {label !== undefined && label !== null && (
        <>
          {' '}

          <span
            className="rush-number-diff__label"
            data-slot="number-diff-label"
          >
            {label}
          </span>
        </>
      )}
    </span>
  );
}