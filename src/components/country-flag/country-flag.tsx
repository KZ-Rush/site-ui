import type { ComponentPropsWithRef, CSSProperties } from 'react';

import { classNames } from '../../utils/class-names';

import { getCountryFlagMetadata, resolveCountryFlagCode } from './country-flag-data';

import './country-flag.scss';

export type CountryFlagFallback = 'unknown' | 'none';

export interface CountryFlagProps extends Omit<
  ComponentPropsWithRef<'span'>,
  'aria-hidden' | 'aria-label' | 'children' | 'role'
> {
  /**
   * Supported country or legacy flag code. Codes are normalized
   * to lowercase, and common aliases such as `uk` are accepted.
   */
  code: string | null | undefined;

  /**
   * Accessible country name. Omit it when adjacent text already
   * identifies the country and the flag is decorative.
   */
  label?: string;

  /**
   * Rendering behavior for an empty or unsupported code.
   */
  fallback?: CountryFlagFallback;
}

interface CountryFlagStyle extends CSSProperties {
  '--rush-country-flag-height': string;
  '--rush-country-flag-position-y': string;
  '--rush-country-flag-width': string;
}

export function CountryFlag({
  className,
  code,
  fallback = 'unknown',
  label,
  ref,
  style,
  ...props
}: CountryFlagProps) {
  const resolvedCode = resolveCountryFlagCode(code) ?? (fallback === 'unknown' ? 'unk' : null);

  if (!resolvedCode) {
    return null;
  }

  const { height, offsetY, width } = getCountryFlagMetadata(resolvedCode);

  const countryFlagStyle: CountryFlagStyle = {
    '--rush-country-flag-height': `${height}px`,
    '--rush-country-flag-position-y': `-${offsetY}px`,
    '--rush-country-flag-width': `${width}px`,
    ...style,
  };

  const hasAccessibleLabel = Boolean(label);

  return (
    <span
      {...props}
      ref={ref}
      aria-hidden={hasAccessibleLabel ? undefined : true}
      aria-label={hasAccessibleLabel ? label : undefined}
      role={hasAccessibleLabel ? 'img' : undefined}
      className={classNames('rush-country-flag', className)}
      data-country-code={resolvedCode}
      data-slot="country-flag"
      style={countryFlagStyle}
    />
  );
}
