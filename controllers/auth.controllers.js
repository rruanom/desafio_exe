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


const authFailure = (req, res) => {
    res.redirect("/login");
};

const logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.clearCookie("access-token").send('Goodbye! <br><br> <a href="/auth/google">Authenticate again</a>');
    });
};

module.exports = { login, register, getUserFromToken, googleCallback, authFailure, logout };
