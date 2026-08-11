import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

function renderTabs() {
  return render(
    <Tabs defaultValue="overview">
      <TabsList aria-label="Sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>

        <TabsTrigger value="history">History</TabsTrigger>

        <TabsTrigger value="audit" disabled>
          Audit
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">Overview content</TabsContent>

      <TabsContent value="history">History content</TabsContent>

      <TabsContent value="audit">Audit content</TabsContent>
    </Tabs>,
  );
}

describe('Tabs', () => {
  it('renders the active tab', () => {
    renderTabs();

    expect(
      screen.getByRole('tab', {
        name: 'Overview',
      }),
    ).toHaveAttribute('aria-selected', 'true');

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Overview content');
  });

  it('changes the active tab when clicked', async () => {
    const user = userEvent.setup();

    renderTabs();

    await user.click(
      screen.getByRole('tab', {
        name: 'History',
      }),
    );

    expect(
      screen.getByRole('tab', {
        name: 'History',
      }),
    ).toHaveAttribute('aria-selected', 'true');

    expect(screen.getByRole('tabpanel')).toHaveTextContent('History content');
  });

  it('does not activate a disabled tab', async () => {
    const user = userEvent.setup();

    renderTabs();

    await user.click(
      screen.getByRole('tab', {
        name: 'Audit',
      }),
    );

    expect(
      screen.getByRole('tab', {
        name: 'Overview',
      }),
    ).toHaveAttribute('aria-selected', 'true');
  });

  it('moves to the next tab with ArrowRight', async () => {
    const user = userEvent.setup();

    renderTabs();

    const overview = screen.getByRole('tab', {
      name: 'Overview',
    });

    overview.focus();

    await user.keyboard('{ArrowRight}');

    const history = screen.getByRole('tab', {
      name: 'History',
    });

    expect(history).toHaveFocus();

    expect(history).toHaveAttribute('aria-selected', 'true');
  });

  it('skips disabled tabs during keyboard navigation', async () => {
    const user = userEvent.setup();

    renderTabs();

    const history = screen.getByRole('tab', {
      name: 'History',
    });

    history.focus();

    await user.keyboard('{ArrowRight}');

    expect(
      screen.getByRole('tab', {
        name: 'Overview',
      }),
    ).toHaveFocus();
  });

  it('supports Home and End', async () => {
    const user = userEvent.setup();

    renderTabs();

    const overview = screen.getByRole('tab', {
      name: 'Overview',
    });

    overview.focus();

    await user.keyboard('{End}');

    expect(
      screen.getByRole('tab', {
        name: 'History',
      }),
    ).toHaveFocus();

    await user.keyboard('{Home}');

    expect(overview).toHaveFocus();
  });

  it('supports vertical keyboard navigation', async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="one" orientation="vertical">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>

          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>

        <TabsContent value="one">One content</TabsContent>

        <TabsContent value="two">Two content</TabsContent>
      </Tabs>,
    );

    const one = screen.getByRole('tab', {
      name: 'One',
    });

    one.focus();

    await user.keyboard('{ArrowDown}');

    expect(
      screen.getByRole('tab', {
        name: 'Two',
      }),
    ).toHaveFocus();
  });

  it('supports controlled state', async () => {
    const user = userEvent.setup();

    const onValueChange = vi.fn();

    render(
      <Tabs value="overview" defaultValue="overview" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>

          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">Overview</TabsContent>

        <TabsContent value="history">History</TabsContent>
      </Tabs>,
    );

    await user.click(
      screen.getByRole('tab', {
        name: 'History',
      }),
    );

    expect(onValueChange).toHaveBeenCalledWith('history');

    expect(
      screen.getByRole('tab', {
        name: 'Overview',
      }),
    ).toHaveAttribute('aria-selected', 'true');
  });

  it('keeps inactive content mounted with forceMount', () => {
    render(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>

          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>

        <TabsContent value="one">One content</TabsContent>

        <TabsContent value="two" forceMount>
          Two content
        </TabsContent>
      </Tabs>,
    );

    const content = screen.getByText('Two content');

    expect(content).toBeInTheDocument();

    expect(content).not.toBeVisible();
  });
});
