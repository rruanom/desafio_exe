/**
 * @author RetoTripulaciones - Grupo2 <https://empiezaporeducar.org/> 
 * @exports models
 * @namespace Assessment_Models
 */

const queries = require('../queries/assessment.queries');
const pool = require('../config/db_mysql');

/**
 * @function createAssessment
 * @memberof Assessment_Models
 * @description Crea una nueva evaluación en la base de datos.
 * @param {string} name_assessment - El nombre de la evaluación que se va a crear.
 * @returns {Promise<number>} - Devuelve una promesa que resuelve con el ID de la evaluación recién creada.
 * @throws {Error} - Lanza un error si ocurre un problema al crear la evaluación.
 * @async
 * @example
 * // Ejemplo de uso
 * //const newAssessmentId = await createAssessment('Evaluación de Prueba');
 * //console.log(newAssessmentId); // ID de la evaluación creada
 */
const createAssessment = async (name_assessment) => {
    try {
        const [result] = await pool.query(queries.createAssessment, [name_assessment]);
        return result.insertId;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

/**
 * @function getAllAssessment
 * @memberof Assessment_Models
 * @description Obtiene todas las evaluaciones existentes en la base de datos.
 * @returns {Promise<Array>} - Devuelve una promesa que resuelve con una lista de evaluaciones.
 * @throws {Error} - Lanza un error si ocurre un problema al obtener las evaluaciones.
 * @async
 * @example
 * // Ejemplo de uso
 * //const assessments = await getAllAssessment();
 * //console.log(assessments); // Lista de evaluaciones
 */
const getAllAssessment = async () => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.getAllAssessment);
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
 * @function deleteAssessment
 * @memberof Assessment_Models
 * @description Elimina una evaluación específica de la base de datos.
 * @param {string} name_assessment - El nombre de la evaluación que se va a eliminar.
 * @returns {Promise<number>} - Devuelve una promesa que resuelve con el número de filas afectadas por la eliminación.
 * @throws {Error} - Lanza un error si ocurre un problema al eliminar la evaluación.
 * @async
 * @example
 * // Ejemplo de uso
 * //const affectedRows = await deleteAssessment('Evaluación de Prueba');
 * //console.log(affectedRows); // Número de filas afectadas (debería ser 1 si la eliminación fue exitosa)
 */
const deleteAssessment = async (name_assessment) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.deleteAssessment, [name_assessment]);
        result = data.affectedRows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const assessments = {
    createAssessment,
    getAllAssessment,
    deleteAssessment
};

module.exports = assessments;