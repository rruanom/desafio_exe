const queries = require('../queries/staff.queries')
const pool = require('../config/db_mysql');

// CREATE
const createStaff = async (nombre, apellido, email, contrasena) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.createStaff, [nombre, apellido, email, contrasena]);
        result = data.affectedRows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
};


// Testing PostgreSQL
// let newStaff = {
//     nombre: "Prueba",
//     apellido: "PruebaApellido",
//     email: "prueba3@gmail.com",
//     contrasena: "123456"
// };

// createStaff(newStaff.nombre, newStaff.apellido, newStaff.email, newStaff.contrasena)
//     .then(data => console.log(data))
//     .catch(error => console.log(error));
    
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
}
// TestingMySQL
// readStaff()
//     .then(data=>console.log(data))
//     .catch(error => console.log(error))

// READ ONE
const readStaffByEmail = async (email) => {
    let connection, result;
    try {
        connection = await pool.connect(); 
        const [rows] = await connection.query(queries.readStaffByEmail, [email])
        result = rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result
}
// Testing PostgreSQL
// readStaffByEmail('prueba@gmail.com')
//     .then(data=>console.log(data))
//     .catch(error => console.log(error))

// UPDATE
const updateStaffbyStaff = async (user) => {
    const { nombre, apellido, contrasena, email } = user;
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.query(queries.updateStaffbyStaff, [
            nombre || null,
            apellido || null,
            contrasena || null,
            email
        ]);

        if (result && result.affectedRows !== undefined) {
            return result.affectedRows;
        } else {
            return 0;
        }
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
}

// Testing MySQL
// const updatedStaff = {
//     nombre: "PruebaUpdated",
//     apellido: 'PruebaApellidoUpdated',
//     contrasena: "123456updated",
//     email: "prueba3@gmail.com"
// }
// updateStaffbyStaff(updatedStaff)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

const updateStaffbyAdmin = async (user) => {
    const { id_rol, active, email } = user;
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.query(queries.updateStaffbyAdmin, [
            id_rol || null,
            active || null,
            email
        ]);

        if (result && result.affectedRows !== undefined) {
            return result.affectedRows;
        } else {
            return 0;
        }
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
}

// Testing MySQL
// const updatedStaffbyAdmin = {
//     id_rol: "3",
//     active: "false",
//     email: "prueba3@gmail.com"
// }
// updateStaffbyAdmin(updatedStaffbyAdmin)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))


// DELETE
const deleteStaff = async (email) => {
    let connection, result;
    try {
        connection = await pool.getConnection();
        const [data] = await connection.query(queries.deleteStaff, [email])
        result = data.affectedRows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (connection) connection.release();
    }
    return result;
}
// Testing MySQL
// deleteStaff('prueba3@gmail.com')
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

const users = {
    createStaff,
    readStaff,
    readStaffByEmail,
    updateStaffbyStaff,
    updateStaffbyAdmin,
    deleteStaff
}

// module.exports = staff;