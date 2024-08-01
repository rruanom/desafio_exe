const request = require('supertest');
const express = require('express');
const app = express();
const staffController = require('../controllers/staff.controllers');
const staffRoutes = require('../routes/staff.routes');

// Configura tu aplicación Express para usar las rutas
app.use(express.json());
app.use('/api/staff', staffRoutes);

jest.mock('../models/staff.models');

const staffModels = require('../models/staff.models');

// Mock de los métodos del modelo
staffModels.createStaff = jest.fn();
staffModels.readStaff = jest.fn();
staffModels.readStaffByEmail = jest.fn();
staffModels.updateStaffByStaff = jest.fn();
staffModels.updateStaffByAdmin = jest.fn();

describe('Staff Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/staff/add', () => {
        it('should create a staff member successfully', async () => {
            staffModels.createStaff.mockResolvedValue(1);

            const response = await request(app)
                .post('/api/staff/add')
                .send({
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'password123'
                });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Miembro Staff creado exitosamente');
        });

        it('should return 500 if there is a server error', async () => {
            staffModels.createStaff.mockRejectedValue(new Error('Server error'));

            const response = await request(app)
                .post('/api/staff/add')
                .send({
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'password123'
                });

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Error al crear el miembro del Staff');
        });
    });

    describe('GET /api/staff', () => {
        it('should return a list of staff members', async () => {
            const mockStaff = [
                { id_staff: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' }
            ];
            staffModels.readStaff.mockResolvedValue(mockStaff);

            const response = await request(app).get('/api/staff');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockStaff);
        });

        it('should return 500 if there is a server error', async () => {
            staffModels.readStaff.mockRejectedValue(new Error('Server error'));

            const response = await request(app).get('/api/staff');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Error al obtener los miembros del personal');
        });
    });

    describe('GET /api/staff/:email', () => {
        it('should return a staff member by email', async () => {
            const mockStaff = { id_staff: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' };
            staffModels.readStaffByEmail.mockResolvedValue(mockStaff);

            const response = await request(app).get('/api/staff/john.doe@example.com');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockStaff);
        });

        it('should return 404 if staff member not found', async () => {
            staffModels.readStaffByEmail.mockResolvedValue(null);

            const response = await request(app).get('/api/staff/nonexistent@example.com');

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Miembro del personal no encontrado');
        });

        it('should return 500 if there is a server error', async () => {
            staffModels.readStaffByEmail.mockRejectedValue(new Error('Server error'));

            const response = await request(app).get('/api/staff/john.doe@example.com');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Error al obtener el miembro del personal');
        });
    });

    describe('PUT /api/staff', () => {
        it('should update staff member information', async () => {
            staffModels.updateStaffByStaff.mockResolvedValue(1);

            const response = await request(app)
                .put('/api/staff')
                .send({
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'newpassword123'
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Miembro del Staff actualizado exitosamente');
        });

        it('should return 404 if staff member not found', async () => {
            staffModels.updateStaffByStaff.mockResolvedValue(0);

            const response = await request(app)
                .put('/api/staff')
                .send({
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'newpassword123'
                });

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Miembro del Staff no encontrado');
        });

        it('should return 500 if there is a server error', async () => {
            staffModels.updateStaffByStaff.mockRejectedValue(new Error('Server error'));

            const response = await request(app)
                .put('/api/staff')
                .send({
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'newpassword123'
                });

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Error al actualizar el miembro del Staff');
        });
    });

    describe('PUT /api/staff/:email', () => {
        it('should update staff member by admin', async () => {
            staffModels.updateStaffByAdmin.mockResolvedValue(1);

            const response = await request(app)
                .put('/api/staff/john.doe@example.com')
                .send({
                    id_role: 2,
                    active: true
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Miembro del personal actualizado exitosamente por el administrador');
        });

        it('should return 404 if staff member not found', async () => {
            staffModels.updateStaffByAdmin.mockResolvedValue(0);

            const response = await request(app)
                .put('/api/staff/john.doe@example.com')
                .send({
                    id_role: 2,
                    active: true
                });

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Miembro del personal no encontrado o no actualizado');
        });

        it('should return 500 if there is a server error', async () => {
            staffModels.updateStaffByAdmin.mockRejectedValue(new Error('Server error'));

            const response = await request(app)
                .put('/api/staff/john.doe@example.com')
                .send({
                    id_role: 2,
                    active: true
                });

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Error al actualizar el miembro del personal por el administrador');
        });
    });
});
