// tests/grades_apt/grades_apt.routes.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const gradesRoutes = require('../routes/grades_apt.routes');

const app = express();
app.use(bodyParser.json());
app.use('/api/grades', gradesRoutes);

describe('Grades API', () => {
  // Test para la creación de notas
  it('should create a new grade successfully', async () => {
    const response = await request(app)
      .post('/api/grades/add')
      .send({
        id_candidate: 1,
        professionality: 5,
        domain: 4,
        resilience: 3,
        social_hab: 4,
        leadership: 5,
        collaboration: 4,
        commitment: 5,
        initiative: 4,
        id_assessment: 2,
        id_staff: 1,
        feedback: 'Excellent performance'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Notas creadas exitosamente');
  });

  // Test para obtener todas las notas
  it('should get all grades', async () => {
    const response = await request(app).get('/api/grades');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
