const yesterday = () => new Date(Date.now() - 86400000);

const dateInBrazil = (_date) => {
  const date = _date || new Date();
  const stringDate = date.toLocaleString("pt-BR");
  const arrayDate = stringDate.split(" ");
  return arrayDate[0];
};

module.exports = {
  yesterday,
  dateInBrazil,
};
