const { check, validationResult } = require("express-validator");

class ValidationMiddleware {
    // Validation Check
    static validate = (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            next();
        } else {
            const extractedErrors = [];
            errors
                .array({ onlyFirstError: true })
                .forEach((error) =>
                    extractedErrors.push({ [error.param]: error.msg })
                );
            res.status(400).json({ statusCode: 406, errors: extractedErrors });
        }
    };

    // Signup controller rules
    static signup = () => {
        return [
            check("email")
                .notEmpty()
                .withMessage({ required: "Email is required" })
                .isEmail()
                .withMessage({ email: "Please enter a valid email" }),
            check("name")
                .notEmpty()
                .withMessage({ required: "Name is required" })
                .custom((value) => {
                    if (/^[a-zA-Z ]+$/.test(value)) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .withMessage({ pattern: "Please enter a valid name" }),
            check("password")
                .notEmpty()
                .withMessage({ required: "Password is required" })
                .isLength({ min: 6 })
                .withMessage({
                    minlength: "Password should be atleast six characters",
                }),
        ];
    };

    // Login controller rules
    static login = () => {
        return [
            check("email")
                .notEmpty()
                .withMessage({ required: "Email is required" })
                .isEmail()
                .withMessage({ email: "Please enter a valid email" }),
            check("password")
                .notEmpty()
                .withMessage({ required: "Password is required" }),
        ];
    };

    // Add Todo controller rules
    static createTodo = () => {
        return [
            check("task")
                .notEmpty()
                .withMessage({ required: "This field is required" })
                .custom((value) => {
                    if (/^[a-zA-Z ]+$/.test(value)) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .withMessage({ pattern: "Only characters are allowed" }),
        ];
    };

    static editTodo = this.createTodo;
}

module.exports = ValidationMiddleware;
