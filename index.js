const express = require("express");
const helmet = require('helmet');
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
const authRoutes = require('./routes/auth.routes')

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5000',
  'https://desafio-exe-1.onrender.com'
];

app.use(helmet());

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET, // Usa una variable de entorno para el secreto
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: process.env.NODE_ENV === "production", // Usa HTTPS en producción
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }
}));

app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan(':method :host :status - :response-time ms :body'));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/role', roleRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/grades', gradesRoutes);
app.use('/api/form', formRoutes);
app.use('/api/candidate', candidateRoutes);
app.use('/api/auth', authRoutes)

app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.use(manage404);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});