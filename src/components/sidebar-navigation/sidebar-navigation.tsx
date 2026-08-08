import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';

import {
  createContext,
  useContext,
} from 'react';

import {
  classNames,
} from '../../utils/class-names';

import './sidebar-navigation.scss';

interface SidebarNavigationContextValue {
  collapsed: boolean;
}

const SidebarNavigationContext =
  createContext<SidebarNavigationContextValue>({
    collapsed: false,
  });

function useSidebarNavigationContext():
  SidebarNavigationContextValue {
  return useContext(
    SidebarNavigationContext,
  );
}

export interface SidebarNavigationProps
  extends ComponentPropsWithoutRef<'nav'> {
  /**
   * Whether the navigation is displayed in compact,
   * icon-oriented mode.
   */
  collapsed?: boolean;
}

export function SidebarNavigation({
  collapsed = false,
  className,
  children,
  ...props
}: SidebarNavigationProps) {
  return (
    <SidebarNavigationContext.Provider
      value={{
        collapsed,
      }}
    >
      <nav
        {...props}
        className={classNames(
          'rush-sidebar-navigation',
          className,
        )}
        data-collapsed={
          collapsed || undefined
        }
        data-slot="sidebar-navigation"
      >
        {children}
      </nav>
    </SidebarNavigationContext.Provider>
  );
}

export interface SidebarNavigationGroupProps
  extends ComponentPropsWithoutRef<'div'> {
  /**
   * Optional group heading.
   */
  label?: ReactNode;
}

export function SidebarNavigationGroup({
  label,
  className,
  children,
  ...props
}: SidebarNavigationGroupProps) {
  const {
    collapsed,
  } = useSidebarNavigationContext();

  return (
    <div
      {...props}
      className={classNames(
        'rush-sidebar-navigation__group',
        className,
      )}
      data-slot="sidebar-navigation-group"
    >
      {label !== undefined
        && label !== null && (
          <div
            className={classNames(
              'rush-sidebar-navigation__group-label',
              collapsed
                && 'rush-sidebar-navigation__group-label--collapsed',
            )}
            data-slot="sidebar-navigation-group-label"
          >
            {label}
          </div>
        )}

      <div className="rush-sidebar-navigation__items">
        {children}
      </div>
    </div>
  );
}

interface SidebarNavigationItemSharedProps {
  /**
   * Visible item text.
   *
   * It remains available to assistive technologies in
   * collapsed mode.
   */
  children: ReactNode;

  /**
   * Optional leading icon.
   */
  icon?: ReactNode;

  /**
   * Marks this item as the current/active destination.
   */
  active?: boolean;

  /**
   * Disables interaction.
   */
  disabled?: boolean;

  className?: string;
}

export interface SidebarNavigationLinkItemProps
  extends SidebarNavigationItemSharedProps,
    Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      | 'children'
      | 'className'
      | 'href'
    > {
  href: string;

  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>['onClick'];
}

export interface SidebarNavigationButtonItemProps
  extends SidebarNavigationItemSharedProps,
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      | 'children'
      | 'className'
      | 'type'
      | 'disabled'
    > {
  href?: never;

  type?: 'button';
}

export type SidebarNavigationItemProps =
  | SidebarNavigationLinkItemProps
  | SidebarNavigationButtonItemProps;

function isLinkItem(
  props: SidebarNavigationItemProps,
): props is SidebarNavigationLinkItemProps {
  return typeof props.href === 'string';
}

interface SidebarNavigationItemContentProps {
  icon?: ReactNode;
  children: ReactNode;
  collapsed: boolean;
}

function SidebarNavigationItemContent({
  icon,
  children,
  collapsed,
}: SidebarNavigationItemContentProps) {
  return (
    <>
      {icon !== undefined
        && icon !== null && (
          <span
            aria-hidden="true"
            className="rush-sidebar-navigation__item-icon"
            data-slot="sidebar-navigation-item-icon"
          >
            {icon}
          </span>
        )}

      <span
        className={classNames(
          'rush-sidebar-navigation__item-label',
          collapsed
            && 'rush-sidebar-navigation__item-label--collapsed',
        )}
        data-slot="sidebar-navigation-item-label"
      >
        {children}
      </span>
    </>
  );
}

export function SidebarNavigationItem(
  props: SidebarNavigationItemProps,
) {
  const {
    collapsed,
  } = useSidebarNavigationContext();

  const {
    active = false,
    disabled = false,
    icon,
    children,
    className,
  } = props;

  const itemClassName = classNames(
    'rush-sidebar-navigation__item',
    active
      && 'rush-sidebar-navigation__item--active',
    disabled
      && 'rush-sidebar-navigation__item--disabled',
    collapsed
      && 'rush-sidebar-navigation__item--collapsed',
    className,
  );

  if (isLinkItem(props)) {
    const {
      href,
      target,
      rel,
      onClick,
      ...anchorProps
    } = props;

    return (
      <a
        {...anchorProps}
        href={
          disabled
            ? undefined
            : href
        }
        target={target}
        rel={
          target === '_blank' && rel === undefined
            ? 'noopener noreferrer'
            : rel
        }
        aria-current={
          active
            ? 'page'
            : undefined
        }
        aria-disabled={
          disabled || undefined
        }
        tabIndex={
          disabled
            ? -1
            : anchorProps.tabIndex
        }
        className={itemClassName}
        data-active={
          active || undefined
        }
        data-disabled={
          disabled || undefined
        }
        data-slot="sidebar-navigation-item"
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();

            return;
          }

          onClick?.(event);
        }}
      >
        <SidebarNavigationItemContent
          icon={icon}
          collapsed={collapsed}
        >
          {children}
        </SidebarNavigationItemContent>
      </a>
    );
  }

  const {
    onClick,
    type = 'button',
    ...buttonProps
  } = props;

  return (
    <button
      {...buttonProps}
      type={type}
      disabled={disabled}
      className={itemClassName}
      data-active={
        active || undefined
      }
      data-disabled={
        disabled || undefined
      }
      data-slot="sidebar-navigation-item"
      onClick={onClick}
    >
      <SidebarNavigationItemContent
        icon={icon}
        collapsed={collapsed}
      >
        {children}
      </SidebarNavigationItemContent>
    </button>
  );
}

export type SidebarNavigationSeparatorProps =
  ComponentPropsWithoutRef<'hr'>;

export function SidebarNavigationSeparator({
  className,
  ...props
}: SidebarNavigationSeparatorProps) {
  return (
    <hr
      {...props}
      className={classNames(
        'rush-sidebar-navigation__separator',
        className,
      )}
      data-slot="sidebar-navigation-separator"
    />
  );
}