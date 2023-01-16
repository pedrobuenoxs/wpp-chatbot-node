const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Expense = new Schema(
  {
    id: { type: String },
    desc: { type: String },
    label: { type: String },
    value: { type: Number },
    payment: { type: Object },
    date: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("finance-2023-pedro", Expense);
