/**
 * @author Roberto Ruano
 * @exports morgan
 * @namespace Middleware
 */
const morgan = require('morgan');

/**
 * Middleware para registrar el nombre del host en las solicitudes HTTP.
 * @memberof Middleware
 * @function
 * @name morgan#host
 * @param {Request} req Objeto de solicitud
 * @param {Response} res Objeto de respuesta
 * @returns {String} El nombre del host de la solicitud
 */
morgan.token('host', function (req, res) {
    return req.hostname;
});

/**
 * Middleware para registrar el cuerpo de las solicitudes HTTP.
 * @memberof Middleware
 * @function
 * @name morgan#body
 * @param {Request} req Objeto de solicitud
 * @param {Response} res Objeto de respuesta
 * @returns {String} El cuerpo de la solicitud en formato JSON
 */
morgan.token('body', function (req, res) {
    return JSON.stringify(req.body);
});

/**
 * Middleware para registrar parámetros específicos en las solicitudes HTTP.
 * @memberof Middleware
 * @function
 * @name morgan#param
 * @param {Request} req Objeto de solicitud
 * @param {Response} res Objeto de respuesta
 * @param {String} param El nombre del parámetro a registrar
 * @returns {String} El valor del parámetro en la solicitud
 */
morgan.token('param', function (req, res, param) {
    return req.params[param];
});

module.exports = morgan;
