import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { toastMock } = vi.hoisted(() => ({
  toastMock: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: toastMock,

  ToastContainer: ({
    autoClose,
    className,
    containerId,
    position,
  }: {
    autoClose?: number | false;
    className?: string;
    containerId?: string | number;
    position?: string;
  }) => (
    <div
      data-testid="toast-container"
      data-auto-close={String(autoClose)}
      data-container-id={String(containerId ?? '')}
      data-position={position}
      className={className}
    />
  ),
}));

import { RushToastContainer, showToast } from './toast';

describe('Toast', () => {
  beforeEach(() => {
    toastMock.mockReset();
    toastMock.mockReturnValue('toast-id');
  });

  it('passes content, type, and options to react-toastify', () => {
    const result = showToast('Saved', {
      type: 'success',
      autoClose: 1_000,
    });

    expect(toastMock).toHaveBeenCalledWith('Saved', {
      type: 'success',
      autoClose: 1_000,
      containerId: undefined,
    });

    expect(result).toBe('toast-id');
  });

  it('defaults the type to info', () => {
    showToast('Information');

    expect(toastMock).toHaveBeenCalledWith('Information', {
      type: 'info',
      containerId: undefined,
    });
  });

  it('routes a toast to a requested container', () => {
    showToast('Saved', {
      type: 'success',
      containerId: 'story-success',
    });

    expect(toastMock).toHaveBeenCalledWith('Saved', {
      type: 'success',
      containerId: 'story-success',
    });
  });

  it('renders the container with stable defaults', () => {
    render(<RushToastContainer />);

    const container = screen.getByTestId('toast-container');

    expect(container).toHaveClass('rush-toast-container');

    expect(container).toHaveAttribute('data-position', 'top-right');

    expect(container).toHaveAttribute('data-auto-close', '5000');
  });

  it('forwards container props', () => {
    render(
      <RushToastContainer containerId="application" position="bottom-left" autoClose={false} />,
    );

    const container = screen.getByTestId('toast-container');

    expect(container).toHaveAttribute('data-container-id', 'application');

    expect(container).toHaveAttribute('data-position', 'bottom-left');

    expect(container).toHaveAttribute('data-auto-close', 'false');
  });
});
