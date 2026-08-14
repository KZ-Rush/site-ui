import type { ComponentPropsWithoutRef } from 'react';

import { classNames } from '../../utils/class-names';

import './standalone-layout.scss';

export interface StandaloneLayoutProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Centers the content region vertically as well as horizontally.
   *
   * Intended primarily for layouts without header/footer regions,
   * such as error pages, login screens, or maintenance states.
   */
  centered?: boolean;
}

export function StandaloneLayout({
  centered = false,
  className,
  children,
  ...props
}: StandaloneLayoutProps) {
  return (
    <div
      {...props}
      className={classNames(
        'rush-standalone-layout',
        centered && 'rush-standalone-layout--centered',
        className,
      )}
      data-centered={centered || undefined}
      data-slot="standalone-layout"
    >
      {children}
    </div>
  );
}

export type StandaloneLayoutHeaderProps = ComponentPropsWithoutRef<'header'>;

export function StandaloneLayoutHeader({
  className,
  children,
  ...props
}: StandaloneLayoutHeaderProps) {
  return (
    <header
      {...props}
      className={classNames('rush-standalone-layout__header', className)}
      data-slot="standalone-layout-header"
    >
      {children}
    </header>
  );
}

export type StandaloneLayoutContentProps = ComponentPropsWithoutRef<'main'>;

export function StandaloneLayoutContent({
  className,
  children,
  ...props
}: StandaloneLayoutContentProps) {
  return (
    <main
      {...props}
      className={classNames('rush-standalone-layout__content', className)}
      data-slot="standalone-layout-content"
    >
      {children}
    </main>
  );
}

export type StandaloneLayoutFooterProps = ComponentPropsWithoutRef<'footer'>;

export function StandaloneLayoutFooter({
  className,
  children,
  ...props
}: StandaloneLayoutFooterProps) {
  return (
    <footer
      {...props}
      className={classNames('rush-standalone-layout__footer', className)}
      data-slot="standalone-layout-footer"
    >
      {children}
    </footer>
  );
}
