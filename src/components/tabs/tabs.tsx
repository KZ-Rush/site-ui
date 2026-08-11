import type { ComponentPropsWithoutRef, KeyboardEvent } from 'react';

import { createContext, useContext, useId, useState } from 'react';

import { classNames } from '../../utils/class-names';

import './tabs.scss';

export type TabsOrientation = 'horizontal' | 'vertical';

interface TabsContextValue {
  value: string;

  setValue: (value: string) => void;

  orientation: TabsOrientation;

  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('Tabs components must be used inside <Tabs>.');
  }

  return context;
}

export interface TabsProps extends Omit<ComponentPropsWithoutRef<'div'>, 'defaultValue'> {
  /**
   * Controlled active tab value.
   */
  value?: string;

  /**
   * Initial value in uncontrolled mode.
   */
  defaultValue: string;

  /**
   * Called whenever a different tab is requested.
   */
  onValueChange?: (value: string) => void;

  /**
   * Tab layout direction.
   */
  orientation?: TabsOrientation;
}

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  orientation = 'horizontal',
  className,
  children,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const generatedId = useId();

  const controlled = value !== undefined;

  const resolvedValue = controlled ? value : internalValue;

  const setValue = (nextValue: string): void => {
    if (nextValue === resolvedValue) {
      return;
    }

    if (!controlled) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  const contextValue: TabsContextValue = {
    value: resolvedValue,
    setValue,
    orientation,
    baseId: generatedId,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        {...props}
        className={classNames('rush-tabs', `rush-tabs--${orientation}`, className)}
        data-orientation={orientation}
        data-slot="tabs"
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export type TabsListProps = ComponentPropsWithoutRef<'div'>;

export function TabsList({ className, children, onKeyDown, ...props }: TabsListProps) {
  const { orientation } = useTabsContext();

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    onKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

    const horizontal = orientation === 'horizontal';

    const previousKey = horizontal ? 'ArrowLeft' : 'ArrowUp';

    const nextKey = horizontal ? 'ArrowRight' : 'ArrowDown';

    if (
      event.key !== previousKey &&
      event.key !== nextKey &&
      event.key !== 'Home' &&
      event.key !== 'End'
    ) {
      return;
    }

    const list = event.currentTarget;

    const triggers = Array.from(
      list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'),
    );

    if (triggers.length === 0) {
      return;
    }

    const activeElement = document.activeElement;

    const currentIndex = triggers.findIndex((trigger) => trigger === activeElement);

    let nextIndex: number;

    if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = triggers.length - 1;
    } else if (event.key === nextKey) {
      nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % triggers.length;
    } else {
      nextIndex =
        currentIndex < 0
          ? triggers.length - 1
          : (currentIndex - 1 + triggers.length) % triggers.length;
    }

    event.preventDefault();

    triggers[nextIndex]?.focus();

    triggers[nextIndex]?.click();
  };

  return (
    <div
      {...props}
      role="tablist"
      aria-orientation={orientation}
      className={classNames('rush-tabs__list', className)}
      data-orientation={orientation}
      data-slot="tabs-list"
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps extends Omit<ComponentPropsWithoutRef<'button'>, 'value'> {
  value: string;
}

export function TabsTrigger({
  value,
  disabled,
  className,
  children,
  onClick,
  ...props
}: TabsTriggerProps) {
  const { value: activeValue, setValue, baseId } = useTabsContext();

  const active = activeValue === value;

  const triggerId = `${baseId}-tab-${value}`;

  const contentId = `${baseId}-panel-${value}`;

  return (
    <button
      {...props}
      id={triggerId}
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={contentId}
      disabled={disabled}
      tabIndex={active ? 0 : -1}
      className={classNames(
        'rush-tabs__trigger',
        active && 'rush-tabs__trigger--active',
        className,
      )}
      data-active={active || undefined}
      data-slot="tabs-trigger"
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented || disabled) {
          return;
        }

        setValue(value);
      }}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps extends Omit<ComponentPropsWithoutRef<'div'>, 'value'> {
  value: string;

  /**
   * Keep content mounted when inactive.
   */
  forceMount?: boolean;
}

export function TabsContent({
  value,
  forceMount = false,
  className,
  children,
  ...props
}: TabsContentProps) {
  const { value: activeValue, baseId } = useTabsContext();

  const active = activeValue === value;

  if (!active && !forceMount) {
    return null;
  }

  const triggerId = `${baseId}-tab-${value}`;

  const contentId = `${baseId}-panel-${value}`;

  return (
    <div
      {...props}
      id={contentId}
      role="tabpanel"
      aria-labelledby={triggerId}
      hidden={!active}
      tabIndex={0}
      className={classNames('rush-tabs__content', className)}
      data-active={active || undefined}
      data-slot="tabs-content"
    >
      {children}
    </div>
  );
}
