const { changeTimezone, daysDiff } = require("../helpers/date.helper.js");

module.exports = class User {
  constructor(repository, user_id) {
    this.userId = user_id;
    this.repository = repository;
    this.isRegistered = this.isRegistered();
    this.user = this.getUser();
  }
  async getUser() {
    try {
      const user = await this.repository.findByID(this.userId);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async isRegistered() {
    try {
      const exist = await this.repository.findByID(this.userId);

      if (exist) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async Register(name) {
    try {
      if (await this.isRegistered) {
        throw new Error("Usuário já cadastrado");
      }

      const user = await this.repository.RegisterUser({
        userID: this.userId,
        name: name,
        score: 0,
        streak: 0,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getScore() {
    try {
      const user = this.user;
      return user.score;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getStreak() {
    try {
      console.log(this.user);
      const user = this.user;
      return user.streak;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async canScore() {
    try {
      const user = this.user;
      const lastUpdate = new Date(user.updatedAt);
      const today = new Date();
      const lastUpdateInBrazil = changeTimezone(
        lastUpdate,
        "America/Sao_Paulo"
      );
      const todayInBrazil = changeTimezone(today, "America/Sao_Paulo");
      const diff = daysDiff(lastUpdateInBrazil, todayInBrazil);
      if (diff >= 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async isStreak() {
    try {
      const user = this.user;
      const lastUpdate = new Date(user.updatedAt);
      const today = new Date();
      const lastUpdateInBrazil = changeTimezone(
        lastUpdate,
        "America/Sao_Paulo"
      );
      const todayInBrazil = changeTimezone(today, "America/Sao_Paulo");
      const diff = daysDiff(lastUpdateInBrazil, todayInBrazil);
      if (diff === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateScore() {
    try {
      const user = this.user;
      if (this.canScore && this.isStreak) {
        user.score = user.score + 1;
        user.streak = user.streak + 1;
      } else if (this.canScore && !this.isStreak) {
        user.score = user.score + 1;
        user.streak = 0;
      } else {
        throw new Error("Ainda não é possível pontuar");
      }

      return await this.repository.UpdateScore(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAll() {
    try {
      const users = await this.repository.getData();
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
