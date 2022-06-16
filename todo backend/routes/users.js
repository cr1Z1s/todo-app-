const express = require("express");
const router = express.Router();
const pool = require("./../db");


router.post("/users/register", async (req, res) => {
  try {
    // test if the user exists
    if ((await pool.query("SELECT * FROM users WHERE email = $1", [req.body.email])).rowCount < 1) {
      return res.status(409).json("This email is already in use");
    }
    return res.status(200).json("all is well");
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
})

module.exports = router;