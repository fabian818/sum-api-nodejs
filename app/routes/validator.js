const { body, check, validationResult } = require('express-validator')

const authValidationRules = () => {
    return [
        body('username')
        .exists()
        .withMessage('must exists')
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long'),
        body('password')
        .isLength({ min: 8 })
        .withMessage('must be at least 8 chars long')
        .exists()
        .withMessage('must exists')
    ]
}

const sumValidationRules = () => {
    return [
        body('first_number')
        .exists()
        .withMessage('must exists')
        .isNumeric()
        .withMessage('must be numeric'),
        body('second_number')
        .isNumeric()
        .withMessage('must be numeric')
        .exists()
        .withMessage('must exists')
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    authValidationRules,
    sumValidationRules,
    validate,
}
