import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  Alert,
  AlertDescription,
  AlertList,
  AlertTitle,
} from './alert';

import {
  ErrorStoryIcon,
  InfoStoryIcon,
  NoticeStoryIcon,
  SuccessStoryIcon,
  WarningStoryIcon,
} from './alert-story-icons';

const meta = {
  title: 'Components/Alert',
  component: Alert,

  tags: [
    'autodocs',
  ],

  parameters: {
    layout: 'centered',
  },

  decorators: [
    (Story) => (
      <div style={{ width: '32rem' }}>
        <Story />
      </div>
    ),
  ],

  args: {
    variant: 'default',
  },

  argTypes: {
    variant: {
      control: 'select',

      options: [
        'default',
        'destructive',
        'warning',
        'info',
        'success',
        'notice',
      ],
    },

    icon: {
      control: false,
    },

    children: {
      control: false,
    },

    role: {
      control: 'select',

      options: [
        undefined,
        'alert',
        'status',
      ],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Alert
      {...args}
      icon={<InfoStoryIcon />}
    >
      <AlertTitle>
        Information
      </AlertTitle>

      <AlertDescription>
        Your profile settings were loaded.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },

  render: (args) => (
    <Alert
      {...args}
      icon={<ErrorStoryIcon />}
    >
      <AlertTitle>
        Something went wrong.
      </AlertTitle>

      <AlertDescription>
        <AlertList
          messages={[
            'The demo file is required.',
            'The selected map does not exist.',
          ]}
        />
      </AlertDescription>
    </Alert>
  ),
};

export const Warning: Story = {
  args: {
    variant: 'warning',
  },

  render: (args) => (
    <Alert
      {...args}
      icon={<WarningStoryIcon />}
    >
      <AlertTitle>
        Warning
      </AlertTitle>

      <AlertDescription>
        This action may recalculate the leaderboard.
      </AlertDescription>
    </Alert>
  ),
};

export const Info: Story = {
  args: {
    variant: 'info',
  },

  render: (args) => (
    <Alert
      {...args}
      icon={<InfoStoryIcon />}
    >
      <AlertTitle>
        Server information
      </AlertTitle>

      <AlertDescription>
        The game server will restart in five minutes.
      </AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  args: {
    variant: 'success',
  },

  render: (args) => (
    <Alert
      {...args}
      icon={<SuccessStoryIcon />}
    >
      <AlertTitle>
        Demo approved
      </AlertTitle>

      <AlertDescription>
        The record was added to the leaderboard.
      </AlertDescription>
    </Alert>
  ),
};

export const Notice: Story = {
  args: {
    variant: 'notice',
  },

  render: (args) => (
    <Alert
      {...args}
      icon={<NoticeStoryIcon />}
    >
      <AlertTitle>
        Notice
      </AlertTitle>

      <AlertDescription>
        A new version of the map is available.
      </AlertDescription>
    </Alert>
  ),
};

export const WithoutIcon: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>
        Plain alert
      </AlertTitle>

      <AlertDescription>
        Icons are optional and do not reserve empty space.
      </AlertDescription>
    </Alert>
  ),
};

export const DescriptionOnly: Story = {
  args: {
    variant: 'info',
  },

  render: (args) => (
    <Alert
      {...args}
      icon={<InfoStoryIcon />}
    >
      <AlertDescription>
        The server will restart in five minutes.
      </AlertDescription>
    </Alert>
  ),
};

export const TitleOnly: Story = {
  args: {
    variant: 'success',
  },

  render: (args) => (
    <Alert
      {...args}
      icon={<SuccessStoryIcon />}
    >
      <AlertTitle>
        Changes saved successfully.
      </AlertTitle>
    </Alert>
  ),
};

export const LongContent: Story = {
  args: {
    variant: 'warning',
  },

  render: (args) => (
    <Alert
      {...args}
      icon={<WarningStoryIcon />}
    >
      <AlertTitle>
        Leaderboard recalculation
      </AlertTitle>

      <AlertDescription>
        Recalculating player rankings may take several
        minutes. During this operation, recently approved
        records may temporarily display outdated positions.
      </AlertDescription>
    </Alert>
  ),
};

export const DuplicateMessages: Story = {
  args: {
    variant: 'destructive',
  },

  render: (args) => (
    <Alert
      {...args}
      icon={<ErrorStoryIcon />}
    >
      <AlertTitle>
        Validation failed
      </AlertTitle>

      <AlertDescription>
        <AlertList
          messages={[
            'The demo file is required.',
            'The map is required.',
            'The demo file is required.',
            ' ',
            '',
          ]}
        />
      </AlertDescription>
    </Alert>
  ),
};

export const RichDescription: Story = {
  args: {
    variant: 'notice',
  },

  render: (args) => (
    <Alert
      {...args}
      icon={<NoticeStoryIcon />}
    >
      <AlertTitle>
        Demo format
      </AlertTitle>

      <AlertDescription>
        <p>
          Upload a valid <code>.dem</code> file recorded
          with Counter-Strike 1.6.
        </p>

        <p>
          Compressed archives are not accepted.
        </p>
      </AlertDescription>
    </Alert>
  ),
};