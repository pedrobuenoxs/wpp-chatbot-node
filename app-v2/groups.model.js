const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Groups = new Schema(
  {
    groupId: { type: String },
    groupName: { type: String },
    owner: { type: String },
    users: { type: Array },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("2023-groups", Groups);
