const express = require("express");
const cors = require("cors");

const app = express();
const Router = express.Router;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BOT API");
});

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

module.exports = { app, Router };
