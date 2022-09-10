const data = require("./data.json");
const fs = require("fs");

const mongoose = require("mongoose");
require("../node_modules/dotenv").config();
const { DB_URI } = require("../env.js");
console.log(DB_URI);

const UserRecordSchema = require("../app/db/user.model");

mongoose
  .connect(
    "mongodb+srv://botbuilder:m3iNSnYlVNSKXnjQ@botbuilder.90fsdqg.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Db connected");
  });

async function saveData() {
  const all = await UserRecordSchema.find();
  all.forEach((user) => {
    fs.appendFileSync("./data.json", JSON.stringify({ user }) + ",");
  });
}

saveData();

async function readData() {
  const array = await fs.readFileSync("./data.json", {
    encoding: "utf8",
    flag: "r",
  });
  const data = JSON.parse(array);
  const neededData = data.map((item) => {
    const { userID, name, score, streak, data } = item.user;
    return {
      userID,
      name,
      score,
      streak,
      data,
    };
  });
  neededData.forEach(async (user) => {
    await fs.appendFileSync(
      "./refinedData.json",
      JSON.stringify({ user }) + ","
    );
  });
}
readData();
