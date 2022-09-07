const express = require("express");
const server = express();
const port = process.env.PORT || 4000;

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
server.use(express.static("./public"));
module.exports = server;
