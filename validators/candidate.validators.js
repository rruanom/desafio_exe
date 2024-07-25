const { body, param } = require('express-validator');

const validateCreateCandidate = [
    body('first_name')
        .exists().withMessage('El nombre es requerido')
        .isString().withMessage('El nombre debe ser una cadena de texto')
        .notEmpty().withMessage('El nombre no puede estar vacío'),
    body('last_name')
        .exists().withMessage('El apellido es requerido')
        .isString().withMessage('El apellido debe ser una cadena de texto')
        .notEmpty().withMessage('El apellido no puede estar vacío'),
    body('email')
        .exists().withMessage('El correo electrónico es requerido')
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
    body('password')
        .exists().withMessage('La contraseña es requerida')
        .isString().withMessage('La contraseña debe ser una cadena de texto')
        .notEmpty().withMessage('La contraseña no puede estar vacía'),
    body('gender')
        .exists().withMessage('El género es requerido')
        .isString().withMessage('El género debe ser una cadena de texto')
        .notEmpty().withMessage('El género no puede estar vacío')
];

const validateReadCandidateByEmail = [
    param('email')
        .exists().withMessage('El correo electrónico es requerido')
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido')
];

const validateUpdateCandidateByCandidate = [
    body('first_name')
        .exists().withMessage('El nombre es requerido')
        .isString().withMessage('El nombre debe ser una cadena de texto')
        .notEmpty().withMessage('El nombre no puede estar vacío'),
    body('last_name')
        .exists().withMessage('El apellido es requerido')
        .isString().withMessage('El apellido debe ser una cadena de texto')
        .notEmpty().withMessage('El apellido no puede estar vacío'),
    body('gender')
        .exists().withMessage('El género es requerido')
        .isString().withMessage('El género debe ser una cadena de texto')
        .notEmpty().withMessage('El género no puede estar vacío'),
    body('email')
        .exists().withMessage('El correo electrónico es requerido')
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido')
];

const validateUpdateCandidateByAdmin = [
    param('email')
        .exists().withMessage('El correo electrónico es requerido')
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
    body('id_status')
        .optional()
        .isInt().withMessage('El ID de estado debe ser un número entero'),
    body('active')
        .optional()
        .isBoolean().withMessage('El estado activo debe ser un valor booleano')
];

const validateDeleteCandidate = [
    param('email')
        .exists().withMessage('El correo electrónico es requerido')
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido')
];

module.exports = {
    validateCreateCandidate,
    validateReadCandidateByEmail,
    validateUpdateCandidateByCandidate,
    validateUpdateCandidateByAdmin,
    validateDeleteCandidate
};
