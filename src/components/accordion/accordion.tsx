import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { createContext, useContext, useId, useState } from 'react';

import { classNames } from '../../utils/class-names';

import './accordion.scss';

export type AccordionType = 'single' | 'multiple';

interface AccordionContextValue {
  type: AccordionType;

  openValues: ReadonlySet<string>;

  toggleValue: (value: string) => void;

  baseId: string;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext(): AccordionContextValue {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('Accordion components must be used inside <Accordion>.');
  }

  return context;
}

interface AccordionItemContextValue {
  value: string;
  open: boolean;
  disabled: boolean;
  triggerId: string;
  contentId: string;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext(): AccordionItemContextValue {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error('AccordionTrigger and AccordionContent must be used inside <AccordionItem>.');
  }

  return context;
}

interface AccordionBaseProps {
  children: ReactNode;

  className?: string;

  id?: string;

  /**
   * Whether the currently open item can be collapsed.
   *
   * Only applies to single mode.
   */
  collapsible?: boolean;
}

export interface AccordionSingleProps extends AccordionBaseProps {
  type?: 'single';

  value?: string;

  defaultValue?: string;

  onValueChange?: (value: string) => void;
}

export interface AccordionMultipleProps extends AccordionBaseProps {
  type: 'multiple';

  value?: readonly string[];

  defaultValue?: readonly string[];

  onValueChange?: (value: string[]) => void;
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

export function Accordion(props: AccordionProps) {
  const generatedId = useId();

  const type = props.type ?? 'single';

  const [internalValues, setInternalValues] = useState<Set<string>>(() => {
    if (props.type === 'multiple') {
      return new Set(props.defaultValue ?? []);
    }

    return new Set(props.defaultValue ? [props.defaultValue] : []);
  });

  const controlled = props.value !== undefined;

  let openValues: ReadonlySet<string>;

  if (props.type === 'multiple') {
    openValues = controlled ? new Set(props.value ?? []) : internalValues;
  } else {
    openValues = controlled ? new Set(props.value ? [props.value] : []) : internalValues;
  }

  const toggleValue = (itemValue: string): void => {
    if (props.type === 'multiple') {
      const next = new Set(openValues);

      if (next.has(itemValue)) {
        next.delete(itemValue);
      } else {
        next.add(itemValue);
      }

      if (!controlled) {
        setInternalValues(next);
      }

      props.onValueChange?.(Array.from(next));

      return;
    }

    const currentlyOpen = openValues.has(itemValue);

    if (currentlyOpen && !props.collapsible) {
      return;
    }

    const next = currentlyOpen ? new Set<string>() : new Set([itemValue]);

    if (!controlled) {
      setInternalValues(next);
    }

    props.onValueChange?.(currentlyOpen ? '' : itemValue);
  };

  return (
    <AccordionContext.Provider
      value={{
        type,
        openValues,
        toggleValue,
        baseId: generatedId,
      }}
    >
      <div
        id={props.id}
        className={classNames('rush-accordion', props.className)}
        data-type={type}
        data-slot="accordion"
      >
        {props.children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends ComponentPropsWithoutRef<'div'> {
  value: string;

  disabled?: boolean;
}

export function AccordionItem({
  value,
  disabled = false,
  className,
  children,
  ...props
}: AccordionItemProps) {
  const { openValues, baseId } = useAccordionContext();

  const open = openValues.has(value);

  const triggerId = `${baseId}-trigger-${value}`;

  const contentId = `${baseId}-content-${value}`;

  return (
    <AccordionItemContext.Provider
      value={{
        value,
        open,
        disabled,
        triggerId,
        contentId,
      }}
    >
      <div
        {...props}
        className={classNames(
          'rush-accordion__item',
          open && 'rush-accordion__item--open',
          disabled && 'rush-accordion__item--disabled',
          className,
        )}
        data-open={open || undefined}
        data-disabled={disabled || undefined}
        data-slot="accordion-item"
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export type AccordionTriggerProps = ComponentPropsWithoutRef<'button'>;

export function AccordionTrigger({
  className,
  children,
  onClick,
  ...props
}: AccordionTriggerProps) {
  const { toggleValue } = useAccordionContext();

  const { value, open, disabled, triggerId, contentId } = useAccordionItemContext();

  return (
    <button
      {...props}
      id={triggerId}
      type="button"
      aria-expanded={open}
      aria-controls={contentId}
      disabled={disabled}
      className={classNames('rush-accordion__trigger', className)}
      data-open={open || undefined}
      data-slot="accordion-trigger"
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented || disabled) {
          return;
        }

        toggleValue(value);
      }}
    >
      <span className="rush-accordion__trigger-label">{children}</span>

      <span aria-hidden="true" className="rush-accordion__indicator">
        <svg viewBox="0 0 20 20" fill="none" focusable="false">
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

export type AccordionContentProps = ComponentPropsWithoutRef<'div'>;

export function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  const { open, triggerId, contentId } = useAccordionItemContext();

  return (
    <div
      {...props}
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      aria-hidden={!open}
      inert={!open ? true : undefined}
      className={classNames(
        'rush-accordion__content',
        open && 'rush-accordion__content--open',
        className,
      )}
      data-open={open || undefined}
      data-slot="accordion-content"
    >
      <div className="rush-accordion__content-inner">
        <div className="rush-accordion__content-body">{children}</div>
      </div>
    </div>
  );
}
