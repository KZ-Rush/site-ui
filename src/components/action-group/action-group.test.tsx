import { createRef } from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ActionGroup } from './action-group';

describe('ActionGroup', () => {
  it('uses a wrapping horizontal layout by default', () => {
    render(<ActionGroup data-testid="actions" />);

    const group = screen.getByTestId('actions');

    expect(group).toHaveAttribute('data-orientation', 'horizontal');
    expect(group).toHaveAttribute('data-align', 'center');
    expect(group).toHaveAttribute('data-justify', 'start');
    expect(group).toHaveAttribute('data-wrap', 'true');
  });

  it('uses stretch alignment and disables wrapping for a vertical group', () => {
    render(<ActionGroup data-testid="actions" orientation="vertical" />);

    const group = screen.getByTestId('actions');

    expect(group).toHaveClass('rush-action-group--vertical', 'rush-action-group--align-stretch');
    expect(group).toHaveAttribute('data-wrap', 'false');
  });

  it('supports custom alignment and wrapping behavior', () => {
    render(<ActionGroup data-testid="actions" align="end" justify="between" wrap={false} />);

    expect(screen.getByTestId('actions')).toHaveClass(
      'rush-action-group--align-end',
      'rush-action-group--justify-between',
    );
    expect(screen.getByTestId('actions')).toHaveAttribute('data-wrap', 'false');
  });

  it('forwards native props, classes, and refs', () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <ActionGroup
        ref={ref}
        aria-label="Record actions"
        className="custom-actions"
        data-testid="actions"
      />,
    );

    const group = screen.getByTestId('actions');

    expect(ref.current).toBe(group);
    expect(group).toHaveClass('rush-action-group', 'custom-actions');
    expect(group).toHaveAttribute('aria-label', 'Record actions');
    expect(group).toHaveAttribute('data-slot', 'action-group');
  });
});
