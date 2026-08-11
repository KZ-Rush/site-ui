import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FormattedDateTime } from './formatted-date-time';

describe('FormattedDateTime', () => {
  it('parses and formats a strict local date', () => {
    render(
      <FormattedDateTime
        value="01.08.2026 17:30"
        inputFormat="DD.MM.YYYY HH:mm"
        strict
        format="YYYY-MM-DD HH:mm"
      />,
    );

    expect(screen.getByText('2026-08-01 17:30')).toBeInTheDocument();
  });

  it('converts an offset date to UTC', () => {
    render(<FormattedDateTime value="2026-08-01T17:30:00+03:00" format="YYYY-MM-DD HH:mm" utc />);

    expect(screen.getByText('2026-08-01 14:30')).toBeInTheDocument();
  });

  it('formats Unix seconds supplied as number or string', () => {
    const { rerender } = render(<FormattedDateTime value={1754050200} format="YYYY" utc />);

    expect(screen.getByText('2025')).toBeInTheDocument();

    rerender(<FormattedDateTime value="1754050200" format="YYYY" utc />);

    expect(screen.getByText('2025')).toBeInTheDocument();
  });

  it('renders a semantic time element', () => {
    render(<FormattedDateTime value="2026-08-01T17:30:00Z" format="YYYY-MM-DD" utc />);

    const element = screen.getByText('2026-08-01');

    expect(element.tagName).toBe('TIME');
    expect(element).toHaveAttribute('dateTime');
    expect(element).toHaveAttribute('data-slot', 'formatted-date-time');
  });

  it.each([null, undefined, '', 0, '0'] as const)(
    'renders fallback for missing value %s',
    (value) => {
      render(<FormattedDateTime value={value} fallback="Unknown" />);
      expect(screen.getByText('Unknown')).toBeInTheDocument();
    },
  );

  it('renders fallback for invalid strict input', () => {
    render(
      <FormattedDateTime value="2026/08/01" inputFormat="DD.MM.YYYY" strict fallback="Invalid" />,
    );

    expect(screen.getByText('Invalid')).toBeInTheDocument();
  });

  it('forwards native time props', () => {
    render(
      <FormattedDateTime
        value="2026-08-01T17:30:00Z"
        className="custom-date"
        title="Creation date"
        utc
      />,
    );

    expect(screen.getByTitle('Creation date')).toHaveClass('custom-date');
  });
});
