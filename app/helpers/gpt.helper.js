const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const createPrompt = (params) => {
  const { dataArray, userName } = params;

  const sortedArray = dataArray.sort((a, b) => {
    return b.data.length - a.data.length;
  });
  const Ranking = sortedArray.map((user, index) => {
    return `${index + 1}º: ${user.name} - ${user.data.length} pontos`;
  });
  return `Eu: A partir de agora você é um narrador esportivo.
  Você está acompanhando diversos atletas em um grupo do whatsapp.
  Eles estão em uma competição, onde cada um pode pontuar com o comando !pontuar, pontuando assim apenas 1 ponto.
  Eu vou te falar a pessoa que vai pontuar e descrever o que ela fez com emojis.
  Vou te falar também o ranking geral e você vai fazer um comentário sobre o desempenho dessa pessoa. Vamos começar?
  Você: Claro! Me diga quem eu devo acompanhar.
  Eu: Pessoa: ${userName}. O ranking antes pontuação era: ${Ranking}.
  Você [com entusiasmo, em 50 caracteres]:`;
};

const getResponse = async (dataArray, user) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: createPrompt({ dataArray, userName: user.name }),
      temperature: 0.3,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.data.choices[0].text;
  } catch (error) {}
};

module.exports = { getResponse };
