const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

passport.serializeUser((user, done) => {
    done(null, user);
});

// Signup Strategy
passport.use(
    "signup",
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        User.findOne({ where: { email } })
            .then((user) => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch((err) => done(err));
    })
);

// Login Strategy
passport.use(
    "login",
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        (email, password, done) => {
            User.findOne({ where: { email }, raw: true })
                .then((user) => {
                    if (!user) {
                        return done(null, false, {
                            message: "User does not exists",
                        });
                    }
                    if (!bcrypt.compareSync(password, user.password)) {
                        return done(null, false, {
                            message: "Incorrect password",
                        });
                    }
                    return done(null, user);
                })
                .catch((err) => done(err, false, { message: "Login failed" }));
        }
    )
);

// Route Protection Strategy
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("JWT");
options.secretOrKey = process.env.PORT;
passport.use(
    "jwt",
    new JwtStrategy(options, (token, done) => {
        console.log(token);
        User.findByPk(token.id, { raw: true })
            .then((user) => {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            })
            .catch((err) => done(err));
    })
);
