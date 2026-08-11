import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { classNames } from '../../utils/class-names';

import './blog-layout.scss';

export type BlogLayoutContentWidth = 'sm' | 'md' | 'lg' | 'full';

export interface BlogLayoutProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  /**
   * Main article or page content.
   */
  children: ReactNode;

  /**
   * Optional full-width page header.
   */
  header?: ReactNode;

  /**
   * Optional full-width page footer.
   */
  footer?: ReactNode;

  /**
   * Optional left navigation content.
   */
  navigation?: ReactNode;

  /**
   * Optional right-side supporting content, such as a
   * table of contents or related links.
   */
  aside?: ReactNode;

  /**
   * Maximum width of the central content column.
   */
  contentWidth?: BlogLayoutContentWidth;

  /**
   * Accessible label for the left navigation region.
   */
  navigationLabel?: string;

  /**
   * Accessible label for the right aside region.
   */
  asideLabel?: string;

  /**
   * Whether desktop side columns should remain visible
   * while the document scrolls.
   */
  stickySideColumns?: boolean;

  headerClassName?: string;
  footerClassName?: string;
  navigationClassName?: string;
  asideClassName?: string;
  mainClassName?: string;
}

export function BlogLayout({
  children,
  header,
  footer,
  navigation,
  aside,
  contentWidth = 'md',
  navigationLabel = 'Article navigation',
  asideLabel = 'Related information',
  stickySideColumns = true,
  headerClassName,
  footerClassName,
  navigationClassName,
  asideClassName,
  mainClassName,
  className,
  ...rootProps
}: BlogLayoutProps) {
  const hasNavigation = navigation !== undefined && navigation !== null;

  const hasAside = aside !== undefined && aside !== null;

  return (
    <div
      {...rootProps}
      className={classNames('rush-blog-layout', className)}
      data-content-width={contentWidth}
      data-has-aside={hasAside || undefined}
      data-has-navigation={hasNavigation || undefined}
      data-slot="blog-layout"
      data-sticky-side-columns={stickySideColumns || undefined}
    >
      {header !== undefined && header !== null && (
        <header
          className={classNames('rush-blog-layout__header', headerClassName)}
          data-slot="blog-header"
        >
          {header}
        </header>
      )}

      <div className="rush-blog-layout__body" data-slot="blog-body">
        {hasNavigation && (
          <aside
            aria-label={navigationLabel}
            className={classNames('rush-blog-layout__navigation', navigationClassName)}
            data-slot="blog-navigation"
          >
            <div className="rush-blog-layout__side-content">{navigation}</div>
          </aside>
        )}

        <main className={classNames('rush-blog-layout__main', mainClassName)} data-slot="blog-main">
          {children}
        </main>

        {hasAside && (
          <aside
            aria-label={asideLabel}
            className={classNames('rush-blog-layout__aside', asideClassName)}
            data-slot="blog-aside"
          >
            <div className="rush-blog-layout__side-content">{aside}</div>
          </aside>
        )}
      </div>

      {footer !== undefined && footer !== null && (
        <footer
          className={classNames('rush-blog-layout__footer', footerClassName)}
          data-slot="blog-footer"
        >
          {footer}
        </footer>
      )}
    </div>
  );
}
