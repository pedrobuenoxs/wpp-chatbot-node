const Expense = require("./fin.model");

module.exports = class FinRepository {
  constructor() {
    this.expenses = this.getExpenses();
    // console.log("User Repository Initialized");
  }

  async addExpense(data) {
    try {
      const record = new Expense(data);
      const save = record.save();
      return { msg: "Expense added successfully" };
    } catch (error) {
      return { msg: "Error adding expense" };
    }
  }

  async getExpenses() {
    try {
      return await Expense.find();
    } catch (error) {
      return { msg: "Error getting expenses" };
    }
  }
};
