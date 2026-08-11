import type { AriaAttributes, MouseEventHandler, Ref } from 'react';

export interface TriggerRenderProps<TElement extends HTMLElement = HTMLElement> extends Pick<
  AriaAttributes,
  'aria-controls' | 'aria-expanded' | 'aria-haspopup'
> {
  ref: Ref<TElement>;

  onClick?: MouseEventHandler<TElement>;
}
