const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controllers');

router.get("/google", passport.authenticate("google", { scope: ['email', 'profile'], prompt: "select_account" }));

router.post('/login', authController.login);
router.post('/register/candidate', authController.registerCandidate);
router.post('/register/staff', authController.registerStaff);

module.exports = router;
