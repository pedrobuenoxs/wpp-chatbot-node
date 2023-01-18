const fetch = require("node-fetch");
require("dotenv").config();
const HEROKU_API_TOKEN = process.env.HEROKU_API_TOKEN;
const HEROKU_APP_ID = process.env.HEROKU_APP_ID;
console.log(HEROKU_APP_ID);

console.log("Restarting dynos");
const getResponse = async () => {
  const response = await fetch(
    `https://api.heroku.com/apps/${HEROKU_APP_ID}/dynos`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.heroku+json; version=3",
        Authorization: `Bearer ${HEROKU_API_TOKEN}`,
      },
    }
  );
  console.log(response);
};
getResponse();
