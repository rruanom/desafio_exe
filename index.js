const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const morgan = require("./middlewares/morgan");
const error404 = require("./middlewares/error404");
const swaggerUi = require('swagger-ui-express'); 
const swaggerDocument = require('./swagger.json');
require('./config/db_mongo');

const app = express();
const port = process.env.PORT || 5000;

// Configuración de CORS
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,
};
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logger de Morgan
app.use(morgan(':method :url :status - :response-time ms :body'));

// Importar rutas
const productsRoutes = require('./routes/products.routes');
const providerRoutes = require('./routes/provider.routes');
const usersRoutes = require('./routes/users.routes');
const categoriesRoutes = require('./routes/categories.routes');
const oldCartsRoutes = require('./routes/oldCart.routes');

// Rutas API
app.use('/api/products', productsRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/oldcarts', oldCartsRoutes);

//http://localhost:5000/api-docs/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//http://localhost:5000/api-jsdoc/
app.use('/api-jsdoc', express.static(path.join(__dirname, '/jsondocs')));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'client/dist')));

// Ruta catch-all para SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// Middleware para manejo de 404
app.use(error404);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Iniciar el servidor
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = server;