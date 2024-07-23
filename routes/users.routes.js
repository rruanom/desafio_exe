const express = require('express');
const usuariosController = require("../controllers/users.controller");
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const checkAdmin = require('../middlewares/checkAdmin');
const { validateGetUserByEmail, validateCreateUser, validateUpdateUser, validateDeleteUser } = require('../validators/users.validatos');

router.get('/', usuariosController.getUsers);
router.put('/', checkAdmin, validateUpdateUser, usuariosController.updateUser);
router.delete('/', checkAdmin, validateDeleteUser, usuariosController.deleteUser);
router.post('/register', validateCreateUser, usuariosController.createUser);
router.post('/login', usuariosController.loginUser);
router.post('/logout', checkAuth, usuariosController.logoutUser);
router.get('/check-auth', usuariosController.checkAuthStatus); 

module.exports = router;