import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';

function renderAccordion() {
  return render(
    <Accordion type="single" defaultValue="one" collapsible>
      <AccordionItem value="one">
        <AccordionTrigger>One</AccordionTrigger>

        <AccordionContent>First content</AccordionContent>
      </AccordionItem>

      <AccordionItem value="two">
        <AccordionTrigger>Two</AccordionTrigger>

        <AccordionContent>Second content</AccordionContent>
      </AccordionItem>

      <AccordionItem value="disabled" disabled>
        <AccordionTrigger>Disabled</AccordionTrigger>

        <AccordionContent>Disabled content</AccordionContent>
      </AccordionItem>
    </Accordion>,
  );
}

function getAccordionPanelByText(text: string): HTMLElement {
  const content = screen.getByText(text);

  const panel = content.closest('[data-slot="accordion-content"]');

  if (!(panel instanceof HTMLElement)) {
    throw new Error(`Accordion panel for "${text}" was not found.`);
  }

  return panel;
}

describe('Accordion', () => {
  it('renders the initially open item', () => {
    renderAccordion();

    expect(
      screen.getByRole('button', {
        name: 'One',
      }),
    ).toHaveAttribute('aria-expanded', 'true');

    expect(screen.getByText('First content')).toBeInTheDocument();

    expect(getAccordionPanelByText('Second content')).toHaveAttribute('aria-hidden', 'true');
  });

  it('opens another item', async () => {
    const user = userEvent.setup();

    renderAccordion();

    await user.click(
      screen.getByRole('button', {
        name: 'Two',
      }),
    );

    expect(screen.getByText('Second content')).toBeInTheDocument();

    expect(getAccordionPanelByText('First content')).toHaveAttribute('aria-hidden', 'true');
  });

  it('collapses an open item when collapsible', async () => {
    const user = userEvent.setup();

    renderAccordion();

    await user.click(
      screen.getByRole('button', {
        name: 'One',
      }),
    );

    expect(getAccordionPanelByText('First content')).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not collapse in non-collapsible single mode', async () => {
    const user = userEvent.setup();

    render(
      <Accordion type="single" defaultValue="one">
        <AccordionItem value="one">
          <AccordionTrigger>One</AccordionTrigger>

          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'One',
      }),
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('supports multiple open items', async () => {
    const user = userEvent.setup();

    render(
      <Accordion type="multiple" defaultValue={['one']}>
        <AccordionItem value="one">
          <AccordionTrigger>One</AccordionTrigger>

          <AccordionContent>First</AccordionContent>
        </AccordionItem>

        <AccordionItem value="two">
          <AccordionTrigger>Two</AccordionTrigger>

          <AccordionContent>Second</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Two',
      }),
    );

    expect(screen.getByText('First')).toBeInTheDocument();

    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('does not open disabled items', async () => {
    const user = userEvent.setup();

    renderAccordion();

    const trigger = screen.getByRole('button', {
      name: 'Disabled',
    });

    expect(trigger).toBeDisabled();

    await user.click(trigger);

    expect(getAccordionPanelByText('Disabled content')).toHaveAttribute('aria-hidden', 'true');
  });

  it('calls onValueChange in single mode', async () => {
    const user = userEvent.setup();

    const onValueChange = vi.fn();

    render(
      <Accordion type="single" defaultValue="one" collapsible onValueChange={onValueChange}>
        <AccordionItem value="one">
          <AccordionTrigger>One</AccordionTrigger>

          <AccordionContent>One content</AccordionContent>
        </AccordionItem>

        <AccordionItem value="two">
          <AccordionTrigger>Two</AccordionTrigger>

          <AccordionContent>Two content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Two',
      }),
    );

    expect(onValueChange).toHaveBeenCalledWith('two');
  });

  it('calls onValueChange in multiple mode', async () => {
    const user = userEvent.setup();

    const onValueChange = vi.fn();

    render(
      <Accordion type="multiple" defaultValue={['one']} onValueChange={onValueChange}>
        <AccordionItem value="one">
          <AccordionTrigger>One</AccordionTrigger>

          <AccordionContent>One</AccordionContent>
        </AccordionItem>

        <AccordionItem value="two">
          <AccordionTrigger>Two</AccordionTrigger>

          <AccordionContent>Two</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    await user.click(
      screen.getByRole('button', {
        name: 'Two',
      }),
    );

    expect(onValueChange).toHaveBeenCalledWith(['one', 'two']);
  });

  it('connects trigger and content accessibly', () => {
    renderAccordion();

    const trigger = screen.getByRole('button', {
      name: 'One',
    });

    const region = screen.getByRole('region');

    expect(trigger).toHaveAttribute('aria-controls', region.id);

    expect(region).toHaveAttribute('aria-labelledby', trigger.id);
  });
});
