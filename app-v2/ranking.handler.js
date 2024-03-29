const Functions = require("../app/service/commands.service.js");
const {
  registerUser,
  addPoints,
  getRanking,
  getProfile,
  getHelp,
  getNews,
  getSite,
  getTodayTrainers,
  createGroup,
  editName,
  getStreakRanking,
} = require("./group.service");

const commandFunction = {
  "!criar": createGroup,
  "!entrar": registerUser,
  "!pontuar": addPoints,
  "!p": addPoints,
  "!ranking": getRanking,
  "!profile": getProfile,
  "!ajuda": getHelp,
  "!news": getNews,
  "!site": getSite,
  "!hoje": getTodayTrainers,
  "!nome": editName,
  "!streak": getStreakRanking,
  ...Functions,
};

const rankingHandler = async (commandObject, UserClass) => {
  const { command, emoji, date, flag } = commandObject;
  const doIt = commandFunction[command];
  const { msg } = await doIt(commandObject, UserClass);
  if (!commandFunction) throw new Error({ msg: "Comando não encontrado" });
  return msg;
};

module.exports = rankingHandler;
