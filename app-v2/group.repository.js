const Groups = require("./groups.model");

module.exports = class GroupsRepository {
  constructor() {}

  async CreateGroup(data) {
    try {
      const { groupId, groupName, owner } = data;
      const record = new Groups({ groupId, groupName, owner, users: [] });
      const save = record.save();
      const mappedData = {
        id: save.groupId,
        name: save.groupName,
      };
      return mappedData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async FindGroup(groupId) {
    return await Groups.findOne({ groupId: groupId });
  }

  async RegisterUser(user, groupId) {
    try {
      const { userID, name, imgUrl } = user;
      const record = await Groups.findOneAndUpdate(
        { groupId: groupId },
        {
          $push: {
            users: user,
          },
        },
        { new: true }
      );
      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  async FindUser(userID, groupId) {
    try {
      const record = await Groups.findOne({
        groupId: groupId,
      });
      if (!record) throw new Error("Grupo não encontrado");
      const user = record.users.find((user) => user.userID == userID);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async UpdateScore(user, groupId) {
    try {
      const { userID, score, data } = user;
      const update = await Groups.findOneAndUpdate(
        { groupId: groupId, "users.userID": userID },
        { $set: { "users.$.score": score, "users.$.data": data } },
        { new: true }
      );
      // console.log(update);
      return update;
    } catch (error) {
      throw new Error(error);
    }
  }

  async GetGroups() {
    return await Groups.find();
  }
};
