require('dotenv').config()
const {Pool} = require('pg');

///LOCAL DOCKER
/*  const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD 
});   */


//REMOTO RENDER
 const pool = new Pool({
  user: process.env.PG_RENDER_USER,
  host: process.env.PG_RENDER_HOST,
  database: process.env.PG_RENDER_DATABASE,
  password: process.env.PG_RENDER_PASSWORD,
  port: process.env.PG_RENDER_PORT,
  ssl: {
    rejectUnauthorized: false
  }
}) 

module.exports = pool;