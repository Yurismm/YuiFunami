const Command = require("../../struct/Command");
const { MessageAttachment } = require("discord.js");
const superagent = require("superagent");

module.exports = class Abandon extends Command {
  constructor(client) {
    super(client, {
      name: "abandon",
      description: "Abandon someone.",
      usage: "[text]"
    });
  }
  async run(message, args) {
    const res = await superagent
      .get("localhost:4000/api/abandon")
      .query({ text: args.join(' ') });
    const attachment = new MessageAttachment(res.body, "abandon.png");
    await message.channel.send(attachment);
  }
};
