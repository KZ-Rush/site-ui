// .storybook/preview.tsx

import type {
  Preview,
} from '@storybook/react-vite';

// @ts-expect-error Storybook/Vite handles this side-effect stylesheet import.
import '../src/styles/index.scss';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Rush UI theme',
      defaultValue: 'light',

      toolbar: {
        icon: 'circlehollow',

        items: [
          {
            value: 'light',
            title: 'Light',
          },
          {
            value: 'dark',
            title: 'Dark',
          },
        ],
      },
    },
  },

  decorators: [
    (
      Story,
      context,
    ) => (
      <div
        className={
          context.globals.theme === 'dark'
            ? 'dark'
            : undefined
        }
        style={{
          padding: '2rem',

          background:
            'var(--rush-color-background)',

          color:
            'var(--rush-color-foreground)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;