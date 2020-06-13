const Command = require("../../struct/Command");
const { MessageAttachment } = require("discord.js");
const superagent = require("superagent");

module.exports = class Abandon extends Command {
  constructor(client) {
    super(client, {
      name: "tweet",
      description: "The president tweeted again!",
      usage: "[Text]",
    });
  }
  async run(message, args) {
    const res = await superagent
      .get("localhost:4000/api/tweet")
      .query({ text: args.join(" ") });
    const attachment = new MessageAttachment(res.body, "tweet.png");
    await message.channel.send(attachment);
  }
};
