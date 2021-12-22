const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

class AuthController {
    // Signup Method
    static signup = async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);
            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
            });
            const token = jwt.sign({ id: newUser.id }, process.env.jwtSecret, {
                expiresIn: "1h",
            });
            res.status(201).json({
                user: newUser,
                accessToken: `Bearer ${token}`,
                message: "User registered successfully",
                statusCode: 201,
            });
        } catch (error) {
            console.log(error.message);
            res.status(400).json({
                message: "Registration failed",
                statusCode: 400,
            });
        }
    };

    // Login Method
    static login = (req, res) => {
        try {
            const token = jwt.sign({ id: req.user.id }, process.env.PORT, {
                expiresIn: "1h",
            });
            res.status(200).json({
                user: req.user,
                accessToken: `Bearer ${token}`,
                statusCode: 200,
            });
        } catch (error) {
            res.status(400).json({
                message: "Login failed",
                statusCode: 400,
            });
        }
    };

    // Check Email Availability
    static checkEmailAvailability = (req, res) => {
        try {
            const { email } = req.body;
            User.findOne({ where: { email } })
                .then((user) => {
                    if (user) {
                        res.status(200).json({
                            isEmailAvailable: false,
                            statusCode: 200,
                        });
                    } else {
                        res.status(200).json({
                            isEmailAvailable: true,
                            statusCode: 200,
                        });
                    }
                })
                .catch((err) => {
                    res.status(400).json({
                        message: "Error occured",
                        statusCode: 400,
                    });
                });
        } catch (error) {
            res.status(400).json({
                message: "Error occured",
                statusCode: 400,
            });
        }
    };
}

module.exports = AuthController;
