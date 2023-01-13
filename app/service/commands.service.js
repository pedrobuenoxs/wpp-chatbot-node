const motivacao = [
  "se voce nao for só voce nao vai",
  "A nat ja foi e voce?",
  "Cada segundo de esforço vale a pena, força",
  "Treinar é viver",
  "Pode ser feio, pode ser frango, só nao pode ser feio e frango",
  "No inicio motivação, no meio paciencia, no fim satisfação",
  "A preguiça enfraquece, a motivação enobrece",
  "Hora de descansar com um sentimento de missão cumprida",
  "Um peso de cada vez e logo voce estara superando todos os seus limites",
  "O corpo alcança o que a mente acredita",
  "Coloque a preguiça pra correr",
  "O que nao se faz, nao se aprende",
  "Pernas bambas, falta de ar e transpiração, é sexo? NAO! ACADEMIA!",
  "hora do wheyzinhuuuuuuuuuuu hmmmmmmmmmmmmm",
];

const xingamentos = [
  "Pau no cu",
  "Filho da puta",
  "Pobre",
  "Estagiário",
  "Boquinha de veludo",
  "Arrombado",
  "Inimigo do humor",
  "Bafo de bunda",
  "Metralhadora de bosta",
  "Cara de cú com caimbra",
  "Eleitor do Bolsonaro",
  "Calvo",
  "Lixo",
  "Desempregado",
  "Mão de vaca",
  "Inimigo da moda",
  "Barriga de cadela prenha",
  "Umbigudo fedorento",
  "Merda",
  "Porco imundo",
  "Sapão",
  "Shrek branco",
];

const nomesXingamentos = [
  "Durdo",
  "Bis",
  "Pokasombra",
  "Gustavinho",
  "Leozinho",
  "Bolsonaro",
];

const desmotivacao = [
  "Nem precisa ir hoje, a Nat ja ganhou mesmo!",
  "Tá muito frio, fica em casa",
  "Qual sentido disso tudo? Coma um miojo e durma",
  "ao ao ao se for treinar é um bobao",
  "nao treine",
];

const herdeiro = [
  "ganhou na mega sena e nao falou pro grupo?",
  "ou tá rico ou tá desempregado",
  "treinar em horário nobre vale meio?",
];

const memes = {
  "!salve": () => {
    msg: "Salve mlkote";
  },
  "!foto": () => {
    msg: "sem foto sem ponto";
  },
  "!uuui": () => {
    msg: "Ele gosxtaaa";
  },
  "!horas": () => {
    msg: "Agora são 6 e ônibus";
  },
  "!beach": () => {
    msg: "Beach tennis não vale em";
  },
  "!herdeiro": () => {
    return {
      msg: herdeiro[Math.floor(Math.random() * herdeiro.length)],
    };
  },
  "!motivacao": () => {
    return {
      msg: motivacao[Math.floor(Math.random() * motivacao.length)],
    };
  },
  "!desmotivacao": () => {
    return {
      msg: desmotivacao[Math.floor(Math.random() * desmotivacao.length)],
    };
  },
};

const commands = [
  "!comandos",
  "!motivacao",
  "!desmotivacao",
  "!xingar",
  "!bomdia",
  "!tusca",
  "!herdeiro",
];

const getCommands = () => {
  let msg = "Comandos disponíveis:";
  msg += commands.reduce((acc, command) => {
    return `${acc}\n${command}`;
  }, "");
  return { msg };
};

const getMotivacao = () => {
  return { msg: motivacao[Math.floor(Math.random() * motivacao.length)] };
};

const getDesmotivacao = () => {
  return {
    msg: desmotivacao[Math.floor(Math.random() * desmotivacao.length)],
  };
};

const getXingamentos = (commandObj) => {
  const { text } = commandObj;
  let msg = ``;
  const xingamento =
    xingamentos[Math.floor(Math.random() * xingamentos.length)];
  const nomeXingamento =
    nomesXingamentos[Math.floor(Math.random() * nomesXingamentos.length)];
  if (text) {
    msg = `${text[0]} seu ${xingamento}`;
    if (text.length > 1) {
      const index = text[1];
      const nome = text[0];
      msg = `${nome} seu ${xingamentos[index]}`;
    }
  } else {
    msg = `${nomeXingamento} seu ${xingamento}`;
  }
  return { msg };
};

const commandsFunction = {
  "!comandos": getCommands,
  "!motivacao": getMotivacao,
  "!desmotivacao": getDesmotivacao,
  "!xingar": getXingamentos,
};

const getNomesXingamentos = () => nomesXingamentos;

module.exports = { ...commandsFunction, ...memes };
