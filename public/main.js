window.onload = function () {
  const data = [
    {
      user: {
        userID: "556384412527@c.us",
        name: "Sorriso",
        score: 4,
        streak: 0,
        data: [
          { score: 1, streak: 0, date: "2022-08-29T12:00:00.000Z" },
          { score: 2, streak: 0, date: "2022-08-31T12:00:00.000Z" },
          { score: 3, streak: 0, date: "2022-09-02T12:00:00.000Z" },
          { score: 4, streak: 0, date: "2022-09-05T12:00:00.000Z" },
        ],
      },
    },
    {
      user: {
        userID: "5517981655888@c.us",
        name: "Clarinha",
        score: 4,
        streak: 0,
        data: [{ score: 1, streak: 0, date: "2022-08-30T22:59:41.150Z" }],
      },
    },
    {
      user: {
        userID: "5519982099700@c.us",
        name: "Mose",
        score: 10,
        streak: 0,
        data: [
          { score: 1, streak: 0, date: "2022-08-29T12:00:00.000Z" },
          { score: 2, streak: 0, date: "2022-08-30T12:00:00.000Z" },
          { score: 3, streak: 0, date: "2022-08-31T12:00:00.000Z" },
          { score: 4, streak: 0, date: "2022-09-01T12:00:00.000Z" },
          { score: 5, streak: 0, date: "2022-09-02T12:00:00.000Z" },
          { score: 6, streak: 0, date: "2022-09-04T12:00:00.000Z" },
          { score: 7, streak: 0, date: "2022-09-05T12:00:00.000Z" },
          { score: 8, streak: 0, date: "2022-09-06T12:00:00.000Z" },
          { score: 9, streak: 0, date: "2022-09-08T12:00:00.000Z" },
          { score: 10, streak: 0, date: "2022-09-09T12:00:00.000Z" },
        ],
      },
    },
    {
      user: {
        userID: "5516997755560@c.us",
        name: "Durdo",
        score: 4,
        streak: 0,
        data: [
          { score: 1, streak: 0, date: "2022-08-29T12:00:00.000Z" },
          { score: 2, streak: 0, date: "2022-08-31T12:00:00.000Z" },
          { score: 32, streak: 0, date: "2022-09-05T12:00:00.000Z" },
        ],
      },
    },
    {
      user: {
        userID: "5519982753616@c.us",
        name: "Narnia",
        score: 6,
        streak: 0,
        data: [
          { score: 1, streak: 0, date: "2022-08-29T12:00:00.000Z" },
          { score: 2, streak: 0, date: "2022-08-31T12:00:00.000Z" },
          { score: 3, streak: 0, date: "2022-09-05T12:00:00.000Z" },
          { score: 3, streak: 0, date: "2022-09-05T12:00:00.000Z" },
          { score: 3, streak: 0, date: "2022-09-05T12:00:00.000Z" },
          { score: 3, streak: 0, date: "2022-09-05T12:00:00.000Z" },
        ],
      },
    },
    {
      user: {
        userID: "5514981123645@c.us",
        name: "@Brunopilons",
        score: 5,
        streak: 0,
        data: [
          { score: 1, streak: 0, date: "2022-08-30T12:00:00.000Z" },
          { score: 2, streak: 0, date: "2022-08-31T12:00:00.000Z" },
          { score: 3, streak: 0, date: "2022-09-01T12:00:00.000Z" },
          { score: 4, streak: 0, date: "2022-09-02T12:00:00.000Z" },
          { score: 5, streak: 0, date: "2022-09-05T12:00:00.000Z" },
        ],
      },
    },
    {
      user: {
        userID: "5519995790911@c.us",
        name: "Nat",
        score: 12,
        streak: 0,
        data: [
          { score: 1, streak: 0, date: "2022-08-29T12:00:00.000Z" },
          { score: 2, streak: 0, date: "2022-08-30T12:00:00.000Z" },
          { score: 3, streak: 0, date: "2022-08-31T12:00:00.000Z" },
          { score: 4, streak: 0, date: "2022-09-01T12:00:00.000Z" },
          { score: 5, streak: 0, date: "2022-09-02T12:00:00.000Z" },
          { score: 6, streak: 0, date: "2022-09-03T12:00:00.000Z" },
          { score: 7, streak: 0, date: "2022-09-04T12:00:00.000Z" },
          { score: 8, streak: 0, date: "2022-09-05T12:00:00.000Z" },
          { score: 9, streak: 0, date: "2022-09-06T12:00:00.000Z" },
          { score: 10, streak: 0, date: "2022-09-07T12:00:00.000Z" },
          { score: 11, streak: 0, date: "2022-09-08T12:00:00.000Z" },
          { score: 12, streak: 0, date: "2022-09-09T12:00:00.000Z" },
        ],
      },
    },
    {
      user: {
        userID: "5511999794061@c.us",
        name: "Talin",
        score: 12,
        streak: 0,
        data: [
          { score: 1, streak: 0, date: "2022-08-29T12:00:00.000Z" },
          { score: 2, streak: 0, date: "2022-08-30T12:00:00.000Z" },
          { score: 3, streak: 0, date: "2022-08-31T12:00:00.000Z" },
          { score: 4, streak: 0, date: "2022-09-01T12:00:00.000Z" },
          { score: 5, streak: 0, date: "2022-09-02T12:00:00.000Z" },
          { score: 6, streak: 0, date: "2022-09-03T12:00:00.000Z" },
          { score: 7, streak: 0, date: "2022-09-04T12:00:00.000Z" },
          { score: 8, streak: 0, date: "2022-09-05T12:00:00.000Z" },
          { score: 9, streak: 0, date: "2022-09-06T12:00:00.000Z" },
          { score: 10, streak: 0, date: "2022-09-07T12:00:00.000Z" },
          { score: 11, streak: 0, date: "2022-09-08T12:00:00.000Z" },
          { score: 12, streak: 0, date: "2022-09-10T00:36:24.289Z" },
        ],
      },
    },
    {
      user: {
        userID: "5514996836753@c.us",
        name: "Leozin_Gostoso",
        score: 12,
        streak: 0,
        data: [
          { score: 1, streak: 0, date: "2022-08-29T12:00:00.000Z" },
          { score: 2, streak: 0, date: "2022-08-30T12:00:00.000Z" },
          { score: 3, streak: 0, date: "2022-08-31T12:00:00.000Z" },
          { score: 4, streak: 0, date: "2022-09-01T12:00:00.000Z" },
          { score: 5, streak: 0, date: "2022-09-02T12:00:00.000Z" },
          { score: 6, streak: 0, date: "2022-09-03T12:00:00.000Z" },
          { score: 7, streak: 0, date: "2022-09-04T12:00:00.000Z" },
          { score: 8, streak: 0, date: "2022-09-05T12:00:00.000Z" },
          { score: 9, streak: 0, date: "2022-09-06T12:00:00.000Z" },
          { score: 10, streak: 0, date: "2022-09-07T12:00:00.000Z" },
          { score: 11, streak: 0, date: "2022-09-08T12:00:00.000Z" },
          { score: 12, streak: 0, date: "2022-09-09T12:00:00.000Z" },
        ],
      },
    },
    {
      user: {
        userID: "5514981607785@c.us",
        name: "Maysa",
        score: 6,
        streak: 0,
        data: [
          { score: 1, streak: 0, date: "2022-08-30T12:00:00.000Z" },
          { score: 2, streak: 0, date: "2022-08-31T12:00:00.000Z" },
          { score: 3, streak: 0, date: "2022-09-01T12:00:00.000Z" },
          { score: 4, streak: 0, date: "2022-09-03T12:00:00.000Z" },
          { score: 5, streak: 0, date: "2022-09-05T12:00:00.000Z" },
          { score: 6, streak: 0, date: "2022-09-06T12:00:00.000Z" },
        ],
      },
    },
    {
      user: {
        userID: "5516982203454@c.us",
        name: "Biseps",
        score: 5,
        streak: 5,
        data: [
          { score: 1, streak: 0, date: "2022-08-30T12:00:00.000Z" },
          { score: 2, streak: 0, date: "2022-08-31T12:00:00.000Z" },
          { score: 3, streak: 0, date: "2022-09-01T12:00:00.000Z" },
          { score: 4, streak: 0, date: "2022-09-03T12:00:00.000Z" },
          { score: 5, streak: 0, date: "2022-09-05T12:00:00.000Z" },
          { score: 6, streak: 0, date: "2022-09-06T12:00:00.000Z" },
        ],
      },
    },
    {
      user: {
        userID: "5511996578995@c.us",
        name: "Lequinha",
        score: 1,
        streak: 0,
        data: [{ score: 1, streak: 0, date: "2022-09-05T12:00:00.000Z" }],
      },
    },
    {
      user: {
        userID: "5516982515050@c.us",
        name: "Maluzinha",
        score: 7,
        streak: 1,
        data: [
          { score: 1, streak: 0, date: "2022-08-29T12:00:00.000Z" },
          { score: 2, streak: 0, date: "2022-08-30T12:00:00.000Z" },
          { score: 3, streak: 0, date: "2022-08-31T12:00:00.000Z" },
          { score: 4, streak: 0, date: "2022-09-01T12:00:00.000Z" },
          { score: 5, streak: 0, date: "2022-09-02T12:00:00.000Z" },
          { score: 6, streak: 0, date: "2022-09-05T12:00:00.000Z" },
          { score: 7, streak: 0, date: "2022-09-06T12:00:00.000Z" },
        ],
      },
    },
    {
      user: {
        userID: "5516991698991@c.us",
        name: "gustavin",
        score: 9,
        streak: 0,
        data: [
          { score: 1, streak: 0, date: "2022-08-29T12:00:00.000Z" },
          { score: 2, streak: 0, date: "2022-08-30T12:00:00.000Z" },
          { score: 3, streak: 0, date: "2022-08-31T12:00:00.000Z" },
          { score: 4, streak: 0, date: "2022-09-01T12:00:00.000Z" },
          { score: 5, streak: 0, date: "2022-09-02T12:00:00.000Z" },
          { score: 6, streak: 0, date: "2022-09-05T12:00:00.000Z" },
          { score: 7, streak: 0, date: "2022-09-06T12:00:00.000Z" },
          { score: 8, streak: 0, date: "2022-09-07T12:00:00.000Z" },
          { score: 9, streak: 0, date: "2022-09-10T00:22:24.780Z" },
        ],
      },
    },
    {
      user: {
        userID: "554399289273@c.us",
        name: "Teté",
        score: 3,
        streak: 3,
        data: [
          { score: 1, streak: 0, date: "2022-08-29T12:00:00.000Z" },
          { score: 2, streak: 0, date: "2022-08-30T12:00:00.000Z" },
          { score: 3, streak: 0, date: "2022-08-31T12:00:00.000Z" },
        ],
      },
    },
    {
      user: {
        userID: "5517997048782@c.us",
        name: "Scat",
        score: 0,
        streak: 0,
        data: [],
      },
    },
    {
      user: {
        userID: "5516992100075@c.us",
        name: "Bru",
        score: 2,
        streak: 2,
        data: [
          { score: 1, streak: 0, date: "2022-08-29T12:00:00.000Z" },
          { score: 2, streak: 0, date: "2022-08-30T12:00:00.000Z" },
        ],
      },
    },
    {
      user: {
        userID: "556182806030@c.us",
        name: "Pokatlético",
        score: 4,
        streak: 1,
        data: [
          { score: 1, streak: 0, date: "2022-08-29T12:00:00.000Z" },
          { score: 2, streak: 0, date: "2022-09-01T12:00:00.000Z" },
          { score: 3, streak: 0, date: "2022-09-05T12:00:00.000Z" },
          { score: 4, streak: 0, date: "2022-09-06T12:00:00.000Z" },
        ],
      },
    },
    {
      user: {
        userID: "5511945945147@c.us",
        name: "Paulinha",
        score: 6,
        streak: 0,
        data: [
          { score: 1, streak: 0, date: "2022-08-29T12:00:00.000Z" },
          { score: 2, streak: 0, date: "2022-08-31T12:00:00.000Z" },
          { score: 3, streak: 0, date: "2022-09-01T12:00:00.000Z" },
          { score: 4, streak: 0, date: "2022-09-05T12:00:00.000Z" },
          { score: 5, streak: 0, date: "2022-09-08T12:00:00.000Z" },
          { score: 6, streak: 0, date: "2022-09-09T12:00:00.000Z" },
        ],
      },
    },
    {
      user: {
        userID: "5511949726089@c.us",
        name: "Maria",
        score: 7,
        streak: 0,
        data: [
          { score: 1, streak: 0, date: "2022-08-29T12:00:00.000Z" },
          { score: 2, streak: 0, date: "2022-08-29T12:00:00.000Z" },
          { score: 3, streak: 0, date: "2022-08-31T12:00:00.000Z" },
          { score: 4, streak: 0, date: "2022-09-03T12:00:00.000Z" },
          { score: 5, streak: 0, date: "2022-09-05T12:00:00.000Z" },
          { score: 6, streak: 0, date: "2022-09-07T12:00:00.000Z" },
          { score: 7, streak: 0, date: "2022-09-08T12:00:00.000Z" },
        ],
      },
    },
    {
      user: {
        userID: "5516996121445@c.us",
        name: "Piranha",
        score: 8,
        streak: 0,
        data: [
          { score: 1, streak: 0, date: "2022-08-29T12:00:00.000Z" },
          { score: 2, streak: 0, date: "2022-08-30T12:00:00.000Z" },
          { score: 3, streak: 0, date: "2022-08-31T12:00:00.000Z" },
          { score: 4, streak: 0, date: "2022-09-01T12:00:00.000Z" },
          { score: 5, streak: 0, date: "2022-09-02T12:00:00.000Z" },
          { score: 6, streak: 0, date: "2022-09-03T12:00:00.000Z" },
          { score: 7, streak: 0, date: "2022-09-07T12:00:00.000Z" },
          { score: 8, streak: 0, date: "2022-09-08T12:00:00.000Z" },
        ],
      },
    },
  ];

  let tablebody = document.getElementById("my-table");

  const data_ = data.map((item) => {
    const user = item.user;
    return user;
  });

  const sortedData = data_.sort((a, b) => b.score - a.score);
  for (let i = 0; i < data.length; i++) {
    let row = tablebody.insertRow();
    let posCell = row.insertCell();
    let nameCell = row.insertCell();
    let scoreCell = row.insertCell();
    let posText = document.createTextNode(i + 1);
    let nameText = document.createTextNode(sortedData[i].name);
    let scoreText = document.createTextNode(sortedData[i].score);
    posCell.appendChild(posText);
    nameCell.appendChild(nameText);
    scoreCell.appendChild(scoreText);
  }
};
