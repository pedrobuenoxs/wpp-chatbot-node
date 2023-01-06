const UserRepository = require("../../app/db/user.repository");

const repo = new UserRepository();

const getData = async (req, res) => {
  try {
    const data = await repo.getData();
    const mappedData = data.map((user) => {
      return {
        id: user.userID,
        name: user.name,
        imgUrl: user.imgUrl,
        score: user.score,
        data: user.data,
      };
    });
    res.send(mappedData);
  } catch (error) {
    throw new Error(error);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await repo.findByID(id);
    console.log(user);
    const mappedUser = {
      id: user.userID,
      name: user.name,
      imgUrl: user.imgUrl,
      score: user.score,
      data: user.data,
    };
    res.send(mappedUser);
  } catch (error) {
    throw new Error(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { id, name, imgUrl } = req.params;
    const user = {
      userID: id,
      name: name,
      imgUrl: imgUrl || "",
      score: 0,
      data: [],
    };

    const newUser = await repo.RegisterUser(user);
    res.send(user);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getData, getUser, createUser };
