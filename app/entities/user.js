module.exports = class User {
  constructor(repository, user_id, contact) {
    this.userId = user_id;
    this.repository = repository;
    this.contact = contact;
    this.isRegistered = this.isRegistered();
    this.user = this.getUser();
    this.allUsers = this.getAll();
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
      const user = await this.repository.findByID(this.userId);
      return user == null ? false : true;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async Register(name, date) {
    try {
      const imgUrl = await this.contact.getProfilePicUrl();
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
      const newTrainingDay = { date: date, score: score + 1, obs: emoji };
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

  async updateName(name) {
    try {
      const { userID } = await this.user;
      const update = await this.repository.UpdateName({
        userID: userID,
        name: name,
      });
      return update;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
