import {
  act,
  renderHook,
} from '@testing-library/react';
import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import {
  useControllableState,
} from './use-controllable-state';

describe('useControllableState', () => {
  it('uses defaultValue in uncontrolled mode', () => {
    const {
      result,
    } = renderHook(() => (
      useControllableState({
        defaultValue: false,
      })
    ));

    expect(
      result.current[0],
    ).toBe(false);
  });

  it('updates internal state in uncontrolled mode', () => {
    const {
      result,
    } = renderHook(() => (
      useControllableState({
        defaultValue: false,
      })
    ));

    act(() => {
      result.current[1](true);
    });

    expect(
      result.current[0],
    ).toBe(true);
  });

  it('calls onChange in uncontrolled mode', () => {
    const onChange = vi.fn();

    const {
      result,
    } = renderHook(() => (
      useControllableState({
        defaultValue: false,
        onChange,
      })
    ));

    act(() => {
      result.current[1](true);
    });

    expect(
      onChange,
    ).toHaveBeenCalledWith(true);
  });

  it('uses the controlled value', () => {
    const {
      result,
    } = renderHook(() => (
      useControllableState({
        value: true,
        defaultValue: false,
      })
    ));

    expect(
      result.current[0],
    ).toBe(true);
  });

  it('does not update internal state in controlled mode', () => {
    const onChange = vi.fn();

    const {
      result,
    } = renderHook(() => (
      useControllableState({
        value: false,
        defaultValue: false,
        onChange,
      })
    ));

    act(() => {
      result.current[1](true);
    });

    /*
     * Controlled value does not change until the consumer
     * supplies the new prop value.
     */
    expect(
      result.current[0],
    ).toBe(false);

    expect(
      onChange,
    ).toHaveBeenCalledWith(true);
  });

  it('updates when the controlled value changes', () => {
    const {
      result,
      rerender,
    } = renderHook(
      ({
        value,
      }: {
        value: boolean;
      }) => (
        useControllableState({
          value,
          defaultValue: false,
        })
      ),
      {
        initialProps: {
          value: false,
        },
      },
    );

    expect(
      result.current[0],
    ).toBe(false);

    rerender({
      value: true,
    });

    expect(
      result.current[0],
    ).toBe(true);
  });

  it('supports functional updates', () => {
    const {
      result,
    } = renderHook(() => (
      useControllableState({
        defaultValue: false,
      })
    ));

    act(() => {
      result.current[1](
        (current) => !current,
      );
    });

    expect(
      result.current[0],
    ).toBe(true);
  });

  it('does not call onChange when value is unchanged', () => {
    const onChange = vi.fn();

    const {
      result,
    } = renderHook(() => (
      useControllableState({
        defaultValue: false,
        onChange,
      })
    ));

    act(() => {
      result.current[1](false);
    });

    expect(
      onChange,
    ).not.toHaveBeenCalled();
  });

  it('treats null as a controlled value', () => {
    const {
      result,
    } = renderHook(() => (
      useControllableState<
        string | null
      >({
        value: null,
        defaultValue: 'default',
      })
    ));

    expect(
      result.current[0],
    ).toBeNull();
  });

  it('uses the latest onChange callback', () => {
    const firstOnChange = vi.fn();
    const secondOnChange = vi.fn();

    const {
      result,
      rerender,
    } = renderHook(
      ({
        onChange,
      }: {
        onChange?: (
          value: boolean,
        ) => void;
      }) => (
        useControllableState({
          defaultValue: false,
          onChange,
        })
      ),
      {
        initialProps: {
          onChange: firstOnChange,
        },
      },
    );

    rerender({
      onChange: secondOnChange,
    });

    act(() => {
      result.current[1](true);
    });

    expect(
      firstOnChange,
    ).not.toHaveBeenCalled();

    expect(
      secondOnChange,
    ).toHaveBeenCalledWith(true);
  });
});