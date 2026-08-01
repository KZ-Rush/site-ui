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

export type CopyButtonStatus =
  | 'idle'
  | 'copied'
  | 'error';

export interface CopyButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onCopy' | 'value'
  > {
  /**
   * Text written to the clipboard.
   *
   * The button is disabled when this value is null,
   * undefined, or an empty string.
   */
  value?: string | null;

  /**
   * Content displayed before copying.
   */
  defaultContent?: ReactNode;

  /**
   * Content displayed after a successful copy.
   */
  copiedContent?: ReactNode;

  /**
   * Content displayed when copying fails.
   */
  errorContent?: ReactNode;

  /**
   * Time in milliseconds before the successful state
   * returns to idle.
   */
  copiedDuration?: number;

  /**
   * Time in milliseconds before the error state
   * returns to idle.
   */
  errorDuration?: number;

  /**
   * Called after the clipboard has been updated.
   */
  onCopy?: (value: string) => void;

  /**
   * Called when clipboard access is unavailable or rejected.
   */
  onCopyError?: (
    error: unknown,
    value: string,
  ) => void;
}

function getClipboard(): Clipboard | null {
  if (
    typeof navigator === 'undefined'
    || !navigator.clipboard
    || typeof navigator.clipboard.writeText !== 'function'
  ) {
    return null;
  }

  return navigator.clipboard;
}

export function CopyButton({
  value,
  defaultContent = 'Copy',
  copiedContent = 'Copied',
  errorContent = 'Copy failed',
  copiedDuration = 1_500,
  errorDuration = 1_500,
  className,
  disabled,
  onClick,
  onCopy,
  onCopyError,
  type = 'button',
  ...buttonProps
}: CopyButtonProps) {
  const [status, setStatus] =
    useState<CopyButtonStatus>('idle');

  const timeoutRef = useRef<number | null>(null);

  /*
   * Identifies the latest clipboard request.
   *
   * This prevents an older asynchronous request from
   * replacing the result of a newer request.
   */
  const operationRef = useRef(0);

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
    return () => {
      /*
       * Invalidates any clipboard request still awaiting
       * completion and clears the active status timer.
       */
      operationRef.current += 1;

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopyError = (
    error: unknown,
    currentValue: string,
    operation: number,
  ): void => {
    if (operation !== operationRef.current) {
      return;
    }

    setStatus('error');
    resetStatusAfter(errorDuration);
    onCopyError?.(error, currentValue);
  };

  const handleClick = async (
    event: MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    onClick?.(event);

    if (event.defaultPrevented || value == null || value === '') {
      return;
    }

    const clipboard = getClipboard();
    const operation = operationRef.current + 1;

    operationRef.current = operation;

    if (!clipboard) {
      handleCopyError(
        new Error('Clipboard API is unavailable.'),
        value,
        operation,
      );

      return;
    }

    try {
      await clipboard.writeText(value);
    } catch (error: unknown) {
      handleCopyError(
        error,
        value,
        operation,
      );

      return;
    }

    /*
     * Ignore a result from an obsolete operation or from
     * a component that has already unmounted.
     */
    if (operation !== operationRef.current) {
      return;
    }

    setStatus('copied');
    resetStatusAfter(copiedDuration);
    onCopy?.(value);
  };

  const isMissingValue =
    value === null
    || value === undefined
    || value === '';

  let content = defaultContent;

  if (status === 'copied') {
    content = copiedContent;
  } else if (status === 'error') {
    content = errorContent;
  }

  return (
    <button
      {...buttonProps}
      className={classNames(
        'rush-copy-button',
        className,
      )}
      data-slot="copy-button"
      data-status={status}
      disabled={disabled || isMissingValue}
      type={type}
      onClick={handleClick}
    >
      {content}
    </button>
  );
}