const yesterdayDate = () => new Date(Date.now() - 86400000 - 10800000);

const dateInBrazil = (_date) => {
  const threeHoursAgo = () => new Date(Date.now() - 10800000);
  console.log("Date on production: ", threeHoursAgo());
  const date = _date || threeHoursAgo();
  const stringDate = date.toLocaleString("pt-BR");
  const arrayDate = stringDate.split(" ");
  return arrayDate[0];
};

module.exports = {
  yesterdayDate,
  dateInBrazil,
};
