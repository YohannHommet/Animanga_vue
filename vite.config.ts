/// <reference types="vitest" />

import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@components': fileURLToPath(
        new URL('./src/components', import.meta.url),
      ),
      '@tests': fileURLToPath(new URL('./tests', import.meta.url)),
    },
  },
  base: './',
  server: {
    port: 4000,
    open: true,
    cors: true,
  },
  test: {
    environment: 'jsdom',
    coverage: {
      include: ['src/**/*.{ts,vue}'],
      exclude: [
        'env.d.ts',
        'src/main.ts',
        'src/core/**/*.{ts,vue}',
        'src/shared/**/*.{ts,vue}',
      ],
      reporter: ['text-summary', 'html', 'json'],
      reportsDirectory: 'tests/coverage',
    },
  },
});
