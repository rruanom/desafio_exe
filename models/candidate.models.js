/**
 * @author RetoTripulaciones - Grupo2 <https://empiezaporeducar.org/> 
 * @exports models
 * @namespace Candidate_Models
 */

const queries = require('../queries/candidate.queries');
const pool = require('../config/db_mysql');

/**
 * @function createCandidate
 * @memberof Candidate_Models
 * @description Crea un nuevo candidato en la base de datos.
 * @param {string} first_name - El primer nombre del candidato.
 * @param {string} last_name - El apellido del candidato.
 * @param {string} email - La dirección de correo electrónico del candidato.
 * @param {string} password - La contraseña del candidato.
 * @param {string} gender - El género del candidato.
 * @returns {Promise<number>} - Devuelve una promesa que resuelve con el ID del candidato recién creado.
 * @throws {Error} - Lanza un error si ocurre un problema al crear el candidato.
 * @async
 * @example
 * // Ejemplo de uso
 * //const newCandidateId = await createCandidate('Juan', 'Pérez', 'juan@example.com', 'securepassword', 'M');
 * //console.log(newCandidateId); // ID del candidato creado
 */
    const createCandidate = async (first_name, last_name, email, password, gender) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.createCandidate, [first_name, last_name, email, password, gender]);
        result = data.insertId;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

/**
 * @function readCandidates
 * @memberof Candidate_Models
 * @description Obtiene todos los candidatos de la base de datos.
 * @returns {Promise<Array>} - Devuelve una promesa que resuelve con una lista de todos los candidatos.
 * @throws {Error} - Lanza un error si ocurre un problema al obtener los candidatos.
 * @async
 * @example
 * // Ejemplo de uso
 * //const allCandidates = await readCandidates();
 * //console.log(allCandidates); // Lista de candidatos
 */
    const readCandidates = async () => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readCandidates);
        result = rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

/**
 * @function readCandidateByEmail
 * @memberof Candidate_Models
 * @description Obtiene un candidato específico por su dirección de correo electrónico.
 * @param {string} email - La dirección de correo electrónico del candidato a obtener.
 * @returns {Promise<Object>} - Devuelve una promesa que resuelve con el candidato encontrado o `undefined` si no se encuentra.
 * @throws {Error} - Lanza un error si ocurre un problema al obtener el candidato.
 * @async
 * @example
 * // Ejemplo de uso
 * //const candidate = await readCandidateByEmail('juan@example.com');
 * //console.log(candidate); // Información del candidato o `undefined`
 */
    const readCandidateByEmail = async (email) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readCandidateByEmail, [email]);
        result = rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

/**
 * @function updateCandidateByCandidate
 * @memberof Candidate_Models
 * @description Actualiza la información de un candidato específico por el propio candidato.
 * @param {Object} candidate - Objeto que contiene la información del candidato a actualizar.
 * @param {string} candidate.first_name - El primer nombre del candidato.
 * @param {string} candidate.last_name - El apellido del candidato.
 * @param {string} candidate.gender - El género del candidato.
 * @param {string} candidate.email - La dirección de correo electrónico del candidato (utilizada para identificar el registro a actualizar).
 * @returns {Promise<number>} - Devuelve una promesa que resuelve con el número de filas afectadas por la actualización.
 * @throws {Error} - Lanza un error si ocurre un problema al actualizar el candidato.
 * @async
 * @example
 * // Ejemplo de uso
 * //const updatedRows = await updateCandidateByCandidate({ first_name: 'Juan', last_name: 'Gómez', gender: 'M', email: 'juan@example.com' });
 * //console.log(updatedRows); // Número de filas afectadas
 */
    const updateCandidateByCandidate = async (candidate) => {
    const { first_name, last_name, gender, email } = candidate;
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.updateCandidateByCandidate, [first_name, last_name, gender, email]);
        result = data.affectedRows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

/**
 * @function updateCandidateByAdmin
 * @memberof Candidate_Models
 * @description Actualiza la información de un candidato específico por un administrador.
 * @param {Object} candidate - Objeto que contiene la información del candidato a actualizar.
 * @param {number} candidate.id_status - El ID del estado del candidato.
 * @param {boolean} candidate.active - El estado de actividad del candidato (activo/inactivo).
 * @param {string} candidate.email - La dirección de correo electrónico del candidato (utilizada para identificar el registro a actualizar).
 * @returns {Promise<number>} - Devuelve una promesa que resuelve con el número de filas afectadas por la actualización.
 * @throws {Error} - Lanza un error si ocurre un problema al actualizar el candidato.
 * @async
 * @example
 * // Ejemplo de uso
 * //const updatedRows = await updateCandidateByAdmin({ id_status: 2, active: true, email: 'juan@example.com' });
 * //console.log(updatedRows); // Número de filas afectadas
 */
    const updateCandidateByAdmin = async (candidate) => {
    const { id_status, active, email } = candidate;
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.updateCandidateByAdmin, [id_status, active, email]);
        result = data.affectedRows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

/**
 * @function deleteCandidate
 * @memberof Candidate_Models
 * @description Elimina un candidato específico de la base de datos.
 * @param {string} email - La dirección de correo electrónico del candidato que se va a eliminar.
 * @returns {Promise<number>} - Devuelve una promesa que resuelve con el número de filas afectadas por la eliminación.
 * @throws {Error} - Lanza un error si ocurre un problema al eliminar el candidato.
 * @async
 * @example
 * // Ejemplo de uso
 * const affectedRows = await deleteCandidate('juan@example.com');
 * console.log(affectedRows); // Número de filas afectadas (debería ser 1 si la eliminación fue exitosa)
 */
    const deleteCandidate = async (email) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.deleteCandidate, [email]);
        result = data.affectedRows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const candidates = {
    createCandidate,
    readCandidates,
    readCandidateByEmail,
    updateCandidateByCandidate,
    updateCandidateByAdmin,
    deleteCandidate
};

module.exports = candidates;