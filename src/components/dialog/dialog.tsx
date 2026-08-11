import type { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from 'react';

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import type { TriggerRenderProps } from '../../types/trigger';

import { classNames } from '../../utils/class-names';

import './dialog.scss';

const focusableSelector = [
  'a[href]',
  'button:not(:disabled)',
  'input:not(:disabled)',
  'select:not(:disabled)',
  'textarea:not(:disabled)',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

interface DialogContextValue {
  open: boolean;

  setOpen: (open: boolean) => void;

  triggerElement: HTMLElement | null;

  setTriggerElement: (element: HTMLElement | null) => void;

  contentId: string;

  titleId: string;

  descriptionId: string;

  focusTrigger: () => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext(): DialogContextValue {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('Dialog components must be used inside <Dialog>.');
  }

  return context;
}

export interface DialogProps {
  children: ReactNode;

  open?: boolean;

  defaultOpen?: boolean;

  onOpenChange?: (open: boolean) => void;
}

export function Dialog({ children, open, defaultOpen = false, onOpenChange }: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);

  const generatedId = useId();

  const contentId = `rush-dialog-content-${generatedId}`;

  const titleId = `rush-dialog-title-${generatedId}`;

  const descriptionId = `rush-dialog-description-${generatedId}`;

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

  const focusTrigger = useCallback((): void => {
    triggerElement?.focus();
  }, [triggerElement]);

  return (
    <DialogContext.Provider
      value={{
        open: resolvedOpen,
        setOpen,
        triggerElement,
        setTriggerElement,
        contentId,
        titleId,
        descriptionId,
        focusTrigger,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export interface DialogTriggerRenderProps<
  TElement extends HTMLElement,
> extends TriggerRenderProps<TElement> {
  onClick: MouseEventHandler<TElement>;
}

export interface DialogTriggerProps<TElement extends HTMLElement = HTMLElement> {
  render: (props: DialogTriggerRenderProps<TElement>) => ReactNode;
}

export function DialogTrigger<TElement extends HTMLElement = HTMLElement>({
  render,
}: DialogTriggerProps<TElement>) {
  const { open, setOpen, setTriggerElement, contentId } = useDialogContext();

  const handleClick: MouseEventHandler<TElement> = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    setOpen(true);
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

export interface DialogContentProps extends ComponentPropsWithoutRef<'div'> {
  closeOnOutsideClick?: boolean;
}

export function DialogContent({
  closeOnOutsideClick = true,
  className,
  children,
  ...props
}: DialogContentProps) {
  const { open, setOpen, contentId, titleId, descriptionId, focusTrigger } = useDialogContext();

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const frame = window.requestAnimationFrame(() => {
      const content = contentRef.current;

      if (!content) {
        return;
      }

      const firstFocusable = content.querySelector<HTMLElement>(focusableSelector);

      (firstFocusable ?? content).focus();
    });

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault();

        setOpen(false);

        window.requestAnimationFrame(() => {
          focusTrigger();
        });

        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const content = contentRef.current;

      if (!content) {
        return;
      }

      const focusable = Array.from(content.querySelectorAll<HTMLElement>(focusableSelector));

      if (focusable.length === 0) {
        event.preventDefault();

        content.focus();

        return;
      }

      const first = focusable[0];

      const last = focusable[focusable.length - 1];

      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();

        last.focus();

        return;
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();

        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);

      document.removeEventListener('keydown', handleKeyDown);

      document.body.style.overflow = previousOverflow;

      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [open, setOpen, focusTrigger]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="rush-dialog__portal" data-slot="dialog-portal">
      <div
        className="rush-dialog__overlay"
        data-slot="dialog-overlay"
        onMouseDown={(event) => {
          if (!closeOnOutsideClick || event.target !== event.currentTarget) {
            return;
          }

          setOpen(false);

          window.requestAnimationFrame(() => {
            focusTrigger();
          });
        }}
      >
        <div
          {...props}
          ref={contentRef}
          id={contentId}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          tabIndex={-1}
          className={classNames('rush-dialog__content', className)}
          data-slot="dialog-content"
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export type DialogTitleProps = ComponentPropsWithoutRef<'h2'>;

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  const { titleId } = useDialogContext();

  return (
    <h2
      {...props}
      id={titleId}
      className={classNames('rush-dialog__title', className)}
      data-slot="dialog-title"
    />
  );
}

export type DialogDescriptionProps = ComponentPropsWithoutRef<'p'>;

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  const { descriptionId } = useDialogContext();

  return (
    <p
      {...props}
      id={descriptionId}
      className={classNames('rush-dialog__description', className)}
      data-slot="dialog-description"
    />
  );
}

export interface DialogCloseRenderProps<TElement extends HTMLElement> {
  onClick: MouseEventHandler<TElement>;

  'data-slot': 'dialog-close';
}

export interface DialogCloseProps<TElement extends HTMLElement = HTMLButtonElement> {
  children?: ReactNode;

  render?: (props: DialogCloseRenderProps<TElement>) => ReactNode;
}

export function DialogClose<TElement extends HTMLElement = HTMLButtonElement>({
  children,
  render,
}: DialogCloseProps<TElement>) {
  const { setOpen, focusTrigger } = useDialogContext();

  const close = (): void => {
    setOpen(false);

    window.requestAnimationFrame(() => {
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

          'data-slot': 'dialog-close',
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
    <button type="button" data-slot="dialog-close" onClick={handleButtonClick}>
      {children}
    </button>
  );
}
