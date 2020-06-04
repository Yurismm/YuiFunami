const Command = require("../../struct/Command");
const { MessageAttachment } = require("discord.js");
const superagent = require("superagent");

module.exports = class Abandon extends Command {
  constructor(client) {
    super(client, {
      name: "armor",
      description: "Penetrate armor",
      usage: "[user]"

    });
  }
  async run(message, args) {
    const res = await superagent
      .get("localhost:4000/api/armor")
      .query({ text: args.join(' ') });
    const attachment = new MessageAttachment(res.body, "armor.png");
    await message.channel.send(attachment);
  }
};
