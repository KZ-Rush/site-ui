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
  useControllableState,
} from '../../hooks/use-controllable-state';

import {
  LayoutPanelToggle,
} from '../shared/layout-panel-toggle';

import { classNames } from '../../utils/class-names';

import './workspace-layout.scss';

interface WorkspaceLayoutContextValue {
  sidebarCollapsed: boolean;
  asideCollapsed: boolean;

  sidebarId: string;
  asideId: string;

  toggleSidebar: () => void;
  toggleAside: () => void;
}

const WorkspaceLayoutContext =
  createContext<WorkspaceLayoutContextValue | null>(
    null,
  );

function useWorkspaceLayoutContext():
  WorkspaceLayoutContextValue {
  const context = useContext(
    WorkspaceLayoutContext,
  );

  if (!context) {
    throw new Error(
      'Workspace layout controls must be used inside WorkspaceLayout.',
    );
  }

  return context;
}

export interface WorkspaceLayoutProps
  extends Omit<
    ComponentPropsWithoutRef<'div'>,
    'children'
  > {
  /**
   * Main workspace content.
   */
  children: ReactNode;

  /**
   * Content rendered in the left sidebar.
   */
  sidebar: ReactNode;

  /**
   * Optional content rendered in the right inspector.
   */
  aside?: ReactNode;

  /**
   * Optional header above the main content.
   */
  header?: ReactNode;

  /**
   * Accessible label for the left sidebar.
   */
  sidebarLabel?: string;

  /**
   * Accessible label for the right aside.
   */
  asideLabel?: string;

  /**
   * Explicit sidebar element ID.
   */
  sidebarId?: string;

  /**
   * Explicit aside element ID.
   */
  asideId?: string;

  /**
   * Controlled left-sidebar collapsed state.
   */
  sidebarCollapsed?: boolean;

  /**
   * Initial left-sidebar state in uncontrolled mode.
   */
  defaultSidebarCollapsed?: boolean;

  /**
   * Called when the requested sidebar state changes.
   */
  onSidebarCollapsedChange?: (
    collapsed: boolean,
  ) => void;

  /**
   * Controlled right-aside collapsed state.
   */
  asideCollapsed?: boolean;

  /**
   * Initial right-aside state in uncontrolled mode.
   */
  defaultAsideCollapsed?: boolean;

  /**
   * Called when the requested aside state changes.
   */
  onAsideCollapsedChange?: (
    collapsed: boolean,
  ) => void;

  sidebarClassName?: string;
  asideClassName?: string;
  headerClassName?: string;
  mainClassName?: string;
}

export function WorkspaceLayout({
  children,
  sidebar,
  aside,
  header,

  sidebarLabel = 'Primary navigation',
  asideLabel = 'Workspace details',

  sidebarId: providedSidebarId,
  asideId: providedAsideId,

  sidebarCollapsed,
  defaultSidebarCollapsed = false,
  onSidebarCollapsedChange,

  asideCollapsed,
  defaultAsideCollapsed = false,
  onAsideCollapsedChange,

  sidebarClassName,
  asideClassName,
  headerClassName,
  mainClassName,
  className,

  ...rootProps
}: WorkspaceLayoutProps) {
  const generatedSidebarId = useId();
  const generatedAsideId = useId();

  const sidebarId =
    providedSidebarId
    ?? `rush-workspace-sidebar-${generatedSidebarId}`;

  const asideId =
    providedAsideId
    ?? `rush-workspace-aside-${generatedAsideId}`;

  const hasAside =
    aside !== undefined
    && aside !== null;

  const [
    resolvedSidebarCollapsed,
    setSidebarCollapsed,
  ] = useControllableState({
    value: sidebarCollapsed,
    defaultValue:
      defaultSidebarCollapsed,
    onChange:
      onSidebarCollapsedChange,
  });

  const [
    resolvedAsideCollapsed,
    setAsideCollapsed,
  ] = useControllableState({
    value: asideCollapsed,
    defaultValue:
      defaultAsideCollapsed,
    onChange:
      onAsideCollapsedChange,
  });

  const effectiveAsideCollapsed =
    !hasAside
    || resolvedAsideCollapsed;

  const toggleSidebar = (): void => {
    setSidebarCollapsed(
      (current) => !current,
    );
  };

  const toggleAside = (): void => {
    if (!hasAside) {
      return;
    }

    setAsideCollapsed(
      (current) => !current,
    );
  };

  return (
    <WorkspaceLayoutContext.Provider
      value={{
        sidebarCollapsed:
          resolvedSidebarCollapsed,

        asideCollapsed:
          effectiveAsideCollapsed,

        sidebarId,
        asideId,

        toggleSidebar,
        toggleAside,
      }}
    >
      <div
        {...rootProps}
        className={classNames(
          'rush-workspace-layout',
          className,
        )}
        data-sidebar-collapsed={
          resolvedSidebarCollapsed
          || undefined
        }
        data-aside-collapsed={
          effectiveAsideCollapsed
          || undefined
        }
        data-has-aside={
          hasAside || undefined
        }
        data-slot="workspace-layout"
      >
        <aside
          id={sidebarId}
          aria-label={sidebarLabel}
          className={classNames(
            'rush-workspace-layout__sidebar',
            sidebarClassName,
          )}
          data-slot="workspace-sidebar"
        >
          <div className="rush-workspace-layout__sidebar-content">
            {sidebar}
          </div>
        </aside>

        {header !== undefined
          && header !== null && (
            <header
              className={classNames(
                'rush-workspace-layout__header',
                headerClassName,
              )}
              data-slot="workspace-header"
            >
              {header}
            </header>
          )}

        <main
          className={classNames(
            'rush-workspace-layout__main',
            mainClassName,
          )}
          data-slot="workspace-main"
        >
          {children}
        </main>

        {aside !== undefined
          && aside !== null && (
            <aside
              id={asideId}
              aria-label={asideLabel}
              className={classNames(
                'rush-workspace-layout__aside',
                asideClassName,
              )}
              data-slot="workspace-aside"
            >
              <div className="rush-workspace-layout__aside-content">
                {aside}
              </div>
            </aside>
          )}
      </div>
    </WorkspaceLayoutContext.Provider>
  );
}

interface WorkspacePanelToggleProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'type'
  > {
  children?: ReactNode;
  collapseLabel?: string;
  expandLabel?: string;
}

export type WorkspaceSidebarToggleProps =
  WorkspacePanelToggleProps;

export function WorkspaceSidebarToggle({
  children,
  collapseLabel = 'Collapse sidebar',
  expandLabel = 'Expand sidebar',
  className,
  ...buttonProps
}: WorkspaceSidebarToggleProps) {
  const {
    sidebarCollapsed,
    sidebarId,
    toggleSidebar,
  } = useWorkspaceLayoutContext();

  return (
    <LayoutPanelToggle
      {...buttonProps}
      controls={sidebarId}
      expanded={!sidebarCollapsed}
      collapseLabel={collapseLabel}
      expandLabel={expandLabel}
      onToggle={toggleSidebar}
      className={classNames(
        'rush-workspace-layout__toggle',
        'rush-workspace-layout__sidebar-toggle',
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

export type WorkspaceAsideToggleProps =
  WorkspacePanelToggleProps;

export function WorkspaceAsideToggle({
  children,
  collapseLabel = 'Collapse details panel',
  expandLabel = 'Expand details panel',
  className,
  ...buttonProps
}: WorkspaceAsideToggleProps) {
  const {
    asideCollapsed,
    asideId,
    toggleAside,
  } = useWorkspaceLayoutContext();

  return (
    <LayoutPanelToggle
      {...buttonProps}
      controls={asideId}
      expanded={!asideCollapsed}
      collapseLabel={collapseLabel}
      expandLabel={expandLabel}
      onToggle={toggleAside}
      className={classNames(
        'rush-workspace-layout__toggle',
        'rush-workspace-layout__aside-toggle',
        className,
      )}
      fallbackContent={(
        <span aria-hidden="true">
          ◧
        </span>
      )}
    >
      {children}
    </LayoutPanelToggle>
  );
}