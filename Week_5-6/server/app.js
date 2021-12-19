const express = require("express");
const DB = require("./database/connection");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
const routes = require("./routes/index");

const app = express();

app.use(passport.initialize());
app.use(express.json());

DB.authenticate()
    .then((res) => {
        app.listen(
            process.env.PORT,
            console.log(`Server running at port:${process.env.PORT}`)
        );
    })
    .catch((err) => console.log(err.message));

app.use("/", routes);
