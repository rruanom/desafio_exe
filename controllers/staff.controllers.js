/**
 * @author RetoTripulaciones - Grupo2 <https://empiezaporeducar.org/> 
 * @exports controllers
 * @namespace Staff_Controllers
 */

const staffModels = require('../models/staff.models');
const { validationResult } = require('express-validator');

/**
 * @function createStaff
 * @memberof Staff_Controllers
 * @description Crea un nuevo miembro del personal. La función valida los datos de entrada y, si hay errores, responde con un estado HTTP 400 y los errores. Si los datos son válidos, intenta crear el miembro del personal utilizando `staffModels.createStaff`. Si la operación es exitosa, responde con un estado HTTP 201 y un mensaje de éxito. En caso de error, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene los datos del miembro del personal en `req.body`.
 * @param {Object} res - El objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y un mensaje de éxito o error.
 * @throws {Error} Si ocurre un error al crear el miembro del personal, se responde con un estado HTTP 500 y un mensaje de error.
 * @example
 * // Ejemplo de solicitud exitosa
 * // POST /staff
 * // Body: { "first_name": "John", "last_name": "Doe", "email": "john.doe@example.com", "password": "password123" }
 * // Respuesta: { "message": "Miembro Staff creado exitosamente" }
 * 
 * @example
 * // Ejemplo de solicitud con datos faltantes
 * // POST /staff
 * // Body: { "first_name": "John", "email": "john.doe@example.com", "password": "password123" }
 * // Respuesta: { "error": "Todos los campos son requeridos" }
 */
const createStaff = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const result = await staffModels.createStaff(first_name, last_name, email, password);
        if (result === 0) {
            return res.status(500).json({ error: 'Error al crear el miembro del personal' });
        }
        res.status(201).json({ message: 'Miembro Staff creado exitosamente'});
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el miembro del Staff' });
    }
};

/**
 * @function readStaff
 * @memberof Staff_Controllers
 * @description Obtiene todos los miembros del personal existentes. La función intenta recuperar la lista de miembros del personal utilizando `staffModels.readStaff`. Si la operación es exitosa, responde con un estado HTTP 200 y la lista de miembros del personal en formato JSON. En caso de error durante la recuperación, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y los datos solicitados o un mensaje de error.
 * @throws {Error} Si ocurre un error al obtener los miembros del personal, se responde con un estado HTTP 500 y un mensaje de error.
 * @example
 * // Ejemplo de solicitud exitosa
 * // GET /staff
 * // Respuesta: [{ "id_staff": 1, "first_name": "John", "last_name": "Doe", "email": "john.doe@example.com" }, ...]
 */
const readStaff = async (req, res) => {
    try {
        const staff = await staffModels.readStaff();
        if (!staff) {
            return res.status(404).json({ error: 'Miembros del personal no encontrados' });
        }
        res.status(200).json(staff);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los miembros del personal' });
    }
};

/**
 * @function readStaffByEmail
 * @memberof Staff_Controllers
 * @description Obtiene un miembro del personal específico por su email. La función valida los datos de entrada y, si hay errores, responde con un estado HTTP 400 y los errores. Si los datos son válidos, intenta recuperar el miembro del personal utilizando `staffModels.readStaffByEmail`. Si el miembro del personal no se encuentra, responde con un estado HTTP 404 y un mensaje de error. Si se encuentra, responde con un estado HTTP 200 y los datos del miembro del personal en formato JSON. En caso de error durante la recuperación, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene el email del miembro del personal en `req.params`.
 * @param {Object} res - El objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y los datos solicitados o un mensaje de error.
 * @throws {Error} Si ocurre un error al obtener el miembro del personal, se responde con un estado HTTP 500 y un mensaje de error.
 * @example
 * // Ejemplo de solicitud exitosa
 * // GET /staff/:email
 * // URL: /staff/john.doe@example.com
 * // Respuesta: { "id_staff": 1, "first_name": "John", "last_name": "Doe", "email": "john.doe@example.com" }
 * 
 * @example
 * // Ejemplo de miembro del personal no encontrado
 * // GET /staff/:email
 * // URL: /staff/nonexistent@example.com
 * // Respuesta: { "error": "Miembro del personal no encontrado" }
 */
const readStaffByEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.params;

    try {
        const staff = await staffModels.readStaffByEmail(email);
        if (!staff) {
            return res.status(404).json({ error: 'Miembro del personal no encontrado' });
        }
        res.status(200).json(staff);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el miembro del personal' });
    }
};

/**
 * @function updateStaffbyStaff
 * @memberof Staff_Controllers
 * @description Actualiza la información de un miembro del personal por el propio miembro del personal. La función valida los datos de entrada y, si hay errores, responde con un estado HTTP 400 y los errores. Si los datos son válidos, intenta actualizar el miembro del personal utilizando `staffModels.updateStaffByStaff`. Si el miembro del personal no se encuentra, responde con un estado HTTP 404 y un mensaje de error. Si la actualización es exitosa, responde con un estado HTTP 200 y un mensaje de éxito. En caso de error durante la actualización, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene los datos del miembro del personal en `req.body`.
 * @param {Object} res - El objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y un mensaje de éxito o error.
 * @throws {Error} Si ocurre un error al actualizar el miembro del personal, se responde con un estado HTTP 500 y un mensaje de error.
 * @example
 * // Ejemplo de solicitud exitosa
 * // PUT /staff
 * // Body: { "first_name": "John", "last_name": "Doe", "email": "john.doe@example.com", "password": "newpassword123" }
 * // Respuesta: { "message": "Miembro del Staff actualizado exitosamente" }
 * 
 * @example
 * // Ejemplo de solicitud con datos faltantes
 * // PUT /staff
 * // Body: { "email": "john.doe@example.com", "first_name": "John", "last_name": "Doe" }
 * // Respuesta: { "error": "Los campos son requeridos" }
 */
const updateStaffbyStaff = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, password } = req.body;

    if (!email || !first_name || !last_name || !password) {
        return res.status(400).json({ error: 'Los campos son requeridos' });
    }

    try {
        const result = await staffModels.updateStaffByStaff({ first_name, last_name, email, password });
        if (result === 0) {
            return res.status(404).json({ error: 'Miembro del Staff no encontrado' });
        }
        res.status(200).json({ message: 'Miembro del Staff actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el miembro del Staff' });
    }
};

/**
 * @function updateStaffbyAdmin
 * @memberof Staff_Controllers
 * @description Actualiza la información de un miembro del personal por un administrador. La función valida los datos de entrada y, si hay errores, responde con un estado HTTP 400 y los errores. Si los datos son válidos, intenta actualizar el miembro del personal utilizando `staffModels.updateStaffByAdmin`. Si el miembro del personal no se encuentra, responde con un estado HTTP 404 y un mensaje de error. Si la actualización es exitosa, responde con un estado HTTP 200 y un mensaje de éxito. En caso de error durante la actualización, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene el email del miembro del personal en `req.params` y los datos de actualización en `req.body`.
 * @param {Object} res - El objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y un mensaje de éxito o error.
 * @throws {Error} Si ocurre un error al actualizar el miembro del personal, se responde con un estado HTTP 500 y un mensaje de error.
 * @example
 * // Ejemplo de solicitud exitosa
 * // PUT /staff/:email
 * // URL: /staff/john.doe@example.com
 * // Body: { "id_role": 2, "active": true }
 * // Respuesta: { "message": "Miembro del personal actualizado exitosamente por el administrador" }
 * 
 * @example
 * // Ejemplo de miembro del personal no encontrado
 * // PUT /staff/:email
 * // URL: /staff/nonexistent@example.com
 * // Body: { "id_role": 2, "active": true }
 * // Respuesta: { "error": "Miembro del personal no encontrado o no actualizado" }
 */
const updateStaffbyAdmin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email } = req.params
    const { id_role, active } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'El email es requerido para la actualización' });
    }

    try {
        const result = await staffModels.updateStaffByAdmin({ id_role, active, email });
        if (result === 0) {
            return res.status(404).json({ error: 'Miembro del personal no encontrado o no actualizado' });
        }
        res.status(200).json({ message: 'Miembro del personal actualizado exitosamente por el administrador' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el miembro del personal por el administrador' });
    }
};

module.exports = {
    createStaff,
    readStaff,
    readStaffByEmail,
    updateStaffbyStaff,
    updateStaffbyAdmin
};

