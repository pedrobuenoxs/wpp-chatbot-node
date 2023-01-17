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
      value: +value,
      payment: {
        card,
        paymentType,
      },
      date,
    };
    const { msg } = await ExpenseRepo.addExpense(data);
    // console.log(data);
    return { msg: msg };
  } catch (error) {
    return { msg: error.message };
  }
};

const getExpenses = async (msg, ExpenseRepo) => {
  const msgArray = await msg.split("\n");
  const [command] = msgArray;
  try {
    const expenses = await ExpenseRepo.getExpenses();
    const total = expenses.reduce((acc, expense) => {
      return acc + expense.value;
    }, 0);
    let expensesString = "";
    const mappedExpenses = expenses.map((expense) => {
      const { desc, value, payment, date } = expense;
      return (expensesString += `*${desc}*: R$${value} - ${payment.card} ${payment.paymentType} - ${date} \n`);
    });
    expensesString += `\nTotal: R$${total}`;

    return { msg: expensesString };
  } catch (error) {
    return { msg: error.message };
  }
};

module.exports = {
  addExpense,
  getExpenses,
};
