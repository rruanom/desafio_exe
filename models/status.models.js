const queries = require('../queries/status.queries');
const pool = require('../config/db_mysql');

const createStatus = async (name_status) => {
    try {
        const [result] = await pool.query(queries.createStatus, [name_status]);
        return result.insertId;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

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

const deleteStatus = async (id_status) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.deleteStatus, [id_status]);
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