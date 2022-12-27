const { changeTimezone } = require("../helpers/date.helper.js");
module.exports = class App {
  constructor(msg, chat, ranking) {
    this.msg = msg;
    this.chat = chat;
    this.ranking = ranking;
  }
  async verify() {
    const body = this.msg;
    const commands = [
      "!entrar",
      "!ranking",
      "!pontuar",
      "!ajuda",
      "!profile",
      "!regras",
    ];
    const isCommand = commands.some((cmd) => body.startsWith(cmd));
    return isCommand;
  }
  async handle() {
    const strToArray = (cmdString) => cmdString.split(" ");
    const commandArray = strToArray(this.msg);
    const command = commandArray[0].toLowerCase();
    const flag = commandArray[1];

    if (command == "!entrar") {
      try {
        const name = commandArray[1];
        await this.ranking.join(name);
      } catch (error) {
        this.chat.sendMessage(`Atenção: ${error.message}!`);
      }
    }
    if (command == "!ranking") {
      try {
        const users = await this.ranking.getAllUsers();
        const sortedUsers = users.sort((a, b) => b.score - a.score);
        let msg = "Ranking:\n";
        sortedUsers.forEach((user, index) => {
          if (user.streak >= 2) {
            msg += `${index + 1} - ${user.name} - ${user.score}/100 (${
              user.streak
            }🔥)\n`;
          } else {
            msg += `${index + 1} - ${user.name} - ${user.score}/100\n`;
          }
        });
        this.chat.sendMessage(msg);
      } catch (error) {
        this.chat.sendMessage(`Atenção: ${error.message}!`);
      }
    }

    if (command == "!pontuar") {
      if (flag == "-r" || flag == "--retroativo") {
        const date = commandArray[2];
        try {
          let score = await this.ranking.updateScore(date);
          console.log(`birrrl você tem ${score} pontos!`);
          this.chat.sendMessage(`birrrl você tem ${score} pontos!`);
        } catch (error) {
          this.chat.sendMessage(`Atenção: ${error.message}!`);
        }
      } else {
        try {
          let score = await this.ranking.updateScore();
          this.chat.sendMessage(`birrrl você tem ${score} pontos!`);
        } catch (error) {
          this.chat.sendMessage(`Atenção: ${error.message}!`);
        }
      }
    }

    if (command == "!ajuda") {
      try {
        this.chat.sendMessage(
          "Comandos disponiveis:\n!entrar <nome>\n!ranking\n!pontuar\n!pontuar -r DD/MM/AAAA\n!ajuda"
        );
      } catch (error) {
        this.chat.sendMessage(`Atenção: ${error.message}!`);
      }
    }
    if (command == "!profile") {
      try {
        const name = commandArray[1];
        const user = await this.ranking.getUserProfile();
        let msg = `Histórico de ${user.name}:\n`;
        const data = user.data;
        data.forEach((day) => {
          msg += `${changeTimezone(
            day.date,
            "America/Sao_Paulo"
          ).toDateString()} - ${day.score}/100\n`;
        });

        this.chat.sendMessage(msg);
      } catch (error) {
        this.chat.sendMessage(`Atenção: ${error.message}!`);
      }
    }
    if (command == "!regras") {
      let msg = `Regras:\n`;
      msg += `1 - O objetivo é pontuar 100 pontos.\n`;
      msg += `2 - Você pode pontuar 1 ponto por dia.\n`;
      msg += `3 - É necessário enviar uma foto ao pontuar.\n`;
      msg += `4 - Para pontuar, envie uma foto com a hashtag com o comando !pontuar.\n`;
      msg += `5 - Para pontuar retroativamente, use o comando !pontuar -r DD/MM/AAAA.\n`;
      msg += `6 - Para ver o seu histórico de pontuação, use o comando !profile.\n`;
      msg += `7 - Para ver o ranking geral, use o comando !ranking.\n`;
      msg += `8 - Para entrar no ranking, use o comando !entrar <nome>.\n`;
      msg += `9 - Para ver os comandos disponíveis, use o comando !ajuda.\n`;
      msg += `10 - Para ver as regras, use o comando !regras.\n`;
      msg += `Boa sorte!`;

      this.chat.sendMessage(msg);
    }
  }
};
