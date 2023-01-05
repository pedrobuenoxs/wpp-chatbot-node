module.exports = class Commands {
  motivacao = [
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

  xingamentos = [
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

  nomesXingamentos = [
    "Durdo",
    "Bis",
    "Pokasombra",
    "Gustavinho",
    "Leozinho",
    "Bolsonaro",
  ];
  constructor(msg, chat) {
    this.msg = msg;
    this.chat = chat;
  }
  async verify() {
    const body = this.msg;
    const commands = [
      "!salve",
      "!foto",
      "!uuui",
      "!horas",
      "!beach",
      "!comandos",
      "!motivacao",
      "!xingar",
      "!bomdia",
      "!tusca",
    ];
    const isCommand = commands.some((cmd) => body.startsWith(cmd));
    return isCommand;
  }

  async handle() {
    const strToArray = (cmdString) => cmdString.split(" ");
    const commandArray = strToArray(this.msg);
    const command = commandArray[0].toLowerCase();

    if (command == "!salve") {
      await this.chat.sendMessage(`Salve mlkote`);
    }
    if (command == "!foto") {
      await this.chat.sendMessage(`sem foto sem ponto`);
    }
    if (command == "!beach") {
      await this.chat.sendMessage("Beach tennis não vale em");
    }
    if (command == "!uuui") {
      await this.chat.sendMessage("Ele gosxtaaa");
    }
    if (command == "!horas") {
      await this.chat.sendMessage("Agora são 6 e ônibus");
    }
    if (command == "!xingar") {
      if (commandArray.length > 1) {
        const nome = commandArray[1];
        await this.chat.sendMessage(
          `${nome} seu ${
            this.xingamentos[
              Math.floor(Math.random() * this.xingamentos.length)
            ]
          }`
        );
      } else {
        await this.chat.sendMessage(
          `${
            this.nomesXingamentos[
              Math.floor(Math.random() * this.nomesXingamentos.length)
            ]
          } seu ${
            this.xingamentos[
              Math.floor(Math.random() * this.xingamentos.length)
            ]
          }`
        );
      }
    }
    if (command == "!motivacao") {
      await this.chat.sendMessage(
        `${this.motivacao[Math.floor(Math.random() * this.motivacao.length)]}`
      );
    }
    if (command == "!bomdia") {
      try {
        let msg = `Bom dia, grupo!\n`;
        const data = await getWeather();
        const temperatura = data.current.weather.tp;
        msg += `A temperatura agora é de ${temperatura}°C!\n`;
        if (temperatura > 25) {
          msg += `Está quente, então lembre-se de beber bastante água!`;
        }
        if (temperatura < 20) {
          msg += `Está frio, então lembre-se de se vestir bem!`;
        }
        if (temperatura >= 20 && temperatura <= 25) {
          msg += `Está um dia agradável, então aproveite!`;
        }
        await this.chat.sendMessage(msg);
      } catch (error) {
        await this.chat.sendMessage(
          `Alguém chama o sorrisão - ${error.message}`
        );
      }
    }
    if (command == "!tusca") {
      const today = new Date();
      const tusca = new Date(2022, 10, 12);
      const diff = Math.abs(tusca.getTime() - today.getTime());
      const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
      await this.chat.sendMessage(`Faltam ${diffDays} dias para o Tusca!`);
    }

    if (command == "!comandos") {
      await this.chat.sendMessage(
        "Disponiveis:\n!salve\n!foto\n!uuui\n!horas\n!beach\n!comandos\n!motivacao\n!xingar\n!bomdia\n!tusca"
      );
    }
  }
};
