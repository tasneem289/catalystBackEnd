const { body , validationResult} = require("express-validator")

const validateProject = 
    [
        body('info')
            .notEmpty()
            .withMessage("information is required"),
        body('budget')
            .notEmpty()
            .withMessage("budget is required")
            .isInt({ min: 1 })
            .withMessage('The budget must be at least 1'),
        body('size')
            .notEmpty()
            .withMessage("size is required"),
        body('user')
            .notEmpty()
            .withMessage('user id is required')  
    ]

    const handleValidationErrors = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };

module.exports = {
    validateProject,
    handleValidationErrors
}