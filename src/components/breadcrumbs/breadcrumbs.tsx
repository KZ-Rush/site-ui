import type {
  AnchorHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';

import {
  Children,
  Fragment,
} from 'react';

import {
  classNames,
} from '../../utils/class-names';

import './breadcrumbs.scss';

export interface BreadcrumbsProps
  extends Omit<
    ComponentPropsWithoutRef<'nav'>,
    'children'
  > {
  children: ReactNode;

  /**
   * Visual separator placed between breadcrumb items.
   */
  separator?: ReactNode;
}

export function Breadcrumbs({
  children,
  separator = '/',
  className,
  'aria-label': ariaLabel = 'Breadcrumb',
  ...props
}: BreadcrumbsProps) {
  const items = Children.toArray(children);

  return (
    <nav
      {...props}
      aria-label={ariaLabel}
      className={classNames(
        'rush-breadcrumbs',
        className,
      )}
      data-slot="breadcrumbs"
    >
      <ol className="rush-breadcrumbs__list">
        {items.map((item, index) => (
          <Fragment key={index}>
            {item}

            {index < items.length - 1 && (
              <li
                aria-hidden="true"
                className="rush-breadcrumbs__separator"
                data-slot="breadcrumbs-separator"
              >
                {separator}
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

interface BreadcrumbItemSharedProps {
  children: ReactNode;
  className?: string;
}

export interface BreadcrumbLinkItemProps
  extends BreadcrumbItemSharedProps,
    Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      'children' | 'className' | 'href'
    > {
  href: string;
  current?: never;
}

export interface BreadcrumbCurrentItemProps
  extends BreadcrumbItemSharedProps,
    Omit<
      ComponentPropsWithoutRef<'span'>,
      'children' | 'className'
    > {
  href?: never;
  current: true;
}

export type BreadcrumbItemProps =
  | BreadcrumbLinkItemProps
  | BreadcrumbCurrentItemProps;

function isLinkItem(
  props: BreadcrumbItemProps,
): props is BreadcrumbLinkItemProps {
  return typeof props.href === 'string';
}

export function BreadcrumbItem(
  props: BreadcrumbItemProps,
) {
  if (isLinkItem(props)) {
    const {
      href,
      children,
      className,
      ...anchorProps
    } = props;

    return (
      <li
        className="rush-breadcrumbs__item"
        data-slot="breadcrumbs-item"
      >
        <a
          {...anchorProps}
          href={href}
          className={classNames(
            'rush-breadcrumbs__link',
            className,
          )}
        >
          {children}
        </a>
      </li>
    );
  }

  const {
    children,
    className,
    current: _current,
    ...spanProps
  } = props;

  return (
    <li
      className="rush-breadcrumbs__item"
      data-slot="breadcrumbs-item"
    >
      <span
        {...spanProps}
        aria-current="page"
        className={classNames(
          'rush-breadcrumbs__current',
          className,
        )}
      >
        {children}
      </span>
    </li>
  );
}