const express = require("express");
const server = express();
const port = 3333;

// const cors = require("cors");
// server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const userroute = require("./routes/users");
server.use("/api", userroute);

server.listen(port, () => {
  console.log(`Server started listening on port ${port}`);
});