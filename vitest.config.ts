import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
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
}))
