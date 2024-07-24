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