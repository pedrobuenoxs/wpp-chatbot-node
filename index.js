const qrcode = require("qrcode-terminal");
const { Client, RemoteAuth, LocalAuth } = require("whatsapp-web.js");
const mongoose = require("mongoose");
const { MongoStore } = require("wwebjs-mongo");
require("dotenv").config();

const { DB_URI } = process.env;

const RankingController = require("./app/controller/ranking.controller");

const { app } = require("./api/config/app");
const { UserRouter } = require("./api/routes/routes");

app.use("/api", UserRouter);

const port = process.env.PORT || 3000;

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
    mongoose.set("strictQuery", false);
    client.on("message", async (msg) => {
      await RankingController(msg);
    });

    client.on("disconnected", (reason) => {
      console.log("Client was logged out", reason);
    });
    client.on("qr", (qr) => {
      app.get("/qr", (req, res) => {
        res.send(qrcode.generate(qr, { small: true }));
      });
    });

    client.on("ready", () => {
      console.log("Client is ready!");
    });
    client.on("loading_screen", (percent, message) => {
      console.log("LOADING SCREEN", percent, message);
    });

    console.log("Db connected");
    client.initialize();
  })
  .catch((err) => {
    console.log("Error while connecting database::", err);
  });
