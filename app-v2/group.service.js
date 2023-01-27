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
    const allUsers = await GroupClass.allUsers;
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
    const responseAi = await getResponse(
      allUsers.users,
      thisUser.userID,
      "ranking"
    );
    const standardMsg = `boooora ${name}, você tem ${score} ${
      thisUser.score > 1 ? "pontos!!" : "ponto!!"
    }!!`;
    const msg = responseAi ? responseAi : standardMsg;
    return {
      msg: msg,
    };
  } catch (error) {
    return { msg: error.message };
  }
}; //done
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
      return new Date(year, month, 0).getDate();
    }
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const group = await GroupClass.getGroup();
    const sortedUsers = group.users.sort((a, b) => b.score - a.score);
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
    await GroupClass.createGroup();
    return { msg: "Grupo criado com sucesso" };
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
};
