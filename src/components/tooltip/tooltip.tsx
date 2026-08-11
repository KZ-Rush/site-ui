import type {
  ComponentPropsWithoutRef,
  FocusEventHandler,
  MouseEventHandler,
  ReactNode,
} from 'react';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { createPortal } from 'react-dom';

import type { TriggerRenderProps } from '../../types/trigger';

import { classNames } from '../../utils/class-names';

import './tooltip.scss';

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

export type TooltipAlign = 'start' | 'center' | 'end';

interface TooltipContextValue {
  open: boolean;

  setOpen: (open: boolean) => void;

  scheduleOpen: () => void;

  scheduleClose: () => void;

  triggerElement: HTMLElement | null;

  setTriggerElement: (element: HTMLElement | null) => void;

  contentId: string;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext(): TooltipContextValue {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error('Tooltip components must be used inside <Tooltip>.');
  }

  return context;
}

export interface TooltipProps {
  children: ReactNode;

  open?: boolean;
  defaultOpen?: boolean;

  onOpenChange?: (open: boolean) => void;

  openDelay?: number;
  closeDelay?: number;
}

export function Tooltip({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  openDelay = 400,
  closeDelay = 100,
}: TooltipProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);

  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generatedId = useId();

  const contentId = `rush-tooltip-content-${generatedId}`;

  const controlled = open !== undefined;

  const resolvedOpen = controlled ? open : internalOpen;

  const setOpen = useCallback(
    (nextOpen: boolean): void => {
      if (!controlled) {
        setInternalOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [controlled, onOpenChange],
  );

  const clearTimers = useCallback((): void => {
    if (openTimer.current != null) {
      clearTimeout(openTimer.current);

      openTimer.current = null;
    }

    if (closeTimer.current != null) {
      clearTimeout(closeTimer.current);

      closeTimer.current = null;
    }
  }, []);

  const scheduleOpen = useCallback((): void => {
    clearTimers();

    openTimer.current = setTimeout(() => {
      setOpen(true);
    }, openDelay);
  }, [clearTimers, openDelay, setOpen]);

  const scheduleClose = useCallback((): void => {
    clearTimers();

    closeTimer.current = setTimeout(() => {
      setOpen(false);
    }, closeDelay);
  }, [clearTimers, closeDelay, setOpen]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  return (
    <TooltipContext.Provider
      value={{
        open: resolvedOpen,
        setOpen,
        scheduleOpen,
        scheduleClose,
        triggerElement,
        setTriggerElement,
        contentId,
      }}
    >
      {children}
    </TooltipContext.Provider>
  );
}

export interface TooltipTriggerRenderProps<
  TElement extends HTMLElement,
> extends TriggerRenderProps<TElement> {
  'aria-describedby'?: string;

  onMouseEnter: MouseEventHandler<TElement>;

  onMouseLeave: MouseEventHandler<TElement>;

  onFocus: FocusEventHandler<TElement>;

  onBlur: FocusEventHandler<TElement>;
}

export interface TooltipTriggerProps<TElement extends HTMLElement = HTMLElement> {
  render: (props: TooltipTriggerRenderProps<TElement>) => ReactNode;
}

export function TooltipTrigger<TElement extends HTMLElement = HTMLElement>({
  render,
}: TooltipTriggerProps<TElement>) {
  const { open, setTriggerElement, contentId, scheduleOpen, scheduleClose } = useTooltipContext();

  const setTriggerRef = useCallback(
    (element: TElement | null): void => {
      setTriggerElement(element);
    },
    [setTriggerElement],
  );

  return (
    <>
      {render({
        ref: setTriggerRef,

        'aria-describedby': open ? contentId : undefined,

        onMouseEnter: scheduleOpen,

        onMouseLeave: scheduleClose,

        onFocus: scheduleOpen,

        onBlur: scheduleClose,
      })}
    </>
  );
}

interface TooltipPosition {
  top: number;
  left: number;
}

export interface TooltipContentProps extends ComponentPropsWithoutRef<'div'> {
  side?: TooltipSide;
  align?: TooltipAlign;
  offset?: number;
}

export function TooltipContent({
  side = 'top',
  align = 'center',
  offset = 8,
  className,
  style,
  children,
  ...props
}: TooltipContentProps) {
  const { open, setOpen, triggerElement, contentId } = useTooltipContext();

  const contentRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState<TooltipPosition | null>(null);

  const updatePosition = useCallback((): void => {
    const trigger = triggerElement;

    const content = contentRef.current;

    if (trigger == null || content == null) {
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();

    const contentRect = content.getBoundingClientRect();

    let top: number;
    let left: number;

    if (side === 'top' || side === 'bottom') {
      if (align === 'start') {
        left = triggerRect.left;
      } else if (align === 'end') {
        left = triggerRect.right - contentRect.width;
      } else {
        left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
      }

      top =
        side === 'top'
          ? triggerRect.top - contentRect.height - offset
          : triggerRect.bottom + offset;
    } else {
      if (align === 'start') {
        top = triggerRect.top;
      } else if (align === 'end') {
        top = triggerRect.bottom - contentRect.height;
      } else {
        top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
      }

      left =
        side === 'left'
          ? triggerRect.left - contentRect.width - offset
          : triggerRect.right + offset;
    }

    const viewportPadding = 8;

    left = Math.max(
      viewportPadding,
      Math.min(left, window.innerWidth - contentRect.width - viewportPadding),
    );

    top = Math.max(
      viewportPadding,
      Math.min(top, window.innerHeight - contentRect.height - viewportPadding),
    );

    setPosition({
      top,
      left,
    });
  }, [side, align, offset, triggerElement]);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    updatePosition();
  }, [open, side, align, offset, updatePosition]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleWindowChange = (): void => {
      updatePosition();
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape') {
        return;
      }

      setOpen(false);
    };

    window.addEventListener('resize', handleWindowChange);

    window.addEventListener('scroll', handleWindowChange, true);

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleWindowChange);

      window.removeEventListener('scroll', handleWindowChange, true);

      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, side, align, offset, setOpen, updatePosition]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      {...props}
      ref={contentRef}
      id={contentId}
      role="tooltip"
      className={classNames('rush-tooltip__content', className)}
      data-align={align}
      data-side={side}
      data-slot="tooltip-content"
      style={{
        ...style,

        top: position?.top ?? 0,

        left: position?.left ?? 0,

        visibility: position == null ? 'hidden' : undefined,
      }}
    >
      {children}
    </div>,
    document.body,
  );
}
