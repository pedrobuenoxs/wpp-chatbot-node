const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserRecordSchema = new Schema(
  {
    userID: { type: String },
    name: { type: String },
    imgUrl: { type: String },
    score: { type: Number },
    data: { type: Array },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("dev-testes", UserRecordSchema);
