const { dateInBrazil, yesterdayDate } = require("./date.helper.js");
const { getResponse } = require("../chatgpt/chatgpt.res.js");

const registerUser = async (UserObj, GroupClass) => {
  try {
    if (!(await GroupClass.isCreated)) {
      throw new Error(
        "O ranking ainda não foi criado. Envie !criar para criar o ranking"
      );
    }
    const isRegistered = await GroupClass.isRegistered;
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

    const user = await GroupClass.Register(name, date);
    return { msg: `boooora ${name}!!!` };
  } catch (error) {
    return { msg: error.message };
  }
};

const addPoints = async (UserObj, GroupClass) => {
  try {
    const thisUser = await GroupClass.GetUser();
    const isRegistered = await GroupClass.isRegistered;
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

    const update = await GroupClass.updateScore(dateToScore, emoji);
    if (update.msg == false) return { msg: "Já pontuou hoje bobão" };
    const name = thisUser.name;
    const score = thisUser.score + 1;
    const allUsers = await GroupClass.getGroup();
    const month = new Date().getMonth() + 1;
    const userMonthScore = allUsers.users.reduce((acc, curr) => {
      return curr.userID == thisUser.userID
        ? curr.data.reduce((acc, curr) => {
            return curr.date.split("/")[1] == month && curr.obs != "Started"
              ? acc + 1
              : acc;
          }, 0)
        : acc;
    }, 0);

    const responseAi = await getResponse(
      allUsers.users,
      thisUser.userID,
      "ranking"
    );
    const standardMsg = `boooora ${name}, você tem ${userMonthScore} ${
      userMonthScore > 1 ? "pontos!!" : "ponto!!"
    }!!`;
    const msg = responseAi ? responseAi : standardMsg;
    return {
      msg: msg,
    };
  } catch (error) {
    return { msg: error.message };
  }
}; //done

const getStreakRanking = async (UserObj, GroupClass) => {
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
    const group = await GroupClass.getGroup();
    const users = group.users;
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

const getRanking = async (UserObj, GroupClass) => {
  try {
    if (!(await GroupClass.isCreated)) {
      throw new Error(
        "O ranking ainda não foi criado. Envie !criar para criar o ranking"
      );
    }
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
    const group = await GroupClass.getGroup();

    const usersWithMonthScore = group.users.map((user) => {
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
const getProfile = async (UserObj, GroupClass) => {
  try {
    if (!(await GroupClass.isCreated)) {
      throw new Error(
        "O ranking ainda não foi criado. Envie !criar para criar o ranking"
      );
    }
    const user = await GroupClass.GetUser();
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
const getTodayTrainers = async (UserObj, GroupClass) => {
  let date = dateInBrazil(new Date());
  try {
    if (!(await GroupClass.isCreated)) {
      throw new Error(
        "O ranking ainda não foi criado. Envie !criar para criar o ranking"
      );
    }
    const group = await GroupClass.getGroup();
    const sortedUsers = group.users.sort((a, b) => b.score - a.score);
    let msg = "Os fortes de hoje são:\n";
    sortedUsers.map((user) => {
      const data = user.data;
      const trainedToday = data.reduce((acc, curr) => {
        return curr.date.split(" ")[0] == date.split(" ")[0]
          ? { ...curr, bool: true }
          : acc;
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

    !criar 
    !entrar [Seu Nome]
    !pontuar [emoji]
    !p [emoji]
    !ranking
    !profile
    !ajuda
    !news
    !hoje`,
  };
};
const getNews = (UserObj) => {
  let msg = `Boris Builder v0.1.0 - Criado por @pedrobuenoxs

  🚨🚨🚨 Novidades 🚨🚨🚨
  
  !nome [Seu Nome] - Altera o nome do usuário
  !xingar [Nome do usuário] - Xinga o usuário (estão todos no masculino, não me cancelem)
  !motivacao
  !desmotivacao
  !comandos
  !xingar,
  !herdeiro,
  !foto,
  !uuui,
  !horas,
  !beach,
  !salve,
  
  Isso é um beta do beta, vai ter muita coisa errada, eu sou um só, me ajudem a melhorar.

  `;

  return { msg: msg };
};
const getSite = (UserObj) => {
  return { msg: "not implemented" };
};

const createGroup = async (UserObj, GroupClass) => {
  try {
    // await GroupClass.createGroup();
    return { msg: "Not available" };
  } catch (error) {
    return { msg: error.message };
  }
};

const editName = async (UserObj, GroupClass, newName) => {
  try {
    const { text } = UserObj;
    const name = text.reduce((acc, cur) => {
      return acc == "" ? cur : acc + " " + cur;
    });
    await GroupClass.editName(name);
    return { msg: "Nome alterado com sucesso" };
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
  createGroup,
  editName,
  getStreakRanking,
};
