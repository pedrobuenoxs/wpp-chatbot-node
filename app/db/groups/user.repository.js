const Groups = require("./groups.model");

module.exports = class GroupsRepository {
  constructor() {}

  async CreateGroup(data) {
    const { groupId, groupName, owner } = data;
    const record = new Groups({ groupId, groupName, owner, users: [] });
    const save = record.save();
    const mappedData = {
      id: save.groupId,
      name: save.groupName,
    };
    return mappedData;
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
            users: {
              userID: userID,
              name: name,
              imgUrl: imgUrl,
              score: 0,
              data: [],
            },
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
        "users.userID": userID,
      });
      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  async UpdateScore(user, groupId) {
    try {
      const { userID, score, data } = user;
      const update = await Groups.findOneAndUpdate(
        { groupId: groupId, "users.userID": userID },
        { score: score, data: data },
        { new: true }
      );
      return update;
    } catch (error) {
      throw new Error(error);
    }
  }

  async GetGroups() {
    return await Groups.find();
  }
};
