/**
 * @author RetoTripulaciones - Grupo2 <https://empiezaporeducar.org/> 
 * @exports controllers
 * @namespace Role_Controllers
 */

const roleModels = require('../models/role.models');
const { validationResult } = require('express-validator');

/**
 * @function createRole
 * @memberof Role_Controllers
 * @description Crea un nuevo rol. La función valida los datos de entrada y, si hay errores, responde con un estado HTTP 400 y los errores. Si los datos son válidos, intenta crear el rol utilizando `roleModels.createRole`. Si la operación es exitosa, responde con un estado HTTP 201 y un mensaje de éxito, junto con el ID del rol creado. En caso de error, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene el nombre del rol en `req.body`.
 * @param {Object} res - El objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y un mensaje de éxito o error.
 * @throws {Error} Si ocurre un error al crear el rol, se responde con un estado HTTP 500 y un mensaje de error.
 * @example
 * // Ejemplo de solicitud exitosa
 * // POST /roles
 * // Body: { "name_role": "Admin" }
 * // Respuesta: { "message": "Rol creado exitosamente", "id": 1 }
 * 
 * @example
 * // Ejemplo de solicitud con nombre de rol faltante
 * // POST /roles
 * // Body: { }
 * // Respuesta: { "error": "El nombre del rol es requerido" }
 */
const createRole = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name_role } = req.body;

    if (!name_role) {
        return res.status(400).json({ error: 'El nombre del rol es requerido' });
    }

    try {
        const insertId = await roleModels.createRole(name_role);
        res.status(201).json({ message: 'Rol creado exitosamente', id: insertId });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el rol' });
    }
};

/**
 * @function getAllRoles
 * @memberof Role_Controllers
 * @description Obtiene todos los roles existentes. La función intenta recuperar los roles utilizando `roleModels.readAllRoles`. Si la operación es exitosa, responde con un estado HTTP 200 y los roles en formato JSON. En caso de error durante la recuperación, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y los datos solicitados o un mensaje de error.
 * @throws {Error} Si ocurre un error al obtener los roles, se responde con un estado HTTP 500 y un mensaje de error.
 * @example
 * // Ejemplo de solicitud exitosa
 * // GET /roles
 * // Respuesta: [{ "id_role": 1, "name_role": "Admin" }, { "id_role": 2, "name_role": "User" }]
 */
const getAllRoles = async (req, res) => {
    try {
        const roles = await roleModels.readAllRoles();
        res.status(200).json(roles);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los roles' });
    }
};

/**
 * @function getRoleById
 * @memberof Role_Controllers
 * @description Obtiene un rol específico por su ID. La función valida los datos de entrada y, si hay errores, responde con un estado HTTP 400 y los errores. Si los datos son válidos, intenta recuperar el rol utilizando `roleModels.readRoleById`. Si el rol no se encuentra, responde con un estado HTTP 404 y un mensaje de error. Si el rol se encuentra, responde con un estado HTTP 200 y el rol en formato JSON. En caso de error durante la recuperación, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene el ID del rol en `req.params`.
 * @param {Object} res - El objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y los datos solicitados o un mensaje de error.
 * @throws {Error} Si ocurre un error al obtener el rol, se responde con un estado HTTP 500 y un mensaje de error.
 * @example
 * // Ejemplo de solicitud exitosa
 * // GET /roles/:id_role
 * // URL: /roles/1
 * // Respuesta: { "id_role": 1, "name_role": "Admin" }
 * 
 * @example
 * // Ejemplo de rol no encontrado
 * // GET /roles/:id_role
 * // URL: /roles/999
 * // Respuesta: { "error": "Rol no encontrado" }
 */
const getRoleById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_role } = req.params;

    try {
        const role = await roleModels.readRoleById(id_role);
        if (!role) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.status(200).json(role);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el rol' });
    }
};

/**
 * @function getRoleByName
 * @memberof Role_Controllers
 * @description Obtiene un rol específico por su nombre. La función valida los datos de entrada y, si hay errores, responde con un estado HTTP 400 y los errores. Si los datos son válidos, intenta recuperar el rol utilizando `roleModels.readRoleByName`. Si el rol no se encuentra, responde con un estado HTTP 404 y un mensaje de error. Si el rol se encuentra, responde con un estado HTTP 200 y el rol en formato JSON. En caso de error durante la recuperación, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene el nombre del rol en `req.params`.
 * @param {Object} res - El objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y los datos solicitados o un mensaje de error.
 * @throws {Error} Si ocurre un error al obtener el rol, se responde con un estado HTTP 500 y un mensaje de error.
 * @example
 * // Ejemplo de solicitud exitosa
 * // GET /roles/name/:name_role
 * // URL: /roles/name/Admin
 * // Respuesta: { "id_role": 1, "name_role": "Admin" }
 * 
 * @example
 * // Ejemplo de rol no encontrado
 * // GET /roles/name/:name_role
 * // URL: /roles/name/NonexistentRole
 * // Respuesta: { "error": "Rol no encontrado" }
 */
const getRoleByName = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name_role } = req.params;

    try {
        const role = await roleModels.readRoleByName(name_role);
        if (!role) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.status(200).json(role);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el rol' });
    }
};

/**
 * @function updateRole
 * @memberof Role_Controllers
 * @description Actualiza un rol existente por su ID. La función valida los datos de entrada y, si hay errores, responde con un estado HTTP 400 y los errores. Si los datos son válidos, intenta actualizar el rol utilizando `roleModels.updateRole`. Si el rol no se encuentra, responde con un estado HTTP 404 y un mensaje de error. Si la actualización es exitosa, responde con un estado HTTP 200 y un mensaje de éxito. En caso de error durante la actualización, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene el ID del rol en `req.params` y el nombre del rol en `req.body`.
 * @param {Object} res - El objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y un mensaje de éxito o error.
 * @throws {Error} Si ocurre un error al actualizar el rol, se responde con un estado HTTP 500 y un mensaje de error.
 * @example
 * // Ejemplo de solicitud exitosa
 * // PUT /roles/:id_role
 * // URL: /roles/1
 * // Body: { "name_role": "SuperAdmin" }
 * // Respuesta: { "message": "Rol actualizado exitosamente" }
 * 
 * @example
 * // Ejemplo de rol no encontrado
 * // PUT /roles/:id_role
 * // URL: /roles/999
 * // Body: { "name_role": "SuperAdmin" }
 * // Respuesta: { "error": "Rol no encontrado" }
 */
const updateRole = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_role } = req.params;
    const { name_role } = req.body;

    if (!name_role) {
        return res.status(400).json({ error: 'El nombre del rol es requerido' });
    }

    try {
        const affectedRows = await roleModels.updateRole(id_role, name_role);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.status(200).json({ message: 'Rol actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el rol' });
    }
};

/**
 * @function deleteRole
 * @memberof Role_Controllers
 * @description Elimina un rol existente por su nombre. La función valida los datos de entrada y, si hay errores, responde con un estado HTTP 400 y los errores. Si los datos son válidos, intenta eliminar el rol utilizando `roleModels.deleteRole`. Si el rol no se encuentra, responde con un estado HTTP 404 y un mensaje de error. Si la eliminación es exitosa, responde con un estado HTTP 200 y un mensaje de éxito. En caso de error durante la eliminación, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene el nombre del rol en `req.params`.
 * @param {Object} res - El objeto de respuesta de Express utilizado para enviar la respuesta al cliente.
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y un mensaje de éxito o error.
 * @throws {Error} Si ocurre un error al eliminar el rol, se responde con un estado HTTP 500 y un mensaje de error.
 * @example
 * // Ejemplo de solicitud exitosa
 * // DELETE /roles/:name_role
 * // URL: /roles/Admin
 * // Respuesta: { "message": "Rol eliminado exitosamente" }
 * 
 * @example
 * // Ejemplo de rol no encontrado
 * // DELETE /roles/:name_role
 * // URL: /roles/NonexistentRole
 * // Respuesta: { "error": "Rol no encontrado" }
 */
const deleteRole = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name_role } = req.params;
    console.log(req.params)

    try {
        const affectedRows = await roleModels.deleteRole(name_role);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.status(200).json({ message: 'Rol eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el rol' });
    }
};

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    getRoleByName,
    updateRole,
    deleteRole,
};
