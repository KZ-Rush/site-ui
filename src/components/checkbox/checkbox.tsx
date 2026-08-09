import type {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';

import {
  useEffect,
  useId,
  useRef,
} from 'react';

import { classNames } from '../../utils/class-names';

import './checkbox.scss';

function CheckedCheckboxIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="20"
      height="20"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 0H2C0.89 0 0 0.914062 0 2.03125V16.25C0 17.3672 0.89 18.2812 2 18.2812H16C17.11 18.2812 18 17.3672 18 16.25V2.03125C18 0.914062 17.11 0 16 0ZM7 14.2188L2 9.14062L3.41 7.70859L7 11.3445L14.59 3.63594L16 5.07812L7 14.2188Z"
        fill="currentColor"
      />
    </svg>
  );
}

function UncheckedCheckboxIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 3.07812V17.2969H3V3.07812H17ZM17 1.04688H3C1.9 1.04688 1 1.96094 1 3.07812V17.2969C1 18.4141 1.9 19.3281 3 19.3281H17C18.1 19.3281 19 18.4141 19 17.2969V3.07812C19 1.96094 18.1 1.04688 17 1.04688Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IndeterminateCheckboxIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="20"
      height="20"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 0H2C0.89 0 0 0.914062 0 2.03125V16.25C0 17.3672 0.89 18.2812 2 18.2812H16C17.11 18.2812 18 17.3672 18 16.25V2.03125C18 0.914062 17.11 0 16 0Z"
        fill="currentColor"
      />

      <path
        d="M5 8.125H13V10.15625H5V8.125Z"
        fill="white"
      />
    </svg>
  );
}

type NativeCheckboxProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'children' | 'className' | 'type'
>;

export interface CheckboxProps extends NativeCheckboxProps {
  /**
   * Text or content displayed beside the checkbox.
   */
  children?: ReactNode;

  /**
   * Class applied to the root label.
   */
  className?: string;

  /**
   * Class applied directly to the native input.
   */
  inputClassName?: string;

  /**
   * Displays the native checkbox indeterminate state.
   */
  indeterminate?: boolean;

  /**
   * Called with the new checked state after a user change.
   */
  onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({
  id: providedId,
  children,
  className,
  inputClassName,
  disabled,
  indeterminate = false,
  onChange,
  onCheckedChange,
  ...inputProps
}: CheckboxProps) {
  const generatedId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const id = providedId ?? generatedId;

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.indeterminate =
      indeterminate;
  }, [
    indeterminate,
  ]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    onChange?.(event);

    if (event.defaultPrevented) {
      return;
    }

    onCheckedChange?.(
      event.currentTarget.checked,
    );
  };

  return (
    <label
      className={classNames(
        'rush-checkbox',
        className,
      )}
      data-disabled={
        disabled || undefined
      }
      data-indeterminate={
        indeterminate || undefined
      }
      data-slot="checkbox"
      htmlFor={id}
    >
      <input
        {...inputProps}
        ref={inputRef}
        id={id}
        aria-checked={
          indeterminate
            ? 'mixed'
            : inputProps['aria-checked']
        }
        className={classNames(
          'rush-checkbox__input',
          inputClassName,
        )}
        disabled={disabled}
        type="checkbox"
        onChange={handleChange}
      />

      <span
        aria-hidden="true"
        className="rush-checkbox__icon"
        data-slot="checkbox-icon"
      >
        <span className="rush-checkbox__icon-unchecked">
          <UncheckedCheckboxIcon />
        </span>

        <span className="rush-checkbox__icon-checked">
          <CheckedCheckboxIcon />
        </span>

        <span className="rush-checkbox__icon-indeterminate">
          <IndeterminateCheckboxIcon />
        </span>
      </span>

      {children != null && (
        <span
          className="rush-checkbox__label"
          data-slot="checkbox-label"
        >
          {children}
        </span>
      )}
    </label>
  );
}