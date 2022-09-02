module.exports = class Ranking {
  constructor(user) {
    this.user = user;
  }
  async join(name) {
    try {
      await this.user.Register(name);
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

  async getStreak() {}
};
