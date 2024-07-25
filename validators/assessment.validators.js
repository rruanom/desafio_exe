const { body } = require('express-validator');

const validateCreateAssessment = [
    body('name_assessment')
        .exists().withMessage('El nombre de la evaluación es requerido')
        .isString().withMessage('El nombre de la evaluación debe ser una cadena de texto')
        .notEmpty().withMessage('El nombre de la evaluación no puede estar vacío')
];

const validateDeleteAssessment = [
    body('name_assessment')
        .exists().withMessage('El nombre de la evaluación es requerido')
        .isString().withMessage('El nombre de la evaluación debe ser una cadena de texto')
        .notEmpty().withMessage('El nombre de la evaluación no puede estar vacío')
];

module.exports = {
    validateCreateAssessment,
    validateDeleteAssessment
};
