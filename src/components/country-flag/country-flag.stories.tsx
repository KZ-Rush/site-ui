import type { Meta, StoryObj } from '@storybook/react-vite';

import { Description } from '../description';

import { CountryFlag } from './country-flag';
import { COUNTRY_FLAG_CODES } from './country-flag-data';

const meta = {
  title: 'Components/CountryFlag',
  component: CountryFlag,

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },

  args: {
    code: 'kz',
    fallback: 'unknown',
  },

  argTypes: {
    code: {
      control: 'text',
    },

    label: {
      control: 'text',
    },

    fallback: {
      control: 'radio',
      options: ['unknown', 'none'],
    },
  },
} satisfies Meta<typeof CountryFlag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAccessibleLabel: Story = {
  args: {
    code: 'ca',
    label: 'Canada',
  },
};

export const Unknown: Story = {
  args: {
    code: 'not-supported',
    label: 'Unknown country',
  },
};

export const InText: Story = {
  render: () => (
    <Description>
      <CountryFlag code="kz" /> Kazakhstan
    </Description>
  ),
};

export const CommonCountries: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {['kz', 'ru', 'ua', 'de', 'gb', 'us', 'ca'].map((code) => (
        <span key={code} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
          <CountryFlag code={code} />
          {code.toUpperCase()}
        </span>
      ))}
    </div>
  ),
};

export const AllSupported: Story = {
  parameters: {
    layout: 'padded',
  },

  render: () => (
    <ul
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(7rem, 1fr))',
        gap: '0.5rem 1rem',
        padding: 0,
        margin: 0,
        listStyle: 'none',
      }}
    >
      {COUNTRY_FLAG_CODES.map((code) => (
        <li
          key={code}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            minHeight: '1.5rem',
          }}
        >
          <CountryFlag code={code} />
          <code>{code}</code>
        </li>
      ))}
    </ul>
  ),
};
