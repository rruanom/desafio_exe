const { body, param } = require('express-validator');

const validateCreateForm = [
    body('id_candidate')
        .exists().withMessage('El id del candidato es necesario')
        .isInt().withMessage('El id del candidato debe ser un número entero'),
    body('academic_degree')
        .exists().withMessage('El grado académico es necesario')
        .isString().withMessage('El grado académico debe ser una cadena de texto'),
    body('average_grade')
        .exists().withMessage('El promedio es necesario')
        .isFloat({ min: 0, max: 10 }).withMessage('El promedio debe ser un número entre 0 y 10'),
    body('languages')
        .exists().withMessage('Los idiomas son necesarios')
        .isString().withMessage('Los idiomas deben ser una cadena de texto'),
    body('experience')
        .exists().withMessage('La experiencia es necesaria')
        .isString().withMessage('La experiencia debe ser una cadena de texto'),
    body('about_you')
        .exists().withMessage('Sobre ti es necesario')
        .isString().withMessage('Sobre ti debe ser una cadena de texto')
];

const validateGetFormByEmail = [
    param('email')
        .exists().withMessage('El email es necesario')
        .isEmail().withMessage('Debe ser un email válido')
];

const validateDeleteForm = [
    param('id_form')
        .exists().withMessage('El id del formulario es necesario')
        .isInt().withMessage('El id del formulario debe ser un número entero')
];

module.exports = {
    validateCreateForm,
    validateGetFormByEmail,
    validateDeleteForm
};
