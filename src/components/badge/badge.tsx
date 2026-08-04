import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from 'react';

import { classNames } from '../../utils/class-names';

import './badge.scss';

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'info'
  | 'notice'
  | 'outline';

interface BadgeSharedProps {
  /**
   * Visual and semantic appearance.
   */
  variant?: BadgeVariant;

  children?: ReactNode;
  className?: string;
}

export interface BadgeSpanProps
  extends BadgeSharedProps,
    Omit<
      HTMLAttributes<HTMLSpanElement>,
      'children' | 'className'
    > {
  href?: never;
}

export interface BadgeLinkProps
  extends BadgeSharedProps,
    Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      'children' | 'className' | 'href'
    > {
  href: string;
}

export type BadgeProps =
  | BadgeSpanProps
  | BadgeLinkProps;

function isLinkBadge(
  props: BadgeProps,
): props is BadgeLinkProps {
  return typeof props.href === 'string';
}

function getBadgeClassName(
  variant: BadgeVariant,
  className?: string,
): string {
  return classNames(
    'rush-badge',
    `rush-badge--variant-${variant}`,
    className,
  );
}

export function Badge(
  props: BadgeProps,
) {
  const {
    variant = 'default',
    className,
  } = props;

  const badgeClassName = getBadgeClassName(
    variant,
    className,
  );

  if (isLinkBadge(props)) {
    const {
      href,
      children,
      ...anchorProps
    } = props;

    return (
      <a
        {...anchorProps}
        href={href}
        className={badgeClassName}
        data-slot="badge"
        data-variant={variant}
      >
        {children}
      </a>
    );
  }

  const {
    children,
    ...spanProps
  } = props;

  return (
    <span
      {...spanProps}
      className={badgeClassName}
      data-slot="badge"
      data-variant={variant}
    >
      {children}
    </span>
  );
}