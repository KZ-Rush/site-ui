import type { ReactNode } from 'react';

import { Button, type ButtonVariant } from '../button';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  type DialogTriggerRenderProps,
} from '../dialog';

import './confirm-dialog.scss';

export interface ConfirmDialogProps {
  /**
   * Trigger renderer.
   */
  children: (props: DialogTriggerRenderProps<HTMLButtonElement>) => ReactNode;

  /**
   * Confirmation dialog title.
   */
  title: ReactNode;

  /**
   * Optional explanatory text.
   */
  description?: ReactNode;

  /**
   * Text displayed on the confirmation button.
   */
  confirmLabel?: ReactNode;

  /**
   * Text displayed on the cancel button.
   */
  cancelLabel?: ReactNode;

  /**
   * Visual variant of the confirmation button.
   */
  confirmVariant?: ButtonVariant;

  /**
   * Called when the confirmation action is accepted.
   */
  onConfirm: () => void;

  /**
   * Controlled open state.
   */
  open?: boolean;

  /**
   * Initial uncontrolled open state.
   */
  defaultOpen?: boolean;

  /**
   * Called whenever the dialog requests an open-state change.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Whether clicking the overlay closes the dialog.
   */
  closeOnOutsideClick?: boolean;
}

export function ConfirmDialog({
  children,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'default',
  onConfirm,
  open,
  defaultOpen,
  onOpenChange,
  closeOnOutsideClick = true,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <DialogTrigger<HTMLButtonElement> render={children} />

      <DialogContent closeOnOutsideClick={closeOnOutsideClick} className="rush-confirm-dialog">
        <DialogTitle>{title}</DialogTitle>

        {description != null && <DialogDescription>{description}</DialogDescription>}

        <div className="rush-confirm-dialog__actions" data-slot="confirm-dialog-actions">
          <DialogClose<HTMLButtonElement>
            render={(closeProps) => (
              <Button {...closeProps} variant="outline">
                {cancelLabel}
              </Button>
            )}
          />

          <DialogClose<HTMLButtonElement>
            render={(closeProps) => (
              <Button
                {...closeProps}
                variant={confirmVariant}
                onClick={(event) => {
                  onConfirm();

                  closeProps.onClick(event);
                }}
              >
                {confirmLabel}
              </Button>
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
