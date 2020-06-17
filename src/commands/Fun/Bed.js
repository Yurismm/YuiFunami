const Command = require("../../struct/Command");
const { MessageAttachment } = require("discord.js");
const superagent = require("superagent");

module.exports = class Abandon extends Command {
  constructor(client) {
    super(client, {
      name: "bed",
      description: "Who's that monster in your bed?",
      usage: "[user]",
    });
  }
  async run(message, args) {
    const conjoined = args.join(" ");
    const mentionAvatar = this.client.util
      .findMember(message, conjoined, true)
      .user.displayAvatarURL({ format: "png" });
    const res = await superagent.get("localhost:4000/api/bed").query({
      avatar1: message.author.displayAvatarURL({ format: "png" }),
      avatar2: mentionAvatar,
    });
    const attachment = new MessageAttachment(res.body, "bed.png");
    await message.channel.send(attachment);
  }
};
