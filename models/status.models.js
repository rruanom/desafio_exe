/**
 * @author RetoTripulaciones - Grupo2 <https://empiezaporeducar.org/> 
 * @exports models
 * @namespace Status_Models
 */

const queries = require('../queries/status.queries');
const pool = require('../config/db_mysql');

/**
 * @function createStatus
 * @memberof Status_Models
 * @description Crea un nuevo estado en la base de datos.
 * @param {string} name_status - El nombre del nuevo estado.
 * @returns {Promise<number>} - Devuelve una promesa que resuelve con el ID del estado insertado.
 * @throws {Error} - Lanza un error si ocurre un problema al crear el estado.
 * @async
 * @example
 * // Ejemplo de uso
 * const newStatus = 'Activo';
 * try {
 *     const statusId = await createStatus(newStatus);
 *     console.log(`Estado creado con ID: ${statusId}`);
 * } catch (error) {
 *     console.error('Error al crear el estado:', error);
 * }
 */
const createStatus = async (name_status) => {
    try {
        const [result] = await pool.query(queries.createStatus, [name_status]);
        return result.insertId;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

/**
 * @function readAllStatus
 * @memberof Status_Models
 * @description Obtiene todos los estados de la base de datos.
 * @returns {Promise<Array>} - Devuelve una promesa que resuelve con una lista de estados.
 * @throws {Error} - Lanza un error si ocurre un problema al obtener los estados.
 * @async
 * @example
 * // Ejemplo de uso
 * try {
 *     const statusList = await readAllStatus();
 *     console.log('Lista de estados:', statusList);
 * } catch (error) {
 *     console.error('Error al obtener la lista de estados:', error);
 * }
 */
const readAllStatus = async () => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readAllStatus);
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
 * @function deleteStatus
 * @memberof Status_Models
 * @description Elimina un estado de la base de datos por su nombre.
 * @param {string} name_status - El nombre del estado a eliminar.
 * @returns {Promise<number>} - Devuelve una promesa que resuelve con el número de filas afectadas.
 * @throws {Error} - Lanza un error si ocurre un problema al eliminar el estado.
 * @async
 * @example
 * // Ejemplo de uso
 * const statusToDelete = 'Inactivo';
 * try {
 *     const affectedRows = await deleteStatus(statusToDelete);
 *     console.log(`Estado eliminado. Filas afectadas: ${affectedRows}`);
 * } catch (error) {
 *     console.error('Error al eliminar el estado:', error);
 * }
 */
const deleteStatus = async (name_status) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.deleteStatus, [name_status]);
        result = data.affectedRows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const status = {
    createStatus,
    readAllStatus,
    deleteStatus 
};

module.exports = status;