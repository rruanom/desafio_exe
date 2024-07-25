/**
 * @author RetoTripulaciones - Grupo2 <https://empiezaporeducar.org/> 
 * @exports controllers
 * @namespace Auth_Controllers
 */

const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const staffModel = require('../models/staff.models');
const candidateModel = require('../models/candidate.models');

/**
 * @function login
 * @memberof Auth_Controllers
 * @description Maneja el proceso de inicio de sesión para usuarios. Verifica las credenciales proporcionadas (email y contraseña) y genera un token JWT si las credenciales son válidas. 
 * La función primero intenta encontrar al usuario en el modelo de `staff`. 
 * Si no se encuentra, busca en el modelo de `candidate`. Si el usuario es encontrado y la contraseña es correcta, se genera un token JWT y se envía como respuesta. 
 * En caso de errores en la validación de datos o en el proceso de autenticación, se envían respuestas apropiadas con mensajes de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express, que debe contener el `email` y `password_hash` en el cuerpo de la solicitud.
 * @param {Object} res - El objeto de respuesta de Express, utilizado para enviar la respuesta al cliente.
 * 
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y el mensaje correspondiente, junto con el token JWT en caso de éxito.
 * 
 * @throws {Error} Si ocurre un error durante el proceso de inicio de sesión, se envía una respuesta con un estado HTTP 500 y un mensaje de error.
 * 
 * @example
 * // Ejemplo de solicitud exitosa
 * // POST /api/login
 * // { "email": "user@example.com", "password_hash": "hashed_password" }
 * // Respuesta: { "status": "ok", "message": "Usuario loggeado", "token": "jwt_token", "user": { "email": "user@example.com", "role": "user" } }
 * 
 * @example
 * // Ejemplo de solicitud fallida por campos incompletos
 * // POST /api/login
 * // { "email": "user@example.com" } // Sin el campo "password_hash"
 * // Respuesta: { "status": "Error", "message": "Los campos están incompletos" }
 * 
 * @example
 * // Ejemplo de solicitud fallida por usuario no encontrado
 * // POST /api/login
 * // { "email": "nonexistent@example.com", "password_hash": "hashed_password" }
 * // Respuesta: { "status": "Error", "message": "Usuario no encontrado" }
 * 
 * @example
 * // Ejemplo de solicitud fallida por contraseña incorrecta
 * // POST /api/login
 * // { "email": "user@example.com", "password_hash": "wrong_password" }
 * // Respuesta: { "status": "Error", "message": "Contraseña incorrecta" }
 */
const login = async (req, res) => {
    try {
        const { email, password_hash } = req.body;

        if (!email || !password_hash) {
            return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
        }

        let user = await staffModel.readStaffByEmail(email);
        let role = user ? 'staff' : 'candidate';

        if (!user) {
            user = await candidateModel.readCandidateByEmail(email);
        }

        if (!user) {
            return res.status(400).send({ status: "Error", message: "Usuario no encontrado" });
        }

        const loginCorrecto = await bcryptjs.compare(password_hash, user.password);
        if (!loginCorrecto) {
            return res.status(400).send({ status: "Error", message: "Contraseña incorrecta" });
        }

        const tokenPayload = {
            email: user.email,
            role: role === 'staff' ? user.id_role : 'user'
        };

        const token = jsonwebtoken.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        });

        res.status(200).send({ status: "ok", message: "Usuario loggeado", token, user: tokenPayload });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ status: "Error", message: "Internal server error" });
    }
};

/**
 * @function register
 * @memberof Auth_Controllers
 * @description Maneja el proceso de registro de un nuevo usuario. Dependiendo de si se proporciona un `id_role` en el cuerpo de la solicitud, la función registrará al usuario como miembro del personal (staff) o como candidato. Verifica que todos los campos requeridos estén presentes y que el email no esté ya en uso. Si todo es correcto, la función encripta la contraseña y guarda al nuevo usuario en la base de datos. En caso de errores, se envía una respuesta adecuada con un mensaje de error.
 * @async
 * @param {Object} req - El objeto de solicitud de Express, que debe contener los campos `password_hash`, `email`, `first_name`, `last_name`, y opcionalmente `id_role` y `gender`.
 * @param {Object} res - El objeto de respuesta de Express, utilizado para enviar la respuesta al cliente.
 * 
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y el mensaje correspondiente.
 * 
 * @throws {Error} Si ocurre un error durante el proceso de registro, se envía una respuesta con un estado HTTP 500 y un mensaje de error.
 * 
 * @example
 * // Ejemplo de solicitud exitosa para un miembro del personal
 * // POST /api/register
 * // { "password_hash": "plaintext_password", "email": "staff@example.com", "first_name": "John", "last_name": "Doe", "id_role": 1 }
 * // Respuesta: { "status": "ok", "message": "Usuario registrado" }
 * 
 * @example
 * // Ejemplo de solicitud exitosa para un candidato
 * // POST /api/register
 * // { "password_hash": "plaintext_password", "email": "candidate@example.com", "first_name": "Jane", "last_name": "Doe", "gender": "female" }
 * // Respuesta: { "status": "ok", "message": "Usuario registrado" }
 * 
 * @example
 * // Ejemplo de solicitud fallida por campos incompletos
 * // POST /api/register
 * // { "password_hash": "plaintext_password", "email": "incomplete@example.com", "first_name": "John" } // Faltan campos obligatorios
 * // Respuesta: { "status": "Error", "message": "Los campos están incompletos" }
 * 
 * @example
 * // Ejemplo de solicitud fallida por email ya existente
 * // POST /api/register
 * // { "password_hash": "plaintext_password", "email": "existing@example.com", "first_name": "Jane", "last_name": "Doe" }
 * // Respuesta: { "status": "Error", "message": "Este usuario o email ya existe" }
 * 
 * @example
 * // Ejemplo de error del servidor
 * // POST /api/register
 * // { "password_hash": "plaintext_password", "email": "servererror@example.com", "first_name": "John", "last_name": "Doe" }
 * // Respuesta: { "status": "Error", "message": "Internal server error" }
 */
const register = async (req, res) => {
    const { password_hash, email, first_name, last_name, gender, id_role } = req.body;

    if (!password_hash || !email || !first_name || !last_name) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    try {
        let user;

        if (id_role) {
            user = await staffModel.readStaffByEmail(email);
            if (user) {
                return res.status(400).send({ status: "Error", message: "Este usuario o email ya existe" });
            }

            const salt = await bcryptjs.genSalt();
            const hashedPassword = await bcryptjs.hash(password_hash, salt);
            await staffModel.createStaff(first_name, last_name, email, hashedPassword, id_role);

        } else {
            user = await candidateModel.readCandidateByEmail(email);
            if (user) {
                return res.status(400).send({ status: "Error", message: "Este usuario o email ya existe" });
            }

            const salt = await bcryptjs.genSalt();
            const hashedPassword = await bcryptjs.hash(password_hash, salt);
            await candidateModel.createCandidate(first_name, last_name, email, hashedPassword, gender);
        }

        res.status(200).send({ status: "ok", message: "Usuario registrado" });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send({ status: "Error", message: "Internal server error" });
    }
};

/**
 * @function getUserFromToken
 * @memberof Auth_Controllers
 * @description Extrae y verifica un token JWT de los encabezados de la solicitud para autenticar al usuario. La función primero obtiene el token del encabezado `Authorization`. Si el token no está presente, responde con un estado HTTP 401 y un mensaje indicando que no se proporcionó un token. Si el token está presente pero no puede ser verificado, responde con un estado HTTP 401 y un mensaje indicando que la autenticación del token falló. Si el token es verificado exitosamente, responde con un estado HTTP 200 y el contenido decodificado del token, que contiene la información del usuario.
 * @param {Object} req - El objeto de solicitud de Express, que contiene el encabezado `Authorization` con el token JWT.
 * @param {Object} res - El objeto de respuesta de Express, utilizado para enviar la respuesta al cliente.
 * 
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta JSON al cliente con el estado HTTP y el mensaje correspondiente, o con la información del usuario decodificado en caso de éxito.
 * 
 * @throws {Error} Si ocurre un error durante la verificación del token, se envía una respuesta con un estado HTTP 401 y un mensaje de error.
 * 
 * @example
 * // Ejemplo de solicitud exitosa
 * // GET /api/user
 * // Authorization: Bearer jwt_token
 * // Respuesta: { "user": { "email": "user@example.com", "role": "user" } }
 * 
 * @example
 * // Ejemplo de solicitud fallida por falta de token
 * // GET /api/user
 * // // Sin encabezado Authorization
 * // Respuesta: { "message": "No token provided" }
 * 
 * @example
 * // Ejemplo de solicitud fallida por token inválido
 * // GET /api/user
 * // Authorization: Bearer invalid_jwt_token
 * // Respuesta: { "message": "Failed to authenticate token" }
 */
const getUserFromToken = (req, res) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (!token) {
        return res.status(401).send({ message: 'No token provided' });
    }

    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Failed to authenticate token' });
        }

        res.status(200).send({ user: decoded });
    });
};

/**
 * @function googleCallback
 * @memberof Auth_Controllers
 * @description Maneja el proceso de callback de autenticación con Google. La función se encarga de crear un token JWT basado en la información del usuario proporcionada por Google (como el email) y establecer una cookie con el token en la respuesta. Después de configurar la cookie, redirige al usuario a una página de inicio de sesión especificada. La función asume que el usuario ha sido autenticado previamente y la información del usuario se encuentra en `req.user`.
 * @async
 * @param {Object} req - El objeto de solicitud de Express, que debe contener la información del usuario autenticado por Google en `req.user`.
 * @param {Object} res - El objeto de respuesta de Express, utilizado para enviar la respuesta al cliente y configurar la cookie.
 * 
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta de redirección al cliente después de configurar la cookie con el token JWT.
 * 
 * @throws {Error} Si ocurre un error en el proceso de generación del token o en el manejo de la cookie, podría no haber una captura explícita de errores en este bloque, pero se espera que la redirección se maneje sin errores.
 * 
 * @example
 * // Ejemplo de solicitud exitosa
 * // Suponiendo que el usuario ha sido autenticado por Google y `req.user` está disponible
 * // GET /auth/google/callback
 * // Respuesta: Redirige a http://localhost:5173/login con una cookie "access-token" configurada.
 * 
 * @example
 * // Ejemplo de valores en `req.user`
 * // req.user = {
 * //   emails: [{ value: "user@example.com" }]
 * // }
 * // Cookie establecida: "access-token" con el valor del JWT y expiración configurada.
 * 
 * @example
 * // Ejemplo de redirección a la página de inicio de sesión
 * // Después de establecer la cookie, se realiza una redirección a la URL especificada.
 * // Respuesta: Redirige a http://localhost:5173/login
 */
const googleCallback = async (req, res) => {
    const payload = {
        email: req.user.emails[0].value,
        role_id: 2
    };
    console.log(req.user.emails[0].value);
    console.log(payload);
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    console.log(token);
    res.cookie("access-token", token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        path: "/",
    }).redirect("http://localhost:5173/login"); 
};

/**
 * @function authFailure
 * @memberof Auth_Controllers
 * @description Maneja las solicitudes de autenticación fallidas redirigiendo al usuario a la página de inicio de sesión. Esta función se puede utilizar como un middleware para redirigir a los usuarios a una página específica en caso de error de autenticación o autorización.
 * @param {Object} req - El objeto de solicitud de Express, que representa la solicitud HTTP realizada por el cliente.
 * @param {Object} res - El objeto de respuesta de Express, utilizado para enviar una respuesta al cliente.
 * 
 * @returns {void} No devuelve ningún valor directamente. En su lugar, redirige al cliente a la URL `/login`.
 * 
 * @example
 * // Ejemplo de uso
 * // Si se produce un error de autenticación en un middleware anterior
 * // GET /protected-route
 * // La función authFailure se llamará para redirigir al usuario a la página de inicio de sesión.
 * // Respuesta: Redirige a /login
 */
const authFailure = (req, res) => {
    res.redirect("/login");
};

/**
 * @function logout
 * @memberof Auth_Controllers
 * @description Maneja el proceso de cierre de sesión para el usuario. La función llama al método `logout` proporcionado por el middleware de autenticación (como Passport.js) para cerrar la sesión del usuario. Luego, destruye la sesión del usuario y elimina la cookie de autenticación `access-token`. Finalmente, envía una respuesta al cliente indicando que la sesión ha terminado y proporciona un enlace para volver a autenticarse.
 * @param {Object} req - El objeto de solicitud de Express, que contiene la información de la sesión del usuario.
 * @param {Object} res - El objeto de respuesta de Express, utilizado para enviar una respuesta al cliente y eliminar la cookie.
 * @param {Function} next - La función de middleware `next`, utilizada para pasar el control al siguiente middleware en caso de error durante el proceso de cierre de sesión.
 * 
 * @returns {void} No devuelve ningún valor directamente. En su lugar, envía una respuesta HTML al cliente indicando que la sesión ha terminado y proporciona un enlace para volver a autenticarse.
 * 
 * @throws {Error} Si ocurre un error durante el proceso de cierre de sesión, se pasa al siguiente middleware mediante la función `next`.
 * 
 * @example
 * // Ejemplo de solicitud de cierre de sesión exitosa
 * // POST /logout
 * // Respuesta: "Goodbye! <br><br> <a href="/auth/google">Authenticate again</a>" con la cookie "access-token" eliminada y la sesión destruida.
 * 
 * @example
 * // Ejemplo de error durante el cierre de sesión
 * // Si ocurre un error al llamar a `req.logout`, el error se pasa al siguiente middleware para su manejo.
 * // Respuesta: Redirige al middleware de error con el mensaje de error.
 */
const logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.clearCookie("access-token").send('Goodbye! <br><br> <a href="/auth/google">Authenticate again</a>');
    });
};

module.exports = { login, register, getUserFromToken, googleCallback, authFailure, logout };
