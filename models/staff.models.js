const queries = require('../queries/staff.queries')
const pool = require('../config/db_mysql').promise();

// CREATE
const createStaff = async (nombre, apellido, email, contrasena) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createStaff, [nombre, apellido, email, contrasena]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}


// Testing PostgreSQL
let newStaff = {
    nombre: "Prueba",
apellido: "PruebaApellido",
    email: "prueba2@gmail.com",
    contrasena: "123456"
}
createStaff(newStaff)
    .then(data => console.log(data))
    .catch(error => console.log(error))

// READ ALL
const readStaff = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.readStaff);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// Testing PostgreSQL
// readUsers()
//     .then(data=>console.log(data))
//     .catch(error => console.log(error))

// READ ONE
const readStaffByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.readStaffByEmail, [email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// Testing PostgreSQL
// readUsersByEmail('prueba@gmail.com')
//     .then(data=>console.log(data))
//     .catch(error => console.log(error))

// UPDATE
const updateStaffbyStaff = async (user) => {
    const { nombre, apellido, email, contrasena, role, logged, last_logged_date, old_email } = user;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        result = 0; // Initialize the result counter

        // Array to store promises for each update query
        const updatePromises = [];

        if (nombre) {
            updatePromises.push(client.query(queries.updateStaffnombre, [nombre, old_email]));
        }
        if (apellido) {
            updatePromises.push(client.query(queries.updateStaffnombre, [apellido, old_email]));
        }
        if (contrasena) {
            updatePromises.push(client.query(queries.updateStaffcontrasena, [contrasena, old_email]));
        }
        if (role) {
            updatePromises.push(client.query(queries.updateStaffRole, [role, old_email]));
        }
        if (typeof logged !== 'undefined') { // Checking for undefined to allow false values
            updatePromises.push(client.query(queries.updateStaffLogged, [logged, old_email]));
        }
        if (last_logged_date) {
            updatePromises.push(client.query(queries.updateStaffLastLoggedDate, [last_logged_date, old_email]));
        }
        if (email) {
            updatePromises.push(client.query(queries.updateStaffEmail, [email, old_email]));
        }

        // Wait for all promises to complete
        const updateResults = await Promise.all(updatePromises);

        // Count the number of rows affected by each update
        updateResults.forEach(updateResult => {
            result += updateResult.rowCount;
        });

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
}

// Testing PostgreSQL
// const updatedUser = {
//     nombre: "Prueba2",
//     email: "prueba2@gmail.com",
//     contrasena: "123456123456",
//     role: "user",
//     old_email: "prueba@gmail.com",
//     logged: false,
//     last_logged_date: "2024-07-01 20:57:30.212678+00"
// }
// updateUser(updatedUser)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

// DELETE
const deleteStaff = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteStaff, [email])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// Testing PostgreSQL
// deleteUser('prueba2@gmail.com')
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

const users = {
    createStaff,
    readStaff,
    readStaffByEmail,
    updateStaffbyStaff,
    deleteStaff
}

// module.exports = staff;