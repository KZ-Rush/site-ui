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
  BlogLayout,
} from './blog-layout';

function renderLayout({
  navigation = 'Navigation',
  aside = 'Table of contents',
  header = 'Header',
  footer = 'Footer',
}: {
  navigation?: React.ReactNode;
  aside?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
} = {}) {
  return render(
    <BlogLayout
      header={header}
      footer={footer}
      navigation={navigation}
      aside={aside}
    >
      Article
    </BlogLayout>,
  );
}

describe('BlogLayout', () => {
  it('renders semantic layout regions', () => {
    renderLayout();

    expect(
      screen.getByRole('banner'),
    ).toHaveTextContent('Header');

    expect(
      screen.getByRole('main'),
    ).toHaveTextContent('Article');

    expect(
      screen.getByRole('contentinfo'),
    ).toHaveTextContent('Footer');

    expect(
      screen.getByRole('complementary', {
        name: 'Article navigation',
      }),
    ).toHaveTextContent('Navigation');

    expect(
      screen.getByRole('complementary', {
        name: 'Related information',
      }),
    ).toHaveTextContent(
      'Table of contents',
    );
  });

  it('does not render optional regions when omitted', () => {
    render(
      <BlogLayout>
        Article
      </BlogLayout>,
    );

    expect(
      screen.queryByRole('banner'),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('contentinfo'),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('complementary'),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole('main'),
    ).toHaveTextContent('Article');
  });

  it('sets optional-region data attributes', () => {
    renderLayout();

    const layout = screen
      .getByRole('main')
      .closest(
        '[data-slot="blog-layout"]',
      );

    expect(layout).toHaveAttribute(
      'data-has-navigation',
      'true',
    );

    expect(layout).toHaveAttribute(
      'data-has-aside',
      'true',
    );
  });

  it('supports all content-width values', () => {
    const {
      rerender,
    } = render(
      <BlogLayout contentWidth="sm">
        Article
      </BlogLayout>,
    );

    const getLayout = () => (
      screen
        .getByRole('main')
        .closest(
          '[data-slot="blog-layout"]',
        )
    );

    expect(getLayout()).toHaveAttribute(
      'data-content-width',
      'sm',
    );

    rerender(
      <BlogLayout contentWidth="lg">
        Article
      </BlogLayout>,
    );

    expect(getLayout()).toHaveAttribute(
      'data-content-width',
      'lg',
    );

    rerender(
      <BlogLayout contentWidth="full">
        Article
      </BlogLayout>,
    );

    expect(getLayout()).toHaveAttribute(
      'data-content-width',
      'full',
    );
  });

  it('enables sticky side columns by default', () => {
    renderLayout();

    expect(
      screen
        .getByRole('main')
        .closest(
          '[data-slot="blog-layout"]',
        ),
    ).toHaveAttribute(
      'data-sticky-side-columns',
      'true',
    );
  });

  it('allows sticky side columns to be disabled', () => {
    render(
      <BlogLayout
        navigation="Navigation"
        stickySideColumns={false}
      >
        Article
      </BlogLayout>,
    );

    expect(
      screen
        .getByRole('main')
        .closest(
          '[data-slot="blog-layout"]',
        ),
    ).not.toHaveAttribute(
      'data-sticky-side-columns',
    );
  });

  it('supports custom accessible labels', () => {
    render(
      <BlogLayout
        navigation="Categories"
        navigationLabel="News categories"
        aside="Contents"
        asideLabel="Article contents"
      >
        Article
      </BlogLayout>,
    );

    expect(
      screen.getByRole('complementary', {
        name: 'News categories',
      }),
    ).toHaveTextContent('Categories');

    expect(
      screen.getByRole('complementary', {
        name: 'Article contents',
      }),
    ).toHaveTextContent('Contents');
  });

  it('forwards native root props and class names', () => {
    render(
      <BlogLayout
        className="custom-blog-layout"
        title="News article"
      >
        Article
      </BlogLayout>,
    );

    const layout = screen
      .getByRole('main')
      .closest(
        '[data-slot="blog-layout"]',
      );

    expect(layout).toHaveClass(
      'rush-blog-layout',
      'custom-blog-layout',
    );

    expect(layout).toHaveAttribute(
      'title',
      'News article',
    );
  });

  it('applies custom region class names', () => {
    render(
      <BlogLayout
        header="Header"
        footer="Footer"
        navigation="Navigation"
        aside="Aside"
        headerClassName="custom-header"
        footerClassName="custom-footer"
        navigationClassName="custom-navigation"
        asideClassName="custom-aside"
        mainClassName="custom-main"
      >
        Article
      </BlogLayout>,
    );

    expect(
      screen.getByRole('banner'),
    ).toHaveClass('custom-header');

    expect(
      screen.getByRole('contentinfo'),
    ).toHaveClass('custom-footer');

    expect(
      screen.getByRole('complementary', {
        name: 'Article navigation',
      }),
    ).toHaveClass('custom-navigation');

    expect(
      screen.getByRole('complementary', {
        name: 'Related information',
      }),
    ).toHaveClass('custom-aside');

    expect(
      screen.getByRole('main'),
    ).toHaveClass('custom-main');
  });
});