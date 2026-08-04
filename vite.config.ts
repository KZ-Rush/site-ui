/// <reference types="vitest/config" />
// import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(),
  // tailwindcss(),
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
    ],
  })],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: [
        'moment',
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-toastify',
      ],
    },
    sourcemap: true,
    cssCodeSplit: false
  },
});