import { useMemo, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { FormField } from '../form-field';

import { SearchableSelect, type SearchableSelectProps } from './searchable-select';

interface MapOption {
  id: number;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  aliases?: string[];
  disabled?: boolean;
}

const maps: MapOption[] = [
  { id: 1, name: 'kz_beginner', difficulty: 'Easy', aliases: ['beginner'] },
  { id: 2, name: 'kz_climb', difficulty: 'Medium', aliases: ['climb'] },
  { id: 3, name: 'kz_longjumps2', difficulty: 'Medium', aliases: ['longjump', 'lj'] },
  { id: 4, name: 'kz_extreme', difficulty: 'Hard', aliases: ['extreme'] },
  { id: 5, name: 'kz_unavailable', difficulty: 'Hard', disabled: true },
];

type MapSearchableSelectProps = Omit<
  SearchableSelectProps<MapOption>,
  'getOptionKeywords' | 'getOptionLabel' | 'getOptionValue' | 'isOptionDisabled'
>;

function MapSearchableSelect(props: MapSearchableSelectProps) {
  return (
    <SearchableSelect
      getOptionKeywords={(option) => option.aliases ?? []}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.id}
      isOptionDisabled={(option) => Boolean(option.disabled)}
      {...props}
    />
  );
}

const meta = {
  title: 'Components/SearchableSelect',
  component: MapSearchableSelect,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },

  decorators: [
    (Story) => (
      <div style={{ width: '20rem' }}>
        <Story />
      </div>
    ),
  ],

  args: {
    options: maps,
    placeholder: 'Select a map',
    searchPlaceholder: 'Search maps...',
    searchAriaLabel: 'Search maps',
    resultsAriaLabel: 'Map search results',
    size: 'default',
    disabled: false,
    invalid: false,
  },

  argTypes: {
    options: { control: false },
    value: { control: false },
    defaultValue: { control: false },
    onValueChange: { control: false },
    searchValue: { control: false },
    defaultSearchValue: { control: false },
    onSearchValueChange: { control: false },
    open: { control: false },
    defaultOpen: { control: false },
    onOpenChange: { control: false },
    renderOption: { control: false },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
  },
} satisfies Meta<typeof MapSearchableSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultSource = `<SearchableSelect
  options={maps}
  value={selectedMap}
  onValueChange={setSelectedMap}
  getOptionValue={(map) => map.id}
  getOptionLabel={(map) => map.name}
  placeholder="Select a map"
  searchPlaceholder="Search maps..."
  name="map_id"
/>`;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: defaultSource,
        language: 'tsx',
      },
    },
  },
};

export const Selected: Story = {
  args: {
    defaultValue: maps[1],
  },

  parameters: {
    docs: {
      source: {
        code: defaultSource.replace('value={selectedMap}', 'defaultValue={maps[1]}'),
        language: 'tsx',
      },
    },
  },
};

export const RichOptions: Story = {
  args: {
    renderOption: (option) => (
      <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 16 }}>
        <span>{option.name}</span>
        <span style={{ color: 'var(--rush-color-muted-foreground)' }}>{option.difficulty}</span>
      </span>
    ),
  },

  parameters: {
    docs: {
      source: {
        code: `${defaultSource.slice(0, -2)}
  renderOption={(map) => (
    <span>{map.name} — {map.difficulty}</span>
  )}
/>`,
        language: 'tsx',
      },
    },
  },
};

export const ServerFiltered: Story = {
  render: (args) => {
    const [search, setSearch] = useState('');
    const filteredMaps = useMemo(
      () => maps.filter((map) => map.name.toLowerCase().includes(search.toLowerCase())),
      [search],
    );

    return (
      <MapSearchableSelect
        {...args}
        options={filteredMaps}
        searchValue={search}
        shouldFilter={false}
        hint="Options may be loaded from an API; debounce the search in the application."
        onSearchValueChange={setSearch}
      />
    );
  },

  parameters: {
    docs: {
      source: {
        code: `${defaultSource.slice(0, -2)}
  options={query.data ?? []}
  searchValue={search}
  onSearchValueChange={setSearch}
  shouldFilter={false}
  loading={query.isPending}
  error={query.isError}
/>`,
        language: 'tsx',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },

  parameters: {
    docs: {
      description: {
        story: 'Open the select to preview its loading state.',
      },
    },
  },
};

export const Error: Story = {
  args: {
    error: true,
    errorText: 'Unable to load maps. Try searching again.',
  },

  parameters: {
    docs: {
      description: {
        story: 'Open the select to preview its error state.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    options: [],
    emptyText: 'No matching maps found.',
  },

  parameters: {
    docs: {
      description: {
        story: 'Open the select to preview its empty state.',
      },
    },
  },
};

export const WithFormField: Story = {
  render: (args) => (
    <FormField id="map" label="Map" description="Search by map name or alias.">
      {(controlProps) => <MapSearchableSelect {...args} {...controlProps} name="map_id" />}
    </FormField>
  ),

  parameters: {
    docs: {
      source: {
        code: `<FormField id="map" label="Map" description="Search by map name or alias.">
  {(controlProps) => (
    <SearchableSelect {...controlProps} name="map_id" {...searchableSelectProps} />
  )}
</FormField>`,
        language: 'tsx',
      },
    },
  },
};
