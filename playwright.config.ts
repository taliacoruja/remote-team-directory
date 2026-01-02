import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: 'e2e',
    use: {
        baseURL: 'http://localhost:4173/remote-team-directory/',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
    },
    webServer: {
        command: 'npm run preview',
        url: 'http://localhost:4173/remote-team-directory/',
        reuseExistingServer: true,
    },
});
