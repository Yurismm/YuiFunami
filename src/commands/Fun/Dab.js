const Command = require("../../struct/Command");
const { MessageAttachment } = require("discord.js");
const superagent = require("superagent");

module.exports = class Abandon extends Command {
  constructor(client) {
    super(client, {
      name: "dab",
      description: "*Dabs*",
      usage: "[user]"

    });
  }
  async run(message, args) {
    const conjoined = args.join(" ");
    const mentionAvatar = this.client.util.findMember(message,conjoined,true).user.displayAvatarURL({format: "jpg"});
     const res = await superagent
      .get("localhost:4000/api/dab")
      .query({ avatar1: mentionAvatar});
    const attachment = new MessageAttachment(res.body, "dab.png");
    await message.channel.send(attachment);
  }
};
