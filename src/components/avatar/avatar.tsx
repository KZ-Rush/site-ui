import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { useState } from 'react';

import { classNames } from '../../utils/class-names';

import './avatar.scss';

export type AvatarSize = 'sm' | 'default' | 'lg';

export type AvatarStatus = 'online' | 'offline' | 'busy';

export interface AvatarProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  /**
   * Avatar image source.
   */
  src?: string;

  /**
   * Accessible alternative text for the image.
   */
  alt: string;

  /**
   * Content displayed when the image is unavailable.
   */
  fallback?: ReactNode;

  /**
   * Visual size of the avatar.
   */
  size?: AvatarSize;

  /**
   * Optional presence indicator.
   */
  status?: AvatarStatus;

  /**
   * Class applied directly to the image.
   */
  imageClassName?: string;
}

export function Avatar({
  src,
  alt,
  fallback,
  size = 'default',
  status,
  className,
  imageClassName,
  ...props
}: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | undefined>();

  const showImage = src != null && src !== '' && failedSrc !== src;

  return (
    <div
      {...props}
      className={classNames('rush-avatar', `rush-avatar--${size}`, className)}
      data-size={size}
      data-status={status}
      data-slot="avatar"
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          className={classNames('rush-avatar__image', imageClassName)}
          data-slot="avatar-image"
          onError={() => {
            setFailedSrc(src);
          }}
        />
      ) : (
        <span className="rush-avatar__fallback" data-slot="avatar-fallback">
          {fallback}
        </span>
      )}

      {status != null && (
        <span
          aria-label={status}
          className={classNames('rush-avatar__status', `rush-avatar__status--${status}`)}
          data-slot="avatar-status"
          role="status"
        />
      )}
    </div>
  );
}
