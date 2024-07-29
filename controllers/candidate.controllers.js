/**
 * @author RetoTripulaciones - Grupo2 <https://empiezaporeducar.org/> 
 * @exports controllers
 * @namespace Candidate_Controllers
 */

const candidateModels = require('../models/candidate.models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

/**
 * @function createCandidate
 * @memberof Candidate_Controllers
 * @description Crea un nuevo candidato en el sistema. La función primero valida los datos de la solicitud usando `express-validator`. Si hay errores de validación, responde con un estado HTTP 400 y los errores correspondientes. Luego, valida que todos los campos requeridos estén presentes. Si falta algún campo, responde con un estado HTTP 400 y un mensaje de error. Si los datos son válidos, intenta crear un nuevo candidato utilizando el modelo `candidateModels`. Si la creación del candidato falla, responde con un estado HTTP 500 y un mensaje de error. Si la creación es exitosa, responde con un estado HTTP 201 y un mensaje de éxito.
 * @async
 * @param {Object} req - El objeto de solicitud de Express, que contiene los datos del candidato en `req.body`.
 * @param {Object} res - El objeto de respuesta de Express, utilizado para enviar respuestas al cliente.
 * 
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y un mensaje de éxito o error.
 * 
 * @throws {Error} Si ocurre un error durante el proceso de creación del candidato, se responde con un estado HTTP 500 y un mensaje de error.
 * 
 * @example
 * // Ejemplo de solicitud exitosa
 * // POST /candidates
 * // Request Body: { "first_name": "John", "last_name": "Doe", "email": "john.doe@example.com", "password": "securepassword", "gender": "male" }
 * // Respuesta: { "message": "Candidato creado exitosamente" }
 * 
 * @example
 * // Ejemplo de solicitud con errores de validación
 * // POST /candidates
 * // Request Body: { "first_name": "", "last_name": "Doe", "email": "john.doe@example.com", "password": "securepassword", "gender": "male" }
 * // Respuesta: { "errors": [{ "msg": "First name is required", "param": "first_name", "location": "body" }] }
 * 
 * @example
 * // Ejemplo de solicitud con campos faltantes
 * // POST /candidates
 * // Request Body: { "first_name": "John", "last_name": "Doe", "email": "john.doe@example.com", "gender": "male" }
 * // Respuesta: { "error": "Todos los campos son requeridos" }
 */
const createCandidate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { first_name, last_name, email, password, gender } = req.body;

    if (!first_name || !last_name || !email || !password || !gender) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const result = await candidateModels.createCandidate(first_name, last_name, email, passwordHash, gender);
        if (result === 0) {
            return res.status(500).json({ error: 'Error al crear el candidato' });
        }
        res.status(201).json({ message: 'Candidato creado exitosamente'});
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el Candidato' });
    }
};

/**
 * @function readCandidate
 * @memberof Candidate_Controllers
 * @description Recupera la lista de todos los candidatos del sistema. La función intenta obtener los candidatos utilizando el modelo `candidateModels`. Si no se encuentran candidatos, responde con un estado HTTP 404 y un mensaje de error. Si ocurre un error durante la operación, responde con un estado HTTP 500 y un mensaje de error. Si la recuperación es exitosa, envía una respuesta JSON con la lista de candidatos y un estado HTTP 200.
 * @async
 * @param {Object} req - El objeto de solicitud de Express, que contiene la solicitud del cliente pero no se utiliza directamente en esta función.
 * @param {Object} res - El objeto de respuesta de Express, utilizado para enviar la respuesta al cliente.
 * 
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con la lista de candidatos o un mensaje de error.
 * 
 * @throws {Error} Si ocurre un error al obtener los candidatos, se responde con un estado HTTP 500 y un mensaje de error.
 * 
 * @example
 * // Ejemplo de solicitud exitosa
 * // GET /candidates
 * // Respuesta: [{ "id": 1, "first_name": "John", "last_name": "Doe", "email": "john.doe@example.com", "gender": "male" }, ...]
 * 
 * @example
 * // Ejemplo de solicitud sin candidatos
 * // GET /candidates
 * // Respuesta: { "error": "Candidatos no encontrados" }
 * 
 * @example
 * // Ejemplo de error en la solicitud
 * // GET /candidates
 * // Respuesta: { "error": "Error al obtener los candidatos" }
 */
const readCandidate = async (req, res) => {
    try {
        const candidate = await candidateModels.readCandidates();
        if (!candidate) {
            return res.status(404).json({ error: 'Candidato no encontrados' });
        }
        res.status(200).json(candidate);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los candidatos' });
    }
};

/**
 * @function readCandidateByEmail
 * @memberof Candidate_Controllers
 * @description Recupera un candidato específico basado en el correo electrónico proporcionado. La función primero valida los datos de la solicitud utilizando `express-validator`. Si hay errores de validación, responde con un estado HTTP 400 y los errores correspondientes. Luego, intenta obtener el candidato utilizando el modelo `candidateModels` con el correo electrónico proporcionado en `req.params`. Si no se encuentra el candidato, responde con un estado HTTP 404 y un mensaje de error. Si ocurre un error durante la operación, responde con un estado HTTP 500 y un mensaje de error. Si la recuperación es exitosa, envía una respuesta JSON con los detalles del candidato y un estado HTTP 200.
 * @async
 * @param {Object} req - El objeto de solicitud de Express, que contiene el correo electrónico del candidato en `req.params`.
 * @param {Object} res - El objeto de respuesta de Express, utilizado para enviar la respuesta al cliente.
 * 
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con los detalles del candidato o un mensaje de error.
 * 
 * @throws {Error} Si ocurre un error al obtener el candidato, se responde con un estado HTTP 500 y un mensaje de error.
 * 
 * @example
 * // Ejemplo de solicitud exitosa
 * // GET /candidates/email/:email
 * // URL: /candidates/email/john.doe@example.com
 * // Respuesta: { "id": 1, "first_name": "John", "last_name": "Doe", "email": "john.doe@example.com", "gender": "male" }
 * 
 * @example
 * // Ejemplo de solicitud con error de validación
 * // GET /candidates/email/1234
 * // Respuesta: { "errors": [{ "msg": "Invalid email format", "param": "email", "location": "params" }] }
 * 
 * @example
 * // Ejemplo de solicitud con candidato no encontrado
 * // GET /candidates/email/unknown@example.com
 * // Respuesta: { "error": "Candidato no encontrado" }
 * 
 * @example
 * // Ejemplo de error en la solicitud
 * // GET /candidates/email/john.doe@example.com
 * // Respuesta: { "error": "Error al obtener el candidato" }
 */
const readCandidateByEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.params;

    try {
        const candidate = await candidateModels.readCandidateByEmail(email);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidato no encontrado' });
        }
        res.status(200).json(candidate);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el candidato' });
    }
};

/**
 * @function updateCandidateByCandidate
 * @memberof Candidate_Controllers
 * @description Actualiza los detalles de un candidato en el sistema. La función primero valida los datos de la solicitud utilizando `express-validator`. Si hay errores de validación, responde con un estado HTTP 400 y los errores correspondientes. Luego, valida que todos los campos requeridos (correo electrónico, nombre, apellido y género) estén presentes. Si falta algún campo, responde con un estado HTTP 400 y un mensaje de error. Si los datos son válidos, intenta actualizar el candidato utilizando el modelo `candidateModels` con la información proporcionada. Si el candidato no se encuentra, responde con un estado HTTP 404 y un mensaje de error. Si la actualización es exitosa, responde con un estado HTTP 200 y un mensaje de éxito. En caso de error durante la operación, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express, que contiene los detalles del candidato en `req.body`.
 * @param {Object} res - El objeto de respuesta de Express, utilizado para enviar la respuesta al cliente.
 * 
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y un mensaje de éxito o error.
 * 
 * @throws {Error} Si ocurre un error al actualizar el candidato, se responde con un estado HTTP 500 y un mensaje de error.
 * 
 * @example
 * // Ejemplo de solicitud exitosa
 * // PUT /candidates/update
 * // Request Body: { "first_name": "Jane", "last_name": "Doe", "email": "jane.doe@example.com", "gender": "female" }
 * // Respuesta: { "message": "Candidato actualizado exitosamente" }
 * 
 * @example
 * // Ejemplo de solicitud con errores de validación
 * // PUT /candidates/update
 * // Request Body: { "first_name": "", "last_name": "Doe", "email": "jane.doe@example.com", "gender": "female" }
 * // Respuesta: { "errors": [{ "msg": "First name is required", "param": "first_name", "location": "body" }] }
 * 
 * @example
 * // Ejemplo de solicitud con campos faltantes
 * // PUT /candidates/update
 * // Request Body: { "first_name": "Jane", "last_name": "Doe", "gender": "female" }
 * // Respuesta: { "error": "Los campos son requeridos" }
 * 
 * @example
 * // Ejemplo de solicitud con candidato no encontrado
 * // PUT /candidates/update
 * // Request Body: { "first_name": "Jane", "last_name": "Doe", "email": "jane.doe@example.com", "gender": "female" }
 * // Respuesta: { "error": "Candidato no encontrado" }
 * 
 * @example
 * // Ejemplo de error en la solicitud
 * // PUT /candidates/update
 * // Request Body: { "first_name": "Jane", "last_name": "Doe", "email": "jane.doe@example.com", "gender": "female" }
 * // Respuesta: { "error": "Error al actualizar el candidato" }
 */
const updateCandidateByCandidate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, gender, email } = req.body;

    if (!email || !first_name || !last_name || !gender) {
        return res.status(400).json({ error: 'Los campos son requeridos' });
    }

    try {
        const result = await candidateModels.updateCandidatebyCandidate({ first_name, last_name, gender, email });
        if (result === 0) {
            return res.status(404).json({ error: 'Candidato no encontrado' });
        }
        res.status(200).json({ message: 'Candidato actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el candidato' });
    }
};

/**
 * @function updateCandidateByAdmin
 * @memberof Candidate_Controllers
 * @description Permite a un administrador actualizar el estado y la actividad de un candidato en el sistema. La función valida los datos de la solicitud utilizando `express-validator`. Si hay errores de validación, responde con un estado HTTP 400 y los errores correspondientes. Luego, valida que el correo electrónico esté presente en `req.params` antes de intentar realizar la actualización. Si falta el correo electrónico, responde con un estado HTTP 400 y un mensaje de error. Si los datos son válidos, intenta actualizar el candidato utilizando el modelo `candidateModels` con la información proporcionada. Si el candidato no se encuentra o no se actualiza, responde con un estado HTTP 404 y un mensaje de error. Si la actualización es exitosa, responde con un estado HTTP 200 y un mensaje de éxito. En caso de error durante la operación, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene el correo electrónico del candidato en `req.params` y los datos de actualización en `req.body`.
 * @param {Object} res - El objeto de respuesta de Express, utilizado para enviar la respuesta al cliente.
 * 
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y un mensaje de éxito o error.
 * 
 * @throws {Error} Si ocurre un error al actualizar el candidato, se responde con un estado HTTP 500 y un mensaje de error.
 * 
 * @example
 * // Ejemplo de solicitud exitosa
 * // PUT /candidates/update/admin/:email
 * // Request Body: { "id_status": 2, "active": true }
 * // URL: /candidates/update/admin/jane.doe@example.com
 * // Respuesta: { "message": "Candidate actualizado exitosamente por el administrador" }
 * 
 * @example
 * // Ejemplo de solicitud con errores de validación
 * // PUT /candidates/update/admin/:email
 * // Request Body: { "id_status": "not_a_number", "active": true }
 * // URL: /candidates/update/admin/jane.doe@example.com
 * // Respuesta: { "errors": [{ "msg": "Invalid id_status", "param": "id_status", "location": "body" }] }
 * 
 * @example
 * // Ejemplo de solicitud con falta de correo electrónico
 * // PUT /candidates/update/admin/:email
 * // Request Body: { "id_status": 2, "active": true }
 * // URL: /candidates/update/admin/
 * // Respuesta: { "error": "El email es requerido para la actualización" }
 * 
 * @example
 * // Ejemplo de solicitud con candidato no encontrado
 * // PUT /candidates/update/admin/:email
 * // Request Body: { "id_status": 2, "active": true }
 * // URL: /candidates/update/admin/unknown@example.com
 * // Respuesta: { "error": "Candidate no encontrado o no actualizado" }
 * 
 * @example
 * // Ejemplo de error en la solicitud
 * // PUT /candidates/update/admin/:email
 * // Request Body: { "id_status": 2, "active": true }
 * // URL: /candidates/update/admin/jane.doe@example.com
 * // Respuesta: { "error": "Error al actualizar el candidato por el administrador" }
 */
const updateCandidateByAdmin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.params;
    const { id_status, active } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'El email es requerido para la actualización' });
    }

    try {
        const result = await candidateModels.updateCandidateByAdmin({ id_status, active, email });
        if (result === 0) {
            return res.status(404).json({ error: 'Candidate no encontrado o no actualizado' });
        }
        res.status(200).json({ message: 'Candidate actualizado exitosamente por el administrador' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el candidato por el administrador' });
    }
};

/**
 * @function deleteCandidate
 * @memberof Candidate_Controllers
 * @description Elimina un candidato del sistema utilizando su correo electrónico. La función primero valida los datos de la solicitud utilizando `express-validator`. Si hay errores de validación, responde con un estado HTTP 400 y los errores correspondientes. Luego, valida que el correo electrónico esté presente en `req.params`. Si el correo electrónico está ausente, responde con un estado HTTP 400 y un mensaje de error. Si el correo electrónico está presente, intenta eliminar el candidato utilizando el modelo `candidateModels`. Si el candidato no se encuentra, responde con un estado HTTP 404 y un mensaje de error. Si la eliminación es exitosa, responde con un estado HTTP 200 y un mensaje de éxito. En caso de error durante la operación, responde con un estado HTTP 500 y un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express que contiene el correo electrónico del candidato en `req.params`.
 * @param {Object} res - El objeto de respuesta de Express, utilizado para enviar la respuesta al cliente.
 * 
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y un mensaje de éxito o error.
 * 
 * @throws {Error} Si ocurre un error al eliminar el candidato, se responde con un estado HTTP 500 y un mensaje de error.
 * 
 * @example
 * // Ejemplo de solicitud exitosa
 * // DELETE /candidates/delete/:email
 * // URL: /candidates/delete/jane.doe@example.com
 * // Respuesta: { "message": "Candidato eliminado exitosamente" }
 * 
 * @example
 * // Ejemplo de solicitud con errores de validación
 * // DELETE /candidates/delete/:email
 * // URL: /candidates/delete/
 * // Respuesta: { "errors": [{ "msg": "Email is required", "param": "email", "location": "params" }] }
 * 
 * @example
 * // Ejemplo de solicitud con candidato no encontrado
 * // DELETE /candidates/delete/:email
 * // URL: /candidates/delete/unknown@example.com
 * // Respuesta: { "error": "Candidato no encontrado" }
 * 
 * @example
 * // Ejemplo de error en la solicitud
 * // DELETE /candidates/delete/:email
 * // URL: /candidates/delete/jane.doe@example.com
 * // Respuesta: { "error": "Error al borrar el Candidato" }
 */
const deleteCandidate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email } = req.params;

    try {
        const result = await candidateModels.deleteCandidate(email);
        if (!result) {
            return res.status(404).json({ error: 'Candidato no encontrado' });
        }
        res.status(200).json({ message: 'Candidato eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al borrar el Candidato' });
    }
};

const loginCandidate = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      let user = await candidateModels.readCandidateByEmail(email);
  
      if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }
  
      await candidateModels.loginCandidate(email)
  
      const token = jwt.sign(
        { id: user.id, 
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          status: user.name_status
         },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      const userData = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      };
  
      res.json({ token, user: userData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  };

module.exports = {
    createCandidate,
    readCandidate,
    readCandidateByEmail,
    updateCandidateByCandidate,
    updateCandidateByAdmin,
    deleteCandidate,
    loginCandidate
};

