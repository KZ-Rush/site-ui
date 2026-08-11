import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './dialog';

function renderDialog(contentProps: Partial<React.ComponentProps<typeof DialogContent>> = {}) {
  return render(
    <Dialog>
      <DialogTrigger<HTMLButtonElement>
        render={(triggerProps) => (
          <button {...triggerProps} type="button">
            Open
          </button>
        )}
      />

      <DialogContent {...contentProps}>
        <DialogTitle>Test dialog</DialogTitle>

        <DialogDescription>Test description</DialogDescription>

        <button>Action</button>

        <DialogClose>Close</DialogClose>
      </DialogContent>
    </Dialog>,
  );
}

describe('Dialog', () => {
  it('opens when the trigger is clicked', async () => {
    const user = userEvent.setup();

    renderDialog();

    await user.click(
      screen.getByRole('button', {
        name: 'Open',
      }),
    );

    expect(
      screen.getByRole('dialog', {
        name: 'Test dialog',
      }),
    ).toBeInTheDocument();
  });

  it('connects title and description', async () => {
    const user = userEvent.setup();

    renderDialog();

    await user.click(
      screen.getByRole('button', {
        name: 'Open',
      }),
    );

    const dialog = screen.getByRole('dialog', {
      name: 'Test dialog',
    });

    const title = screen.getByText('Test dialog');

    const description = screen.getByText('Test description');

    expect(dialog).toHaveAttribute('aria-labelledby', title.id);

    expect(dialog).toHaveAttribute('aria-describedby', description.id);

    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('closes on Escape and restores trigger focus', async () => {
    const user = userEvent.setup();

    renderDialog();

    const trigger = screen.getByRole('button', {
      name: 'Open',
    });

    await user.click(trigger);

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it('closes with DialogClose', async () => {
    const user = userEvent.setup();

    renderDialog();

    const trigger = screen.getByRole('button', {
      name: 'Open',
    });

    await user.click(trigger);

    await user.click(
      screen.getByRole('button', {
        name: 'Close',
      }),
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it('closes when the overlay is clicked', async () => {
    const user = userEvent.setup();

    renderDialog();

    await user.click(
      screen.getByRole('button', {
        name: 'Open',
      }),
    );

    const overlay = document.querySelector('[data-slot="dialog-overlay"]');

    expect(overlay).not.toBeNull();

    if (!overlay) {
      return;
    }

    await user.click(overlay);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('can prevent closing from an outside click', async () => {
    const user = userEvent.setup();

    renderDialog({
      closeOnOutsideClick: false,
    });

    await user.click(
      screen.getByRole('button', {
        name: 'Open',
      }),
    );

    const overlay = document.querySelector('[data-slot="dialog-overlay"]');

    expect(overlay).not.toBeNull();

    if (!overlay) {
      return;
    }

    await user.click(overlay);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not close when interacting inside the dialog', async () => {
    const user = userEvent.setup();

    renderDialog();

    await user.click(
      screen.getByRole('button', {
        name: 'Open',
      }),
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Action',
      }),
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('moves focus into the dialog when opened', async () => {
    const user = userEvent.setup();

    renderDialog();

    await user.click(
      screen.getByRole('button', {
        name: 'Open',
      }),
    );

    await waitFor(() => {
      expect(
        screen.getByRole('button', {
          name: 'Action',
        }),
      ).toHaveFocus();
    });
  });

  it('supports controlled state', () => {
    const onOpenChange = vi.fn();

    render(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle>Controlled</DialogTitle>

          <DialogDescription>Controlled dialog</DialogDescription>
        </DialogContent>
      </Dialog>,
    );

    expect(
      screen.getByRole('dialog', {
        name: 'Controlled',
      }),
    ).toBeInTheDocument();
  });
});
