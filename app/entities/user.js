const {
  changeTimezone,
  isToday,
  isTomorrow,
} = require("../helpers/date.helper.js");

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
        data: [],
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateScore() {
    try {
      const user = await this.repository.findByID(this.userId);
      const data = user.data;
      const lastUpdate = new Date(user.updatedAt);
      const today = new Date();
      const lastUpdateInBrazil = changeTimezone(
        lastUpdate,
        "America/Sao_Paulo"
      );
      const todayInBrazil = changeTimezone(today, "America/Sao_Paulo");
      console.log(`
      lastUpdate: ${lastUpdateInBrazil}
      today: ${todayInBrazil}`);

      if (isToday(lastUpdateInBrazil, todayInBrazil)) {
        throw new Error("Você já pontuou hoje");
      } else if (isTomorrow(lastUpdateInBrazil, todayInBrazil)) {
        user.streak = user.streak + 1;
        user.score = user.score + 1;
        user.data = [
          ...data,
          { score: user.score, streak: user.streak, date: new Date() },
        ];
      } else {
        user.score = user.score + 1;
        user.streak = 0;
        user.data = [
          ...data,
          { score: user.score, streak: user.streak, date: new Date() },
        ];
      }
      console.log(`user before: ${user}`);
      return await this.repository.UpdateScore(user);
    } catch (error) {
      console.log(error.message);
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

/*
data = [
  {
    date: "2021-01-01",
    score: 1,
    streak: 1,
  },
]
*/
