const { body, param } = require('express-validator');

const validateCreateGrades = [
    body('id_candidate')
        .exists().withMessage('El ID del candidato es requerido')
        .isInt().withMessage('El ID del candidato debe ser un número entero'),
    body('professionality')
        .exists().withMessage('La profesionalidad es requerida')
        .isInt().withMessage('La profesionalidad debe ser un número entero'),
    body('domain')
        .exists().withMessage('El dominio es requerido')
        .isInt().withMessage('El dominio debe ser un número entero'),
    body('resilience')
        .exists().withMessage('La resiliencia es requerida')
        .isInt().withMessage('La resiliencia debe ser un número entero'),
    body('social_hab')
        .exists().withMessage('La habilidad social es requerida')
        .isInt().withMessage('La habilidad social debe ser un número entero'),
    body('leadership')
        .exists().withMessage('El liderazgo es requerido')
        .isInt().withMessage('El liderazgo debe ser un número entero'),
    body('collaboration')
        .exists().withMessage('La colaboración es requerida')
        .isInt().withMessage('La colaboración debe ser un número entero'),
    body('commitment')
        .exists().withMessage('El compromiso es requerido')
        .isInt().withMessage('El compromiso debe ser un número entero'),
    body('initiative')
        .exists().withMessage('La iniciativa es requerida')
        .isInt().withMessage('La iniciativa debe ser un número entero'),
    body('id_assessment')
        .exists().withMessage('El ID de la evaluación es requerido')
        .isInt().withMessage('El ID de la evaluación debe ser un número entero'),
    body('id_staff')
        .exists().withMessage('El ID del personal es requerido')
        .isInt().withMessage('El ID del personal debe ser un número entero'),
    body('feedback')
        .exists().withMessage('El feedback es requerido')
        .isString().withMessage('El feedback debe ser una cadena de texto')
];

const validateReadGradesByEmail = [
    param('email')
        .exists().withMessage('El correo electrónico es requerido')
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido')
];

const validateUpdateGradeByAdmin = [
    body('id_candidate')
        .exists().withMessage('El ID del candidato es requerido')
        .isInt().withMessage('El ID del candidato debe ser un número entero'),
    body('professionality')
        .exists().withMessage('La profesionalidad es requerida')
        .isInt().withMessage('La profesionalidad debe ser un número entero'),
    body('domain')
        .exists().withMessage('El dominio es requerido')
        .isInt().withMessage('El dominio debe ser un número entero'),
    body('resilience')
        .exists().withMessage('La resiliencia es requerida')
        .isInt().withMessage('La resiliencia debe ser un número entero'),
    body('social_hab')
        .exists().withMessage('La habilidad social es requerida')
        .isInt().withMessage('La habilidad social debe ser un número entero'),
    body('leadership')
        .exists().withMessage('El liderazgo es requerido')
        .isInt().withMessage('El liderazgo debe ser un número entero'),
    body('collaboration')
        .exists().withMessage('La colaboración es requerida')
        .isInt().withMessage('La colaboración debe ser un número entero'),
    body('commitment')
        .exists().withMessage('El compromiso es requerido')
        .isInt().withMessage('El compromiso debe ser un número entero'),
    body('initiative')
        .exists().withMessage('La iniciativa es requerida')
        .isInt().withMessage('La iniciativa debe ser un número entero'),
    body('id_assessment')
        .exists().withMessage('El ID de la evaluación es requerido')
        .isInt().withMessage('El ID de la evaluación debe ser un número entero'),
    body('id_staff')
        .exists().withMessage('El ID del personal es requerido')
        .isInt().withMessage('El ID del personal debe ser un número entero'),
    body('feedback')
        .exists().withMessage('El feedback es requerido')
        .isString().withMessage('El feedback debe ser una cadena de texto'),
    body('email')
        .exists().withMessage('El correo electrónico es requerido')
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido')
];

const validateDeleteGrades = [
    param('email')
        .exists().withMessage('El correo electrónico es requerido')
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido')
];

module.exports = {
    validateCreateGrades,
    validateReadGradesByEmail,
    validateUpdateGradeByAdmin,
    validateDeleteGrades
};
