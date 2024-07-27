const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

// Importa y utiliza las rutas del archivo de rutas
const formRoutes = require('../routes/form.routes');
app.use('/api/forms', formRoutes);

describe('Form Routes', () => {

        it('debería devolver un error si el formulario no se encuentra', async () => {
            // Mock de las validaciones
            jest.mock('express-validator', () => ({
                validationResult: jest.fn().mockReturnValue({
                    isEmpty: () => true,
                    array: () => []
                })
            }));

            // Mock del modelo
            jest.mock('../models/form.models', () => ({
                readFormByEmail: jest.fn().mockResolvedValue(null)
            }));

            const response = await request(app)
                .get('/api/forms/nonexistent@example.com');

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error', 'Formulario no encontrado');
        });
    });

        it('debería devolver un error si el formulario no se encuentra', async () => {
            // Mock de las validaciones
            jest.mock('express-validator', () => ({
                validationResult: jest.fn().mockReturnValue({
                    isEmpty: () => true,
                    array: () => []
                })
            }));

            // Mock del modelo
            jest.mock('../models/form.models', () => ({
                deleteForm: jest.fn().mockResolvedValue(0)
            }));

            const response = await request(app)
                .delete('/api/forms/1');

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error', 'Formulario no encontrado');
        });
