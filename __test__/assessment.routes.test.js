const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const assessmentRoutes = require('../routes/assessment.routes');
const { pool } = require('../config/db_mysql');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/assessment', assessmentRoutes);

afterAll(async () => {
    await pool.end();
});

describe('Assessment Routes', () => {
    test('GET /api/assessment - debe devolver todas las evaluaciones', async () => {
        const response = await request(app).get('/api/assessment');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('DELETE /api/assessment/delete - debe eliminar una evaluación existente', async () => {
        const postResponse = await request(app)
            .post('/api/assessment/add')
            .send({ name_assessment: 'Evaluación para Eliminar' });
        const idToDelete = postResponse.body.id;

        const deleteResponse = await request(app)
            .delete('/api/assessment/delete')
            .send({ name_assessment: 'Evaluación para Eliminar' });
        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body).toHaveProperty('message', 'Evaluación eliminada exitosamente');

        const getResponse = await request(app).get('/api/assessment');
        const assessments = getResponse.body;
        const deletedAssessment = assessments.find(a => a.id === idToDelete);
        expect(deletedAssessment).toBeUndefined();
    });

    test('DELETE /api/assessment/delete - debe responder con error si la evaluación no existe', async () => {
        const response = await request(app)
            .delete('/api/assessment/delete')
            .send({ name_assessment: 'Evaluación Inexistente' });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Evaluación no encontrada');
    });
});
