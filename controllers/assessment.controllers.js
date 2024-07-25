/**
 * @author RetoTripulaciones - Grupo2 <https://empiezaporeducar.org/> 
 * @exports controllers
 * @namespace Assessment_Controllers 
 */

const assessmentModels = require('../models/assessment.models');
const { validationResult } = require('express-validator');

/**
 * @function createAssessment
 * @memberof Assessment_Controllers
 * @description Crea una nueva evaluación en el sistema. Valida la solicitud para asegurarse de que el nombre de la evaluación esté presente. 
 * Si se produce un error durante la * creación de la evaluación, se maneja adecuadamente.
 * @async
 * @param {Object} req - El objeto de solicitud de Express, que contiene los datos de la solicitud y la validación.
 * @param {Object} res - El objeto de respuesta de Express, que se utiliza para enviar la respuesta al cliente.
 * 
 * @returns {void} No devuelve ningún valor. En su lugar, envía una respuesta al cliente con el estado HTTP y el mensaje correspondiente.
 * 
 * @throws {Error} Si ocurre un error durante la creación de la evaluación, se envía una respuesta con un estado HTTP 500.
 * 
 * @example
 * // Ejemplo de solicitud exitosa
 * // POST /api/assessments
 * // { "name_assessment": "Evaluación de Matemáticas" }
 * // Respuesta: { "message": "Evaluación creada exitosamente", "id": 123 }
 * 
 * @example
 * // Ejemplo de solicitud fallida por falta de nombre de evaluación
 * // POST /api/assessments
 * // {} // Sin el campo "name_assessment"
 * // Respuesta: { "error": "El nombre de la evaluación es requerido" }
 * 
 * @example
 * // Ejemplo de error del servidor
 * // POST /api/assessments
 * // { "name_assessment": "Evaluación de Historia" }
 * // Respuesta: { "error": "Error al crear la evaluación" }
 */
const createAssessment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { name_assessment } = req.body;

    if (!name_assessment) {
        return res.status(400).json({ error: 'El nombre de la evaluación es requerido' });
    }

    try {
        const insertId = await assessmentModels.createAssessment(name_assessment);
        res.status(201).json({ message: 'Evaluación creada exitosamente', id: insertId });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear la evaluación' });
    }
};

/**
 * @function getAllAssessment
 * @memberof Assessment_Controllers
 * @description Recupera todas las evaluaciones del sistema. La función solicita las evaluaciones desde el modelo `assessmentModels` y las envía al cliente. 
 * En caso de error durante la recuperación, se envía una respuesta con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express. Este objeto no se utiliza en esta función, pero debe ser incluido para cumplir con la firma de la función de middleware.
 * @param {Object} res - El objeto de respuesta de Express, utilizado para enviar la respuesta al cliente.
 * 
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP 200 y los datos de las evaluaciones o un mensaje de error en caso de fallo.
 * 
 * @throws {Error} Si ocurre un error durante la recuperación de las evaluaciones, se envía una respuesta con un estado HTTP 500 y un mensaje de error.
 * 
 * @example
 * // Ejemplo de respuesta exitosa
 * // GET /api/assessments
 * // Respuesta: [{ "id": 1, "name_assessment": "Primera Evaluacion" }, { "id": 2, "name_assessment": "Segunda Evaluacion" }]
 * 
 * @example
 * // Ejemplo de error del servidor
 * // GET /api/assessments
 * // Respuesta: { "error": "Error al obtener las evaluaciones" }
 */
const getAllAssessment = async (req, res) => {
    try {
        const assessments = await assessmentModels.getAllAssessment();
        res.status(200).json(assessments);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las evaluaciones' });
    }
};

/**
 * @function deleteAssessment
 * @memberof Assessment_Controllers
 * @description Elimina una evaluación del sistema basada en el nombre proporcionado. La función primero valida la solicitud para asegurar que no hay errores de validación. 
 * Luego, intenta eliminar la evaluación correspondiente utilizando el modelo `assessmentModels`. Si la evaluación no se encuentra, responde con un estado HTTP 404. 
 * Si la eliminación es exitosa, responde con un estado HTTP 200 y un mensaje de éxito. 
 * En caso de error durante el proceso de eliminación, se responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express, que contiene el nombre de la evaluación a eliminar y los resultados de la validación.
 * @param {Object} res - El objeto de respuesta de Express, utilizado para enviar la respuesta al cliente.
 * 
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y el mensaje correspondiente.
 * 
 * @throws {Error} Si ocurre un error durante la eliminación de la evaluación, se envía una respuesta con un estado HTTP 500 y un mensaje de error.
 * 
 * @example
 * // Ejemplo de solicitud exitosa
 * // DELETE /api/assessments
 * // { "name_assessment": "Evaluación de Matemáticas" }
 * // Respuesta: { "message": "Evaluación eliminada exitosamente" }
 * 
 * @example
 * // Ejemplo de solicitud fallida por falta de nombre de evaluación
 * // DELETE /api/assessments
 * // {} // Sin el campo "name_assessment"
 * // Respuesta: { "errors": [{ "msg": "El nombre de la evaluación es requerido", "param": "name_assessment", "location": "body" }] }
 * 
 * @example
 * // Ejemplo de evaluación no encontrada
 * // DELETE /api/assessments
 * // { "name_assessment": "Evaluación Inexistente" }
 * // Respuesta: { "error": "Evaluación no encontrada" }
 * 
 * @example
 * // Ejemplo de error del servidor
 * // DELETE /api/assessments
 * // { "name_assessment": "Evaluación de Historia" }
 * // Respuesta: { "error": "Error al eliminar la evaluación" }
 */
const deleteAssessment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { name_assessment } = req.body;

    try {
        const affectedRows = await assessmentModels.deleteAssessment(name_assessment);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Evaluación no encontrada' });
        }
        res.status(200).json({ message: 'Evaluación eliminada exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la evaluación' });
    }
};

module.exports = {
    createAssessment,
    getAllAssessment,
    deleteAssessment,
};