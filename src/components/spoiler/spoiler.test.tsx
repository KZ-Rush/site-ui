import { createRef } from 'react';

import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it } from 'vitest';

import { Spoiler, SpoilerContent, SpoilerSummary } from './spoiler';

describe('Spoiler', () => {
  it('renders native details and summary elements', () => {
    render(
      <Spoiler data-testid="spoiler">
        <SpoilerSummary>Technical details</SpoilerSummary>
        <SpoilerContent>Hidden content</SpoilerContent>
      </Spoiler>,
    );

    const spoiler = screen.getByTestId('spoiler');
    const summary = screen.getByText('Technical details').closest('summary');

    expect(spoiler.tagName).toBe('DETAILS');
    expect(summary?.tagName).toBe('SUMMARY');
    expect(screen.getByText('Hidden content')).toHaveAttribute('data-slot', 'spoiler-content');
  });

  it('reveals and hides its content through native interaction', async () => {
    const user = userEvent.setup();

    render(
      <Spoiler data-testid="spoiler">
        <SpoilerSummary>Show spoiler</SpoilerSummary>
        <SpoilerContent>Spoiler content</SpoilerContent>
      </Spoiler>,
    );

    const spoiler = screen.getByTestId('spoiler');
    const summary = screen.getByText('Show spoiler');

    expect(spoiler).not.toHaveAttribute('open');

    await user.click(summary);

    expect(spoiler).toHaveAttribute('open');

    await user.click(summary);

    expect(spoiler).not.toHaveAttribute('open');
  });

  it('supports an initially open state', () => {
    render(
      <Spoiler open data-testid="spoiler">
        <SpoilerSummary>Technical details</SpoilerSummary>
        <SpoilerContent>Visible content</SpoilerContent>
      </Spoiler>,
    );

    expect(screen.getByTestId('spoiler')).toHaveAttribute('open');
  });

  it('supports the link variant', () => {
    render(
      <Spoiler data-testid="spoiler" variant="link">
        <SpoilerSummary>Show details</SpoilerSummary>
        <SpoilerContent>Hidden content</SpoilerContent>
      </Spoiler>,
    );

    expect(screen.getByTestId('spoiler')).toHaveClass('rush-spoiler--variant-link');
    expect(screen.getByTestId('spoiler')).toHaveAttribute('data-variant', 'link');
  });

  it('forwards native props, classes, and refs', () => {
    const ref = createRef<HTMLDetailsElement>();

    render(<Spoiler ref={ref} data-testid="spoiler" className="custom-spoiler" name="details" />);

    const spoiler = screen.getByTestId('spoiler');

    expect(ref.current).toBe(spoiler);
    expect(spoiler).toHaveClass('rush-spoiler', 'custom-spoiler');
    expect(spoiler).toHaveClass('rush-spoiler--variant-default');
    expect(spoiler).toHaveAttribute('name', 'details');
    expect(spoiler).toHaveAttribute('data-slot', 'spoiler');
    expect(spoiler).toHaveAttribute('data-variant', 'default');
  });
});
