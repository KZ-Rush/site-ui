import type {
  ComponentPropsWithoutRef,
} from 'react';

import {
  classNames,
} from '../../utils/class-names';

import './textarea.scss';

export type TextareaSize =
  | 'sm'
  | 'default'
  | 'lg';

export interface TextareaProps
  extends ComponentPropsWithoutRef<'textarea'> {
  /**
   * Visual size of the textarea.
   */
  size?: TextareaSize;

  /**
   * Marks the textarea as invalid.
   */
  invalid?: boolean;

  /**
   * Class applied directly to the native textarea.
   */
  textareaClassName?: string;
}

export function Textarea({
  size = 'default',
  invalid = false,
  textareaClassName,
  className,
  disabled,
  'aria-invalid': ariaInvalid,
  ...props
}: TextareaProps) {
  const resolvedAriaInvalid =
    ariaInvalid
    ?? (
      invalid
        ? true
        : undefined
    );

  return (
    <div
      className={classNames(
        'rush-textarea',
        `rush-textarea--${size}`,
        invalid
          && 'rush-textarea--invalid',
        disabled
          && 'rush-textarea--disabled',
        className,
      )}
      data-disabled={
        disabled || undefined
      }
      data-invalid={
        invalid || undefined
      }
      data-size={size}
      data-slot="textarea"
    >
      <textarea
        {...props}
        aria-invalid={
          resolvedAriaInvalid
        }
        className={classNames(
          'rush-textarea__control',
          textareaClassName,
        )}
        disabled={disabled}
        data-slot="textarea-control"
      />
    </div>
  );
}