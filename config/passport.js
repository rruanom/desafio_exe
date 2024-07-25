require('dotenv').config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const candidateModel = require("../models/candidate.models");

// Configura Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.ID_CLIENT,
    clientSecret: process.env.SECRET_CLIENT,
    callbackURL: "http://localhost:5173/api/auth/google/callback" 
}, async function (token, tokenSecret, profile, done) {
    try {
        console.log("profile", profile);

        const user = {
            email: profile.emails[0].value,
            password_hash: profile.id,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName
        };

        // Buscar usuario en la base de datos
        const buscaUsuario = await candidateModel.readCandidateByEmail(user.email);
        console.log(buscaUsuario);

        if (!buscaUsuario) {
            const crearUsuario = await candidateModel.createCandidate(user);
            if (crearUsuario > 0) {
                console.log("Usuario creado en BBDD");
            } else {
                console.log("Error al crear el usuario en BBDD");
                return done(null, false, { message: 'Error al crear usuario en BBDD' });
            }
        } else {
            console.log("Usuario existe en BBDD");
        }

        return done(null, profile);
    } catch (error) {
        console.error("Error en la estrategia de Google", error);
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
