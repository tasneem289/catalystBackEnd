const { body, validationResult } = require('express-validator');

validateUser = [
        body('firstName')
            .notEmpty()
            .withMessage("firstName is required"),
        body('lastName')
            .notEmpty()
            .withMessage("lastName is required")    ,
        body('email')
            .notEmpty()
            .withMessage("email is required")
            .isEmail()
            .withMessage('Invalid email address'), 
        body('password')
            .notEmpty()
            .withMessage('Password is required')          
    ]

    const handleValidationErrors = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
    
    module.exports = {
        validateUser,
        handleValidationErrors
    };