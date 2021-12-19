const router = require("express").Router();
const AuthMiddleware = require("../middleware/auth.middleware");
const authRoutes = require("./api/auth.routes");
const userRoutes = require("./api/user.routes");

// Auth Routes
router.use("/auth", authRoutes);

// Authorized User Routes
router.use("/user", AuthMiddleware.auth, userRoutes);

module.exports = router;
