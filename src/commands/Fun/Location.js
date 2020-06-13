const Command = require("../../struct/Command");
const { MessageAttachment } = require("discord.js");
const superagent = require("superagent");

module.exports = class Abandon extends Command {
  constructor(client) {
    super(client, {
      name: "location",
      description: "WHERE ARE YOU!",
      uage: "[text]",
    });
  }
  async run(message, args) {
    const res = await superagent
      .get("localhost:4000/api/knowyourlocation")
      .query({
        text: args.join(" "),
      });
    const attachment = new MessageAttachment(res.body, "knowyourlocation.png");
    await message.channel.send(attachment);
  }
};
