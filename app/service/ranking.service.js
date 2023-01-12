const { dateInBrazil, yesterdayDate } = require("../helpers/date.helper.js");

const registerUser = async (UserObj, UserClass) => {
  try {
    const isRegistered = await UserClass.isRegistered;
    let date = dateInBrazil(new Date());
    const { text } = UserObj;
    if (isRegistered) {
      throw new Error("Você já tá registrado bobão");
    }
    if (text == "")
      throw new Error(
        "Você precisa enviar seu nome para se registrar. Ex: !entrar João da Silva"
      );

    const name = text.reduce((acc, cur) => {
      return acc == "" ? cur : acc + " " + cur;
    });

    const user = await UserClass.Register(name, date);
    return { msg: `boooora ${name}!!!` };
  } catch (error) {
    return { msg: error.message };
  }
};

const addPoints = async (UserObj, UserClass) => {
  try {
    const thisUser = await UserClass.user;
    const isRegistered = await UserClass.isRegistered;
    const { date, emoji, flag, text } = UserObj;
    console.log(UserObj);
    if (!isRegistered) {
      throw new Error(
        "Você não está registrado. Envie !entrar Seu Nome para se registrar"
      );
    }
    if (flag || text[0]) {
      flag === "-r"
        ? await UserClass.updateScore(dateInBrazil(date), emoji)
        : null;
      flag === "-o"
        ? await UserClass.updateScore(dateInBrazil(yesterdayDate()), emoji)
        : null;
      text[0].toLowerCase() === "ontem"
        ? await UserClass.updateScore(dateInBrazil(yesterdayDate()), emoji)
        : null;
      return {
        msg: `biiirl ${thisUser.name}, você tem ${thisUser.score + 1} ponto!!`,
      };
    }
    await UserClass.updateScore(dateInBrazil(new Date()), emoji);
    return {
      msg: `boooora ${thisUser.name}, você tem ${thisUser.score + 1}!!`,
    };
  } catch (error) {
    return { msg: error.message };
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
    return { msg: error.message };
  }
};
const getProfile = async (UserObj, UserClass) => {
  try {
    const user = await UserClass.getUser();
    let msg = `Histórico de ${user.name}:\n`;
    const data = user.data;
    console.log(user);
    console.log("userdata", user.data);
    const sortedData = data.sort((a, b) => b.date - a.date);
    sortedData.forEach((day, index) => {
      msg += `${day.date} - ${index}/100 - ${day.obs ? day.obs : ""}\n`;
    });
    return { msg: msg };
  } catch (error) {
    return { msg: error.message };
  }
};
const getTodayTrainers = async (UserObj, UserClass) => {
  let date = dateInBrazil(new Date());
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
        ? (msg += `${user.name} - ${
            trainedToday.obs ? trainedToday.obs : ""
          }\n`)
        : false;
    });
    return { msg: msg };
  } catch (error) {
    return { msg: error.message };
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
