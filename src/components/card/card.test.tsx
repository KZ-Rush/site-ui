import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

describe('Card', () => {
  it('renders its compound structure', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Player profile</CardTitle>
          <CardDescription>Player information</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );

    expect(screen.getByTestId('card')).toHaveClass('rush-card');
    expect(screen.getByText('Player profile')).toHaveClass('rush-card__title');
    expect(screen.getByText('Player information')).toHaveClass('rush-card__description');
    expect(screen.getByText('Content')).toHaveClass('rush-card__content');
    expect(screen.getByText('Footer')).toHaveClass('rush-card__footer');
  });

  it('forwards native props and merges class names', () => {
    render(<Card data-testid="card" className="custom-card" title="Profile card" />);
    expect(screen.getByTestId('card')).toHaveClass('rush-card', 'custom-card');
    expect(screen.getByTestId('card')).toHaveAttribute('title', 'Profile card');
    expect(screen.getByTestId('card')).toHaveAttribute('data-slot', 'card');
  });
});
