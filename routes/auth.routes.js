const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controllers');

router.get("/google", passport.authenticate("google", { scope: ['email', 'profile'], prompt: "select_account" }));

router.get("/google/callback", 
    passport.authenticate('google', { failureRedirect: '/api/auth/failure' }), 
    authController.googleCallback
);

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/me', authController.getUserFromToken);

router.get('/failure', authController.authFailure);
router.get('/logout', authController.logout);

module.exports = router;
