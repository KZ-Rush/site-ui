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
  DataTableToolbar,
} from './data-table-toolbar';

describe('DataTableToolbar', () => {
  it('renders the toolbar', () => {
    render(
      <DataTableToolbar
        data-testid="toolbar"
      />,
    );

    expect(
      screen.getByTestId('toolbar'),
    ).toBeInTheDocument();
  });

  it('renders the start region', () => {
    render(
      <DataTableToolbar
        start={(
          <span>
            Search
          </span>
        )}
      />,
    );

    expect(
      screen.getByText('Search'),
    ).toBeInTheDocument();
  });

  it('renders the end region', () => {
    render(
      <DataTableToolbar
        end={(
          <button>
            Add
          </button>
        )}
      />,
    );

    expect(
      screen.getByRole(
        'button',
        {
          name: 'Add',
        },
      ),
    ).toBeInTheDocument();
  });

  it('does not render optional regions when omitted', () => {
    render(
      <DataTableToolbar
        data-testid="toolbar"
      />,
    );

    const toolbar =
      screen.getByTestId(
        'toolbar',
      );

    expect(
      toolbar.querySelector(
        '[data-slot="data-table-toolbar-start"]',
      ),
    ).not.toBeInTheDocument();

    expect(
      toolbar.querySelector(
        '[data-slot="data-table-toolbar-end"]',
      ),
    ).not.toBeInTheDocument();
  });

  it('renders selection content instead of start content', () => {
    render(
      <DataTableToolbar
        start={(
          <span>
            Filters
          </span>
        )}

        selection={(
          <span>
            3 selected
          </span>
        )}
      />,
    );

    expect(
      screen.queryByText(
        'Filters',
      ),
    ).not.toBeInTheDocument();

    expect(
      screen.getByText(
        '3 selected',
      ),
    ).toBeInTheDocument();
  });

  it('marks selection mode', () => {
    render(
      <DataTableToolbar
        data-testid="toolbar"

        selection={(
          <span>
            3 selected
          </span>
        )}
      />,
    );

    expect(
      screen.getByTestId(
        'toolbar',
      ),
    ).toHaveAttribute(
      'data-selection',
      'true',
    );

    expect(
      screen.getByTestId(
        'toolbar',
      ),
    ).toHaveClass(
      'rush-data-table-toolbar--selection',
    );
  });

  it('forwards native div props', () => {
    render(
      <DataTableToolbar
        data-testid="toolbar"
        aria-label="Record controls"
        id="record-toolbar"
      />,
    );

    const toolbar =
      screen.getByTestId(
        'toolbar',
      );

    expect(toolbar).toHaveAttribute(
      'aria-label',
      'Record controls',
    );

    expect(toolbar).toHaveAttribute(
      'id',
      'record-toolbar',
    );
  });

  it('applies a custom class name', () => {
    render(
      <DataTableToolbar
        data-testid="toolbar"
        className="custom-toolbar"
      />,
    );

    expect(
      screen.getByTestId(
        'toolbar',
      ),
    ).toHaveClass(
      'rush-data-table-toolbar',
      'custom-toolbar',
    );
  });
});