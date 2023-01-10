const { yesterday, dateInBrazil } = require("../helpers/date.helper.js");
module.exports = class App {
  constructor(msg, chat, ranking, contact) {
    this.msg = msg;
    this.chat = chat;
    this.ranking = ranking;
    this.contact = contact;
  }
  async handle() {
    const strToArray = (cmdString) => cmdString.split(" ");
    const commandArray = strToArray(this.msg.toLowerCase());
    const [command, flag, thirdParam, forthParam] = commandArray;
    const emoji = commandArray.slice(-1)[0];
    let date = dateInBrazil();

    if (command == "!entrar") {
      try {
        const imgUrl = await this.contact.getProfilePicUrl();
        const name = commandArray[1];
        const userName = await this.ranking.join(name, imgUrl, date);
        this.chat.sendMessage(`boooora ${name}!`);
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
      if (flag == "ontem") {
        const yesterday_ = yesterday();
        date = dateInBrazil(yesterday_);
      }
      if (flag == "-r") {
        date = thirdParam;
      }
      try {
        let score = await this.ranking.updateScore(date, emoji);
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
