import type { ComponentPropsWithRef } from 'react';

import { classNames } from '../../utils/class-names';

import './description.scss';

export type DescriptionProps = ComponentPropsWithRef<'p'>;

export function Description({ className, ...props }: DescriptionProps) {
  return (
    <p {...props} data-slot="description" className={classNames('rush-description', className)} />
  );
}
