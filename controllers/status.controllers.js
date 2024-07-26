/**
 * @author RetoTripulaciones - Grupo2 <https://empiezaporeducar.org/> 
 * @exports controllers
 * @namespace Status_Controllers
 */

const statusModels = require('../models/status.models');
const { validationResult } = require('express-validator');

/**
 * @function createStatus
 * @memberof Status_Controllers
 * @description Crea un nuevo estado. La función valida los datos de entrada y, si hay errores, responde con un estado HTTP 400 y los errores. Si los datos son válidos, intenta crear el estado utilizando `statusModels.createStatus`. Si la operación es exitosa, responde con un estado HTTP 201 y un mensaje de éxito junto con el ID del nuevo estado. En caso de error, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene el nombre del estado en `req.body`.
 * @param {Object} res - El objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y un mensaje de éxito o error.
 * @throws {Error} Si ocurre un error al crear el estado, se responde con un estado HTTP 500 y un mensaje de error.
 * @example
 * // Ejemplo de solicitud exitosa
 * // POST /status
 * // Body: { "name_status": "Activo" }
 * // Respuesta: { "message": "Estado creado exitosamente", "id": 1 }
 * 
 * @example
 * // Ejemplo de solicitud con datos faltantes
 * // POST /status
 * // Body: { }
 * // Respuesta: { "error": "El nombre del estado es requerido" }
 */
const createStatus = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name_status } = req.body;

    if (!name_status) {
        return res.status(400).json({ error: 'El nombre del estado es requerido' });
    }

    try {
        const insertId = await statusModels.createStatus(name_status);
        res.status(201).json({ message: 'Estado creado exitosamente', id: insertId });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el estado' });
    }
};

/**
 * @function getAllStatus
 * @memberof Status_Controllers
 * @description Obtiene todos los estados existentes. La función intenta recuperar la lista de estados utilizando `statusModels.readAllStatus`. Si la operación es exitosa, responde con un estado HTTP 200 y la lista de estados en formato JSON. En caso de error durante la recuperación, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y los datos solicitados o un mensaje de error.
 * @throws {Error} Si ocurre un error al obtener los estados, se responde con un estado HTTP 500 y un mensaje de error.
 * @example
 * // Ejemplo de solicitud exitosa
 * // GET /status
 * // Respuesta: [{ "id_status": 1, "name_status": "Activo" }, ...]
 */
const getAllStatus = async (req, res) => {
    try {
        const allStatus = await statusModels.readAllStatus();
        res.status(200).json(allStatus);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los estados' });
    }
};

/**
 * @function deleteStatus
 * @memberof Status_Controllers
 * @description Elimina un estado específico. La función valida los datos de entrada y, si hay errores, responde con un estado HTTP 400 y los errores. Si los datos son válidos, intenta eliminar el estado utilizando `statusModels.deleteStatus`. Si el estado no se encuentra, responde con un estado HTTP 404 y un mensaje de error. Si la eliminación es exitosa, responde con un estado HTTP 200 y un mensaje de éxito. En caso de error durante la eliminación, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene el nombre del estado en `req.body`.
 * @param {Object} res - El objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y un mensaje de éxito o error.
 * @throws {Error} Si ocurre un error al eliminar el estado, se responde con un estado HTTP 500 y un mensaje de error.
 * @example
 * // Ejemplo de solicitud exitosa
 * // DELETE /status
 * // Body: { "name_status": "Inactivo" }
 * // Respuesta: { "message": "Estado eliminado exitosamente" }
 * 
 * @example
 * // Ejemplo de solicitud con estado no encontrado
 * // DELETE /status
 * // Body: { "name_status": "No Existente" }
 * // Respuesta: { "error": "Estado no encontrado" }
 */
const deleteStatus = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { name_status } = req.body;

    try {
        const affectedRows = await statusModels.deleteStatus(name_status);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Estado no encontrado' });
        }
        res.status(200).json({ message: 'Estado eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el estado' });
    }
};

module.exports = {
    createStatus,
    getAllStatus,
    deleteStatus,
};

