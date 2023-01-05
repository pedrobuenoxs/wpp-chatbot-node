module.exports = class Ranking {
  constructor(user) {
    this.user = user;
  }

  async join(name) {
    try {
      const user = await this.user.Register(name);
      return user.name;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async updateScore() {
    try {
      let user = await this.user.updateScore();
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
      data.forEach((day) => {
        msg += `${day.date} - ${day.score}/100\n`;
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
};
