import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import moment, { type Moment, type MomentInput } from 'moment';

export type FormattedDateTimeValue = string | number | null | undefined;

export interface FormattedDateTimeProps extends Omit<
  ComponentPropsWithoutRef<'time'>,
  'children' | 'dateTime'
> {
  /**
   * Date value to format.
   *
   * Numbers and numeric strings are interpreted as Unix
   * timestamps in seconds (except 0 and "0", which are
   * treated as missing values and render fallback).
   */
  value: FormattedDateTimeValue;

  /**
   * Moment display format.
   */
  format?: string;

  /**
   * Content rendered when the value is missing or invalid.
   */
  fallback?: ReactNode;

  /**
   * Formats and displays the value in UTC.
   *
   * By default, Moment displays the value using the
   * browser's local timezone.
   */
  utc?: boolean;

  /**
   * Enables Moment's strict parsing mode for non-numeric
   * string values when inputFormat is supplied.
   */
  strict?: boolean;

  /**
   * Expected format for non-numeric string values.
   *
   * When omitted, Moment uses its normal string parsing.
   */
  inputFormat?: moment.MomentFormatSpecification;
}

function isNumericString(value: string): boolean {
  const normalizedValue = value.trim();

  return normalizedValue !== '' && Number.isFinite(Number(normalizedValue));
}

type MissingFormattedDateTimeValue = null | undefined | '' | 0 | '0';

function isMissingValue(value: FormattedDateTimeValue): value is MissingFormattedDateTimeValue {
  return value === null || value === undefined || value === '' || value === 0 || value === '0';
}

function createDate(
  value: string | number,
  { inputFormat, strict, utc }: Pick<FormattedDateTimeProps, 'inputFormat' | 'strict' | 'utc'>,
): Moment {
  let date: Moment;

  if (typeof value === 'number' || isNumericString(value)) {
    date = moment.unix(Number(value));
  } else if (inputFormat !== undefined) {
    date = moment(value as MomentInput, inputFormat, strict);
  } else {
    date = moment(value as MomentInput);
  }

  return utc ? date.utc() : date;
}

export function FormattedDateTime({
  value,
  format = 'YYYY-MM-DD HH:mm',
  fallback = '?',
  utc = false,
  strict = false,
  inputFormat,
  ...timeProps
}: FormattedDateTimeProps) {
  if (isMissingValue(value)) {
    return <>{fallback}</>;
  }

  const date = createDate(value, {
    inputFormat,
    strict,
    utc,
  });

  if (!date.isValid()) {
    return <>{fallback}</>;
  }

  return (
    <time {...timeProps} data-slot="formatted-date-time" dateTime={date.toISOString()}>
      {date.format(format)}
    </time>
  );
}
