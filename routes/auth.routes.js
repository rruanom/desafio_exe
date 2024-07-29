const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controllers');

router.get("/google", passport.authenticate("google", { scope: ['email', 'profile'], prompt: "select_account" }));

router.post('/login/candidate', authController.loginCandidate);
//router.post('/login/staff', authController.loginStaff);
router.post('/register', authController.registerCandidate);


module.exports = router;
