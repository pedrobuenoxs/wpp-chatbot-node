const UserRepository = require("../../app/db/user/user.repository");

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
    console.log(await user);
    // const mappedUser = {
    //   id: user._id,
    //   name: user.name,
    //   imgUrl: user.imgUrl,
    //   score: user.score,
    //   data: user.data,
    // };
    res.send(user);
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

const updateUserScore = async (req, res) => {
  try {
    const { id } = req.params;
    const { score, data } = req.body;
    if (!id || !score || !data) throw new Error("Missing params");
    const update = await repo.UpdateScore({ userID: id, score, data });
    const user = {
      id: update.userID,
      name: update.name,
      imgUrl: update.imgUrl,
      score: update.score,
      data: update.data,
    };
    res.send(update);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getData, getUser, createUser, updateUserScore };
