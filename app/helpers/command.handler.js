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

const commandExample = {
  0: "!pontuar",
  1: "🎾⛹️‍♀️🤾‍♀️",
  2: "aasafa",
  flag: false,
  emoji: "🎾⛹️‍♀️🤾‍♀️",
  command: "!pontuar",
  date: false,
};

const commandHandler = async (commandObject, userId, chat, contact) => {
  const aux = {
    userId,
    chat,
    contact,
  };
  const { command, emoji, date, flag } = commandObject;
  const doIt = commandFunction[command];
  const { msg } = await doIt(commandObject, aux);
  if (!commandFunction) throw new Error({ msg: "Comando não encontrado" });
  return msg;
};

export default commandHandler;
