import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

import { classNames } from '../../utils/class-names';

import './button.scss';

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';

export type ButtonSize =
  | 'default'
  | 'sm'
  | 'lg'
  | 'icon';

interface ButtonSharedProps {
  /**
   * Visual style of the button.
   */
  variant?: ButtonVariant;

  /**
   * Button dimensions and spacing.
   */
  size?: ButtonSize;

  /**
   * Content rendered inside the button.
   */
  children?: ReactNode;

  /**
   * Additional class applied to the root element.
   */
  className?: string;
}

export interface NativeButtonProps
  extends ButtonSharedProps,
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'children' | 'className'
    > {
  href?: never;
}

export interface LinkButtonProps
  extends ButtonSharedProps,
    Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      'children' | 'className' | 'href'
    > {
  /**
   * When supplied, Button renders an anchor.
   */
  href: string;

  /**
   * Disables interaction with the link while preserving
   * its visible content.
   */
  disabled?: boolean;
}

export type ButtonProps =
  | NativeButtonProps
  | LinkButtonProps;

function getButtonClassName({
  variant,
  size,
  className,
}: {
  variant: ButtonVariant;
  size: ButtonSize;
  className?: string;
}): string {
  return classNames(
    'rush-button',
    `rush-button--variant-${variant}`,
    `rush-button--size-${size}`,
    className,
  );
}

function isLinkButton(
  props: ButtonProps,
): props is LinkButtonProps {
  return typeof props.href === 'string';
}

export function Button(
  props: ButtonProps,
) {
  const {
    variant = 'default',
    size = 'default',
    className,
  } = props;

  const buttonClassName = getButtonClassName({
    variant,
    size,
    className,
  });

  if (isLinkButton(props)) {
    const {
      href,
      disabled = false,
      children,
      onClick,
      tabIndex,
      ...anchorProps
    } = props;

    return (
      <a
        {...anchorProps}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        className={buttonClassName}
        data-disabled={disabled || undefined}
        data-slot="button"
        data-size={size}
        data-variant={variant}
        tabIndex={disabled ? -1 : tabIndex}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();

            return;
          }

          onClick?.(event);
        }}
      >
        {children}
      </a>
    );
  }

  const {
    children,
    disabled,
    type = 'button',
    ...buttonProps
  } = props;

  return (
    <button
      {...buttonProps}
      className={buttonClassName}
      data-slot="button"
      data-size={size}
      data-variant={variant}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}