const express = require("express");
const server = express();
const passport = require("passport");
const port = 3333;


require("./passport/passport")(passport);
server.use(passport.initialize());
// const cors = require("cors");
// server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const userRoute = require("./routes/users");
const todoRoute = require("./routes/todos");

server.use("/api", userRoute);
server.use("/api/", todoRoute)

server.listen(port, () => {
  console.log(`Server started listening on port ${port}`);
});