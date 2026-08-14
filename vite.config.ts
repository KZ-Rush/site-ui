/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      entryRoot: 'src',
      tsconfigPath: './tsconfig.build.json',
      exclude: [
        'src/**/*.stories.ts',
        'src/**/*.stories.tsx',
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/**/*-story-icons.ts',
        'src/**/*-story-icons.tsx',
        'src/**/*.stories.scss',
        'src/test',
      ],
    }),
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['moment', 'react', 'react-dom', 'react/jsx-runtime', 'react-toastify'],
    },
    sourcemap: true,
    cssCodeSplit: false,
  },
});
