import type { ComponentPropsWithRef } from 'react';

import { classNames } from '../../utils/class-names';

import './link.scss';

export interface LinkProps extends Omit<ComponentPropsWithRef<'a'>, 'href'> {
  /**
   * Destination of the link.
   */
  href: string;
}

export function Link({ className, ...props }: LinkProps) {
  return <a {...props} data-slot="link" className={classNames('rush-link', className)} />;
}
