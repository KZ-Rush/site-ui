import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  HTMLAttributes,
  ReactNode,
} from 'react';

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
} from 'react';

import {
  createPortal,
} from 'react-dom';

import {
  useControllableState,
} from '../../hooks/use-controllable-state';

import {
  classNames,
} from '../../utils/class-names';

import './drawer.scss';

export type DrawerSide =
  | 'left'
  | 'right';

interface DrawerContextValue {
  open: boolean;

  contentId: string;
  titleId: string;

  triggerRef:
    React.RefObject<HTMLButtonElement | null>;

  setOpen: (
    open: boolean,
  ) => void;
}

const DrawerContext =
  createContext<DrawerContextValue | null>(
    null,
  );

function useDrawerContext(): DrawerContextValue {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error(
      'Drawer components must be used inside Drawer.',
    );
  }

  return context;
}

export interface DrawerProps {
  children: ReactNode;

  /**
   * Controlled open state.
   */
  open?: boolean;

  /**
   * Initial state for uncontrolled usage.
   */
  defaultOpen?: boolean;

  /**
   * Called when the requested open state changes.
   */
  onOpenChange?: (
    open: boolean,
  ) => void;
}

export function Drawer({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
}: DrawerProps) {
  const generatedId = useId();

  const [
    resolvedOpen,
    setOpen,
  ] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const triggerRef =
    useRef<HTMLButtonElement>(null);

  return (
    <DrawerContext.Provider
      value={{
        open: resolvedOpen,

        contentId:
          `rush-drawer-content-${generatedId}`,

        titleId:
          `rush-drawer-title-${generatedId}`,

        triggerRef,
        setOpen,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export interface DrawerTriggerProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'type'
  > {}

export function DrawerTrigger({
  className,
  onClick,
  ...props
}: DrawerTriggerProps) {
  const {
    open,
    contentId,
    triggerRef,
    setOpen,
  } = useDrawerContext();

  return (
    <button
      {...props}
      ref={triggerRef}
      type="button"
      aria-controls={contentId}
      aria-expanded={open}
      className={classNames(
        'rush-drawer__trigger',
        className,
      )}
      data-slot="drawer-trigger"
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        setOpen(true);
      }}
    />
  );
}

export interface DrawerContentProps
  extends Omit<
    ComponentPropsWithoutRef<'div'>,
    'children'
  > {
  children: ReactNode;

  side?: DrawerSide;

  /**
   * Close when the user clicks the backdrop.
   */
  closeOnOverlayClick?: boolean;

  /**
   * Close when Escape is pressed.
   */
  closeOnEscape?: boolean;

  /**
   * Prevent document scrolling while open.
   */
  lockScroll?: boolean;
}

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function DrawerContent({
  children,
  side = 'left',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  lockScroll = true,
  className,
  onKeyDown,
  ...props
}: DrawerContentProps) {
  const {
    open,
    contentId,
    titleId,
    triggerRef,
    setOpen,
  } = useDrawerContext();

  const contentRef =
    useRef<HTMLDivElement>(null);

  const ariaLabel = props['aria-label'];
  const ariaLabelledBy = props['aria-labelledby'];

  const resolvedAriaLabelledBy = ariaLabel !== undefined
    ? ariaLabelledBy
    : ariaLabelledBy ?? titleId;

  /*
   * Move focus into the drawer when opened and return it
   * to the trigger when closed.
   */
  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const frame = window.requestAnimationFrame(
      () => {
        const content = contentRef.current;

        if (!content) {
          return;
        }

        const firstFocusable =
          content.querySelector<HTMLElement>(
            focusableSelector,
          );

        (
          firstFocusable
          ?? content
        ).focus();
      },
    );

    return () => {
      window.cancelAnimationFrame(frame);

      const returnTarget =
        triggerRef.current
        ?? previouslyFocused;

      returnTarget?.focus();
    };
  }, [
    open,
    triggerRef,
  ]);

  /*
   * Prevent the page behind the drawer from scrolling.
   */
  useEffect(() => {
    if (!open || !lockScroll) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [
    open,
    lockScroll,
  ]);

  useEffect(() => {
    if (!open || !closeOnEscape) {
      return;
    }

    const handleEscape = (
      event: KeyboardEvent,
    ): void => {
      if (event.key !== 'Escape') {
        return;
      }

      event.preventDefault();

      setOpen(false);
    };

    document.addEventListener(
      'keydown',
      handleEscape,
    );

    return () => {
      document.removeEventListener(
        'keydown',
        handleEscape,
      );
    };
  }, [
    open,
    closeOnEscape,
    setOpen,
  ]);

  if (!open) {
    return null;
  }

  const handleKeyDown:
    HTMLAttributes<HTMLDivElement>['onKeyDown'] =
    (event) => {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const content = contentRef.current;

      if (!content) {
        return;
      }

      const focusableElements =
        Array.from(
          content.querySelectorAll<HTMLElement>(
            focusableSelector,
          ),
        );

      if (focusableElements.length === 0) {
        event.preventDefault();
        content.focus();

        return;
      }

      const first =
        focusableElements[0];

      const last =
        focusableElements[
          focusableElements.length - 1
        ];

      if (
        event.shiftKey
        && document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();

        return;
      }

      if (
        !event.shiftKey
        && document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

  return createPortal(
    <div
      className="rush-drawer"
      data-side={side}
      data-slot="drawer"
    >
      <div
        aria-hidden="true"
        className="rush-drawer__overlay"
        data-slot="drawer-overlay"
        onMouseDown={(event) => {
          if (
            !closeOnOverlayClick
            || event.target !== event.currentTarget
          ) {
            return;
          }

          setOpen(false);
        }}
      />

      <div
        {...props}
        ref={contentRef}
        id={contentId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={
          resolvedAriaLabelledBy
        }
        className={classNames(
          'rush-drawer__content',
          `rush-drawer__content--${side}`,
          className,
        )}
        data-side={side}
        data-slot="drawer-content"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export type DrawerTitleProps =
  ComponentPropsWithoutRef<'h2'>;

export function DrawerTitle({
  className,
  ...props
}: DrawerTitleProps) {
  const {
    titleId,
  } = useDrawerContext();

  return (
    <h2
      {...props}
      id={props.id ?? titleId}
      className={classNames(
        'rush-drawer__title',
        className,
      )}
      data-slot="drawer-title"
    />
  );
}

export interface DrawerCloseProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'type'
  > {}

export function DrawerClose({
  className,
  onClick,
  ...props
}: DrawerCloseProps) {
  const {
    setOpen,
  } = useDrawerContext();

  return (
    <button
      {...props}
      type="button"
      className={classNames(
        'rush-drawer__close',
        className,
      )}
      data-slot="drawer-close"
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        setOpen(false);
      }}
    />
  );
}