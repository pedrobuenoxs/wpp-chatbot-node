const UserRecordSchema = require("./user.model");
const mongoose = require("mongoose");

module.exports = class UserRepository {
  async RegisterUser(data) {
    const record = new UserRecordSchema({
      _id: new mongoose.Types.ObjectId(),
      ...data,
    });
    const save = record.save();
    return save;
  }

  async findByID(user_id) {
    return await UserRecordSchema.findOne({ userID: user_id });
  }

  async UpdateStreak(data) {
    const { id, streak } = data;
    const user = await UserRecordSchema.find({ id: id });
    if (user.updatedAt < Date.now() - 1000 * 60 * 60 * 24) {
      await UserRecordSchema.updateOne({ id: id }, { streak: 1 });
      console.log("updated");
    } else {
      await UserRecordSchema.updateOne({ id: id }, { streak: streak + 1 });
      console.log("not updated");
    }

    return await UserRecordSchema.updateOne({ id }, { streak });
  }

  async UpdateScore(data) {
    try {
      const { id, score, streak } = data;
      const update = await UserRecordSchema.findOneAndUpdate(
        { userID: id },
        { score: score, streak: streak },
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
