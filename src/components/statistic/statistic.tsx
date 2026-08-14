import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { classNames } from '../../utils/class-names';

import { NumberDiff } from '../number-diff';

import './statistic.scss';

export interface StatisticProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title' | 'prefix'> {
  title: ReactNode;

  value: number | string;

  diff?: number;

  precision?: number;

  prefix?: ReactNode;

  suffix?: ReactNode;

  locale?: string;

  formatter?: (value: number | string) => ReactNode;
}

export function Statistic({
  title,
  value,
  diff,
  precision,
  prefix,
  suffix,
  locale,
  formatter,
  className,
  ...props
}: StatisticProps) {
  let renderedValue: ReactNode;

  if (formatter) {
    renderedValue = formatter(value);
  } else if (typeof value === 'number') {
    renderedValue = new Intl.NumberFormat(
      locale,
      precision === undefined
        ? undefined
        : {
            minimumFractionDigits: precision,
            maximumFractionDigits: precision,
          },
    ).format(value);
  } else {
    renderedValue = value;
  }

  return (
    <div {...props} className={classNames('rush-statistic', className)} data-slot="statistic">
      <div className="rush-statistic__title" data-slot="statistic-title">
        {title}
      </div>

      <div className="rush-statistic__value" data-slot="statistic-value">
        {prefix != null && <span className="rush-statistic__prefix">{prefix}</span>}

        <span>{renderedValue}</span>

        {suffix != null && <span className="rush-statistic__suffix">{suffix}</span>}
      </div>

      {diff !== undefined && diff !== 0 && (
        <div className="rush-statistic__diff" data-slot="statistic-diff">
          <NumberDiff value={diff} />
        </div>
      )}
    </div>
  );
}
