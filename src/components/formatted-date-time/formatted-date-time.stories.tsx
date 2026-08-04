import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  FormattedDateTime,
} from './formatted-date-time';

const meta = {
  title: 'Components/FormattedDateTime',
  component: FormattedDateTime,

  tags: [
    'autodocs',
  ],

  parameters: {
    layout: 'centered',
  },

  args: {
    value: '2026-08-01T17:30:00+05:00',
    format: 'YYYY-MM-DD HH:mm',
    fallback: '?',
    utc: false,
    strict: false,
  },

  argTypes: {
    value: {
      control: 'text',
      description:
        'Date string or Unix timestamp in seconds.',
    },

    format: {
      control: 'text',
      description:
        'Moment format used for displayed content.',
    },

    fallback: {
      control: 'text',
      description:
        'Content displayed for missing or invalid values.',
    },

    utc: {
      control: 'boolean',
      description:
        'Display the value in UTC instead of local time.',
    },

    strict: {
      control: 'boolean',
      description:
        'Enable strict parsing when inputFormat is provided.',
    },

    inputFormat: {
      control: 'text',
      description:
        'Expected Moment format for input strings.',
    },
  },
} satisfies Meta<typeof FormattedDateTime>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ISODate: Story = {};

export const UnixTimestampNumber: Story = {
  args: {
    value: 1_754_050_200,
  },
};

export const UnixTimestampString: Story = {
  args: {
    value: '1754050200',
  },
};

export const DateOnly: Story = {
  args: {
    format: 'YYYY-MM-DD',
  },
};

export const UTC: Story = {
  args: {
    utc: true,
  },
};

export const CustomInputFormat: Story = {
  args: {
    value: '01.08.2026 17:30',
    inputFormat: 'DD.MM.YYYY HH:mm',
    strict: true,
  },
};

export const MissingValue: Story = {
  args: {
    value: null,
  },
};

export const ZeroValue: Story = {
  args: {
    value: 0,
  },
};

export const InvalidValue: Story = {
  args: {
    value: 'not-a-date',
  },
};

export const CustomFallback: Story = {
  args: {
    value: null,
    fallback: 'Not specified',
  },
};

export const NativeProperties: Story = {
  args: {
    title: 'Record creation date',
    className: 'example-date',
  },
};