import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { createApiApp } from './src/server/routes';

function apiPlugin(): Plugin {
    return {
        name: 'local-api',
        configureServer(server) {
            server.middlewares.use('/api', createApiApp());
        },
    };
}

export default defineConfig({
    plugins: [react(), apiPlugin()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: 'src/shared/lib/__tests__/setup.ts',
        css: false,
        exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
    },
    base: '/remote-team-directory/',
});
