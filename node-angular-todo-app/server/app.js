const express = require("express");
const cors = require("cors");
const path = require("path");
const DB = require("./database/connection");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
const routes = require("./routes/index");

const app = express();
app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public/dist/client")));

DB.authenticate()
    .then((res) => {
        app.listen(
            process.env.PORT,
            console.log(`Server running at port:${process.env.PORT}`)
        );
    })
    .catch((err) => console.log(err.message));

app.use("/api", routes);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/dist/client/index.html"));
});
