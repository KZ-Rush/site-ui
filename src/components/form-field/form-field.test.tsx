import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FormField } from './form-field';

describe('FormField', () => {
  it('connects label and description to the control', () => {
    render(
      <FormField id="username" label="Username" description="Your public player name.">
        {(controlProps) => <input {...controlProps} />}
      </FormField>,
    );

    const input = screen.getByLabelText('Username');
    expect(input).toHaveAttribute('id', 'username');
    expect(input).toHaveAttribute('aria-describedby', 'username-description');
  });

  it('connects errors and marks the control invalid', () => {
    render(
      <FormField id="username" label="Username" error="Username is required.">
        {(controlProps) => <input {...controlProps} />}
      </FormField>,
    );

    const input = screen.getByLabelText('Username');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'username-error');
    expect(screen.getByRole('alert')).toHaveTextContent('Username is required.');
  });

  it('combines description and error IDs', () => {
    render(
      <FormField id="username" label="Username" description="Help" error="Invalid">
        {(controlProps) => <input {...controlProps} />}
      </FormField>,
    );

    expect(screen.getByLabelText('Username')).toHaveAttribute(
      'aria-describedby',
      'username-description username-error',
    );
  });
});
