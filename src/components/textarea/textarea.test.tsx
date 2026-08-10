import {
  render,
  screen,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import {
  Textarea,
} from './textarea';

describe('Textarea', () => {
  it('renders a native textarea', () => {
    render(
      <Textarea
        aria-label="Description"
      />,
    );

    expect(
      screen.getByRole('textbox', {
        name: 'Description',
      }),
    ).toBeInTheDocument();
  });

  it('forwards native textarea props', () => {
    render(
      <Textarea
        aria-label="Description"
        name="description"
        placeholder="Enter description"
        maxLength={500}
        rows={5}
      />,
    );

    const textarea =
      screen.getByRole(
        'textbox',
        {
          name: 'Description',
        },
      );

    expect(textarea).toHaveAttribute(
      'name',
      'description',
    );

    expect(textarea).toHaveAttribute(
      'placeholder',
      'Enter description',
    );

    expect(textarea).toHaveAttribute(
      'maxlength',
      '500',
    );

    expect(textarea).toHaveAttribute(
      'rows',
      '5',
    );
  });

  it('supports entering text', async () => {
    const user = userEvent.setup();

    render(
      <Textarea
        aria-label="Description"
      />,
    );

    const textarea =
      screen.getByRole('textbox');

    await user.type(
      textarea,
      'Demo description',
    );

    expect(textarea).toHaveValue(
      'Demo description',
    );
  });

  it('calls native onChange', async () => {
    const user = userEvent.setup();

    const onChange = vi.fn();

    render(
      <Textarea
        aria-label="Description"
        onChange={onChange}
      />,
    );

    await user.type(
      screen.getByRole('textbox'),
      'Test',
    );

    expect(
      onChange,
    ).toHaveBeenCalled();
  });

  it('supports disabled state', () => {
    render(
      <Textarea
        aria-label="Description"
        disabled
      />,
    );

    const textarea =
      screen.getByRole('textbox');

    expect(textarea).toBeDisabled();

    expect(
      textarea.closest(
        '[data-slot="textarea"]',
      ),
    ).toHaveAttribute(
      'data-disabled',
      'true',
    );
  });

  it('supports invalid state', () => {
    render(
      <Textarea
        aria-label="Description"
        invalid
      />,
    );

    const textarea =
      screen.getByRole('textbox');

    expect(textarea).toHaveAttribute(
      'aria-invalid',
      'true',
    );

    expect(
      textarea.closest(
        '[data-slot="textarea"]',
      ),
    ).toHaveAttribute(
      'data-invalid',
      'true',
    );
  });

  it('preserves explicitly supplied aria-invalid', () => {
    render(
      <Textarea
        aria-label="Description"
        invalid
        aria-invalid="grammar"
      />,
    );

    expect(
      screen.getByRole('textbox'),
    ).toHaveAttribute(
      'aria-invalid',
      'grammar',
    );
  });

  it('applies the requested size', () => {
    render(
      <Textarea
        aria-label="Description"
        size="lg"
      />,
    );

    expect(
      screen
        .getByRole('textbox')
        .closest(
          '[data-slot="textarea"]',
        ),
    ).toHaveClass(
      'rush-textarea--lg',
    );
  });

  it('supports controlled value', () => {
    const {
      rerender,
    } = render(
      <Textarea
        aria-label="Description"
        value="First"
        readOnly
      />,
    );

    const textarea =
      screen.getByRole('textbox');

    expect(textarea).toHaveValue(
      'First',
    );

    rerender(
      <Textarea
        aria-label="Description"
        value="Second"
        readOnly
      />,
    );

    expect(textarea).toHaveValue(
      'Second',
    );
  });

  it('applies root and textarea class names separately', () => {
    render(
      <Textarea
        aria-label="Description"
        className="custom-root"
        textareaClassName="custom-control"
      />,
    );

    const textarea =
      screen.getByRole('textbox');

    expect(
      textarea.closest(
        '[data-slot="textarea"]',
      ),
    ).toHaveClass(
      'rush-textarea',
      'custom-root',
    );

    expect(textarea).toHaveClass(
      'rush-textarea__control',
      'custom-control',
    );
  });
});