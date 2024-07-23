const { Pool } = require('pg');
const pool = require('../config/db_pgsql');
const queries = require('../queries/users.queries');

const getUserByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getUserByEmail, [email]);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const getNonAdminUsers = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getNonAdminUsers);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const createUser = async (user) => {
    const { name, lastname, username, email, password, image, isadmin, last_logged_date } = user;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.createUser, [name, lastname, username, email, password, image, isadmin, last_logged_date]);
        result = data.rows[0]; // Devuelve el usuario creado
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const updateUser = async (user) => {
    const { username, password, ref_email } = user;
    let client, result;
    try {
        client = await pool.connect();
        if (username) {
            const data = await client.query(queries.updateUsername, [username, ref_email]);
            result = data.rowCount;
        }
        if (password) {
            const data = await client.query(queries.updatePassword, [password, ref_email]);
            result = data.rowCount;
        }
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const deleteUser = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteUser, [email]);
        result = data.rowCount;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.release();
    }
    return result;
};

const existUser = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);
        result = data.rows[0];
    } catch (err) {
        const mensaje = document.querySelector('#mensaje');
        mensaje.innerHTML = `<p>No se encuentra el usuario<p>`;
        throw err;
    }
    return result;
};

const setLoggedTrue = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(`UPDATE users SET islogged = true WHERE email = $1 RETURNING *;`, [email]);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const setLoggedFalse = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(`UPDATE users SET islogged = false WHERE email = $1 RETURNING *;`, [email]);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

module.exports = {
    getUserByEmail,
    createUser,
    getNonAdminUsers,
    updateUser,
    deleteUser,
    existUser,
    setLoggedTrue,
    setLoggedFalse
};