import type {
  ComponentProps,
  ComponentPropsWithoutRef,
} from 'react';

import { classNames } from '../../utils/class-names';

import './card.scss';

export type CardProps = ComponentPropsWithoutRef<'div'>;

export function Card({
  className,
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      data-slot="card"
      className={classNames(
        'rush-card',
        className,
      )}
    />
  );
}

export type CardHeaderProps = ComponentPropsWithoutRef<'div'>;

export function CardHeader({
  className,
  ...props
}: CardHeaderProps) {
  return (
    <div
      {...props}
      data-slot="card-header"
      className={classNames(
        'rush-card__header',
        className,
      )}
    />
  );
}

export type CardTitleProps = ComponentProps<'div'>;

export function CardTitle({
  className,
  ...props
}: CardTitleProps) {
  return (
    <div
      {...props}
      data-slot="card-title"
      className={classNames(
        'rush-card__title',
        className,
      )}
    />
  );
}

export type CardDescriptionProps = ComponentProps<'div'>;

export function CardDescription({
  className,
  ...props
}: CardDescriptionProps) {
  return (
    <div
      {...props}
      data-slot="card-description"
      className={classNames(
        'rush-card__description',
        className,
      )}
    />
  );
}

export type CardContentProps = ComponentPropsWithoutRef<'div'>;

export function CardContent({
  className,
  ...props
}: CardContentProps) {
  return (
    <div
      {...props}
      data-slot="card-content"
      className={classNames(
        'rush-card__content',
        className,
      )}
    />
  );
}

export type CardFooterProps = ComponentPropsWithoutRef<'div'>;

export function CardFooter({
  className,
  ...props
}: CardFooterProps) {
  return (
    <div
      {...props}
      data-slot="card-footer"
      className={classNames(
        'rush-card__footer',
        className,
      )}
    />
  );
}