import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { classNames } from '../../utils/class-names';

import './layout-panel-toggle.scss';

export interface LayoutPanelToggleProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'type'
> {
  /**
   * ID of the panel controlled by this button.
   */
  controls: string;

  /**
   * Whether the controlled panel is currently expanded.
   */
  expanded: boolean;

  /**
   * Called when the toggle requests a state change.
   */
  onToggle: () => void;

  /**
   * Accessible label shown when the panel is expanded.
   */
  collapseLabel: string;

  /**
   * Accessible label shown when the panel is collapsed.
   */
  expandLabel: string;

  /**
   * Optional visual content.
   */
  children?: ReactNode;

  /**
   * Fallback visual content when children are omitted.
   */
  fallbackContent?: ReactNode;
}

export function LayoutPanelToggle({
  controls,
  expanded,
  onToggle,
  collapseLabel,
  expandLabel,
  children,
  fallbackContent,
  className,
  onClick,
  ...buttonProps
}: LayoutPanelToggleProps) {
  return (
    <button
      {...buttonProps}
      type="button"
      aria-controls={controls}
      aria-expanded={expanded}
      aria-label={expanded ? collapseLabel : expandLabel}
      className={classNames('rush-layout-panel-toggle', className)}
      data-slot="layout-panel-toggle"
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        onToggle();
      }}
    >
      {children ?? fallbackContent}
    </button>
  );
}
