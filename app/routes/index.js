const express = require('express')
const router = express.Router()
const passport = require('passport')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const Sums = require('../controllers/sums')
const { authValidationRules, sumValidationRules, validate } = require('./validator')

/**
 * This functions permit create a user with a signup method
 * @route POST /signup
 * @group users - Operations about user
 * @param {string} username.json.required - username - eg: myUsername
 * @param {string} password.json.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  400 - Bad request
 * @returns {Error}  500 - Username already exists
 */
router.post(
    '/signup',
    authValidationRules(),
    validate,
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        res.json({
            message: 'Signup successful',
            username: req.user.username,
        })
    }
)

/**
 * This functions permit login a user
 * @route POST /login
 * @group users - Operations about user
 * @param {string} username.json.required - username - eg: myUsername
 * @param {string} password.json.required - user's password.
 * @returns {object} 200 - Token of loged user
 * @returns {Error}  400 - Bad Request
 */
router.post(
    '/login',
    authValidationRules(),
    validate,
    async (req, res, next) => {
        passport.authenticate('login', async (err, user, info) => {
            try {
                if (err || !user) {
                    const error = new Error('new Error')
                    res.status(404).json({ errors: "User not found" });
                    return next(error)
                }

                req.login(user, { session: false }, async (err) => {
                    if (err) return next(err)
                    const body = { id: user.id, username: user.username }
                    const token = jwt.sign({ user: body }, process.env.CRYPTO_KEY)
                    return res.json({ token })
                })
            }
            catch(e) {
                return next(e)
            }
        })(req, res, next)
    }
)


/**
 * This functions permit to sum two numbers, token is obligatory
 * @route POST /sum
 * @group sum - sum operations 
 * @param {string} first_number.json.required - first_number - eg: 21 
 * @param {string} second_number.json.required - second_number - eg: 12.45.
 * @returns {object} 200 - The result of the sum
 * @returns {Error}  400 - Bad request
 */

router.post(
    '/sum',
    passport.authenticate('jwt', { session: false }),
    sumValidationRules(),
    validate,
    async (req, res, next) => {
    const sum = await Sums.create(
        req.body.first_number,
        req.body.second_number,
        req.user.id)
    res.json({
        result: sum.result
    })
})

/**
 * This functions permit to get the historical of sum operations, token is obligatory
 * @route GET /sum
 * @group sum - sum operations 
 * @param {string} token.query.required - token - eg: {hash}.
 * @returns {object} 200 - Paginated response of sum operations
 */
router.get('/sum', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    const sums = await Sums.filter({user_id: req.user.id});
    res.json(sums)
})

module.exports = router
