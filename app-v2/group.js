module.exports = class Group {
  constructor(repository, user_id, contact, groupId, groupName) {
    this.userId = user_id;
    this.repository = repository;
    this.contact = contact;
    this.groupId = groupId;
    this.groupName = groupName;
    this.user = this.GetUser();
    this.isRegistered = this.isRegistered();
    this.isCreated = this.getGroup() ? true : false;
    this.allUsers = this.getGroup();
  }
  async GetUser() {
    try {
      const user = await this.repository.FindUser(this.userId, this.groupId);
      return user;
    } catch (error) {
      return error.message;
    }
  }
  async isRegistered() {
    try {
      const user = await this.repository.FindUser(this.userId, this.groupId);
      return user == null ? false : true;
    } catch (error) {
      return error.message;
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
      const newUser = await this.repository.RegisterUser(user, this.groupId);
      return newUser;
    } catch (error) {
      return error.message;
    }
  }

  async updateScore(date, emoji) {
    try {
      const { userID, score, data } = await this.user;
      if (data.length > 1) {
        const trainingDays = data.map((day) => day.date);
        const alreadyTrained = trainingDays.includes(date);
        if (alreadyTrained) {
          return { msg: false };
        }
      }

      const newScore = score + 1;
      const newTrainingDay = { date: date, score: newScore, obs: emoji };
      const newData = [...data, newTrainingDay];

      const update = await this.repository.UpdateScore(
        {
          userID: userID,
          score: newScore,
          data: newData,
        },
        this.groupId
      );

      return {
        msg: true,
      };
    } catch (error) {
      return error.message;
    }
  }

  async getAll() {
    try {
      const users = await this.repository.GetGroups();
      return users;
    } catch (error) {
      return error.message;
    }
  }

  async createGroup() {
    try {
      const alreadyCreated = await this.repository.FindGroup(this.groupId);
      if (alreadyCreated) return "Ranking já criado";
      const data = {
        groupId: this.groupId,
        groupName: this.groupName,
        owner: this.userId,
      };
      const group = await this.repository.CreateGroup(data);
      return group;
    } catch (error) {
      return error.message;
    }
  }

  async getGroup() {
    try {
      const group = await this.repository.FindGroup(this.groupId);
      return group == null ? false : group;
    } catch (error) {
      return error.message;
    }
  }

  async editName(name) {
    try {
      const { userID, score, data } = await this.user;

      const group = await this.repository.EditName(
        {
          userID: userID,
          name: name,
        },
        this.groupId
      );
      return group;
    } catch (error) {
      return error.message;
    }
  }
};
