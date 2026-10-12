import { defineConfig, devices } from "@playwright/test";

// Runs against the production build (`vite preview`), never the dev server:
// chunking, lazy routes and the prerendered pages only exist there.
// Set E2E_BASE_URL to test a build that is already being served.
const PORT = 4173;
const baseURL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: { baseURL, trace: "retain-on-failure" },
  projects: [
    // iPhone users reported the menu bugs; WebKit is the closest stand-in for iOS.
    { name: "iphone", use: { ...devices["iPhone 13"] } },
    { name: "iphone-se", use: { ...devices["iPhone SE"] } },
    { name: "android", use: { ...devices["Pixel 7"] } },
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `npm run build && npx vite preview --port ${PORT} --strictPort`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
