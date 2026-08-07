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
  LayoutPanelToggle,
} from './layout-panel-toggle';

describe('LayoutPanelToggle', () => {
  it('renders expanded state', () => {
    render(
      <LayoutPanelToggle
        controls="sidebar"
        expanded
        collapseLabel="Collapse sidebar"
        expandLabel="Expand sidebar"
        onToggle={() => {}}
      />,
    );

    const button = screen.getByRole(
      'button',
      {
        name: 'Collapse sidebar',
      },
    );

    expect(button).toHaveAttribute(
      'aria-controls',
      'sidebar',
    );

    expect(button).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('renders collapsed state', () => {
    render(
      <LayoutPanelToggle
        controls="sidebar"
        expanded={false}
        collapseLabel="Collapse sidebar"
        expandLabel="Expand sidebar"
        onToggle={() => {}}
      />,
    );

    const button = screen.getByRole(
      'button',
      {
        name: 'Expand sidebar',
      },
    );

    expect(button).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('calls onToggle after click', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(
      <LayoutPanelToggle
        controls="sidebar"
        expanded
        collapseLabel="Collapse sidebar"
        expandLabel="Expand sidebar"
        onToggle={onToggle}
      />,
    );

    await user.click(
      screen.getByRole('button'),
    );

    expect(onToggle).toHaveBeenCalledOnce();
  });

  it('calls consumer onClick before onToggle', async () => {
    const user = userEvent.setup();

    const calls: string[] = [];

    render(
      <LayoutPanelToggle
        controls="sidebar"
        expanded
        collapseLabel="Collapse sidebar"
        expandLabel="Expand sidebar"
        onClick={() => {
          calls.push('click');
        }}
        onToggle={() => {
          calls.push('toggle');
        }}
      />,
    );

    await user.click(
      screen.getByRole('button'),
    );

    expect(calls).toEqual([
      'click',
      'toggle',
    ]);
  });

  it('does not toggle when click is prevented', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(
      <LayoutPanelToggle
        controls="sidebar"
        expanded
        collapseLabel="Collapse sidebar"
        expandLabel="Expand sidebar"
        onClick={(event) => {
          event.preventDefault();
        }}
        onToggle={onToggle}
      />,
    );

    await user.click(
      screen.getByRole('button'),
    );

    expect(onToggle).not.toHaveBeenCalled();
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(
      <LayoutPanelToggle
        controls="sidebar"
        expanded
        collapseLabel="Collapse sidebar"
        expandLabel="Expand sidebar"
        disabled
        onToggle={onToggle}
      />,
    );

    const button = screen.getByRole(
      'button',
    );

    expect(button).toBeDisabled();

    await user.click(button);

    expect(onToggle).not.toHaveBeenCalled();
  });

  it('renders custom children', () => {
    render(
      <LayoutPanelToggle
        controls="sidebar"
        expanded
        collapseLabel="Collapse sidebar"
        expandLabel="Expand sidebar"
        onToggle={() => {}}
      >
        Toggle icon
      </LayoutPanelToggle>,
    );

    expect(
      screen.getByText('Toggle icon'),
    ).toBeInTheDocument();
  });

  it('renders fallback content', () => {
    render(
      <LayoutPanelToggle
        controls="sidebar"
        expanded
        collapseLabel="Collapse sidebar"
        expandLabel="Expand sidebar"
        onToggle={() => {}}
        fallbackContent="Fallback icon"
      />,
    );

    expect(
      screen.getByText('Fallback icon'),
    ).toBeInTheDocument();
  });

  it('prefers children over fallback content', () => {
    render(
      <LayoutPanelToggle
        controls="sidebar"
        expanded
        collapseLabel="Collapse sidebar"
        expandLabel="Expand sidebar"
        onToggle={() => {}}
        fallbackContent="Fallback"
      >
        Custom
      </LayoutPanelToggle>,
    );

    expect(
      screen.getByText('Custom'),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Fallback'),
    ).not.toBeInTheDocument();
  });

  it('forwards button properties and class names', () => {
    render(
      <LayoutPanelToggle
        controls="sidebar"
        expanded
        collapseLabel="Collapse sidebar"
        expandLabel="Expand sidebar"
        onToggle={() => {}}
        className="custom-toggle"
        title="Toggle navigation"
      />,
    );

    const button = screen.getByRole(
      'button',
    );

    expect(button).toHaveClass(
      'rush-layout-panel-toggle',
      'custom-toggle',
    );

    expect(button).toHaveAttribute(
      'title',
      'Toggle navigation',
    );

    expect(button).toHaveAttribute(
      'type',
      'button',
    );
  });
});