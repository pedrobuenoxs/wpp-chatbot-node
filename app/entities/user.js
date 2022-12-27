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

  async getAll() {
    try {
      const users = await this.repository.getData();
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateOldScore(dateString) {
    try {
      const user = await this.repository.findByID(this.userId);
      console.log(user);
      const userScores = user.data;
      const scoreDates = userScores.map((score) =>
        changeTimezone(score.date, "America/Sao_Paulo")
      );
      const dateParts = dateString.split("/");
      const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
      const dateInBrazil = changeTimezone(new Date(date), "America/Sao_Paulo");

      const haveScored = scoreDates.map((scoreDate) => {
        const isSameDay = isToday(scoreDate, dateInBrazil);
        if (isSameDay) {
          return true;
        }
      });

      if (haveScored.includes(true)) {
        throw new Error("Você já pontuou nessa data");
      } else {
        user.score = user.score + 1;
        user.streak = 0;
        user.data = [
          ...userScores,
          { score: user.score, streak: user.streak, date: date },
        ];
        return await this.repository.UpdateScore(user);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
