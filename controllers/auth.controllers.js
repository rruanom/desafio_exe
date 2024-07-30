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

module.exports = {
    loginCandidate, 
    registerCandidate, 
    registerStaff
}