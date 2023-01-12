const {
  registerUser,
  addPoints,
  getRanking,
  getProfile,
  getHelp,
  getNews,
  getSite,
  getTodayTrainers,
} = require("../service/ranking.service");

const commandFunction = {
  "!entrar": registerUser,
  "!pontuar": addPoints,
  "!ranking": getRanking,
  "!profile": getProfile,
  "!ajuda": getHelp,
  "!news": getNews,
  "!site": getSite,
  "!hoje": getTodayTrainers,
};

const commandHandler = async (commandObject, UserClass) => {
  const { command, emoji, date, flag } = commandObject;
  const doIt = commandFunction[command];
  const { msg } = await doIt(commandObject, UserClass);
  if (!commandFunction) throw new Error({ msg: "Comando não encontrado" });
  return msg;
};

module.exports = commandHandler;
