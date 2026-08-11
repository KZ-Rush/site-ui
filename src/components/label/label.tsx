import type { ComponentPropsWithoutRef } from 'react';

import { classNames } from '../../utils/class-names';

import './label.scss';

export interface LabelProps extends ComponentPropsWithoutRef<'label'> {
  disabled?: boolean;
}

export function Label({ className, disabled = false, ...props }: LabelProps) {
  return (
    <label
      {...props}
      data-slot="label"
      data-disabled={disabled || undefined}
      className={classNames('rush-label', className)}
    />
  );
}
