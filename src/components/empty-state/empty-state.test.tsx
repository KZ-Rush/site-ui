import {
  render,
  screen,
} from '@testing-library/react';

import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  EmptyState,
} from './empty-state';

describe('EmptyState', () => {
  it('renders the title as a level 2 heading', () => {
    render(
      <EmptyState title="No records found" />,
    );

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'No records found',
      }),
    ).toBeInTheDocument();
  });

  it('renders an optional description', () => {
    render(
      <EmptyState
        title="No records"
        description="Try changing the filters."
      />,
    );

    expect(
      screen.getByText(
        'Try changing the filters.',
      ),
    ).toBeInTheDocument();
  });

  it('renders an optional icon', () => {
    render(
      <EmptyState
        title="No records"
        icon={(
          <svg data-testid="icon" />
        )}
      />,
    );

    expect(
      screen.getByTestId('icon'),
    ).toBeInTheDocument();

    expect(
      screen
        .getByTestId('icon')
        .closest(
          '[data-slot="empty-state-icon"]',
        ),
    ).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('renders the primary action', () => {
    render(
      <EmptyState
        title="No demos"
        action={(
          <button>
            Upload demo
          </button>
        )}
      />,
    );

    expect(
      screen.getByRole('button', {
        name: 'Upload demo',
      }),
    ).toBeInTheDocument();
  });

  it('renders primary and secondary actions', () => {
    render(
      <EmptyState
        title="No records"
        action={(
          <button>
            Clear filters
          </button>
        )}
        secondaryAction={(
          <button>
            Learn more
          </button>
        )}
      />,
    );

    expect(
      screen.getByRole('button', {
        name: 'Clear filters',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Learn more',
      }),
    ).toBeInTheDocument();
  });

  it('does not render optional regions when omitted', () => {
    render(
      <EmptyState title="Nothing here" />,
    );

    const emptyState =
      screen
        .getByRole('heading', {
          level: 2,
          name: 'Nothing here',
        })
        .closest(
          '[data-slot="empty-state"]',
        );

    expect(
      emptyState?.querySelector(
        '[data-slot="empty-state-icon"]',
      ),
    ).not.toBeInTheDocument();

    expect(
      emptyState?.querySelector(
        '[data-slot="empty-state-description"]',
      ),
    ).not.toBeInTheDocument();

    expect(
      emptyState?.querySelector(
        '[data-slot="empty-state-actions"]',
      ),
    ).not.toBeInTheDocument();
  });

  it('renders the action region when only a secondary action is provided', () => {
    render(
      <EmptyState
        title="No records"
        secondaryAction={(
          <button>
            Learn more
          </button>
        )}
      />,
    );

    const action =
      screen.getByRole('button', {
        name: 'Learn more',
      });

    expect(
      action.closest(
        '[data-slot="empty-state-actions"]',
      ),
    ).toBeInTheDocument();
  });

  it('forwards native props and class names', () => {
    render(
      <EmptyState
        title="No records"
        className="custom-empty-state"
        aria-label="Empty records"
        data-testid="empty-state"
      />,
    );

    const emptyState =
      screen.getByTestId(
        'empty-state',
      );

    expect(emptyState).toHaveClass(
      'rush-empty-state',
      'custom-empty-state',
    );

    expect(emptyState).toHaveAttribute(
      'aria-label',
      'Empty records',
    );
  });
});