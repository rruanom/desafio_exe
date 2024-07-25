const { body, param } = require('express-validator');

const validateCreateRole = [
    body('name_role')
        .exists().withMessage('El nombre del rol es requerido')
        .isString().withMessage('El nombre del rol debe ser una cadena de texto')
        .notEmpty().withMessage('El nombre del rol no puede estar vacío')
];

const validateGetRoleById = [
    param('id_role')
        .exists().withMessage('El ID del rol es requerido')
        .isInt().withMessage('El ID del rol debe ser un número entero')
];

const validateGetRoleByName = [
    param('name_role')
        .exists().withMessage('El nombre del rol es requerido')
        .isString().withMessage('El nombre del rol debe ser una cadena de texto')
        .notEmpty().withMessage('El nombre del rol no puede estar vacío')
];

const validateUpdateRole = [
    param('id_role')
        .exists().withMessage('El ID del rol es requerido')
        .isInt().withMessage('El ID del rol debe ser un número entero'),
    body('name_role')
        .exists().withMessage('El nombre del rol es requerido')
        .isString().withMessage('El nombre del rol debe ser una cadena de texto')
        .notEmpty().withMessage('El nombre del rol no puede estar vacío')
];

const validateDeleteRole = [
    param('name_role')
        .exists().withMessage('El nombre del rol es requerido')
        .isString().withMessage('El nombre del rol debe ser una cadena de texto')
        .notEmpty().withMessage('El nombre del rol no puede estar vacío')
];

module.exports = {
    validateCreateRole,
    validateGetRoleById,
    validateGetRoleByName,
    validateUpdateRole,
    validateDeleteRole
};
