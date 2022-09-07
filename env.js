require("dotenv").config();
const DB_URI = process.env.DB_URI;
const API_KEY = process.env.API_KEY;

module.exports = {
  DB_URI,
  API_KEY,
};
