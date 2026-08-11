import {
  render,
  screen,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from './popover';

function renderPopover() {
  return render(
    <Popover>
      <PopoverTrigger<HTMLButtonElement>
        render={(triggerProps) => (
          <button
            {...triggerProps}
            type="button"
          >
            Open
          </button>
        )}
      />

      <PopoverContent>
        <button>
          Inside action
        </button>
      </PopoverContent>
    </Popover>,
  );
}

describe('Popover', () => {
  it('opens when the trigger is clicked', async () => {
    const user =
      userEvent.setup();

    renderPopover();

    await user.click(
      screen.getByRole(
        'button',
        {
          name: 'Open',
        },
      ),
    );

    expect(
      screen.getByText(
        'Inside action',
      ),
    ).toBeInTheDocument();
  });

  it('closes when the trigger is clicked again', async () => {
    const user =
      userEvent.setup();

    renderPopover();

    const trigger =
      screen.getByRole(
        'button',
        {
          name: 'Open',
        },
      );

    await user.click(trigger);

    expect(
      screen.getByText(
        'Inside action',
      ),
    ).toBeInTheDocument();

    await user.click(trigger);

    expect(
      screen.queryByText(
        'Inside action',
      ),
    ).not.toBeInTheDocument();
  });

  it('stays open when interacting inside the popover', async () => {
    const user =
      userEvent.setup();

    renderPopover();

    await user.click(
      screen.getByRole(
        'button',
        {
          name: 'Open',
        },
      ),
    );

    await user.click(
      screen.getByRole(
        'button',
        {
          name: 'Inside action',
        },
      ),
    );

    expect(
      screen.getByText(
        'Inside action',
      ),
    ).toBeInTheDocument();
  });

  it('closes on Escape and restores trigger focus', async () => {
    const user =
      userEvent.setup();

    renderPopover();

    const trigger =
      screen.getByRole(
        'button',
        {
          name: 'Open',
        },
      );

    await user.click(trigger);

    await user.keyboard(
      '{Escape}',
    );

    expect(
      screen.queryByText(
        'Inside action',
      ),
    ).not.toBeInTheDocument();

    expect(
      trigger,
    ).toHaveFocus();
  });

  it('closes on outside click', async () => {
    const user =
      userEvent.setup();

    render(
      <>
        <Popover>
          <PopoverTrigger<HTMLButtonElement>
            render={(triggerProps) => (
              <button
                {...triggerProps}
                type="button"
              >
                Open
              </button>
            )}
          />

          <PopoverContent>
            Content
          </PopoverContent>
        </Popover>

        <button>
          Outside
        </button>
      </>,
    );

    await user.click(
      screen.getByRole(
        'button',
        {
          name: 'Open',
        },
      ),
    );

    await user.click(
      screen.getByRole(
        'button',
        {
          name: 'Outside',
        },
      ),
    );

    expect(
      screen.queryByText(
        'Content',
      ),
    ).not.toBeInTheDocument();
  });

  it('supports an explicit close control', async () => {
    const user =
      userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger<HTMLButtonElement>
          render={(triggerProps) => (
            <button
              {...triggerProps}
              type="button"
            >
              Open
            </button>
          )}
        />

        <PopoverContent>
          <PopoverClose>
            Close
          </PopoverClose>
        </PopoverContent>
      </Popover>,
    );

    await user.click(
      screen.getByRole(
        'button',
        {
          name: 'Open',
        },
      ),
    );

    await user.click(
      screen.getByRole(
        'button',
        {
          name: 'Close',
        },
      ),
    );

    expect(
      screen.queryByRole(
        'button',
        {
          name: 'Close',
        },
      ),
    ).not.toBeInTheDocument();
  });

  it('supports controlled state', () => {
    const onOpenChange =
      vi.fn();

    render(
      <Popover
        open
        onOpenChange={
          onOpenChange
        }
      >
        <PopoverTrigger<HTMLButtonElement>
          render={(triggerProps) => (
            <button
              {...triggerProps}
              type="button"
            >
              Open
            </button>
          )}
        />

        <PopoverContent>
          Content
        </PopoverContent>
      </Popover>,
    );

    expect(
      screen.getByText(
        'Content',
      ),
    ).toBeInTheDocument();
  });
});