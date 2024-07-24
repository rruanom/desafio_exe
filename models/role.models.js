const queries = require('../queries/role.queries');
const pool = require('../config/db_mysql');

const createRole = async (name_role) => {
    try {
        const [result] = await pool.query(queries.createRole, [name_role]);
        return result.insertId;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

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

const deleteRole = async (id_role) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.deleteRole, [id_role]);
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