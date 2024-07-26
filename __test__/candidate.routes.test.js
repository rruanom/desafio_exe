const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const candidateRoutes = require('../routes/candidate.routes');
const { pool } = require('../config/db_mysql');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/candidate', candidateRoutes);

afterAll(async () => {
    await pool.end();
});

describe('Candidate Routes', () => {
    let testCandidateEmail;

    beforeAll(async () => {
        // Creación de un candidato para usar en las pruebas
        const response = await request(app)
            .post('/api/candidate/add')
            .send({
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe@example.com',
                password: 'securepassword',
                gender: 'male'
            });
        testCandidateEmail = 'john.doe@example.com';
        expect(response.status).toBe(201);
    });

    test('GET /api/candidate - debe devolver todos los candidatos', async () => {
        const response = await request(app).get('/api/candidate');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('GET /api/candidate/:email - debe devolver un candidato por correo electrónico', async () => {
        const response = await request(app).get(`/api/candidate/${testCandidateEmail}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('email', testCandidateEmail);
    });

    test('DELETE /api/candidate/:email - debe eliminar un candidato existente', async () => {
        const response = await request(app).delete(`/api/candidate/${testCandidateEmail}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Candidato eliminado exitosamente');

        const getResponse = await request(app).get(`/api/candidate/${testCandidateEmail}`);
        expect(getResponse.status).toBe(404);
        expect(getResponse.body).toHaveProperty('error', 'Candidato no encontrado');
    });

    test('DELETE /api/candidate/:email - debe responder con error si el candidato no existe', async () => {
        const response = await request(app).delete('/api/candidate/nonexistent@example.com');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Candidato no encontrado');
    });
});