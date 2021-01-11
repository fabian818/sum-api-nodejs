const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const { body, validationResult } = require('express-validator');
const User = require('../models').User;

const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use('signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        done(null, {errors: errors.array()})
    }
    else{

        try {
            const user = await User.create({ username, password })
            return done(null, user)
        } catch (e) {
            done(e)
        }
    }

}))

passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        done(null, {errors: errors.array()})
    }
    else{
        try {
            const user = await User.findOne({ where: { username: username } })
            if (!user) {
                return done(null, false, { message: 'User not found' })
            }

            const validate = await user.isValidPassword(password)

            if (!validate) {
                return done(null, false, { message: 'Wrong password' })
            }

            return done(null, user, { message: 'Login successfull' })
        } catch (e) {
            return done(e)
        }

    }
}))

passport.use(new JWTStrategy({
    secretOrKey: process.env.CRYPTO_KEY,
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    try {
        return done(null, token.user)
    } catch (error) {
        done(error)
    }
}))
