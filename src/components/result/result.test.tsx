import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { Result } from './result';

describe('Result', () => {
  it('renders title and description', () => {
    render(<Result title="Success" description="Completed" />);

    expect(screen.getByText('Success')).toBeInTheDocument();

    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('does not render optional regions when omitted', () => {
    render(<Result title="Success" />);

    expect(document.querySelector('[data-slot="result-description"]')).not.toBeInTheDocument();

    expect(document.querySelector('[data-slot="result-actions"]')).not.toBeInTheDocument();
  });

  it('supports status variants', () => {
    render(<Result status="error" title="Error" data-testid="result" />);

    expect(screen.getByTestId('result')).toHaveClass('rush-result--error');
  });

  it('supports a custom icon', () => {
    render(<Result icon={<span>Custom icon</span>} title="Result" />);

    expect(screen.getByText('Custom icon')).toBeInTheDocument();
  });
});
