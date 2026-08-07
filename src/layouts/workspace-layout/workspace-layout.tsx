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

  const [
    internalSidebarCollapsed,
    setInternalSidebarCollapsed,
  ] = useState(defaultSidebarCollapsed);

  const [
    internalAsideCollapsed,
    setInternalAsideCollapsed,
  ] = useState(defaultAsideCollapsed);

  const sidebarIsControlled =
    sidebarCollapsed !== undefined;

  const asideIsControlled =
    asideCollapsed !== undefined;

  const resolvedSidebarCollapsed =
    sidebarIsControlled
      ? sidebarCollapsed
      : internalSidebarCollapsed;

  const hasAside =
    aside !== undefined && aside !== null;

  const resolvedAsideCollapsed =
    hasAside
      && (
        asideIsControlled
          ? asideCollapsed
          : internalAsideCollapsed
      );

  const setSidebarCollapsed = (
    nextCollapsed: boolean,
  ): void => {
    if (!sidebarIsControlled) {
      setInternalSidebarCollapsed(
        nextCollapsed,
      );
    }

    onSidebarCollapsedChange?.(
      nextCollapsed,
    );
  };

  const setAsideCollapsed = (
    nextCollapsed: boolean,
  ): void => {
    if (!asideIsControlled) {
      setInternalAsideCollapsed(
        nextCollapsed,
      );
    }

    onAsideCollapsedChange?.(
      nextCollapsed,
    );
  };

  const toggleSidebar = (): void => {
    setSidebarCollapsed(
      !resolvedSidebarCollapsed,
    );
  };

  const toggleAside = (): void => {
    if (aside === undefined || aside === null) {
      return;
    }

    setAsideCollapsed(
      !resolvedAsideCollapsed,
    );
  };

  return (
    <WorkspaceLayoutContext.Provider
      value={{
        sidebarCollapsed:
          resolvedSidebarCollapsed,

        asideCollapsed:
          resolvedAsideCollapsed,

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
          resolvedAsideCollapsed
          || undefined
        }
        data-has-aside={
          aside !== undefined
          && aside !== null
          || undefined
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
  onClick,
  ...buttonProps
}: WorkspaceSidebarToggleProps) {
  const {
    sidebarCollapsed,
    sidebarId,
    toggleSidebar,
  } = useWorkspaceLayoutContext();

  return (
    <button
      {...buttonProps}
      type="button"
      aria-controls={sidebarId}
      aria-expanded={!sidebarCollapsed}
      aria-label={
        sidebarCollapsed
          ? expandLabel
          : collapseLabel
      }
      className={classNames(
        'rush-workspace-layout__toggle',
        'rush-workspace-layout__sidebar-toggle',
        className,
      )}
      data-slot="workspace-sidebar-toggle"
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

export type WorkspaceAsideToggleProps =
  WorkspacePanelToggleProps;

export function WorkspaceAsideToggle({
  children,
  collapseLabel = 'Collapse details panel',
  expandLabel = 'Expand details panel',
  className,
  onClick,
  ...buttonProps
}: WorkspaceAsideToggleProps) {
  const {
    asideCollapsed,
    asideId,
    toggleAside,
  } = useWorkspaceLayoutContext();

  return (
    <button
      {...buttonProps}
      type="button"
      aria-controls={asideId}
      aria-expanded={!asideCollapsed}
      aria-label={
        asideCollapsed
          ? expandLabel
          : collapseLabel
      }
      className={classNames(
        'rush-workspace-layout__toggle',
        'rush-workspace-layout__aside-toggle',
        className,
      )}
      data-slot="workspace-aside-toggle"
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        toggleAside();
      }}
    >
      {children ?? (
        <span aria-hidden="true">
          ◧
        </span>
      )}
    </button>
  );
}