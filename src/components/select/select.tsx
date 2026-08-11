import type { ComponentPropsWithoutRef } from 'react';

import { classNames } from '../../utils/class-names';

import './select.scss';

export type SelectSize = 'sm' | 'default' | 'lg';

export interface SelectProps extends Omit<ComponentPropsWithoutRef<'select'>, 'size'> {
  /**
   * Visual size of the select.
   */
  size?: SelectSize;

  /**
   * Marks the control as invalid.
   */
  invalid?: boolean;

  /**
   * Class applied directly to the native select.
   */
  selectClassName?: string;
}

export function Select({
  size = 'default',
  invalid = false,
  selectClassName,
  className,
  disabled,
  'aria-invalid': ariaInvalid,
  children,
  ...props
}: SelectProps) {
  const resolvedAriaInvalid = ariaInvalid ?? (invalid ? true : undefined);

  return (
    <div
      className={classNames(
        'rush-select',
        `rush-select--${size}`,
        invalid && 'rush-select--invalid',
        disabled && 'rush-select--disabled',
        className,
      )}
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
      data-size={size}
      data-slot="select"
    >
      <select
        {...props}
        aria-invalid={resolvedAriaInvalid}
        className={classNames('rush-select__control', selectClassName)}
        disabled={disabled}
        data-slot="select-control"
      >
        {children}
      </select>

      <span aria-hidden="true" className="rush-select__indicator" data-slot="select-indicator">
        <svg viewBox="0 0 20 20" fill="none" focusable="false">
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}
