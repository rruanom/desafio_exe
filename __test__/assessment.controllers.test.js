const assessmentControllers = require('../controllers/assessment.controllers');
const assessmentModels = require('../models/assessment.models');
const { validationResult } = require('express-validator');

jest.mock('../models/assessment.models');

describe('Assessment Controllers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('createAssessment should create a new assessment', async () => {
        const req = {
            body: { name_assessment: 'Evaluación de Prueba' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        assessmentModels.createAssessment.mockResolvedValue(1);

        await assessmentControllers.createAssessment(req, res);
        
        expect(assessmentModels.createAssessment).toHaveBeenCalledWith('Evaluación de Prueba');
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Evaluación creada exitosamente', id: 1 });
    });

    test('getAllAssessment should return all assessments', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        assessmentModels.getAllAssessment.mockResolvedValue([{ id: 1, name_assessment: 'Evaluación 1' }]);

        await assessmentControllers.getAllAssessment(req, res);
        
        expect(assessmentModels.getAllAssessment).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, name_assessment: 'Evaluación 1' }]);
    });

    test('deleteAssessment should delete an assessment', async () => {
        const req = {
            body: { name_assessment: 'Evaluación de Prueba' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        assessmentModels.deleteAssessment.mockResolvedValue(1);

        await assessmentControllers.deleteAssessment(req, res);
        
        expect(assessmentModels.deleteAssessment).toHaveBeenCalledWith('Evaluación de Prueba');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Evaluación eliminada exitosamente' });
    });
});