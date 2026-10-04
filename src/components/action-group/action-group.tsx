import type { ComponentPropsWithRef } from 'react';

import { classNames } from '../../utils/class-names';

import './action-group.scss';

export type ActionGroupOrientation = 'horizontal' | 'vertical';
export type ActionGroupAlign = 'start' | 'center' | 'end' | 'stretch';
export type ActionGroupJustify = 'start' | 'center' | 'end' | 'between';

export interface ActionGroupProps extends ComponentPropsWithRef<'div'> {
  /**
   * Direction in which actions are arranged.
   */
  orientation?: ActionGroupOrientation;

  /**
   * Cross-axis alignment. Vertical groups stretch by default;
   * horizontal groups are centered.
   */
  align?: ActionGroupAlign;

  /**
   * Main-axis alignment of the actions.
   */
  justify?: ActionGroupJustify;

  /**
   * Allows horizontal actions to wrap when space is limited.
   */
  wrap?: boolean;
}

export function ActionGroup({
  align,
  className,
  justify = 'start',
  orientation = 'horizontal',
  wrap = true,
  ...props
}: ActionGroupProps) {
  const resolvedAlign = align ?? (orientation === 'vertical' ? 'stretch' : 'center');
  const resolvedWrap = orientation === 'horizontal' && wrap;

  return (
    <div
      {...props}
      className={classNames(
        'rush-action-group',
        `rush-action-group--${orientation}`,
        `rush-action-group--align-${resolvedAlign}`,
        `rush-action-group--justify-${justify}`,
        className,
      )}
      data-align={resolvedAlign}
      data-justify={justify}
      data-orientation={orientation}
      data-slot="action-group"
      data-wrap={resolvedWrap}
    />
  );
}
