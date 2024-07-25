const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const staffModel = require('../models/staff.models');
const candidateModel = require('../models/candidate.models');

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

module.exports = { login, register, getUserFromToken };
