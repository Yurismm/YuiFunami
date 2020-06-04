const Command = require("../../struct/Command");
const { MessageAttachment } = require("discord.js");
const superagent = require("superagent");

module.exports = class Abandon extends Command {
  constructor(client) {
    super(client, {
      name: "plan",
      description: "Whats the plan?",
      usage: "[text]"

    });
  }
  async run(message, args) {
      const text = args.join(' ')
      console.log(text)
    const res = await superagent
      .get("localhost:4000/api/plan")
      .query({ text: args.join(' ') });
    const attachment = new MessageAttachment(res.body, "plan.png");
    await message.channel.send(attachment);
  }
};
