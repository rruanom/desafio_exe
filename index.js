const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
const morgan = require("./middlewares/morgan");
const manage404 = require('./middlewares/error404');
require('./config/db_mysql');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const session = require("express-session");
const passport = require("passport");
require("./config/passport");
const cors = require('cors');

const roleRoutes = require('./routes/role.routes');
const staffRoutes = require('./routes/staff.routes');
const statusRoutes = require('./routes/status.routes');
const assessmentRoutes = require('./routes/assessment.routes');
const gradesRoutes = require('./routes/grades_apt.routes')
const formRoutes = require('./routes/form.routes');
const candidateRoutes = require('./routes/candidate.routes');

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/role', roleRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/grades', gradesRoutes);
app.use('/api/form', formRoutes);
app.use('/api/candidate', candidateRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// Error handling
app.use(manage404);
// app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});