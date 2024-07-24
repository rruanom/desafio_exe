const express = require("express");
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const app = express();
const morgan = require("./middlewares/morgan");
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
require('./config/db_mysql');
const port = process.env.PORT || 5000;

const roleRoutes = require('./routes/role.routes');
const staffRoutes = require('./routes/staff.routes');
const statusRoutes = require('./routes/status.routes');
const assessmentRoutes = require('./routes/assessment.routes');

app.use('/api/role', roleRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/assessment', assessmentRoutes);

app.use(express.json());

app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
  });