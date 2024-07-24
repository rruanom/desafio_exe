const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});
pool.getConnection((err, connection) => {
    if (err) {
        console.log('MySQL error connection', err);
        return;
    }
    console.log('Connection to MySQL established');
    connection.release();
});
module.exports = pool;