import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Alert, AlertDescription, AlertList, AlertTitle } from './alert';

describe('Alert', () => {
  it('uses status for non-destructive variants', () => {
    render(<Alert variant="info"><AlertTitle>Information</AlertTitle></Alert>);
    expect(screen.getByRole('status')).toHaveClass('rush-alert--info');
  });

  it('uses alert for destructive variants', () => {
    render(<Alert variant="destructive"><AlertTitle>Error</AlertTitle></Alert>);
    expect(screen.getByRole('alert')).toHaveClass('rush-alert--destructive');
  });

  it('renders title, description, and an optional decorative icon', () => {
    render(
      <Alert icon={<svg data-testid="icon" />}>
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>Details</AlertDescription>
      </Alert>,
    );
    expect(screen.getByRole('heading', { name: 'Information' })).toHaveClass('rush-alert__title');
    expect(screen.getByText('Details')).toHaveClass('rush-alert__description');
    expect(screen.getByTestId('icon').parentElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('normalizes and deduplicates list messages', () => {
    render(<AlertList messages={['First', ' First ', '', 'Second']} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('renders no list for empty messages', () => {
    const { container } = render(<AlertList messages={['', '  ']} />);
    expect(container).toBeEmptyDOMElement();
  });
});
