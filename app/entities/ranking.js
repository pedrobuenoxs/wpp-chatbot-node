module.exports = class Ranking {
  constructor(user) {
    this.user = user;
  }

  async join(name, imgUrl, date) {
    try {
      const isRegistered = await this.user.isRegistered;
      if (isRegistered) {
        throw new Error("Você já está registrado!");
      }
      const user = await this.user.Register(name, imgUrl, date);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async updateScore(date, emoji) {
    try {
      const isRegistered = await this.user.isRegistered;
      if (!isRegistered) {
        throw new Error("Você não está registrado!");
      }
      let user = await this.user.updateScore(date, emoji);
      return user.score;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.user.getAll();
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserProfile() {
    try {
      const user = await this.user.getUser();
      let msg = `Histórico de ${user.name}:\n`;
      const data = user.data;
      const sortedData = data.sort((a, b) => b.date - a.date);
      sortedData.forEach((day, index) => {
        msg += `${day.date} - ${index}/100 - ${day.obs}\n`;
      });
      return msg;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createList() {
    try {
      const users = await this.user.getAll();
      const sortedUsers = users.sort((a, b) => b.score - a.score);
      let msg = "Ranking:\n";
      sortedUsers.forEach((user, index) => {
        msg += `${index + 1} - ${user.name} - ${user.score}/100\n`;
      });
      return msg;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createDailyList(date) {
    try {
      const users = await this.user.getAll();
      const sortedUsers = users.sort((a, b) => b.score - a.score);
      console.log("sortedUser", sortedUsers);
      let msg = "Os fortes de hoje são:\n";
      sortedUsers.map((user) => {
        const data = user.data;
        const trainedToday = data.reduce((acc, curr) => {
          return curr.date == date ? { ...curr, bool: true } : acc;
        }, {});
        return trainedToday.bool
          ? (msg += `${user.name} - ${trainedToday.obs}\n`)
          : false;
      });
      return msg;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
