require('dotenv').config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userModel = require("../models/users.models");

passport.use(new GoogleStrategy({
    clientID: process.env.ID_CLIENT,
    clientSecret: process.env.SECRET_CLIENT,
    callbackURL: process.env.NODE_ENV === 'production'
        ? "https://desafio-exe-1.onrender.com/api/auth/google/callback"
        : "http://localhost:5000/api/auth/google/callback"
}, async function (token, tokenSecret, profile, done) {
    try {
        console.log("Callback de Google ejecutado");
        console.log("Perfil:", profile);

        const user = {
            email: profile.emails[0].value,
            password_hash: profile.id,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName
        };

        const buscaUsuario = await userModel.getUsersByEmail(user.email);
        console.log(buscaUsuario);

        if (!buscaUsuario) {
            const crearUsuario = await userModel.createUser(user);
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
