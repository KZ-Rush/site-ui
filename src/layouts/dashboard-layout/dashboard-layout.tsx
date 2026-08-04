import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';
import {
  createContext,
  useContext,
  useId,
  useState,
} from 'react';

import { classNames } from '../../utils/class-names';

import './dashboard-layout.scss';

interface DashboardLayoutContextValue {
  collapsed: boolean;
  sidebarId: string;
  toggleSidebar: () => void;
}

const DashboardLayoutContext =
  createContext<DashboardLayoutContextValue | null>(
    null,
  );

function useDashboardLayoutContext():
  DashboardLayoutContextValue {
  const context = useContext(
    DashboardLayoutContext,
  );

  if (!context) {
    throw new Error(
      'DashboardSidebarToggle must be used inside DashboardLayout.',
    );
  }

  return context;
}

export interface DashboardLayoutProps
  extends Omit<
    ComponentPropsWithoutRef<'div'>,
    'children'
  > {
  /**
   * Main page content.
   */
  children: ReactNode;

  /**
   * Content rendered inside the left sidebar.
   */
  sidebar: ReactNode;

  /**
   * Optional content rendered above the main area.
   */
  header?: ReactNode;

  /**
   * Accessible label for the sidebar region.
   */
  sidebarLabel?: string;

  /**
   * Explicit ID used by sidebar toggle controls.
   */
  sidebarId?: string;

  /**
   * Controlled collapsed state.
   */
  sidebarCollapsed?: boolean;

  /**
   * Initial collapsed state for uncontrolled usage.
   */
  defaultSidebarCollapsed?: boolean;

  /**
   * Called whenever the requested collapsed state changes.
   */
  onSidebarCollapsedChange?: (
    collapsed: boolean,
  ) => void;

  /**
   * Additional class applied to the sidebar element.
   */
  sidebarClassName?: string;

  /**
   * Additional class applied to the header element.
   */
  headerClassName?: string;

  /**
   * Additional class applied to the main element.
   */
  mainClassName?: string;
}

/**
 * Application shell with a collapsible left sidebar,
 * optional header, and scrollable main content region.
 *
 * Supports both controlled and uncontrolled sidebar state.
 */
export function DashboardLayout({
  children,
  sidebar,
  header,
  sidebarLabel = 'Primary navigation',
  sidebarId: providedSidebarId,
  sidebarCollapsed,
  defaultSidebarCollapsed = false,
  onSidebarCollapsedChange,
  sidebarClassName,
  headerClassName,
  mainClassName,
  className,
  ...rootProps
}: DashboardLayoutProps) {
  const generatedSidebarId = useId();

  const sidebarId =
    providedSidebarId
    ?? `rush-dashboard-sidebar-${generatedSidebarId}`;

  const [
    internalSidebarCollapsed,
    setInternalSidebarCollapsed,
  ] = useState(defaultSidebarCollapsed);

  const isControlled =
    sidebarCollapsed !== undefined;

  const collapsed = isControlled
    ? sidebarCollapsed
    : internalSidebarCollapsed;

  const setCollapsed = (
    nextCollapsed: boolean,
  ): void => {
    if (!isControlled) {
      setInternalSidebarCollapsed(
        nextCollapsed,
      );
    }

    onSidebarCollapsedChange?.(
      nextCollapsed,
    );
  };

  const toggleSidebar = (): void => {
    setCollapsed(!collapsed);
  };

  return (
    <DashboardLayoutContext.Provider
      value={{
        collapsed,
        sidebarId,
        toggleSidebar,
      }}
    >
      <div
        {...rootProps}
        className={classNames(
          'rush-dashboard-layout',
          className,
        )}
        data-collapsed={
          collapsed || undefined
        }
        data-slot="dashboard-layout"
      >
        <aside
          id={sidebarId}
          aria-label={sidebarLabel}
          className={classNames(
            'rush-dashboard-layout__sidebar',
            sidebarClassName,
          )}
          data-slot="dashboard-sidebar"
        >
          <div className="rush-dashboard-layout__sidebar-content">
            {sidebar}
          </div>
        </aside>

        {header !== undefined
          && header !== null && (
            <header
              className={classNames(
                'rush-dashboard-layout__header',
                headerClassName,
              )}
              data-slot="dashboard-header"
            >
              {header}
            </header>
          )}

        <main
          className={classNames(
            'rush-dashboard-layout__main',
            mainClassName,
          )}
          data-slot="dashboard-main"
        >
          {children}
        </main>
      </div>
    </DashboardLayoutContext.Provider>
  );
}

export interface DashboardSidebarToggleProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'type'
  > {
  /**
   * Custom visual content for the toggle.
   *
   * Accessible text is supplied separately through
   * aria-label.
   */
  children?: ReactNode;

  /**
   * Accessible label used while the sidebar is open.
   */
  collapseLabel?: string;

  /**
   * Accessible label used while the sidebar is collapsed.
   */
  expandLabel?: string;
}

export function DashboardSidebarToggle({
  children,
  collapseLabel = 'Collapse sidebar',
  expandLabel = 'Expand sidebar',
  className,
  onClick,
  ...buttonProps
}: DashboardSidebarToggleProps) {
  const {
    collapsed,
    sidebarId,
    toggleSidebar,
  } = useDashboardLayoutContext();

  const label = collapsed
    ? expandLabel
    : collapseLabel;

  return (
    <button
      {...buttonProps}
      type="button"
      aria-controls={sidebarId}
      aria-expanded={!collapsed}
      aria-label={label}
      className={classNames(
        'rush-dashboard-layout__toggle',
        className,
      )}
      data-slot="dashboard-sidebar-toggle"
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        toggleSidebar();
      }}
    >
      {children ?? (
        <span aria-hidden="true">
          ☰
        </span>
      )}
    </button>
  );
}