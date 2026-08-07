import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';

import {
  createContext,
  useContext,
  useId,
} from 'react';

import {
  Drawer,
  DrawerContent
} from '../../components/drawer';

import {
  useControllableState,
} from '../../hooks/use-controllable-state';

import {
  LayoutPanelToggle,
} from '../shared/layout-panel-toggle';

import { classNames } from '../../utils/class-names';

import './dashboard-layout.scss';

interface DashboardLayoutContextValue {
  collapsed: boolean;
  mobileOpen: boolean;

  sidebarId: string;
  mobileSidebarId: string;

  toggleSidebar: () => void;

  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  toggleMobileSidebar: () => void;
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
   * Optional alternative sidebar content for the mobile
   * drawer. Falls back to `sidebar`.
   */
  mobileSidebar?: ReactNode;

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
   * Controlled mobile drawer state.
   */
  mobileSidebarOpen?: boolean;

  /**
   * Initial mobile drawer state.
   */
  defaultMobileSidebarOpen?: boolean;

  /**
   * Called when mobile drawer visibility changes.
   */
  onMobileSidebarOpenChange?: (
    open: boolean,
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
  mobileSidebar,
  header,

  sidebarLabel = 'Primary navigation',
  sidebarId: providedSidebarId,

  sidebarCollapsed,
  defaultSidebarCollapsed = false,
  onSidebarCollapsedChange,

  mobileSidebarOpen,
  defaultMobileSidebarOpen = false,
  onMobileSidebarOpenChange,

  sidebarClassName,
  headerClassName,
  mainClassName,
  className,

  ...rootProps
}: DashboardLayoutProps) {
  const generatedSidebarId = useId();
  const generatedMobileSidebarId = useId();

  const sidebarId =
    providedSidebarId
    ?? `rush-dashboard-sidebar-${generatedSidebarId}`;

  const mobileSidebarId =
    `rush-dashboard-mobile-sidebar-${generatedMobileSidebarId}`;

  const [
    collapsed,
    setCollapsed,
  ] = useControllableState({
    value: sidebarCollapsed,
    defaultValue:
      defaultSidebarCollapsed,
    onChange:
      onSidebarCollapsedChange,
  });

  const [
    mobileOpen,
    setMobileOpen,
  ] = useControllableState({
    value: mobileSidebarOpen,
    defaultValue:
      defaultMobileSidebarOpen,
    onChange:
      onMobileSidebarOpenChange,
  });

  const toggleSidebar = (): void => {
    setCollapsed(
      (current) => !current,
    );
  };

  const openMobileSidebar = (): void => {
    setMobileOpen(true);
  };

  const closeMobileSidebar = (): void => {
    setMobileOpen(false);
  };

  const toggleMobileSidebar = (): void => {
    setMobileOpen(
      (current) => !current,
    );
  };

  const mobileSidebarContent =
    mobileSidebar ?? sidebar;

  return (
    <DashboardLayoutContext.Provider
      value={{
        collapsed,
        mobileOpen,

        sidebarId,
        mobileSidebarId,

        toggleSidebar,

        openMobileSidebar,
        closeMobileSidebar,
        toggleMobileSidebar,
      }}
    >
      <Drawer
        open={mobileOpen}
        onOpenChange={setMobileOpen}
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
          data-mobile-sidebar-open={
            mobileOpen || undefined
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

        <DrawerContent
          id={mobileSidebarId}
          side="left"
          className="rush-dashboard-layout__mobile-drawer"
          aria-label={sidebarLabel}
        >
          <div
            className="rush-dashboard-layout__mobile-sidebar"
            data-slot="dashboard-mobile-sidebar"
          >
            {mobileSidebarContent}
          </div>
        </DrawerContent>
      </Drawer>
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
  ...buttonProps
}: DashboardSidebarToggleProps) {
  const {
    collapsed,
    sidebarId,
    toggleSidebar,
  } = useDashboardLayoutContext();

  return (
    <LayoutPanelToggle
      {...buttonProps}
      controls={sidebarId}
      expanded={!collapsed}
      collapseLabel={collapseLabel}
      expandLabel={expandLabel}
      onToggle={toggleSidebar}
      className={classNames(
        'rush-dashboard-layout__toggle',
        className,
      )}
      fallbackContent={(
        <span aria-hidden="true">
          ☰
        </span>
      )}
    >
      {children}
    </LayoutPanelToggle>
  );
}

export interface DashboardMobileSidebarToggleProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'type'
  > {
  children?: ReactNode;

  openLabel?: string;
  closeLabel?: string;
}

export function DashboardMobileSidebarToggle({
  children,
  openLabel = 'Open navigation',
  closeLabel = 'Close navigation',
  className,
  ...buttonProps
}: DashboardMobileSidebarToggleProps) {
  const {
    mobileOpen,
    mobileSidebarId,
    toggleMobileSidebar,
  } = useDashboardLayoutContext();

  return (
    <LayoutPanelToggle
      {...buttonProps}
      controls={mobileSidebarId}
      expanded={mobileOpen}
      collapseLabel={closeLabel}
      expandLabel={openLabel}
      onToggle={toggleMobileSidebar}
      className={classNames(
        'rush-dashboard-layout__mobile-toggle',
        className,
      )}
      fallbackContent={(
        <span aria-hidden="true">
          ☰
        </span>
      )}
    >
      {children}
    </LayoutPanelToggle>
  );
}