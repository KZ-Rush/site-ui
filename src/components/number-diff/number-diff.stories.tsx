import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { NumberDiff } from './number-diff';

const meta = {
  title: 'Components/NumberDiff',
  component: NumberDiff,

  tags: [
    'autodocs',
  ],

  parameters: {
    layout: 'centered',
  },

  args: {
    value: 1_250,
    label: 'points',
    showPositiveSign: true,
  },

  argTypes: {
    value: {
      control: 'number',
      description:
        'Numeric difference to format and display.',
    },

    label: {
      control: 'text',
      description:
        'Optional content rendered after the value.',
    },

    locale: {
      control: 'text',
      description:
        'Locale passed to Intl.NumberFormat.',
    },

    formatOptions: {
      control: 'object',
      description:
        'Options passed to Intl.NumberFormat.',
    },

    fallback: {
      control: 'text',
      description:
        'Content rendered for NaN or infinite values.',
    },

    showPositiveSign: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof NumberDiff>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Positive: Story = {};

export const Negative: Story = {
  args: {
    value: -1_250,
  },
};

export const Neutral: Story = {
  args: {
    value: 0,
  },
};

export const WithoutLabel: Story = {
  args: {
    value: 42,
    label: undefined,
  },
};

export const WithoutPositiveSign: Story = {
  args: {
    value: 42,
    showPositiveSign: false,
  },
};

export const Decimal: Story = {
  args: {
    value: 12.3456,
    label: 'seconds',
    formatOptions: {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
};

export const GermanLocale: Story = {
  args: {
    value: 12_345.67,
    label: 'Punkte',
    locale: 'de-DE',
    formatOptions: {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
};

export const RussianLocale: Story = {
  args: {
    value: -12_345.67,
    label: 'очков',
    locale: 'ru-RU',
    formatOptions: {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
};

export const Percentage: Story = {
  args: {
    value: 0.125,
    label: undefined,
    formatOptions: {
      style: 'percent',
      maximumFractionDigits: 1,
    },
  },
};

export const Invalid: Story = {
  args: {
    value: Number.NaN,
    fallback: 'Unknown',
  },
};

export const Comparison: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        gap: '0.75rem 1.5rem',
      }}
    >
      <span>Player A</span>
      <span>1,250</span>
      <NumberDiff
        value={120}
        label="points"
        locale="en-US"
      />

      <span>Player B</span>
      <span>980</span>
      <NumberDiff
        value={-150}
        label="points"
        locale="en-US"
      />

      <span>Player C</span>
      <span>1,100</span>
      <NumberDiff
        value={0}
        label="points"
        locale="en-US"
      />
    </div>
  ),
};