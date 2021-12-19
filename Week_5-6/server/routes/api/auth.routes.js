const router = require("express").Router();
const AuthController = require("../../controllers/auth.controller");
const AuthMiddleware = require("../../middleware/auth.middleware");

// Signup Route
router.post("/signup", AuthMiddleware.signup, AuthController.signup);

// Login Route
router.post("/login", AuthMiddleware.login, AuthController.login);

module.exports = router;
