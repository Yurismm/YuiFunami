const Command = require("../../struct/Command");
const { MessageAttachment } = require("discord.js");
const superagent = require("superagent");

module.exports = class Abandon extends Command {
  constructor(client) {
    super(client, {
      name: "note",
      description: "Don't pass notes in class!",
      usage: "[Text]"

    });
  }
  async run(message, args) {
    const res = await superagent
      .get("localhost:4000/api/note")
      .query({ text: args.join(' ') });
    const attachment = new MessageAttachment(res.body, "note.png");
    await message.channel.send(attachment);
  }
};
