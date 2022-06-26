const express = require("express");
const router = express.Router();
const pool = require("./../db");
const passport = require("passport");

router.get("/todos/all", passport.authenticate(["user"], { session: false }), async (req, res) => {
  try {
    res.status(200).json("hello user");
  } catch (err) {
    res.status(500);
  }
})

module.exports = router;