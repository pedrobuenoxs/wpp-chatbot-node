const { dateInBrazil, yesterdayDate } = require("../helpers/date.helper.js");

const addExpense = async (msg, ExpenseRepo) => {
  const msgArray = await msg.split("\n");
  const [command, desc, value, card, paymentType] = msgArray;
  try {
    if (!desc || !value || !card || !paymentType)
      throw new Error("Preencha todos os campos");
    const date = dateInBrazil();
    const data = {
      id: new Date().getTime(),
      desc,
      value,
      payment: {
        card,
        paymentType,
      },
      date,
    };
    const { msg } = await ExpenseRepo.addExpense(data);
    return { msg };
  } catch (error) {
    return { msg: error.message };
  }
};

const getExpenses = async (msg, ExpenseRepo) => {
  const msgArray = await msg.split("\n");
  const [command] = msgArray;
  try {
    const expenses = await ExpenseRepo.getExpenses();
    const mappedExpenses = expenses.map((expense) => {
      const { desc, value, payment, date } = expense;
      return (
        `*${desc}*\n` +
        `*Valor:* ${value}\n` +
        `*Cartão:* ${payment.card}\n` +
        `*Tipo de pagamento:* ${payment.paymentType}\n` +
        `*Data:* ${date}\n`
      );
    });
    const expensesString = mappedExpenses.join("\n");
    return { msg: expensesString };
  } catch (error) {
    return { msg: error.message };
  }
};

module.exports = {
  addExpense,
  getExpenses,
};
