import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';

function renderDrawer({
  defaultOpen = false,
  onOpenChange,
}: {
  defaultOpen?: boolean;
  onOpenChange?: (
    open: boolean,
  ) => void;
} = {}) {
  return render(
    <Drawer
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <DrawerTrigger>
        Open navigation
      </DrawerTrigger>

      <DrawerContent>
        <DrawerTitle>
          Navigation
        </DrawerTitle>

        <button>
          First action
        </button>

        <DrawerClose>
          Close
        </DrawerClose>
      </DrawerContent>
    </Drawer>,
  );
}

describe('Drawer', () => {
  it('is closed by default', () => {
    renderDrawer();

    expect(
      screen.queryByRole('dialog'),
    ).not.toBeInTheDocument();
  });

  it('opens from the trigger', async () => {
    const user = userEvent.setup();

    renderDrawer();

    await user.click(
      screen.getByRole('button', {
        name: 'Open navigation',
      }),
    );

    expect(
      screen.getByRole('dialog', {
        name: 'Navigation',
      }),
    ).toBeInTheDocument();
  });

  it('closes from DrawerClose', async () => {
    const user = userEvent.setup();

    renderDrawer({
      defaultOpen: true,
    });

    await user.click(
      screen.getByRole('button', {
        name: 'Close',
      }),
    );

    expect(
      screen.queryByRole('dialog'),
    ).not.toBeInTheDocument();
  });

  it('closes when Escape is pressed', async () => {
    const user = userEvent.setup();

    renderDrawer({
      defaultOpen: true,
    });

    await user.keyboard(
      '{Escape}',
    );

    expect(
      screen.queryByRole('dialog'),
    ).not.toBeInTheDocument();
  });

  it('notifies controlled consumers', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Drawer
        open={false}
        onOpenChange={onOpenChange}
      >
        <DrawerTrigger>
          Open
        </DrawerTrigger>

        <DrawerContent>
          <DrawerTitle>
            Drawer
          </DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Open',
      }),
    );

    expect(
      onOpenChange,
    ).toHaveBeenCalledWith(true);

    /*
     * Controlled value remains false until its owner
     * supplies a new value.
     */
    expect(
      screen.queryByRole('dialog'),
    ).not.toBeInTheDocument();
  });

  it('locks body scrolling while open', () => {
    renderDrawer({
      defaultOpen: true,
    });

    expect(
      document.body.style.overflow,
    ).toBe('hidden');
  });

  it('restores body scrolling after closing', async () => {
    const user = userEvent.setup();

    renderDrawer({
      defaultOpen: true,
    });

    await user.click(
      screen.getByRole('button', {
        name: 'Close',
      }),
    );

    expect(
      document.body.style.overflow,
    ).toBe('');
  });

  it('moves focus into the drawer', async () => {
    renderDrawer({
      defaultOpen: true,
    });

    await waitFor(() => {
      expect(
        screen.getByRole('button', {
          name: 'First action',
        }),
      ).toHaveFocus();
    });
  });

  it('returns focus to the trigger', async () => {
    const user = userEvent.setup();

    renderDrawer();

    const trigger =
      screen.getByRole('button', {
        name: 'Open navigation',
      });

    await user.click(trigger);

    await user.click(
      screen.getByRole('button', {
        name: 'Close',
      }),
    );

    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it('does not close on Escape when disabled', async () => {
    const user = userEvent.setup();

    render(
      <Drawer defaultOpen>
        <DrawerTrigger>
          Open
        </DrawerTrigger>

        <DrawerContent
          closeOnEscape={false}
        >
          <DrawerTitle>
            Navigation
          </DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );

    await user.keyboard('{Escape}');

    expect(
      screen.getByRole('dialog', {
        name: 'Navigation',
      }),
    ).toBeInTheDocument();
  });

  it('keeps body scrolling locked while another drawer remains open', async () => {
    const user = userEvent.setup();

    render(
      <>
        <Drawer defaultOpen>
          <DrawerTrigger>
            Open first
          </DrawerTrigger>

          <DrawerContent aria-label="First drawer">
            <DrawerClose>
              Close first
            </DrawerClose>
          </DrawerContent>
        </Drawer>

        <Drawer defaultOpen>
          <DrawerTrigger>
            Open second
          </DrawerTrigger>

          <DrawerContent aria-label="Second drawer">
            <DrawerClose>
              Close second
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      </>,
    );

    expect(
      document.body.style.overflow,
    ).toBe('hidden');

    await user.click(
      screen.getByRole('button', {
        name: 'Close first',
      }),
    );

    expect(
      document.body.style.overflow,
    ).toBe('hidden');

    await user.click(
      screen.getByRole('button', {
        name: 'Close second',
      }),
    );

    expect(
      document.body.style.overflow,
    ).toBe('');
  });
});