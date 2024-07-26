/**
 * @author RetoTripulaciones - Grupo2 <https://empiezaporeducar.org/> 
 * @exports models
 * @namespace Grades_Models
 */

const queries = require('../queries/grades_apt.queries');
const pool = require('../config/db_mysql');

/**
 * @function createGrades
 * @memberof Grades_Models
 * @description Crea una nueva entrada de calificaciones en la base de datos.
 * @param {Object} gradeData - Objeto que contiene los datos de las calificaciones.
 * @param {number} gradeData.id_candidate - El ID del candidato asociado con las calificaciones.
 * @param {number} gradeData.professionality - Calificación de profesionalidad.
 * @param {number} gradeData.domain - Calificación de dominio.
 * @param {number} gradeData.resilience - Calificación de resiliencia.
 * @param {number} gradeData.social_hab - Calificación de habilidades sociales.
 * @param {number} gradeData.leadership - Calificación de liderazgo.
 * @param {number} gradeData.collaboration - Calificación de colaboración.
 * @param {number} gradeData.commitment - Calificación de compromiso.
 * @param {number} gradeData.initiative - Calificación de iniciativa.
 * @param {number} gradeData.id_assessment - El ID de la evaluación asociada.
 * @param {number} gradeData.id_staff - El ID del personal que realizó la evaluación.
 * @param {string} gradeData.feedback - Comentarios adicionales sobre la evaluación.
 * @returns {Promise<number>} - Devuelve una promesa que resuelve con el ID de la calificación recién creada.
 * @throws {Error} - Lanza un error si ocurre un problema al crear las calificaciones.
 * @async
 * @example
 * // Ejemplo de uso
 * const newGradeId = await createGrades({
 *     id_candidate: 1,
 *     professionality: 8,
 *     domain: 9,
 *     resilience: 7,
 *     social_hab: 8,
 *     leadership: 9,
 *     collaboration: 8,
 *     commitment: 9,
 *     initiative: 7,
 *     id_assessment: 3,
 *     id_staff: 5,
 *     feedback: 'Excelente desempeño general.'
 * });
 * console.log(newGradeId); // ID de la calificación creada
 */
    const createGrades = async (gradeData) => {
    const { id_candidate, professionality, domain, resilience, social_hab, leadership, collaboration, commitment, initiative, id_assessment, id_staff, feedback } = gradeData;
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.createGrades, [
            id_candidate, professionality, domain, resilience, social_hab, leadership, 
            collaboration, commitment, initiative, id_assessment, id_staff, feedback
        ]);
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
 * @function readGrades
 * @memberof Grades_Models
 * @description Obtiene todas las calificaciones de la base de datos. 
 * @returns {Promise<Object[]>} - Devuelve una promesa que resuelve con un arreglo de todas las calificaciones.
 * @throws {Error} - Lanza un error si ocurre un problema al obtener las calificaciones.
 * @async
 * @example
 * // Ejemplo de uso
 * const allGrades = await readGrades();
 * console.log(allGrades); // Arreglo de calificaciones
 */
const readGrades = async () => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readGrades);
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
 * @function readGradesByEmail
 * @memberof Grades_Models
 * @description Obtiene las calificaciones asociadas a un candidato por su dirección de correo electrónico.
 * @param {string} email - La dirección de correo electrónico del candidato cuyas calificaciones se desean obtener.
 * @returns {Promise<Object[]>} - Devuelve una promesa que resuelve con un arreglo de calificaciones asociadas al correo electrónico proporcionado.
 * @throws {Error} - Lanza un error si ocurre un problema al obtener las calificaciones.
 * @async
 * @example
 * // Ejemplo de uso
 * const grades = await readGradesByEmail('juan@example.com');
 * console.log(grades); // Arreglo de calificaciones para el candidato
 */
const readGradesByEmail = async (email) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readGradesByEmail, [email]);
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
 * @function updateGradesByAdmin
 * @memberof Grades_Models
 * @description Actualiza las calificaciones de un candidato por parte de un administrador.
 * @param {Object} gradeData - Objeto que contiene los datos de las calificaciones a actualizar.
 * @param {number} gradeData.id_candidate - El ID del candidato asociado con las calificaciones.
 * @param {number} gradeData.professionality - Nueva calificación de profesionalidad.
 * @param {number} gradeData.domain - Nueva calificación de dominio.
 * @param {number} gradeData.resilience - Nueva calificación de resiliencia.
 * @param {number} gradeData.social_hab - Nueva calificación de habilidades sociales.
 * @param {number} gradeData.leadership - Nueva calificación de liderazgo.
 * @param {number} gradeData.collaboration - Nueva calificación de colaboración.
 * @param {number} gradeData.commitment - Nueva calificación de compromiso.
 * @param {number} gradeData.initiative - Nueva calificación de iniciativa.
 * @param {number} gradeData.id_assessment - Nuevo ID de la evaluación asociada.
 * @param {number} gradeData.id_staff - Nuevo ID del personal que realizó la evaluación.
 * @param {string} gradeData.feedback - Nuevos comentarios adicionales sobre la evaluación.
 * @param {string} gradeData.email - La dirección de correo electrónico del candidato cuyas calificaciones se actualizarán.
 * @returns {Promise<number>} - Devuelve una promesa que resuelve con el número de filas afectadas por la actualización.
 * @throws {Error} - Lanza un error si ocurre un problema al actualizar las calificaciones.
 * @async
 * @example
 * // Ejemplo de uso
 * const affectedRows = await updateGradesByAdmin({
 *     id_candidate: 1,
 *     professionality: 9,
 *     domain: 9,
 *     resilience: 8,
 *     social_hab: 8,
 *     leadership: 9,
 *     collaboration: 8,
 *     commitment: 9,
 *     initiative: 8,
 *     id_assessment: 4,
 *     id_staff: 6,
 *     feedback: 'Muy buen desempeño con áreas de mejora.',
 *     email: 'juan@example.com'
 * });
 * console.log(affectedRows); // Número de filas afectadas
 */
const updateGradesByAdmin = async (gradeData) => {
    const { id_candidate, professionality, domain, resilience, social_hab, leadership, collaboration, commitment, initiative, id_assessment, id_staff, feedback, email } = gradeData;
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.updateGradesByAdmin, [
            id_candidate, professionality, domain, resilience, social_hab, leadership, 
            collaboration, commitment, initiative, id_assessment, id_staff, feedback, email
        ]);
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
 * @function deleteGrades
 * @memberof Grades_Models
 * @description Elimina las calificaciones asociadas a un candidato por su dirección de correo electrónico.
 * @param {string} email - La dirección de correo electrónico del candidato cuyas calificaciones se desean eliminar.
 * @returns {Promise<number>} - Devuelve una promesa que resuelve con el número de filas afectadas por la eliminación.
 * @throws {Error} - Lanza un error si ocurre un problema al eliminar las calificaciones.
 * @async
 * @example
 * // Ejemplo de uso
 * const affectedRows = await deleteGrades('juan@example.com');
 * console.log(affectedRows); // Número de filas afectadas (debería ser 1 si la eliminación fue exitosa)
 */
const deleteGrades = async (email) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.deleteGrades, [email]);
        result = data.affectedRows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const grades = {
    createGrades,
    readGrades,
    readGradesByEmail,
    updateGradesByAdmin,
    deleteGrades
};

module.exports = grades;