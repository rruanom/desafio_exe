const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/me', authController.getUserFromToken);

module.exports = router;
