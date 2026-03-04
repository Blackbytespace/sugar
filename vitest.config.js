import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const isCI = process.env.CI === 'true';
const isRun = process.argv.includes('run');

export default defineConfig({
  test: {
    globals: true,

    // Project-based configuration for different test types
    projects: [
      // Default: Unit tests with happy-dom (existing behavior)
      {
        test: {
          name: 'unit',
          globals: true,
          include: [
            'src/**/*.test.ts',
            '!src/**/*.browser.test.ts',
            '!src/node/fs/**/*.test.ts',
          ],
          environment: 'happy-dom',
        },
      },

      // Browser integration tests for JS modules
      {
        test: {
          name: 'browser',
          globals: true,
          include: ['src/**/*.browser.test.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: isCI || isRun, // Headless in CI or non-watch run mode

            // Multi-browser testing
            instances: [
              { browser: 'chromium', name: 'chrome' },
              { browser: 'firefox', name: 'firefox' },
              { browser: 'webkit', name: 'safari' },
            ],

            // Browser configuration
            viewport: { width: 1280, height: 720 },
            screenshotFailures: false,
            slowHijackESM: false, // Better performance
          },
        },
      },
    ],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      include: ['src/js/**/*.ts'],
      exclude: ['src/js/**/*.test.ts', 'src/js/**/*.browser.test.ts'],
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
  },
});
