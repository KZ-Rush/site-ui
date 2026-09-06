import { createRef } from 'react';

import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { DataList, DataListItem, DataListTerm, DataListValue } from './data-list';

describe('DataList', () => {
  it('renders a semantic description list', () => {
    render(
      <DataList data-testid="data-list">
        <DataListItem>
          <DataListTerm>Client IP</DataListTerm>
          <DataListValue>203.0.113.10</DataListValue>
        </DataListItem>
      </DataList>,
    );

    const list = screen.getByTestId('data-list');
    const term = screen.getByText('Client IP');
    const value = screen.getByText('203.0.113.10');

    expect(list.tagName).toBe('DL');
    expect(term.tagName).toBe('DT');
    expect(value.tagName).toBe('DD');
    expect(term.closest('[data-slot="data-list-item"]')).toContainElement(value);
  });

  it('uses the horizontal orientation by default', () => {
    render(<DataList data-testid="data-list" />);

    expect(screen.getByTestId('data-list')).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('supports vertical orientation', () => {
    render(<DataList data-testid="data-list" orientation="vertical" />);

    expect(screen.getByTestId('data-list')).toHaveAttribute('data-orientation', 'vertical');
  });

  it('forwards native props, classes, and refs', () => {
    const ref = createRef<HTMLDListElement>();

    render(
      <DataList
        ref={ref}
        data-testid="data-list"
        className="custom-list"
        aria-label="Session data"
      />,
    );

    const list = screen.getByTestId('data-list');

    expect(ref.current).toBe(list);
    expect(list).toHaveClass('rush-data-list', 'custom-list');
    expect(list).toHaveAttribute('aria-label', 'Session data');
    expect(list).toHaveAttribute('data-slot', 'data-list');
  });
});
