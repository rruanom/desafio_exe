/**
 * @author RetoTripulaciones - Grupo2 <https://empiezaporeducar.org/> 
 * @exports models
 * @namespace Form_Models
 */

const queries = require('../queries/form.queries');
const pool = require('../config/db_mysql');

/**
 * @function createForm
 * @memberof Form_Models
 * @description Crea un nuevo formulario en la base de datos.
 * @param {Object} formData - Objeto que contiene los datos del formulario.
 * @param {number} formData.id_candidate - El ID del candidato asociado con el formulario.
 * @param {string} formData.academic_degree - El grado académico del candidato.
 * @param {string} formData.average_grade - La calificación promedio del candidato.
 * @param {string} formData.languages - Los idiomas que domina el candidato.
 * @param {string} formData.experience - La experiencia laboral del candidato.
 * @param {string} formData.about_you - Información adicional sobre el candidato.
 * @returns {Promise<number>} - Devuelve una promesa que resuelve con el ID del formulario recién creado.
 * @throws {Error} - Lanza un error si ocurre un problema al crear el formulario.
 * @async
 * @example
 * // Ejemplo de uso
 * const newFormId = await createForm({
 *     id_candidate: 1,
 *     academic_degree: 'Ingeniería de Software',
 *     average_grade: '9.0',
 *     languages: 'Español, Inglés',
 *     experience: 'Desarrollador Junior en XYZ',
 *     about_you: 'Apasionado por la tecnología y la programación.'
 * });
 * console.log(newFormId); // ID del formulario creado
 */
const createForm = async (formData) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.query(queries.createForm, [
            formData.id_candidate,
            formData.academic_degree,
            formData.average_grade,
            formData.languages,
            formData.experience,
            formData.about_you
        ]);
        return result.insertId;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
};

/**
 * @function readFormByEmail
 * @memberof Form_Models
 * @description Obtiene un formulario específico asociado a un candidato por su dirección de correo electrónico.
 * @param {string} email - La dirección de correo electrónico del candidato cuyo formulario se desea obtener.
 * @returns {Promise<Object>} - Devuelve una promesa que resuelve con el formulario encontrado o `undefined` si no se encuentra.
 * @throws {Error} - Lanza un error si ocurre un problema al obtener el formulario.
 * @async
 * @example
 * // Ejemplo de uso
 * const form = await readFormByEmail('juan@example.com');
 * console.log(form); // Información del formulario o `undefined`
 */
const readFormByEmail = async (email) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readFormByEmail, [email]);
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
 * @function deleteForm
 * @memberof Form_Models
 * @description Elimina un formulario específico de la base de datos.
 * @param {number} id_form - El ID del formulario que se va a eliminar.
 * @returns {Promise<number>} - Devuelve una promesa que resuelve con el número de filas afectadas por la eliminación.
 * @throws {Error} - Lanza un error si ocurre un problema al eliminar el formulario.
 * @async
 * @example
 * // Ejemplo de uso
 * const affectedRows = await deleteForm(1);
 * console.log(affectedRows); // Número de filas afectadas (debería ser 1 si la eliminación fue exitosa)
 */
const deleteForm = async (id_form) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.deleteForm, [id_form]);
        result = data.affectedRows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const getFormAndCandidateDataByEmail = async (email) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.getFormAndCandidateDataByEmail, [email]);
        result = rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const form = {
    createForm,
    readFormByEmail,
    deleteForm,
    getFormAndCandidateDataByEmail
};

module.exports = form;