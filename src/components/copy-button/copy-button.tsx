import './copy-button.scss';

import {
  type MouseEvent,
} from 'react';

import { classNames } from '../../utils/class-names';
import { type CopyButtonProps } from './copy-button.types';
import { useCopyButton } from './use-copy-button';

export function CopyButton({
  value,

  copiedDuration = 1500,

  copiedContent = 'Copied',

  defaultContent = 'Copy',

  onCopy,

  className,

  disabled,

  type = 'button',

  ...props
}: CopyButtonProps) {

  const {
    copy,
    isCopied,
  } = useCopyButton(
    copiedDuration,
    onCopy,
  );

  const handleClick = async (
    event: MouseEvent<HTMLButtonElement>,
  ) => {

    props.onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (!value) {
      return;
    }

    await copy(value);
  };

  return (
    <button
      {...props}
      className={classNames(
        'rush-copy-button',
        className,
      )}
      disabled={disabled || !value}
      type={type}
      onClick={handleClick}
    >
      {isCopied
        ? copiedContent
        : defaultContent}
    </button>
  );
}