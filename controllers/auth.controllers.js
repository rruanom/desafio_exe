const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Candidate = require('../models/candidate.models');
const Staff = require('../models/staff.models');

const loginCandidate = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    let user = await Candidate.readCandidateByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    await Candidate.loginCandidate(email)

    const token = jwt.sign(
      { id: user.id, 
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
       },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };

    res.json({ token, user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const registerCandidate = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const existingUser = await Candidate.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Candidate.create({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    res.status(201).json({ message: 'Candidato registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const registerStaff = async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;

  try {
    const existingUser = await Staff.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Staff.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role
    });

    res.status(201).json({ message: 'Miembro del staff registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
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

module.exports = {
    loginCandidate, 
    registerCandidate, 
    registerStaff,
    googleCallback,
    authFailure
}