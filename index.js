const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const MsgController = require("./app/controller/msg.controller");
const App = require("./app/service/app.service");
const Ranking = require("./app/entities/ranking");
const UserRepository = require("./app/db/user.repository");
const User = require("./app/entities/user");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox"],
  },
});

client.initialize();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  const chat = await msg.getChat();
  const contact = await msg.getContact();
  const user_id = contact.id._serialized;
  const isGroup = chat.isGroup;
  console.log(msg.body);

  if (isGroup) {
    try {
      const repository = new UserRepository();
      const user = new User(repository, user_id);
      const ranking = new Ranking(user);
      const app = new App(msg.body, chat, ranking);
      const controller = new MsgController(app);
      await controller.handle(msg);
    } catch (error) {
      console.log(error);
    }
  }
});

client.on("disconnected", (reason) => {
  console.log("Client was logged out", reason);
});

require("dotenv").config();

const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log("Error while connecting database::", err);
  });
