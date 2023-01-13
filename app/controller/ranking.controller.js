const UserRepository = require("../db/user.repository");
const User = require("../entities/user");
const objectify = require("../helpers/command.objectify");
const commandHandler = require("../helpers/command.handler");

const RankingController = async (msg) => {
  const chat = await msg.getChat();
  const contact = await msg.getContact();
  const user_id = contact.id._serialized;
  const isGroup = chat.isGroup;
  if (isGroup && chat.name.startsWith("Tá")) {
    try {
      const firstMessage = msg.body.split(" ");
      const isCommand = firstMessage[0].startsWith("!");
      if (!isCommand) return;

      const repository = new UserRepository();
      const UserClass = new User(repository, user_id, contact);
      const commandObject = objectify(msg.body);

      const handle = await commandHandler(commandObject, UserClass);
      console.log(handle);
      await chat.sendMessage(handle);
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = RankingController;
