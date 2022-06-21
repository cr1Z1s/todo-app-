require('dotenv').config();
const express = require("express");
const router = express.Router();
const pool = require("./../db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validator = require("validator");
const passwordValidator = require('password-validator');

router.post("/users/register", async (req, res) => {
  try {
    const { user_firstname, user_lastname, email, password } = req.body;

    let password_check = new passwordValidator;
    password_check
      .is().min(6)
      .has().uppercase(1)
      .has().lowercase()
      .has().digits(2)
      .has().not().spaces();

    // test if password is valid
    if (!password_check.validate(password)) {
      return res.status(403).json("Password does not meet requirements!");
    }
    // test if email is valid
    if (!validator.default.isEmail(email)) {
      return res.status(403).json("Incorrect email form");
    }
    // test if the user exists
    if ((await pool.query("SELECT * FROM users WHERE email = $1", [email.toLowerCase()])).rowCount > 0) {
      return res.status(409).json("This email is already in use");
    }
    const hashedpassowrd = await bcrypt.hash(req.body.password, 10);

    await pool.query("INSERT INTO users (user_lastname, user_firstname, email, password) VALUES ($1, $2, $3, $4);", [user_lastname, user_firstname, email.toLowerCase(), hashedpassowrd]);

    return res.status(200).json("Success!");
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
})
router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate before sql query
    if (!validator.default.isEmail(email)) {
      return res.status(401).json("Email or password is incorrect");
    }

    const queryUser = await pool.query("SELECT * FROM users WHERE email = $1", [email.toLowerCase()]);
    if (queryUser.rowCount === 0) {
      return res.status(400).json("Incorrect email or password.");
    }
    if (!(await bcrypt.compare(password, queryUser.rows[0].password))) {
      return res.status(400).json("Incorrect email or password.");
    }
    delete queryUser.rows[0].password;
    delete queryUser.rows[0].is_super_admin;
    const accessToken = jwt.sign(queryUser.rows[0], process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15d" });
    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    console.error(error.message);
  }
})

module.exports = router;