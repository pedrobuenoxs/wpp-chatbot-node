const { dateInBrazil, yesterdayDate } = require("../helpers/date.helper.js");
const { getResponse } = require("../../chatgpt/chatgpt.res.js");

const registerUser = async (UserObj, UserClass) => {
  try {
    const isRegistered = await UserClass.isRegistered;
    let date = dateInBrazil();
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

    const userID = await UserClass.userId;

    const isRegistered = await UserClass.isRegistered;
    const { date, emoji, flag, text } = UserObj;
    if (!isRegistered) {
      throw new Error(
        "Você não está registrado. Envie !entrar Seu Nome para se registrar"
      );
    }

    const getDate = () => {
      if (date) return { dateToScore: date };
      if (flag == "-o") return { dateToScore: dateInBrazil(yesterdayDate()) };
      if (text[0] == "ontem")
        return { dateToScore: dateInBrazil(yesterdayDate()) };
      return { dateToScore: dateInBrazil() };
    };
    let { dateToScore } = getDate();

    const { name, score } = await UserClass.updateScore(dateToScore, emoji);

    const allUsers = await UserClass.getAll();
    const month = new Date().getMonth() + 1;

    const userMonthScore = allUsers.reduce((acc, curr) => {
      return curr.userID == userID
        ? curr.data.reduce((acc, curr) => {
            return curr.date.split("/")[1] == month && curr.obs != "Started"
              ? acc + 1
              : acc;
          }, 0)
        : acc;
    }, 0);

    const responseAi = await getResponse(allUsers, userID, "ranking");
    const standardMsg = `boooora ${thisUser.name}, você tem ${userMonthScore} ${
      userMonthScore > 1 ? "pontos!!" : "ponto!!"
    }!!`;
    // console.log(standardMsg);
    const msg = responseAi ? responseAi : standardMsg;
    return {
      msg: msg,
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
      return new Date(year, month + 1, 0).getDate();
    }
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const users = await UserClass.getAll();
    const usersWithMonthScore = users.map((user) => {
      const monthScore = user.data.reduce((acc, curr) => {
        return curr.date.split("/")[1] == month + 1 && curr.obs != "Started"
          ? acc + 1
          : acc;
      }, 0);
      return { name: user.name, monthScore: monthScore };
    });
    const sortedUsers = usersWithMonthScore.sort(
      (a, b) => b.monthScore - a.monthScore
    );

    let msg = `Ranking de ${monthNames[month]}:\n`;
    let currentRank = 1;
    let currentScore = sortedUsers[0].monthScore;

    sortedUsers.forEach((user, index) => {
      // console.log(user);
      if (user.monthScore < currentScore) {
        currentRank = currentRank + 1;
        currentScore = user.monthScore;
      }
      msg += `${currentRank} - ${user.name} - ${user.monthScore}/${daysInMonth(
        month,
        year
      )}\n`;
    });

    return { msg: msg };
  } catch (error) {
    return { msg: error.message };
  }
};
const getStreakRanking = async (UserObj, UserClass) => {
  function formatDate(date) {
    let parts = date.split("/");
    return parts[2] + "-" + parts[1] + "-" + parts[0];
  }

  function getStreaks(data) {
    let currentStreak = 0;
    let biggestStreak = 0;
    let prevDate = null;
    for (let i = 0; i < data.length; i++) {
      const date = new Date(data[i].date);
      if (
        prevDate !== null &&
        prevDate.getTime() + 24 * 60 * 60 * 1000 === date.getTime()
      ) {
        currentStreak++;
        if (currentStreak > biggestStreak) {
          biggestStreak = currentStreak;
        }
      } else {
        currentStreak = 0;
      }
      prevDate = date;
    }
    return { currentStreak, biggestStreak };
  }
  let msg = `🔥 Ranking de Streaks: Atual | Maior \n`;
  try {
    const users = await UserClass.getAll();
    const mapUser = users
      .map((user) => {
        const formattedData = user.data.map((day) => {
          return { date: formatDate(day.date) };
        });
        const { currentStreak, biggestStreak } = getStreaks(formattedData);
        return {
          name: user.name,
          currentStreak: currentStreak,
          biggestStreak: biggestStreak,
        };
      })
      .sort((a, b) => b.biggestStreak - a.biggestStreak);

    mapUser.forEach((user, index) => {
      msg += `${index + 1}º - ${user.name} - 🔺${user.currentStreak} - 🔥${
        user.biggestStreak
      }\n`;
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
      msg += `${day.date} - ${index}/365 - ${day.obs ? day.obs : ""}\n`;
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

  *IMPORTANTE*
  É necessário enviar pelo menos *dois* *emojis* para salvar os emojis.

  Ex:
  !entrar Sorriso 😄
  !pontuar 🎾🏖️🏃‍♂️
  !p 🎾🏖️🏃‍♂️

  Esqueceu de pontuar ontem?
  Envie !pontuar ontem 🎾🏖️🏃‍♂️ para pontuar ontem
  Envie !pontuar -o 🎾🏖️🏃‍♂️ para pontuar ontem
  Envier !pontuar dd/mm/yyyy 🎾🏖️🏃‍♂️ para pontuar em uma data específica

  Quer saber quem pontuou hoje?
  Envie *!hoje* e seje feliz

  Quer saber seu histórico?
  Envier *!profile*

  Quer saber o ranking?
  Envie *!ranking*
  
  Quer saber todos os comandos?
  Envie *!ajuda*
  
  Quer escolher o xingamento
  Envier *!xingar [Pessoa] 5* e escolha o xingamento mudando o numero 5`;

  return { msg: msg };
};
const getSite = (UserObj) => {
  return { msg: "not implemented" };
};

const editName = async (UserObj, UserClass) => {
  try {
    const { text } = UserObj;
    const user = await UserClass.user;
    if (!user) {
      return { msg: "Você não está registrado" };
    }
    const newName = text.reduce((acc, cur) => {
      return acc == "" ? cur : acc + " " + cur;
    });
    if (!newName) {
      return { msg: "Nome inválido" };
    }
    const { name } = await UserClass.updateName(newName);
    return { msg: `Nome alterado para ${name}` };
  } catch (error) {
    return { msg: error.message };
  }
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
  editName,
  getStreakRanking,
};
