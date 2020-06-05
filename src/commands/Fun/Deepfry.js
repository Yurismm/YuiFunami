const Command = require("../../struct/Command");
const { MessageAttachment } = require("discord.js");
const superagent = require("superagent");

module.exports = class Abandon extends Command {
  constructor(client) {
    super(client, {
      name: "deepfry",
      description: "Auwch thats hot!",
      usage: "[user]"

    });
  }
  async run(message, args) {
    const conjoined = args.join(" ");
    const mentionAvatar = this.client.util.findMember(message,conjoined,true).user.displayAvatarURL({format: "jpg"});
     const res = await superagent
      .get("localhost:4000/api/deepfry")
      .query({ avatar1: mentionAvatar});
    const attachment = new MessageAttachment(res.body, "deepfry.png");
    await message.channel.send(attachment);
  }
};
