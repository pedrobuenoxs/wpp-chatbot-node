module.exports = class App {
  constructor(msg, chat, ranking) {
    this.msg = msg;
    this.chat = chat;
    this.ranking = ranking;
  }
  async verify() {
    const body = this.msg;
    const commands = ["!entrar", "!ranking", "!pontuar", "!ajuda"];
    const isCommand = commands.some((cmd) => body.startsWith(cmd));
    return isCommand;
  }
  async handle() {
    const strToArray = (cmdString) => cmdString.split(" ");
    const commandArray = strToArray(this.msg);
    const command = commandArray[0].toLowerCase();

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
  }
};
