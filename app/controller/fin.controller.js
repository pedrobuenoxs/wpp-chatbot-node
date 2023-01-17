const FinRepository = require("../db/fin/fin.repository");
const {
  addExpense,
  getExpenses,
  getAllExpenses,
} = require("../service/expense.service");

const FinController = async (msg) => {
  const chat = await msg.getChat();

  if (chat.isGroup && chat.name == "golden cave") {
    if (msg.body.startsWith("!add")) {
      const repository = new FinRepository();
      const res = await addExpense(msg.body, repository);
      await chat.sendMessage(res.msg);
    }
    if (msg.body.startsWith("!get")) {
      const repository = new FinRepository();
      const res = await getExpenses(msg.body, repository);
      await chat.sendMessage(res.msg);
    }
    if (msg.body.startsWith("!all")) {
      const repository = new FinRepository();
      const res = await getAllExpenses(msg.body, repository);
      await chat.sendMessage(res.msg);
    }
  }
};

module.exports = FinController;
