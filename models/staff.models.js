const queries = require('../queries/staff.queries');
const pool = require('../config/db_mysql');

// CREATE
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

// READ ALL
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

// READ ONE
const readStaffByEmail = async (email) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readStaffByEmail, [email]);
        result = rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

// UPDATE BY STAFF
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

// UPDATE BY ADMIN
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

// DELETE
const deleteStaff = async (email) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.deleteStaff, [email]);
        result = data.affectedRows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const staff = {
    createStaff,
    readStaff,
    readStaffByEmail,
    updateStaffByStaff,
    updateStaffByAdmin,
    deleteStaff
};

module.exports = staff;