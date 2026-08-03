import type {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';
import {
  useId,
} from 'react';

import { classNames } from '../../utils/class-names';

import './switch.scss';

type NativeSwitchProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'children' | 'className' | 'role' | 'type'
>;

export interface SwitchProps extends NativeSwitchProps {
  /**
   * Content displayed before the switch.
   */
  offLabel?: ReactNode;

  /**
   * Content displayed after the switch.
   */
  onLabel?: ReactNode;

  /**
   * Class applied to the root component.
   */
  className?: string;

  /**
   * Class applied directly to the native input.
   */
  inputClassName?: string;

  /**
   * Keeps the switch thumb visually emphasized even when
   * the switch is unchecked.
   *
   * This does not change the checked state.
   */
  alwaysActive?: boolean;

  /**
   * Called with the new checked state after a user change.
   */
  onCheckedChange?: (
    checked: boolean,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
}

export function Switch({
  id: providedId,
  offLabel,
  onLabel,
  className,
  inputClassName,
  alwaysActive = false,
  disabled,
  onChange,
  onCheckedChange,
  ...inputProps
}: SwitchProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    onChange?.(event);

    if (event.defaultPrevented) {
      return;
    }

    onCheckedChange?.(
      event.currentTarget.checked,
      event,
    );
  };

  return (
    <label
      className={classNames(
        'rush-switch',
        className,
      )}
      data-always-active={
        alwaysActive || undefined
      }
      data-disabled={disabled || undefined}
      data-slot="switch"
      htmlFor={id}
    >
      {offLabel !== undefined
        && offLabel !== null
        && offLabel !== '' && (
          <span
            className="rush-switch__label rush-switch__label--off"
            data-slot="switch-off-label"
          >
            {offLabel}
          </span>
        )}

      <span
        className="rush-switch__control"
        data-slot="switch-control"
      >
        <input
          {...inputProps}
          id={id}
          className={classNames(
            'rush-switch__input',
            inputClassName,
          )}
          disabled={disabled}
          role="switch"
          type="checkbox"
          onChange={handleChange}
        />

        <span
          aria-hidden="true"
          className="rush-switch__track"
        >
          <span className="rush-switch__thumb" />
        </span>
      </span>

      {onLabel !== undefined
        && onLabel !== null
        && onLabel !== '' && (
          <span
            className="rush-switch__label rush-switch__label--on"
            data-slot="switch-on-label"
          >
            {onLabel}
          </span>
        )}
    </label>
  );
}