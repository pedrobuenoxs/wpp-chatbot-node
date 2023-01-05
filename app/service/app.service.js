const { changeTimezone } = require("../helpers/date.helper.js");
module.exports = class App {
  constructor(msg, chat, ranking) {
    this.msg = msg;
    this.chat = chat;
    this.ranking = ranking;
  }
  async handle() {
    const strToArray = (cmdString) => cmdString.split(" ");
    const commandArray = strToArray(this.msg);
    const command = commandArray[0].toLowerCase();

    if (command == "!entrar") {
      try {
        const name = commandArray[1];
        const userName = await this.ranking.join(name);
        this.chat.sendMessage(`boooora ${userName}!`);
      } catch (error) {
        this.chat.sendMessage(`Atenção: ${error.message}!`);
      }
    }

    if (command == "!ranking") {
      try {
        const users = await this.ranking.createList();
        this.chat.sendMessage(msg);
      } catch (error) {
        this.chat.sendMessage(`Atenção: ${error.message}!`);
      }
    }

    if (command == "!pontuar") {
      try {
        let score = await this.ranking.updateScore();
        this.chat.sendMessage(`birrrl você tem ${score} pontos!`);
      } catch (error) {
        this.chat.sendMessage(`Atenção: ${error.message}!`);
      }
    }

    if (command == "!ajuda") {
      try {
        this.chat.sendMessage(
          "Comandos disponiveis:\n!entrar <nome>\n!ranking\n!pontuar\n!ajuda"
        );
      } catch (error) {
        this.chat.sendMessage(`Atenção: ${error.message}!`);
      }
    }
    if (command == "!profile") {
      try {
        const profile = await this.ranking.getUserProfile();
        this.chat.sendMessage(profile);
      } catch (error) {
        this.chat.sendMessage(`Atenção: ${error.message}!`);
      }
    }
  }
};
