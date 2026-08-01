import type {
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

export interface CopyButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onCopy' | 'value'
  > {
    value?: string | null;

    copiedContent?: ReactNode;

    defaultContent?: ReactNode;

    copiedDuration?: number;

    onCopy?: (value: string) => void;
}