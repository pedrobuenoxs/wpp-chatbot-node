const yesterdayDate = () => new Date(Date.now() - 86400000);

const dateInBrazil = (_date) => {
  const threeHoursAgo = () => new Date(Date.now());
  // console.log("Date on production: ", threeHoursAgo());
  const date = _date || threeHoursAgo();
  const stringDate = date.toLocaleString("pt-BR");
  console.log("stringDate", stringDate);
  const arrayDate = stringDate.split(",");
  return arrayDate[0];
};

module.exports = {
  yesterdayDate,
  dateInBrazil,
};
