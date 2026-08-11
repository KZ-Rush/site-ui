import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, ReactNode } from 'react';

import { createContext, useContext, useId } from 'react';

import { Drawer, DrawerContent } from '../../components/drawer';

import { useControllableState } from '../../hooks/use-controllable-state';

import { LayoutPanelToggle } from '../shared/layout-panel-toggle';

import { classNames } from '../../utils/class-names';

import './workspace-layout.scss';

interface WorkspaceLayoutContextValue {
  sidebarCollapsed: boolean;
  asideCollapsed: boolean;

  mobileSidebarOpen: boolean;
  mobileAsideOpen: boolean;

  sidebarId: string;
  asideId: string;

  mobileSidebarId: string;
  mobileAsideId: string;

  toggleSidebar: () => void;
  toggleAside: () => void;

  toggleMobileSidebar: () => void;
  toggleMobileAside: () => void;
}

const WorkspaceLayoutContext = createContext<WorkspaceLayoutContextValue | null>(null);

function useWorkspaceLayoutContext(): WorkspaceLayoutContextValue {
  const context = useContext(WorkspaceLayoutContext);

  if (!context) {
    throw new Error('Workspace layout controls must be used inside WorkspaceLayout.');
  }

  return context;
}

export interface WorkspacePanelRenderState {
  collapsed: boolean;
  mobile: boolean;
}

export type WorkspacePanelContent = ReactNode | ((state: WorkspacePanelRenderState) => ReactNode);

export interface WorkspaceLayoutProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  /**
   * Main workspace content.
   */
  children: ReactNode;

  /**
   * Content rendered in the left sidebar.
   */
  sidebar: WorkspacePanelContent;

  /**
   * Optional content rendered in the right inspector.
   */
  aside?: WorkspacePanelContent;

  /**
   * Optional header above the main content.
   */
  header?: ReactNode;

  /**
   * Optional mobile-specific content.
   * Falls back to sidebar / aside when omitted.
   */
  mobileSidebar?: WorkspacePanelContent;
  mobileAside?: WorkspacePanelContent;

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
  onSidebarCollapsedChange?: (collapsed: boolean) => void;

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
  onAsideCollapsedChange?: (collapsed: boolean) => void;

  /**
   * Controlled mobile left drawer state.
   */
  mobileSidebarOpen?: boolean;

  defaultMobileSidebarOpen?: boolean;

  onMobileSidebarOpenChange?: (open: boolean) => void;

  /**
   * Controlled mobile right drawer state.
   */
  mobileAsideOpen?: boolean;

  defaultMobileAsideOpen?: boolean;

  onMobileAsideOpenChange?: (open: boolean) => void;

  sidebarClassName?: string;
  asideClassName?: string;
  headerClassName?: string;
  mainClassName?: string;
}

function renderPanelContent(
  content: WorkspacePanelContent | undefined,
  state: WorkspacePanelRenderState,
): ReactNode {
  if (content === undefined || content === null) {
    return null;
  }

  return typeof content === 'function' ? content(state) : content;
}

export function WorkspaceLayout({
  children,
  sidebar,
  aside,
  mobileSidebar,
  mobileAside,
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

  mobileSidebarOpen,
  defaultMobileSidebarOpen = false,
  onMobileSidebarOpenChange,

  mobileAsideOpen,
  defaultMobileAsideOpen = false,
  onMobileAsideOpenChange,

  sidebarClassName,
  asideClassName,
  headerClassName,
  mainClassName,
  className,

  ...rootProps
}: WorkspaceLayoutProps) {
  const generatedSidebarId = useId();
  const generatedAsideId = useId();

  const generatedMobileSidebarId = useId();
  const generatedMobileAsideId = useId();

  const sidebarId = providedSidebarId ?? `rush-workspace-sidebar-${generatedSidebarId}`;

  const asideId = providedAsideId ?? `rush-workspace-aside-${generatedAsideId}`;

  const mobileSidebarId = `rush-workspace-mobile-sidebar-${generatedMobileSidebarId}`;

  const mobileAsideId = `rush-workspace-mobile-aside-${generatedMobileAsideId}`;

  const hasAside = aside !== undefined && aside !== null;

  const [resolvedSidebarCollapsed, setSidebarCollapsed] = useControllableState({
    value: sidebarCollapsed,
    defaultValue: defaultSidebarCollapsed,
    onChange: onSidebarCollapsedChange,
  });

  const [resolvedAsideCollapsed, setAsideCollapsed] = useControllableState({
    value: asideCollapsed,
    defaultValue: defaultAsideCollapsed,
    onChange: onAsideCollapsedChange,
  });

  const [resolvedMobileSidebarOpen, setMobileSidebarOpen] = useControllableState({
    value: mobileSidebarOpen,
    defaultValue: defaultMobileSidebarOpen,
    onChange: onMobileSidebarOpenChange,
  });

  const [resolvedMobileAsideOpen, setMobileAsideOpen] = useControllableState({
    value: mobileAsideOpen,
    defaultValue: defaultMobileAsideOpen,
    onChange: onMobileAsideOpenChange,
  });

  const effectiveAsideCollapsed = !hasAside || resolvedAsideCollapsed;

  const effectiveMobileAsideOpen = hasAside && resolvedMobileAsideOpen;

  const toggleSidebar = (): void => {
    setSidebarCollapsed((current) => !current);
  };

  const toggleAside = (): void => {
    if (!hasAside) {
      return;
    }

    setAsideCollapsed((current) => !current);
  };

  const toggleMobileSidebar = (): void => {
    if (!resolvedMobileSidebarOpen) {
      setMobileAsideOpen(false);
    }

    setMobileSidebarOpen((current) => !current);
  };

  const toggleMobileAside = (): void => {
    if (!hasAside) {
      return;
    }

    if (!effectiveMobileAsideOpen) {
      setMobileSidebarOpen(false);
    }

    setMobileAsideOpen((current) => !current);
  };

  const desktopSidebarContent = renderPanelContent(sidebar, {
    collapsed: resolvedSidebarCollapsed,
    mobile: false,
  });

  const desktopAsideContent = renderPanelContent(aside, {
    collapsed: effectiveAsideCollapsed,
    mobile: false,
  });

  const mobileSidebarContent = renderPanelContent(mobileSidebar ?? sidebar, {
    collapsed: false,
    mobile: true,
  });

  const mobileAsideContent = renderPanelContent(mobileAside ?? aside, {
    collapsed: false,
    mobile: true,
  });

  return (
    <WorkspaceLayoutContext.Provider
      value={{
        sidebarCollapsed: resolvedSidebarCollapsed,

        asideCollapsed: effectiveAsideCollapsed,

        mobileSidebarOpen: resolvedMobileSidebarOpen,

        mobileAsideOpen: effectiveMobileAsideOpen,

        sidebarId,
        asideId,

        mobileSidebarId,
        mobileAsideId,

        toggleSidebar,
        toggleAside,

        toggleMobileSidebar,
        toggleMobileAside,
      }}
    >
      <Drawer open={resolvedMobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <Drawer open={effectiveMobileAsideOpen} onOpenChange={setMobileAsideOpen}>
          <div
            {...rootProps}
            className={classNames('rush-workspace-layout', className)}
            data-sidebar-collapsed={resolvedSidebarCollapsed || undefined}
            data-aside-collapsed={effectiveAsideCollapsed || undefined}
            data-mobile-sidebar-open={resolvedMobileSidebarOpen || undefined}
            data-mobile-aside-open={effectiveMobileAsideOpen || undefined}
            data-has-aside={hasAside || undefined}
            data-slot="workspace-layout"
          >
            <aside
              id={sidebarId}
              aria-label={sidebarLabel}
              className={classNames('rush-workspace-layout__sidebar', sidebarClassName)}
              data-slot="workspace-sidebar"
            >
              <div className="rush-workspace-layout__sidebar-content">{desktopSidebarContent}</div>
            </aside>

            {header !== undefined && header !== null && (
              <header
                className={classNames('rush-workspace-layout__header', headerClassName)}
                data-slot="workspace-header"
              >
                {header}
              </header>
            )}

            <main
              className={classNames('rush-workspace-layout__main', mainClassName)}
              data-slot="workspace-main"
            >
              {children}
            </main>

            {hasAside && (
              <aside
                id={asideId}
                aria-label={asideLabel}
                className={classNames('rush-workspace-layout__aside', asideClassName)}
                data-slot="workspace-aside"
              >
                <div className="rush-workspace-layout__aside-content">{desktopAsideContent}</div>
              </aside>
            )}
          </div>

          {hasAside && (
            <DrawerContent
              id={mobileAsideId}
              side="right"
              aria-label={asideLabel}
              className="rush-workspace-layout__mobile-aside-drawer"
            >
              <div
                className="rush-workspace-layout__mobile-aside"
                data-slot="workspace-mobile-aside"
              >
                {mobileAsideContent}
              </div>
            </DrawerContent>
          )}
        </Drawer>

        <DrawerContent
          id={mobileSidebarId}
          side="left"
          aria-label={sidebarLabel}
          className="rush-workspace-layout__mobile-sidebar-drawer"
        >
          <div
            className="rush-workspace-layout__mobile-sidebar"
            data-slot="workspace-mobile-sidebar"
          >
            {mobileSidebarContent}
          </div>
        </DrawerContent>
      </Drawer>
    </WorkspaceLayoutContext.Provider>
  );
}

interface WorkspacePanelToggleProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'type'
> {
  children?: ReactNode;
  collapseLabel?: string;
  expandLabel?: string;
}

export type WorkspaceSidebarToggleProps = WorkspacePanelToggleProps;

export function WorkspaceSidebarToggle({
  children,
  collapseLabel = 'Collapse sidebar',
  expandLabel = 'Expand sidebar',
  className,
  ...buttonProps
}: WorkspaceSidebarToggleProps) {
  const { sidebarCollapsed, sidebarId, toggleSidebar } = useWorkspaceLayoutContext();

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
      fallbackContent={<span aria-hidden="true">☰</span>}
    >
      {children}
    </LayoutPanelToggle>
  );
}

export type WorkspaceAsideToggleProps = WorkspacePanelToggleProps;

export function WorkspaceAsideToggle({
  children,
  collapseLabel = 'Collapse details panel',
  expandLabel = 'Expand details panel',
  className,
  ...buttonProps
}: WorkspaceAsideToggleProps) {
  const { asideCollapsed, asideId, toggleAside } = useWorkspaceLayoutContext();

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
      fallbackContent={<span aria-hidden="true">◧</span>}
    >
      {children}
    </LayoutPanelToggle>
  );
}

export interface WorkspaceMobileSidebarToggleProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'type'
> {
  children?: ReactNode;

  openLabel?: string;
  closeLabel?: string;
}

export function WorkspaceMobileSidebarToggle({
  children,
  openLabel = 'Open navigation',
  closeLabel = 'Close navigation',
  className,
  ...buttonProps
}: WorkspaceMobileSidebarToggleProps) {
  const { mobileSidebarOpen, mobileSidebarId, toggleMobileSidebar } = useWorkspaceLayoutContext();

  return (
    <LayoutPanelToggle
      {...buttonProps}
      controls={mobileSidebarId}
      expanded={mobileSidebarOpen}
      collapseLabel={closeLabel}
      expandLabel={openLabel}
      onToggle={toggleMobileSidebar}
      className={classNames('rush-workspace-layout__mobile-sidebar-toggle', className)}
      fallbackContent={<span aria-hidden="true">☰</span>}
    >
      {children}
    </LayoutPanelToggle>
  );
}

export interface WorkspaceMobileAsideToggleProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'type'
> {
  children?: ReactNode;

  openLabel?: string;
  closeLabel?: string;
}

export function WorkspaceMobileAsideToggle({
  children,
  openLabel = 'Open details panel',
  closeLabel = 'Close details panel',
  className,
  ...buttonProps
}: WorkspaceMobileAsideToggleProps) {
  const { mobileAsideOpen, mobileAsideId, toggleMobileAside } = useWorkspaceLayoutContext();

  return (
    <LayoutPanelToggle
      {...buttonProps}
      controls={mobileAsideId}
      expanded={mobileAsideOpen}
      collapseLabel={closeLabel}
      expandLabel={openLabel}
      onToggle={toggleMobileAside}
      className={classNames('rush-workspace-layout__mobile-aside-toggle', className)}
      fallbackContent={<span aria-hidden="true">◧</span>}
    >
      {children}
    </LayoutPanelToggle>
  );
}
