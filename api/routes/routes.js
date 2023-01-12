const { Router } = require("../config/app");
const UserRouter = Router();
const { getData, getUser, createUser } = require("./controller");

UserRouter.get("/user", async (req, res) => {
  return await getData(req, res);
});

UserRouter.get("/user/:id", async (req, res) => {
  return await getUser(req, res);
});

UserRouter.post("/user", async (req, res) => {
  return await createUser(req, res);
});

module.exports = { UserRouter };
