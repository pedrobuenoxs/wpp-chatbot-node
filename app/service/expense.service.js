const { error } = require("qrcode-terminal");
const { dateInBrazil, yesterdayDate } = require("../helpers/date.helper.js");

const addExpense = async (msg, ExpenseRepo) => {
  const msgArray = await msg.split("\n");
  const [command, desc, value, card, paymentType] = msgArray;
  try {
    if (!desc || !value || !card || !paymentType)
      throw new Error("Preencha todos os campos");
    let parcel = false;
    if (paymentType.split(" ")[1]) {
      parcel = paymentType.split(" ")[1];
    }
    const date = dateInBrazil();
    const data = {
      id: new Date().getTime(),
      desc,
      value: +value,
      payment: {
        card,
        paymentType,
        parcel: parcel,
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

    const credit = expenses.reduce((acc, curr) => {
      const ifTrue = () => {
        if (curr.payment.parcel) {
          const parcelNumber = curr.payment.parcel;
          return acc + curr.value / +parcelNumber;
        } else {
          return acc + curr.value;
        }
      };
      return curr.paymentType.startsWith("crédito") ? ifTrue() : acc;
    }, 0);

    const debit = expenses.reduce((acc, curr) => {
      return curr.payment.paymentType.startsWith("debito")
        ? acc + curr.value
        : acc;
    }, 0);

    const pix = expenses.reduce((acc, curr) => {
      return curr.payment.paymentType.startsWith("pix")
        ? acc + curr.value
        : acc;
    }, 0);

    const templateString = `*Resumo*
    Crédito - R$${credit}
    Debito - R$${debit}
    Pix - R$${pix}

    Total - R$${total.toFixed(2)}`;

    return { msg: templateString };
  } catch (error) {
    return { msg: error.message };
  }
};

const getAllExpenses = async (msg, ExpenseRepo) => {
  const msgArray = await msg.split("\n");
  const [command] = msgArray;
  try {
    const expenses = await ExpenseRepo.getExpenses();
    const total = expenses.reduce((acc, expense) => {
      return acc + expense.value;
    }, 0);
    let expensesString = "Todas despesas:\n";
    const mappedExpenses = expenses.map((expense) => {
      const { desc, value, payment, date } = expense;
      return (expensesString += `*${desc}*: R$${value} - ${payment.card} ${payment.paymentType} - ${date} \n`);
    });
    expensesString += `\nTotal: R$${total}`;
    return { msg: expensesString };
  } catch (err) {
    return { msg: error.message };
  }
};

module.exports = {
  addExpense,
  getExpenses,
  getAllExpenses,
};
