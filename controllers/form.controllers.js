/**
 * @author RetoTripulaciones - Grupo2 <https://empiezaporeducar.org/> 
 * @exports controllers
 * @namespace Form_Controllers
 */

const formModel = require('../models/form.models');
const { validationResult } = require('express-validator');

/**
 * @function createForm
 * @memberof Form_Controllers
 * @description Crea un nuevo formulario en el sistema utilizando los datos proporcionados. La función valida los datos de la solicitud utilizando `express-validator`. Si hay errores de validación, responde con un estado HTTP 400 y los errores correspondientes. Luego, valida que todos los campos requeridos estén presentes en `req.body`. Si algún campo falta, responde con un estado HTTP 400 y un mensaje de error. Si todos los datos son válidos, intenta crear el formulario utilizando el modelo `formModel` y guarda los datos en la base de datos. Si la creación es exitosa, responde con un estado HTTP 201 y un mensaje de éxito junto con el ID del formulario creado. En caso de error durante la operación, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene los datos del formulario en `req.body`.
 * @param {Object} res - El objeto de respuesta de Express, utilizado para enviar la respuesta al cliente.
 * 
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y un mensaje de éxito o error.
 * 
 * @throws {Error} Si ocurre un error al crear el formulario, se responde con un estado HTTP 500 y un mensaje de error.
 * 
 * @example
 * // Ejemplo de solicitud exitosa
 * // POST /forms/create
 * // Request Body: { "id_candidate": 1, "academic_degree": "Bachelor", "average_grade": 9.0, "languages": ["English", "Spanish"], "experience": "2 years in marketing", "about_you": "A passionate marketer with a flair for creativity." }
 * // Respuesta: { "message": "Formulario creado", "id": 123 }
 * 
 * @example
 * // Ejemplo de solicitud con errores de validación
 * // POST /forms/create
 * // Request Body: { "id_candidate": 1, "academic_degree": "Bachelor", "average_grade": 9.0, "languages": [], "experience": "2 years in marketing", "about_you": "A passionate marketer with a flair for creativity." }
 * // Respuesta: { "errors": [{ "msg": "Languages is required", "param": "languages", "location": "body" }] }
 * 
 * @example
 * // Ejemplo de solicitud con campos faltantes
 * // POST /forms/create
 * // Request Body: { "id_candidate": 1, "academic_degree": "Bachelor" }
 * // Respuesta: { "error": "Todos los campos son necesarios" }
 * 
 * @example
 * // Ejemplo de error en la solicitud
 * // POST /forms/create
 * // Request Body: { "id_candidate": 1, "academic_degree": "Bachelor", "average_grade": 9.0, "languages": ["English"], "experience": "2 years in marketing", "about_you": "A passionate marketer with a flair for creativity." }
 * // Respuesta: { "error": "Error al crear el formulario" }
 */
const createForm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_candidate, academic_degree, average_grade, languages, experience, about_you } = req.body;

    if (!id_candidate || !academic_degree || !average_grade || !languages || !experience || !about_you) {
        return res.status(400).json({ error: 'Todos los campos son necesarios' });
    }

    try {
        const insertId = await formModel.createForm({ id_candidate, academic_degree, average_grade, languages, experience, about_you });
        res.status(201).json({ message: 'Formulario creado', id: insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el formulario' });
    }
};

/**
 * @function getFormByEmail
 * @memberof Form_Controllers
 * @description Obtiene un formulario del sistema utilizando el correo electrónico del candidato. La función primero valida los datos de la solicitud utilizando `express-validator`. Si hay errores de validación, responde con un estado HTTP 400 y los errores correspondientes. Luego, valida que el correo electrónico esté presente en `req.params`. Si el correo electrónico está ausente, responde con un estado HTTP 400 y un mensaje de error. Si el correo electrónico está presente, intenta obtener el formulario asociado al correo electrónico utilizando el modelo `formModel`. Si el formulario no se encuentra, responde con un estado HTTP 404 y un mensaje de error. Si el formulario se encuentra, responde con un estado HTTP 200 y los datos del formulario. En caso de error durante la operación, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene el correo electrónico en `req.params`.
 * @param {Object} res - El objeto de respuesta de Express, utilizado para enviar la respuesta al cliente.
 * 
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y los datos del formulario o un mensaje de error.
 * 
 * @throws {Error} Si ocurre un error al obtener el formulario, se responde con un estado HTTP 500 y un mensaje de error.
 * 
 * @example
 * // Ejemplo de solicitud exitosa
 * // GET /forms/email/:email
 * // URL: /forms/email/jane.doe@example.com
 * // Respuesta: { "id_candidate": 1, "academic_degree": "Bachelor", "average_grade": 9.0, "languages": ["English", "Spanish"], "experience": "2 years in marketing", "about_you": "A passionate marketer with a flair for creativity." }
 * 
 * @example
 * // Ejemplo de solicitud con errores de validación
 * // GET /forms/email/:email
 * // URL: /forms/email/
 * // Respuesta: { "errors": [{ "msg": "Email is required", "param": "email", "location": "params" }] }
 * 
 * @example
 * // Ejemplo de formulario no encontrado
 * // GET /forms/email/:email
 * // URL: /forms/email/unknown@example.com
 * // Respuesta: { "error": "Formulario no encontrado" }
 * 
 * @example
 * // Ejemplo de error en la solicitud
 * // GET /forms/email/:email
 * // URL: /forms/email/jane.doe@example.com
 * // Respuesta: { "error": "Error al obtener el formulario" }
 */
const getFormByEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.params;

    try {
        const form = await formModel.readFormByEmail(email);
        if (!form) {
            return res.status(404).json({ error: 'Formulario no encontrado' });
        }
        res.status(200).json(form);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el formulario' });
    }
};

/**
 * @function deleteForm
 * @memberof Form_Controllers
 * @description Elimina un formulario del sistema utilizando el ID proporcionado. La función primero valida los datos de la solicitud utilizando `express-validator`. Si hay errores de validación, responde con un estado HTTP 400 y los errores correspondientes. Luego, valida que el ID del formulario esté presente en `req.params`. Si el ID está ausente, responde con un estado HTTP 400 y un mensaje de error. Si el ID está presente, intenta eliminar el formulario asociado al ID utilizando el modelo `formModel`. Si el formulario no se encuentra, responde con un estado HTTP 404 y un mensaje de error. Si el formulario se elimina correctamente, responde con un estado HTTP 200 y un mensaje de éxito. En caso de error durante la operación, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene el ID del formulario en `req.params`.
 * @param {Object} res - El objeto de respuesta de Express, utilizado para enviar la respuesta al cliente.
 * 
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y un mensaje de éxito o error.
 * 
 * @throws {Error} Si ocurre un error al eliminar el formulario, se responde con un estado HTTP 500 y un mensaje de error.
 * 
 * @example
 * // Ejemplo de solicitud exitosa
 * // DELETE /forms/:id_form
 * // URL: /forms/123
 * // Respuesta: { "message": "Formulario eliminado" }
 * 
 * @example
 * // Ejemplo de solicitud con errores de validación
 * // DELETE /forms/:id_form
 * // URL: /forms/
 * // Respuesta: { "errors": [{ "msg": "ID del formulario es requerido", "param": "id_form", "location": "params" }] }
 * 
 * @example
 * // Ejemplo de formulario no encontrado
 * // DELETE /forms/:id_form
 * // URL: /forms/999
 * // Respuesta: { "error": "Formulario no encontrado" }
 * 
 * @example
 * // Ejemplo de error en la solicitud
 * // DELETE /forms/:id_form
 * // URL: /forms/123
 * // Respuesta: { "error": "Error al eliminar el formulario" }
 */
const deleteForm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_form } = req.params;

    try {
        const affectedRows = await formModel.deleteForm(id_form);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Formulario no encontrado' });
        }
        res.status(200).json({ message: 'Formulario eliminado' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el formulario' });
    }
};

module.exports = {
    createForm,
    getFormByEmail,
    deleteForm
};