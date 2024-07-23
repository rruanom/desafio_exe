const userModel = require('../models/users.models');
const oldCartService = require('../services/oldCart.services');
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.ULTRA_SECRET_KEY;

const getUsers = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email } = req.query;
        if (email) {
            const users = await userModel.getUserByEmail(email);
            return res.status(200).json(users);
        } else {
            const users = await userModel.getNonAdminUsers();
            return res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, lastname, username, email, password, image } = req.body;
    const isadmin = false; 
    const last_logged_date = new Date(); 

    try {
        const hash = await bcrypt.hash(password, 8);
        const response = await userModel.createUser({ name, lastname, username, email, password: hash, image, isadmin, last_logged_date });
        await oldCartService.createUser(email);
        res.status(201).json({ message: "Usuario creado exitosamente. Por favor, inicie sesión." });
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD", details: error.message });
    }
};

const updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const modifiedUser = req.body;
    try {
        const response = await userModel.updateUser(modifiedUser);
        res.status(200).json({
            "items_updated": response,
            data: modifiedUser
        });
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

const deleteUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.query;
    try {
        const resp = await userModel.deleteUser(email);
        res.status(200).json({
            "items_deleted": resp,
            data: email
        });
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await userModel.existUser(email);
        if (!data) {
            return res.status(400).json({ msg: 'Incorrect user or password' });
        }
        const match = await bcrypt.compare(password, data.password);
        if (match) {
            await userModel.setLoggedTrue(email);
            const { username, isadmin, islogged } = data;
            const userForToken = {
                email: email,
                username: username,
                isadmin: isadmin,
                islogged: islogged,
                image: data.image
              };
            const token = jwt.sign(userForToken, jwt_secret, { expiresIn: '20m' });
            res.cookie('access_token', token, { httpOnly: true, maxAge: 20 * 60 * 1000 });
            res.cookie('email', email, { httpOnly: true, maxAge: 20 * 60 * 1000 });
            return res.status(200).json({ user: userForToken, token });
        } else {
            return res.status(400).json({ msg: 'Incorrect user or password' });
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
};

const logoutUser = async (req, res) => {
    try {
        const email = req.cookies.email;
        if (!email) {
            return res.status(400).json({ msg: 'No user is logged in' });
        }
        await userModel.setLoggedFalse(email);
        res.clearCookie('access_token');
        res.clearCookie('email');
        return res.status(200).json({ msg: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
};

const checkAuthStatus = (req, res) => {
    if (req.cookies.access_token) {
      jwt.verify(req.cookies.access_token, jwt_secret, (err, decoded) => {
        if (err) {
          return res.json({ isAuthenticated: false });
        }
        return res.json({ 
          isAuthenticated: true, 
          user: {
            email: decoded.email,
            username: decoded.username,
            isAdmin: decoded.isadmin,
            image: decoded.image
          } 
        });
      });
    } else {
      res.json({ isAuthenticated: false });
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    checkAuthStatus
};