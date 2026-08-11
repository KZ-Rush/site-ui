import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { classNames } from '../../utils/class-names';

import './input.scss';

export type InputSize = 'sm' | 'default' | 'lg';

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  /**
   * Visual size of the input.
   */
  size?: InputSize;

  /**
   * Marks the field as invalid.
   *
   * This also sets aria-invalid unless the consumer
   * explicitly provides another value.
   */
  invalid?: boolean;

  /**
   * Optional content displayed before the input.
   */
  startAdornment?: ReactNode;

  /**
   * Optional content displayed after the input.
   */
  endAdornment?: ReactNode;

  /**
   * Class applied directly to the native input.
   */
  inputClassName?: string;
}

export function Input({
  size = 'default',
  invalid = false,
  startAdornment,
  endAdornment,
  inputClassName,
  className,
  'aria-invalid': ariaInvalid,
  disabled,
  ...props
}: InputProps) {
  const hasStartAdornment = startAdornment != null;

  const hasEndAdornment = endAdornment != null;

  const resolvedAriaInvalid = ariaInvalid ?? (invalid ? true : undefined);

  return (
    <div
      className={classNames(
        'rush-input',
        `rush-input--${size}`,
        invalid && 'rush-input--invalid',
        disabled && 'rush-input--disabled',
        hasStartAdornment && 'rush-input--with-start-adornment',
        hasEndAdornment && 'rush-input--with-end-adornment',
        className,
      )}
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
      data-size={size}
      data-slot="input"
    >
      {hasStartAdornment && (
        <span
          className="rush-input__adornment rush-input__adornment--start"
          data-slot="input-start-adornment"
        >
          {startAdornment}
        </span>
      )}

      <input
        {...props}
        aria-invalid={resolvedAriaInvalid}
        className={classNames('rush-input__control', inputClassName)}
        disabled={disabled}
        data-slot="input-control"
      />

      {hasEndAdornment && (
        <span
          className="rush-input__adornment rush-input__adornment--end"
          data-slot="input-end-adornment"
        >
          {endAdornment}
        </span>
      )}
    </div>
  );
}
