const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

// Importa y utiliza las rutas del archivo de rutas
const formRoutes = require('../routes/form.routes');
app.use('/api/forms', formRoutes);

describe('Form Routes', () => {

    describe('POST /api/forms/add', () => {
        it('debería crear un formulario con éxito', async () => {
            // Mock de las validaciones
            jest.mock('express-validator', () => ({
                validationResult: jest.fn().mockReturnValue({
                    isEmpty: () => true,
                    array: () => []
                })
            }));
        
            // Mock del modelo
            jest.mock('../models/form.models', () => ({
                createForm: jest.fn().mockResolvedValue(14) // Ajusta aquí el valor de retorno según sea necesario
            }));
        
            const response = await request(app)
                .post('/api/forms/add')
                .send({
                    id_candidate: 123,
                    academic_degree: 'Bachelor',
                    average_grade: '9.0',
                    languages: 'English, Spanish',
                    experience: '2 years',
                    about_you: 'Passionate developer'
                });
        
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('message', 'Formulario creado');
            expect(response.body).toHaveProperty('id', 23);
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
