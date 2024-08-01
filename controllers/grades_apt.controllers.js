/**
 * @author RetoTripulaciones - Grupo2 <https://empiezaporeducar.org/> 
 * @exports controllers
 * @namespace Grades_apt_Controllers
 */

const gradesModels = require('../models/grades_apt.models');
const { validationResult } = require('express-validator');

/**
 * @function createGrades
 * @memberof Grades_apt_Controllers
 * @description Crea una nueva entrada de notas para un candidato. La función valida los datos de entrada y, si hay errores, responde con un estado HTTP 400 y los errores. Si los datos son válidos, intenta crear las notas utilizando `gradesModels.createGrades`. Si la operación es exitosa, responde con un estado HTTP 201 y un mensaje de éxito. En caso de error, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene los datos del candidato en `req.body`.
 * @param {Object} res - El objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y un mensaje de éxito o error.
 * @throws {Error} Si ocurre un error al crear las notas, se responde con un estado HTTP 500 y un mensaje de error.
 * @example
 * // Ejemplo de solicitud exitosa
 * // POST /grades
 * // Body: { "id_candidate": 1, "professionality": 5, "domain": 4, "resilience": 3, "social_hab": 4, "leadership": 5, "collaboration": 4, "commitment": 5, "initiative": 4, "id_assessment": 2, "id_staff": 1, "feedback": "Excellent performance" }
 * // Respuesta: { "message": "Notas creadas exitosamente" }
 * 
 * @example
 * // Ejemplo de solicitud con campos faltantes
 * // POST /grades
 * // Body: { "id_candidate": 1, "feedback": "Excellent performance" }
 * // Respuesta: { "error": "Todos los campos son requeridos" }
 */
const createGrades = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const gradeData = req.body;

    if (!gradeData.id_candidate || !gradeData.professionality || !gradeData.domain || !gradeData.resilience || !gradeData.social_hab || !gradeData.leadership || !gradeData.collaboration || !gradeData.commitment || !gradeData.initiative || !gradeData.id_assessment || !gradeData.id_staff || !gradeData.feedback) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const result = await gradesModels.createGrades(gradeData);
        if (result === 0) {
            return res.status(500).json({ error: 'Error al crear las notas' });
        }
        res.status(201).json({ message: 'Notas creadas exitosamente'});
    } catch (err) {
        res.status(500).json({ error: 'Error al crear las notas' });
    }
};

/**
 * @function readGrades
 * @memberof Grades_apt_Controllers
 * @description Obtiene todas las notas de los candidatos. La función intenta recuperar las notas utilizando `gradesModels.readGrades`. Si no se encuentran notas, responde con un estado HTTP 404 y un mensaje de error. Si las notas se recuperan correctamente, responde con un estado HTTP 200 y las notas en formato JSON. En caso de error durante la recuperación, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y los datos solicitados o un mensaje de error.
 * @throws {Error} Si ocurre un error al obtener las notas, se responde con un estado HTTP 500 y un mensaje de error.
 * @example
 * // Ejemplo de solicitud exitosa
 * // GET /grades
 * // Respuesta: [{ "id_candidate": 1, "professionality": 5, ... }]
 * 
 * @example
 * // Ejemplo de notas no encontradas
 * // GET /grades
 * // Respuesta: { "error": "Candidatos no cuentan con notas" }
 */
const readGrades = async (req, res) => {
    try {
        const grades = await gradesModels.readGrades();
        if (!grades) {
            return res.status(404).json({ error: 'Candidatos no cuentan con notas' });
        }
        res.status(200).json(grades);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las notas de los candidatos' });
    }
};

/**
 * @function readGradesByEmail
 * @memberof Grades_apt_Controllers
 * @description Obtiene las notas de un candidato específico usando su correo electrónico. La función valida los datos de entrada y, si hay errores, responde con un estado HTTP 400 y los errores. Si los datos son válidos, intenta recuperar las notas utilizando `gradesModels.readGradesByEmail`. Si no se encuentran notas para el candidato, responde con un estado HTTP 404 y un mensaje de error. Si se encuentran las notas, responde con un estado HTTP 200 y las notas en formato JSON. En caso de error durante la recuperación, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene el correo electrónico del candidato en `req.params`.
 * @param {Object} res - El objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y los datos solicitados o un mensaje de error.
 * @throws {Error} Si ocurre un error al obtener las notas, se responde con un estado HTTP 500 y un mensaje de error.
 * @example
 * // Ejemplo de solicitud exitosa
 * // GET /grades/email/:email
 * // URL: /grades/email/example@example.com
 * // Respuesta: [{ "id_candidate": 1, "professionality": 5, ... }]
 * 
 * @example
 * // Ejemplo de candidato sin notas
 * // GET /grades/email/:email
 * // URL: /grades/email/nonexistent@example.com
 * // Respuesta: { "error": "Candidato no cuenta con notas" }
 */
const readGradesByEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.params;

    try {
        const grades = await gradesModels.readGradesByEmail(email);
        if (!grades) {
            return res.status(404).json({ error: 'Candidato no cuenta con notas' });
        }
        res.status(200).json(grades);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las notas del candidato' });
    }
};

/**
 * @function updateGradebyAdmin
 * @memberof Grades_apt_Controllers
 * @description Actualiza las notas de un candidato por un administrador. La función valida los datos de entrada y, si hay errores, responde con un estado HTTP 400 y los errores. Si los datos son válidos, intenta actualizar las notas utilizando `gradesModels.updateGradesByAdmin`. Si el candidato no se encuentra o las notas no se actualizan, responde con un estado HTTP 404 y un mensaje de error. Si la actualización es exitosa, responde con un estado HTTP 200 y un mensaje de éxito. En caso de error durante la actualización, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene los datos del candidato en `req.body`.
 * @param {Object} res - El objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y un mensaje de éxito o error.
 * @throws {Error} Si ocurre un error al actualizar las notas, se responde con un estado HTTP 500 y un mensaje de error.
 * @example
 * // Ejemplo de solicitud exitosa
 * // PUT /grades
 * // Body: { "id_candidate": 1, "professionality": 5, "domain": 4, "resilience": 3, "social_hab": 4, "leadership": 5, "collaboration": 4, "commitment": 5, "initiative": 4, "id_assessment": 2, "id_staff": 1, "feedback": "Updated feedback", "email": "example@example.com" }
 * // Respuesta: { "message": "Notas de candidato actualizadas correctamente" }
 * 
 * @example
 * // Ejemplo de solicitud con campos faltantes
 * // PUT /grades
 * // Body: { "id_candidate": 1, "feedback": "Updated feedback", "email": "example@example.com" }
 * // Respuesta: { "error": "Los campos son requeridos" }
 * 
 * @example
 * // Ejemplo de candidato no encontrado
 * // PUT /grades
 * // Body: { "id_candidate": 1, "professionality": 5, "domain": 4, "resilience": 3, "social_hab": 4, "leadership": 5, "collaboration": 4, "commitment": 5, "initiative": 4, "id_assessment": 2, "id_staff": 1, "feedback": "Updated feedback", "email": "nonexistent@example.com" }
 * // Respuesta: { "error": "Candidato no encontrado" }
 */
const updateGradebyAdmin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_candidate, professionality, domain, resilience, social_hab, leadership, collaboration, commitment, initiative, id_assessment, id_staff, feedback, email } = req.body;

    if ( !id_candidate || !professionality || !domain || !resilience || !social_hab || !leadership || !collaboration || !commitment || !initiative || !id_assessment || !id_staff || !feedback || !email) {
        return res.status(400).json({ error: 'Los campos son requeridos' });
    }

    try {
        const result = await gradesModels.updateGradesByAdmin({ id_candidate, professionality, domain, resilience, social_hab, leadership, collaboration, commitment, initiative, id_assessment, id_staff, feedback, email });
        if (result === 0) {
            return res.status(404).json({ error: 'Candidato no encontrado' });
        }
        res.status(200).json({ message: 'Notas de candidato actualizadas correctamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar las notas del candidato' });
    }
};

/**
 * @function deleteGrades
 * @memberof Grades_apt_Controllers
 * @description Elimina las notas de un candidato utilizando su correo electrónico. La función valida los datos de entrada y, si hay errores, responde con un estado HTTP 400 y los errores. Si los datos son válidos, intenta eliminar las notas utilizando `gradesModels.deleteGrades`. Si el candidato no se encuentra o las notas no se eliminan, responde con un estado HTTP 404 y un mensaje de error. Si la eliminación es exitosa, responde con un estado HTTP 200 y un mensaje de éxito. En caso de error durante la eliminación, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene el correo electrónico del candidato en `req.params`.
 * @param {Object} res - El objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y un mensaje de éxito o error.
 * @throws {Error} Si ocurre un error al eliminar las notas, se responde con un estado HTTP 500 y un mensaje de error.
 * @example
 * // Ejemplo de solicitud exitosa
 * // DELETE /grades/:email
 * // URL: /grades/example@example.com
 * // Respuesta: { "message": "Notas de candidato eliminadas exitosamente" }
 * 
 * @example
 * // Ejemplo de candidato no encontrado
 * // DELETE /grades/:email
 * // URL: /grades/nonexistent@example.com
 * // Respuesta: { "error": "Candidato no encontrado" }
 */
const deleteGrades = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email } = req.params;

    try {
        const grades = await gradesModels.deleteGrades(email);
        if (!grades) {
            return res.status(404).json({ error: 'Candidato no encontrado' });
        }
        res.status(200).json({ message: 'Notas de candidato eliminadas exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al borrar las notas el candidato' });
    }
};

module.exports = {
    createGrades,
    readGrades,
    readGradesByEmail,
    updateGradebyAdmin,
    deleteGrades
};

