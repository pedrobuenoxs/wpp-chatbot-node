import fs from "fs";

async function readData() {
  const array = await fs.readFileSync("./refinedData.json", {
    encoding: "utf8",
    flag: "r",
  });
  const data = JSON.parse(array);
  return data.map((item) => {
    const { userID, name, score, streak, data } = item.user;
    return {
      userID,
      name,
      score,
      streak,
      data,
    };
  });
}
const users = readData().then((data) => {
  return data;
});

export default users;
// export default readData;
