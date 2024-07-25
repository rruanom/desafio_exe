const { body, param } = require('express-validator');

const validateCreateStaff = [
    body('first_name')
        .exists().withMessage('El nombre es requerido')
        .isString().withMessage('El nombre debe ser una cadena de texto')
        .notEmpty().withMessage('El nombre no puede estar vacío'),
    body('last_name')
        .exists().withMessage('El apellido es requerido')
        .isString().withMessage('El apellido debe ser una cadena de texto')
        .notEmpty().withMessage('El apellido no puede estar vacío'),
    body('email')
        .exists().withMessage('El email es requerido')
        .isEmail().withMessage('El email debe ser un email válido'),
    body('password')
        .exists().withMessage('La contraseña es requerida')
        .isString().withMessage('La contraseña debe ser una cadena de texto')
        .notEmpty().withMessage('La contraseña no puede estar vacía')
];

const validateReadStaffByEmail = [
    param('email')
        .exists().withMessage('El email es requerido')
        .isEmail().withMessage('El email debe ser un email válido')
];

const validateUpdateStaffByStaff = [
    body('first_name')
        .exists().withMessage('El nombre es requerido')
        .isString().withMessage('El nombre debe ser una cadena de texto')
        .notEmpty().withMessage('El nombre no puede estar vacío'),
    body('last_name')
        .exists().withMessage('El apellido es requerido')
        .isString().withMessage('El apellido debe ser una cadena de texto')
        .notEmpty().withMessage('El apellido no puede estar vacío'),
    body('email')
        .exists().withMessage('El email es requerido')
        .isEmail().withMessage('El email debe ser un email válido'),
    body('password')
        .exists().withMessage('La contraseña es requerida')
        .isString().withMessage('La contraseña debe ser una cadena de texto')
        .notEmpty().withMessage('La contraseña no puede estar vacía')
];

const validateUpdateStaffByAdmin = [
    param('email')
        .exists().withMessage('El email es requerido para la actualización')
        .isEmail().withMessage('El email debe ser un email válido'),
    body('id_role')
        .optional()
        .isInt().withMessage('El ID del rol debe ser un número entero'),
    body('active')
        .optional()
        .isBoolean().withMessage('El estado activo debe ser un valor booleano')
];

module.exports = {
    validateCreateStaff,
    validateReadStaffByEmail,
    validateUpdateStaffByStaff,
    validateUpdateStaffByAdmin
};
