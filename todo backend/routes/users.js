const express = require("express");
const router = express.Router();
const pool = require("./../db");


router.post("/users/register", async (req, res) => {
  try {
    console.log(req.body);
    return res.status(200).json("all is well");
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
})

module.exports = router;