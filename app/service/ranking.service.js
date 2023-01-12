const { dateInBrazil, yesterdayDate } = require("../helpers/date.helper.js");

const registerUser = async (UserObj, UserClass) => {
  try {
    const isRegistered = await UserClass.isRegistered;
    let date = dateInBrazil(new Date());
    const { text } = UserObj;
    if (!isRegistered) {
      throw new Error({
        msg: "Você não está registrado. Envie !entrar Seu Nome para se registrar",
      });
    }
    const name = text;
    const user = await UserClass.Register(...name, date);
    return { msg: `boooora ${thisUser.name}!!` };
  } catch (error) {
    throw new Error(error.msg);
  }
};

const addPoints = async (UserObj, UserClass) => {
  try {
    const thisUser = await User.user;
    const isRegistered = await UserClass.isRegistered;
    const { date, emoji, flag, text } = UserObj;
    if (!isRegistered) {
      throw new Error({
        msg: "Você não está registrado. Envie !entrar Seu Nome para se registrar",
      });
    }
    if (flag || text) {
      flag === "-r"
        ? await UserClass.updateScore(dateInBrazil(date), emoji)
        : null;
      flag === "-o"
        ? await UserClass.updateScore(dateInBrazil(yesterdayDate()), emoji)
        : null;
      text.toLowerCase() === "ontem"
        ? await UserClass.updateScore(dateInBrazil(yesterdayDate()), emoji)
        : null;
      return {
        msg: `boooora ${thisUser.name}, você tem ${thisUser.score + 1}!!`,
      };
    }
  } catch (error) {
    throw new Error(error.msg);
  }
}; //done
const getRanking = async (UserObj, UserClass) => {
  try {
    const users = await UserClass.getAll();
    const sortedUsers = users.sort((a, b) => b.score - a.score);
    let msg = "Ranking:\n";
    sortedUsers.forEach((user, index) => {
      msg += `${index + 1} - ${user.name} - ${user.score}/100\n`;
    });
    return { msg: msg };
  } catch (error) {
    throw new Error(error.message);
  }
};
const getProfile = (UserObj, UserClass) => {
  try {
    const user = UserClass.getUser();
    let msg = `Histórico de ${user.name}:\n`;
    const data = user.data;
    const sortedData = data.sort((a, b) => b.date - a.date);
    sortedData.forEach((day, index) => {
      msg += `${day.date} - ${index}/100 - ${day.obs}\n`;
    });
    return { msg: msg };
  } catch (error) {
    throw new Error(error.message);
  }
};
const getTodayTrainers = async (UserObj, UserClass) => {
  try {
    const users = await UserClass.getAll();
    const sortedUsers = users.sort((a, b) => b.score - a.score);
    let msg = "Os fortes de hoje são:\n";
    sortedUsers.map((user) => {
      const data = user.data;
      const trainedToday = data.reduce((acc, curr) => {
        return curr.date == date ? { ...curr, bool: true } : acc;
      }, {});
      return trainedToday.bool
        ? (msg += `${user.name} - ${trainedToday.obs}\n`)
        : false;
    });
    return { msg: msg };
  } catch (error) {
    throw new Error(error.message);
  }
};
const getHelp = (UserObj) => {
  return { msg: "not implemented" };
};
const getNews = (UserObj) => {
  return { msg: "not implemented" };
};
const getSite = (UserObj) => {
  return { msg: "not implemented" };
};

module.exports = {
  registerUser,
  addPoints,
  getRanking,
  getProfile,
  getTodayTrainers,
  getHelp,
  getNews,
  getSite,
};
