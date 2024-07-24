const queries = require('../queries/assessment.queries');
const pool = require('../config/db_mysql');

const createAssessment = async (name_assessment) => {
    try {
        const [result] = await pool.query(queries.createAssessment, [name_assessment]);
        return result.insertId;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const readAllAssessments = async () => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readAllAssessments);
        result = rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const deleteAssessment = async (id_assessment) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.deleteAssessment, [id_assessment]);
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
    readAllAssessments,
    deleteAssessment
};

module.exports = assessments;