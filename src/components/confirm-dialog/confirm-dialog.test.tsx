import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import { ConfirmDialog } from './confirm-dialog';

function renderConfirmDialog(onConfirm = vi.fn()) {
  render(
    <ConfirmDialog
      title="Delete record?"
      description="This action cannot be undone."
      confirmLabel="Delete"
      cancelLabel="Cancel"
      confirmVariant="destructive"
      onConfirm={onConfirm}
    >
      {(triggerProps) => (
        <button {...triggerProps} type="button">
          Delete record
        </button>
      )}
    </ConfirmDialog>,
  );

  return {
    onConfirm,
  };
}

describe('ConfirmDialog', () => {
  it('opens from the trigger', async () => {
    const user = userEvent.setup();

    renderConfirmDialog();

    await user.click(
      screen.getByRole('button', {
        name: 'Delete record',
      }),
    );

    expect(
      screen.getByRole('dialog', {
        name: 'Delete record?',
      }),
    ).toBeInTheDocument();
  });

  it('renders the description', async () => {
    const user = userEvent.setup();

    renderConfirmDialog();

    await user.click(
      screen.getByRole('button', {
        name: 'Delete record',
      }),
    );

    expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument();
  });

  it('calls onConfirm', async () => {
    const user = userEvent.setup();

    const onConfirm = vi.fn();

    renderConfirmDialog(onConfirm);

    await user.click(
      screen.getByRole('button', {
        name: 'Delete record',
      }),
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Delete',
      }),
    );

    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it('closes after confirmation', async () => {
    const user = userEvent.setup();

    renderConfirmDialog();

    await user.click(
      screen.getByRole('button', {
        name: 'Delete record',
      }),
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Delete',
      }),
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not confirm when cancelled', async () => {
    const user = userEvent.setup();

    const onConfirm = vi.fn();

    renderConfirmDialog(onConfirm);

    await user.click(
      screen.getByRole('button', {
        name: 'Delete record',
      }),
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Cancel',
      }),
    );

    expect(onConfirm).not.toHaveBeenCalled();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('restores focus after confirmation', async () => {
    const user = userEvent.setup();

    renderConfirmDialog();

    const trigger = screen.getByRole('button', {
      name: 'Delete record',
    });

    await user.click(trigger);

    await user.click(
      screen.getByRole('button', {
        name: 'Delete',
      }),
    );

    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it('restores focus after cancellation', async () => {
    const user = userEvent.setup();

    renderConfirmDialog();

    const trigger = screen.getByRole('button', {
      name: 'Delete record',
    });

    await user.click(trigger);

    await user.click(
      screen.getByRole('button', {
        name: 'Cancel',
      }),
    );

    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it('supports an omitted description', async () => {
    const user = userEvent.setup();

    render(
      <ConfirmDialog title="Continue?" confirmLabel="Continue" onConfirm={() => {}}>
        {(triggerProps) => (
          <button {...triggerProps} type="button">
            Open
          </button>
        )}
      </ConfirmDialog>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open',
      }),
    );

    const dialog = screen.getByRole('dialog', {
      name: 'Continue?',
    });

    expect(dialog).not.toHaveAttribute('aria-describedby');
  });

  it('supports controlled open state', () => {
    render(
      <ConfirmDialog
        open
        title="Controlled confirmation"
        onConfirm={() => {}}
        onOpenChange={() => {}}
      >
        {(triggerProps) => (
          <button {...triggerProps} type="button">
            Open
          </button>
        )}
      </ConfirmDialog>,
    );

    expect(
      screen.getByRole('dialog', {
        name: 'Controlled confirmation',
      }),
    ).toBeInTheDocument();
  });
});
