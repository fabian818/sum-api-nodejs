const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models').User;

const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use('signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const user = await User.create({ username, password })
        return done(null, user)
    } catch (e) {
        done(e)
    }
}))

passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
}, async (username, password, done) => {
    try {
        const user = await User.findOne({ where: { username: username } })
        console.log('username', username);
        if (!user) {
            return done(null, false, { message: 'User not found' })
        }
        console.log('user', user);

        const validate = await user.isValidPassword(password)

        if (!validate) {
            return done(null, false, { message: 'Wrong password' })
        }

        return done(null, user, { message: 'Login successfull' })
    } catch (e) {
        return done(e)
    }
}))

passport.use(new JWTStrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    try {
        console.log('token', token);
        return done(null, token.user)
    } catch (error) {
        console.log(error);
        done(error)
    }
}))