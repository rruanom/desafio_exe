/**
 * @author RetoTripulaciones - Grupo2 <https://empiezaporeducar.org/> 
 * @exports models
 * @namespace Role_Models
 */

const queries = require('../queries/role.queries');
const pool = require('../config/db_mysql');

/**
 * @function createRole
 * @memberof Role_Models
 * @description Crea un nuevo rol en la base de datos.
 * @param {string} name_role - El nombre del rol que se desea crear.
 * @returns {Promise<number>} - Devuelve una promesa que resuelve con el ID del rol recién creado.
 * @throws {Error} - Lanza un error si ocurre un problema al crear el rol.
 * @async
 * @example
 * // Ejemplo de uso
 * const newRoleId = await createRole('Administrador');
 * console.log(newRoleId); // ID del rol creado
 */
const createRole = async (name_role) => {
    try {
        const [result] = await pool.query(queries.createRole, [name_role]);
        return result.insertId;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

/**
 * @function readAllRoles
 * @memberof Role_Models
 * @description Obtiene todos los roles de la base de datos.
 * @returns {Promise<Object[]>} - Devuelve una promesa que resuelve con un arreglo de todos los roles.
 * @throws {Error} - Lanza un error si ocurre un problema al obtener los roles.
 * @async
 * @example
 * // Ejemplo de uso
 * const allRoles = await readAllRoles();
 * console.log(allRoles); // Arreglo de roles
 */
const readAllRoles = async () => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readAllRoles);
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
 * @function readRoleById
 * @memberof Role_Models
 * @description Obtiene un rol de la base de datos por su ID.
 * @param {number} id_role - El ID del rol que se desea obtener.
 * @returns {Promise<Object>} - Devuelve una promesa que resuelve con el rol asociado al ID proporcionado.
 * @throws {Error} - Lanza un error si ocurre un problema al obtener el rol.
 * @async
 * @example
 * // Ejemplo de uso
 * const role = await readRoleById(1);
 * console.log(role); // Objeto del rol con ID 1
 */
const readRoleById = async (id_role) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readRoleById, [id_role]);
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
 * @function readRoleByName
 * @memberof Role_Models
 * @description Obtiene un rol de la base de datos por su nombre.
 * @param {string} name_role - El nombre del rol que se desea obtener.
 * @returns {Promise<Object>} - Devuelve una promesa que resuelve con el rol asociado al nombre proporcionado.
 * @throws {Error} - Lanza un error si ocurre un problema al obtener el rol.
 * @async
 * @example
 * // Ejemplo de uso
 * const role = await readRoleByName('Administrador');
 * console.log(role); // Objeto del rol con nombre 'Administrador'
 */
const readRoleByName = async (name_role) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readRoleByName, [name_role]);
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
 * @function updateRole
 * @memberof Role_Models
 * @description Actualiza el nombre de un rol en la base de datos.
 * @param {number} id_role - El ID del rol que se desea actualizar.
 * @param {string} name_role - El nuevo nombre para el rol.
 * @returns {Promise<number>} - Devuelve una promesa que resuelve con el número de filas afectadas por la actualización.
 * @throws {Error} - Lanza un error si ocurre un problema al actualizar el rol.
 * @async
 * @example
 * // Ejemplo de uso
 * const affectedRows = await updateRole(1, 'Superadministrador');
 * console.log(affectedRows); // Número de filas afectadas (debería ser 1 si la actualización fue exitosa)
 */
const updateRole = async (id_role, name_role) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.updateRole, [name_role, id_role]);
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
 * @function deleteRole
 * @memberof Role_Models
 * @description Elimina un rol de la base de datos por su nombre.
 * @param {string} name_role - El nombre del rol que se desea eliminar.
 * @returns {Promise<number>} - Devuelve una promesa que resuelve con el número de filas afectadas por la eliminación.
 * @throws {Error} - Lanza un error si ocurre un problema al eliminar el rol.
 * @async
 * @example
 * // Ejemplo de uso
 * const affectedRows = await deleteRole('Administrador');
 * console.log(affectedRows); // Número de filas afectadas (debería ser 1 si la eliminación fue exitosa)
 */
const deleteRole = async (name_role) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.deleteRole, [name_role]);
        result = data.affectedRows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const roles = {
    createRole,
    readAllRoles,
    readRoleById,
    readRoleByName,
    updateRole,
    deleteRole
};

module.exports = roles;