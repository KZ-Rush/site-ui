import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import {
  StandaloneLayout,
  StandaloneLayoutContent,
  StandaloneLayoutFooter,
  StandaloneLayoutHeader,
} from './standalone-layout';

describe('StandaloneLayout', () => {
  it('renders composed layout regions', () => {
    render(
      <StandaloneLayout>
        <StandaloneLayoutHeader>Header</StandaloneLayoutHeader>

        <StandaloneLayoutContent>Content</StandaloneLayoutContent>

        <StandaloneLayoutFooter>Footer</StandaloneLayoutFooter>
      </StandaloneLayout>,
    );

    expect(screen.getByText('Header')).toBeInTheDocument();

    expect(screen.getByText('Content')).toBeInTheDocument();

    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('uses semantic layout elements', () => {
    render(
      <StandaloneLayout>
        <StandaloneLayoutHeader>Header</StandaloneLayoutHeader>

        <StandaloneLayoutContent>Content</StandaloneLayoutContent>

        <StandaloneLayoutFooter>Footer</StandaloneLayoutFooter>
      </StandaloneLayout>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();

    expect(screen.getByRole('main')).toBeInTheDocument();

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('supports a content-only layout', () => {
    render(
      <StandaloneLayout>
        <StandaloneLayoutContent>Error page</StandaloneLayoutContent>
      </StandaloneLayout>,
    );

    expect(screen.getByRole('main')).toHaveTextContent('Error page');
  });

  it('forwards custom classes and native props', () => {
    render(
      <StandaloneLayout className="custom-layout" data-testid="layout">
        <StandaloneLayoutContent className="custom-content" data-testid="content">
          Content
        </StandaloneLayoutContent>
      </StandaloneLayout>,
    );

    expect(screen.getByTestId('layout')).toHaveClass('rush-standalone-layout', 'custom-layout');

    expect(screen.getByTestId('content')).toHaveClass(
      'rush-standalone-layout__content',
      'custom-content',
    );
  });

  it('supports centered mode', () => {
    render(
      <StandaloneLayout centered data-testid="layout">
        <StandaloneLayoutContent>Content</StandaloneLayoutContent>
      </StandaloneLayout>,
    );

    expect(screen.getByTestId('layout')).toHaveClass('rush-standalone-layout--centered');

    expect(screen.getByTestId('layout')).toHaveAttribute('data-centered', 'true');
  });
});
