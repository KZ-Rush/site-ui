import type { ComponentPropsWithoutRef, KeyboardEvent, MouseEvent, ReactNode, Ref } from 'react';

import { useId, useMemo, useRef, useState } from 'react';

import { classNames } from '../../utils/class-names';

import { Input } from '../input';

import { Popover, PopoverContent, PopoverTrigger } from '../popover';

import { Spinner } from '../spinner';

import './searchable-select.scss';

export type SearchableSelectSize = 'sm' | 'default' | 'lg';

export type SearchableSelectOptionValue = string | number;

export interface SearchableSelectProps<TOption> extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'children' | 'className' | 'defaultValue' | 'name' | 'onChange' | 'size' | 'value'
> {
  /** Options currently available for selection. */
  options: readonly TOption[];

  /** Selected option in controlled mode. */
  value?: TOption | null;

  /** Initially selected option in uncontrolled mode. */
  defaultValue?: TOption | null;

  /** Called after a selectable option is chosen. */
  onValueChange?: (option: TOption) => void;

  /** Returns the stable form value and React key for an option. */
  getOptionValue: (option: TOption) => SearchableSelectOptionValue;

  /** Returns the visible and searchable label for an option. */
  getOptionLabel: (option: TOption) => string;

  /** Returns additional text used by the default local filter. */
  getOptionKeywords?: (option: TOption) => readonly string[];

  /** Marks individual options as unavailable. */
  isOptionDisabled?: (option: TOption) => boolean;

  /** Custom local filtering function. The query is normalized to lowercase. */
  filterOption?: (option: TOption, normalizedQuery: string) => boolean;

  /** Set to false when options have already been filtered by a server. */
  shouldFilter?: boolean;

  /** Search text in controlled mode. */
  searchValue?: string;

  /** Initial search text in uncontrolled mode. */
  defaultSearchValue?: string;

  /** Called whenever the search text changes. */
  onSearchValueChange?: (value: string) => void;

  /** Open state in controlled mode. */
  open?: boolean;

  /** Initial open state in uncontrolled mode. */
  defaultOpen?: boolean;

  /** Called whenever the popover opens or closes. */
  onOpenChange?: (open: boolean) => void;

  /** Clears the search field after the popover closes. */
  clearSearchOnClose?: boolean;

  /** Native form field name. A hidden input is rendered when supplied. */
  name?: string;

  /** Visual size of the trigger and search field. */
  size?: SearchableSelectSize;

  /** Marks the trigger as invalid. */
  invalid?: boolean;

  /** Text displayed while no option is selected. */
  placeholder?: string;

  /** Placeholder displayed in the search input. */
  searchPlaceholder?: string;

  /** Accessible label for the search input. */
  searchAriaLabel?: string;

  /** Accessible label for the result list. */
  resultsAriaLabel?: string;

  /** Indicates that options are currently loading. */
  loading?: boolean;

  /** Indicates that loading options failed. */
  error?: boolean;

  loadingText?: ReactNode;

  errorText?: ReactNode;

  emptyText?: ReactNode;

  /** Optional help text displayed below the result list. */
  hint?: ReactNode;

  /** Class applied to the component root. */
  className?: string;

  /** Class applied directly to the trigger button. */
  triggerClassName?: string;

  /** Class applied to the portalled popover content. */
  contentClassName?: string;

  /** Custom rendering for an option's content. */
  renderOption?: (option: TOption, state: { active: boolean; selected: boolean }) => ReactNode;
}

function assignRef<T>(ref: Ref<T>, value: T | null): void {
  if (typeof ref === 'function') {
    ref(value);

    return;
  }

  if (ref) {
    ref.current = value;
  }
}

export function SearchableSelect<TOption>({
  options,
  value,
  defaultValue = null,
  onValueChange,
  getOptionValue,
  getOptionLabel,
  getOptionKeywords,
  isOptionDisabled = () => false,
  filterOption,
  shouldFilter = true,
  searchValue,
  defaultSearchValue = '',
  onSearchValueChange,
  open,
  defaultOpen = false,
  onOpenChange,
  clearSearchOnClose = true,
  name,
  size = 'default',
  invalid = false,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  searchAriaLabel = 'Search options',
  resultsAriaLabel = 'Search results',
  loading = false,
  error = false,
  loadingText = 'Loading options...',
  errorText = 'Unable to load options.',
  emptyText = 'No matching options found.',
  hint,
  className,
  triggerClassName,
  contentClassName,
  renderOption,
  disabled,
  onClick,
  onKeyDown,
  'aria-invalid': ariaInvalid,
  ...buttonProps
}: SearchableSelectProps<TOption>) {
  const [internalValue, setInternalValue] = useState<TOption | null>(defaultValue);
  const [internalSearchValue, setInternalSearchValue] = useState(defaultSearchValue);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [activeIndex, setActiveIndex] = useState(-1);
  const generatedId = useId();
  const listboxId = `rush-searchable-select-listbox-${generatedId}`;
  const optionIdPrefix = `rush-searchable-select-option-${generatedId}`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const controlledValue = value !== undefined;
  const controlledSearch = searchValue !== undefined;
  const controlledOpen = open !== undefined;
  const selectedOption = controlledValue ? value : internalValue;
  const resolvedSearchValue = controlledSearch ? searchValue : internalSearchValue;
  const resolvedOpen = controlledOpen ? open : internalOpen;
  const resolvedAriaInvalid = ariaInvalid ?? (invalid ? true : undefined);
  const normalizedQuery = resolvedSearchValue.trim().toLocaleLowerCase();

  const filteredOptions = useMemo(() => {
    if (!shouldFilter || normalizedQuery === '') {
      return options;
    }

    return options.filter((option) => {
      if (filterOption) {
        return filterOption(option, normalizedQuery);
      }

      const searchableText = [getOptionLabel(option), ...(getOptionKeywords?.(option) ?? [])]
        .join(' ')
        .toLocaleLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [filterOption, getOptionKeywords, getOptionLabel, normalizedQuery, options, shouldFilter]);

  const selectableOptions = loading || error ? [] : filteredOptions;
  const firstEnabledIndex = selectableOptions.findIndex((option) => !isOptionDisabled(option));
  const activeOption = activeIndex >= 0 ? selectableOptions[activeIndex] : undefined;
  const resolvedActiveIndex =
    activeOption !== undefined && !isOptionDisabled(activeOption) ? activeIndex : firstEnabledIndex;

  const setSearch = (nextValue: string): void => {
    if (!controlledSearch) {
      setInternalSearchValue(nextValue);
    }

    onSearchValueChange?.(nextValue);
  };

  const setOpen = (nextOpen: boolean): void => {
    if (!controlledOpen) {
      setInternalOpen(nextOpen);
    }

    if (!nextOpen && clearSearchOnClose && resolvedSearchValue !== '') {
      setSearch('');
    }

    if (!nextOpen) {
      setActiveIndex(-1);
    }

    onOpenChange?.(nextOpen);
  };

  const selectOption = (option: TOption): void => {
    if (isOptionDisabled(option)) {
      return;
    }

    if (!controlledValue) {
      setInternalValue(option);
    }

    onValueChange?.(option);
    setOpen(false);

    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  const enabledOptionIndices = (): number[] =>
    selectableOptions.reduce<number[]>((indices, option, index) => {
      if (!isOptionDisabled(option)) {
        indices.push(index);
      }

      return indices;
    }, []);

  const moveActiveOption = (direction: 1 | -1): void => {
    const enabledIndices = enabledOptionIndices();

    if (enabledIndices.length === 0) {
      setActiveIndex(-1);

      return;
    }

    const currentPosition = enabledIndices.indexOf(resolvedActiveIndex);
    const nextPosition =
      currentPosition === -1
        ? direction === 1
          ? 0
          : enabledIndices.length - 1
        : (currentPosition + direction + enabledIndices.length) % enabledIndices.length;

    setActiveIndex(enabledIndices[nextPosition] ?? -1);
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveActiveOption(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveActiveOption(-1);
    } else if (event.key === 'Home') {
      const firstEnabledIndex = enabledOptionIndices()[0];

      if (firstEnabledIndex !== undefined) {
        event.preventDefault();
        setActiveIndex(firstEnabledIndex);
      }
    } else if (event.key === 'End') {
      const indices = enabledOptionIndices();
      const lastEnabledIndex = indices.at(-1);

      if (lastEnabledIndex !== undefined) {
        event.preventDefault();
        setActiveIndex(lastEnabledIndex);
      }
    } else if (event.key === 'Enter' && resolvedActiveIndex >= 0) {
      const selectedActiveOption = selectableOptions[resolvedActiveIndex];

      if (selectedActiveOption !== undefined) {
        event.preventDefault();
        selectOption(selectedActiveOption);
      }
    }
  };

  const selectedValue = selectedOption == null ? null : getOptionValue(selectedOption);
  const selectedLabel = selectedOption == null ? null : getOptionLabel(selectedOption);

  return (
    <div
      className={classNames(
        'rush-searchable-select',
        `rush-searchable-select--${size}`,
        invalid && 'rush-searchable-select--invalid',
        disabled && 'rush-searchable-select--disabled',
        className,
      )}
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
      data-open={resolvedOpen || undefined}
      data-size={size}
      data-slot="searchable-select"
    >
      {name && <input type="hidden" name={name} value={selectedValue ?? ''} disabled={disabled} />}

      <Popover open={resolvedOpen} onOpenChange={setOpen}>
        <PopoverTrigger<HTMLButtonElement>
          render={(triggerProps) => (
            <button
              {...buttonProps}
              ref={(element) => {
                triggerRef.current = element;
                assignRef(triggerProps.ref, element);
              }}
              type="button"
              aria-controls={resolvedOpen ? listboxId : undefined}
              aria-expanded={resolvedOpen}
              aria-haspopup="listbox"
              aria-invalid={resolvedAriaInvalid}
              className={classNames('rush-searchable-select__trigger', triggerClassName)}
              data-placeholder={selectedOption == null || undefined}
              data-slot="searchable-select-trigger"
              disabled={disabled}
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                onClick?.(event);

                if (!event.defaultPrevented) {
                  triggerProps.onClick?.(event);
                }
              }}
              onKeyDown={(event) => {
                onKeyDown?.(event);

                if (
                  !event.defaultPrevented &&
                  (event.key === 'ArrowDown' || event.key === 'ArrowUp')
                ) {
                  event.preventDefault();
                  setOpen(true);
                }
              }}
            >
              <span className="rush-searchable-select__value">{selectedLabel ?? placeholder}</span>

              <svg
                aria-hidden="true"
                className="rush-searchable-select__chevron"
                fill="none"
                focusable="false"
                viewBox="0 0 20 20"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.75"
                />
              </svg>
            </button>
          )}
        />

        <PopoverContent
          align="start"
          className={classNames('rush-searchable-select__content', contentClassName)}
          data-slot="searchable-select-content"
        >
          <Input
            autoFocus
            type="search"
            aria-activedescendant={
              resolvedActiveIndex >= 0 ? `${optionIdPrefix}-${resolvedActiveIndex}` : undefined
            }
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-expanded="true"
            aria-label={searchAriaLabel}
            placeholder={searchPlaceholder}
            role="combobox"
            size={size}
            startAdornment={
              <svg aria-hidden="true" fill="none" focusable="false" viewBox="0 0 20 20">
                <circle cx="8.75" cy="8.75" r="5.25" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M12.5 12.5L16.5 16.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                />
              </svg>
            }
            value={resolvedSearchValue}
            onChange={(event) => {
              setActiveIndex(-1);
              setSearch(event.currentTarget.value);
            }}
            onKeyDown={handleSearchKeyDown}
          />

          <div
            id={listboxId}
            aria-label={resultsAriaLabel}
            className="rush-searchable-select__options"
            data-slot="searchable-select-options"
            role="listbox"
          >
            {loading ? (
              <div className="rush-searchable-select__status" role="status">
                <Spinner aria-hidden="true" size="sm" />
                {loadingText}
              </div>
            ) : error ? (
              <div className="rush-searchable-select__status" role="alert">
                {errorText}
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="rush-searchable-select__status" role="status">
                {emptyText}
              </div>
            ) : (
              filteredOptions.map((option, index) => {
                const optionValue = getOptionValue(option);
                const selected = selectedValue != null && Object.is(optionValue, selectedValue);
                const optionDisabled = isOptionDisabled(option);
                const active = index === resolvedActiveIndex;

                return (
                  <button
                    key={optionValue}
                    id={`${optionIdPrefix}-${index}`}
                    type="button"
                    aria-disabled={optionDisabled || undefined}
                    aria-selected={selected}
                    className="rush-searchable-select__option"
                    data-active={active || undefined}
                    data-disabled={optionDisabled || undefined}
                    data-slot="searchable-select-option"
                    role="option"
                    tabIndex={-1}
                    onClick={() => {
                      selectOption(option);
                    }}
                    onMouseMove={() => {
                      if (!optionDisabled) {
                        setActiveIndex(index);
                      }
                    }}
                  >
                    <span className="rush-searchable-select__option-label">
                      {renderOption?.(option, { active, selected }) ?? getOptionLabel(option)}
                    </span>

                    {selected && (
                      <svg
                        aria-hidden="true"
                        className="rush-searchable-select__check"
                        fill="none"
                        focusable="false"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M4.5 10.5L8 14L15.5 6.5"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.75"
                        />
                      </svg>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {hint && <div className="rush-searchable-select__hint">{hint}</div>}
        </PopoverContent>
      </Popover>
    </div>
  );
}
