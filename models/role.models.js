const queries = require('../queries/role.queries');
const pool = require('../config/db_mysql');

const createRole = async (name_rol) => {
    try {
        const [result] = await pool.query(queries.createRole, [name_rol]);
        return result.insertId;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

let newRole = {
    nombre: "Jefe"
};

createRole(newRole.nombre)
    .then(data => console.log(data))
    .catch(error => console.log(error));


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

const readRoleById = async (id_rol) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readRoleById, [id_rol]);
        result = rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const readRoleByName = async (name_rol) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readRoleByName, [name_rol]);
        result = rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const updateRole = async (id_rol, name_rol) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.updateRole, [name_rol, id_rol]);
        result = data.affectedRows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const deleteRole = async (id_rol) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.deleteRole, [id_rol]);
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