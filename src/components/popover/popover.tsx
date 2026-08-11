import type { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from 'react';

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

import './popover.scss';

export type PopoverSide = 'top' | 'right' | 'bottom' | 'left';

export type PopoverAlign = 'start' | 'center' | 'end';

interface PopoverContextValue {
  open: boolean;

  setOpen: (open: boolean) => void;

  triggerElement: HTMLElement | null;

  setTriggerElement: (element: HTMLElement | null) => void;

  contentId: string;

  focusTrigger: () => void;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext(): PopoverContextValue {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error('Popover components must be used inside <Popover>.');
  }

  return context;
}

export interface PopoverProps {
  children: ReactNode;

  open?: boolean;

  defaultOpen?: boolean;

  onOpenChange?: (open: boolean) => void;
}

export function Popover({ children, open, defaultOpen = false, onOpenChange }: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);

  const generatedId = useId();

  const contentId = `rush-popover-content-${generatedId}`;

  const controlled = open !== undefined;

  const resolvedOpen = controlled ? open : internalOpen;

  const focusTrigger = useCallback((): void => {
    triggerElement?.focus();
  }, [triggerElement]);

  const setOpen = (nextOpen: boolean): void => {
    if (!controlled) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  };

  return (
    <PopoverContext.Provider
      value={{
        open: resolvedOpen,
        setOpen,
        triggerElement,
        setTriggerElement,
        contentId,
        focusTrigger,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

export interface PopoverTriggerRenderProps<
  TElement extends HTMLElement,
> extends TriggerRenderProps<TElement> {
  onClick: MouseEventHandler<TElement>;
}

export interface PopoverTriggerProps<TElement extends HTMLElement = HTMLElement> {
  render: (props: PopoverTriggerRenderProps<TElement>) => ReactNode;
}

export function PopoverTrigger<TElement extends HTMLElement = HTMLElement>({
  render,
}: PopoverTriggerProps<TElement>) {
  const { open, setOpen, setTriggerElement, contentId } = usePopoverContext();

  const handleClick: MouseEventHandler<TElement> = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    setOpen(!open);
  };

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

        'aria-expanded': open,

        'aria-controls': open ? contentId : undefined,

        onClick: handleClick,
      })}
    </>
  );
}

interface PopoverPosition {
  top: number;
  left: number;
}

export interface PopoverContentProps extends ComponentPropsWithoutRef<'div'> {
  side?: PopoverSide;

  align?: PopoverAlign;

  offset?: number;
}

export function PopoverContent({
  side = 'bottom',
  align = 'center',
  offset = 8,
  className,
  style,
  children,
  ...props
}: PopoverContentProps) {
  const { open, setOpen, triggerElement, contentId, focusTrigger } = usePopoverContext();

  const contentRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState<PopoverPosition | null>(null);

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

    const handleOutsideClick = (event: MouseEvent): void => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (contentRef.current?.contains(target)) {
        return;
      }

      if (triggerElement?.contains(target)) {
        return;
      }

      setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape') {
        return;
      }

      event.preventDefault();

      setOpen(false);

      requestAnimationFrame(() => {
        focusTrigger();
      });
    };

    const handleWindowChange = (): void => {
      updatePosition();
    };

    document.addEventListener('mousedown', handleOutsideClick);

    document.addEventListener('keydown', handleKeyDown);

    window.addEventListener('resize', handleWindowChange);

    window.addEventListener('scroll', handleWindowChange, true);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);

      document.removeEventListener('keydown', handleKeyDown);

      window.removeEventListener('resize', handleWindowChange);

      window.removeEventListener('scroll', handleWindowChange, true);
    };
  }, [open, setOpen, triggerElement, side, align, offset, updatePosition, focusTrigger]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      {...props}
      ref={contentRef}
      id={contentId}
      className={classNames('rush-popover__content', className)}
      data-align={align}
      data-side={side}
      data-slot="popover-content"
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

export interface PopoverCloseRenderProps<TElement extends HTMLElement> {
  onClick: MouseEventHandler<TElement>;

  'data-slot': 'popover-close';
}

export interface PopoverCloseProps<TElement extends HTMLElement = HTMLButtonElement> {
  children?: ReactNode;

  render?: (props: PopoverCloseRenderProps<TElement>) => ReactNode;
}

export function PopoverClose<TElement extends HTMLElement = HTMLButtonElement>({
  children,
  render,
}: PopoverCloseProps<TElement>) {
  const { setOpen, focusTrigger } = usePopoverContext();

  const close = (): void => {
    setOpen(false);

    requestAnimationFrame(() => {
      focusTrigger();
    });
  };

  const handleRenderClick: MouseEventHandler<TElement> = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    close();
  };

  if (render) {
    return (
      <>
        {render({
          onClick: handleRenderClick,
          'data-slot': 'popover-close',
        })}
      </>
    );
  }

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    close();
  };

  return (
    <button type="button" data-slot="popover-close" onClick={handleButtonClick}>
      {children}
    </button>
  );
}
