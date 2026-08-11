import type {
  ButtonHTMLAttributes,
  CSSProperties,
  ComponentPropsWithoutRef,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from 'react';

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useId,
  useRef,
  useState,
} from 'react';

import {
  createPortal,
} from 'react-dom';

import {
  classNames,
} from '../../utils/class-names';

import {
  Button,
  type NativeButtonProps,
} from '../button';

import './dropdown.scss';

export type DropdownAlign =
  | 'start'
  | 'center'
  | 'end';

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentId: string;
}

const DropdownContext =
  createContext<DropdownContextValue | null>(
    null,
  );

function useDropdownContext():
  DropdownContextValue {
  const context =
    useContext(DropdownContext);

  if (!context) {
    throw new Error(
      'Dropdown components must be used inside <Dropdown>.',
    );
  }

  return context;
}

export interface DropdownProps {
  children: ReactNode;

  open?: boolean;

  defaultOpen?: boolean;

  onOpenChange?: (
    open: boolean,
  ) => void;
}

export function Dropdown({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
}: DropdownProps) {
  const [
    internalOpen,
    setInternalOpen,
  ] = useState(defaultOpen);

  const triggerRef =
    useRef<HTMLButtonElement>(null);

  const generatedId =
    useId();

  const contentId =
    `rush-dropdown-content-${generatedId}`;

  const controlled =
    open !== undefined;

  const resolvedOpen =
    controlled
      ? open
      : internalOpen;

  const setOpen = (
    nextOpen: boolean,
  ): void => {
    if (!controlled) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(
      nextOpen,
    );
  };

  return (
    <DropdownContext.Provider
      value={{
        open: resolvedOpen,
        setOpen,
        triggerRef,
        contentId,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
}

export type DropdownTriggerProps =
  NativeButtonProps;

export function DropdownTrigger({
  className,
  children,
  onClick,
  ...props
}: DropdownTriggerProps) {
  const {
    open,
    setOpen,
    triggerRef,
    contentId,
  } = useDropdownContext();

  const handleClick = (
    event: ReactMouseEvent<HTMLButtonElement>,
  ): void => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    setOpen(!open);
  };

  return (
    <Button
      {...props}
      ref={triggerRef}
      type="button"
      aria-expanded={open}
      aria-haspopup="menu"
      aria-controls={
        open
          ? contentId
          : undefined
      }
      className={classNames(
        'rush-dropdown__trigger',
        className,
      )}
      data-slot="dropdown-trigger"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}

export interface DropdownContentProps
  extends ComponentPropsWithoutRef<'div'> {
  align?: DropdownAlign;

  /**
   * Distance between the trigger and dropdown content.
   */
  offset?: number;
}

interface DropdownPosition {
  top: number;
  left: number;
}

export function DropdownContent({
  align = 'start',
  offset = 6,
  className,
  children,
  style,
  ...props
}: DropdownContentProps) {
  const {
    open,
    setOpen,
    triggerRef,
    contentId,
  } = useDropdownContext();

  const contentRef =
    useRef<HTMLDivElement>(null);

  const [
    position,
    setPosition,
  ] = useState<DropdownPosition | null>(
    null,
  );

  const updatePosition = (): void => {
    const trigger =
      triggerRef.current;

    const content =
      contentRef.current;

    if (
      trigger == null
      || content == null
    ) {
      return;
    }

    const triggerRect =
      trigger.getBoundingClientRect();

    const contentRect =
      content.getBoundingClientRect();

    let left =
      triggerRect.left;

    if (align === 'center') {
      left =
        triggerRect.left
        + triggerRect.width / 2
        - contentRect.width / 2;
    }

    if (align === 'end') {
      left =
        triggerRect.right
        - contentRect.width;
    }

    const viewportPadding = 8;

    left = Math.max(
      viewportPadding,
      Math.min(
        left,
        window.innerWidth
          - contentRect.width
          - viewportPadding,
      ),
    );

    let top =
      triggerRect.bottom
      + offset;

    /*
     * If there isn't enough room below,
     * try opening above the trigger.
     */
    if (
      top
        + contentRect.height
        + viewportPadding
      > window.innerHeight
    ) {
      const topAbove =
        triggerRect.top
        - contentRect.height
        - offset;

      if (
        topAbove
        >= viewportPadding
      ) {
        top = topAbove;
      }
    }

    setPosition({
      top,
      left,
    });
  };

  useLayoutEffect(() => {
    if (!open) {
      setPosition(null);

      return;
    }

    updatePosition();
  }, [
    open,
    align,
    offset,
  ]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleWindowChange =
      (): void => {
        updatePosition();
      };

    window.addEventListener(
      'resize',
      handleWindowChange,
    );

    window.addEventListener(
      'scroll',
      handleWindowChange,
      true,
    );

    return () => {
      window.removeEventListener(
        'resize',
        handleWindowChange,
      );

      window.removeEventListener(
        'scroll',
        handleWindowChange,
        true,
      );
    };
  }, [
    open,
    align,
    offset,
  ]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (
      event: MouseEvent,
    ): void => {
      const target =
        event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (
        contentRef.current?.contains(
          target,
        )
      ) {
        return;
      }

      if (
        triggerRef.current?.contains(
          target,
        )
      ) {
        return;
      }

      setOpen(false);
    };

    const handleKeyDown = (
      event: KeyboardEvent,
    ): void => {
      if (event.key !== 'Escape') {
        return;
      }

      event.preventDefault();

      setOpen(false);

      requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    };

    document.addEventListener(
      'mousedown',
      handlePointerDown,
    );

    document.addEventListener(
      'keydown',
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handlePointerDown,
      );

      document.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [
    open,
    setOpen,
    triggerRef,
  ]);

  useEffect(() => {
    if (
      !open
      || position == null
    ) {
      return;
    }

    requestAnimationFrame(() => {
      const firstItem =
        contentRef.current
          ?.querySelector<HTMLElement>(
            '[role="menuitem"]:not([aria-disabled="true"]), '
              + '[role="menuitemcheckbox"]:not([aria-disabled="true"])',
          );

      firstItem?.focus();
    });
  }, [
    open,
    position,
  ]);

  if (!open) {
    return null;
  }

  const contentStyle: CSSProperties = {
    ...style,

    top:
      position?.top
      ?? 0,

    left:
      position?.left
      ?? 0,

    visibility:
      position == null
        ? 'hidden'
        : undefined,
  };

  return createPortal(
    <div
      {...props}
      ref={contentRef}
      id={contentId}
      role="menu"
      className={classNames(
        'rush-dropdown__content',
        className,
      )}
      data-align={align}
      data-slot="dropdown-content"
      style={contentStyle}
    >
      {children}
    </div>,
    document.body,
  );
}

export interface DropdownItemProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'type'
  > {
  onSelect?: () => void;

  destructive?: boolean;
}

export function DropdownItem({
  onSelect,
  destructive = false,
  disabled,
  className,
  children,
  onClick,
  ...props
}: DropdownItemProps) {
  const {
    setOpen,
  } = useDropdownContext();

  const handleClick = (
    event: ReactMouseEvent<HTMLButtonElement>,
  ): void => {
    onClick?.(event);

    if (
      event.defaultPrevented
      || disabled
    ) {
      return;
    }

    onSelect?.();

    setOpen(false);
  };

  return (
    <button
      {...props}
      type="button"
      role="menuitem"
      disabled={disabled}
      aria-disabled={
        disabled || undefined
      }
      className={classNames(
        'rush-dropdown__item',
        destructive
          && 'rush-dropdown__item--destructive',
        className,
      )}
      data-slot="dropdown-item"
      onClick={
        handleClick
      }
    >
      {children}
    </button>
  );
}

export interface DropdownCheckboxItemProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'type'
  > {
  checked: boolean;

  onCheckedChange?: (
    checked: boolean,
  ) => void;
}

export function DropdownCheckboxItem({
  checked,
  onCheckedChange,
  disabled,
  className,
  children,
  onClick,
  ...props
}: DropdownCheckboxItemProps) {
  const handleClick = (
    event: ReactMouseEvent<HTMLButtonElement>,
  ): void => {
    onClick?.(event);

    if (
      event.defaultPrevented
      || disabled
    ) {
      return;
    }

    onCheckedChange?.(
      !checked,
    );
  };

  return (
    <button
      {...props}
      type="button"
      role="menuitemcheckbox"
      aria-checked={checked}
      aria-disabled={
        disabled || undefined
      }
      disabled={disabled}
      className={classNames(
        'rush-dropdown__item',
        'rush-dropdown__checkbox-item',
        className,
      )}
      data-slot="dropdown-checkbox-item"
      onClick={
        handleClick
      }
    >
      <span
        aria-hidden="true"
        className="rush-dropdown__checkbox-indicator"
      >
        {checked
          ? '✓'
          : ''}
      </span>

      <span className="rush-dropdown__item-label">
        {children}
      </span>
    </button>
  );
}

export type DropdownSeparatorProps =
  ComponentPropsWithoutRef<'div'>;

export function DropdownSeparator({
  className,
  ...props
}: DropdownSeparatorProps) {
  return (
    <div
      {...props}
      role="separator"
      className={classNames(
        'rush-dropdown__separator',
        className,
      )}
      data-slot="dropdown-separator"
    />
  );
}
