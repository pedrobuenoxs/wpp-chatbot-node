const UserRecordSchema = require("./user.model");

module.exports = class UserRepository {
  constructor() {
    this.All = this.getData();
    // console.log("User Repository Initialized");
  }

  async RegisterUser(data) {
    const record = new UserRecordSchema(data);
    const save = record.save();
    const mappedData = {
      id: save.userID,
      name: save.name,
      imgUrl: save.imgUrl,
      score: save.score,
      data: save.data,
    };
    return mappedData;
  }

  async findByID(user_id) {
    return await UserRecordSchema.findOne({ userID: user_id });
  }

  async UpdateScore(user) {
    try {
      const { userID, score, data } = user;
      const update = await UserRecordSchema.findOneAndUpdate(
        { userID: userID },
        { score: score, data: data },
        { new: true }
      );
      return update;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getData() {
    return await UserRecordSchema.find();
  }
};
