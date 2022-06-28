const express = require("express");
const router = express.Router();
const pool = require("./../db");
const passport = require("passport");

// get all todos
router.get(
  "/todos/all",
  passport.authenticate(["user"], { session: false }),
  async (req, res) => {
    try {
      const user = JSON.parse(req.user);
      res.status(200).json("hello user");
    } catch (err) {
      res.status(500);
    }
  }
);
// add a todo
router.post(
  "/todos/new",
  passport.authenticate(["user"], { session: false }),
  async (req, res) => {
    try {
      const user = JSON.parse(req.user);
      const { user_id } = user;
      const { todo_text } = req.body;
      if (typeof todo_text === "string" && todo_text.length !== 0) {
        await pool.query(
          "INSERT INTO todo (todo_text, created_at, user_id) VALUES ($1, CURRENT_TIMESTAMP, $2)",
          [todo_text, user_id]
        );
      } else {
        return res.status(403).json("Todo text must be valid text");
      }

      res.status(200).json("todo added");
    } catch (error) {
      console.error(error.message);
    }
  }
);

module.exports = router;
