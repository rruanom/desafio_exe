const queries = require('../queries/status.queries');
const pool = require('../config/db_mysql');

const createStatus = async (nombre_s) => {
    try {
        const [result] = await pool.query(queries.createStatus, [nombre_s]);
        return result.insertId;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

/* let newStatus = {
    nombre: "Solicitud"
};

createStatus(newStatus.nombre)
    .then(data => console.log(data))
    .catch(error => console.log(error)); */


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
/* readAllStatus()
.then(data => console.log(data))
.catch(error => console.log(error)); */

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

/* deleteStatus(2)
.then(data => console.log(data))
.catch(error => console.log(error)); */

const status = {
    createStatus,
    readAllStatus,
    deleteStatus 
};

module.exports = status;