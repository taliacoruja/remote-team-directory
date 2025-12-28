import express from 'express';
import { team } from './db';

export function createApiApp() {
    const app = express();

    app.get('/team', (_req, res) => {
        setTimeout(() => res.json(team), 250);
    });

    return app;
}
