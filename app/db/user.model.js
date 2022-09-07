const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserRecordSchema = new Schema(
  {
    userID: { type: String },
    name: { type: String },
    score: { type: Number },
    streak: { type: Number },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userRecordModel", UserRecordSchema);
