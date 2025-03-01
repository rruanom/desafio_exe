const queries = require('../queries/candidate.queries');
const pool = require('../config/db_mysql');

const createCandidate = async (first_name, last_name, email, password, gender) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.createCandidate, [first_name, last_name, email, password, gender]);
        result = data.insertId;
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const readCandidates = async () => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readCandidates);
        result = rows;
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const readCandidateByEmail = async (email) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readCandidateByEmail, [email]);
        result = rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const updateCandidateByCandidate = async (candidate) => {
    const { first_name, last_name, gender, email } = candidate;
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.updateCandidateByCandidate, [first_name, last_name, gender, email]);
        result = data.affectedRows;
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const updateCandidateByAdmin = async (candidate) => {
    const { id_status, active, email } = candidate;
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.updateCandidateByAdmin, [id_status, active, email]);
        result = data.affectedRows;
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const deleteCandidate = async (email) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.deleteCandidate, [email]);
        result = data.affectedRows;
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const loginCandidate = async (email)=> {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.loginCandidate, [email]);
        result = data.affectedRows;
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
}

const logoutCandidate = async (email)=> {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.logoutCandidate, [email]);
        result = data.affectedRows;
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
}

const Candidate = {
    createCandidate,
    readCandidates,
    readCandidateByEmail,
    updateCandidateByCandidate,
    updateCandidateByAdmin,
    deleteCandidate, 
    loginCandidate,
    logoutCandidate
};

module.exports = Candidate;