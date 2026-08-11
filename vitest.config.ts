import { fileURLToPath } from 'node:url';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [react()],

        test: {
          name: 'unit',

          environment: 'jsdom',

          include: ['src/**/*.test.{ts,tsx}'],

          exclude: ['src/**/*.stories.{ts,tsx}', 'node_modules', 'dist', 'storybook-static'],

          setupFiles: ['./src/test/setup.ts'],
        },
      },

      {
        extends: true,

        plugins: [
          storybookTest({
            configDir: fileURLToPath(new URL('./.storybook', import.meta.url)),
          }),
        ],

        test: {
          name: 'storybook',

          browser: {
            enabled: true,
            provider: playwright({}),
            headless: true,
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },

          setupFiles: ['./.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
