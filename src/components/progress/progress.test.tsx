import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Progress } from './progress';

describe('Progress', () => {
  it('renders the supplied value', () => {
    render(<Progress progress={45} aria-label="Upload progress" />);
    const bar = screen.getByRole('progressbar', { name: 'Upload progress' });
    expect(bar).toHaveAttribute('aria-valuenow', '45');
    expect(screen.getByText('45%')).toBeInTheDocument();
  });

  it('clamps out-of-range values', () => {
    const { rerender } = render(<Progress progress={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    rerender(<Progress progress={-20} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it.each([Number.NaN, Infinity, -Infinity])('treats %s as zero', (value) => {
    render(<Progress progress={value} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('supports custom formatting and hidden text', () => {
    const { rerender } = render(
      <Progress progress={75} formatValue={(value) => `${value} of 100`} />,
    );
    expect(screen.getByText('75 of 100')).toBeInTheDocument();
    rerender(<Progress progress={75} showValue={false} />);
    expect(screen.queryByText('75%')).not.toBeInTheDocument();
  });

  it('uses aria-labelledby without adding aria-label', () => {
    render(
      <>
        <span id="progress-label">Demo processing</span>
        <Progress progress={50} aria-labelledby="progress-label" />
      </>,
    );
    const bar = screen.getByRole('progressbar', { name: 'Demo processing' });
    expect(bar).not.toHaveAttribute('aria-label');
  });
});
