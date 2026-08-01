import type {
  ButtonHTMLAttributes,
  MouseEvent,
  ReactNode,
} from 'react';
import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { classNames } from '../../utils/class-names';

import './copy-button.scss';

export interface CopyButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onCopy' | 'value'
  > {
  /**
   * Text written to the clipboard.
   */
  value?: string | null;

  /**
   * Content displayed before the value is copied.
   */
  defaultContent?: ReactNode;

  /**
   * Content displayed after a successful copy.
   */
  copiedContent?: ReactNode;

  /**
   * Content displayed after copying fails.
   */
  errorContent?: ReactNode;

  /**
   * Duration of the copied state in milliseconds.
   */
  copiedDuration?: number;

  /**
   * Duration of the error state in milliseconds.
   *
   * Defaults to the value of copiedDuration.
   */
  errorDuration?: number;

  /**
   * Called after the value is copied successfully.
   */
  onCopy?: (value: string) => void;

  /**
   * Called when writing to the clipboard fails.
   */
  onCopyError?: (
    error: unknown,
    value: string,
  ) => void;
}

type CopyButtonStatus =
  | 'idle'
  | 'copied'
  | 'error';

export function CopyButton({
  value,
  defaultContent = 'Copy',
  copiedContent = 'Copied',
  errorContent = 'Copy failed',
  copiedDuration = 1_500,
  errorDuration = copiedDuration,
  className,
  disabled,
  onClick,
  onCopy,
  onCopyError,
  type = 'button',
  ...buttonProps
}: CopyButtonProps) {
  const [
    status,
    setStatus,
  ] = useState<CopyButtonStatus>('idle');

  const timeoutRef = useRef<number | null>(null);

  const clearStatusTimeout = (): void => {
    if (timeoutRef.current === null) {
      return;
    }

    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  const resetStatusAfter = (
    duration: number,
  ): void => {
    clearStatusTimeout();

    if (duration <= 0) {
      setStatus('idle');
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      setStatus('idle');
      timeoutRef.current = null;
    }, duration);
  };

  useEffect(() => {
    return clearStatusTimeout;
  }, []);

  const handleClick = async (
    event: MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    onClick?.(event);

    if (
      event.defaultPrevented
      || disabled
      || !value
    ) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);

      setStatus('copied');
      onCopy?.(value);

      resetStatusAfter(copiedDuration);
    } catch (error: unknown) {
      setStatus('error');
      onCopyError?.(error, value);

      resetStatusAfter(errorDuration);
    }
  };

  const content = {
    idle: defaultContent,
    copied: copiedContent,
    error: errorContent,
  } satisfies Record<
    CopyButtonStatus,
    ReactNode
  >;

  return (
    <button
      {...buttonProps}
      className={classNames(
        'rush-copy-button',
        className,
      )}
      data-slot="copy-button"
      data-status={status}
      disabled={disabled || !value}
      type={type}
      onClick={handleClick}
    >
      {content[status]}
    </button>
  );
}