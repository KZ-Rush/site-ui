import {
  useCallback,
  useRef,
  useState,
} from 'react';

export interface UseControllableStateOptions<T> {
  /**
   * Controlled value.
   *
   * When defined, the hook does not update its internal
   * value and expects the consumer to provide the next
   * value.
   */
  value?: T;

  /**
   * Initial value used in uncontrolled mode.
   */
  defaultValue: T;

  /**
   * Called whenever a different value is requested.
   */
  onChange?: (value: T) => void;
}

export type SetControllableState<T> = (
  value: T | ((current: T) => T),
) => void;

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [
  T,
  SetControllableState<T>,
] {
  const [internalValue, setInternalValue] =
    useState(defaultValue);

  const isControlled =
    value !== undefined;

  /*
   * Keep the latest callback available without making
   * the setter unstable every time onChange changes.
   */
  const onChangeRef = useRef(onChange);

  onChangeRef.current = onChange;

  const currentValue = isControlled
    ? value
    : internalValue;

  const setValue = useCallback<
    SetControllableState<T>
  >(
    (nextValue) => {
      const resolvedValue =
        typeof nextValue === 'function'
          ? (
              nextValue as (
                current: T,
              ) => T
            )(currentValue)
          : nextValue;

      /*
       * Do not notify the consumer when nothing actually
       * changes.
       */
      if (
        Object.is(
          resolvedValue,
          currentValue,
        )
      ) {
        return;
      }

      if (!isControlled) {
        setInternalValue(resolvedValue);
      }

      onChangeRef.current?.(
        resolvedValue,
      );
    },
    [
      currentValue,
      isControlled,
    ],
  );

  return [
    currentValue,
    setValue,
  ];
}