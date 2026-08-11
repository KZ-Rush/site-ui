import { fireEvent, render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { Avatar } from './avatar';

describe('Avatar', () => {
  it('renders fallback when no image source is supplied', () => {
    render(<Avatar alt="Alexey" fallback="AR" />);

    expect(screen.getByText('AR')).toBeInTheDocument();

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders an image when a source is supplied', () => {
    render(<Avatar src="/avatar.jpg" alt="Alexey" fallback="AR" />);

    expect(
      screen.getByRole('img', {
        name: 'Alexey',
      }),
    ).toHaveAttribute('src', '/avatar.jpg');
  });

  it('falls back when the image fails to load', () => {
    render(<Avatar src="/broken.jpg" alt="Alexey" fallback="AR" />);

    fireEvent.error(screen.getByRole('img'));

    expect(screen.queryByRole('img')).not.toBeInTheDocument();

    expect(screen.getByText('AR')).toBeInTheDocument();
  });

  it('supports size variants', () => {
    render(<Avatar alt="Alexey" fallback="AR" size="lg" data-testid="avatar" />);

    expect(screen.getByTestId('avatar')).toHaveClass('rush-avatar--lg');
  });

  it('renders a status indicator', () => {
    render(<Avatar alt="Alexey" fallback="AR" status="online" />);

    expect(
      screen.getByRole('status', {
        name: 'online',
      }),
    ).toHaveClass('rush-avatar__status--online');
  });

  it('does not render a status indicator when omitted', () => {
    render(<Avatar alt="Alexey" fallback="AR" data-testid="avatar" />);

    expect(
      screen.getByTestId('avatar').querySelector('[data-slot="avatar-status"]'),
    ).not.toBeInTheDocument();
  });

  it('applies custom root and image classes', () => {
    render(
      <Avatar
        src="/avatar.jpg"
        alt="Alexey"
        fallback="AR"
        className="custom-avatar"
        imageClassName="custom-image"
        data-testid="avatar"
      />,
    );

    expect(screen.getByTestId('avatar')).toHaveClass('rush-avatar', 'custom-avatar');

    expect(screen.getByRole('img')).toHaveClass('rush-avatar__image', 'custom-image');
  });
});
