const queries = require('../queries/grades_apt.queries');
const pool = require('../config/db_mysql');

// CREATE
const createGrades = async (gradeData) => {
    const { id_candidate, professionality, domain, resilience, social_hab, leadership, collaboration, commitment, initiative, id_assessment, id_staff, feedback } = gradeData;
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.createGrades, [
            id_candidate, professionality, domain, resilience, social_hab, leadership, 
            collaboration, commitment, initiative, id_assessment, id_staff, feedback
        ]);
        result = data.insertId;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

// READ ALL
const readGrades = async () => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readGrades);
        result = rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

// READ BY EMAIL
const readGradesByEmail = async (email) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readGradesByEmail, [email]);
        result = rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

// UPDATE BY ADMIN
const updateGradesByAdmin = async (gradeData, email) => {
    const { id_candidate, professionality, domain, resilience, social_hab, leadership, collaboration, commitment, initiative, id_assessment, id_staff, feedback } = gradeData;
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.updateGradesByAdmin, [
            id_candidate, professionality, domain, resilience, social_hab, leadership, 
            collaboration, commitment, initiative, id_assessment, id_staff, feedback, email
        ]);
        result = data.affectedRows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

// DELETE
const deleteGrades = async (email) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.deleteGrades, [email]);
        result = data.affectedRows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const grades = {
    createGrades,
    readGrades,
    readGradesByEmail,
    updateGradesByAdmin,
    deleteGrades
};

module.exports = grades;