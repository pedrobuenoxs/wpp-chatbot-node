const FinRepository = require("../db/fin/fin.repository");
const { addExpense, getExpenses } = require("../services/fin.service");

module.exports = FinController = async (msg) => {
  const chat = await msg.getChat();
  if (chat.isGroup && chat.name == "golden cave") {
    if (msg.body.startsWith("!add")) {
      const repository = new FinRepository();
      const handle = await addExpense(msg.body, repository);
      await chat.sendMessage(handle);
    }
    if (msg.body.startsWith("!get")) {
      const repository = new FinRepository();
      const handle = await getExpenses(msg.body, repository);
      await chat.sendMessage(handle);
    }
  }
};
