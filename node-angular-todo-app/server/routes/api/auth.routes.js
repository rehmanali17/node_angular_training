const router = require("express").Router();
const AuthController = require("../../controllers/auth.controller");
const AuthMiddleware = require("../../middleware/auth.middleware");
const ValidationMiddleware = require("../../middleware/validation.middleware");

// Check Email Availability Route
router.post("/check-email-availability", AuthController.checkEmailAvailability);

// Signup Route
router.post(
    "/signup",
    ValidationMiddleware.signup(),
    ValidationMiddleware.validate,
    AuthMiddleware.signup,
    AuthController.signup
);

// Login Route
router.post(
    "/login",
    ValidationMiddleware.login(),
    ValidationMiddleware.validate,
    AuthMiddleware.login,
    AuthController.login
);

module.exports = router;
