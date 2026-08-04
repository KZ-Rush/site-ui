import type {
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';
import {
  ToastContainer,
  toast,
  type Id,
  type ToastOptions,
} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './toast.scss';

export type ToastType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export interface RushToastContainerProps
  extends ComponentPropsWithoutRef<typeof ToastContainer> {}

export interface ShowToastOptions
  extends Omit<ToastOptions, 'type'> {
  type?: ToastType;
  containerId?: Id;
}

export function showToast(
  content: ReactNode,
  {
    type = 'info',
    containerId,
    ...options
  }: ShowToastOptions = {},
): Id {
  return toast(content, {
    ...options,
    type,
    containerId,
  });
}

export function RushToastContainer({
  position = 'top-right',
  autoClose = 5_000,
  closeOnClick = true,
  pauseOnHover = true,
  newestOnTop = true,
  className,
  ...props
}: RushToastContainerProps) {
  return (
    <ToastContainer
      {...props}
      autoClose={autoClose}
      closeOnClick={closeOnClick}
      newestOnTop={newestOnTop}
      pauseOnHover={pauseOnHover}
      position={position}
      className={[
        'rush-toast-container',
        className,
      ].filter(Boolean).join(' ')}
    />
  );
}