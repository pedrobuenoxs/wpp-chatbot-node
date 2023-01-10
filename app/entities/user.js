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
  async isRegistered(user_id) {
    try {
      const user = await this.repository.findByID(this.userId);
      return user == null ? false : true;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async Register(name, imgUrl, date) {
    try {
      const user = {
        userID: this.userId,
        name: name,
        imgUrl: imgUrl || "",
        score: 0,
        data: [{ date: date, score: 0, obs: "Started" }],
      };
      const newUser = await this.repository.RegisterUser(user);
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateScore(date, emoji) {
    try {
      const { userID, score, data } = await this.user;

      if (data.length > 1) {
        const trainingDays = data.map((day) => day.date);
        const alreadyTrained = trainingDays.includes(date);
        if (alreadyTrained) {
          throw new Error("já treinou bobão");
        }
      }

      const newScore = score + 1;
      const newTrainingDay = { date: date, score: score, obs: emoji };
      const newData = [...data, newTrainingDay];

      const update = await this.repository.UpdateScore({
        userID: userID,
        score: newScore,
        data: newData,
      });

      return {
        name: update.name,
        score: update.score,
      };
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
