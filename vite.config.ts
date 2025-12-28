import { defineConfig } from 'vite';
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
    base: '/remote-team-directory/',
});
