const passport = require("passport");
const { model } = require("../database/connection");
require("../passport-setup/setup");

class AuthMiddleware {
    // Signup Middleware
    static signup = (req, res, next) => {
        passport.authenticate("signup", (err, user, info) => {
            if (err || user) {
                res.status(403).json({
                    message: "This email already exists",
                    statusCode: 400,
                });
            } else {
                next();
            }
        })(req, res, next);
    };

    // Login Middleware
    static login = (req, res, next) => {
        passport.authenticate("login", (err, user, info) => {
            if (err || !user) {
                res.status(401).json({
                    message: info.message,
                    statusCode: 400,
                });
            } else {
                req.user = user;
                next();
            }
        })(req, res, next);
    };

    // Validate Token Middleware || Route Protection Middleware
    static auth = (req, res, next) => {
        passport.authenticate("jwt", (err, user, info) => {
            if (err || !user) {
                res.status(401).json({
                    message: "User is not authorized",
                    error: "Token is expired",
                    statusCode: 400,
                });
            } else {
                req.user = user;
                next();
            }
        })(req, res, next);
    };
}

module.exports = AuthMiddleware;
