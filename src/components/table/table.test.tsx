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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

describe('Table', () => {
  it('renders semantic table elements', () => {
    render(
      <TableContainer>
        <Table>
          <TableCaption>
            Records
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>
                Player
              </TableHead>

              <TableHead>
                Time
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>
                PlayerOne
              </TableCell>

              <TableCell>
                01:23.45
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>,
    );

    expect(
      screen.getByRole('table', {
        name: 'Records',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('columnheader', {
        name: 'Player',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('cell', {
        name: 'PlayerOne',
      }),
    ).toBeInTheDocument();
  });

  it('applies table options', () => {
    render(
      <Table
        striped
        hoverable={false}
        density="compact"
        data-testid="table"
      >
        <TableBody>
          <TableRow>
            <TableCell>
              Value
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const table =
      screen.getByTestId('table');

    expect(table).toHaveClass(
      'rush-table',
      'rush-table--striped',
      'rush-table--density-compact',
    );

    expect(table).not.toHaveClass(
      'rush-table--hoverable',
    );

    expect(table).toHaveAttribute(
      'data-striped',
      'true',
    );

    expect(table).toHaveAttribute(
      'data-density',
      'compact',
    );
  });

  it('marks a selected row', () => {
    render(
      <Table>
        <TableBody>
          <TableRow
            selected
            data-testid="row"
          >
            <TableCell>
              PlayerOne
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const row =
      screen.getByTestId('row');

    expect(row).toHaveClass(
      'rush-table__row--selected',
    );

    expect(row).toHaveAttribute(
      'data-selected',
      'true',
    );

    expect(row).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('applies alignment to header and body cells', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              align="right"
              data-testid="head"
            >
              Time
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell
              align="right"
              data-testid="cell"
            >
              01:23.45
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(
      screen.getByTestId('head'),
    ).toHaveClass(
      'rush-table__cell--align-right',
    );

    expect(
      screen.getByTestId('cell'),
    ).toHaveClass(
      'rush-table__cell--align-right',
    );
  });

  it('defaults table headers to column scope', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Player
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );

    expect(
      screen.getByRole('columnheader', {
        name: 'Player',
      }),
    ).toHaveAttribute(
      'scope',
      'col',
    );
  });

  it('allows header scope to be overridden', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableHead scope="row">
              PlayerOne
            </TableHead>

            <TableCell>
              01:23.45
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(
      screen.getByRole('rowheader', {
        name: 'PlayerOne',
      }),
    ).toHaveAttribute(
      'scope',
      'row',
    );
  });

  it('renders a footer', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              Approved
            </TableCell>
          </TableRow>
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell>
              Total: 1
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );

    expect(
      screen.getByText('Total: 1')
        .closest('tfoot'),
    ).toHaveClass(
      'rush-table__footer',
    );
  });

  it('renders the responsive container', () => {
    render(
      <TableContainer
        data-testid="container"
        className="custom-container"
      >
        <Table />
      </TableContainer>,
    );

    expect(
      screen.getByTestId('container'),
    ).toHaveClass(
      'rush-table-container',
      'custom-container',
    );
  });

  it('forwards native table props and class names', () => {
    render(
      <Table
        className="custom-table"
        title="World records"
        data-testid="table"
      />,
    );

    const table =
      screen.getByTestId('table');

    expect(table).toHaveClass(
      'rush-table',
      'custom-table',
    );

    expect(table).toHaveAttribute(
      'title',
      'World records',
    );
  });

  it('forwards native cell props', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={2}
              title="Combined cell"
            >
              Combined
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const cell =
      screen.getByRole('cell', {
        name: 'Combined',
      });

    expect(cell).toHaveAttribute(
      'colspan',
      '2',
    );

    expect(cell).toHaveAttribute(
      'title',
      'Combined cell',
    );
  });

  it('does not apply striped styles by default', () => {
  render(
      <Table data-testid="table">
      <TableBody>
          <TableRow>
          <TableCell>
              First
          </TableCell>
          </TableRow>

          <TableRow>
          <TableCell>
              Second
          </TableCell>
          </TableRow>
      </TableBody>
      </Table>,
  );

  const table =
      screen.getByTestId('table');

  expect(table).not.toHaveClass(
      'rush-table--striped',
  );

  expect(table).not.toHaveAttribute(
      'data-striped',
  );
  });

  it('applies striped mode when requested', () => {
  render(
      <Table
      striped
      data-testid="table"
      >
      <TableBody>
          <TableRow>
          <TableCell>
              First
          </TableCell>
          </TableRow>

          <TableRow>
          <TableCell>
              Second
          </TableCell>
          </TableRow>
      </TableBody>
      </Table>,
  );

  const table =
      screen.getByTestId('table');

  expect(table).toHaveClass(
      'rush-table--striped',
  );

  expect(table).toHaveAttribute(
      'data-striped',
      'true',
  );
  });
});