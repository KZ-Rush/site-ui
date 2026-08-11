import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './button';
import { createRef } from 'react';

describe('Button', () => {
  it('renders a native button with type=button by default', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('type', 'button');
  });

  it('applies variant and size classes', () => {
    render(
      <Button variant="destructive" size="lg">
        Delete
      </Button>,
    );
    expect(screen.getByRole('button')).toHaveClass(
      'rush-button--variant-destructive',
      'rush-button--size-lg',
    );
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders an anchor when href is supplied', () => {
    render(
      <Button href="/records" target="_blank">
        Records
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Records' });
    expect(link).toHaveAttribute('href', '/records');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('disables link interaction', () => {
    const onClick = vi.fn();
    render(
      <Button href="/records" disabled onClick={onClick}>
        Records
      </Button>,
    );
    const element = screen.getByText('Records');
    expect(element).not.toHaveAttribute('href');
    expect(element).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(element);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('forwards a ref to the native button', () => {
    const ref = createRef<HTMLButtonElement>();

    render(<Button ref={ref}>Save</Button>);

    expect(ref.current).toBe(
      screen.getByRole('button', {
        name: 'Save',
      }),
    );
  });

  it('forwards a ref to the link', () => {
    const ref = createRef<HTMLAnchorElement>();

    render(
      <Button ref={ref} href="/records">
        Records
      </Button>,
    );

    expect(ref.current).toBe(
      screen.getByRole('link', {
        name: 'Records',
      }),
    );
  });
});
