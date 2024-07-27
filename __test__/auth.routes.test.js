const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/auth.routes');
const passport = require('passport');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('GET /api/auth/failure', () => {
    it('should redirect on failure', async () => {
        const response = await request(app)
            .get('/api/auth/failure');

        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/login');
    });
});