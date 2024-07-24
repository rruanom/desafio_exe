const queries = require('../queries/form.queries');
const pool = require('../config/db_mysql');

const createForm = async (formData) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.query(queries.createForm, [
            formData.id_candidate,
            formData.academic_degree,
            formData.average_grade,
            formData.languages,
            formData.experience,
            formData.about_you
        ]);
        return result.insertId;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
};

const readFormByEmail = async (email) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readFormByEmail, [email]);
        result = rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const deleteForm = async (id_form) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.deleteForm, [id_form]);
        result = data.affectedRows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const form = {
    createForm,
    readFormByEmail,
    deleteForm
};

module.exports = form;