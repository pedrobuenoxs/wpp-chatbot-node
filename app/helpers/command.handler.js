const {
  registerUser,
  addPoints,
  getRanking,
  getProfile,
  getHelp,
  getNews,
  getSite,
  getTodayTrainers,
  editName,
} = require("../service/ranking.service");

const Functions = require("../service/commands.service.js");

const commandFunction = {
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
  ...Functions,
};

const commandHandler = async (commandObject, UserClass) => {
  const { command, emoji, date, flag } = commandObject;
  const doIt = commandFunction[command];
  const { msg } = await doIt(commandObject, UserClass);
  if (!commandFunction) throw new Error({ msg: "Comando não encontrado" });
  return msg;
};

module.exports = commandHandler;
