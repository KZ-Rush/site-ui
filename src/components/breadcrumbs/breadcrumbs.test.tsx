import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { BreadcrumbItem, Breadcrumbs } from './breadcrumbs';

describe('Breadcrumbs', () => {
  it('renders an accessible breadcrumb navigation', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>

        <BreadcrumbItem current>Records</BreadcrumbItem>
      </Breadcrumbs>,
    );

    expect(
      screen.getByRole('navigation', {
        name: 'Breadcrumb',
      }),
    ).toBeInTheDocument();
  });

  it('supports a custom accessible label', () => {
    render(
      <Breadcrumbs aria-label="Page hierarchy">
        <BreadcrumbItem current>Records</BreadcrumbItem>
      </Breadcrumbs>,
    );

    expect(
      screen.getByRole('navigation', {
        name: 'Page hierarchy',
      }),
    ).toBeInTheDocument();
  });

  it('renders link items', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem href="/records">Records</BreadcrumbItem>

        <BreadcrumbItem current>Demo</BreadcrumbItem>
      </Breadcrumbs>,
    );

    expect(
      screen.getByRole('link', {
        name: 'Records',
      }),
    ).toHaveAttribute('href', '/records');
  });

  it('marks the current item with aria-current', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>

        <BreadcrumbItem current>Records</BreadcrumbItem>
      </Breadcrumbs>,
    );

    expect(screen.getByText('Records')).toHaveAttribute('aria-current', 'page');
  });

  it('does not render the current item as a link', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem current>Dashboard</BreadcrumbItem>
      </Breadcrumbs>,
    );

    expect(
      screen.queryByRole('link', {
        name: 'Dashboard',
      }),
    ).not.toBeInTheDocument();

    expect(screen.getByText('Dashboard').tagName).toBe('SPAN');
  });

  it('renders separators between items only', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>

        <BreadcrumbItem href="/records">Records</BreadcrumbItem>

        <BreadcrumbItem current>Demo</BreadcrumbItem>
      </Breadcrumbs>,
    );

    const navigation = screen.getByRole('navigation', {
      name: 'Breadcrumb',
    });

    expect(navigation.querySelectorAll('[data-slot="breadcrumbs-separator"]')).toHaveLength(2);
  });

  it('does not render a separator for one item', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem current>Dashboard</BreadcrumbItem>
      </Breadcrumbs>,
    );

    expect(
      screen.getByRole('navigation').querySelector('[data-slot="breadcrumbs-separator"]'),
    ).not.toBeInTheDocument();
  });

  it('supports a custom separator', () => {
    render(
      <Breadcrumbs separator="›">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>

        <BreadcrumbItem current>Records</BreadcrumbItem>
      </Breadcrumbs>,
    );

    expect(screen.getByText('›')).toHaveAttribute('aria-hidden', 'true');
  });

  it('forwards native link properties', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem
          href="/records"
          target="_blank"
          rel="noopener noreferrer"
          title="Open records"
        >
          Records
        </BreadcrumbItem>

        <BreadcrumbItem current>Current</BreadcrumbItem>
      </Breadcrumbs>,
    );

    const link = screen.getByRole('link', {
      name: 'Records',
    });

    expect(link).toHaveAttribute('target', '_blank');

    expect(link).toHaveAttribute('rel', 'noopener noreferrer');

    expect(link).toHaveAttribute('title', 'Open records');
  });

  it('forwards root props and class names', () => {
    render(
      <Breadcrumbs className="custom-breadcrumbs" title="Page hierarchy">
        <BreadcrumbItem current>Dashboard</BreadcrumbItem>
      </Breadcrumbs>,
    );

    const navigation = screen.getByRole('navigation', {
      name: 'Breadcrumb',
    });

    expect(navigation).toHaveClass('rush-breadcrumbs', 'custom-breadcrumbs');

    expect(navigation).toHaveAttribute('title', 'Page hierarchy');
  });
});
