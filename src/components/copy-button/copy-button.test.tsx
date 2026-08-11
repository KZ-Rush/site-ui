import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CopyButton } from './copy-button';

const writeText = vi.fn();

describe('CopyButton', () => {
  beforeEach(() => {
    writeText.mockReset();
    writeText.mockResolvedValue(undefined);

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('copies the value and calls onCopy', async () => {
    const onCopy = vi.fn();

    render(<CopyButton value="demo-name.dem" onCopy={onCopy} />);

    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith('demo-name.dem');
      expect(onCopy).toHaveBeenCalledWith('demo-name.dem');
    });

    expect(screen.getByRole('button')).toHaveTextContent('Copied');
    expect(screen.getByRole('button')).toHaveAttribute('data-status', 'copied');
  });

  it('returns to idle after copiedDuration', async () => {
    vi.useFakeTimers();

    render(<CopyButton value="demo.dem" copiedDuration={1_500} />);

    const button = screen.getByRole('button', {
      name: 'Copy',
    });

    await act(async () => {
      fireEvent.click(button);

      await writeText.mock.results[0]?.value;
    });

    expect(writeText).toHaveBeenCalledWith('demo.dem');

    expect(button).toHaveTextContent('Copied');

    act(() => {
      vi.advanceTimersByTime(1_500);
    });

    expect(button).toHaveTextContent('Copy');
  });

  it('renders an error state when clipboard access fails', async () => {
    const error = new DOMException('Permission denied', 'NotAllowedError');
    const onCopyError = vi.fn();

    writeText.mockRejectedValueOnce(error);

    render(<CopyButton value="demo.dem" onCopyError={onCopyError} />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(onCopyError).toHaveBeenCalledWith(error, 'demo.dem');
    });

    expect(screen.getByRole('button')).toHaveTextContent('Copy failed');
    expect(screen.getByRole('button')).toHaveAttribute('data-status', 'error');
  });

  it('does not copy when onClick prevents the action', () => {
    render(<CopyButton value="demo.dem" onClick={(event) => event.preventDefault()} />);

    fireEvent.click(screen.getByRole('button'));

    expect(writeText).not.toHaveBeenCalled();
  });

  it.each([null, undefined, ''] as const)('is disabled for missing value %s', (value) => {
    render(<CopyButton value={value} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('defaults to type button and forwards native props', () => {
    render(
      <CopyButton value="demo.dem" aria-label="Copy demo" name="copy-demo" title="Copy filename" />,
    );

    const button = screen.getByRole('button', { name: 'Copy demo' });

    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('name', 'copy-demo');
    expect(button).toHaveAttribute('title', 'Copy filename');
  });
});
