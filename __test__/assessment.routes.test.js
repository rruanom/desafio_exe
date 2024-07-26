const supertest = require('supertest');
const server = require('../index');
const pool = require('../config/db_mysql');
const request =supertest(server);

afterAll(async () => {
  await pool.end();
});

describe('Assessment Routes', () => {
  test('GET /api/assessments should return all assessments', async () => {
    const response = await request(app).get('/api/assessments');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id_assessment: 1, name_assessment: 'Evaluación 1' },
    ]);
  });

  test('POST /api/assessments/add should create an assessment', async () => {
    const response = await request(app)
      .post('/api/assessments/add')
      .send({ name_assessment: 'Evaluación Nueva' });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Evaluación creada exitosamente', id: expect.any(Number) });
  });

  test('DELETE /api/assessments/delete should delete an assessment', async () => {
    const response = await request(app)
      .delete('/api/assessments/delete')
      .send({ name_assessment: 'Evaluación a Eliminar' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Evaluación eliminada exitosamente' });
  });
});
