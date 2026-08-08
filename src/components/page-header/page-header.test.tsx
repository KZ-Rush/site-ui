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
  BreadcrumbItem,
  Breadcrumbs,
} from '../breadcrumbs';

import {
  PageHeader,
} from './page-header';

describe('PageHeader', () => {
  it('renders the page title as an h1', () => {
    render(
      <PageHeader title="Demo #123" />,
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Demo #123',
      }),
    ).toBeInTheDocument();
  });

  it('renders an optional description', () => {
    render(
      <PageHeader
        title="Demo #123"
        description="Review this demo."
      />,
    );

    expect(
      screen.getByText(
        'Review this demo.',
      ),
    ).toHaveClass(
      'rush-page-header__description',
    );
  });

  it('renders optional breadcrumbs', () => {
    render(
      <PageHeader
        title="Demo #123"
        breadcrumbs={(
          <Breadcrumbs>
            <BreadcrumbItem href="/records">
              Records
            </BreadcrumbItem>

            <BreadcrumbItem current>
              Demo #123
            </BreadcrumbItem>
          </Breadcrumbs>
        )}
      />,
    );

    expect(
      screen.getByRole('navigation', {
        name: 'Breadcrumb',
      }),
    ).toBeInTheDocument();
  });

  it('renders optional actions', () => {
    render(
      <PageHeader
        title="Demo #123"
        actions={(
          <button>
            Approve
          </button>
        )}
      />,
    );

    expect(
      screen.getByRole('button', {
        name: 'Approve',
      }),
    ).toBeInTheDocument();
  });

  it('does not render optional regions when omitted', () => {
    render(
      <PageHeader title="Dashboard" />,
    );

    const header =
      screen
        .getByRole('heading', {
          level: 1,
          name: 'Dashboard',
        })
        .closest(
          '[data-slot="page-header"]',
        );

    expect(
      header?.querySelector(
        '[data-slot="page-header-breadcrumbs"]',
      ),
    ).not.toBeInTheDocument();

    expect(
      header?.querySelector(
        '[data-slot="page-header-actions"]',
      ),
    ).not.toBeInTheDocument();

    expect(
      header?.querySelector(
        '[data-slot="page-header-description"]',
      ),
    ).not.toBeInTheDocument();
  });

  it('forwards native header props and class names', () => {
    render(
      <PageHeader
        title="Dashboard"
        className="custom-header"
        aria-label="Page heading"
      />,
    );

    const header =
      screen.getByLabelText(
        'Page heading',
      );

    expect(header).toHaveClass(
      'rush-page-header',
      'custom-header',
    );

    expect(header).toHaveAttribute(
      'data-slot',
      'page-header',
    );
  });

  it('applies custom content and actions class names', () => {
    render(
      <PageHeader
        title="Dashboard"
        contentClassName="custom-content"
        actionsClassName="custom-actions"
        actions={(
          <button>
            Action
          </button>
        )}
      />,
    );

    const header =
      screen
        .getByRole('heading', {
          level: 1,
          name: 'Dashboard',
        })
        .closest(
          '[data-slot="page-header"]',
        );

    expect(
      header?.querySelector(
        '.rush-page-header__content',
      ),
    ).toHaveClass(
      'custom-content',
    );

    expect(
      header?.querySelector(
        '.rush-page-header__actions',
      ),
    ).toHaveClass(
      'custom-actions',
    );
  });
});