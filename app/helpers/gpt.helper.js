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
  Eu: ${userName}. O ranking geral é: ${Ranking}.
  Você [com entusiasmo, em 50 caracteres]:`;
};
const dataArray = [
  {
    _id: { $oid: "63c4470c7df17369f4b9687b" },
    userID: "5517981734690@c.us",
    name: "Ju🐒",
    imgUrl:
      "https://pps.whatsapp.net/v/t61.24694-24/157489008_625353302698422_1286111654879216785_n.jpg?ccb=11-4&oh=01_AdQ7-1YBTJv6RIyOfwws9WZSV8nbuPM229ypeRP0gbzW2g&oe=63D15802",
    score: { $numberInt: "19" },
    data: [
      { date: "13/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "14/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "15/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "12/01/2023", score: { $numberInt: "4" }, obs: false },
      { date: "10/01/2023", score: { $numberInt: "5" }, obs: false },
      { date: "09/01/2023", score: { $numberInt: "6" }, obs: false },
      { date: "06/01/2023", score: { $numberInt: "7" }, obs: false },
      { date: "05/01/2023", score: { $numberInt: "8" }, obs: false },
      { date: "03/01/2023", score: { $numberInt: "9" }, obs: false },
      { date: "02/01/2023", score: { $numberInt: "10" }, obs: false },
      { date: "04/01/2023", score: { $numberInt: "11" }, obs: false },
      { date: "16/01/2023", score: { $numberInt: "12" }, obs: false },
      { date: "18/01/2023", score: { $numberInt: "13" }, obs: false },
      { date: "20/01/2023", score: { $numberInt: "14" }, obs: false },
      { date: "22/01/2023", score: { $numberInt: "15" }, obs: false },
      { date: "21/01/2023", score: { $numberInt: "16" }, obs: false },
      { date: "23/01/2023", score: { $numberInt: "17" }, obs: false },
      { date: "24/01/2023", score: { $numberInt: "18" }, obs: false },
      { date: "25/01/2023", score: { $numberInt: "19" }, obs: "💪🚶" },
    ],
    createdAt: { $date: { $numberLong: "1673807628239" } },
    updatedAt: { $date: { $numberLong: "1674646973450" } },
    __v: { $numberInt: "0" },
  },
  {
    _id: { $oid: "63c4492d7df17369f4b96925" },
    userID: "5512982276528@c.us",
    name: "limpezinha 🛀",
    imgUrl:
      "https://pps.whatsapp.net/v/t61.24694-24/319791213_1099365884091940_7800711799538922724_n.jpg?ccb=11-4&oh=01_AdRqddPqhqNmMxn-JFmb22POl3kDTB6JwYEZ5879TFXDIA&oe=63D17545",
    score: { $numberInt: "11" },
    data: [
      { date: "09/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "11/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "12/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "13/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "16/01/2023", score: { $numberInt: "5" }, obs: false },
      { date: "17/01/2023", score: { $numberInt: "6" }, obs: "💪🏼🔥" },
      { date: "18/01/2023", score: { $numberInt: "7" }, obs: "🏋️‍♀️💪🏼" },
      { date: "19/01/2023", score: { $numberInt: "8" }, obs: "🏋️‍♀️💪🏼" },
      { date: "20/01/2023", score: { $numberInt: "9" }, obs: "💪🏼🔥" },
      { date: "23/01/2023", score: { $numberInt: "10" }, obs: false },
      { date: "24/01/2023", score: { $numberInt: "11" }, obs: "💪🏼🏋️‍♀️" },
    ],
    createdAt: { $date: { $numberLong: "1673808173992" } },
    updatedAt: { $date: { $numberLong: "1674600007618" } },
    __v: { $numberInt: "0" },
  },
  {
    _id: { $oid: "63c447407df17369f4b9688a" },
    userID: "5516991698991@c.us",
    name: "gustavinhuuu 🐣",
    imgUrl:
      "https://pps.whatsapp.net/v/t61.24694-24/312289456_1345825352837922_2741798819825494829_n.jpg?ccb=11-4&oh=01_AdS6uV3zPC5-F1ePwCpYAsot6TDaj4pSq50ArQKRbiofYw&oe=63D14CC1",
    score: { $numberInt: "18" },
    data: [
      { date: "03/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "04/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "05/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "07/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "09/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "11/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "12/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "13/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "14/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "15/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "16/01/2023", score: { $numberInt: "11" }, obs: "🦇💪🏼" },
      { date: "17/01/2023", score: { $numberInt: "12" }, obs: "⚽🦵🏼" },
      { date: "18/01/2023", score: { $numberInt: "13" }, obs: false },
      { date: "20/01/2023", score: { $numberInt: "14" }, obs: "🫁🦾" },
      { date: "21/01/2023", score: { $numberInt: "15" }, obs: "⚽🦵🏼" },
      { date: "22/01/2023", score: { $numberInt: "16" }, obs: "🦇💪🏼" },
      { date: "23/01/2023", score: { $numberInt: "17" }, obs: "🦵🏼🥔" },
      { date: "24/01/2023", score: { $numberInt: "18" }, obs: "⚽🦵🏼" },
    ],
    createdAt: { $date: { $numberLong: "1673807680213" } },
    updatedAt: { $date: { $numberLong: "1674605804164" } },
    __v: { $numberInt: "0" },
  },
  {
    _id: { $oid: "63c447397df17369f4b96885" },
    userID: "5514981123645@c.us",
    name: "Lon 🐘",
    imgUrl:
      "https://pps.whatsapp.net/v/t61.24694-24/266978942_386852806575847_3389196578202572212_n.jpg?ccb=11-4&oh=01_AdSSnsD9B1tisrzQ9gP3OrAV6jqAFypvxuuTOLPXJ6-ryA&oe=63D14CEB",
    score: { $numberInt: "13" },
    data: [
      { date: "02/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "03/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "04/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "05/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "06/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "09/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "11/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "13/01/2023", score: { $numberInt: "0" }, obs: "" },
      { date: "16/01/2023", score: { $numberInt: "9" }, obs: false },
      { date: "17/01/2023", score: { $numberInt: "10" }, obs: false },
      { date: "18/01/2023", score: { $numberInt: "11" }, obs: false },
      { date: "19/01/2023", score: { $numberInt: "12" }, obs: false },
      { date: "23/01/2023", score: { $numberInt: "13" }, obs: false },
    ],
    createdAt: { $date: { $numberLong: "1673807673571" } },
    updatedAt: { $date: { $numberLong: "1674517246946" } },
    __v: { $numberInt: "0" },
  },
];

const getResponse = async (dataArray, name) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: createPrompt({ dataArray, userName: name }),
    temperature: 0.3,
    max_tokens: 250,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.data.choices[0].text;
};

getResponse(dataArray, "gustavinhuuu 🐣").then((res) => console.log(res));

module.exports = { getResponse };
