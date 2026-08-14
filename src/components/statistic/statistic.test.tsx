import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { Statistic } from './statistic';

describe('Statistic', () => {
  it('renders title and value', () => {
    render(<Statistic title="Records" value={123} />);

    expect(screen.getByText('Records')).toBeInTheDocument();

    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('renders a positive difference', () => {
    render(<Statistic title="Records" value={123} diff={5} />);

    expect(document.querySelector('[data-slot="statistic-diff"]')).toBeInTheDocument();
  });

  it('does not render zero difference', () => {
    render(<Statistic title="Records" value={123} diff={0} />);

    expect(document.querySelector('[data-slot="statistic-diff"]')).not.toBeInTheDocument();
  });

  it('supports precision', () => {
    render(<Statistic title="Time" value={12.345} precision={2} locale="en-US" />);

    expect(screen.getByText('12.35')).toBeInTheDocument();
  });

  it('supports custom formatting', () => {
    render(<Statistic title="Value" value={10} formatter={() => 'Custom'} />);

    expect(screen.getByText('Custom')).toBeInTheDocument();
  });
});
