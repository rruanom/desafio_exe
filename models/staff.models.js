/**
 * @author RetoTripulaciones - Grupo2 <https://empiezaporeducar.org/> 
 * @exports models
 * @namespace Staff_Models
 */

const queries = require('../queries/staff.queries');
const pool = require('../config/db_mysql');

/**
 * @function createStaff
 * @memberof Staff_Models
 * @description Crea un nuevo miembro del personal en la base de datos.
 * @param {string} first_name - El nombre del miembro del personal.
 * @param {string} last_name - El apellido del miembro del personal.
 * @param {string} email - El correo electrónico del miembro del personal.
 * @param {string} password - La contraseña del miembro del personal.
 * @param {number} id_role - El ID del rol asignado al miembro del personal.
 * @returns {Promise<number>} - Devuelve una promesa que resuelve con el número de filas afectadas.
 * @throws {Error} - Lanza un error si ocurre un problema al crear el miembro del personal.
 * @async
 * @example
 * // Ejemplo de uso
 * const newStaff = {
 *     first_name: 'Juan',
 *     last_name: 'Pérez',
 *     email: 'juan.perez@example.com',
 *     password: 'securepassword',
 *     id_role: 1
 * };
 * try {
 *     const affectedRows = await createStaff(newStaff.first_name, newStaff.last_name, newStaff.email, newStaff.password, newStaff.id_role);
 *     console.log(`Miembro del personal creado. Filas afectadas: ${affectedRows}`);
 * } catch (error) {
 *     console.error('Error al crear el miembro del personal:', error);
 * }
 */
const createStaff = async (first_name, last_name, email, password, id_role) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.createStaff, [first_name, last_name, email, password, id_role]);
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
 * @function readStaff
 * @memberof Staff_Models
 * @description Obtiene todos los miembros del personal de la base de datos.
 * @returns {Promise<Array>} - Devuelve una promesa que resuelve con una lista de miembros del personal.
 * @throws {Error} - Lanza un error si ocurre un problema al obtener los miembros del personal.
 * @async
 * @example
 * // Ejemplo de uso
 * try {
 *     const staffList = await readStaff();
 *     console.log('Lista de miembros del personal:', staffList);
 * } catch (error) {
 *     console.error('Error al obtener la lista de miembros del personal:', error);
 * }
 */
const readStaff = async () => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readStaff);
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
 * @function readStaffByEmail
 * @memberof Staff_Models
 * @description Obtiene un miembro del personal de la base de datos por su correo electrónico.
 * @param {string} email - El correo electrónico del miembro del personal.
 * @returns {Promise<Object>} - Devuelve una promesa que resuelve con el miembro del personal correspondiente.
 * @throws {Error} - Lanza un error si ocurre un problema al obtener el miembro del personal.
 * @async
 * @example
 * // Ejemplo de uso
 * const email = 'juan.perez@example.com';
 * try {
 *     const staffMember = await readStaffByEmail(email);
 *     console.log('Miembro del personal:', staffMember);
 * } catch (error) {
 *     console.error('Error al obtener el miembro del personal:', error);
 * }
 */
const readStaffByEmail = async (email) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readStaffByEmail, [email]);
        result = rows[0];
        console.log(result)
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

/**
 * @function updateStaffByStaff
 * @memberof Staff_Models
 * @description Actualiza la información de un miembro del personal por parte del propio miembro.
 * @param {Object} staff - El objeto que contiene la información actualizada del miembro del personal.
 * @param {string} staff.first_name - El nombre actualizado del miembro del personal.
 * @param {string} staff.last_name - El apellido actualizado del miembro del personal.
 * @param {string} staff.password - La contraseña actualizada del miembro del personal.
 * @param {string} staff.email - El correo electrónico del miembro del personal (no se actualiza).
 * @returns {Promise<number>} - Devuelve una promesa que resuelve con el número de filas afectadas.
 * @throws {Error} - Lanza un error si ocurre un problema al actualizar el miembro del personal.
 * @async
 * @example
 * // Ejemplo de uso
 * const updatedStaff = {
 *     first_name: 'Juan Carlos',
 *     last_name: 'Pérez',
 *     password: 'newsecurepassword',
 *     email: 'juan.perez@example.com'
 * };
 * try {
 *     const affectedRows = await updateStaffByStaff(updatedStaff);
 *     console.log(`Información del miembro del personal actualizada. Filas afectadas: ${affectedRows}`);
 * } catch (error) {
 *     console.error('Error al actualizar la información del miembro del personal:', error);
 * }
 */
const updateStaffByStaff = async (staff) => {
    const { first_name, last_name, password, email } = staff;
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.updateStaffByStaff, [first_name, last_name, password, email]);
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
 * @function updateStaffByAdmin
 * @memberof Staff_Models
 * @description Actualiza la información de un miembro del personal por parte de un administrador.
 * @param {Object} staff - El objeto que contiene la información actualizada del miembro del personal.
 * @param {number} staff.id_role - El nuevo ID del rol asignado al miembro del personal.
 * @param {boolean} staff.active - El estado de actividad del miembro del personal.
 * @param {boolean} staff.logged - El estado de sesión del miembro del personal.
 * @param {string} staff.last_logged_date - La fecha y hora de la última sesión del miembro del personal.
 * @param {string} staff.email - El correo electrónico del miembro del personal (no se actualiza).
 * @returns {Promise<number>} - Devuelve una promesa que resuelve con el número de filas afectadas.
 * @throws {Error} - Lanza un error si ocurre un problema al actualizar el miembro del personal.
 * @async
 * @example
 * // Ejemplo de uso
 * const updatedStaffByAdmin = {
 *     id_role: 2,
 *     active: true,
 *     logged: true,
 *     last_logged_date: '2024-07-25T12:00:00Z',
 *     email: 'juan.perez@example.com'
 * };
 * try {
 *     const affectedRows = await updateStaffByAdmin(updatedStaffByAdmin);
 *     console.log(`Información del miembro del personal actualizada por el administrador. Filas afectadas: ${affectedRows}`);
 * } catch (error) {
 *     console.error('Error al actualizar la información del miembro del personal por el administrador:', error);
 * }
 */
const updateStaffByAdmin = async (staff) => {
    const { id_role, active, logged, last_logged_date, email } = staff;
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.updateStaffByAdmin, [id_role, active, logged, last_logged_date, email]);
        result = data.affectedRows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};


const loginStaff = async (email)=> {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.loginStaff, [email]);
        result = data.affectedRows;
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
}

const logoutStaff = async (email)=> {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.logoutStaff, [email]);
        result = data.affectedRows;
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
}

const staff = {
    createStaff,
    readStaff,
    readStaffByEmail,
    updateStaffByStaff,
    updateStaffByAdmin,
    loginStaff,
    logoutStaff
};

module.exports = staff;