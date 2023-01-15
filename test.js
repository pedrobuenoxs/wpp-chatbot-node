data = [
  { date: "01/01/2023" },
  { date: "02/01/2023" },
  { date: "03/01/2023" },
  { date: "04/01/2023" },
  { date: "01/02/2023" },
];
let month = new Date().getMonth() + 1;
const monthScore = data.reduce((acc, curr) => {
  //   console.log(curr.date.split("/"));

  return curr.date.split("/")[1] == month ? acc + 1 : acc;
}, 0);

console.log(monthScore);
