const Groups = require("./group.repository");
const Group = require("./group");
const objectify = require("./command.objectify");
const rankingHandler = require("./ranking.handler");

const GroupController = async (msg) => {
  const chat = await msg.getChat();
  const contact = await msg.getContact();
  const user_id = contact.id._serialized;
  const isGroup = chat.isGroup;
  const groupId = chat.id._serialized;
  const groupName = chat.name;
  if (isGroup && !groupName.startsWith("Tá") && !chat.name == "golden cave") {
    try {
      const firstMessage = msg.body.split(" ");
      const isCommand = firstMessage[0].startsWith("!");
      if (!isCommand) return;

      const repository = new Groups();
      const GroupClass = new Group(
        repository,
        user_id,
        contact,
        groupId,
        groupName
      );
      const isRegistered = await GroupClass.getGroup();
      if (!isRegistered && firstMessage[0] !== "!criar") {
        msg.reply(
          "O grupo ainda não foi registrado, digite !criar para registrar o grupo"
        );
        return;
      }
      const commandObject = objectify(msg.body);
      const handle = await rankingHandler(commandObject, GroupClass);
      await chat.sendMessage(handle);
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = GroupController;
