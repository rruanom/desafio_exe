/**
 * @author Roberto Ruano
 * @exports manage404
 * @namespace Middleware
 */

/**
 * Función para tratar rutas no encontradas.
 * Última ruta por defecto. En caso de no encontrarse ninguna anterior, devolvemos un 404.
 * @memberof Middleware 
 * @method manage404 
 * @param {Object} req Objeto de petición HTTP
 * @param {Object} res Objeto de respuesta HTTP
 * @param {Function} next Función que pasa al siguiente middleware
 */
const manage404 = (req, res, next) => {
  res.status(404).json({
      msj: "404 not found",
      img: "https://seranking.com/blog/wp-content/uploads/2021/01/404_01-min.jpg"
  });
}

module.exports = manage404;
