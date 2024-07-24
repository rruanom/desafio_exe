const queries = require('../queries/candidate.queries');
const pool = require('../config/db_mysql');

// CREATE
const createCandidate = async (nombre, apellido, email, contrasena, sexo, id_status) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.createCandidate, [nombre, apellido, email, contrasena, sexo, id_status]);
        result = data.insertId;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

/* let newCandidate = {
    nombre: "prueba",
    apellido:"prueba",
    email:"prueba@hotmail.com",
    contrasena:"prueba123",
    sexo:"femenino"
};

createCandidate(newCandidate.nombre, newCandidate.apellido, newCandidate.email, newCandidate.contrasena, newCandidate.sexo)
    .then(data => console.log(data))
    .catch(error => console.log(error)); */

// READ ALL
const readCandidates = async () => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readCandidates);
        result = rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

/* readCandidates()
.then(data => console.log(data))
.catch(error => console.log(error));
 */
// READ ONE
const readCandidateByEmail = async (email) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(queries.readCandidateByEmail, [email]);
        result = rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

/* readCandidateByEmail("prueba11@hotmail.com")
.then(data => console.log(data))
.catch(error => console.log(error)); */

// UPDATE BY CANDIDATO
const updateCandidateByCandidate = async (candidato) => {
    const { nombre, apellido, contrasena, sexo, email, old_email } = candidato;
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.updateCandidateByCandidate, [nombre, apellido, contrasena, sexo, email, old_email]);
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
const updateCandidateByAdmin = async (candidato) => {
    const { id_status, active, email } = candidato;
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.updateCandidateByAdmin, [id_status, active, email]);
        result = data.affectedRows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};
let updateCandidate = {
    id_status: 3,
    active:0,
    email:"prueba@hotmail.com"
};

updateCandidateByAdmin(updateCandidate)
    .then(data => console.log(data))
    .catch(error => console.log(error));

// DELETE
const deleteCandidate = async (email) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.deleteCandidate, [email]);
        result = data.affectedRows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};

const candidates = {
    createCandidate,
    readCandidates,
    readCandidateByEmail,
    updateCandidateByCandidate,
    updateCandidateByAdmin,
    deleteCandidate
};

module.exports = candidates;