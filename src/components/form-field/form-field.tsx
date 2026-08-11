import type { AriaAttributes, ReactNode } from 'react';

import { Label } from '../label';

import './form-field.scss';

export interface FormFieldControlProps {
  id: string;
  'aria-describedby'?: string;
  'aria-invalid'?: AriaAttributes['aria-invalid'];
}

export interface FormFieldProps {
  /**
   * ID assigned to the form control and used to connect
   * the label, description, and error message.
   */
  id: string;

  /**
   * Content displayed as the field label.
   */
  label?: ReactNode;

  /**
   * Optional help text displayed before the control.
   */
  description?: ReactNode;

  /**
   * Optional validation error displayed after the control.
   */
  error?: ReactNode;

  /**
   * Renders the form control with the required accessibility
   * attributes.
   */
  children: (controlProps: FormFieldControlProps) => ReactNode;
}

export function FormField({ id, label, description, error, children }: FormFieldProps) {
  const descriptionId = description ? `${id}-description` : undefined;

  const errorId = error ? `${id}-error` : undefined;

  const describedBy =
    [descriptionId, errorId].filter((value): value is string => Boolean(value)).join(' ') ||
    undefined;

  const hasError = Boolean(error);

  return (
    <div className="rush-form-field" data-slot="form-field" data-invalid={hasError || undefined}>
      {label && (
        <Label htmlFor={id} className="rush-form-field__label">
          {label}
        </Label>
      )}

      {description && (
        <p
          id={descriptionId}
          className="rush-form-field__description"
          data-slot="form-field-description"
        >
          {description}
        </p>
      )}

      <div className="rush-form-field__control" data-slot="form-field-control">
        {children({
          id,
          'aria-describedby': describedBy,
          'aria-invalid': hasError || undefined,
        })}
      </div>

      {error && (
        <p
          id={errorId}
          className="rush-form-field__error"
          data-slot="form-field-error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
