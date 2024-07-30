const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controllers');

router.get("/google", (req, res, next) => {
    console.log("Iniciando autenticación de Google");
    passport.authenticate("google", { scope: ['email', 'profile'] })(req, res, next);
});

router.post('/login/candidate', authController.loginCandidate);
//router.post('/login/staff', authController.loginStaff);
router.post('/register', authController.registerCandidate);

router.get("/google/callback", 
    passport.authenticate('google', { failureRedirect: '/api/auth/failure' }), 
    authController.googleCallback
);

router.get('/failure', authController.authFailure);

module.exports = router;