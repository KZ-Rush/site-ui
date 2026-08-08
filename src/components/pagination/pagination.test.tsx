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
  Pagination,
} from './pagination';

describe('Pagination', () => {
  it('renders an accessible navigation region', () => {
    render(
      <Pagination
        page={1}
        pageCount={5}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByRole(
        'navigation',
        {
          name: 'Pagination',
        },
      ),
    ).toBeInTheDocument();
  });

  it('marks the current page', () => {
    render(
      <Pagination
        page={3}
        pageCount={5}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByRole(
        'button',
        {
          name: 'Page 3, current page',
        },
      ),
    ).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('requests another page', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination
        page={2}
        pageCount={5}
        onPageChange={onPageChange}
      />,
    );

    await user.click(
      screen.getByRole(
        'button',
        {
          name: 'Go to page 4',
        },
      ),
    );

    expect(
      onPageChange,
    ).toHaveBeenCalledWith(4);
  });

  it('requests the previous page', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination
        page={3}
        pageCount={5}
        onPageChange={onPageChange}
      />,
    );

    await user.click(
      screen.getByRole(
        'button',
        {
          name: 'Go to previous page',
        },
      ),
    );

    expect(
      onPageChange,
    ).toHaveBeenCalledWith(2);
  });

  it('requests the next page', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination
        page={3}
        pageCount={5}
        onPageChange={onPageChange}
      />,
    );

    await user.click(
      screen.getByRole(
        'button',
        {
          name: 'Go to next page',
        },
      ),
    );

    expect(
      onPageChange,
    ).toHaveBeenCalledWith(4);
  });

  it('disables previous navigation on the first page', () => {
    render(
      <Pagination
        page={1}
        pageCount={5}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByRole(
        'button',
        {
          name: 'Go to previous page',
        },
      ),
    ).toBeDisabled();
  });

  it('disables next navigation on the last page', () => {
    render(
      <Pagination
        page={5}
        pageCount={5}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByRole(
        'button',
        {
          name: 'Go to next page',
        },
      ),
    ).toBeDisabled();
  });

  it('renders first and last controls when enabled', () => {
    render(
      <Pagination
        page={3}
        pageCount={5}
        showFirstLast
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByRole(
        'button',
        {
          name: 'Go to first page',
        },
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole(
        'button',
        {
          name: 'Go to last page',
        },
      ),
    ).toBeInTheDocument();
  });

  it('renders ellipses for large ranges', () => {
    render(
      <Pagination
        page={50}
        pageCount={100}
        onPageChange={() => {}}
      />,
    );

    const navigation =
      screen.getByRole(
        'navigation',
        {
          name: 'Pagination',
        },
      );

    expect(
      navigation.querySelectorAll(
        '[data-slot="pagination-ellipsis"]',
      ),
    ).toHaveLength(2);
  });

  it('does not render ellipses for small ranges', () => {
    render(
      <Pagination
        page={2}
        pageCount={4}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen
        .getByRole('navigation')
        .querySelector(
          '[data-slot="pagination-ellipsis"]',
        ),
    ).not.toBeInTheDocument();
  });

  it('renders nothing when pageCount is zero', () => {
    const {
      container,
    } = render(
      <Pagination
        page={1}
        pageCount={0}
        onPageChange={() => {}}
      />,
    );

    expect(
      container,
    ).toBeEmptyDOMElement();
  });

  it('clamps an invalid current page', () => {
    render(
      <Pagination
        page={99}
        pageCount={5}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByRole(
        'button',
        {
          name: 'Page 5, current page',
        },
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole(
        'button',
        {
          name: 'Go to next page',
        },
      ),
    ).toBeDisabled();
  });

  it('does not emit the current page again', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination
        page={3}
        pageCount={5}
        onPageChange={onPageChange}
      />,
    );

    await user.click(
      screen.getByRole(
        'button',
        {
          name: 'Page 3, current page',
        },
      ),
    );

    expect(
      onPageChange,
    ).not.toHaveBeenCalled();
  });

  it('forwards native navigation props', () => {
    render(
      <Pagination
        page={1}
        pageCount={3}
        onPageChange={() => {}}
        className="custom-pagination"
        aria-label="Records pages"
        title="Record pagination"
      />,
    );

    const navigation =
      screen.getByRole(
        'navigation',
        {
          name: 'Records pages',
        },
      );

    expect(navigation).toHaveClass(
      'rush-pagination',
      'custom-pagination',
    );

    expect(navigation).toHaveAttribute(
      'title',
      'Record pagination',
    );
  });
});