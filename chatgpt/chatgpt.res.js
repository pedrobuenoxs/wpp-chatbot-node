const axios = require("axios");

const createPrompt = (user, Ranking) => {
  const { name, score, pos } = user;
  const prompt = `Você é um grande narrador esportivo, famoso por suas narrações inesquecíveis.
A competição de hoje é entre os maiores atletas do mundo, e você foi contratado para narrar a competição.
Você deve fazer uma narração sobre o desempenho de cada atleta, e também sobre o desempenho geral da competição.
Você deve utilizar figuras de linguagem, emojis e hashtags para tornar a narração mais interessante.
Você deve utilizar no máximo 150 caracteres.


Faça um comentário sobre o desempenho da pessoa a seguir, utilize trocadilhos. Fique atento aos outros atletas.

- Pessoa: ${name}
- Pontuação: ${score}
- Colocação: ${pos}º
- Ranking: \n
${Ranking}
`;

  return prompt;
};

const getParams = (data, userID) => {
  const arrayUsers = data
    .map((user) => {
      if (user.userID == userID) {
        return {
          userID: user.userID,
          name: user.name,
          score: user.data.length,
          data: user.data,
        };
      }
      return {
        userID: user.userID,
        name: user.name,
        score: user.data.length - 1,
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
    return `${index + 1}º - ${user.name} - ${user.score} pontos\n`;
  });

  return { user, Ranking };
};

const getResponse = async (allUsers, userID, conversationId) => {
  try {
    const { user, Ranking } = getParams(allUsers, userID);
    const prompt = createPrompt(user, Ranking);

    const response = await axios.post(process.env.CHATGPT_URL, {
      message: `${prompt}`,
      conversation_id: conversationId,
    });
    return response.data.response;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

// getResponse();

module.exports = { getResponse };
