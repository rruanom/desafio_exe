const { body } = require('express-validator');

const validateCreateStatus = [
    body('name_status')
        .exists().withMessage('El nombre del estado es requerido')
        .isString().withMessage('El nombre del estado debe ser una cadena de texto')
        .notEmpty().withMessage('El nombre del estado no puede estar vacío')
];

const validateDeleteStatus = [
    body('name_status')
        .exists().withMessage('El nombre del estado es requerido')
        .isString().withMessage('El nombre del estado debe ser una cadena de texto')
        .notEmpty().withMessage('El nombre del estado no puede estar vacío')
];

module.exports = {
    validateCreateStatus,
    validateDeleteStatus
};
