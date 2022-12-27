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
  async updateScore(date) {
    if (date) {
      try {
        let user = await this.user.updateOldScore(date);
        return user.score;
      } catch (error) {
        throw new Error(error.message);
      }
    } else {
      try {
        const todayDate = new Date();
        const day = todayDate.getDate();
        const month = todayDate.getMonth() + 1;
        const year = todayDate.getFullYear();
        let user = await this.user.updateOldScore(`${day}/${month}/${year}`);
        return user.score;
      } catch (error) {
        throw new Error(error.message);
      }
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
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
