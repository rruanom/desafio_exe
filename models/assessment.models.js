const queries = require('../queries/assessment.queries');
const pool = require('../config/db_mysql');

const createAssessment = async (nombre_eval) => {
    try {
        const [result] = await pool.query(queries.createAssessment, [nombre_eval]);
        return result.insertId;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

/* let newAssessment = {
    nombre: "Evaluacion_1"
};

createAssessment(newAssessment.nombre)
    .then(data => console.log(data))
    .catch(error => console.log(error)); */


const readAllAssessment = async () => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readAllAssessment);
        result = rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};
/* readAllAssessment()
.then(data => console.log(data))
.catch(error => console.log(error));  */

const deleteAssessment = async (id_eval) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.deleteAssessment, [id_eval]);
        result = data.affectedRows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

/* deleteAssessment(4)
.then(data => console.log(data))
.catch(error => console.log(error));  */

const status = {
    createAssessment,
    readAllAssessment,
    deleteAssessment
};

module.exports = status;