// __tests__/role.controllers.test.js

const request = require('supertest');
const express = require('express');
const app = express();
const roleController = require('../controllers/role.controllers');
const roleModels = require('../models/role.models');

// Configura el middleware para la aplicación
app.use(express.json());
app.use('/api/role', require('../routes/role.routes'));

// Mock de los modelos de rol
jest.mock('../models/role.models');

describe('Role Controller Tests', () => {
    // Test para createRole
    describe('POST /api/role/add', () => {
        it('should create a role successfully', async () => {
            roleModels.createRole.mockResolvedValue(1); // Simula el retorno de un ID de rol creado

            const response = await request(app)
                .post('/api/role/add')
                .send({ name_role: 'Admin' });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Rol creado exitosamente');
            expect(response.body.id).toBe(1);
        });
    });
    // Test para getAllRoles
    describe('GET /api/role', () => {
        it('should get all roles', async () => {
            const mockRoles = [{ id: 1, name_role: 'Admin' }];
            roleModels.readAllRoles.mockResolvedValue(mockRoles);

            const response = await request(app).get('/api/role');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockRoles);
        });
    });

    // Test para getRoleById
    describe('GET /api/role/:id_role', () => {
        it('should get a role by ID', async () => {
            const mockRole = { id: 1, name_role: 'Admin' };
            roleModels.readRoleById.mockResolvedValue(mockRole);

            const response = await request(app).get('/api/role/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockRole);
        });

        it('should return 404 if role is not found', async () => {
            roleModels.readRoleById.mockResolvedValue(null);

            const response = await request(app).get('/api/role/999');

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Rol no encontrado');
        });
    });

    // Test para updateRole
    describe('PUT /api/role/:id_role', () => {
        it('should update a role', async () => {
            roleModels.updateRole.mockResolvedValue(1); // Simula que una fila fue afectada

            const response = await request(app)
                .put('/api/role/1')
                .send({ name_role: 'SuperAdmin' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Rol actualizado exitosamente');
        });

        it('should return 404 if role to update is not found', async () => {
            roleModels.updateRole.mockResolvedValue(0); // Simula que ninguna fila fue afectada

            const response = await request(app)
                .put('/api/role/999')
                .send({ name_role: 'SuperAdmin' });

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Rol no encontrado');
        });
    });

    // Test para deleteRole
    describe('DELETE /api/role/:name_role', () => {
        it('should delete a role', async () => {
            roleModels.deleteRole.mockResolvedValue(1); // Simula que una fila fue afectada

            const response = await request(app).delete('/api/role/Admin');

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Rol eliminado exitosamente');
        });

        it('should return 404 if role to delete is not found', async () => {
            roleModels.deleteRole.mockResolvedValue(0); // Simula que ninguna fila fue afectada

            const response = await request(app).delete('/api/role/NonExistentRole');

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Rol no encontrado');
        });
    });
});
