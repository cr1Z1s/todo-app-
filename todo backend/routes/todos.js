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
      const { user_id } = user;
      const todos = await pool.query(
        "SELECT todo_id, todo_text, todo_done, created_at FROM todo WHERE user_id = $1",
        [user_id]
      );

      res.status(200).json(todos.rows);
    } catch (err) {
      res.status(500).json(err.message);
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
// edit todo
router.put(
  "/todos/update",
  passport.authenticate(["user"], { session: false }),
  async (req, res) => {
    try {
      const user = JSON.parse(req.user);
      const { todo_text, todo_done, todo_id } = req.body;
      // const { user_id } = user;
      const todos = await pool.query(
        "UPDATE todo SET todo_text = $1, todo_done = $2 WHERE todo_id = $3",
        [todo_text, todo_done, todo_id]
      );
      res.status(200).json("updated suucessfully");
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);

module.exports = router;
