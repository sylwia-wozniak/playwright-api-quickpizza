import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './playwright/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://quickpizza.grafana.com',
    trace: 'off',
  },

  projects: [
      {
          name: 'setup',
          testMatch: /.*\.setup\.ts/,
          fullyParallel: true,
          use: {
              extraHTTPHeaders: {
                  'Content-Type': 'application/json',
              },
          },
      },
      {
          name: 'api',
          dependencies: ["setup"],
          use: {
              extraHTTPHeaders: {
                  'Content-Type': 'application/json',
              },
          },
      },
  ],
});
