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
        msg: `biiirl ${thisUser.name}, você tem ${thisUser.score + 1} ${
          thisUser.score > 1 ? "pontos!!" : "ponto!!"
        }`,
      };
    }
    await UserClass.updateScore(dateInBrazil(new Date()), emoji);
    return {
      msg: `boooora ${thisUser.name}, você tem ${thisUser.score + 1} ${
        thisUser.score > 1 ? "pontos!!" : "ponto!!"
      }!!`,
    };
  } catch (error) {
    return { msg: error.message };
  }
}; //done
const getRanking = async (UserObj, UserClass) => {
  try {
    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    function daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const users = await UserClass.getAll();
    const sortedUsers = users.sort((a, b) => b.score - a.score);
    let msg = `Ranking de ${monthNames[month]}:\n`;
    sortedUsers.forEach((user, index) => {
      const monthScore = user.data.reduce((acc, curr) => {
        return curr.date.split("/")[1] == month + 1 && curr.obs != "Started"
          ? acc + 1
          : acc;
      }, 0);
      msg += `${index + 1} - ${user.name} - ${monthScore}/${daysInMonth(
        month,
        year
      )}\n`;
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
  return {
    msg: `
    Todos os comandos devem ser enviados no formato !comando [argumento]

    !entrar [Seu Nome]
    !pontuar [emoji]
    !p [emoji]
    !ranking
    !profile
    !ajuda
    !news
    !hoje
    !comandos
    !motivacao
    !desmotivacao
    !xingar
    !salve
    !foto
    !uuui
    !horas
    !beach
    !herdeiro`,
  };
};
const getNews = (UserObj) => {
  let msg = `Novidades: 🚨🚨🚨
  Envier !entrar [Seu Nome] para se registrar, pode ser nome composto!!
  Envie !pontuar [emojis] para pontuar, ou !p [emojis]. 

  Ex:
  !entrar Sorriso 😄
  !pontuar 🎾🏖️🏃‍♂️
  !p 🎾🏖️🏃‍♂️

  Esqueceu de pontuar ontem?
  Envie !pontuar ontem 🎾🏖️🏃‍♂️ para pontuar ontem
  Envie !pontuar -o 🎾🏖️🏃‍♂️ para pontuar ontem
  Envier !pontuar -r dd/mm/yyyy 🎾🏖️🏃‍♂️ para pontuar em uma data específica

  Quer saber quem pontuou hoje?
  Envie *!hoje* e seje feliz

  Quer saber seu histórico?
  Envier *!profile*

  Quer saber o ranking?
  Envie *!ranking*
  
  Quer saber todos os comandos?
  Envie *!ajuda*`;

  return { msg: msg };
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
