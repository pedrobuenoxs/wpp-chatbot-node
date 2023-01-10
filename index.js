const qrcode = require("qrcode-terminal");
const { Client, RemoteAuth } = require("whatsapp-web.js");
const MsgController = require("./app/controller/msg.controller");
const App = require("./app/service/app.service");
const Ranking = require("./app/entities/ranking");
const UserRepository = require("./app/db/user.repository");
const User = require("./app/entities/user");
const Commands = require("./app/service/commands.service");
const { MongoStore } = require("wwebjs-mongo");
const { app } = require("./config/app");

const { DB_URI } = require("./env");

const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const { UserRouter } = require("./api/routes/routes");

app.use("/api", UserRouter);

mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`online on port: ${port}`);
    });
    const store = new MongoStore({ mongoose: mongoose });
    const client = new Client({
      authStrategy: new RemoteAuth({
        store: store,
        backupSyncIntervalMs: 300000,
      }),
      puppeteer: {
        args: ["--no-sandbox"],
      },
    });
    console.log("Db connected");
    // client.initialize();
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

      if (isGroup) {
        try {
          const repository = new UserRepository();
          const user = new User(repository, user_id);
          const ranking = new Ranking(user);
          const appService = new App(msg.body, chat, ranking, contact);
          const commandService = new Commands(msg.body, chat);
          const controller = new MsgController(appService, commandService);
          await controller.handle(msg);
        } catch (error) {
          console.log(error);
        }
      }
    });

    client.on("disconnected", (reason) => {
      console.log("Client was logged out", reason);
    });
  })
  .catch((err) => {
    console.log("Error while connecting database::", err);
  });
