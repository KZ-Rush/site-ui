import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import { SearchableSelect } from './searchable-select';

interface MapOption {
  id: number;
  name: string;
  aliases?: string[];
  disabled?: boolean;
}

const maps: MapOption[] = [
  { id: 1, name: 'kz_beginner', aliases: ['beginner'] },
  { id: 2, name: 'kz_climb', aliases: ['climb'] },
  { id: 3, name: 'kz_extreme', aliases: ['extreme'], disabled: true },
];

function renderSelect(
  props: Partial<React.ComponentProps<typeof SearchableSelect<MapOption>>> = {},
) {
  return render(
    <SearchableSelect
      aria-label="Map"
      getOptionKeywords={(option) => option.aliases ?? []}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.id}
      isOptionDisabled={(option) => Boolean(option.disabled)}
      options={maps}
      {...props}
    />,
  );
}

async function openSelect(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: 'Map' }));

  return screen.getByRole('combobox', { name: 'Search options' });
}

describe('SearchableSelect', () => {
  it('renders a trigger and hidden form value', () => {
    const { container } = renderSelect({
      name: 'map_id',
      value: maps[1],
    });

    expect(screen.getByRole('button', { name: 'Map' })).toHaveTextContent('kz_climb');
    expect(container.querySelector('input[type="hidden"]')).toHaveAttribute('name', 'map_id');
    expect(container.querySelector('input[type="hidden"]')).toHaveValue('2');
  });

  it('opens the searchable list and focuses its input', async () => {
    const user = userEvent.setup();

    renderSelect();

    const search = await openSelect(user);

    expect(screen.getByRole('listbox', { name: 'Search results' })).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(3);

    await waitFor(() => {
      expect(search).toHaveFocus();
    });
  });

  it('filters options by labels and keywords', async () => {
    const user = userEvent.setup();

    renderSelect();

    const search = await openSelect(user);

    await user.type(search, 'climb');

    expect(screen.getByRole('option', { name: 'kz_climb' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'kz_beginner' })).not.toBeInTheDocument();
  });

  it('selects an option and restores focus to the trigger', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    renderSelect({ onValueChange });

    await openSelect(user);
    await user.click(screen.getByRole('option', { name: 'kz_climb' }));

    const trigger = screen.getByRole('button', { name: 'Map' });

    expect(onValueChange).toHaveBeenCalledWith(maps[1]);
    expect(trigger).toHaveTextContent('kz_climb');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it('supports keyboard navigation and selection', async () => {
    const user = userEvent.setup();

    renderSelect();

    await openSelect(user);
    await user.keyboard('{ArrowDown}{Enter}');

    expect(screen.getByRole('button', { name: 'Map' })).toHaveTextContent('kz_climb');
  });

  it('does not select disabled options', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    renderSelect({ onValueChange });

    await openSelect(user);

    const disabledOption = screen.getByRole('option', { name: 'kz_extreme' });

    expect(disabledOption).toHaveAttribute('aria-disabled', 'true');

    await user.click(disabledOption);

    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('supports server-filtered options and controlled search text', async () => {
    const user = userEvent.setup();
    const onSearchValueChange = vi.fn();

    renderSelect({
      shouldFilter: false,
      searchValue: '',
      onSearchValueChange,
    });

    const search = await openSelect(user);

    await user.type(search, 'kz');

    expect(onSearchValueChange).toHaveBeenCalled();
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('keeps a controlled selection visible when it is absent from current results', () => {
    renderSelect({
      options: [],
      value: maps[0],
    });

    expect(screen.getByRole('button', { name: 'Map' })).toHaveTextContent('kz_beginner');
  });

  it('renders loading, error, and empty states', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender } = renderSelect({ loading: true, defaultOpen: true, onValueChange });

    expect(screen.getByText('Loading options...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-activedescendant');

    await user.keyboard('{Enter}');

    expect(onValueChange).not.toHaveBeenCalled();

    rerender(
      <SearchableSelect
        defaultOpen
        error
        aria-label="Map"
        getOptionLabel={(option: MapOption) => option.name}
        getOptionValue={(option: MapOption) => option.id}
        options={maps}
      />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to load options.');

    await user.clear(screen.getByRole('combobox'));

    rerender(
      <SearchableSelect
        defaultOpen
        aria-label="Map"
        getOptionLabel={(option: MapOption) => option.name}
        getOptionValue={(option: MapOption) => option.id}
        options={[]}
      />,
    );

    expect(screen.getByText('No matching options found.')).toBeInTheDocument();
  });

  it('supports disabled, invalid, and native trigger props', () => {
    const { container } = renderSelect({
      disabled: true,
      id: 'map-select',
      invalid: true,
      name: 'map_id',
      'aria-describedby': 'map-error',
    });

    const trigger = screen.getByRole('button', { name: 'Map' });

    expect(trigger).toBeDisabled();
    expect(trigger).toHaveAttribute('id', 'map-select');
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger).toHaveAttribute('aria-describedby', 'map-error');
    expect(container.querySelector('input[type="hidden"]')).toBeDisabled();
  });
});
