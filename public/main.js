// import UserRecordSchema from "./user.model.js";

window.onload = function () {
  let tablebody = document.getElementById("my-table");
  const data = [
    {
      name: "Teste",
      score: 1,
      streak: 0,
    },
    {
      name: "Teste2",
      score: 7,
      streak: 0,
    },
    {
      name: "Teste3",
      score: 6,
      streak: 0,
    },
  ];
  console.log(data);
  const sortedData = data.sort((a, b) => b.score - a.score);
  for (let i = 0; i < data.length; i++) {
    let row = tablebody.insertRow();
    let posCell = row.insertCell();
    let nameCell = row.insertCell();
    let scoreCell = row.insertCell();
    let posText = document.createTextNode(i + 1);
    let nameText = document.createTextNode(data[i].name);
    let scoreText = document.createTextNode(data[i].score);
    posCell.appendChild(posText);
    nameCell.appendChild(nameText);
    scoreCell.appendChild(scoreText);
  }
};
