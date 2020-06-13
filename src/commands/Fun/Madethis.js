const Command = require("../../struct/Command");
const { MessageAttachment } = require("discord.js");
const superagent = require("superagent");

module.exports = class Abandon extends Command {
  constructor(client) {
    super(client, {
      name: "madethis",
      description: "You made this? I made this!",
      usage: "[user]",
    });
  }
  async run(message, args) {
    const conjoined = args.join(" ");
    const mentionAvatar = this.client.util
      .findMember(message, conjoined, true)
      .user.displayAvatarURL({ format: "png" });
    const res = await superagent.get("localhost:4000/api/madethis").query({
      avatar1: message.author.displayAvatarURL({ format: "png" }),
      avatar2: mentionAvatar,
    });
    const attachment = new MessageAttachment(res.body, "madethis.png");
    await message.channel.send(attachment);
  }
};
