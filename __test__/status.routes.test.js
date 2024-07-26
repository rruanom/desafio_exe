const request = require('supertest');
const express = require('express');
const app = express();
const statusRoutes = require('../routes/status.routes');
const statusModels = require('../models/status.models');

// Configura tu aplicación Express para usar las rutas
app.use(express.json());
app.use('/api/status', statusRoutes);

// Mock de los métodos del modelo
jest.mock('../models/status.models');

const { createStatus, readAllStatus, deleteStatus } = statusModels;

describe('Status Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/status', () => {
        it('should return all status', async () => {
            const mockStatuses = [
                { id_status: 1, name_status: 'Activo' },
                { id_status: 2, name_status: 'Inactivo' }
            ];
            readAllStatus.mockResolvedValue(mockStatuses);

            const response = await request(app).get('/api/status');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockStatuses);
        });

        it('should return 500 if there is a server error', async () => {
            readAllStatus.mockRejectedValue(new Error('Server error'));

            const response = await request(app).get('/api/status');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Error al obtener los estados');
        });
    });

    describe('POST /api/status/add', () => {
        it('should create a status successfully', async () => {
            createStatus.mockResolvedValue(1);

            const response = await request(app)
                .post('/api/status/add')
                .send({ name_status: 'Nuevo Estado' });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Estado creado exitosamente');
            expect(response.body.id).toBe(1);
        });

        it('should return 500 if there is a server error', async () => {
            createStatus.mockRejectedValue(new Error('Server error'));

            const response = await request(app)
                .post('/api/status/add')
                .send({ name_status: 'Nuevo Estado' });

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Error al crear el estado');
        });
    });

    describe('DELETE /api/status/delete', () => {
        it('should delete a status successfully', async () => {
            deleteStatus.mockResolvedValue(1);

            const response = await request(app)
                .delete('/api/status/delete')
                .send({ name_status: 'Estado a Eliminar' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Estado eliminado exitosamente');
        });

        it('should return 404 if the status does not exist', async () => {
            deleteStatus.mockResolvedValue(0);

            const response = await request(app)
                .delete('/api/status/delete')
                .send({ name_status: 'Estado Inexistente' });

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Estado no encontrado');
        });

        it('should return 500 if there is a server error', async () => {
            deleteStatus.mockRejectedValue(new Error('Server error'));

            const response = await request(app)
                .delete('/api/status/delete')
                .send({ name_status: 'Estado a Eliminar' });

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Error al eliminar el estado');
        });
    });
});
