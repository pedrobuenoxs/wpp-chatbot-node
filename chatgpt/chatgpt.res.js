const axios = require("axios");

const createPrompt = (user, Ranking) => {
  const { name, score, pos } = user;
  const prompt = `
Um novo dia começou. Os atletas estão prontos para mais um treino e um dia de competição.

Faça um comentário sobre o desempenho da pessoa a seguir, coloque emoção, use emojis. Fique atento aos outros atletas.
Lembre-se, seja criativo, use sua imaginação de narrador esportivo iconico.

- Pessoa: ${name}
- Pontuação: ${score}
- Colocação: ${pos}º
- Ranking: \n
${Ranking}
`;

  return prompt;
};

const getParams = (data, userID) => {
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

  const arrayUsers = data
    .map((user) => {
      const monthScore = user.data.reduce((acc, curr) => {
        return curr.date.split("/")[1] == month + 1 && curr.obs != "Started"
          ? acc + 1
          : acc;
      }, 0);
      return {
        userID: user.userID,
        name: user.name,
        score: monthScore,
        data: user.data,
      };
    })
    .sort((a, b) => b.score - a.score);

  const mappedData = arrayUsers.map((user) => {
    return {
      name: user.name,
      score: user.score,
      pos: arrayUsers.indexOf(user) + 1,
      userID: user.userID,
    };
  });

  const user = mappedData.find((user) => user.userID == userID);

  const Ranking = mappedData.map((user, index) => {
    return `${index + 1}º - ${user.name} - ${user.score}/${daysInMonth(
      month,
      year
    )}\n`;
  });

  return { user, Ranking };
};

const getResponse = async (allUsers, userID, conversationId) => {
  try {
    const { user, Ranking } = getParams(allUsers, userID);
    const prompt = createPrompt(user, Ranking);

    const response = await axios.post(process.env.CHATGPT_URL, {
      message: `${prompt}`,
    });
    return response.data.response;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

// getResponse();

module.exports = { getResponse };
