// .storybook/preview.tsx

import type { Preview } from '@storybook/react-vite';

import { useEffect } from 'react';

// @ts-expect-error Storybook/Vite handles this side-effect stylesheet import.
import '../src/styles/index.scss';
// @ts-expect-error Storybook/Vite handles this side-effect stylesheet import.
import './preview.scss';

function ThemeDecorator(
  Story: React.ComponentType,
  context: {
    globals: {
      theme?: string;
    };
  },
) {
  const theme = context.globals.theme ?? 'light';

  useEffect(() => {
    document.documentElement.setAttribute('data-rush-theme', theme);

    return () => {
      document.documentElement.removeAttribute('data-rush-theme');
    };
  }, [theme]);

  return <Story />;
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Rush UI theme',
      defaultValue: 'dark',

      toolbar: {
        title: 'Theme',
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

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    backgrounds: {
      disable: true,
    },
    layout: 'fullscreen',
  },

  decorators: [ThemeDecorator],
};

export default preview;
