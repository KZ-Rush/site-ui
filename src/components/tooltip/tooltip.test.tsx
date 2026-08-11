import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

function renderTooltip() {
  return render(
    <Tooltip openDelay={0} closeDelay={0}>
      <TooltipTrigger<HTMLButtonElement>
        render={(triggerProps) => (
          <button {...triggerProps} type="button">
            Trigger
          </button>
        )}
      />

      <TooltipContent>Helpful text</TooltipContent>
    </Tooltip>,
  );
}

describe('Tooltip', () => {
  it('opens on hover', async () => {
    const user = userEvent.setup();

    renderTooltip();

    await user.hover(
      screen.getByRole('button', {
        name: 'Trigger',
      }),
    );

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Helpful text');
  });

  it('closes when hover ends', async () => {
    const user = userEvent.setup();

    renderTooltip();

    const trigger = screen.getByRole('button', {
      name: 'Trigger',
    });

    await user.hover(trigger);

    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    await user.unhover(trigger);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('opens on focus', async () => {
    const user = userEvent.setup();

    renderTooltip();

    await user.tab();

    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
  });

  it('connects the trigger using aria-describedby', async () => {
    const user = userEvent.setup();

    renderTooltip();

    const trigger = screen.getByRole('button', {
      name: 'Trigger',
    });

    await user.hover(trigger);

    const tooltip = await screen.findByRole('tooltip');

    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();

    renderTooltip();

    await user.hover(
      screen.getByRole('button', {
        name: 'Trigger',
      }),
    );

    await screen.findByRole('tooltip');

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('supports controlled state', () => {
    const onOpenChange = vi.fn();

    render(
      <Tooltip open onOpenChange={onOpenChange}>
        <TooltipTrigger<HTMLButtonElement>
          render={(triggerProps) => (
            <button {...triggerProps} type="button">
              Trigger
            </button>
          )}
        />

        <TooltipContent>Content</TooltipContent>
      </Tooltip>,
    );

    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });
});
